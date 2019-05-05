/*
* @desc 统一异步处理
* @author chenweiliang@lvshou.com(Ocean)
*
* ## USAGE:
* 1) async await
* const async function () {
  const data = await kzFetch(opts)
}
* 2) promise
*  kzFetch(opts).then(data => { ... })
*
* ## Recipes 表单分块
* var formData = new FormData()
* formData.append('foo', 'bar')
* formData.append('pic', fileInput, 'mypic.jpg')
* kzFetch({type: 'post', formData, url: 'xxx' })
*
* more info: https://github.com/pagekit/vue-resource/blob/master/docs/http.md
*/
import Vue from 'vue'
import resultCallback from './resultCallback'

const Fetch = async function ({ vm, type = 'GET', url, data = {}, options = {}, target, loading = false, loadingText = 'Loading...', needToken = false, warning = true }, ...args) {
  // fetch 获取结果
  let result
  // Loading
  let LOADING
  // loading
  let vmLoading
  // http
  let HTTP
  // 异步类型
  const TYPE = type.toUpperCase()

  // 检测vm有没有设置
  vm = vm || args[0] || Vue
  if (!vm) {
    console.warn('fetch option vm: not defined')
    return
  }

  if (!url) {
    console.warn('fetch option url: not defined')
    return
  }

  // 判断不同环境
  HTTP = vm === Vue ? Vue.http : vm.$http
  LOADING = vm === Vue ? Vue.prototype.$loading : vm.$loading

  /* 默认配置 */
  options = Object.assign({}, {
    before: function () {
      // 显示加载loading
      // Loading = vm.$loading && target ? vm.$loading({ target, fullscreen: false, text: loadingText }) : false
      target = target || document.body
      vmLoading = loading ? LOADING({ target, fullscreen: false, text: loadingText }) : false
    }
  }, options)

  // http错误
  const reject = res => {
    const result = {
      code: res.status,
      msg: res.statusText,
      data: res.body
    }
    return result
  }

  /* 成功返回结构 */
  const resolve = res => {
    let result
    // console.log('res.body', res)
    // 隐藏 loading
    vmLoading && vmLoading.close()
    if (typeof res.body === 'string') {
      try {
        result = JSON.parse(res.body)
      } catch (e) {
        // 防止php报错返回结果阻塞js执行
        result = reject({
          status: -110,
          message: e,
          body: res
        })
        console.error(res.body)
      }
      return result
    } else {
      return res.json()
    }
  }

  // 提交数据不带token
  // 获取token需要token
  !needToken && 'token' in data && delete data['token']
  // 判断get还是 post
  switch (TYPE) {
    case 'POST':
      result = await HTTP.post(url, data, options).then(resolve, reject)
      break
    case 'HEAD':
      result = await HTTP.head(url, options).then(resolve, reject)
      break
    case 'DELETE':
      result = await HTTP.delete(url, options).then(resolve, reject)
      break
    case 'JSONP':
      result = await HTTP.jsonp(url, options).then(resolve, reject)
      break
    case 'PUT':
      result = await HTTP.put(url, data, options).then(resolve, reject)
      break
    case 'patch':
      result = await HTTP.patch(url, data, options).then(resolve, reject)
      break
    default:
      // get 拼接data部分参数
      const handleData = Object.keys(data).map(item => `${item}=${encodeURIComponent(data[item])}`)
      const fetchUrl = handleData.length ? [url, url.indexOf('?') > -1 ? '&' : '?', handleData.join('&')].join('') : url
      // result = await vm.$http.get(fetchUrl, options).then(res => res.json(), reject)
      result = await HTTP.get(fetchUrl, options).then(resolve, reject)
      break
  }

  // 返回处理数据
  // 增加catch处理
  return resultCallback(vm, result, warning)
}

export default Fetch
