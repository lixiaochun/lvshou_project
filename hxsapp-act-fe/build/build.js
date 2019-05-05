'use strict'
require('./check-versions')()

process.env.NODE_ENV = 'production'

const ora = require('ora')
const rm = require('rimraf')
const path = require('path')
const chalk = require('chalk')
const webpack = require('webpack')
const config = require('../config')
const webpackConfig = require('./webpack.prod.conf')
const sh = require('shelljs')
const lvShouConfig = require('../config/lvshou-config')
const r = url => path.resolve(__dirname, '..', url)

sh.rm('-rf', `${r(lvShouConfig.distPath)}/${process.argv[2]}/dist/static/`) // 删除dev1.0文件的旧文件
sh.rm('-rf', `${r(lvShouConfig.oldDir)}/${process.argv[2]}`) // 删除hxsapp-act-fe文件里面的对应文件夹的文件

if (!process.argv[2]) {
  console.error(chalk.red('打包参数缺失!!!'))
  return
}

const spinner = ora('building for production...')
spinner.start()

rm(path.join(config.build.assetsRoot, config.build.assetsSubDirectory), err => {
  if (err) throw err
  webpack(webpackConfig, (err, stats) => {
    spinner.stop()
    if (err) throw err
    process.stdout.write(stats.toString({
      colors: true,
      modules: false,
      children: false, // If you are using ts-loader, setting this to true will make TypeScript errors show up during build.
      chunks: false,
      chunkModules: false
    }) + '\n\n')

    if (stats.hasErrors()) {
      console.log(chalk.red('  Build failed with errors.\n'))
      process.exit(1)
    }

    console.log(chalk.cyan('  Build complete.\n'))

    console.log(chalk.yellow(
      '  Tip: built files are meant to be served over an HTTP server.\n' +
      '  Opening index.html over file:// won\'t work.\n'
    ))

    // 执行上传sftp 的shell 命令
    sh.exec(`npm run gulp ${process.argv[2]} && npm run gulp:upload ${process.argv[2]}`)
  })
})
