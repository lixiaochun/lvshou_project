/**
 * @desc ajax结果统一处理
 * @author chenweiliang@lvshou.com(Ocean)
 */
// import { Toast } from 'mint-ui'
import { mintToast } from '../utils/method'

// 登录失效状态码
const expireCodies = [1011, 1012, 1013, 1014]

const resultCallback = (vm, data, warning) => {
  return new Promise((resolve, reject) => {
    if (parseInt(data.code) === 200) {
      resolve(data['data'] || true)
    } else if (expireCodies.includes(+data.code)) { // 登录信息过期
      mintToast((data && data.msg && data.msg !== '') ? data.msg : 'API 接口出错!')
      reject(data)
    } else {
      if (warning) {
        mintToast((data && data.msg && data.msg !== '') ? data.msg : 'API 接口出错!')
      }
      // 使用reject 更好区分返回结果
      reject(data)
    }
  })
}

export default resultCallback
