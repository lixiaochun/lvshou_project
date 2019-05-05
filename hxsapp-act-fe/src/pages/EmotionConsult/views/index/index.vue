<template>
  <div class="wrapper">
    <div class="img-box">
        <router-link  v-for="(item, key) in imgLists"  :to="{path:item.path,query:{name_id:item.id} }" >
            <img :key="key" :src="item.src">
        </router-link>
    </div>
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
        { src: require('../../asstes/image/m_1.png') ,path:'#'},
        { src: require('../../asstes/image/m_2.png') ,path:'#'},
        { src: require('../../asstes/image/m_3.png') ,path:'share'},
        { src: require('../../asstes/image/m_4.png') ,path:'#'},
        { src: require('../../asstes/image/m_5.png') ,path:'item',id:1},
        { src: require('../../asstes/image/m_6.png') ,path:'item',id:2},
        { src: require('../../asstes/image/m_7.png') ,path:'item',id:3},
      ]
    }
  },
  created() {
   // this.getBaseInfo();
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

      },
  }
}
</script>

<style lang="less" scoped>
body {
  background-clip: white;
}
.wrapper {
  background-color: #ff5ba0;
  height: 100vh;
  img {
    font-size: 0px;
    width: 100%;
    height: auto;
    font-size: 0 !important;
  }
  a{
    font-size: 0 !important;
    height: initial;
    line-height: inherit;

  }
  .img-box {
    margin-bottom: 40px;
    font-size: 0 !important;
    height: 100vh;
    background-color: #ff5ba0;
    overflow: hidden;
    margin: 0px;
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
