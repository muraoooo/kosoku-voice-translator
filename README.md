# 高速翻訳

日本語から英語、または英語から日本語へ、方向を選んで高速に翻訳するアプリです。
音声の自動仕分けはせず、選択した方向だけで聞き取りと翻訳を行います。

## 使い方

```bash
npm install
npm run start
```

ブラウザで `http://localhost:8765` を開きます。

- `開始`: 音声認識を開始
- `自動/高速/標準`: 音声認識エンジン切り替え
- `日本語→英語` / `英語→日本語`: 翻訳方向を切り替え
- `履歴`: 横に履歴パネルを開き、1〜5分ごとに会話を保存
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
