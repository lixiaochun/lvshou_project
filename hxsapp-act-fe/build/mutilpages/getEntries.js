/*
* @desc 动态获取webpack入口文件
* @Author chenweiliang@lvshou.com(Ocean)
* */
const fs = require('fs')
const path = require('path')

// resolve 函数 主要用于获取绝对路径
const resolve = dir => {
  return path.join(__dirname, '..', '..', dir)
}

// 根据根目录 获取入口文件
const getEntries = entryRoot => {
  const dir = resolve(entryRoot)
  return fs.readdirSync(dir).filter(file => {
    return fs.statSync(path.join(dir, file)).isDirectory()
  })
}

module.exports = getEntries
