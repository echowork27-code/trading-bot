/**
 * Format nanoTON to TON (1 TON = 1e9 nanoTON)
 */
export function nanoToTon(nano) {
  return Number(nano) / 1e9;
}

/**
 * Format TON amount with max 2 decimals
 */
export function formatTon(nano) {
  const ton = nanoToTon(nano);
  if (ton >= 1000) return `${(ton / 1000).toFixed(1)}K`;
  if (ton >= 1) return ton.toFixed(2);
  return ton.toFixed(4);
}

/**
 * Format USD price
 */
export function formatUsd(value) {
  if (value === null || value === undefined) return '—';
  if (value >= 1) return `$${value.toFixed(2)}`;
  if (value >= 0.01) return `$${value.toFixed(4)}`;
  if (value >= 0.0001) return `$${value.toFixed(6)}`;
  return `$${value.toExponential(2)}`;
}

/**
 * Format price change percentage
 */
export function formatChange(changeStr) {
  if (!changeStr) return { text: '—', dir: 'neutral' };
  const clean = changeStr.replace(/[−–]/g, '-').replace('%', '').trim();
  const num = parseFloat(clean);
  if (isNaN(num)) return { text: changeStr, dir: 'neutral' };
  const dir = num > 0 ? 'up' : num < 0 ? 'down' : 'neutral';
  const text = num > 0 ? `+${num.toFixed(2)}%` : `${num.toFixed(2)}%`;
  return { text, dir };
}

/**
 * Format large number with K/M suffix
 */
export function formatNumber(n) {
  if (n >= 1_000_000) return `${(n / 1_000_000).toFixed(1)}M`;
  if (n >= 1_000) return `${(n / 1_000).toFixed(1)}K`;
  return n.toLocaleString();
}

/**
 * Time ago formatter
 */
export function timeAgo(unixTimestamp) {
  const now = Math.floor(Date.now() / 1000);
  const diff = now - unixTimestamp;
  if (diff < 60) return `${diff}s ago`;
  if (diff < 3600) return `${Math.floor(diff / 60)}m ago`;
  if (diff < 86400) return `${Math.floor(diff / 3600)}h ago`;
  return `${Math.floor(diff / 86400)}d ago`;
}

/**
 * Countdown timer (for auctions)
 */
export function countdown(endUnix) {
  const now = Math.floor(Date.now() / 1000);
  const diff = endUnix - now;
  if (diff <= 0) return 'Ended';
  const d = Math.floor(diff / 86400);
  const h = Math.floor((diff % 86400) / 3600);
  const m = Math.floor((diff % 3600) / 60);
  if (d > 0) return `${d}d ${h}h`;
  if (h > 0) return `${h}h ${m}m`;
  return `${m}m`;
}

/**
 * Truncate address for display
 */
export function shortAddr(addr) {
  if (!addr) return '—';
  return addr.slice(0, 6) + '...' + addr.slice(-4);
}
