import {
  ApolloClient,
  InMemoryCache,
  NormalizedCacheObject,
  gql,
} from '@apollo/client/core/index';
import { ethers, BigNumberish } from 'ethers';

type RewardDistributor = {
  id: string;
  rewardTokens: string[];
  rewardNames: string[];
};

type VotingEscrow = {
  id: string;
  address: string;
  name: string;
  symbol: string;
  lockedAmount: BigNumberish;
};

export type VeSystem = {
  id: string;
  bptToken: string;
  bptTokenName: string;
  votingEscrow: VotingEscrow;
  rewardDistributor: RewardDistributor;
};

type RawVotingEscrow = {
  id: string;
  address: string;
  name: string;
  symbol: string;
  lockedAmount: string;
};

type RawVeSystem = {
  id: string;
  bptToken: string;
  bptTokenName: string;
  votingEscrow: RawVotingEscrow;
  rewardDistributor: RewardDistributor;
};

type GetVeSystemsResponse = {
  data: {
    vesystems: RawVeSystem[];
  };
};

export class LaunchpadSubgraph {
  public client: ApolloClient<NormalizedCacheObject>;

  constructor(uri: string) {
    this.client = new ApolloClient({
      uri,
      cache: new InMemoryCache(),
    });
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
          }
          rewardDistributor {
            id
            rewardTokens
            rewardNames
          }
        }
      }
    `);

    const {
      data: { vesystems },
    } = (await this.client.query({ query })) as GetVeSystemsResponse;

    return vesystems.map(vesystem => ({
      ...vesystem,
      votingEscrow: {
        ...vesystem.votingEscrow,
        // TODO: lockedAmount: ethers.parseUnits(vesystem.votingEscrow.lockedAmount, vesystem.votingEscrow.decimals),
        lockedAmount: ethers.parseEther(vesystem.votingEscrow.lockedAmount),
      },
    }));
  }
}
