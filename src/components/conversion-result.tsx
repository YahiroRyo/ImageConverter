'use client'

import React from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { Download, AlertCircle, CheckCircle, RefreshCw, HelpCircle } from 'lucide-react'
import { formatFileSize } from '@/lib/image-converter'
import { parseError } from '@/lib/error-handler'

export interface ConversionResultData {
  success: boolean
  data?: Uint8Array
  originalSize?: number
  newSize?: number
  error?: string
}

interface ConversionResultProps {
  result: ConversionResultData
  onDownload: () => void
}

export default function ConversionResult({
  result,
  onDownload
}: ConversionResultProps) {
  // エラーの場合は詳細情報を取得
  const errorInfo = result.error ? parseError(result.error) : null;
  
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          {result.success ? (
            <CheckCircle className="h-5 w-5 text-green-500" />
          ) : (
            <AlertCircle className="h-5 w-5 text-red-500" />
          )}
          変換結果
        </CardTitle>
      </CardHeader>
      <CardContent>
        {result.success ? (
          <div className="space-y-4">
            <Alert>
              <CheckCircle className="h-4 w-4" />
              <AlertDescription>
                変換が完了しました！
              </AlertDescription>
            </Alert>
            
            {result.originalSize && result.newSize && (
              <div className="grid grid-cols-2 gap-4 p-4 bg-muted rounded-lg">
                <div className="text-center">
                  <p className="text-sm text-muted-foreground">元のサイズ</p>
                  <p className="text-lg font-semibold">
                    {formatFileSize(result.originalSize)}
                  </p>
                </div>
                <div className="text-center">
                  <p className="text-sm text-muted-foreground">変換後のサイズ</p>
                  <p className="text-lg font-semibold">
                    {formatFileSize(result.newSize)}
                  </p>
                </div>
              </div>
            )}

            <Button onClick={onDownload} className="w-full" size="lg">
              <Download className="h-4 w-4 mr-2" />
              ダウンロード
            </Button>
          </div>
        ) : (
          <div className="space-y-4">
            <Alert variant="destructive">
              <AlertCircle className="h-4 w-4" />
              <AlertTitle>エラーが発生しました</AlertTitle>
              <AlertDescription>
                {result.error || '変換中にエラーが発生しました'}
              </AlertDescription>
            </Alert>
            
            {/* 推奨アクションを表示 */}
            {errorInfo?.suggestions && errorInfo.suggestions.length > 0 && (
              <Alert>
                <HelpCircle className="h-4 w-4" />
                <AlertTitle>解決方法</AlertTitle>
                <AlertDescription>
                  <ul className="mt-2 list-disc list-inside space-y-1">
                    {errorInfo.suggestions.map((suggestion, index) => (
                      <li key={index} className="text-sm">
                        {suggestion}
                      </li>
                    ))}
                  </ul>
                </AlertDescription>
              </Alert>
            )}
            
            {/* 復旧可能な場合は再試行ボタンを表示 */}
            {errorInfo?.recoverable && (
              <Button 
                variant="outline" 
                className="w-full"
                onClick={() => window.location.reload()}
              >
                <RefreshCw className="h-4 w-4 mr-2" />
                ページを再読み込み
              </Button>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  )
} 