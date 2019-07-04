<template>
  <div class="member-page">
    <p class="title"><span>解忧师服务订单</span></p>
    <div class="member-header">
      <list-table title="解忧师服务订单" :border="true" style="box-shadow: none;">
        <slot slot="query">
          <div class="member-header-query">
            <div>
                <div class="member-header-item">
                  <span class="label" style="width: 65px;">查询时段 ：</span>
                    <el-radio-group v-model="periodLabel" size="mini" @change='query'>
                      <el-radio-button :label="item.label" v-for="(item, index) in period" v-bind:key="'key' + index"></el-radio-button>
                    </el-radio-group>
                    <el-date-picker
                      size="mini"
                      v-model="datetimerange"
                      type="datetimerange"
                      range-separator="至"
                      start-placeholder="开始日期"
                      end-placeholder="结束日期"
                      @change='query'
                      style="vertical-align: middle;margin-left: 15px;">
                    </el-date-picker>
                </div>
            </div>
            <div>
                <div class="member-header-item">
                  <span class="label" style="width: 65px;">操作记录 ：</span>
                    <el-radio-group v-model="OrderRecordLabel" size="mini" @change='query'>
                      <el-radio-button :label="item.label" v-for="(item, index) in OrderRecord" v-bind:key="'key' + index"></el-radio-button>
                    </el-radio-group>
                </div>
            </div>
            <div>
                <div class="member-header-item">
                    <span class="label" style="width: 65px;">精准查询 ：</span>
                    <div class="member-input-item">
                      <el-input placeholder="请输入订单编号" v-model.trim="queryObj.orderNo" size="mini" clearable></el-input>
                    </div>
                    <div class="member-input-item" style="margin-left: 15px;">
                      <el-input placeholder="请输入会员编号" clearable v-model.trim="queryObj.userId" size="mini"  maxlength='300'></el-input>
                    </div>
                    <div class="member-input-item" style="margin-left: 15px;">
                      <el-input placeholder="请输入会员姓名" clearable v-model="queryObj.userName" size="mini" maxlength='300'></el-input>
                    </div>
                    <!-- <div class="member-input-item" style="margin-left: 15px;">
                      <el-input placeholder="请输入手机号" @input="changeMobile" v-model="queryObj.mobile" size="mini" type='number' maxlength="11"></el-input>
                    </div> -->
                </div>
                <div class="member-header-item">
                    <el-button size="mini" type="primary" @click="query" style="vertical-align: middle;">查询</el-button>
                </div>
            </div>
          </div>
        </slot>

        <div class="member-table">
          <el-table style="width: 100%;"
                    :data="tableData"
                    ref="multipleTable"
                    border
                    stripe
                    size="mini"
                    v-loading="loading"
                    header-row-class-name="element-headerRowClassName">
            <el-table-column label="订单编号" width="" prop="orderNo" align="center"></el-table-column>
             <el-table-column label="支付平台" width="" prop="payWayName" align="center"></el-table-column>
            <el-table-column label="会员编号" width="" prop="userId" align="center"></el-table-column>
            <el-table-column label="会员姓名" width="" prop="userName" align="center"></el-table-column>
            <!-- <el-table-column label="手机号码" width="" prop="mobile" align="center"></el-table-column> -->
            <el-table-column label="解忧师姓名" width="" prop="listenerNickname" align="center"></el-table-column>
            <el-table-column label="解忧师ID" width="120" prop="listenerId" align="center"></el-table-column>
            <el-table-column label="剩余时长" width="" prop="surplus" align="center"></el-table-column>
            <el-table-column label="服务时长" width="" prop="duration" align="center"></el-table-column>
            <el-table-column label="更新时间" width="120" prop="updateTime" align="center"></el-table-column>
            <el-table-column label="支付金额" width="120" align="center">
              <template slot-scope="scope">
                <div :scope='scope'>
                    {{scope.row.payAmount | formatCurrency}}
                </div>
              </template>
            </el-table-column>
            <el-table-column label="操作记录" width="100" prop="" align="center">
              <template slot-scope="scope">
                <div :scope='scope.row.state'>
                  <div style="color: #999999;">{{scope.row.operationRecordName}}</div>
                  <!-- <div :style="{color: parseFloat(scope.row.state) === -3 ? '#FF0000' : '#999999'}">{{scope.row.stateName}}</div> -->
                    <!-- <div style="color: #999999;">待支付</div>
                    <div style="color: #999999;">待发货</div>
                    <div style="color: #999999;">已完成</div>
                    <div style="color: #999999;">已取消</div>
                    <div style="color: #999999;">退款中</div>
                    <div style="color: #FF0000;">已退款</div> -->
                </div>
              </template>
            </el-table-column>
          </el-table>
          <div class="member-pagination">
            <div class="member-pagination-content">
              <el-pagination
                :page-sizes="[10, 20, 50, 100]"
                :page-size="queryObj.pageSize"
                :current-page="queryObj.pageNum"
                layout="total, sizes, prev, pager, next, jumper"
                @current-change="(n)=> this.changePage('pageNum', n)"
                @size-change="(n)=> this.changePage('pageSize', n)"
                @next-click="(n)=> this.changePage('pageNum', n)"
                @prev-click="(n)=> this.changePage('pageNum', n)"
                :total="total">
              </el-pagination>
            </div>
          </div>
        </div>
      </list-table>
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
import { OrderRecord, formatCurrency } from 'common/js/util'
import { getListenerServiceOrderList } from 'api/listener'
const TimeFormat = (t) => {
  const ten = ($t) => {
    return parseFloat($t) >= 10 ? $t : '0' + $t
  }
  const $r = '-'
  return {
    all: t.getFullYear() + $r + ten(t.getMonth() + 1) + $r + ten(t.getDate()) + ' ' + ten(t.getHours()) + ':' + ten(t.getMinutes()) + ':' + ten(t.getSeconds()),
    year: t.getFullYear() + $r + ten(t.getMonth() + 1) + $r + ten(t.getDate()),
    hours: ten(t.getHours()) + ':' + ten(t.getMinutes()) + ':' + ten(t.getSeconds())
  }
}
// 前几天
const getData = (s = 0, e = 0) => {
  const end = new Date()
  const start = new Date()
  const endTime = new Date(end.getTime() - 3600 * 1000 * 24 * s)
  const $end = TimeFormat(endTime).year + ' ' + '23:59:59'
  const startTime = new Date(start.getTime() - 3600 * 1000 * 24 * e)
  const $start = TimeFormat(startTime).year + ' ' + '00:00:00'
  return {
    endTime: $end,
    startTime: $start
  }
}

