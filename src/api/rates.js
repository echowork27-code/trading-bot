import { apiFetch } from './tonapi.js';

/**
 * Get current rates for tokens
 * @param {string[]} tokens - token addresses or 'ton'
 * @param {string[]} currencies - e.g. ['usd', 'ton']
 */
export async function getRates(tokens, currencies = ['usd']) {
  const data = await apiFetch('/rates', {
    tokens: tokens.join(','),
    currencies: currencies.join(','),
  });
  return data.rates || {};
}

/**
 * Get price chart data
 * @param {string} token - address or 'ton'
 * @param {string} currency
 * @param {number} startDate - unix timestamp
 * @param {number} endDate - unix timestamp
 */
export async function getChart(token, currency = 'usd', startDate, endDate) {
  const now = Math.floor(Date.now() / 1000);
  const data = await apiFetch('/rates/chart', {
    token,
    currency,
    start_date: startDate || now - 86400, // default 24h ago
    end_date: endDate || now,
  });
  return data.points || [];
}

/**
 * Get TON price with change
 */
export async function getTonPrice() {
  const rates = await getRates(['ton'], ['usd']);
  const ton = rates['TON'];
  if (!ton) return null;
  return {
    price: ton.prices?.USD || 0,
    diff24h: ton.diff_24h?.USD || '0%',
    diff7d: ton.diff_7d?.USD || '0%',
    diff30d: ton.diff_30d?.USD || '0%',
  };
}
