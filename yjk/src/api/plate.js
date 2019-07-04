import { get, post } from 'common/js/ajax'

// 首页版块列表
export function getAppHomePlateList(status) {
  const url = '/yjk-operation/appIndexConfig/getAppHomePlateList'
  return get(url, status)
}
// 根据id获取板块详情
export function getAppHomePlateDetail(id) {
  const url = '/yjk-operation/appIndexConfig/getAppHomePlateDetail'
  return get(url, id)
}
// 编辑首页版块
export function updateAppHomePlate(id) {
  const url = '/yjk-operation/appIndexConfig/updateAppHomePlate'
  return post(url, id)
}
// 版块切换上下线
export function updateAppHomePlateStatus(list) {
  const url = '/yjk-operation/appIndexConfig/updateAppHomePlateStatus'
  return post(url, list)
}
// 版块排序
export function setAppIndexConfigOnlieSort(list) {
  const url = '/yjk-operation/appIndexConfig/setAppIndexConfigOnlieSort'
  return post(url, list)
}
