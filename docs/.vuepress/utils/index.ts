export function filterToken(searchValue, token) {
  return (
    token.address.toLowerCase().includes(searchValue.toLowerCase()) ||
    token.name.toLowerCase().includes(searchValue.toLowerCase()) ||
    token.symbol.toLowerCase().includes(searchValue.toLowerCase())
  );
}

export function filterPool(searchValue, pool) {
  return (
    pool.id.toLowerCase().includes(searchValue.toLowerCase()) ||
    pool.address.toLowerCase().includes(searchValue.toLowerCase()) ||
    pool.name.toLowerCase().includes(searchValue.toLowerCase()) ||
    pool.symbol.toLowerCase().includes(searchValue.toLowerCase())
  );
}

export const weeksToSeconds = (weeks: number) => weeks * 7 * 24 * 60 * 60;

export * from './LaunchpadSubgraph';
export * from './LaunchpadController';
