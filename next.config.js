/** @type {import('next').NextConfig} */
const withAntdLess = require('next-plugin-antd-less');
const fs = require('fs');
const path = require('path');
const isProduction = process.env.NODE_ENV === 'production';
const isTest = process.env.NODE_ENV === 'test';
const isLocal = process.env.NODE_ENV === 'development';

const STATIC_ASSETS_URL = '/static/assets'

// 接口地址
const API_HOST_DEV = 'http://dev.com';
const API_HOST_TEST = 'http://test.com';
const API_HOST_PROD = 'http://prod.com';

// 上传文件目录
const uploadDir = path.resolve(path.dirname(process.argv[1]), '../uploads');
if (!fs.existsSync(uploadDir)) {
  try {
    fs.mkdirSync(uploadDir);
  } catch (e) {
    throw new Error(
      `no upload directory ${uploadDir}, make it first before start service`,
    );
  }
}

module.exports = withAntdLess({
  lessVarsFilePath: './src/styles/variables.less',
  cssLoaderOptions: {
    esModule: false,
    sourceMap: false,
    modules: {
      mode: 'local',
    },
  },

  // Other NextConfig Here...
  webpack(config, options) {
    config.module.rules.push(
      {
        test: /\.(png|jpe?g|svg|gif)$/,
        type: 'asset/inline',
      },
      {
        test: /\.(eot|otf|ttf|woff|woff2)$/,
        type: 'asset/resource',
        generator: {
          filename: 'static/media/[name].[hash:8][ext]',
        },
      },
    );

    return config;
  },
  env: {},
  publicRuntimeConfig: {
    API_HOST: isProduction
      ? API_HOST_PROD
      : isTest
      ? API_HOST_TEST
      : API_HOST_DEV,
    API_VERSION: 'v1.0.0',
    STATIC_ASSETS_URL,
  },
  images: {
    // disable static image imports
    disableStaticImages: true,
    // The expiration (or rather Max Age)
    minimumCacheTTL: 60,
    //  a list of allowed hostnames for external images
    domains: ['shared.ydstatic.com'],
  },
});
