<template>
  <div class="custom-page">
    <p class="logistics-title"><span>自助支付记录表</span></p>
    <div class="custom-page-left">
      <div class="custom-page-left-content">
        <list-table title="收支记录" :border="true">
          <slot slot="query">
            <div style="background: #f2f2f2; height: 40px;">
               <div class="el-icon-search" style="margin:10px;font-size:18px"><span style="font-size:12px;padding:5px">筛选查询</span></div>
            </div>
            <div style="padding: 20px 20px">
                 <div>
                  <span class="member-input-label">查询时段：</span>
                 <el-radio-group v-model="selectData" size="mini" style="margin-right: 41px;" @change="timeChange('b')">
            <el-radio-button label="">全部</el-radio-button>
            <el-radio-button label="0">今天</el-radio-button>
            <el-radio-button label="1">昨天</el-radio-button>
            <el-radio-button label="7">近7天</el-radio-button>
            <el-radio-button label="30">近30天</el-radio-button>
          </el-radio-group>
          <el-date-picker
            size="mini"
            v-model="timeData"
            @change="timeChange('t')"
            type="datetimerange"
            range-separator="至"
            :start-placeholder="orderStartDate"
            :end-placeholder="orderEndDate">
    </el-date-picker>
                </div>
                <div style="padding-top:20px">
                  <span  class="member-input-label">操作记录：</span>
                  <span>
                  <el-radio-group v-model="state" size="mini" @change="handleChange">
                    <el-radio-button label="">全部</el-radio-button>
                    <el-radio-button label="0">未使用</el-radio-button>
                    <el-radio-button label="1">已使用</el-radio-button>
                    <el-radio-button label="2">退款中</el-radio-button>
                    <el-radio-button label="-1">已退款</el-radio-button>
                </el-radio-group>
                  </span>
                </div>
                  <div style="padding-top:20px">
                      <span class="member-input-label">精准查询：</span>
                      <span> <el-input placeholder="请输入支付单号" size="mini" v-model.trim="billno" clearable></el-input></span>
                      <span><el-input placeholder="请输入会员编号" size="mini" v-model.trim="brmid" clearable></el-input></span>
                      <span><el-input placeholder="请输入会员手机号码" size="mini" v-model.trim="mobile" clearable></el-input></span>
                      <span><el-button size="mini"  type="primary" style="margin-left: 10px;" @click="_queryData">查询</el-button></span>
                  </div>
                </div>
          </slot>
          <div class="custom-table">
            <el-table style="width: 100%;"
                      :data="tableData"
                      v-loading="loading"
                      ref="multipleTable"
                      border
                      stripe
                      size="mini"
                      header-row-class-name="element-headerRowClassName">
              <el-table-column label="支付单号" width="180" align="center" prop="billno">
              </el-table-column>
              <el-table-column label="支付平台" width="100" prop="" align="center">
                <template slot-scope="scope">
                    {{_formatPayWay(scope.$index, tableData)}}
                </template>
              </el-table-column>
              <el-table-column label="手机号码" width="130"  align="center" prop="mobile">
              </el-table-column>
              <el-table-column label="会员编号" width="130"  align="center" prop="brmid">
              </el-table-column>
              <el-table-column label="会员姓名" width="100"  align="center" prop="userName">
              </el-table-column>
              <el-table-column label="更新时间"  prop="createTime" align="center">
              </el-table-column>
               <el-table-column label="抵现"  align="center" width="200">
                 <template slot-scope="scope">
                  <span style="color: red" v-if="tableData[scope.$index].deductionDetail">
                    {{tableData[scope.$index].deductionDetail}}
                  </span>
                  <span v-else>
                    {{tableData[scope.$index].deductionDetail}}
                  </span>
                </template>
              </el-table-column>
               <el-table-column label="实际支付（元）"  prop="payableAmount" align="center">
                <template slot-scope="scope">
                  <span style="color: red" v-if="tableData[scope.$index].payableAmount < 0">
                    {{tableData[scope.$index].payableAmount}}
                  </span>
                  <span v-else>
                    {{tableData[scope.$index].payableAmount}}
                  </span>
                </template>
              </el-table-column>
              <el-table-column label="自助支付（元）"  align="center">
                <template slot-scope="scope">
                  <span style="color: red" v-if="tableData[scope.$index].amount < 0">
                    {{tableData[scope.$index].amount}}
                  </span>
                  <span v-else>
                    {{tableData[scope.$index].amount}}
                  </span>
                </template>
              </el-table-column>
              <el-table-column label="顾问BRM编号" width="100"  align="center" prop="consultCode">
              </el-table-column>
              <el-table-column label="顾问姓名" width="100"  align="center" prop="consultantName">
              </el-table-column>
              <el-table-column label="操作记录"  align="center">
                 <template slot-scope="scope">
                    <span style="color: #ccc" v-if="tableData[scope.$index].state === -1">
                    已退款
                  </span>
                    <span style="color: #ccc" v-else-if="tableData[scope.$index].state === 1">
                    已使用
                  </span>
                   <span style="color: #ccc" v-else-if="tableData[scope.$index].state === 2">
                    退款中
                  </span>
                  <span style="color: blue" v-else>
                    未使用
                  </span>
                </template>
              </el-table-column>
            </el-table>
            <div class="custom-pagination">
              <div class="achievement-pagination-content">
                <el-pagination
                  @size-change="handleSizeChange"
                  @current-change="handleCurrentChange"
                  :current-page= 'pageNum'
                  :page-sizes="[10, 20, 50, 100]"
                  :page-size= 'pageSize'
                  layout="total, sizes, prev, pager, next, jumper"
                  :total='total'>
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
import { RadioGroup, Select, Option, Message, RadioButton, Cascader, Switch, DatePicker, Button, Table, TableColumn, Pagination, Input } from 'element-ui'
import listTable from 'base/list-table/list-table'
import { ERR_SUCCESS } from 'api/config'
import { formatCurrency, format } from 'common/js/util'
import { getPayList } from 'api/user'

