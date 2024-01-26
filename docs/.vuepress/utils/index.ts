import { VeSystem } from './LaunchpadSubgraph';

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

export const secondsToDate = (seconds: number) => {
  return new Date(seconds * 1000);
};

export const dateToSeconds = (d: Date) => {
  return d.getTime() / 1000;
};

export const getSelectorTokenItems = (
  veSystem: VeSystem
): [string, string][] => {
  return veSystem.rewardDistributor.rewardTokens.map(rt => [
    rt.address,
    rt.name,
  ]);
};

export const locale2utc = (date: Date): number => {
  if (date.getTimezoneOffset() < 0) {
    return date.getTime() - date.getTimezoneOffset() * 60e3;
  }

  return date.getTime() + date.getTimezoneOffset() * 60e3;
};

export * from './LaunchpadSubgraph';
export * from './LaunchpadController';
