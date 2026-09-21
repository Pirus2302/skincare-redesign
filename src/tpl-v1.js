/* Вариант 1 «Свежесть» – тот же характер (Prata + Manrope, оливковый), но чище сетка, воздух и читаемость */
const { SC, icon, esc, switcher } = require('./data');

const navHtml = () => SC.nav.map(n => n.sub
  ? `<li class="has-sub"><a href="${n.href}">${n.t}<i></i></a><ul class="sub${n.sub.length > 8 ? ' sub-wide' : ''}">${n.sub.map(s => `<li><a href="${s.href}">${s.t}</a></li>`).join('')}</ul></li>`
  : `<li><a href="${n.href}"${n.t === 'Главная' ? ' aria-current="page"' : ''}>${n.t}</a></li>`).join('');

const head = h => `<div class="sec-head"><h2>${h}</h2><span class="leaf" aria-hidden="true"></span></div>`;

module.exports = () => `<!doctype html>
<html lang="ru">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>skincare.by – вариант 1 «Свежесть»</title>
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Manrope:wght@400;500;600;700&family=Prata&display=swap" rel="stylesheet">
<style>
:root{--bg:#fff;--soft:#f6f6f3;--ink:#1d1f1b;--mute:#6b6e66;--olive:#56634f;--olive-d:#3c4637;--gold:#b3946a;--line:#e8e8e3;--wrap:1320px}
*{box-sizing:border-box;margin:0}
html{scroll-behavior:smooth}
body{background:var(--bg);color:var(--ink);font:400 15px/1.65 Manrope,system-ui,sans-serif;-webkit-font-smoothing:antialiased}
img{display:block;max-width:100%}
a{color:inherit;text-decoration:none}
ul{list-style:none;padding:0}
h1,h2,h3{font-family:Prata,Georgia,serif;font-weight:400;line-height:1.2}
.wrap{max-width:var(--wrap);margin:0 auto;padding:0 32px}
.btn{display:inline-flex;align-items:center;gap:10px;padding:16px 28px;background:var(--olive);color:#fff;font:600 12px/1 Manrope,sans-serif;letter-spacing:.14em;text-transform:uppercase;border:1px solid var(--olive);transition:background .25s,color .25s}
.btn:hover{background:var(--olive-d)}
.btn.ghost{background:transparent;color:var(--olive)}
.btn.ghost:hover{background:var(--olive);color:#fff}
.btn svg{transition:transform .25s}.btn:hover svg{transform:translateX(4px)}

/* верхняя строка */
.top{background:var(--olive-d);color:#e9ebe4;font-size:13px}
.top .wrap{display:flex;justify-content:space-between;align-items:center;min-height:40px;gap:16px}
.top a{display:inline-flex;align-items:center;gap:7px;opacity:.9}.top a:hover{opacity:1}
.top .l,.top .r{display:flex;gap:22px;align-items:center}

/* шапка */
.hdr{position:sticky;top:0;z-index:50;background:rgba(255,255,255,.94);backdrop-filter:blur(10px);border-bottom:1px solid var(--line)}
.hdr .wrap{display:flex;align-items:center;gap:40px;min-height:76px}
.logo img{height:30px;width:auto}
.menu{display:flex;gap:30px;flex:1}
.menu>li{position:relative}
.menu>li>a{display:inline-flex;align-items:center;gap:6px;padding:28px 0;font:600 12px/1 Manrope,sans-serif;letter-spacing:.16em;text-transform:uppercase;position:relative}
.menu>li>a::after{content:"";position:absolute;left:0;right:100%;bottom:20px;height:1px;background:var(--olive);transition:right .3s}
.menu>li:hover>a::after,.menu>li>a[aria-current]::after{right:0}
.menu i{width:6px;height:6px;border-right:1.5px solid;border-bottom:1.5px solid;transform:rotate(45deg) translateY(-2px)}
.sub{position:absolute;top:100%;left:-24px;min-width:240px;padding:16px 24px;background:#fff;border:1px solid var(--line);box-shadow:0 20px 50px rgba(40,44,36,.1);opacity:0;visibility:hidden;transform:translateY(8px);transition:.25s}
.sub-wide{columns:2;column-gap:32px;min-width:520px}
.has-sub:hover .sub,.has-sub:focus-within .sub{opacity:1;visibility:visible;transform:none}
.sub a{display:block;padding:7px 0;font-size:14px;color:var(--mute);break-inside:avoid}.sub a:hover{color:var(--olive)}
.tools{display:flex;gap:20px;align-items:center}
.tools a,.tools button{position:relative;background:none;border:0;color:inherit;cursor:pointer;display:grid;place-items:center}
.tools em{position:absolute;top:-8px;right:-10px;min-width:17px;height:17px;border-radius:9px;background:var(--olive);color:#fff;font:600 10px/17px Manrope;text-align:center;font-style:normal}
.tools .burger{display:none}

/* hero-слайдер */
.hero{position:relative;height:min(78vh,720px);min-height:520px;overflow:hidden;background:var(--soft)}
.slide{position:absolute;inset:0;opacity:0;visibility:hidden;transition:opacity 1s,visibility 1s}
.slide.on{opacity:1;visibility:visible}
.slide>img{position:absolute;inset:0;width:100%;height:100%;object-fit:cover;object-position:right 28%;transform:scale(1.06);transition:transform 7s ease-out}
.slide.on>img{transform:none}
.slide::before{content:"";position:absolute;inset:0;z-index:1;background:linear-gradient(90deg,rgba(255,255,255,.9) 0%,rgba(255,255,255,.62) 38%,rgba(255,255,255,0) 62%)}
.slide .wrap{position:relative;z-index:2;height:100%;display:flex;flex-direction:column;justify-content:center;align-items:flex-start}
.slide h1,.slide h2{font-size:clamp(32px,4.200vw,58px);max-width:13em;margin-bottom:22px}
.slide p{max-width:520px;font-size:16px;color:#3f423b;margin-bottom:34px}
.slide .cap{font:600 12px/1 Manrope;letter-spacing:.2em;text-transform:uppercase;color:var(--olive);margin-bottom:22px;display:flex;gap:12px;align-items:center}
.slide .cap::before{content:"";width:36px;height:1px;background:var(--olive)}
.slide.on .cap,.slide.on h1,.slide.on h2,.slide.on p,.slide.on .btn{animation:up .9s both}
.slide.on h1,.slide.on h2{animation-delay:.12s}.slide.on p{animation-delay:.24s}.slide.on .btn{animation-delay:.36s}
@keyframes up{from{opacity:0;transform:translateY(22px)}}
.hero-nav{position:absolute;z-index:3;left:0;right:0;bottom:30px}
.hero-nav .wrap{display:flex;align-items:center;gap:18px}
.hero-nav button{width:44px;height:44px;border:1px solid rgba(29,31,27,.25);background:rgba(255,255,255,.5);display:grid;place-items:center;cursor:pointer;color:var(--ink);transition:.25s}
.hero-nav button:hover{background:var(--olive);border-color:var(--olive);color:#fff}
.count{font:400 15px Prata,serif;letter-spacing:.06em}
.bars{display:flex;gap:6px}.bars span{width:38px;height:2px;background:rgba(29,31,27,.18);position:relative;overflow:hidden}
.bars span.on::after{content:"";position:absolute;inset:0;background:var(--olive);animation:bar 6s linear both}
@keyframes bar{from{transform:translateX(-100%)}}

/* секции */
section{padding:96px 0}
.sec-head{text-align:center;margin-bottom:54px}
.sec-head h2{font-size:clamp(28px,3vw,40px)}
.leaf{display:block;width:150px;height:14px;margin:18px auto 0;background:linear-gradient(var(--line),var(--line)) left center/58px 1px no-repeat,linear-gradient(var(--line),var(--line)) right center/58px 1px no-repeat;position:relative}
.leaf::after{content:"";position:absolute;left:50%;top:50%;width:9px;height:9px;background:var(--gold);transform:translate(-50%,-50%) rotate(45deg);border-radius:0 60% 0 60%}

/* бренды */
.brands{padding:80px 0 40px}
.marq{overflow:hidden;mask-image:linear-gradient(90deg,transparent,#000 8%,#000 92%,transparent)}
.marq ul{display:flex;gap:28px;padding-right:28px;width:max-content;animation:marq 48s linear infinite}
.marq:hover ul{animation-play-state:paused}
@keyframes marq{to{transform:translateX(-50%)}}
.marq a{position:relative;display:block;width:210px;height:110px;overflow:hidden;background:#fff;border:1px solid var(--line);transition:border-color .25s}
.marq a:hover{border-color:var(--gold)}
.marq img{position:absolute;left:50%;top:50%;transform:translate(var(--x),var(--y));width:calc(140px*var(--k));max-width:none;aspect-ratio:1;object-fit:contain;mix-blend-mode:multiply;filter:grayscale(1);opacity:.9;transition:.3s}
.marq a:hover img{filter:none;opacity:1}

/* категории */
.cats{display:grid;grid-template-columns:repeat(4,minmax(0,1fr));gap:40px 28px}
.cat .ph{overflow:hidden;aspect-ratio:1/1;background:var(--soft);position:relative}
.cat img{width:100%;height:100%;object-fit:cover;transition:transform .9s cubic-bezier(.2,.7,.2,1)}
.cat:hover img{transform:scale(1.06)}
.cat .ph::after{content:"";position:absolute;inset:12px;border:1px solid rgba(255,255,255,.7);opacity:0;transition:.4s}
.cat:hover .ph::after{opacity:1}
.cat h3{font-size:21px;margin-top:20px;text-align:center;transition:color .25s}.cat:hover h3{color:var(--olive)}
.cat p{text-align:center;color:var(--mute);font-size:14px;margin-top:6px}

/* карусели */
.soft{background:var(--soft)}
.car{position:relative}
.car-nav{position:absolute;right:0;top:-104px;display:flex;gap:8px}
.car-nav button{width:44px;height:44px;border:1px solid var(--line);background:#fff;display:grid;place-items:center;cursor:pointer;color:var(--ink);transition:.25s}
.car-nav button:hover{background:var(--olive);border-color:var(--olive);color:#fff}
.track{display:grid;grid-auto-flow:column;gap:28px;overflow-x:auto;scroll-snap-type:x mandatory;scrollbar-width:none;padding-bottom:4px}
.track::-webkit-scrollbar{display:none}
.track>*{scroll-snap-align:start}
.prods{grid-auto-columns:calc((100% - 84px)/4)}
.prod{background:#fff;border:1px solid var(--line);display:flex;flex-direction:column;transition:box-shadow .3s,transform .3s}
.prod:hover{box-shadow:0 18px 40px rgba(40,44,36,.09);transform:translateY(-4px)}
.prod .ph{aspect-ratio:1/1;padding:26px;display:grid;place-items:center}
.prod img{max-height:100%;object-fit:contain;mix-blend-mode:multiply}
.prod .bd{padding:0 22px 24px;display:flex;flex-direction:column;flex:1;text-align:center}
.prod h3{font:500 14px/1.500 Manrope,sans-serif;display:-webkit-box;-webkit-line-clamp:3;-webkit-box-orient:vertical;overflow:hidden;min-height:63px}
.prod .pr{margin:12px 0 18px;font-weight:700;font-size:16px;color:var(--olive-d)}
.prod .pr.ask{font-weight:500;font-size:14px;color:var(--mute)}
.prod .btn{margin-top:auto;justify-content:center;padding:14px 10px}

/* баннеры */
.bans{display:grid;grid-template-columns:1fr 1fr;gap:28px}
.ban{position:relative;min-height:340px;display:flex;align-items:center;overflow:hidden;background:var(--soft)}
.ban img{position:absolute;inset:0;width:100%;height:100%;object-fit:cover;transition:transform 1.200s cubic-bezier(.2,.7,.2,1)}
.ban:hover img{transform:scale(1.05)}
.ban::before{content:"";position:absolute;inset:0;z-index:1;background:linear-gradient(90deg,rgba(255,255,255,.82),rgba(255,255,255,.15) 75%)}
.ban div{position:relative;z-index:2;padding:48px;max-width:420px}
.ban h3{font-size:28px;margin-bottom:26px}

/* статьи */
.posts{grid-auto-columns:calc((100% - 56px)/3)}
.post .ph{aspect-ratio:3/2;overflow:hidden;background:var(--soft)}
.post img{width:100%;height:100%;object-fit:cover;transition:transform .9s cubic-bezier(.2,.7,.2,1)}
.post:hover img{transform:scale(1.05)}
.post time{display:block;margin:20px 0 10px;font:600 11px/1 Manrope;letter-spacing:.18em;text-transform:uppercase;color:var(--gold)}
.post h3{font-size:21px;margin-bottom:12px;transition:color .25s}.post:hover h3{color:var(--olive)}
.post p{color:var(--mute);margin-bottom:16px}
.more{display:inline-flex;gap:8px;align-items:center;font:600 12px/1 Manrope;letter-spacing:.14em;text-transform:uppercase;color:var(--olive);border-bottom:1px solid currentColor;padding-bottom:5px}

/* подвал */
footer{background:var(--olive-d);color:#d5d9cf;padding:80px 0 0;font-size:14px}
.ft{display:grid;grid-template-columns:1.500fr 1fr 1.300fr 1.100fr;gap:48px}
.ft .flogo{height:28px;width:auto;margin-bottom:26px;filter:brightness(0) invert(1);opacity:.92}
.ft p{margin-bottom:12px;color:#b9bfb2}
.ft h4{font:600 12px/1 Manrope;letter-spacing:.18em;text-transform:uppercase;color:#fff;margin-bottom:24px}
.ft li{margin-bottom:10px}.ft li a{color:#b9bfb2;transition:color .2s}.ft li a:hover{color:#fff}
.ft .two{columns:2;column-gap:24px}
.ft .soc{display:flex;gap:10px;margin-bottom:20px}
.ft .soc a{width:38px;height:38px;border:1px solid rgba(255,255,255,.25);display:grid;place-items:center;transition:.25s}.ft .soc a:hover{background:#fff;color:var(--olive-d)}
.fbot{margin-top:60px;border-top:1px solid rgba(255,255,255,.12);padding:22px 0 84px}
.fbot .wrap{display:flex;justify-content:space-between;align-items:center;gap:24px;flex-wrap:wrap}
.fbot .pay{display:flex;gap:18px;align-items:center;flex-wrap:wrap}.fbot .pay .strip{max-width:100%;object-fit:contain}
.fbot .pay img{height:26px;width:auto}.fbot .pay .strip{height:20px;opacity:.85}
.fbot .dev{display:flex;gap:12px;align-items:center;color:#b9bfb2;font-size:13px}.fbot .dev img{height:22px}

.rv{opacity:0;transform:translateY(26px);transition:opacity .9s,transform .9s cubic-bezier(.2,.7,.2,1)}.rv.in{opacity:1;transform:none}

@media(max-width:1080px){.prods{grid-auto-columns:calc((100% - 56px)/3)}.ft{grid-template-columns:1fr 1fr}.menu{gap:20px}.hdr .wrap{gap:24px}}
@media(max-width:860px){
 .wrap{padding:0 16px}section{padding:64px 0}
 .top .l a span,.top .r a span{display:none}
 .tools .burger{display:grid}.menu{display:none;position:absolute;top:100%;left:0;right:0;flex-direction:column;gap:0;background:#fff;border-bottom:1px solid var(--line);padding:8px 16px 16px;max-height:70vh;overflow:auto}
 .menu.open{display:flex}.menu>li>a{padding:14px 0}.menu>li>a::after{display:none}
 .sub,.sub-wide{position:static;opacity:1;visibility:visible;transform:none;box-shadow:none;border:0;padding:0 0 8px 12px;min-width:0;columns:1}
 .hdr .wrap{justify-content:space-between;min-height:64px}
 .hero{height:auto;min-height:0}.slide{position:relative;display:none}.slide.on{display:block}
 .slide>img{position:relative;height:260px}.slide::before{display:none}
 .slide .wrap{padding-top:28px;padding-bottom:96px}
 .cats{grid-template-columns:repeat(2,minmax(0,1fr));gap:28px 14px}.cat h3{font-size:18px}
 .prods{grid-auto-columns:72%}.posts{grid-auto-columns:84%}
 .car-nav{display:none}.bans{grid-template-columns:1fr}.ban div{padding:32px 24px}
 .ft{grid-template-columns:1fr;gap:36px}
}
@media(prefers-reduced-motion:reduce){*{animation:none!important;transition:none!important}.rv{opacity:1;transform:none}}
</style>
</head>
<body>

<div class="top"><div class="wrap">
  <div class="l"><a href="tel:${SC.phone}">${icon.phone}<span>${SC.phone}</span></a><a href="mailto:${SC.email}">${icon.mail}<span>${SC.email}</span></a></div>
  <div class="r"><a href="${SC.account}">${icon.user}<span>Личный кабинет</span></a><a href="${SC.instagram}" aria-label="Instagram">${icon.ig}</a><a href="${SC.telegram}" aria-label="Telegram">${icon.tg}</a></div>
</div></div>

<header class="hdr"><div class="wrap">
  <a class="logo" href="${SC.site}"><img src="${SC.logo}" alt="skincare.by" width="402" height="78"></a>
  <ul class="menu" id="menu">${navHtml()}</ul>
  <div class="tools">
    <button aria-label="Поиск">${icon.search}</button>
    <a href="${SC.wishlist}" aria-label="Избранное">${icon.heart}<em>0</em></a>
    <a href="${SC.cart}" aria-label="Корзина">${icon.bag}<em>0</em></a>
    <button class="burger" aria-label="Меню" data-menu>${icon.menu}</button>
  </div>
</div></header>

<div class="hero" id="hero">
${SC.slides.map((s, i) => `  <div class="slide${i ? '' : ' on'}">
    <img src="${s.img}" alt="" ${i ? 'loading="lazy"' : 'fetchpriority="high"'}>
    <div class="wrap">
      <span class="cap">skincare.by</span>
      <h${i ? 2 : 1}>${esc(s.title)}</h${i ? 2 : 1}>
      <p>${esc(s.text)}</p>
      <a class="btn" href="${s.href}">${s.cta}${icon.arrow}</a>
    </div>
  </div>`).join('\n')}
  <div class="hero-nav"><div class="wrap">
    <button data-hero="-1" aria-label="Предыдущий слайд">${icon.back}</button>
    <button data-hero="1" aria-label="Следующий слайд">${icon.arrow}</button>
    <span class="count"><b id="hn">01</b> / 0${SC.slides.length}</span>
    <span class="bars">${SC.slides.map((_, i) => `<span${i ? '' : ' class="on"'}></span>`).join('')}</span>
  </div></div>
</div>

<section class="brands"><div class="wrap rv">
  ${head('Сотрудничаю с брендами')}
  <div class="marq"><ul>${[...SC.brands, ...SC.brands].map(b => `<li><a href="${b.href}"><img style="${b.pos}" src="${b.img}" alt="${esc(b.t)}" loading="lazy"></a></li>`).join('')}</ul></div>
</div></section>

<section><div class="wrap">
  <div class="rv">${head('Категории')}</div>
  <div class="cats">
${SC.cats.map(c => `    <a class="cat rv" href="${c.href}"><div class="ph"><img src="${c.img}" alt="${esc(c.t)}" loading="lazy"></div><h3>${c.t}</h3>${c.d ? `<p>${c.d}</p>` : ''}</a>`).join('\n')}
  </div>
</div></section>

<section class="soft"><div class="wrap">
  <div class="rv">${head('Новинки')}</div>
  <div class="car rv">
    <div class="car-nav"><button data-car="-1" aria-label="Назад">${icon.back}</button><button data-car="1" aria-label="Вперёд">${icon.arrow}</button></div>
    <div class="track prods">
${SC.products.map(p => `      <article class="prod"><a class="ph" href="${p.href}"><img src="${p.img}" alt="${esc(p.t)}" loading="lazy"></a><div class="bd"><h3><a href="${p.href}">${esc(p.t)}</a></h3><div class="pr${p.buy ? '' : ' ask'}">${p.price}</div><a class="btn${p.buy ? '' : ' ghost'}" href="${p.href}">${p.buy ? 'В корзину' : 'Подробнее'}</a></div></article>`).join('\n')}
    </div>
  </div>
</div></section>

<section><div class="wrap"><div class="bans">
${SC.banners.map(b => `  <a class="ban rv" href="${b.href}"><img src="${b.img}" alt="" loading="lazy"><div><h3>${b.t}</h3><span class="btn">${b.cta}${icon.arrow}</span></div></a>`).join('\n')}
</div></div></section>

<section class="soft"><div class="wrap">
  <div class="rv">${head('Полезные статьи')}</div>
  <div class="car rv">
    <div class="car-nav"><button data-car="-1" aria-label="Назад">${icon.back}</button><button data-car="1" aria-label="Вперёд">${icon.arrow}</button></div>
    <div class="track posts">
${SC.posts.map(p => `      <a class="post" href="${p.href}"><div class="ph"><img src="${p.img}" alt="" loading="lazy"></div><time>${p.date}</time><h3>${esc(p.t)}</h3><p>${esc(p.ex)}</p><span class="more">Подробнее${icon.arrow}</span></a>`).join('\n')}
    </div>
  </div>
</div></section>

<footer>
  <div class="wrap ft">
    <div><img class="flogo" src="${SC.logo}" alt="skincare.by">${SC.footer.legal.map(l => `<p>${l}</p>`).join('')}</div>
    <div><h4>Главная</h4><ul>${SC.footer.main.map(l => `<li><a href="${l.href}">${l.t}</a></li>`).join('')}</ul></div>
    <div><h4>Каталог</h4><ul class="two">${SC.nav[1].sub.slice(0, 13).map(l => `<li><a href="${l.href}">${l.t}</a></li>`).join('')}</ul></div>
    <div><h4>Контакты</h4>
      <div class="soc"><a href="${SC.instagram}" aria-label="Instagram">${icon.ig}</a><a href="${SC.telegram}" aria-label="Telegram">${icon.tg}</a></div>
      <ul><li><a href="tel:${SC.phone}">${SC.phone}</a></li><li><a href="mailto:${SC.email}">${SC.email}</a></li><li>${SC.address}</li></ul>
    </div>
  </div>
  <div class="fbot"><div class="wrap">
    <div class="pay"><img src="${SC.footer.pay[0]}" alt="Хуткi Грош"><img src="${SC.footer.pay[1]}" alt="ЕРИП"><img class="strip" src="${SC.footer.payStrip}" alt="Способы оплаты"></div>
    <div class="dev">${SC.footer.dev.t}<img src="${SC.footer.dev.img}" alt="Pirus"></div>
  </div></div>
</footer>

${switcher('v1.html')}
<script>
(function(){
  var slides=[].slice.call(document.querySelectorAll('.slide')),bars=[].slice.call(document.querySelectorAll('.bars span')),hn=document.getElementById('hn'),cur=0,timer;
  function go(n){cur=(n+slides.length)%slides.length;slides.forEach(function(s,i){s.classList.toggle('on',i===cur)});bars.forEach(function(b,i){b.classList.remove('on');if(i===cur){void b.offsetWidth;b.classList.add('on')}});hn.textContent='0'+(cur+1);clearTimeout(timer);timer=setTimeout(function(){go(cur+1)},6000)}
  document.querySelectorAll('[data-hero]').forEach(function(b){b.addEventListener('click',function(){go(cur+ +b.dataset.hero)})});
  timer=setTimeout(function(){go(1)},6000);
  document.querySelectorAll('[data-car]').forEach(function(b){b.addEventListener('click',function(){var t=b.closest('.car').querySelector('.track'),c=t.firstElementChild;t.scrollBy({left:+b.dataset.car*(c.offsetWidth+28),behavior:'smooth'})})});
  document.querySelector('[data-menu]').addEventListener('click',function(){document.getElementById('menu').classList.toggle('open')});
  var io=new IntersectionObserver(function(es){es.forEach(function(e){if(e.isIntersecting){e.target.classList.add('in');io.unobserve(e.target)}})},{threshold:.12});
  document.querySelectorAll('.rv').forEach(function(el,i){el.style.transitionDelay=(i%4)*70+'ms';io.observe(el)});
})();
</script>
</body>
</html>
`;
