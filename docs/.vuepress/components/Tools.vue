<template>
  <div class="tools-container">
    <h3>Core Tools</h3>
    <div class="docs-cards tools-table">
      <div v-for="tool in coreTools" :key="tool.title" class="tools-row">
        <DocsCard
          :title="tool.title"
          :icon="tool.icon"
          :link="tool.link"
          :details="tool.details"
          :target="_getLinkTarget(tool.link)"
        />
      </div>
    </div>

    <h3>Calculators and dApps</h3>
    <h3></h3>
    <div class="docs-cards tools-table">
      <div
        v-for="tool in calculatorsAndDApps"
        :key="tool.title"
        class="tools-row"
      >
        <DocsCard
          :title="tool.title"
          :icon="tool.icon"
          :link="tool.link"
          :details="tool.details"
          :target="_getLinkTarget(tool.link)"
        />
      </div>
    </div>

    <h3>Analytics and Dashboards</h3>
    <h3></h3>
    <div class="docs-cards tools-table">
      <div v-for="tool in analyticsSites" :key="tool.title" class="tools-row">
        <DocsCard
          :title="tool.title"
          :icon="tool.icon"
          :link="tool.link"
          :details="tool.details"
          :target="_getLinkTarget(tool.link)"
        />
      </div>
    </div>
  </div>
</template>



<script setup lang="ts">
import DocsCard from './DocsCardTools.vue';

const coreTools = [
  {
    title: 'Batch Swaps',
    icon: '/images/logo-balancer-white-512x512.svg',
    details: 'Batch Swap Queries',
    link: '/tools/core/batch-swap.html',
  },
  {
    title: 'Pools',
    icon: '/images/hero-circles.png',
    details: 'Pool Swap, Join and Exit Queries',
    link: '/tools/core/pools.html',
  },
  {
    title: 'Smart Order Router',
    icon: '/images/quick-link-guides.svg',
    details: 'Query swap routes through the SOR ',
    link: '/tools/core/smart-order-router.html',
  },
  {
    title: 've8020 Launchpad',
    icon: '/images/protofire.png',
    details: 'Launch a ve8020 system',
    link: '/tools/core/ve8020.html',
  },
  {
    title: 'Admin Panel - ve8020',
    icon: '/images/protofire.png',
    details: 'Admin Panel for ve8020 system',
    link: '/tools/core/admin-ve8020.html',
  },
  // Add more Core Tools as needed
];

const calculatorsAndDApps = [
  {
    title: 'Xeonus and Zen Dragon Tools',
    icon: '/images/logo-light.svg',
    details:
      'veBAL, Impermanent Loss and Price Impact Calculators - created by Xeonus and Zen Dragon',
    link: 'https://balancer.tools/veBAL',
  },
  {
    title: 'veBAL Gauge Multivoter',
    icon: '/images/toolshub/zekraken.jpg',
    details:
      'Vote for multiple gauges in the one transaction - created by Zekraken',
    link: 'https://vebalvoter.web.app/',
  },
  {
    title: 'veBAL Gauge Multi-Voter with Hidden-Hand Integration',
    icon: '/images/toolshub/defilytica_simple.png',
    details:
      'Use this tool to identify the highest yielding set of gauges to vote on given your veBAL voting power in one transaction - created by DeFilytica',
    link: 'https://defilytica.tools/#/balancer/veBALMultiVoter',
  },
  {
    title: 'veBAL Boost Calculator',
    icon: '/images/toolshub/defilytica_simple.png',
    details:
      'Calculate your current or theoretical veBAL boost across all Balancer deployments in one dashboard - created by DeFilytica',
    link: 'https://defilytica.tools/#/balancer/veBALBoost',
  },
  {
    title: 'Internal Balances Manager',
    icon: '/images/toolshub/balancer-symbol.svg',
    details:
      'User-friendly interface designed for traders to easily manage and interact with their internal balances within the Vault - created by Bleu',
    link: 'https://tools.balancer.blue/internalmanager',
  },
  {
    title: 'Custom Pool Metadata',
    icon: '/images/toolshub/balancer-symbol.svg',
    details:
      'Tool for owners to be able to add custom metadata to their pools - created by Bleu',
    link: 'https://tools.balancer.blue/metadata/',
  },
  {
    title: 'Stable Swap Simulator',
    icon: '/images/toolshub/balancer-symbol.svg',
    details:
      'Dashboard to visualize the impact of changes in the Amplification Factor on Balancer Stable-Like Pools - created by Bleu',
    link: 'https://tools.balancer.blue/stableswapsimulator',
  },
  // Add more calculators and dApps as needed
];

const analyticsSites = [
  {
    title: 'DeFilytica Analytics',
    icon: '/images/toolshub/defilytica_simple.png',
    details:
      'Protocol, pool and token metrics. Additionally, an in-depth financial dashboard and service-provider analytics board.',
    link: 'https://balancer.defilytica.com/',
  },
  {
    title: 'Token Terminal',
    icon: '/images/toolshub/tokenterminal.jpg',
    details: 'Tools to evaluate and track Balancer',
    link: 'https://tokenterminal.com/terminal/projects/balancer',
  },
  {
    title: 'Dune veBAL',
    icon: '/images/toolshub/DuneLogoCircle.svg',
    details: 'veBAL Dashboard',
    link: 'https://dune.com/balancerlabs/veBAL',
  },
  {
    title: 'DefiLlama',
    icon: '/images/toolshub/defi-lama-logo.webp',
    details: 'Balancer Dashboard',
    link: 'https://defillama.com/protocol/balancer',
  },

  // Add more analytics sites as needed
];

// Function to check if a link is external
function isExternalLink(link) {
  return link.startsWith('http://') || link.startsWith('https://');
}

// Function to get the target attribute for the link
function _getLinkTarget(link) {
  return isExternalLink(link) ? '_blank' : '_self';
}
</script>

<style scoped>
.tools-container {
  max-width: 1200px;
  margin: 0 auto;
}

.docs-cards {
  grid-gap: 1.35rem;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  padding-bottom: 2em;
}

.tools-row {
  /* Adjust the styles for each row of tools (DocsCard components) */
}

/* Add any additional styles as needed */
</style>
