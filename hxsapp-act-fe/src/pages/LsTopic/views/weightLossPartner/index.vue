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
import { Toast } from 'mint-ui';
import LvshouFetch from 'Api/common';
// import VConsole from 'vconsole/dist/vconsole.min.js' //import vconsole
// let vConsole = new VConsole() // 初始化

export default {
  data() {
    const imgSty = 'width:100%;vertical-align:top;';
    const imgInvolved = 'position:fixed;bottom:0;left:0;width:100%;height:12vw;';
    const imgTell = 'position:fixed;bottom:12vw;right:0;max-width:159px;width: 21vw;';
    return {
      service_openim_account: null,
      mintToast: null,
      actInfo: {},
      nickname: '好享瘦',
      baseInformation: {
        act_id: urlGet('id'),
        sess_token: urlGet('sess_token'),
        utime: urlGet('utime'),
        sign: urlGet('sign')
      },
      is_web: urlGet('is_web'),
      topicId: null,
      imgLists: [
        { src: require('../../assets/images/weightLossPartner/img_01.jpg'), imgSty },
        { src: require('../../assets/images/weightLossPartner/img_02.jpg'), imgSty },
        { src: require('../../assets/images/weightLossPartner/img_03.jpg'), imgSty },
        { src: require('../../assets/images/weightLossPartner/img_04.jpg'), imgSty },
        { src: require('../../assets/images/weightLossPartner/img_05.jpg'), imgSty },
        { src: require('../../assets/images/weightLossPartner/img_06.jpg'), imgSty },
        { src: require('../../assets/images/weightLossPartner/img_07.jpg'), imgSty },
        { src: require('../../assets/images/weightLossPartner/img_09.jpg'), imgSty: imgInvolved, imgBox: imgSty },
        { src: require('../../assets/images/weightLossPartner/img_8.png'), imgSty: imgTell, imgBox: imgSty }
      ]
    }
  },
  created() {
    this.getData();
    this.getBaseInfo();
    this.topicId = this.$route.params.topicId;
    _hmt.push(['_trackEvent', '按钮', '月度总结', '页面初始化'])
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
      let link = splicingUrl(Object.assign({}, this.baseInformation, {is_web: true}), apiData.link);
      // console.log(link);
      LsShare({
        shareLink: link,
        shareTitle: apiData.title,
        shareImages: apiData.share_pic,
        shareDescr: apiData.descr,
        shareType: apiData.share_type
      })

      console.log(apiData)
    },
    Toast(params) {
      if (this.mintToast) {
        this.mintToast.close()
      }
      this.mintToast = Toast(params);
    },
    imagesClick(key) {
      console.log(key)
      if (key === 8) {
        _hmt.push(['_trackEvent', '按钮', '月度总结', '减肥咨询'])
        this.suspension()
      }
      if (key === 7) {
        _hmt.push(['_trackEvent', '按钮', '月度总结', '马上参与'])
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
      console.log(this.is_web);
      if (!isApp() || this.is_web) {
        /* 下载APP */
        window.location.href = 'http://app.hxsapp.com/html/channel_statistics.html?channel_id=549'
        return false;
      }
      if (!urlGet('sess_token')) {
        window.location.href = 'https://hxsapp_showloginpage';
        return false
      }
      // 1=进行中；-1=已结束；-2=未开始
      if (this.actInfo.state === -1) {
        this.Toast('活动已结束');
        return false;
      }
      if (this.actInfo.state === -2) {
        this.Toast('活动未开始');
        return false;
      }
      return true;
    },
    suspension() {
      var _this = this;
      /* 判断是否APP操作 */
      if (!this.verification()) {
        return false;
      }
      let appVersion = getHxsAppVersion();
      let isTrue = compareAppVersion(appVersion, '3.1.1');
      var serviceOpenimAccount;
      if (!_this.service_openim_account) {
        this.Toast('接口异常，稍后再试');
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
