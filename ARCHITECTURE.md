# TON Trading Bot — Architecture Document

## Overview

A Telegram Mini App for monitoring and trading TON-based digital assets:
- **Telegram Gifts** — NFT gifts traded on Fragment/Getgems
- **Telegram Usernames** — `@username` NFTs on Fragment
- **Anonymous Numbers** — `+888` numbers on Fragment
- **TON Memecoins** — Jetton tokens (memecoins, DeFi tokens)

---

## TON API Research (tonapi.io/v2)

### Available Endpoints by Category

#### 🎁 NFT Endpoints (Gifts, Usernames, Numbers)
| Endpoint | Method | Description |
|----------|--------|-------------|
| `/v2/nfts/collections` | GET | List all NFT collections |
| `/v2/nfts/collections/{id}` | GET | Get specific collection metadata |
| `/v2/nfts/collections/{id}/items` | GET | List items in a collection (paginated) |
| `/v2/nfts/{id}` | GET | Get single NFT item details (includes `sale` object if listed) |
| `/v2/nfts/_bulk` | POST | Get multiple NFTs by addresses |
| `/v2/nfts/{id}/history` | GET | Get transaction history for an NFT |
| `/v2/accounts/{id}/nfts` | GET | Get all NFTs owned by an account |
| `/v2/accounts/{id}/nfts/history` | GET | NFT activity history for account |

#### 💰 Jetton/Token Endpoints (Memecoins)
| Endpoint | Method | Description |
|----------|--------|-------------|
| `/v2/jettons` | GET | List jettons (newest first, paginated) |
| `/v2/jettons/{id}` | GET | Get jetton info (name, symbol, supply, holders) |
| `/v2/jettons/{id}/holders` | GET | Get token holder list |
| `/v2/jettons/_bulk` | POST | Get multiple jettons by addresses |
| `/v2/accounts/{id}/jettons` | GET | Get all jetton balances for an account |
| `/v2/accounts/{id}/jettons/history` | GET | Jetton transfer history for account |

#### 📊 Rates & Prices
| Endpoint | Method | Description |
|----------|--------|-------------|
| `/v2/rates` | GET | Get current prices (tokens param accepts addresses or "ton") |
| `/v2/rates/chart` | GET | Get price chart data (token, currency, start_date, end_date) |
| `/v2/rates/markets` | GET | Get market info (exchanges, last updated) |

#### 🌐 DNS/Domains (Usernames & Numbers)
| Endpoint | Method | Description |
|----------|--------|-------------|
| `/v2/dns/auctions` | GET | Get all active auctions (filter by `tld`: "ton" or "t.me") |
| `/v2/dns/{domain_name}` | GET | Get DNS record info |
| `/v2/dns/{domain_name}/bids` | GET | Get bid history for a domain |
| `/v2/dns/{domain_name}/resolve` | GET | Resolve DNS to wallet |

#### 🔍 Account & Events
| Endpoint | Method | Description |
|----------|--------|-------------|
| `/v2/accounts/search` | GET | Search accounts by name |
| `/v2/accounts/{id}` | GET | Get account info |
| `/v2/accounts/{id}/events` | GET | Get account event history |
| `/v2/purchases/{id}/history` | GET | Get purchase history |
| `/v2/events/{event_id}` | GET | Get specific event details |

### Known Collection Addresses

| Asset | Collection Address | Notes |
|-------|-------------------|-------|
| **Telegram Usernames** | `EQCA14o1-VWhS2efqoh_9M1b_A9DtKTuoqfmkn83AbJzwnPi` | @username NFTs |
| **Anonymous Numbers** | `EQAOQdwdw8kGftJCSFgOErM1mBjYPe4DBPq8-AhF6vr9si5N` | +888 numbers |
| **Getgems Sales** | `0:584ee61b2dff0837116d0fcb5078d93964bcbe9c05fd6a14...` | Marketplace escrow |
| **Getgems Marketplace** | `0:a3935861f79daf59a13d6d182e1640210c02f98e3df18fda...` | Marketplace contract |

