# HIBIKI Portfolio

Instagram、画像、PDFを掲載できる1ページ構成のポートフォリオサイトです。

## 内容の変更

- 名前・プロフィール・作品説明: `index.html` の文章を直接変更
- TOP画像: `assets/kaze-ni-fukarete.jpg`
- ロゴ: `assets/pibicco-logo-black.png` / `assets/pibicco-logo-white.png`
- 連絡先: InstagramとLINEのみ掲載（メールアドレス・携帯番号は非掲載）
- Instagram: `data-instgrm-permalink` と、その中のリンクを投稿URLへ変更。現在は7投稿を掲載
- PDF原本: `assets/pdfs/` に保管（サイト上では表紙プレビューのみ表示）
- 画像: `assets/` に画像を配置し、作品カード内の `.work-visual` に `<img src="./assets/画像名.jpg" alt="作品の説明">` を追加

## 確認方法

`index.html` をブラウザで開くか、ローカルサーバーを起動します。

```sh
python3 -m http.server 8000
```

その後 `http://localhost:8000` を開いてください。Instagramの表示にはインターネット接続が必要です。
