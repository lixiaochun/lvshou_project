<template>
  <div class="wrapper">
    <div class="img-box">
      <img v-for="(item, key) in imgLists" :key="key" :src="item.src">
    </div>
    <a href="#" class="tocell">
      <img src="../../asstes/images/btn.png">
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
        { src: require('../../asstes/images/top.png') },
        { src: require('../../asstes/images/bom.png') },
      ]
    }
  },
  created() {
    this.getBaseInfo();
  },
  mounted() {
    this.$nextTick(() => {
      _hmt.push(['_trackEvent', '进入', '微信公开课', '页面初始化'])
    })
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
        let link = "https://app.hxsapp.com/actweb/wechatCourse/index"
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
    margin-bottom: 1.48rem;
    font-size: 0 !important;
  }
  .tocell {
    position: fixed;
    bottom: 0;
    width: 100%;
    left: 0px;
    font-size: 0 !important;
    background-color: #10987a;
  }
}
</style>
