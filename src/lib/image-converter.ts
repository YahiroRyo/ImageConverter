'use client'

import { ImageMagick, initializeImageMagick, MagickFormat, MagickGeometry } from '@imagemagick/magick-wasm'
import { parseError, logError, type ErrorInfo } from './error-handler'

let isInitialized = false

export async function initializeWasm() {
  if (!isInitialized) {
    try {
      console.log('Starting WASM initialization...')
      
      // WASMファイルをfetch
      const wasmResponse = await fetch('/magick.wasm')
      
      if (!wasmResponse.ok) {
        throw new Error(`Failed to fetch WASM file: ${wasmResponse.status} ${wasmResponse.statusText}`)
      }
      
      const wasmArrayBuffer = await wasmResponse.arrayBuffer()
      
      if (wasmArrayBuffer.byteLength === 0) {
        throw new Error('WASM file is empty')
      }
      
      console.log(`WASM file loaded: ${wasmArrayBuffer.byteLength} bytes`)
      
      // 最もシンプルな方法: 直接ArrayBufferで初期化
      await initializeImageMagick(wasmArrayBuffer)
      
      isInitialized = true
      console.log('ImageMagick WASM initialized successfully')
    } catch (error) {
      console.error('Failed to initialize ImageMagick WASM:', error)
      
      // エラーハンドラーを使用してユーザーフレンドリーなエラーメッセージを生成
      const errorInfo = parseError(error)
      logError(error, errorInfo)
      
      // ユーザー向けエラーメッセージで再スロー
      const userError = new Error(errorInfo.userMessage)
      userError.name = 'InitializationError'
      throw userError
    }
  }
}

export interface ResizeOptions {
  width?: number
  height?: number
  maintainAspectRatio?: boolean
}

export interface ConversionOptions {
  quality?: number
  resize?: ResizeOptions
}

export interface ConversionResult {
  success: boolean
  data?: Uint8Array
  error?: string
  originalSize?: number
  newSize?: number
}

