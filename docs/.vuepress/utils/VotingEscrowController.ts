import { ethers, BrowserProvider, toBigInt } from 'ethers';
import { Ref, watch, ref } from 'vue';
import { NetworkConfig } from '../constants/networks';
import { CallbackOptionsType, submitAction } from './LaunchpadController';
import { VeSystem } from './LaunchpadSubgraph';

type CreateLockDataType = {
  value: bigint;
  lockTime: bigint;
};

type CreateLockFunctionType = (
  data: CreateLockDataType,
  callbacks: CallbackOptionsType
) => Promise<void>;

type WithdrawFunctionType = (callbacks: CallbackOptionsType) => Promise<void>;

type SetAllUnlockFunctionType = (
  callbacks: CallbackOptionsType
) => Promise<void>;

type SetEarlyUnlockFunctionType = (
  value: boolean,
  callbacks: CallbackOptionsType
) => Promise<void>;

type AllUnlockFunctionType = () => Promise<boolean>;

type EarlyUnlockFunctionType = AllUnlockFunctionType;

type SetEarlyUnlockPenaltyFunctionType = (
  value: bigint,
  callbacks: CallbackOptionsType
) => Promise<void>;

type GetEarlyUnlockPenaltyFunctionType = () => Promise<bigint>;
type GetLockedFunctionType = () => Promise<[bigint, bigint]>;

type IncreaseLockAmountFuctionType = (
  amount: bigint,
  callbacks: CallbackOptionsType
) => Promise<void>;

type IncreaseLockTimeFuctionType = (
  unlockTime: bigint,
  callbacks: CallbackOptionsType
) => Promise<void>;

type UseControllerReturnType = {
  setAllUnlock: Ref<SetAllUnlockFunctionType | undefined>;
  allUnlock: Ref<AllUnlockFunctionType | undefined>;
  setEarlyUnlock: Ref<SetEarlyUnlockFunctionType | undefined>;
  earlyUnlock: Ref<EarlyUnlockFunctionType | undefined>;
  setEarlyUnlockPenalty: Ref<SetEarlyUnlockPenaltyFunctionType | undefined>;
  getEarlyUnlockPenalty: Ref<GetEarlyUnlockPenaltyFunctionType | undefined>;
  createLock: Ref<CreateLockFunctionType | undefined>;
  withdraw: Ref<WithdrawFunctionType | undefined>;
  getLocked: Ref<GetLockedFunctionType | undefined>;
  withdrawEarly: Ref<WithdrawFunctionType | undefined>;
  increaseLockAmount: Ref<IncreaseLockAmountFuctionType | undefined>;
  increaseLockTime: Ref<IncreaseLockTimeFuctionType | undefined>;
  claimExternalRewards: Ref<WithdrawFunctionType | undefined>;
};

