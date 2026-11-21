// node --test tests/  — language picking and translation completeness for the Cude IDE site.
const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const file = path.join(__dirname, '..', 'assets', 'i18n.js');
function load(langs, tz, search = '', saved = null) {
  global.window = {}; global.location = { search }; global.localStorage = { getItem: () => saved };
  Object.defineProperty(globalThis, 'navigator', { value: { languages: langs, language: langs[0] }, configurable: true, writable: true });
  global.Intl = { DateTimeFormat: () => ({ resolvedOptions: () => ({ timeZone: tz }) }) };
  delete require.cache[require.resolve(file)]; require(file);
  return window.CUDE_PICK_LANG(Object.keys(window.CUDE_I18N.meta));
}
test('language follows ?lang, saved choice, a non-English browser language, then the time-zone region', () => {
  assert.equal(load(['en-US'], 'Europe/Istanbul'), 'tr');
  assert.equal(load(['tr-TR'], 'America/New_York'), 'tr');
  assert.equal(load(['de-DE', 'en'], 'Europe/Istanbul'), 'de');
  assert.equal(load(['en-US'], 'America/New_York'), 'en');
  assert.equal(load(['en-GB'], 'Europe/Paris'), 'fr');
  assert.equal(load(['en-US'], 'Asia/Riyadh'), 'ar');
  assert.equal(load(['en-US'], 'Europe/Istanbul', '?lang=es'), 'es');
  assert.equal(load(['en-US'], 'Europe/Istanbul', '', 'ru'), 'ru');
  assert.equal(load(['ja-JP'], 'Asia/Tokyo'), 'en');
});
test('every text on the page is translated in every language', () => {
  load(['en'], 'UTC');
  const I = window.CUDE_I18N;
  const html = fs.readFileSync(path.join(__dirname, '..', 'index.html'), 'utf8');
  const keys = [...new Set([...html.matchAll(/data-i18n(?:-alt)?="([^"]+)"/g)].map(m => m[1]))];
  for (const lang of Object.keys(I.meta)) for (const k of keys) assert.ok(k in I[lang], `${lang} is missing ${k}`);
  assert.equal(I.meta.ar.dir, 'rtl');
});
