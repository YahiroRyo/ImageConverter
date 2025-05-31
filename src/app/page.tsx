import Image from 'next/image'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { 
  Shield, 
  Image as ImageIcon, 
  Smartphone, 
  Settings, 
  Zap, 
  Monitor,
  Lock,
  Download,
  ArrowRight,
  Check,
  Star,
  Info
} from 'lucide-react'
import { 
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { getImageFormats, getInputImageFormats, type ImageFormat } from '@/lib/image-formats'
import FormatListDialog, { categorizeFormats } from '@/components/format-list-dialog'

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20">
      {/* ヒーローセクション */}
      <section className="relative overflow-hidden py-20 lg:py-32">
        <div className="container mx-auto px-4">
          <div className="flex flex-col items-center text-center space-y-8">
            {/* ロゴとタイトル */}
            <div className="flex items-center gap-4 mb-4">
              <div className="flex items-center justify-center w-20 h-20 bg-primary/10 rounded-full p-3 shadow-lg">
                <Image 
                  src="/icon.png"
                  alt="Closed Image Converter"
                  width={64}
                  height={64}
                  className="rounded-full"
                  priority
                />
              </div>
              <div className="text-left">
                <h1 className="text-4xl lg:text-6xl font-bold tracking-tight">
                  Closed Image Converter
                </h1>
                <div className="flex items-center gap-2 mt-2">
                  <Badge variant="secondary" className="text-xs">
                    100% プライベート
                  </Badge>
                  <Badge variant="outline" className="text-xs">
                    無料
                  </Badge>
                </div>
              </div>
            </div>

            {/* メインコピー */}
            <div className="max-w-4xl space-y-4">
              <p className="text-xl lg:text-2xl text-muted-foreground">
                画像データをサーバーに送らない
              </p>
              <p className="text-2xl lg:text-3xl font-semibold text-primary">
                プライベート重視の画像変換ツール
              </p>
              <div className="flex items-center justify-center gap-2 text-green-600 bg-green-50/50 rounded-full px-4 py-2 border border-green-200">
                <Shield className="h-5 w-5" />
                <span className="font-medium">
                  画像はお使いの端末内でのみ処理されます
                </span>
              </div>
            </div>

            {/* CTA */}
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <Button asChild size="lg" className="text-lg px-8 py-6">
                <Link href="/converter">
                  <ImageIcon className="h-5 w-5 mr-2" />
                  いますぐ使ってみる
                  <ArrowRight className="h-5 w-5 ml-2" />
                </Link>
              </Button>
              <Button variant="outline" size="lg" className="text-lg px-8 py-6" asChild>
                <Link href="#features">
                  機能を詳しく見る
                </Link>
              </Button>
            </div>

            {/* 信頼性指標 */}
            <div className="flex flex-col sm:flex-row items-center gap-6 pt-8 text-sm text-muted-foreground">
              <div className="flex items-center gap-1 cursor-pointer hover:text-primary transition-colors">
                <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                <HomeFormatDialog 
                  buttonText="85種類の読み込み・92種類の出力に対応" 
                  showIcon={false}
                />
              </div>
              <div className="flex items-center gap-1">
                <Shield className="h-4 w-4 text-green-600" />
                <span>データを外部送信しません</span>
              </div>
              <div className="flex items-center gap-1">
                <Download className="h-4 w-4 text-blue-600" />
                <span>ソフトのインストール不要</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 特徴セクション */}
      <section id="features" className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold mb-4">
              Closed Image Converter が選ばれる理由
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              プライバシーを守りながら、簡単で高品質な画像変換を実現します
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* 完全プライベート */}
            <Card className="border-2 border-green-200 bg-green-50/50">
              <CardHeader className="text-center">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Shield className="h-8 w-8 text-green-600" />
                </div>
                <CardTitle className="text-green-800">🛡️ データを外部送信しません</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-center text-green-700">
                  画像データはお使いの端末から外に出ることがありません。すべての変換処理はブラウザ内で完結します。
                </CardDescription>
              </CardContent>
            </Card>

            {/* 豊富なフォーマット */}
            <Card>
              <CardHeader className="text-center">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <ImageIcon className="h-8 w-8 text-blue-600" />
                </div>
                <CardTitle>🖼️ 豊富なファイル形式に対応</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <CardDescription className="text-center">
                  JPEG、PNG、WEBP、RAW、HDRなど85種類の読み込み、92種類の出力に対応。RAWファイルからWeb形式まで幅広く変換できます。
                </CardDescription>
                <div className="flex justify-center">
                  <HomeFormatDialog />
                </div>
              </CardContent>
            </Card>

            {/* 簡単操作 */}
            <Card>
              <CardHeader className="text-center">
                <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Smartphone className="h-8 w-8 text-purple-600" />
                </div>
                <CardTitle>📱 ドラッグ＆ドロップで簡単</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-center">
                  ファイルをドラッグ＆ドロップするだけ。難しい操作は一切なく、どなたでも簡単にお使いいただけます。
                </CardDescription>
              </CardContent>
            </Card>

            {/* 高度な設定 */}
            <Card>
              <CardHeader className="text-center">
                <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Settings className="h-8 w-8 text-orange-600" />
                </div>
                <CardTitle>⚙️ 画質とサイズを調整可能</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-center">
                  画質の調整やサイズ変更など、用途に合わせて細かくカスタマイズできます。
                </CardDescription>
              </CardContent>
            </Card>

            {/* 高性能 */}
            <Card>
              <CardHeader className="text-center">
                <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Zap className="h-8 w-8 text-red-600" />
                </div>
                <CardTitle>🚀 プロ品質の変換技術</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-center">
                  ImageMagick WASM技術により、プロレベルの高品質な画像変換をブラウザで実現します。
                </CardDescription>
              </CardContent>
            </Card>

            {/* クロスプラットフォーム */}
            <Card>
              <CardHeader className="text-center">
                <div className="w-16 h-16 bg-indigo-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Monitor className="h-8 w-8 text-indigo-600" />
                </div>
                <CardTitle>💻 どんな端末でも利用可能</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-center">
                  Windows、Mac、スマートフォンなど、ブラウザがあればどの端末でも利用できます。
                </CardDescription>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* プライバシー強調セクション */}
      <section className="py-20 bg-gradient-to-r from-green-50 to-blue-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-8">
              <Lock className="h-10 w-10 text-green-600" />
            </div>
            <h2 className="text-3xl lg:text-4xl font-bold mb-6 text-green-800">
              プライバシーを最優先に考えています
            </h2>
            <div className="space-y-4 text-lg text-green-700">
              <p>
                他の画像変換サービスとは違い、Closed Image Converterは
                <strong className="text-green-800">画像データを一切外部に送信しません</strong>。
              </p>
              <p>
                変換処理はすべてお使いの端末内で行われるため、大切な写真や機密性の高い画像も
                安心してお使いいただけます。
              </p>
            </div>
            
            <div className="grid md:grid-cols-3 gap-6 mt-12">
              <div className="flex items-center gap-3 p-4 bg-white/70 rounded-lg">
                <Check className="h-6 w-6 text-green-600 flex-shrink-0" />
                <span className="text-green-800 font-medium">ログを一切保存しません</span>
              </div>
              <div className="flex items-center gap-3 p-4 bg-white/70 rounded-lg">
                <Check className="h-6 w-6 text-green-600 flex-shrink-0" />
                <span className="text-green-800 font-medium">データの外部送信なし</span>
              </div>
              <div className="flex items-center gap-3 p-4 bg-white/70 rounded-lg">
                <Check className="h-6 w-6 text-green-600 flex-shrink-0" />
                <span className="text-green-800 font-medium">ユーザー登録不要</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA セクション */}
      <section className="py-20">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-2xl mx-auto space-y-8">
            <h2 className="text-3xl lg:text-4xl font-bold">
              いますぐ安全な画像変換を始めましょう
            </h2>
            <p className="text-lg text-muted-foreground">
              ソフトのインストールやユーザー登録は必要ありません。
              ブラウザでそのままご利用いただけます。
            </p>
            <Button asChild size="lg" className="text-lg px-12 py-6">
              <Link href="/converter">
                <ImageIcon className="h-6 w-6 mr-2" />
                変換を開始する
                <ArrowRight className="h-6 w-6 ml-2" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* フッター */}
      <footer className="border-t bg-muted/30 py-12">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <Image 
                src="/icon.png"
                alt="Closed Image Converter"
                width={32}
                height={32}
                className="rounded-full"
              />
              <span className="font-semibold">Closed Image Converter</span>
            </div>
            <div className="flex items-center gap-4 text-sm text-muted-foreground">
              <span>ImageMagick WASM技術を使用</span>
              <span>•</span>
              <span>完全オープンソース</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}

// フォーマット詳細表示ダイアログ（ホームページ用）
function HomeFormatDialog({ buttonText = "対応フォーマット詳細", showIcon = true }: { buttonText?: string, showIcon?: boolean }) {
  return (
    <FormatListDialog 
      buttonText={buttonText}
      showIcon={showIcon}
    />
  )
}
