import axios from 'axios'

// 内容管理 == > 上传图片
/* eslint-disable standard/no-callback-literal */
export function uploadPic(file, callback) {
  const url = '/yjk-operation/file/uploadFile'
  const param = new FormData()
  param.append('file', file, file.name)
  return axios.post(url,
    param,
    {
      headers: { 'Content-Type': 'multipart/form-data' },
      onUploadProgress: function(progressEvent) {
        const { loaded, total } = progressEvent
        callback && callback(loaded / total)
      }
    }
  ).then((res) => {
    return Promise.resolve(res.data)
  })
}

// 上传html
export function uploadContent(title, fromName, html, currentTime) {
  if (!title && !fromName && !currentTime) {
    return `
          <!DOCTYPE html>
            <html>
              <head>
                <meta charset="utf-8">
                <meta name="viewport" content="width=device-width,initial-scale=1.0">
                <title>商品详情</title>
                <style>
                  h3,p{
                  margin: 0;
                  }
                  p{
                    line-height: 20px;
                  }
                  img{
                  width: 100%;
                  height: auto;
                  max-width: 100%;
                  max-height: 100%;
                  display: block;
                  }
                  ol{list-style-type:none}
                  ol li{list-style-type:none}
                  .article{ margin: 0 auto; max-width: 640px; padding: 0 }
                </style>
              </head>
              <body class="article" style="max-width: 100%; padding: 0">
                ${html}
              </body>
            </html>
          `
  }
  return `
  <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width,initial-scale=1.0">
        <title>帖子详情</title>
        <style>
          h3,p{
          margin: 0;
          }
          p{
            line-height: 20px;
          }
          img{
          width: 100%;
          height: auto;
          max-width: 100%;
          max-height: 100%;
          display: block;
          }
          ol{list-style-type:none}
          ol li{list-style-type:none}
          .article{ margin: 0 auto; padding: 0 12px; max-width: 640px; }
        </style>
      </head>
      <body class="article" style="max-width: 100%; width: calc(100% - 24px)">
        <div class="article-title">
          <h3 style="line-height: 40px; font-size: 26px; margin-top: 6px">#${title}#</h3>
          <p style="height: 34px; line-height: 34px;"><label>${currentTime}</label> <span style="font-size: 12px; color: #666; float: right" >来源：${fromName}</span></p>
        </div>
        ${html}
      </body>
    </html>
  `
}

// 等级设置 == > 上传图片
/* eslint-disable standard/no-callback-literal */
export function levelPploadPic(file, callback) {
  const url = '/yjk-operation/appUserLevelConfig/uploadPic'
  const param = new FormData()
  param.append('file', file, file.name)
  return axios.post(url,
    param,
    {
      headers: { 'Content-Type': 'multipart/form-data' },
      onUploadProgress: function(progressEvent) {
        const { loaded, total } = progressEvent
        callback && callback(loaded / total)
      }
    }
  ).then((res) => {
    return Promise.resolve(res.data)
  })
}

export function uploadContentMessage(title, html, currentTime) {
  return `
    <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width,initial-scale=1.0">
          <title>测试数据</title>
          <style>
            h3,p{
            margin: 0;
            }
            p{
              line-height: 20px;
            }
            img{
            width: 100%;
            height: auto;
            max-width: 100%;
            max-height: 100%;
            display: block;
            }
            ol{list-style-type:none}
            ol li{list-style-type:none}
            .article{ margin: 0 auto; padding: 0 12px; max-width: 640px; }
          </style>
        </head>
        <body class="article" style="max-width: 100%; width: calc(100% - 24px)">
          <div class="article-title">
            <h3 style="line-height: 40px; font-size: 26px; margin-top: 6px">${title}</h3>
            <p>${currentTime}</p>
          </div>
          ${html}
        </body>
      </html>
  `
}
