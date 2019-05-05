<template>
  <div class="wrapper">
    <div class="img-box">
      <img v-for="(item, key) in imgLists" :key="key" :src="item.src">
    </div>
 
    <div class="img-box  flex-c">
        <div class="flex-c" style="position: absolute;    width: 88.5vw;
        top: 0.1rem;
        margin-top: -2px; font-weight: 600;  font-size: 0.58rem !important;">
            <div  class="flex-item flex-c" style="flex-wrap:wrap;" >
              <img src="../../asstes/images/img1.png" style="width: 90%;margin: 0 auto;height: auto;">
              <span class="flex-c"  style="color: #fa7321;width: 100%;    margin-left: -0.35rem;
              line-height: initial;
              margin-top: 0.2rem;    position: relative;
    z-index: 1;
">
                <p style="margin:0px;color: #ffba14;    margin-top: -4px;font-size: 0.35rem !important;font-weight: 600;">￥</p>98.9
               </span>
               <span class=" flex-c" style="color: #fe747c;width: 100%;font-size: 0.398rem !important;
               font-weight: 600;
               letter-spacing: 0.02rem;
    margin-bottom: 0.15rem;">
                瘦身搭档<p style="margin:0px;color: #b2a3ff;padding: 0px;    position: relative;
                margin-left: 0.04rem;">A</p> 
              </span>
               <a :href="'https://app.hxsapp.com/hxsweb/newShopDetail/ssa'+urlData" >
                <img src="../../asstes/images/btn.png" style="width:80%">
              </a>
            </div>
           
            <div  class="flex-item flex-c" style="flex-wrap:wrap;" >
              <img src="../../asstes/images/img2.png" style="width: 90%;margin: 0 auto;height: auto;">
              <span class="flex-c" style="color: #fa7321;   margin-left: -0.35rem;
              line-height: initial;
              margin-top: 0.2rem;    position: relative;
    z-index: 1;
">
                <p style="margin:0px;color: #ffba14;    margin-top: -4px;font-size: 0.35rem !important;font-weight: 600;">￥</p>268
               </span>
               <span class=" flex-c" style="color: #fe747c;width: 100%;font-size: 0.398rem !important;
               font-weight: 600;
               letter-spacing: 0.02rem;
    margin-bottom: 0.15rem;">
                瘦身搭档<p style="margin:0px;color: #b2a3ff;padding: 0px;    position: relative;
                margin-left: 0.04rem; ">B</p>
              </span>
               <a :href="'https://app.hxsapp.com/hxsweb/newShopDetail/ssb'+urlData"   >
                <img src="../../asstes/images/btn.png" style="width:80%">
              </a>
            </div>

            <div  class="flex-item flex-c" style="flex-wrap:wrap;" >
              <img src="../../asstes/images/img3.png" style="width: 90%;margin: 0 auto;height: auto;">
              <span class=" flex-c" style="color: #fa7321;   margin-left: -0.35rem;
              line-height:initial;
              margin-top: 0.2rem;    position: relative;
    z-index: 1;
">
               <p style="margin:0px;color: #ffba14;  margin-top: -4px;font-size: 0.35rem !important;font-weight: 600;  ">￥</p>  267 
              </span>
              <span class=" flex-c" style="color: #fe747c;width: 100%;font-size: 0.398rem !important;
              font-weight: 600;
              letter-spacing: 0.02rem;
    margin-bottom: 0.15rem;">
                瘦身搭档   <p style="margin:0px;color: #b2a3ff;  padding: 0px;    position: relative;
                margin-left: 0.04rem; ">C</p>
              </span>
              <a :href="'https://app.hxsapp.com/hxsweb/newShopDetail/ssc'+urlData" style="">
                <img src="../../asstes/images/btn.png" style="width:80%">
              </a>
            </div>
     
        </div>
        <img src="../../asstes/images/top.jpg">
    </div>
    
    <div class="img-box">
      <img src="../../asstes/images/7.jpg">
    </div>
 
   
    <div class="img-box  flex-c">
      <div class="flex-c" style="position: absolute;    width: 88.5vw;
      top: 0.1rem;
      margin-top: -2px; font-weight: 600;  font-size: 0.58rem !important;">
          <div  class="flex-item flex-c" style="flex-wrap:wrap;" >
            <img src="../../asstes/images/img4.png" style="width: 90%;margin: 0 auto;height: auto;">
            <span class="flex-c"  style="color: #fa7321;width: 100%;    margin-left: -0.35rem;
            line-height:initial;
            margin-top: 0.2rem;    position: relative;
    z-index: 1;
