const merge = require("webpack-merge");
const args = require("yargs-parser")(process.argv.slice(2));
console.log(args, "arge");
const { resolve } = require("path");
const _mode = args.mode || "development";
const _mergeConfig = require(`./config/webpack.${_mode}.js`);
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const _modeflag = _mode == "prodution" ? true : false;

// 进度条样式
const { ThemedProgressPlugin } = require('themed-progress-plugin')

const webpackBaseConfig = {
  entry: {
    main: resolve("src/index.tsx"),
  },
  output: {
    path: resolve(process.cwd(), "dist"),
  },
  resolve: {
    alias: {
      '@': resolve('src/'),
      '@components': resolve('src/components'),
      '@hooks': resolve('src/hooks'),
      '@pages': resolve('src/pages'),
      '@layouts': resolve('src/layouts'),
      '@assets': resolve('src/assets'),
      '@states': resolve('src/states'),
      '@service': resolve('src/service'),
      '@utils': resolve('src/utils'),
      '@lib': resolve('src/lib'),
      '@constants': resolve('src/constants'),
      '@connections': resolve('src/connections'),
      '@abis': resolve('src/abis'),
      '@types': resolve('src/types'),
    },
    extensions: ['.tsx', '.ts', '.js', '.jsx'],
  },
  module: {
    rules: [
      {
        test: /\.(ts|tsx)$/,
        exclude: /(node_modules)/,
        use: {
          loader: "swc-loader",
        },
      },
      {
        test: /\.(eot|woff|woff2|ttf|svg|png|jpg)$/i,
        type: "asste/resource",
      },
      {
        test: /\.css$/i,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: "css-loader",
            options: { importLoaders: 1 },
          },
          'postcss-loader'
        ],
      },
    ],
  },
  //  hash  整个网站都用一个 
  //  contenthash  js 和css hash各部相同
  //  chunkhash js和css hash 一样
  plugins: [
    new CleanWebpackPlugin(),
    new MiniCssExtractPlugin({
      filename: _modeflag ? "css/[name].[contenthash:5].css" : "css/[name].css",
      chunkFilename: _mergeConfig ? "css/[name].[contenthash:5].css" : "css/[name].css",
       ignoreOrder: false
    }),
    new ThemedProgressPlugin()
  ],
};

module.exports = merge.default(webpackBaseConfig, _mergeConfig);
