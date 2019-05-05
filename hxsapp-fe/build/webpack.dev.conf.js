// 接下来看webpack.dev.conf.js，这里面在webpack.base.conf的基础上增加完善了开发环境下面的配置，主要包括下面几件事情：

// 将webpack的热重载客户端代码添加到每个entry对应的应用
// 合并基础的webpack配置
// 配置样式文件的处理规则，styleLoaders
// 配置Source Maps
// 配置webpack插件

var utils = require('./utils')
var webpack = require('webpack')
var config = require('../config')
var merge = require('webpack-merge')
var baseWebpackConfig = require('./webpack.base.conf')
var HtmlWebpackPlugin = require('html-webpack-plugin')
var FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin')

// add hot-reload related code to entry chunks
Object.keys(baseWebpackConfig.entry).forEach(function (name) {
  baseWebpackConfig.entry[name] = ['./build/dev-client'].concat(baseWebpackConfig.entry[name])
})
// 开发环境下的webpack配置，通过merge方法合并webpack.base.conf.js基础配置
module.exports = merge(baseWebpackConfig, {
  module: {
    //通过传入一些配置来获取rules配置，此处传入了 sourceMap: false,表示不生成sourceMap
    rules: utils.styleLoaders({ sourceMap: config.dev.cssSourceMap })
  },
  // cheap-module-eval-source-map is faster for development
  devtool: '#cheap-module-eval-source-map',
  plugins: [
    // 编译时配置的全局变量
    new webpack.DefinePlugin({
      'process.env': config.dev.env
    }),
    // https://github.com/glenjamin/webpack-hot-middleware#installation--usage
    //热更新插件
    new webpack.HotModuleReplacementPlugin(),
    //不触发错误,即编译后运行的包正常运行
    new webpack.NoEmitOnErrorsPlugin(),
    //自动生成html文件,比如编译后文件的引入
    // https://github.com/ampedandwired/html-webpack-plugin
    new HtmlWebpackPlugin({
      filename: 'index.html',//生成的文件名
      template: 'index.html',//模板
      inject: true
    }),
    //友好的错误提示
    new FriendlyErrorsPlugin()
  ]
})
