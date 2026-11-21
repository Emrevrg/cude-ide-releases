(() => {
  const I18N = window.CUDE_I18N || { meta: { en: { name: 'English', dir: 'ltr' } }, en: {} };
  const SUPPORTED = Object.keys(I18N.meta);
  const HTML_KEYS = new Set(['hero.title']);
  const nodes = [...document.querySelectorAll('[data-i18n]')];
  const altNodes = [...document.querySelectorAll('[data-i18n-alt]')];
  const ORIGINAL = new Map(nodes.map(n => [n, n.innerHTML]));
  const ORIGINAL_ALT = new Map(altNodes.map(n => [n, n.alt]));
  let lang = 'en';
  const t = key => (I18N[lang] && I18N[lang][key]) || (I18N.en && I18N.en[key]);
  function setLang(next) {
    lang = SUPPORTED.includes(next) ? next : 'en';
    const meta = I18N.meta[lang] || { dir: 'ltr' };
    document.documentElement.lang = lang; document.documentElement.dir = 'ltr'; document.documentElement.dataset.dir = meta.dir;
    for (const n of nodes) { const v = t(n.dataset.i18n); if (v === undefined) { n.innerHTML = ORIGINAL.get(n); continue; } if (HTML_KEYS.has(n.dataset.i18n)) n.innerHTML = v; else n.textContent = v; }
    for (const n of altNodes) { const v = t(n.dataset.i18nAlt); n.alt = v === undefined ? ORIGINAL_ALT.get(n) : v; }
    const sel = document.getElementById('lang'); if (sel) { sel.value = lang; sel.setAttribute('aria-label', t('lang.label') || 'Language'); }
    try { localStorage.setItem('cude-lang', lang); } catch {}
  }
  const sel = document.getElementById('lang');
  if (sel) {
    sel.replaceChildren(...SUPPORTED.map(code => { const o = document.createElement('option'); o.value = code; o.textContent = I18N.meta[code].name; return o; }));
    sel.addEventListener('change', () => setLang(sel.value));
  }
  setLang(window.CUDE_PICK_LANG ? window.CUDE_PICK_LANG(SUPPORTED) : 'en');

  const root = document.documentElement;
  try { const t = localStorage.getItem('cude-theme'); if (t) root.dataset.theme = t; } catch {}
  document.getElementById('theme').addEventListener('click', () => {
    const dark = root.dataset.theme ? root.dataset.theme === 'dark' : !matchMedia('(prefers-color-scheme: light)').matches;
    root.dataset.theme = dark ? 'light' : 'dark'; try { localStorage.setItem('cude-theme', root.dataset.theme); } catch {}
  });

  document.getElementById('copy-sha').addEventListener('click', async e => {
    const v = document.getElementById('sha').textContent.replace(/^SHA-256\s*/, '');
    if (!/^[0-9A-F]{64}$/i.test(v)) return;
    try { await navigator.clipboard.writeText(v); e.target.textContent = t('dl.copied') || 'Copied'; setTimeout(() => setLang(lang), 1500); } catch {}
  });

  if (!root.classList.contains('reduced')) {
    const io = new IntersectionObserver(es => es.forEach(en => { if (en.isIntersecting) { en.target.classList.add('in'); io.unobserve(en.target); } }), { threshold: .12 });
    document.querySelectorAll('.reveal').forEach(el => io.observe(el));
  }
})();
