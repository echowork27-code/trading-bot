import { API_BASE } from '../utils/constants.js';

/**
 * Base fetch wrapper for TON API
 */
async function apiFetch(path, params = {}) {
  const url = new URL(`${API_BASE}${path}`);
  Object.entries(params).forEach(([k, v]) => {
    if (v !== undefined && v !== null) {
      url.searchParams.set(k, String(v));
    }
  });

  const res = await fetch(url.toString(), {
    headers: {
      'Accept': 'application/json',
    },
  });

  if (!res.ok) {
    const body = await res.text();
    throw new Error(`TON API ${res.status}: ${body}`);
  }

  return res.json();
}

export { apiFetch };
