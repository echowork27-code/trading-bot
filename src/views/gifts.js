import { store } from '../store/state.js';
import { hasApiKey, getTopGiftCollections, getGiftsOnSale, getGiftHistory } from '../api/getgems.js';
import { formatNumber, formatUsd, nanoToTon, timeAgo } from '../utils/format.js';

let mounted = false;
let activeView = 'top'; // top | onsale | history | detail
let selectedCollection = null; // for drill-down

/* ── Data Loading ───────────────────────────────────────── */
async function loadTopCollections() {
  store.set('giftsLoading', true);
  try {
    const res = await getTopGiftCollections();
    store.set('ggTopCollections', res?.items || res || []);
  } catch (err) {
    console.error('Failed to load top collections:', err);
  }
  store.set('giftsLoading', false);
}

async function loadOnSale() {
  store.set('giftsOnSaleLoading', true);
  try {
    const res = await getGiftsOnSale(undefined, 50);
    store.set('ggGiftsOnSale', res?.items || res || []);
  } catch (err) {
    console.error('Failed to load gifts on sale:', err);
  }
  store.set('giftsOnSaleLoading', false);
}

async function loadHistory() {
  store.set('giftsHistoryLoading', true);
  try {
    const res = await getGiftHistory(undefined, 50);
    store.set('ggGiftHistory', res?.items || res || []);
  } catch (err) {
    console.error('Failed to load gift history:', err);
  }
  store.set('giftsHistoryLoading', false);
}

/* ── Render ──────────────────────────────────────────────── */
export function render() {
  const tonPrice = store.get('tonPrice');
  const tonUsd = tonPrice?.price || 0;

  if (!hasApiKey()) {
    return renderNoKey();
  }

  let html = '';

  // Filter pills
  const pills = [
    { id: 'top', label: '🏆 Top' },
    { id: 'onsale', label: '🛒 Deals' },
    { id: 'history', label: '📜 Sales' },
  ];

  html += `<div class="filter-row">`;
  pills.forEach(p => {
    html += `<button class="filter-pill ${p.id === activeView ? 'active' : ''}" data-filter="${p.id}">${p.label}</button>`;
  });
  html += `</div>`;

  switch (activeView) {
    case 'top':
      html += renderTopCollections(tonUsd);
      break;
    case 'onsale':
      html += renderOnSale(tonUsd);
      break;
    case 'history':
      html += renderHistory(tonUsd);
      break;
  }

  return html;
}

/* ── Top Collections ─────────────────────────────────────── */
function renderTopCollections(tonUsd) {
  const loading = store.get('giftsLoading');
  const items = store.get('ggTopCollections') || [];

  if (loading && items.length === 0) {
    return skeleton(6);
  }

  let html = `
    <div class="section-header">
      <span class="section-title">Top Gift Collections</span>
      <span class="refresh-hint">${loading ? '⟳' : ''}</span>
    </div>
  `;

  if (items.length === 0) {
    return html + empty('🏆', 'Loading top collections...');
  }

  items.forEach((item, i) => {
    const col = item.collection || item;
    const name = col.name || 'Unknown';
    const img = col.imageSizes?.['96'] || col.image || '';
    const floor = item.floorPrice;
    const diff = item.diffPercent;
    const volNano = item.value ? Number(item.value) : 0;
    const volTon = volNano ? nanoToTon(volNano) : 0;
    const volStr = volTon >= 1_000_000 ? (volTon / 1_000_000).toFixed(1) + 'M' :
                   volTon >= 1_000 ? (volTon / 1_000).toFixed(1) + 'K' :
                   volTon.toFixed(0);
    const floorStr = floor >= 1000 ? (floor / 1000).toFixed(1) + 'K' : floor?.toFixed(floor >= 10 ? 1 : 2);
    const diffStr = diff !== undefined ? (diff > 0 ? '+' : '') + diff.toFixed(0) + '%' : '';
    const diffColor = diff > 0 ? 'var(--green)' : diff < 0 ? 'var(--red)' : 'var(--tg-theme-hint-color)';
    const floorUsd = floor && tonUsd ? floor * tonUsd : null;
    const addr = col.address || '';

    html += `
      <div class="card" style="padding:10px 12px;margin-bottom:8px;cursor:pointer" data-collection-addr="${esc(addr)}" data-collection-name="${esc(name)}">
        <div style="display:flex;align-items:center;gap:12px">
          <div style="position:relative;flex-shrink:0">
            <span style="position:absolute;top:-4px;left:-4px;font-size:10px;font-weight:700;color:var(--tg-theme-hint-color)">${i + 1}</span>
            <div style="width:48px;height:48px;border-radius:12px;overflow:hidden;background:var(--card-border)">
              ${img ? `<img src="${esc(img)}" width="48" height="48" style="object-fit:cover" loading="lazy" onerror="this.style.display='none'" />` : ''}
            </div>
          </div>
          <div style="flex:1;min-width:0">
            <div style="font-size:15px;font-weight:600;white-space:nowrap;overflow:hidden;text-overflow:ellipsis">${esc(name)}</div>
            <div style="font-size:12px;color:var(--tg-theme-hint-color);margin-top:1px">
              Floor: ${floorStr ? floorStr + ' TON' : '—'}${floorUsd ? ' · ' + formatUsd(floorUsd) : ''}
            </div>
          </div>
          <div style="text-align:right;flex-shrink:0">
            <div style="font-size:14px;font-weight:700">
              <span style="color:var(--tg-theme-hint-color);font-size:11px">💎</span> ${volStr}
            </div>
            ${diffStr ? `<div style="font-size:12px;font-weight:600;color:${diffColor}">${diffStr}</div>` : ''}
          </div>
        </div>
      </div>
    `;
  });

  return html;
}

