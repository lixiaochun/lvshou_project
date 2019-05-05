/**
 * @desc 引用一下常用的方法
 * @author zhoudihang@lvshou.com
 */
import { Toast, Indicator } from 'mint-ui';

// 弹框
export const mintToast = (params) => {
  let w = window || global || this;
  if (w.mintToast) {
    w.mintToast.close()
  }
  w.mintToast = Toast(params);
}

// 加载弹框
export const mintIndicator = (params) => {
  if (params) {
    Indicator.open(params);
  } else {
    Indicator.open();
  }
}

// 下载APP
export const downloadApp = (channel_id) => {
  /* 下载APP */
  window.location.href = 'http://app.hxsapp.com/html/channel_statistics.html?channel_id=' + channel_id;
}

// 复制
export const copy = (text) => {
  if (!document) {
    mintToast('请在浏览器中使用');
    return false;
  }
  var TextareaCopy = document.getElementById('TextareaCopy');
  let Textarea = null;
  if (TextareaCopy) {
    // alert(2)
    Textarea = TextareaCopy;
  } else {
    // alert(3)
    Textarea = document.createElement('textarea');
    // Textarea.style = 'position: fixed;left: -99999px;bottom: 0;';
    Textarea.id = 'TextareaCopy';
    // let $app = document.getElementById('app');
    // document.getElementsByTagName('body')[0].insertBefore(Textarea, $app);
    document.getElementsByTagName('body')[0].appendChild(Textarea);
    // alert(36)
  }
  // alert(4)
  // alert(text)
  Textarea.value = text;
  setTimeout(() => {
    Textarea.select();
    document.execCommand('Copy');
  }, 1000)
  // Textarea.blur();
  // alert('Copy hxs12307')
}

// 判断是否登录
// code => 状态吗
// is => 是否需要跳转到登录协议
export const isLogin = (code, is = true) => {
  if (parseInt(code) === 401) {
    // 登录协议
    if (is) {
      window.location.href = 'https://hxsapp_showloginpage';
    }
    return false;
  }
  return true;
}

// 暴露 method.js 的方法
export default {
  mintToast,
  mintIndicator,
  downloadApp,
  copy,
  isLogin
}
