const HtmlWebpackPlugin = require("html-webpack-plugin");
const { resolve, join } = require("path");
const port = 3003;
const FriendlyErrorsWebpackPlugin = require('@soda/friendly-errors-webpack-plugin');
const notifier = require('node-notifier')
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin

module.exports = {
  devServer: {
    // 单页spa应用， 使用起来
    historyApiFallback: true,
    static: {
      directory: join(__dirname, "../dist"),
    },
    hot: true,
    port,
  },
  output: {
    publicPath: '/',
    // 如果是通过laoder编译的 放到script文件夹里的filename
    filename: 'srcipts/[name].build.js',
    // 如果是通过'asset/resource' 编译的
    assetModuleFilename: 'images/[name].[ext]',
  },
  plugins: [
    new HtmlWebpackPlugin({
      filename: "index.html",
      // favicon: './public/favicon.ico',
      template: resolve(__dirname, "../src/index-dev.html"),
    }),
    new FriendlyErrorsWebpackPlugin({
      compilationSuccessInfo: {
        messages: ['You application is running here http://localhost:' + port],
        notes: ['💊 构建信息请及时关注窗口右上角'],
      },
      // new WebpackBuildNotifierPlugin({
      //   title: '💿 Solv Dvelopment Notification',
      //   logo,
      //   suppressSuccess: true,
      // }),
      onErrors: function (severity, errors) {
        if (severity !== 'error') {
          return;
        }
        const error = errors[0];
        console.log(error);
        notifier.notify({
          title: '👒 Webpack Build Error',
          message: severity + ': ' + error.name,
          subtitle: error.file || '',
          // icon: join(__dirname, 'icon.png'),
        });
      },
      clearConsole: true,
    }),
    new BundleAnalyzerPlugin()
  ],
};