### Key Jetton Addresses (Popular Tokens)
| Token | Address | Description |
|-------|---------|-------------|
| **USDT** | `EQCxE6mUtQJKFnGfaROTKOt1lZbDiiX1kCixRv7Nw2Id_sDs` | Tether on TON |
| **SCALE** | `EQBlqsm144Dq6SjbPI4jjZvA1hqTIP3CvHovbIfW_t-SCALE` | SCALE token |
| **NOT** | `EQAvlWFDxGF2lXm67y4yzC17wYKD9A0guwPkMs1gOsM__NOT` | Notcoin |

### Data Insights
- **Rates**: `GET /v2/rates?tokens=ton,{addr}&currencies=usd` → returns price + 24h/7d/30d diff
- **Charts**: `GET /v2/rates/chart?token={addr}&currency=usd&start_date=UNIX&end_date=UNIX` → 200 data points
- **Auctions**: `GET /v2/dns/auctions?tld=t.me` → ~8800+ active username auctions
- **NFT Sales**: NFT items include a `sale` object when listed (price, marketplace)
- **New Jettons**: `/v2/jettons?limit=N` returns newest tokens first — useful for memecoin sniping

### API Limits
- Free tier: Reasonable rate limits for polling (no auth needed for most GET endpoints)
- Auth: Bearer token via `Authorization` header for higher limits
- Pagination: Most list endpoints support `limit` (max 1000) and `offset`

---

## App Architecture

```
┌─────────────────────────────────────────────────────┐
│                 Telegram Mini App                     │
│          (Vite + Vanilla JS, TMA SDK)                │
├─────────────────────────────────────────────────────┤
│  ┌───────┐ ┌──────────┐ ┌─────────┐ ┌────────────┐ │
│  │ Gifts │ │Usernames │ │Numbers  │ │ Memecoins  │ │
│  │ Tab   │ │  Tab     │ │  Tab    │ │   Tab      │ │
│  └───┬───┘ └────┬─────┘ └────┬────┘ └─────┬──────┘ │
│      │          │             │             │        │
│  ┌───▼──────────▼─────────────▼─────────────▼──────┐ │
│  │              State Manager (Reactive)            │ │
│  │         (Data cache, refresh intervals)          │ │
│  └──────────────────┬──────────────────────────────┘ │
│                     │                                │
│  ┌──────────────────▼──────────────────────────────┐ │
│  │              TON API Service Layer               │ │
│  │   - NFT fetcher (collections, items, sales)     │ │
│  │   - Jetton fetcher (tokens, prices, charts)     │ │
│  │   - DNS fetcher (auctions, bids)                │ │
│  │   - Rates service (prices, 24h change)          │ │
│  └──────────────────┬──────────────────────────────┘ │
│                     │                                │
├─────────────────────▼───────────────────────────────┤
│              tonapi.io/v2 REST API                   │
└─────────────────────────────────────────────────────┘
```

### File Structure
```
trading-bot/
├── ARCHITECTURE.md          # This document
├── index.html               # Entry point
├── package.json             # Dependencies
├── vite.config.js           # Vite configuration
├── src/
│   ├── main.js              # App entry, router, TMA init
│   ├── style.css            # Global styles (Telegram theme)
│   ├── api/
│   │   ├── tonapi.js        # Base API client (fetch wrapper)
│   │   ├── nft.js           # NFT/Gift/Username/Number API calls
│   │   ├── jettons.js       # Jetton/memecoin API calls
│   │   ├── rates.js         # Price & chart data
│   │   └── dns.js           # DNS auction data
│   ├── components/
│   │   ├── tabs.js          # Tab navigation component
│   │   ├── gift-card.js     # Gift NFT display card
│   │   ├── username-card.js # Username listing card
│   │   ├── number-card.js   # Anonymous number card
│   │   ├── token-card.js    # Memecoin token card
│   │   ├── price-chart.js   # Mini price chart (canvas)
│   │   └── loader.js        # Loading skeleton/spinner
│   ├── views/
│   │   ├── gifts.js         # Gifts dashboard view
│   │   ├── usernames.js     # Usernames dashboard view
│   │   ├── numbers.js       # Anonymous numbers view
│   │   └── memecoins.js     # Memecoin tracker view
│   ├── store/
│   │   └── state.js         # Simple reactive state store
│   └── utils/
│       ├── format.js        # Number/price formatting
│       └── constants.js     # Collection addresses, API base URL
└── public/
    └── favicon.svg          # App icon
```

