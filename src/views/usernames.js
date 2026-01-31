import { store } from '../store/state.js';
import { getTopUsernameAuctions, getEndingSoonAuctions } from '../api/dns.js';
import { formatTon, nanoToTon, countdown, formatNumber, shortAddr, formatUsd } from '../utils/format.js';

let mounted = false;
let currentFilter = 'hot'; // 'hot' | 'ending' | 'cheap'

async function loadUsernames() {
  store.set('usernamesLoading', true);
  try {
    const auctions = await getTopUsernameAuctions();
    store.update({
      usernameAuctions: auctions,
      usernameAuctionsTotal: auctions.length,
      usernamesLoading: false,
    });
  } catch (err) {
    console.error('Failed to load username auctions:', err);
    store.set('usernamesLoading', false);
  }
}

function getSortedAuctions() {
  const auctions = store.get('usernameAuctions') || [];
  const now = Math.floor(Date.now() / 1000);

  switch (currentFilter) {
    case 'hot':
      // Most bids = most competitive
      return [...auctions].sort((a, b) => b.bids - a.bids);
    case 'ending':
      // Ending soonest
      return [...auctions]
        .filter(a => a.date > now)
        .sort((a, b) => a.date - b.date);
    case 'cheap':
      // Lowest price first
      return [...auctions].sort((a, b) => Number(a.price) - Number(b.price));
    default:
      return auctions;
  }
}

export function render() {
  const loading = store.get('usernamesLoading');
  const total = store.get('usernameAuctionsTotal') || 0;
  const tonPrice = store.get('tonPrice');
  const tonUsd = tonPrice?.price || 0;

  if (loading && total === 0) {
    return `
      <div class="section-header">
        <span class="section-title">👤 Username Auctions</span>
      </div>
      <div class="skeleton skeleton-card"></div>
      <div class="skeleton skeleton-card"></div>
      <div class="skeleton skeleton-card"></div>
      <div class="skeleton skeleton-card"></div>
    `;
  }

  const sorted = getSortedAuctions();
  const displayed = sorted.slice(0, 30);

  let html = `
    <div class="section-header">
      <span class="section-title">👤 Username Auctions</span>
      <span class="refresh-hint">${loading ? '⟳' : `${formatNumber(total)} active`}</span>
    </div>

    <div class="filter-row">
      <button class="filter-pill ${currentFilter === 'hot' ? 'active' : ''}" data-filter="hot">🔥 Hot</button>
      <button class="filter-pill ${currentFilter === 'ending' ? 'active' : ''}" data-filter="ending">⏰ Ending Soon</button>
      <button class="filter-pill ${currentFilter === 'cheap' ? 'active' : ''}" data-filter="cheap">💰 Cheapest</button>
    </div>
  `;

  if (displayed.length === 0) {
    html += `
      <div class="empty-state">
        <div class="empty-state-icon">👤</div>
        <div class="empty-state-text">No auctions found</div>
      </div>
    `;
    return html;
  }

  displayed.forEach(auction => {
    const domain = auction.domain || '';
    const displayName = domain.replace('.t.me', '');
    const priceTon = nanoToTon(auction.price);
    const priceUsd = priceTon * tonUsd;
    const bids = auction.bids || 0;
    const endsAt = auction.date;
    const timeLeft = countdown(endsAt);
    const isEndingSoon = (endsAt - Math.floor(Date.now() / 1000)) < 3600; // < 1h

    // Simple "deal score" heuristic: lower price + more bids = more interest
    const bidScore = bids > 10 ? 'hot' : bids > 5 ? 'bid' : '';

    html += `
      <div class="card" onclick="window.open('https://fragment.com/username/${encodeURIComponent(displayName)}', '_blank')">
        <div class="card-header">
          <div>
            <div class="card-title">@${escHtml(displayName)}</div>
            <div class="card-subtitle">${domain}</div>
          </div>
          <div style="text-align:right">
            <span class="auction-timer${isEndingSoon ? ' style="color:var(--red)"' : ''}">${timeLeft}</span>
            ${bidScore ? `<div class="card-badge ${bidScore}" style="margin-top:4px">${bids} bids</div>` : `<div class="card-subtitle">${bids} bid${bids !== 1 ? 's' : ''}</div>`}
          </div>
        </div>
        <div class="card-stats">
          <div class="stat">
            <span class="stat-label">Current Price</span>
            <span class="stat-value">${priceTon.toFixed(2)} TON</span>
          </div>
          <div class="stat">
            <span class="stat-label">USD</span>
            <span class="stat-value">${formatUsd(priceUsd)}</span>
          </div>
        </div>
        <div class="bid-bar">
          <div class="bid-bar-fill" style="width: ${Math.min(bids * 5, 100)}%"></div>
        </div>
      </div>
    `;
  });

  return html;
}

function escHtml(str) {
  const el = document.createElement('span');
  el.textContent = str;
  return el.innerHTML;
}

/**
 * Handle filter clicks
 */
export function onInteract(e) {
  const pill = e.target.closest('.filter-pill');
  if (pill) {
    currentFilter = pill.dataset.filter;
    return true; // signal re-render needed
  }
  return false;
}

export function mount() {
  if (!mounted) {
    mounted = true;
    loadUsernames();
  }
}

export function refresh() {
  loadUsernames();
}
