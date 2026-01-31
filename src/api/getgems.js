/**
 * Getgems Public API client for Telegram Gift NFTs
 *
 * API docs: https://api.getgems.io/public-api/docs
 * Key creation: https://getgems.io/public-api (connect wallet)
 * Gift API access: request via @nfton_bot on Telegram
 *
 * Key endpoints:
 *   GET /v1/gifts/collections          — all gift collections
 *   GET /v1/gifts/collections/top      — top gift collections
 *   GET /v1/nfts/offchain/on-sale/gifts — gifts for sale (offchain)
 *   GET /v1/nfts/history/gifts         — gift sale history
 *   GET /v1/collection/stats/{addr}    — collection stats (floor, volume)
 *   GET /v1/collection/attributes/{addr} — attributes (models, backdrops)
 *   GET /v1/nfts/on-sale/{addr}        — NFTs for sale in collection
 *   GET /v1/collections/top            — top NFT collections
 */

const BASE = 'https://api.getgems.io/public-api';

// API key from .env (Vite exposes VITE_ prefixed vars)
function getApiKey() {
  try {
    return import.meta.env?.VITE_GETGEMS_API_KEY || '';
  } catch {
    return '';
  }
}

export function hasApiKey() {
  return !!getApiKey();
}

async function ggFetch(path, params = {}) {
  const key = getApiKey();
  if (!key) throw new Error('Getgems API key not configured');

  const url = new URL(`${BASE}${path}`);
  Object.entries(params).forEach(([k, v]) => {
    if (v !== undefined && v !== null) url.searchParams.set(k, String(v));
  });

  const res = await fetch(url.toString(), {
    headers: {
      Accept: 'application/json',
      Authorization: key,
    },
  });

  if (!res.ok) {
    const body = await res.text();
    throw new Error(`Getgems ${res.status}: ${body}`);
  }

  const data = await res.json();
  if (!data.success && data.name === 'Unauthorized') {
    throw new Error('Getgems API: Unauthorized — check API key');
  }
  return data.response ?? data;
}

// ─── Gift-specific endpoints ────────────────────────────

/** Get all gift collections (requires Gift API access) */
export async function getGiftCollections() {
  return ggFetch('/v1/gifts/collections');
}

/** Get top gift collections (requires Gift API access) */
export async function getTopGiftCollections() {
  return ggFetch('/v1/gifts/collections/top');
}

/** Get gifts currently for sale offchain */
export async function getGiftsOnSale(cursor, limit = 50) {
  return ggFetch('/v1/nfts/offchain/on-sale/gifts', { cursor, limit });
}

/** Get gift sale history */
export async function getGiftHistory(cursor, limit = 50) {
  return ggFetch('/v1/nfts/history/gifts', { cursor, limit });
}

// ─── Generic collection endpoints ───────────────────────

/** Collection stats (floor price, volume, holders) */
export async function getCollectionStats(address) {
  return ggFetch(`/v1/collection/stats/${address}`);
}

/** Collection stat counts */
export async function getCollectionStatsCounts(address) {
  return ggFetch(`/v1/collection/stats-count/${address}`);
}

/** Collection basic info */
export async function getCollectionInfo(address) {
  return ggFetch(`/v1/collection/basic-info/${address}`);
}

/** Collection attributes (models, backdrops, symbols with counts) */
export async function getCollectionAttributes(address) {
  return ggFetch(`/v1/collection/attributes/${address}`);
}

/** Top owners of a collection */
export async function getCollectionTopOwners(address) {
  return ggFetch(`/v1/collection/top-owners/${address}`);
}

/** Collection sale history */
export async function getCollectionHistory(address, cursor, limit = 50) {
  return ggFetch(`/v1/collection/history/${address}`, { cursor, limit });
}

/** Top collections across all of Getgems */
export async function getTopCollections() {
  return ggFetch('/v1/collections/top');
}

// ─── NFT endpoints ──────────────────────────────────────

/** NFTs for sale in a collection */
export async function getNftsOnSale(collectionAddress, cursor, limit = 50) {
  return ggFetch(`/v1/nfts/on-sale/${collectionAddress}`, { cursor, limit });
}

/** NFTs in a collection (all, not just on sale) */
export async function getCollectionNfts(collectionAddress, cursor, limit = 50) {
  return ggFetch(`/v1/nfts/collection/${collectionAddress}`, { cursor, limit });
}

/** Single NFT details */
export async function getNftDetails(nftAddress) {
  return ggFetch(`/v1/nft/${nftAddress}`);
}

/** NFT history (sales, transfers) */
export async function getNftHistory(nftAddress, cursor, limit = 20) {
  return ggFetch(`/v1/nft/history/${nftAddress}`, { cursor, limit });
}

/** User's NFTs */
export async function getUserNfts(ownerAddress, cursor, limit = 50) {
  return ggFetch(`/v1/nfts/owner/${ownerAddress}`, { cursor, limit });
}