### UI Wireframes

#### Tab Navigation (Bottom)
```
┌─────────────────────────────────────┐
│  🎁 Gifts  │ 👤 Names │ 📱 Numbers │ 🚀 Coins │
└─────────────────────────────────────┘
```

#### Gifts View
```
┌─────────────────────────────────────┐
│ 💎 TON Trading Hub                  │
│ TON: $3.42 (+2.1%)                  │
├─────────────────────────────────────┤
│ 🔥 Trending Gifts                   │
│ ┌─────────────────────────────────┐ │
│ │ 🎁 Plush Pepe                   │ │
│ │ Floor: 5.2 TON ($17.78)        │ │
│ │ 24h: ▲ +12%  Sales: 47         │ │
│ │ [View on Getgems] [Buy]        │ │
│ └─────────────────────────────────┘ │
│ ┌─────────────────────────────────┐ │
│ │ 🎁 Durov Hoodie                 │ │
│ │ Floor: 2.8 TON ($9.58)         │ │
│ │ 24h: ▼ -3%   Sales: 23         │ │
│ └─────────────────────────────────┘ │
├─────────────────────────────────────┤
│ 📊 Recent Sales                     │
│ Plush Pepe #4821  → 5.5 TON  2m ago│
│ Durov Hoodie #112 → 3.0 TON  5m ago│
└─────────────────────────────────────┘
```

#### Usernames View
```
┌─────────────────────────────────────┐
│ 🏷️ Username Deals                   │
│ Active Auctions: 8,832              │
├─────────────────────────────────────┤
│ 🔥 Hot Auctions                     │
│ ┌─────────────────────────────────┐ │
│ │ @verdictton                     │ │
│ │ Current: 81 TON  Bids: 14      │ │
│ │ Ends: 2h 34m                   │ │
│ │ [Bid on Fragment]              │ │
│ └─────────────────────────────────┘ │
│ ┌─────────────────────────────────┐ │
│ │ @respaced                       │ │
│ │ Current: 37 TON  Bids: 11      │ │
│ │ Ends: 1h 12m                   │ │
│ └─────────────────────────────────┘ │
├─────────────────────────────────────┤
│ 💰 Best Value (sorted by potential) │
│ @crypto... → Floor 10 TON          │
│ @defi...   → Floor 10 TON          │
└─────────────────────────────────────┘
```

#### Memecoins View
```
┌─────────────────────────────────────┐
│ 🚀 TON Memecoins                    │
│ Market overview                     │
├─────────────────────────────────────┤
│ Token    Price     24h    Holders   │
│ ──────────────────────────────────  │
│ SCALE    $0.397   -2.1%   45,201   │
│ NOT      $0.0004  -8.2%  312,000   │
│ ──────────────────────────────────  │
│ 🆕 New Tokens (last 24h)           │
│ SHREK    $0.001   +340%       3    │
│ VES      $0.0001  new        21    │
└─────────────────────────────────────┘
```

---

## Data Refresh Strategy

| Data | Refresh Interval | Endpoint |
|------|-----------------|----------|
| TON price | 30s | `/v2/rates` |
| Gift collections | 60s | `/v2/nfts/collections/{id}/items` |
| Username auctions | 60s | `/v2/dns/auctions?tld=t.me` |
| Number listings | 60s | `/v2/nfts/collections/{id}/items` |
| Jetton prices | 30s | `/v2/rates` |
| New jettons | 120s | `/v2/jettons` |
| Price charts | 300s | `/v2/rates/chart` |

## Tech Stack
- **Vite** — build tool, HMR dev server
- **Vanilla JS** — no framework overhead for TMA
- **Telegram Mini App SDK** — `@telegram-apps/sdk`
- **TON API** — `tonapi.io/v2` (free tier, no auth for reads)
- **Deploy** — GitHub Pages via `gh-pages`

## Future Phases
- **Phase 2**: TonConnect wallet integration for actual trading
- **Phase 3**: Price alerts & notifications via Telegram bot
- **Phase 4**: Deal scoring algorithm (ML-based undervalue detection)
- **Phase 5**: Auto-bid / snipe functionality
