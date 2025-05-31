'use client'

import { FFmpeg } from '@ffmpeg/ffmpeg'
import { toBlobURL } from '@ffmpeg/util'
import { ConversionOptions, ConversionResult, ResizeOptions } from './image-converter'
import { parseError, logError } from './error-handler'

let ffmpegInstance: FFmpeg | null = null
let isFFmpegInitialized = false

/**
 * FFmpeg WASMのインスタンスを初期化
 */
export async function initializeFFmpeg(): Promise<void> {
  if (isFFmpegInitialized && ffmpegInstance) {
    return
  }

  try {
    console.log('FFmpeg WASM初期化を開始...')
    
    ffmpegInstance = new FFmpeg()
    
    // ログとプログレスのイベントリスナーを設定
    ffmpegInstance.on('log', ({ message }: { message: string }) => {
      console.log('FFmpeg:', message)
    })
    
    ffmpegInstance.on('progress', ({ progress, time }: { progress: number; time: number }) => {
      console.log(`FFmpeg進行状況: ${Math.round(progress * 100)}% (${time}s)`)
    })

    // CDNからコアファイルを読み込み
    const baseURL = 'https://unpkg.com/@ffmpeg/core@0.12.6/dist/umd'
    
    await ffmpegInstance.load({
      coreURL: await toBlobURL(`${baseURL}/ffmpeg-core.js`, 'text/javascript'),
      wasmURL: await toBlobURL(`${baseURL}/ffmpeg-core.wasm`, 'application/wasm'),
    })

    isFFmpegInitialized = true
    console.log('FFmpeg WASM初期化完了')
    
  } catch (error) {
    console.error('FFmpeg WASM初期化エラー:', error)
    isFFmpegInitialized = false
    throw error
  }
}

/**
 * バイナリデータから実際の画像フォーマットを検出
 */
function detectImageFormat(buffer: ArrayBuffer): string {
  const uint8Array = new Uint8Array(buffer)
  
  // 最初の16バイトを確認
  const header = uint8Array.slice(0, 16)
  
  // JPEGのシグネチャ: FF D8 FF
  if (header[0] === 0xFF && header[1] === 0xD8 && header[2] === 0xFF) {
    return 'jpg'
  }
  
  // PNGのシグネチャ: 89 50 4E 47 0D 0A 1A 0A
  if (header[0] === 0x89 && header[1] === 0x50 && header[2] === 0x4E && header[3] === 0x47 &&
      header[4] === 0x0D && header[5] === 0x0A && header[6] === 0x1A && header[7] === 0x0A) {
    return 'png'
  }
  
  // WebPのシグネチャ: 52 49 46 46 (RIFF) + 57 45 42 50 (WEBP)
  if (header[0] === 0x52 && header[1] === 0x49 && header[2] === 0x46 && header[3] === 0x46 &&
      header[8] === 0x57 && header[9] === 0x45 && header[10] === 0x42 && header[11] === 0x50) {
    return 'webp'
  }
  
  // GIFのシグネチャ: 47 49 46 38 (GIF8)
  if (header[0] === 0x47 && header[1] === 0x49 && header[2] === 0x46 && header[3] === 0x38) {
    return 'gif'
  }
  
  // BMPのシグネチャ: 42 4D (BM)
  if (header[0] === 0x42 && header[1] === 0x4D) {
    return 'bmp'
  }
  
  // TIFFのシグネチャ: 49 49 2A 00 (little endian) または 4D 4D 00 2A (big endian)
  if ((header[0] === 0x49 && header[1] === 0x49 && header[2] === 0x2A && header[3] === 0x00) ||
      (header[0] === 0x4D && header[1] === 0x4D && header[2] === 0x00 && header[3] === 0x2A)) {
    return 'tiff'
  }
  
  // AVIFのシグネチャ: 66 74 79 70 61 76 69 66 (ftypavif)
  if (header[4] === 0x66 && header[5] === 0x74 && header[6] === 0x79 && header[7] === 0x70 &&
      header[8] === 0x61 && header[9] === 0x76 && header[10] === 0x69 && header[11] === 0x66) {
    return 'avif'
  }
  
  // HEICのシグネチャ: 66 74 79 70 68 65 69 63 (ftypheic)
  if (header[4] === 0x66 && header[5] === 0x74 && header[6] === 0x79 && header[7] === 0x70 &&
      header[8] === 0x68 && header[9] === 0x65 && header[10] === 0x69 && header[11] === 0x63) {
    return 'heic'
  }
  
  // ICOのシグネチャ: 00 00 01 00
  if (header[0] === 0x00 && header[1] === 0x00 && header[2] === 0x01 && header[3] === 0x00) {
    return 'ico'
  }
  
  console.log('画像フォーマットを自動検出できませんでした。フォールバック処理を使用します。')
  return 'jpg' // デフォルト
}

