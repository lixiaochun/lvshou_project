import { get, post } from 'common/js/ajax'
import axios from 'axios'
// 壹豆充值记录表
export function getRechargeList(list) {
  const url = '/yjk-operation/appEbeanFlow/getRechargeList'
  return get(url, list)
}

// 赠送壹豆记录流水
export function getGiveEbeanList(list) {
  const url = '/yjk-operation/appEbeanFlow/getGiveEbeanList'
  return get(url, list)
}

// 壹豆倾听者服务消费流水
export function getEbeanPayList(list) {
  const url = '/yjk-operation/appMcChathistory/getEbeanPayList'
  return get(url, list)
}

// 倾听者通话数据
export function getTotalInfoList(list) {
  const url = '/yjk-operation/appMcChathistory/getTotalInfoList'
  return get(url, list)
}

// 导入Excel赠送壹豆
export function importExcel(file, count) {
  const url = '/yjk-operation/appEbeanFlow/importExcel'
  const data = new FormData()
  data.append('file', file, file.name)
  data.append('count', count)
  return axios.post(url,
    data,
    {
      headers: { 'Content-Type': 'multipart/form-data' }
    }
  ).then((res) => {
    return Promise.resolve(res.data)
  })
}

// 新注册会员壹豆赠送回显
export function registerEbean(list) {
  const url = '/yjk-operation/systemParams/getSystemParams'
  return get(url, list)
}
// 更新新注册会员壹豆赠送
export function updateRegisterEbean(list) {
  const url = '/yjk-operation/systemParams/updateSytemParams'
  return post(url, list)
}
