/**
 * @desc 基于gulp上传sftp的性能差 从而改用scp2来上传
 * @author Ocean(chenweiliang@lvshou.com)
 */
var client = require('scp2')
var chalk = require('chalk')
var lvShouConfig = require('../config/lvshou-config')

var sftpConfig = {
  remotePath: '/apps/data/work/html/actweb.hxsapp.com', //部署到服务器的路径
  host: '121.41.83.91', //ip地址
  user: 'bravo', //帐号
  pass: "LrEaAfMty4UD", //密码
  port: 48022 //端口
}

console.log(chalk.green("正在上传您的打包文件到测试环境：" + sftpConfig.host + ":" + sftpConfig.port + " ，请稍后..."))
console.log(chalk.yellow('正在上传中.... 请勿中断进程!!!'))
console.log(lvShouConfig.distPath)

client.scp('../dev1.0/', sftpConfig, function (err) {
  if (err) console.log(chalk.red('上传文件到测试服务器出错!!'))
  else console.log(chalk.green('文件上传完成!'))
})

