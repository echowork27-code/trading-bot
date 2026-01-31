import { store } from '../store/state.js';
import { GIFT_COLLECTIONS, TOTAL_GIFTS, TIER_CONFIG, TIER_COUNTS } from '../data/gift-collections.js';
import { getFragmentCollectionUrl } from '../api/fragment.js';
import { hasApiKey, getGiftCollections, getTopGiftCollections, getGiftsOnSale, getGiftHistory } from '../api/getgems.js';
import { formatNumber, formatUsd, nanoToTon, timeAgo } from '../utils/format.js';

/* ── Local UI state ─────────────────────────────────────── */
let activeFilter = 'hot';   // hot | rare | all | live | history
let searchQuery  = '';
let mounted      = false;

/* ── Helpers ────────────────────────────────────────────── */
function escHtml(str) {
  if (!str) return '';
  const el = document.createElement('span');
  el.textContent = str;
  return el.innerHTML;
}

function tierBadge(t) {
  const cfg = TIER_CONFIG[t];
  if (!cfg) return '';
  return `<span class="card-badge" style="background:${cfg.bg};color:${cfg.color}">${cfg.label}</span>`;
}

const bySupplyAsc = (a, b) => a.supply - b.supply;

function getFilteredCollections() {
  let list = [...GIFT_COLLECTIONS];

  if (searchQuery.trim()) {
    const q = searchQuery.trim().toLowerCase();
    list = list.filter(c =>
      c.name.toLowerCase().includes(q) ||
      c.tier.includes(q)
    );
  }

  switch (activeFilter) {
    case 'hot':
      list.sort(bySupplyAsc);
      list = list.slice(0, 30);
      break;
    case 'rare':
      list.sort(bySupplyAsc);
      break;
    case 'all':
    default:
      list.sort((a, b) => a.name.localeCompare(b.name));
      break;
  }
  return list;
}

/* ── Getgems data loading ───────────────────────────────── */
async function loadLiveData() {
  if (!hasApiKey()) return;
  store.set('giftsLoading', true);
  try {
    const [collections, onSale, history] = await Promise.allSettled([
      getTopGiftCollections(),
      getGiftsOnSale(undefined, 30),
      getGiftHistory(undefined, 30),
    ]);

    if (collections.status === 'fulfilled') {
      store.set('ggGiftCollections', collections.value);
    }
    if (onSale.status === 'fulfilled') {
      store.set('ggGiftsOnSale', onSale.value?.items || onSale.value || []);
    }
    if (history.status === 'fulfilled') {
      store.set('ggGiftHistory', history.value?.items || history.value || []);
    }
  } catch (err) {
    console.error('Getgems data load failed:', err);
  }
  store.set('giftsLoading', false);
}

