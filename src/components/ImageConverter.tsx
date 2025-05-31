'use client'

import React, { useState, useEffect } from 'react'
import Image from 'next/image'
import { Shield } from 'lucide-react'
import { 
  convertImage, 
  downloadFile, 
  generateOutputFilename,
  isMagickFormatAvailable,
  getAvailableMagickFormats,
  type ConversionOptions 
} from '@/lib/image-converter'
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

    // フォーマットの有効性をチェック
    if (!isMagickFormatAvailable(outputFormat)) {
      console.error(`Selected format '${outputFormat}' is not available in MagickFormat`)
      console.log('Available formats:', getAvailableMagickFormats().slice(0, 20))
      
      // エラーハンドラーを使用
      const errorMessage = `Unsupported output format: ${outputFormat}. Please choose a supported format.`
      const errorInfo = parseError(errorMessage)
      logError(errorMessage, errorInfo)
      
      setConversionResult({
        success: false,
        error: errorInfo.userMessage
      })
      return
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
    <div className="min-h-screen bg-gray-50/30">
      <div className="max-w-6xl mx-auto px-4 py-8 space-y-8">
        {/* ヘッダー */}
        <div className="text-center space-y-4">
          <div className="flex items-center justify-center gap-3 mb-2">
            <div className="flex items-center justify-center w-16 h-16 bg-primary/10 rounded-full p-2 shadow-lg">
              <Image 
                src="/icon.png"
                alt="Closed Image Converter"
                width={48}
                height={48}
                className="rounded-full"
                priority
              />
            </div>
            <h1 className="text-3xl font-bold tracking-tight">Closed Image Converter</h1>
          </div>
          <div className="space-y-2">
            <p className="text-lg text-muted-foreground">
              完全プライベート画像変換サービス
            </p>
            <div className="flex items-center justify-center gap-2 text-sm">
              <Shield className="h-4 w-4 text-green-600" />
              <span className="text-green-700 font-medium">
                サーバーに画像データを送信しません
              </span>
            </div>
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
          <div className="inline-flex items-center space-x-2 text-green-600 bg-green-50 px-4 py-2 rounded-full">
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