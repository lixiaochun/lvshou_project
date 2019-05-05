/*
* 初始化分享的功能插件
*/

import LvshouFetch from 'Api/common';
export const LsShareInit = (type,initData) =>{
  debugger;
  if(type==false) return;
  var utilsCommon=require('Utils/common');
  //var LvshouFetch=require('Api/common');
  // const ifLoad=true;
  // if(!ifLoad) return;
  const baseInformation={
    act_id: utilsCommon.urlGet('id'),
    sess_token: utilsCommon.urlGet('sess_token'),
    utime: utilsCommon.urlGet('utime'),
    sign: utilsCommon.urlGet('sign'),
    is_web: utilsCommon.urlGet('is_web')
  };
  const is_web= utilsCommon.urlGet('is_web');
  const apiData =LvshouFetch({
    url: 'https://act.hxsapp.com/base/Api/actInfo',
    baseInformation
  });  
  let link = utilsCommon.splicingUrl(Object.assign({},baseInformation, {is_web :true}), apiData.link);
  // 调起app 的分享协议
  utilsCommon.LsShare({
    shareLink:  initData.shareLink==""?apiData.link:initData.shareLink,//分享的连接
    shareTitle: initData.shareTitle==""?apiData.title:initData.shareTitle,//分享的题目
    shareImages: initData.shareImages==""?apiData.share_pic:initData.shareImages,//分享的图片
    shareDescr: initData.shareDescr==""?apiData.descr:initData.shareDescr,
    shareType: initData.shareType==""?apiData.share_type:initData.shareType
  })
}

// 暴露 common.js 的方法 
export default {
  LsShareInit
}
