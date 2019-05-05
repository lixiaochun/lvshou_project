/**
 * @desc 统一调用封装API请求
 * @param data (@type Object) 接口请求参数
 * @param url  (@type String) 接口Api 的url
 * @param type (@type String) 接口请求类型 ( eq: GET, POST, HEAD, DELETE )
 */
import Fetch from './fetch'
// import { Toast } from 'mint-ui'
import { mintToast } from '../utils/method'

const LvshouFetch = ({ data = {}, url, type, warning }) => {
  !url && mintToast('api 接口地址丢失')
  return Fetch({
    data,
    url,
    type,
    warning
  })
}

export default LvshouFetch
