# 高速翻訳

日本語、英語、簡体字中国語、繁体字中国語を、方向を選んで高速に翻訳するアプリです。
音声の自動仕分けはせず、選択した方向だけで聞き取りと翻訳を行います。

## 使い方

```bash
npm install
npm run start
```

ブラウザで `http://localhost:8765` を開きます。

- `開始`: 音声認識を開始
- `自動/高速/標準`: 音声認識エンジン切り替え
- 翻訳方向メニュー: 日本語、英語、簡体字中国語、繁体字中国語の方向を選択
- `履歴`: 横に履歴パネルを開き、1〜5分ごとに日本語だけ保存
- `−` / `＋`: 表示サイズを70〜110%で調整
- 手入力欄: Enterで即翻訳

翻訳方向を切り替えても、画面上の会話は消えません。各言語の列に並べ直します。

## 高速音声認識

Vercelに `DEEPGRAM_API_KEY` を設定すると、Deepgramのストリーミング認識を使います。
未設定でもChromeのブラウザ音声認識と手入力翻訳で動作します。
会話の精度を上げたい場合は、ブラウザ標準認識ではなく `DEEPGRAM_API_KEY` を入れた高速認識モードを使います。
ブラウザへマスターキーを出さないよう、サーバー側でDeepgramの一時JWTを発行します。

```bash
vercel env add DEEPGRAM_API_KEY production
vercel env add DEEPGRAM_API_KEY preview
```

## iPhone / iPad

本番URLはHTTPSなので、Safariで開いて `開始` を押すとマイク許可を出せます。
iPhone/iPadではホーム画面に追加したWebアプリより、Safariの通常タブで開く方が音声認識が安定します。
マイクが拒否された場合は、iOSの設定でSafariまたは使用中ブラウザのマイク許可をONにします。

## 確認

```bash
npm run check
```