const ABI = [
  'function set_all_unlock() external',
  'function all_unlock() view external returns(bool)',
  'function set_early_unlock(bool _early_unlock) external',
  'function early_unlock() view external returns (bool)',
  'function set_early_unlock_penalty_speed(uint256 _penalty_k) external',
  'function penalty_k() view external returns (uint256)',
  'function create_lock(uint256 _value, uint256 _unlock_time) external',
  'function withdraw() external',
  'function locked(address _owner) view external returns (uint256, uint256)',
  'function withdraw_early() external',
  'function increase_amount(uint256 _amount) external',
  'function increase_unlock_time(uint256 _unlock_time) external',
  'function claimExternalRewards() external',
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
  const setAllUnlock = ref<SetAllUnlockFunctionType>();
  const allUnlock = ref<AllUnlockFunctionType>();
  const setEarlyUnlock = ref<SetEarlyUnlockFunctionType>();
  const earlyUnlock = ref<EarlyUnlockFunctionType>();
  const setEarlyUnlockPenalty = ref<SetEarlyUnlockPenaltyFunctionType>();
  const getEarlyUnlockPenalty = ref<GetEarlyUnlockPenaltyFunctionType>();
  const createLock = ref<CreateLockFunctionType>();
  const withdraw = ref<WithdrawFunctionType>();
  const withdrawEarly = ref<WithdrawFunctionType>();
  const getLocked = ref<GetLockedFunctionType>();
  const increaseLockAmount = ref<IncreaseLockAmountFuctionType>();
  const increaseLockTime = ref<IncreaseLockTimeFuctionType>();
  const claimExternalRewards = ref<WithdrawFunctionType>();

  const initialize = () => {
    setAllUnlock.value = async (
      callbacks: CallbackOptionsType
    ): Promise<void> => {
      if (!walletProvider.value) return;
      if (!veSystem.value) return;

      const contractAddress = veSystem.value.votingEscrow.address;

      const provider = new BrowserProvider(
        walletProvider.value,
        network.value.id
      );
      const signer = await provider.getSigner();
      const contract = new ethers.Contract(contractAddress, ABI, signer);

      await submitAction(
        async () => await contract.set_all_unlock(),
        callbacks
      );
    };

    allUnlock.value = async (): Promise<boolean> => {
      if (!walletProvider.value) return false;
      if (!veSystem.value) return false;

      const contractAddress = veSystem.value.votingEscrow.address;

      const provider = new BrowserProvider(
        walletProvider.value,
        network.value.id
      );
      const signer = await provider.getSigner();
      const contract = new ethers.Contract(contractAddress, ABI, signer);

      return await contract.all_unlock();
    };

    setEarlyUnlock.value = async (
      value: boolean,
      callbacks: CallbackOptionsType
    ): Promise<void> => {
      if (!walletProvider.value) return;
      if (!veSystem.value) return;

      const contractAddress = veSystem.value.votingEscrow.address;

      const provider = new BrowserProvider(
        walletProvider.value,
        network.value.id
      );
      const signer = await provider.getSigner();
      const contract = new ethers.Contract(contractAddress, ABI, signer);

      await submitAction(
        async () => await contract.set_early_unlock(value),
        callbacks
      );
    };

    earlyUnlock.value = async (): Promise<boolean> => {
      if (!walletProvider.value) return false;
      if (!veSystem.value) return false;

      const contractAddress = veSystem.value.votingEscrow.address;

      const provider = new BrowserProvider(
        walletProvider.value,
        network.value.id
      );
      const signer = await provider.getSigner();
      const contract = new ethers.Contract(contractAddress, ABI, signer);

      return await contract.early_unlock();
    };

    setEarlyUnlockPenalty.value = async (
      value: bigint,
      callbacks: CallbackOptionsType
    ): Promise<void> => {
      if (!walletProvider.value) return;
      if (!veSystem.value) return;

      const contractAddress = veSystem.value.votingEscrow.address;

      const provider = new BrowserProvider(
        walletProvider.value,
        network.value.id
      );
      const signer = await provider.getSigner();
      const contract = new ethers.Contract(contractAddress, ABI, signer);

      await submitAction(
        async () => await contract.set_early_unlock_penalty_speed(value),
        callbacks
      );
    };

    getEarlyUnlockPenalty.value = async (): Promise<bigint> => {
      if (!walletProvider.value) return toBigInt(0);
      if (!veSystem.value) return toBigInt(0);

      const contractAddress = veSystem.value.votingEscrow.address;

      const provider = new BrowserProvider(
        walletProvider.value,
        network.value.id
      );
      const signer = await provider.getSigner();
      const contract = new ethers.Contract(contractAddress, ABI, signer);

      return await contract.penalty_k();
    };

    createLock.value = async (
      data: CreateLockDataType,
      callbacks: CallbackOptionsType
    ): Promise<void> => {
      if (!walletProvider.value) return;
      if (!veSystem.value) return;

      const contractAddress = veSystem.value.votingEscrow.address;

      const provider = new BrowserProvider(
        walletProvider.value,
        network.value.id
      );
      const signer = await provider.getSigner();
      const contract = new ethers.Contract(contractAddress, ABI, signer);

      const { value, lockTime } = data;

      await submitAction(
        async () => await contract.create_lock(value, lockTime),
        callbacks
      );
    };

    withdraw.value = async (callbacks: CallbackOptionsType): Promise<void> => {
      if (!walletProvider.value) return;
      if (!veSystem.value) return;

      const contractAddress = veSystem.value.votingEscrow.address;

      const provider = new BrowserProvider(
        walletProvider.value,
        network.value.id
      );
      const signer = await provider.getSigner();
      const contract = new ethers.Contract(contractAddress, ABI, signer);

      await submitAction(async () => await contract.withdraw(), callbacks);
    };

    claimExternalRewards.value = async (
      callbacks: CallbackOptionsType
    ): Promise<void> => {
      if (!walletProvider.value) return;
      if (!veSystem.value) return;

      const contractAddress = veSystem.value.votingEscrow.address;

      const provider = new BrowserProvider(
        walletProvider.value,
        network.value.id
      );
      const signer = await provider.getSigner();
      const contract = new ethers.Contract(contractAddress, ABI, signer);

      await submitAction(
        async () => await contract.claimExternalRewards(),
        callbacks
      );
    };

    withdrawEarly.value = async (
      callbacks: CallbackOptionsType
    ): Promise<void> => {
      if (!walletProvider.value) return;
      if (!veSystem.value) return;

      const contractAddress = veSystem.value.votingEscrow.address;

      const provider = new BrowserProvider(
        walletProvider.value,
        network.value.id
      );
      const signer = await provider.getSigner();
      const contract = new ethers.Contract(contractAddress, ABI, signer);

      await submitAction(
        async () => await contract.withdraw_early(),
        callbacks
      );
    };

    getLocked.value = async (): Promise<[bigint, bigint]> => {
      if (!walletProvider.value) return [toBigInt(0), toBigInt(0)];
      if (!veSystem.value) return [toBigInt(0), toBigInt(0)];

      const contractAddress = veSystem.value.votingEscrow.address;

      const provider = new BrowserProvider(
        walletProvider.value,
        network.value.id
      );
      const signer = await provider.getSigner();
      const contract = new ethers.Contract(contractAddress, ABI, signer);

      const owner = await signer.getAddress();

      return await contract.locked(owner);
    };

    increaseLockAmount.value = async (
      amount: bigint,
      callbacks: CallbackOptionsType
    ): Promise<void> => {
      if (!walletProvider.value) return;
      if (!veSystem.value) return;

      const contractAddress = veSystem.value.votingEscrow.address;

      const provider = new BrowserProvider(
        walletProvider.value,
        network.value.id
      );
      const signer = await provider.getSigner();
      const contract = new ethers.Contract(contractAddress, ABI, signer);

      await submitAction(
        async () => await contract.increase_amount(amount),
        callbacks
      );
    };

    increaseLockTime.value = async (
      unlockTime: bigint,
      callbacks: CallbackOptionsType
    ): Promise<void> => {
      if (!walletProvider.value) return;
      if (!veSystem.value) return;

      const contractAddress = veSystem.value.votingEscrow.address;

      const provider = new BrowserProvider(
        walletProvider.value,
        network.value.id
      );
      const signer = await provider.getSigner();
      const contract = new ethers.Contract(contractAddress, ABI, signer);

      await submitAction(
        async () => await contract.increase_unlock_time(unlockTime),
        callbacks
      );
    };
  };

  watch([network], initialize);

  return {
    setAllUnlock,
    allUnlock,
    setEarlyUnlock,
    earlyUnlock,
    setEarlyUnlockPenalty,
    getEarlyUnlockPenalty,
    createLock,
    withdraw,
    getLocked,
    withdrawEarly,
    increaseLockAmount,
    increaseLockTime,
    claimExternalRewards,
  };
};
