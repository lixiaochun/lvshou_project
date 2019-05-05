/*
* 初始化分享的功能插件
*/

import LvshouFetch from 'Api/common';
import {urlGet,LsShare,splicingUrl} from 'Utils/common'
export const LsShareInit = (type,initData) =>{
  if(type==false) return;
  const baseInformation={
    act_id: urlGet('id'),
    sess_token: urlGet('sess_token'),
    utime: urlGet('utime'),
    sign: urlGet('sign'),
    is_web: urlGet('is_web')
  };
  const is_web= urlGet('is_web');
  const apiData =LvshouFetch({
    url: 'https://act.hxsapp.com/base/Api/actInfo',
    baseInformation
  });  
  let link =splicingUrl(Object.assign({},baseInformation, {is_web :true}), apiData.link);
  
  // 调起app 的分享协议
    LsShare({
    shareLink:  initData.shareLink==undefined?apiData.link:initData.shareLink,//分享的连接
    shareTitle: initData.shareTitle==undefined?apiData.title:initData.shareTitle,//分享的题目
    shareImages: initData.shareImages==undefined?apiData.share_pic:initData.shareImages,//分享的图片
    shareDescr: initData.shareDescr==undefined?apiData.descr:initData.shareDescr,
    shareType: initData.shareType==undefined?apiData.share_type:initData.shareType
  })
}

// 暴露 common.js 的方法 
export default {
  LsShareInit
}
