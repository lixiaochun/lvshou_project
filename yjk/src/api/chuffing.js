import { get, post } from 'common/js/ajax'
// 轮播图管理

// 轮播图列表
export function getSlideshowList() {
  const url = '/yjk-operation/slideshow/getSlideshowList'
  return get(url)
}

// 删除轮播图
export function delSlideshow(list) {
  const url = '/yjk-operation/slideshow/delSlideshow'
  return post(url, list)
}
// 添加轮播图
export function saveSlideshow(list) {
  const url = '/yjk-operation/slideshow/saveSlideshow'
  return post(url, list)
}
// 修改轮播图
export function upSlideshow(list) {
  const url = '/yjk-operation/slideshow/upSlideshow'
  return post(url, list)
}
