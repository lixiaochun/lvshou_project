import { get, post } from 'common/js/ajax'

// 登录
export function getSalesOrders ({userName, password}) {
  const url = '/yjk-operation/consultant/login'
  return get(url, {
    username: userName,
    pwd: password
  })
}
// 内容管理 == > table数据
export function getCompare (article) {
  const url = '/yjk-operation/article/getArticleList'
  return post(url, { article })
}

// 内容管理 == > 删除数据
export function getInfo (id) {
  const url = '/yjk-operation/article/delArticle'
  return post(url, id)
}
