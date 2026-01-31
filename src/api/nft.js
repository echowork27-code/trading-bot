import { apiFetch } from './tonapi.js';
import { COLLECTIONS } from '../utils/constants.js';

/**
 * Get NFT collection metadata
 */
export async function getCollection(address) {
  return apiFetch(`/nfts/collections/${address}`);
}

/**
 * Get items from a collection
 * @param {string} address - collection address
 * @param {number} limit
 * @param {number} offset
 */
export async function getCollectionItems(address, limit = 50, offset = 0) {
  const data = await apiFetch(`/nfts/collections/${address}/items`, { limit, offset });
  return data.nft_items || [];
}

/**
 * Get a single NFT item
 */
export async function getNftItem(address) {
  return apiFetch(`/nfts/${address}`);
}

/**
 * Get NFT history by item address
 */
export async function getNftHistory(address, limit = 20) {
  const data = await apiFetch(`/nfts/${address}/history`, { limit });
  return data.events || [];
}

/**
 * Get multiple NFTs by addresses
 */
export async function getNftsBulk(addresses) {
  const res = await fetch(`https://tonapi.io/v2/nfts/_bulk`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ account_ids: addresses }),
  });
  if (!res.ok) throw new Error(`Bulk NFT fetch failed: ${res.status}`);
  const data = await res.json();
  return data.nft_items || [];
}

/**
 * Get Telegram Username NFTs (items from the Usernames collection)
 */
export async function getUsernameNfts(limit = 50, offset = 0) {
  return getCollectionItems(COLLECTIONS.USERNAMES, limit, offset);
}

/**
 * Get Anonymous Number NFTs
 */
export async function getAnonymousNumbers(limit = 50, offset = 0) {
  return getCollectionItems(COLLECTIONS.ANONYMOUS_NUMBERS, limit, offset);
}

/**
 * Browse NFT collections
 */
export async function browseCollections(limit = 20, offset = 0) {
  const data = await apiFetch('/nfts/collections', { limit, offset });
  return data.nft_collections || [];
}

/**
 * Get account's NFTs
 */
export async function getAccountNfts(accountId, limit = 50, offset = 0) {
  const data = await apiFetch(`/accounts/${accountId}/nfts`, { limit, offset });
  return data.nft_items || [];
}

/**
 * Get NFT activity events for account
 */
export async function getAccountNftHistory(accountId, limit = 20) {
  const data = await apiFetch(`/accounts/${accountId}/nfts/history`, { limit });
  return data.events || [];
}
