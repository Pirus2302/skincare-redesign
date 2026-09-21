/* Контент главной skincare.by, снят с живого сайта 21.09.2026. Один источник для всех трёх вариантов */
const U = 'https://skincare.by/wp-content/uploads/';
const S = 'https://skincare.by/';

/* Логотипы брендов – квадратные картинки с разными полями. k – во сколько раз показать картинку шире «эталона»,
   чтобы сам знак у всех выглядел одного размера (посчитано по видимой части каждого логотипа) */
const logoK = {"jean-darcel": 1.02, "jw-pro": 0.88, "medicare": 1.2, "phformula": 1.1, "skinosophy": 1.25, "cantabria-labs": 1.16, "dermatime": 1.06, "diego-dalla-palma": 1.11, "founder": 1.02, "gecko": 0.69, "gerards": 0.75, "germaine-de-capuccini": 0.58, "heliocare": 0.98};
/* центр видимой части знака внутри картинки, в долях (x, y) – по нему логотип ставится в середину плашки */
const logoC = {"jean-darcel": [0.497, 0.5], "jw-pro": [0.498, 0.5], "medicare": [0.498, 0.5], "phformula": [0.498, 0.5], "skinosophy": [0.498, 0.498], "cantabria-labs": [0.497, 0.467], "dermatime": [0.498, 0.498], "diego-dalla-palma": [0.493, 0.5], "founder": [0.495, 0.495], "gecko": [0.498, 0.513], "gerards": [0.498, 0.496], "germaine-de-capuccini": [0.491, 0.493], "heliocare": [0.5, 0.497]};

