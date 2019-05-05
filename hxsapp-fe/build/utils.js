// utils提供工具函数，包括生成处理各种样式语言的loader，获取资源文件存放路径的工具函数。 
// 1. 计算资源文件存放路径 
// 2. 生成cssLoaders用于加载.vue文件中的样式 
// 3. 生成styleLoaders用于加载不在.vue文件中的单独存在的样式文件

var path = require('path')
var config = require('../config')
var ExtractTextPlugin = require('extract-text-webpack-plugin')

exports.assetsPath = function (_path) {
  var assetsSubDirectory = process.env.NODE_ENV === 'production'
    ? config.build.assetsSubDirectory
    : config.dev.assetsSubDirectory
  return path.posix.join(assetsSubDirectory, _path)
}

exports.cssLoaders = function (options) {
  options = options || {}

  var cssLoader = {
    loader: 'css-loader',
    //options是loader的选项配置 
    options: {
      //生成环境下压缩文件
      minimize: process.env.NODE_ENV === 'production', 
      //根据参数是否生成sourceMap文件
      sourceMap: options.sourceMap
    }
  }

  // generate loader string to be used with extract text plugin
  //生成loader
  function generateLoaders (loader, loaderOptions) {
    // 默认是css-loader
    var loaders = [cssLoader]
    // 如果参数loader存在
    // 如果非css，则增加一个处理预编译语言的loader并设好相关配置属性
    // 例如generateLoaders('less')，这里就会push一个less-loader
    // less-loader先将less编译成css，然后再由css-loader去处理css
    // 其他sass、scss等语言也是一样的过程
    
    if (loader) {
      loaders.push({
        loader: loader + '-loader',
        //将loaderOptions和sourceMap组成一个对象
        options: Object.assign({}, loaderOptions, {
          sourceMap: options.sourceMap
        })
      })
    }

    // Extract CSS when that option is specified
    // (which is the case during production build)
    // 如果传入的options存在extract且为true
    if (options.extract) {
      //webpack的插件 ExtractTextPlugin 去分离js中引入的css文件
      return ExtractTextPlugin.extract({
        //处理的loader
        use: loaders,
        //没有被提取分离时使用的loader
        fallback: 'vue-style-loader'
      })
    } else {
      // 无需提取样式则简单使用vue-style-loader配合各种样式loader去处理<style>里面的样式
      return ['vue-style-loader'].concat(loaders)
    }
  }

  // https://vue-loader.vuejs.org/en/configurations/extract-css.html
  //返回css类型对应的loader组成的对象 generateLoaders()来生成loader
  return {
    css: generateLoaders(),
    postcss: generateLoaders(),
    less: generateLoaders('less'),
    sass: generateLoaders('sass', { indentedSyntax: true }),
    scss: generateLoaders('sass'),
    stylus: generateLoaders('stylus'),
    styl: generateLoaders('stylus')
  }
}

// Generate loaders for standalone style files (outside of .vue)
// 生成处理单独的.css、.sass、.scss等样式文件的规则
exports.styleLoaders = function (options) {
  //定义返回的数组，数组中保存的是针对各类型的样式文件的处理方式
  var output = []
  
  // 调用cssLoaders方法返回各类型的样式对象(css: loader)
  var loaders = exports.cssLoaders(options)
  
  //循环遍历loaders
  for (var extension in loaders) {
    //根据遍历获得的key(extension)来得到value(loader)
    var loader = loaders[extension]
    output.push({
      // 处理的文件类型
      test: new RegExp('\\.' + extension + '$'),
      //用loader来处理，loader来自loaders[extension]
      use: loader
    })
  }
  return output
}
