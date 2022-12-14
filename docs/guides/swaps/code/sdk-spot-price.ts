// prettier & eslint ignored since not all code will be included in markdown snippets
// this allows for tabs to show correctly when only a sub section is used
import { BalancerSDK, BalancerSdkConfig, BalancerError, BalancerErrorCode, Network } from '@balancer-labs/sdk';
const config: BalancerSdkConfig = {
  network: Network.MAINNET,
  rpcUrl: `https://mainnet.infura.io/v3/${process.env.INFURA}`,
};

async function run() {
const balancer = new BalancerSDK(config);
// 80/20 BAL/WETH pool
const poolId =
  '0x5c6ee304399dbdb9c8ef030ab642b10820db8f56000200000000000000000014';
const pool = await balancer.pools.find(poolId);
if (!pool) throw new BalancerError(BalancerErrorCode.POOL_DOESNT_EXIST);
const spotPrice = await pool.calcSpotPrice(
    '0xba100000625a3754423978a60c9317c58a424e3D', // BAL
    '0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2' // WETH
  );

  return spotPrice;
}

run();