const SC = {
  site: S,
  logo: U + '2026/04/logo.png',
  phone: '+375297178135',
  email: 'grubnikovairina1984@gmail.com',
  address: 'Витебск, улица Шаврова дом 34',
  instagram: 'https://www.instagram.com/kosmetolog_irina_vtb/',
  telegram: 'https://t.me/grubnikovairina',
  account: S + 'lichnyj-kabinet/',
  wishlist: S + 'izbrannoye/',
  cart: S + 'oformlenie-zakaza/',

  nav: [
    { t: 'Главная', href: S },
    { t: 'Каталог', href: S + 'katalog/', sub: [
      ['Демакияж', 'product-category/demakiyazh/'],
      ['Очищение', 'product-category/ochishhenie/'],
      ['Глубокое очищение', 'product-category/glubokoe-ochishhenie/'],
      ['Тонизация', 'product-category/tonizacziya/'],
      ['Сыворотки и концентраты', 'product-category/syvorotki-i-konczentraty/'],
      ['Уход за кожей вокруг глаз', 'product-category/uhod-za-kozhej-vokrug-glaz/'],
      ['Средства для ухода за кожей лица', 'product-category/sredstva-dlya-uhoda-za-kozhej-licza/'],
      ['Средства с SPF', 'product-category/sredstva-s-spf/'],
      ['Маски', 'product-category/maski/'],
      ['Бальзамы для губ', 'product-category/balzamy-dlya-gub/'],
      ['Уход за телом', 'product-category/uhod-za-telom/'],
      ['Акция', 'product-category/akcziya/'],
      ['Мини версии', 'product-category/mini-versii/'],
      ['Витамин C', 'product-category/vitamin-c/'],
      ['Готовые наборы', 'product-category/gotovye-nabory/']
    ].map(([t, p]) => ({ t, href: S + p })) },
    { t: 'Обо мне', href: S + 'obo-mne/' },
    { t: 'Инфо', href: '#', sub: [
      ['Доставка', 'dostavka/'], ['Оплата', 'oplata/'], ['Возврат', 'vozvrat/'], ['Блог', 'blog/'], ['Отзывы', 'otzyvy/']
    ].map(([t, p]) => ({ t, href: S + p })) },
    { t: 'FAQ', href: S + 'faq/' },
    { t: 'Контакты', href: S + 'kontakty/' }
  ],

  slides: [
    { title: 'Добро пожаловать в мир осознанного ухода за кожей!',
      text: 'Меня зовут Ирина, я практикующий косметик-эстетист, и этот интернет-магазин вырос из моей многолетней любви к косметологии и желания помочь каждой женщине обрести уверенность в своей красоте.',
      cta: 'Записаться на консультацию', href: 'https://t.me/grubnikovairina', img: U + '2026/04/image3.jpg' },
    { title: 'Ваша кожа заслуживает лучшего ухода.', text: 'Выберите его.',
      cta: 'Перейти в каталог', href: S + 'katalog/', img: U + '2026/04/image25-new.jpg' },
    { title: 'Бесплатная консультация при покупке от 250 BYN', text: 'Профессиональная косметика, созданная для вас',
      cta: 'Каталог', href: S + 'katalog/', img: U + '2026/04/image15.jpg' }
  ],

  brands: [
    ["Jean D'Arcel", '2026/05/img_4717-300x300.png', 'jean-darcel'],
    ['JW PRO', '2026/03/img_4729.jpg', 'jw-pro'],
    ['Medicare', '2026/05/img_4719-300x300.jpg', 'medicare'],
    ['pHformula', '2026/03/img_4709-300x300.png', 'phformula'],
    ['skinosophy', '2026/05/img_4715-300x300.jpg', 'skinosophy'],
    ['Cantabria Labs', '2026/03/img_4708-300x300.png', 'cantabria-labs'],
    ['Dermatime', '2026/03/img_4718-300x300.jpg', 'dermatime'],
    ['Diego dalla Palma', '2026/05/img_4716-300x300.jpg', 'diego-dalla-palma'],
    ['Founder', '2026/05/founder-logo-300x300.png', 'founder'],
    ['Gecko', '2026/03/img_4726-300x300.png', 'gecko'],
    ["Gerard's", '2026/03/img_4711.png', 'gerards'],
    ['Germaine de Capuccini', '2026/03/germaine-de-cap.png', 'germaine-de-capuccini'],
    ['Heliocare', '2026/05/img_4714-300x300.png', 'heliocare']
  ].map(([t, img, slug]) => ({ t, img: U + img, href: S + 'brand/' + slug + '/', k: logoK[slug], pos: `--k:${logoK[slug]};--x:${-100 * logoC[slug][0]}%;--y:${-100 * logoC[slug][1]}%` })),

  cats: [
    ['SPF- защита', '', '2026/04/img_6280-e1778000857952.jpg', 'product-category/sredstva-s-spf/'],
    ['Витамин C', '', '2026/04/img_6403-e1778000879246.jpg', 'product-category/vitamin-c/'],
    ['Анти-эйдж', '', '2026/04/img_6249-e1778000899501.jpg', 'sostoyanie-kozhi/antiejdzh/'],
    ['Готовые наборы', '', '2026/04/img_6245-e1778000926788.jpg', 'product-category/gotovye-nabory/'],
    ['Проблемная кожа', 'средства для кожи с высыпаниями и акне', '2026/04/img_7332-e1778000943585.jpg', 'sostoyanie-kozhi/problemnaya/'],
    ['Сухая кожа', 'средства для сухой кожи лица', '2026/04/img_7329-e1778000960629.jpg', 'sostoyanie-kozhi/suhaya/'],
    ['Чувствительная кожа', 'средства для чувствительной кожи лица', '2026/04/img_73341-e1778000974592.jpg', 'sostoyanie-kozhi/chuvstvitelnaya/'],
    ['Пигментация', 'средства для коррекции пигментных пятен', '2026/04/img_7333.jpg', 'sostoyanie-kozhi/pigmentacziya/']
  ].map(([t, d, img, p]) => ({ t, d, img: U + img, href: S + p })),

  products: [
    ['Натуральный гель для умывания 50 мл Natural Cleansing Gel Skinosophy', '40,00 Br', '2026/05/6___1__7-300x300.jpg', 'naturalnyj-gel-dlya-umyvaniya-50-ml-natural-cleansing-gel-skinosophy'],
    ['pHFormula C.R. Active Recovery Активная восстанавливающая сыворотка для чувствительной кожи, 15ml', '', '2026/05/action_4504861-300x300.png', 'phformula-c-r-active-recovery-aktivnaya-vosstanavlivayushhaya-syvorotka-dlya-chuvstvitelnoj-kozhi-15ml'],
    ['JW pro Velvet Powder LIGHT Защитная пудра (тон светлый), 16g', '180,00 Br', '2026/05/1111-300x300.webp', 'jw-pro-velvet-powder-ligh-zashhitnaya-pudra-ton-svetlyj-16g'],
    ['JW PRO Sebocomfort Cream Крем для комбинированной и жирной кожи, 50 мл', '145,00 Br', '2026/07/2026-07-07-12.05.33-300x300.jpg', 'sebocomfort-cream-jw-pro-krem-dlya-kombinirovannoj-i-zhirnoj-kozhi-50-ml'],
    ['JW Pro Longevity Peptide Serum Пептидная сыворотка, 30 мл', '187,00 Br', '2026/07/2026-07-07-12.06.54-300x300.jpg', 'jw-pro-longevity-peptide-serum-peptidnaya-syvorotka-30-ml'],
    ['Radiant Glow CC cream spf 30 (50 мл) Founder Cosmetics', '160,00 Br', '2026/06/medium_ss_cream_spf_30_444355a98d-300x300.png', 'radiant-glow-cc-cream-spf-30-50-ml-founder-cosmetics'],
    ['Deep Cleansing Foaming Gel Gel-to-Foam Гель для глубокого очищения 150 ml', '', '2026/06/29f0091-the-cleansing-expert-deep-cleansing-foaming-gel_white-bkgnd-300x300.jpg', 'deep-cleansing-foaming-gel-gel-to-foam-gel-dlya-glubokogo-ochishheniya-150-ml'],
    ['Comforting Hydrating Toner Лосьон увлажняющий 200 ml', '', '2026/06/29f0111-the-cleansing-expert-comforting-hydrating-toner_white-bkgnd-300x300.jpg', 'comforting-hydrating-toner-%c2%a0-loson-uvlazhnyayushhij-200ml'],
    ['Gecko SPF 50+ Солнцезащитный крем Sun Protect, 50 мл', '', '2026/06/2026-06-03-18.52.16-300x300.jpg', 'gec'],
    ['GERARD’S Caviar Mask Mashera Gel Viso Ristrutturante ad Effetto Sculp, 100ml', '147,00 Br', '2026/05/4-1-300x300.webp', 'gerards-caviar-mask-mashera-gel-viso-ristrutturante-ad-effetto-sculp-100ml-2']
  ].map(([t, price, img, slug]) => ({ t, price: price || 'Цену уточняйте', buy: !!price, img: U + img, href: S + 'product/' + slug + '/' })),

  banners: [
    { t: 'Консультация косметолога онлайн, оффлайн', cta: 'Записаться', href: 'https://t.me/grubnikovairina', img: U + '2026/04/image18.jpg' },
    { t: 'Подбор ухода', cta: 'Каталог', href: S + 'katalog/', img: U + '2026/04/image4.jpg' }
  ],

  posts: [
    ['Почему витамин С – это хорошо для вашей кожи?', 'Май 30, 2018', 'Если вы имеете дело с мимическими морщинами, пигментными пятнами и сухой кожей, которые могут...', '2018/05/img_05161-720x484.jpg', 'pochemu-vitamin-s-eto-horosho-dlya-vashej-kozhi'],
    ['Памятка по использованию SPF – защиты от солнца', 'Май 30, 2018', 'Выбирайте солнцезащитный крем широкого спектра, который будет защищать от UVA и UVB лучей. На...', '2018/05/img_6283-720x484.jpg', 'pamyatka-po-ispolzovaniyu-spf-zashhity-ot-solncza'],
    ['Сыворотки для лица – когда и зачем они нужны?', 'Май 30, 2018', 'Меня часто спрашивают: «Зачем нужны сыворотки, если есть крем?» и «Нужны ли они...', '2018/05/4093-720x484.jpg', 'syvorotki-dlya-licza-kogda-i-zachem-oni-nuzhny'],
    ['Использование ретинола. Памятка', 'Апр 14, 2026', 'Ввели ретинол, кислоты и кожа стала хуже. Появились новые морщинки, сухость и стянутость, а...', '2026/04/1000004747-720x442.jpg', 'ispolzovanie-retinola-pamyatka'],
    ['Почему домашний уход не помогает?', 'Апр 14, 2026', '«Чтобы увидеть эффект от домашнего ухода, нужно выбрать ретинол, пептиды и кислоты». Они...', '2026/04/1000004746-720x442.jpg', 'pochemu-domashnij-uhod-ne-pomogaet']
  ].map(([t, date, ex, img, slug]) => ({ t, date, ex, img: U + img, href: S + slug + '/' })),

  footer: {
    legal: [
      'ИП Грубникова Ирина Владимировна',
      'УНП 392026839',
      '220016, Республика Беларусь, г. Витебск, улица Шаврова, дом 34',
      'Свидетельство о государственной регистрации №0907091, выдано Администрацией Октябрьского района г. Витебска 30 января 2026 г.',
      'Интернет-магазин включен в Торговый реестр Республики Беларусь 22.05.2026 за № 777967'
    ],
    main: [
      ['Обо мне', 'obo-mne/'], ['FAQ', 'faq/'], ['Блог', 'blog/'], ['Доставка', 'dostavka/'], ['Оплата', 'oplata/'], ['Возврат', 'vozvrat/'],
      ['Политика конфиденциальности', ''], ['Политика обработки файлов cookie', ''], ['Публичная оферта', '']
    ].map(([t, p]) => ({ t, href: p ? S + p : '#' })),
    pay: [U + '2026/05/hutki-grosh.svg', U + '2026/05/epip.svg'],
    payStrip: U + '2020/01/logoirina-scaled-1.png',
    dev: { t: 'Разработка и продвижение', img: U + '2026/03/pirus-wh.png' }
  }
};

