import {
  ApolloClient,
  InMemoryCache,
  NormalizedCacheObject,
  gql,
} from '@apollo/client/core/index';
import { ethers, BigNumberish } from 'ethers';

type RewardToken = {
  id: string;
  address: string;
  name: string;
  symbol: string;
  decimals: string;
  availableRewardAmount: string;
};

type RewardDistributor = {
  id: string;
  rewardTokens: RewardToken[];
  rewardStartTime: BigNumberish;
};

type VotingEscrow = {
  id: string;
  address: string;
  name: string;
  symbol: string;
  lockedAmount: string;
  decimals: string;
  supplyVestedPercent: string;
};

export type VeSystem = {
  id: string;
  bptToken: string;
  bptTokenName: string;
  votingEscrow: VotingEscrow;
  rewardDistributor: RewardDistributor;
  rewardDistributorAddress: string;
  rewardFaucetAddress: string;
  admin: string;
};

type GetVeSystemsResponse = {
  data: {
    vesystems: VeSystem[];
  };
};

type GetVeSystemResponse = {
  data: {
    vesystem: VeSystem;
  };
};

const format = (vesystem: VeSystem): VeSystem => ({
  ...vesystem,
  votingEscrow: {
    ...vesystem.votingEscrow,
    lockedAmount: ethers.formatUnits(
      vesystem.votingEscrow.lockedAmount,
      vesystem.votingEscrow.decimals
    ),
  },
});

export class LaunchpadSubgraph {
  public client: ApolloClient<NormalizedCacheObject>;

  constructor(uri: string) {
    this.client = new ApolloClient({
      uri,
      cache: new InMemoryCache(),
    });
  }

  public async getWithFilter(filter: {
    tokenAddress: string;
  }): Promise<VeSystem[]> {
    const query = gql`
      query GetVeSystems($bptToken: String!) {
        vesystems(where: { bptToken: $bptToken }) {
          id
          bptToken
          bptTokenName
          votingEscrow {
            id
            address
            name
            symbol
            lockedAmount
            supplyVestedPercent
          }
          rewardDistributorAddress
          rewardFaucetAddress
          rewardDistributor {
            id
            rewardTokens {
              id
              name
              address
              symbol
              decimals
              availableRewardAmount
            }
          }
        }
      }
    `;

    const {
      data: { vesystems },
    } = (await this.client.query({
      query,
      variables: { bptToken: filter.tokenAddress },
    })) as GetVeSystemsResponse;

    return vesystems.map(vesystem => format(vesystem));
  }

  public async getVeSystems(): Promise<VeSystem[]> {
    const query = gql(`
      query GetVeSystems {
        vesystems {
          id
          bptToken
          bptTokenName
          votingEscrow {
            id
            address
            name
            symbol
            lockedAmount
            supplyVestedPercent
          }
          rewardDistributorAddress
          rewardFaucetAddress
          rewardDistributor {
            id
            rewardTokens {
              id
              name
              address
              symbol
              decimals
              availableRewardAmount
            }
          }
        }
      }
    `);

    const {
      data: { vesystems },
    } = (await this.client.query({ query })) as GetVeSystemsResponse;

    return vesystems.map(vesystem => format(vesystem));
  }

  public async getVeSystem(id: string): Promise<VeSystem> {
    const query = gql(`
      query GetVeSystem($id: String!) {
        vesystem(id: $id) {
          id
          bptToken
          bptTokenName
          admin
          votingEscrow {
            id
            address
            name
            symbol
            lockedAmount
            supplyVestedPercent
          }
          rewardFaucetAddress
          rewardDistributorAddress
          rewardDistributor {
            id
            rewardTokens {
              id
              name
              address
              symbol
              decimals
              availableRewardAmount
            }
            rewardStartTime
          }
        }
      }
    `);

    const {
      data: { vesystem },
    } = (await this.client.query({
      query,
      variables: { id },
    })) as GetVeSystemResponse;

    return format(vesystem);
  }
}
