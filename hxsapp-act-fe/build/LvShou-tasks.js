/**
 * @desc LvShou 的项目打包发布 gulp 任务
 * @author Ocean(chenweiliang@lvshou.com)
 */
const path = require('path')
const clean = require('gulp-clean')
const pump = require('pump')
// const del = require('del')
const chalk = require('chalk')
const sftp = require('gulp-sftp')
const client = require('gulp-scp2')
const r = url => path.resolve(__dirname, '..', url)
const sh = require('shelljs')
const fs = require('fs')
const watch = require('gulp-watch')

const { getUrl } = require('./ali_oss/upload')

// 执行gulp 任务
module.exports = (gulp, lvShouConfig) => {
  /**
 * @desc 打包目录拷贝迁移
 */
  function copyDistAll() {
    console.log(chalk.yellow('拷贝目录中...', `${r(lvShouConfig.distPath)}/${process.argv[3]}/static/**/**`))
    return gulp.src(`${r(lvShouConfig.distPath)}/${process.argv[3]}/static/**/**`).pipe(gulp.dest(`${r(lvShouConfig.distPath)}/${process.argv[3]}/dist/static/`))
  }

  // 执行gulp的迁移
  gulp.task('copy', copyDistAll)

  // 删除多余文件
  gulp.task('del', () => {
    console.log('del dir is: ', `${r(lvShouConfig.oldDir)}/${process.argv[3]}/static`)
    sh.rm('-rf', `${r(lvShouConfig.oldDir)}/${process.argv[3]}/static/`) // 删除hxsapp-act-fe文件里面的对应文件夹的文件
  })

  // 执行迁移到hxsapp-act-fe文件夹中 用于发布到预发布环境
  gulp.task('actweb', () => {
    console.log(chalk.green(
      '正在迁移到hxsapp-act-fe文件夹...\n' +
      '用于发布到预发布环境!'
    ))
    return gulp.src(`${r(lvShouConfig.distPath)}/${process.argv[3]}/**/**`).pipe(gulp.dest(`${lvShouConfig.testPath}/${process.argv[3]}`))
  })

  // 上传到测试服务器---通过sftp
  const upload2sftp = () => {
    console.log(chalk.yellow(
      '正在通过sftp 上传到测试服务器.....\n' +
      '请勿中断上传进程!!!'
    ))
    const sftpConfig = {
      remotePath: '/apps/data/work/html/actweb.hxsapp.com/' + process.argv[3], //部署到服务器的路径
      host: '121.41.83.91', //ip地址
      user: 'bravo', //帐号
      pass: "LrEaAfMty4UD", //密码
      port: 48022 //端口
    }
    // gulp.src(`${r(lvShouConfig.distPath)}/**/**`).pipe(sftp(Object.assign(sftpConfig, {})))
    return gulp.src(`${r(lvShouConfig.distPath)}/${process.argv[3]}/**/**`).pipe(sftp(Object.assign(sftpConfig, {})))

    // 改用gulp-scp2插件
    // return gulp.src(`${r(lvShouConfig.distPath)}/**/**`)
    //   .pipe(client(sftpConfig))
    //   .on('error', function (err) {
    //     console.log(chalk.red('上传出错!!', err))
    //   })
  }
  gulp.task('upload', upload2sftp)

  // 清除多余文件
  gulp.task('clean', (cb) => {
    console.log('清除文件中....')
    pump([
      gulp.src(`${r(lvShouConfig.distPath)}/${lvShouConfig.assetsSubDirectory}/static/**/**`),
      clean({ force: true })
    ], cb)
    // del([`${r(lvShouConfig.distPath)}/${lvShouConfig.assetsSubDirectory}/static/**/**`], { force: true })
  })

  // 无效任务
  gulp.task(process.argv[3], cb => {
    console.log(chalk.red('this task nothing!!'))
  })
  gulp.task('uploadSh', ['actweb', 'upload'], cb => {
    console.log(chalk.yellow('upload again and upload completed!!'))
  })


  // 上传oss
  gulp.task('aliyun_oss', cb => {
    return watch('./src/**/*.vue', function (e) {
      const file = e.history['0']
      console.log('file ', file)
      fs.readFile(file, 'utf-8', function (err, data) {
        // 读取文件失败/错误
        if (err) {
          throw err;
        }

        getUrl(data.toString(), file)
      });
    })
  })
  gulp.task('watchImages', ['aliyun_oss'], cb => {
    console.log('watch images ... ')
  })

  function copyAll(taskName) {

    gulp.task(taskName, ['copy', 'actweb', 'upload'], () => {
      // gulp.task(taskName, ['copy', 'actweb', 'upload'], () => {
      console.log(chalk.green('gulp操作执行完成!!!'))
    })

  }

  lvShouConfig.isCopyDist && copyAll('build_dist')
}
