<template>
  <div class="custom-page">
    <p class="logistics-title"><span>支付记录</span></p>
    <div class="custom-page-left">
      <div class="custom-page-left-content">
        <list-table title="收支记录" :border="true">
          <slot slot="query">
            <div style="background: #f2f2f2; height: 40px;">
               <div class="el-icon-search" style="margin:10px;font-size:18px"><span style="font-size:12px;padding:5px">筛选查询</span></div>
            </div>
            <div style="padding: 20px 20px">
                 <div>
                  <span class="member-input-label">交易类型：</span>
                  <el-radio-group v-model="radioPay" size="mini" @change="handleChange">
                    <el-radio-button
                    v-for="(item,index) in paymentList"
                    :key="index"
                    :label="item.label"
                    :value="item.value"></el-radio-button>
                </el-radio-group>
                </div>
                <div style="padding-top:20px">
                  <span  class="member-input-label">支付方式：</span>
                  <span >
                   <el-select v-model="payWay" placeholder="请选择" size="mini">
                    <el-option
                      v-for="item in options"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value">
                    </el-option>
                              </el-select>
                  </span>
                </div>
                <div style="padding-top:20px">
                  <span  class="member-input-label">交易时间：</span>
                  <span >
                     <!-- <el-date-picker
                      v-model="timeData"
                      style="width: 38%"
                      type="daterange"
                      range-separator="至"
                      size="mini"
                      start-placeholder="开始日期"
                      end-placeholder="结束日期"
                      :pickerOptions="pickerOptions">
                    </el-date-picker> -->
                     <el-date-picker type="date" size="mini" v-model="startTime" placeholder="起始时间" style="width: 160px;">
                    </el-date-picker>
                    -
                    <el-date-picker type="date" size="mini" v-model="endTime" placeholder="结束时间" style="width: 160px;">
                    </el-date-picker>
                  </span>
                </div>
                  <div style="padding-top:20px">
                      <span class="member-input-label">精准查询:</span>
                      <span> <el-input placeholder="请输入支付单号" size="mini" v-model.trim="billno"></el-input></span>
                      <span><el-input placeholder="请输入交易单号" size="mini" v-model.trim="thirdpartyTradeno"></el-input></span>
                      <span><el-input placeholder="请输入付款人手机" size="mini" v-model.trim="mobile" clearable></el-input></span>
                      <span><el-button size="mini"  type="primary" style="margin-left: 10px;" @click="_queryData">查询</el-button></span>
                      <span><el-button size="mini"  type="primary" style="margin-left: 10px;" @click="_getExportInfo()">导出</el-button></span>
                  </div>
                </div>
          </slot>
          <div class="message">{{message}}</div>
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
                <el-table-column label="交易单号" width="210" align="center" prop="thirdpartyTradeno">
              </el-table-column>
              <el-table-column label="商户号" width="130"  align="center" prop="mchid">
              </el-table-column>
              <el-table-column label="交易类型" width="120"  align="center">
                <template slot-scope="scope">
                    {{_formatOpType(scope.$index, tableData)}}
                </template>
              </el-table-column>
              <el-table-column label="支付平台" width="100" prop="" align="center">
                <template slot-scope="scope">
                    {{_formatPayWay(scope.$index, tableData)}}
                </template>
              </el-table-column>
              <el-table-column label="支付渠道" width="100"  align="center">
                <template slot-scope="scope">
                   {{tableData[scope.$index].payEntrance === 1?'APP':'小程序'}}
                </template>
              </el-table-column>
              <el-table-column label="付款人姓名" width="100"  align="center" prop="userName">
              </el-table-column>
               <el-table-column label="付款人手机号" width="100"  align="center" prop="mobile">
              </el-table-column>
              <el-table-column label="交易时间"  prop="createTime" align="center">
              </el-table-column>
              <el-table-column label="交易金额(元)" width="100" prop="createName" align="center">
                <template slot-scope="scope">
                  <span style="color: red" v-if="tableData[scope.$index].amount < 0">
                    {{tableData[scope.$index].amount}}
                  </span>
                  <span v-else>
                    {{tableData[scope.$index].amount}}
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
import {RadioGroup, Select, Option, Message, RadioButton, Cascader, Switch, DatePicker, Button, Table, TableColumn, Pagination, Input} from 'element-ui'
import listTable from 'base/list-table/list-table'
import { ERR_SUCCESS } from 'api/config'
import { formatCurrency, format } from 'common/js/util'
import { getPaymentList } from 'api/user'
import axios from 'axios'

