import { readFileSync } from 'node:fs';

const html = readFileSync(new URL('../index.html', import.meta.url), 'utf8');
const required = [
  'SpeechRecognition',
  'translate.googleapis.com',
  'switchDirection',
  'toggleHistory',
  'saveHistorySnapshot',
  'startBrowserRecognition',
  'startDeepgram',
  '日本語',
  'English'
];

const missing = required.filter((item) => !html.includes(item));

if (missing.length) {
  console.error(`Missing expected strings: ${missing.join(', ')}`);
  process.exit(1);
}

console.log('Smoke check passed');
