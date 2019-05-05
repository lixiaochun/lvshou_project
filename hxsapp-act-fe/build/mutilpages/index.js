/*
* @desc 暴露多页面的配置
* @Author chenweiliang@lvshou.com(Ocean)
* */
const getEntries = require('./getEntries')
const lvshouConfig = require('../../config/lvshou-config')
// 获取entry入口文件
const entries = () => {
  const list = getEntries(lvshouConfig.entryRoot)
  let map = {}
  console.log('process.env.NODE_ENV ', process.env.NODE_ENV, process.argv)
  if (process.env.NODE_ENV === 'production') {
    list.forEach((entry, key) => {
      map[entry] = [`./${lvshouConfig.entryRoot}/${entry}`]
    })
  } else {
    list.forEach((entry, key) => {
      if (key === 0) map[entry] = ['babel-polyfill', 'webpack-hot-middleware/client?noInfo=true&reload=true', `./${lvshouConfig.entryRoot}/${entry}`]
      else map[entry] = ['webpack-hot-middleware/client?noInfo=true&reload=true', `./${lvshouConfig.entryRoot}/${entry}`]
    })
  }

  return map
}

/*
* @desc 配置html-webpack-plugin
* @explain 用于开发环境
* */
const devHtmlWebpackPlugin = htmlWebpackPlugin => {
  const pageLists = getEntries(lvshouConfig.entryRoot)
  const result = pageLists.map(entry => {
    const chunk = [entry]
    const pageConfig = require(`../../${lvshouConfig.entryRoot}/${entry}/config`) // 获取单页面的配置文件
    return new htmlWebpackPlugin({
      filename: `${entry}/index.html`,
      template: `./${lvshouConfig.entryRoot}/${entry}/index.html`,
      inject: true, // 生成的js 插入body底部
      chunksSortMode: 'none',
      assetsPublicPath: lvshouConfig.assetsPublicPath + lvshouConfig.assetsSubDirectory, // 静态文件的cdn地址
      title: pageConfig.title || lvshouConfig.title,
      baiduId: pageConfig.baiduId,
      name: pageConfig.name || lvshouConfig.name,
      keywords: pageConfig.keywords || lvshouConfig.keywords,
      description: pageConfig.description || lvshouConfig.description,
      viewport: pageConfig.viewport || lvshouConfig.viewport,
      tongji: pageConfig.tongji || lvshouConfig.tongji,
      chunks: chunk // 主要用于多入口文件，当你有多个入口文件，那就回编译后生成多个打包后的文件，那么chunks 就能选择你要使用那些js文件
    })
  })

  return result
}

/*
* @desc 用于build生产环境下的 html-webpack-plugin 配置
* */
const prodHtmlWebplugin = htmlWebpackPlugin => {
  const pagesList = getEntries(lvshouConfig.entryRoot)
  const result = pagesList.map(entry => {
    const chunks = ['manifest', 'vendor', entry]
    const pageConfig = require(`../../${lvshouConfig.entryRoot}/${entry}/config`) // 获取单页面的配置文件
    return new htmlWebpackPlugin({
      filename: `${entry}/dist/index.html`,
      template: `./${lvshouConfig.entryRoot}/${entry}/index.html`,
      inject: true, // 生成的js 插入body底部
      chunksSortMode: 'dependency', // js按照不同文件的依赖关系来排序
      assetsPublicPath: lvshouConfig.assetsPublicPath + lvshouConfig.assetsSubDirectory, // 静态文件的cdn地址
      title: pageConfig.title || lvshouConfig.title,
      name: pageConfig.title || lvshouConfig.name,
      keywords: pageConfig.keywords || lvshouConfig.keywords,
      description: pageConfig.description || lvshouConfig.description,
      viewport: pageConfig.viewport || lvshouConfig.viewport,
      tongji: pageConfig.tongji || lvshouConfig.tongji,
      baiduId: pageConfig.baiduId,
      minify: { // 对生成的HTML文件进行压缩
        removeComments: true,
        collapseWhitespace: true,
        removeAttributeQuotes: false
        // more options:
        // https://github.com/kangax/html-minifier#options-quick-reference
      },
      chunks: chunks // 主要用于多入口文件，当你有多个入口文件，那就回编译后生成多个打包后的文件，那么chunks 就能选择你要使用那些js文件
    })
  })

  return result
}

module.exports = {
  entries: entries(),
  devHtmlWebpackPlugin,
  prodHtmlWebplugin
}
