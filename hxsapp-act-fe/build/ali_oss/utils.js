/**
 * @desc 工具类方法
 * @author Ocean
 * @date 2019.04.12
 * */
var path = require('path')

function _r(dir) {
  return path.join(__dirname, '..', dir)
}

function fullPath(file) {
  let _url = process.env.assetPath + file.split('assets')[1]
  _url = _url.replace(/\//g, () => {
    return "\\"
  })
  return String(_url)
}

function getStaitcPath(htmlPath, filePath) {
  // console.log('htmlPath, filePath ', htmlPath, filePath)
  let _BUrl = filePath.split('/')
  let _urlLen = filePath.match(/\.\./g) ? filePath.match(/\.\./g).length : 0
  let _htmlArr = htmlPath.split('\\')
  let _newArr = _htmlArr.slice(0, _htmlArr.length - _urlLen - 1)
  let _bChange = filePath.match(/\.\./g) ? _BUrl.slice(_urlLen, _BUrl.length) : _BUrl.slice(1, _BUrl.length)

  return _newArr.join('\\') + '\\' + _bChange.join('\\')
}

/**
 * @name formatDate
 * @desc 定义格式化时间的方法
 * @params date 时间变量 eq: new Date(value)
 * @params fmt 格式化类型 eq: 'yyyy-MM-dd hh:mm'
 * */
function padLeftZero(str) {
  return ('00' + str).substr(str.length)
}
const formatDate = (date, fmt) => {
  if (/(y+)/.test(fmt)) {
    fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length))
  }
  let o = {
    'M+': date.getMonth() + 1,
    'd+': date.getDate(),
    'h+': date.getHours(),
    'm+': date.getMinutes(),
    's+': date.getSeconds()
  }
  for (let k in o) {
    if (new RegExp(`(${k})`).test(fmt)) {
      let str = o[k] + ''
      fmt = fmt.replace(RegExp.$1, RegExp.$1.length === 1 ? str : padLeftZero(str))
    }
  }
  return fmt
}


module.exports = {
  fullPath,
  formatDate,
  getStaitcPath
}
