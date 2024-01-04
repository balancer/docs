import { ethers, BrowserProvider } from 'ethers';
import { Ref, watch, ref } from 'vue';
import { NetworkConfig } from '../constants/networks';
import { CallbackOptionsType, submitAction } from './LaunchpadController';

type ApproveParamsType = {
  token: string;
  amount: bigint;
  spender: string;
};

type ApproveFunctionType = (
  data: ApproveParamsType,
  callbacks: CallbackOptionsType
) => Promise<void>;

type AllowanceFunctionType = (
  token: string,
  spender: string
) => Promise<bigint>;

type UseControllerReturnType = {
  approve: Ref<ApproveFunctionType | undefined>;
  allowance: Ref<AllowanceFunctionType | undefined>;
};

const ERC20 = [
  'function approve(address spender, uint256 amount) external returns (bool)',
  'function allowance(address owner, address spender) view returns (uint256)',
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
  const approve = ref<ApproveFunctionType>();
  const allowance = ref<AllowanceFunctionType>();

  const initialize = () => {
    approve.value = async (
      data: ApproveParamsType,
      callbacks: CallbackOptionsType
    ): Promise<void> => {
      if (!walletProvider.value) return;

      const { token, amount, spender } = data;

      const provider = new BrowserProvider(
        walletProvider.value,
        network.value.id
      );

      const signer = await provider.getSigner();
      const contract = new ethers.Contract(token, ERC20, signer);

      await submitAction(
        async () => await contract.approve(spender, amount),
        callbacks
      );
    };

    allowance.value = async (
      token: string,
      spender: string
    ): Promise<bigint> => {
      if (!walletProvider.value) return ethers.toBigInt(0);

      const provider = new BrowserProvider(
        walletProvider.value,
        network.value.id
      );

      const signer = await provider.getSigner();

      const owner = await signer.getAddress();

      const contract = new ethers.Contract(token, ERC20, provider);

      return await contract.allowance(owner, spender);
    };
  };

  watch([network], initialize);

  return {
    approve,
    allowance,
  };
};