">
              <p style="margin:0px;color: #ffba14;    margin-top: -4px;font-size: 0.35rem !important;font-weight: 600;">￥</p>227
             </span>
             <span class=" flex-c" style="color: #fe747c;width: 100%;font-size: 0.398rem !important;
             font-weight: 600;
             letter-spacing: 0.02rem;
    margin-bottom: 0.15rem;">
              纤体搭档<p style="margin:0px;color: #b2a3ff;padding: 0px;    position: relative;
              margin-left: 0.04rem;">A</p> 
            </span>
             <a :href="'https://app.hxsapp.com/hxsweb/newShopDetail/xta'+urlData" >
              <img src="../../asstes/images/btn.png" style="width:80%">
            </a>
          </div>
         
          <div  class="flex-item flex-c" style="flex-wrap:wrap;" >
            <img src="../../asstes/images/img5.png" style="width: 90%;margin: 0 auto;height: auto;">
            <span class="flex-c" style="color: #fa7321;   margin-left: -0.35rem;
            line-height: initial;
            margin-top: 0.2rem;    position: relative;
    z-index: 1;
">
              <p style="margin:0px;color: #ffba14;    margin-top: -4px;font-size: 0.35rem !important;font-weight: 600;">￥</p>297
             </span>
             <span class=" flex-c" style="color: #fe747c;width: 100%;font-size: 0.398rem !important;
             font-weight: 600n;
             letter-spacing: 0.02rem;
    margin-bottom: 0.15rem;">
              纤体搭档<p style="margin:0px;color: #b2a3ff;padding: 0px;    position: relative;
              margin-left: 0.04rem; ">B</p>
            </span>
             <a :href="'https://app.hxsapp.com/hxsweb/newShopDetail/xtb'+urlData"   >
              <img src="../../asstes/images/btn.png" style="width:80%">
            </a>
          </div>

          <div  class="flex-item flex-c" style="flex-wrap:wrap;" >
            <img src="../../asstes/images/img6.png" style="width: 90%;margin: 0 auto;height: auto;">
            <span class=" flex-c" style="color: #fa7321;   margin-left: -0.35rem;
            line-height: initial;
            margin-top: 0.2rem;">
             <p style="margin:0px;color: #ffba14;  margin-top: -4px;font-size: 0.35rem !important;font-weight: 600;  ">￥</p> 518
            </span>
            <span class=" flex-c" style="color: #fe747c;width: 100%;font-size: 0.398rem !important;
            font-weight: 600;
            letter-spacing: 0.02rem;
    margin-bottom: 0.15rem; position: relative;
    z-index: 1;">
              纤体搭档   <p style="margin:0px;color: #b2a3ff;  padding: 0px;    position: relative;
              margin-left: 0.04rem; ">C</p>
            </span>
            <a :href="'https://app.hxsapp.com/hxsweb/newShopDetail/xtc'+urlData" style="">
              <img src="../../asstes/images/btn.png" style="width:80%">
            </a>
          </div>
   
      </div>
      <img src="../../asstes/images/bom.jpg" style="padding-bottom: 1rem;    background-color: #ffc28f;">
  </div>
  
   
    <div href="#" class="tocell" >
      <img src="../../asstes/images/13.jpg" @click="toShop()">
    </div>
  </div>
</template>

<script>
import {urlGet,userAgent, LsShare } from 'Utils/common'
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
        urlData:"?sess_token="+urlGet('sess_token')+"&utime="+ urlGet('utime')+"&sign="+urlGet('sign'),
      imgLists: [
        { src: require('../../asstes/images/1_1.jpg') },
      ]
    }
  },
  created() {
   // this.getBaseInfo();
     window.location.href ="https://hxsapp_share_btn_none";
  },
  mounted() {
    this.$nextTick(() => {
      _hmt.push(['_trackEvent', '进入', '瘦身好搭档', '页面初始化'])
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
        //跳转商城首页
      toShop() {
        _hmt.push(['_trackEvent', '按钮', '瘦身好搭档', '去商城看看']);
        if (userAgent() === 'ios') {
          window.location.href = 'https://hxsapp_gopage?page_name=MallHomeController'
        } else if (userAgent() === 'and') {
          window.location.href = 'https://hxsapp_gopage?page_name=com.lvshou.hxs.activity.shop.ShopActivity'
        }
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
  .flex-c{
    display: flex;
    justify-content:center;
    align-items: center;
    position: relative;
    overflow: hidden;
    margin: 0px;
  }
  .flex-item{
    flex: 1;
  }
  .img-box {
 
    font-size: 0 !important;
  }

  a:focus{
    outline: -webkit-focus-ring-color auto 0px;
  }
  img:focus{
    outline: -webkit-focus-ring-color auto 0px;
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