export async function convertImage(
  inputBuffer: ArrayBuffer,
  inputFormat: string,
  outputFormat: string,
  options: ConversionOptions = {}
): Promise<ConversionResult> {
  try {
    await initializeWasm()

    const inputData = new Uint8Array(inputBuffer)
    
    return new Promise<ConversionResult>((resolve) => {
      ImageMagick.read(inputData, (image) => {
        try {
          const originalSize = inputData.length

          // リサイズオプションの適用
          if (options.resize) {
            const { width, height, maintainAspectRatio = true } = options.resize
            
            if (width && height) {
              const geometry = new MagickGeometry(width, height)
              if (maintainAspectRatio) {
                geometry.greater = true
              } else {
                geometry.ignoreAspectRatio = true
              }
              image.resize(geometry)
            } else if (width) {
              const geometry = new MagickGeometry(width, 0)
              image.resize(geometry)
            } else if (height) {
              const geometry = new MagickGeometry(0, height)
              image.resize(geometry)
            }
          }

          // 品質の設定
          if (options.quality !== undefined) {
            image.quality = options.quality
          }

          // フォーマット変換
          console.log(`Converting to format: ${outputFormat}`)
          
          // フォーマット名を正規化
          const normalizedFormat = outputFormat.toUpperCase()
          console.log(`Normalized format: ${normalizedFormat}`)

          // 一般的なフォーマットのマッピング
          const formatMapping: { [key: string]: string } = {
            // 基本的な画像フォーマット
            'JPG': 'Jpeg',
            'JPEG': 'Jpeg',
            'PNG': 'Png',
            'WEBP': 'Webp',
            'GIF': 'Gif',
            'BMP': 'Bmp',
            'TIFF': 'Tiff',
            'TIF': 'Tiff',
            'PDF': 'Pdf',
            'SVG': 'Svg',
            'AVIF': 'Avif',
            'APNG': 'APng',
            'ICO': 'Ico',
            'HEIC': 'Heic',
            'HEIF': 'Heif',
            'JXL': 'Jxl',
            
            // RAWフォーマット
            'CR2': 'Cr2',
            'CR3': 'Cr3',
            'CRW': 'Crw',
            'NEF': 'Nef',
            'ARW': 'Arw',
            'DNG': 'Dng',
            'RAF': 'Raf',
            'ORF': 'Orf',
            'RW2': 'Rw2',
            'PEF': 'Pef',
            'SRW': 'Srw',
            'ERF': 'Erf',
            'MEF': 'Mef',
            'MRW': 'Mrw',
            '3FR': 'ThreeFr',
            
            // レガシー/特殊フォーマット
            'TGA': 'Tga',
            'TARGA': 'Tga',
            'PSD': 'Psd',
            'PSB': 'Psb',
            'XCF': 'Xcf',
            'EPS': 'Eps',
            'AI': 'Ai',
            'DDS': 'Dds',
            'PCX': 'Pcx',
            'PBM': 'Pbm',
            'PGM': 'Pgm',
            'PPM': 'Ppm',
            'PAM': 'Pam',
            'PNM': 'Pnm',
            'PFM': 'Pfm',
            'PHM': 'Phm',
            
            // 圧縮フォーマット
            'J2K': 'J2k',
            'J2C': 'J2c',
            'JP2': 'Jp2',
            'JPC': 'Jpc',
            'JPM': 'Jpm',
            'JPT': 'Jpt',
            'JNG': 'Jng',
            
            // HDR/scientific
            'EXR': 'Exr',
            'HDR': 'Hdr',
            'FITS': 'Fits',
            'FTS': 'Fts',
            'DPX': 'Dpx',
            'CIN': 'Cin',
            
            // ベクター/ドキュメント
            'SVGZ': 'Svgz',
            'EPDF': 'Epdf',
            'PDFA': 'Pdfa',
            
            // 特殊用途
            'WBMP': 'Wbmp',
            'XBM': 'Xbm',
            'XPM': 'Xpm',
            'PICON': 'Picon',
            'PICT': 'Pict',
            'PCT': 'Pct',
            'PALM': 'Palm',
            'SGI': 'Sgi',
            'SUN': 'Sun',
            'RAS': 'Ras',
            'MTV': 'Mtv',
            'OTB': 'Otb',
            'PTIF': 'Ptif',
            'TIFF64': 'Tiff64',
            'FARBFELD': 'Farbfeld',
            'FF': 'Ff',
            'QOI': 'Qoi',
            
            // 画像シーケンス
            'MNG': 'Mng',
            'JPS': 'Jps',
            'MPO': 'Mpo',
            
            // プリンター/FAX
            'FAX': 'Fax',
            'G3': 'G3',
            'G4': 'G4',
            'GROUP4': 'Group4',
            
            // その他
            'MIFF': 'Miff',
            'MVG': 'Mvg',
            'CLIP': 'Clip',
            'MASK': 'Mask',
            'MONO': 'Mono',
            'GRAY': 'Gray',
            'GRAYA': 'Graya'
          }
          
          // まず一般的なマッピングを試す
          let magickFormatKey: string | undefined = formatMapping[normalizedFormat]
          if (!magickFormatKey) {
            // マッピングにない場合は、MagickFormatから直接検索
            magickFormatKey = Object.keys(MagickFormat).find(key => 
              key.toUpperCase() === normalizedFormat
            )
          }
          
          if (!magickFormatKey) {
            const availableFormats = Object.keys(MagickFormat).slice(0, 30).join(', ')
            console.error(`Format '${normalizedFormat}' not found in MagickFormat. Available formats (first 30): ${availableFormats}`)
            throw new Error(`Unsupported output format: ${outputFormat}. Please choose a supported format.`)
          }
          
          // ここでmagickFormatKeyは確実にstringになっている
          const outputFormatEnum = MagickFormat[magickFormatKey as keyof typeof MagickFormat]
          
          if (!outputFormatEnum) {
            throw new Error(`Failed to get MagickFormat enum for: ${magickFormatKey}`)
          }
          
          console.log(`Using MagickFormat key: ${magickFormatKey} -> ${outputFormatEnum}`)
          image.format = outputFormatEnum

          // 書き込み処理
          const writeFormat = image.format
          console.log(`Writing with format: ${writeFormat}`)
          
          image.write(writeFormat, (data) => {
            const newSize = data.length
            console.log(`Conversion successful. Output size: ${newSize} bytes`)
            resolve({
              success: true,
              data,
              originalSize,
              newSize
            })
          })
        } catch (error) {
          console.error('画像処理エラー:', error)
          
          // エラーハンドラーを使用してユーザーフレンドリーなエラーメッセージを生成
          const errorInfo = parseError(error)
          logError(error, errorInfo)
          
          resolve({
            success: false,
            error: errorInfo.userMessage
          })
        }
      })
    })
  } catch (error) {
    console.error('画像変換エラー:', error)
    
    // エラーハンドラーを使用してユーザーフレンドリーなエラーメッセージを生成
    const errorInfo = parseError(error)
    logError(error, errorInfo)
    
    return {
      success: false,
      error: errorInfo.userMessage
    }
  }
}

export function downloadFile(data: Uint8Array, filename: string) {
  const blob = new Blob([data])
  const url = URL.createObjectURL(blob)
  
  const link = document.createElement('a')
  link.href = url
  link.download = filename
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
  
  URL.revokeObjectURL(url)
}

export function formatFileSize(bytes: number): string {
  if (bytes === 0) return '0 Bytes'
  
  const k = 1024
  const sizes = ['Bytes', 'KB', 'MB', 'GB']
  const i = Math.floor(Math.log(bytes) / Math.log(k))
  
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]
}

