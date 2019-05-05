<template>
  <div class="punchTheClock">
    <ls-pv-uv></ls-pv-uv>
    <ls-loading></ls-loading>
    <!--<ls-img v-for="(img, key) in imgLists" :key="key" :src="img.src" :img-sty="img.imgSty" :img-box="img.imgBox" @click="imagesClick(key)"></ls-img>-->
    <div style="position: relative">
      <ls-image v-for="(item, key) in imgLists" :key="key" :src="item.src" :imgSty="item.imgSty"></ls-image>
      <div class="copyText" @click="copyText" @touchend="copyText">
        <ls-image :src="copyTextImg.src" :imgSty="copyTextImg.imgSty"></ls-image>
      </div>
    </div>
    <div class="suspension" @click="suspension">
      <ls-image :src="suspensionImg.src" :imgSty="suspensionImg.imgSty"></ls-image>
    </div>
    <div class="footerToH5">
      <div class="toh5" @click="hxsapp_jump_dynamic">马上参与</div>
    </div>
  </div>
</template>
<script>
import axios from 'axios';
import { urlGet, isApp, getHxsAppVersion, compareAppVersion, LsShare, splicingUrl } from 'Utils/common'
import { mintToast, copy } from 'Utils/method'
import LvshouFetch from 'Api/common';
//
// import VConsole from 'vconsole/dist/vconsole.min.js'
// var vc = new VConsole();
// console.log(vc)

export default {
  data() {
    const imgSty = 'width:100%;vertical-align:top;';
    return {
      service_openim_account: null,
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
      suspensionImg: {
        src: require('../../assets/images/common/suspension.png'), imgSty
      },
      copyTextImg: {
        src: require('../../assets/images/punchTheClock/img_07.jpg'), imgSty
      },
      imgLists: [
        { src: require('../../assets/images/punchTheClock/img_01.jpg'), imgSty },
        { src: require('../../assets/images/punchTheClock/img_02.jpg'), imgSty },
        { src: require('../../assets/images/punchTheClock/img_03.jpg'), imgSty },
        { src: require('../../assets/images/punchTheClock/img_04.jpg'), imgSty },
        { src: require('../../assets/images/punchTheClock/img_05.jpg'), imgSty },
        { src: require('../../assets/images/punchTheClock/img_06.jpg'), imgSty }
      ]
    }
  },
  created() {
    this.getData();
    this.getBaseInfo();
    this.topicId = this.$route.params.topicId;
    console.log('_hmt', _hmt);
    document.onselectstart = new Function('event.returnValue=false;'); // 禁止选择,也就是无法复制
    _hmt.push(['_trackEvent', '按钮', '每天吃水果打卡', '页面初始化'])
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
      console.log(this.is_web);
      if (!isApp() || this.is_web) {
        /* 下载APP */
        _hmt.push(['_trackEvent', '按钮', '每天吃水果打卡', '下载APP'])
        window.location.href = 'http://app.hxsapp.com/html/channel_statistics.html?channel_id=559'
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
    suspension() {
      _hmt.push(['_trackEvent', '按钮', '每天吃水果打卡', '减肥咨询'])
      var _this = this;
      /* 判断是否APP操作 */
      if (!this.verification()) {
        return false;
      }
      let appVersion = getHxsAppVersion();
      let isTrue = compareAppVersion(appVersion, '3.1.1');
      var serviceOpenimAccount;
      if (!_this.service_openim_account) {
        mintToast('接口异常，稍后再试');
        return;
      }
      if (isTrue || appVersion === '3.1.1') {
        serviceOpenimAccount = 'https://hxsapp_openim_page?service_id=' + _this.service_openim_account + '&title=' + _this.nickname;
      } else {
        serviceOpenimAccount = 'https://hxsapp_openim#' + _this.service_openim_account;
      }

      window.location.href = serviceOpenimAccount;
    },
    async hxsapp_jump_dynamic() {
      await _hmt.push(['_trackEvent', '按钮', '每天吃水果打卡', '马上参与'])
      /* 判断是否APP操作 || 没有话题ID */
      if (!this.verification()) {
        return false;
      }
      if (!this.topicId) {
        console.log('没有话题Id');
        return false;
      }
      /* https://hxsapp_jump_dynamic#话题id */
      window.location.href = 'https://hxsapp_jump_dynamic#' + this.topicId;
    },
    copyText() {
      mintToast('复制成功，赶紧添加好享瘦打卡小助手为微信好友^_^');
      copy('hgz-11')
    }
  }
}
</script>

<style lang="less" scoped>
.punchTheClock{
  font-size: 0;
}
.suspension{
  position:fixed;
  bottom:1.5rem;
  right:0;
  max-width:159px;
  width: 21vw;
}
.footerToH5{
  background: #e6f9ff;
}
.footerToH5,.toh5{
  height: 1.35rem;
  line-height: 1.35rem;
  text-align: center;
}
.toh5{
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  z-index: 1990;
  color:#ffffff;
  font-size: 0.7rem;
  font-weight: 600;
  letter-spacing: 0.005rem;
  background: #ff2d54;
}
.copyText{
  position: absolute;
  bottom: 15vw;
  height: 15vw;
  left: 17vw;
  width: 66vw;
  background: rgba(0,0,0,0);
}
</style>
