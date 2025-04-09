<template>
  <div class="permissions-table" style="width: 100%">
    <div v-if="loading" class="loading">Loading permission table...</div>

    <div v-else-if="error" class="error">
      Error loading data. Please try again later.
    </div>

    <div v-else style="width: 100%">
      <table style="width: 100%">
        <thead>
          <tr>
            <th class="col-function">Function</th>
            <th class="col-contract">Contract</th>
            <th class="col-callers">Authorized Callers</th>
            <th class="col-deployments">Deployments</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(row, index) in sortedTableData" :key="index">
            <td class="function">
              <pre><code class="javascript">{{ row.function }}</code></pre>
            </td>
            <td class="contract">{{ row.contract }}</td>
            <td class="callers">
              <template v-if="row.callerAddressesArray.length">
                <ol>
                  <li
                    v-for="(address, idx) in row.callerAddressesArray"
                    :key="idx"
                  >
                    <a
                      :href="getExplorerLink(address)"
                      target="_blank"
                      rel="noopener noreferrer"
                      class="caller-address"
                    >
                      {{ address }}
                    </a>
                    <span
                      v-if="
                        row.callerNamesArray[idx] &&
                        row.callerNamesArray[idx] !== address
                      "
                      class="caller-name"
                    >
                      ({{ row.callerNamesArray[idx] }})
                    </span>
                  </li>
                </ol>
              </template>
              <template v-else> none </template>
            </td>
            <td class="deployments">{{ row.deployments }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import hljs from 'highlight.js/lib/core';
import javascript from 'highlight.js/lib/languages/javascript';
import 'highlight.js/styles/github.css';

interface TableRow {
  function: string;
  contract: string;
  callerNames: string;
  callerNamesArray: string[];
  callerAddresses: string;
  callerAddressesArray: string[];
  deployments: string;
}

interface ActionIdsData {
  [key: string]: {
    [key: string]: {
      useAdaptor: boolean;
      actionIds: {
        [key: string]: string;
      };
    };
  };
}

interface Permissions {
  [key: string]: string[];
}

interface ReverseAddressBook {
  [key: string]: string;
}

export default defineComponent({
  name: 'PermissionTable',
  props: {
    chain: {
      type: String,
      default: 'mainnet',
    },
  },
  data() {
    return {
      tableData: [] as TableRow[],
      loading: true,
      error: null as Error | null,
    };
  },
  computed: {
    sortedTableData(): TableRow[] {
      return [...this.tableData].sort((a, b) =>
        a.function.toLowerCase().localeCompare(b.function.toLowerCase())
      );
    },
  },
  mounted() {
    hljs.registerLanguage('javascript', javascript);
    this.fetchData();
    this.highlightCode();
  },
  updated() {
    this.highlightCode();
  },
  methods: {
    highlightCode() {
      document.querySelectorAll('pre code').forEach(block => {
        hljs.highlightBlock(block as HTMLElement);
      });
    },

    getExplorerLink(address: string): string {
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

      const explorerUrl =
        EXPLORER_URLS[this.chain as keyof typeof EXPLORER_URLS] ||
        EXPLORER_URLS.mainnet;
      return `${explorerUrl}${address}`;
    },

    isV2Related(deployment: string, callerNames: string[]): boolean {
      // Inverse of the original v3 check: filter out anything with v3 tags
      const isNotV3Deployment = !deployment.includes('-v3-');
      const hasNoV3Caller = !callerNames.some(
        name => name.includes('-v3-') || name.includes('/v3/')
      );
      return isNotV3Deployment && hasNoV3Caller;
    },

    async fetchData() {
      try {
        const [permissionsRes, reverseAddressRes, actionIdsRes] =
          await Promise.all([
            fetch(
              `https://raw.githubusercontent.com/BalancerMaxis/bal_addresses/main/outputs/permissions/active/${this.chain}.json`
            ),
            fetch(
              `https://raw.githubusercontent.com/BalancerMaxis/bal_addresses/main/outputs/${this.chain}_reverse.json`
            ),
            fetch(
              `https://raw.githubusercontent.com/balancer/balancer-deployments/master/action-ids/${this.chain}/action-ids.json`
            ),
          ]);

        const permissions = (await permissionsRes.json()) as Permissions;
        const reverseAddressBook =
          (await reverseAddressRes.json()) as ReverseAddressBook;
        const actionIds = (await actionIdsRes.json()) as ActionIdsData;

        const processedData: TableRow[] = [];

        Object.entries(actionIds).forEach(([deployment, contracts]) => {
          Object.entries(contracts).forEach(([contract, data]) => {
            if (!data.actionIds) return;

            Object.entries(data.actionIds).forEach(
              ([functionName, actionId]) => {
                const permissionAddresses = permissions[actionId] || [];

                const callerNamesArray = permissionAddresses.map(addr => {
                  let name =
                    reverseAddressBook[addr] ||
                    reverseAddressBook[addr.toLowerCase()];
                  return name || addr;
                });

                // Changed from isV3Related to isV2Related to filter for v2 deployments
                if (this.isV2Related(deployment, callerNamesArray)) {
                  processedData.push({
                    function: functionName,
                    contract: contract,
                    callerNames: callerNamesArray.join(', '),
                    callerNamesArray: callerNamesArray,
                    callerAddresses: permissionAddresses.join(', '),
                    callerAddressesArray: permissionAddresses,
                    deployments: deployment,
                  });
                }
              }
            );
          });
        });

        this.tableData = processedData;
        this.loading = false;
      } catch (err) {
        this.error = err instanceof Error ? err : new Error('Unknown error');
        this.loading = false;
        console.error('Error fetching data:', err);
      }
    },
  },
});
</script>

<style>
.permissions-table {
  width: 100%;
  margin: 1rem 0;
  box-sizing: border-box;
  display: block; /* Ensures full width in markdown context */
}

table {
  width: 100%;
  border-collapse: collapse;
  text-align: left;
  table-layout: fixed; /* Changed from auto to fixed */
}

th {
  background-color: #1e293b;
  color: #ffffff;
  padding: 0.5rem 0.75rem;
  font-weight: 600;
  border-bottom: 1px solid #e2e8f0;
}

td {
  padding: 0.5rem 0.75rem;
  border-bottom: 1px solid #e2e8f0;
  vertical-align: top;
  color: #000000; /* Pure black text for light mode */
}

.col-function {
  width: 15%;
}

.col-contract {
  width: 20%;
}

.col-callers {
  width: 50%;
}

.col-deployments {
  width: 15%;
}

.function {
  min-width: 150px;
}

.function pre {
  margin: 0;
  padding: 0;
  overflow: visible;
}

.function code {
  font-family: monospace;
  font-size: 0.75rem;
  white-space: pre-wrap;
  word-break: break-word;
  display: block;
  padding: 0.5rem;
  border-radius: 0.25rem;
  background-color: #f1f5f9;
  color: var(--c-text-light);
}

.contract {
  white-space: normal;
  word-break: break-word;
  color: var(--c-text-light);
  font-weight: 600; /* Made bolder for better readability */
}

.callers {
  font-size: 0.875rem;
  color: #000000; /* Pure black text for callers */
}

.callers ol {
  padding-left: 1.5rem;
  list-style-position: outside;
  margin: 0;
}

.callers li {
  margin-bottom: 0.25rem;
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  font-family: monospace;
}

.callers li:last-child {
  margin-bottom: 0;
}

.caller-address {
  color: #000000; /* Pure black address in light mode */
  text-decoration: none;
  word-break: break-all;
  font-family: monospace;
  font-size: 0.875rem;
}

.caller-name {
  font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto,
    sans-serif;
  color: #1e293b; /* Darker gray for caller names */
  font-size: 0.875rem;
  margin-left: 0.25rem;
}

.callers a {
  color: inherit;
  text-decoration: none;
}

.callers a:hover {
  text-decoration: underline;
}

tr:hover {
  background-color: rgba(241, 245, 249, 0.5); /* Lighter hover in light mode */
}

.loading,
.error {
  padding: 1rem;
  text-align: center;
  color: #000000; /* Pure black text for loading message */
}

.error {
  color: #b91c1c; /* Darker error in light mode */
}

.deployments {
  color: #000000; /* Pure black for deployment text */
}

@media (prefers-color-scheme: dark) {
  td {
    color: var(--c-text-light);
  }

  .function code {
    background-color: #334155;
    color: var(--c-text-light);
  }

  .contract {
    color: var(--c-text-light);
  }

  .callers {
    color: var(--c-text-light);
  }

  .caller-address {
    color: var(--c-text-light);
  }

  .caller-name {
    color: #94a3b8;
  }

  .deployments {
    color: var(--c-text-light);
  }

  tr:hover {
    background-color: rgba(30, 41, 59, 0.5);
  }

  .loading {
    color: var(--c-text-light);
  }

  .error {
    color: #ef4444;
  }
}
</style>
