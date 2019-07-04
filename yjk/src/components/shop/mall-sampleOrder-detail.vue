<template>
  <div class="custom-page">
    <p class="title"><span>发货订单</span></p>
    <div class="dtails-content">
        <div class="clear">
          <p class="title">订单详情</p>
          <ul class="dtails-order">
            <li><label>会员编号：</label>{{_returnNull(contentList.userNo)}}</li>
            <li><label>会员昵称：</label>{{_returnNull(contentList.userName)}}</li>
            <li><label>真实姓名：</label>{{_returnNull(contentList.name)}}</li>
            <li><label>手机号码：</label>{{_returnNull(contentList.mobile)}}</li>
            <li><label>订单编号：</label>{{_returnNull(contentList.orderNo)}}</li>
            <li><label>下单时间：</label>{{_returnNull(contentList.createDate)}}</li>
            <li><label>订单状态：</label>{{_returnNull(contentList.stateName)}}</li>
            <li><label>运费：</label>免运费</li>
            <li><label>付款方式：</label>{{_returnNull(contentList.payWay)}}</li>
            <li><label>交易单号：</label>{{_returnNull(contentList.flowNo)}}</li>
          </ul>
          <hr/>
          <el-form style="font-size:12px;padding:10px
          ">
            <el-form-item label="资料所属人:">
              {{_returnNull(contentList.consultantName)}}({{_returnNull(contentList.consultantBrmid)}})
            </el-form-item>
            <el-form-item label="订单异常信息:">
              {{_returnNull(contentList.cancelReason)}} {{_returnNull(contentList.cancelRemark)}}
            </el-form-item>
            <el-form-item label="订单处理备注:">
              <el-input v-model="remark" type="textarea" style="width:70%"></el-input>
            </el-form-item>
          <el-form-item style="text-align:right;width:75%">
            <el-button type="primary" size="mini" @click="submit">提交</el-button>
          </el-form-item>
           </el-form>
        </div>

        <div class="clear">
          <p class="title">交易信息</p>
          <div class="trading">
            <el-table
              :data="tableData"
              border
              stripe
              v-loading="loading"
              size="mini"
              header-row-class-name="element-headerRowClassName"
              style="width: 100%">
              <el-table-column label="商品名称" width="200" align="center">
                <template slot-scope="scope">
                  <div class="">
                    <div class="img"> <img :src="tableData[scope.$index].picUrl"></div>
                    <div class="text">{{tableData[scope.$index].name}}</div>
                  </div>
                </template>
              </el-table-column>
              <el-table-column label="数量"  align="center">
                <template slot-scope="scope">
                  <div>x{{tableData[scope.$index].qty}}</div>
                </template>
              </el-table-column>
              <el-table-column label="商品单价" align="center">
                <template slot-scope="scope">
                  <div>
                    <span>￥{{_formatCurrency(tableData[scope.$index].price)}}元</span>
                  </div>
                </template>
              </el-table-column>
            </el-table>
            <div class="combined-content" v-if="tableData && tableData.length > 0">
               <ul class="realPay">
                <li><div>商品总价：</div></li>
                <li style="width:75%"><div style="text-align: center">￥{{_formatCurrency(allPrice)}}元</div></li>
              </ul>
              <ul class="realPay">
                <li><div>标品售价：</div></li>
                <li style="width:75%"><div style="text-align: center;">￥{{_formatCurrency(salesPrice)}}元</div></li>
              </ul>
              <ul class="realPay">
                <li><div>实付：</div></li>
                <li style="width:75%"><div style="text-align: center;">￥{{_formatCurrency(salesPrice)}}元</div></li>
              </ul>
            </div>
          </div>
        </div>

        <div class="clear">
          <p class="title">收货信息</p>
          <ul class="dtails-goods">
            <li><label>收货人：</label>{{contentList.receiver}}</li>
            <li><label>手机号码：</label>{{contentList.receiverMobile}}</li>
            <li><label>收货地址：</label>{{contentList.receiverAddress}}</li>
          </ul>
        </div>
        <div class="clear">
          <p class="title">物流信息</p>
          <div class="logistics">
            <div class="logistics-tab">
              <ul>
                <li :class="{active: index === select}" v-for="(item, index) in orderLogistics" :key="index" @click="selectItem(index)">
                  <span>{{item.orderNo}}</span>
                </li>
              </ul>
            </div>
            <div class="logistics-content">
              <div class="logistics-item">
                <label>物流公司：</label>
                <div>{{orderLogin.companyName}}</div>
              </div>
              <div class="logistics-item">
                <label>快递单号：</label>
                <div>{{orderLogin.logisticNo}}</div>
              </div>
              <div class="logistics-item">
                <label>物流追踪：</label>
                <div>
                  <ul>
                    <li v-for="(items, index) in orderLogin.logisticList" :key="index">
                      <span class="dataTime">{{items.createTime}}</span><span>{{items.status}}</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>

     <div class="back"><el-button size="mini" @click="cancalQuery" style=" width: 120px">返回列表</el-button></div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
