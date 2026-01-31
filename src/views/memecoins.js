import { store } from '../store/state.js';
import { getJettonInfo, getNewJettons } from '../api/jettons.js';
import { getRates } from '../api/rates.js';
import { TRACKED_JETTONS, JETTONS } from '../utils/constants.js';
import { formatUsd, formatChange, formatNumber } from '../utils/format.js';

let mounted = false;
let currentFilter = 'tracked'; // 'tracked' | 'new'

// Human-readable names for known jettons
const JETTON_NAMES = {
  [JETTONS.NOT]: { name: 'Notcoin', symbol: 'NOT', emoji: '⚡' },
  [JETTONS.DOGS]: { name: 'DOGS', symbol: 'DOGS', emoji: '🐕' },
  [JETTONS.CATI]: { name: 'Catizen', symbol: 'CATI', emoji: '🐱' },
  [JETTONS.HMSTR]: { name: 'Hamster Kombat', symbol: 'HMSTR', emoji: '🐹' },
  [JETTONS.SCALE]: { name: 'SCALE', symbol: 'SCALE', emoji: '⚖️' },
  [JETTONS.REDO]: { name: 'REDO', symbol: 'REDO', emoji: '🔄' },
};

async function loadTrackedTokens() {
  store.set('memecoinsLoading', true);
  try {
    // Fetch prices for all tracked jettons + TON
    const tokens = [...TRACKED_JETTONS];
    const rates = await getRates(tokens, ['usd', 'ton']);

    const enriched = tokens.map(addr => {
      const known = JETTON_NAMES[addr];
      const rate = rates[addr];
      const price = rate?.prices?.USD || 0;
      const diff24h = rate?.diff_24h?.USD || '0';
      const diff7d = rate?.diff_7d?.USD || '0';

      return {
        address: addr,
        name: known?.name || addr.slice(0, 8) + '...',
        symbol: known?.symbol || '???',
        emoji: known?.emoji || '🪙',
        image: rate?.image || null,
        price,
        diff24h,
        diff7d,
      };
    });

    // Also try to get holder counts (bulk info)
    const withHolders = await Promise.all(
      enriched.map(async (token) => {
        try {
          const info = await getJettonInfo(token.address);
          return {
            ...token,
            holders: info.holders_count || 0,
            totalSupply: info.total_supply || '0',
            image: info.metadata?.image || token.image,
            name: info.metadata?.name || token.name,
            symbol: info.metadata?.symbol || token.symbol,
          };
        } catch {
          return { ...token, holders: 0 };
        }
      })
    );

    store.update({
      trackedTokens: withHolders,
      memecoinsLoading: false,
    });
  } catch (err) {
    console.error('Failed to load tracked tokens:', err);
    store.set('memecoinsLoading', false);
  }
}

async function loadNewTokens() {
  try {
    const newJettons = await getNewJettons(20);
    
    // Get prices for new tokens if possible
    const addresses = newJettons.map(j => j.address).slice(0, 10);
    let rates = {};
    try {
      rates = await getRates(addresses, ['usd']);
    } catch { /* some new tokens won't have prices */ }

    const enriched = newJettons.map(j => {
      const rate = rates[j.address];
      return {
        address: j.address,
        name: j.metadata?.name || 'Unknown',
        symbol: j.metadata?.symbol || '???',
        image: j.metadata?.image || null,
        emoji: '🆕',
        holders: j.holders_count || 0,
        price: rate?.prices?.USD || 0,
        diff24h: rate?.diff_24h?.USD || '0',
      };
    });

    store.set('newTokens', enriched);
  } catch (err) {
    console.error('Failed to load new tokens:', err);
  }
}