/* ── On Sale (Deals) ─────────────────────────────────────── */
function renderOnSale(tonUsd) {
  const loading = store.get('giftsOnSaleLoading');
  const items = store.get('ggGiftsOnSale') || [];

  if (loading && items.length === 0) return skeleton(5);

  let html = `
    <div class="section-header">
      <span class="section-title">🛒 Gifts For Sale</span>
      <span class="refresh-hint">${loading ? '⟳' : items.length + ' listed'}</span>
    </div>
  `;

  if (items.length === 0) return html + empty('🛒', 'Loading deals...');

  items.forEach(item => {
    const name = item.name || 'Gift';
    const img = item.imageSizes?.['96'] || item.image || '';
    const sale = item.sale || {};
    const priceTon = sale.fullPrice ? nanoToTon(Number(sale.fullPrice)) :
                     sale.lastBidAmount ? nanoToTon(Number(sale.lastBidAmount)) : null;
    const priceUsd = priceTon && tonUsd ? priceTon * tonUsd : null;
    const type = sale.type === 'FixPriceSale' ? 'Buy Now' : sale.type === 'Auction' ? '⏰ Auction' : 'Sale';
    const attrs = (item.attributes || []).map(a => a.value);
    const model = attrs[0] || '';
    const backdrop = attrs[1] || '';
    const symbol = attrs[2] || '';
    const traitLine = [model, backdrop].filter(Boolean).join(' · ');
    const nftAddr = item.address || '';
    const getgemsUrl = `https://getgems.io/nft/${nftAddr}`;

    html += `
      <div class="card" style="padding:10px 12px;margin-bottom:8px" data-nft-url="${esc(getgemsUrl)}">
        <div style="display:flex;align-items:center;gap:10px">
          <div style="width:52px;height:52px;border-radius:10px;overflow:hidden;background:var(--card-border);flex-shrink:0">
            ${img ? `<img src="${esc(img)}" width="52" height="52" style="object-fit:cover" loading="lazy" onerror="this.style.display='none'" />` : ''}
          </div>
          <div style="flex:1;min-width:0">
            <div style="font-size:14px;font-weight:600;white-space:nowrap;overflow:hidden;text-overflow:ellipsis">${esc(name)}</div>
            <div style="font-size:11px;color:var(--tg-theme-hint-color);margin-top:2px">${esc(traitLine)}</div>
            <div style="display:inline-block;margin-top:3px;font-size:10px;font-weight:600;padding:2px 6px;border-radius:4px;background:${sale.type === 'FixPriceSale' ? 'rgba(52,199,89,0.15);color:var(--green)' : 'rgba(255,149,0,0.15);color:var(--orange)'}">${type}</div>
          </div>
          <div style="text-align:right;flex-shrink:0">
            ${priceTon ? `
              <div style="font-size:15px;font-weight:700">${priceTon >= 1000 ? (priceTon/1000).toFixed(1)+'K' : priceTon.toFixed(1)} <span style="font-size:11px;color:var(--tg-theme-hint-color)">TON</span></div>
              ${priceUsd ? `<div style="font-size:11px;color:var(--tg-theme-hint-color)">${formatUsd(priceUsd)}</div>` : ''}
            ` : ''}
          </div>
        </div>
      </div>
    `;
  });

  return html;
}

