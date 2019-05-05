import axios from "axios";
import wx from "weixin-js-sdk";
import $ from "jquery";

// 全局配置
var config = {
  webTitle: "好享瘦",
  downLoadTitle: "让天下没有孤独的胖纸",
  proUrl: "https://app.hxsapp.com/",
  model_idfa: getUrlParam("model_idfa"),
  prefixUrl:
    process.env.NODE_ENV === "production"
      ? "https://app.hxsapp.com/hxsweb/"
      : "http://localhost:8082/hxsweb/",
  downLoadUrl: "https://www.hxsapp.com/download/",
  hxsBridgeName: "hxsHybrid",
  hxsBridgeObject: "hxsNativeBride"
};

var ua = window.navigator.userAgent;
var locationSearch = window.location.href.split("?")[1];

//获取url参数
function getUrlParam(name, param = locationSearch) {
  if (!param) return null;
  var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
  var r = param.match(reg);
  if (r != null) return unescape(r[2]);
  return null;
}

//字符串超出部分显示省略号
function subStlength(str, maxLength = 7, targetLength = 6) {
  if (!str) return null;
  var reg = /^[A-Za-z]+$/;
  var re = /^[0-9a-zA-Z]*$/g;
  if (reg.test(str) || re.test(str)) {
    if (str.length > 2 * maxLength)
      str = str.substring(0, 2 * targetLength) + "...";
  } else {
    if (str.length > maxLength) str = str.substring(0, targetLength) + "...";
  }

  return str;
}
//设置title,主要兼容微信title
function setTitle(title) {
  var ua = window.navigator.userAgent;
  var isIos = new RegExp("iPhone").test(ua);
  var isIpad = new RegExp("iPad").test(ua);
  var isWeixin = new RegExp("MicroMessenger").test(ua);

  document.title = title;
  if (isIos && isWeixin) {
    let iframe = document.createElement("iframe");
    iframe.style.dosplay = "none";
    iframe.src = "/favicon.ico";
    iframe.onload = () => {
      setTimeout(() => {
        document.body.removeChild(iframe);
      }, 30);
    };
    document.body.appendChild(iframe);
  }
}

// 获取当前登录用户在app内的 邀请码信息

function getInviteCode(callbackFun) {
  var invite_code = "";
  if (!isApp() || !isLogin()) {
    console.log("不在app内或没有登录，无法获取邀请码");
    callbackFun(invite_code);
    return;
  }

  // 等待
  var json = {
    sess_token: getUrlParam("sess_token"),
    sign: getUrlParam("sess_token"),
    utime: new Date().getTime()
  };

  axios
    .get("https://api.hxsapp.com/account/userInfo/getInviteCode", {
      params: json
    })
    .then(res => {
      // alert(JSON.stringify(res))
      if (res.data.code == 200) {
        invite_code =
          res.data.data && res.data.data.invite_code
            ? res.data.data.invite_code
            : "";
        callbackFun(invite_code);
      } else {
        callbackFun(invite_code);
      }
    })
    .catch(error => {
      callbackFun(invite_code);
      // return invite_code;
    });
}

//二次分享-微信环境
function outSideShare(Info) {
  var json = {
    share_url: window.location.href
  };
  axios
    .get("https://api.hxsapp.com/base/common/getWxShareJsApiSignature", {
      params: json
    })
    .then(function(res) {
      if (res.data.code == 200) {
        var data = res.data.data;
        seconDaryShare(
          decodeURIComponent(Info.title),
          decodeURIComponent(Info.desc),
          Info.link,
          Info.img,
          data.appId,
          data.timestamp,
          data.noncestr,
          data.signature
        );
      }
    });
}

function seconDaryShare(tit, describe, href, img, id, time, nonce, sign) {
  if (ua.indexOf("MicroMessenger") != -1) {
    wx.config({
      debug: false,
      appId: id,
      timestamp: time, // 必填，生成签名的时间戳
      nonceStr: nonce, // 必填，生成签名的随机串
      signature: sign, // 必填，签名，见附录1
      jsApiList: [
        "onMenuShareTimeline",
        "onMenuShareAppMessage",
        "onMenuShareQQ",
        "onMenuShareWeibo",
        "onMenuShareQZone"
      ]
    });
    wx.ready(function() {
      wx.onMenuShareTimeline({
        //微信分享到朋友圈
        title: tit,
        link: href,
        imgUrl: img,
        success: function() {},
        cancel: function() {}
      });

      wx.onMenuShareAppMessage({
        //微信分享给朋友
        title: tit,
        desc: describe,
        link: href,
        imgUrl: img,
        type: "", // 分享类型,music、video或link，不填默认为link
        dataUrl: "", // 如果type是music或video，则要提供数据链接，默认为空
        success: function() {},
        cancel: function() {}
      });

      wx.onMenuShareQQ({
        //分享到qq
        title: tit,
        desc: describe,
        link: href,
        imgUrl: img,
        success: function() {},
        cancel: function() {}
      });

      wx.onMenuShareWeibo({
        //分享到qq微博
        title: tit,
        desc: describe,
        link: href,
        imgUrl: img,
        success: function() {},
        cancel: function() {}
      });

      wx.onMenuShareQZone({
        //分享到qq空间
        title: tit,
        desc: describe,
        link: href,
        imgUrl: img,
        success: function() {},
        cancel: function() {}
      });
    });
  }
}

