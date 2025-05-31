import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navigation from "@/components/navigation";
import { ThemeProvider } from "@/components/theme-provider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
}

export const metadata: Metadata = {
  title: {
    default: "Closed Image Converter - 完全プライベート画像変換",
    template: "%s | Closed Image Converter"
  },
  description: "サーバーに画像データを送信しない、100%クライアントサイドで動作する安心・安全な画像変換サービス。ImageMagick WASMを使用して85種類の読み込み・92種類の出力に対応。",
  keywords: [
    "画像変換",
    "画像フォーマット変換", 
    "プライベート",
    "オフライン",
    "ImageMagick",
    "WASM",
    "ブラウザ",
    "セキュア",
    "無料",
    "RAW現像",
    "JPEG",
    "PNG", 
    "WebP",
    "AVIF",
    "HEIC"
  ],
  authors: [{ name: "Closed Image Converter" }],
  creator: "Closed Image Converter",
  publisher: "Closed Image Converter",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    type: 'website',
    locale: 'ja_JP',
    url: 'https://cic.nexusolareth.uk',
    title: 'Closed Image Converter - 完全プライベート画像変換',
    description: 'サーバーに画像データを送信しない、100%クライアントサイドで動作する安心・安全な画像変換サービス。ImageMagick WASMを使用して85種類の読み込み・92種類の出力に対応。',
    siteName: 'Closed Image Converter',
    images: [
      {
        url: '/og-image.jpeg',
        width: 1200,
        height: 630,
        alt: 'Closed Image Converter - プライベート重視の画像変換ツール',
      },
      {
        url: '/og-image-square.jpeg', 
        width: 1200,
        height: 1200,
        alt: 'Closed Image Converter',
      }
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Closed Image Converter - 完全プライベート画像変換',
    description: 'サーバーに画像データを送信しない、100%クライアントサイドで動作する安心・安全な画像変換サービス。ImageMagick WASMを使用して85種類の読み込み・92種類の出力に対応。',
    images: ['/og-image.jpeg'],
    creator: '@closed_converter',
    site: '@closed_converter',
  },
  icons: {
    icon: [
      { url: '/icon.ico', sizes: 'any' },
      { url: '/icon.png', type: 'image/png', sizes: '32x32' },
    ],
    shortcut: '/icon.ico',
    apple: '/icon.png',
  },
  manifest: '/manifest.json',
  metadataBase: new URL('https://cic.nexusolareth.uk'),
  alternates: {
    canonical: 'https://cic.nexusolareth.uk',
  },
  category: 'technology',
  classification: 'Tools',
  other: {
    'format-detection': 'telephone=no',
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <Navigation />
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