/* ── Sale History ────────────────────────────────────────── */
function renderHistory(tonUsd) {
  const loading = store.get('giftsHistoryLoading');
  const items = store.get('ggGiftHistory') || [];

  if (loading && items.length === 0) return skeleton(5);

  let html = `
    <div class="section-header">
      <span class="section-title">📜 Recent Sales</span>
      <span class="refresh-hint">${loading ? '⟳' : ''}</span>
    </div>
  `;

  if (items.length === 0) return html + empty('📜', 'Loading sales...');

  items.forEach(item => {
    const name = item.nftName || item.name || 'Gift';
    const img = item.nftImageSizes?.['96'] || item.nftImage || item.imageSizes?.['96'] || item.image || '';
    const priceTon = item.price ? nanoToTon(Number(item.price)) :
                     item.fullPrice ? nanoToTon(Number(item.fullPrice)) : null;
    const priceUsd = priceTon && tonUsd ? priceTon * tonUsd : null;
    const date = item.createdAt ? timeAgo(Math.floor(new Date(item.createdAt).getTime() / 1000)) :
                 item.date ? timeAgo(Math.floor(new Date(item.date).getTime() / 1000)) : '';

    html += `
      <div class="card" style="padding:10px 12px;margin-bottom:6px">
        <div style="display:flex;align-items:center;gap:10px">
          <div style="width:44px;height:44px;border-radius:10px;overflow:hidden;background:var(--card-border);flex-shrink:0">
            ${img ? `<img src="${esc(img)}" width="44" height="44" style="object-fit:cover" loading="lazy" onerror="this.style.display='none'" />` : ''}
          </div>
          <div style="flex:1;min-width:0">
            <div style="font-size:14px;font-weight:600;white-space:nowrap;overflow:hidden;text-overflow:ellipsis">${esc(name)}</div>
            <div style="font-size:11px;color:var(--green);margin-top:1px">✓ Sold ${date}</div>
          </div>
          <div style="text-align:right;flex-shrink:0">
            ${priceTon ? `
              <div style="font-size:14px;font-weight:700">${priceTon >= 1000 ? (priceTon/1000).toFixed(1)+'K' : priceTon.toFixed(1)} <span style="font-size:11px;color:var(--tg-theme-hint-color)">TON</span></div>
              ${priceUsd ? `<div style="font-size:11px;color:var(--tg-theme-hint-color)">${formatUsd(priceUsd)}</div>` : ''}
            ` : ''}
          </div>
        </div>
      </div>
    `;
  });

  return html;
}

/* ── No API Key State ────────────────────────────────────── */
function renderNoKey() {
  return `
    <div class="empty-state" style="padding:60px 20px">
      <div class="empty-state-icon">🔑</div>
      <div class="empty-state-text">
        Getgems API key needed<br/><br/>
        <span style="font-size:13px">
          1. Go to <a href="https://getgems.io/public-api" target="_blank" style="color:var(--tg-theme-link-color)">getgems.io/public-api</a><br/>
          2. Connect wallet & create key<br/>
          3. Message @nfton_bot for Gift API access
        </span>
      </div>
    </div>
  `;
}

/* ── Utilities ───────────────────────────────────────────── */
function esc(str) {
  if (!str) return '';
  const el = document.createElement('span');
  el.textContent = str;
  return el.innerHTML;
}

function skeleton(n) {
  return Array.from({ length: n }, () => '<div class="skeleton skeleton-card" style="height:68px"></div>').join('');
}

function empty(icon, text) {
  return `<div class="empty-state"><div class="empty-state-icon">${icon}</div><div class="empty-state-text">${text}</div></div>`;
}

/* ── Lifecycle ───────────────────────────────────────────── */
export function mount() {
  if (!mounted) {
    mounted = true;
    if (hasApiKey()) {
      loadTopCollections();
    }
  }
}

export function refresh() {
  if (!hasApiKey()) return;
  switch (activeView) {
    case 'top': loadTopCollections(); break;
    case 'onsale': loadOnSale(); break;
    case 'history': loadHistory(); break;
  }
}

export function onInteract(e) {
  // Filter pills
  const pill = e.target.closest('.filter-pill');
  if (pill) {
    const f = pill.dataset.filter;
    if (f && f !== activeView) {
      activeView = f;
      // Lazy load data
      if (f === 'onsale' && !(store.get('ggGiftsOnSale') || []).length) loadOnSale();
      if (f === 'history' && !(store.get('ggGiftHistory') || []).length) loadHistory();
      return true;
    }
    return false;
  }

  // Collection card click → open Getgems collection page in-app
  const colCard = e.target.closest('[data-collection-name]');
  if (colCard) {
    const name = colCard.dataset.collectionName;
    if (name) {
      const slug = name.toLowerCase().replace(/['']/g, '').replace(/\s+/g, '');
      window.open(`https://getgems.io/gifts/${slug}`, '_blank');
    }
    return false;
  }

  // NFT card click → open on Getgems
  const nftCard = e.target.closest('[data-nft-url]');
  if (nftCard) {
    const url = nftCard.dataset.nftUrl;
    if (url) window.open(url, '_blank');
    return false;
  }

  return false;
}