function iosInputfixed(
  fixedBox = ".discuss-container",
  input = ".fixed_input",
  focusFn,
  blurFn
) {
  var ua = window.navigator.userAgent;
  var isIos = new RegExp("iPhone").test(ua);
  var isIpad = new RegExp("iPad").test(ua);
  var isiPhoneX = new RegExp("iPhone X").test(ua);
  var scrollHeihght = 0;

  if (isiPhoneX) {
    $(".discuss-container").css({
      paddingTop: 7,
      paddingBottom: 9
    });
  }

  $(document).on("focus", input, function() {
    if (isIos || isIpad) {
      scrollHeihght = $(window).scrollTop();
      $(fixedBox).css({
        position: "absolute"
      });
      $("html, body").css({
        height: "100%",
        overflow: "hidden"
      });

      if (!isiPhoneX) {
        setTimeout(function() {
          document.body.scrollTop = document.body.scrollHeight;
        }, 250);
      }
    }
    if (focusFn) {
      focusFn();
    }
  });

  $(document).on("blur", input, function() {
    if (blurFn) {
      blurFn();
    }
    if (isIos || isIpad) {
      document.body.scrollTop = scrollHeihght;
      $(fixedBox).css({
        position: "fixed"
      });
      $("html, body").css({
        height: "auto",
        overflow: "auto"
      });
    }
  });
}

function offEventIosInputFixed(input = ".fixed_input") {
  console.log("offEventIosInputFixed-do somethings");
  $(document).off("focus", input);
  $("html, body").removeAttr("style");
}

// 发送埋点
function buriedPoint(json) {
  var newMobileSystem = getUaparen("mobile_system");
  var newBrand = getUaparen("brand");
  var newModel = getUaparen("model");
  var newSystemResolution = getUaparen("system_resolution");
  var newChannelNumber = getUaparen("channel_number");
  var newVersionNumber = getUaparen("version_number");
  var newNetworkEnvironment = getUaparen("network_environment");
  var newLongitude = getUaparen("longitude");
  var newLatitude = getUaparen("latitude");
  var newRegisterId = getUaparen("register_id");
  var newConversationId = getUaparen("conversation_id");
  var newUserId = getUaparen("user_id");

  //判断在那个场景打开页面
  var MicroMessenger = new RegExp("MicroMessenger").test(ua);
  var previousWebType = MicroMessenger ? "微信" : "其他";
  if (isApp()) previousWebType = "app内已设置类型";

  var uaPoint = {
    mobile_system: newMobileSystem,
    brand: newBrand,
    model: newModel,
    system_resolution: newSystemResolution,
    channel_number: newChannelNumber,
    version_number: newVersionNumber,
    network_environment: newNetworkEnvironment,
    longitude: newLongitude,
    latitude: newLatitude,
    register_id: newRegisterId,
    conversation_id: newConversationId,
    user_id: newUserId,
    previous_web_type: previousWebType
  };

  console.log("iniiii ");
  var buriedPoint = Object.assign(json, uaPoint);
  var params = "";

  for (var key in buriedPoint) {
    params += key + "=" + buriedPoint[key] + "&";
  }
  params = params.substring(0, params.length - 1);

  // http://blog.csdn.net/hxyascx/article/details/53374047

  var rnd_id = "log_img_" + new Date().getTime() + "_" + Math.random();
  var marsImg = (window[rnd_id] = new Image()); //把new Image()赋给一个全局变量长期持有
  marsImg.onload = marsImg.onerror = function() {
    console.log("埋点全局函数名称：" + rnd_id);
    window[rnd_id] = null;
  };
  marsImg.src = "https://mars.hxsapp.com/h5?" + params;

  //释放局部变量marsImg
  marsImg = null;
}