/* ── Render ──────────────────────────────────────────────── */
export function render() {
  const apiAvailable = hasApiKey();
  const loading = store.get('giftsLoading');
  const tonPrice = store.get('tonPrice');
  const tonUsd = tonPrice?.price || 0;

  let html = '';

  /* ─ Market Overview ─ */
  html += `
    <div class="section-header">
      <span class="section-title">🎁 Gift Market</span>
      <span class="refresh-hint">${loading ? '⟳' : ''}</span>
    </div>
    <div class="card">
      <div class="card-stats" style="justify-content:space-between">
        <div class="stat">
          <span class="stat-label">Collections</span>
          <span class="stat-value">${GIFT_COLLECTIONS.length}</span>
        </div>
        <div class="stat">
          <span class="stat-label">Total Gifts</span>
          <span class="stat-value">${formatNumber(TOTAL_GIFTS)}</span>
        </div>
        <div class="stat">
          <span class="stat-label">Legendary</span>
          <span class="stat-value" style="color:#FFD700">${TIER_COUNTS.legendary || 0}</span>
        </div>
        <div class="stat">
          <span class="stat-label">Epic</span>
          <span class="stat-value" style="color:#AF52DE">${TIER_COUNTS.epic || 0}</span>
        </div>
      </div>
      ${!apiAvailable ? `
        <div style="margin-top:10px;padding:8px 12px;border-radius:8px;background:rgba(255,149,0,0.1);font-size:12px;color:var(--orange)">
          ⚡ Add Getgems API key for live floor prices & sales data
        </div>
      ` : ''}
    </div>
  `;

  /* ─ Filter pills ─ */
  const pills = [
    { id: 'hot', label: '🔥 Hot' },
    { id: 'rare', label: '💎 Rare' },
    { id: 'all', label: '📊 All' },
  ];

  // Add live data tabs when API is available
  if (apiAvailable) {
    pills.push({ id: 'live', label: '🛒 On Sale' });
    pills.push({ id: 'history', label: '📜 Sales' });
  }

  html += `<div class="filter-row">`;
  pills.forEach(p => {
    const cls = p.id === activeFilter ? 'filter-pill active' : 'filter-pill';
    html += `<button class="${cls}" data-filter="${p.id}">${p.label}</button>`;
  });
  html += `<button class="filter-pill${activeFilter === 'search' ? ' active' : ''}" data-filter="search">🔍</button>`;
  html += `</div>`;

  /* Search input */
  if (activeFilter === 'search' || searchQuery) {
    html += `
      <div style="margin-bottom:12px">
        <input id="gift-search" type="text" placeholder="Search collections..."
          value="${escHtml(searchQuery)}"
          style="width:100%;padding:10px 14px;border-radius:var(--radius-sm);border:1px solid var(--card-border);background:var(--card-bg);color:var(--tg-theme-text-color);font-size:14px;outline:none;" />
      </div>
    `;
  }

  /* ─ Live tabs (Getgems API) ─ */
  if (activeFilter === 'live') {
    html += renderLiveOnSale(tonUsd);
    return html + renderFooter();
  }

  if (activeFilter === 'history') {
    html += renderSaleHistory(tonUsd);
    return html + renderFooter();
  }

  /* ─ Static collection list ─ */
  const collections = getFilteredCollections();
  const sectionTitles = {
    hot: '🔥 Hot Collections',
    rare: '💎 Rarest Collections',
    all: '📊 All Collections',
    search: '🔍 Search Results',
  };
  const sectionKey = activeFilter === 'search' ? 'search' : activeFilter;
  html += `
    <div class="section-header">
      <span class="section-title">${sectionTitles[sectionKey]}</span>
      <span style="font-size:12px;color:var(--tg-theme-hint-color)">${collections.length} shown</span>
    </div>
  `;

  if (collections.length === 0) {
    html += `
      <div class="empty-state">
        <div class="empty-state-icon">🔍</div>
        <div class="empty-state-text">No collections match "${escHtml(searchQuery)}"</div>
      </div>
    `;
  } else {
    // Check if we have Getgems enrichment data
    const ggCollections = store.get('ggGiftCollections');
    const ggMap = {};
    if (Array.isArray(ggCollections)) {
      ggCollections.forEach(c => {
        const slug = (c.slug || c.name || '').toLowerCase().replace(/[^a-z0-9]/g, '');
        ggMap[slug] = c;
      });
    }

    collections.forEach(col => {
      const fragmentUrl = getFragmentCollectionUrl(col.slug);
      const getgemsUrl = `https://getgems.io/gifts/${col.slug}`;

      // Try to find Getgems enrichment
      const cleanSlug = col.slug.replace(/[^a-z0-9]/g, '');
      const gg = ggMap[cleanSlug];
      const floorTon = gg?.floorPrice ? nanoToTon(Number(gg.floorPrice)) : null;
      const floorUsdVal = floorTon && tonUsd ? floorTon * tonUsd : null;

      html += `
        <div class="token-row" data-gift-slug="${escHtml(col.slug)}">
          <div class="token-icon">${col.emoji}</div>
          <div class="token-info" style="gap:2px">
            <div class="token-name">${escHtml(col.name)}</div>
            <div class="token-symbol">
              ${tierBadge(col.tier)}
              <span style="margin-left:4px;font-size:11px;color:var(--tg-theme-hint-color)">Supply: ${formatNumber(col.supply)}</span>
            </div>
          </div>
          <div class="token-price-col" style="text-align:right">
            ${floorTon ? `
              <div class="token-price">${floorTon.toFixed(1)} TON</div>
              <div style="font-size:11px;color:var(--tg-theme-hint-color)">${formatUsd(floorUsdVal)}</div>
            ` : ''}
            <div style="display:flex;gap:4px;justify-content:flex-end;margin-top:2px">
              <a href="${escHtml(getgemsUrl)}" target="_blank" rel="noopener"
                 onclick="event.stopPropagation()"
                 style="font-size:10px;color:var(--green);text-decoration:none;padding:2px 6px;border-radius:4px;background:rgba(52,199,89,0.1);">GG</a>
              <a href="${escHtml(fragmentUrl)}" target="_blank" rel="noopener"
                 onclick="event.stopPropagation()"
                 style="font-size:10px;color:var(--blue);text-decoration:none;padding:2px 6px;border-radius:4px;background:rgba(0,122,255,0.1);">Frag</a>
            </div>
          </div>
        </div>
      `;
    });
  }

  return html + renderFooter();
}

