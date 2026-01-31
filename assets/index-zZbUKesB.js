(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const o of document.querySelectorAll('link[rel="modulepreload"]'))n(o);new MutationObserver(o=>{for(const r of o)if(r.type==="childList")for(const a of r.addedNodes)a.tagName==="LINK"&&a.rel==="modulepreload"&&n(a)}).observe(document,{childList:!0,subtree:!0});function s(o){const r={};return o.integrity&&(r.integrity=o.integrity),o.referrerPolicy&&(r.referrerPolicy=o.referrerPolicy),o.crossOrigin==="use-credentials"?r.credentials="include":o.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function n(o){if(o.ep)return;o.ep=!0;const r=s(o);fetch(o.href,r)}})();class ue{constructor(){this.data={activeTab:"gifts",tonPrice:null,giftCollections:[],giftItems:[],giftsLoading:!0,usernameAuctions:[],usernameAuctionsTotal:0,usernamesLoading:!0,anonymousNumbers:[],numbersLoading:!0,ggGiftCollections:[],ggGiftsOnSale:[],ggGiftHistory:[],trackedTokens:[],newTokens:[],tokenPrices:{},memecoinsLoading:!0},this.listeners=new Map}get(t){return this.data[t]}set(t,s){this.data[t]=s,this._notify(t,s)}update(t){Object.entries(t).forEach(([s,n])=>{this.data[s]=n}),Object.keys(t).forEach(s=>{this._notify(s,this.data[s])})}on(t,s){return this.listeners.has(t)||this.listeners.set(t,new Set),this.listeners.get(t).add(s),()=>{var n;return(n=this.listeners.get(t))==null?void 0:n.delete(s)}}_notify(t,s){var n,o;(n=this.listeners.get(t))==null||n.forEach(r=>{try{r(s)}catch(a){console.error("Store listener error:",a)}}),(o=this.listeners.get("*"))==null||o.forEach(r=>{try{r(t,s)}catch(a){console.error("Store wildcard listener error:",a)}})}}const c=new ue,fe="https://tonapi.io/v2",ge={ANONYMOUS_NUMBERS:"EQAOQdwdw8kGftJCSFgOErM1mBjYPe4DBPq8-AhF6vr9si5N"},v={SCALE:"EQBlqsm144Dq6SjbPI4jjZvA1hqTIP3CvHovbIfW_t-SCALE",NOT:"EQAvlWFDxGF2lXm67y4yzC17wYKD9A0guwPkMs1gOsM__NOT",DOGS:"EQCvxJy4eG8hyHBFsZ7eePxrRsUQSFE_jpptRAbs2MFsmJya",CATI:"EQD-cvR0Nz6XAyRBvbhz-abTrRC6sI5tvHvvpeQraV9UAAD7",HMSTR:"EQAJ8uWd7EBqsmpSWaRdf_I-8R8-XHwh3gsNKhy-UrdrPcUo",REDO:"EQAYqo4u7VF0fa4DPAebk4g9lBytj2VFny7pzXR0trSAkXPB"},pe=[v.NOT,v.DOGS,v.CATI,v.HMSTR,v.SCALE,v.REDO],z={PRICES:3e4,NFT_DATA:6e4};async function P(e,t={}){const s=new URL(`${fe}${e}`);Object.entries(t).forEach(([o,r])=>{r!=null&&s.searchParams.set(o,String(r))});const n=await fetch(s.toString(),{headers:{Accept:"application/json"}});if(!n.ok){const o=await n.text();throw new Error(`TON API ${n.status}: ${o}`)}return n.json()}async function G(e,t=["usd"]){return(await P("/rates",{tokens:e.join(","),currencies:t.join(",")})).rates||{}}async function me(){var s,n,o,r;const t=(await G(["ton"],["usd"])).TON;return t?{price:((s=t.prices)==null?void 0:s.USD)||0,diff24h:((n=t.diff_24h)==null?void 0:n.USD)||"0%",diff7d:((o=t.diff_7d)==null?void 0:o.USD)||"0%",diff30d:((r=t.diff_30d)==null?void 0:r.USD)||"0%"}:null}function k(e){return Number(e)/1e9}function E(e){return e==null?"—":e>=1?`$${e.toFixed(2)}`:e>=.01?`$${e.toFixed(4)}`:e>=1e-4?`$${e.toFixed(6)}`:`$${e.toExponential(2)}`}function Z(e){if(!e)return{text:"—",dir:"neutral"};const t=e.replace(/[−–]/g,"-").replace("%","").trim(),s=parseFloat(t);if(isNaN(s))return{text:e,dir:"neutral"};const n=s>0?"up":s<0?"down":"neutral";return{text:s>0?`+${s.toFixed(2)}%`:`${s.toFixed(2)}%`,dir:n}}function _(e){return e>=1e6?`${(e/1e6).toFixed(1)}M`:e>=1e3?`${(e/1e3).toFixed(1)}K`:e.toLocaleString()}function J(e){const s=Math.floor(Date.now()/1e3)-e;return s<60?`${s}s ago`:s<3600?`${Math.floor(s/60)}m ago`:s<86400?`${Math.floor(s/3600)}h ago`:`${Math.floor(s/86400)}d ago`}function ve(e){const t=Math.floor(Date.now()/1e3),s=e-t;if(s<=0)return"Ended";const n=Math.floor(s/86400),o=Math.floor(s%86400/3600),r=Math.floor(s%3600/60);return n>0?`${n}d ${o}h`:o>0?`${o}h ${r}m`:`${r}m`}function he(e){return e<1500?"legendary":e<3e3?"epic":e<6e3?"rare":e<15e3?"uncommon":"common"}function ye(e){return e.toLowerCase().replace(/[''\u2019]/g,"").replace(/[^a-z0-9]+/g,"-").replace(/^-|-$/g,"")}function i(e,t,s){return{slug:ye(e),name:e,supply:t,tier:he(t),emoji:s}}const N=[i("Heart Lockets",891,"💖"),i("Heroic Helmets",1027,"⚔️"),i("Bling Binkies",1095,"👶"),i("Mighty Arms",1327,"💪"),i("Nail Bracelets",1382,"💅"),i("Khabib's Papakhas",1509,"🧢"),i("Ionic Dryers",1631,"💇"),i("Gem Signets",1662,"💎"),i("Artisan Bricks",1874,"🧱"),i("Mini Oscars",1844,"🏆"),i("Perfume Bottles",1835,"🧴"),i("Precious Peaches",1962,"🍑"),i("Pretty Posies",1999,"🌸"),i("Joyful Bundles",2102,"🎀"),i("Genie Lamps",2258,"🪔"),i("Plush Pepes",2310,"🐸"),i("Bonded Rings",2323,"💍"),i("Ion Gems",2335,"🔮"),i("Love Candles",2340,"🕯️"),i("Astral Shards",2442,"✨"),i("Valentine Boxes",2292,"💝"),i("Mousse Cakes",2688,"🍰"),i("UFC Strikes",2701,"🥊"),i("Durov's Caps",2753,"🧢"),i("Sleigh Bells",2966,"🔔"),i("Magic Potions",3062,"🧪"),i("Neko Helmets",3176,"🐱"),i("Sharp Tongues",3359,"👅"),i("Westside Signs",3504,"🤙"),i("Snow Mittens",3526,"🧤"),i("Sky Stilettos",3573,"👠"),i("Electric Skulls",3665,"💀"),i("Lush Bouquets",3635,"💐"),i("Crystal Balls",6863,"🔮"),i("Cupid Charms",4190,"💘"),i("Holiday Drinks",4054,"🍹"),i("Record Players",4361,"🎵"),i("Eternal Roses",4349,"🌹"),i("Money Pots",4411,"🍯"),i("Bunny Muffins",4705,"🐰"),i("Hanging Stars",4915,"⭐"),i("Low Riders",4964,"🚗"),i("Snake Boxes",4964,"🐍"),i("Love Potions",5177,"💜"),i("Happy Brownies",5268,"🍫"),i("Fresh Socks",5495,"🧦"),i("Bow Ties",5593,"🎀"),i("Loot Bags",5575,"💰"),i("Mad Pumpkins",5590,"🎃"),i("Flying Brooms",5813,"🧹"),i("Star Notepads",5861,"📝"),i("Jingle Bells",5865,"🔔"),i("Spring Baskets",5944,"🧺"),i("Skull Flowers",6003,"💀"),i("Restless Jars",6048,"🫙"),i("Signet Rings",6126,"💍"),i("Pet Snakes",6223,"🐍"),i("Diamond Rings",6413,"💎"),i("Hypno Lollipops",6561,"🍭"),i("Top Hats",6535,"🎩"),i("Kissed Frogs",6762,"🐸"),i("Faith Amulets",6765,"🧿"),i("Vintage Cigars",6770,"🚬"),i("Whip Cupcakes",6982,"🧁"),i("Snow Globes",4177,"🔮"),i("Berry Boxes",7579,"🍓"),i("Input Keys",7327,"⌨️"),i("Tama Gadgets",7758,"🎮"),i("Big Years",7973,"📅"),i("Swiss Watches",8625,"⌚"),i("Jester Hats",8623,"🃏"),i("Trapped Hearts",8860,"❤️‍🔥"),i("Candy Canes",9177,"🍬"),i("Jolly Chimps",9108,"🐒"),i("Voodoo Dolls",9102,"🪆"),i("Moon Pendants",9386,"🌙"),i("Santa Hats",9248,"🎅"),i("Spiced Wines",9778,"🍷"),i("Eternal Candles",9823,"🕯️"),i("Cookie Hearts",9981,"🍪"),i("Sakura Flowers",10061,"🌸"),i("Stellar Rockets",10647,"🚀"),i("Lunar Snakes",10894,"🌙"),i("Snoop Cigars",11237,"🚬"),i("Instant Ramens",11651,"🍜"),i("Jelly Bunnies",11363,"🐇"),i("Clover Pins",11562,"🍀"),i("Light Swords",12007,"⚡"),i("Hex Pots",12801,"🧙"),i("Scared Cats",12454,"🙀"),i("Ginger Cookies",13686,"🍪"),i("Jacks-in-the-Box",13410,"🤡"),i("Swag Bags",13840,"👜"),i("Evil Eyes",15575,"🧿"),i("Party Sparklers",16812,"🎇"),i("B-Day Candles",19540,"🎂"),i("Ice Creams",20395,"🍦"),i("Easter Eggs",20998,"🥚"),i("Desk Calendars",26243,"🗓️"),i("Spy Agarics",26610,"🍄"),i("Toy Bears",27085,"🧸"),i("Homemade Cakes",29674,"🎂"),i("Witch Hats",28916,"🧙"),i("Snoop Doggs",35447,"🐕"),i("Lol Pops",54380,"🍭"),i("Xmas Stockings",7324,"🧦")],be=N.reduce((e,t)=>e+t.supply,0),K=N.reduce((e,t)=>(e[t.tier]=(e[t.tier]||0)+1,e),{}),$e={legendary:{label:"Legendary",color:"#FFD700",bg:"rgba(255,215,0,0.15)"},epic:{label:"Epic",color:"#AF52DE",bg:"rgba(175,82,222,0.15)"},rare:{label:"Rare",color:"#007AFF",bg:"rgba(0,122,255,0.15)"},uncommon:{label:"Uncommon",color:"#34C759",bg:"rgba(52,199,89,0.15)"},common:{label:"Common",color:"#8E8E93",bg:"rgba(142,142,147,0.15)"}},Se="https://fragment.com";function we(e){return`${Se}/gift/${encodeURIComponent(e)}`}const ke="https://api.getgems.io/public-api";function ee(){try{return"1769880806931-mainnet-9603563-r-LZi5LtJMUH8JJ8Pv6EuriwJuWToatIjh0DII9mo82PBKg0Zx"}catch{return""}}function A(){return!!ee()}async function j(e,t={}){const s=ee();if(!s)throw new Error("Getgems API key not configured");const n=new URL(`${ke}${e}`);Object.entries(t).forEach(([a,l])=>{l!=null&&n.searchParams.set(a,String(l))});const o=await fetch(n.toString(),{headers:{Accept:"application/json",Authorization:s}});if(!o.ok){const a=await o.text();throw new Error(`Getgems ${o.status}: ${a}`)}const r=await o.json();if(!r.success&&r.name==="Unauthorized")throw new Error("Getgems API: Unauthorized — check API key");return r.response??r}async function Te(){return j("/v1/gifts/collections/top")}async function xe(e,t=50){return j("/v1/nfts/offchain/on-sale/gifts",{cursor:e,limit:t})}async function Ee(e,t=50){return j("/v1/nfts/history/gifts",{cursor:e,limit:t})}let y="hot",T="",q=!1;function h(e){if(!e)return"";const t=document.createElement("span");return t.textContent=e,t.innerHTML}function Ae(e){const t=$e[e];return t?`<span class="card-badge" style="background:${t.bg};color:${t.color}">${t.label}</span>`:""}const Q=(e,t)=>e.supply-t.supply;function Ce(){let e=[...N];if(T.trim()){const t=T.trim().toLowerCase();e=e.filter(s=>s.name.toLowerCase().includes(t)||s.tier.includes(t))}switch(y){case"hot":e.sort(Q),e=e.slice(0,30);break;case"rare":e.sort(Q);break;case"all":default:e.sort((t,s)=>t.name.localeCompare(s.name));break}return e}async function U(){var e,t,s;if(A()){c.set("giftsLoading",!0);try{const[n,o,r]=await Promise.allSettled([Te(),xe(void 0,40),Ee(void 0,40)]);if(n.status==="fulfilled"){const a=((e=n.value)==null?void 0:e.items)||n.value||[];c.set("ggGiftCollections",a)}if(o.status==="fulfilled"){const a=((t=o.value)==null?void 0:t.items)||o.value||[];c.set("ggGiftsOnSale",a)}if(r.status==="fulfilled"){const a=((s=r.value)==null?void 0:s.items)||r.value||[];c.set("ggGiftHistory",a)}}catch(n){console.error("Getgems data load failed:",n)}c.set("giftsLoading",!1)}}function te(){const e=A(),t=c.get("giftsLoading"),s=c.get("tonPrice"),n=(s==null?void 0:s.price)||0;let o="";o+=`
    <div class="section-header">
      <span class="section-title">🎁 Gift Market</span>
      <span class="refresh-hint">${t?"⟳":""}</span>
    </div>
    <div class="card">
      <div class="card-stats" style="justify-content:space-between">
        <div class="stat">
          <span class="stat-label">Collections</span>
          <span class="stat-value">${N.length}</span>
        </div>
        <div class="stat">
          <span class="stat-label">Total Gifts</span>
          <span class="stat-value">${_(be)}</span>
        </div>
        <div class="stat">
          <span class="stat-label">Legendary</span>
          <span class="stat-value" style="color:#FFD700">${K.legendary||0}</span>
        </div>
        <div class="stat">
          <span class="stat-label">Epic</span>
          <span class="stat-value" style="color:#AF52DE">${K.epic||0}</span>
        </div>
      </div>
      ${e?"":`
        <div style="margin-top:10px;padding:8px 12px;border-radius:8px;background:rgba(255,149,0,0.1);font-size:12px;color:var(--orange)">
          ⚡ Add Getgems API key for live floor prices & sales data
        </div>
      `}
    </div>
  `;const r=[{id:"hot",label:"🔥 Hot"},{id:"rare",label:"💎 Rare"},{id:"all",label:"📊 All"}];if(e&&(r.push({id:"live",label:"🛒 On Sale"}),r.push({id:"history",label:"📜 Sales"})),o+='<div class="filter-row">',r.forEach(u=>{const g=u.id===y?"filter-pill active":"filter-pill";o+=`<button class="${g}" data-filter="${u.id}">${u.label}</button>`}),o+=`<button class="filter-pill${y==="search"?" active":""}" data-filter="search">🔍</button>`,o+="</div>",(y==="search"||T)&&(o+=`
      <div style="margin-bottom:12px">
        <input id="gift-search" type="text" placeholder="Search collections..."
          value="${h(T)}"
          style="width:100%;padding:10px 14px;border-radius:var(--radius-sm);border:1px solid var(--card-border);background:var(--card-bg);color:var(--tg-theme-text-color);font-size:14px;outline:none;" />
      </div>
    `),y==="live")return o+=Le(n),o+I();if(y==="history")return o+=Pe(n),o+I();const a=Ce();if(o+=`
    <div class="section-header">
      <span class="section-title">${{hot:"🔥 Hot Collections",rare:"💎 Rarest Collections",all:"📊 All Collections",search:"🔍 Search Results"}[y==="search"?"search":y]}</span>
      <span style="font-size:12px;color:var(--tg-theme-hint-color)">${a.length} shown</span>
    </div>
  `,a.length===0)o+=`
      <div class="empty-state">
        <div class="empty-state-icon">🔍</div>
        <div class="empty-state-text">No collections match "${h(T)}"</div>
      </div>
    `;else{const u=c.get("ggGiftCollections")||[],g={};Array.isArray(u)&&u.forEach(f=>{const p=f.collection||f,w=(p.name||"").toLowerCase().replace(/[^a-z0-9]/g,"");g[w]={...f,...p,floorPrice:f.floorPrice,diffPercent:f.diffPercent,volume:f.value}}),a.forEach(f=>{const p=we(f.slug),w=`https://getgems.io/gifts/${f.slug}`,F=f.name.toLowerCase().replace(/[^a-z0-9]/g,""),m=g[F],$=(m==null?void 0:m.floorPrice)||null,de=$&&n?$*n:null,C=m==null?void 0:m.diffPercent;m!=null&&m.volume&&k(Number(m.volume)),o+=`
        <div class="token-row" data-gift-slug="${h(f.slug)}">
          <div class="token-icon">${f.emoji}</div>
          <div class="token-info" style="gap:2px">
            <div class="token-name">${h(f.name)}</div>
            <div class="token-symbol">
              ${Ae(f.tier)}
              <span style="margin-left:4px;font-size:11px;color:var(--tg-theme-hint-color)">Supply: ${_(f.supply)}</span>
            </div>
          </div>
          <div class="token-price-col" style="text-align:right">
            ${$?`
              <div class="token-price">${$>=1e3?($/1e3).toFixed(1)+"K":$.toFixed(1)} TON</div>
              <div style="font-size:11px;color:${C>0?"var(--green)":C<0?"var(--red)":"var(--tg-theme-hint-color)"}">${C?(C>0?"+":"")+C.toFixed(1)+"%":E(de)}</div>
            `:""}
            <div style="display:flex;gap:4px;justify-content:flex-end;margin-top:2px">
              <a href="${h(w)}" target="_blank" rel="noopener"
                 onclick="event.stopPropagation()"
                 style="font-size:10px;color:var(--green);text-decoration:none;padding:2px 6px;border-radius:4px;background:rgba(52,199,89,0.1);">GG</a>
              <a href="${h(p)}" target="_blank" rel="noopener"
                 onclick="event.stopPropagation()"
                 style="font-size:10px;color:var(--blue);text-decoration:none;padding:2px 6px;border-radius:4px;background:rgba(0,122,255,0.1);">Frag</a>
            </div>
          </div>
        </div>
      `})}return o+I()}function Le(e){const t=c.get("ggGiftsOnSale")||[];let s=`
    <div class="section-header">
      <span class="section-title">🛒 Gifts On Sale</span>
      <span style="font-size:12px;color:var(--tg-theme-hint-color)">${t.length} listed</span>
    </div>
  `;return t.length===0?(s+=`
      <div class="empty-state">
        <div class="empty-state-icon">🛒</div>
        <div class="empty-state-text">Loading live listings...</div>
      </div>
    `,s):(t.slice(0,40).forEach(n=>{var p;const o=n.name||"Unknown Gift",r=((p=n.imageSizes)==null?void 0:p["96"])||n.image||"",a=n.sale||{},l=a.fullPrice?k(Number(a.fullPrice)):a.lastBidAmount?k(Number(a.lastBidAmount)):a.minBid?k(Number(a.minBid)):null,d=l&&e?l*e:null,u=a.type==="FixPriceSale"?"Buy Now":a.type==="Auction"?"Auction":"Sale",g=(n.attributes||[]).map(w=>w.value).join(" · "),f=n.address||"";s+=`
      <div class="token-row" onclick="window.open('https://getgems.io/nft/${f}', '_blank')">
        <div class="token-icon">
          ${r?`<img src="${h(r)}" alt="" loading="lazy" style="width:100%;height:100%;object-fit:cover;border-radius:50%" onerror="this.parentElement.textContent='🎁'" />`:"🎁"}
        </div>
        <div class="token-info">
          <div class="token-name">${h(o)}</div>
          <div class="token-symbol">${u}${g?" · "+h(g.slice(0,40)):""}</div>
        </div>
        <div class="token-price-col">
          ${l?`
            <div class="token-price">${l.toFixed(1)} TON</div>
            <div style="font-size:11px;color:var(--tg-theme-hint-color)">${d?E(d):""}</div>
          `:'<div class="token-price">—</div>'}
        </div>
      </div>
    `}),s)}function Pe(e){const t=c.get("ggGiftHistory")||[];let s=`
    <div class="section-header">
      <span class="section-title">📜 Recent Sales</span>
      <span style="font-size:12px;color:var(--tg-theme-hint-color)">${t.length} sales</span>
    </div>
  `;return t.length===0?(s+=`
      <div class="empty-state">
        <div class="empty-state-icon">📜</div>
        <div class="empty-state-text">Loading sale history...</div>
      </div>
    `,s):(t.slice(0,40).forEach(n=>{var u,g;const o=n.nftName||n.name||"Gift",r=n.price?k(Number(n.price)):n.fullPrice?k(Number(n.fullPrice)):null,a=r&&e?r*e:null,l=n.createdAt?J(Math.floor(new Date(n.createdAt).getTime()/1e3)):n.date?J(Math.floor(new Date(n.date).getTime()/1e3)):"",d=((u=n.nftImageSizes)==null?void 0:u["96"])||n.nftImage||((g=n.imageSizes)==null?void 0:g["96"])||n.image||"";s+=`
      <div class="token-row">
        <div class="token-icon">
          ${d?`<img src="${h(d)}" alt="" loading="lazy" style="width:100%;height:100%;object-fit:cover;border-radius:50%" onerror="this.parentElement.textContent='🎁'" />`:"🎁"}
        </div>
        <div class="token-info">
          <div class="token-name">${h(o)}</div>
          <div class="token-symbol" style="color:var(--green)">Sold ${l}</div>
        </div>
        <div class="token-price-col">
          ${r?`
            <div class="token-price">${r.toFixed(1)} TON</div>
            <div style="font-size:11px;color:var(--tg-theme-hint-color)">${a?E(a):""}</div>
          `:'<div class="token-price">—</div>'}
        </div>
      </div>
    `}),s)}function I(){return`
    <div class="card" style="margin-top:12px;text-align:center">
      <div style="font-size:12px;color:var(--tg-theme-hint-color);padding:8px 0">
        <a href="https://getgems.io/gifts" target="_blank" rel="noopener" style="color:var(--green);text-decoration:none">Getgems</a>
        &nbsp;·&nbsp;
        <a href="https://fragment.com/gifts" target="_blank" rel="noopener" style="color:var(--tg-theme-link-color);text-decoration:none">Fragment</a>
        ${A()?"":'&nbsp;·&nbsp; <span style="color:var(--orange)">API key needed for live data</span>'}
      </div>
    </div>
  `}function _e(){q||(q=!0,A()&&U())}function Ne(){A()&&U()}function Oe(e){const t=e.target.closest(".filter-pill");if(t){const o=t.dataset.filter;if(o==="search")y="search";else if(y=o,(o==="live"||o==="history")&&A()){const r=o==="live"?"ggGiftsOnSale":"ggGiftHistory";(c.get(r)||[]).length||U()}return!0}if(e.target.closest("#gift-search"))return!1;const n=e.target.closest(".token-row[data-gift-slug]");if(n&&!e.target.closest("a")){const o=n.dataset.giftSlug;return o&&window.open(`https://getgems.io/gifts/${o}`,"_blank"),!1}return!1}let V=null;function se(){cancelAnimationFrame(V),V=requestAnimationFrame(()=>{const e=document.getElementById("gift-search");e&&!e._hooked&&(e._hooked=!0,e.addEventListener("input",t=>{T=t.target.value;const s=document.getElementById("content");if(s){s.innerHTML=te(),se();const n=document.getElementById("gift-search");n&&(n.focus(),n.setSelectionRange(n.value.length,n.value.length))}}),e.focus())})}if(typeof MutationObserver<"u"){const e=new MutationObserver(()=>{document.getElementById("gift-search")&&se()});if(document.readyState==="loading")document.addEventListener("DOMContentLoaded",()=>{const t=document.getElementById("content");t&&e.observe(t,{childList:!0})});else{const t=document.getElementById("content");t&&e.observe(t,{childList:!0})}}const Fe=Object.freeze(Object.defineProperty({__proto__:null,mount:_e,onInteract:Oe,refresh:Ne,render:te},Symbol.toStringTag,{value:"Module"}));async function Ie(e="t.me"){const t=await P("/dns/auctions",{tld:e});return{auctions:t.data||[],total:t.total||0}}async function Me(){const{auctions:e}=await Ie("t.me");return e.sort((t,s)=>Number(s.price)-Number(t.price))}let W=!1,L="hot";async function ne(){c.set("usernamesLoading",!0);try{const e=await Me();c.update({usernameAuctions:e,usernameAuctionsTotal:e.length,usernamesLoading:!1})}catch(e){console.error("Failed to load username auctions:",e),c.set("usernamesLoading",!1)}}function Be(){const e=c.get("usernameAuctions")||[],t=Math.floor(Date.now()/1e3);switch(L){case"hot":return[...e].sort((s,n)=>n.bids-s.bids);case"ending":return[...e].filter(s=>s.date>t).sort((s,n)=>s.date-n.date);case"cheap":return[...e].sort((s,n)=>Number(s.price)-Number(n.price));default:return e}}function Re(){const e=c.get("usernamesLoading"),t=c.get("usernameAuctionsTotal")||0,s=c.get("tonPrice"),n=(s==null?void 0:s.price)||0;if(e&&t===0)return`
      <div class="section-header">
        <span class="section-title">👤 Username Auctions</span>
      </div>
      <div class="skeleton skeleton-card"></div>
      <div class="skeleton skeleton-card"></div>
      <div class="skeleton skeleton-card"></div>
      <div class="skeleton skeleton-card"></div>
    `;const r=Be().slice(0,30);let a=`
    <div class="section-header">
      <span class="section-title">👤 Username Auctions</span>
      <span class="refresh-hint">${e?"⟳":`${_(t)} active`}</span>
    </div>

    <div class="filter-row">
      <button class="filter-pill ${L==="hot"?"active":""}" data-filter="hot">🔥 Hot</button>
      <button class="filter-pill ${L==="ending"?"active":""}" data-filter="ending">⏰ Ending Soon</button>
      <button class="filter-pill ${L==="cheap"?"active":""}" data-filter="cheap">💰 Cheapest</button>
    </div>
  `;return r.length===0?(a+=`
      <div class="empty-state">
        <div class="empty-state-icon">👤</div>
        <div class="empty-state-text">No auctions found</div>
      </div>
    `,a):(r.forEach(l=>{const d=l.domain||"",u=d.replace(".t.me",""),g=k(l.price),f=g*n,p=l.bids||0,w=l.date,F=ve(w),m=w-Math.floor(Date.now()/1e3)<3600,$=p>10?"hot":p>5?"bid":"";a+=`
      <div class="card" onclick="window.open('https://fragment.com/username/${encodeURIComponent(u)}', '_blank')">
        <div class="card-header">
          <div>
            <div class="card-title">@${De(u)}</div>
            <div class="card-subtitle">${d}</div>
          </div>
          <div style="text-align:right">
            <span class="auction-timer${m?' style="color:var(--red)"':""}">${F}</span>
            ${$?`<div class="card-badge ${$}" style="margin-top:4px">${p} bids</div>`:`<div class="card-subtitle">${p} bid${p!==1?"s":""}</div>`}
          </div>
        </div>
        <div class="card-stats">
          <div class="stat">
            <span class="stat-label">Current Price</span>
            <span class="stat-value">${g.toFixed(2)} TON</span>
          </div>
          <div class="stat">
            <span class="stat-label">USD</span>
            <span class="stat-value">${E(f)}</span>
          </div>
        </div>
        <div class="bid-bar">
          <div class="bid-bar-fill" style="width: ${Math.min(p*5,100)}%"></div>
        </div>
      </div>
    `}),a)}function De(e){const t=document.createElement("span");return t.textContent=e,t.innerHTML}function He(e){const t=e.target.closest(".filter-pill");return t?(L=t.dataset.filter,!0):!1}function Ge(){W||(W=!0,ne())}function je(){ne()}const Ue=Object.freeze(Object.defineProperty({__proto__:null,mount:Ge,onInteract:He,refresh:je,render:Re},Symbol.toStringTag,{value:"Module"}));async function ze(e,t=50,s=0){return(await P(`/nfts/collections/${e}/items`,{limit:t,offset:s})).nft_items||[]}async function Je(e=50,t=0){return ze(ge.ANONYMOUS_NUMBERS,e,t)}let X=!1;async function oe(){c.set("numbersLoading",!0);try{const t=(await Je(100,0)).map(s=>{var o,r,a,l,d,u;const n=s.sale;return{address:s.address,number:((o=s.metadata)==null?void 0:o.name)||"Unknown",image:((a=(r=s.previews)==null?void 0:r[1])==null?void 0:a.url)||"",owner:((l=s.owner)==null?void 0:l.address)||"",ownerName:((d=s.owner)==null?void 0:d.name)||"",onSale:!!n,priceTon:n?k(Number(((u=n.price)==null?void 0:u.value)||0)):null,marketplace:(n==null?void 0:n.market_name)||null}});t.sort((s,n)=>s.onSale&&!n.onSale?-1:!s.onSale&&n.onSale?1:s.onSale&&n.onSale?(s.priceTon||0)-(n.priceTon||0):0),c.update({anonymousNumbers:t,numbersLoading:!1})}catch(e){console.error("Failed to load anonymous numbers:",e),c.set("numbersLoading",!1)}}function Ke(){const e=c.get("numbersLoading"),t=c.get("anonymousNumbers")||[],s=c.get("tonPrice"),n=(s==null?void 0:s.price)||0;if(e&&t.length===0)return`
      <div class="section-header">
        <span class="section-title">📱 Anonymous Numbers</span>
      </div>
      <div class="skeleton skeleton-card"></div>
      <div class="skeleton skeleton-card"></div>
      <div class="skeleton skeleton-card"></div>
    `;const o=t.filter(l=>l.onSale),r=t.filter(l=>!l.onSale);let a=`
    <div class="section-header">
      <span class="section-title">📱 Anonymous Numbers</span>
      <span class="refresh-hint">${e?"⟳":`${t.length} loaded`}</span>
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
            <span class="stat-value">${t.length}</span>
          </div>
          <div class="stat">
            <span class="stat-label">For Sale</span>
            <span class="stat-value" style="color:var(--green)">${o.length}</span>
          </div>
        </div>
      </div>
    </div>
  `;return o.length>0&&(a+=`
      <div class="section-header">
        <span class="section-title">💰 For Sale</span>
      </div>
      <div class="number-grid">
    `,o.slice(0,20).forEach(l=>{const d=l.priceTon&&n?l.priceTon*n:null;a+=`
        <div class="number-card" onclick="window.open('https://getgems.io/nft/${l.address}', '_blank')">
          <div class="number-value">${M(l.number)}</div>
          <div class="number-price">${l.priceTon?`${l.priceTon.toFixed(1)} TON`:"—"}</div>
          ${d?`<div style="font-size:11px; color:var(--tg-theme-hint-color)">${E(d)}</div>`:""}
        </div>
      `}),a+="</div>"),r.length>0&&(a+=`
      <div class="section-header">
        <span class="section-title">📋 Recent Numbers</span>
      </div>
      <div class="number-grid">
    `,r.slice(0,20).forEach(l=>{a+=`
        <div class="number-card">
          <div class="number-value">${M(l.number)}</div>
          <div class="number-price" style="color:var(--tg-theme-hint-color)">Not listed</div>
          ${l.ownerName?`<div style="font-size:10px; color:var(--tg-theme-hint-color)">${M(l.ownerName.slice(0,15))}</div>`:""}
        </div>
      `}),a+="</div>"),a}function M(e){const t=document.createElement("span");return t.textContent=e,t.innerHTML}function qe(){X||(X=!0,oe())}function Qe(){oe()}const Ve=Object.freeze(Object.defineProperty({__proto__:null,mount:qe,refresh:Qe,render:Ke},Symbol.toStringTag,{value:"Module"}));async function We(e=20,t=0){return(await P("/jettons",{limit:e,offset:t})).jettons||[]}async function Xe(e){return P(`/jettons/${e}`)}async function Ye(e=20){return(await We(e,0)).filter(s=>s.holders_count>0)}let Y=!1,S="tracked";const Ze={[v.NOT]:{name:"Notcoin",symbol:"NOT",emoji:"⚡"},[v.DOGS]:{name:"DOGS",symbol:"DOGS",emoji:"🐕"},[v.CATI]:{name:"Catizen",symbol:"CATI",emoji:"🐱"},[v.HMSTR]:{name:"Hamster Kombat",symbol:"HMSTR",emoji:"🐹"},[v.SCALE]:{name:"SCALE",symbol:"SCALE",emoji:"⚖️"},[v.REDO]:{name:"REDO",symbol:"REDO",emoji:"🔄"}};async function ie(){c.set("memecoinsLoading",!0);try{const e=[...pe],t=await G(e,["usd","ton"]),s=e.map(o=>{var g,f,p;const r=Ze[o],a=t[o],l=((g=a==null?void 0:a.prices)==null?void 0:g.USD)||0,d=((f=a==null?void 0:a.diff_24h)==null?void 0:f.USD)||"0",u=((p=a==null?void 0:a.diff_7d)==null?void 0:p.USD)||"0";return{address:o,name:(r==null?void 0:r.name)||o.slice(0,8)+"...",symbol:(r==null?void 0:r.symbol)||"???",emoji:(r==null?void 0:r.emoji)||"🪙",image:(a==null?void 0:a.image)||null,price:l,diff24h:d,diff7d:u}}),n=await Promise.all(s.map(async o=>{var r,a,l;try{const d=await Xe(o.address);return{...o,holders:d.holders_count||0,totalSupply:d.total_supply||"0",image:((r=d.metadata)==null?void 0:r.image)||o.image,name:((a=d.metadata)==null?void 0:a.name)||o.name,symbol:((l=d.metadata)==null?void 0:l.symbol)||o.symbol}}catch{return{...o,holders:0}}}));c.update({trackedTokens:n,memecoinsLoading:!1})}catch(e){console.error("Failed to load tracked tokens:",e),c.set("memecoinsLoading",!1)}}async function ae(){try{const e=await Ye(20),t=e.map(o=>o.address).slice(0,10);let s={};try{s=await G(t,["usd"])}catch{}const n=e.map(o=>{var a,l,d,u,g;const r=s[o.address];return{address:o.address,name:((a=o.metadata)==null?void 0:a.name)||"Unknown",symbol:((l=o.metadata)==null?void 0:l.symbol)||"???",image:((d=o.metadata)==null?void 0:d.image)||null,emoji:"🆕",holders:o.holders_count||0,price:((u=r==null?void 0:r.prices)==null?void 0:u.USD)||0,diff24h:((g=r==null?void 0:r.diff_24h)==null?void 0:g.USD)||"0"}});c.set("newTokens",n)}catch(e){console.error("Failed to load new tokens:",e)}}function et(){const e=c.get("memecoinsLoading"),t=c.get("trackedTokens")||[],s=c.get("newTokens")||[];if(e&&t.length===0)return`
      <div class="section-header">
        <span class="section-title">🚀 TON Tokens</span>
      </div>
      <div class="skeleton skeleton-row"></div>
      <div class="skeleton skeleton-row"></div>
      <div class="skeleton skeleton-row"></div>
      <div class="skeleton skeleton-row"></div>
      <div class="skeleton skeleton-row"></div>
    `;let n=`
    <div class="section-header">
      <span class="section-title">🚀 TON Tokens</span>
      <span class="refresh-hint">${e?"⟳":""}</span>
    </div>

    <div class="filter-row">
      <button class="filter-pill ${S==="tracked"?"active":""}" data-filter="tracked">📊 Tracked</button>
      <button class="filter-pill ${S==="new"?"active":""}" data-filter="new">🆕 New Tokens</button>
    </div>
  `;const o=S==="tracked"?t:s;if(o.length===0)return n+=`
      <div class="empty-state">
        <div class="empty-state-icon">${S==="new"?"🆕":"🚀"}</div>
        <div class="empty-state-text">
          ${S==="new"?"Loading new tokens...":"No tracked tokens yet"}
        </div>
      </div>
    `,n;if([...o].sort((a,l)=>(l.price||0)-(a.price||0)).forEach(a=>{const l=Z(a.diff24h),d=a.image&&!a.image.includes("data:");n+=`
      <div class="token-row" onclick="window.open('https://tonviewer.com/${a.address}', '_blank')">
        <div class="token-icon">
          ${d?`<img src="${B(a.image)}" alt="" loading="lazy" onerror="this.parentElement.textContent='${a.emoji}'"/>`:a.emoji}
        </div>
        <div class="token-info">
          <div class="token-name">${B(a.symbol)}</div>
          <div class="token-symbol">${B(a.name)}${a.holders?` · ${_(a.holders)} holders`:""}</div>
        </div>
        <div class="token-price-col">
          <div class="token-price">${a.price?E(a.price):"—"}</div>
          <div class="token-change ${l.dir}">${l.text}</div>
        </div>
      </div>
    `}),S==="tracked"&&t.length>0){const a=t.filter(d=>parseFloat(String(d.diff24h).replace(/[^0-9.-]/g,""))>0).length,l=t.length-a;n+=`
      <div class="card" style="margin-top: 12px; text-align:center;">
        <div style="display:flex; justify-content:center; gap:24px;">
          <div class="stat">
            <span class="stat-label">Gainers</span>
            <span class="stat-value up">${a}</span>
          </div>
          <div class="stat">
            <span class="stat-label">Losers</span>
            <span class="stat-value down">${l}</span>
          </div>
          <div class="stat">
            <span class="stat-label">Tracking</span>
            <span class="stat-value">${t.length}</span>
          </div>
        </div>
      </div>
    `}return n}function B(e){if(!e)return"";const t=document.createElement("span");return t.textContent=e,t.innerHTML}function tt(e){const t=e.target.closest(".filter-pill");if(t){const s=t.dataset.filter;if(s!==S)return S=s,s==="new"&&(c.get("newTokens")||[]).length===0&&ae(),!0}return!1}function st(){Y||(Y=!0,ie())}function nt(){ie(),S==="new"&&ae()}const ot=Object.freeze(Object.defineProperty({__proto__:null,mount:st,onInteract:tt,refresh:nt,render:et},Symbol.toStringTag,{value:"Module"})),x={gifts:Fe,usernames:Ue,numbers:Ve,memecoins:ot},re=document.getElementById("content"),R=document.getElementById("ton-price"),le=document.getElementById("tabs");function it(){var e,t;try{const s=(e=window.Telegram)==null?void 0:e.WebApp;if(s){if(s.ready(),s.expand(),(t=s.enableClosingConfirmation)==null||t.call(s),s.themeParams){const n=s.themeParams,o=document.documentElement.style;n.bg_color&&o.setProperty("--tg-theme-bg-color",n.bg_color),n.text_color&&o.setProperty("--tg-theme-text-color",n.text_color),n.hint_color&&o.setProperty("--tg-theme-hint-color",n.hint_color),n.link_color&&o.setProperty("--tg-theme-link-color",n.link_color),n.button_color&&o.setProperty("--tg-theme-button-color",n.button_color),n.button_text_color&&o.setProperty("--tg-theme-button-text-color",n.button_text_color),n.secondary_bg_color&&o.setProperty("--tg-theme-secondary-bg-color",n.secondary_bg_color)}console.log("✅ Telegram Web App initialized")}}catch(s){console.warn("TMA init skipped (not in Telegram):",s.message)}}async function ce(){try{const e=await me();e&&(c.set("tonPrice",e),at(e))}catch(e){console.error("TON price fetch failed:",e)}}function at(e){if(!R||!e)return;const t=Z(e.diff24h);R.querySelector(".price-value").textContent=`TON $${e.price.toFixed(2)}`;const s=R.querySelector(".price-change");s.textContent=t.text,s.className=`price-change ${t.dir}`}let b="gifts";function rt(e){if(!x[e]||e===b)return;b=e,c.set("activeTab",e),le.querySelectorAll(".tab").forEach(s=>{s.classList.toggle("active",s.dataset.tab===e)});const t=x[e];t.mount&&t.mount(),O()}function O(){const e=x[b];if(!e)return;const t=e.render();re.innerHTML=t}le.addEventListener("click",e=>{const t=e.target.closest(".tab");t&&rt(t.dataset.tab)});re.addEventListener("click",e=>{const t=x[b];t!=null&&t.onInteract&&t.onInteract(e)&&O()});const lt={gifts:["giftsLoading","giftCollections","tonPrice","ggGiftCollections","ggGiftsOnSale","ggGiftHistory"],usernames:["usernamesLoading","usernameAuctions","usernameAuctionsTotal","tonPrice"],numbers:["numbersLoading","anonymousNumbers","tonPrice"],memecoins:["memecoinsLoading","trackedTokens","newTokens","tokenPrices","tonPrice"]};let D=!1,H=null;function ct(e){e===b&&(D||(D=!0,H=e,requestAnimationFrame(()=>{D=!1,H===b&&O(),H=null})))}c.on("*",e=>{const t=lt[b];t&&t.includes(e)&&ct(b)});function dt(){setInterval(ce,z.PRICES),setInterval(()=>{const e=x[b];e!=null&&e.refresh&&e.refresh()},z.NFT_DATA)}async function ut(){console.log("🚀 TON Trading Hub starting..."),it(),await ce();const e=x[b];e.mount&&e.mount(),O(),dt(),console.log("✅ TON Trading Hub ready")}ut();
