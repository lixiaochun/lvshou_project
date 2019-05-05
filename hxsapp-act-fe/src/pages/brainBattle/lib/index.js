/**
 * @desc 当前活动的公共方法
 */
import { urlGet, isApp } from 'Utils/common'
import LvshouFetch from 'Api/common';
import {mintToast} from 'Utils/method'

export function api(uri) {
  let protocol = 'https:';
  let hostname = '//act.hxsapp.com/';
  return protocol + hostname + uri;
}

export function hxsappJumpDynamic(id) {
  if (!isApp() || this.is_share) {
    /* 下载APP */
    window.location.href = 'http://app.hxsapp.com/html/channel_statistics.html?channel_id=576'
    return false;
  }
  if (!urlGet('sess_token')) {
    window.location.href = 'https://hxsapp_showloginpage';
    return false
  }
  // 1=进行中；-1=已结束；-2=未开始
  let baseActiveInfo = this.$store.state.baseActiveInfo;
  if (baseActiveInfo.state === -1) {
    mintToast('活动已结束');
    return false;
  }
  if (baseActiveInfo.state === -2) {
    mintToast('活动未开始');
    return false;
  }
  /* https://hxsapp_jump_dynamic#话题id */
  window.location.href = 'https://hxsapp_jump_dynamic#' + id;
}
// 级别/段位处理 @parems n = 星星个数
export function handleGrade(n) {
  //                        奋力青铜 ★x1 =>1
  // 奋力青铜 ★x1  赢三局→ 不屈白银 ★x1 =>4
  // 不屈白银 ★x1  赢三局→ 博学黄金 ★x1 =>7
  // 博学黄金 ★x1  赢五局→ 超凡钻石 ★x1 =>12
  // 超凡钻石 ★x1  赢六局→ 鸿儒大师 ★x1 =>18
  // 鸿儒大师 ★x1  赢十局→ 脑力王者 ★x1 =>28
  if (isNaN(parseInt(n))) {
    return false;
  }
  // 默认
  let user = {
    grade: '奋力青铜',
    number: n || 1,
    designation: 1,
    designationImage: require('../assets/images/title/img_1.png')
  };
  if (n > 3) {
    user.grade = '不屈白银';
    user.number = n - 3;
    user.designation = 2;
    user.designationImage = require('../assets/images/title/img_2.png');
  }
  if (n > 6) {
    user.grade = '博学黄金';
    user.number = n - 6;
    user.designation = 3;
    user.designationImage = require('../assets/images/title/img_3.png');
  }
  if (n > 11) {
    user.grade = '超凡钻石';
    user.number = n - 11;
    user.designation = 4;
    user.designationImage = require('../assets/images/title/img_4.png');
  }
  if (n > 17) {
    user.grade = '鸿儒大师';
    user.number = n - 17;
    user.designation = 5;
    user.designationImage = require('../assets/images/title/img_5.png');
  }
  if (n > 27) {
    user.grade = '脑力王者';
    user.number = n - 27;
    user.designation = 6;
    user.designationImage = require('../assets/images/title/img_6.png');
  }
  return user;
}

export function baseInformation() {
  let baseInformation = {
    act_id: urlGet('id'),
    sess_token: urlGet('sess_token'),
    utime: urlGet('utime'),
    sign: urlGet('sign'),
    is_share: urlGet('is_share')
  }
  this.$store.commit('baseInformation', baseInformation);
  this.baseInformation = baseInformation;
  return baseInformation;
}

