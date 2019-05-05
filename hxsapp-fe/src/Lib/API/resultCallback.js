/**
 * @desc ajax结果统一处理
 * @author chenweiliang@lvshou.com(Ocean)
 */
import { Toast } from 'mint-ui'

// 登录失效状态码
const expireCodies = [1011, 1012, 1013, 1014, '0000', '501', '401']

const resultCallback = (vm, data, warning) => {
  return new Promise((resolve, reject) => {
    if (data.code === 200 || data.code === '200') {
      resolve(data['data'] || true)
    } else if (expireCodies.includes(data.code)) { // 登录信息过期
      data.msg && Toast(data.msg)
      reject(false)
    } else {
      if (warning) {
        Toast('API 接口出错!')
      }
      // 使用reject 更好区分返回结果
      reject(data)
    }
  })
}

export default resultCallback
