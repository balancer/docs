// prettier & eslint ignored since not all code will be included in markdown snippets
// this allows for tabs to show correctly when only a sub section is used
import { BalancerSDK, BalancerSdkConfig, Network } from '@balancer-labs/sdk';
const config: BalancerSdkConfig = {
  network: Network.MAINNET,
  rpcUrl: `https://mainnet.infura.io/v3/`,
};

export default async function test() {

// 80/20 BAL/WETH pool
const poolId =
  '0x5c6ee304399dbdb9c8ef030ab642b10820db8f56000200000000000000000014';

const balancer = new BalancerSDK(config);
const pool = await balancer.pools.find(poolId);
const spotPrice = pool
  ? await pool.calcSpotPrice(
      '0xba100000625a3754423978a60c9317c58a424e3D', // BAL
      '0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2' // WETH
    )
  : 0;

  return spotPrice;
};
// export default function run() {

// 80/20 BAL/WETH pool
// const poolId =
  // '0x5c6ee304399dbdb9c8ef030ab642b10820db8f56000200000000000000000014';

// const balancer = new BalancerSDK(config);
// const pool = await balancer.pools.find(poolId);
// const spotPrice = pool
//   ? await pool.calcSpotPrice(
//       '0xba100000625a3754423978a60c9317c58a424e3D', // BAL
//       '0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2' // WETH
//     )
//   : 0;

//   console.log(spotPrice);
// }

// run();
