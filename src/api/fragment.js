/**
 * Fragment.com URL helpers for Telegram Gift NFTs.
 *
 * Fragment is the official marketplace for Telegram collectibles.
 * We can't fetch Fragment directly from the client (CORS), so this
 * module provides deep-link URL constructors for external navigation,
 * while on-chain / floor-price data comes from TON API (see nft.js).
 */

const FRAGMENT_BASE = 'https://fragment.com';

/**
 * Build the Fragment collection page URL for a gift collection.
 * e.g. https://fragment.com/gift/plush-pepes
 * @param {string} slug — kebab-case collection slug
 */
export function getFragmentCollectionUrl(slug) {
  return `${FRAGMENT_BASE}/gift/${encodeURIComponent(slug)}`;
}

/**
 * Build the Fragment URL for a specific gift item by number.
 * e.g. https://fragment.com/gift/plush-pepes/42
 * @param {string} slug
 * @param {number|string} number — item index / serial number
 */
export function getFragmentGiftUrl(slug, number) {
  return `${FRAGMENT_BASE}/gift/${encodeURIComponent(slug)}/${number}`;
}

/**
 * Generic Fragment URL (homepage or subpath).
 * @param {string} [path] — optional path segment
 */
export function getFragmentUrl(path) {
  if (!path) return FRAGMENT_BASE;
  return `${FRAGMENT_BASE}/${path.replace(/^\//, '')}`;
}