export default {
  data() {
    return {
      startTime: '',
      endTime: '',
      loading: false,
      state: 1,
      queryObj: {
        startTime: '',
        endTime: '',
        operationRecord: '',
        orderNo: '',
        userId: '',
        userName: '',
        mobile: '',
        pageNum: 1,
        pageSize: 10
      },
      isChangeDate: true, // true 时段 false查询时段 时间
      datetimerange: '', // 查询时段 时间
      periodLabel: '全部', // 时段
      period: [
        {
          label: '全部',
          startTime: '',
          endTime: ''
        },
        {
          label: '今天',
          startTime: getData().startTime,
          endTime: getData().endTime
        },
        {
          label: '昨天',
          startTime: getData(1, 1).startTime,
          endTime: getData(1, 1).endTime
        },
        {
          label: '最近7天',
          startTime: getData(0, 7).startTime,
          endTime: getData(0, 7).endTime
        }
      ],
      OrderRecordLabel: '全部', // 订单状态
      // 订单状态（-3已退款;-2=退款中;-1=已取消;100=待支付,200=待发货 ,400=已完成）
      OrderRecord: [],
      options: [],
      labelid: '',
      total: 0,
      tableData: []
    }
  },
  created() {
    this.query()
    this.OrderRecord = OrderRecord
    this.updateDataSelect = []
  },
  methods: {
    query() {
      this.allCheck = false
      this._getListenerServiceOrderList('reset')
    },
    changeMobile(e) {
      if (e === '') {
        Message.error('请输入正确的手机号')
      }
      if (e.length < 11) {
        return e
      }
      const reg = /^1[3456789]{1}\d{9}$/g
      if (!reg.test(e)) {
        Message.error('请输入正确的手机号')
      }
      setTimeout(() => {
        this.queryObj.mobile = ('' + e).substring(0, 11)
      }, 100)
    },
    changePage(key, num) {
      switch (key) {
        case 'pageSize':
          this.queryObj.pageSize = num
          this._getListenerServiceOrderList()
          break
        case 'pageNum':
          this.queryObj.pageNum = num
          this._getListenerServiceOrderList()
          break
        default:
          break
      }
    },
    _getListenerServiceOrderList(e) {
      // let reg = /^1[3456789]{1}\d{9}$/g
      // if (this.queryObj.mobile && !reg.test(this.queryObj.mobile) && this.queryObj.mobile !== '') {
      //   Message.error('请输入正确的手机号')
      //   return false
      // }
      if (e) {
        this.queryObj.pageNum = 1
      }
      this.loading = true
      if (this.queryObj.userName && this.queryObj.userName !== ''){
        this.queryObj.userName = this.queryObj.userName.replace(/(^\s*)|(\s*$)/g, '')
      }
      getListenerServiceOrderList(this.queryObj).then(res => {
        if (res.code === ERR_SUCCESS) {
          this.tableData = res.data.dataList
          this.total = res.data.total
        } else {
          Message.error(res.msg)
        }
        this.loading = false
      })
    }
  },
  watch: {
    allCheck() {
      if (this.allCheck) {
        this.tableData.forEach(row => {
          this.$refs.multipleTable.toggleRowSelection(row)
        })
        this.updateDataSelect = this.tableData
      } else {
        this.$refs.multipleTable.clearSelection()
      }
    },
    periodLabel(value) {
      if (value !== '') {
        this.datetimerange = ''
        this.period.forEach(elem => {
          if (elem.label === value) {
            this.queryObj.startTime = elem.startTime
            this.queryObj.endTime = elem.endTime
          }
        })
      }
    },
    datetimerange(value) {
      if (value !== '') {
        this.periodLabel = ''
        const start = new Date(value[0])
        const end = new Date(value[1])
        this.queryObj.startTime = TimeFormat(start).all
        this.queryObj.endTime = TimeFormat(end).all
      }
    },
    OrderRecordLabel(value) {
      this.OrderRecord.forEach(elem => {
        if (elem.label === value) {
          this.queryObj.operationRecord = elem.value
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
      return $value === 'invalid value' ? '' : v + $value
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