export function render() {
  const loading = store.get('memecoinsLoading');
  const tracked = store.get('trackedTokens') || [];
  const newTokens = store.get('newTokens') || [];

  if (loading && tracked.length === 0) {
    return `
      <div class="section-header">
        <span class="section-title">🚀 TON Tokens</span>
      </div>
      <div class="skeleton skeleton-row"></div>
      <div class="skeleton skeleton-row"></div>
      <div class="skeleton skeleton-row"></div>
      <div class="skeleton skeleton-row"></div>
      <div class="skeleton skeleton-row"></div>
    `;
  }

  let html = `
    <div class="section-header">
      <span class="section-title">🚀 TON Tokens</span>
      <span class="refresh-hint">${loading ? '⟳' : ''}</span>
    </div>

    <div class="filter-row">
      <button class="filter-pill ${currentFilter === 'tracked' ? 'active' : ''}" data-filter="tracked">📊 Tracked</button>
      <button class="filter-pill ${currentFilter === 'new' ? 'active' : ''}" data-filter="new">🆕 New Tokens</button>
    </div>
  `;

  const tokens = currentFilter === 'tracked' ? tracked : newTokens;

  if (tokens.length === 0) {
    html += `
      <div class="empty-state">
        <div class="empty-state-icon">${currentFilter === 'new' ? '🆕' : '🚀'}</div>
        <div class="empty-state-text">
          ${currentFilter === 'new' ? 'Loading new tokens...' : 'No tracked tokens yet'}
        </div>
      </div>
    `;
    return html;
  }

  // Sort tracked by price descending
  const sorted = [...tokens].sort((a, b) => (b.price || 0) - (a.price || 0));

  sorted.forEach(token => {
    const change = formatChange(token.diff24h);
    const hasImage = token.image && !token.image.includes('data:');

    html += `
      <div class="token-row" onclick="window.open('https://tonviewer.com/${token.address}', '_blank')">
        <div class="token-icon">
          ${hasImage ? `<img src="${escHtml(token.image)}" alt="" loading="lazy" onerror="this.parentElement.textContent='${token.emoji}'"/>` : token.emoji}
        </div>
        <div class="token-info">
          <div class="token-name">${escHtml(token.symbol)}</div>
          <div class="token-symbol">${escHtml(token.name)}${token.holders ? ` · ${formatNumber(token.holders)} holders` : ''}</div>
        </div>
        <div class="token-price-col">
          <div class="token-price">${token.price ? formatUsd(token.price) : '—'}</div>
          <div class="token-change ${change.dir}">${change.text}</div>
        </div>
      </div>
    `;
  });

  // Quick market summary for tracked view
  if (currentFilter === 'tracked' && tracked.length > 0) {
    const gainers = tracked.filter(t => {
      const n = parseFloat(String(t.diff24h).replace(/[^0-9.-]/g, ''));
      return n > 0;
    }).length;
    const losers = tracked.length - gainers;

    html += `
      <div class="card" style="margin-top: 12px; text-align:center;">
        <div style="display:flex; justify-content:center; gap:24px;">
          <div class="stat">
            <span class="stat-label">Gainers</span>
            <span class="stat-value up">${gainers}</span>
          </div>
          <div class="stat">
            <span class="stat-label">Losers</span>
            <span class="stat-value down">${losers}</span>
          </div>
          <div class="stat">
            <span class="stat-label">Tracking</span>
            <span class="stat-value">${tracked.length}</span>
          </div>
        </div>
      </div>
    `;
  }

  return html;
}

function escHtml(str) {
  if (!str) return '';
  const el = document.createElement('span');
  el.textContent = str;
  return el.innerHTML;
}

export function onInteract(e) {
  const pill = e.target.closest('.filter-pill');
  if (pill) {
    const newFilter = pill.dataset.filter;
    if (newFilter !== currentFilter) {
      currentFilter = newFilter;
      if (newFilter === 'new' && (store.get('newTokens') || []).length === 0) {
        loadNewTokens();
      }
      return true; // re-render
    }
  }
  return false;
}

export function mount() {
  if (!mounted) {
    mounted = true;
    loadTrackedTokens();
  }
}

export function refresh() {
  loadTrackedTokens();
  if (currentFilter === 'new') loadNewTokens();
}
