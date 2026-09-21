/* Вариант 2 «Журнал» – редакционная вёрстка: сплит-hero с портретом, арки, тонкие линейки, всё содержимое видно без слайдеров.
   Hero собран по скелету GetLayers «artist-hero» (колонка текста + высокий портрет + строка фактов) */
const { SC, icon, esc, switcher } = require('./data');

const navHtml = () => SC.nav.map(n => n.sub
  ? `<li class="has-sub"><a href="${n.href}">${n.t}<i></i></a><ul class="sub${n.sub.length > 8 ? ' sub-wide' : ''}">${n.sub.map(s => `<li><a href="${s.href}">${s.t}</a></li>`).join('')}</ul></li>`
  : `<li><a href="${n.href}"${n.t === 'Главная' ? ' aria-current="page"' : ''}>${n.t}</a></li>`).join('');

const head = (n, h, extra = '') => `<div class="sh rv"><span class="no">${n}</span><h2>${h}</h2>${extra}</div>`;
const [s1, s2, s3] = SC.slides;
const [feat, ...rest] = [SC.posts[3], SC.posts[4], SC.posts[0], SC.posts[1], SC.posts[2]];

module.exports = () => `<!doctype html>
<html lang="ru">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>skincare.by – вариант 2 «Журнал»</title>
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Lora:ital,wght@0,400;0,500;1,400;1,500&family=Onest:wght@400;500;600&display=swap" rel="stylesheet">
<style>
:root{--bg:#fff;--paper:#f7f7f4;--ink:#24251f;--mute:#6f6c63;--olive:#4d5a45;--clay:#b9683f;--line:#e7e6e0;--wrap:1360px;--e:cubic-bezier(.2,.7,.2,1)}
*{box-sizing:border-box;margin:0}
body{background:var(--bg);color:var(--ink);font:400 15px/1.65 Onest,system-ui,sans-serif;-webkit-font-smoothing:antialiased}
img{display:block;max-width:100%}a{color:inherit;text-decoration:none}ul{list-style:none;padding:0}
h1,h2,h3{font-family:Lora,Georgia,serif;font-weight:400;line-height:1.120;letter-spacing:-.01em}
em{font-style:italic;color:var(--clay)}
.wrap{max-width:var(--wrap);margin:0 auto;padding:0 40px}
.caps{font:500 11px/1 Onest,sans-serif;letter-spacing:.2em;text-transform:uppercase}
.btn{display:inline-flex;align-items:center;gap:12px;padding:17px 30px;border-radius:999px;background:var(--ink);color:var(--paper);border:1px solid var(--ink);font:500 12px/1 Onest;letter-spacing:.14em;text-transform:uppercase;transition:.3s var(--e)}
.btn:hover{background:var(--clay);border-color:var(--clay)}
.btn.line{background:transparent;color:var(--ink)}.btn.line:hover{background:var(--ink);color:var(--paper)}
.btn svg{transition:transform .3s var(--e)}.btn:hover svg{transform:translateX(5px)}

/* лента-анонс */
.ann{background:var(--olive);color:#eef0e8;text-align:center;padding:10px 16px;font-size:13px}
.ann b{font-weight:500}.ann a{margin-left:12px;border-bottom:1px solid rgba(255,255,255,.5);padding-bottom:1px}

/* шапка */
.hdr{position:sticky;top:0;z-index:50;background:rgba(255,255,255,.94);backdrop-filter:blur(10px);border-bottom:1px solid var(--line)}
.h1r{display:grid;grid-template-columns:1fr auto 1fr;align-items:center;min-height:70px}
.h1r .c{display:flex;gap:22px;font-size:13px;color:var(--mute)}.h1r .c a{display:inline-flex;gap:7px;align-items:center}.h1r .c a:hover{color:var(--ink)}
.logo img{height:30px;width:auto}
.tools{display:flex;gap:20px;justify-content:flex-end;align-items:center}
.tools a,.tools button{position:relative;background:none;border:0;color:inherit;cursor:pointer;display:grid;place-items:center}
.tools .acc{display:inline-flex;gap:7px;font-size:13px;color:var(--mute)}
.tools i.n{position:absolute;top:-8px;right:-10px;min-width:17px;height:17px;border-radius:9px;background:var(--clay);color:#fff;font:600 10px/17px Onest;text-align:center;font-style:normal}
.tools .burger{display:none}
.menu{display:flex;justify-content:center;gap:40px;border-top:1px solid var(--line)}
.menu>li{position:relative}
.menu>li>a{display:inline-flex;align-items:center;gap:7px;padding:16px 0;font:500 12px/1 Onest;letter-spacing:.18em;text-transform:uppercase;transition:color .2s}
.menu>li>a:hover,.menu>li>a[aria-current]{color:var(--clay)}
.menu i{width:5px;height:5px;border-right:1.5px solid;border-bottom:1.5px solid;transform:rotate(45deg) translateY(-2px)}
.sub{position:absolute;top:100%;left:50%;min-width:240px;padding:18px 26px;background:var(--paper);border:1px solid var(--line);border-radius:4px;box-shadow:0 24px 60px rgba(60,50,30,.12);opacity:0;visibility:hidden;transform:translate(-50%,8px);transition:.25s}
.sub-wide{columns:2;column-gap:34px;min-width:540px}
.has-sub:hover .sub,.has-sub:focus-within .sub{opacity:1;visibility:visible;transform:translate(-50%,0)}
.sub a{display:block;padding:7px 0;font-size:14px;color:var(--mute);break-inside:avoid}.sub a:hover{color:var(--clay)}

/* hero */
.hero .wrap{display:grid;grid-template-columns:1fr 1fr;gap:64px;align-items:center;padding-top:40px;padding-bottom:56px}
.eyebrow{display:flex;align-items:center;gap:14px;color:var(--olive);margin-bottom:32px}.eyebrow::before{content:"";width:44px;height:1px;background:currentColor}
.hero h1{font-size:clamp(38px,4.300vw,64px);margin-bottom:28px}
.hero .lead{font-size:16px;line-height:1.700;color:#4b4a43;max-width:46ch;margin-bottom:36px}
.ctas{display:flex;gap:12px;flex-wrap:wrap}
.ledger{display:grid;grid-template-columns:repeat(3,1fr);margin-top:40px;border-top:1px solid var(--line)}
.ledger div{padding:20px 20px 0 0}.ledger div+div{padding-left:20px;border-left:1px solid var(--line)}
.ledger .caps{color:var(--mute);display:block;margin-bottom:10px}
.ledger b{font:400 17px/1.300 Lora,serif}
.plate{position:relative}
.plate{justify-self:end;width:min(100%,calc((100vh - 230px)*.86))}
.plate .arch{border-radius:999px 999px 6px 6px;overflow:hidden;aspect-ratio:.86;background:var(--paper)}
.plate img{width:100%;height:100%;object-fit:cover;object-position:80% center;animation:zoom 2.400s var(--e) both}
@keyframes zoom{from{transform:scale(1.12)}}
.plate .tag{position:absolute;left:-28px;bottom:48px;background:#fff;border:1px solid var(--line);border-radius:4px;padding:16px 20px;max-width:230px;box-shadow:0 20px 50px rgba(60,50,30,.1)}
.plate .tag .caps{color:var(--clay);display:block;margin-bottom:8px}.plate .tag b{font:400 16px/1.350 Lora,serif}
.hero .eyebrow,.hero h1,.hero .lead,.hero .ctas,.hero .ledger{animation:up 1s var(--e) both}
.hero h1{animation-delay:.1s}.hero .lead{animation-delay:.2s}.hero .ctas{animation-delay:.3s}.hero .ledger{animation-delay:.42s}
@keyframes up{from{opacity:0;transform:translateY(24px)}}

/* заявление (второй слайд): фото | оливковая плашка с текстом | фото, от края до края */
.state{display:grid;grid-template-columns:1fr 1.150fr 1fr;min-height:min(62vh,540px)}
.state .ph{overflow:hidden;min-height:280px}
.state img{width:100%;height:100%;object-fit:cover;filter:contrast(1.1) saturate(1.15) brightness(.97);transition:transform 1.400s var(--e)}
.state .ph:hover img{transform:scale(1.05)}
.state .t{background:var(--olive);color:#fff;display:flex;flex-direction:column;justify-content:center;align-items:flex-start;gap:34px;padding:clamp(32px,4.500vw,72px)}
.state h2{font-size:clamp(28px,2.900vw,44px);line-height:1.180}
.state h2 em{color:#f0c9a6}
.state .btn{background:#fff;border-color:#fff;color:var(--ink)}.state .btn:hover{background:var(--clay);border-color:var(--clay);color:#fff}

section{padding:104px 0}
.sh{display:grid;grid-template-columns:auto 1fr auto;align-items:end;gap:24px;padding-bottom:26px;margin-bottom:52px;border-bottom:1px solid var(--line)}
.sh .no{font:italic 400 18px Lora,serif;color:var(--clay)}
.sh h2{font-size:clamp(30px,3.400vw,48px)}
.sh .link{display:inline-flex;gap:10px;align-items:center;color:var(--olive)}

/* бренды: ряд 7 + ряд 6 по центру, знаки выровнены по оптическому размеру (--k из data.js) */
.blist{--u:clamp(84px,8.600vw,128px);display:flex;flex-wrap:wrap;justify-content:center;gap:14px}
.blist a{position:relative;display:block;width:calc((100% - 84px)/7);height:calc(var(--u)*.92);overflow:hidden;border-radius:999px;background:var(--paper);transition:background .35s,transform .5s var(--e)}
.blist a:hover{background:#fff;box-shadow:0 0 0 1px var(--line),0 18px 40px -18px rgba(40,40,30,.25);transform:translateY(-4px)}
.blist img{position:absolute;left:50%;top:50%;transform:translate(var(--x),var(--y));width:calc(var(--u)*var(--k));max-width:none;aspect-ratio:1;object-fit:contain;mix-blend-mode:multiply;filter:grayscale(1);opacity:.85;transition:.35s}
.blist a:hover img{filter:none;opacity:1}

/* категории */
.cats{display:grid;grid-template-columns:repeat(4,minmax(0,1fr));gap:56px 32px}
.cat:nth-child(even){transform:translateY(48px)}
.cat .ph{aspect-ratio:3/4;border-radius:999px 999px 6px 6px;overflow:hidden;background:var(--paper)}
.cat img{width:100%;height:100%;object-fit:cover;transition:transform 1.100s var(--e)}
.cat:hover img{transform:scale(1.07)}
.cat .row{display:flex;justify-content:space-between;align-items:baseline;gap:12px;margin-top:20px;padding-bottom:12px;border-bottom:1px solid var(--line);transition:border-color .3s}
.cat:hover .row{border-color:var(--clay)}
.cat h3{font-size:22px}.cat .k{font:italic 400 14px Lora,serif;color:var(--clay)}
.cat p{color:var(--mute);font-size:14px;margin-top:10px}
.cats-pad{padding-bottom:152px}

/* новинки */
.paper{background:var(--paper);border-block:1px solid var(--line)}
.pgrid{display:grid;grid-template-columns:repeat(5,minmax(0,1fr));border-left:1px solid var(--line);border-top:1px solid var(--line)}
.prod{display:flex;flex-direction:column;padding:22px;border-right:1px solid var(--line);border-bottom:1px solid var(--line);background:#fff;transition:background .3s}
.prod:hover{background:var(--paper)}
.prod .ph{aspect-ratio:1/1;display:grid;place-items:center;padding:10px;margin-bottom:16px}
.prod img{max-height:100%;object-fit:contain;mix-blend-mode:multiply;transition:transform .7s var(--e)}
.prod:hover img{transform:scale(1.06) translateY(-4px)}
.prod h3{font:400 14px/1.500 Onest,sans-serif;display:-webkit-box;-webkit-line-clamp:3;-webkit-box-orient:vertical;overflow:hidden;min-height:63px}
.prod .ft{display:flex;justify-content:space-between;align-items:center;gap:10px;margin-top:auto;padding-top:16px}
.prod .pr{font:500 18px Lora,serif}.prod .pr.ask{font:400 13px Onest;color:var(--mute)}
.prod .go{display:inline-flex;align-items:center;gap:8px;padding:10px 16px;border-radius:999px;border:1px solid var(--ink);font:500 11px/1 Onest;letter-spacing:.1em;text-transform:uppercase;white-space:nowrap;transition:.25s}
.prod .go:hover{background:var(--ink);color:var(--paper)}
.prod .go.buy{background:var(--olive);border-color:var(--olive);color:#fff}.prod .go.buy:hover{background:var(--clay);border-color:var(--clay)}

/* консультация и подбор */
.duo{display:grid;grid-template-columns:1.700fr 1fr;gap:32px}
.ban{position:relative;min-height:440px;border-radius:6px;overflow:hidden;display:flex;align-items:flex-end;background:var(--paper)}
.ban img{position:absolute;inset:0;width:100%;height:100%;object-fit:cover;transition:transform 1.400s var(--e)}
.ban:hover img{transform:scale(1.05)}
.ban::before{content:"";position:absolute;inset:0;z-index:1;background:linear-gradient(0deg,rgba(255,255,255,.94) 0%,rgba(255,255,255,.4) 45%,rgba(255,255,255,0) 70%)}
.ban div{position:relative;z-index:2;padding:40px;display:flex;justify-content:space-between;align-items:flex-end;gap:24px;width:100%;flex-wrap:wrap}
.ban h3{font-size:clamp(26px,2.600vw,38px);max-width:12em}

/* статьи */
.blog{display:grid;grid-template-columns:1fr 1fr;gap:64px}
.feat .ph{aspect-ratio:4/3;border-radius:6px;overflow:hidden;margin-bottom:26px}
.feat img,.li img{width:100%;height:100%;object-fit:cover;transition:transform 1.100s var(--e)}
.feat:hover img,.li:hover img{transform:scale(1.05)}
.feat h3{font-size:32px;margin:14px 0}.feat p{color:var(--mute);max-width:52ch}
time{color:var(--clay)}
.li{display:grid;grid-template-columns:150px 1fr auto;gap:24px;align-items:center;padding:22px 0;border-bottom:1px solid var(--line)}
.li:first-child{border-top:1px solid var(--line)}
.li .ph{aspect-ratio:4/3;border-radius:4px;overflow:hidden}
.li h3{font-size:20px;margin:8px 0 6px;transition:color .25s}.li:hover h3{color:var(--clay)}
.li p{color:var(--mute);font-size:14px;display:-webkit-box;-webkit-line-clamp:2;-webkit-box-orient:vertical;overflow:hidden}
.li .ar{width:44px;height:44px;border-radius:50%;border:1px solid var(--line);display:grid;place-items:center;transition:.3s}.li:hover .ar{background:var(--ink);color:var(--paper);border-color:var(--ink)}

/* подвал */
footer{background:var(--ink);color:#cfcabd;padding:88px 0 0;font-size:14px}
.ft-top{display:flex;justify-content:space-between;align-items:flex-end;gap:32px;flex-wrap:wrap;padding-bottom:48px;margin-bottom:56px;border-bottom:1px solid rgba(255,255,255,.12)}
.ft-top h2{font-size:clamp(28px,3.200vw,46px);color:var(--paper);max-width:16em}
.ft-top .btn{background:var(--paper);color:var(--ink);border-color:var(--paper)}.ft-top .btn:hover{background:var(--clay);border-color:var(--clay);color:#fff}
.ft{display:grid;grid-template-columns:1.500fr 1fr 1.300fr 1.100fr;gap:48px}
.ft .flogo{height:28px;width:auto;margin-bottom:24px;filter:brightness(0) invert(1);opacity:.92}
.ft p{margin-bottom:12px;color:#a6a193}
.ft h4{color:var(--paper);margin-bottom:24px}
.ft li{margin-bottom:10px}.ft li a{color:#a6a193;transition:color .2s}.ft li a:hover{color:#fff}
.ft .two{columns:2;column-gap:24px}
.soc{display:flex;gap:10px;margin-bottom:20px}.soc a{width:40px;height:40px;border-radius:50%;border:1px solid rgba(255,255,255,.25);display:grid;place-items:center;transition:.25s}.soc a:hover{background:var(--paper);color:var(--ink)}
.fbot{margin-top:60px;border-top:1px solid rgba(255,255,255,.12);padding:22px 0 84px}
.fbot .wrap{display:flex;justify-content:space-between;align-items:center;gap:24px;flex-wrap:wrap}
.pay{display:flex;gap:18px;align-items:center;flex-wrap:wrap}.pay .strip{max-width:100%;object-fit:contain}.pay img{height:26px;width:auto}.pay .strip{height:20px;opacity:.85}
.dev{display:flex;gap:12px;align-items:center;color:#a6a193;font-size:13px}.dev img{height:22px}

.rv{opacity:0;transform:translateY(28px);transition:opacity 1s var(--e),transform 1s var(--e)}.rv.in{opacity:1;transform:none}
.cat.rv:nth-child(even){transform:translateY(76px)}.cat.rv.in:nth-child(even){transform:translateY(48px)}

@media(max-width:1100px){.pgrid{grid-template-columns:repeat(3,minmax(0,1fr))}.blist a{width:calc((100% - 56px)/5)}.ft{grid-template-columns:1fr 1fr}.h1r .c span,.tools .acc span{display:none}}
@media(max-width:860px){
 .wrap{padding:0 16px}section{padding:72px 0}
 .h1r{grid-template-columns:auto 1fr;min-height:62px}.h1r .c{display:none}
 .tools .burger{display:grid}.menu{display:none;flex-direction:column;gap:0;padding:4px 16px 16px;max-height:70vh;overflow:auto}.menu.open{display:flex}
 .menu>li>a{padding:14px 0}.sub,.sub-wide{position:static;opacity:1;visibility:visible;transform:none;box-shadow:none;border:0;background:none;padding:0 0 8px 12px;min-width:0;columns:1}
 .hero .wrap{grid-template-columns:1fr;gap:40px;padding-top:32px;padding-bottom:56px}.plate{order:-1;width:100%}.plate .arch{aspect-ratio:1/1}.plate .tag{left:12px;bottom:12px}
 .hero h1{margin-bottom:24px}.hero .lead{margin-bottom:32px}.ledger{grid-template-columns:1fr;margin-top:40px}.ledger div+div{border-left:0;padding-left:0;border-top:1px solid var(--line);margin-top:16px}
 .state{grid-template-columns:1fr 1fr;min-height:0}.state .t{grid-column:1/-1;order:-1}.state .ph{min-height:0;aspect-ratio:1/1}
 .sh{grid-template-columns:auto 1fr;margin-bottom:32px}.sh .link{grid-column:1/-1}
 .blist{gap:10px}.blist a{width:calc((100% - 20px)/3)}.tools .opt{display:none}.tools{gap:16px}.cats{grid-template-columns:repeat(2,minmax(0,1fr));gap:32px 14px}.cat:nth-child(even),.cat.rv.in:nth-child(even){transform:translateY(28px)}.cats-pad{padding-bottom:100px}.cat h3{font-size:18px}
 .pgrid{grid-template-columns:repeat(2,minmax(0,1fr))}.prod{padding:14px}.prod .ft{flex-direction:column;align-items:flex-start}
 .duo,.blog{grid-template-columns:1fr;gap:24px}.ban{min-height:340px}.ban div{padding:24px}
 .li{grid-template-columns:96px 1fr}.li .ar{display:none}.feat h3{font-size:26px}
 .ft{grid-template-columns:1fr;gap:36px}
}
@media(prefers-reduced-motion:reduce){*{animation:none!important;transition:none!important}.rv{opacity:1;transform:none}}
</style>
</head>
<body>

<div class="ann"><b>${esc(s3.title)}</b> · ${esc(s3.text)}<a href="${s3.href}">${s3.cta}</a></div>

<header class="hdr">
  <div class="wrap h1r">
    <div class="c"><a href="tel:${SC.phone}">${icon.phone}<span>${SC.phone}</span></a><a href="mailto:${SC.email}">${icon.mail}<span>${SC.email}</span></a></div>
    <a class="logo" href="${SC.site}"><img src="${SC.logo}" alt="skincare.by" width="402" height="78"></a>
    <div class="tools">
      <a class="acc opt" href="${SC.account}">${icon.user}<span>Личный кабинет</span></a>
      <a class="opt" href="${SC.instagram}" aria-label="Instagram">${icon.ig}</a>
      <a class="opt" href="${SC.telegram}" aria-label="Telegram">${icon.tg}</a>
      <button aria-label="Поиск">${icon.search}</button>
      <a href="${SC.wishlist}" aria-label="Избранное">${icon.heart}<i class="n">0</i></a>
      <a href="${SC.cart}" aria-label="Корзина">${icon.bag}<i class="n">0</i></a>
      <button class="burger" aria-label="Меню" data-menu>${icon.menu}</button>
    </div>
  </div>
  <ul class="menu wrap" id="menu">${navHtml()}</ul>
</header>

<div class="hero"><div class="wrap">
  <div>
    <span class="eyebrow caps">Ирина · практикующий косметик-эстетист</span>
    <h1>Добро пожаловать в мир <em>осознанного ухода</em> за кожей!</h1>
    <p class="lead">${esc(s1.text)}</p>
    <div class="ctas"><a class="btn" href="${s1.href}">${s1.cta}${icon.arrow}</a><a class="btn line" href="${s2.href}">${s2.cta}</a></div>
    <div class="ledger">
      <div><span class="caps">Консультация</span><b>онлайн, оффлайн</b></div>
      <div><span class="caps">Бесплатно</span><b>при покупке от 250 BYN</b></div>
      <div><span class="caps">В каталоге</span><b>${SC.brands.length} профессиональных брендов</b></div>
    </div>
  </div>
  <div class="plate">
    <div class="arch"><img src="${s1.img}" alt="Ирина, косметик-эстетист" fetchpriority="high"></div>
    <a class="tag" href="${s3.href}"><span class="caps">${esc(s3.text)}</span><b>${esc(s3.title)}</b></a>
  </div>
</div></div>

<div class="state">
  <div class="ph"><img src="${s2.img}" alt="" loading="lazy"></div>
  <div class="t rv"><h2>Ваша кожа заслуживает <em>лучшего ухода.</em><br>Выберите его.</h2><a class="btn" href="${s2.href}">${s2.cta}${icon.arrow}</a></div>
  <div class="ph"><img src="${s3.img}" alt="" loading="lazy"></div>
</div>

<section><div class="wrap">
  ${head('01', 'Сотрудничаю с брендами')}
  <div class="blist rv">
    ${SC.brands.map(b => `<a href="${b.href}"><img style="${b.pos}" src="${b.img}" alt="${esc(b.t)}" loading="lazy"></a>`).join('')}
  </div>
</div></section>

<section class="cats-pad" style="padding-top:0"><div class="wrap">
  ${head('02', 'Категории', `<a class="link caps" href="${SC.site}katalog/">Весь каталог ${icon.arrow}</a>`)}
  <div class="cats">
${SC.cats.map((c, i) => `    <a class="cat rv" href="${c.href}"><div class="ph"><img src="${c.img}" alt="${esc(c.t)}" loading="lazy"></div><div class="row"><h3>${c.t}</h3><span class="k">0${i + 1}</span></div>${c.d ? `<p>${c.d}</p>` : ''}</a>`).join('\n')}
  </div>
</div></section>

<section class="paper"><div class="wrap">
  ${head('03', 'Новинки', `<a class="link caps" href="${SC.site}katalog/">Каталог ${icon.arrow}</a>`)}
  <div class="pgrid rv">
${SC.products.map(p => `    <article class="prod"><a class="ph" href="${p.href}"><img src="${p.img}" alt="${esc(p.t)}" loading="lazy"></a><h3><a href="${p.href}">${esc(p.t)}</a></h3><div class="ft"><span class="pr${p.buy ? '' : ' ask'}">${p.price}</span><a class="go${p.buy ? ' buy' : ''}" href="${p.href}">${p.buy ? 'В корзину' : 'Подробнее'}</a></div></article>`).join('\n')}
  </div>
</div></section>

<section><div class="wrap duo">
${SC.banners.map(b => `  <a class="ban rv" href="${b.href}"><img src="${b.img}" alt="" loading="lazy"><div><h3>${b.t}</h3><span class="btn">${b.cta}${icon.arrow}</span></div></a>`).join('\n')}
</div></section>

<section style="padding-top:0"><div class="wrap">
  ${head('04', 'Полезные статьи', `<a class="link caps" href="${SC.site}blog/">Блог ${icon.arrow}</a>`)}
  <div class="blog">
    <a class="feat rv" href="${feat.href}"><div class="ph"><img src="${feat.img}" alt="" loading="lazy"></div><time class="caps">${feat.date}</time><h3>${esc(feat.t)}</h3><p>${esc(feat.ex)}</p></a>
    <div class="rv">
${rest.map(p => `      <a class="li" href="${p.href}"><div class="ph"><img src="${p.img}" alt="" loading="lazy"></div><div><time class="caps">${p.date}</time><h3>${esc(p.t)}</h3><p>${esc(p.ex)}</p></div><span class="ar">${icon.arrow}</span></a>`).join('\n')}
    </div>
  </div>
</div></section>

<footer>
  <div class="wrap">
    <div class="ft-top"><h2>${SC.banners[0].t}</h2><a class="btn" href="${SC.telegram}">${s1.cta}${icon.arrow}</a></div>
    <div class="ft">
      <div><img class="flogo" src="${SC.logo}" alt="skincare.by">${SC.footer.legal.map(l => `<p>${l}</p>`).join('')}</div>
      <div><h4 class="caps">Главная</h4><ul>${SC.footer.main.map(l => `<li><a href="${l.href}">${l.t}</a></li>`).join('')}</ul></div>
      <div><h4 class="caps">Каталог</h4><ul class="two">${SC.nav[1].sub.slice(0, 13).map(l => `<li><a href="${l.href}">${l.t}</a></li>`).join('')}</ul></div>
      <div><h4 class="caps">Контакты</h4>
        <div class="soc"><a href="${SC.instagram}" aria-label="Instagram">${icon.ig}</a><a href="${SC.telegram}" aria-label="Telegram">${icon.tg}</a></div>
        <ul><li><a href="tel:${SC.phone}">${SC.phone}</a></li><li><a href="mailto:${SC.email}">${SC.email}</a></li><li>${SC.address}</li></ul>
      </div>
    </div>
  </div>
  <div class="fbot"><div class="wrap">
    <div class="pay"><img src="${SC.footer.pay[0]}" alt="Хуткi Грош"><img src="${SC.footer.pay[1]}" alt="ЕРИП"><img class="strip" src="${SC.footer.payStrip}" alt="Способы оплаты"></div>
    <div class="dev">${SC.footer.dev.t}<img src="${SC.footer.dev.img}" alt="Pirus"></div>
  </div></div>
</footer>

${switcher('v2.html')}
<script>
(function(){
  document.querySelector('[data-menu]').addEventListener('click',function(){document.getElementById('menu').classList.toggle('open')});
  var io=new IntersectionObserver(function(es){es.forEach(function(e){if(e.isIntersecting){e.target.classList.add('in');io.unobserve(e.target)}})},{threshold:.1});
  document.querySelectorAll('.rv').forEach(function(el,i){el.style.transitionDelay=(i%4)*80+'ms';io.observe(el)});
})();
</script>
</body>
</html>
`;