/**
 * MIMEタイプをファイル拡張子に変換
 */
function mimeTypeToExtension(mimeType: string): string {
  const mimeMap: Record<string, string> = {
    'image/jpeg': 'jpg',
    'image/jpg': 'jpg',
    'image/png': 'png',
    'image/webp': 'webp',
    'image/gif': 'gif',
    'image/bmp': 'bmp',
    'image/tiff': 'tiff',
    'image/tif': 'tiff',
    'image/avif': 'avif',
    'image/heic': 'heic',
    'image/heif': 'heif',
    'image/ico': 'ico',
    'image/x-icon': 'ico',
    'image/vnd.microsoft.icon': 'ico',
    'image/svg+xml': 'svg',
    'image/x-tga': 'tga',
    'image/x-targa': 'tga',
    'image/vnd.adobe.photoshop': 'psd',
    'image/x-exr': 'exr',
    'image/vnd.radiance': 'hdr',
    'image/x-dds': 'dds',
    'image/x-pcx': 'pcx',
    'image/x-portable-bitmap': 'pbm',
    'image/x-portable-graymap': 'pgm',
    'image/x-portable-pixmap': 'ppm',
    'image/x-portable-anymap': 'pam',
    'image/x-xpixmap': 'xpm',
    'image/x-xbitmap': 'xbm',
    'image/x-sgi': 'sgi',
    'image/x-sun-raster': 'sun',
    'image/fits': 'fits',
    'image/x-dpx': 'dpx',
    'image/jp2': 'jp2',
    'image/jpx': 'jp2',
    'image/jxl': 'jxl',
    'application/pdf': 'pdf'
  }
  
  // MIMEタイプから拡張子を取得
  const extension = mimeMap[mimeType.toLowerCase()]
  if (extension) {
    return extension
  }
  
  // フォールバック: MIMEタイプから推測
  if (mimeType.startsWith('image/')) {
    const subtype = mimeType.split('/')[1]
    return subtype.toLowerCase()
  }
  
  // 最終フォールバック
  return 'bin'
}

/**
 * ファイル形式を正規化してFFmpegの形式に変換
 */
function normalizeFormat(format: string): string {
  const formatMap: Record<string, string> = {
    'jpg': 'mjpeg',
    'jpeg': 'mjpeg',
    'png': 'png',
    'webp': 'webp',
    'gif': 'gif',
    'bmp': 'bmp',
    'tiff': 'tiff',
    'tif': 'tiff',
    'avif': 'avif',
    'heic': 'heif',
    'heif': 'heif',
    'ico': 'ico',
    'tga': 'tga',
    'psd': 'psd',
    'exr': 'exr',
    'hdr': 'hdr',
    'dds': 'dds',
    'pcx': 'pcx',
    'pbm': 'pbm',
    'pgm': 'pgm', 
    'ppm': 'ppm',
    'pam': 'pam',
    'pfm': 'pfm',
    'xpm': 'xpm',
    'xbm': 'xbm',
    'sgi': 'sgi',
    'sun': 'sun',
    'ras': 'sun',
    'fits': 'fits',
    'fts': 'fits',
    'dpx': 'dpx',
    'cin': 'dpx',
    'j2k': 'j2k',
    'jp2': 'jpeg2000',
    'jxl': 'jxl'
  }
  
  const normalizedInput = format.toLowerCase()
  return formatMap[normalizedInput] || normalizedInput
}

/**
 * リサイズオプションをFFmpegフィルターに変換
 */
function buildResizeFilter(options?: ResizeOptions): string {
  if (!options) return ''
  
  const { width, height, maintainAspectRatio = true } = options
  
  if (!width && !height) return ''
  
  let filter = 'scale='
  
  if (width && height) {
    if (maintainAspectRatio) {
      // アスペクト比を維持してリサイズ（最大サイズ指定）
      filter += `${width}:${height}:force_original_aspect_ratio=decrease`
    } else {
      // 強制的にサイズ変更
      filter += `${width}:${height}`
    }
  } else if (width) {
    // 幅のみ指定（高さは自動計算）
    filter += `${width}:-1`
  } else if (height) {
    // 高さのみ指定（幅は自動計算）
    filter += `-1:${height}`
  }
  
  return filter
}

/**
 * FFmpeg WASMを使用して画像を変換
 */
