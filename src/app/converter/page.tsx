import { Metadata } from 'next'
import ImageConverter from '@/components/image-converter'
import StructuredData from '@/components/structured-data'

export const metadata: Metadata = {
  title: '画像変換ツール - Closed Image Converter',
  description: '85種類の読み込み・92種類の出力に対応した完全プライベートな画像変換ツール。RAW、JPEG、PNG、WebP、AVIF、HEICなど様々なフォーマットに変換可能。データは外部に送信されません。',
  keywords: [
    '画像変換',
    '画像コンバーター',
    'RAW現像',
    'フォーマット変換',
    'JPEG変換',
    'PNG変換',
    'WebP変換',
    'AVIF変換',
    'HEIC変換',
    'オンライン変換',
    'プライベート',
    'セキュア'
  ],
  openGraph: {
    title: '画像変換ツール - Closed Image Converter',
    description: '85種類の読み込み・92種類の出力に対応した完全プライベートな画像変換ツール。RAW、JPEG、PNG、WebP、AVIF、HEICなど様々なフォーマットに変換可能。',
    url: 'https://cic.nexusolareth.uk/converter',
    images: [
      {
        url: '/og-image-converter.jpeg',
        width: 1200,
        height: 630,
        alt: '画像変換ツール - 様々なフォーマットに対応',
      }
    ],
  },
  twitter: {
    title: '画像変換ツール - Closed Image Converter',
    description: '85種類の読み込み・92種類の出力に対応した完全プライベートな画像変換ツール。RAW、JPEG、PNG、WebP、AVIF、HEICなど様々なフォーマットに変換可能。',
    images: ['/og-image-converter.jpeg'],
  },
  alternates: {
    canonical: 'https://cic.nexusolareth.uk/converter',
  },
}

export default function ConverterPage() {
  return (
    <>
      <StructuredData 
        pageType="tool"
        pageUrl="https://cic.nexusolareth.uk/converter"
        pageTitle="画像変換ツール - Closed Image Converter"
        pageDescription="85種類の読み込み・92種類の出力に対応した完全プライベートな画像変換ツール。RAW、JPEG、PNG、WebP、AVIF、HEICなど様々なフォーマットに変換可能。データは外部に送信されません。"
      />
      <main className="min-h-screen bg-background">
        <ImageConverter />
      </main>
    </>
  );
}
