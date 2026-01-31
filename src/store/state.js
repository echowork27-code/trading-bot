/**
 * Simple reactive state store
 */
class Store {
  constructor() {
    this.data = {
      activeTab: 'gifts',
      tonPrice: null,
      
      // Gifts
      giftCollections: [],
      giftItems: [],
      giftsLoading: true,
      
      // Usernames
      usernameAuctions: [],
      usernameAuctionsTotal: 0,
      usernamesLoading: true,
      
      // Anonymous Numbers
      anonymousNumbers: [],
      numbersLoading: true,
      
      // Memecoins
      trackedTokens: [],
      newTokens: [],
      tokenPrices: {},
      memecoinsLoading: true,
    };
    
    this.listeners = new Map();
  }

  get(key) {
    return this.data[key];
  }

  set(key, value) {
    this.data[key] = value;
    this._notify(key, value);
  }

  update(partial) {
    Object.entries(partial).forEach(([k, v]) => {
      this.data[k] = v;
    });
    Object.keys(partial).forEach(k => {
      this._notify(k, this.data[k]);
    });
  }

  on(key, fn) {
    if (!this.listeners.has(key)) {
      this.listeners.set(key, new Set());
    }
    this.listeners.get(key).add(fn);
    return () => this.listeners.get(key)?.delete(fn);
  }

  _notify(key, value) {
    this.listeners.get(key)?.forEach(fn => {
      try { fn(value); } catch(e) { console.error('Store listener error:', e); }
    });
    // Also fire '*' wildcard listeners
    this.listeners.get('*')?.forEach(fn => {
      try { fn(key, value); } catch(e) { console.error('Store wildcard listener error:', e); }
    });
  }
}

export const store = new Store();
