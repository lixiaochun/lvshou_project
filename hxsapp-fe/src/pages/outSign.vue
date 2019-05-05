<template>
  <div class="home">
    <preloading v-if="!(outSignCodeStatus && userInfo)"></preloading>
    <div class="title">
      <div class="u-spans">
        <img class="headImg" v-if="userInfo" :src="userInfo.headImg" alt>
        <span class="u-name" v-if="userInfo">#{{userInfo.name}}#</span>
        <span>邀请您注册好享瘦，领取福利</span>
      </div>
    </div>
    <div>
      <img class="home-img1" :src="bg1">
    </div>
    <div class="from">
      <div>
        <img class="home-img1 from-img1" :src="bg2">
      </div>
      <sign-up-page-act class="signUp"></sign-up-page-act>
      <div class="Protocol">
        注册即为同意
        <span @click="showSignUpProtocol">《用户协议》</span>
      </div>
    </div>
    <div>
      <img class="home-img1" v-lazy="bg7">
    </div>
    <div>
      <img class="home-img1" v-lazy="bg8">
    </div>
    <!-- 协议 -->
    <div class="signUpProtocolFix" v-show="signUpProtocolShow" @click="hideSignUpProtocol">关闭</div>
    <signUpProtocol class="signUpProtocol" v-show="signUpProtocolShow"></signUpProtocol>
  </div>
</template>

<script>
import preloading from "@/components/preLoading";

import signUpPageAct from "@/components/signUpPageAct";

import signUpProtocol from "@/pages/signUpProtocol";

import axios from "axios";

import commonJs from "@/util/common.js";

import { Toast } from "mint-ui";

export default {
  data() {
    return {
      testData: null,
      // 用户id
      userId: null,

      // 用户信息
      userInfo: null,

      bg1: require("../assets/img/outSign/outSign_02.jpg"),
      bg2: require("../assets/img/outSign/outSign_03.jpg"),
      bg7: require("../assets/img/outSign/outSig_04.jpg"),
      bg8: require("../assets/img/outSign/outSig_05.jpg"),
      // 服务协议
      signUpProtocolShow: false,

      // 是否获得邀请码
      outSignCodeStatus: false,

      // 邀请码
      invitationCodeText: ""
    };
  },
  components: {
    preloading,
    signUpPageAct,
    signUpProtocol
  },
  mounted() {
    this.$nextTick(() => {
      this.userId = this.$route.params.userId;
      this.getUserInfo();
      this.getInvitationCodeText();
      document.title = "输口令领礼品活动";
    });
  },
  methods: {
    getUserInfo() {
      //获取用户信息
      var _this = this;
      axios
        .get("https://api.hxsapp.com/account/userInfo/getUserInfo", {
          params: {
            user_id: this.userId
          }
        })
        .then(res => {
          if (res.data.code == 200) {
            let data = res.data.data[this.userId];

            //组合用户信息
            _this.userInfo = {
              name: commonJs.subStlength(data.nickname),
              headImg: data.head_img
            };

            //页面设置标题
            commonJs.setTitle(_this.userInfo.name + "邀请你注册好享瘦");

            //微信分享
            commonJs.outSideShare({
              title: _this.userInfo.name + "邀你一起来变瘦！",
              desc: "多重豪礼送不停，赶快来体验吧！",
              link: "https://app.hxsapp.com/hxsweb/invitation/" + _this.userId,
              img: "https://app.hxsapp.com/static/wechat_invite.png"
            });
          }
        })
        .catch(function (error) {
          Toast("接口繁忙，请稍后再试");
        });
    },
    getInvitationCodeText() {
      //获取邀请码
      axios
        .get("https://api.hxsapp.com/account/userInfo/getInviteCode", {
          params: {
            user_id: this.userId
          }
        })
        .then(res => {
          if (res.data.code == 200) {
            //组合邀请码
            if (res.data.data.invite_code) {
              this.invitationCodeText = res.data.data.invite_code;
            }
          }

          this.outSignCodeStatus = true;
        });
    },
    // 查看用户协议页面
    showSignUpProtocol() {
      var __url = commonJs.config.prefixUrl + "signUpProtocol";
      if (this.isApp) {
        commonJs.h5CallAppAction.hxsapp_new_webview(encodeURIComponent(__url));
      } else {
        this.signUpProtocolShow = true;
      }
    },
    // 关闭协议
    hideSignUpProtocol() {
      this.signUpProtocolShow = false;
    }
  },
  computed: {
    isLogin: function () {
      return commonJs.isLogin();
    },
    isApp: function () {
      return commonJs.isApp();
    }
  }
};
</script>

<style lang="less" scoped>
.home {
  position: relative;
  .title {
    width: 100%;
    position: absolute;
    top: unit(38/30, rem);
    color: #fff;
    text-align: center;
    font-size: 14px;
    display: flex;
    justify-content: center;
    align-items: center;
    .u-spans {
      background: #fff;
      color: #000;
      border-radius: unit(40/30, rem);
      padding: 0 unit(25/30, rem);
      font-size: unit(24/30, rem);
      position: relative;
      padding: unit(5/30, rem) 0 unit(5/30, rem) unit(70/30, rem);
      height: unit(70/30, rem);
      width: 74%;
      span {
        display: block;
        text-align: left;
        padding: 0 16px;
        height: unit(35/30, rem);
        line-height: unit(35/30, rem);
      }
    }
    .u-name {
      color: #000;
      font-weight: bold;
    }
    .headImg {
      width: unit(100/30, rem);
      height: unit(100/30, rem);
      border-radius: 50%;
      pointer-events: none;
      position: absolute;
      left: -8px;
      top: 50%;
      margin-top: unit(-50/30, rem);
    }
  }

  .signUp {
    width: 100%;
    margin: 0 auto;
  }
  &-img1 {
    width: 100%;
    display: block;
    pointer-events: none;
  }
  &-img2,
  &-img3,
  &-img4 {
    float: left;
    height: unit(28/30, rem);
  }
  &-img2 {
    width: 51.6%;
    pointer-events: none;
  }
  &-img3 {
    width: 12.67%;
  }
  &-img4 {
    width: 35.73%;
    pointer-events: none;
  }
  .from {
    position: relative;
    &-img1 {
      height: unit(478/30, rem);
      pointer-events: none;
    }
    .Protocol {
      bottom: unit(60/30, rem);
      position: absolute;
      text-align: center;
      font-size: unit(21/30, rem);
      width: 100%;
      color: #fff;
      span {
        color: #fff200;
      }
    }
  }
  .signUp {
    position: absolute;
    top: 0;
  }
  .signUpProtocol {
    z-index: 1;
    position: fixed;
    top: 0;
    background: #ffffff;
    padding-top: 20px;
    height: 100%;
    overflow-y: scroll;
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
</style>
