import { apiFetch } from './tonapi.js';

/**
 * Get list of jettons (newest first)
 */
export async function getJettons(limit = 20, offset = 0) {
  const data = await apiFetch('/jettons', { limit, offset });
  return data.jettons || [];
}

/**
 * Get single jetton info
 */
export async function getJettonInfo(address) {
  return apiFetch(`/jettons/${address}`);
}

/**
 * Get jetton holders
 */
export async function getJettonHolders(address, limit = 50, offset = 0) {
  const data = await apiFetch(`/jettons/${address}/holders`, { limit, offset });
  return data.addresses || [];
}

/**
 * Get multiple jettons by addresses
 */
export async function getJettonsBulk(addresses) {
  const res = await fetch('https://tonapi.io/v2/jettons/_bulk', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ account_ids: addresses }),
  });
  if (!res.ok) throw new Error(`Bulk jetton fetch failed: ${res.status}`);
  const data = await res.json();
  return data.jettons || [];
}

/**
 * Get jetton balances for an account
 */
export async function getAccountJettons(accountId) {
  const data = await apiFetch(`/accounts/${accountId}/jettons`);
  return data.balances || [];
}

/**
 * Search for new/trending jettons (memecoins)
 * Returns newest jettons sorted by creation time
 */
export async function getNewJettons(limit = 20) {
  const jettons = await getJettons(limit, 0);
  // Filter to jettons with at least some holders (not completely dead)
  return jettons.filter(j => j.holders_count > 0);
}
