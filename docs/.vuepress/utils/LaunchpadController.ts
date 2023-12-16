import { ethers, BrowserProvider } from 'ethers';
import { Ref, watch, ref } from 'vue';
import { NetworkConfig } from '../constants/networks';

type DeployParamsType = {
  tokenBptAddr: string;
  name: string;
  symbol: string;
  maxLockTime: number;
  rewardDistributorStartTime: number;
};

type CallbackOptionsType = {
  onPrompt?: () => void;
  onSubmitted?: ({ tx }: { tx: ethers.ContractTransaction }) => void;
  onSuccess?: ({
    tx,
    receipt,
  }: {
    tx: ethers.ContractTransaction;
    receipt: ethers.ContractTransactionReceipt;
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

const CONTRACT_ADDRESS = '0xDCa8bCd826708B2D780107A0FE72542395f2dB8E';

const ABI = [
  'function deploy(address tokenBptAddr,string name,string symbol,uint256 maxLockTime,uint256 rewardDistributorStartTime,address admin_unlock_all,address admin_early_unlock) external returns (address,address,address)',
];

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

      const provider = new BrowserProvider(
        walletProvider.value,
        network.value.id
      );
      const signer = await provider.getSigner();
      const admin = await signer.getAddress();
      const contract = new ethers.Contract(CONTRACT_ADDRESS, ABI, signer);
      const {
        tokenBptAddr,
        name,
        symbol,
        maxLockTime,
        rewardDistributorStartTime,
      } = data;

      const { onSubmitted, onSuccess, onError, onPrompt } = callbacks;

      if (onPrompt) onPrompt();

      try {
        const tx = await contract.deploy(
          tokenBptAddr,
          name,
          symbol,
          maxLockTime,
          rewardDistributorStartTime,
          admin,
          admin
        );

        if (onSubmitted) onSubmitted({ tx });

        const receipt = await tx.wait();

        if (onSuccess) onSuccess({ tx, receipt });
      } catch (error) {
        if (onError) onError(error);
      }
    };
  };

  watch([network], initialize);

  return {
    deploy,
  };
};
