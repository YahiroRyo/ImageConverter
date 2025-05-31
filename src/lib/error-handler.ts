/**
 * ImageMagick WASM エラーハンドリングモジュール
 * 様々なエラーメッセージパターンを検出し、日本語でユーザーフレンドリーなメッセージに変換します
 */

export interface ErrorInfo {
  userMessage: string;
  category: 'initialization' | 'format' | 'memory' | 'processing' | 'file' | 'network' | 'unknown';
  recoverable: boolean;
  suggestions?: string[];
}

/**
 * エラーメッセージのパターン定義
 */
const ERROR_PATTERNS: Array<{
  pattern: RegExp;
  category: ErrorInfo['category'];
  userMessage: string;
  recoverable: boolean;
  suggestions?: string[];
}> = [
  // WASM初期化関連エラー
  {
    pattern: /Failed to fetch WASM file|WASM file is empty|Failed to initialize ImageMagick WASM/i,
    category: 'initialization',
    userMessage: 'アプリケーションの初期化に失敗しました',
    recoverable: true,
    suggestions: [
      'ページを再読み込みしてください',
      'インターネット接続を確認してください',
      'ブラウザのキャッシュをクリアしてください'
    ]
  },
  {
    pattern: /WebAssembly instantiation failed/i,
    category: 'initialization',
    userMessage: 'ブラウザの互換性に問題があります',
    recoverable: false,
    suggestions: [
      '最新版のブラウザをご利用ください',
      'Chrome、Firefox、Safari、Edgeなどの対応ブラウザをお試しください'
    ]
  },
  {
    pattern: /float unrepresentable in integer range|RuntimeError.*integer range/i,
    category: 'processing',
    userMessage: '画像の数値処理でエラーが発生しました',
    recoverable: true,
    suggestions: [
      '画質設定を下げてお試しください',
      '画像サイズを小さくしてお試しください',
      '別の出力フォーマットをお試しください'
    ]
  },

  // フォーマット関連エラー
  {
    pattern: /Unsupported output format|Format.*not found in MagickFormat|not available in MagickFormat/i,
    category: 'format',
    userMessage: '選択されたフォーマットはサポートされていません',
    recoverable: true,
    suggestions: [
      '別の出力フォーマットを選択してください',
      'JPEG、PNG、WebPなどの一般的なフォーマットをお試しください'
    ]
  },
  {
    pattern: /Failed to get MagickFormat enum/i,
    category: 'format',
    userMessage: 'フォーマット変換でエラーが発生しました',
    recoverable: true,
    suggestions: [
      '別の出力フォーマットを選択してください',
      'ファイルを再アップロードしてお試しください'
    ]
  },
  {
    pattern: /no decode delegate for this image format|Unknown image format/i,
    category: 'format',
    userMessage: 'この画像フォーマットは読み込めません',
    recoverable: true,
    suggestions: [
      'JPEG、PNG、GIF、WebPなどの一般的な画像ファイルをお使いください',
      'ファイルが破損していないか確認してください'
    ]
  },
  {
    pattern: /unable to read image data|corrupt image|invalid image|malformed image/i,
    category: 'file',
    userMessage: '画像ファイルが破損しているか読み込めません',
    recoverable: true,
    suggestions: [
      '別の画像ファイルをお試しください',
      'ファイルが完全にダウンロード・保存されているか確認してください'
    ]
  },

  // メモリ関連エラー
  {
    pattern: /out of memory|memory allocation failed|insufficient memory/i,
    category: 'memory',
    userMessage: 'メモリ不足のため処理を完了できません',
    recoverable: true,
    suggestions: [
      '画像サイズを小さくしてお試しください',
      '画質設定を下げてお試しください',
      '他のタブやアプリケーションを閉じてからお試しください'
    ]
  },
  {
    pattern: /Maximum call stack size exceeded|stack overflow/i,
    category: 'memory',
    userMessage: '画像が複雑すぎて処理できません',
    recoverable: true,
    suggestions: [
      'より小さな画像をお試しください',
      '画像を分割してから処理してください'
    ]
  },

  // ファイル処理関連エラー
  {
    pattern: /unable to open file|file not found|access denied/i,
    category: 'file',
    userMessage: 'ファイルにアクセスできません',
    recoverable: true,
    suggestions: [
      'ファイルを再選択してください',
      'ファイルが存在することを確認してください'
    ]
  },
  {
    pattern: /file too large|image dimensions too large/i,
    category: 'file',
    userMessage: 'ファイルサイズまたは画像サイズが大きすぎます',
    recoverable: true,
    suggestions: [
      'より小さな画像をお使いください',
      '画像編集ソフトで事前にサイズを小さくしてください'
    ]
  },

  // ネットワーク関連エラー
  {
    pattern: /network error|fetch.*failed|connection.*failed/i,
    category: 'network',
    userMessage: 'ネットワークエラーが発生しました',
    recoverable: true,
    suggestions: [
      'インターネット接続を確認してください',
      'しばらく時間をおいてからお試しください'
    ]
  },

  // 処理関連エラー
  {
    pattern: /operation not supported|feature not supported/i,
    category: 'processing',
    userMessage: 'この操作はサポートされていません',
    recoverable: true,
    suggestions: [
      '別の処理方法をお試しください',
      'より一般的な設定をお使いください'
    ]
  },
  {
    pattern: /invalid parameter|invalid argument|parameter out of range/i,
    category: 'processing',
    userMessage: '設定値が正しくありません',
    recoverable: true,
    suggestions: [
      '設定値を確認してください',
      'デフォルト設定に戻してお試しください'
    ]
  },
  {
    pattern: /timeout|operation timed out/i,
    category: 'processing',
    userMessage: '処理時間が長すぎるため中止されました',
    recoverable: true,
    suggestions: [
      'より小さな画像をお試しください',
      'より簡単な処理設定をお試しください'
    ]
  },

  // WASM特有のエラー
  {
    pattern: /WebAssembly.*abort|wasm.*abort/i,
    category: 'processing',
    userMessage: '処理中に予期しないエラーが発生しました',
    recoverable: true,
    suggestions: [
      'ページを再読み込みしてお試しください',
      '別の画像でお試しください'
    ]
  },
  {
    pattern: /CompileError|LinkError|RuntimeError.*wasm/i,
    category: 'initialization',
    userMessage: 'ブラウザでの実行に問題があります',
    recoverable: false,
    suggestions: [
      'ブラウザを最新版に更新してください',
      '別のブラウザでお試しください'
    ]
  },

  // 権限関連エラー
  {
    pattern: /permission denied|access forbidden/i,
    category: 'file',
    userMessage: 'ファイルへのアクセス権限がありません',
    recoverable: true,
    suggestions: [
      'ファイルを再選択してください',
      'ファイルのアクセス権限を確認してください'
    ]
  },

  // FFmpeg WASM関連エラー
  {
    pattern: /FFmpeg.*初期化.*失敗|Failed to initialize FFmpeg/i,
    category: 'initialization',
    userMessage: 'FFmpeg処理エンジンの初期化に失敗しました',
    recoverable: true,
    suggestions: [
      'ページを再読み込みしてください',
      'インターネット接続を確認してください',
      'ブラウザのキャッシュをクリアしてください'
    ]
  },
  {
    pattern: /SharedArrayBuffer.*not defined|Cross-Origin.*required/i,
    category: 'initialization',
    userMessage: 'ブラウザのセキュリティ制限によりFFmpegを使用できません',
    recoverable: false,
    suggestions: [
      'Chrome、Firefox、Safariなどの対応ブラウザをお使いください',
      'HTTPSサイトでアクセスしてください'
    ]
  },
  {
    pattern: /FFmpeg.*インスタンス.*初期化.*失敗|FFmpeg instance.*failed/i,
    category: 'initialization',
    userMessage: 'FFmpegエンジンの起動に失敗しました',
    recoverable: true,
    suggestions: [
      'ページを再読み込みしてください',
      'しばらく時間をおいてからお試しください',
      '別のブラウザでお試しください'
    ]
  },
  {
    pattern: /FFmpeg.*コマンド.*実行.*失敗|FFmpeg command.*failed/i,
    category: 'processing',
    userMessage: 'FFmpegでの画像処理に失敗しました',
    recoverable: true,
    suggestions: [
      '別の出力フォーマットをお試しください',
      '画像サイズを小さくしてお試しください',
      '品質設定を変更してお試しください'
    ]
  },
  {
    pattern: /FFmpeg.*出力.*データ.*無効|FFmpeg output.*invalid/i,
    category: 'processing',
    userMessage: 'FFmpegの処理結果が無効です',
    recoverable: true,
    suggestions: [
      '別の画像ファイルでお試しください',
      '出力フォーマットを変更してお試しください',
      'ページを再読み込みしてお試しください'
    ]
  },
  {
    pattern: /ImageMagickとFFmpeg.*両方.*エラー|Both ImageMagick and FFmpeg.*failed/i,
    category: 'processing',
    userMessage: '複数の処理エンジンでエラーが発生しました',
    recoverable: true,
    suggestions: [
      '画像ファイルが破損していないか確認してください',
      'より一般的なフォーマット（JPEG、PNG）をお試しください',
      '画像サイズを小さくしてお試しください',
      'ページを再読み込みしてお試しください'
    ]
  },
  {
    pattern: /ErrnoError.*FS error|FFmpeg.*FS error|unable to open.*No such file/i,
    category: 'file',
    userMessage: 'ファイル処理でエラーが発生しました',
    recoverable: true,
    suggestions: [
      '別の画像ファイルをお試しください',
      'ファイル形式を確認してください',
      'ページを再読み込みしてお試しください'
    ]
  },
  {
    pattern: /FFmpeg.*command.*failed|Invalid data found when processing input/i,
    category: 'processing',
    userMessage: 'FFmpeg処理でエラーが発生しました',
    recoverable: true,
    suggestions: [
      '別の出力フォーマットをお試しください',
      '画像が破損していないか確認してください',
      'より一般的な画像フォーマットをお試しください'
    ]
  }
];

