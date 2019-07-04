<template>
  <div class="tag-manage-wrapper">
    <p class="title"><span>会员登录日志</span></p>
    <list-table title="标签管理" style="box-shadow: none; margin-top: 20px">
      <slot slot="query">
        <div class="member-header-query">
          <div class="member-header-item">
            <span class="label">会员姓名：</span>
            <div class="member-input-item">
              <el-input placeholder="请输入会员姓名" clearable v-model="queryObj.name" size="mini" ></el-input>
            </div>
          </div>
          <div class="member-header-item">
            <span class="label">会员昵称：</span>
            <div class="member-input-item">
              <el-input placeholder="请输入昵称" clearable v-model="queryObj.nickName" size="mini" ></el-input>
            </div>
          </div>
          <div class="member-header-item">
            <span class="label">注册手机：</span>
            <div class="member-input-item">
              <el-input placeholder="请输入手机号码" clearable v-model="queryObj.mobile" size="mini" ></el-input>
            </div>
          </div>
          <div class="member-header-item">
            <el-button size="mini" type="primary" @click="query" style="margin-top: 5px">查询</el-button>
            <el-button size="mini" @click="reset">重置</el-button>
          </div>
        </div>
      </slot>
      <div class="tag-manage">
        <!--<div class="table-header">-->
          <!--<span class="table-header-title">数据列表</span>-->
          <!--<el-button size="mini" style="float: right; margin-top: 8px; margin-right: 10px">导出</el-button>-->
        <!--</div>-->
        <el-table
          style="width: 100%;"
          :data="tableData"
          border
          stripe
          size="mini"
          header-row-class-name="element-headerRowClassName">
          <el-table-column label="会员编号"  width="" prop="id" align="center"></el-table-column>
          <el-table-column label="会员姓名" width="" prop="name"  sortable align="center"></el-table-column>
          <el-table-column label="昵称" width="" prop="nickName" align="center"></el-table-column>
          <el-table-column label="手机号" width="" prop="mobile" align="center"></el-table-column>
          <el-table-column label="APP平台" width="" prop="platform" align="center"></el-table-column>
          <el-table-column label="版本号" width="" prop="appVersion" align="center"></el-table-column>
          <el-table-column label="设备型号" width="" prop="deviceModel" align="center"></el-table-column>
          <el-table-column label="客户端版本" width="" prop="systemVersion" align="center"></el-table-column>
          <el-table-column label="最近一次访问时间" width="" prop="lastLogin" align="center"></el-table-column>
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
    <router-view></router-view>
  </div>
</template>

<script type="text/ecmascript-6">
import { Button, Input, Table, Pagination, TableColumn, Switch } from 'element-ui'
import listTable from 'base/list-table/list-table'
import { appLogingetList } from 'api/user'
import { ERR_SUCCESS } from 'api/config'
export default {
  data() {
    return {
      updateDataSelect: '',
      tableData: [],
      queryObj: {
        pageNum: 1,
        pageSize: 10,
        mobile: '',
        name: '',
        nickName: ''
      },
      total: 0
    }
  },
  created() {
    this._gettaskRewardConfigList()
  },
  methods: {
    changePage(key, num) {
      switch (key) {
        case 'pageSize':
          this.queryObj.pageSize = num
          this._gettaskRewardConfigList(num)
          break
        case 'pageNum':
          this.queryObj.pageNum = num
          this._gettaskRewardConfigList(num)
          break
        default:
          break
      }
    },
    query() {
      this._gettaskRewardConfigList()
    },
    _gettaskRewardConfigList() {
      const { pageNum, pageSize, mobile, name, nickName } = this.queryObj
      appLogingetList({ pageNum, pageSize, mobile, name, nickName }).then(res => {
        if (res.code === ERR_SUCCESS) {
          this.tableData = res.data.list
          this.total = res.data.count
        }
      })
    },
    reset() {
      this.queryObj.mobile = ''
      this.queryObj.name = ''
      this.queryObj.nickName = ''
      this._gettaskRewardConfigList()
    }
  },
  components: {
    [Switch.name]: Switch,
    [Input.name]: Input,
    [Table.name]: Table,
    [Pagination.name]: Pagination,
    [TableColumn.name]: TableColumn,
    [Button.name]: Button,
    listTable
  }
}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~common/css/variable"
  @import "~common/css/mixin"

  .tag-manage-wrapper
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
  .tag-manage
    margin 0 10px
  .table-header
    width 100%
    height 45px
    line-height 45px
    border 1px solid #ebeef5
    border-bottom none
    .table-header-title
      margin 0 10px
      font-size $font-size-md
      color $color-text
      inline-block-top()
    .table-header-button
      margin 0 10px
      float right
      width 120px
      height 45px
      text-align right
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
  .member-header-query
    padding 20px
    border 1px solid #f2f2f2
    font-size 0
  .member-header-item
    padding-right 1%
    width 24%
    height 40px
    line-height 40px
    inline-block-top()
    & > .label
      float left
      width 60px
      font-size $font-size-sm
      inline-block-top()
    & > .member-input-item
      display block
      margin-left 60px
      font-size $font-size-sm
</style>
