<template>
  <div class="summary-wapper">
    <p class="title"><span>商品概括</span></p>
    <div class="summary-content">
        <ul class="amount">
          <li>
            <div class="amount-item">
              <div>
                <div class="item-icon">
                  <span class="number-icon"><img src="./money.png"></span>
                </div>
                <div class="itme-content">
                  <p class="number"><span>{{_formatCurrency(obj.totalAmount)}}</span></p>
                  <p class="note">今日订单总金额(元)</p>
                </div>
              </div>
            </div>
          </li>
          <li>
            <div class="amount-item">
              <div>
                <div class="item-icon">
                  <span class="number-icon"><img src="./integral.png"></span>
                </div>
                <div class="itme-content">
                  <p class="number"><span>{{obj.spendPoints}}</span></p>
                  <p class="note">今日订单总魅力分</p>
                </div>
              </div>
            </div>
          </li>
          <li>
            <div class="amount-item">
              <div>
                <div class="item-icon">
                  <span class="number-icon"><img src="./order.png"></span>
                </div>
                <div class="itme-content">
                  <p class="number"><span>{{obj.salesOrderCount}}</span></p>
                  <p class="note">当月订单累计总数</p>
                </div>
              </div>
            </div>
          </li>
        </ul>

        <div class="summary-prompt">
          <div class="summary-ranking">
            <p class="prompt-title">
              <span class="prompt-name">单品效益排名</span>
              <span class="prompt-samll">按月期统计魅力分商城的总效益</span>
            </p>
            <ul class="summary-ranking-list summary-ranking-top">
              <li>
                <div class="item">排行</div>
                <div class="item">商品</div>
                <div class="item">总效益</div>
              </li>
            </ul>
            <ul class="summary-ranking-list" v-if="orderList.length > 0">
              <li v-for="(item, index) in orderList" :key="index">
                <div class="number">{{index + 1}}</div>
                <div class="name" :title="item.name">{{item.name}}</div>
                <div class="price">{{item.money}}</div>
              </li>
            </ul>
            <div class="notDate">
              暂无数据
            </div>
          </div>
          <div class="summary-prompt-content">
              <div class="summary-prompt-item">
                <p class="prompt-title">
                  <span class="prompt-name">商城及商品提示</span>
                  <span class="prompt-samll">您需要关注的商品信息</span>
                </p>
                <ul class="summary-prompt-state">
                  <li>
                    <p class="number" @click="jumpUrl('shop', 3)">{{obj.goodsShowCount}}</p>
                    <p class="note">出售中商品</p>
                  </li>
                  <li>
                    <p class="number" @click="jumpUrl('shop', 4)">{{obj.goodsNoShowCount}}</p>
                    <p class="note">已下架商品</p>
                  </li>
                  <li>
                    <p class="number" @click="jumpUrl('shop', 5)">{{obj.goodStockAlert}}</p>
                    <p class="note">库存预警</p>
                  </li>
                </ul>
              </div>

            <div class="summary-prompt-item">
              <p class="prompt-title">
                <span class="prompt-name">交易提示</span>
                <span class="prompt-samll">您需要跟进的交易订单</span>
              </p>
              <ul class="summary-prompt-state">
                <li>
                  <p class="number" @click="jumpUrl('order', '200')">{{obj.noSend}}</p>
                  <p class="note">待发货</p>
                </li>
                <li>
                  <p class="number" @click="jumpUrl('order', '300')">{{obj.send}}</p>
                  <p class="note">已发货</p>
                </li>
                <li>
                  <p class="number" @click="jumpUrl('order', '400')">{{obj.receive}}</p>
                  <p class="note">已收货</p>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div class="sumary-data">
          <achieve-ment></achieve-ment>
        </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
