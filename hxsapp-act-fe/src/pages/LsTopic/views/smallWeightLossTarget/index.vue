<template>
  <div class="weightLossPartner">
    <ls-pv></ls-pv>
    <ls-loading></ls-loading>
    <ls-img v-for="(img, key) in imgLists" :key="key" :src="img.src" :img-sty="img.imgSty" :img-box="img.imgBox" @click="imagesClick(key)"></ls-img>
  </div>
</template>
<script>
import axios from 'axios';
import { urlGet, isApp, getHxsAppVersion, compareAppVersion, LsShare, splicingUrl } from 'Utils/common'
import LvshouFetch from 'Api/common';
import { mintToast, downloadApp } from 'Utils/method'
// import VConsole from 'vconsole/dist/vconsole.min.js'
// var vc = new VConsole();
// console.log(vc)

export default {
  data() {
    const imgSty = 'width:100%;vertical-align:top;';
    const imgInvolved = 'position:fixed;bottom:0;left:0;width:100%;height:12vw;';
    const imgTell = 'position:fixed;bottom:12.5vw;right:0;max-width:159px;width: 21vw;';
    return {
      service_openim_account: null,
      actInfo: {},
      nickname: '',//
      baseInformation: {
        act_id: urlGet('id'),
        sess_token: urlGet('sess_token'),
        utime: urlGet('utime'),
        sign: urlGet('sign')
      },
      is_share: urlGet('is_share'),
      topicId: null,
      imgLists: [
        { src: require('../../assets/images/smallWeightLossTarget/img_01.jpg'), imgSty },
        { src: require('../../assets/images/smallWeightLossTarget/img_02.jpg'), imgSty },
        { src: require('../../assets/images/smallWeightLossTarget/img_03.jpg'), imgSty },
        { src: require('../../assets/images/smallWeightLossTarget/img_04.jpg'), imgSty },
        { src: require('../../assets/images/smallWeightLossTarget/img_05.jpg'), imgSty },
        { src: require('../../assets/images/smallWeightLossTarget/img_06.jpg'), imgSty },
        { src: require('../../assets/images/smallWeightLossTarget/img_07.jpg'), imgSty },
        { src: require('../../assets/images/smallWeightLossTarget/img_08.jpg'), imgSty },
        { src: require('../../assets/images/smallWeightLossTarget/img_09.jpg'), imgSty },
        { src: require('../../assets/images/smallWeightLossTarget/img_10.jpg'), imgSty },
        { src: require('../../assets/images/smallWeightLossTarget/img_11.jpg'), imgSty },
        { src: require('../../assets/images/smallWeightLossTarget/img_12.jpg'), imgSty },
        { src: require('../../assets/images/smallWeightLossTarget/img_12.png'), imgSty: imgInvolved, imgBox: imgSty },
        { src: require('../../assets/images/smallWeightLossTarget/img_13.png'), imgSty: imgInvolved, imgBox: imgSty },
        { src: require('../../assets/images/smallWeightLossTarget/img_14.png'), imgSty: imgTell, imgBox: imgSty }
      ]
    }
  },
  created() {
    this.getData();
    this.getBaseInfo();
    this.topicId = this.$route.params.topicId;
    console.log('_hmt', _hmt);
    // 区分站内外
    if (this.is_share) {
      // 站外
      this.imgLists.splice(this.imgLists.length-1 ,1)
      this.imgLists.splice(this.imgLists.length-2 ,1)
      this.imgLists.splice(this.imgLists.length-3 ,1)
    } else {
      // 站内
      this.imgLists.splice(this.imgLists.length-2 ,1)
    }
    _hmt.push(['_trackEvent', '按钮', '2019减肥小目标', '页面初始化'])
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
    imagesClick(key) {
      console.log(key)
      let imgLists = this.imgLists;

      if (key === imgLists.length - 1 || (key === imgLists.length - 4 && !this.is_share)) {
        _hmt.push(['_trackEvent', '去砸蛋', '2019减肥小目标', '去砸蛋'])

        this.suspension()
      }
      if (key === imgLists.length - 2) {
        _hmt.push(['_trackEvent', '按钮', '2019减肥小目标', '马上参与'])
        this.hxsapp_jump_dynamic()
      }
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
        downloadApp(561)
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
    // 砸金蛋，迎双蛋 活动
    suspension() {
      var _this = this;
      /* 判断是否APP操作 */
      if (!this.verification()) {
        return false;
      }
      // 测试
      // let eggPair = 'https://app.hxsapp.com/actweb/eggPair/index/392?id=290';

      // 预发布
      // let eggPair = 'https://app.hxsapp.com/actweb/eggPair/index/2030?id=233';

      // 线上
      let eggPair = 'https://app.hxsapp.com/actweb/eggPair/index/2136?id=268';

      let href = splicingUrl(this.baseInformation, eggPair);
      window.location.href = href;
      // this.$router.push('/actweb/eggPair/index/392?id=290')
    },
    hxsapp_jump_dynamic() {
      /* 判断是否APP操作 || 没有话题ID */
      if (!this.verification() || !this.topicId) {
        return false;
      }
      /* https://hxsapp_jump_dynamic#话题id */
      window.location.href = 'https://hxsapp_jump_dynamic#' + this.topicId;
    }
  }
}
</script>

<style lang="less" scoped>
.weightLossPartner{
  font-size: 0;
}
</style>
