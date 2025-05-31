#!/bin/bash

kill_nextjs_processes() {
    echo "🔍 既存のNext.jsプロセスを検索中..."
    
    # Next.js関連のプロセスを検索
    NEXTJS_PIDS=$(pgrep -f "node.*server\.js\|next-server*|next.*dev\|next.*start" 2>/dev/null)
    
    if [ -n "$NEXTJS_PIDS" ]; then
        echo "🔥 既存のNext.jsプロセスを終了中..."
        echo "終了するプロセス: $NEXTJS_PIDS"
        kill -9 $NEXTJS_PIDS 2>/dev/null
        sleep 2
        echo "✅ プロセスが終了されました"
    else
        echo "✅ 実行中のNext.jsプロセスはありません"
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