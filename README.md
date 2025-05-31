# Closed Image Converter

🔒 **完全プライベート画像変換サービス**

サーバーに画像データを送信しない、100%クライアントサイドで動作する安心・安全な画像変換アプリケーション

## ✨ 特徴

- 🛡️ **完全プライベート**: 画像データは一切サーバーに送信されません
- 🖼️ **豊富なフォーマット**: 85種類の読み込み、92種類の出力に対応
- 📱 **簡単操作**: ドラッグ&ドロップによる直感的な操作
- ⚙️ **高度な設定**: 品質調整とリサイズ機能
- 🚀 **高性能**: ImageMagick WASM技術による高品質変換
- 💻 **クロスプラットフォーム**: ブラウザがあればどこでも利用可能

## 🔐 プライバシー・セキュリティ

### 完全クライアントサイド処理
- アップロードされた画像は一切サーバーに送信されません
- すべての変換処理はお使いのブラウザ内で実行されます
- 変換処理中も変換後も、画像データは外部に送信されることはありません

### データの保護
- 画像データはお使いのデバイスから離れることはありません
- ネットワーク接続が不要（初回読み込み後）
- 機密性の高い画像も安心してご利用いただけます

## 🎯 対応フォーマット

### 📥 入力フォーマット（85種類）

画像フォーマットのみに限定し、動画・テキスト・フォントフォーマットは除外しています。

#### 主要な画像フォーマット
- **Web画像**: JPEG, PNG, WEBP, AVIF, GIF
- **次世代フォーマット**: JXL (JPEG XL), QOI, HEIC, HEIF

#### RAWフォーマット（28種類）
- **Canon**: CR2, CR3, CRW
- **Nikon**: NEF, NRW  
- **Sony**: ARW, SRF, SR2
- **Fuji**: RAF
- **Olympus**: ORF
- **Panasonic**: RW2
- **Pentax**: PEF
- **Samsung**: SRW
- **Epson**: ERF
- **Mamiya**: MEF
- **Minolta**: MRW, MDC
- **Hasselblad**: 3FR, FFF
- **Kodak**: DCR, K25, KDC
- **Leica**: RWL
- **Phase One**: IIQ
- **Sigma**: X3F
- **Adobe**: DNG (Digital Negative)

#### プロフェッショナル・印刷
- **Adobe**: PSD, PSB, AI, EPS
- **ドキュメント**: PDF, PDFA
- **印刷**: TIFF, TIFF64, PTIF
- **HDR/科学技術**: EXR, HDR, FITS, FTS, DPX, CIN

#### レガシー・特殊フォーマット
- **古典的**: BMP, TGA, PCX, SGI, SUN
- **ベクター**: SVG, SVGZ, MVG
- **アイコン**: ICO, CUR
- **ゲーム**: TIM, TM2, DDS
- **JPEG 2000**: J2K, J2C, JP2, JPC, JPM, JPT
- **Portable**: PBM, PGM, PPM, PAM, PNM
- **その他**: GIMP (XCF), MAC Paint, PALM など

### 📤 出力フォーマット（92種類）

出力は画像フォーマットに限定し、ユーザビリティを向上させています。動画、テキスト、フォントフォーマットは除外されています。

#### よく使用される出力フォーマット
- **Web最適化**: JPEG, PNG, WEBP, AVIF
- **次世代**: JXL, QOI  
- **プロ用途**: TIFF, PDF, PSD, EPS
- **ベクター**: SVG
- **アイコン**: ICO
- **レガシー**: BMP, TGA, GIF

#### 全対応出力フォーマット
基本画像フォーマット、次世代フォーマット、Adobe/プロフェッショナル、HDR/科学技術、JPEG 2000ファミリー、レガシー/特殊フォーマット、ベクターグラフィックス、Portableフォーマット、画像シーケンス、プリンター/FAX、ImageMagick固有フォーマットなど92種類に対応

*注意: 一部のRAWフォーマットは読み込み専用で、出力には対応していません。これは著作権・ライセンスの制約によるものです。*

## 🚀 開発環境

### 必要な環境
- Node.js 18以上
- pnpm

### セットアップ

```bash
# 依存関係のインストール
pnpm install

# 開発サーバーの起動
pnpm dev
```

## ⚠️ WASMの制限について

このアプリケーションは14MBのImageMagick WASMファイルを使用しているため、一部のブラウザで制限に遭遇する可能性があります。

#### Chrome/Edgeでの開発時

もしWASMの初期化エラーが発生する場合は、以下のフラグでブラウザを起動してください：

```bash
# Chrome
google-chrome --enable-features=WebAssemblyUnlimitedSyncCompilation

# Edge
microsoft-edge --enable-features=WebAssemblyUnlimitedSyncCompilation
```

## 🛠️ 技術スタック

- **Frontend**: Next.js 15, React 19, TypeScript
- **UI**: shadcn/ui, TailwindCSS, Lucide React
- **画像処理**: @imagemagick/magick-wasm
- **ファイル操作**: react-dropzone

## 📝 ライセンス

MIT
