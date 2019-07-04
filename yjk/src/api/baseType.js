import { get, post } from 'common/js/ajax'

// 文章分类列表接口
export function getBaseTypeList () {
  const url = '/yjk-operation/baseType/getBaseTypeList'
  return get(url, {})
}

// 文章分类添加
export function saveBaseType (list) {
  const url = '/yjk-operation/baseType/saveBaseType'
  return post(url, list)
}

// 文章分类修改
export function upBaseType (list) {
  const url = '/yjk-operation/baseType/upBaseType'
  return post(url, list)
}

// 分类删除接口
export function delBaseType (list) {
  const url = '/yjk-operation/baseType/delBaseType'
  return post(url, list)
}
