const { formatDate, getStaitcPath } = require('./utils')
const OSS = require('ali-oss')
const randomToken = require('random-token')
const chalk = require('chalk')
const fs = require('fs')

let CACHE = {} // 设置缓存 避免重复上传
let MATCH_NUM = {}

let client = new OSS({
  region: 'oss-cn-hangzhou',
  accessKeyId: 'LTAI2dTrHRFjD1QM',
  accessKeySecret: 'Ff4cBYpDOYd6MezwqiisSX5DJ2hjb0',
  bucket: 'hxsapp-fe'
})
const upload = async (fPath, fullMatch, htmlPath, source, numType) => {
  CACHE[fPath] = 1
  var randomNum = randomToken(32)
  const key = `${formatDate(new Date(), 'yyyyMM')}/${randomNum}` // 生成唯一的key
  console.log(chalk.red('正在上传图片...' + fPath))
  let result = await client.put(key, fPath);
  console.log(chalk.green('图片上传成功 路径是:  ', result.url));
  let _resultObj = {
    url: result.url,
    fullMatch,
    htmlPath,
    source,
    numType
  }

  CACHE[fPath] = _resultObj
  return _resultObj
}


function getUrl(source, htmlPath) {
  // vue script
  const jsReg = /require\(["'](.+\.(png|gif|jpg|jpeg))["']\)/g
  const cssReg = /url\(["' ](.+\.(png|gif|jpg|jpeg))["' ]\)/g
  const htmlReg = /src=["'](.+\.(png|gif|jpg|jpeg))["']/g

  let jsMatch,
    cssMatch,
    htmlMatch,
    htmlNum = htmlPath + '_html',
    cssNum = htmlPath + 'css'

  source && source.match(jsReg) && source.match(jsReg).length && (MATCH_NUM[htmlPath] = source.match(jsReg).length)
  source && source.match(cssReg) && source.match(cssReg).length && (MATCH_NUM[cssNum] = source.match(cssReg).length)


  const beginHtml = (html_source, html_htmlPath, typeNum) => {
    typeNum = typeNum || htmlNum
    while (htmlMatch = htmlReg.exec(html_source)) {
      let file = htmlMatch[1]
      let fullMatch = htmlMatch[0]
      fullMatch = fullMatch.replace('src=', '')

      const _absoluteUrl = getStaitcPath(html_htmlPath, file) // 绝对定位的图片地址
      upload(_absoluteUrl, fullMatch, html_htmlPath, html_source, typeNum).then((data) => {
        MATCH_NUM[data.numType]--
        editUrl(data, data.htmlPath, null, data.numType)
      }).catch(err => console.log(err))
    }
  }

  // vue css 
  const beginCSS = (css_source, css_htmlPath, typeNum) => {
    typeNum = typeNum || cssNum

    while (cssMatch = cssReg.exec(css_source)) {
      let file = cssMatch[1]
      let fullMatch = cssMatch[0]
      fullMatch = fullMatch.replace('url(', '')
      fullMatch = fullMatch.replace(')', '')
      const _absoluteUrl = getStaitcPath(css_htmlPath, file) // 绝对定位的图片地址

      // if (CACHE[_absoluteUrl] && typeof CACHE[_absoluteUrl] == 'object' && CACHE[_absoluteUrl] !== 1 && CACHE[_absoluteUrl].url) {
      //   MATCH_NUM[typeNum]--
      //   console.log(chalk.green('读缓存...' + _absoluteUrl))
      //   editUrl(CACHE[_absoluteUrl], css_htmlPath, beginHtml, typeNum) // 读缓存
      // } else if (!CACHE[_absoluteUrl]) {
      // let isPoint = true
      upload(_absoluteUrl, fullMatch, css_htmlPath, css_source, typeNum).then((data) => {
        MATCH_NUM[data.numType]--
        editUrl(data, data.htmlPath, beginHtml, data.numType)
      }).catch(err => console.log(err))
      // }
    }

  }


  while (jsMatch = jsReg.exec(source)) {
    // if (!MATCH_NUM[htmlPath]) {
    //   MATCH_NUM[htmlPath] = 1
    // } else {
    //   MATCH_NUM[htmlPath]++
    // }

    let file = jsMatch[1]
    let fullMatch = jsMatch[0]
    const _absoluteUrl = getStaitcPath(htmlPath, file) // 绝对定位的图片地址

    // if (CACHE[_absoluteUrl] && typeof CACHE[_absoluteUrl] == 'object' && CACHE[_absoluteUrl] !== 1 && CACHE[_absoluteUrl].url) {
    //   MATCH_NUM[htmlPath]--
    //   console.log(chalk.green('读缓存...' + _absoluteUrl))
    //   editUrl(CACHE[_absoluteUrl], htmlPath, beginCSS, htmlPath) // 读缓存
    // } else if (!CACHE[_absoluteUrl]) {
    upload(_absoluteUrl, fullMatch, htmlPath, source).then((data) => {
      MATCH_NUM[data.htmlPath]--
      editUrl(data, data.htmlPath, beginCSS, htmlPath)
    }).catch(err => console.log(err))
    // }
  }

  if (!MATCH_NUM[htmlPath]) beginCSS(source, htmlPath, cssNum)
  if (!MATCH_NUM[cssNum]) beginHtml(source, htmlPath, htmlNum)
}

const editUrl = (data, htmlPath, cb, NumType) => {
  fs.readFile(data.htmlPath, 'utf-8', function (err, fsData) {
    // 读取文件失败/错误
    if (err) {
      throw err;
    }
    // getUrl(data.toString(), file)
    let content = fsData.toString()
    content = content.replace(data.fullMatch, match => {
      return `'${data.url}'`
    })
    fs.writeFileSync(data.htmlPath, content)

    // MATCH_NUM[NumType] <= 0 && cb(content, data.htmlPath)
  });
}

module.exports = {
  getUrl
}
