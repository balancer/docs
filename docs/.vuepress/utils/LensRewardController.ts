import { ethers, BrowserProvider } from 'ethers';
import { Ref, watch, ref } from 'vue';
import { NetworkConfig } from '../constants/networks';
import { VeSystem } from './LaunchpadSubgraph';
import { CONFIG } from '../constants/config';

export type ClaimableReward = [string, bigint];

type GetUserClaimableRewardsAllFunctionType = () => Promise<ClaimableReward[]>;

type UseControllerReturnType = {
  getUserClaimableRewardsAll: Ref<
    GetUserClaimableRewardsAllFunctionType | undefined
  >;
};

const ABI = [
  'function getUserClaimableRewardsAll(address distributor, address user, address[] calldata tokens) external returns ((address,uint256)[])',
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
  const getUserClaimableRewardsAll =
    ref<GetUserClaimableRewardsAllFunctionType>();

  const initialize = () => {
    getUserClaimableRewardsAll.value = async (): Promise<ClaimableReward[]> => {
      if (!walletProvider.value) return [];
      if (!veSystem.value) return [];

      const distributor = veSystem.value.rewardDistributorAddress;
      const tokens = veSystem.value.rewardDistributor.rewardTokens.map(
        rt => rt.address
      );

      const provider = new BrowserProvider(
        walletProvider.value,
        network.value.id
      );

      const signer = await provider.getSigner();

      const user = await signer.getAddress();

      const LENS_REWARD_CONTRACT = CONFIG.get(
        network.value.id
      )?.LENS_REWARD_CONTRACT;

      if (!LENS_REWARD_CONTRACT) {
        console.error('missing LensReward contract address');
        return [];
      }

      const contract = new ethers.Contract(LENS_REWARD_CONTRACT, ABI, provider);

      return await contract.getUserClaimableRewardsAll.staticCall(
        distributor,
        user,
        tokens
      );
    };
  };

  watch([network], initialize);

  return {
    getUserClaimableRewardsAll,
  };
};