/**
 * 汎用的なエラーメッセージ
 */
const FALLBACK_ERROR: ErrorInfo = {
  userMessage: '予期しないエラーが発生しました',
  category: 'unknown',
  recoverable: true,
  suggestions: [
    'ページを再読み込みしてお試しください',
    '別の画像やフォーマットでお試しください',
    '問題が続く場合は、しばらく時間をおいてからお試しください'
  ]
};

/**
 * エラーメッセージを解析して、ユーザーフレンドリーな日本語メッセージとカテゴリ情報を返します
 * 
 * @param error エラーオブジェクトまたはメッセージ
 * @returns エラー情報
 */
export function parseError(error: unknown): ErrorInfo {
  const errorMessage = getErrorMessage(error);
  
  // パターンマッチングで適切なエラー情報を検索
  for (const pattern of ERROR_PATTERNS) {
    if (pattern.pattern.test(errorMessage)) {
      return {
        userMessage: pattern.userMessage,
        category: pattern.category,
        recoverable: pattern.recoverable,
        suggestions: pattern.suggestions
      };
    }
  }
  
  // マッチしない場合は汎用エラーメッセージを返す
  return FALLBACK_ERROR;
}

/**
 * エラーから文字列メッセージを抽出します
 * 
 * @param error エラーオブジェクト
 * @returns エラーメッセージ文字列
 */
