'use client'

import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Shield, Home, ImageIcon } from 'lucide-react'
import { cn } from '@/lib/utils'
import { ThemeToggle } from '@/components/theme-toggle'

export default function Navigation() {
  const pathname = usePathname()

  return (
    <nav className="fixed top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 dark:border-border">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          {/* ロゴとブランド名 */}
          <Link href="/" className="flex items-center gap-3 hover:opacity-80 transition-opacity">
            <div className="flex items-center justify-center w-10 h-10 bg-white/90 dark:bg-gray-800 rounded-full p-2 shadow-sm border-2 border-gray-200 dark:border-gray-600">
              <Image
                src="/icon.png"
                alt="Closed Image Converter"
                width={24}
                height={24}
                className="rounded-full dark:invert"
              />
            </div>
            <div className="flex flex-col">
              <span className="font-bold text-lg leading-none text-foreground">Closed Image Converter</span>
              <div className="flex items-center gap-1 mt-0.5">
                <Badge variant="secondary" className="text-xs px-2 py-0 text-green-700 bg-green-50 border-green-200 dark:text-green-400 dark:bg-green-950 dark:border-green-800">
                  <Shield className="h-3 w-3 mr-1" />
                  プライベート
                </Badge>
              </div>
            </div>
          </Link>

          {/* ナビゲーションメニュー */}
          <div className="flex items-center gap-6">
            <nav className="hidden md:flex items-center gap-6">
              <Link 
                href="/" 
                className={cn(
                  "flex items-center gap-2 px-3 py-2 rounded-md text-sm font-medium transition-colors",
                  pathname === "/" 
                    ? "bg-primary text-primary-foreground" 
                    : "text-muted-foreground hover:text-foreground hover:bg-accent"
                )}
              >
                <Home className="h-4 w-4" />
                ホーム
              </Link>
              <Link 
                href="/converter"
                className={cn(
                  "flex items-center gap-2 px-3 py-2 rounded-md text-sm font-medium transition-colors",
                  pathname === "/converter" 
                    ? "bg-primary text-primary-foreground" 
                    : "text-muted-foreground hover:text-foreground hover:bg-accent"
                )}
              >
                <ImageIcon className="h-4 w-4" />
                変換ツール
              </Link>
            </nav>

            {/* モバイルメニュー */}
            <div className="flex md:hidden items-center gap-2">
              <Button variant="ghost" size="sm" asChild>
                <Link href="/">
                  <Home className="h-4 w-4" />
                </Link>
              </Button>
              <Button variant="ghost" size="sm" asChild>
                <Link href="/converter">
                  <ImageIcon className="h-4 w-4" />
                </Link>
              </Button>
            </div>

            {/* ダークモード切り替え */}
            <ThemeToggle />
          </div>
        </div>
      </div>
    </nav>
  )
} 