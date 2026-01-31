import { store } from '../store/state.js';
import { getAnonymousNumbers } from '../api/nft.js';
import { nanoToTon, formatUsd, shortAddr } from '../utils/format.js';

let mounted = false;

async function loadNumbers() {
  store.set('numbersLoading', true);
  try {
    const items = await getAnonymousNumbers(100, 0);
    
    // Enrich with sale data
    const enriched = items.map(item => {
      const sale = item.sale;
      return {
        address: item.address,
        number: item.metadata?.name || 'Unknown',
        image: item.previews?.[1]?.url || '',
        owner: item.owner?.address || '',
        ownerName: item.owner?.name || '',
        onSale: !!sale,
        priceTon: sale ? nanoToTon(Number(sale.price?.value || 0)) : null,
        marketplace: sale?.market_name || null,
      };
    });

    // Sort: on sale first, then by price ascending (best deals first)
    enriched.sort((a, b) => {
      if (a.onSale && !b.onSale) return -1;
      if (!a.onSale && b.onSale) return 1;
      if (a.onSale && b.onSale) return (a.priceTon || 0) - (b.priceTon || 0);
      return 0;
    });

    store.update({
      anonymousNumbers: enriched,
      numbersLoading: false,
    });
  } catch (err) {
    console.error('Failed to load anonymous numbers:', err);
    store.set('numbersLoading', false);
  }
}

export function render() {
  const loading = store.get('numbersLoading');
  const numbers = store.get('anonymousNumbers') || [];
  const tonPrice = store.get('tonPrice');
  const tonUsd = tonPrice?.price || 0;

  if (loading && numbers.length === 0) {
    return `
      <div class="section-header">
        <span class="section-title">📱 Anonymous Numbers</span>
      </div>
      <div class="skeleton skeleton-card"></div>
      <div class="skeleton skeleton-card"></div>
      <div class="skeleton skeleton-card"></div>
    `;
  }

  const onSale = numbers.filter(n => n.onSale);
  const notOnSale = numbers.filter(n => !n.onSale);

  let html = `
    <div class="section-header">
      <span class="section-title">📱 Anonymous Numbers</span>
      <span class="refresh-hint">${loading ? '⟳' : `${numbers.length} loaded`}</span>
    </div>
    
    <div class="card" style="background: linear-gradient(135deg, rgba(0,122,255,0.1), rgba(175,82,222,0.1));">
      <div style="text-align:center; padding: 8px 0;">
        <div style="font-size:24px; margin-bottom:8px;">📱</div>
        <div style="font-size:13px; color: var(--tg-theme-hint-color);">
          Anonymous Telegram Numbers — create accounts not tied to SIM cards
        </div>
        <div style="margin-top:8px; display:flex; justify-content:center; gap:20px;">
          <div class="stat">
            <span class="stat-label">Total Listed</span>
            <span class="stat-value">${numbers.length}</span>
          </div>
          <div class="stat">
            <span class="stat-label">For Sale</span>
            <span class="stat-value" style="color:var(--green)">${onSale.length}</span>
          </div>
        </div>
      </div>
    </div>
  `;

  // On sale numbers
  if (onSale.length > 0) {
    html += `
      <div class="section-header">
        <span class="section-title">💰 For Sale</span>
      </div>
      <div class="number-grid">
    `;

    onSale.slice(0, 20).forEach(num => {
      const usd = num.priceTon && tonUsd ? num.priceTon * tonUsd : null;
      html += `
        <div class="number-card" onclick="window.open('https://getgems.io/nft/${num.address}', '_blank')">
          <div class="number-value">${escHtml(num.number)}</div>
          <div class="number-price">${num.priceTon ? `${num.priceTon.toFixed(1)} TON` : '—'}</div>
          ${usd ? `<div style="font-size:11px; color:var(--tg-theme-hint-color)">${formatUsd(usd)}</div>` : ''}
        </div>
      `;
    });

    html += '</div>';
  }

  // Not on sale (browsing)
  if (notOnSale.length > 0) {
    html += `
      <div class="section-header">
        <span class="section-title">📋 Recent Numbers</span>
      </div>
      <div class="number-grid">
    `;

    notOnSale.slice(0, 20).forEach(num => {
      html += `
        <div class="number-card">
          <div class="number-value">${escHtml(num.number)}</div>
          <div class="number-price" style="color:var(--tg-theme-hint-color)">Not listed</div>
          ${num.ownerName ? `<div style="font-size:10px; color:var(--tg-theme-hint-color)">${escHtml(num.ownerName.slice(0,15))}</div>` : ''}
        </div>
      `;
    });

    html += '</div>';
  }

  return html;
}

function escHtml(str) {
  const el = document.createElement('span');
  el.textContent = str;
  return el.innerHTML;
}

export function mount() {
  if (!mounted) {
    mounted = true;
    loadNumbers();
  }
}

export function refresh() {
  loadNumbers();
}
