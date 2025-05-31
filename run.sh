#!/bin/bash

kill_nextjs_processes() {
    echo "🔍 既存のNext.jsプロセスを検索中..."
    
    # Next.js関連のプロセスを検索
    NEXTJS_PIDS=$(pgrep -f "node.*server\.js\|next-server\|next.*dev\|next.*start" 2>/dev/null)
    
    # ポート3000を使用しているプロセスIDのみを取得
    PORT_3000_PIDS=$(netstat -tlnp 2>/dev/null | grep ':3000 ' | awk '{print $7}' | cut -d'/' -f1 | grep -E '^[0-9]+$' 2>/dev/null)
    
    # ssコマンドも試す（netstatが利用できない場合）
    if [ -z "$PORT_3000_PIDS" ]; then
        PORT_3000_PIDS=$(ss -tlnp 2>/dev/null | grep ':3000 ' | sed 's/.*pid=\([0-9]*\).*/\1/' | grep -E '^[0-9]+$' 2>/dev/null)
    fi
    
    # 両方のプロセスIDを結合（重複を削除）
    ALL_PIDS=$(echo "$NEXTJS_PIDS $PORT_3000_PIDS" | tr ' ' '\n' | grep -E '^[0-9]+$' | sort -u | tr '\n' ' ')
    
    if [ -n "$ALL_PIDS" ] && [ "$ALL_PIDS" != " " ]; then
        echo "🔥 既存のNext.js/ポート3000プロセスを終了中..."
        echo "終了するプロセス: $ALL_PIDS"
        kill -9 $ALL_PIDS 2>/dev/null
        sleep 3
        
        # 再度確認（netstatを使用）
        REMAINING_PIDS=$(netstat -tlnp 2>/dev/null | grep ':3000 ' | awk '{print $7}' | cut -d'/' -f1 | grep -E '^[0-9]+$' 2>/dev/null)
        if [ -z "$REMAINING_PIDS" ]; then
            REMAINING_PIDS=$(ss -tlnp 2>/dev/null | grep ':3000 ' | sed 's/.*pid=\([0-9]*\).*/\1/' | grep -E '^[0-9]+$' 2>/dev/null)
        fi
        
        if [ -n "$REMAINING_PIDS" ]; then
            echo "🔥 残存プロセスを強制終了中..."
            kill -9 $REMAINING_PIDS 2>/dev/null
            sleep 2
        fi
        
        echo "✅ プロセスが終了されました"
    else
        echo "✅ 実行中のNext.js/ポート3000プロセスはありません"
    fi
}

main() {
    # 既存のプロセスをキル
    kill_nextjs_processes
    
    echo "🔨 パッケージをインストール中..."
    npm install

    echo "🔨 Next.jsプロジェクトをビルド中..."
    npm run build

    echo "📁 静的ファイルをスタンドアロンディレクトリにコピー中..."
    # .next/static/を.next/standalone/.next/static/にコピー
    cp -r .next/static .next/standalone/.next/
    
    echo "📁 publicファイルをスタンドアロンディレクトリにコピー中..."
    # publicフォルダの内容を.next/standalone/public/にコピー
    cp -r public .next/standalone/

    echo "🚀 サーバーを起動中..."
    cd .next/standalone
    node server.js
}

main