'use client'

import React, { useState, useEffect } from 'react'
import { Shield } from 'lucide-react'
import { 
  convertImage, 
  downloadFile, 
  generateOutputFilename,
  type ConversionOptions 
} from '@/lib/image-converter'
import { isFFmpegFormatSupported } from '@/lib/ffmpeg-converter'
import { parseError, logError } from '@/lib/error-handler'
import { getImageFormatStats } from '@/lib/image-formats'

import FileUploadArea, { type UploadedFile } from './file-upload-area'
import ConversionSettingsPanel, { type ConversionSettings } from './conversion-settings'
import ConversionResult, { type ConversionResultData } from './conversion-result'
import PrivacyInfoCard from './privacy-info-card'

export default function ImageConverter() {
  const [uploadedFile, setUploadedFile] = useState<UploadedFile | null>(null)
  const [outputFormat, setOutputFormat] = useState<string>('PNG')
  const [isConverting, setIsConverting] = useState(false)
  const [conversionResult, setConversionResult] = useState<ConversionResultData | null>(null)
  const [progress, setProgress] = useState(0)
  
  // 変換設定のstate
  const [conversionSettings, setConversionSettings] = useState<ConversionSettings>({
    quality: [90],
    enableResize: false,
    resizeWidth: '',
    resizeHeight: '',
    maintainAspectRatio: true
  })

  // 開発時にフォーマット統計をコンソールに表示
  useEffect(() => {
    if (process.env.NODE_ENV === 'development') {
      getImageFormatStats()
    }
  }, [])

  const handleFileUpload = (file: UploadedFile) => {
    setUploadedFile(file)
    setConversionResult(null)
  }

  const handleFileClear = () => {
    if (uploadedFile) {
      URL.revokeObjectURL(uploadedFile.preview)
    }
    setUploadedFile(null)
    setConversionResult(null)
    setProgress(0)
  }

  const handleConvert = async () => {
    if (!uploadedFile) return

    // 開発時のデバッグ情報
    if (process.env.NODE_ENV === 'development') {
      console.log(`選択された出力フォーマット: ${outputFormat}`)
      console.log(`FFmpegサポート: ${isFFmpegFormatSupported(outputFormat)}`)
      console.log('ImageMagickまたはFFmpegのいずれかで変換を試行します')
    }

    setIsConverting(true)
    setProgress(0)
    setConversionResult(null)

    try {
      // プログレスバーのアニメーション
      const progressInterval = setInterval(() => {
        setProgress(prev => {
          if (prev >= 90) {
            clearInterval(progressInterval)
            return prev
          }
          return prev + 10
        })
      }, 100)

      const arrayBuffer = await uploadedFile.file.arrayBuffer()
      
      const options: ConversionOptions = {
        quality: conversionSettings.quality[0]
      }

      if (conversionSettings.enableResize && (conversionSettings.resizeWidth || conversionSettings.resizeHeight)) {
        options.resize = {
          width: conversionSettings.resizeWidth ? parseInt(conversionSettings.resizeWidth) : undefined,
          height: conversionSettings.resizeHeight ? parseInt(conversionSettings.resizeHeight) : undefined,
          maintainAspectRatio: conversionSettings.maintainAspectRatio
        }
      }

      const result = await convertImage(
        arrayBuffer,
        uploadedFile.file.type,
        outputFormat,
        options
      )

      clearInterval(progressInterval)
      setProgress(100)
      setConversionResult(result)
    } catch (error) {
      console.error('変換エラー:', error)
      
      // エラーハンドラーを使用してユーザーフレンドリーなエラーメッセージを生成
      const errorInfo = parseError(error)
      logError(error, errorInfo)
      
      setConversionResult({
        success: false,
        error: errorInfo.userMessage
      })
    } finally {
      setIsConverting(false)
    }
  }

  const handleDownload = () => {
    if (conversionResult?.success && conversionResult.data && uploadedFile) {
      const filename = generateOutputFilename(uploadedFile.file.name, outputFormat)
      downloadFile(conversionResult.data, filename)
    }
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-6xl mx-auto px-4 py-6 space-y-8">
        {/* 簡素化されたヘッダー */}
        <div className="text-center space-y-2">
          <div className="flex items-center justify-center gap-2 text-sm">
            <Shield className="h-4 w-4 text-green-600 dark:text-green-400" />
            <span className="text-green-700 dark:text-green-300 font-medium">
              サーバーに画像データを送信しません
            </span>
          </div>
        </div>

        {/* プライバシー情報カード */}
        <PrivacyInfoCard />

        {/* メインコンテンツ */}
        <div className="space-y-8">
          {/* ファイルアップロード */}
          <FileUploadArea
            onFileUpload={handleFileUpload}
            onFileClear={handleFileClear}
            uploadedFile={uploadedFile}
          />

          {/* アップロードされたファイルがある場合の変換設定 */}
          {uploadedFile && (
            <div className="space-y-8">
              <div className="space-y-6">
                {/* 変換設定 */}
                <ConversionSettingsPanel
                  settings={conversionSettings}
                  onSettingsChange={setConversionSettings}
                  outputFormat={outputFormat}
                  onFormatChange={setOutputFormat}
                  onConvert={handleConvert}
                  isConverting={isConverting}
                  progress={progress}
                />
              </div>
              
              {/* 変換結果 */}
              {conversionResult && (
                <div className="mx-auto">
                  <ConversionResult
                    result={conversionResult}
                    onDownload={handleDownload}
                  />
                </div>
              )}
            </div>
          )}
        </div>

        {/* フッター */}
        <div className="text-center pt-8">
          <div className="inline-flex items-center space-x-2 text-green-600 dark:text-green-400 bg-green-50 dark:bg-green-950/30 px-4 py-2 rounded-full border border-green-200 dark:border-green-800">
            <Shield className="w-4 h-4" />
            <span className="text-sm font-medium">
              すべての処理はお使いのブラウザ内で実行されます
            </span>
          </div>
        </div>
      </div>
    </div>
  )
} 