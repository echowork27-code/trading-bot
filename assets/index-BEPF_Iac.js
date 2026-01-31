(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const o of document.querySelectorAll('link[rel="modulepreload"]'))a(o);new MutationObserver(o=>{for(const r of o)if(r.type==="childList")for(const i of r.addedNodes)i.tagName==="LINK"&&i.rel==="modulepreload"&&a(i)}).observe(document,{childList:!0,subtree:!0});function s(o){const r={};return o.integrity&&(r.integrity=o.integrity),o.referrerPolicy&&(r.referrerPolicy=o.referrerPolicy),o.crossOrigin==="use-credentials"?r.credentials="include":o.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function a(o){if(o.ep)return;o.ep=!0;const r=s(o);fetch(o.href,r)}})();class ne{constructor(){this.data={activeTab:"gifts",tonPrice:null,giftCollections:[],giftItems:[],giftsLoading:!0,usernameAuctions:[],usernameAuctionsTotal:0,usernamesLoading:!0,anonymousNumbers:[],numbersLoading:!0,trackedTokens:[],newTokens:[],tokenPrices:{},memecoinsLoading:!0},this.listeners=new Map}get(t){return this.data[t]}set(t,s){this.data[t]=s,this._notify(t,s)}update(t){Object.entries(t).forEach(([s,a])=>{this.data[s]=a}),Object.keys(t).forEach(s=>{this._notify(s,this.data[s])})}on(t,s){return this.listeners.has(t)||this.listeners.set(t,new Set),this.listeners.get(t).add(s),()=>{var a;return(a=this.listeners.get(t))==null?void 0:a.delete(s)}}_notify(t,s){var a,o;(a=this.listeners.get(t))==null||a.forEach(r=>{try{r(s)}catch(i){console.error("Store listener error:",i)}}),(o=this.listeners.get("*"))==null||o.forEach(r=>{try{r(t,s)}catch(i){console.error("Store wildcard listener error:",i)}})}}const l=new ne,oe="https://tonapi.io/v2",ae={ANONYMOUS_NUMBERS:"EQAOQdwdw8kGftJCSFgOErM1mBjYPe4DBPq8-AhF6vr9si5N"},u={SCALE:"EQBlqsm144Dq6SjbPI4jjZvA1hqTIP3CvHovbIfW_t-SCALE",NOT:"EQAvlWFDxGF2lXm67y4yzC17wYKD9A0guwPkMs1gOsM__NOT",DOGS:"EQCvxJy4eG8hyHBFsZ7eePxrRsUQSFE_jpptRAbs2MFsmJya",CATI:"EQD-cvR0Nz6XAyRBvbhz-abTrRC6sI5tvHvvpeQraV9UAAD7",HMSTR:"EQAJ8uWd7EBqsmpSWaRdf_I-8R8-XHwh3gsNKhy-UrdrPcUo",REDO:"EQAYqo4u7VF0fa4DPAebk4g9lBytj2VFny7pzXR0trSAkXPB"},re=[u.NOT,u.DOGS,u.CATI,u.HMSTR,u.SCALE,u.REDO],M={PRICES:3e4,NFT_DATA:6e4};async function w(e,t={}){const s=new URL(`${oe}${e}`);Object.entries(t).forEach(([o,r])=>{r!=null&&s.searchParams.set(o,String(r))});const a=await fetch(s.toString(),{headers:{Accept:"application/json"}});if(!a.ok){const o=await a.text();throw new Error(`TON API ${a.status}: ${o}`)}return a.json()}async function P(e,t=["usd"]){return(await w("/rates",{tokens:e.join(","),currencies:t.join(",")})).rates||{}}async function ie(){var s,a,o,r;const t=(await P(["ton"],["usd"])).TON;return t?{price:((s=t.prices)==null?void 0:s.USD)||0,diff24h:((a=t.diff_24h)==null?void 0:a.USD)||"0%",diff7d:((o=t.diff_7d)==null?void 0:o.USD)||"0%",diff30d:((r=t.diff_30d)==null?void 0:r.USD)||"0%"}:null}function z(e){return Number(e)/1e9}function O(e){return e==null?"—":e>=1?`$${e.toFixed(2)}`:e>=.01?`$${e.toFixed(4)}`:e>=1e-4?`$${e.toFixed(6)}`:`$${e.toExponential(2)}`}function G(e){if(!e)return{text:"—",dir:"neutral"};const t=e.replace(/[−–]/g,"-").replace("%","").trim(),s=parseFloat(t);if(isNaN(s))return{text:e,dir:"neutral"};const a=s>0?"up":s<0?"down":"neutral";return{text:s>0?`+${s.toFixed(2)}%`:`${s.toFixed(2)}%`,dir:a}}function k(e){return e>=1e6?`${(e/1e6).toFixed(1)}M`:e>=1e3?`${(e/1e3).toFixed(1)}K`:e.toLocaleString()}function ce(e){const t=Math.floor(Date.now()/1e3),s=e-t;if(s<=0)return"Ended";const a=Math.floor(s/86400),o=Math.floor(s%86400/3600),r=Math.floor(s%3600/60);return a>0?`${a}d ${o}h`:o>0?`${o}h ${r}m`:`${r}m`}function le(e){return e<1500?"legendary":e<3e3?"epic":e<6e3?"rare":e<15e3?"uncommon":"common"}function de(e){return e.toLowerCase().replace(/[''\u2019]/g,"").replace(/[^a-z0-9]+/g,"-").replace(/^-|-$/g,"")}function n(e,t,s){return{slug:de(e),name:e,supply:t,tier:le(t),emoji:s}}const E=[n("Heart Lockets",891,"💖"),n("Heroic Helmets",1027,"⚔️"),n("Bling Binkies",1095,"👶"),n("Mighty Arms",1327,"💪"),n("Nail Bracelets",1382,"💅"),n("Khabib's Papakhas",1509,"🧢"),n("Ionic Dryers",1631,"💇"),n("Gem Signets",1662,"💎"),n("Artisan Bricks",1874,"🧱"),n("Mini Oscars",1844,"🏆"),n("Perfume Bottles",1835,"🧴"),n("Precious Peaches",1962,"🍑"),n("Pretty Posies",1999,"🌸"),n("Joyful Bundles",2102,"🎀"),n("Genie Lamps",2258,"🪔"),n("Plush Pepes",2310,"🐸"),n("Bonded Rings",2323,"💍"),n("Ion Gems",2335,"🔮"),n("Love Candles",2340,"🕯️"),n("Astral Shards",2442,"✨"),n("Valentine Boxes",2292,"💝"),n("Mousse Cakes",2688,"🍰"),n("UFC Strikes",2701,"🥊"),n("Durov's Caps",2753,"🧢"),n("Sleigh Bells",2966,"🔔"),n("Magic Potions",3062,"🧪"),n("Neko Helmets",3176,"🐱"),n("Sharp Tongues",3359,"👅"),n("Westside Signs",3504,"🤙"),n("Snow Mittens",3526,"🧤"),n("Sky Stilettos",3573,"👠"),n("Electric Skulls",3665,"💀"),n("Lush Bouquets",3635,"💐"),n("Crystal Balls",6863,"🔮"),n("Cupid Charms",4190,"💘"),n("Holiday Drinks",4054,"🍹"),n("Record Players",4361,"🎵"),n("Eternal Roses",4349,"🌹"),n("Money Pots",4411,"🍯"),n("Bunny Muffins",4705,"🐰"),n("Hanging Stars",4915,"⭐"),n("Low Riders",4964,"🚗"),n("Snake Boxes",4964,"🐍"),n("Love Potions",5177,"💜"),n("Happy Brownies",5268,"🍫"),n("Fresh Socks",5495,"🧦"),n("Bow Ties",5593,"🎀"),n("Loot Bags",5575,"💰"),n("Mad Pumpkins",5590,"🎃"),n("Flying Brooms",5813,"🧹"),n("Star Notepads",5861,"📝"),n("Jingle Bells",5865,"🔔"),n("Spring Baskets",5944,"🧺"),n("Skull Flowers",6003,"💀"),n("Restless Jars",6048,"🫙"),n("Signet Rings",6126,"💍"),n("Pet Snakes",6223,"🐍"),n("Diamond Rings",6413,"💎"),n("Hypno Lollipops",6561,"🍭"),n("Top Hats",6535,"🎩"),n("Kissed Frogs",6762,"🐸"),n("Faith Amulets",6765,"🧿"),n("Vintage Cigars",6770,"🚬"),n("Whip Cupcakes",6982,"🧁"),n("Snow Globes",4177,"🔮"),n("Berry Boxes",7579,"🍓"),n("Input Keys",7327,"⌨️"),n("Tama Gadgets",7758,"🎮"),n("Big Years",7973,"📅"),n("Swiss Watches",8625,"⌚"),n("Jester Hats",8623,"🃏"),n("Trapped Hearts",8860,"❤️‍🔥"),n("Candy Canes",9177,"🍬"),n("Jolly Chimps",9108,"🐒"),n("Voodoo Dolls",9102,"🪆"),n("Moon Pendants",9386,"🌙"),n("Santa Hats",9248,"🎅"),n("Spiced Wines",9778,"🍷"),n("Eternal Candles",9823,"🕯️"),n("Cookie Hearts",9981,"🍪"),n("Sakura Flowers",10061,"🌸"),n("Stellar Rockets",10647,"🚀"),n("Lunar Snakes",10894,"🌙"),n("Snoop Cigars",11237,"🚬"),n("Instant Ramens",11651,"🍜"),n("Jelly Bunnies",11363,"🐇"),n("Clover Pins",11562,"🍀"),n("Light Swords",12007,"⚡"),n("Hex Pots",12801,"🧙"),n("Scared Cats",12454,"🙀"),n("Ginger Cookies",13686,"🍪"),n("Jacks-in-the-Box",13410,"🤡"),n("Swag Bags",13840,"👜"),n("Evil Eyes",15575,"🧿"),n("Party Sparklers",16812,"🎇"),n("B-Day Candles",19540,"🎂"),n("Ice Creams",20395,"🍦"),n("Easter Eggs",20998,"🥚"),n("Desk Calendars",26243,"🗓️"),n("Spy Agarics",26610,"🍄"),n("Toy Bears",27085,"🧸"),n("Homemade Cakes",29674,"🎂"),n("Witch Hats",28916,"🧙"),n("Snoop Doggs",35447,"🐕"),n("Lol Pops",54380,"🍭"),n("Xmas Stockings",7324,"🧦")],ue=E.reduce((e,t)=>e+t.supply,0),R=E.reduce((e,t)=>(e[t.tier]=(e[t.tier]||0)+1,e),{}),me={legendary:{label:"Legendary",color:"#FFD700",bg:"rgba(255,215,0,0.15)"},epic:{label:"Epic",color:"#AF52DE",bg:"rgba(175,82,222,0.15)"},rare:{label:"Rare",color:"#007AFF",bg:"rgba(0,122,255,0.15)"},uncommon:{label:"Uncommon",color:"#34C759",bg:"rgba(52,199,89,0.15)"},common:{label:"Common",color:"#8E8E93",bg:"rgba(142,142,147,0.15)"}},fe="https://fragment.com";function J(e){return`${fe}/gift/${encodeURIComponent(e)}`}let b="hot",v="";function S(e){if(!e)return"";const t=document.createElement("span");return t.textContent=e,t.innerHTML}function pe(e){const t=me[e];return t?`<span class="card-badge" style="background:${t.bg};color:${t.color}">${t.label}</span>`:""}const B=(e,t)=>e.supply-t.supply;function ge(){let e=[...E];if(v.trim()){const t=v.trim().toLowerCase();e=e.filter(s=>s.name.toLowerCase().includes(t)||s.tier.includes(t)||s.emoji.includes(t))}switch(b){case"hot":e.sort(B),e=e.slice(0,30);break;case"rare":e.sort(B);break;case"all":default:e.sort((t,s)=>t.name.localeCompare(s.name));break}return e}function q(){const e=ge();let t="";t+=`
    <div class="section-header">
      <span class="section-title">🎁 Gift Market</span>
    </div>
    <div class="card">
      <div class="card-stats" style="justify-content:space-between">
        <div class="stat">
          <span class="stat-label">Collections</span>
          <span class="stat-value">${E.length}</span>
        </div>
        <div class="stat">
          <span class="stat-label">Total Gifts</span>
          <span class="stat-value">${k(ue)}</span>
        </div>
        <div class="stat">
          <span class="stat-label">Legendary</span>
          <span class="stat-value" style="color:#FFD700">${R.legendary||0}</span>
        </div>
        <div class="stat">
          <span class="stat-label">Epic</span>
          <span class="stat-value" style="color:#AF52DE">${R.epic||0}</span>
        </div>
      </div>
    </div>
  `;const s=[{id:"hot",label:"🔥 Hot"},{id:"rare",label:"💎 Rare"},{id:"all",label:"📊 All"}];return t+='<div class="filter-row">',s.forEach(r=>{const i=r.id===b?"filter-pill active":"filter-pill";t+=`<button class="${i}" data-filter="${r.id}">${r.label}</button>`}),t+=`<button class="filter-pill${v?" active":""}" data-filter="search">🔍 Search</button>`,t+="</div>",(b==="search"||v)&&(t+=`
      <div style="margin-bottom:12px">
        <input
          id="gift-search"
          type="text"
          placeholder="Search collections..."
          value="${S(v)}"
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
    `),t+=`
    <div class="section-header">
      <span class="section-title">${{hot:"🔥 Hot Collections",rare:"💎 Rarest Collections",all:"📊 All Collections",search:"🔍 Search Results"}[b==="search"?"search":b]}</span>
      <span style="font-size:12px;color:var(--tg-theme-hint-color)">${e.length} shown</span>
    </div>
  `,e.length===0?t+=`
      <div class="empty-state">
        <div class="empty-state-icon">🔍</div>
        <div class="empty-state-text">No collections match "${S(v)}"</div>
      </div>
    `:e.forEach(r=>{const i=J(r.slug);t+=`
        <div class="token-row" data-gift-slug="${S(r.slug)}">
          <div class="token-icon">${r.emoji}</div>
          <div class="token-info" style="gap:2px">
            <div class="token-name">${S(r.name)}</div>
            <div class="token-symbol">
              ${pe(r.tier)}
              <span style="margin-left:4px;font-size:11px;color:var(--tg-theme-hint-color)">Supply: ${k(r.supply)}</span>
            </div>
          </div>
          <div class="token-price-col" style="display:flex;align-items:center;gap:6px">
            <a href="${S(i)}" target="_blank" rel="noopener"
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
      `}),t+=`
    <div class="card" style="margin-top:12px;text-align:center">
      <div style="font-size:12px;color:var(--tg-theme-hint-color);padding:8px 0">
        Data from <a href="https://fragment.com" target="_blank" rel="noopener" style="color:var(--tg-theme-link-color);text-decoration:none">Fragment.com</a>
        &nbsp;·&nbsp; Prices coming soon via TON API
      </div>
    </div>
  `,t}function ve(){}function he(){}function be(e){const t=e.target.closest(".filter-pill");if(t){const o=t.dataset.filter;return o==="search"?(b="search",v=v||""):b=o,!0}if(e.target.closest("#gift-search"))return!1;const a=e.target.closest(".token-row[data-gift-slug]");if(a&&!e.target.closest("a")){const o=a.dataset.giftSlug;return o&&window.open(J(o),"_blank"),!1}return!1}let D=null;function K(){cancelAnimationFrame(D),D=requestAnimationFrame(()=>{const e=document.getElementById("gift-search");e&&!e._hooked&&(e._hooked=!0,e.addEventListener("input",t=>{v=t.target.value;const s=document.getElementById("content");if(s){const a=q();s.innerHTML=a,K();const o=document.getElementById("gift-search");o&&(o.focus(),o.setSelectionRange(o.value.length,o.value.length))}}),e.focus())})}if(typeof MutationObserver<"u"){const e=new MutationObserver(()=>{document.getElementById("gift-search")&&K()});if(document.readyState==="loading")document.addEventListener("DOMContentLoaded",()=>{const t=document.getElementById("content");t&&e.observe(t,{childList:!0})});else{const t=document.getElementById("content");t&&e.observe(t,{childList:!0})}}const ye=Object.freeze(Object.defineProperty({__proto__:null,mount:ve,onInteract:be,refresh:he,render:q},Symbol.toStringTag,{value:"Module"}));async function Se(e="t.me"){const t=await w("/dns/auctions",{tld:e});return{auctions:t.data||[],total:t.total||0}}async function $e(){const{auctions:e}=await Se("t.me");return e.sort((t,s)=>Number(s.price)-Number(t.price))}let H=!1,$="hot";async function Q(){l.set("usernamesLoading",!0);try{const e=await $e();l.update({usernameAuctions:e,usernameAuctionsTotal:e.length,usernamesLoading:!1})}catch(e){console.error("Failed to load username auctions:",e),l.set("usernamesLoading",!1)}}function we(){const e=l.get("usernameAuctions")||[],t=Math.floor(Date.now()/1e3);switch($){case"hot":return[...e].sort((s,a)=>a.bids-s.bids);case"ending":return[...e].filter(s=>s.date>t).sort((s,a)=>s.date-a.date);case"cheap":return[...e].sort((s,a)=>Number(s.price)-Number(a.price));default:return e}}function Te(){const e=l.get("usernamesLoading"),t=l.get("usernameAuctionsTotal")||0,s=l.get("tonPrice"),a=(s==null?void 0:s.price)||0;if(e&&t===0)return`
      <div class="section-header">
        <span class="section-title">👤 Username Auctions</span>
      </div>
      <div class="skeleton skeleton-card"></div>
      <div class="skeleton skeleton-card"></div>
      <div class="skeleton skeleton-card"></div>
      <div class="skeleton skeleton-card"></div>
    `;const r=we().slice(0,30);let i=`
    <div class="section-header">
      <span class="section-title">👤 Username Auctions</span>
      <span class="refresh-hint">${e?"⟳":`${k(t)} active`}</span>
    </div>

    <div class="filter-row">
      <button class="filter-pill ${$==="hot"?"active":""}" data-filter="hot">🔥 Hot</button>
      <button class="filter-pill ${$==="ending"?"active":""}" data-filter="ending">⏰ Ending Soon</button>
      <button class="filter-pill ${$==="cheap"?"active":""}" data-filter="cheap">💰 Cheapest</button>
    </div>
  `;return r.length===0?(i+=`
      <div class="empty-state">
        <div class="empty-state-icon">👤</div>
        <div class="empty-state-text">No auctions found</div>
      </div>
    `,i):(r.forEach(c=>{const d=c.domain||"",m=d.replace(".t.me",""),h=z(c.price),T=h*a,p=c.bids||0,F=c.date,te=ce(F),se=F-Math.floor(Date.now()/1e3)<3600,I=p>10?"hot":p>5?"bid":"";i+=`
      <div class="card" onclick="window.open('https://fragment.com/username/${encodeURIComponent(m)}', '_blank')">
        <div class="card-header">
          <div>
            <div class="card-title">@${ke(m)}</div>
            <div class="card-subtitle">${d}</div>
          </div>
          <div style="text-align:right">
            <span class="auction-timer${se?' style="color:var(--red)"':""}">${te}</span>
            ${I?`<div class="card-badge ${I}" style="margin-top:4px">${p} bids</div>`:`<div class="card-subtitle">${p} bid${p!==1?"s":""}</div>`}
          </div>
        </div>
        <div class="card-stats">
          <div class="stat">
            <span class="stat-label">Current Price</span>
            <span class="stat-value">${h.toFixed(2)} TON</span>
          </div>
          <div class="stat">
            <span class="stat-label">USD</span>
            <span class="stat-value">${O(T)}</span>
          </div>
        </div>
        <div class="bid-bar">
          <div class="bid-bar-fill" style="width: ${Math.min(p*5,100)}%"></div>
        </div>
      </div>
    `}),i)}function ke(e){const t=document.createElement("span");return t.textContent=e,t.innerHTML}function Ee(e){const t=e.target.closest(".filter-pill");return t?($=t.dataset.filter,!0):!1}function xe(){H||(H=!0,Q())}function _e(){Q()}const Ae=Object.freeze(Object.defineProperty({__proto__:null,mount:xe,onInteract:Ee,refresh:_e,render:Te},Symbol.toStringTag,{value:"Module"}));async function Ce(e,t=50,s=0){return(await w(`/nfts/collections/${e}/items`,{limit:t,offset:s})).nft_items||[]}async function Le(e=50,t=0){return Ce(ae.ANONYMOUS_NUMBERS,e,t)}let j=!1;async function V(){l.set("numbersLoading",!0);try{const t=(await Le(100,0)).map(s=>{var o,r,i,c,d,m;const a=s.sale;return{address:s.address,number:((o=s.metadata)==null?void 0:o.name)||"Unknown",image:((i=(r=s.previews)==null?void 0:r[1])==null?void 0:i.url)||"",owner:((c=s.owner)==null?void 0:c.address)||"",ownerName:((d=s.owner)==null?void 0:d.name)||"",onSale:!!a,priceTon:a?z(Number(((m=a.price)==null?void 0:m.value)||0)):null,marketplace:(a==null?void 0:a.market_name)||null}});t.sort((s,a)=>s.onSale&&!a.onSale?-1:!s.onSale&&a.onSale?1:s.onSale&&a.onSale?(s.priceTon||0)-(a.priceTon||0):0),l.update({anonymousNumbers:t,numbersLoading:!1})}catch(e){console.error("Failed to load anonymous numbers:",e),l.set("numbersLoading",!1)}}function Ne(){const e=l.get("numbersLoading"),t=l.get("anonymousNumbers")||[],s=l.get("tonPrice"),a=(s==null?void 0:s.price)||0;if(e&&t.length===0)return`
      <div class="section-header">
        <span class="section-title">📱 Anonymous Numbers</span>
      </div>
      <div class="skeleton skeleton-card"></div>
      <div class="skeleton skeleton-card"></div>
      <div class="skeleton skeleton-card"></div>
    `;const o=t.filter(c=>c.onSale),r=t.filter(c=>!c.onSale);let i=`
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
  `;return o.length>0&&(i+=`
      <div class="section-header">
        <span class="section-title">💰 For Sale</span>
      </div>
      <div class="number-grid">
    `,o.slice(0,20).forEach(c=>{const d=c.priceTon&&a?c.priceTon*a:null;i+=`
        <div class="number-card" onclick="window.open('https://getgems.io/nft/${c.address}', '_blank')">
          <div class="number-value">${_(c.number)}</div>
          <div class="number-price">${c.priceTon?`${c.priceTon.toFixed(1)} TON`:"—"}</div>
          ${d?`<div style="font-size:11px; color:var(--tg-theme-hint-color)">${O(d)}</div>`:""}
        </div>
      `}),i+="</div>"),r.length>0&&(i+=`
      <div class="section-header">
        <span class="section-title">📋 Recent Numbers</span>
      </div>
      <div class="number-grid">
    `,r.slice(0,20).forEach(c=>{i+=`
        <div class="number-card">
          <div class="number-value">${_(c.number)}</div>
          <div class="number-price" style="color:var(--tg-theme-hint-color)">Not listed</div>
          ${c.ownerName?`<div style="font-size:10px; color:var(--tg-theme-hint-color)">${_(c.ownerName.slice(0,15))}</div>`:""}
        </div>
      `}),i+="</div>"),i}function _(e){const t=document.createElement("span");return t.textContent=e,t.innerHTML}function Pe(){j||(j=!0,V())}function Oe(){V()}const Fe=Object.freeze(Object.defineProperty({__proto__:null,mount:Pe,refresh:Oe,render:Ne},Symbol.toStringTag,{value:"Module"}));async function Ie(e=20,t=0){return(await w("/jettons",{limit:e,offset:t})).jettons||[]}async function Me(e){return w(`/jettons/${e}`)}async function Re(e=20){return(await Ie(e,0)).filter(s=>s.holders_count>0)}let U=!1,g="tracked";const Be={[u.NOT]:{name:"Notcoin",symbol:"NOT",emoji:"⚡"},[u.DOGS]:{name:"DOGS",symbol:"DOGS",emoji:"🐕"},[u.CATI]:{name:"Catizen",symbol:"CATI",emoji:"🐱"},[u.HMSTR]:{name:"Hamster Kombat",symbol:"HMSTR",emoji:"🐹"},[u.SCALE]:{name:"SCALE",symbol:"SCALE",emoji:"⚖️"},[u.REDO]:{name:"REDO",symbol:"REDO",emoji:"🔄"}};async function W(){l.set("memecoinsLoading",!0);try{const e=[...re],t=await P(e,["usd","ton"]),s=e.map(o=>{var h,T,p;const r=Be[o],i=t[o],c=((h=i==null?void 0:i.prices)==null?void 0:h.USD)||0,d=((T=i==null?void 0:i.diff_24h)==null?void 0:T.USD)||"0",m=((p=i==null?void 0:i.diff_7d)==null?void 0:p.USD)||"0";return{address:o,name:(r==null?void 0:r.name)||o.slice(0,8)+"...",symbol:(r==null?void 0:r.symbol)||"???",emoji:(r==null?void 0:r.emoji)||"🪙",image:(i==null?void 0:i.image)||null,price:c,diff24h:d,diff7d:m}}),a=await Promise.all(s.map(async o=>{var r,i,c;try{const d=await Me(o.address);return{...o,holders:d.holders_count||0,totalSupply:d.total_supply||"0",image:((r=d.metadata)==null?void 0:r.image)||o.image,name:((i=d.metadata)==null?void 0:i.name)||o.name,symbol:((c=d.metadata)==null?void 0:c.symbol)||o.symbol}}catch{return{...o,holders:0}}}));l.update({trackedTokens:a,memecoinsLoading:!1})}catch(e){console.error("Failed to load tracked tokens:",e),l.set("memecoinsLoading",!1)}}async function X(){try{const e=await Re(20),t=e.map(o=>o.address).slice(0,10);let s={};try{s=await P(t,["usd"])}catch{}const a=e.map(o=>{var i,c,d,m,h;const r=s[o.address];return{address:o.address,name:((i=o.metadata)==null?void 0:i.name)||"Unknown",symbol:((c=o.metadata)==null?void 0:c.symbol)||"???",image:((d=o.metadata)==null?void 0:d.image)||null,emoji:"🆕",holders:o.holders_count||0,price:((m=r==null?void 0:r.prices)==null?void 0:m.USD)||0,diff24h:((h=r==null?void 0:r.diff_24h)==null?void 0:h.USD)||"0"}});l.set("newTokens",a)}catch(e){console.error("Failed to load new tokens:",e)}}function De(){const e=l.get("memecoinsLoading"),t=l.get("trackedTokens")||[],s=l.get("newTokens")||[];if(e&&t.length===0)return`
      <div class="section-header">
        <span class="section-title">🚀 TON Tokens</span>
      </div>
      <div class="skeleton skeleton-row"></div>
      <div class="skeleton skeleton-row"></div>
      <div class="skeleton skeleton-row"></div>
      <div class="skeleton skeleton-row"></div>
      <div class="skeleton skeleton-row"></div>
    `;let a=`
    <div class="section-header">
      <span class="section-title">🚀 TON Tokens</span>
      <span class="refresh-hint">${e?"⟳":""}</span>
    </div>

    <div class="filter-row">
      <button class="filter-pill ${g==="tracked"?"active":""}" data-filter="tracked">📊 Tracked</button>
      <button class="filter-pill ${g==="new"?"active":""}" data-filter="new">🆕 New Tokens</button>
    </div>
  `;const o=g==="tracked"?t:s;if(o.length===0)return a+=`
      <div class="empty-state">
        <div class="empty-state-icon">${g==="new"?"🆕":"🚀"}</div>
        <div class="empty-state-text">
          ${g==="new"?"Loading new tokens...":"No tracked tokens yet"}
        </div>
      </div>
    `,a;if([...o].sort((i,c)=>(c.price||0)-(i.price||0)).forEach(i=>{const c=G(i.diff24h),d=i.image&&!i.image.includes("data:");a+=`
      <div class="token-row" onclick="window.open('https://tonviewer.com/${i.address}', '_blank')">
        <div class="token-icon">
          ${d?`<img src="${A(i.image)}" alt="" loading="lazy" onerror="this.parentElement.textContent='${i.emoji}'"/>`:i.emoji}
        </div>
        <div class="token-info">
          <div class="token-name">${A(i.symbol)}</div>
          <div class="token-symbol">${A(i.name)}${i.holders?` · ${k(i.holders)} holders`:""}</div>
        </div>
        <div class="token-price-col">
          <div class="token-price">${i.price?O(i.price):"—"}</div>
          <div class="token-change ${c.dir}">${c.text}</div>
        </div>
      </div>
    `}),g==="tracked"&&t.length>0){const i=t.filter(d=>parseFloat(String(d.diff24h).replace(/[^0-9.-]/g,""))>0).length,c=t.length-i;a+=`
      <div class="card" style="margin-top: 12px; text-align:center;">
        <div style="display:flex; justify-content:center; gap:24px;">
          <div class="stat">
            <span class="stat-label">Gainers</span>
            <span class="stat-value up">${i}</span>
          </div>
          <div class="stat">
            <span class="stat-label">Losers</span>
            <span class="stat-value down">${c}</span>
          </div>
          <div class="stat">
            <span class="stat-label">Tracking</span>
            <span class="stat-value">${t.length}</span>
          </div>
        </div>
      </div>
    `}return a}function A(e){if(!e)return"";const t=document.createElement("span");return t.textContent=e,t.innerHTML}function He(e){const t=e.target.closest(".filter-pill");if(t){const s=t.dataset.filter;if(s!==g)return g=s,s==="new"&&(l.get("newTokens")||[]).length===0&&X(),!0}return!1}function je(){U||(U=!0,W())}function Ue(){W(),g==="new"&&X()}const ze=Object.freeze(Object.defineProperty({__proto__:null,mount:je,onInteract:He,refresh:Ue,render:De},Symbol.toStringTag,{value:"Module"})),y={gifts:ye,usernames:Ae,numbers:Fe,memecoins:ze},Y=document.getElementById("content"),C=document.getElementById("ton-price"),Z=document.getElementById("tabs");function Ge(){var e,t;try{const s=(e=window.Telegram)==null?void 0:e.WebApp;if(s){if(s.ready(),s.expand(),(t=s.enableClosingConfirmation)==null||t.call(s),s.themeParams){const a=s.themeParams,o=document.documentElement.style;a.bg_color&&o.setProperty("--tg-theme-bg-color",a.bg_color),a.text_color&&o.setProperty("--tg-theme-text-color",a.text_color),a.hint_color&&o.setProperty("--tg-theme-hint-color",a.hint_color),a.link_color&&o.setProperty("--tg-theme-link-color",a.link_color),a.button_color&&o.setProperty("--tg-theme-button-color",a.button_color),a.button_text_color&&o.setProperty("--tg-theme-button-text-color",a.button_text_color),a.secondary_bg_color&&o.setProperty("--tg-theme-secondary-bg-color",a.secondary_bg_color)}console.log("✅ Telegram Web App initialized")}}catch(s){console.warn("TMA init skipped (not in Telegram):",s.message)}}async function ee(){try{const e=await ie();e&&(l.set("tonPrice",e),Je(e))}catch(e){console.error("TON price fetch failed:",e)}}function Je(e){if(!C||!e)return;const t=G(e.diff24h);C.querySelector(".price-value").textContent=`TON $${e.price.toFixed(2)}`;const s=C.querySelector(".price-change");s.textContent=t.text,s.className=`price-change ${t.dir}`}let f="gifts";function qe(e){if(!y[e]||e===f)return;f=e,l.set("activeTab",e),Z.querySelectorAll(".tab").forEach(s=>{s.classList.toggle("active",s.dataset.tab===e)});const t=y[e];t.mount&&t.mount(),x()}function x(){const e=y[f];if(!e)return;const t=e.render();Y.innerHTML=t}Z.addEventListener("click",e=>{const t=e.target.closest(".tab");t&&qe(t.dataset.tab)});Y.addEventListener("click",e=>{const t=y[f];t!=null&&t.onInteract&&t.onInteract(e)&&x()});const Ke={gifts:["giftsLoading","giftCollections","tonPrice"],usernames:["usernamesLoading","usernameAuctions","usernameAuctionsTotal","tonPrice"],numbers:["numbersLoading","anonymousNumbers","tonPrice"],memecoins:["memecoinsLoading","trackedTokens","newTokens","tokenPrices","tonPrice"]};let L=!1,N=null;function Qe(e){e===f&&(L||(L=!0,N=e,requestAnimationFrame(()=>{L=!1,N===f&&x(),N=null})))}l.on("*",e=>{const t=Ke[f];t&&t.includes(e)&&Qe(f)});function Ve(){setInterval(ee,M.PRICES),setInterval(()=>{const e=y[f];e!=null&&e.refresh&&e.refresh()},M.NFT_DATA)}async function We(){console.log("🚀 TON Trading Hub starting..."),Ge(),await ee();const e=y[f];e.mount&&e.mount(),x(),Ve(),console.log("✅ TON Trading Hub ready")}We();
