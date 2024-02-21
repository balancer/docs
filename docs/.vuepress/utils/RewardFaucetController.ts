import { ethers, BrowserProvider } from 'ethers';
import { Ref, watch, ref } from 'vue';
import { NetworkConfig } from '../constants/networks';
import { CallbackOptionsType, submitAction } from './LaunchpadController';
import { VeSystem } from './LaunchpadSubgraph';

type DepositTokenParamsType = {
  token: string;
  amount: bigint;
};

type DepositTokenFunctionType = (
  data: DepositTokenParamsType,
  callbacks: CallbackOptionsType
) => Promise<void>;

type ApproveTokenParamsType = DepositTokenParamsType;
type ApproveTokenFunctionType = DepositTokenFunctionType;

type TokenAllowanceFunctionType = (token: string) => Promise<bigint>;

type DepositEqualWeeksPeriodParamsType = {
  token: string;
  amount: bigint;
  weeks: bigint;
};

type DepositEqualWeeksPeriodFunctionType = (
  data: DepositEqualWeeksPeriodParamsType,
  callbacks: CallbackOptionsType
) => Promise<void>;

type DepositExactWeekParamsType = {
  token: string;
  amount: bigint;
  weekTimestamp: bigint;
};

type DepositExactWeekFunctionType = (
  data: DepositExactWeekParamsType,
  callbacks: CallbackOptionsType
) => Promise<void>;

type UseControllerReturnType = {
  approveToken: Ref<ApproveTokenFunctionType | undefined>;
  tokenAllowance: Ref<TokenAllowanceFunctionType | undefined>;
  depositEqualWeeksPeriod: Ref<DepositEqualWeeksPeriodFunctionType | undefined>;
  depositExactWeek: Ref<DepositExactWeekFunctionType | undefined>;
};

const ERC20 = [
  'function approve(address spender, uint256 amount) external returns (bool)',
  'function allowance(address owner, address spender) view returns (uint256)',
];

const RewardFaucetABI = [
  'function depositEqualWeeksPeriod(address token, uint256 amount, uint256 weeksCount) external',
  'function depositExactWeek(address token, uint256 amount, uint256 weekTimeStamp) external',
];

export const useController = ({
  walletProvider,
  network,
  veSystem,
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
  veSystem: Ref<VeSystem | undefined>;
}): UseControllerReturnType => {
  const approveToken = ref<ApproveTokenFunctionType>();
  const tokenAllowance = ref<TokenAllowanceFunctionType>();
  const depositEqualWeeksPeriod = ref<DepositEqualWeeksPeriodFunctionType>();
  const depositExactWeek = ref<DepositExactWeekFunctionType>();

  const initialize = () => {
    approveToken.value = async (
      data: ApproveTokenParamsType,
      callbacks: CallbackOptionsType
    ): Promise<void> => {
      if (!walletProvider.value) return;
      if (!veSystem.value) return;

      const { token, amount } = data;

      const spender = veSystem.value.rewardFaucetAddress;

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

    tokenAllowance.value = async (token: string): Promise<bigint> => {
      if (!walletProvider.value) return ethers.toBigInt(0);
      if (!veSystem.value) return ethers.toBigInt(0);

      const spender = veSystem.value.rewardFaucetAddress;

      const provider = new BrowserProvider(
        walletProvider.value,
        network.value.id
      );

      const signer = await provider.getSigner();

      const owner = await signer.getAddress();

      const contract = new ethers.Contract(token, ERC20, provider);

      return await contract.allowance(owner, spender);
    };

    depositEqualWeeksPeriod.value = async (
      data: DepositEqualWeeksPeriodParamsType,
      callbacks: CallbackOptionsType
    ): Promise<void> => {
      if (!walletProvider.value) return;
      if (!veSystem.value) return;

      // TODO: Add this field to the subgraph
      const contractAddress = veSystem.value.rewardFaucetAddress;

      const provider = new BrowserProvider(
        walletProvider.value,
        network.value.id
      );
      const signer = await provider.getSigner();
      const contract = new ethers.Contract(
        contractAddress,
        RewardFaucetABI,
        signer
      );

      const { token, amount, weeks } = data;

      await submitAction(
        async () =>
          await contract.depositEqualWeeksPeriod(token, amount, weeks),
        callbacks
      );
    };

    depositExactWeek.value = async (
      data: DepositExactWeekParamsType,
      callbacks: CallbackOptionsType
    ): Promise<void> => {
      if (!walletProvider.value) return;
      if (!veSystem.value) return;

      // TODO: Add this field to the subgraph
      const contractAddress = veSystem.value.rewardFaucetAddress;

      const provider = new BrowserProvider(
        walletProvider.value,
        network.value.id
      );
      const signer = await provider.getSigner();
      const contract = new ethers.Contract(
        contractAddress,
        RewardFaucetABI,
        signer
      );

      const { token, amount, weekTimestamp } = data;

      await submitAction(
        async () =>
          await contract.depositExactWeek(token, amount, weekTimestamp),
        callbacks
      );
    };
  };

  watch([network], initialize);

  return {
    approveToken,
    tokenAllowance,
    depositEqualWeeksPeriod,
    depositExactWeek,
  };
};
