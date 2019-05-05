<template>
  <div class="extend">
    <div id="signUpPageAct">
      <div v-show="isPreLoading && !signUpProtocol" class="sign-auto">
        <!-- 此段必须要引入 -->
        <div
          id="_umfp"
          style="display:inline;width:1px;height:1px;overflow:hidden;text-indent:-99999em;"
        ></div>

        <!-- 引入结束 -->
        <div class="input_box">
          <input
            id="phoneNumber"
            type="number"
            pattern="[0-9]*"
            placeholder="请输入手机号"
            v-model="phoneNumber"
          >
        </div>

        <div id="dom_id" class="input_box" style="border: 0 none;height:auto;"></div>

        <div class="input_box">
          <input
            id="yzmStr"
            type="number"
            pattern="[0-9]*"
            placeholder="请输入验证码"
            v-model="yzmStr"
            @click="check_yzm"
          >

          <div class="send_yzm" @click="send_yzm">{{text}}</div>
        </div>

        <div class="res_btn_box">
          <button class="submit_button" @click="res_btn">注册申请</button>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import axios from "axios";

import commonJs from "@/util/common.js";

// 初始化loadding的组件
//  import preLoading from "@/components/preload"
import signUpProtocol from "@/pages/signUpProtocol";

import { Toast } from "mint-ui";

function huaDongSdk(callback) {
  window.nc_appkey = "FFFF000000000177D557"; // 应用标识,不可更改
  window.nc_scene = "register_h5"; //场景,不可更改
  window.nc_token = [nc_appkey, new Date().getTime(), Math.random()].join(":");

  var nc_option = {
    renderTo: "#dom_id", //渲染到该DOM ID指定的Div位置
    appkey: nc_appkey,
    scene: nc_scene,
    token: nc_token,
    // trans: '{"name1":"code0"}',//测试用，特殊nc_appkey时才生效，正式上线时请务必要删除；code0:通过;code100:点击验证码;code200:图形验证码;code300:恶意请求拦截处理
    callback: function (data) {
      // 校验成功回调
      // debugger
      console.log(JSON.stringify(data));
      callback && callback(data);
    },
    error: function (s) {
      console.log(JSON.stringify(s));
    },
    verifycallback: function (data) {
      if (data.code == "200") {
        Toast("验证没有通过");
      }
    }
  };

  if (process.env.NODE_ENV == "production") {
    nc_option = Object.assign({}, nc_option);
  } else {
    nc_option = Object.assign(
      {},
      {
        trans: '{"name1":"code100"}'
      },
      nc_option
    );
  }

  NoCaptcha.init(nc_option);
  NoCaptcha.setEnabled(true);
}

