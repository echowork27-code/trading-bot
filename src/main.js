import { store } from './store/state.js';
import { getTonPrice } from './api/rates.js';
import { REFRESH } from './utils/constants.js';
import { formatChange } from './utils/format.js';

import * as giftsView from './views/gifts.js';
import * as usernamesView from './views/usernames.js';
import * as numbersView from './views/numbers.js';
import * as memecoinsView from './views/memecoins.js';

// === View Registry ===
const views = {
  gifts: giftsView,
  usernames: usernamesView,
  numbers: numbersView,
  memecoins: memecoinsView,
};

// === DOM refs ===
const $content = document.getElementById('content');
const $tonPrice = document.getElementById('ton-price');
const $tabs = document.getElementById('tabs');

// === Telegram Web App Init ===
function initTMA() {
  try {
    const tg = window.Telegram?.WebApp;
    if (tg) {
      tg.ready();
      tg.expand();
      tg.enableClosingConfirmation?.();
      
      // Apply Telegram theme
      if (tg.themeParams) {
        const t = tg.themeParams;
        const root = document.documentElement.style;
        if (t.bg_color) root.setProperty('--tg-theme-bg-color', t.bg_color);
        if (t.text_color) root.setProperty('--tg-theme-text-color', t.text_color);
        if (t.hint_color) root.setProperty('--tg-theme-hint-color', t.hint_color);
        if (t.link_color) root.setProperty('--tg-theme-link-color', t.link_color);
        if (t.button_color) root.setProperty('--tg-theme-button-color', t.button_color);
        if (t.button_text_color) root.setProperty('--tg-theme-button-text-color', t.button_text_color);
        if (t.secondary_bg_color) root.setProperty('--tg-theme-secondary-bg-color', t.secondary_bg_color);
      }
      
      console.log('✅ Telegram Web App initialized');
    }
  } catch (err) {
    console.warn('TMA init skipped (not in Telegram):', err.message);
  }
}

// === TON Price ===
async function refreshTonPrice() {
  try {
    const price = await getTonPrice();
    if (price) {
      store.set('tonPrice', price);
      updatePriceDisplay(price);
    }
  } catch (err) {
    console.error('TON price fetch failed:', err);
  }
}

function updatePriceDisplay(data) {
  if (!$tonPrice || !data) return;
  const change = formatChange(data.diff24h);
  $tonPrice.querySelector('.price-value').textContent = `TON $${data.price.toFixed(2)}`;
  const $change = $tonPrice.querySelector('.price-change');
  $change.textContent = change.text;
  $change.className = `price-change ${change.dir}`;
}

// === Tab Navigation ===
let activeTab = 'gifts';

function switchTab(tabName) {
  if (!views[tabName] || tabName === activeTab) return;
  
  activeTab = tabName;
  store.set('activeTab', tabName);

  // Update tab buttons
  $tabs.querySelectorAll('.tab').forEach(btn => {
    btn.classList.toggle('active', btn.dataset.tab === tabName);
  });

  // Mount view if first time, then render
  const view = views[tabName];
  if (view.mount) view.mount();
  renderActiveView();
}

function renderActiveView() {
  const view = views[activeTab];
  if (!view) return;
  
  const html = view.render();
  $content.innerHTML = html;
}

// === Event Delegation ===
$tabs.addEventListener('click', (e) => {
  const tab = e.target.closest('.tab');
  if (tab) switchTab(tab.dataset.tab);
});

$content.addEventListener('click', (e) => {
  const view = views[activeTab];
  if (view?.onInteract) {
    const needsRerender = view.onInteract(e);
    if (needsRerender) renderActiveView();
  }
});

// === Reactive Re-renders ===
// Re-render when any data changes that the current view might care about
const viewDataKeys = {
  gifts: ['giftsLoading', 'giftCollections', 'tonPrice'],
  usernames: ['usernamesLoading', 'usernameAuctions', 'usernameAuctionsTotal', 'tonPrice'],
  numbers: ['numbersLoading', 'anonymousNumbers', 'tonPrice'],
  memecoins: ['memecoinsLoading', 'trackedTokens', 'newTokens', 'tokenPrices', 'tonPrice'],
};

let renderQueued = false;
let renderTab = null;
function queueRender(forTab) {
  if (forTab !== activeTab) return; // stale update, ignore
  if (renderQueued) return;
  renderQueued = true;
  renderTab = forTab;
  requestAnimationFrame(() => {
    renderQueued = false;
    // Only render if we're still on the same tab
    if (renderTab === activeTab) {
      renderActiveView();
    }
    renderTab = null;
  });
}

store.on('*', (key) => {
  const keys = viewDataKeys[activeTab];
  if (keys && keys.includes(key)) {
    queueRender(activeTab);
  }
});

// === Refresh Intervals ===
let priceInterval;

function startRefreshLoops() {
  // TON price every 30s
  priceInterval = setInterval(refreshTonPrice, REFRESH.PRICES);
  
  // NFT/auction data every 60s (only refresh active tab)
  setInterval(() => {
    const view = views[activeTab];
    if (view?.refresh) view.refresh();
  }, REFRESH.NFT_DATA);
}

// === Boot ===
async function boot() {
  console.log('🚀 TON Trading Hub starting...');
  
  initTMA();
  
  // Load TON price first
  await refreshTonPrice();
  
  // Mount initial tab
  const view = views[activeTab];
  if (view.mount) view.mount();
  renderActiveView();
  
  // Start auto-refresh loops
  startRefreshLoops();
  
  console.log('✅ TON Trading Hub ready');
}

boot();
