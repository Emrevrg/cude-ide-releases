(() => {
  const TR = {
    'skip':'İçeriğe geç',
    'nav.features':'Özellikler','nav.providers':'Sağlayıcılar','nav.agents':'Ajanlar','nav.download':'İndir','nav.faq':'SSS','nav.get':'İndir',
    'hero.badge':'Sürüm 0.1.0 · Windows x64','hero.title':'İşi <em>yapay zekânın</em> yaptığı kod editörü.',
    'hero.lead':'Kullandığın model sağlayıcısını bağla, büyük işleri bir ajan ekibine ver, ajanın tarayıcını ve araçlarını kullanmasına izin ver. Her adım senin onayını bekler.',
    'hero.download':'Windows için indir','hero.tour':'Neler yapıyor','hero.meta':'Ücretsiz · Tek kurulum dosyası · API anahtarların Windows güvenli deposunda kalır',
    'feat.kicker':'Her şey tek pencerede','feat.title':'Gösteri için değil, gerçek iş için.','feat.sub':'Projeni anlayan bir yapay zekâ paneline sahip tam bir Code-OSS editörü. Dosyaları doğrudan yazar, her değişiklik için geri alma tutar.',
    'f1.t':'Projeyi bilen sohbet','f1.p':'Dosyalarını ve proje kurallarını okur; Auto modunda değişiklikleri doğrudan klasörlerine yazar ve tek tıkla geri alınır.',
    'f2.t':'Cuets çoklu ajan','f2.p':'Planlayıcı, paralel çalışanlar ve denetçi büyük bir işi böler, tur tur takip eder ve proje kontrolleri geçince durur.',
    'f3.t':'Tarayıcı ve bilgisayar araçları','f3.p':'MCP ile ajan sayfa açar, tıklar, yazar ve görüntü alır. Tek canlı oturumda, her çağrı senin onayınla.',
    'f4.t':'Her sağlayıcı, yerel modeller','f4.p':'Bulut sağlayıcıları ve OpenAI uyumlu her uç nokta; ayrıca Hugging Face GGUF modellerini indirip llama.cpp ile bilgisayarında çalıştırma.',
    'f5.t':'Ses','f5.p':'Mikrofonla yazdır, yanıtları dilindeki Windows sesiyle dinle. Ek kurulum gerekmez.',
    'f6.t':'Varsayılan olarak güvenli','f6.p':'Anahtarlar işletim sisteminin güvenli deposunda; komutlar, araç çağrıları ve tam erişim her zaman önce sorar.',
    'prod.alt':'Ajanın tarayıcı araçlarını kullandığı Cude IDE',
    'pr.kicker':'Senin modellerin, senin anahtarların','pr.title':'Güvendiğin sağlayıcıyı getir.','pr.sub':'Sağlayıcıyı seç, anahtarı yapıştır; Cude modelleri ve düşünme seviyelerini listeler. Akış, yeniden deneme ve anlaşılır hata mesajları hazır.',
    'pr.local':'Yerel GGUF (llama.cpp)','pr.more':'+ OpenAI uyumlu her API',
    'ag.kicker':'İşi bitiren ajanlar','ag.title':'Bütün görevi ver.','ag.sub':'Cuets isteği bir kontrol listesine böler, çalışanları paralel yürütür ve "bitti" demeden önce sonucu kendi test komutunla doğrular.',
    'ag.l1':'Uzun görevler projeye kaydedilir ve devam ettirilebilir','ag.l2':'Tur ve süre bütçeleri; hiçbir şey sonsuza kadar çalışmaz','ag.l3':'Yerel ajanlarla da çalışır: Codex, Claude Code, OpenCode, Gemini CLI, Qwen Code',
    'dl.kicker':'İndir','dl.title':'Cude IDE 0.1.0\'ı indir','dl.sub':'Tek bir kurulum dosyası. Kurulum yalnız senin kullanıcı klasörüne yapılır, yönetici izni gerekmez.',
    'dl.req':'Windows 10 veya 11 (64 bit) · 4 GB RAM veya üzeri','dl.version':'Sürüm','dl.size':'Boyut','dl.type':'Tür','dl.button':'CudeIDE-Setup-0.1.0-x64.exe indir','dl.copy':'Kopyala',
    'dl.how':'Nasıl başlanır','dl.s1':'Kurulum dosyasını çalıştır. Windows SmartScreen uyarısı çıkarsa "Ek bilgi" → "Yine de çalıştır".','dl.s2':'Cude IDE başlat menüsünde ve masaüstünde açılır.','dl.s3':'Bir proje aç, klasöre güven ve model menüsünden bir sağlayıcı bağla.','dl.s4':'İsteğe bağlı: indirmeyi PowerShell ile doğrula',
    'faq.title':'Sorular','q1':'Cude IDE ücretsiz mi?','a1':'Evet. Yalnız kendi anahtarındaki kullanım için model sağlayıcına ödersin; yerel modeller ve yerel ajanlar kendi kaynaklarını kullanır.',
    'q2':'API anahtarlarım nerede saklanıyor?','a2':'Editörün gizli depolaması üzerinden Windows güvenli kimlik deposunda. Proje dosyalarına yazılmaz ve seçtiğin sağlayıcı dışında hiçbir yere gönderilmez.',
    'q3':'Ajan sormadan bir şey değiştirebilir mi?','a3':'Auto modunda dosya düzenlemelerini yazar ve geri alma tutar. Terminal komutları, MCP araç çağrıları ve araç süreçlerini başlatmak her zaman önce sorar; Salt okunur ve Plan modları hiç yazmaz.',
    'q4':'Windows neden uyarı gösteriyor?','a4':'0.1.0 kurulum dosyası henüz kod imzalı değil; bu yüzden SmartScreen ilk açılışta uyarabilir. Dosyanın bozulmadığını yukarıdaki SHA-256 değeriyle doğrulayabilirsin.',
    'q5':'Neyin üzerine kurulu?','a5':'Cude IDE, açık kaynak Code-OSS editörü (VSCodium üzerinden) ile Cude\'un kendi yapay zekâ eklentisi, teması ve ayarları üzerine kuruludur. MIT lisansı ve üçüncü taraf bildirimleri uygulamayla gelir.',
    'q6':'Mac ya da Linux?','a6':'0.1.0 yalnız Windows x64 içindir. Diğer platformlar planlanıyor.',
    'foot.note':'Code-OSS ve VSCodium MIT lisanslıdır. Cude, Microsoft ile bağlantılı değildir.'
  };
  const HTML_KEYS = new Set(['hero.title']);
  const nodes = [...document.querySelectorAll('[data-i18n]')];
  const EN = new Map(nodes.map(n => [n, n.innerHTML]));
  const altNodes = [...document.querySelectorAll('[data-i18n-alt]')];
  const EN_ALT = new Map(altNodes.map(n => [n, n.alt]));
  let lang = 'en';
  function setLang(next) {
    lang = next; document.documentElement.lang = lang;
    for (const n of nodes) { const k = n.dataset.i18n; if (lang === 'tr' && TR[k]) { if (HTML_KEYS.has(k)) n.innerHTML = TR[k]; else n.textContent = TR[k]; } else n.innerHTML = EN.get(n); }
    for (const n of altNodes) n.alt = lang === 'tr' && TR[n.dataset.i18nAlt] ? TR[n.dataset.i18nAlt] : EN_ALT.get(n);
    const b = document.getElementById('lang'); b.textContent = lang === 'tr' ? 'EN' : 'TR'; b.setAttribute('aria-label', lang === 'tr' ? 'Switch to English' : 'Türkçeye geç');
    try { localStorage.setItem('cude-lang', lang); } catch {}
  }
  let saved = null; try { saved = localStorage.getItem('cude-lang'); } catch {}
  const q = new URLSearchParams(location.search).get('lang');
  setLang(q === 'tr' || q === 'en' ? q : saved || ((navigator.language || '').toLowerCase().startsWith('tr') ? 'tr' : 'en'));
  document.getElementById('lang').addEventListener('click', () => setLang(lang === 'tr' ? 'en' : 'tr'));

  const root = document.documentElement;
  try { const t = localStorage.getItem('cude-theme'); if (t) root.dataset.theme = t; } catch {}
  document.getElementById('theme').addEventListener('click', () => {
    const dark = root.dataset.theme ? root.dataset.theme === 'dark' : !matchMedia('(prefers-color-scheme: light)').matches;
    root.dataset.theme = dark ? 'light' : 'dark'; try { localStorage.setItem('cude-theme', root.dataset.theme); } catch {}
  });

  document.getElementById('copy-sha').addEventListener('click', async e => {
    const v = document.getElementById('sha').textContent.replace(/^SHA-256\s*/, '');
    if (!/^[0-9A-F]{64}$/i.test(v)) return;
    try { await navigator.clipboard.writeText(v); e.target.textContent = lang === 'tr' ? 'Kopyalandı' : 'Copied'; setTimeout(() => setLang(lang), 1500); } catch {}
  });

  if (!root.classList.contains('reduced')) {
    const io = new IntersectionObserver(es => es.forEach(en => { if (en.isIntersecting) { en.target.classList.add('in'); io.unobserve(en.target); } }), { threshold: .12 });
    document.querySelectorAll('.reveal').forEach(el => io.observe(el));
  }
})();
