# 高速多言語翻訳

日本語で話すと相手の言語へ、相手が話すと日本語へ返す、対面用の高速翻訳アプリです。
相手の言語は `English` / `中文(台湾)` / `한국어` を切り替えできます。

## 使い方

```bash
npm install
npm run start
```

ブラウザで `http://localhost:8765` を開きます。

- `開始`: 音声認識を開始
- `自動/高速/標準`: 音声認識エンジン切り替え
- `English/中文/한국어`: 相手の母国語を切り替え
- 中央ステータス: 聞き取りヒントを `自動判定` / `日本語優先` / `相手語優先` で切り替え
- `上下`: 対面レイアウト
- 手入力欄: Enterで即翻訳

## 高速音声認識

Vercelに `DEEPGRAM_API_KEY` を設定すると、Deepgramのストリーミング認識を使います。
未設定でもChromeのブラウザ音声認識と手入力翻訳で動作します。

```bash
vercel env add DEEPGRAM_API_KEY production
vercel env add DEEPGRAM_API_KEY preview
```

## 確認

```bash
npm run check
```
