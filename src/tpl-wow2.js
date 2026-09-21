/* WOW 2 «Шёлк» – первый экран тёмно-оливковый, за ним течёт живой атлас (градиент GetLayers «Charmeuse», курсор «расчёсывает» ткань).
   Дальше сайт белый. Механики другие, чем в первом WOW: занавес-лоадер, портрет в капсуле, фраза с картинками внутри строки,
   бренды сотами, категории гармошкой, новинки колонками с разной скоростью, карточки-стопка, лента статей, которую тянут мышью.
   Весь контент – тот же, что на живом сайте */
const { SC, icon, esc, switcher } = require('./data');

const [s1, s2, s3] = SC.slides;
const navHtml = () => SC.nav.map(n => n.sub
  ? `<li class="has-sub"><a href="${n.href}">${n.t}<i></i></a><ul class="sub${n.sub.length > 8 ? ' sub-wide' : ''}">${n.sub.map(s => `<li><a href="${s.href}">${s.t}</a></li>`).join('')}</ul></li>`
  : `<li><a href="${n.href}">${n.t}</a></li>`).join('');
const words = t => t.split(' ').map(w => `<span class="w">${w}</span>`).join(' ');
const cap = (src, cls = '') => `<span class="cap${cls}"><img src="${src}" alt="" loading="lazy"></span>`;
const prodCard = p => `<article class="pc"><a class="ph" href="${p.href}" data-cur><img src="${p.img}" alt="${esc(p.t)}" loading="lazy"></a><h3><a href="${p.href}">${esc(p.t)}</a></h3><div class="pf"><span class="pr${p.buy ? '' : ' ask'}">${p.price}</span><a class="go" href="${p.href}">${p.buy ? icon.bag : icon.arrow}<span>${p.buy ? 'В корзину' : 'Подробнее'}</span></a></div></article>`;
const telNice = SC.phone.replace(/^(\+375)(\d{2})(\d{3})(\d{2})(\d{2})$/, '$1 $2 $3-$4-$5');
const cols = [0, 1, 2, 3, 4].map(j => [SC.products[j], SC.products[j + 5]]);