import { Button, Input, DatePicker, Select, Option } from 'element-ui'
import { getSalesOrderInfo, getGoodsOrder } from 'api/mall'
import { formatCurrency } from 'common/js/util'
import achieveMent from '../achievement/achievement'
export default {
  data() {
    return {
      orderList: [],
      obj: {
        totalAmount: '',
        spendPoints: '',
        salesOrderCount: '',
        goodsShowCount: '',
        goodsNoShowCount: '',
        goodStockAlert: '',
        noSend: '',
        send: '',
        receive: ''
      }
    }
  },
  created() {
    this._getSalesOrderInfo(0)
  },
  methods: {
    _formatCurrency(e) {
      return formatCurrency(e)
    },
    _getSalesOrderInfo() {
      getSalesOrderInfo().then(res => {
        this.obj = res.data
      })
      getGoodsOrder().then(res => {
        this.orderList = res.data
        // console.log(this.orderList)
      })
    },
    jumpUrl(url, state) {
      if (url === 'shop') {
        // eslint-disable-next-line standard/object-curly-even-spacing
        this.$router.push({ path: '/shop/goods', query: { state }})
      } else {
        // eslint-disable-next-line standard/object-curly-even-spacing
        this.$router.push({ path: '/shop/order', query: { state }})
      }
    }
  },
  components: {
    [Select.name]: Select,
    [Option.name]: Option,
    [DatePicker.name]: DatePicker,
    [Input.name]: Input,
    [Button.name]: Button,
    achieveMent
  }
}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~common/css/variable"
  @import "~common/css/mixin"
  .summary-wapper
    height 100%
    overflow-y auto
    background #f2f2f2
    .notDate
      line-height 200px
      text-align center
      color #666666
      font-size 14px
    .title
      height 60px
      line-height 60px
      background #f2f2f2
      span
        position relative
        margin-left 8px
        padding-left 10px
        color #666
        font-size 16px
        &:before
          position absolute
          top 2px
          left -2px
          content ""
          width 2px
          display inline-block
          height 14px
          background #00bafa
    .summary-content
      background #e4e4e4
      padding 0 10px
      overflow-x auto
      height calc(100% - 60px)
    .amount
      margin-top 10px
      height 100px
      background #fff
      li
        float left
        width 33.33%
        text-align left
        .amount-item
          margin-top 10px
          overflow hidden
          height 70px
          border-right 1px solid #c2c2c2
          .item-icon
            width 100px
            float left
            text-align right
            height 60px
            line-height 60px
            padding-right 10px
          .itme-content
            margin-left 100px
            .number
              font-size 18px
              font-weight bold
              height 30px
          .number-icon
              width 30px
              height 40px
              line-height 40px
              display inline-block
              vertical-align middle
              img
                display inline-block
                max-width 100%
        .number
          margin-top 10px
          line-height 30px
          font-weight bold
          font-size 16px
          margin-bottom 2px
        .note
          font-size 12px
          color #999
        &:last-child
          .amount-item
            border-right 0
  .summary-prompt
    margin-top 10px
    overflow hidden
    .summary-prompt-content
      margin-right 310px
      height 300px
      .summary-prompt-item
        height 160px
        margin-bottom 10px
        background #fff
      .summary-prompt-state
        margin-top 40px
        overflow hidden
        height 80px
        .number
          color #1c8fef
          font-weight 900
          font-size 18px
          height 30px
          cursor pointer
        .note
          font-size 12px
          color #999
        li
          float left
          width 33.3%
          text-align center
    .summary-ranking
      float right
      background #fff
      width 300px
      height 330px
  .sumary-data
      height 300px
      margin-top 10px
      background #fff
  .prompt-title
    height 40px
    line-height 40px
    .prompt-name
      margin-left 20px
      padding-left 8px
      border-left 2px solid #3498db
      font-size 16px
    .prompt-samll
      color #999
      font-size 12px
  .summary-ranking-top
  .summary-ranking-list
    padding 0 10px
    font-size 12px
    overflow hidden
    li
      height 58px
      line-height 58px
      border-bottom 1px solid #f2f2f2
      font-size 16px
      overflow hidden
      .item
        float left
        width 80px
        text-align center
        font-size 14px
        &:nth-child(2)
          width 120px
      &:nth-child(1)
        .name
          color #333333
        .number
          color #facc03
        .price
          color #facc03
      &:nth-child(2)
        .name
          color #333333
        .number
          color #c9c9c9
        .price
          color #c9c9c9
      &:nth-child(3)
        .name
          color #333333
        .number
          color #b8850d
        .price
          color #b8850d
      &:nth-child(4)
        .name
          color #333333
        .number
          color #333333
        .price
          color #333333
      .name
        float left
        width 120px
        font-size 12px
        text-align center
        overflow hidden
      .price
          float left
          width 80px
          text-align center
          font-weight bold
      .number
        float left
        width 80px
        text-align center
        font-weight bold
</style>
