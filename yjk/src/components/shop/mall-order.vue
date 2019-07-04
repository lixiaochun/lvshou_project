<template>
  <div class="custom-page">
    <p class="title"><span>订单管理</span></p>
    <div class="custom-page-left">
      <div class="custom-page-left-content">
        <list-table>
          <slot slot="query">
            <div>
              <ul class="screening">
                <li>
                  <span>订单状态：</span>
                  <div>
                  <el-select v-model="state"  placeholder="订单状态" size="mini" style="width: 100%;">
                    <el-option
                      v-for="item in options"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value">
                    </el-option>
                  </el-select>
                  </div>
                </li>
                <li>
                  <span>订单编号：</span>
                  <div>
                    <el-input placeholder="订单编号" clearable v-model="orderNo" size="mini" style="width: 100%;">
                      <i slot="prefix" class="el-input__icon el-icon-search"></i>
                    </el-input>
                  </div>
                </li>
                <li>
                  <span>会员昵称：</span>
                  <div>
                  <el-input placeholder="会员昵称" clearable v-model="userName" size="mini" style="width: 100%; margin-right: 10px;">
                    <i slot="prefix" class="el-input__icon el-icon-search"></i>
                  </el-input>
                  </div>
                </li>
                <li style="width: 300px">
                  <span>下单时间：</span>
                  <div style=" width: 220px;">
                    <el-date-picker
                      v-model="timeData"
                      style="width: 220px"
                      type="daterange"
                      range-separator="至"
                      size="mini"
                      start-placeholder="开始日期"
                      end-placeholder="结束日期">
                    </el-date-picker>
                  </div>
                </li>
                <li>
                  <el-button size="mini" @click="_queryData" type="primary"  style=" width: 50px; margin-left: 16px">查询</el-button>
                  <el-button size="mini" plain @click="_resetData"  style=" width: 50px;">重置</el-button>
                </li>
              </ul>
            </div>
          </slot>
          <div class="custom-table">
            <el-table style="width: 100%;"
                      :data="tableData"
                      v-loading="loding"
                      class="order-table"
                      size="mini"
                      header-row-class-name="element-headerRowClassName">
              <el-table-column label="编号/商品" width="300" align="left">
                <template slot-scope="scope">
                  <p class="number">编号： {{tableData[scope.$index].orderNo}}</p>
                  <div>
                    <div class="img">
                      <img :src="tableData[scope.$index].picUrl">
                    </div>
                    <div class="text" title="tableData[scope.$index].orderTitle">
                      <div>
                       {{tableData[scope.$index].orderTitle}}
                      </div>
                    </div>
                  </div>
                </template>
              </el-table-column>
              <el-table-column label="消费魅力分/金额（元)" width="180" align="center">
                <template slot-scope="scope">
                  <div class="mt-40">
                    <p> <span class="icon-exchangePoints points">{{tableData[scope.$index].points}}</span></p>
                    <p> <span class="icon-exchangeMoney points">{{_formatCurrency(tableData[scope.$index].price)}}</span></p>
                  </div>
                </template>
              </el-table-column>

              <el-table-column label="手机号码" width="" align="center">
                <template slot-scope="scope">
                  <div class="mt-40">
                    {{tableData[scope.$index].mobile}}
                  </div>
                </template>
              </el-table-column>

              <el-table-column label="会员昵称" width="" align="center">
                <template slot-scope="scope">
                  <div class="mt-40">
                    {{tableData[scope.$index].userName}}
                  </div>
                </template>
              </el-table-column>

              <el-table-column label="下单时间" width="" align="center">
                <template slot-scope="scope">
                  <div class="mt-40">
                    {{tableData[scope.$index].createDate}}
                  </div>
                </template>
              </el-table-column>
              <el-table-column label="状态" width="" align="center">
                <template slot-scope="scope">
                  <div class="mt-40">
                  {{tableData[scope.$index].stateName}}
                  </div>
                </template>
              </el-table-column>
              <el-table-column label="操作" width="" align="center">
                <template slot-scope="scope">
                  <div class="mt-40">
                  <el-button
                    @click.native.prevent="editAction( scope.$index, tableData)"
                    class="custom-columnButton"
                    type="text"
                    size="small">
                    <span>查看详情</span>
                  </el-button>
                  </div>
                </template>
              </el-table-column>
            </el-table>
            <div class="custom-pagination">
              <div class="achievement-pagination-content">
                <el-pagination
                  @size-change="handleSizeChange"
                  @current-change="handleCurrentChange"
                  :current-page= pageNum
                  :page-sizes="[10, 20, 50, 100]"
                  :page-size= pageSize
                  layout="total, sizes, prev, pager, next, jumper"
                  :total=total>
                </el-pagination>
              </div>
            </div>
          </div>
        </list-table>
      </div>
    </div>

    <div>
      <router-view></router-view>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