export async function getBaseInfo(reload) {
  // 通过接口获取基础信息
  let result = null;
  let baseActiveInfo = this.$store.state.baseActiveInfo;
  let data = this.$store.state.baseInformation || {};
  if (reload || !baseActiveInfo) {
    result = await LvshouFetch({
      url: 'https://act.hxsapp.com/base/Api/actInfo',
      data
    })
    // 存入vuex
    this.$store.commit('baseActiveInfo', result);
  } else {
    result = this.$store.state.baseActiveInfo
  }
  if (!result) {
    result = this.$store.state.baseActiveInfo
    if (!result) {
      return false;
    }
  }
  // 通过api 接口 动态改变title
  document.title = result.title;
  // 调起app 的分享协议
  let topicId = this.$route.params.topicId;
  let search = window.location.search;
  let is_share = search.includes('is_share') ? search : search + '&is_share=true';
  let link = window.location.origin + '/actweb/brainBattle/share/' + topicId + is_share;
  // https://hxsapp_visible_act_share_btn#分享标题#分享链接#封面地址#分享描述#活动分享统计类型名称
  let _href = 'https://hxsapp_visible_act_share_btn#' + result.title + '#' + link + '#' + result.share_pic + '#' + result.descr + '#' + result.share_type;
  let baseInformation = this.$store.state.baseInformation;
  if (baseInformation && !baseInformation.is_share) {
    window.location.href = _href;
  }

  // 分享后的回调
  window.appShareCallback = function (str) {
    if (str === 'success') {
      // /* "code":305 1.邀请好友 2.发布动态 才可以继续猜题  */
      if (this.NumberOfGamesShow) {
        this.NumberOfGamesShow = false
      }
      return false;
      // 分享新增抽奖
      // axios.get('https://api.hxsapp.com/account/userAccount/getOpenIMAccount', {
      //     params: IMjson
      //   })
    }
  }.bind(this)
}
// reload 是否重新加载用户信息
export async function getUserInfo(reload, callback, t = 1) {
  if (this.beforeDestroyClearTimeout) {
    return false;
  }
  let handleResult = (result) => {
    if (!result) {
      return false;
    }
    let user = handleGrade(result.star);
    result = Object.assign({}, result, user);
    // // 存入vuex
    this.$store.commit('userInfo', result);
    if (callback && typeof callback === 'function') {
      callback(result)
    }
  }
  let data = this.$store.state.baseInformation || {};
  if (reload || !this.$store.state.userInfo) {
    await LvshouFetch({
      url: api('lantern/GuessAnswer/index'),
      data,
      warning: false
    }).then(result => {
      handleResult(result);
    }).catch(err => {
      console.log(err);
      if (err.code && parseInt(err.code) === 401 && !urlGet('is_share')) {
        window.location.href = 'https://hxsapp_showloginpage';
        return false;
      }
      // 处理请求错误回调
      if (t < 3) {
        ++t;
        setTimeout(() => {
          getUserInfo.call(this, reload, callback, t);
        }, t * 1000)
      } else {
        let msg = (err.msg && err.msg !== '') ? err.msg : '网络异常';
        mintToast(msg);
      }
    })
  }
  handleResult(this.$store.state.userInfo);
}

export function vueOpenWebview(router, replace) {
  // alert(replace);
  let pathname = location.pathname.split('/')
  let pathnameSearch = pathname[pathname.length - 1] + location.search;
  let push = '/' + router + '/' + pathnameSearch;
  if (replace) {
    this.$router.replace(push)
  } else {
    this.$router.push(push)
  }
}

export function visibilitychange(changeFunction, visibleFunction, hiddenFunction) {
  document.addEventListener('visibilitychange', function() {
    if (changeFunction && typeof changeFunction === 'function') {
      changeFunction(document.visibilityState)
    }
    if (document.visibilityState === 'visible' && visibleFunction && typeof visibleFunction === 'function') {
      visibleFunction(document.visibilityState)
    }
    if (self.visibilityState === 'hidden' && hiddenFunction && typeof hiddenFunction === 'function') {
      hiddenFunction(document.visibilityState)
    }
  });
}

// 动态添加文字
// @params text=文字/textTime=一个文字渲染时长(二选一) time=渲染全部文字时长 callabck=每次渲染一个文字是回调一次 endCallback=全部渲染完成回调
export async function addText(text, time, textTime, callback, endCallback) {
  let _text = text || '';
  let len = _text.length || 0;
  let _time = time || 1000;
  let lt = _time / len;
  if (textTime) {
    lt = textTime
  }
  let ntext = [];
  let index = 0;
  let siv = setInterval(() => {
    index++;
    ntext.push(_text.substring(index - 1, index));
    if (callback) {
      callback(ntext.join(''), index)
    }
    if (len === index) {
      clearInterval(siv);
    }
  }, lt)
  if (endCallback && typeof endCallback === 'function') {
    let endCallbackTimeout = setTimeout(() => {
      endCallback();
      clearTimeout(endCallbackTimeout)
    }, time || textTime * len)
  }
}

export default {
  baseInformation,
  getBaseInfo,
  getUserInfo,
  handleGrade,
  vueOpenWebview,
  hxsappJumpDynamic,
  visibilitychange,
  addText
}
