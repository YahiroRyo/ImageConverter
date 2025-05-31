'use client'

import React, { useCallback } from 'react'
import { useDropzone } from 'react-dropzone'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Upload, Shield, ImageIcon, Info } from 'lucide-react'
import { formatFileSize } from '@/lib/image-converter'
import FormatListDialog from './format-list-dialog'

export interface UploadedFile {
  file: File
  preview: string
}

interface FileUploadAreaProps {
  uploadedFile: UploadedFile | null
  onFileUpload: (file: UploadedFile) => void
  onFileClear: () => void
}

export default function FileUploadArea({
  uploadedFile,
  onFileUpload,
  onFileClear
}: FileUploadAreaProps) {
  const onDrop = useCallback((acceptedFiles: File[]) => {
    const file = acceptedFiles[0]
    if (file) {
      const preview = URL.createObjectURL(file)
      onFileUpload({ file, preview })
    }
  }, [onFileUpload])

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'image/*': ['.jpg', '.jpeg', '.png', '.webp', '.avif', '.gif', '.bmp', '.tiff', '.tif', '.svg', '.ico', '.heic', '.heif', '.jxl', '.qoi'],
      // RAWフォーマット
      'image/x-canon-cr2': ['.cr2'],
      'image/x-canon-cr3': ['.cr3'], 
      'image/x-canon-crw': ['.crw'],
      'image/x-nikon-nef': ['.nef'],
      'image/x-sony-arw': ['.arw'],
      'image/x-adobe-dng': ['.dng'],
      'image/x-fuji-raf': ['.raf'],
      'image/x-olympus-orf': ['.orf'],
      'image/x-panasonic-rw2': ['.rw2'],
      'image/x-pentax-pef': ['.pef'],
      // プロフェッショナルフォーマット
      'image/vnd.adobe.photoshop': ['.psd'],
      'application/pdf': ['.pdf'],
      'application/postscript': ['.eps', '.ai'],
      // HDR/科学技術フォーマット
      'image/x-exr': ['.exr'],
      'image/vnd.radiance': ['.hdr'],
      // その他
      'image/x-tga': ['.tga'],
      'image/x-pcx': ['.pcx'],
      'image/x-portable-bitmap': ['.pbm'],
      'image/x-portable-graymap': ['.pgm'],
      'image/x-portable-pixmap': ['.ppm']
    },
    multiple: false
  })

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Upload className="h-5 w-5" />
          画像をアップロード
        </CardTitle>
        <CardDescription className="space-y-1">
          <div className="flex items-center justify-between">
            <span>85種類の入力、92種類の出力フォーマットに対応</span>
            <FormatListDialog />
          </div>
          <div className="flex items-center gap-1 text-green-600 dark:text-green-400">
            <Shield className="h-3 w-3" />
            <span className="text-xs font-medium">アップロードした画像はお使いのデバイス内でのみ処理されます</span>
          </div>
        </CardDescription>
      </CardHeader>
      <CardContent>
        {!uploadedFile ? (
          <div
            {...getRootProps()}
            className={`border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors ${
              isDragActive 
                ? 'border-primary bg-primary/5' 
                : 'border-muted-foreground/25 hover:border-primary/50'
            }`}
          >
            <input {...getInputProps()} />
            <ImageIcon className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
            {isDragActive ? (
              <p className="text-lg">ファイルをドロップしてください...</p>
            ) : (
              <div className="space-y-2">
                <p className="text-lg">画像ファイルをドラッグ&ドロップ</p>
                <p className="text-sm text-muted-foreground">またはクリックしてファイルを選択</p>
                <p className="text-xs text-muted-foreground mt-4">
                  JPEG、PNG、WEBP、RAW、HDRなど幅広いフォーマットに対応
                </p>
                <p className="text-blue-600 dark:text-blue-400 text-sm">📄 最大ファイルサイズ: 制限なし（メモリ容量に依存）</p>
              </div>
            )}
          </div>
        ) : (
          <div className="p-6 border rounded-lg bg-muted/30 dark:bg-muted/20">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <img 
                  src={uploadedFile.preview} 
                  alt="Preview" 
                  className="h-16 w-16 object-cover rounded-lg shadow-sm"
                />
                <div>
                  <p className="font-medium">{uploadedFile.file.name}</p>
                  <p className="text-sm text-muted-foreground">
                    {formatFileSize(uploadedFile.file.size)}
                  </p>
                </div>
              </div>
              <Button variant="outline" size="sm" onClick={onFileClear}>
                削除
              </Button>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  )
} 