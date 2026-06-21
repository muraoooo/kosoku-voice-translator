import { readFileSync } from 'node:fs';

const html = readFileSync(new URL('../index.html', import.meta.url), 'utf8');
const required = [
  'SpeechRecognition',
  'translate.googleapis.com',
  'detectLang',
  'switchPartnerLanguage',
  'startBrowserRecognition',
  'startDeepgram',
  '日本語',
  'English',
  '中文',
  '한국어'
];

const missing = required.filter((item) => !html.includes(item));

if (missing.length) {
  console.error(`Missing expected strings: ${missing.join(', ')}`);
  process.exit(1);
}

console.log('Smoke check passed');
