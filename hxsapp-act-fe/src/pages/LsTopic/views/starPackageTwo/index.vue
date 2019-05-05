<template>
  <div class="starPackageTwo poster_absolute">
    <ls-pv></ls-pv>
    <ls-loading></ls-loading>
    <div style="position: relative;" class="starPackageTwoVideo">
      <ls-image :src="video.bg" :imgSty="video.imgSty"></ls-image>
      <div class="video">
        <!--<ls-x5-video :poster="video.poster" :sourceSrc="video.sourceSrc" vid="vedio_01"></ls-x5-video>-->
        <ls-x5-image-video :poster="video.poster" :sourceSrc="video.sourceSrc" vid="starPackageTwo"></ls-x5-image-video>
      </div>
    </div>
    <ls-image v-for="(item, key) in imgLists" :key="key" :src="item.src" :click="item.click" :imgSty="item.imgSty"></ls-image>
    <div class="onebtn">
      <div class="btn consultant" @click="consultant">咨询顾问</div>
      <div class="btn buy_direct" @click="buy_direct">直接购买</div>
    </div>
  </div>
</template>
<script>
import axios from 'axios';
import { urlGet, isApp, getHxsAppVersion, compareAppVersion, LsShare, splicingUrl } from 'Utils/common'
import LvshouFetch from 'Api/common';
import { mintToast, downloadApp } from 'Utils/method'
import { openWebview } from 'Utils/protocol'
// import VConsole from 'vconsole/dist/vconsole.min.js'
// var vc = new VConsole();
// console.log(vc)

