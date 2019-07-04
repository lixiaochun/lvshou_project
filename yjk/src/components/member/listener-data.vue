<template>
  <div class="custom-page">
    <p class="logistics-title"><span>倾听者通话数据统计</span></p>
    <div class="custom-page-left">
      <div class="custom-page-left-content">
        <list-table title="收支记录" :border="true">
          <slot slot="query">
            <div style="background: #f2f2f2; height: 40px;">
               <div class="el-icon-search" style="margin:10px;font-size:18px"><span style="font-size:12px;padding:5px">筛选查询</span></div>
            </div>
            <div style="padding: 20px 20px">
                <div style="padding-top:20px">
                  <span  class="member-input-label">选择时间：</span>
                  <span >
                     <el-date-picker
                      v-model="timeTable"
                      style="width: 38%"
                      type="datetimerange"
                      range-separator="至"
                      size="mini"
                      :start-placeholder="startTime"
                      :end-placeholder="endTime">
                    </el-date-picker>
                  </span>
                </div>
                  <div style="padding-top:20px">
                      <span class="member-input-label">精准查询:</span>
                      <span> <el-input placeholder="聊主账号" size="mini" v-model.trim="account" clearable></el-input></span>
                      <span><el-input placeholder="聊主昵称" size="mini" v-model.trim="nickname" clearable></el-input></span>
                      <span><el-button size="mini"  type="primary" style="margin-left: 10px;" @click="_queryData">查询</el-button></span>
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
              <el-table-column label="聊主昵称" width="" align="center" prop="nickname">
              </el-table-column>
                <el-table-column label="聊主账号" width="210" align="center" prop="account">
              </el-table-column>
              <el-table-column label="通话次数" width="130"  align="center" prop="count">
              </el-table-column>
              <el-table-column label="通话时长" width="210"  align="center">
                <template slot-scope="scope">
                   {{tableData[scope.$index].totalDuration}}分钟
                </template>
              </el-table-column>
              <el-table-column label="壹豆收益" width="200" prop="totalEbean" align="center">
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
import { format } from 'common/js/util'
import { getTotalInfoList } from 'api/ebean'

export default {
  data() {
    return {
      account: '',
      loading: false,
      timeTable: [],
      pageNum: 1,
      pageSize: 10,
      tableData: [],
      total: 0,
      message: '',
      nickname: '',
      startTime: '',
      endTime: ''
    }
  },
  created() {
    this._getTotalInfoList()
  },
  methods: {
    // 获取支付列表
    _getTotalInfoList() {
      const { timeTable, pageNum, pageSize, account, nickname } = this
      if (timeTable && timeTable.length > 0) {
        this.startTime = format(timeTable[0], '$1-$2-$3 $4:$5:$6')
        this.endTime = format(timeTable[1], '$1-$2-$3 $4:$5:$6')
      } else {
        this.startTime = format(new Date() - 24 * 3600 * 1000, '$1-$2-$3') + ' 00:00:00'
        this.endTime = format(new Date() - 24 * 3600 * 1000, '$1-$2-$3') + ' 23:59:59'
      }
      const { startTime, endTime } = this
      const obj = { pageNum, pageSize, startTime, endTime, account, nickname }
      this.loading = true
      getTotalInfoList(obj).then(res => {
        if (res.code === ERR_SUCCESS) {
          const data = res.data.pageData
          const list = res.data.total
          this.loading = false
          this.tableData = data.dataList
          this.total = data.total
          this.pageNum = data.pageNum
          this.pageSize = data.pageSize
          this.message = `通话总时长：${list.totalDuration}分钟，通话人次： ${list.totalPeopleCount}, 通话次数： ${list.mobileCount}`
        } else {
          Message.error(res.msg)
        }
      })
    },
    _queryData() { // 条件查询
      this.pageNum = 1
      this._getTotalInfoList()
    },
    handleSizeChange(val) { // 分页 设置多少条
      this.pageSize = val
      this._getTotalInfoList()
    },
    handleCurrentChange(val) { // 分页 设置多少条
      this.pageNum = val
      this._getTotalInfoList()
    }
  },
  watch: {
    $route() {
      const { path } = this.$route
      if (path === '/member/listenerData') {
        this._getTotalInfoList()
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