module.exports = () => `<!doctype html>
<html lang="ru">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>skincare.by – вариант WOW 2 «Шёлк»</title>
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Forum&family=Jost:wght@300;400;500&display=swap" rel="stylesheet">
<style>
:root{--deep:#1f261c;--olive:#4f5e48;--sage:#dfe5d0;--mist:#f4f5f0;--ink:#1d211a;--mute:#6b6f62;--gold:#c9a673;--line:rgba(29,33,26,.14);--e:cubic-bezier(.16,1,.3,1);--pad:clamp(16px,3.400vw,52px)}
*{box-sizing:border-box;margin:0}
html{background:#fff}
body{background:#fff;color:var(--ink);font:400 16px/1.650 Jost,system-ui,sans-serif;-webkit-font-smoothing:antialiased;overflow-x:clip}
body.lock{overflow:hidden}
img{display:block;max-width:100%}a{color:inherit;text-decoration:none}ul{list-style:none;padding:0}button{font:inherit;color:inherit}
h1,h2,h3,.serif{font-family:Forum,Georgia,serif;font-weight:400;line-height:1.060;letter-spacing:-.005em}
.caps{font:500 11.500px/1 Jost,sans-serif;letter-spacing:.22em;text-transform:uppercase}
.px{padding-inline:var(--pad)}
.btn{position:relative;display:inline-flex;align-items:center;gap:12px;padding:19px 32px;border-radius:999px;background:var(--ink);color:#fff;font:500 12px/1 Jost;letter-spacing:.16em;text-transform:uppercase;overflow:hidden;isolation:isolate;transition:color .45s var(--e);will-change:transform}
.btn::before{content:"";position:absolute;left:50%;top:50%;z-index:-1;width:130%;aspect-ratio:1;border-radius:50%;background:var(--gold);transform:translate(-50%,-50%) scale(0);transition:transform .7s var(--e)}
.btn:hover{color:var(--ink)}.btn:hover::before{transform:translate(-50%,-50%) scale(1)}
.btn.light{background:#fff;color:var(--ink)}
.btn.line{background:transparent;box-shadow:0 0 0 1px rgba(255,255,255,.55) inset;color:#fff}.btn.line:hover{color:var(--ink)}
.btn svg{transition:transform .45s var(--e)}.btn:hover svg{transform:translateX(5px)}

/* лоадер: две половины занавеса разъезжаются в стороны */
.lo{position:fixed;inset:0;z-index:10000;display:grid;place-items:center;pointer-events:none}
.lo i{position:absolute;top:0;bottom:0;width:50.5%;background:var(--deep);transition:transform 1.250s cubic-bezier(.76,0,.24,1)}
.lo i:first-child{left:0}.lo i:nth-child(2){right:0}
.lo .m{position:relative;display:flex;color:var(--sage);font:400 clamp(34px,5.400vw,84px)/1 Forum,serif;letter-spacing:.08em;text-transform:uppercase;transition:opacity .5s,letter-spacing 1.200s var(--e)}
.lo .m b{font-weight:400;opacity:0;transform:translateY(.4em);animation:ltr .9s var(--e) forwards;animation-delay:calc(var(--i)*55ms + 120ms)}
.lo .ln{position:absolute;left:50%;top:calc(50% + clamp(38px,4.600vw,70px));width:min(240px,50vw);height:1px;margin-left:calc(min(240px,50vw)/-2);background:rgba(223,229,208,.2)}
.lo .ln::after{content:"";position:absolute;inset:0;background:var(--gold);transform-origin:left;transform:scaleX(0);animation:fill 1.300s cubic-bezier(.65,0,.35,1) forwards}
.ready .lo i:first-child{transform:translateX(-101%)}.ready .lo i:nth-child(2){transform:translateX(101%)}
.ready .lo .m{opacity:0;letter-spacing:.4em}.ready .lo .ln{opacity:0;transition:opacity .3s}
@keyframes ltr{to{opacity:1;transform:none}}@keyframes fill{to{transform:scaleX(1)}}

/* курсор-кольцо */
.cur{position:fixed;left:0;top:0;z-index:9998;pointer-events:none;display:grid;place-items:center;width:30px;height:30px;margin:-15px 0 0 -15px;border-radius:50%;border:1.400px solid #fff;color:#fff;mix-blend-mode:difference;opacity:0;transition:width .45s var(--e),height .45s var(--e),margin .45s var(--e),border-color .3s,opacity .3s}
.cur::after{content:"";width:4px;height:4px;border-radius:50%;background:currentColor;transition:transform .45s var(--e),opacity .3s}
.cur.big{width:74px;height:74px;margin:-37px 0 0 -37px;border-color:rgba(255,255,255,.75)}
.cur.big::after{transform:scale(2.600);opacity:.22}
@media(hover:none),(pointer:coarse){.cur{display:none}}

/* шапка: на первом экране прозрачная и белая, дальше – белая плашка */
.hdr{position:fixed;inset:0 0 auto;z-index:60;padding:16px var(--pad);display:grid;grid-template-columns:1fr auto 1fr;align-items:center;gap:20px;color:#fff;transition:transform .6s var(--e),background .4s,color .4s,box-shadow .4s}
.hdr.hide{transform:translateY(-110%)}
.hdr.solid{background:rgba(255,255,255,.94);backdrop-filter:blur(14px);color:var(--ink);box-shadow:0 1px 0 var(--line)}
.logo img{height:28px;width:auto;filter:brightness(0) invert(1);transition:filter .4s}.solid .logo img{filter:none}
.menu{display:flex;gap:clamp(12px,2vw,30px)}
.menu>li{position:relative}
.menu>li>a{position:relative;display:inline-flex;align-items:center;gap:7px;padding:12px 0;font:500 12px/1 Jost;letter-spacing:.16em;text-transform:uppercase}
.menu>li>a::after{content:"";position:absolute;left:0;right:0;bottom:6px;height:1px;background:currentColor;transform:scaleX(0);transform-origin:right;transition:transform .5s var(--e)}
.menu>li:hover>a::after{transform:none;transform-origin:left}
.menu i{width:5px;height:5px;border-right:1.5px solid;border-bottom:1.5px solid;transform:rotate(45deg) translateY(-2px)}
.sub{position:absolute;top:100%;left:50%;min-width:240px;padding:18px 26px;border-radius:18px;background:#fff;color:var(--ink);box-shadow:0 30px 70px rgba(20,30,15,.18),0 0 0 1px var(--line);opacity:0;visibility:hidden;transform:translate(-50%,10px);transition:.35s var(--e)}
.sub-wide{columns:2;column-gap:34px;min-width:540px}
.has-sub:hover .sub,.has-sub:focus-within .sub{opacity:1;visibility:visible;transform:translate(-50%,0)}
.sub a{display:block;padding:7px 0;font-size:15px;color:var(--mute);break-inside:avoid;transition:color .2s,transform .3s var(--e)}.sub a:hover{color:var(--ink);transform:translateX(4px)}
.tools{display:flex;gap:4px;justify-content:flex-end;align-items:center}
.tools a,.tools button{position:relative;width:42px;height:42px;border-radius:50%;border:0;background:none;cursor:pointer;display:grid;place-items:center;transition:background .3s,color .3s}
.tools a:hover,.tools button:hover{background:var(--gold);color:var(--ink)}
.tools b{position:absolute;top:1px;right:1px;min-width:16px;height:16px;border-radius:8px;background:var(--gold);color:var(--ink);font:500 10px/16px Jost;text-align:center}
.tools .burger{display:none}

/* первый экран */
.hero{position:relative;min-height:100svh;background:var(--deep);color:#fff;display:flex;flex-direction:column;justify-content:space-between;gap:32px;padding:104px var(--pad) 28px;overflow:hidden}
.hero iframe{position:absolute;inset:0;width:100%;height:100%;border:0;pointer-events:none;opacity:0;transition:opacity 1.800s ease .2s}.ready .hero iframe{opacity:1}
.hero::after{content:"";position:absolute;inset:0;background:linear-gradient(90deg,rgba(31,38,28,.72),rgba(31,38,28,.25) 55%,rgba(31,38,28,0) 75%),linear-gradient(0deg,rgba(31,38,28,.6),rgba(31,38,28,0) 30%);pointer-events:none}
.hero>*:not(iframe){position:relative;z-index:2}
.h-top{display:flex;justify-content:space-between;gap:12px 24px;flex-wrap:wrap;color:rgba(255,255,255,.78);font-size:14px}
.h-top .c{display:flex;gap:8px 22px;flex-wrap:wrap}.h-top a{display:inline-flex;gap:7px;align-items:center;transition:color .2s}.h-top a:hover{color:var(--gold)}
.h-top .who{color:var(--sage)}
.h-mid{display:grid;grid-template-columns:minmax(0,1fr) auto;gap:clamp(24px,4vw,72px);align-items:center}
.hero h1{font-size:clamp(30px,5.500vw,102px);text-transform:uppercase;letter-spacing:.01em;line-height:1.040}
.l{display:block;overflow:hidden;padding-bottom:.08em}
.l>span{display:block;transform:translateY(110%) rotate(3deg);transform-origin:0 100%;transition:transform 1.300s var(--e)}
.ready .l>span{transform:none}
.l:nth-child(2)>span{transition-delay:.12s;color:var(--gold)}.l:nth-child(3)>span{transition-delay:.24s}
.lead{max-width:50ch;margin-top:clamp(20px,2.400vw,36px);color:rgba(255,255,255,.86);font-size:clamp(15px,1.150vw,18px);font-weight:300}
.ctas{display:flex;gap:12px;flex-wrap:wrap;margin-top:clamp(22px,2.400vw,36px)}
/* портрет в капсуле: раскрывается снизу вверх, фото внутри чуть плывёт за курсором */
.lens{position:relative;width:min(25vw,390px);aspect-ratio:3/4.300;margin-right:clamp(0px,3vw,56px)}
.lens::before{content:"";position:absolute;inset:-16px;border-radius:999px;border:1px solid rgba(255,255,255,.4);opacity:0;scale:.92;transition:opacity 1.400s var(--e) .9s,scale 1.400s var(--e) .9s}
.ready .lens::before{opacity:1;scale:1}
.lens .in{width:100%;height:100%;border-radius:999px;overflow:hidden;clip-path:inset(100% 0 0 0 round 999px);transition:clip-path 1.600s var(--e) .35s}
.ready .lens .in{clip-path:inset(0 0 0 0 round 999px)}
.lens img{width:100%;height:100%;object-fit:cover;object-position:82% center;scale:1.16;will-change:transform}
.lens .tag{position:absolute;left:0;right:0;bottom:-13px;width:max-content;margin:0 auto;padding:9px 16px;border-radius:999px;background:#fff;color:var(--ink);white-space:nowrap}
.strip{display:grid;grid-template-columns:auto 1fr auto;gap:12px 28px;align-items:center;padding:16px 16px 16px 26px;border-radius:999px;background:rgba(255,255,255,.12);backdrop-filter:blur(16px);box-shadow:0 0 0 1px rgba(255,255,255,.22) inset}
.strip strong{font:400 clamp(18px,1.600vw,24px)/1.200 Forum,serif;display:flex;gap:12px;align-items:center}.strip strong::before{content:"✦";color:var(--gold)}
.strip span{color:rgba(255,255,255,.78);font-weight:300}
.strip a{display:inline-flex;gap:10px;align-items:center;padding:13px 22px;border-radius:999px;background:#fff;color:var(--ink);transition:background .3s}.strip a:hover{background:var(--gold)}
.fade{opacity:0;transform:translateY(20px);transition:opacity 1.100s var(--e),transform 1.100s var(--e)}
.ready .fade{opacity:1;transform:none}
.d1{transition-delay:.45s}.d2{transition-delay:.58s}.d3{transition-delay:.75s}.d4{transition-delay:.95s}

section{padding:clamp(72px,8.500vw,140px) 0}
.sh{display:flex;justify-content:space-between;align-items:flex-end;gap:24px;flex-wrap:wrap;margin-bottom:clamp(32px,4vw,64px)}
.sh h2{font-size:clamp(38px,5.200vw,92px);text-transform:uppercase}
.sh h2 em{font-style:normal;color:var(--olive)}
.sh .caps{display:inline-flex;gap:10px;align-items:center;color:var(--mute)}.sh a.caps:hover{color:var(--ink)}

/* фраза со вторым слайдом: картинки-капсулы вырастают прямо внутри строки, слова темнеют по скроллу */
.say{text-align:center;--p:0}
.say h2{font-size:clamp(32px,5.400vw,98px);line-height:1.140;max-width:16em;margin:0 auto clamp(30px,3vw,48px)}
.say .w{color:#c9ccc0;transition:color .6s}.say .w.on{color:var(--ink)}
.cap{display:inline-block;height:.760em;width:calc(var(--p)*1.950em);margin:0 calc(var(--p)*.1em);border-radius:999px;overflow:hidden;vertical-align:-.060em}
.cap img{width:100%;height:100%;object-fit:cover;filter:contrast(1.08) saturate(1.15)}
.cap.b img{object-position:50% 30%}

/* бренды: круглые соты по центру, знаки выровнены по оптическому центру (--k, --x, --y из data.js) */
.hive{--u:clamp(70px,7.600vw,112px);display:flex;flex-wrap:wrap;justify-content:center;gap:clamp(10px,1.300vw,20px);max-width:calc(var(--u)*1.450*7 + 20px*6 + 2px);margin:0 auto}
.hive a{position:relative;width:calc(var(--u)*1.450);aspect-ratio:1;border-radius:50%;overflow:hidden;background:var(--mist);opacity:0;scale:.6;transition:opacity .9s var(--e),scale 1.100s var(--e),background .4s,box-shadow .5s;transition-delay:calc(var(--i)*55ms),calc(var(--i)*55ms),0s,0s}
.hive.in a{opacity:1;scale:1}
.hive.in a:hover{scale:1.100;background:#fff;box-shadow:0 0 0 1px var(--line),0 26px 50px -22px rgba(30,40,20,.4);transition-delay:0s}
.hive img{position:absolute;left:50%;top:50%;transform:translate(var(--x),var(--y));width:calc(var(--u)*var(--k));max-width:none;aspect-ratio:1;object-fit:contain;mix-blend-mode:multiply}

/* категории: гармошка – активная панель раскрывается, у остальных название стоит вертикально */
.acc{display:flex;gap:10px;height:min(72vh,640px)}
.ap{position:relative;flex:1 1 0;min-width:0;border-radius:26px;overflow:hidden;color:#fff;transition:flex-grow .9s var(--e)}
.ap.on{flex-grow:4.400}
.ap img{position:absolute;inset:0;width:100%;height:100%;object-fit:cover;scale:1.08;transition:scale 1.400s var(--e),filter .8s}
.ap:not(.on) img{filter:saturate(.75) brightness(.82)}
.ap.on img{scale:1}
.ap::after{content:"";position:absolute;inset:0;background:linear-gradient(0deg,rgba(20,26,18,.78),rgba(20,26,18,.05) 55%)}
.ap .n{position:absolute;left:22px;top:20px;z-index:2;font:400 20px/1 Forum,serif;color:var(--sage)}
.ap .ar{position:absolute;right:18px;top:16px;z-index:2;width:48px;height:48px;border-radius:50%;background:#fff;color:var(--ink);display:grid;place-items:center;opacity:0;scale:.5;rotate:-45deg;transition:.6s var(--e)}
.ap.on .ar{opacity:1;scale:1}
.ai{position:absolute;left:22px;right:22px;bottom:22px;z-index:2}
.ai h3{font-size:clamp(22px,2.100vw,32px);white-space:nowrap;transform-origin:0 100%;transform:translateX(1.050em) rotate(-90deg);transition:transform .9s var(--e)}
.ap.on h3{transform:none}
.ai p{max-height:0;opacity:0;overflow:hidden;color:rgba(255,255,255,.82);font-weight:300;max-width:40ch;transition:max-height .7s var(--e),opacity .5s,margin .7s var(--e)}
.ap.on .ai p:not(:empty){max-height:90px;opacity:1;margin-top:8px;transition-delay:.15s}

/* новинки: пять колонок, чётные стоят ниже и догоняют остальные при прокрутке */
.new{background:var(--mist);border-radius:clamp(24px,4vw,56px);margin:0 clamp(0px,1vw,14px)}
.pcols{display:grid;grid-template-columns:repeat(5,minmax(0,1fr));gap:18px;align-items:start;margin-bottom:-70px}
.pcol{display:grid;gap:18px;will-change:transform}
.pcol:nth-child(even){margin-top:90px}
.pc{display:flex;flex-direction:column;background:#fff;border-radius:24px;padding:12px;transition:transform .7s var(--e),box-shadow .7s}
.pc:hover{transform:translateY(-8px);box-shadow:0 36px 60px -30px rgba(30,40,20,.35)}
.pc .ph{aspect-ratio:1;border-radius:16px;display:grid;place-items:center;padding:18px;overflow:hidden}
.pc img{max-height:100%;object-fit:contain;mix-blend-mode:multiply;transition:transform 1s var(--e)}
.pc:hover img{transform:scale(1.1)}
.pc h3{font:400 15px/1.450 Jost,sans-serif;letter-spacing:0;margin:12px 8px 0;display:-webkit-box;-webkit-line-clamp:3;-webkit-box-orient:vertical;overflow:hidden;min-height:65px}
.pf{display:flex;justify-content:space-between;align-items:center;gap:8px;margin:auto 4px 4px 8px;padding-top:14px}
.pr{font:400 25px/1 Forum,serif;white-space:nowrap}.pr.ask{font:400 13.500px/1.200 Jost;color:var(--mute);white-space:normal}
.go{display:inline-flex;align-items:center;height:44px;padding:0 12px;border-radius:999px;background:var(--ink);color:#fff;font:500 11px/1 Jost;letter-spacing:.12em;text-transform:uppercase;white-space:nowrap;transition:background .3s,color .3s}
.go span{max-width:0;overflow:hidden;transition:max-width .6s var(--e),margin .6s var(--e)}
.pc:hover .go span{max-width:96px;margin-left:8px}
.go:hover{background:var(--gold);color:var(--ink)}
@media(hover:none){.go span{max-width:96px;margin-left:8px}}

/* консультация и подбор: карточки-стопка, вторая наезжает на первую */
.stack{display:grid;gap:24px}
.sc{position:sticky;top:88px;display:grid;grid-template-columns:1fr 1fr;height:min(74vh,620px);border-radius:clamp(24px,3vw,44px);overflow:hidden;transform-origin:50% 0;will-change:transform}
.sc:nth-child(1){background:var(--deep);color:#fff}
.sc:nth-child(2){background:var(--sage);top:112px}.sc:nth-child(2) .im{order:-1}
.sc .tx{display:flex;flex-direction:column;justify-content:space-between;align-items:flex-start;gap:28px;padding:clamp(24px,3.600vw,60px)}
.sc h3{font-size:clamp(32px,4.200vw,74px);text-transform:uppercase;max-width:9em}
.sc .caps{opacity:.7}
.sc .im{overflow:hidden}.sc .im img{width:100%;height:100%;object-fit:cover;filter:contrast(1.18) saturate(1.25) brightness(.9);transition:transform 1.600s var(--e)}.sc:hover .im img{transform:scale(1.05)}

/* статьи: лента, которую можно тянуть мышью */
.jr{display:flex;gap:22px;overflow-x:auto;padding:0 var(--pad) 8px;scrollbar-width:none;cursor:grab}
.jr::-webkit-scrollbar{display:none}
.jr.drag{cursor:grabbing}.jr.drag a{pointer-events:none}
.jp{flex:none;width:clamp(270px,27vw,410px);user-select:none}
.jp:nth-child(even){margin-top:56px}
.jp .ph{aspect-ratio:4/5;border-radius:22px;overflow:hidden}.jp:nth-child(even) .ph{aspect-ratio:1}
.jp img{width:100%;height:100%;object-fit:cover;transition:transform 1.400s var(--e);-webkit-user-drag:none}
.jp:hover img{transform:scale(1.06)}
.jp time{display:block;margin:18px 0 8px;color:var(--olive)}
.jp h3{font-size:clamp(22px,1.900vw,30px);margin-bottom:8px}
.jp p{color:var(--mute);font-weight:300;display:-webkit-box;-webkit-line-clamp:3;-webkit-box-orient:vertical;overflow:hidden}
.nav2{display:flex;gap:8px}.nav2 button{width:52px;height:52px;border-radius:50%;border:1px solid var(--line);background:none;cursor:pointer;display:grid;place-items:center;transition:.3s}.nav2 button:hover{background:var(--ink);border-color:var(--ink);color:#fff}
@media(hover:none){.jr{scroll-snap-type:x mandatory}.jp{scroll-snap-align:center}}

/* подвал */
footer{background:var(--deep);color:#c6ccb9;border-radius:clamp(24px,4vw,56px) clamp(24px,4vw,56px) 0 0;padding:clamp(48px,5.500vw,88px) 0 84px;font-size:15px;font-weight:300}
.ftop{display:grid;grid-template-columns:minmax(0,1fr) auto;gap:32px;align-items:end;padding-bottom:clamp(36px,4vw,64px);margin-bottom:clamp(36px,4vw,64px);border-bottom:1px solid rgba(223,229,208,.16)}
.ftop .caps{color:var(--gold);display:block;margin-bottom:18px}
.tel{display:inline-block;font:400 clamp(38px,8vw,148px)/1 Forum,serif;color:#fff;letter-spacing:.01em;transition:color .4s}.tel:hover{color:var(--gold)}
.ftop ul{display:grid;gap:8px;justify-items:end;text-align:right}.ftop li a:hover{color:#fff}
.soc{display:flex;gap:10px;margin-bottom:10px}.soc a{width:48px;height:48px;border-radius:50%;border:1px solid rgba(223,229,208,.28);display:grid;place-items:center;color:#fff;transition:.35s var(--e)}.soc a:hover{background:var(--gold);border-color:var(--gold);color:var(--ink);transform:translateY(-4px)}
.fg{display:grid;grid-template-columns:1.500fr 1fr 1.500fr;gap:48px}
.fg p{margin-bottom:10px}
.fg h4{color:#fff;margin-bottom:22px}
.fg li{margin-bottom:9px}.fg li a{transition:color .2s}.fg li a:hover{color:var(--gold)}
.fg .two{columns:2;column-gap:24px}
.fbot{display:flex;justify-content:space-between;align-items:center;gap:24px;flex-wrap:wrap;margin-top:48px;padding-top:22px;border-top:1px solid rgba(223,229,208,.16)}
.pay{display:flex;gap:18px;align-items:center;flex-wrap:wrap}.pay img{height:26px;width:auto}.pay .strip2{height:20px;max-width:100%;object-fit:contain;opacity:.85}
.dev{display:flex;gap:12px;align-items:center;font-size:14px}.dev img{height:22px}

.rv{opacity:0;transform:translateY(40px);transition:opacity 1.200s var(--e),transform 1.200s var(--e)}.rv.in{opacity:1;transform:none}

@media(max-width:1180px){.menu{gap:14px}.menu>li>a{letter-spacing:.08em}.pcols{grid-template-columns:repeat(4,minmax(0,1fr))}.pcol:nth-child(5){display:contents}}
@media(max-width:1180px) and (min-width:861px){.pcol:nth-child(5) .pc{grid-column:span 2}}
@media(max-width:860px){
 .hdr{grid-template-columns:auto 1fr}.tools .burger{display:grid}.tools .opt{display:none}
 .menu{display:none;position:absolute;top:100%;left:var(--pad);right:var(--pad);flex-direction:column;gap:0;border-radius:22px;padding:10px 20px;max-height:72vh;overflow:auto;background:#fff;color:var(--ink);box-shadow:0 30px 70px rgba(20,30,15,.25)}
 .menu.open{display:flex}.menu>li>a{padding:14px 0}.menu>li>a::after{display:none}
 .sub,.sub-wide{position:static;opacity:1;visibility:visible;transform:none;box-shadow:none;padding:0 0 8px 14px;min-width:0;columns:1}
 .hero{padding-top:88px}.hero::after{background:linear-gradient(0deg,rgba(31,38,28,.7),rgba(31,38,28,.35))}
 .h-mid{grid-template-columns:1fr}.lens{width:min(62vw,300px);margin:8px auto 22px;order:2}
 .strip{grid-template-columns:1fr;border-radius:26px;padding:20px;justify-items:start}
 .acc{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));height:auto}.ap,.ap.on{aspect-ratio:3/4;flex:none}.ap img,.ap:not(.on) img{filter:none;scale:1}
 .ai{left:14px;right:14px;bottom:14px}.ai h3{transform:none;white-space:normal;font-size:20px}.ai p,.ap .ar{display:none}.ap .n{left:14px;top:12px}
 .new{margin:0}.pcols{grid-template-columns:repeat(2,minmax(0,1fr));gap:10px;margin-bottom:0}.pcol{display:contents}.pcol:nth-child(even){margin-top:0}
 .pc{padding:8px;border-radius:18px}.pc .ph{padding:10px}.pf{flex-direction:column;align-items:flex-start;margin:auto 4px 4px}.pr{font-size:22px}.go{height:40px}
 .sc{position:static;grid-template-columns:1fr;height:auto;transform:none!important}.sc .im{order:-1;aspect-ratio:4/3}.sc .tx{gap:22px}
 .jp{width:74vw}.jp:nth-child(even){margin-top:0}.jp .ph,.jp:nth-child(even) .ph{aspect-ratio:4/3}.nav2{display:none}
 .ftop{grid-template-columns:1fr}.ftop ul{justify-items:start;text-align:left}.fg{grid-template-columns:1fr;gap:34px}
}
@media(prefers-reduced-motion:reduce){*{animation:none!important;transition:none!important}.rv,.fade,.l>span,.hive a{opacity:1!important;transform:none!important;scale:1!important}.lens .in{clip-path:none}.lo{display:none}.say{--p:1!important}.say .w{color:var(--ink)}.hero iframe{opacity:1}.pcol:nth-child(even){margin-top:0}}
</style>
</head>
<body class="lock">

<div class="lo" aria-hidden="true"><i></i><i></i><div class="m">${'skincare.by'.split('').map((c, i) => `<b style="--i:${i}">${c}</b>`).join('')}</div><span class="ln"></span></div>
<div class="cur" id="cur"></div>

<header class="hdr" id="hdr">
  <a class="logo" href="${SC.site}"><img src="${SC.logo}" alt="skincare.by" width="402" height="78"></a>
  <ul class="menu" id="menu">${navHtml()}</ul>
  <div class="tools">
    <a class="opt" href="${SC.account}" aria-label="Личный кабинет">${icon.user}</a>
    <button aria-label="Поиск">${icon.search}</button>
    <a href="${SC.wishlist}" aria-label="Избранное">${icon.heart}<b>0</b></a>
    <a href="${SC.cart}" aria-label="Корзина">${icon.bag}<b>0</b></a>
    <button class="burger" aria-label="Меню" data-menu>${icon.menu}</button>
  </div>
</header>

<div class="hero" id="hero">
  <iframe src="assets/charmeuse.html" title="" aria-hidden="true" tabindex="-1" id="fx"></iframe>
  <div class="h-top fade">
    <span class="who caps">Ирина · практикующий косметик-эстетист</span>
    <div class="c"><a href="tel:${SC.phone}">${icon.phone}${SC.phone}</a><a href="mailto:${SC.email}">${icon.mail}${SC.email}</a><a href="${SC.instagram}">${icon.ig}Instagram</a><a href="${SC.telegram}">${icon.tg}Telegram</a></div>
  </div>
  <div class="h-mid">
    <div>
      <h1><span class="l"><span>Добро пожаловать</span></span><span class="l"><span>в мир осознанного</span></span><span class="l"><span>ухода за кожей!</span></span></h1>
      <p class="lead fade d1">${esc(s1.text)}</p>
      <div class="ctas fade d2"><a class="btn light" href="${s1.href}" data-cur data-mag>${s1.cta}${icon.arrow}</a><a class="btn line" href="${s2.href}" data-cur data-mag>${s2.cta}</a></div>
    </div>
    <div class="lens" id="lens"><div class="in"><img id="lensImg" src="${s1.img}" alt="Ирина, косметик-эстетист" fetchpriority="high"></div><span class="tag caps fade d4">Витебск · онлайн и оффлайн</span></div>
  </div>
  <div class="strip fade d3"><strong>${esc(s3.title)}</strong><span>${esc(s3.text)}</span><a class="caps" href="${s3.href}" data-cur>${s3.cta}${icon.arrow}</a></div>
</div>

<section class="say px" id="say">
  <h2>${words('Ваша кожа')} ${cap(SC.cats[1].img)} ${words('заслуживает лучшего ухода.')} ${cap(SC.cats[0].img, ' b')} ${words('Выберите его.')}</h2>
  <a class="btn" href="${s2.href}" data-cur data-mag>${s2.cta}${icon.arrow}</a>
</section>

<section style="padding-top:0"><div class="px">
  <div class="sh rv"><h2>Сотрудничаю <em>с брендами</em></h2><span class="caps">${SC.brands.length} брендов</span></div>
  <div class="hive rv">
${SC.brands.map((b, i) => `    <a href="${b.href}" style="--i:${i}" data-cur><img style="${b.pos}" src="${b.img}" alt="${esc(b.t)}" loading="lazy"></a>`).join('\n')}
  </div>
</div></section>

<section style="padding-top:0"><div class="px">
  <div class="sh rv"><h2>Категории</h2><span class="caps">${SC.cats.length} направлений ухода</span></div>
  <div class="acc rv" id="acc">
${SC.cats.map((c, i) => `    <a class="ap${i === 0 ? ' on' : ''}" href="${c.href}" data-cur><img src="${c.img}" alt="" loading="lazy"><span class="n">0${i + 1}</span><span class="ar">${icon.arrow}</span><div class="ai"><h3>${c.t}</h3><p>${c.d}</p></div></a>`).join('\n')}
  </div>
</div></section>

<section class="new" id="new"><div class="px">
  <div class="sh rv"><h2>Новинки</h2><a class="caps" href="${SC.site}katalog/">Весь каталог ${icon.arrow}</a></div>
  <div class="pcols">
${cols.map(c => `    <div class="pcol">${c.map(prodCard).join('')}</div>`).join('\n')}
  </div>
</div></section>

<section><div class="px stack" id="stack">
${SC.banners.map((b, i) => `  <a class="sc" href="${b.href}" data-cur><div class="tx"><span class="caps">0${i + 1} / 0${SC.banners.length}</span><h3>${b.t}</h3><span class="btn${i ? '' : ' light'}">${b.cta}${icon.arrow}</span></div><div class="im"><img src="${b.img}" alt="" loading="lazy"></div></a>`).join('\n')}
</div></section>

<section style="padding-top:0">
  <div class="sh px rv"><h2>Полезные <em>статьи</em></h2><div class="nav2"><button aria-label="Назад" data-jr="-1">${icon.back}</button><button aria-label="Вперёд" data-jr="1">${icon.arrow}</button></div></div>
  <div class="jr rv" id="jr">
${SC.posts.map(p => `    <a class="jp" href="${p.href}" draggable="false"><div class="ph"><img src="${p.img}" alt="" loading="lazy" draggable="false"></div><time class="caps">${p.date}</time><h3>${esc(p.t)}</h3><p>${esc(p.ex)}</p></a>`).join('\n')}
  </div>
</section>

<footer><div class="px">
  <div class="ftop">
    <div><span class="caps">Контакты</span><a class="tel" href="tel:${SC.phone}" data-cur>${telNice}</a></div>
    <ul><li class="soc"><a href="${SC.instagram}" aria-label="Instagram">${icon.ig}</a><a href="${SC.telegram}" aria-label="Telegram">${icon.tg}</a></li><li><a href="mailto:${SC.email}">${SC.email}</a></li><li>${SC.address}</li></ul>
  </div>
  <div class="fg">
    <div>${SC.footer.legal.map(l => `<p>${l}</p>`).join('')}</div>
    <div><h4 class="caps">Главная</h4><ul>${SC.footer.main.map(l => `<li><a href="${l.href}">${l.t}</a></li>`).join('')}</ul></div>
    <div><h4 class="caps">Каталог</h4><ul class="two">${SC.nav[1].sub.slice(0, 13).map(l => `<li><a href="${l.href}">${l.t}</a></li>`).join('')}</ul></div>
  </div>
  <div class="fbot">
    <div class="pay"><img src="${SC.footer.pay[0]}" alt="Хуткi Грош"><img src="${SC.footer.pay[1]}" alt="ЕРИП"><img class="strip2" src="${SC.footer.payStrip}" alt="Способы оплаты"></div>
    <div class="dev">${SC.footer.dev.t}<img src="${SC.footer.dev.img}" alt="Pirus"></div>
  </div>
</div></footer>

${switcher('wow2.html')}
<script>
(function(){
  var reduce=matchMedia('(prefers-reduced-motion: reduce)').matches, fine=matchMedia('(hover:hover) and (pointer:fine)').matches;
  var $=function(s){return document.querySelector(s)}, $$=function(s){return [].slice.call(document.querySelectorAll(s))};
  var clamp=function(v,a,b){return Math.min(b,Math.max(a,v))};

  /* лоадер: минимум 1.3 с, потолок 3 с; контент стартует вместе с раскрытием занавеса */
  var t0=performance.now(), done=false, fx=$('#fx');
  function open(){ if(done) return; done=true; var wait=Math.max(0,1300-(performance.now()-t0));
    setTimeout(function(){document.body.classList.add('ready'); setTimeout(function(){document.body.classList.remove('lock')},1100)},reduce?0:wait) }
  fx.addEventListener('load',open); setTimeout(open,3000);

  /* ткань лежит под контентом, поэтому движение мыши пробрасываем в iframe вручную */
  var hero=$('#hero');
  hero.addEventListener('pointermove',function(e){
    try{ var r=fx.getBoundingClientRect(), w=fx.contentWindow;
      w.dispatchEvent(new w.PointerEvent('pointermove',{clientX:e.clientX-r.left,clientY:e.clientY-r.top})) }catch(_){}
  },{passive:true});

  $('[data-menu]').addEventListener('click',function(){$('#menu').classList.toggle('open');hdr.classList.add('solid')});

  var io=new IntersectionObserver(function(es){es.forEach(function(e){if(e.isIntersecting){e.target.classList.add('in');io.unobserve(e.target)}})},{threshold:.08});
  $$('.rv').forEach(function(el){io.observe(el)});

  /* гармошка категорий: раскрыта та панель, на которую навели или перешли с клавиатуры */
  var aps=$$('.ap');
  aps.forEach(function(a){['pointerenter','focus'].forEach(function(ev){a.addEventListener(ev,function(){aps.forEach(function(b){b.classList.toggle('on',b===a)})})})});

  /* магнитные кнопки */
  if(fine&&!reduce) $$('[data-mag]').forEach(function(b){
    b.addEventListener('pointermove',function(e){var r=b.getBoundingClientRect();b.style.transform='translate('+((e.clientX-r.left-r.width/2)*.22)+'px,'+((e.clientY-r.top-r.height/2)*.3)+'px)'});
    b.addEventListener('pointerleave',function(){b.style.transition='transform .8s cubic-bezier(.16,1,.3,1),color .45s';b.style.transform='';setTimeout(function(){b.style.transition=''},800)});
  });

  /* лента статей: тянем мышью, стрелки листают на карточку */
  var jr=$('#jr'), down=false, moved=false, sx=0, sl=0;
  jr.addEventListener('pointerdown',function(e){if(e.pointerType!=='mouse')return;down=true;moved=false;sx=e.clientX;sl=jr.scrollLeft});
  addEventListener('pointermove',function(e){if(!down)return;var dx=e.clientX-sx;if(Math.abs(dx)>6){moved=true;jr.classList.add('drag')}if(moved)jr.scrollLeft=sl-dx});
  addEventListener('pointerup',function(){down=false;setTimeout(function(){jr.classList.remove('drag')},0)});
  jr.addEventListener('click',function(e){if(moved){e.preventDefault();moved=false}},true);
  jr.addEventListener('dragstart',function(e){e.preventDefault()});
  $$('[data-jr]').forEach(function(b){b.addEventListener('click',function(){jr.scrollBy({left:+b.dataset.jr*(jr.firstElementChild.offsetWidth+22),behavior:reduce?'auto':'smooth'})})});

  /* общий кадр: курсор, портрет, скролл-эффекты – один rAF, всё через lerp */
  var mx=innerWidth/2,my=innerHeight/2,cx=mx,cy=my,lx=0,ly=0,cur=$('#cur'),hdr=$('#hdr'),lensImg=$('#lensImg'),lens=$('#lens');
  var say=$('#say'),sayW=$$('#say .w'),pcols=$$('.pcol'),news=$('#new'),cards=$$('.sc'),lastY=0,sp=0;
  addEventListener('pointermove',function(e){mx=e.clientX;my=e.clientY;if(fine)cur.style.opacity=1},{passive:true});
  $$('[data-cur]').forEach(function(el){el.addEventListener('pointerenter',function(){cur.classList.add('big')});el.addEventListener('pointerleave',function(){cur.classList.remove('big')})});

  function frame(){
    var y=scrollY, vh=innerHeight, wide=innerWidth>860;
    cx+=(mx-cx)*.22; cy+=(my-cy)*.22; cur.style.transform='translate3d('+cx+'px,'+cy+'px,0)';
    if(!reduce){
      /* портрет: фото внутри капсулы плывёт за курсором, сама капсула уезжает медленнее страницы */
      lx+=((fine?(mx/innerWidth-.5)*-26:0)-lx)*.06; ly+=((fine?(my/vh-.5)*-20:0)-ly)*.06;
      lensImg.style.transform='translate3d('+lx+'px,'+ly+'px,0)';
      lens.style.transform=wide?'translate3d(0,'+(y*.14)+'px,0)':'';
    }
    /* фраза: капсулы-картинки вырастают, слова темнеют */
    var r=say.getBoundingClientRect(), t=clamp((vh*.92-r.top)/(vh*.62),0,1); sp+=(t-sp)*.12;
    say.style.setProperty('--p',reduce?1:sp.toFixed(3));
    var n=Math.round(clamp(sp*1.15,0,1)*sayW.length); sayW.forEach(function(w,i){w.classList.toggle('on',reduce||i<n)});
    /* новинки: чётные колонки догоняют остальные */
    if(wide&&!reduce){ var nr=news.getBoundingClientRect(), np=clamp((vh-nr.top)/(vh*.5+nr.height*.6),0,1);
      pcols.forEach(function(c,i){c.style.transform=i%2?'translate3d(0,'+(-90*np)+'px,0)':''}) } else pcols.forEach(function(c){c.style.transform=''});
    /* стопка: первая карточка слегка уменьшается, когда на неё наезжает вторая */
    if(wide&&!reduce&&cards.length>1){ var a=cards[0].getBoundingClientRect(), b=cards[1].getBoundingClientRect(), k=clamp(1-(b.top-a.top-24)/a.height,0,1);
      cards[0].style.transform='scale('+(1-k*.06)+')'; cards[0].style.filter='brightness('+(1-k*.35)+')' }
    /* шапка: белая плашка после первого экрана, прячется при прокрутке вниз */
    var open=$('#menu').classList.contains('open');
    hdr.classList.toggle('solid',open||y>hero.offsetHeight-90);
    if(Math.abs(y-lastY)>6){hdr.classList.toggle('hide',y>lastY&&y>vh*.6&&!open);lastY=y}
    requestAnimationFrame(frame);
  }
  requestAnimationFrame(frame);
})();
</script>
</body>
</html>
`;
