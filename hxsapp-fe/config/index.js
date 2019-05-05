// 在这里面描述了开发和构建两种环境下的配置

// see http://vuejs-templates.github.io/webpack for documentation.
var path = require('path')

module.exports = {
  // 构建生产环境使用的配置
  build: {
    // 环境变量
    env: require('./prod.env'),
    // html入口文件
    index: path.resolve(__dirname, '../dist/index.html'),
    // 上线文件的存放路径
    assetsRoot: path.resolve(__dirname, '../dist'),
    // 二级目录，存放静态资源文件的目录，位于dist文件夹下
    assetsSubDirectory: 'static',// 编译输出的二级目录
    // 设置之后构建的产品文件在注入到index.html中的时候就会带上这里的发布路径
    assetsPublicPath: 'https://app.hxsapp.com/hxsweb/',// 编译发布的根目录，可配置为资源服务器域名或 CDN 域名
    // 是否使用source-map
    productionSourceMap: false,
    // Gzip off by default as many popular static hosts such as
    // Surge or Netlify already gzip all static assets for you.
    // Before setting to `true`, make sure to:
    // npm install --save-dev compression-webpack-plugin
    // gzip模式下需要压缩的文件的扩展名，设置js、css之后就只会对js和css文件进行压缩
    productionGzip: false,// 是否开启 gzip
    productionGzipExtensions: ['js', 'css'],
    // Run the build command with an extra argument to
    // View the bundle analyzer report after build finishes:
    // `npm run build --report`
    // Set to `true` or `false` to always turn it on or off
    // 是否展示webpack构建打包之后的分析报告
    bundleAnalyzerReport: true && process.env.npm_config_report
  },
  // 开发过程中使用的配置
  dev: {
    // 环境变量
    env: require('./dev.env'),
    // dev-server监听的端口
    port: 8082,
    // 是否自动打开浏览器
    autoOpenBrowser: true,
    // 静态资源文件夹
    assetsSubDirectory: 'static',
    // 发布路径
    assetsPublicPath: '/',
    // 代理配置表，在这里可以配置特定的请求代理到对应的API接口
    // 例如将'localhost:8080/api/xxx'代理到'www.example.com/api/xxx'
    proxyTable: {
      // '/api_mock': {
      //   target: 'https://app.hxsapp.com',
      //   changeOrigin: true,
      //   pathRewrite: {
      //     '^/api_mock': ''
      //   }
      // },
      // '/mall_mock': {
      //   target: 'https://mall.hxsapp.com',
      //   changeOrigin: true,
      //   pathRewrite: {
      //     '^/mall_mock': ''
      //   }
      // },
      // '/ApiUrlProxy': {
      //   target: 'http://jsonplaceholder.typicode.com',
      //   changeOrigin: true,
      //   pathRewrite: {
      //     '^/ApiUrlProxy': ''
      //   }
      // },
      // '/ApiCommunity': {
      //   target: 'https://community.hxsapp.com',
      //   changeOrigin: true,
      //   pathRewrite: {
      //     '^/ApiCommunity': ''
      //   }
      // }
    },
    // CSS Sourcemaps off by default because relative paths are "buggy"
    // with this option, according to the CSS-Loader README
    // (https://github.com/webpack/css-loader#sourcemaps)
    // In our experience, they generally work as expected,
    // just be aware of this issue when enabling this option.
    // 是否开启 cssSourceMap
    cssSourceMap: false
  }
}
