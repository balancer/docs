<template>
  <div class="deployment-table">
    <div v-if="loading" class="loading">Loading deployment addresses...</div>

    <div v-else-if="error" class="error">
      Error loading data. Please try again later.
    </div>

    <div v-else-if="filteredData.length === 0" class="empty">
      No contracts found for this category.
    </div>

    <div v-else class="table-container">
      <div class="table-wrapper">
        <table>
          <thead>
            <tr>
              <th class="col-contract">Contract</th>
              <th class="col-address">Address</th>
              <th class="col-deployment">Deployment</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="row in filteredData" :key="row.deploymentKey + row.name">
              <td class="contract">{{ row.name }}</td>
              <td class="address">
                <a
                  :href="getExplorerLink(row.address)"
                  target="_blank"
                  rel="noopener noreferrer"
                  class="link-with-icon"
                >
                  {{ row.address }}
                  <ExternalLink class="icon" size="14" />
                </a>
              </td>
              <td class="deployment">
                <a
                  :href="getDeploymentLink(row.deploymentKey)"
                  target="_blank"
                  rel="noopener noreferrer"
                  class="link-with-icon"
                >
                  {{ row.deploymentKey }}
                  <ExternalLink class="icon" size="14" />
                </a>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
import { defineComponent } from 'vue';
import { ExternalLink } from 'lucide-vue-next';

const EXPLORER_URLS = {
  mainnet: 'https://etherscan.io/address/',
  gnosis: 'https://gnosisscan.io/address/',
  base: 'https://basescan.org/address/',
  sepolia: 'https://sepolia.etherscan.io/address/',
  optimism: 'https://optimistic.etherscan.io/address/',
  arbitrum: 'https://arbiscan.io/address/',
  zkevm: 'https://zkevm.polygonscan.com/address/',
  avalanche: 'https://snowtrace.io/address/',
  mode: 'https://modescan.io/address/',
  fraxtal: 'https://fraxscan.io/address/',
  polygon: 'https://polygonscan.io/address/',
};

const CONTRACT_GROUPS = {
  core: {
    contracts: [
      'Vault',
      'BalancerRelayer',
      'BatchRelayerLibrary',
      'BalancerQueries',
      'ProtocolFeePercentagesProvider',
      'ProtocolFeeController',
    ],
  },
  poolfactory: {
    matchFunction: name => {
      const nameLower = name.toLowerCase();
      return (
        (nameLower.includes('pool') && nameLower.includes('factory')) ||
        (nameLower.includes('mock') && nameLower.includes('pool'))
      );
    },
  },
  hooksAndPeripherals: {
    contracts: [
      'BalancerContractRegistry',
      'StableSurgePoolFactory',
      'StableSurgeHook',
      'MevCaptureHook',
    ],
  },
  authorizations: {
    contracts: [
      'Authorizer',
      'AuthorizerAdaptor',
      'AuthorizerAdaptorEntrypoint',
      'AuthorizerWithAdaptorValidation',
      'TimelockAuthorizer',
    ],
  },
  gaugesgovernance: {
    matchFunction: name => {
      const keywords = [
        'gauge',
        'checkpointer',
        'streamer',
        'votingescrow',
        'veboost',
        'timelock',
        'balancer',
        'baltokenholder',
        'balminter',
        'feesdistributor',
        'protocolfeescollector',
        'protocolfeeswithdrawer',
        'rewardhelper',
        'rootgauge',
        'childchain',
        'l2',
        'bridge',
      ];

      const nameLower = name.toLowerCase();
      return keywords.some(keyword =>
        nameLower.includes(keyword.toLowerCase())
      );
    },
  },
  routers: {
    contracts: [
      'Router',
      'BatchRouter',
      'BufferRouter',
      'CompositeLiquidityRouter',
    ],
  },
  ungrouped: {
    // Special group that shows contracts that don't match any other group
    isUngrouped: true,
  },
};

