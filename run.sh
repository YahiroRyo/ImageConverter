#!/bin/bash

main() {
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