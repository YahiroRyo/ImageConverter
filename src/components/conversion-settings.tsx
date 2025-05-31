'use client'

import React, { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Slider } from '@/components/ui/slider'
import { Switch } from '@/components/ui/switch'
import { Progress } from '@/components/ui/progress'
import { Badge } from '@/components/ui/badge'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem } from '@/components/ui/command'
import { Settings, ChevronsUpDown, Check } from 'lucide-react'
import { cn } from '@/lib/utils'
import { getImageFormats, POPULAR_FORMATS, type ImageFormat } from '@/lib/image-formats'

export interface ConversionSettings {
  quality: number[]
  enableResize: boolean
  resizeWidth: string
  resizeHeight: string
  maintainAspectRatio: boolean
}

interface ConversionSettingsProps {
  settings: ConversionSettings
  onSettingsChange: (settings: ConversionSettings) => void
  outputFormat: string
  onFormatChange: (format: string) => void
  isConverting: boolean
  progress: number
  onConvert: () => void
}

export default function ConversionSettingsPanel({
  settings,
  onSettingsChange,
  outputFormat,
  onFormatChange,
  isConverting,
  progress,
  onConvert
}: ConversionSettingsProps) {
  const [formatSelectorOpen, setFormatSelectorOpen] = useState(false)
  
  const updateSetting = <K extends keyof ConversionSettings>(
    key: K,
    value: ConversionSettings[K]
  ) => {
    onSettingsChange({
      ...settings,
      [key]: value
    })
  }

  const imageFormats = getImageFormats()
  
  // 人気フォーマットとその他のフォーマットに分ける
  const popularImageFormats = imageFormats.filter(format => 
    POPULAR_FORMATS.includes(format.format)
  )
  const otherImageFormats = imageFormats.filter(format => 
    !POPULAR_FORMATS.includes(format.format)
  )

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Settings className="h-5 w-5" />
          変換設定
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* 出力フォーマット選択 */}
        <div className="space-y-2">
          <Label htmlFor="format">出力フォーマット</Label>
          <Popover open={formatSelectorOpen} onOpenChange={setFormatSelectorOpen} modal={false}>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                role="combobox"
                aria-expanded={formatSelectorOpen}
                className="w-full justify-between"
              >
                {outputFormat ? (
                  <div className="flex items-center gap-2">
                    <Badge variant="secondary" className="text-xs">{outputFormat}</Badge>
                    <span className="text-sm">
                      {imageFormats.find(format => format.format === outputFormat)?.description || outputFormat}
                    </span>
                  </div>
                ) : (
                  "フォーマットを選択..."
                )}
                <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-[600px] p-0" style={{ zIndex: 50 }}>
              <Command className="max-h-[400px]">
                <CommandInput placeholder="フォーマットを検索... (例: jpeg, png, pdf, webp)" />
                <CommandEmpty>フォーマットが見つかりません</CommandEmpty>
                
                <div className="max-h-[320px] overflow-y-auto custom-scrollbar">
                  {/* 人気フォーマット */}
                  <CommandGroup heading="🔥 人気フォーマット">
                    {popularImageFormats.map((format) => (
                      <CommandItem
                        key={format.format}
                        value={`${format.format} ${format.description}`}
                        onSelect={() => {
                          onFormatChange(format.format)
                          setFormatSelectorOpen(false)
                        }}
                      >
                        <Check
                          className={cn(
                            "mr-2 h-4 w-4",
                            outputFormat === format.format ? "opacity-100" : "opacity-0"
                          )}
                        />
                        <div className="flex items-center gap-2">
                          <Badge variant="secondary" className="text-xs">{format.format}</Badge>
                          <span className="text-sm">{format.description}</span>
                        </div>
                      </CommandItem>
                    ))}
                  </CommandGroup>
                  
                  {/* 次世代フォーマット */}
                  <CommandGroup heading="🚀 次世代フォーマット">
                    {otherImageFormats.filter(format => 
                      ['JXL', 'QOI', 'AVIF'].includes(format.format)
                    ).map((format) => (
                      <CommandItem
                        key={format.format}
                        value={`${format.format} ${format.description}`}
                        onSelect={() => {
                          onFormatChange(format.format)
                          setFormatSelectorOpen(false)
                        }}
                      >
                        <Check
                          className={cn(
                            "mr-2 h-4 w-4",
                            outputFormat === format.format ? "opacity-100" : "opacity-0"
                          )}
                        />
                        <div className="flex items-center gap-2">
                          <Badge variant="outline" className="text-xs bg-blue-50 dark:bg-blue-950">{format.format}</Badge>
                          <span className="text-sm">{format.description}</span>
                        </div>
                      </CommandItem>
                    ))}
                  </CommandGroup>
                  
                  {/* プロフェッショナル */}
                  <CommandGroup heading="💼 プロフェッショナル">
                    {otherImageFormats.filter(format => 
                      ['PSB', 'AI', 'DPX', 'CIN', 'EXR', 'HDR', 'TIFF', 'TIFF64'].includes(format.format)
                    ).map((format) => (
                      <CommandItem
                        key={format.format}
                        value={`${format.format} ${format.description}`}
                        onSelect={() => {
                          onFormatChange(format.format)
                          setFormatSelectorOpen(false)
                        }}
                      >
                        <Check
                          className={cn(
                            "mr-2 h-4 w-4",
                            outputFormat === format.format ? "opacity-100" : "opacity-0"
                          )}
                        />
                        <div className="flex items-center gap-2">
                          <Badge variant="outline" className="text-xs bg-purple-50 dark:bg-purple-950">{format.format}</Badge>
                          <span className="text-sm">{format.description}</span>
                        </div>
                      </CommandItem>
                    ))}
                  </CommandGroup>
                  
                  {/* その他のフォーマット */}
                  <CommandGroup heading="📁 その他のフォーマット">
                    {otherImageFormats.filter(format => 
                      !['JXL', 'QOI', 'AVIF', 'PSB', 'AI', 'DPX', 'CIN', 'EXR', 'HDR', 'TIFF', 'TIFF64'].includes(format.format)
                    ).map((format: ImageFormat) => (
                      <CommandItem
                        key={format.format}
                        value={`${format.format} ${format.description}`}
                        onSelect={() => {
                          onFormatChange(format.format)
                          setFormatSelectorOpen(false)
                        }}
                      >
                        <Check
                          className={cn(
                            "mr-2 h-4 w-4",
                            outputFormat === format.format ? "opacity-100" : "opacity-0"
                          )}
                        />
                        <div className="flex items-center gap-2">
                          <Badge variant="outline" className="text-xs">{format.format}</Badge>
                          <span className="text-sm">{format.description}</span>
                        </div>
                      </CommandItem>
                    ))}
                  </CommandGroup>
                </div>
              </Command>
            </PopoverContent>
          </Popover>
        </div>

        {/* 品質設定 */}
        <div className="space-y-2">
          <Label>画質: {settings.quality[0]}%</Label>
          <Slider
            value={settings.quality}
            onValueChange={(value) => updateSetting('quality', value)}
            max={100}
            min={1}
            step={1}
            className="w-full"
          />
          <p className="text-xs text-muted-foreground">
            品質が高いほどファイルサイズが大きくなります
          </p>
        </div>

        {/* リサイズ設定 */}
        <div className="space-y-4">
          <div className="flex items-center space-x-2">
            <Switch
              id="resize"
              checked={settings.enableResize}
              onCheckedChange={(checked) => updateSetting('enableResize', checked)}
            />
            <Label htmlFor="resize">リサイズを有効にする</Label>
          </div>

          {settings.enableResize && (
            <div className="space-y-4 pl-6 border-l-2 border-muted">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="width">幅 (px)</Label>
                  <Input
                    id="width"
                    type="number"
                    placeholder="幅"
                    value={settings.resizeWidth}
                    onChange={(e) => updateSetting('resizeWidth', e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="height">高さ (px)</Label>
                  <Input
                    id="height"
                    type="number"
                    placeholder="高さ"
                    value={settings.resizeHeight}
                    onChange={(e) => updateSetting('resizeHeight', e.target.value)}
                  />
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <Switch
                  id="aspect-ratio"
                  checked={settings.maintainAspectRatio}
                  onCheckedChange={(checked) => updateSetting('maintainAspectRatio', checked)}
                />
                <Label htmlFor="aspect-ratio">アスペクト比を維持</Label>
              </div>
            </div>
          )}
        </div>

        {/* 変換ボタン */}
        <Button 
          onClick={onConvert} 
          disabled={isConverting}
          className="w-full"
          size="lg"
        >
          {isConverting ? '変換中...' : '変換開始'}
        </Button>

        {/* プログレスバー */}
        {isConverting && (
          <div className="space-y-2">
            <Progress value={progress} className="w-full" />
            <p className="text-sm text-center text-muted-foreground">
              変換しています... {progress}%
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  )
} 