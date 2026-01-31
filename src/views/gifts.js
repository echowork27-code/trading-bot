import { store } from '../store/state.js';
import { GIFT_COLLECTIONS, TOTAL_GIFTS, TIER_CONFIG, TIER_COUNTS } from '../data/gift-collections.js';
import { getFragmentCollectionUrl } from '../api/fragment.js';
import { formatNumber } from '../utils/format.js';

/* ── Local UI state ─────────────────────────────────────── */
let activeFilter = 'hot';   // hot | rare | all
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

/** Sort helpers */
const bySupplyAsc  = (a, b) => a.supply - b.supply;
const bySupplyDesc = (a, b) => b.supply - a.supply;

function getFilteredCollections() {
  let list = [...GIFT_COLLECTIONS];

  // Search filter
  if (searchQuery.trim()) {
    const q = searchQuery.trim().toLowerCase();
    list = list.filter(c =>
      c.name.toLowerCase().includes(q) ||
      c.tier.includes(q) ||
      c.emoji.includes(q)
    );
  }

  switch (activeFilter) {
    case 'hot':
      // "Hot" = rarest first (lowest supply = most trading activity & value)
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

/* ── Render ──────────────────────────────────────────────── */
export function render() {
  const collections = getFilteredCollections();

  let html = '';

  /* ─ Market Overview ─ */
  html += `
    <div class="section-header">
      <span class="section-title">🎁 Gift Market</span>
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
    </div>
  `;

  /* ─ Filter pills + search ─ */
  const pills = [
    { id: 'hot',  label: '🔥 Hot' },
    { id: 'rare', label: '💎 Rare' },
    { id: 'all',  label: '📊 All' },
  ];

  html += `<div class="filter-row">`;
  pills.forEach(p => {
    const cls = p.id === activeFilter ? 'filter-pill active' : 'filter-pill';
    html += `<button class="${cls}" data-filter="${p.id}">${p.label}</button>`;
  });
  html += `<button class="filter-pill${searchQuery ? ' active' : ''}" data-filter="search">🔍 Search</button>`;
  html += `</div>`;

  /* Search input (visible only when search is focused or has text) */
  if (activeFilter === 'search' || searchQuery) {
    html += `
      <div style="margin-bottom:12px">
        <input
          id="gift-search"
          type="text"
          placeholder="Search collections..."
          value="${escHtml(searchQuery)}"
          style="
            width:100%;
            padding:10px 14px;
            border-radius:var(--radius-sm);
            border:1px solid var(--card-border);
            background:var(--card-bg);
            color:var(--tg-theme-text-color);
            font-size:14px;
            outline:none;
          "
        />
      </div>
    `;
  }

  /* ─ Section heading ─ */
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

  /* ─ Collection cards ─ */
  if (collections.length === 0) {
    html += `
      <div class="empty-state">
        <div class="empty-state-icon">🔍</div>
        <div class="empty-state-text">No collections match "${escHtml(searchQuery)}"</div>
      </div>
    `;
  } else {
    collections.forEach(col => {
      const fragmentUrl = getFragmentCollectionUrl(col.slug);
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
          <div class="token-price-col" style="display:flex;align-items:center;gap:6px">
            <a href="${escHtml(fragmentUrl)}" target="_blank" rel="noopener"
               onclick="event.stopPropagation()"
               style="
                 font-size:11px;
                 color:var(--tg-theme-link-color);
                 text-decoration:none;
                 padding:4px 10px;
                 border-radius:6px;
                 background:rgba(0,122,255,0.1);
                 white-space:nowrap;
               ">Fragment ↗</a>
          </div>
        </div>
      `;
    });
  }

  /* ─ Footer ─ */
  html += `
    <div class="card" style="margin-top:12px;text-align:center">
      <div style="font-size:12px;color:var(--tg-theme-hint-color);padding:8px 0">
        Data from <a href="https://fragment.com" target="_blank" rel="noopener" style="color:var(--tg-theme-link-color);text-decoration:none">Fragment.com</a>
        &nbsp;·&nbsp; Prices coming soon via TON API
      </div>
    </div>
  `;

  return html;
}

/* ── Lifecycle ───────────────────────────────────────────── */
export function mount() {
  if (!mounted) {
    mounted = true;
    // Static data — nothing to fetch on mount
  }
}

export function refresh() {
  // Future: reload floor prices from TON API
}

/**
 * Handle clicks inside the gifts view.
 * Returns true if a re-render is needed.
 */
export function onInteract(e) {
  /* Filter pill click */
  const pill = e.target.closest('.filter-pill');
  if (pill) {
    const f = pill.dataset.filter;
    if (f === 'search') {
      activeFilter = 'search';
      searchQuery = searchQuery || '';
    } else {
      activeFilter = f;
      if (!searchQuery) {
        // stay in normal mode
      }
    }
    return true;
  }

  /* Search input */
  const input = e.target.closest('#gift-search');
  if (input) {
    // We handle input via the 'input' event below — no re-render needed here
    return false;
  }

  /* Collection row click → open Fragment */
  const row = e.target.closest('.token-row[data-gift-slug]');
  if (row && !e.target.closest('a')) {
    const slug = row.dataset.giftSlug;
    if (slug) {
      window.open(getFragmentCollectionUrl(slug), '_blank');
    }
    return false;
  }

  return false;
}

/* ── Search input handler (delegated) ───────────────────── */
// We need to capture input events on the search box.
// Since the main app re-renders on interaction, we use a MutationObserver-style
// approach: attach input listeners after each render via a requestAnimationFrame.
let lastInputListener = null;

const _origRender = render;

// Patch: after the view HTML is inserted by main.js, hook the search input.
// We do this via a side-effect: main.js calls render() → sets innerHTML →
// then we can query the DOM. We use requestAnimationFrame to run after paint.
function hookSearchInput() {
  cancelAnimationFrame(lastInputListener);
  lastInputListener = requestAnimationFrame(() => {
    const el = document.getElementById('gift-search');
    if (el && !el._hooked) {
      el._hooked = true;
      el.addEventListener('input', (evt) => {
        searchQuery = evt.target.value;
        // Re-render the list but preserve focus
        const content = document.getElementById('content');
        if (content) {
          const html = render();
          content.innerHTML = html;
          hookSearchInput();
          // Restore focus + cursor position
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

// Observe DOM changes to hook search input after any re-render
if (typeof MutationObserver !== 'undefined') {
  const observer = new MutationObserver(() => {
    if (document.getElementById('gift-search')) {
      hookSearchInput();
    }
  });
  // Start observing once the DOM is ready
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
