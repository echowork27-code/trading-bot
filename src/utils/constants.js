// TON API base URL
export const API_BASE = 'https://tonapi.io/v2';

// Known NFT Collection Addresses
export const COLLECTIONS = {
  USERNAMES: 'EQCA14o1-VWhS2efqoh_9M1b_A9DtKTuoqfmkn83AbJzwnPi',
  ANONYMOUS_NUMBERS: 'EQAOQdwdw8kGftJCSFgOErM1mBjYPe4DBPq8-AhF6vr9si5N',
};

// Known Jetton Addresses (popular memecoins / tokens)
export const JETTONS = {
  USDT: 'EQCxE6mUtQJKFnGfaROTKOt1lZbDiiX1kCixRv7Nw2Id_sDs',
  SCALE: 'EQBlqsm144Dq6SjbPI4jjZvA1hqTIP3CvHovbIfW_t-SCALE',
  NOT: 'EQAvlWFDxGF2lXm67y4yzC17wYKD9A0guwPkMs1gOsM__NOT',
  DOGS: 'EQCvxJy4eG8hyHBFsZ7eePxrRsUQSFE_jpptRAbs2MFsmJya',
  CATI: 'EQD-cvR0Nz6XAyRBvbhz-abTrRC6sI5tvHvvpeQraV9UAAD7',
  HMSTR: 'EQAJ8uWd7EBqsmpSWaRdf_I-8R8-XHwh3gsNKhy-UrdrPcUo',
  REDO: 'EQAYqo4u7VF0fa4DPAebk4g9lBytj2VFny7pzXR0trSAkXPB',
};

// Known tracked jetton addresses list for batch price fetching
export const TRACKED_JETTONS = [
  JETTONS.NOT,
  JETTONS.DOGS,
  JETTONS.CATI,
  JETTONS.HMSTR,
  JETTONS.SCALE,
  JETTONS.REDO,
];

// Refresh intervals (ms)
export const REFRESH = {
  PRICES: 30_000,      // 30s
  NFT_DATA: 60_000,    // 60s
  AUCTIONS: 60_000,    // 60s
  NEW_TOKENS: 120_000, // 2min
  CHARTS: 300_000,     // 5min
};

// Fragment / Getgems URLs for external links
export const EXTERNAL = {
  FRAGMENT: 'https://fragment.com',
  GETGEMS: 'https://getgems.io',
  TONVIEWER: 'https://tonviewer.com',
};