export async function convertImageWithFFmpeg(
  inputBuffer: ArrayBuffer,
  inputFormat: string,
  outputFormat: string,
  options: ConversionOptions = {}
): Promise<ConversionResult> {
  try {
    await initializeFFmpeg()
    
    if (!ffmpegInstance) {
      throw new Error('FFmpeg インスタンスの初期化に失敗しました')
    }

    const inputData = new Uint8Array(inputBuffer)
    const originalSize = inputData.length
    
    // 入力ファイルの拡張子を決定（複数の方法でフォールバック）
    let inputExt: string
    
    try {
      // 最初にMIMEタイプから変換を試行
      inputExt = mimeTypeToExtension(inputFormat)
      
      // MIMEタイプが不明な場合はバイナリ検出を試行
      if (inputExt === 'bin') {
        inputExt = detectImageFormat(inputBuffer)
        console.log(`バイナリ検出により判定: ${inputExt}`)
      }
    } catch (error) {
      console.warn('フォーマット検出エラー:', error)
      // 最終フォールバック: JPEGとして処理
      inputExt = 'jpg'
    }
    
    const outputExt = outputFormat.toLowerCase()
    
    const inputFileName = `input.${inputExt}`
    const outputFileName = `output.${outputExt}`
    
    console.log(`FFmpeg変換: ${inputFormat} (${inputExt}) -> ${outputFormat} (${outputExt})`)
    
    // 入力ファイルをFFmpegファイルシステムに書き込み
    await ffmpegInstance.writeFile(inputFileName, inputData)
    
    // FFmpegコマンドを構築
    const args: string[] = ['-i', inputFileName]
    
    // リサイズフィルターを追加
    const resizeFilter = buildResizeFilter(options.resize)
    if (resizeFilter) {
      args.push('-vf', resizeFilter)
    }
    
    // 品質設定
    if (options.quality !== undefined) {
      const normalizedOutputFormat = normalizeFormat(outputFormat)
      
      if (normalizedOutputFormat === 'mjpeg') {
        // JPEG用品質設定 (1-31, 値が小さいほど高品質)
        const jpegQuality = Math.round(31 - (options.quality / 100) * 30)
        args.push('-q:v', jpegQuality.toString())
      } else if (normalizedOutputFormat === 'webp') {
        // WebP用品質設定 (0-100)
        args.push('-quality', options.quality.toString())
      } else if (normalizedOutputFormat === 'png') {
        // PNG用圧縮レベル設定 (0-9)
        const pngCompression = Math.round((100 - options.quality) / 11.11)
        args.push('-compression_level', Math.min(9, pngCompression).toString())
      }
    }
    
    // 出力フォーマットを明示的に指定
    const normalizedOutputFormat = normalizeFormat(outputFormat)
    args.push('-f', normalizedOutputFormat)
    
    // 出力ファイル名
    args.push(outputFileName)
    
    console.log('FFmpegコマンド実行:', args.join(' '))
    
    // FFmpegコマンドを実行
    await ffmpegInstance.exec(args)
    
    // 出力ファイルを読み取り
    const outputData = await ffmpegInstance.readFile(outputFileName)
    
    if (!(outputData instanceof Uint8Array)) {
      throw new Error('FFmpegの出力データが無効です')
    }
    
    const newSize = outputData.length
    
    // 一時ファイルをクリーンアップ
    await ffmpegInstance.deleteFile(inputFileName)
    await ffmpegInstance.deleteFile(outputFileName)
    
    console.log(`FFmpeg変換完了: ${originalSize} bytes -> ${newSize} bytes`)
    
    return {
      success: true,
      data: outputData,
      originalSize,
      newSize
    }
    
  } catch (error) {
    console.error('FFmpeg変換エラー:', error)
    
    // エラーハンドラーを使用してユーザーフレンドリーなエラーメッセージを生成
    const errorInfo = parseError(error)
    logError(error, errorInfo)
    
    return {
      success: false,
      error: errorInfo.userMessage
    }
  }
}

/**
 * FFmpegがサポートするフォーマットかチェック
 */
export function isFFmpegFormatSupported(format: string): boolean {
  const supportedFormats = [
    'jpg', 'jpeg', 'png', 'webp', 'gif', 'bmp', 'tiff', 'tif',
    'avif', 'heic', 'heif', 'ico', 'tga', 'psd', 'exr', 'hdr',
    'dds', 'pcx', 'pbm', 'pgm', 'ppm', 'pam', 'pfm', 'xpm', 'xbm',
    'sgi', 'sun', 'ras', 'fits', 'fts', 'dpx', 'cin', 'j2k', 'jp2', 'jxl'
  ]
  
  return supportedFormats.includes(format.toLowerCase())
}

/**
 * FFmpegインスタンスを解放
 */
export function disposeFFmpeg(): void {
  if (ffmpegInstance) {
    ffmpegInstance.terminate()
    ffmpegInstance = null
    isFFmpegInitialized = false
    console.log('FFmpeg WASMインスタンスを解放しました')
  }
} 