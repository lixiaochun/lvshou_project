<template>
    <div class="content-manage-item" >
    <div class="block" style="overflow: hidden">
        <el-carousel height="120px">
        <el-carousel-item v-for="(item, index) in bannerUrls" :key="index">
           <img :src="item" style="width:238px; height:120px">
        </el-carousel-item>
        </el-carousel>
         <p>{{name}}</p>
         <span style="color:red">{{`￥${_formatCurrency(price)}`}}</span>
         <h1 style="color:#ccc">免邮</h1>
         <div class="detail" v-html="preview" style="height:255px; width:250px;overflow-y:auto" >
         </div>
  </div>
</div>
</template>

<script type="text/ecmascript-6">
import { formatCurrency } from 'common/js/util'
import { getStandardProductById } from 'api/sample'
import { ERR_SUCCESS } from 'api/config'
import { Carousel, CarouselItem } from 'element-ui'
export default {
  props: ['list'],
  data() {
    return {
      bannerUrls: [],
      name: '',
      price: 0,
      preview: ''
    }
  },
  created() {
    this._getStandardProductById()
  },
  methods: {
    _formatCurrency(e) {
      return formatCurrency(e)
    },
    _getStandardProductById() {
      const { id } = this.list
      getStandardProductById({ id }).then(res => {
        if (res.code === ERR_SUCCESS) {
          // console.log(res.data)
          this.bannerUrls = res.data.standardProduct.bannerUrl.split(',')
          this.name = res.data.standardProduct.name
          this.price = res.data.standardProduct.amountSale
          const detail = res.data.standardProduct.standardDetail
          const content = detail.replace(/<div class="article-title">[\S-\s]*<\/div>/, '')
          this.preview = content
        }
      })
    }
  },
  components: {
    [Carousel.name]: Carousel,
    [CarouselItem.name]: CarouselItem
  }
}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~common/css/variable"
  @import "~common/css/mixin"
  .content-manage-item
    height 550px
    .block
      margin 0 auto
      margin-top 10px
      padding 20px 20px
      padding-top 54px
      background url("../../static/iphone.png")
      background-repeat no-repeat
      background-size 100%
      width 238px
      height 500px
      & >>>.el-carousel__indicators
        width 100%
        left 70%
      img
        display block
      p
        line-height 20px
        font-size 14px
        img
        display block
  .articleTitle
    margin-top 6px
    line-height 20px
    font-size 16px
  .source
    float right
    overflow hidden
    width 160px
    height 20px
    white-space nowrap
    text-overflow ellipsis
    text-align right
    line-height 20px
    font-size 12px
  .time
    line-height 20px
    font-size 12px
  .warning-wapper
    width 400px
    margin 0 auto
    padding-top 20px
    overflow hidden
    padding-bottom 40px
    li
      float left
      font-size 12px
      margin-bottom 10px
      width 100%
      &:last-child
        text-align center
      .unit
        display inline-block
        padding 0 10px
        margin-left -3px
        background #dcdfe6
        color #333
        height 28px
        line-height 28px
        border-top-right-radius 3px
        border-bottom-right-radius 3px

      .choose
        &:before
          content '*'
          color red
          padding-right 4px
      &>span
        float left
        margin-right 6px
        width 90px
        height 30px
        line-height 30px
        font-size 12px
        text-align right

</style>
