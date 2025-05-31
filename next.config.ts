import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // 静的ファイルの配信設定
  async headers() {
    return [
      {
        source: '/magick.wasm',
        headers: [
          {
            key: 'Content-Type',
            value: 'application/wasm',
          },
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
    ];
  },

  output: 'standalone',
  
  webpack: (config, { isServer }) => {
    // WASMファイルの処理設定
    config.experiments = {
      ...config.experiments,
      asyncWebAssembly: true,
      syncWebAssembly: true,
    };

    if (!isServer) {
      config.output.assetModuleFilename = 'static/[hash][ext]';
      config.output.publicPath = '/_next/';
    }

    // WASMファイルをassetとして扱う
    config.module.rules.push({
      test: /\.wasm$/,
      type: 'asset/resource',
      generator: {
        filename: 'static/wasm/[hash][ext][query]',
      },
    });

    // resolve.fallbackの設定
    config.resolve.fallback = {
      ...config.resolve.fallback,
      fs: false,
      path: false,
    };

    return config;
  },
};

export default nextConfig;
