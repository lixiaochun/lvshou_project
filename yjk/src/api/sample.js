// 标品管理
import { get, post } from 'common/js/ajax'

// 获取所属标签（未被关闭的）
export function getLabel() {
  const url = '/yjk-operation/labelLib/getLabelNoPage'
  return get(url)
}
// 标品添加
export function saveStandardProduct(list) {
  const url = '/yjk-operation/standardProduct/saveStandardProduct'
  return post(url, list)
}
// 获取标品列表
export function getStandardProductList(list) {
  const url = '/yjk-operation/standardProduct/getStandardProductList'
  return get(url, list)
}
// 获取标品详情
export function getStandardProductById(id) {
  const url = '/yjk-operation/standardProduct/getStandardProductById'
  return get(url, id)
}
// 跟新标品状态
export function updateStatus(id) {
  const url = '/yjk-operation/standardProduct/updateStatus'
  return post(url, id)
}
// 删除标品
export function deleteStandardProductDetailById(id) {
  const url = '/yjk-operation/standardProduct/deleteStandardProductDetailById'
  return post(url, id)
}
// 修改标品
export function updateById(list) {
  const url = '/yjk-operation/standardProduct/updateById'
  return post(url, list)
}