function getErrorMessage(error: unknown): string {
  if (error instanceof Error) {
    return error.message;
  }
  
  if (typeof error === 'string') {
    return error;
  }
  
  if (error && typeof error === 'object' && 'message' in error) {
    return String(error.message);
  }
  
  return String(error);
}

/**
 * エラーカテゴリに基づいて推奨アクションを取得します
 * 
 * @param category エラーカテゴリ
 * @returns 推奨アクション
 */
export function getRecommendedActions(category: ErrorInfo['category']): string[] {
  switch (category) {
    case 'initialization':
      return [
        'ページを再読み込みしてください',
        'ブラウザを最新版に更新してください',
        'キャッシュをクリアしてお試しください'
      ];
    
    case 'format':
      return [
        '別の出力フォーマットを選択してください',
        'JPEG、PNG、WebPなどの一般的なフォーマットをお試しください'
      ];
    
    case 'memory':
      return [
        '画像サイズを小さくしてお試しください',
        '他のタブやアプリケーションを閉じてください',
        '品質設定を下げてお試しください'
      ];
    
    case 'processing':
      return [
        '設定を確認してお試しください',
        'より小さな画像をお使いください',
        'デフォルト設定に戻してお試しください'
      ];
    
    case 'file':
      return [
        'ファイルを再選択してください',
        'ファイルが破損していないか確認してください',
        '別の画像ファイルをお試しください'
      ];
    
    case 'network':
      return [
        'インターネット接続を確認してください',
        'しばらく時間をおいてからお試しください'
      ];
    
    default:
      return FALLBACK_ERROR.suggestions || [];
  }
}

