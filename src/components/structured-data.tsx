import Script from 'next/script'

interface StructuredDataProps {
  pageType?: 'website' | 'webapp' | 'tool'
  pageUrl?: string
  pageTitle?: string
  pageDescription?: string
}

export default function StructuredData({ 
  pageType = 'website',
  pageUrl = 'https://cic.nexusolareth.uk',
  pageTitle = 'Closed Image Converter - 完全プライベート画像変換',
  pageDescription = 'サーバーに画像データを送信しない、100%クライアントサイドで動作する安心・安全な画像変換サービス。ImageMagick WASMを使用して85種類の読み込み・92種類の出力に対応。'
}: StructuredDataProps) {
  
  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "Closed Image Converter",
    "description": "完全プライベート画像変換サービス",
    "url": "https://cic.nexusolareth.uk",
    "logo": "https://cic.nexusolareth.uk/icon.png",
    "sameAs": []
  }

  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "Closed Image Converter",
    "description": pageDescription,
    "url": pageUrl,
    "potentialAction": {
      "@type": "SearchAction",
      "target": {
        "@type": "EntryPoint",
        "urlTemplate": "https://cic.nexusolareth.uk/converter"
      },
      "query-input": "required name=search_term_string"
    }
  }

  const webApplicationSchema = pageType === 'webapp' || pageType === 'tool' ? {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "name": pageTitle,
    "description": pageDescription,
    "url": pageUrl,
    "applicationCategory": "UtilityApplication",
    "operatingSystem": "Web Browser",
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "JPY"
    },
    "featureList": [
      "85種類の画像フォーマット読み込み対応",
      "92種類の画像フォーマット出力対応", 
      "完全クライアントサイド処理",
      "プライバシー保護",
      "無料利用",
      "RAW画像対応",
      "HEIC/AVIF/WebP対応"
    ],
    "browserRequirements": "Requires JavaScript. Requires HTML5.",
    "softwareVersion": "1.0",
    "author": {
      "@type": "Organization",
      "name": "Closed Image Converter"
    }
  } : null

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Home",
        "item": "https://cic.nexusolareth.uk"
      },
      ...(pageUrl.includes('/converter') ? [{
        "@type": "ListItem",
        "position": 2,
        "name": "画像変換ツール",
        "item": "https://cic.nexusolareth.uk/converter"
      }] : [])
    ]
  }

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "画像データは外部に送信されますか？",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "いいえ、画像データは一切外部に送信されません。すべての変換処理はお使いの端末内（ブラウザ）で完結します。"
        }
      },
      {
        "@type": "Question", 
        "name": "どのような画像フォーマットに対応していますか？",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "85種類の読み込みフォーマットと92種類の出力フォーマットに対応しています。JPEG、PNG、WebP、AVIF、HEIC、RAW画像など幅広く対応しています。"
        }
      },
      {
        "@type": "Question",
        "name": "利用料金はかかりますか？",
        "acceptedAnswer": {
          "@type": "Answer", 
          "text": "完全無料でご利用いただけます。アカウント登録も不要です。"
        }
      },
      {
        "@type": "Question",
        "name": "ソフトウェアのインストールは必要ですか？",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "いいえ、ソフトウェアのインストールは不要です。Webブラウザがあればどなたでもご利用いただけます。"
        }
      }
    ]
  }

  return (
    <>
      <Script
        id="organization-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(organizationSchema)
        }}
      />
      <Script
        id="website-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(websiteSchema)
        }}
      />
      {webApplicationSchema && (
        <Script
          id="webapp-schema"
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(webApplicationSchema)
          }}
        />
      )}
      <Script
        id="breadcrumb-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(breadcrumbSchema)
        }}
      />
      {pageUrl === 'https://cic.nexusolareth.uk' && (
        <Script
          id="faq-schema"
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(faqSchema)
          }}
        />
      )}
    </>
  )
} 