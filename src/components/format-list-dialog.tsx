'use client'

import React from 'react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Info, ImageIcon } from 'lucide-react'
import { getImageFormats, getInputImageFormats, type ImageFormat } from '@/lib/image-formats'
import { 
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'

// フォーマットをカテゴリ別に分類するユーティリティ関数
export const categorizeFormats = (formats: ImageFormat[]) => {
  const categories: Record<string, ImageFormat[]> = {
    'Web画像': [],
    '次世代': [],
    'RAW': [],
    'プロフェッショナル': [],
    'HDR/科学技術': [],
    'ベクター': [],
    'レガシー': [],
    'その他': []
  }

  formats.forEach(format => {
    const fmt = format.format
    if (['JPEG', 'JPG', 'PNG', 'WEBP', 'GIF', 'BMP'].includes(fmt)) {
      categories['Web画像'].push(format)
    } else if (['JXL', 'QOI', 'AVIF', 'HEIC', 'HEIF', 'APNG'].includes(fmt)) {
      categories['次世代'].push(format)
    } else if (['CR2', 'CR3', 'CRW', 'NEF', 'ARW', 'DNG', 'RAF', 'ORF', 'RW2', 'PEF', 'SRW', 'ERF', 'MEF', 'MRW', '3FR', 'NRW', 'IIQ', 'X3F', 'K25', 'KDC', 'DCR', 'RWL', 'FFF', 'STI', 'SR2', 'SRF', 'MOS', 'MDC'].includes(fmt)) {
      categories['RAW'].push(format)
    } else if (['PSD', 'PSB', 'AI', 'EPS', 'PDF', 'PDFA', 'TIFF', 'TIFF64', 'PTIF'].includes(fmt)) {
      categories['プロフェッショナル'].push(format)
    } else if (['EXR', 'HDR', 'FITS', 'FTS', 'DPX', 'CIN'].includes(fmt)) {
      categories['HDR/科学技術'].push(format)
    } else if (['SVG', 'SVGZ', 'MVG'].includes(fmt)) {
      categories['ベクター'].push(format)
    } else if (['TGA', 'PCX', 'XBM', 'XPM', 'ICO', 'CUR', 'DDS', 'SGI', 'SUN', 'RAS', 'MTV'].includes(fmt)) {
      categories['レガシー'].push(format)
    } else {
      categories['その他'].push(format)
    }
  })

  return categories
}

interface FormatListProps {
  categories: Record<string, ImageFormat[]>
  title: string
}

const FormatList = ({ categories, title }: FormatListProps) => (
  <div className="space-y-6">
    <div className="text-center space-y-2">
      <h3 className="text-lg font-semibold">{title}</h3>
      <p className="text-sm text-muted-foreground">
        {Object.values(categories).flat().length}種類のフォーマットに対応
      </p>
    </div>
    
    <div className="space-y-4 max-h-96 overflow-y-auto custom-scrollbar">
      {Object.entries(categories).map(([categoryName, formats]) => 
        formats.length > 0 && (
          <div key={categoryName} className="space-y-2">
            <h4 className="font-medium text-sm text-primary border-b border-border pb-1">
              {categoryName} ({formats.length}種類)
            </h4>
            <div className="grid grid-cols-1 gap-1">
              {formats.map((format) => (
                <div key={format.format} className="flex items-start gap-2 p-2 rounded hover:bg-muted/50 transition-colors">
                  <Badge variant="outline" className="text-xs font-mono min-w-fit">
                    {format.format}
                  </Badge>
                  <span className="text-xs text-muted-foreground leading-relaxed">
                    {format.description}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )
      )}
    </div>
  </div>
)

interface FormatListDialogProps {
  buttonText?: string
  showIcon?: boolean
}

export default function FormatListDialog({ 
  buttonText = "詳細を見る", 
  showIcon = true 
}: FormatListDialogProps) {
  const readableFormats = getInputImageFormats()
  const writableFormats = getImageFormats()
  
  const inputCategories = categorizeFormats(readableFormats)
  const outputCategories = categorizeFormats(writableFormats)

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="ghost" size="sm" className="h-auto p-1 text-blue-600 hover:text-blue-700">
          {showIcon && <Info className="h-4 w-4 mr-1" />}
          {buttonText}
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-4xl max-h-[80vh]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <ImageIcon className="h-5 w-5" />
            対応フォーマット一覧
          </DialogTitle>
          <DialogDescription>
            Closed Image Converterで対応している全フォーマットの詳細リストです
          </DialogDescription>
        </DialogHeader>
        
        <Tabs defaultValue="input" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="input">📥 入力対応 ({readableFormats.length})</TabsTrigger>
            <TabsTrigger value="output">📤 出力対応 ({writableFormats.length})</TabsTrigger>
          </TabsList>
          
          <TabsContent value="input" className="mt-4">
            <FormatList 
              categories={inputCategories} 
              title="入力対応フォーマット"
            />
          </TabsContent>
          
          <TabsContent value="output" className="mt-4">
            <FormatList 
              categories={outputCategories} 
              title="出力対応フォーマット"
            />
            <div className="mt-4 p-3 bg-orange-50 rounded-lg border border-orange-200">
              <p className="text-sm text-orange-800">
                <strong>注意:</strong> RAWフォーマットは読み込み専用です。著作権・ライセンスの制約により、RAW形式での出力はサポートしていません。
              </p>
            </div>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  )
} 