import { RadioGroup, Select, Option, RadioButton, Cascader, Switch, DatePicker, Button, Table, TableColumn, Pagination, Input, Form, FormItem, Message } from 'element-ui'
import listTable from 'base/list-table/list-table'
import { getOrderdetail, getGoodsStandardByOrderList, getOrderLogistics, subOrderRemark } from 'api/mall'
import { formatCurrency, returnNull } from 'common/js/util'
import { ERR_SUCCESS } from 'api/config'
export default {
  data() {
    return {
      contentList: {},
      remark: '',
      select: 0,
      allNumber: 0,
      allPrice: 0,
      salesPrice: 0,
      loading: false,
      points: 0,
      orderLogin: {},
      typeId: '1',
      orderLogistics: '',
      tableData: []
    }
  },
  created() {
    const { id } = this.$route.query
    this._getOrderdetail(id)
  },
  methods: {
    _returnNull(val) {
      return returnNull(val)
    },
    _formatCurrency(val) {
      return formatCurrency(val)
    },
    _getOrderdetail(id) {
      getOrderdetail({ id, salesLine: 3 }).then(res => {
        if (res.code === ERR_SUCCESS) {
          this.contentList = res.data
          this.remark = res.data.remark
        }
      })
      getGoodsStandardByOrderList({ orderId: id }).then(res => {
        if (res.code === ERR_SUCCESS) {
          const tableData = res.data.goodsList
          this.allPrice = res.data.goodsAmount
          this.salesPrice = res.data.payableAmount
          this.tableData = tableData
        //   this._allState(tableData)
        }
      })
      getOrderLogistics({ id }).then(res => {
        if (res.code === ERR_SUCCESS) {
          const order = res.data
          this.orderLogistics = order
          if (order.length > 0) {
            this.orderLogin = order[0]
          }
        }
      })
    },
    submit() {
      const { id } = this.$route.query
      const { remark } = this
      subOrderRemark({ id, remark }).then(res => {
        if (res.code === ERR_SUCCESS) {
          if (res.data === 1) {
            Message.success('提交成功')
          }
        }
      })
    },
    cancalQuery() {
      this.$router.go(-1)
    },
    selectItem(index) {
      this.select = index
      this.orderLogin = this.orderLogistics[index]
    }
    // _allState (value) {
    //   value.forEach(e => {
    //     this.allNumber += parseInt(e['qty'])
    //     const price = parseInt(e['price']) * parseInt(e['qty'])
    //     this.allPrice += price
    //   })
    // }
  },
  components: {
    [RadioGroup.name]: RadioGroup,
    [RadioButton.name]: RadioButton,
    [DatePicker.name]: DatePicker,
    [Button.name]: Button,
    [Table.name]: Table,
    [TableColumn.name]: TableColumn,
    [Pagination.name]: Pagination,
    [Input.name]: Input,
    [Select.name]: Select,
    [Option.name]: Option,
    [Switch.name]: Switch,
    [Cascader.name]: Cascader,
    [Form.name]: Form,
    [FormItem.name]: FormItem,
    [Message.name]: Message,
    listTable
  }
}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~common/css/variable"
  @import "~common/css/mixin"
  @import "~common/css/elementCustom"
  .custom-page
    height 100%
    overflow-y auto
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
    .dtails-content
      margin 20px 20px 0 20px
      border 1px solid #c2c2c2
      background-color #fff
      .title
        padding-left 20px
        height 40px
        line-height 40px
      .dtails-order
        padding  20px 20px
        overflow hidden
        font-size 12px
        li
          float left
          width 50%
          height 30px
          line-height 30px
          margin-bottom 10px
    .dtails-goods
      margin 20px 0
      font-size 12px
      li
        width 100%
        padding-left 20px
        line-height 30px
        line-height 30px
    .logistics
      .logistics-tab
        margin-bottom 30px
        padding-left 20px
        padding-top 20px
        height 30px
        border-bottom 1px solid #c2c2c2
        li
          width 140px
          float left
          height 30px
          line-height 30px
          font-size 12px
          cursor pointer
          text-align center
        .active
          border 1px solid #c2c2c2
          border-top-left-radius 5px
          border-top-right-radius 5px
          background-color #ffffff
          border-bottom #fff
    .logistics-item
      padding-left 20px
      box-sizing border-box
      label
        width 100px
        display inline-block
        float left
        height 30px
        line-height 30px
        font-size 12px
      div
        min-height 30px
        line-height 30px
        font-size 12px
        margin-left 100px
        li
          width 100%
          height 30px
          span
            display inline-block
          .dataTime
            width 120px
            display inline-block
          &:first-child
            color #f76405
  .trading
    margin-top 40px
    margin-left 80px
    width 801px
    margin-bottom 60px
  .back
    margin-top 40px
    height 40px
    line-height 40px
    color #fff
    text-align center
  .combined-content
    overflow hidden
    color #606278
    background-color #fff
    font-size 12px
    color #606278
    p
      width 799px
      text-indent 10px
      float left
      height 40px
      line-height 40px
      border 1px solid #eceef6
      border-left 1px solid #eceef6
    .combined
      float left
      width 799px
      overflow hidden
      border-left 1px solid #eceef6
      border-right 1px solid #eceef6
      li
        float left
        height 40px
        line-height 40px
        div
          border-right 1px solid #eceef6
          border-bottom 1px solid #eceef6
        &:nth-child(1)
          width 200px
          text-indent 10px
        &:nth-child(2)
          width 200px
          text-indent 10px
        &:nth-child(3)
          width 200px
          text-indent 10px
        &:nth-child(4)
          width 199px
          text-indent 10px
    .realPay
      height 40px
      line-height 40px
      width 800px
      float left
      border-right 1px solid #eceef6
      border-bottom 1px solid #eceef6
      li
        float left
        width 25%
        text-indent 10px
        div
          border 1px solid #eceef6
          border-top none
          &:first-child
            border-right 0px
  .img
    float left
    width 30px
    height 30px
    img
      height 30px
      width 30px
  .text
    height 30px
    line-height 30px
    overflow hidden
    text-overflow ellipsis
    white-space nowrap
</style>
