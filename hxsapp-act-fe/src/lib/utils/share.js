/*
* 初始化分享的功能插件
*/

import LvshouFetch from 'Api/common';
import utilsCommon from 'Utils/common'

export const LsShareInit = async ({ type, initData = {} }) => {
  if (type == false) return;

  const baseInformation = {
    act_id: utilsCommon.urlGet('id'),
    sess_token: utilsCommon.urlGet('sess_token'),
    utime: utilsCommon.urlGet('utime'),
    sign: utilsCommon.urlGet('sign'),
    is_web: utilsCommon.urlGet('is_web')
  };
  const is_web = utilsCommon.urlGet('is_web');
  const apiData = await LvshouFetch({
    url: 'https://act.hxsapp.com/base/Api/actInfo',
    data: baseInformation
  });
  let link = utilsCommon.splicingUrl(Object.assign({}, baseInformation, { is_web: true }), apiData.link);
  // 调起app 的分享协议
  utilsCommon.LsShare({
    shareLink: initData.shareLink === "" || initData.shareLink === undefined ? apiData.link : initData.shareLink,//分享的连接
    shareTitle: initData.shareTitle === "" || initData.shareTitle === undefined ? apiData.title : initData.shareTitle,//分享的题目
    shareImages: initData.shareImages === "" || initData.shareImages === undefined ? apiData.share_pic : initData.shareImages,//分享的图片
    shareDescr: initData.shareDescr === "" || initData.shareDescr === undefined ? apiData.descr : initData.shareDescr,
    shareType: initData.shareType === "" || initData.shareType === undefined ? apiData.share_type : initData.shareType
  })
}

// 暴露 common.js 的方法 
export default {
  LsShareInit
}