export default {
  name: "signUpPageAct",
  data() {
    return {
      signUpProtocol: false,

      // 是否重新设置验证码
      isReSetYzm: false,
      // 是否显示loading
      isPreLoading: false,
      // 阿里滑动验证触发后的回调数据
      huaDongSdkData: null,
      // 滑动验证的锁判断
      isLock: false,
      // 验证码的倒计时
      second: 60,
      // 判断获取验证码/倒计时/重新获取的文字
      time: -1,

      isDisabled: true,

      // 手机号码数据
      phoneNumber: "",
      //密码
      password: "",
      // 邀请码数据
      yqmStr: "",
      // 验证码数据
      yzmStr: "",
      user_id: null
    };
  },
  components: {
    signUpProtocol
  },
  watch: {
    phoneNumber: function (val, oldval) {
      if (val.length > 11) {
        this.phoneNumber = val.slice(0, 11);
      }
    },
    yzmStr: function (val, oldval) {
      if (val.length > 4) {
        this.yzmStr = val.slice(0, 4);
      }
    }
  },
  computed: {
    text: function () {
      if (this.time != -1) {
        return this.time > 0 ? this.time + " s" : "重新获取";
      } else {
        return "获取验证码";
      }
    }
  },

  mounted() {
    this.initHuaDongSdk();

    this.phoneNumber = this.$route.query.phoneNumber
      ? this.$route.query.phoneNumber
      : "";

    this.yqmStr = this.$route.params.userId ? this.$route.params.userId : "";

    setTimeout(() => {
      this.isPreLoading = true;
    }, 300);
  },

  methods: {
    // 内嵌阿里云sdk－js
    initHuaDongSdk() {
      huaDongSdk(data => {
        this.isLock = true;
        this.huaDongSdkData = data;
        Toast("滑动验证解锁了！");
      });
    },
    //  执行定时器
    run() {
      this.time = this.second;
      this.timer();
    },
    //  递归定时器
    timer() {
      if (this.time > 0) {
        this.time--;
        setTimeout(this.timer, 1000);
      }
      if (this.time == 0) {
        this.isReSetYzm = true;
      }
    },

    //加载页面
    readLoadPage(code) {
      // NoCaptcha.reset()

      var __inviteCode = commonJs.getUrlParam("inviteCode")
        ? commonJs.getUrlParam("inviteCode")
        : "";
      var __url =
        commonJs.config.prefixUrl + "signUpPageAct?inviteCode=" + __inviteCode;
      var __phoneNumber = this.phoneNumber;
      var __jump_url = window.location.href;
      var __t = new Date().getTime(); // 解决部分安卓手机在微信下不刷新

      if (__jump_url.indexOf("?") >= 0) {
        __jump_url += "&t=" + __t;
      } else {
        __jump_url += "?t=" + __t;
      }
      if (code && code == "600") {
        Toast("该手机号已注册");

        setTimeout(() => {
          window.location.replace(__jump_url);
        }, 2000);
      } else {
        window.location.replace(__jump_url);
      }
      return;
    },

    // 发送验证码
    send_yzm() {
      if (!this.isLock) {
        Toast("请先滑动解锁");
        return;
      }

      if (this.time > 0) {
        console.log("倒计时中，不能点击执行");
        return;
      }

      if (this.isLock && this.isReSetYzm) {
        this.readLoadPage();
      }

      var isPhoneNumber = /^(1[3-8][0-9])\d{8}$/.test(
        parseInt(this.phoneNumber)
      );

      if ($("#phoneNumber").val().length == 0) {
        Toast("手机号码不能为空");
        return;
      }
      // else if (!isPhoneNumber) {
      //   Toast("手机号码有误，请重填");
      //   return;
      // } 
      else {
        $("#phoneNumber").blur();
        var __ncpc = JSON.stringify(this.huaDongSdkData);

        var json = {
          mobile: this.phoneNumber,
          smsType: "register",
          app_name: "hxs_h5",
          ncpc: __ncpc,
          appkey: nc_appkey,
          scene: nc_scene,
          token: nc_token
        };
        axios({
          method: "POST",
          url: "https://api.hxsapp.com/account/userAccount/sendSMS",
          data: json,
          transformRequest: [
            function (data) {
              // Do whatever you want to transform the data
              let ret = "";
              for (let it in data) {
                ret +=
                  encodeURIComponent(it) +
                  "=" +
                  encodeURIComponent(data[it]) +
                  "&";
              }
              return ret;
            }
          ],
          headers: {
            "Content-Type": "application/x-www-form-urlencoded"
          }
        })
          .then(res => {
            console.log(res);
            // 请求正常
            if (res.data.code == 200) {
              var data = res.data.data;
              Toast(res.data.msg);
              this.run();
              // 短信接口请求频繁
            } else if (res.data.code == 601) {
              Toast(res.data.msg);
              // 短信请求其他异常
            } else {
              // Toast(res.data.msg);

              this.readLoadPage(res.data.code);
            }
          })
          .catch(error => {
            console.log(error);
            Toast("验证码接口繁忙，请稍后再试");
          });
      }
    },
    // 检查验证码
    check_yzm() {
      if (!this.isLock) {
        Toast("请先滑动解锁");
        return;
      }

      var isPhoneNumber = /^(1[3-8][0-9])\d{8}$/.test(
        parseInt(this.phoneNumber)
      );

      if ($("#phoneNumber").val().length == 0) {
        Toast("手机号码不能为空");
        $("#yzmStr").blur();
        $("#phoneNumber").focus();
        return;
      }
      //  else if (!isPhoneNumber) {
      //   Toast("手机号码有误，请重填");
      //   return;
      // }
      else {
        console.log("可以do-input_yzm");
      }
    },
    // 注册按钮的事件
    res_btn() {
      console.log('111')
      if (!this.isLock) {
        Toast("请先滑动解锁");
        return;
      }

      console.log("check_yzm");
      var isPhoneNumber = /^(1[3-8][0-9])\d{8}$/.test(
        parseInt(this.phoneNumber)
      );
      console.log(this.phoneNumber);
      if (this.phoneNumber == "") {
        Toast("手机号码不能为空");
        $("#yzmStr").blur();
        $("#phoneNumber").focus();
        return;
      }
      //  else if (!isPhoneNumber) {
      //   Toast("手机号码有误，请重填");
      //   return;
      // } 
      else if (this.yzmStr == "") {
        Toast("验证码不能为空");
        return;
      }

      var _this = this;
      var json = {
        params: {
          username: _this.phoneNumber,
          verifyCode: _this.yzmStr,
          app_name: "hxs_h5",
          pwd: _this.password,
          invited_code: _this.$parent.invitationCodeText
        }
      };

      _this.isDisabled = true;

      axios
        .get("https://api.hxsapp.com/account/userAccount/register", json)
        .then(res => {
          if (res.data.code == 200) {
            Toast(res.data.msg);
            setTimeout(function () {
              window.location.replace(
                commonJs.config.prefixUrl + "outSignResult/" + _this.yqmStr
              );
            }, 400);
          } else if (res.data.code == 602) {
            Toast(res.data.msg);
            setTimeout(function () {
              window.location.replace(
                "http://app.hxsapp.com/html/channel_statistics.html?channel_id=510"
              );
            }, 500);
          } else {
            Toast(res.data.msg);
            _this.isDisabled = false;
          }
        })
        .catch(function (error) {
          _this.isDisabled = false;
          Toast("验证码接口繁忙，请稍后再试");
        });
    }
  },

  beforeDestroy() {
    delete window.nc_appkey;
    delete window.nc_scene;
    delete window.nc_token;

    document.title = commonJs.config.webTitle;
  }
};
</script>
<style lang="less" >
#signUpPageAct {
  width: 100%;
  box-sizing: border-box;
  margin-top: unit(80/30, rem);
  padding: 0;
  .sign-auto {
    margin: 0 auto;
    width: 65.33%;
  }
  // 阿里滑动sdk-重置样式－开始
  ._nc {
    width: 100%;
    margin: 0 auto;
    .icon-slide-arrow {
      font-size: 26px;
      color: #808080;
    }
    .stage1 {
      height: unit(56/30, rem);
      .label {
        line-height: unit(56/30, rem);
        height: unit(56/30, rem);
        font-size: 14px;
      }
      .slider {
        height: unit(56/30, rem);
        background-color: #ffffff;
        width: 100%;
        left: 0;
        right: 0;
      }
      .button {
        width: 13.66%;
        height: unit(56/30, rem);
        background-color: #ebebeb;
      }
      .track {
        div {
          line-height: unit(56/30, rem);
        }
      }
      .icon {
        bottom: 0;
        left: 10%;
        width: auto;
        height: auto;
      }
    }
  }
  #nc_1-stage-1 {
    padding: 0;
    .slider {
      left: 0;
      right: 0;
      .bg-green {
        background: linear-gradient(-270deg, #ff6e8d 0%, #ff68b0 97%);
      }
      .icon-ok {
        color: #ff68b0;
      }
    }
  }
  // 阿里滑动sdk-重置样式－结束
  .input_box {
    width: 100%;
    position: relative !important;
    height: unit(56/30, rem);
    line-height: unit(56/30, rem);
    box-sizing: border-box;
    margin-bottom: 10px;
    padding: 0;
    input {
      width: 100%;
      padding-right: 25px;
      padding-left: 10px;
      box-sizing: border-box;
      height: unit(56/30, rem);
      font-size: 14px;
      float: left;
      background-color: #ffffff;
      &::-webkit-input-placeholder {
        color: #818dcf;
        opacity: 0.7;
      }
    }
    .send_yzm {
      position: absolute;
      right: 0;
      top: 0;
      bottom: 0;
      width: 31%;
      height: unit(56/30, rem);
      display: block;
      line-height: unit(56/30, rem);
      background-color: #ebebeb;
      color: #666666;
      text-align: center;
      box-sizing: border-box;
      font-size: 13px;
      border: none;
      border-radius: 0;
    }
  }
  .desc_info {
    font-size: 13px;
    color: #999;
  }

  .res_btn_box {
    margin: 14px auto 0;
    width: 100%;
    text-align: center;
    .submit_button {
      border: none;
      display: inline-block;
      width: 42%;
      height: unit(56 /30, rem);
      line-height: unit(56 /30, rem);
      text-align: center;
      background: #f4d808;
      font-size: 14px;
      color: #398d60;
      border-radius: 0;
      font-weight: bold;
    }
    p:nth-child(2) {
      font-size: 15px;
    }
    .protocol {
      margin: 5px 0;
      font-size: 12px;
      color: #fff;
      span {
        display: inline-block;
        color: #fff200;
      }
    }
  }

  // 弹出关闭的按钮
  .signUpProtocolFix {
    position: fixed;
    width: 30px;
    height: 30px;
    text-align: center;
    line-height: 30px;
    top: 0;
    right: 0;
    font-size: 12px;
    background: linear-gradient(-270deg, #ff6e8d 0%, #ff68b0 97%);
    color: #fff;
    z-index: 2;
  }
}
@media screen and (max-width: 320px) {
  .send_yzm {
    font-size: 12px !important;
  }
}
</style>
