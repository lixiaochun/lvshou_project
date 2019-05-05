<template>
  <div class="wrapper weightLossLab">
    <ls-pv></ls-pv>
    <ls-loading ref="loading"></ls-loading>
    <div class="imgBox">
      <img src="../../assets/images/img_21.jpg" class="image" alt="">
      <img src="../../assets/images/img_22.jpg" class="image" alt="">
    </div>
    <div class="autoWidth video-js-box" v-if="isQQBrowser">
      <ls-x5-image-video :poster="poster" :sourceSrc="sourceSrc" vid="topic_123456"></ls-x5-image-video>
    </div>
    <div class="autoWidth video-js-box height" v-else>
      <ls-video :poster="poster" :sourceSrc="sourceSrc" :vid="vid"></ls-video>
    </div>
    <!--<div class="autoWidth video-js-box height">-->
      <!--<ls-video :poster="poster" :sourceSrc="sourceSrc" :vid="vid"></ls-video>-->
    <!--</div>-->
    <div  class="imgBox" alt="">
      <img src="../../assets/images/img_23.jpg" class="image" alt="">
      <img src="../../assets/images/img_24.jpg" class="image" alt="">
      <img src="../../assets/images/img_25.jpg" class="image" alt="">
    </div>
    <div class="footerToH5"></div>
    <footer class="toh5 buttonBackground" @click="hxsapp_jump_dynamic">立即参与</footer>
  </div>
</template>
<script>
import { urlGet, LsShare, isApp } from 'Utils/common'
import LvshouFetch from 'Api/common';
import { Toast } from 'mint-ui'
// import VConsole from 'vconsole/dist/vconsole.min.js'
// var vc = new VConsole();
// console.log(vc)

export default {
  data() {
    return {
      poster: require('../../assets/images/topic_01.png'),
      posterQQ: require('../../assets/images/topic_001.png'),
      sourceSrc: 'https://hxsapp-media-out-oss.hxsapp.com/hxs-ss-m3u8-hd/video_1544088333.m3u8',
      vid: 'topic_01',
      topicId: null,
      isQQBrowser: true,
      baseInformation: {
        act_id: urlGet('id'),
        sess_token: urlGet('sess_token'),
        utime: urlGet('utime'),
        sign: urlGet('sign'),
        is_web: urlGet('is_web')
      },
      actInfo: {},
      videoUrl: 'https://hxsapp-media-out-oss.hxsapp.com/hxs-ss-m3u8-hd/video_1544088333.m3u8'
    }
  },
  mounted() {
    this.getBaseInfo();
    this.topicId = this.$route.params.topicId;
    if (window.$pv_) {
      setTimeout(function () {
        this.$refs.loading.isLoading = false;
      }.bind(this), 500)
    } else {
      window.$pv_ = true
    }
    // 判断是否是腾讯开发QQ浏览器内核
    let reg = /MQQBrowser/g;
    let UA = window.navigator.userAgent;
    if(reg.test(UA)){
      this.isQQBrowser = true;
      this.poster = this.posterQQ;
      // alert('这是QQ浏览器内核')
    } else {
      this.isQQBrowser = false;
    }

    // this.getBaseInfo();
  },
  methods: {
    async getBaseInfo() {
      // 通过接口获取基础信息
      const data = this.baseInformation
      const apiData = await LvshouFetch({
        url: 'https://act.hxsapp.com/base/Api/actInfo',
        data
      })
      this.actInfo = apiData;
      // 通过api 接口 动态改变title
      document.title = apiData.title
      // 调起app 的分享协议
      // console.log('------------调起app 的分享协议--------------------')
      // console.log(Object.assign({}, this.baseInformation, {is_web: true}))
      // console.log(this.baseInformation)
      // 本地跑代码
      // if ( window.webpackHotUpdate ) {
      //   return false;
      // }
      let link = window.location.origin + '/actweb/weightLossLab/web' + window.location.search + 'is_web=true';
      LsShare({
        shareLink: link,
        shareTitle: apiData.title,
        shareImages: apiData.share_pic,
        shareDescr: apiData.descr,
        shareType: apiData.share_type
      })
    },
    Toast(params) {
      if (this.mintToast) {
        this.mintToast.close()
      }
      this.mintToast = Toast(params);
    },
    verification() {
      console.log('---------this.baseInformation.is_web--------');
      console.log(this.is_web);
      if (!isApp() || this.is_web) {
        /* 下载APP */
        window.location.href = 'http://app.hxsapp.com/html/channel_statistics.html?channel_id=536'
        return false;
      }
      if (!urlGet('sess_token')) {
        window.location.href = 'https://hxsapp_showloginpage';
        return false
      }
      // 1=进行中；-1=已结束；-2=未开始
      if (parseInt(this.actInfo.state) === -1) {
        this.Toast('活动已结束');
        return false;
      }
      if (parseInt(this.actInfo.state) === -2) {
        this.Toast('活动未开始');
        return false;
      }
      return true;
    },
    hxsapp_jump_dynamic() {
      /* 判断是否APP操作 || 没有话题ID */
      if (!this.verification() || !this.topicId) {
        return false;
      }
      /* https://hxsapp_jump_dynamic#话题id */
      window.location.href = 'https://hxsapp_jump_dynamic#' + this.topicId;
    },
    player(e) {
      if (e.status !== 'init') {
        return false;
      }
      switch (e.vid) {
        case 'topic_01':
          _hmt.push(['_trackEvent', '视频', '减肥实验室', '黄思颖教程'])
          break;
        default:
      }
    }
  }
}

</script>

<style lang="less" scoped>
  .buttonBackground{
    background: -webkit-linear-gradient(left, #FF68B0 , #FF6E8D); /* Safari 5.1 - 6.0 */
    background: -o-linear-gradient(right, #FF68B0, #FF6E8D); /* Opera 11.1 - 12.0 */
    background: -moz-linear-gradient(right, #FF68B0, #FF6E8D); /* Firefox 3.6 - 15 */
    background: linear-gradient(to right, #FF68B0 , #FF6E8D); /* 标准的语法 */
  }
  .footerToH5,.toh5{
    height: 1.5rem;
    line-height: 1.5rem;
    min-height: 100px;
    text-align: center;
  }
  .toh5{
    position: fixed;
    bottom: 0;
    left: 0;
    width: 100%;
    z-index: 1009;
    color: #ffffff;
    font-size: 0.5rem;
    letter-spacing: 0.005rem;
    justify-content: space-around;
  }
  .imgBox{
    width: 100%;
    font-size: 0;
    .image{
      width: 100%;
      vertical-align:top;
    }
  }
  .autoWidth{width: 9.2rem;margin: 0 auto;}
  .video-js-box{
    background: #f7d840;
    padding: 40px;
    border-radius: 10px;
  }
</style>
