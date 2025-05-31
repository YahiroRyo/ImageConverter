'use client'

import React from 'react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Label } from '@/components/ui/label'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem } from '@/components/ui/command'
import { ChevronsUpDown, Check } from 'lucide-react'
import { cn } from '@/lib/utils'
import { getImageFormats, POPULAR_FORMATS, type ImageFormat } from '@/lib/image-formats'

interface FormatSelectorProps {
  selectedFormat: string
  onFormatChange: (format: string) => void
  open: boolean
  onOpenChange: (open: boolean) => void
}

export default function FormatSelector({
  selectedFormat,
  onFormatChange,
  open,
  onOpenChange
}: FormatSelectorProps) {
  const imageFormats = getImageFormats()
  
  // 人気フォーマットとその他のフォーマットに分ける
  const popularImageFormats = imageFormats.filter(format => 
    POPULAR_FORMATS.includes(format.format)
  )
  const otherImageFormats = imageFormats.filter(format => 
    !POPULAR_FORMATS.includes(format.format)
  )

  return (
    <div className="space-y-2">
      <Label htmlFor="format">出力フォーマット</Label>
      <Popover open={open} onOpenChange={onOpenChange} modal={false}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            role="combobox"
            aria-expanded={open}
            className="w-full justify-between"
          >
            {selectedFormat ? (
              <div className="flex items-center gap-2">
                <Badge variant="secondary" className="text-xs">{selectedFormat}</Badge>
                <span className="text-sm">
                  {imageFormats.find(format => format.format === selectedFormat)?.description || selectedFormat}
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
            <CommandInput placeholder="フォーマットを検索... (例: jpeg, png, pdf, raw)" />
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
                      onOpenChange(false)
                    }}
                  >
                    <Check
                      className={cn(
                        "mr-2 h-4 w-4",
                        selectedFormat === format.format ? "opacity-100" : "opacity-0"
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
                  ['JXL', 'QOI'].includes(format.format)
                ).map((format) => (
                  <CommandItem
                    key={format.format}
                    value={`${format.format} ${format.description}`}
                    onSelect={() => {
                      onFormatChange(format.format)
                      onOpenChange(false)
                    }}
                  >
                    <Check
                      className={cn(
                        "mr-2 h-4 w-4",
                        selectedFormat === format.format ? "opacity-100" : "opacity-0"
                      )}
                    />
                    <div className="flex items-center gap-2">
                      <Badge variant="outline" className="text-xs bg-blue-50">{format.format}</Badge>
                      <span className="text-sm">{format.description}</span>
                    </div>
                  </CommandItem>
                ))}
              </CommandGroup>
              
              {/* プロフェッショナル */}
              <CommandGroup heading="💼 プロフェッショナル">
                {otherImageFormats.filter(format => 
                  ['PSB', 'AI', 'DPX', 'CIN', 'EXR', 'HDR'].includes(format.format)
                ).map((format) => (
                  <CommandItem
                    key={format.format}
                    value={`${format.format} ${format.description}`}
                    onSelect={() => {
                      onFormatChange(format.format)
                      onOpenChange(false)
                    }}
                  >
                    <Check
                      className={cn(
                        "mr-2 h-4 w-4",
                        selectedFormat === format.format ? "opacity-100" : "opacity-0"
                      )}
                    />
                    <div className="flex items-center gap-2">
                      <Badge variant="outline" className="text-xs bg-purple-50">{format.format}</Badge>
                      <span className="text-sm">{format.description}</span>
                    </div>
                  </CommandItem>
                ))}
              </CommandGroup>
              
              {/* RAWフォーマット */}
              <CommandGroup heading="📷 RAWフォーマット">
                {otherImageFormats.filter(format => 
                  ['CR2', 'CR3', 'CRW', 'NEF', 'ARW', 'DNG', 'RAF', 'ORF', 'RW2', 'PEF', 'SRW', 'ERF', 'MEF', 'MRW', '3FR'].includes(format.format)
                ).map((format) => (
                  <CommandItem
                    key={format.format}
                    value={`${format.format} ${format.description}`}
                    onSelect={() => {
                      onFormatChange(format.format)
                      onOpenChange(false)
                    }}
                  >
                    <Check
                      className={cn(
                        "mr-2 h-4 w-4",
                        selectedFormat === format.format ? "opacity-100" : "opacity-0"
                      )}
                    />
                    <div className="flex items-center gap-2">
                      <Badge variant="outline" className="text-xs bg-green-50">{format.format}</Badge>
                      <span className="text-sm">{format.description}</span>
                    </div>
                  </CommandItem>
                ))}
                <div className="px-2 py-1 text-xs text-amber-600 bg-amber-50 rounded mx-2 mt-1">
                  ⚠️ 注意: RAWフォーマットは読み込み専用です
                </div>
              </CommandGroup>
              
              {/* その他のフォーマット */}
              <CommandGroup heading="📁 その他のフォーマット">
                {otherImageFormats.filter(format => 
                  !['JXL', 'QOI', 'PSB', 'AI', 'DPX', 'CIN', 'EXR', 'HDR', 'CR2', 'CR3', 'CRW', 'NEF', 'ARW', 'DNG', 'RAF', 'ORF', 'RW2', 'PEF', 'SRW', 'ERF', 'MEF', 'MRW', '3FR'].includes(format.format)
                ).map((format: ImageFormat) => (
                  <CommandItem
                    key={format.format}
                    value={`${format.format} ${format.description}`}
                    onSelect={() => {
                      onFormatChange(format.format)
                      onOpenChange(false)
                    }}
                  >
                    <Check
                      className={cn(
                        "mr-2 h-4 w-4",
                        selectedFormat === format.format ? "opacity-100" : "opacity-0"
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
  )
} 