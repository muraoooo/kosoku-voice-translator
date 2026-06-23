import { readFileSync } from 'node:fs';

const html = readFileSync(new URL('../index.html', import.meta.url), 'utf8');
const tokenApi = readFileSync(new URL('../api/token.js', import.meta.url), 'utf8');
const source = `${html}\n${tokenApi}`;
const required = [
  'SpeechRecognition',
  'translate.googleapis.com',
  'prepareSpeechStart',
  'speechUnsupportedMessage',
  'isIOSDevice',
  'switchDirection',
  'selectDirection',
  'toggleHistory',
  'saveHistorySnapshot',
  'changeDisplayScale',
  'scaleLabel',
  'startBrowserRecognition',
  'startDeepgram',
  'auth/grant',
  'zh-CN',
  'zh-TW',
  '简体中文',
  '繁體中文',
  '日本語',
  'English'
];

const missing = required.filter((item) => !source.includes(item));

if (missing.length) {
  console.error(`Missing expected strings: ${missing.join(', ')}`);
  process.exit(1);
}

console.log('Smoke check passed');
