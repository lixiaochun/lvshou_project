// https://doc.webpack-china.org/plugins/dll-plugin/
var path = require('path')
//调用webpack内置DllPlugin插件
var webpack = require('webpack') 

// 提取css
var ExtractTextPlugin = require('extract-text-webpack-plugin') 

// 生成文件名，配合HtmlWebpackPlugin增加打包后dll的缓存
var AssetsPlugin = require('assets-webpack-plugin') 

//清空文件夹
var CleanWebpackPlugin = require('clean-webpack-plugin') 

var config = require('../config')

var env = config.build.env

module.exports = {
  entry: {
    libs: [
      'babel-polyfill',
      'vue/dist/vue.esm.js',
      'vue-router',
      // 'vuex',
      'mint-ui',
      'mint-ui/lib/style.css'
      // 'element-ui',
      // 'echarts',
    ],
  },
  output: {
    path: path.resolve(__dirname, '../libs'),
    filename: '[name].[chunkhash:7].js',
    library: '[name]_library',
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': env,
    }),
    new webpack.DllPlugin({
      path: path.resolve(__dirname, '../libs/[name]-mainfest.json'),
      name: '[name]_library',
      context: __dirname, // 执行的上下文环境，对之后DllReferencePlugin有用
    }),
    new ExtractTextPlugin('[name].[contenthash:7].css'),
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false,
      },
    }),
    new AssetsPlugin({
      filename: 'bundle-config.json',
      path: './libs',
    }),
    new CleanWebpackPlugin(['libs'], {
      root: path.join(__dirname, '../'), // 绝对路径
      verbose: true, // 是否显示到控制台
      dry: false, // 不删除所有
    }),
  ],
  module: {
    rules: [
      {
        test: /\.js$/,
        loader: 'babel-loader',
      },
      {
        test: /\.css$/,   //这是注释掉的模块，一开始很疑惑加入css的编译模块马上就报错了，注释掉之后sass代码照样可以成功编译。
        loader: ["style-loader", "css-loader"]
      }
    ],
  },
}