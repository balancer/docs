import { ethers, BrowserProvider } from 'ethers';
import { Ref, watch, ref } from 'vue';
import { NetworkConfig } from '../constants/networks';
import { CallbackOptionsType, submitAction } from './LaunchpadController';
import { VeSystem } from './LaunchpadSubgraph';

type SetAllUnlockFunctionType = (
  callbacks: CallbackOptionsType
) => Promise<void>;

type AllUnlockFunctionType = () => Promise<boolean>;

type UseControllerReturnType = {
  setAllUnlock: Ref<SetAllUnlockFunctionType | undefined>;
  allUnlock: Ref<AllUnlockFunctionType | undefined>;
};

const ABI = [
  'function set_all_unlock() external',
  'function all_unlock() view external returns(bool)',
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
  };

  watch([network], initialize);

  return {
    setAllUnlock,
    allUnlock,
  };
};