const icon = {
  search: '<svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="1.5" aria-hidden="true"><circle cx="11" cy="11" r="7"/><path d="m20 20-4-4"/></svg>',
  heart: '<svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="1.5" aria-hidden="true"><path d="M12 20s-7-4.4-7-10a4 4 0 0 1 7-2.6A4 4 0 0 1 19 10c0 5.600-7 10-7 10Z"/></svg>',
  bag: '<svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="1.5" aria-hidden="true"><path d="M5 8h14l-1 12H6L5 8Z"/><path d="M9 8V6a3 3 0 0 1 6 0v2"/></svg>',
  user: '<svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="1.5" aria-hidden="true"><circle cx="12" cy="8" r="4"/><path d="M4 21c1-4 4-6 8-6s7 2 8 6"/></svg>',
  ig: '<svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="1.600" aria-hidden="true"><rect x="3.500" y="3.500" width="17" height="17" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.200" cy="6.800" r=".8" fill="currentColor"/></svg>',
  tg: '<svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor" aria-hidden="true"><path d="M21.500 3.600 2.900 10.800c-.9.400-.9 1.600.1 1.900l4.600 1.500 1.800 5.500c.2.700 1.100.900 1.600.4l2.600-2.500 4.700 3.500c.6.400 1.400.1 1.600-.6L23 4.800c.2-.9-.7-1.600-1.500-1.200ZM9.800 14.300l8-6.300-6.300 7.400-.3 3.100-1.400-4.200Z"/></svg>',
  arrow: '<svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="1.5" aria-hidden="true"><path d="M4 12h16m-6-6 6 6-6 6"/></svg>',
  back: '<svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="1.5" aria-hidden="true"><path d="M20 12H4m6 6-6-6 6-6"/></svg>',
  phone: '<svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="1.600" aria-hidden="true"><path d="M5 3h4l2 5-2.500 1.500a12 12 0 0 0 6 6L16 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 5a2 2 0 0 1 2-2Z"/></svg>',
  mail: '<svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="1.600" aria-hidden="true"><rect x="3" y="5" width="18" height="14" rx="1"/><path d="m3 7 9 6 9-6"/></svg>',
  menu: '<svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="1.500" aria-hidden="true"><path d="M3 7h18M3 12h18M3 17h18"/></svg>'
};

const esc = s => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/"/g, '&quot;');

/* Плашка переключения вариантов – одинаковая на всех страницах */
const switcher = current => {
  const items = [['v1.html', 'Вариант 1'], ['v2.html', 'Вариант 2'], ['wow.html', 'WOW'], ['wow2.html', 'WOW 2'], ['index.html', 'Все']];
  return `<nav class="sw" aria-label="Варианты редизайна">${items.map(([h, t]) => `<a href="${h}"${h === current ? ' class="on"' : ''}>${t}</a>`).join('')}</nav>
<style>.sw{position:fixed;left:50%;bottom:16px;transform:translateX(-50%);z-index:9999;display:flex;gap:2px;padding:4px;border-radius:999px;background:rgba(20,22,18,.86);backdrop-filter:blur(10px);font:500 12px/1 Manrope,system-ui,sans-serif;box-shadow:0 8px 30px rgba(0,0,0,.25)}.sw a{padding:9px 14px;border-radius:999px;text-decoration:none;white-space:nowrap;color:#f4efe6}.sw a.on{background:#f4efe6;color:#1c1d1a}</style>`;
};

module.exports = { SC, icon, esc, switcher };
