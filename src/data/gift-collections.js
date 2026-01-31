/**
 * Curated dataset of ALL 107 Telegram Gift NFT collections from Fragment.com
 *
 * Tier thresholds:
 *   legendary  — supply < 1,500
 *   epic       — supply < 3,000
 *   rare       — supply < 6,000
 *   uncommon   — supply < 15,000
 *   common     — supply >= 15,000
 */

function tier(supply) {
  if (supply < 1500) return 'legendary';
  if (supply < 3000) return 'epic';
  if (supply < 6000) return 'rare';
  if (supply < 15000) return 'uncommon';
  return 'common';
}

function slug(name) {
  return name
    .toLowerCase()
    .replace(/[''\u2019]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');
}

function col(name, supply, emoji) {
  return { slug: slug(name), name, supply, tier: tier(supply), emoji };
}

export const GIFT_COLLECTIONS = [
  col('Heart Lockets', 891, '💖'),
  col('Heroic Helmets', 1027, '⚔️'),
  col('Bling Binkies', 1095, '👶'),
  col('Mighty Arms', 1327, '💪'),
  col('Nail Bracelets', 1382, '💅'),
  col('Khabib\'s Papakhas', 1509, '🧢'),
  col('Ionic Dryers', 1631, '💇'),
  col('Gem Signets', 1662, '💎'),
  col('Artisan Bricks', 1874, '🧱'),
  col('Mini Oscars', 1844, '🏆'),
  col('Perfume Bottles', 1835, '🧴'),
  col('Precious Peaches', 1962, '🍑'),
  col('Pretty Posies', 1999, '🌸'),
  col('Joyful Bundles', 2102, '🎀'),
  col('Genie Lamps', 2258, '🪔'),
  col('Plush Pepes', 2310, '🐸'),
  col('Bonded Rings', 2323, '💍'),
  col('Ion Gems', 2335, '🔮'),
  col('Love Candles', 2340, '🕯️'),
  col('Astral Shards', 2442, '✨'),
  col('Valentine Boxes', 2292, '💝'),
  col('Mousse Cakes', 2688, '🍰'),
  col('UFC Strikes', 2701, '🥊'),
  col('Durov\'s Caps', 2753, '🧢'),
  col('Sleigh Bells', 2966, '🔔'),
  col('Magic Potions', 3062, '🧪'),
  col('Neko Helmets', 3176, '🐱'),
  col('Sharp Tongues', 3359, '👅'),
  col('Westside Signs', 3504, '🤙'),
  col('Snow Mittens', 3526, '🧤'),
  col('Sky Stilettos', 3573, '👠'),
  col('Electric Skulls', 3665, '💀'),
  col('Lush Bouquets', 3635, '💐'),
  col('Crystal Balls', 6863, '🔮'),
  col('Cupid Charms', 4190, '💘'),
  col('Holiday Drinks', 4054, '🍹'),
  col('Record Players', 4361, '🎵'),
  col('Eternal Roses', 4349, '🌹'),
  col('Money Pots', 4411, '🍯'),
  col('Bunny Muffins', 4705, '🐰'),
  col('Hanging Stars', 4915, '⭐'),
  col('Low Riders', 4964, '🚗'),
  col('Snake Boxes', 4964, '🐍'),
  col('Love Potions', 5177, '💜'),
  col('Happy Brownies', 5268, '🍫'),
  col('Fresh Socks', 5495, '🧦'),
  col('Bow Ties', 5593, '🎀'),
  col('Loot Bags', 5575, '💰'),
  col('Mad Pumpkins', 5590, '🎃'),
  col('Flying Brooms', 5813, '🧹'),
  col('Star Notepads', 5861, '📝'),
  col('Jingle Bells', 5865, '🔔'),
  col('Spring Baskets', 5944, '🧺'),
  col('Skull Flowers', 6003, '💀'),
  col('Restless Jars', 6048, '🫙'),
  col('Signet Rings', 6126, '💍'),
  col('Pet Snakes', 6223, '🐍'),
  col('Diamond Rings', 6413, '💎'),
  col('Hypno Lollipops', 6561, '🍭'),
  col('Top Hats', 6535, '🎩'),
  col('Kissed Frogs', 6762, '🐸'),
  col('Faith Amulets', 6765, '🧿'),
  col('Vintage Cigars', 6770, '🚬'),
  col('Whip Cupcakes', 6982, '🧁'),
  col('Snow Globes', 4177, '🔮'),
  col('Berry Boxes', 7579, '🍓'),
  col('Input Keys', 7327, '⌨️'),
  col('Tama Gadgets', 7758, '🎮'),
  col('Big Years', 7973, '📅'),
  col('Swiss Watches', 8625, '⌚'),
  col('Jester Hats', 8623, '🃏'),
  col('Trapped Hearts', 8860, '❤️‍🔥'),
  col('Candy Canes', 9177, '🍬'),
  col('Jolly Chimps', 9108, '🐒'),
  col('Voodoo Dolls', 9102, '🪆'),
  col('Moon Pendants', 9386, '🌙'),
  col('Santa Hats', 9248, '🎅'),
  col('Spiced Wines', 9778, '🍷'),
  col('Eternal Candles', 9823, '🕯️'),
  col('Cookie Hearts', 9981, '🍪'),
  col('Sakura Flowers', 10061, '🌸'),
  col('Stellar Rockets', 10647, '🚀'),
  col('Lunar Snakes', 10894, '🌙'),
  col('Snoop Cigars', 11237, '🚬'),
  col('Instant Ramens', 11651, '🍜'),
  col('Jelly Bunnies', 11363, '🐇'),
  col('Clover Pins', 11562, '🍀'),
  col('Light Swords', 12007, '⚡'),
  col('Hex Pots', 12801, '🧙'),
  col('Scared Cats', 12454, '🙀'),
  col('Ginger Cookies', 13686, '🍪'),
  col('Jacks-in-the-Box', 13410, '🤡'),
  col('Swag Bags', 13840, '👜'),
  col('Evil Eyes', 15575, '🧿'),
  col('Party Sparklers', 16812, '🎇'),
  col('B-Day Candles', 19540, '🎂'),
  col('Ice Creams', 20395, '🍦'),
  col('Easter Eggs', 20998, '🥚'),
  col('Desk Calendars', 26243, '🗓️'),
  col('Spy Agarics', 26610, '🍄'),
  col('Toy Bears', 27085, '🧸'),
  col('Homemade Cakes', 29674, '🎂'),
  col('Witch Hats', 28916, '🧙'),
  col('Snoop Doggs', 35447, '🐕'),
  col('Lol Pops', 54380, '🍭'),
  col('Xmas Stockings', 7324, '🧦'),
];

/** Total supply across all 107 collections */
export const TOTAL_GIFTS = GIFT_COLLECTIONS.reduce((s, c) => s + c.supply, 0);

/** Counts per tier */
export const TIER_COUNTS = GIFT_COLLECTIONS.reduce((acc, c) => {
  acc[c.tier] = (acc[c.tier] || 0) + 1;
  return acc;
}, {});

/** Tier display config */
export const TIER_CONFIG = {
  legendary: { label: 'Legendary', color: '#FFD700', bg: 'rgba(255,215,0,0.15)' },
  epic:      { label: 'Epic',      color: '#AF52DE', bg: 'rgba(175,82,222,0.15)' },
  rare:      { label: 'Rare',      color: '#007AFF', bg: 'rgba(0,122,255,0.15)' },
  uncommon:  { label: 'Uncommon',  color: '#34C759', bg: 'rgba(52,199,89,0.15)' },
  common:    { label: 'Common',    color: '#8E8E93', bg: 'rgba(142,142,147,0.15)' },
};