export default defineComponent({
  name: 'DeploymentAddresses',

  components: {
    ExternalLink,
  },

  props: {
    chain: {
      type: String,
      default: 'mainnet',
    },
    active: {
      type: Boolean,
      default: true,
    },
    group: {
      type: String,
      default: '',
      validator: value =>
        value === '' || Object.keys(CONTRACT_GROUPS).includes(value),
    },
  },

  data() {
    return {
      tableData: [],
      loading: true,
      error: null,
    };
  },

  computed: {
    filteredData() {
      if (!this.group) return this.tableData;

      const groupConfig = CONTRACT_GROUPS[this.group];
      if (!groupConfig) return this.tableData;

      // Filter out v3 deployments for all groups
      const v2Data = this.tableData.filter(
        row => !row.deploymentKey.includes('-v3-')
      );

      // Handle special case for ungrouped contracts
      if (groupConfig.isUngrouped) {
        // Get all contracts that don't match any of the other groups
        const contractsInOtherGroups = new Set();

        // Process each normal group and collect all matching contracts
        Object.entries(CONTRACT_GROUPS).forEach(([groupKey, config]) => {
          if (groupKey === 'ungrouped') return; // Skip the ungrouped category itself

          v2Data.forEach(row => {
            let nameMatch = false;
            if (config.matchFunction) {
              nameMatch = config.matchFunction(row.name);
            } else if (config.contracts) {
              nameMatch = config.contracts.some(
                contract =>
                  row.name.includes(contract) || contract.includes(row.name)
              );
            }

            if (nameMatch) {
              contractsInOtherGroups.add(`${row.deploymentKey}-${row.name}`);
            }
          });
        });

        // Return contracts not in any other group
        return v2Data
          .filter(
            row =>
              !contractsInOtherGroups.has(`${row.deploymentKey}-${row.name}`)
          )
          .sort((a, b) =>
            a.name.toLowerCase().localeCompare(b.name.toLowerCase())
          );
      }

      // Normal group filtering
      return v2Data
        .filter(row => {
          let nameMatch = false;
          if (groupConfig.matchFunction) {
            nameMatch = groupConfig.matchFunction(row.name);
          } else if (groupConfig.contracts) {
            nameMatch = groupConfig.contracts.some(
              contract =>
                row.name.includes(contract) || contract.includes(row.name)
            );
          }

          return nameMatch;
        })
        .sort((a, b) =>
          a.name.toLowerCase().localeCompare(b.name.toLowerCase())
        );
    },
  },

  mounted() {
    this.fetchData();
  },

  methods: {
    getExplorerLink(address) {
      const explorerUrl = EXPLORER_URLS[this.chain] || EXPLORER_URLS.mainnet;
      return `${explorerUrl}${address}`;
    },

    getDeploymentLink(deploymentKey) {
      return `https://github.com/balancer/balancer-deployments/tree/master/v2/tasks/${deploymentKey}`;
    },

    async fetchData() {
      try {
        const response = await fetch(
          `https://raw.githubusercontent.com/balancer/balancer-deployments/refs/heads/master/addresses/${this.chain}.json`
        );
        const data = await response.json();

        const processedData = [];

        Object.entries(data).forEach(([deploymentKey, deployment]) => {
          if (
            (this.active && deployment.status === 'ACTIVE') ||
            (!this.active && deployment.status !== 'ACTIVE')
          ) {
            deployment.contracts.forEach(contract => {
              processedData.push({
                name: contract.name,
                address: contract.address,
                deploymentKey: deploymentKey,
              });
            });
          }
        });

        this.tableData = processedData;
        this.loading = false;
      } catch (err) {
        this.error = err;
        this.loading = false;
        console.error('Error fetching data:', err);
      }
    },
  },
});
</script>

<style scoped>
.deployment-table {
  width: 100%;
  margin: 1rem 0;
}

.table-wrapper {
  overflow-x: auto;
}

.empty {
  padding: 1rem;
  text-align: center;
  color: var(--c-text-light);
}

.loading,
.error {
  padding: 1rem;
  text-align: center;
}

.error {
  color: var(--c-danger);
}

table {
  width: 100%;
  border-collapse: collapse;
  text-align: left;
  table-layout: fixed;
}

th {
  background-color: var(--c-bg-light);
  padding: 0.75rem 1rem;
  font-weight: 600;
  border-bottom: 1px solid var(--c-border);
}

td {
  padding: 0.75rem 1rem;
  border-bottom: 1px solid var(--c-border);
  vertical-align: middle;
}

.col-contract {
  min-width: 250px;
}

.col-address {
  min-width: 400px;
}

.col-deployment {
  min-width: 200px;
}

.contract {
  font-weight: 600; /* Increased from 500 to 600 for better readability */
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  color: #000000; /* Pure black for maximum contrast in light mode */
}

.address {
  font-family: monospace;
  font-size: 0.8rem;
}

.deployment {
  font-size: 0.8rem;
}

.link-with-icon {
  align-items: center;
  gap: 0.5rem;
  color: var(--c-brand);
  text-decoration: none;
  transition: color 0.2s;
  overflow: hidden;
  text-overflow: ellipsis;
  width: 100%;
}

.link-with-icon:hover {
  color: var(--c-brand-light);
  text-decoration: underline;
}

.icon {
  flex-shrink: 0;
  width: 14px;
  height: 14px;
}

tr:hover {
  background-color: var(--c-bg-light);
}

/* Dark mode specific styles */
@media (prefers-color-scheme: dark) {
  .contract {
    color: var(--c-text-light);
  }
}
</style>
