import axios from 'axios'
import { post } from 'common/js/ajax'
// 上传视频
export function videoUpload(file, callback, loaded) {
  const url = '/yjk-operation/video/uploadVideo'
  const param = new FormData()
  param.append('file', file, file.name)
  return axios.post(url,
    param,
    {
      headers: { 'Content-Type': 'multipart/form-data' },
      onUploadProgress: function(progressEvent) {
        const { loaded, total } = progressEvent
        // eslint-disable-next-line
        callback && callback(loaded / total)
      }
    }
  ).then((res) => {
    return Promise.resolve(res.data)
  })
}
// 上传封面图片
export function picUpload(file, callback) {
  const url = '/yjk-operation/video/uploadPic'
  const param = new FormData()
  param.append('file', file, file.name)
  return axios.post(url,
    param,
    {
      headers: { 'Content-Type': 'multipart/form-data' },
      onUploadProgress: function(progressEvent) {
        const { loaded, total } = progressEvent
        // eslint-disable-next-line
        callback && callback(loaded / total)
      }
    }
  ).then((res) => {
    return Promise.resolve(res.data)
  })
}
// 添加视频信息
export function saveVideo(list) {
  const url = '/yjk-operation/video/save'
  return post(url, list)
}
// 修改视频信息
export function upVideo(list) {
  const url = '/yjk-operation/video/update'
  return post(url, list)
}
// 视频发布
export function pbVideo(list) {
  const url = '/yjk-operation/video/publish'
  return post(url, list)
}
// 获取待发布列表
export function getStayList(list) {
  const url = '/yjk-operation/video/stayList'
  return post(url, list)
}
// 获取短视频详情
export function getDetail(id) {
  const url = '/yjk-operation/video/detail'
  return post(url, id)
}
// 短视频删除
export function deleteVideo(id) {
  const url = '/yjk-operation/video/delete'
  return post(url, id)
}
// 短视频是否精选
export function isRecommend({ id, isTop }) {
  const url = '/yjk-operation/video/recommend'
  return post(url, { id, isTop })
}
// 短视频发布列表
export function getVideoList(list) {
  const url = '/yjk-operation/video/list'
  return post(url, list)
}
// 播放次数排序
export function changePlayCount(list) {
  // const str = JSON.stringify(order)
  // const arr = '[' + str + ']'
  const url = `/yjk-operation/video/list`
  // const sort = {sort: arr}
  // a.sort =arr;
  return post(url, list)
}
