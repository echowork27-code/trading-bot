import { store } from '../store/state.js';
import { getCollection, getCollectionItems } from '../api/nft.js';
import { formatUsd, nanoToTon, formatNumber } from '../utils/format.js';

// Curated Telegram Gift NFT collections (real ones only)
const GIFT_COLLECTIONS = [
  {
    address: 'EQDmkj65Ab_m0aZaW8IpKw4kYqIgITw_HRstYEkVQ6NIYCyW',
    name: 'Telegram Gifts',
    emoji: '🎁',
  },
  // Plush Pepe — the most traded TON gift collection
  {
    address: 'EQCZ_bksSMU9Ik2sYx9HdOXEMLEC_ZEifSssa6oYev1PLUSH',
    name: 'Plush Pepe',
    emoji: '🐸',
  },
];

let mounted = false;

async function loadGifts() {
  store.set('giftsLoading', true);
  try {
    const enriched = await Promise.all(
      GIFT_COLLECTIONS.map(async ({ address, name: fallbackName, emoji }) => {
        try {
          // Get collection metadata
          let col;
          try {
            col = await getCollection(address);
          } catch {
            col = {};
          }
          
          // Get items (first 50)
          let items = [];
          try {
            items = await getCollectionItems(address, 50, 0);
          } catch { /* empty */ }

          const onSale = items.filter(i => i.sale);
          const floorPrice = onSale.length > 0
            ? Math.min(...onSale.map(i => Number(i.sale?.price?.value || 0)))
            : null;

          return {
            address,
            name: col?.metadata?.name || fallbackName,
            description: col?.metadata?.description || '',
            image: col?.previews?.[1]?.url || col?.metadata?.image || '',
            emoji,
            items,
            onSaleCount: onSale.length,
            totalItems: col?.next_item_index || items.length,
            floorPrice,
            onSaleItems: onSale.sort((a, b) => 
              Number(a.sale?.price?.value || 0) - Number(b.sale?.price?.value || 0)
            ).slice(0, 10),
          };
        } catch {
          return {
            address,
            name: fallbackName,
            emoji,
            items: [],
            onSaleCount: 0,
            totalItems: 0,
            floorPrice: null,
            onSaleItems: [],
          };
        }
      })
    );

    store.update({
      giftCollections: enriched,
      giftsLoading: false,
    });
  } catch (err) {
    console.error('Failed to load gifts:', err);
    store.set('giftsLoading', false);
  }
}

export function render() {
  const loading = store.get('giftsLoading');
  const collections = store.get('giftCollections') || [];
  const tonPrice = store.get('tonPrice');
  const tonUsd = tonPrice?.price || 0;

  if (loading && collections.length === 0) {
    return `
      <div class="section-header">
        <span class="section-title">🎁 Telegram Gifts</span>
      </div>
      <div class="skeleton skeleton-card"></div>
      <div class="skeleton skeleton-card"></div>
    `;
  }

  let html = `
    <div class="section-header">
      <span class="section-title">🎁 Gift Collections</span>
      <span class="refresh-hint">${loading ? '⟳' : ''}</span>
    </div>
  `;

  if (collections.length === 0) {
    html += `
      <div class="empty-state">
        <div class="empty-state-icon">🎁</div>
        <div class="empty-state-text">Loading gift collections...</div>
      </div>
    `;
    return html;
  }

  // Collection overview cards
  collections.forEach(col => {
    const floorTon = col.floorPrice ? nanoToTon(col.floorPrice) : null;
    const floorUsdVal = floorTon && tonUsd ? floorTon * tonUsd : null;

    html += `
      <div class="card">
        <div class="card-header">
          <div>
            <div class="card-title">${col.emoji} ${escHtml(col.name)}</div>
            ${col.description ? `<div class="card-subtitle">${escHtml(col.description.slice(0, 80))}</div>` : ''}
          </div>
          ${col.onSaleCount > 0 ? `<span class="card-badge hot">🔥 ${col.onSaleCount} listed</span>` : '<span class="card-badge" style="background:rgba(142,142,147,0.2);color:var(--tg-theme-hint-color)">0 listed</span>'}
        </div>
        <div class="card-stats">
          <div class="stat">
            <span class="stat-label">Floor</span>
            <span class="stat-value">${floorTon ? `${floorTon.toFixed(2)} TON` : '—'}</span>
          </div>
          <div class="stat">
            <span class="stat-label">USD</span>
            <span class="stat-value">${floorUsdVal ? formatUsd(floorUsdVal) : '—'}</span>
          </div>
          <div class="stat">
            <span class="stat-label">Total</span>
            <span class="stat-value">${formatNumber(col.totalItems)}</span>
          </div>
        </div>
      </div>
    `;

    // Show cheapest listed items
    if (col.onSaleItems && col.onSaleItems.length > 0) {
      html += `
        <div class="section-header" style="margin-top:4px">
          <span class="section-title" style="font-size:12px">💰 Best Deals — ${escHtml(col.name)}</span>
        </div>
      `;

      col.onSaleItems.slice(0, 5).forEach(item => {
        const name = item.metadata?.name || 'Unknown';
        const priceTon = nanoToTon(Number(item.sale?.price?.value || 0));
        const priceUsd = priceTon * tonUsd;
        const marketplace = item.sale?.market_name || 'Unknown';
        const image = item.previews?.[0]?.url || '';

        html += `
          <div class="token-row" onclick="window.open('https://getgems.io/nft/${item.address}', '_blank')">
            <div class="token-icon">
              ${image ? `<img src="${escHtml(image)}" alt="" loading="lazy" onerror="this.parentElement.textContent='${col.emoji}'"/>` : col.emoji}
            </div>
            <div class="token-info">
              <div class="token-name">${escHtml(name)}</div>
              <div class="token-symbol">${marketplace}</div>
            </div>
            <div class="token-price-col">
              <div class="token-price">${priceTon.toFixed(2)} TON</div>
              <div class="token-change" style="color:var(--tg-theme-hint-color)">${formatUsd(priceUsd)}</div>
            </div>
          </div>
        `;
      });
    }
  });

  html += `
    <div class="card" style="margin-top:16px; text-align:center;">
      <div style="font-size:13px; color:var(--tg-theme-hint-color); padding:12px 0;">
        💡 More collections coming soon<br/>
        TonConnect wallet integration in Phase 2
      </div>
    </div>
  `;

  return html;
}

function escHtml(str) {
  if (!str) return '';
  const el = document.createElement('span');
  el.textContent = str;
  return el.innerHTML;
}

export function mount() {
  if (!mounted) {
    mounted = true;
    loadGifts();
  }
}

export function refresh() {
  loadGifts();
}