export default {
  data() {
    return {
      selectData: '',
      orderStartDate: '',
      orderEndDate: '',
      startTime: '',
      timeData: [],
      endTime: '',
      state: '',
      opType: '',
      billno: '',
      mobile: '',
      brmid: '',
      thirdpartyTradeno: '',
      payWay: '',
      message: '',
      loading: false,
      StartTime: '',
      tableData: [],
      EndTime: '',
      pageNum: 1,
      pageSize: 10,
      total: 0,
      orderEndDateOptions: {
        disabledDate(time) {
          return false
        }
      }
    }
  },
  created() {
    // this.selectData = '-1'
    this._getPaymentList()
  },
  methods: {
    // 获取支付列表
    _getPaymentList() {
      const { thirdpartyTradeno, mobile, pageNum, pageSize, billno, payWay, opType, state, timeData, brmid } = this
      if (this.selectData === '') {
        this.startTime = ''
        this.endTime = ''
      } else if (this.selectData === '全部') {
        if (timeData && timeData.length > 0) {
          this.startTime = format(timeData[0], '$1-$2-$3 $4:$5:$6')
          this.endTime = format(timeData[1], '$1-$2-$3 $4:$5:$6')
        } else {
          this.startTime = ''
          this.endTime = ''
        }
      } else {
        this._getTime(this.selectData)
      }
      const { startTime, endTime } = this
      const obj = { thirdpartyTradeno, billno, mobile, pageNum, pageSize, startTime, endTime, payWay, opType, state, brmid }
      this.loading = true
      getPayList(obj).then(res => {
        if (res.code === ERR_SUCCESS) {
          const data = res.data
          this.loading = false
          this.tableData = data.dataList
          this.total = data.total
          this.message = res.data.statistics
        } else {
          Message.error(res.msg)
        }
      })
    },
    _formatPayWay(index, table) {
      const payway = table[index].payWay
      switch (payway) {
        case 1 || -1:
          return '微信支付'
        case 2 || -2:
          return '支付宝'
        case 3 || -3:
          return '银联'
        case 4 || -4:
          return '三方系统'
        case 0:
          return '正常'
      }
    },
    _formatOpType(index, table) {
      const optype = table[index].opType
      // switch (optype) {
      //   case -1:
      //     return '退款'
      //   case 0:
      //     return '自助支付'
      // }
      if (optype === -1) {
        return '退款'
      } else {
        return '收款'
      }
    },
    timeChange(type) {
      if (type === 'b') {
        this.orderStartDate = ''
        this.orderEndDate = ''
        this.timeData = []
      } else {
        this.selectData = '全部'
      }
      this._getPaymentList()
    },
    _getTime(num) {
      const time = new Date() - (num * 3600 * 24 * 1000)
      this.startTime = format(new Date(time), '$1-$2-$3') + ' 00:00:00'
      if (num === '1') {
        this.endTime = format((new Date() - 3600 * 24 * 1000), '$1-$2-$3') + ' 23:59:59'
      } else {
        this.endTime = format(new Date(), '$1-$2-$3') + ' 23:59:59'
      }
    },
    _formatCurrency(e) {
      return formatCurrency(e)
    },
    _queryData() { // 条件查询
      this.pageNum = 1
      this._getPaymentList()
    },
    handleSizeChange(val) { // 分页 设置多少条
      this.pageSize = val
      this._getPaymentList()
    },
    handleCurrentChange(val) { // 分页 设置多少条
      this.pageNum = val
      this._getPaymentList()
    },
    handleChange(value) {
      if (value === '退款') {
        this.opType = -1
      } else if (value === '收款') {
        this.opType = 0
      } else {
        this.opType = ''
      }
      this.pageNum = 1
      this._getPaymentList()
    }
  },
  watch: {
    $route() {
      const { path } = this.$route
      if (path === '/member/paymentRecord') {
        this._getPaymentList()
      }
    },
    startTime() {
      const d = new Date(this.startTime).getTime()
      this.orderEndDateOptions.disabledDate = (time) => {
        return time.getTime() < d
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
    listTable,
    Message
  }
}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~common/css/variable"
  @import "~common/css/mixin"
  @import "~common/css/elementCustom"
  .custom-page
    height 100%
    .logistics-title
      height 40px
      line-height 40px
      background-color #f2f2f2
      color #a4a4a4
      span
        margin-left 10px
        padding-left 10px
        font-size 14px
        border-left 2px solid #00bafa
  .custom-page-left
    height calc(100% - 40px)
    overflow-y auto
  .list-table-content
    padding 0 15px
  .custom-table
    margin-top 20px
    padding 0 15px
  .isTops
    height 30px
    width 30px
    display inline-block
    background url("../../static/isTop.png")
    background-size 100%
  .custom-pagination
    height 40px
    line-height 40px
    .achievement-pagination-content
      float right
      margin-top 20px
      height 40px
      padding-right 15px
  .preview
    cursor pointer
  .el-input
    width 22%
  .message
    margin 16px
    padding-top 20px
    border 1px solid #ccc
    padding 15px
</style>