//userAgent参数获取
function getUaparen(key) {
  var p = window.navigator.userAgent;
  var v = "";
  p = p.split("&");
  p.map(function(item) {
    var temp = item.split("-");
    if (temp[0] == key) {
      if (temp.length > 2) {
        for (var i in temp) {
          if (i > 0) {
            if (i > 1) {
              v += "-" + temp[i];
            } else {
              v += temp[i];
            }
          }
        }
      } else {
        v = temp[1];
      }
    }
  });
  return v;
}

//获取App版本号
function getHxsAppVersion() {
  var UserAgent = window.navigator.userAgent;
  var windowLocation = window.location.href;
  var __version = UserAgent.split("hxsapp-version-")[1]
    ? UserAgent.split("hxsapp-version-")[1].split("&")[0]
    : "0.0.0";

  function __get_dian(str) {
    var num = 0;
    for (var i = 0; i < str.length; i++) {
      if (str[i] == ".") {
        num++;
      }
    }
    return num;
  }

  //先补零操作
  //例如 2.10 ＝> 2.10.0
  //例如 2.10.1 不会补零操作

  if (__get_dian(__version) == 1) {
    __version = __version + ".0";
  }
  return __version;
}

// 比较判断2个版本号的大小方法
// 例子使用：
// compareVersionEle("2.10.0","2.9.0")
// 返回： ture
function compareAppVersion(new_str, old_str) {
  //new_str > old_str
  // compareVersionEle("2.10.0","2.9.0") ture

  if (typeof new_str != "string" || typeof old_str != "string") {
    console.log("参数类型必须微字符串：string ");
    return;
  }
  if (new_str.indexOf(".") < 0 || old_str.indexOf(".") < 0) {
    console.log("版本号传入有错误");
    return;
  }

  function __get_dian(str) {
    var num = 0;
    for (var i = 0; i < str.length; i++) {
      if (str[i] == ".") {
        num++;
      }
    }
    return num;
  }

  var __new_str = new_str;
  var __old_str = old_str;

  //先补零操作
  if (__get_dian(new_str) == 1) {
    __new_str = new_str + ".0";
  }
  if (__get_dian(old_str) == 1) {
    __old_str = old_str + ".0";
  }

  // debugger

  var new_str_split = __new_str.split(".");
  var old_str_split = __old_str.split(".");

  //比较第一位
  if (new_str_split[0] === old_str_split[0]) {
    //比较第二位
    if (new_str_split[1] === old_str_split[1]) {
      //比较第三位
      if (parseInt(new_str_split[2]) >= parseInt(old_str_split[2])) {
        return true;
      } else if (parseInt(new_str_split[2]) < parseInt(old_str_split[2])) {
        return false;
      }
    } else if (parseInt(new_str_split[1]) > parseInt(old_str_split[1])) {
      return true;
    } else if (parseInt(new_str_split[1]) < parseInt(old_str_split[1])) {
      return false;
    }
  } else if (parseInt(new_str_split[0]) > parseInt(old_str_split[0])) {
    return true;
  } else if (parseInt(new_str_split[0]) < parseInt(old_str_split[0])) {
    return false;
  }
}

//判断是非在app里的方法
function isApp() {
  //     app域下，判断是否在app的2个办法：
  // （1）参数 sess_token 是否有这个参数
  // （2）判断url上参数displayThumbBtn是否存在，且他的值必须为1， 这个参数是分享出来前端自己拼接带上去的

  // var displayThumbBtn;
  // if (window.location.search.indexOf('displayThumbBtn') >= 0) {
  //   //不是app
  //   console.log("目前不在app里面,Version:" + getHxsAppVersion())
  //   displayThumbBtn = true
  // } else {
  //   // 是app
  //   console.log("目前在app里面,Version:" + getHxsAppVersion())
  //   displayThumbBtn = false
  // }

  // if (!displayThumbBtn) {
  //   // 是app
  //   console.log("在app里面")
  //   return true
  // } else {
  //   //不是app
  //   console.log("不在app里面")
  //   return false
  // }
  var is_sess_token;
  if (window.location.search.indexOf("sess_token") >= 0) {
    is_sess_token = true;
  } else {
    is_sess_token = false;
  }

  // app下面的调试模式
  if (is_sess_token) {
    console.log("在app里，且已经登录了");
    return true;
  } else {
    console.log("在app里，且没有登录了");
    return false;
  }
}

