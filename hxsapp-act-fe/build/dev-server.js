/*
* @desc node 开发环境配置 调起webpack-dev-server
* @Author chenweiliang@lvshou.com(Ocean)
* */

require('./check-versions')()

// 获取IP
var host = require('./IP')()

var config = require('../config')
if (!process.env.NODE_ENV) {
  process.env.NODE_ENV = JSON.parse(config.dev.env.NODE_ENV)
}

var opn = require('opn')
var path = require('path')
var express = require('express')
var webpack = require('webpack')
var proxyMiddleware = require('http-proxy-middleware')
var webpackConfig = process.env.NODE_ENV === 'testing'
  ? require('./webpack.prod.conf')
  : require('./webpack.dev.server.conf')
// 引入LvShou全局配置文件
var lvConfig = require('../config/lvshou-config')
// default port where dev server listens for incoming traffic
var port = process.env.PORT || config.dev.port
// automatically open browser, if not set will be false
// process.env.OPEN 是否自动打开，不设置为自动打开
var autoOpenBrowser = !!config.dev.autoOpenBrowser && !process.env.OPEN
// Define HTTP proxies to your custom API backend
// https://github.com/chimurai/http-proxy-middleware
var proxyTable = config.dev.proxyTable

var app = express()
var compiler = webpack(webpackConfig)

var devMiddleware = require('webpack-dev-middleware')(compiler, {
  logger: {},
  logTime: true,
  publicPath: '/',
  quiet: true // false 可以显示webpack 的更多信息
})

var hotMiddleware = require('webpack-hot-middleware')(compiler, {
  log: () => { }
})
// force page reload when html-webpack-plugin template changes
compiler.plugin('compilation', function (compilation) {
  compilation.plugin('html-webpack-plugin-after-emit', function (data, cb) {
    hotMiddleware.publish({ action: 'reload' })
    cb()
  })
})

// proxy api requests
Object.keys(proxyTable).forEach(function (context) {
  var options = proxyTable[context]
  if (typeof options === 'string') {
    options = { target: options }
  }
  app.use(proxyMiddleware(options.filter || context, options))
})

// handle fallback for HTML5 history API
// 需要同步生产环境
var getEntries = require('./mutilpages/getEntries')
var list = getEntries(lvConfig.entryRoot) // 动态获取多页面
var pagesCDN = [] // 用于开发环境的history 配置

list.forEach(page => {
  var _obj = {} // vue-router history 模式配置
  _obj['from'] = `/${page}/`
  _obj['to'] = `/${page}/index.html`
  pagesCDN.push(_obj)
})

app.use(require('connect-history-api-fallback')({
  rewrites: pagesCDN
}))

// serve webpack bundle output
app.use(devMiddleware)

// enable hot-reload and state-preserving
// compilation error display
app.use(hotMiddleware)

// serve pure static assets
var staticPath = path.posix.join(config.dev.assetsPublicPath, config.dev.assetsSubDirectory)
app.use(staticPath, express.static('./static'))

var uri = 'http://' + (host || 'localhost') + ':' + port

devMiddleware.waitUntilValid(function () {
  console.log('> Listening at ' + uri + '\n')
})

module.exports = app.listen(port, function (err) {
  if (err) {
    console.log(err)
    return
  }

  // when env is testing, don't need open it
  if (autoOpenBrowser && process.env.NODE_ENV !== 'testing') {
    opn(uri)
  }
})