export function getFileExtension(filename: string): string {
  return filename.split('.').pop()?.toLowerCase() || ''
}

export function generateOutputFilename(
  originalFilename: string,
  outputFormat: string
): string {
  const nameWithoutExtension = originalFilename.replace(/\.[^/.]+$/, '')
  return `${nameWithoutExtension}.${outputFormat.toLowerCase()}`
}

// デバッグ用: 利用可能なMagickFormatを確認
export function getAvailableMagickFormats(): string[] {
  return Object.keys(MagickFormat).sort()
}

// デバッグ用: 特定のフォーマットが利用可能かチェック
export function isMagickFormatAvailable(format: string): boolean {
  const normalizedFormat = format.toUpperCase()
  
  // 一般的なフォーマットのマッピング（convertImage関数と同じ）
  const formatMapping: { [key: string]: string } = {
    // 基本的な画像フォーマット
    'JPG': 'Jpeg',
    'JPEG': 'Jpeg',
    'PNG': 'Png',
    'WEBP': 'Webp',
    'GIF': 'Gif',
    'BMP': 'Bmp',
    'TIFF': 'Tiff',
    'TIF': 'Tiff',
    'PDF': 'Pdf',
    'SVG': 'Svg',
    'AVIF': 'Avif',
    'APNG': 'APng',
    'ICO': 'Ico',
    'HEIC': 'Heic',
    'HEIF': 'Heif',
    'JXL': 'Jxl',
    
    // RAWフォーマット
    'CR2': 'Cr2',
    'CR3': 'Cr3',
    'CRW': 'Crw',
    'NEF': 'Nef',
    'ARW': 'Arw',
    'DNG': 'Dng',
    'RAF': 'Raf',
    'ORF': 'Orf',
    'RW2': 'Rw2',
    'PEF': 'Pef',
    'SRW': 'Srw',
    'ERF': 'Erf',
    'MEF': 'Mef',
    'MRW': 'Mrw',
    '3FR': 'ThreeFr',
    
    // レガシー/特殊フォーマット
    'TGA': 'Tga',
    'TARGA': 'Tga',
    'PSD': 'Psd',
    'PSB': 'Psb',
    'XCF': 'Xcf',
    'EPS': 'Eps',
    'AI': 'Ai',
    'DDS': 'Dds',
    'PCX': 'Pcx',
    'PBM': 'Pbm',
    'PGM': 'Pgm',
    'PPM': 'Ppm',
    'PAM': 'Pam',
    'PNM': 'Pnm',
    'PFM': 'Pfm',
    'PHM': 'Phm',
    
    // 圧縮フォーマット
    'J2K': 'J2k',
    'J2C': 'J2c',
    'JP2': 'Jp2',
    'JPC': 'Jpc',
    'JPM': 'Jpm',
    'JPT': 'Jpt',
    'JNG': 'Jng',
    
    // HDR/scientific
    'EXR': 'Exr',
    'HDR': 'Hdr',
    'FITS': 'Fits',
    'FTS': 'Fts',
    'DPX': 'Dpx',
    'CIN': 'Cin',
    
    // ベクター/ドキュメント
    'SVGZ': 'Svgz',
    'EPDF': 'Epdf',
    'PDFA': 'Pdfa',
    
    // 特殊用途
    'WBMP': 'Wbmp',
    'XBM': 'Xbm',
    'XPM': 'Xpm',
    'PICON': 'Picon',
    'PICT': 'Pict',
    'PCT': 'Pct',
    'PALM': 'Palm',
    'SGI': 'Sgi',
    'SUN': 'Sun',
    'RAS': 'Ras',
    'MTV': 'Mtv',
    'OTB': 'Otb',
    'PTIF': 'Ptif',
    'TIFF64': 'Tiff64',
    'FARBFELD': 'Farbfeld',
    'FF': 'Ff',
    'QOI': 'Qoi',
    
    // 画像シーケンス
    'MNG': 'Mng',
    'JPS': 'Jps',
    'MPO': 'Mpo',
    
    // プリンター/FAX
    'FAX': 'Fax',
    'G3': 'G3',
    'G4': 'G4',
    'GROUP4': 'Group4',
    
    // その他
    'MIFF': 'Miff',
    'MVG': 'Mvg',
    'CLIP': 'Clip',
    'MASK': 'Mask',
    'MONO': 'Mono',
    'GRAY': 'Gray',
    'GRAYA': 'Graya'
  }
  
  // まず一般的なマッピングを試す
  let magickFormatKey: string | undefined = formatMapping[normalizedFormat]
  if (!magickFormatKey) {
    // マッピングにない場合は、MagickFormatから直接検索
    magickFormatKey = Object.keys(MagickFormat).find(key => 
      key.toUpperCase() === normalizedFormat
    )
  }
  
  return !!magickFormatKey && magickFormatKey in MagickFormat
} 