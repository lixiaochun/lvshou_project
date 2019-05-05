// 从代码中看到，dev-server使用的webpack配置来自build/webpack.dev.conf.js文件（测试环境下使用的是build/webpack.prod.conf.js，这里暂时不考虑测试环境）。而build/webpack.dev.conf.js中又引用了webpack.base.conf.js，所以这里我先分析webpack.base.conf.js。

// webpack.base.conf.js主要完成了下面这些事情：

// 配置webpack编译入口
// 配置webpack输出路径和命名规则
// 配置模块resolve规则
// 配置不同类型模块的处理规则
// 说明： 这个配置里面只配置了.js、.vue、图片、字体等几类文件的处理规则，如果需要处理其他文件可以在module.rules里面另行配置

var path = require('path')
var utils = require('./utils')
var config = require('../config')
var vueLoaderConfig = require('./vue-loader.conf')

var HappyPack = require('happypack')
var os = require('os')
var happyThreadPool = HappyPack.ThreadPool({ size: os.cpus().length })

var webpack = require('webpack')

function resolve(dir) {
  return path.join(__dirname, '..', dir)
}

function createHappyPlugin(id, loaders) {
  return new HappyPack({
    id: id,
    loaders: loaders,
    threadPool: happyThreadPool,
    verbose: true
  })
}

module.exports = {
  // 入口文件entry
  entry: {
    app: ["babel-polyfill", './src/main.js']
    // app: './src/main.js'
  },
  // 输出文件output
  output: {
    //导出目录的绝对路径
    path: config.build.assetsRoot,
    //导出文件的文件名
    filename: '[name].js',
    publicPath: process.env.NODE_ENV === 'production' ?
      config.build.assetsPublicPath : config.dev.assetsPublicPath
  },
  // 文件解析resolve
  resolve: {
    //自动解析确定的拓展名,使导入模块时不带拓展名
    extensions: ['.js', '.vue', '.json'],
    alias: {
      // 创建import或require的别名
      'vue$': 'vue/dist/vue.esm.js',
      '@': resolve('src'),
      'API': resolve('src/Lib/API'),
      'Utils': resolve('src/Lib/utils')
    }
  },
  // 模块解析module
  module: {
    rules: [
      {
        test: require.resolve('jquery'),
        use: [{
          loader: 'expose-loader',
          options: '$'
        }]
      },
      {
        // vue文件后缀
        test: /\.vue$/,
        loader: 'vue-loader',
        //options是对vue-loader做的额外选项配置
        options: vueLoaderConfig
      },
      {
        test: /\.js$/,
        // loader: 'babel-loader',
        //必须处理包含src文件夹
        loader: 'happypack/loader?id=happy-babel-js',
        include: [resolve('src')],
        exclude: /node_modules/
      },
      {
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        loader: 'url-loader',
        // options是对loader做额外的选项配置
        options: {
          //图片小于10000字节时以base64的方式引用
          limit: 10000,
          //文件名为name.7位hash值.拓展名
          name: utils.assetsPath('img/[name].[hash:7].[ext]')
        }
      },
      {
        test: /\.less$/,
        // 执行顺序从右到左开始执行
        loader: "style-loader!css-loader!less-loader",
      },
      {
        test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: utils.assetsPath('media/[name].[hash:7].[ext]')
        }
      },
      {
        test: /\.scss$/,
        loaders: ["style", "css", "sass"]
      },
      {
        //字体文件
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: utils.assetsPath('fonts/[name].[hash:7].[ext]')
        }
      },
    ]
  },
  plugins: [
    createHappyPlugin('happy-babel-js', ['babel-loader?cacheDirectory=true']),

    new webpack.ProvidePlugin({
      $: "jquery",
      jQuery: "jquery",
      "windows.jQuery": "jquery"
    }),

    // 避免momentjs除了中文之外的语言包被打包进入，size过大。
    new webpack.ContextReplacementPlugin(/moment[\/\\]locale$/, /zh-cn/)
  ]
}
