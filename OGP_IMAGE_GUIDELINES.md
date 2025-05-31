# OGP画像作成ガイドライン

## 必要な画像

### 1. メインOGP画像 (`/public/og-image.jpeg`)
- **サイズ**: 1200x630px
- **用途**: Facebook、Twitter、LinkedIn等のメイン共有画像

### 2. 正方形OGP画像 (`/public/og-image-square.jpeg`)
- **サイズ**: 1200x1200px  
- **用途**: 一部のSNSで正方形表示される場合用

### 3. 変換ツール専用OGP画像 (`/public/og-image-converter.jpeg`)
- **サイズ**: 1200x630px
- **用途**: `/converter`ページ専用

## デザイン仕様

### カラーパレット
```
プライマリ: #10b981 (emerald-500) - プライバシー重視のグリーン
セカンダリ: #f3f4f6 (gray-100) - 背景用ライトグレー  
テキスト: #1f2937 (gray-800) - メインテキスト
アクセント: #3b82f6 (blue-500) - アクセント用ブルー
警告: #ef4444 (red-500) - エラー・注意喚起用
```

### レイアウト要素

#### メインOGP画像 (`og-image.jpeg`)
```
背景: 白からライトグリーンのグラデーション
ロゴ: Closed Image Converterアイコン（左上）
メインタイトル: "Closed Image Converter"
サブタイトル: "完全プライベート画像変換"
キーメッセージ: "画像データを外部送信しない安心・安全なツール"
特徴: "85種類読込・92種類出力対応" 
プライバシーアイコン: 盾マーク（右下）
```

#### 変換ツール画像 (`og-image-converter.jpeg`)
```
背景: テクノロジー感のあるグラデーション
メインタイトル: "画像変換ツール"
特徴: "RAW・JPEG・PNG・WebP・AVIF・HEIC対応"
視覚要素: 様々な画像フォーマットのアイコン
プライバシー強調: "データは端末内でのみ処理"
```

#### 正方形画像 (`og-image-square.jpeg`)
```
中央配置: Closed Image Converterロゴ
サブテキスト: "プライベート画像変換"
シンプルな背景: ブランドカラーのグラデーション
```

## フォント推奨
- **メインタイトル**: 太字・大きめ（日本語フォント推奨）
- **サブタイトル**: 中太・中サイズ  
- **説明文**: レギュラー・小サイズ

## 注意事項
1. **セーフゾーン**: 各辺から60px程度マージンを取る
2. **視認性**: 文字は背景とのコントラストを十分に確保
3. **一貫性**: ブランドカラーとフォントを統一
4. **モバイル対応**: 小さな画面でも読めるサイズにする
5. **圧縮最適化**: ファイルサイズは可能な限り小さく（推奨: 500KB以下）

## 作成ツール推奨
- Figma
- Canva  
- Adobe Photoshop
- GIMP（無料）

## 確認方法
作成後は以下のツールで表示確認：
- [Facebook Sharing Debugger](https://developers.facebook.com/tools/debug/)
- [Twitter Card Validator](https://cards-dev.twitter.com/validator)
- [OGP画像シミュレータ](http://ogimage.tsmallfield.com/) 