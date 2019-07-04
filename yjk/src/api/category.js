import { get, post } from 'common/js/ajax'
// 新的分类管理

// 分类列表
export function getCategoryList(type) {
  const url = '/yjk-operation/discCategory/getList'
  return get(url, type)
}
// 增加分类
export function saveCategory(obj) {
  const url = '/yjk-operation/discCategory/saveDiscCategory'
  return post(url, obj)
}
// 修改分类
export function updateCategory(obj) {
  const url = '/yjk-operation/discCategory/updateDiscCategory'
  return post(url, obj)
}
// 删除分类
export function deleteCategory(id) {
  const url = '/yjk-operation/discCategory/deleteDiscCategoryById'
  return post(url, id)
}