// 判断是否登录的方法
function isLogin() {
  var is_sess_token;
  // 坑：安卓下面app，没有登录的时候，sess_token＝null

  if (
    getUrlParam("sess_token") &&
    getUrlParam("sess_token").length != 0 &&
    getUrlParam("sess_token").length > 4
  ) {
    is_sess_token = true;
  } else {
    is_sess_token = false;
  }

  if (is_sess_token) {
    console.log("在app里，且已经登录了");
    return true;
  } else {
    console.log("在app里，且没有登录了");
    return false;
  }
}

var h5CallAppAction = {
  // 页面事件调起app的分享
  hxsapp_tune_up_share(obj) {
    // https://hxsapp_tune_up_share#分享标题#分享链接#封面地址#分享描述#文章id#文章类型id#媒体url

    var shareTitle = obj.shareTitle;
    var shareLink = obj.shareLink;
    var shareImages = obj.shareImages;
    var shareDescr = obj.shareDescr;
    var shareArticleId = obj.shareArticleId;
    var shareType = obj.shareType;
    var shareMediaLink = obj.shareMediaLink;

    var shareContent = [
      shareTitle,
      shareLink,
      shareImages,
      shareDescr,
      shareArticleId,
      shareType,
      shareMediaLink
    ].join("#");
    if (process.env.NODE_ENV === "production" && isApp()) {
      window.location.href = "https://hxsapp_tune_up_share#" + shareContent;
    } else {
      console.log("本地开发pc环境，无法调起app分享主动协议");
    }
  },
  // 初始化右上角的分享按钮
  hxsapp_visible_share_btn: function(obj) {
    var shareTitle = obj.shareTitle;
    var shareLink = obj.shareLink;
    var shareImages = obj.shareImages;
    var shareDescr = obj.shareDescr;
    var shareArticleId = obj.shareArticleId;
    var shareType = obj.shareType;
    var shareMediaLink = obj.shareMediaLink;
    var shareActWindowTitle = obj.shareActWindowTitle;
    var shareActWindowDescr = obj.shareActWindowDescr;

    var shareContent = [
      shareTitle,
      shareLink,
      shareImages,
      shareDescr,
      shareArticleId,
      shareType,
      shareMediaLink,
      shareActWindowTitle,
      shareActWindowDescr
    ].join("#");
    if (process.env.NODE_ENV === "production" && isApp()) {
      window.location.href = "https://hxsapp_visible_share_btn#" + shareContent;
    } else {
      console.log("本地开发pc环境，无法调起app分享协议");
    }
  },
  hxsapp_showloginpage: function() {
    //调起登录框
    if (process.env.NODE_ENV === "production" && isApp()) {
      window.location.href = "https://hxsapp_showloginpage";
    } else {
      console.log("本地开发pc环境，无法调起登录框");
    }
  },
  hxsapp_addNubmerCar: function() {
    //成功加入购物车商品数量
    window.location.href = "https://hxsapp_add_number_car";
  },
  hxsapp_openIm: function() {
    //商城客服
    var appVersion = getHxsAppVersion();
    var isTrue = compareAppVersion(appVersion, "3.1.1");
    if (isTrue) {
      window.location.href =
        "https://hxsapp_openim_page?service_id=brm-110354224762220&title=" +
        encodeURIComponent("商城客服");
    } else {
      window.location.href = "https://hxsapp_openim#" + "mall-0001";
    }
  },
  hxsapp_accomplishTasksTip: function() {
    //用户完成每日任务底部提示行为
    if (process.env.NODE_ENV === "production" && isApp()) {
      window.location.href = "https://hxsapp_accomplish_tasks_tip";
    } else {
      console.log("本地开发pc环境，无法开启－用户完成每日任务底部提示行为协议");
    }
  },
  hxsapp_shareBtnNone: function() {
    //隐藏app右上角分享图标
    window.location.href = "https://hxsapp_share_btn_none";
  },
  hxsapp_accomplishTasksTipNone: function() {
    //隐藏用户完成每日任务底部提示行为
    let ua = window.navigator.userAgent;
    let isAndroid = new RegExp("Android").test(ua);
    if (isAndroid) return;
    if (key) window.location.href = "https://hxsapp_accomplish_tasks_tip_none";
  },
  hxsapp_new_webview: function(url) {
    console.log(url);
    if (process.env.NODE_ENV === "production" && isApp()) {
      window.location.href = "https://hxsapp_new_webview#" + url;
    } else {
      console.log("本地开发pc环境，无法开启新页面的app分享协议");
    }
  },
  hxsapp_buy_article_detail(articleId) {
    console.log(articleId);
    if (process.env.NODE_ENV === "production" && isApp()) {
      window.location.href =
        "https://hxsapp_buy_article_detail?id=" + articleId;
    } else {
      console.log("本地开发pc环境，无法开启新页面的app分享协议");
    }
  }
};

