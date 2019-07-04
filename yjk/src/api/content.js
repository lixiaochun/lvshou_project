import { get, post } from 'common/js/ajax'
// 新的文章列表接口

// 获取列表
export function getList(obj) {
  const url = '/yjk-operation/discContent/getList'
  return get(url, obj)
}
// 新增文章， 视频
export function saveDiscContent(obj) {
  const url = '/yjk-operation/discContent/saveDiscContent'
  return post(url, obj)
}
// 修改文章视频
export function updateDiscContent(obj) {
  const url = '/yjk-operation/discContent/updateDiscContent'
  return post(url, obj)
}
// 删除文章视频
export function deleteDiscContent(obj) {
  const url = '/yjk-operation/discContent/deleteDiscContent'
  return post(url, obj)
}
// 修改文章视频状态
export function updateDiscContentStatus(obj) {
  const url = '/yjk-operation/discContent/updateDiscContentStatus'
  return post(url, obj)
}
// 获取栏目数据
export function getColumnList(obj) {
  const url = '/yjk-operation/discColumn/getList'
  return get(url, obj)
}
// 获取文章 视频详情
export function getDiscContentById(id) {
  const url = '/yjk-operation/discContent/getDiscContentById'
  return get(url, id)
}

// 新增顾问通知详情
export function saveBroadcastInfo(obj) {
  const url = '/yjk-operation/consultBroadcast/saveBroadcastInfo'
  const str = JSON.stringify(obj.urls)
  obj.urls = str
  return post(url, obj)
}

// 获取顾问通知详情
export function getBroadcastInfoById(id) {
  const url = '/yjk-operation/consultBroadcast/getBroadcastInfoById'
  return post(url, id)
}

// 修改顾问通知
export function updateBroadcastInfo(obj) {
  const url = '/yjk-operation/consultBroadcast/updateBroadcastInfo'
  const str = JSON.stringify(obj.urls)
  obj.urls = str
  return post(url, obj)
}
// 修改pv和uv
export function updateInitPvOrUv(list) {
  const url = '/yjk-operation/discContent/updateInitPvOrUv'
  return post(url, list)
}
