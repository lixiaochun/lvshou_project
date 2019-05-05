/**
 * @desc 用来保存整个框架公用工具类
 * @author chenweiliang@lvshou.com(Ocean)
 */

// 拼接url参数
export const splicingUrl = (options, url = '') => {
  const handleData = Object.keys(options).map(item => `${item}=${encodeURIComponent(options[item])}`)
  const fetchUrl = handleData.length ? [url, url.indexOf('?') > -1 ? '&' : '?', handleData.join('&')].join('') : url

  return fetchUrl
}

// 截取url的参数
export const urlGet = key => {
  let p = window.location.href.split('?')
  let v = ''
  if (p.length < 2) {
    return false
  }

  p = p[1].split('#')
  p = p[0].split('&')
  p.map(function (item) {
    var temp = item.split('=')
    if (temp[0] === key) {
      if (temp.length > 2) {
        for (var i in temp) {
          if (i > 0) {
            if (i > 1) {
              v += ('=' + temp[i])
            } else {
              v += temp[i]
            }
          }
        }
      } else {
        v = temp[1]
      }
    }
  })
  return v
}

// 获取App版本号
export const getHxsAppVersion = () => {
  var UserAgent = window.navigator.userAgent;
  var __version = UserAgent.split('hxsapp-version-')[1] ? UserAgent.split('hxsapp-version-')[1].split('&')[0] : '0.0.0';

  function __get_dian(str) {
    var num = 0;
    for (var i = 0; i < str.length; i++) {
      if (str[i] === '.') {
        num++;
      }
    }
    return num
  }

  // 先补零操作 
  // 例如 2.10 ＝> 2.10.0
  // 例如 2.10.1 不会补零操作

  if (__get_dian(__version) === 1) {
    __version = __version + '.0'
  }
  return __version
}

// 版本比较
export const compareAppVersion = (new_str, old_str) => {
  // new_str > old_str  
  // compareVersionEle('2.10.0','2.9.0') ture

  if (typeof new_str !== 'string' || typeof old_str !== 'string') {
    console.log('参数类型必须微字符串：string ')
    return;
  }
  if (new_str.indexOf('.') < 0 || old_str.indexOf('.') < 0) {
    console.log('版本号传入有错误')
    return;
  }

  function __get_dian(str) {
    var num = 0;
    for (var i = 0; i < str.length; i++) {
      if (str[i] === '.') {
        num++;
      }
    }
    return num
  }

  var __new_str = new_str;
  var __old_str = old_str;

  // 先补零操作
  if (__get_dian(new_str) === 1) {
    __new_str = new_str + '.0'
  }
  if (__get_dian(old_str) === 1) {
    __old_str = old_str + '.0'
  }

  // debugger

  var new_str_split = __new_str.split('.');
  var old_str_split = __old_str.split('.');

  // 比较第一位
  if (new_str_split[0] === old_str_split[0]) {
    // 比较第二位
    if (new_str_split[1] === old_str_split[1]) {
      // 比较第三位
      if (parseInt(new_str_split[2]) >= parseInt(old_str_split[2])) {
        return true
      } else if (parseInt(new_str_split[2]) < parseInt(old_str_split[2])) {
        return false
      }
    } else if (parseInt(new_str_split[1]) > parseInt(old_str_split[1])) {
      return true
    } else if (parseInt(new_str_split[1]) < parseInt(old_str_split[1])) {
      return false
    }
  } else if (parseInt(new_str_split[0]) > parseInt(old_str_split[0])) {
    return true
  } else if (parseInt(new_str_split[0]) < parseInt(old_str_split[0])) {
    return false
  }
}

// 调起APP协议的分享协议
export const LsShare = ({ shareTitle, shareLink, shareImages, shareDescr, shareType }) => {
  const Version = getHxsAppVersion()
  if ((compareAppVersion(Version, '2.6.0')) && Version) {
    window.location.href = 'https://hxsapp_visible_act_share_btn#' + shareTitle + '#' + shareLink + '#' + shareImages + '#' + shareDescr + '#' + shareType;
  } else if ((compareAppVersion(Version, '2.2.0') || Version === '2.2.0') && (!(compareAppVersion(Version, '2.6.0') || Version === '2.6.0')) && Version) {
    window.location.href = 'https://hxsapp_visible_share_btn#' + shareTitle + '#' + shareLink + '#' + shareImages + '#' + shareDescr + '#' + shareType;
  } else if ((compareAppVersion(Version, '2.1.0') || Version === '2.1.0') && Version) {
    window.location.href = 'hxsapp://visible_share_btn|' + shareTitle + '|' + shareLink + '|' + shareImages + '|' + shareDescr + '|' + shareType;
  }
}

// 判断系统
export const userAgent = () => {
  let ua = window.navigator.userAgent
  let isIos = new RegExp('iPhone').test(ua)
  let isIpad = new RegExp('iPad').test(ua)
  let isAndroid = new RegExp('Android').test(ua)
  if (isIos || isIpad) {
    return 'ios'
  } else if (isAndroid) {
    return 'and'
  }
}

function padLeftZero(str) {
  return ('00' + str).substr(str.length)
}

// 时间格式化
export const formatDate = (date, fmt) => {
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

// 暴露 common.js 的方法 
export default {
  splicingUrl,
  urlGet,
  getHxsAppVersion,
  LsShare,
  compareAppVersion,
  userAgent,
  formatDate
}
