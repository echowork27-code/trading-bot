(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const n of document.querySelectorAll('link[rel="modulepreload"]'))o(n);new MutationObserver(n=>{for(const a of n)if(a.type==="childList")for(const i of a.addedNodes)i.tagName==="LINK"&&i.rel==="modulepreload"&&o(i)}).observe(document,{childList:!0,subtree:!0});function s(n){const a={};return n.integrity&&(a.integrity=n.integrity),n.referrerPolicy&&(a.referrerPolicy=n.referrerPolicy),n.crossOrigin==="use-credentials"?a.credentials="include":n.crossOrigin==="anonymous"?a.credentials="omit":a.credentials="same-origin",a}function o(n){if(n.ep)return;n.ep=!0;const a=s(n);fetch(n.href,a)}})();class Z{constructor(){this.data={activeTab:"gifts",tonPrice:null,giftCollections:[],giftItems:[],giftsLoading:!0,usernameAuctions:[],usernameAuctionsTotal:0,usernamesLoading:!0,anonymousNumbers:[],numbersLoading:!0,trackedTokens:[],newTokens:[],tokenPrices:{},memecoinsLoading:!0},this.listeners=new Map}get(t){return this.data[t]}set(t,s){this.data[t]=s,this._notify(t,s)}update(t){Object.entries(t).forEach(([s,o])=>{this.data[s]=o}),Object.keys(t).forEach(s=>{this._notify(s,this.data[s])})}on(t,s){return this.listeners.has(t)||this.listeners.set(t,new Set),this.listeners.get(t).add(s),()=>{var o;return(o=this.listeners.get(t))==null?void 0:o.delete(s)}}_notify(t,s){var o,n;(o=this.listeners.get(t))==null||o.forEach(a=>{try{a(s)}catch(i){console.error("Store listener error:",i)}}),(n=this.listeners.get("*"))==null||n.forEach(a=>{try{a(t,s)}catch(i){console.error("Store wildcard listener error:",i)}})}}const d=new Z,ee="https://tonapi.io/v2",te={ANONYMOUS_NUMBERS:"EQAOQdwdw8kGftJCSFgOErM1mBjYPe4DBPq8-AhF6vr9si5N"},f={SCALE:"EQBlqsm144Dq6SjbPI4jjZvA1hqTIP3CvHovbIfW_t-SCALE",NOT:"EQAvlWFDxGF2lXm67y4yzC17wYKD9A0guwPkMs1gOsM__NOT",DOGS:"EQCvxJy4eG8hyHBFsZ7eePxrRsUQSFE_jpptRAbs2MFsmJya",CATI:"EQD-cvR0Nz6XAyRBvbhz-abTrRC6sI5tvHvvpeQraV9UAAD7",HMSTR:"EQAJ8uWd7EBqsmpSWaRdf_I-8R8-XHwh3gsNKhy-UrdrPcUo",REDO:"EQAYqo4u7VF0fa4DPAebk4g9lBytj2VFny7pzXR0trSAkXPB"},se=[f.NOT,f.DOGS,f.CATI,f.HMSTR,f.SCALE,f.REDO],D={PRICES:3e4,NFT_DATA:6e4};async function T(e,t={}){const s=new URL(`${ee}${e}`);Object.entries(t).forEach(([n,a])=>{a!=null&&s.searchParams.set(n,String(a))});const o=await fetch(s.toString(),{headers:{Accept:"application/json"}});if(!o.ok){const n=await o.text();throw new Error(`TON API ${o.status}: ${n}`)}return o.json()}async function F(e,t=["usd"]){return(await T("/rates",{tokens:e.join(","),currencies:t.join(",")})).rates||{}}async function ne(){var s,o,n,a;const t=(await F(["ton"],["usd"])).TON;return t?{price:((s=t.prices)==null?void 0:s.USD)||0,diff24h:((o=t.diff_24h)==null?void 0:o.USD)||"0%",diff7d:((n=t.diff_7d)==null?void 0:n.USD)||"0%",diff30d:((a=t.diff_30d)==null?void 0:a.USD)||"0%"}:null}function x(e){return Number(e)/1e9}function N(e){return e==null?"—":e>=1?`$${e.toFixed(2)}`:e>=.01?`$${e.toFixed(4)}`:e>=1e-4?`$${e.toFixed(6)}`:`$${e.toExponential(2)}`}function B(e){if(!e)return{text:"—",dir:"neutral"};const t=e.replace(/[−–]/g,"-").replace("%","").trim(),s=parseFloat(t);if(isNaN(s))return{text:e,dir:"neutral"};const o=s>0?"up":s<0?"down":"neutral";return{text:s>0?`+${s.toFixed(2)}%`:`${s.toFixed(2)}%`,dir:o}}function j(e){return e>=1e6?`${(e/1e6).toFixed(1)}M`:e>=1e3?`${(e/1e3).toFixed(1)}K`:e.toLocaleString()}function oe(e){const t=Math.floor(Date.now()/1e3),s=e-t;if(s<=0)return"Ended";const o=Math.floor(s/86400),n=Math.floor(s%86400/3600),a=Math.floor(s%3600/60);return o>0?`${o}d ${n}h`:n>0?`${n}h ${a}m`:`${a}m`}async function ae(e){return T(`/nfts/collections/${e}`)}async function G(e,t=50,s=0){return(await T(`/nfts/collections/${e}/items`,{limit:t,offset:s})).nft_items||[]}async function ie(e=50,t=0){return G(te.ANONYMOUS_NUMBERS,e,t)}const re=[{address:"EQDmkj65Ab_m0aZaW8IpKw4kYqIgITw_HRstYEkVQ6NIYCyW",name:"Telegram Gifts",emoji:"🎁"},{address:"EQCZ_bksSMU9Ik2sYx9HdOXEMLEC_ZEifSssa6oYev1PLUSH",name:"Plush Pepe",emoji:"🐸"}];let U=!1;async function Q(){d.set("giftsLoading",!0);try{const e=await Promise.all(re.map(async({address:t,name:s,emoji:o})=>{var n,a,i,r,c;try{let l;try{l=await ae(t)}catch{l={}}let u=[];try{u=await G(t,50,0)}catch{}const p=u.filter(v=>v.sale),m=p.length>0?Math.min(...p.map(v=>{var b,g;return Number(((g=(b=v.sale)==null?void 0:b.price)==null?void 0:g.value)||0)})):null;return{address:t,name:((n=l==null?void 0:l.metadata)==null?void 0:n.name)||s,description:((a=l==null?void 0:l.metadata)==null?void 0:a.description)||"",image:((r=(i=l==null?void 0:l.previews)==null?void 0:i[1])==null?void 0:r.url)||((c=l==null?void 0:l.metadata)==null?void 0:c.image)||"",emoji:o,items:u,onSaleCount:p.length,totalItems:(l==null?void 0:l.next_item_index)||u.length,floorPrice:m,onSaleItems:p.sort((v,b)=>{var g,$,S,k;return Number((($=(g=v.sale)==null?void 0:g.price)==null?void 0:$.value)||0)-Number(((k=(S=b.sale)==null?void 0:S.price)==null?void 0:k.value)||0)}).slice(0,10)}}catch{return{address:t,name:s,emoji:o,items:[],onSaleCount:0,totalItems:0,floorPrice:null,onSaleItems:[]}}}));d.update({giftCollections:e,giftsLoading:!1})}catch(e){console.error("Failed to load gifts:",e),d.set("giftsLoading",!1)}}function ce(){const e=d.get("giftsLoading"),t=d.get("giftCollections")||[],s=d.get("tonPrice"),o=(s==null?void 0:s.price)||0;if(e&&t.length===0)return`
      <div class="section-header">
        <span class="section-title">🎁 Telegram Gifts</span>
      </div>
      <div class="skeleton skeleton-card"></div>
      <div class="skeleton skeleton-card"></div>
    `;let n=`
    <div class="section-header">
      <span class="section-title">🎁 Gift Collections</span>
      <span class="refresh-hint">${e?"⟳":""}</span>
    </div>
  `;return t.length===0?(n+=`
      <div class="empty-state">
        <div class="empty-state-icon">🎁</div>
        <div class="empty-state-text">Loading gift collections...</div>
      </div>
    `,n):(t.forEach(a=>{const i=a.floorPrice?x(a.floorPrice):null,r=i&&o?i*o:null;n+=`
      <div class="card">
        <div class="card-header">
          <div>
            <div class="card-title">${a.emoji} ${_(a.name)}</div>
            ${a.description?`<div class="card-subtitle">${_(a.description.slice(0,80))}</div>`:""}
          </div>
          ${a.onSaleCount>0?`<span class="card-badge hot">🔥 ${a.onSaleCount} listed</span>`:'<span class="card-badge" style="background:rgba(142,142,147,0.2);color:var(--tg-theme-hint-color)">0 listed</span>'}
        </div>
        <div class="card-stats">
          <div class="stat">
            <span class="stat-label">Floor</span>
            <span class="stat-value">${i?`${i.toFixed(2)} TON`:"—"}</span>
          </div>
          <div class="stat">
            <span class="stat-label">USD</span>
            <span class="stat-value">${r?N(r):"—"}</span>
          </div>
          <div class="stat">
            <span class="stat-label">Total</span>
            <span class="stat-value">${j(a.totalItems)}</span>
          </div>
        </div>
      </div>
    `,a.onSaleItems&&a.onSaleItems.length>0&&(n+=`
        <div class="section-header" style="margin-top:4px">
          <span class="section-title" style="font-size:12px">💰 Best Deals — ${_(a.name)}</span>
        </div>
      `,a.onSaleItems.slice(0,5).forEach(c=>{var b,g,$,S,k,M;const l=((b=c.metadata)==null?void 0:b.name)||"Unknown",u=x(Number((($=(g=c.sale)==null?void 0:g.price)==null?void 0:$.value)||0)),p=u*o,m=((S=c.sale)==null?void 0:S.market_name)||"Unknown",v=((M=(k=c.previews)==null?void 0:k[0])==null?void 0:M.url)||"";n+=`
          <div class="token-row" onclick="window.open('https://getgems.io/nft/${c.address}', '_blank')">
            <div class="token-icon">
              ${v?`<img src="${_(v)}" alt="" loading="lazy" onerror="this.parentElement.textContent='${a.emoji}'"/>`:a.emoji}
            </div>
            <div class="token-info">
              <div class="token-name">${_(l)}</div>
              <div class="token-symbol">${m}</div>
            </div>
            <div class="token-price-col">
              <div class="token-price">${u.toFixed(2)} TON</div>
              <div class="token-change" style="color:var(--tg-theme-hint-color)">${N(p)}</div>
            </div>
          </div>
        `}))}),n+=`
    <div class="card" style="margin-top:16px; text-align:center;">
      <div style="font-size:13px; color:var(--tg-theme-hint-color); padding:12px 0;">
        💡 More collections coming soon<br/>
        TonConnect wallet integration in Phase 2
      </div>
    </div>
  `,n)}function _(e){if(!e)return"";const t=document.createElement("span");return t.textContent=e,t.innerHTML}function le(){U||(U=!0,Q())}function de(){Q()}const ue=Object.freeze(Object.defineProperty({__proto__:null,mount:le,refresh:de,render:ce},Symbol.toStringTag,{value:"Module"}));async function me(e="t.me"){const t=await T("/dns/auctions",{tld:e});return{auctions:t.data||[],total:t.total||0}}async function fe(){const{auctions:e}=await me("t.me");return e.sort((t,s)=>Number(s.price)-Number(t.price))}let R=!1,E="hot";async function q(){d.set("usernamesLoading",!0);try{const e=await fe();d.update({usernameAuctions:e,usernameAuctionsTotal:e.length,usernamesLoading:!1})}catch(e){console.error("Failed to load username auctions:",e),d.set("usernamesLoading",!1)}}function pe(){const e=d.get("usernameAuctions")||[],t=Math.floor(Date.now()/1e3);switch(E){case"hot":return[...e].sort((s,o)=>o.bids-s.bids);case"ending":return[...e].filter(s=>s.date>t).sort((s,o)=>s.date-o.date);case"cheap":return[...e].sort((s,o)=>Number(s.price)-Number(o.price));default:return e}}function ve(){const e=d.get("usernamesLoading"),t=d.get("usernameAuctionsTotal")||0,s=d.get("tonPrice"),o=(s==null?void 0:s.price)||0;if(e&&t===0)return`
      <div class="section-header">
        <span class="section-title">👤 Username Auctions</span>
      </div>
      <div class="skeleton skeleton-card"></div>
      <div class="skeleton skeleton-card"></div>
      <div class="skeleton skeleton-card"></div>
      <div class="skeleton skeleton-card"></div>
    `;const a=pe().slice(0,30);let i=`
    <div class="section-header">
      <span class="section-title">👤 Username Auctions</span>
      <span class="refresh-hint">${e?"⟳":`${j(t)} active`}</span>
    </div>

    <div class="filter-row">
      <button class="filter-pill ${E==="hot"?"active":""}" data-filter="hot">🔥 Hot</button>
      <button class="filter-pill ${E==="ending"?"active":""}" data-filter="ending">⏰ Ending Soon</button>
      <button class="filter-pill ${E==="cheap"?"active":""}" data-filter="cheap">💰 Cheapest</button>
    </div>
  `;return a.length===0?(i+=`
      <div class="empty-state">
        <div class="empty-state-icon">👤</div>
        <div class="empty-state-text">No auctions found</div>
      </div>
    `,i):(a.forEach(r=>{const c=r.domain||"",l=c.replace(".t.me",""),u=x(r.price),p=u*o,m=r.bids||0,v=r.date,b=oe(v),g=v-Math.floor(Date.now()/1e3)<3600,$=m>10?"hot":m>5?"bid":"";i+=`
      <div class="card" onclick="window.open('https://fragment.com/username/${encodeURIComponent(l)}', '_blank')">
        <div class="card-header">
          <div>
            <div class="card-title">@${ge(l)}</div>
            <div class="card-subtitle">${c}</div>
          </div>
          <div style="text-align:right">
            <span class="auction-timer${g?' style="color:var(--red)"':""}">${b}</span>
            ${$?`<div class="card-badge ${$}" style="margin-top:4px">${m} bids</div>`:`<div class="card-subtitle">${m} bid${m!==1?"s":""}</div>`}
          </div>
        </div>
        <div class="card-stats">
          <div class="stat">
            <span class="stat-label">Current Price</span>
            <span class="stat-value">${u.toFixed(2)} TON</span>
          </div>
          <div class="stat">
            <span class="stat-label">USD</span>
            <span class="stat-value">${N(p)}</span>
          </div>
        </div>
        <div class="bid-bar">
          <div class="bid-bar-fill" style="width: ${Math.min(m*5,100)}%"></div>
        </div>
      </div>
    `}),i)}function ge(e){const t=document.createElement("span");return t.textContent=e,t.innerHTML}function he(e){const t=e.target.closest(".filter-pill");return t?(E=t.dataset.filter,!0):!1}function be(){R||(R=!0,q())}function ye(){q()}const $e=Object.freeze(Object.defineProperty({__proto__:null,mount:be,onInteract:he,refresh:ye,render:ve},Symbol.toStringTag,{value:"Module"}));let H=!1;async function J(){d.set("numbersLoading",!0);try{const t=(await ie(100,0)).map(s=>{var n,a,i,r,c,l;const o=s.sale;return{address:s.address,number:((n=s.metadata)==null?void 0:n.name)||"Unknown",image:((i=(a=s.previews)==null?void 0:a[1])==null?void 0:i.url)||"",owner:((r=s.owner)==null?void 0:r.address)||"",ownerName:((c=s.owner)==null?void 0:c.name)||"",onSale:!!o,priceTon:o?x(Number(((l=o.price)==null?void 0:l.value)||0)):null,marketplace:(o==null?void 0:o.market_name)||null}});t.sort((s,o)=>s.onSale&&!o.onSale?-1:!s.onSale&&o.onSale?1:s.onSale&&o.onSale?(s.priceTon||0)-(o.priceTon||0):0),d.update({anonymousNumbers:t,numbersLoading:!1})}catch(e){console.error("Failed to load anonymous numbers:",e),d.set("numbersLoading",!1)}}function we(){const e=d.get("numbersLoading"),t=d.get("anonymousNumbers")||[],s=d.get("tonPrice"),o=(s==null?void 0:s.price)||0;if(e&&t.length===0)return`
      <div class="section-header">
        <span class="section-title">📱 Anonymous Numbers</span>
      </div>
      <div class="skeleton skeleton-card"></div>
      <div class="skeleton skeleton-card"></div>
      <div class="skeleton skeleton-card"></div>
    `;const n=t.filter(r=>r.onSale),a=t.filter(r=>!r.onSale);let i=`
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
            <span class="stat-value" style="color:var(--green)">${n.length}</span>
          </div>
        </div>
      </div>
    </div>
  `;return n.length>0&&(i+=`
      <div class="section-header">
        <span class="section-title">💰 For Sale</span>
      </div>
      <div class="number-grid">
    `,n.slice(0,20).forEach(r=>{const c=r.priceTon&&o?r.priceTon*o:null;i+=`
        <div class="number-card" onclick="window.open('https://getgems.io/nft/${r.address}', '_blank')">
          <div class="number-value">${O(r.number)}</div>
          <div class="number-price">${r.priceTon?`${r.priceTon.toFixed(1)} TON`:"—"}</div>
          ${c?`<div style="font-size:11px; color:var(--tg-theme-hint-color)">${N(c)}</div>`:""}
        </div>
      `}),i+="</div>"),a.length>0&&(i+=`
      <div class="section-header">
        <span class="section-title">📋 Recent Numbers</span>
      </div>
      <div class="number-grid">
    `,a.slice(0,20).forEach(r=>{i+=`
        <div class="number-card">
          <div class="number-value">${O(r.number)}</div>
          <div class="number-price" style="color:var(--tg-theme-hint-color)">Not listed</div>
          ${r.ownerName?`<div style="font-size:10px; color:var(--tg-theme-hint-color)">${O(r.ownerName.slice(0,15))}</div>`:""}
        </div>
      `}),i+="</div>"),i}function O(e){const t=document.createElement("span");return t.textContent=e,t.innerHTML}function Te(){H||(H=!0,J())}function Se(){J()}const ke=Object.freeze(Object.defineProperty({__proto__:null,mount:Te,refresh:Se,render:we},Symbol.toStringTag,{value:"Module"}));async function _e(e=20,t=0){return(await T("/jettons",{limit:e,offset:t})).jettons||[]}async function Ee(e){return T(`/jettons/${e}`)}async function Ne(e=20){return(await _e(e,0)).filter(s=>s.holders_count>0)}let z=!1,y="tracked";const xe={[f.NOT]:{name:"Notcoin",symbol:"NOT",emoji:"⚡"},[f.DOGS]:{name:"DOGS",symbol:"DOGS",emoji:"🐕"},[f.CATI]:{name:"Catizen",symbol:"CATI",emoji:"🐱"},[f.HMSTR]:{name:"Hamster Kombat",symbol:"HMSTR",emoji:"🐹"},[f.SCALE]:{name:"SCALE",symbol:"SCALE",emoji:"⚖️"},[f.REDO]:{name:"REDO",symbol:"REDO",emoji:"🔄"}};async function V(){d.set("memecoinsLoading",!0);try{const e=[...se],t=await F(e,["usd","ton"]),s=e.map(n=>{var u,p,m;const a=xe[n],i=t[n],r=((u=i==null?void 0:i.prices)==null?void 0:u.USD)||0,c=((p=i==null?void 0:i.diff_24h)==null?void 0:p.USD)||"0",l=((m=i==null?void 0:i.diff_7d)==null?void 0:m.USD)||"0";return{address:n,name:(a==null?void 0:a.name)||n.slice(0,8)+"...",symbol:(a==null?void 0:a.symbol)||"???",emoji:(a==null?void 0:a.emoji)||"🪙",image:(i==null?void 0:i.image)||null,price:r,diff24h:c,diff7d:l}}),o=await Promise.all(s.map(async n=>{var a,i,r;try{const c=await Ee(n.address);return{...n,holders:c.holders_count||0,totalSupply:c.total_supply||"0",image:((a=c.metadata)==null?void 0:a.image)||n.image,name:((i=c.metadata)==null?void 0:i.name)||n.name,symbol:((r=c.metadata)==null?void 0:r.symbol)||n.symbol}}catch{return{...n,holders:0}}}));d.update({trackedTokens:o,memecoinsLoading:!1})}catch(e){console.error("Failed to load tracked tokens:",e),d.set("memecoinsLoading",!1)}}async function Y(){try{const e=await Ne(20),t=e.map(n=>n.address).slice(0,10);let s={};try{s=await F(t,["usd"])}catch{}const o=e.map(n=>{var i,r,c,l,u;const a=s[n.address];return{address:n.address,name:((i=n.metadata)==null?void 0:i.name)||"Unknown",symbol:((r=n.metadata)==null?void 0:r.symbol)||"???",image:((c=n.metadata)==null?void 0:c.image)||null,emoji:"🆕",holders:n.holders_count||0,price:((l=a==null?void 0:a.prices)==null?void 0:l.USD)||0,diff24h:((u=a==null?void 0:a.diff_24h)==null?void 0:u.USD)||"0"}});d.set("newTokens",o)}catch(e){console.error("Failed to load new tokens:",e)}}function Ae(){const e=d.get("memecoinsLoading"),t=d.get("trackedTokens")||[],s=d.get("newTokens")||[];if(e&&t.length===0)return`
      <div class="section-header">
        <span class="section-title">🚀 TON Tokens</span>
      </div>
      <div class="skeleton skeleton-row"></div>
      <div class="skeleton skeleton-row"></div>
      <div class="skeleton skeleton-row"></div>
      <div class="skeleton skeleton-row"></div>
      <div class="skeleton skeleton-row"></div>
    `;let o=`
    <div class="section-header">
      <span class="section-title">🚀 TON Tokens</span>
      <span class="refresh-hint">${e?"⟳":""}</span>
    </div>

    <div class="filter-row">
      <button class="filter-pill ${y==="tracked"?"active":""}" data-filter="tracked">📊 Tracked</button>
      <button class="filter-pill ${y==="new"?"active":""}" data-filter="new">🆕 New Tokens</button>
    </div>
  `;const n=y==="tracked"?t:s;if(n.length===0)return o+=`
      <div class="empty-state">
        <div class="empty-state-icon">${y==="new"?"🆕":"🚀"}</div>
        <div class="empty-state-text">
          ${y==="new"?"Loading new tokens...":"No tracked tokens yet"}
        </div>
      </div>
    `,o;if([...n].sort((i,r)=>(r.price||0)-(i.price||0)).forEach(i=>{const r=B(i.diff24h),c=i.image&&!i.image.includes("data:");o+=`
      <div class="token-row" onclick="window.open('https://tonviewer.com/${i.address}', '_blank')">
        <div class="token-icon">
          ${c?`<img src="${L(i.image)}" alt="" loading="lazy" onerror="this.parentElement.textContent='${i.emoji}'"/>`:i.emoji}
        </div>
        <div class="token-info">
          <div class="token-name">${L(i.symbol)}</div>
          <div class="token-symbol">${L(i.name)}${i.holders?` · ${j(i.holders)} holders`:""}</div>
        </div>
        <div class="token-price-col">
          <div class="token-price">${i.price?N(i.price):"—"}</div>
          <div class="token-change ${r.dir}">${r.text}</div>
        </div>
      </div>
    `}),y==="tracked"&&t.length>0){const i=t.filter(c=>parseFloat(String(c.diff24h).replace(/[^0-9.-]/g,""))>0).length,r=t.length-i;o+=`
      <div class="card" style="margin-top: 12px; text-align:center;">
        <div style="display:flex; justify-content:center; gap:24px;">
          <div class="stat">
            <span class="stat-label">Gainers</span>
            <span class="stat-value up">${i}</span>
          </div>
          <div class="stat">
            <span class="stat-label">Losers</span>
            <span class="stat-value down">${r}</span>
          </div>
          <div class="stat">
            <span class="stat-label">Tracking</span>
            <span class="stat-value">${t.length}</span>
          </div>
        </div>
      </div>
    `}return o}function L(e){if(!e)return"";const t=document.createElement("span");return t.textContent=e,t.innerHTML}function Oe(e){const t=e.target.closest(".filter-pill");if(t){const s=t.dataset.filter;if(s!==y)return y=s,s==="new"&&(d.get("newTokens")||[]).length===0&&Y(),!0}return!1}function Le(){z||(z=!0,V())}function Pe(){V(),y==="new"&&Y()}const Ce=Object.freeze(Object.defineProperty({__proto__:null,mount:Le,onInteract:Oe,refresh:Pe,render:Ae},Symbol.toStringTag,{value:"Module"})),w={gifts:ue,usernames:$e,numbers:ke,memecoins:Ce},K=document.getElementById("content"),P=document.getElementById("ton-price"),W=document.getElementById("tabs");function Ie(){var e,t;try{const s=(e=window.Telegram)==null?void 0:e.WebApp;if(s){if(s.ready(),s.expand(),(t=s.enableClosingConfirmation)==null||t.call(s),s.themeParams){const o=s.themeParams,n=document.documentElement.style;o.bg_color&&n.setProperty("--tg-theme-bg-color",o.bg_color),o.text_color&&n.setProperty("--tg-theme-text-color",o.text_color),o.hint_color&&n.setProperty("--tg-theme-hint-color",o.hint_color),o.link_color&&n.setProperty("--tg-theme-link-color",o.link_color),o.button_color&&n.setProperty("--tg-theme-button-color",o.button_color),o.button_text_color&&n.setProperty("--tg-theme-button-text-color",o.button_text_color),o.secondary_bg_color&&n.setProperty("--tg-theme-secondary-bg-color",o.secondary_bg_color)}console.log("✅ Telegram Web App initialized")}}catch(s){console.warn("TMA init skipped (not in Telegram):",s.message)}}async function X(){try{const e=await ne();e&&(d.set("tonPrice",e),Fe(e))}catch(e){console.error("TON price fetch failed:",e)}}function Fe(e){if(!P||!e)return;const t=B(e.diff24h);P.querySelector(".price-value").textContent=`TON $${e.price.toFixed(2)}`;const s=P.querySelector(".price-change");s.textContent=t.text,s.className=`price-change ${t.dir}`}let h="gifts";function je(e){if(!w[e]||e===h)return;h=e,d.set("activeTab",e),W.querySelectorAll(".tab").forEach(s=>{s.classList.toggle("active",s.dataset.tab===e)});const t=w[e];t.mount&&t.mount(),A()}function A(){const e=w[h];if(!e)return;const t=e.render();K.innerHTML=t}W.addEventListener("click",e=>{const t=e.target.closest(".tab");t&&je(t.dataset.tab)});K.addEventListener("click",e=>{const t=w[h];t!=null&&t.onInteract&&t.onInteract(e)&&A()});const Me={gifts:["giftsLoading","giftCollections","tonPrice"],usernames:["usernamesLoading","usernameAuctions","usernameAuctionsTotal","tonPrice"],numbers:["numbersLoading","anonymousNumbers","tonPrice"],memecoins:["memecoinsLoading","trackedTokens","newTokens","tokenPrices","tonPrice"]};let C=!1,I=null;function De(e){e===h&&(C||(C=!0,I=e,requestAnimationFrame(()=>{C=!1,I===h&&A(),I=null})))}d.on("*",e=>{const t=Me[h];t&&t.includes(e)&&De(h)});function Ue(){setInterval(X,D.PRICES),setInterval(()=>{const e=w[h];e!=null&&e.refresh&&e.refresh()},D.NFT_DATA)}async function Re(){console.log("🚀 TON Trading Hub starting..."),Ie(),await X();const e=w[h];e.mount&&e.mount(),A(),Ue(),console.log("✅ TON Trading Hub ready")}Re();
