(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const s of document.querySelectorAll('link[rel="modulepreload"]'))o(s);new MutationObserver(s=>{for(const r of s)if(r.type==="childList")for(const i of r.addedNodes)i.tagName==="LINK"&&i.rel==="modulepreload"&&o(i)}).observe(document,{childList:!0,subtree:!0});function n(s){const r={};return s.integrity&&(r.integrity=s.integrity),s.referrerPolicy&&(r.referrerPolicy=s.referrerPolicy),s.crossOrigin==="use-credentials"?r.credentials="include":s.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function o(s){if(s.ep)return;s.ep=!0;const r=n(s);fetch(s.href,r)}})();class ae{constructor(){this.data={activeTab:"gifts",tonPrice:null,giftCollections:[],giftItems:[],giftsLoading:!0,usernameAuctions:[],usernameAuctionsTotal:0,usernamesLoading:!0,anonymousNumbers:[],numbersLoading:!0,ggGiftCollections:[],ggGiftsOnSale:[],ggGiftHistory:[],trackedTokens:[],newTokens:[],tokenPrices:{},memecoinsLoading:!0},this.listeners=new Map}get(t){return this.data[t]}set(t,n){this.data[t]=n,this._notify(t,n)}update(t){Object.entries(t).forEach(([n,o])=>{this.data[n]=o}),Object.keys(t).forEach(n=>{this._notify(n,this.data[n])})}on(t,n){return this.listeners.has(t)||this.listeners.set(t,new Set),this.listeners.get(t).add(n),()=>{var o;return(o=this.listeners.get(t))==null?void 0:o.delete(n)}}_notify(t,n){var o,s;(o=this.listeners.get(t))==null||o.forEach(r=>{try{r(n)}catch(i){console.error("Store listener error:",i)}}),(s=this.listeners.get("*"))==null||s.forEach(r=>{try{r(t,n)}catch(i){console.error("Store wildcard listener error:",i)}})}}const c=new ae,ce="https://tonapi.io/v2",le={ANONYMOUS_NUMBERS:"EQAOQdwdw8kGftJCSFgOErM1mBjYPe4DBPq8-AhF6vr9si5N"},p={SCALE:"EQBlqsm144Dq6SjbPI4jjZvA1hqTIP3CvHovbIfW_t-SCALE",NOT:"EQAvlWFDxGF2lXm67y4yzC17wYKD9A0guwPkMs1gOsM__NOT",DOGS:"EQCvxJy4eG8hyHBFsZ7eePxrRsUQSFE_jpptRAbs2MFsmJya",CATI:"EQD-cvR0Nz6XAyRBvbhz-abTrRC6sI5tvHvvpeQraV9UAAD7",HMSTR:"EQAJ8uWd7EBqsmpSWaRdf_I-8R8-XHwh3gsNKhy-UrdrPcUo",REDO:"EQAYqo4u7VF0fa4DPAebk4g9lBytj2VFny7pzXR0trSAkXPB"},de=[p.NOT,p.DOGS,p.CATI,p.HMSTR,p.SCALE,p.REDO],R={PRICES:3e4,NFT_DATA:6e4};async function N(e,t={}){const n=new URL(`${ce}${e}`);Object.entries(t).forEach(([s,r])=>{r!=null&&n.searchParams.set(s,String(r))});const o=await fetch(n.toString(),{headers:{Accept:"application/json"}});if(!o.ok){const s=await o.text();throw new Error(`TON API ${o.status}: ${s}`)}return o.json()}async function M(e,t=["usd"]){return(await N("/rates",{tokens:e.join(","),currencies:t.join(",")})).rates||{}}async function fe(){var n,o,s,r;const t=(await M(["ton"],["usd"])).TON;return t?{price:((n=t.prices)==null?void 0:n.USD)||0,diff24h:((o=t.diff_24h)==null?void 0:o.USD)||"0%",diff7d:((s=t.diff_7d)==null?void 0:s.USD)||"0%",diff30d:((r=t.diff_30d)==null?void 0:r.USD)||"0%"}:null}function y(e){return Number(e)/1e9}function T(e){return e==null?"—":e>=1?`$${e.toFixed(2)}`:e>=.01?`$${e.toFixed(4)}`:e>=1e-4?`$${e.toFixed(6)}`:`$${e.toExponential(2)}`}function Q(e){if(!e)return{text:"—",dir:"neutral"};const t=e.replace(/[−–]/g,"-").replace("%","").trim(),n=parseFloat(t);if(isNaN(n))return{text:e,dir:"neutral"};const o=n>0?"up":n<0?"down":"neutral";return{text:n>0?`+${n.toFixed(2)}%`:`${n.toFixed(2)}%`,dir:o}}function V(e){return e>=1e6?`${(e/1e6).toFixed(1)}M`:e>=1e3?`${(e/1e3).toFixed(1)}K`:e.toLocaleString()}function G(e){const n=Math.floor(Date.now()/1e3)-e;return n<60?`${n}s ago`:n<3600?`${Math.floor(n/60)}m ago`:n<86400?`${Math.floor(n/3600)}h ago`:`${Math.floor(n/86400)}d ago`}function ue(e){const t=Math.floor(Date.now()/1e3),n=e-t;if(n<=0)return"Ended";const o=Math.floor(n/86400),s=Math.floor(n%86400/3600),r=Math.floor(n%3600/60);return o>0?`${o}d ${s}h`:s>0?`${s}h ${r}m`:`${r}m`}const ge="https://corsproxy.io/?"+encodeURIComponent("https://api.getgems.io/public-api");function W(){try{return"1769880806931-mainnet-9603563-r-LZi5LtJMUH8JJ8Pv6EuriwJuWToatIjh0DII9mo82PBKg0Zx"}catch{return""}}function j(){return!!W()}async function z(e,t={}){const n=W();if(!n)throw new Error("Getgems API key not configured");const o=new URL(`${ge}${e}`);Object.entries(t).forEach(([i,a])=>{a!=null&&o.searchParams.set(i,String(a))});const s=await fetch(o.toString(),{headers:{Accept:"application/json",Authorization:n}});if(!s.ok){const i=await s.text();throw new Error(`Getgems ${s.status}: ${i}`)}const r=await s.json();if(!r.success&&r.name==="Unauthorized")throw new Error("Getgems API: Unauthorized — check API key");return r.response??r}async function pe(){return z("/v1/gifts/collections/top")}async function me(e,t=50){return z("/v1/nfts/offchain/on-sale/gifts",{cursor:e,limit:t})}async function he(e,t=50){return z("/v1/nfts/history/gifts",{cursor:e,limit:t})}let B=!1,A="top";async function X(){c.set("giftsLoading",!0);try{const e=await pe();c.set("ggTopCollections",(e==null?void 0:e.items)||e||[])}catch(e){console.error("Failed to load top collections:",e)}c.set("giftsLoading",!1)}async function Y(){c.set("giftsOnSaleLoading",!0);try{const e=await me(void 0,50);c.set("ggGiftsOnSale",(e==null?void 0:e.items)||e||[])}catch(e){console.error("Failed to load gifts on sale:",e)}c.set("giftsOnSaleLoading",!1)}async function Z(){c.set("giftsHistoryLoading",!0);try{const e=await he(void 0,50);c.set("ggGiftHistory",(e==null?void 0:e.items)||e||[])}catch(e){console.error("Failed to load gift history:",e)}c.set("giftsHistoryLoading",!1)}function ve(){const e=c.get("tonPrice"),t=(e==null?void 0:e.price)||0;if(!j())return $e();let n="";const o=[{id:"top",label:"🏆 Top"},{id:"onsale",label:"🛒 Deals"},{id:"history",label:"📜 Sales"}];switch(n+='<div class="filter-row">',o.forEach(s=>{n+=`<button class="filter-pill ${s.id===A?"active":""}" data-filter="${s.id}">${s.label}</button>`}),n+="</div>",A){case"top":n+=ye(t);break;case"onsale":n+=be(t);break;case"history":n+=we(t);break}return n}function ye(e){const t=c.get("giftsLoading"),n=c.get("ggTopCollections")||[];if(t&&n.length===0)return D(6);let o=`
    <div class="section-header">
      <span class="section-title">Top Gift Collections</span>
      <span class="refresh-hint">${t?"⟳":""}</span>
    </div>
  `;return n.length===0?o+U("🏆","Loading top collections..."):(n.forEach((s,r)=>{var H;const i=s.collection||s,a=i.name||"Unknown",l=((H=i.imageSizes)==null?void 0:H["96"])||i.image||"",d=s.floorPrice,f=s.diffPercent,g=s.value?Number(s.value):0,u=g?y(g):0,b=u>=1e6?(u/1e6).toFixed(1)+"M":u>=1e3?(u/1e3).toFixed(1)+"K":u.toFixed(0),w=d>=1e3?(d/1e3).toFixed(1)+"K":d==null?void 0:d.toFixed(d>=10?1:2),S=f!==void 0?(f>0?"+":"")+f.toFixed(0)+"%":"",$=f>0?"var(--green)":f<0?"var(--red)":"var(--tg-theme-hint-color)",k=d&&e?d*e:null,O=i.address||"";o+=`
      <div class="card" style="padding:10px 12px;margin-bottom:8px;cursor:pointer" data-collection-addr="${m(O)}" data-collection-name="${m(a)}">
        <div style="display:flex;align-items:center;gap:12px">
          <div style="position:relative;flex-shrink:0">
            <span style="position:absolute;top:-4px;left:-4px;font-size:10px;font-weight:700;color:var(--tg-theme-hint-color)">${r+1}</span>
            <div style="width:48px;height:48px;border-radius:12px;overflow:hidden;background:var(--card-border)">
              ${l?`<img src="${m(l)}" width="48" height="48" style="object-fit:cover" loading="lazy" onerror="this.style.display='none'" />`:""}
            </div>
          </div>
          <div style="flex:1;min-width:0">
            <div style="font-size:15px;font-weight:600;white-space:nowrap;overflow:hidden;text-overflow:ellipsis">${m(a)}</div>
            <div style="font-size:12px;color:var(--tg-theme-hint-color);margin-top:1px">
              Floor: ${w?w+" TON":"—"}${k?" · "+T(k):""}
            </div>
          </div>
          <div style="text-align:right;flex-shrink:0">
            <div style="font-size:14px;font-weight:700">
              <span style="color:var(--tg-theme-hint-color);font-size:11px">💎</span> ${b}
            </div>
            ${S?`<div style="font-size:12px;font-weight:600;color:${$}">${S}</div>`:""}
          </div>
        </div>
      </div>
    `}),o)}function be(e){const t=c.get("giftsOnSaleLoading"),n=c.get("ggGiftsOnSale")||[];if(t&&n.length===0)return D(5);let o=`
    <div class="section-header">
      <span class="section-title">🛒 Gifts For Sale</span>
      <span class="refresh-hint">${t?"⟳":n.length+" listed"}</span>
    </div>
  `;return n.length===0?o+U("🛒","Loading deals..."):(n.forEach(s=>{var k;const r=s.name||"Gift",i=((k=s.imageSizes)==null?void 0:k["96"])||s.image||"",a=s.sale||{},l=a.fullPrice?y(Number(a.fullPrice)):a.lastBidAmount?y(Number(a.lastBidAmount)):null,d=l&&e?l*e:null,f=a.type==="FixPriceSale"?"Buy Now":a.type==="Auction"?"⏰ Auction":"Sale",g=(s.attributes||[]).map(O=>O.value),u=g[0]||"",b=g[1]||"";g[2];const w=[u,b].filter(Boolean).join(" · "),$=`https://getgems.io/nft/${s.address||""}`;o+=`
      <div class="card" style="padding:10px 12px;margin-bottom:8px" data-nft-url="${m($)}">
        <div style="display:flex;align-items:center;gap:10px">
          <div style="width:52px;height:52px;border-radius:10px;overflow:hidden;background:var(--card-border);flex-shrink:0">
            ${i?`<img src="${m(i)}" width="52" height="52" style="object-fit:cover" loading="lazy" onerror="this.style.display='none'" />`:""}
          </div>
          <div style="flex:1;min-width:0">
            <div style="font-size:14px;font-weight:600;white-space:nowrap;overflow:hidden;text-overflow:ellipsis">${m(r)}</div>
            <div style="font-size:11px;color:var(--tg-theme-hint-color);margin-top:2px">${m(w)}</div>
            <div style="display:inline-block;margin-top:3px;font-size:10px;font-weight:600;padding:2px 6px;border-radius:4px;background:${a.type==="FixPriceSale"?"rgba(52,199,89,0.15);color:var(--green)":"rgba(255,149,0,0.15);color:var(--orange)"}">${f}</div>
          </div>
          <div style="text-align:right;flex-shrink:0">
            ${l?`
              <div style="font-size:15px;font-weight:700">${l>=1e3?(l/1e3).toFixed(1)+"K":l.toFixed(1)} <span style="font-size:11px;color:var(--tg-theme-hint-color)">TON</span></div>
              ${d?`<div style="font-size:11px;color:var(--tg-theme-hint-color)">${T(d)}</div>`:""}
            `:""}
          </div>
        </div>
      </div>
    `}),o)}function we(e){const t=c.get("giftsHistoryLoading"),n=c.get("ggGiftHistory")||[];if(t&&n.length===0)return D(5);let o=`
    <div class="section-header">
      <span class="section-title">📜 Recent Sales</span>
      <span class="refresh-hint">${t?"⟳":""}</span>
    </div>
  `;return n.length===0?o+U("📜","Loading sales..."):(n.forEach(s=>{var f,g;const r=s.nftName||s.name||"Gift",i=((f=s.nftImageSizes)==null?void 0:f["96"])||s.nftImage||((g=s.imageSizes)==null?void 0:g["96"])||s.image||"",a=s.price?y(Number(s.price)):s.fullPrice?y(Number(s.fullPrice)):null,l=a&&e?a*e:null,d=s.createdAt?G(Math.floor(new Date(s.createdAt).getTime()/1e3)):s.date?G(Math.floor(new Date(s.date).getTime()/1e3)):"";o+=`
      <div class="card" style="padding:10px 12px;margin-bottom:6px">
        <div style="display:flex;align-items:center;gap:10px">
          <div style="width:44px;height:44px;border-radius:10px;overflow:hidden;background:var(--card-border);flex-shrink:0">
            ${i?`<img src="${m(i)}" width="44" height="44" style="object-fit:cover" loading="lazy" onerror="this.style.display='none'" />`:""}
          </div>
          <div style="flex:1;min-width:0">
            <div style="font-size:14px;font-weight:600;white-space:nowrap;overflow:hidden;text-overflow:ellipsis">${m(r)}</div>
            <div style="font-size:11px;color:var(--green);margin-top:1px">✓ Sold ${d}</div>
          </div>
          <div style="text-align:right;flex-shrink:0">
            ${a?`
              <div style="font-size:14px;font-weight:700">${a>=1e3?(a/1e3).toFixed(1)+"K":a.toFixed(1)} <span style="font-size:11px;color:var(--tg-theme-hint-color)">TON</span></div>
              ${l?`<div style="font-size:11px;color:var(--tg-theme-hint-color)">${T(l)}</div>`:""}
            `:""}
          </div>
        </div>
      </div>
    `}),o)}function $e(){return`
    <div class="empty-state" style="padding:60px 20px">
      <div class="empty-state-icon">🔑</div>
      <div class="empty-state-text">
        Getgems API key needed<br/><br/>
        <span style="font-size:13px">
          1. Go to <a href="https://getgems.io/public-api" target="_blank" style="color:var(--tg-theme-link-color)">getgems.io/public-api</a><br/>
          2. Connect wallet & create key<br/>
          3. Message @nfton_bot for Gift API access
        </span>
      </div>
    </div>
  `}function m(e){if(!e)return"";const t=document.createElement("span");return t.textContent=e,t.innerHTML}function D(e){return Array.from({length:e},()=>'<div class="skeleton skeleton-card" style="height:68px"></div>').join("")}function U(e,t){return`<div class="empty-state"><div class="empty-state-icon">${e}</div><div class="empty-state-text">${t}</div></div>`}function xe(){B||(B=!0,j()&&X())}function Te(){if(j())switch(A){case"top":X();break;case"onsale":Y();break;case"history":Z();break}}function Se(e){const t=e.target.closest(".filter-pill");if(t){const s=t.dataset.filter;return s&&s!==A?(A=s,s==="onsale"&&!(c.get("ggGiftsOnSale")||[]).length&&Y(),s==="history"&&!(c.get("ggGiftHistory")||[]).length&&Z(),!0):!1}const n=e.target.closest("[data-collection-name]");if(n){const s=n.dataset.collectionName;if(s){const r=s.toLowerCase().replace(/['']/g,"").replace(/\s+/g,"");window.open(`https://getgems.io/gifts/${r}`,"_blank")}return!1}const o=e.target.closest("[data-nft-url]");if(o){const s=o.dataset.nftUrl;return s&&window.open(s,"_blank"),!1}return!1}const ke=Object.freeze(Object.defineProperty({__proto__:null,mount:xe,onInteract:Se,refresh:Te,render:ve},Symbol.toStringTag,{value:"Module"}));async function _e(e="t.me"){const t=await N("/dns/auctions",{tld:e});return{auctions:t.data||[],total:t.total||0}}async function Ae(){const{auctions:e}=await _e("t.me");return e.sort((t,n)=>Number(n.price)-Number(t.price))}let J=!1,_="hot";async function ee(){c.set("usernamesLoading",!0);try{const e=await Ae();c.update({usernameAuctions:e,usernameAuctionsTotal:e.length,usernamesLoading:!1})}catch(e){console.error("Failed to load username auctions:",e),c.set("usernamesLoading",!1)}}function Ne(){const e=c.get("usernameAuctions")||[],t=Math.floor(Date.now()/1e3);switch(_){case"hot":return[...e].sort((n,o)=>o.bids-n.bids);case"ending":return[...e].filter(n=>n.date>t).sort((n,o)=>n.date-o.date);case"cheap":return[...e].sort((n,o)=>Number(n.price)-Number(o.price));default:return e}}function Ee(){const e=c.get("usernamesLoading"),t=c.get("usernameAuctionsTotal")||0,n=c.get("tonPrice"),o=(n==null?void 0:n.price)||0;if(e&&t===0)return`
      <div class="section-header">
        <span class="section-title">👤 Username Auctions</span>
      </div>
      <div class="skeleton skeleton-card"></div>
      <div class="skeleton skeleton-card"></div>
      <div class="skeleton skeleton-card"></div>
      <div class="skeleton skeleton-card"></div>
    `;const r=Ne().slice(0,30);let i=`
    <div class="section-header">
      <span class="section-title">👤 Username Auctions</span>
      <span class="refresh-hint">${e?"⟳":`${V(t)} active`}</span>
    </div>

    <div class="filter-row">
      <button class="filter-pill ${_==="hot"?"active":""}" data-filter="hot">🔥 Hot</button>
      <button class="filter-pill ${_==="ending"?"active":""}" data-filter="ending">⏰ Ending Soon</button>
      <button class="filter-pill ${_==="cheap"?"active":""}" data-filter="cheap">💰 Cheapest</button>
    </div>
  `;return r.length===0?(i+=`
      <div class="empty-state">
        <div class="empty-state-icon">👤</div>
        <div class="empty-state-text">No auctions found</div>
      </div>
    `,i):(r.forEach(a=>{const l=a.domain||"",d=l.replace(".t.me",""),f=y(a.price),g=f*o,u=a.bids||0,b=a.date,w=ue(b),S=b-Math.floor(Date.now()/1e3)<3600,$=u>10?"hot":u>5?"bid":"";i+=`
      <div class="card" onclick="window.open('https://fragment.com/username/${encodeURIComponent(d)}', '_blank')">
        <div class="card-header">
          <div>
            <div class="card-title">@${Oe(d)}</div>
            <div class="card-subtitle">${l}</div>
          </div>
          <div style="text-align:right">
            <span class="auction-timer${S?' style="color:var(--red)"':""}">${w}</span>
            ${$?`<div class="card-badge ${$}" style="margin-top:4px">${u} bids</div>`:`<div class="card-subtitle">${u} bid${u!==1?"s":""}</div>`}
          </div>
        </div>
        <div class="card-stats">
          <div class="stat">
            <span class="stat-label">Current Price</span>
            <span class="stat-value">${f.toFixed(2)} TON</span>
          </div>
          <div class="stat">
            <span class="stat-label">USD</span>
            <span class="stat-value">${T(g)}</span>
          </div>
        </div>
        <div class="bid-bar">
          <div class="bid-bar-fill" style="width: ${Math.min(u*5,100)}%"></div>
        </div>
      </div>
    `}),i)}function Oe(e){const t=document.createElement("span");return t.textContent=e,t.innerHTML}function Le(e){const t=e.target.closest(".filter-pill");return t?(_=t.dataset.filter,!0):!1}function Pe(){J||(J=!0,ee())}function Fe(){ee()}const Ce=Object.freeze(Object.defineProperty({__proto__:null,mount:Pe,onInteract:Le,refresh:Fe,render:Ee},Symbol.toStringTag,{value:"Module"}));async function Ie(e,t=50,n=0){return(await N(`/nfts/collections/${e}/items`,{limit:t,offset:n})).nft_items||[]}async function Me(e=50,t=0){return Ie(le.ANONYMOUS_NUMBERS,e,t)}let K=!1;async function te(){c.set("numbersLoading",!0);try{const t=(await Me(100,0)).map(n=>{var s,r,i,a,l,d;const o=n.sale;return{address:n.address,number:((s=n.metadata)==null?void 0:s.name)||"Unknown",image:((i=(r=n.previews)==null?void 0:r[1])==null?void 0:i.url)||"",owner:((a=n.owner)==null?void 0:a.address)||"",ownerName:((l=n.owner)==null?void 0:l.name)||"",onSale:!!o,priceTon:o?y(Number(((d=o.price)==null?void 0:d.value)||0)):null,marketplace:(o==null?void 0:o.market_name)||null}});t.sort((n,o)=>n.onSale&&!o.onSale?-1:!n.onSale&&o.onSale?1:n.onSale&&o.onSale?(n.priceTon||0)-(o.priceTon||0):0),c.update({anonymousNumbers:t,numbersLoading:!1})}catch(e){console.error("Failed to load anonymous numbers:",e),c.set("numbersLoading",!1)}}function je(){const e=c.get("numbersLoading"),t=c.get("anonymousNumbers")||[],n=c.get("tonPrice"),o=(n==null?void 0:n.price)||0;if(e&&t.length===0)return`
      <div class="section-header">
        <span class="section-title">📱 Anonymous Numbers</span>
      </div>
      <div class="skeleton skeleton-card"></div>
      <div class="skeleton skeleton-card"></div>
      <div class="skeleton skeleton-card"></div>
    `;const s=t.filter(a=>a.onSale),r=t.filter(a=>!a.onSale);let i=`
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
            <span class="stat-value" style="color:var(--green)">${s.length}</span>
          </div>
        </div>
      </div>
    </div>
  `;return s.length>0&&(i+=`
      <div class="section-header">
        <span class="section-title">💰 For Sale</span>
      </div>
      <div class="number-grid">
    `,s.slice(0,20).forEach(a=>{const l=a.priceTon&&o?a.priceTon*o:null;i+=`
        <div class="number-card" onclick="window.open('https://getgems.io/nft/${a.address}', '_blank')">
          <div class="number-value">${L(a.number)}</div>
          <div class="number-price">${a.priceTon?`${a.priceTon.toFixed(1)} TON`:"—"}</div>
          ${l?`<div style="font-size:11px; color:var(--tg-theme-hint-color)">${T(l)}</div>`:""}
        </div>
      `}),i+="</div>"),r.length>0&&(i+=`
      <div class="section-header">
        <span class="section-title">📋 Recent Numbers</span>
      </div>
      <div class="number-grid">
    `,r.slice(0,20).forEach(a=>{i+=`
        <div class="number-card">
          <div class="number-value">${L(a.number)}</div>
          <div class="number-price" style="color:var(--tg-theme-hint-color)">Not listed</div>
          ${a.ownerName?`<div style="font-size:10px; color:var(--tg-theme-hint-color)">${L(a.ownerName.slice(0,15))}</div>`:""}
        </div>
      `}),i+="</div>"),i}function L(e){const t=document.createElement("span");return t.textContent=e,t.innerHTML}function ze(){K||(K=!0,te())}function De(){te()}const Ue=Object.freeze(Object.defineProperty({__proto__:null,mount:ze,refresh:De,render:je},Symbol.toStringTag,{value:"Module"}));async function He(e=20,t=0){return(await N("/jettons",{limit:e,offset:t})).jettons||[]}async function Re(e){return N(`/jettons/${e}`)}async function Ge(e=20){return(await He(e,0)).filter(n=>n.holders_count>0)}let q=!1,v="tracked";const Be={[p.NOT]:{name:"Notcoin",symbol:"NOT",emoji:"⚡"},[p.DOGS]:{name:"DOGS",symbol:"DOGS",emoji:"🐕"},[p.CATI]:{name:"Catizen",symbol:"CATI",emoji:"🐱"},[p.HMSTR]:{name:"Hamster Kombat",symbol:"HMSTR",emoji:"🐹"},[p.SCALE]:{name:"SCALE",symbol:"SCALE",emoji:"⚖️"},[p.REDO]:{name:"REDO",symbol:"REDO",emoji:"🔄"}};async function ne(){c.set("memecoinsLoading",!0);try{const e=[...de],t=await M(e,["usd","ton"]),n=e.map(s=>{var f,g,u;const r=Be[s],i=t[s],a=((f=i==null?void 0:i.prices)==null?void 0:f.USD)||0,l=((g=i==null?void 0:i.diff_24h)==null?void 0:g.USD)||"0",d=((u=i==null?void 0:i.diff_7d)==null?void 0:u.USD)||"0";return{address:s,name:(r==null?void 0:r.name)||s.slice(0,8)+"...",symbol:(r==null?void 0:r.symbol)||"???",emoji:(r==null?void 0:r.emoji)||"🪙",image:(i==null?void 0:i.image)||null,price:a,diff24h:l,diff7d:d}}),o=await Promise.all(n.map(async s=>{var r,i,a;try{const l=await Re(s.address);return{...s,holders:l.holders_count||0,totalSupply:l.total_supply||"0",image:((r=l.metadata)==null?void 0:r.image)||s.image,name:((i=l.metadata)==null?void 0:i.name)||s.name,symbol:((a=l.metadata)==null?void 0:a.symbol)||s.symbol}}catch{return{...s,holders:0}}}));c.update({trackedTokens:o,memecoinsLoading:!1})}catch(e){console.error("Failed to load tracked tokens:",e),c.set("memecoinsLoading",!1)}}async function se(){try{const e=await Ge(20),t=e.map(s=>s.address).slice(0,10);let n={};try{n=await M(t,["usd"])}catch{}const o=e.map(s=>{var i,a,l,d,f;const r=n[s.address];return{address:s.address,name:((i=s.metadata)==null?void 0:i.name)||"Unknown",symbol:((a=s.metadata)==null?void 0:a.symbol)||"???",image:((l=s.metadata)==null?void 0:l.image)||null,emoji:"🆕",holders:s.holders_count||0,price:((d=r==null?void 0:r.prices)==null?void 0:d.USD)||0,diff24h:((f=r==null?void 0:r.diff_24h)==null?void 0:f.USD)||"0"}});c.set("newTokens",o)}catch(e){console.error("Failed to load new tokens:",e)}}function Je(){const e=c.get("memecoinsLoading"),t=c.get("trackedTokens")||[],n=c.get("newTokens")||[];if(e&&t.length===0)return`
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
      <button class="filter-pill ${v==="tracked"?"active":""}" data-filter="tracked">📊 Tracked</button>
      <button class="filter-pill ${v==="new"?"active":""}" data-filter="new">🆕 New Tokens</button>
    </div>
  `;const s=v==="tracked"?t:n;if(s.length===0)return o+=`
      <div class="empty-state">
        <div class="empty-state-icon">${v==="new"?"🆕":"🚀"}</div>
        <div class="empty-state-text">
          ${v==="new"?"Loading new tokens...":"No tracked tokens yet"}
        </div>
      </div>
    `,o;if([...s].sort((i,a)=>(a.price||0)-(i.price||0)).forEach(i=>{const a=Q(i.diff24h),l=i.image&&!i.image.includes("data:");o+=`
      <div class="token-row" onclick="window.open('https://tonviewer.com/${i.address}', '_blank')">
        <div class="token-icon">
          ${l?`<img src="${P(i.image)}" alt="" loading="lazy" onerror="this.parentElement.textContent='${i.emoji}'"/>`:i.emoji}
        </div>
        <div class="token-info">
          <div class="token-name">${P(i.symbol)}</div>
          <div class="token-symbol">${P(i.name)}${i.holders?` · ${V(i.holders)} holders`:""}</div>
        </div>
        <div class="token-price-col">
          <div class="token-price">${i.price?T(i.price):"—"}</div>
          <div class="token-change ${a.dir}">${a.text}</div>
        </div>
      </div>
    `}),v==="tracked"&&t.length>0){const i=t.filter(l=>parseFloat(String(l.diff24h).replace(/[^0-9.-]/g,""))>0).length,a=t.length-i;o+=`
      <div class="card" style="margin-top: 12px; text-align:center;">
        <div style="display:flex; justify-content:center; gap:24px;">
          <div class="stat">
            <span class="stat-label">Gainers</span>
            <span class="stat-value up">${i}</span>
          </div>
          <div class="stat">
            <span class="stat-label">Losers</span>
            <span class="stat-value down">${a}</span>
          </div>
          <div class="stat">
            <span class="stat-label">Tracking</span>
            <span class="stat-value">${t.length}</span>
          </div>
        </div>
      </div>
    `}return o}function P(e){if(!e)return"";const t=document.createElement("span");return t.textContent=e,t.innerHTML}function Ke(e){const t=e.target.closest(".filter-pill");if(t){const n=t.dataset.filter;if(n!==v)return v=n,n==="new"&&(c.get("newTokens")||[]).length===0&&se(),!0}return!1}function qe(){q||(q=!0,ne())}function Qe(){ne(),v==="new"&&se()}const Ve=Object.freeze(Object.defineProperty({__proto__:null,mount:qe,onInteract:Ke,refresh:Qe,render:Je},Symbol.toStringTag,{value:"Module"})),x={gifts:ke,usernames:Ce,numbers:Ue,memecoins:Ve},oe=document.getElementById("content"),F=document.getElementById("ton-price"),ie=document.getElementById("tabs");function We(){var e,t;try{const n=(e=window.Telegram)==null?void 0:e.WebApp;if(n){if(n.ready(),n.expand(),(t=n.enableClosingConfirmation)==null||t.call(n),n.themeParams){const o=n.themeParams,s=document.documentElement.style;o.bg_color&&s.setProperty("--tg-theme-bg-color",o.bg_color),o.text_color&&s.setProperty("--tg-theme-text-color",o.text_color),o.hint_color&&s.setProperty("--tg-theme-hint-color",o.hint_color),o.link_color&&s.setProperty("--tg-theme-link-color",o.link_color),o.button_color&&s.setProperty("--tg-theme-button-color",o.button_color),o.button_text_color&&s.setProperty("--tg-theme-button-text-color",o.button_text_color),o.secondary_bg_color&&s.setProperty("--tg-theme-secondary-bg-color",o.secondary_bg_color)}console.log("✅ Telegram Web App initialized")}}catch(n){console.warn("TMA init skipped (not in Telegram):",n.message)}}async function re(){try{const e=await fe();e&&(c.set("tonPrice",e),Xe(e))}catch(e){console.error("TON price fetch failed:",e)}}function Xe(e){if(!F||!e)return;const t=Q(e.diff24h);F.querySelector(".price-value").textContent=`TON $${e.price.toFixed(2)}`;const n=F.querySelector(".price-change");n.textContent=t.text,n.className=`price-change ${t.dir}`}let h="gifts";function Ye(e){if(!x[e]||e===h)return;h=e,c.set("activeTab",e),ie.querySelectorAll(".tab").forEach(n=>{n.classList.toggle("active",n.dataset.tab===e)});const t=x[e];t.mount&&t.mount(),E()}function E(){const e=x[h];if(!e)return;const t=e.render();oe.innerHTML=t}ie.addEventListener("click",e=>{const t=e.target.closest(".tab");t&&Ye(t.dataset.tab)});oe.addEventListener("click",e=>{const t=x[h];t!=null&&t.onInteract&&t.onInteract(e)&&E()});const Ze={gifts:["giftsLoading","giftsOnSaleLoading","giftsHistoryLoading","tonPrice","ggTopCollections","ggGiftsOnSale","ggGiftHistory"],usernames:["usernamesLoading","usernameAuctions","usernameAuctionsTotal","tonPrice"],numbers:["numbersLoading","anonymousNumbers","tonPrice"],memecoins:["memecoinsLoading","trackedTokens","newTokens","tokenPrices","tonPrice"]};let C=!1,I=null;function et(e){e===h&&(C||(C=!0,I=e,requestAnimationFrame(()=>{C=!1,I===h&&E(),I=null})))}c.on("*",e=>{const t=Ze[h];t&&t.includes(e)&&et(h)});function tt(){setInterval(re,R.PRICES),setInterval(()=>{const e=x[h];e!=null&&e.refresh&&e.refresh()},R.NFT_DATA)}async function nt(){console.log("🚀 TON Trading Hub starting..."),We(),await re();const e=x[h];e.mount&&e.mount(),E(),tt(),console.log("✅ TON Trading Hub ready")}nt();
