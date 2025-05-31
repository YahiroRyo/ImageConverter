'use client'

import React from 'react'
import Image from 'next/image'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Shield, Lock, ImageIcon } from 'lucide-react'

export default function PrivacyInfoCard() {
  return (
    <Card className="border-green-200 dark:border-green-800 bg-green-50/50 dark:bg-green-950/30">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-green-800 dark:text-green-300">
          <Shield className="h-5 w-5" />
          プライバシー・セキュリティについて
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3 text-sm">
        <div className="flex items-start gap-2">
          <Lock className="h-4 w-4 text-green-600 dark:text-green-400 mt-0.5 flex-shrink-0" />
          <div>
            <p className="font-medium text-green-800 dark:text-green-300">完全クライアントサイド処理</p>
            <p className="text-green-700 dark:text-green-300">
              アップロードされた画像は一切サーバーに送信されません。すべての変換処理はお使いのブラウザ内で実行されます。
            </p>
          </div>
        </div>
        <div className="flex items-start gap-2">
          <Shield className="h-4 w-4 text-green-600 dark:text-green-400 mt-0.5 flex-shrink-0" />
          <div>
            <p className="font-medium text-green-800 dark:text-green-300">データの保護</p>
            <p className="text-green-700 dark:text-green-300">
              変換処理中も変換後も、画像データはお使いのデバイスから外部に送信されることはありません。
            </p>
          </div>
        </div>
        <div className="flex items-start gap-2">
          <ImageIcon className="h-4 w-4 text-green-600 dark:text-green-400 mt-0.5 flex-shrink-0" />
          <div>
            <p className="font-medium text-green-800 dark:text-green-300">高品質変換</p>
            <p className="text-green-700 dark:text-green-300">
              ImageMagick WASM技術により、プライバシーを保護しながら高品質な画像変換を実現します。
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  )
} 