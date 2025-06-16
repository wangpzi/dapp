// 开启js多线程压缩
const TerserPlugin = require('terser-webpack-plugin');
// 开启css多线程压缩
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
// 压缩html
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { join, resolve } = require('path');
// 整站离线缓存
// const  WorkboxPlugin = require("workbox-webpack-plugin");

module.exports = {
  output: {
    path: join(__dirname, '../dist'),
    publicPath: './',
    filename: 'scripts/[name].[contenthash:5].bundle.js',
    assetModuleFilename: 'images/[name].[contenthash:5][ext]',
  },
  // experiments: {
  //   outputModule: true,
  // },
  performance: {
    maxAssetSize: 250000, // 最大资源大小250kb
    maxEntrypointSize: 250000, // 最大入口大小250kb
    hints: 'warning', // 超出限制时给出警告
  },
  optimization: {
    minimize: true,
    minimizer: [
      new TerserPlugin({
        parallel: true,
      }),
      new CssMinimizerPlugin({
        parallel: true,
      }),
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: 'sellp',
      filename: 'index.html',
      template: resolve(__dirname, '../src/index-prd.html'),
      // favicon: '../public/favicon.ico',
    }),
  ],
};