/* ─ Live On Sale section ─ */
function renderLiveOnSale(tonUsd) {
  const items = store.get('ggGiftsOnSale') || [];

  let html = `
    <div class="section-header">
      <span class="section-title">🛒 Gifts On Sale</span>
      <span style="font-size:12px;color:var(--tg-theme-hint-color)">${items.length} listed</span>
    </div>
  `;

  if (items.length === 0) {
    html += `
      <div class="empty-state">
        <div class="empty-state-icon">🛒</div>
        <div class="empty-state-text">Loading live listings...</div>
      </div>
    `;
    return html;
  }

  items.slice(0, 40).forEach(item => {
    const name = item.name || 'Unknown Gift';
    const image = item.image || '';
    const sale = item.sale || {};
    const priceTon = sale.lastBidAmount ? nanoToTon(Number(sale.lastBidAmount)) :
                     sale.minBid ? nanoToTon(Number(sale.minBid)) : null;
    const priceUsd = priceTon && tonUsd ? priceTon * tonUsd : null;
    const saleType = sale.type || 'Sale';
    const marketplace = 'Getgems';
    const nftAddr = item.address || '';

    html += `
      <div class="token-row" onclick="window.open('https://getgems.io/nft/${nftAddr}', '_blank')">
        <div class="token-icon">
          ${image ? `<img src="${escHtml(image)}" alt="" loading="lazy" style="width:100%;height:100%;object-fit:cover;border-radius:50%" onerror="this.parentElement.textContent='🎁'" />` : '🎁'}
        </div>
        <div class="token-info">
          <div class="token-name">${escHtml(name)}</div>
          <div class="token-symbol">${saleType} · ${marketplace}</div>
        </div>
        <div class="token-price-col">
          ${priceTon ? `
            <div class="token-price">${priceTon.toFixed(1)} TON</div>
            <div style="font-size:11px;color:var(--tg-theme-hint-color)">${priceUsd ? formatUsd(priceUsd) : ''}</div>
          ` : '<div class="token-price">—</div>'}
        </div>
      </div>
    `;
  });

  return html;
}

