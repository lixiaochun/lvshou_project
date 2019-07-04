<template>
  <div class="custom-page">
    <p class="logistics-title"><span>赠送壹豆</span></p>
    <div class="custom-page-left">
      <div class="custom-page-left-content">
        <list-table title="收支记录" :border="true">
          <slot slot="query">
            <div style="background: #f2f2f2; height: 40px;">
               <div class="el-icon-search" style="margin:10px;font-size:18px"><span style="font-size:12px;padding:5px">筛选查询</span></div>
            </div>
            <div style="padding: 20px 20px">
                <div style="padding-top:20px">
                  <span  class="member-input-label">交易时间：</span>
                  <span >
                     <el-date-picker
                      v-model="timeTable"
                      style="width: 38%"
                      type="datetimerange"
                      range-separator="至"
                      size="mini"
                      :start-placeholder="startTime"
                      :end-placeholder="endTime"
                      >
                    </el-date-picker>
                  </span>
                </div>
                  <div style="padding-top:20px">
                      <span class="member-input-label">精准查询:</span>
                      <span> <el-input placeholder="赠送单号" size="mini" v-model.trim="id" clearable></el-input></span>
                       <span><el-input placeholder="会员姓名" size="mini" v-model.trim="name" clearable></el-input></span>
                      <span><el-input placeholder="会员手机" size="mini" v-model.trim="mobile" clearable></el-input></span>
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
              <el-table-column label="赠送单号" width="250" align="center" prop="id">
              </el-table-column>
                <el-table-column label="会员姓名" width="210" align="center" prop="name">
              </el-table-column>
              <el-table-column label="会员昵称" width="210"  align="center" prop="nickName">
              </el-table-column>
              <el-table-column label="会员手机" width="200"  align="center" prop="mobile">
              </el-table-column>
              <el-table-column label="赠送时间" width="200" prop="createTime" align="center">
              </el-table-column>
              <el-table-column label="赠送壹豆" width=""  align="center" prop="ebean">
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
import { getGiveEbeanList } from 'api/ebean'

export default {
  data() {
    return {
      id: '',
      name: '',
      mobile: '',
      message: '',
      loading: false,
      startTime: '',
      endTime: '',
      timeTable: [],
      pageNum: 1,
      pageSize: 10,
      tableData: [],
      message1: '',
      message2: '',
      total: 0
    }
  },
  created() {
    this._getGiveEbeanList()
  },
  methods: {
    // 获取支付列表
    _getGiveEbeanList() {
      const { id, mobile, name, timeTable, pageNum, pageSize } = this
      if (timeTable && timeTable.length > 0) {
        this.startTime = format(timeTable[0], '$1-$2-$3 $4:$5:$6')
        this.endTime = format(timeTable[1], '$1-$2-$3 $4:$5:$6')
      } else {
        this.startTime = format(new Date() - 24 * 3600 * 1000, '$1-$2-$3') + ' 00:00:00'
        this.endTime = format(new Date() - 24 * 3600 * 1000, '$1-$2-$3') + ' 23:59:59'
      }
      const { startTime, endTime } = this
      const obj = { mobile, pageNum, pageSize, startTime, endTime, id, name }
      this.loading = true
      getGiveEbeanList(obj).then(res => {
        if (res.code === ERR_SUCCESS) {
          const data = res.data.pageData
          const list = res.data.ebeanTotal
          this.loading = false
          this.tableData = data.dataList
          this.total = data.total
          this.pageNum = data.pageNum
          this.pageSize = data.pageSize
          this.message = `赠送：${list.ebean}壹豆，${list.count}笔`
        } else {
          Message.error(res.msg)
        }
      })
    },
    _formatCurrency(e) {
      return formatCurrency(e)
    },
    _queryData() { // 条件查询
      this.pageNum = 1
      this._getGiveEbeanList()
    },
    handleSizeChange(val) { // 分页 设置多少条
      this.pageSize = val
      this._getGiveEbeanList()
    },
    handleCurrentChange(val) { // 分页 设置多少条
      this.pageNum = val
      this._getGiveEbeanList()
    }
  },
  watch: {
    $route() {
      const { path } = this.$route
      if (path === '/member/beanGift') {
        this._getGiveEbeanList()
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