import { RadioGroup, Select, Option, RadioButton, Cascader, Switch, DatePicker, Button, Table, TableColumn, Pagination, Input } from 'element-ui'
import listTable from 'base/list-table/list-table'
import { getOrderList } from 'api/mall'
import { format, formatCurrency } from 'common/js/util'
import { ERR_SUCCESS } from 'api/config'
export default {
  data() {
    return {
      total: 10,
      pageNum: 1,
      loding: false,
      pageSize: 10,
      timeData: [],
      state: '',
      orderNo: '',
      userName: '',
      startDate: '',
      endDate: '',
      options: [{
        label: '全部',
        value: ''
      }, {
        label: '待发货',
        value: '200'
      }, {
        label: '已发货',
        value: '300'
      }, {
        label: '已收货',
        value: '400'
      }, {
        label: '已取消',
        value: '-1'
      }, {
        label: '审单退回',
        value: '-2'
      }, {
        label: '物流退回',
        value: '-3'
      }, {
        label: '客户拒收',
        value: '-4'
      }, {
        label: '拒收已退回',
        value: '-5'
      }, {
        label: '包裹丢失',
        value: '-6'
      }],
      tableData: []
    }
  },
  created() {
    const { state } = this.$route.query
    if (state) {
      this.state = state
    }
    this._getOrderList()
  },
  methods: {
    _formatCurrency(e) {
      return formatCurrency(e)
    },
    handleSizeChange(val) { // 分页 设置多少条
      this.pageSize = val
      this._getOrderList('reset')
    },
    handleCurrentChange(val) { // 分页 设置多少条
      this.pageNum = val
      this._getOrderList('reset')
    },
    _queryData() {
      this._getOrderList('reset')
    },
    _resetData() {
      this.timeData = []
      this.state = ''
      this.orderNo = ''
      this.userName = ''
      this._getOrderList()
    },
    editAction(idx, table) {
      const id = table[idx].id
      // eslint-disable-next-line standard/object-curly-even-spacing
      this.$router.push({ path: '/shop/details', query: { id }})
    },
    _getOrderList(reset) {
      this.loding = true
      const { state, orderNo, userName, timeData, pageNum, pageSize } = this
      if (timeData && timeData.length > 0) {
        this.startDate = format(timeData[0], '$1-$2-$3')
        this.endDate = format(timeData[1], '$1-$2-$3')
      } else {
        this.startDate = ''
        this.endDate = ''
      }
      const { startDate, endDate } = this
      if (reset === 'reset') {
        this.pageNum = 1
      }
      getOrderList({ state, orderNo, userName, startDate, endDate, pageNum, pageSize }).then(res => {
        if (res.code === ERR_SUCCESS) {
          this.tableData = res.data.dataList
          this.total = res.data.total
          this.loding = false
        }
      })
    }
  },
  watch: {
    $route() {
      const { path } = this.$route
      if (path === '/shop/order') {
        this.timeData = []
        this.state = ''
        this.orderNo = ''
        this.userName = ''
        this._getOrderList()
      }
    }
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
  .custom-page-left
    height 100%
    overflow-y auto
  .list-table-content
    padding 0 15px
  .custom-table
    margin-top 20px
    padding 0 15px
  .screening
    height 40px
    line-height 40px
    li
      float left
      width 20%
      height 40px
      &:last-child
        width 130px
      span
        width 80px
        display inline-block
        text-align right
        float left
      &>div
        margin-left 80px
  .custom-pagination
    height 40px
    line-height 40px
    .achievement-pagination-content
      float right
      margin-top 20px
      height 40px
      padding-right 15px
  .img
    float left
    width 90px
    height 90px
    img
      height 80px
      width 80px
      margin-top 5px
  .text
    margin-left 90px
    height 80px
    width 148px
    position relative
    overflow hidden
    &>div
      transform translateY(-50%)
      top 50%
      position absolute
      max-height 65px
  .points
    padding-left 10px
    text-align left
    position relative
    width 80px
    display inline-block
    .icon-exchangePoints
    &:before
      position absolute
      left -8px
      top 1px
      font-size 12px
</style>