// app调起h5前端的共用函数
var appCallH5Action = {};

// 接入深度链接库linkedme框架

var linkedMe = function(__data = {}) {
  // debugger
  // 给默认值
  // __data.domText = __data.domText ? __data.domText : "下载并打开APP";
  __data.domText = __data.domText ? __data.domText : "下载APP";
  __data.domId = __data.domId ? __data.domId : "LinkedMeDom";

  var __linkedme_key = "69aff539eac106c3ef597454a7c319ed";

  var __type = process.env.NODE_ENV === "production" ? "live" : "test";
  linkedme.init(__linkedme_key, { type: __type }, null);

  // 处理传入进来的参数
  var data = Object.assign({}, __data);
  data.type = __type; //表示现在使用线上模式,如果填写"test", 表示测试模式.【可选】
  // data.feature = "功能名称"; // 自定义深度链接功能，多个用逗号分隔，【可选】
  // data.stage = "阶段名称"; // 自定义深度链接阶段，多个用逗号分隔，【可选】
  // data.channel = "渠道名称"; // 自定义深度链接渠道，多个用逗号分隔，【可选】
  // data.tags = "标签名称"; // 自定义深度链接标签，多个用逗号分隔，【可选】
  // data.ios_custom_url = ""; // 自定义iOS平台下App的下载地址，如果是AppStore的下载地址可以不用填写，【可选】
  // data.ios_direct_open = ""; //未安装情况下，设置为true为直接打开ios_custom_url，默认为false【可选】
  // data.android_custom_url = "";// 自定义安卓平台下App的下载地址，【可选】
  // data.android_direct_open = ""; //设置为true，所有情况下跳转android_custom_url，默认为false【可选】
  // 下面是自定义深度链接参数，用户点击深度链接打开app之后，params的参数会通过LinkedME服务器透传给app，由app根据参数进行相关跳转
  // 例如：详情页面的参数，写入到params中，这样在唤起app并获取参数后app根据参数跳转到详情页面
  // var value1 = 1;
  // var value2 = 2;

  // data.params = '{"key1":"'+value1+'","key2":"'+value2+'"}'; //注意单引号和双引号的位置
  data.params = '{"key":"' + data.params.key + '"}'; //注意单引号和双引号的位置

  console.log("__data.params:" + JSON.stringify(__data.params));
  console.log("__data.domText:" + __data.domText);
  console.log("__data.domId:" + __data.domId);

  console.log("data.params:" + data.params);
  // debugger

  linkedme.link(
    data,
    function(err, response) {
      if (err) {
        // 生成深度链接失败，返回错误对象err
        return "error";
      } else {
        /* 
        生成深度链接成功，深度链接可以通过data.url得到，
        将深度链接绑定到<a>标签，这样当用户点击这
        个深度链接，如果是在pc上，那么跳转到深度链接二维
        码页面，用户用手机扫描该二维码就会打开app；如果
        在移动端，深度链接直接会根据手机设备类型打开ios
        或者安卓app 
        */
        if (document.getElementById(__data.domId)) {
          document.getElementById(__data.domId).innerHTML =
            '<a class="linkedme" href="' +
            response.url +
            '">' +
            __data.domText +
            "</a>";
          document.getElementById(__data.domId).style.display = "block";
        }
        // debugger
        return response.url;
        // document.getElementById(domId).href = response.url;
      }
    },
    false
  );
};

// // 具体的场景去调用 shareBtnInApp函数
// window.hxsNativeBride.shareBtnInApp( {name:"test568109135"},function(data){
// 	// data是app返回的数据
// 	// 根据app返回的data数据格式来处理业务

// 	// {
// 	// 	code:200,
// 	// 	data:{
// 	// 		name:'jerry',
// 	// 		work:"前端开发"
// 	// 	}
// 	// }
// 	if(data.code == 200){
// 		alert("回调成功了")
// 	}
// })

var common = {
  getUrlParam,
  subStlength,
  outSideShare,
  buriedPoint,
  iosInputfixed,
  offEventIosInputFixed,
  getHxsAppVersion,
  compareAppVersion,
  isApp,
  isLogin,
  // 全局配置的对象
  config,
  // h5调用app协议的封装业务方法对象
  h5CallAppAction,
  // app调用h5页面上函数执行的封装业务方法对象
  appCallH5Action,
  setTitle,
  getInviteCode,
  linkedMe
};

export default common;
