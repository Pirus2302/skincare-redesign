/* WOW «Текстура» – за hero течёт живая кремовая текстура (градиент GetLayers «Nappe», реагирует на курсор),
   hero собран по скелету GetLayers «ai-studio-hero»: огромный заголовок сверху слева + парящая карточка с наклоном + нижняя полоса.
   Дальше: лоадер-шторка, бегущая строка, текст, проявляющийся по скроллу, список категорий с картинкой за курсором,
   горизонтальная лента новинок на закреплённом экране. Весь контент – тот же, что на живом сайте */
const { SC, icon, esc, switcher } = require('./data');

const [s1, s2, s3] = SC.slides;
const navHtml = () => SC.nav.map(n => n.sub
  ? `<li class="has-sub"><a href="${n.href}">${n.t}<i></i></a><ul class="sub${n.sub.length > 8 ? ' sub-wide' : ''}">${n.sub.map(s => `<li><a href="${s.href}">${s.t}</a></li>`).join('')}</ul></li>`
  : `<li><a href="${n.href}">${n.t}</a></li>`).join('');
const words = t => t.split(' ').map(w => `<span class="w">${w}</span>`).join(' ');
const chips = list => [...list, ...list, ...list].map(b => `<li><a href="${b.href}" data-cur><img style="${b.pos}" src="${b.img}" alt="${esc(b.t)}" loading="lazy"></a></li>`).join('');
const star = '<svg viewBox="0 0 24 24" width=".5em" height=".5em" fill="currentColor" aria-hidden="true"><path d="M12 0c1 7 5 11 12 12-7 1-11 5-12 12-1-7-5-11-12-12 7-1 11-5 12-12Z"/></svg>';

