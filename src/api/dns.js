import { apiFetch } from './tonapi.js';

/**
 * Get all active DNS auctions
 * @param {string} tld - 'ton' or 't.me'
 */
export async function getAuctions(tld = 't.me') {
  const data = await apiFetch('/dns/auctions', { tld });
  return {
    auctions: data.data || [],
    total: data.total || 0,
  };
}

/**
 * Get DNS info for a domain
 */
export async function getDnsInfo(domainName) {
  return apiFetch(`/dns/${domainName}`);
}

/**
 * Get bids for a domain
 */
export async function getDomainBids(domainName) {
  const data = await apiFetch(`/dns/${domainName}/bids`);
  return data.data || [];
}

/**
 * Get username auctions sorted by highest bids
 */
export async function getTopUsernameAuctions() {
  const { auctions } = await getAuctions('t.me');
  // Sort by price descending (most valuable)
  return auctions.sort((a, b) => Number(b.price) - Number(a.price));
}

/**
 * Get TON domain auctions sorted by highest bids
 */
export async function getTopDomainAuctions() {
  const { auctions } = await getAuctions('ton');
  return auctions.sort((a, b) => Number(b.price) - Number(a.price));
}

/**
 * Get auctions ending soon (good for sniping)
 */
export async function getEndingSoonAuctions(tld = 't.me') {
  const { auctions } = await getAuctions(tld);
  const now = Math.floor(Date.now() / 1000);
  return auctions
    .filter(a => a.date > now) // not ended yet
    .sort((a, b) => a.date - b.date); // soonest first
}