export default {
  data () {
    return {
      opType: '',
      radioPay: '全部',
      paymentList: [{
        label: '全部',
        value: ''
      }, {
        label: '自助支付',
        value: 0
      }, {
        label: '退款',
        value: -1
      }],
      mobile: '',
      billno: '',
      thirdpartyTradeno: '',
      payWay: '',
      message: '',
      loading: false,
      startTime: '',
      endTime: '',
      StartTime: '',
      EndTime: '',
      pageNum: 1,
      pageSize: 10,
      tableData: [],
      total: 0,
      pickerOptions: {
        disabledDate (time) {
          return time.getTime() < Date.now() - (60 * 60 * 1000 * 24 * 60)
        }
      },
      options: [{
        value: '',
        label: '全部'
      }, {
        value: 1,
        label: '微信'
      }, {
        value: 2,
        label: '支付宝'
      }]
    }
  },
  // computed: {
  //   showRed (index, table) {
  //     if (table[index].amount < 0) {
  //       return `color: red`
  //     }
  //   }
  // },
  created () {
    this._getPaymentList()
  },
  methods: {
    // 获取支付列表
    _getPaymentList () {
      const {opType, thirdpartyTradeno, mobile, pageNum, pageSize, startTime, endTime, billno, payWay} = this
      let StartTime = ''
      let EndTime = ''
      if (!startTime) {
        this.startTime = format(Date.now() - 60 * 60 * 1000 * 24 * 7, '$1-$2-$3')
        StartTime = format(Date.now() - 60 * 60 * 1000 * 24 * 7, '$1-$2-$3') + ' 00:00:00'
      } else {
        this.startTime = format(startTime, '$1-$2-$3')
        StartTime = format(startTime, '$1-$2-$3') + ' 00:00:00'
      }
      if (!endTime) {
        this.endTime = format(Date.now(), '$1-$2-$3')
        EndTime = format(Date.now(), '$1-$2-$3') + ' 23:59:59'
      } else {
        this.endTime = format(endTime, '$1-$2-$3')
        EndTime = format(endTime, '$1-$2-$3') + ' 23:59:59'
      }
      const obj = {opType, thirdpartyTradeno, billno, mobile, pageNum, pageSize, startTime: StartTime, endTime: EndTime, payWay}
      this.loading = true
      getPaymentList(obj).then(res => {
        if (res.code === ERR_SUCCESS) {
          let data = res.data.pageDate
          this.loading = false
          this.tableData = data.dataList
          this.total = data.total
          this.message = res.data.statistics
        } else {
          Message.error(res.msg)
        }
      })
    },
    _getExportInfo () {
      const {opType, thirdpartyTradeno, mobile, startTime, endTime, billno, payWay} = this
      let StartTime = ''
      let EndTime = ''
      if (!startTime) {
        this.startTime = format(Date.now() - 60 * 60 * 1000 * 24 * 7, '$1-$2-$3')
        StartTime = format(Date.now() - 60 * 60 * 1000 * 24 * 7, '$1-$2-$3') + ' 00:00:00'
      } else {
        this.startTime = format(startTime, '$1-$2-$3')
        StartTime = format(startTime, '$1-$2-$3') + ' 00:00:00'
      }
      if (!endTime) {
        this.endTime = format(Date.now(), '$1-$2-$3')
        EndTime = format(Date.now(), '$1-$2-$3') + ' 23:59:59'
      } else {
        this.endTime = format(endTime, '$1-$2-$3')
        EndTime = format(endTime, '$1-$2-$3') + ' 23:59:59'
      }
      const url = `/yjk-operation/appPaybillTrace/exportInfo/?startTime=${StartTime}&endTime=${EndTime}&opType=${opType}&thirdpartyTradeno=${thirdpartyTradeno}&mobile=${mobile}&billno=${billno}&payWay=${payWay}`
      axios({
        method: 'GET',
        url: url,
        responseType: 'blob'
      }).then(response => {
        this.download(response)
      }).catch()
    },
    download (data) {
      let self = this
      if (!data) {
        return
      }
      let url = window.URL.createObjectURL(new Blob([data.data], {type: 'application/octet-stream'}))
      let link = document.createElement('a')
      link.style.display = 'none'
      link.href = url
      link.setAttribute('download', `${self.StartTime}-${self.EndTime}交易支付记录.xls`)
      document.body.appendChild(link)
      link.click()
    },
    _formatPayWay (index, table) {
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
    _formatOpType (index, table) {
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
        return '自助支付'
      }
    },
    _formatCurrency (e) {
      return formatCurrency(e)
    },
    _queryData () { // 条件查询
      this.pageNum = 1
      this._getPaymentList()
    },
    handleSizeChange (val) { // 分页 设置多少条
      this.pageSize = val
      this._getPaymentList()
    },
    handleCurrentChange (val) { // 分页 设置多少条
      this.pageNum = val
      this._getPaymentList()
    },
    handleChange (value) {
      // console.log(value)
      if (value === '退款') {
        this.opType = -1
      } else if (value === '自助支付') {
        this.opType = 0
      } else {
        this.opType = ''
      }
      this._getPaymentList()
    }
  },
  watch: {
    $route () {
      const { path } = this.$route
      if (path === '/member/payment') {
        this._getPaymentList()
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
</style>