/* ─ Sale History section ─ */
function renderSaleHistory(tonUsd) {
  const items = store.get('ggGiftHistory') || [];

  let html = `
    <div class="section-header">
      <span class="section-title">📜 Recent Sales</span>
      <span style="font-size:12px;color:var(--tg-theme-hint-color)">${items.length} sales</span>
    </div>
  `;

  if (items.length === 0) {
    html += `
      <div class="empty-state">
        <div class="empty-state-icon">📜</div>
        <div class="empty-state-text">Loading sale history...</div>
      </div>
    `;
    return html;
  }

  items.slice(0, 40).forEach(item => {
    const name = item.nftName || item.name || 'Gift';
    const priceTon = item.price ? nanoToTon(Number(item.price)) : null;
    const priceUsd = priceTon && tonUsd ? priceTon * tonUsd : null;
    const date = item.createdAt ? timeAgo(Math.floor(new Date(item.createdAt).getTime() / 1000)) : '';
    const image = item.nftImage || item.image || '';

    html += `
      <div class="token-row">
        <div class="token-icon">
          ${image ? `<img src="${escHtml(image)}" alt="" loading="lazy" style="width:100%;height:100%;object-fit:cover;border-radius:50%" onerror="this.parentElement.textContent='🎁'" />` : '🎁'}
        </div>
        <div class="token-info">
          <div class="token-name">${escHtml(name)}</div>
          <div class="token-symbol" style="color:var(--green)">Sold ${date}</div>
        </div>
        <div class="token-price-col">
          ${priceTon ? `
            <div class="token-price">${priceTon.toFixed(1)} TON</div>
            <div style="font-size:11px;color:var(--tg-theme-hint-color)">${priceUsd ? formatUsd(priceUsd) : ''}</div>
          ` : '<div class="token-price">—</div>'}
        </div>
      </div>
    `;
  });

  return html;
}

function renderFooter() {
  return `
    <div class="card" style="margin-top:12px;text-align:center">
      <div style="font-size:12px;color:var(--tg-theme-hint-color);padding:8px 0">
        <a href="https://getgems.io/gifts" target="_blank" rel="noopener" style="color:var(--green);text-decoration:none">Getgems</a>
        &nbsp;·&nbsp;
        <a href="https://fragment.com/gifts" target="_blank" rel="noopener" style="color:var(--tg-theme-link-color);text-decoration:none">Fragment</a>
        ${hasApiKey() ? '' : '&nbsp;·&nbsp; <span style="color:var(--orange)">API key needed for live data</span>'}
      </div>
    </div>
  `;
}

/* ── Lifecycle ───────────────────────────────────────────── */
export function mount() {
  if (!mounted) {
    mounted = true;
    if (hasApiKey()) loadLiveData();
  }
}

export function refresh() {
  if (hasApiKey()) loadLiveData();
}

export function onInteract(e) {
  const pill = e.target.closest('.filter-pill');
  if (pill) {
    const f = pill.dataset.filter;
    if (f === 'search') {
      activeFilter = 'search';
    } else {
      activeFilter = f;
      // Load live data if switching to live tabs
      if ((f === 'live' || f === 'history') && hasApiKey()) {
        const storeKey = f === 'live' ? 'ggGiftsOnSale' : 'ggGiftHistory';
        if (!(store.get(storeKey) || []).length) loadLiveData();
      }
    }
    return true;
  }

  const input = e.target.closest('#gift-search');
  if (input) return false;

  const row = e.target.closest('.token-row[data-gift-slug]');
  if (row && !e.target.closest('a')) {
    const slug = row.dataset.giftSlug;
    if (slug) window.open(`https://getgems.io/gifts/${slug}`, '_blank');
    return false;
  }

  return false;
}

/* ── Search input handler ───────────────────────────────── */
let lastInputListener = null;

function hookSearchInput() {
  cancelAnimationFrame(lastInputListener);
  lastInputListener = requestAnimationFrame(() => {
    const el = document.getElementById('gift-search');
    if (el && !el._hooked) {
      el._hooked = true;
      el.addEventListener('input', (evt) => {
        searchQuery = evt.target.value;
        const content = document.getElementById('content');
        if (content) {
          content.innerHTML = render();
          hookSearchInput();
          const newEl = document.getElementById('gift-search');
          if (newEl) {
            newEl.focus();
            newEl.setSelectionRange(newEl.value.length, newEl.value.length);
          }
        }
      });
      el.focus();
    }
  });
}

if (typeof MutationObserver !== 'undefined') {
  const observer = new MutationObserver(() => {
    if (document.getElementById('gift-search')) hookSearchInput();
  });
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
      const content = document.getElementById('content');
      if (content) observer.observe(content, { childList: true });
    });
  } else {
    const content = document.getElementById('content');
    if (content) observer.observe(content, { childList: true });
  }
}