export default {
  data() {
    const imgSty = 'width:100%;vertical-align:top;';
    return {
      newshopDetail: '',
      service_openim_account: null,
      actInfo: {},
      nickname: '', //
      baseInformation: {
        act_id: urlGet('id'),
        sess_token: urlGet('sess_token'),
        utime: urlGet('utime'),
        sign: urlGet('sign')
      },
      is_share: urlGet('is_share'),
      video: {
        poster: require('../../assets/images/starPackageTwo/poster.jpg'),
        sourceSrc: 'https://hxsapp-media-out-oss.hxsapp.com/hxs-ss-m3u8-hd/video_1545711475.m3u8',
        bg: require('../../assets/images/starPackageTwo/img_01.jpg'),
        imgSty
      },
      imgLists: [
        { src: require('../../assets/images/starPackageTwo/img_02.jpg'), imgSty },
        { src: require('../../assets/images/starPackageTwo/img_03.jpg'), imgSty },
        { src: require('../../assets/images/starPackageTwo/img_04.jpg'), imgSty },
        { src: require('../../assets/images/starPackageTwo/img_05.jpg'), imgSty },
        { src: require('../../assets/images/starPackageTwo/img_06.jpg'), imgSty },
        { src: require('../../assets/images/starPackageTwo/img_07.jpg'), imgSty },
        { src: require('../../assets/images/starPackageTwo/img_08.jpg'), imgSty },
        { src: require('../../assets/images/starPackageTwo/img_09.jpg'), imgSty },
        { src: require('../../assets/images/starPackageTwo/img_10.jpg'), imgSty },
        { src: require('../../assets/images/starPackageTwo/img_11.jpg'), imgSty },
        { src: require('../../assets/images/starPackageTwo/img_12.jpg'), imgSty }
      ]
    }
  },
  created() {
    this.getData();
    this.getBaseInfo();
    this.newshopDetail = this.$route.params.newshopDetail;
    console.log('_hmt', _hmt);
    _hmt.push(['_trackEvent', '事件', '明星套餐一', '页面初始化'])
    this.$on('videojs-play', function () {
      _hmt.push(['_trackEvent', '事件', '明星套餐二', '视频播放'])
    })
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
      // 本地跑代码
      // if ( window.webpackHotUpdate ) {
      //   return false;
      // }

      let link = splicingUrl(Object.assign({}, this.baseInformation, {is_share: true}), apiData.link);
      console.log(link);
      LsShare({
        shareLink: link,
        shareTitle: apiData.title,
        shareImages: apiData.share_pic,
        shareDescr: apiData.descr,
        shareType: apiData.share_type
      })
      console.log(apiData)
    },
    getData() {
      var _this = this;
      let IMjson = {
        sess_token: urlGet('sess_token')
      };
      axios
        .get('https://api.hxsapp.com/account/userAccount/getOpenIMAccount', {
          params: IMjson
        })
        .then(res => {
          console.log('------res.data--------')
          console.log(res.data)
          if (parseInt(res.data.code) === 200 && res.data.data.service_openim_account) {
            _this.service_openim_account = res.data.data.service_openim_account;
            let json = {
              chat_account: _this.service_openim_account
            };
            axios
              .get(
                'https://api.hxsapp.com/account/UserInfo/getChatInfoByChatAccount',
                {
                  params: json
                }
              )
              .then(resp => {
                console.log('------resp.data--------')
                console.log(resp.data)
                if (resp.data.data) {
                  _this.nickname = resp.data.data[_this.service_openim_account].nickname;
                }
              });
          }
        });
    },
    verification() {
      console.log('---------this.baseInformation.is_web--------');
      console.log(this.is_share);
      if (!isApp() || this.is_share) {
        /* 下载APP */
        // window.location.href = 'http://app.hxsapp.com/html/channel_statistics.html?channel_id=561'
        downloadApp(563)
        return false;
      }
      if (!urlGet('sess_token')) {
        window.location.href = 'https://hxsapp_showloginpage';
        return false
      }
      // 1=进行中；-1=已结束；-2=未开始
      if (this.actInfo.state === -1) {
        mintToast('活动已结束');
        return false;
      }
      if (this.actInfo.state === -2) {
        mintToast('活动未开始');
        return false;
      }
      return true;
    },
    // 咨询顾问
    consultant() {
      _hmt.push(['_trackEvent', '事件', '明星套餐二', '咨询顾问'])
      var _this = this;
      /* 判断是否APP操作 */
      if (!this.verification()) {
        return false;
      }
      let appVersion = getHxsAppVersion();
      let isTrue = compareAppVersion(appVersion, '3.1.1');
      var serviceOpenimAccount;
      if (!_this.service_openim_account) {
        Toast('接口异常，稍后再试');
        return;
      }
      if (isTrue || appVersion === '3.1.1') {
        serviceOpenimAccount =
          'https://hxsapp_openim_page?service_id=' + _this.service_openim_account + '&title=' + _this.nickname;
      } else {
        serviceOpenimAccount =
          'https://hxsapp_openim#' + _this.service_openim_account;
      }

      window.location.href = serviceOpenimAccount;
    },
    // 直接购买
    buy_direct() {
      _hmt.push(['_trackEvent', '事件', '明星套餐二', '直接购买'])
      /* 判断是否APP操作 || 没有话题ID */
      if (!this.verification()) {
        return false;
      }
      // window.location.href = 'https://hxsapp_buy_article_detail?id=1'
      let params = window.location.href.indexOf('?') > -1 ? '?' + window.location.href.split('?')[1] : '';

      // h5 商品详情
      let _href = 'https://app.hxsapp.com/hxsweb/newshopDetail/' + this.newshopDetail;
      let rui = _href + params;
      openWebview(rui)
    }
  }
}
</script>

<style lang="less" scoped>
  .starPackageTwo{
    position: relative;
  }
  .starPackageTwoVideo .video{
    background: #5fb9a9;
    border:10px solid #52af9a;
    overflow: hidden;
    position: absolute;
    top: 1.1rem;
    left:0.5rem;
    width: calc( 9rem - 20px );
    height: 5rem;
    -webkit-border-radius: 10px;
    -moz-border-radius: 10px;
    border-radius: 10px;
  }
  .starPackageTwo .onebtn{
    position: fixed;
    left: 0;
    bottom: 80px;
    width: 100%;
    display: -webkit-box;
    display: -ms-inline-flexbox;
    display: inline-flex;
    display: -ms-flexbox;
    display: flex;
    justify-content: center;
    .btn{
      width: 40%;
      margin: 0 2%;
      border-radius: 30px;
      height: 76px;
      line-height: 80px;
      font-size: 39px;
      background: #fedadc;
      text-align: center;
      font-weight: 600;
      letter-spacing: 5px;
      box-shadow: 0 6px rgba(75,167,132,0.75);
    }
    .consultant{
      background: #ffeb32;
      color:#4ba784;
    }
    .buy_direct{
      background: #f8a19f;
      color:#ffffff;
    }
  }
</style>