module.exports = () => `<!doctype html>
<html lang="ru">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>skincare.by – вариант WOW «Текстура»</title>
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Cormorant:ital,wght@0,300..600;1,300..600&family=Manrope:wght@400;500;600&display=swap" rel="stylesheet">
<style>
:root{--cream:#efe6d8;--paper:#f5f5f2;--ink:#20231c;--mute:#6d6b60;--olive:#4f5e48;--deep:#2a3326;--amber:#d98a4a;--line:rgba(32,35,28,.16);--e:cubic-bezier(.16,1,.3,1);--pad:clamp(16px,3.200vw,48px)}
*{box-sizing:border-box;margin:0}
html{background:#fff}
body{background:#fff;color:var(--ink);font:400 15px/1.65 Manrope,system-ui,sans-serif;-webkit-font-smoothing:antialiased;overflow-x:clip}
body.lock{overflow:hidden}
img{display:block;max-width:100%}a{color:inherit;text-decoration:none}ul{list-style:none;padding:0}button{font:inherit}
h1,h2,h3,.serif{font-family:Cormorant,Georgia,serif;font-weight:400;line-height:1.020;letter-spacing:-.015em}
i.it,em{font-style:italic}
.caps{font:500 11px/1 Manrope,sans-serif;letter-spacing:.2em;text-transform:uppercase}
.px{padding-inline:var(--pad)}
.btn{position:relative;display:inline-flex;align-items:center;gap:12px;padding:18px 30px;border-radius:999px;border:1px solid var(--ink);background:var(--ink);color:var(--paper);font:500 12px/1 Manrope;letter-spacing:.14em;text-transform:uppercase;overflow:hidden;isolation:isolate;transition:color .45s var(--e),border-color .45s}
.btn::before{content:"";position:absolute;inset:0;z-index:-1;background:var(--amber);border-radius:999px;transform:translateY(101%);transition:transform .55s var(--e)}
.btn:hover{border-color:var(--amber);color:var(--ink)}.btn:hover::before{transform:none}
.btn.ghost{background:rgba(255,255,255,.35);color:var(--ink);backdrop-filter:blur(6px)}
.btn svg{transition:transform .45s var(--e)}.btn:hover svg{transform:translateX(5px)}

/* лоадер-шторка: без цифр, только знак и линия-таймер */
.loader{position:fixed;inset:0;z-index:10000;background:var(--deep);color:var(--cream);display:grid;place-items:center;transition:transform 1.150s cubic-bezier(.76,0,.24,1)}
.loader .m{font:italic 300 clamp(44px,8vw,120px)/1 Cormorant,serif;letter-spacing:-.02em;overflow:hidden;padding-bottom:.14em}
.loader .m span{display:inline-block;transform:translateY(110%);animation:rise 1s var(--e) .15s forwards}
.loader .bar{position:absolute;left:var(--pad);right:var(--pad);bottom:40px;height:1px;background:rgba(239,230,216,.2)}
.loader .bar::after{content:"";position:absolute;inset:0;background:var(--amber);transform-origin:left;transform:scaleX(0);animation:fill 1.300s cubic-bezier(.65,0,.35,1) forwards}
.ready .loader{transform:translateY(-101%)}
@keyframes rise{to{transform:none}}@keyframes fill{to{transform:scaleX(1)}}

/* курсор */
.cur{position:fixed;left:0;top:0;z-index:9998;pointer-events:none;width:12px;height:12px;margin:-6px 0 0 -6px;border-radius:50%;background:var(--amber);mix-blend-mode:multiply;transition:width .35s var(--e),height .35s var(--e),margin .35s var(--e),opacity .3s;opacity:0}
.cur.big{width:64px;height:64px;margin:-32px 0 0 -32px;opacity:.55}
@media(hover:none),(pointer:coarse){.cur{display:none}}

/* шапка */
.hdr{position:fixed;inset:0 0 auto;z-index:60;padding:14px var(--pad);display:grid;grid-template-columns:1fr auto 1fr;align-items:center;gap:20px;transition:transform .6s var(--e)}
.hdr.hide{transform:translateY(-110%)}
.logo img{height:28px;width:auto}
.pill{display:flex;gap:4px;padding:5px;border-radius:999px;background:rgba(255,255,255,.62);backdrop-filter:blur(14px);border:1px solid rgba(255,255,255,.6);box-shadow:0 10px 40px rgba(60,50,30,.08)}
.pill>li{position:relative}
.pill>li>a{display:inline-flex;align-items:center;gap:6px;padding:11px 18px;border-radius:999px;font:500 12px/1 Manrope;letter-spacing:.1em;text-transform:uppercase;transition:background .3s,color .3s}
.pill>li:hover>a{background:var(--ink);color:var(--paper)}
.pill i{width:5px;height:5px;border-right:1.5px solid;border-bottom:1.5px solid;transform:rotate(45deg) translateY(-2px)}
.sub{position:absolute;top:calc(100% + 10px);left:50%;min-width:230px;padding:16px 24px;border-radius:20px;background:rgba(255,255,255,.96);backdrop-filter:blur(14px);border:1px solid rgba(255,255,255,.7);box-shadow:0 30px 70px rgba(60,50,30,.16);opacity:0;visibility:hidden;transform:translate(-50%,10px);transition:.35s var(--e)}
.sub::before{content:"";position:absolute;left:0;right:0;top:-12px;height:12px}
.sub-wide{columns:2;column-gap:32px;min-width:520px}
.has-sub:hover .sub,.has-sub:focus-within .sub{opacity:1;visibility:visible;transform:translate(-50%,0)}
.sub a{display:block;padding:7px 0;font-size:14px;color:var(--mute);break-inside:avoid;transition:color .2s,transform .3s var(--e)}.sub a:hover{color:var(--ink);transform:translateX(4px)}
.tools{display:flex;gap:6px;justify-content:flex-end;align-items:center}
.tools a,.tools button{position:relative;width:42px;height:42px;border-radius:50%;border:1px solid rgba(255,255,255,.6);background:rgba(255,255,255,.62);backdrop-filter:blur(14px);color:inherit;cursor:pointer;display:grid;place-items:center;transition:.3s}
.tools a:hover,.tools button:hover{background:var(--ink);color:var(--paper)}
.tools b{position:absolute;top:-3px;right:-3px;min-width:17px;height:17px;border-radius:9px;background:var(--amber);color:var(--ink);font:600 10px/17px Manrope;text-align:center}
.tools .burger{display:none}

/* hero */
.hero{position:relative;background:var(--cream);min-height:100svh;display:flex;flex-direction:column;justify-content:space-between;padding:96px var(--pad) 28px;overflow:hidden}
.hero iframe{position:absolute;inset:0;width:100%;height:100%;border:0;pointer-events:none}
.hero::after{content:"";position:absolute;inset:0;background:radial-gradient(90% 70% at 0% 0%,rgba(239,230,216,.72),rgba(239,230,216,0) 62%),linear-gradient(0deg,rgba(239,230,216,.75),rgba(239,230,216,0) 32%);pointer-events:none}
.hero>*:not(iframe){position:relative;z-index:2}
.topline{display:flex;gap:22px;flex-wrap:wrap;font-size:13px;color:#47493f}
.topline a{display:inline-flex;gap:7px;align-items:center}.topline a:hover{color:var(--ink)}
.topline .sp{flex:1}
.hero h1{font-size:clamp(44px,7.400vw,136px);font-weight:300;margin-top:20px;max-width:12em}
.hero .ht{z-index:4;pointer-events:none}.ht a{pointer-events:auto}
.ln{display:block;overflow:hidden;padding-bottom:.14em;margin-bottom:-.14em}
.ln>span{display:block;transform:translateY(112%);transition:transform 1.250s var(--e)}
.ready .ln>span{transform:none}
.ln:nth-child(2)>span{transition-delay:.11s}.ln:nth-child(3)>span{transition-delay:.22s}
.ln .dim{color:var(--olive)}
.card{position:absolute!important;z-index:3!important;right:clamp(16px,6vw,120px);top:50%;width:min(31vw,470px);aspect-ratio:4/5;margin-top:max(-21vw,-300px);perspective:1200px}
.card .in{width:100%;height:100%;border-radius:28px;overflow:hidden;box-shadow:0 50px 100px -30px rgba(50,40,20,.45),0 0 0 1px rgba(255,255,255,.5) inset;scale:.86;opacity:0;transition:opacity 1.200s var(--e) .35s,scale 1.600s var(--e) .35s;will-change:transform}
.ready .card .in{opacity:1;scale:1}
.card img{width:100%;height:100%;object-fit:cover;object-position:82% center;transform:scale(1.12)}
.card .lab{position:absolute;left:-14px;top:50%;writing-mode:vertical-rl;transform:translate(-100%,-50%) rotate(180deg);color:#47493f;white-space:nowrap}
.badge{position:absolute;right:-46px;bottom:-46px;width:132px;height:132px;border-radius:50%;background:var(--ink);color:var(--cream);display:grid;place-items:center;transition:background .4s,color .4s,transform .6s var(--e)}
.badge:hover{background:var(--amber);color:var(--ink);transform:scale(1.08)}
.badge svg.t{position:absolute;inset:6px;width:calc(100% - 12px);height:calc(100% - 12px);animation:spin 16s linear infinite}
.badge text{font:500 10.500px Manrope,sans-serif;letter-spacing:.16em;text-transform:uppercase;fill:currentColor}
@keyframes spin{to{transform:rotate(360deg)}}
.hb{display:grid;gap:26px}
.hb p{max-width:44ch;font-size:16px;color:#33362d}
.hb .ctas{display:flex;gap:10px;flex-wrap:wrap}
.hb .rule{height:1px;background:var(--line);transform-origin:left;transform:scaleX(0);transition:transform 1.400s var(--e) .6s}.ready .hb .rule{transform:none}
.hb .last{display:flex;justify-content:space-between;align-items:center;gap:20px;flex-wrap:wrap}
.proof{display:inline-flex;align-items:center;gap:12px;padding:9px 18px 9px 9px;border-radius:999px;background:rgba(255,255,255,.7);backdrop-filter:blur(10px);border:1px solid rgba(255,255,255,.7);font-weight:500;font-size:14px}
.proof u{width:30px;height:30px;border-radius:50%;background:var(--amber);display:grid;place-items:center;text-decoration:none;font-size:18px}
.fade{opacity:0;transform:translateY(18px);filter:blur(6px);transition:opacity 1.100s var(--e),transform 1.100s var(--e),filter 1.100s var(--e)}
.ready .fade{opacity:1;transform:none;filter:none}
.d1{transition-delay:.4s}.d2{transition-delay:.52s}.d3{transition-delay:.7s}.d4{transition-delay:.82s}

/* бегущая строка */
.tape{background:var(--deep);color:var(--cream);padding:26px 0;overflow:hidden;white-space:nowrap}
.tape div{display:inline-flex;gap:.6em;align-items:center;padding-right:.6em;font:italic 300 clamp(34px,5.400vw,84px)/1.100 Cormorant,serif;animation:tape 36s linear infinite;will-change:transform}
.tape svg{color:var(--amber);flex:none}.tape b{font-style:normal;font-weight:300}
@keyframes tape{to{transform:translateX(-50%)}}

/* заявление: экран закрепляется, фото на весь блок, слова проявляются по скроллу, второе фото раскрывается кругом */
.state{height:230vh;padding:0 clamp(0px,1vw,14px)}
.st{position:sticky;top:0;height:100svh;padding:clamp(8px,1vw,14px) 0}
.st-in{position:relative;height:100%;border-radius:clamp(24px,4vw,56px);overflow:hidden;display:grid;place-items:center;text-align:center;isolation:isolate}
.st-bg{position:absolute;inset:0;z-index:-2}
.st-bg img{width:100%;height:100%;object-fit:cover;filter:contrast(1.1) saturate(1.2) brightness(.96);will-change:transform}
.st-bg.b{z-index:-1;clip-path:circle(var(--r,0%) at 76% 68%)}
.st-in::after{content:"";position:absolute;inset:0;z-index:-1;background:radial-gradient(60% 55% at 50% 50%,rgba(255,255,255,.78),rgba(255,255,255,.25) 70%,rgba(255,255,255,.05))}
.state h2{font-size:clamp(38px,6.200vw,112px);font-weight:300;line-height:1.040;margin:0 var(--pad) clamp(28px,3vw,48px)}
.state .w{opacity:.16;transition:opacity .5s}.state .w.on{opacity:1}
.st-cue{position:absolute;left:50%;bottom:28px;transform:translateX(-50%);color:#47493f}

.sec{padding:clamp(80px,9vw,150px) 0}
.sh{display:flex;justify-content:space-between;align-items:flex-end;gap:24px;flex-wrap:wrap;margin-bottom:clamp(36px,4.500vw,72px)}
.sh h2{font-size:clamp(40px,6.400vw,110px);font-weight:300}
.sh .caps{color:var(--mute);display:inline-flex;gap:10px;align-items:center}

/* бренды */
.rows{display:grid;gap:16px;overflow:hidden;mask-image:linear-gradient(90deg,transparent,#000 10%,#000 90%,transparent)}
.rows ul{display:flex;gap:16px;padding-right:16px;width:max-content;animation:marq 60s linear infinite}
.rows ul.rev{animation-direction:reverse}
.rows:hover ul{animation-play-state:paused}
@keyframes marq{to{transform:translateX(-33.3333%)}}
.rows a{--u:clamp(110px,10vw,150px);position:relative;display:block;width:calc(var(--u)*1.7);aspect-ratio:2/1;overflow:hidden;border-radius:999px;background:var(--paper);transition:transform .6s var(--e),box-shadow .6s}
.rows a:hover{transform:scale(1.06) rotate(-2deg);box-shadow:0 24px 50px -20px rgba(50,40,20,.35)}
.rows img{position:absolute;left:50%;top:50%;transform:translate(var(--x),var(--y));width:calc(var(--u)*var(--k));max-width:none;aspect-ratio:1;object-fit:contain;mix-blend-mode:multiply}

/* категории – тёмная секция, картинка летит за курсором */
.dark{background:var(--deep);color:var(--cream);border-radius:clamp(24px,4vw,56px);margin:0 clamp(0px,1vw,14px)}
.dark .sh .caps{color:rgba(239,230,216,.6)}
.clist{border-top:1px solid rgba(239,230,216,.18)}
.crow{position:relative;display:grid;grid-template-columns:70px 1fr minmax(0,300px) 56px;gap:24px;align-items:center;padding:clamp(18px,2.200vw,34px) 0;border-bottom:1px solid rgba(239,230,216,.18);transition:padding .6s var(--e),color .4s}
.crow .n{font:italic 300 20px Cormorant,serif;color:var(--amber)}
.crow h3{font-size:clamp(34px,5.200vw,88px);font-weight:300;transition:transform .7s var(--e)}
.crow p{color:rgba(239,230,216,.62);font-size:14px}
.crow .ar{width:56px;height:56px;border-radius:50%;border:1px solid rgba(239,230,216,.3);display:grid;place-items:center;transition:.5s var(--e)}
.crow .th{display:none}
.clist:hover .crow{color:rgba(239,230,216,.35)}.clist:hover .crow:hover{color:var(--cream)}
.crow:hover h3{transform:translateX(28px);font-style:italic}
.crow:hover .ar{background:var(--amber);border-color:var(--amber);color:var(--ink);transform:rotate(-45deg)}
.peek{position:fixed;left:0;top:0;z-index:70;width:min(24vw,340px);aspect-ratio:4/5;margin:-210px 0 0 -170px;border-radius:24px;overflow:hidden;pointer-events:none;opacity:0;scale:.6;transition:opacity .45s var(--e),scale .6s var(--e);box-shadow:0 40px 90px -20px rgba(0,0,0,.55)}
.peek.on{opacity:1;scale:1}
.peek img{position:absolute;inset:0;width:100%;height:100%;object-fit:cover;opacity:0;transform:scale(1.15);transition:opacity .5s,transform 1s var(--e)}
.peek img.on{opacity:1;transform:none}

/* новинки – горизонтальная лента на закреплённом экране */
.pin{position:relative}
.pin-in{position:sticky;top:0;height:100svh;display:flex;flex-direction:column;justify-content:center;overflow:hidden;padding:88px 0 40px}
.pin .sh{margin-bottom:32px}
.prog{width:160px;height:2px;background:var(--line);overflow:hidden;border-radius:2px}.prog i{display:block;height:100%;background:var(--amber);transform-origin:left;transform:scaleX(0)}
.track{display:flex;gap:20px;padding-inline:var(--pad);width:max-content;will-change:transform}
.prod{width:clamp(250px,23vw,340px);display:flex;flex-direction:column;border-radius:28px;background:var(--paper);padding:16px;transition:transform .7s var(--e),box-shadow .7s}
.prod:hover{transform:translateY(-10px);box-shadow:0 40px 70px -30px rgba(50,40,20,.35)}
.prod .ph{aspect-ratio:1/1;border-radius:18px;background:#fff;display:grid;place-items:center;padding:24px;overflow:hidden}
.prod img{max-height:100%;object-fit:contain;mix-blend-mode:multiply;transition:transform .9s var(--e)}
.prod:hover img{transform:scale(1.1) rotate(-3deg)}
.prod h3{font:500 14px/1.500 Manrope,sans-serif;letter-spacing:0;margin:18px 6px 0;display:-webkit-box;-webkit-line-clamp:3;-webkit-box-orient:vertical;overflow:hidden;min-height:63px}
.prod .ft{display:flex;justify-content:space-between;align-items:center;gap:8px;margin:auto 6px 6px;padding-top:16px}
.prod .pr{font:500 26px/1 Cormorant,serif}.prod .pr.ask{font:400 13px Manrope;color:var(--mute)}
.prod .go{padding:12px 18px;border-radius:999px;background:var(--ink);color:var(--paper);font:500 11px/1 Manrope;letter-spacing:.1em;text-transform:uppercase;white-space:nowrap;transition:.3s}
.prod .go:hover{background:var(--amber);color:var(--ink)}
.prod .go.more{background:transparent;color:var(--ink);box-shadow:0 0 0 1px var(--ink) inset}.prod .go.more:hover{background:var(--ink);color:var(--paper)}

/* консультация и подбор */
.duo{display:flex;gap:16px;height:min(74vh,640px)}
.ban{position:relative;flex:1;border-radius:clamp(24px,3vw,40px);overflow:hidden;display:flex;align-items:flex-end;transition:flex 1s var(--e)}
.duo:hover .ban{flex:.75}.duo .ban:hover{flex:1.500}
.ban img{position:absolute;inset:0;width:100%;height:100%;object-fit:cover;transition:transform 1.600s var(--e)}
.ban:hover img{transform:scale(1.06)}
.ban::before{content:"";position:absolute;inset:0;z-index:1;background:linear-gradient(0deg,rgba(255,255,255,.95),rgba(255,255,255,.2) 55%,transparent 75%)}
.ban div{position:relative;z-index:2;padding:clamp(22px,3vw,44px);display:grid;gap:22px;justify-items:start}
.ban h3{font-size:clamp(30px,3.800vw,60px);font-weight:300;max-width:9em}

/* статьи */
.blog{display:grid;grid-template-columns:repeat(6,1fr);gap:48px 20px}
.post{grid-column:span 2}.post.big{grid-column:span 3}
.post .ph{position:relative;aspect-ratio:3/2;border-radius:24px;overflow:hidden;clip-path:inset(0 round 24px)}
.post.big .ph{aspect-ratio:16/10}
.post img{width:100%;height:100%;object-fit:cover;transition:transform 1.400s var(--e)}
.post:hover img{transform:scale(1.07)}
.post .ph span{position:absolute;right:14px;top:14px;width:52px;height:52px;border-radius:50%;background:var(--paper);display:grid;place-items:center;transform:scale(0) rotate(-90deg);transition:transform .6s var(--e)}
.post:hover .ph span{transform:rotate(-45deg)}
.post time{display:block;margin:20px 0 10px;color:var(--olive)}
.post h3{font-size:clamp(24px,2.200vw,34px);margin-bottom:10px}.post.big h3{font-size:clamp(28px,3vw,46px)}
.post p{color:var(--mute);max-width:56ch}

/* подвал */
footer{background:var(--deep);color:#c9cbbd;margin-top:clamp(80px,9vw,150px);border-radius:clamp(24px,4vw,56px) clamp(24px,4vw,56px) 0 0;padding:clamp(56px,6vw,96px) 0 0;font-size:14px;overflow:hidden}
.ft{display:grid;grid-template-columns:1.500fr 1fr 1.300fr 1.100fr;gap:48px}
.ft p{margin-bottom:12px;color:#a3a796}
.ft h4{color:var(--cream);margin-bottom:24px}
.ft li{margin-bottom:10px}.ft li a{color:#a3a796;transition:color .2s}.ft li a:hover{color:var(--amber)}
.ft .two{columns:2;column-gap:24px}
.soc{display:flex;gap:10px;margin-bottom:20px}.soc a{width:44px;height:44px;border-radius:50%;border:1px solid rgba(239,230,216,.25);display:grid;place-items:center;color:var(--cream);transition:.35s var(--e)}.soc a:hover{background:var(--amber);border-color:var(--amber);color:var(--ink);transform:rotate(-8deg) scale(1.08)}
.fbot{display:flex;justify-content:space-between;align-items:center;gap:24px;flex-wrap:wrap;margin-top:56px;padding-top:22px;border-top:1px solid rgba(239,230,216,.14)}
.pay{display:flex;gap:18px;align-items:center;flex-wrap:wrap}.pay .strip{max-width:100%;object-fit:contain}.pay img{height:26px;width:auto}.pay .strip{height:20px;opacity:.85}
.dev{display:flex;gap:12px;align-items:center;color:#a3a796;font-size:13px}.dev img{height:22px}
.giant{display:block;font:italic 300 23.500vw/.8 Cormorant,serif;letter-spacing:-.04em;text-align:center;white-space:nowrap;margin-top:40px;padding-bottom:84px;background:linear-gradient(180deg,var(--cream),rgba(239,230,216,.08));-webkit-background-clip:text;background-clip:text;color:transparent;transform:translateY(12%)}

.rv{opacity:0;transform:translateY(40px);transition:opacity 1.200s var(--e),transform 1.200s var(--e)}.rv.in{opacity:1;transform:none}

@media(max-width:1100px){.pill>li>a{padding:10px 12px;letter-spacing:.06em}.ft{grid-template-columns:1fr 1fr}.crow{grid-template-columns:48px 1fr 56px}.crow p{display:none}}
@media(max-width:860px){
 .hdr{grid-template-columns:auto 1fr}.tools .burger{display:grid}
 .pill{display:none;position:absolute;top:calc(100% - 4px);left:var(--pad);right:var(--pad);flex-direction:column;border-radius:24px;padding:12px 18px;max-height:72vh;overflow:auto;background:rgba(255,255,255,.97)}
 .pill.open{display:flex}.pill>li>a{padding:13px 4px}.pill>li:hover>a{background:none;color:inherit}
 .sub,.sub-wide{position:static;opacity:1;visibility:visible;transform:none;box-shadow:none;border:0;background:none;padding:0 0 8px 14px;min-width:0;columns:1;backdrop-filter:none}
 .tools a.opt{display:none}
 .hero{padding-top:84px;gap:28px}.topline .sp{display:none}.topline{gap:8px 16px}
 .card{position:relative!important;right:auto;top:auto;margin:0 auto;width:min(78vw,380px)}.card .lab{display:none}.badge{right:-10px;bottom:-30px;width:108px;height:108px}
 .hb .last{justify-content:flex-start}

 .crow{grid-template-columns:72px 1fr 44px;gap:16px}.crow .n{display:none}.crow .th{display:block;width:72px;aspect-ratio:1/1;border-radius:16px;object-fit:cover}.crow p{display:block;grid-column:2/-1;grid-row:2;margin-top:-8px}.crow p:empty{display:none}.crow .ar{width:44px;height:44px;grid-row:1;grid-column:3}.dark .sh .caps{display:none}
 .crow:hover h3{transform:none}.peek{display:none}
 .dark{margin:0}
 .pin{height:auto!important}.pin-in{position:static;height:auto;padding:64px 0 0;overflow:visible}.track{overflow-x:auto;width:auto;transform:none!important;scroll-snap-type:x mandatory;scrollbar-width:none;padding-bottom:8px}.track::-webkit-scrollbar{display:none}.prod{flex:none;width:74vw;scroll-snap-align:center}.prog{display:none}
 .duo{flex-direction:column;height:auto}.ban{min-height:340px}.duo:hover .ban,.duo .ban:hover{flex:1}
 .blog{grid-template-columns:1fr;gap:36px}.post,.post.big{grid-column:auto}
 .ft{grid-template-columns:1fr;gap:36px}
}
@media(prefers-reduced-motion:reduce){*{animation:none!important;transition:none!important}.rv,.fade,.ln>span,.card .in{opacity:1!important;transform:none!important;filter:none!important}.state .w{opacity:1}.state{height:auto}.st{position:static}.loader{display:none}}
</style>
</head>
<body class="lock">

<div class="loader" aria-hidden="true"><div class="m"><span>skincare.by</span></div><div class="bar"></div></div>
<div class="cur" id="cur"></div>

<header class="hdr" id="hdr">
  <a class="logo" href="${SC.site}"><img src="${SC.logo}" alt="skincare.by" width="402" height="78"></a>
  <ul class="pill" id="menu">${navHtml()}</ul>
  <div class="tools">
    <a class="opt" href="${SC.account}" aria-label="Личный кабинет">${icon.user}</a>
    <button aria-label="Поиск">${icon.search}</button>
    <a href="${SC.wishlist}" aria-label="Избранное">${icon.heart}<b>0</b></a>
    <a href="${SC.cart}" aria-label="Корзина">${icon.bag}<b>0</b></a>
    <button class="burger" aria-label="Меню" data-menu>${icon.menu}</button>
  </div>
</header>

<div class="hero" id="hero">
  <iframe src="assets/nappe.html" title="" aria-hidden="true" tabindex="-1" id="fx"></iframe>
  <div class="ht">
    <div class="topline fade">
      <a href="tel:${SC.phone}">${icon.phone}${SC.phone}</a><a href="mailto:${SC.email}">${icon.mail}${SC.email}</a><span class="sp"></span>
      <a href="${SC.instagram}">${icon.ig}Instagram</a><a href="${SC.telegram}">${icon.tg}Telegram</a>
    </div>
    <h1><span class="ln"><span>Добро пожаловать</span></span><span class="ln"><span class="dim">в мир <i class="it">осознанного</i></span></span><span class="ln"><span>ухода за кожей!</span></span></h1>
  </div>

  <div class="card" id="card">
    <div class="in" id="cardIn"><img src="${s1.img}" alt="Ирина, косметик-эстетист" fetchpriority="high"></div>
    <span class="lab caps fade d3">Ирина · практикующий косметик-эстетист</span>
    <a class="badge fade d4" href="${SC.telegram}" aria-label="${s1.cta}" data-cur>
      <svg class="t" viewBox="0 0 120 120"><defs><path id="c" d="M60 60m-48 0a48 48 0 1 1 96 0a48 48 0 1 1-96 0"/></defs><text><textPath href="#c">консультация · онлайн · оффлайн · </textPath></text></svg>
      ${icon.arrow}
    </a>
  </div>

  <div class="hb">
    <p class="fade d1">${esc(s1.text)}</p>
    <div class="ctas fade d2"><a class="btn" href="${s1.href}" data-cur>${s1.cta}${icon.arrow}</a><a class="btn ghost" href="${s2.href}" data-cur>${s2.cta}</a></div>
    <div class="rule"></div>
    <div class="last fade d3"><a class="proof" href="${s3.href}"><u>✦</u>${esc(s3.title)}</a><span>${esc(s3.text)}</span></div>
  </div>
</div>

<div class="tape" aria-hidden="true"><div>${Array(4).fill(`<span>${esc(s3.title)}</span>${star}<b>${esc(s3.text)}</b>${star}`).join('')}</div></div>

<div class="state" id="state"><div class="st"><div class="st-in">
  <div class="st-bg"><img id="stA" src="${s2.img}" alt="" loading="lazy"></div>
  <div class="st-bg b" id="stB"><img src="${s3.img}" alt="" loading="lazy"></div>
  <div>
    <h2>${words('Ваша кожа заслуживает')}<br><i class="it">${words('лучшего ухода.')}</i><br>${words('Выберите его.')}</h2>
    <a class="btn" href="${s2.href}" data-cur>${s2.cta}${icon.arrow}</a>
  </div>
  <span class="st-cue caps">листайте</span>
</div></div></div>

<section class="sec">
  <div class="sh px rv"><h2>Сотрудничаю <i class="it">с брендами</i></h2><span class="caps">${SC.brands.length} брендов</span></div>
  <div class="rows rv"><ul>${chips(SC.brands.slice(0, 7))}</ul><ul class="rev">${chips(SC.brands.slice(7))}</ul></div>
</section>

<section class="sec dark"><div class="px">
  <div class="sh rv"><h2>Категории</h2><span class="caps">Наведите на строку</span></div>
  <div class="clist" id="clist">
${SC.cats.map((c, i) => `    <a class="crow rv" href="${c.href}" data-i="${i}"><span class="n">0${i + 1}</span><img class="th" src="${c.img}" alt="" loading="lazy"><h3>${c.t}</h3><p>${c.d}</p><span class="ar">${icon.arrow}</span></a>`).join('\n')}
  </div>
</div></section>
<div class="peek" id="peek" aria-hidden="true">${SC.cats.map(c => `<img src="${c.img}" alt="" loading="lazy">`).join('')}</div>

<section class="pin" id="pin"><div class="pin-in">
  <div class="sh px"><h2><i class="it">Новинки</i></h2><div class="prog"><i id="prog"></i></div></div>
  <div class="track" id="track">
${SC.products.map(p => `    <article class="prod"><a class="ph" href="${p.href}" data-cur><img src="${p.img}" alt="${esc(p.t)}" loading="lazy"></a><h3><a href="${p.href}">${esc(p.t)}</a></h3><div class="ft"><span class="pr${p.buy ? '' : ' ask'}">${p.price}</span><a class="go${p.buy ? '' : ' more'}" href="${p.href}">${p.buy ? 'В корзину' : 'Подробнее'}</a></div></article>`).join('\n')}
  </div>
</div></section>

<section class="sec" style="padding-top:clamp(40px,5vw,80px)"><div class="px duo rv">
${SC.banners.map(b => `  <a class="ban" href="${b.href}" data-cur><img style="${b.pos}" src="${b.img}" alt="" loading="lazy"><div><h3>${b.t}</h3><span class="btn">${b.cta}${icon.arrow}</span></div></a>`).join('\n')}
</div></section>

<section class="sec" style="padding-top:0"><div class="px">
  <div class="sh rv"><h2>Полезные <i class="it">статьи</i></h2><a class="caps" href="${SC.site}blog/">Блог ${icon.arrow}</a></div>
  <div class="blog">
${[SC.posts[3], SC.posts[4], SC.posts[0], SC.posts[1], SC.posts[2]].map((p, i) => `    <a class="post rv${i < 2 ? ' big' : ''}" href="${p.href}" data-cur><div class="ph"><img src="${p.img}" alt="" loading="lazy"><span>${icon.arrow}</span></div><time class="caps">${p.date}</time><h3>${esc(p.t)}</h3><p>${esc(p.ex)}</p></a>`).join('\n')}
  </div>
</div></section>

<footer><div class="px">
  <div class="ft">
    <div>${SC.footer.legal.map(l => `<p>${l}</p>`).join('')}</div>
    <div><h4 class="caps">Главная</h4><ul>${SC.footer.main.map(l => `<li><a href="${l.href}">${l.t}</a></li>`).join('')}</ul></div>
    <div><h4 class="caps">Каталог</h4><ul class="two">${SC.nav[1].sub.slice(0, 13).map(l => `<li><a href="${l.href}">${l.t}</a></li>`).join('')}</ul></div>
    <div><h4 class="caps">Контакты</h4>
      <div class="soc"><a href="${SC.instagram}" aria-label="Instagram">${icon.ig}</a><a href="${SC.telegram}" aria-label="Telegram">${icon.tg}</a></div>
      <ul><li><a href="tel:${SC.phone}">${SC.phone}</a></li><li><a href="mailto:${SC.email}">${SC.email}</a></li><li>${SC.address}</li></ul>
    </div>
  </div>
  <div class="fbot">
    <div class="pay"><img src="${SC.footer.pay[0]}" alt="Хуткi Грош"><img src="${SC.footer.pay[1]}" alt="ЕРИП"><img class="strip" src="${SC.footer.payStrip}" alt="Способы оплаты"></div>
    <div class="dev">${SC.footer.dev.t}<img src="${SC.footer.dev.img}" alt="Pirus"></div>
  </div>
  <span class="giant" aria-hidden="true">skincare.by</span>
</div></footer>

${switcher('wow.html')}
<script>
(function(){
  var reduce=matchMedia('(prefers-reduced-motion: reduce)').matches, fine=matchMedia('(hover:hover) and (pointer:fine)').matches;
  var $=function(s){return document.querySelector(s)}, $$=function(s){return [].slice.call(document.querySelectorAll(s))};
  var clamp=function(v,a,b){return Math.min(b,Math.max(a,v))};

  /* лоадер: минимум 1.3 с, потолок 3 с; «готово» = фон hero загрузился. Контент стартует вместе с уходом шторки */
  var t0=performance.now(), done=false, fx=$('#fx');
  function open(){ if(done) return; done=true; var wait=Math.max(0,1300-(performance.now()-t0));
    setTimeout(function(){document.body.classList.add('ready'); setTimeout(function(){document.body.classList.remove('lock')},1100)},reduce?0:wait) }
  fx.addEventListener('load',open); setTimeout(open,3000);

  /* курсор шейдера: фон лежит под контентом, поэтому движение мыши пробрасываем в iframe вручную */
  var hero=$('#hero');
  hero.addEventListener('pointermove',function(e){
    try{ var r=fx.getBoundingClientRect(), w=fx.contentWindow;
      w.dispatchEvent(new w.PointerEvent('pointermove',{clientX:e.clientX-r.left,clientY:e.clientY-r.top})) }catch(_){}
  },{passive:true});

  /* меню */
  $('[data-menu]').addEventListener('click',function(){$('#menu').classList.toggle('open')});

  /* проявление блоков */
  var io=new IntersectionObserver(function(es){es.forEach(function(e){if(e.isIntersecting){e.target.classList.add('in');io.unobserve(e.target)}})},{threshold:.08});
  $$('.rv').forEach(function(el){io.observe(el)});

  /* категории: картинка летит за курсором */
  var peek=$('#peek'), pimgs=[].slice.call(peek.children), clist=$('#clist');
  $$('.crow').forEach(function(row){row.addEventListener('pointerenter',function(){pimgs.forEach(function(im,i){im.classList.toggle('on',i==row.dataset.i)})})});
  clist.addEventListener('pointerenter',function(){if(fine) peek.classList.add('on')});
  clist.addEventListener('pointerleave',function(){peek.classList.remove('on')});

  /* общий кадр: курсор, наклон карточки, скролл-эффекты – один rAF, всё через lerp */
  var mx=innerWidth/2,my=innerHeight/2,cx=mx,cy=my,px=mx,py=my,rx=0,ry=0,cur=$('#cur'),cardIn=$('#cardIn'),hdr=$('#hdr');
  var pin=$('#pin'),track=$('#track'),prog=$('#prog'),dist=0,tx=0,stateW=$$('#state .w'),state=$('#state'),pars=$$('[data-par]'),stA=$('#stA'),stB=$('#stB'),lastY=0;
  addEventListener('pointermove',function(e){mx=e.clientX;my=e.clientY;if(fine)cur.style.opacity=1},{passive:true});
  $$('[data-cur],.crow').forEach(function(el){el.addEventListener('pointerenter',function(){cur.classList.add('big')});el.addEventListener('pointerleave',function(){cur.classList.remove('big')})});
  function measure(){ if(innerWidth<=860){pin.style.height='';dist=0;return} dist=Math.max(0,track.scrollWidth-innerWidth); pin.style.height=(innerHeight+dist)+'px' }
  measure(); addEventListener('resize',measure); addEventListener('load',measure);

  function frame(){
    var y=scrollY, vh=innerHeight;
    cx+=(mx-cx)*.35; cy+=(my-cy)*.35; cur.style.transform='translate3d('+cx+'px,'+cy+'px,0)';
    px+=(mx-px)*.12; py+=(my-py)*.12; peek.style.transform='translate3d('+px+'px,'+py+'px,0) rotate('+clamp((mx-px)*.06,-10,10)+'deg)';
    if(!reduce){
      /* карточка: наклон к курсору, при скролле выпрямляется и уезжает медленнее страницы */
      var k=clamp(y/vh,0,1), tyaw=fine?(mx/innerWidth-.5)*16:0, tpit=fine?(.5-my/vh)*12:0;
      ry+=(tyaw-ry)*.06; rx+=(tpit-rx)*.06;
      cardIn.style.transform='translate3d(0,'+(y*.18)+'px,0) rotateX('+rx*(1-k)+'deg) rotateY('+ry*(1-k)+'deg) rotate('+4*(1-k)+'deg) scale('+(1+k*.06)+')';
      pars.forEach(function(el){var r=el.parentNode.getBoundingClientRect();el.style.transform='translate3d(0,'+((r.top+r.height/2-vh/2)*+el.dataset.par)+'px,0)'});
    }
    /* заявление: пока экран закреплён, слова проявляются, фон чуть приближается, второе фото раскрывается кругом */
    var sr=state.getBoundingClientRect(), sp=clamp(-sr.top/Math.max(1,sr.height-vh),0,1), n=Math.round(clamp((sp+.08)/.55,0,1)*stateW.length);
    stateW.forEach(function(w,i){w.classList.toggle('on',reduce||i<n)});
    if(!reduce){stA.style.transform='scale('+(1.18-sp*.18)+')';stB.style.setProperty('--r',clamp((sp-.5)/.5,0,1)*150+'%')}
    /* новинки: вертикальный скролл двигает ленту вбок */
    if(dist){ var p=clamp(-pin.getBoundingClientRect().top/dist,0,1); tx+=(p*dist-tx)*.12; track.style.transform='translate3d('+(-tx)+'px,0,0)'; prog.style.transform='scaleX('+p+')' }
    /* шапка прячется при прокрутке вниз, возвращается при прокрутке вверх */
    if(Math.abs(y-lastY)>6){hdr.classList.toggle('hide',y>lastY&&y>vh*.6&&!$('#menu').classList.contains('open'));lastY=y}
    requestAnimationFrame(frame);
  }
  requestAnimationFrame(frame);
})();
</script>
</body>
</html>
`;
