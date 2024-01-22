import { ethers, BrowserProvider } from 'ethers';
import { Ref, watch, ref } from 'vue';
import { NetworkConfig } from '../constants/networks';
import { CONFIG } from '../constants/config';

type DeployParamsType = {
  tokenBptAddr: string;
  name: string;
  symbol: string;
  maxLockTime: number;
  rewardDistributorStartTime: number;
  enableUnlockAll: boolean;
  enableEarlyUnlock: boolean;
};

export type CallbackOptionsType = {
  onPrompt?: () => void;
  onSubmitted?: ({ tx }: { tx: ethers.ContractTransactionResponse }) => void;
  onSuccess?: ({
    tx,
    receipt,
  }: {
    tx: ethers.ContractTransactionResponse;
    receipt: ethers.ContractTransactionReceipt | null;
  }) => void;
  onError?: (err: unknown) => void;
};

type DeployFunctionType = (
  data: DeployParamsType,
  callbacks: CallbackOptionsType
) => Promise<void>;

type UseControllerReturnType = {
  deploy: Ref<DeployFunctionType | undefined>;
};

const ABI = [
  'function deploy(address tokenBptAddr,string name,string symbol,uint256 maxLockTime,uint256 rewardDistributorStartTime,address admin_unlock_all,address admin_early_unlock) external returns (address,address,address)',
];

export const submitAction = async (
  action: () => Promise<ethers.ContractTransactionResponse>,
  callbacks: CallbackOptionsType
) => {
  const { onSubmitted, onSuccess, onError, onPrompt } = callbacks;

  if (onPrompt) onPrompt();

  try {
    const tx = await action();

    if (onSubmitted) onSubmitted({ tx });

    const receipt = await tx.wait();

    if (onSuccess) onSuccess({ tx, receipt });
  } catch (error) {
    if (onError) onError(error);
  }
};

export const useController = ({
  walletProvider,
  network,
}: {
  walletProvider: Ref<
    | {
        request: (request: {
          method: string;
          params?: any[] | Record<string, any> | undefined;
        }) => Promise<any>;
      }
    | undefined
  >;
  network: Ref<NetworkConfig>;
}): UseControllerReturnType => {
  const deploy = ref<DeployFunctionType>();

  const initialize = () => {
    deploy.value = async (
      data: DeployParamsType,
      callbacks: CallbackOptionsType
    ): Promise<void> => {
      if (!walletProvider.value) return;
      if (!network.value) return;

      const provider = new BrowserProvider(
        walletProvider.value,
        network.value.id
      );
      const signer = await provider.getSigner();
      const admin = await signer.getAddress();

      const LAUNCHPAD_CONTRACT = CONFIG.get(
        network.value.id
      )?.LAUNCHPAD_CONTRACT;

      if (!LAUNCHPAD_CONTRACT) {
        console.error('missing Launchpad contract address');
        return;
      }

      const contract = new ethers.Contract(LAUNCHPAD_CONTRACT, ABI, signer);
      const {
        tokenBptAddr,
        name,
        symbol,
        maxLockTime,
        rewardDistributorStartTime,
        enableEarlyUnlock,
        enableUnlockAll,
      } = data;

      const adminUnlockAll = enableUnlockAll ? admin : ethers.ZeroAddress;
      const adminEarlyUnlock = enableEarlyUnlock ? admin : ethers.ZeroAddress;

      await submitAction(
        async () =>
          await contract.deploy(
            tokenBptAddr,
            name,
            symbol,
            maxLockTime,
            rewardDistributorStartTime,
            adminUnlockAll,
            adminEarlyUnlock
          ),
        callbacks
      );
    };
  };

  watch([network], initialize);

  return {
    deploy,
  };
};
