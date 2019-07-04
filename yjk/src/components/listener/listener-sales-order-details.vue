<template>
  <div class="member-page">
    <p class="title"><span>订单信息</span></p>
    <div class="orderDate">
      <ul>
        <li>昵称：{{orderDate.nickname}}</li>
        <li>会员编号：{{orderDate.userId}}</li>
        <li>真实姓名：{{orderDate.userName}}</li>
        <li>手机：{{orderDate.mobile}}</li>
        <li>创建时间：{{orderDate.createTime}}</li>
        <li>订单编号：{{orderDate.orderNo}}</li>
        <li>支付方式：{{orderDate.payWayName}}</li>
        <li>支付时间：{{orderDate.payTime}}</li>
        <li>交易单号：{{orderDate.tradeNo}}</li>
        <li>商户号：{{orderDate.mchId}}</li>
        <li>订单状态：{{orderDate.stateName}}</li>
      </ul>
      <div class="Remarks">订单备注：{{orderDate.remark}}</div>
    </div>
    <!--  -->
    <p class="title"><span>商品信息</span></p>
    <div class="member-header">
        <div class="member-table">
          <el-table style="width: 100%;margin-top: 30px"
                    :data="tableData"
                    ref="multipleTable"
                    border
                    stripe
                    size="mini"
                    v-loading="loading"
                    header-row-class-name="element-headerRowClassName">
            <el-table-column label="商品图片" width="220" align="center">
              <template slot-scope="scope">
                <div :scope='scope'>
                    <img :src="scope.row.goodsImage" alt="" style="width: 200px;height: 200px;"/>
                </div>
              </template>
            </el-table-column>
             <el-table-column label="商品名称" width="" prop="goodsName" align="center"></el-table-column>
            <el-table-column label="服务类型" width="" prop="typeName" align="center"></el-table-column>
            <el-table-column label="服务时长" width="" prop="duration" align="center"></el-table-column>
            <el-table-column label="解忧师昵称" width="" prop="listenerNickname" align="center"></el-table-column>
            <el-table-column label="解忧师ID" width="" prop="listenerId" align="center"></el-table-column>
            <el-table-column label="订单金额" width="" align="center">
              <template slot-scope="scope">
                <div :scope='scope.row.state'>
                  {{scope.row.toralAmount | formatCurrency}}
                </div>
              </template>
            </el-table-column>
            <el-table-column label="支付金额" width="120" align="center">
              <template slot-scope="scope">
                <div :scope='scope.row.state'>
                  {{scope.row.payAmount | formatCurrency}}
                </div>
              </template>
            </el-table-column>
            <el-table-column label="有效期" width="120" prop="validDate" align="center"></el-table-column>
          </el-table>
        </div>
    </div>
     <div class="goback">
       <el-button type="primary" @click='goback'>返回列表</el-button>
     </div>
  </div>
</template>

<script type="text/ecmascript-6">
import {
  Input, Button, DatePicker, Table, TableColumn, Switch, Message,
  Pagination, Checkbox, Select, Option, RadioGroup, RadioButton
} from 'element-ui'
import listTable from 'base/list-table/list-table'
import { ERR_SUCCESS } from 'api/config'
import { getListenerOrderDetail } from 'api/listener'
import { formatCurrency } from 'common/js/util'
export default {
  data() {
    return {
      orderNo: '',
      orderDate: {},
      tableData: []
    }
  },
  created() {
    this.orderNo = this.$route.query.orderNo
    this.getListenerOrderDetail()
  },
  methods: {
    goback() {
      this.$router.back()
    },
    getListenerOrderDetail() {
      if (!this.orderNo || this.orderNo === '') {
        Message.error('缺少订单号')
        return false
      }
      this.loading = true
      getListenerOrderDetail(this.orderNo).then(res => {
        if (res.code === ERR_SUCCESS) {
          this.tableData.push(res.data)
          this.orderDate = res.data
          this.loading = false
        } else {
          Message.error(res.msg)
        }
      })
    }
  },
  filters: {
    formatCurrency(value) {
      let v = ''
      if (parseFloat(value) < 0) {
        v = '- '
      }
      const $value = formatCurrency(Math.abs(value))
      return $value === 'invalid value' ? '' : '￥' + v + $value
    }
  },
  components: {
    [Input.name]: Input,
    [Button.name]: Button,
    [Select.name]: Select,
    [Option.name]: Option,
    [Switch.name]: Switch,
    [DatePicker.name]: DatePicker,
    [Table.name]: Table,
    [TableColumn.name]: TableColumn,
    [Pagination.name]: Pagination,
    [Checkbox.name]: Checkbox,
    [RadioGroup.name]: RadioGroup,
    [RadioButton.name]: RadioButton,
    listTable
  }
}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
@import "~common/css/variable"
@import "~common/css/mixin"
@import "~common/css/elementCustom"
.orderDate{
  padding 10px
  font-size 12px
  ul{
    li{
      float left
      width 50%
      margin-top 5px
      padding 5px 0
    }
    &:after{
      clear both
      height 0
      content ''
      display block
      visibility hidden
    }
  }
  .Remarks{
    margin-top 5px
    padding 5px 0
  }
}
.goback{
  text-align center
  padding 30px
}
.member-page
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
  .member-header
    position relative
  .member-header-query
    width 96%
    margin 0 auto;
    font-size 0
  .member-header-item
    padding-right 1%
    // width 100%
    height 40px
    line-height 40px
    inline-block-top()
    & > .label
      float left
      width 80px
      font-size $font-size-sm
      inline-block-top()
    & > .member-input-item
      display inline-block
      // margin-left 115px
      font-size $font-size-sm
  .member-header-more
    height 0px
    transition height 400ms
    overflow hidden
  .member-more-button
    position absolute
    top 5px
    right 10px
    width 85px
    height 40px
    & >>> .el-icon-arrow-down
      transition transform 400ms
    &.active
      & >>> .el-icon-arrow-down
        transform rotate(180deg)
  .member-button
    padding-top 5px
    width 100%
    height 28px
    text-align center
    button
      margin-right 15px
      width 120px
  .member-table
    padding 0 10px
.member-pagination
  padding 21px 0
  height 32px
  line-height 32px
  border 1px solid #ebeef5
  border-top none
  overflow hidden
  .member-pagination-select
    inline-block-top()
  .member-pagination-checkbox
    width 34px
    height 32px
    line-height 32px
    text-align center
    inline-block-top()
  .member-pagination-content
    float right
    margin-right 20px
    inline-block-top()
</style>