/**
 * エラーをログに記録します（開発環境用）
 * 
 * @param error 元のエラー
 * @param errorInfo 解析されたエラー情報
 */
export function logError(error: unknown, errorInfo: ErrorInfo): void {
  if (process.env.NODE_ENV === 'development') {
    console.group('🚨 ImageMagick エラー詳細');
    console.log('カテゴリ:', errorInfo.category);
    console.log('ユーザーメッセージ:', errorInfo.userMessage);
    console.log('復旧可能:', errorInfo.recoverable);
    console.log('推奨アクション:', errorInfo.suggestions);
    console.log('元のエラー:', error);
    console.groupEnd();
  }
}

/**
 * よく発生するエラーパターンのリスト（デバッグ用）
 */
export const COMMON_ERROR_PATTERNS = [
  'WASM初期化失敗',
  'フォーマット未対応', 
  'メモリ不足',
  '画像破損',
  'ファイルサイズ過大',
  'ネットワークエラー',
  '数値計算エラー',
  'ブラウザ互換性',
  'タイムアウト',
  'アクセス権限'
] as const;

export type CommonErrorPattern = typeof COMMON_ERROR_PATTERNS[number];

/**
 * エラーハンドリングのテスト用関数（開発環境でのみ利用）
 */
export function testErrorPatterns(): void {
  if (process.env.NODE_ENV !== 'development') {
    return;
  }
  
  console.group('🧪 エラーパターンテスト');
  
  const testCases = [
    'Failed to fetch WASM file: 404 Not Found',
    'float unrepresentable in integer range',
    'Unsupported output format: INVALID',
    'out of memory',
    'network error occurred',
    'operation not supported',
    'some unknown error that should fall back'
  ];
  
  testCases.forEach(testCase => {
    const errorInfo = parseError(testCase);
    console.log(`入力: "${testCase}"`);
    console.log(`出力: ${errorInfo.userMessage} (${errorInfo.category})`);
    console.log('---');
  });
  
  console.groupEnd();
}

/**
 * エラー統計情報を取得（開発用）
 */
export function getErrorStatistics(): Record<ErrorInfo['category'], number> {
  const stats: Record<ErrorInfo['category'], number> = {
    initialization: 0,
    format: 0,
    memory: 0,
    processing: 0,
    file: 0,
    network: 0,
    unknown: 0
  };
  
  ERROR_PATTERNS.forEach(pattern => {
    stats[pattern.category]++;
  });
  
  return stats;
}

/**
 * 使用例とドキュメント
 * 
 * @example
 * ```typescript
 * try {
 *   await convertImage(arrayBuffer, 'image/jpeg', 'PNG');
 * } catch (error) {
 *   const errorInfo = parseError(error);
 *   logError(error, errorInfo);
 *   
 *   // ユーザーにエラーメッセージを表示
 *   showErrorToUser(errorInfo.userMessage);
 *   
 *   // 推奨アクションを表示
 *   if (errorInfo.suggestions) {
 *     showSuggestions(errorInfo.suggestions);
 *   }
 * }
 * ```
 */ 