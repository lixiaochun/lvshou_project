<template>
  <div class="wrapper">
    <ls-pv></ls-pv>
    <ls-loading></ls-loading>
    <ls-img v-for="(img, key) in imgLists" :key="key" :src="img.src" :img-sty="img.imgSty" :img-box="img.imgBox" @click="buyClick(key)"></ls-img>
  </div>
</template>

<script>
import LvshouFetch from 'Api/common'
import { urlGet, LsShare, userAgent, splicingUrl } from 'Utils/common'

export default {
  data() {
    const imgSty = 'width: 100%; height: auto; font-size: 0;'
    return {
      baseInformation: {
        act_id: urlGet('id'),
        sess_token: urlGet('sess_token'),
        utime: urlGet('utime'),
        sign: urlGet('sign')
      },
      imgLists: [
        { src: require('../../assets/images/bg_01.jpg'), imgSty },
        { src: require('../../assets/images/bg_02.jpg'), imgSty },
        { src: require('../../assets/images/bg_03.jpg'), imgSty },
        { src: require('../../assets/images/bg_04.jpg'), imgSty },
        { src: require('../../assets/images/bg_05.jpg'), imgSty },
        { src: require('../../assets/images/bg_06.jpg'), imgSty },
        { src: require('../../assets/images/bg_07.jpg'), imgSty },
        { src: require('../../assets/images/bg_08.jpg'), imgSty },
        { src: require('../../assets/images/bg_09.jpg'), imgSty },
        { src: require('../../assets/images/bg_10.jpg'), imgSty, imgBox: 'margin-bottom: 50px;' },
        { src: require('../../assets/images/bg_11.jpg'), imgSty, imgBox: 'position: fixed; bottom: 0; left: 0;' }
      ]
    }
  },
  created() {
  },
  mounted() {
    this.$nextTick(() => {
      _hmt.push(['_trackEvent', '按钮', '赢绿豆享大牌', '页面初始化'])
    })
    this.baseInfo()
  },
  methods: {
    // 图片点击
    buyClick(key) {
      if (!urlGet('sess_token')) {
        window.location.href = 'http://app.hxsapp.com/html/channel_statistics.html?channel_id=531'
      } else {
        if (key === 4) {
          _hmt.push(['_trackEvent', '按钮', '赢绿豆享大牌', '更多网红单品点击兑换'])
          if (userAgent() === 'ios') {
            window.location.href = 'hxsapp://goPage?pageName=MallHomeController'
          } else if (userAgent() === 'and') {
            window.location.href = 'hxsapp://goPage?pageName=com.lvshou.hxs.activity.shop.ShopActivity'
          }
        } else if (key === 5) {
          _hmt.push(['_trackEvent', '按钮', '赢绿豆享大牌', ' 20元话费'])
          this.buyUrl('https://app.hxsapp.com/hxsweb/newShopDetail/2yuanhuafei')
        } else if (key === 6) {
          _hmt.push(['_trackEvent', '按钮', '赢绿豆享大牌', '香奈儿断货魅力唇膏43'])
          this.buyUrl('https://app.hxsapp.com/hxsweb/newShopDetail/xiangnaier')
        } else if (key === 7) {
          _hmt.push(['_trackEvent', '按钮', '赢绿豆享大牌', '迪卡侬运动腰包'])
          this.buyUrl('https://app.hxsapp.com/hxsweb/newShopDetail/dikanongyaobao')
        } else if (key === 10) {
          _hmt.push(['_trackEvent', '按钮', '赢绿豆享大牌', '点击赚绿豆'])
          if (userAgent() === 'ios') {
            window.location.href = 'hxsapp://goPage?pageName=TaskBenefitController'
          } else if (userAgent() === 'and') {
            window.location.href = 'hxsapp://goPage?pageName=com.lvshou.hxs.activity.WelfareActivity'
          }
        }
      }
    },

    // 购买路径的拼接
    buyUrl(url) {
      const buyUrl = splicingUrl(this.baseInformation, url)
      window.location.href = buyUrl
    },

    // 通过接口获取基础信息
    async baseInfo() {
      const data = this.baseInformation

      const apiData = await LvshouFetch({
        url: 'https://act.hxsapp.com/base/Api/actInfo',
        data
      })

      // 通过api 接口 动态改变title
      document.title = apiData.title

      // 调起app 的分享协议
      LsShare({
        shareLink: apiData.link,
        shareTitle: apiData.title,
        shareImages: apiData.share_pic,
        shareDescr: apiData.descr,
        shareType: apiData.share_type
      })

      console.log(apiData)
    }
  }
}
</script>

<style lang="less" scoped>
.wrapper {
}
</style>
