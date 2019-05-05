// 主要完成下面几件事情：

// 合并基础的webpack配置
// 配置样式文件的处理规则，styleLoaders
// 配置webpack的输出
// 配置webpack插件
// gzip模式下的webpack插件配置
// webpack-bundle分析
// 说明： webpack插件里面多了丑化压缩代码以及抽离css文件等插件。

var path = require('path')
var utils = require('./utils')
var webpack = require('webpack')
var config = require('../config')
var merge = require('webpack-merge')
var baseWebpackConfig = require('./webpack.base.conf')
// copy-webpack-plugin，用于将static中的静态文件复制到产品文件夹dist
var CopyWebpackPlugin = require('copy-webpack-plugin')

var HtmlWebpackPlugin = require('html-webpack-plugin')
var ExtractTextPlugin = require('extract-text-webpack-plugin')
// optimize-css-assets-webpack-plugin，用于优化和最小化css资源
var OptimizeCSSPlugin = require('optimize-css-assets-webpack-plugin')


//调入生成的的路径json 暂时不用
// var bundleConfig = require("../libs/bundle-config.json") 

// 替换压缩js的速度插件 暂时不用
var ParallelUglifyPlugin = require('webpack-parallel-uglify-plugin')

var env = config.build.env
// 生产环境下的webpack配置，通过merge方法合并webpack.base.conf.js基础配置
var webpackConfig = merge(baseWebpackConfig, {
  // 主要是针对css的处理，同样的此处调用了utils.styleLoaders
  module: {
    rules: utils.styleLoaders({
      sourceMap: config.build.productionSourceMap,
      extract: true
    })
  },
  devtool: config.build.productionSourceMap ? '#source-map' : false,
  // 输出文件output
  output: {
    //导出文件目录
    path: config.build.assetsRoot,
    //导出的文件名
    filename: utils.assetsPath('js/[name].[chunkhash].js'),
    //非入口文件的文件名，而又需要被打包出来的文件命名配置,如按需加载的模块
    chunkFilename: utils.assetsPath('js/[id].[chunkhash].js')
  },
  plugins: [

    // 增加DllReferencePlugin配置 暂时不用
    // new webpack.DllReferencePlugin({
    //   context: __dirname,
    //   // 指向生成的manifest.json
    //   manifest: require("../libs/libs-mainfest.json") 
    // }),

    new webpack.optimize.OccurrenceOrderPlugin(),

    // http://vuejs.github.io/vue-loader/en/workflow/production.html
    //配置全局环境为生产环境
    new webpack.DefinePlugin({
      'process.env': env
    }),
    //js文件压缩插件
    new webpack.optimize.UglifyJsPlugin({
      //压缩配置
      compress: {
        // 不显示警告
        warnings: false,
        drop_console: true,
        drop_debugger: true
      },
      //生成sourceMap文件
      sourceMap: true
    }),
    // new ParallelUglifyPlugin({
    //   cacheDir: '.cache/',
    //   uglifyJS:{
    //     output: {
    //       comments: false
    //     },
    //     compress: {
    //       warnings: false,
    //       drop_console: true,
    //       drop_debugger: true
    //     }
    //   }
    // }),

    // extract css into its own file
    //将js中引入的css分离的插件
    new ExtractTextPlugin({
      //分离出的css文件名
      filename: utils.assetsPath('css/[name].[contenthash].css'),
      allChunks: true
    }),
    // Compress extracted CSS. We are using this plugin so that possible
    // duplicated CSS from different components can be deduped.
    //压缩提取出的css，并解决ExtractTextPlugin分离出的js重复问题(多个文件引入同一css文件)
    new OptimizeCSSPlugin({
      cssProcessorOptions: {
        safe: true
      }
    }),
    // generate dist index.html with correct asset hash for caching.
    // you can customize output by editing /index.html
    // see https://github.com/ampedandwired/html-webpack-plugin
    //生成html的插件,引入css文件和js文件
    new HtmlWebpackPlugin({
      // 增加两个变量 暂时不用
      // libJsName: bundleConfig.libs.js,
      // libCssName: bundleConfig.libs.css,

      //生成的html的文件名
      filename: config.build.index,
      //依据的模板
      template: 'index.html',
      //注入的js文件将会被放在body标签中,当值为'head'时，将被放在head标签中
      inject: true,
      //压缩配置
      minify: {
        //删除html中的注释代码
        removeComments: true,
        //删除html中的空白符
        collapseWhitespace: true,
        //删除html元素中属性的引号
        removeAttributeQuotes: true
        // more options:
        // https://github.com/kangax/html-minifier#options-quick-reference
      },
      // necessary to consistently work with multiple chunks via CommonsChunkPlugin
      //按dependency的顺序引入,比如，需要先注入vendor.js，再注入app.js
      chunksSortMode: 'dependency'
    }),
    // keep module.id stable when vender modules does not change
    new webpack.HashedModuleIdsPlugin(),

    // split vendor js into its own file
    //分离公共js到vendor中
    new webpack.optimize.CommonsChunkPlugin({
      //文件名
      name: 'vendor',
      minChunks: function (module, count) {
        // any required modules inside node_modules are extracted to vendor
        // 声明公共的模块来自node_modules文件夹
        return (
          module.resource &&
          /\.js$/.test(module.resource) &&
          module.resource.indexOf(
            path.join(__dirname, '../node_modules')
          ) === 0
        )
      }
    }),
    // extract webpack runtime and module manifest to its own file in order to
    // prevent vendor hash from being updated whenever app bundle is updated
    //上面虽然已经分离了第三方库,每次修改编译都会改变vendor的hash值，导致浏览器缓存失效。原因是vendor包含了webpack在打包过程中会产生一些运行时代码，运行时代码中实际上保存了打包后的文件名。当修改业务代码时,业务代码的js文件的hash值必然会改变。一旦改变必然会导致vendor变化。vendor变化会导致其hash值变化。

    //下面主要是将运行时代码提取到单独的manifest文件中，防止其影响vendor.js
    new webpack.optimize.CommonsChunkPlugin({
      name: 'manifest',
      chunks: ['vendor']
    }),
    // copy custom static assets
    // 复制静态资源,将static文件内的内容复制到指定文件夹
    // 增加一个静态文件目录
    new CopyWebpackPlugin([
      {
        from: path.resolve(__dirname, '../static'),
        to: config.build.assetsSubDirectory,
        //忽视.*文件
        ignore: ['.*']
      }
      // {
      //   from: path.resolve(__dirname, "../libs"),
      //   to: config.build.assetsSubDirectory,
      //   ignore: ["*.json"]
      // }
    ])
  ]
})


//配置文件开启了gzip压缩
if (config.build.productionGzip) {
  //引入压缩文件的组件,该插件会对生成的文件进行压缩，生成一个.gz文件
  var CompressionWebpackPlugin = require('compression-webpack-plugin')

  webpackConfig.plugins.push(
    new CompressionWebpackPlugin({
      //目标文件名
      asset: '[path].gz[query]',
      //使用gzip压缩
      algorithm: 'gzip',
      //满足正则表达式的文件会被压缩
      test: new RegExp(
        '\\.(' +
        config.build.productionGzipExtensions.join('|') +
        ')$'
      ),
      //资源文件大于10240B=10kB时会被压缩
      threshold: 10240,
      //最小压缩比达到0.8时才会被压缩
      minRatio: 0.8
    })
  )
}

// 如果启动了report，则通过插件给出webpack构建打包后的产品文件分析报告
if (config.build.bundleAnalyzerReport) {
  var BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin
  webpackConfig.plugins.push(new BundleAnalyzerPlugin())
}

module.exports = webpackConfig
