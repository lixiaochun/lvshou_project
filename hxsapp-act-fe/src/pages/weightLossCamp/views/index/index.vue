<template>
  <div class="wrapper">
    <div class="img-box">
      <img v-for="(item, key) in imgLists" :key="key" :src="item.src">
    </div>
    <a href="tel://4006036337" class="tocell">
      <img src="../../asstes/images/img20.png">
    </a>
  </div>
</template>

<script>
import {urlGet, LsShare } from 'Utils/common'
import LvshouFetch from 'Api/common';
export default {
  name: 'index',
  data() {
    return {
      baseInformation: {
          act_id: urlGet('id'),
          sess_token: urlGet('sess_token'),
          utime: urlGet('utime'),
          sign: urlGet('sign')
        },
      imgLists: [
        { src: require('../../asstes/images/img1.png') },
        { src: require('../../asstes/images/img2.png') },
        { src: require('../../asstes/images/img3.png') },
        { src: require('../../asstes/images/img4.png') },
        { src: require('../../asstes/images/img5.png') },
        { src: require('../../asstes/images/img6.png') },
        { src: require('../../asstes/images/img7.png') },
        { src: require('../../asstes/images/img8.png') },
        { src: require('../../asstes/images/img9.png') },
        { src: require('../../asstes/images/img10.png') },
        { src: require('../../asstes/images/img11.png') },
        { src: require('../../asstes/images/img12.png') },
        { src: require('../../asstes/images/img13.png') },
        { src: require('../../asstes/images/img14.png') },
        { src: require('../../asstes/images/img15.png') },
        { src: require('../../asstes/images/img16.png') },
        { src: require('../../asstes/images/img17.png') },
        { src: require('../../asstes/images/img18.png') },
        { src: require('../../asstes/images/img19.png') },
      ]
    }
  },
  created() {
    this.getBaseInfo();
  },
  methods: {
    async getBaseInfo() {
        // 通过接口获取基础信息
        const data = this.baseInformation
        //  url=http://act.hxsapp.com/base/Api/actInfo?act_id=276
        const apiData = await LvshouFetch({
          url: 'https://act.hxsapp.com/base/Api/actInfo',
          data
        })
        // 通过api 接口 动态改变title
        document.title = apiData.title
        let link = "https://app.hxsapp.com/actweb/weightLossCamp/share"
        // 调起app 的分享协议
        LsShare({
          shareLink: link,
          shareTitle: apiData.title,
          shareImages: apiData.share_pic,
          shareDescr: apiData.descr,
          shareType: apiData.share_type
        })

        console.log(apiData)
      },
  }
}
</script>

<style lang="less" scoped>
body {
  background-clip: white;
}
.wrapper {
  img {
    font-size: 0px;
    width: 100%;
    height: auto;
    font-size: 0 !important;
  }
  .img-box {
    margin-bottom: 40px;
    font-size: 0 !important;
  }
  .tocell {
    position: fixed;
    bottom: 0;
    width: 100%;
    left: 0px;
    font-size: 0 !important;
    bottom: -7px;
    background-color: #10987a;
  }
}
</style>
