<template>
  <div class="msg-list">
      <p class="title"><span>客服聊天记录查询</span>
     <div class="msg-header">
       <list-table title="记录查询列表" :border="true" style="box-shadow:none">
         <slot slot="query">
           <div class="msg-header-query" style="margin-top:10px">
               <div class="firstRow">
                <div class="msg-header-item">
                  <span class="label">客服账号:</span>
                  <div class="msg-input-item">
                     <el-input v-model="account" placeholder="请输入客服账号" size="mini" style="with:70%" clearable></el-input>
                  </div>
              </div>
               <!-- <div class="msg-header-item">
                  <span class="label">顾问姓名:</span>
                  <div class="msg-input-item">
                     <el-input v-model="consultantName" placeholder="请输入顾问姓名" size="mini" clearable></el-input>
                  </div>
              </div> -->
              <div class="msg-header-item">
                  <span class="label">客户ID:</span>
                  <div class="msg-input-item">
                     <el-input v-model="appUserId" placeholder="请输入壹邦客户ID" size="mini"
                     style="with:70%" clearable></el-input>
                  </div>
              </div>
              <div class="msg-header-item">
                  <span class="label">客户姓名:</span>
                  <div class="msg-input-item">
                     <el-input v-model="appUserName" placeholder="请输入客户姓名" size="mini" clearable></el-input>
                  </div>
              </div>
              <div class="msg-header-item">
                  <span class="label">时间段:</span>
                  <div class="msg-input-item">
                      <el-date-picker
                      v-model="timeData"
                      style="width: 100%"
                      type="daterange"
                      range-separator="至"
                      size="mini"
                      :start-placeholder="startTime"
                      :end-placeholder="endTime">
                    </el-date-picker>
                  </div>
              </div>
              <div class="msg-header-item" style="width:10%;margin-top:4px;">
                 <el-button size="mini" @click="_queryData" type="primary">查询</el-button>
              </div>
              </div>
           </div>
         </slot>
         <div class="msg-table">
            <div style=" border:1px solid #ebeef5;border-bottom:none;height:50px">
               <div style="margin:10px;font-size:18px"><span style="font-size:14px;">数据列表</span>
               </div>
            </div>
              <el-table style="width: 100%;"
                    :data="tableData"
                    ref="multipleTable"
                    border
                    stripe
                    size="mini"
                    v-loading="loading"
                    header-row-class-name="element-headerRowClassName">
            <el-table-column align="center">
              <template slot-scope="scope">
                <span>{{scope.$index + 1}}</span>
              </template>
            </el-table-column>
            <el-table-column label="客服账号" align="center" prop="csUserAccount">
            </el-table-column>
            <el-table-column label="客服姓名"  width="" prop="csUserName" align="center"></el-table-column>
            <el-table-column label="客户ID"  width="" prop="appUserId" align="center"></el-table-column>
            <el-table-column label="客户姓名"  prop="appUserName" align="center">
            </el-table-column>
            <el-table-column label="条数"  prop="msgCount" align="center">
            </el-table-column>
              <el-table-column label="操作" align="center">
                <template slot-scope="scope">
                  <el-button
                  @click.native.prevent="search(scope.$index, tableData)"
                  type="text"
                  size="small"
                  ><span>查看</span></el-button>
                </template>
            </el-table-column>
        </el-table>
         <div class="msg-pagination">
             <div  class="msg-pagination-content">
              <el-pagination
                :page-sizes="[10, 20, 50, 100]"
                :page-size="pageSize"
                :current-page="pageNum"
                layout="total, sizes, prev, pager, next, jumper"
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
                :total="total">
              </el-pagination>
             </div>
            </div>
            <!-- <router-view></router-view> -->
            <div v-if="dialogVisible">
            <c-dialog  title="聊天记录查询"
            :visible.sync="dialogVisible"
            @close="goBack"
            >
            <div class="manage-item">
          <div class="message-page">
                <el-tabs type="border-card"
                style="border:none;box-shadow:none;"
                v-model="activeName"  @tab-click="handleClick">
                <el-tab-pane label="全部" name="全部">
                <all-record :listObj='listObj'></all-record>
                </el-tab-pane>
                <el-tab-pane label="图片" name="图片">
                    <pic-record :listObj='listObj' v-if="name === '图片'"></pic-record>
                </el-tab-pane>
                <el-tab-pane label="语音" name="语音">
                    <voice-record :listObj='listObj' v-if="name === '语音'"></voice-record>
                </el-tab-pane>
                <el-tab-pane label="视频" name="视频">
                    <video-record :listObj='listObj' v-if="name === '视频'"></video-record>
                </el-tab-pane>
                </el-tabs>
            </div>
          </div>
         </c-dialog>
      </div>
        </div>
       </list-table>
     </div>
  </div>
</template>

<script type="text/ecmascript-6">
import {
  Input, Button, Table, TableColumn, DatePicker,
  Pagination, Select, Option, Message, Tabs, TabPane
} from 'element-ui'
import cDialog from 'base/c-dialog/c-dialog'
import listTable from 'base/list-table/list-table'
import { getCsmsgList } from 'api/customerChat'
import { format } from 'common/js/util'
import { ERR_SUCCESS } from 'api/config'
import PicRecord from './customer-record-pic'
import AllRecord from './customer-record-all'
import VoiceRecord from './customer-record-voice'
import VideoRecord from './customer-record-video'
export default {
  data() {
    return {
      pageNum: 1,
      pageSize: 10,
      total: 0,
      appUserName: '',
      appUserId: '',
      account: '',
      dialogVisible: false,
      activeName: '全部',
      loading: false,
      listObj: {},
      tableData: [],
      name: '',
      startTime: '',
      endTime: '',
      timeData: [],
      StartTime: '',
      EndTime: ''
    }
  },
  created() {
    this._getCsmsgList()
  },
  methods: {
    handleClick(tab) {
      this.name = tab.name
    },
    _queryData() {
      this._getCsmsgList()
    },
    goBack() {
      this.dialogVisible = false
    },
    _getCsmsgList() {
      this.loading = true
      const { account, appUserId, appUserName, timeData, pageNum, pageSize } = this
      if (timeData && timeData.length > 0) {
        this.startTime = format(timeData[0], '$1-$2-$3')
        this.endTime = format(timeData[1], '$1-$2-$3')
      } else {
        this.startTime = format(new Date(), '$1-$2-$3')
        this.endTime = format(new Date(), '$1-$2-$3')
      }
      const sTime = this.startTime + ' 00:00:00'
      const eTime = this.endTime + ' 23:59:59'
      this.StartTime = new Date(sTime.replace(/-/g, '/')).getTime()
      this.EndTime = new Date(eTime.replace(/-/g, '/')).getTime()
      const { StartTime, EndTime } = this
      getCsmsgList({ account, appUserId, appUserName, startTime: StartTime, endTime: EndTime, pageNum, pageSize }).then(res => {
        if (res.code === ERR_SUCCESS) {
          const result = res.data
          this.tableData = result.dataList
          this.total = result.total
          this.loading = false
        }
      }).catch((err) => {
        Message.error(err)
      })
    },
    search(index, list) {
      this.loading = false
      this.dialogVisible = true
      const data = list[index]
      const appUserId = data.appUserId
      const csId = data.csId
      const { StartTime, EndTime } = this
      this.listObj = { appUserId, csId, StartTime, EndTime }
    },
    handleSizeChange(val) {
      this.pageSize = val
      this._getCsmsgList()
    },
    handleCurrentChange(val) {
      this.pageNum = val
      this._getCsmsgList()
    }
  },
  components: {
    [Input.name]: Input,
    [Button.name]: Button,
    [Select.name]: Select,
    [Option.name]: Option,
    [Table.name]: Table,
    [TableColumn.name]: TableColumn,
    [Pagination.name]: Pagination,
    [Message.name]: Message,
    [cDialog.name]: cDialog,
    [Tabs.name]: Tabs,
    [TabPane.name]: TabPane,
    [DatePicker.name]: DatePicker,
    listTable,
    PicRecord,
    AllRecord,
    VoiceRecord,
    VideoRecord
  }
}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~common/css/variable"
  @import "~common/css/mixin"
  @import "~common/css/elementCustom"

  .msg-list
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
      & >>>.el-dialog__body
        padding 0
     .msg-header
       position relative
      .manage-item
        width 900px
        overflow-y auto
        overflow-x hidden
      .message-page
        width 900px
        height 500px
        margin 0 auto
        padding-bottom 40px
       .msg-header-query
         width 96%
         margin 0 auto;
         font-size 0
         .msg-header-item
           padding-right 1%
           width 21%
           height 40px
           line-height 40px
           inline-block-top()
           & > .label
            float left
            width 60px
            font-size $font-size-sm
            inline-block-top()
           & > .msg-input-item
            display block
            margin-left 60px
            font-size $font-size-sm
           & > .el-cascader.el-cascader--mini
            position absolute
            top 47px
            width 17%
        .el-icon-caret-right
          width 100px
          height 100px
          position  absolute
          cursor pointer
          &:before
            position absolute
            top 35%
            left 35%
            font-size 35px
        .msg-button
          display inline-block
          padding-top 5px
          height 28px
          text-align center
          button
            margin-right 25px
            width 150px
       .msg-table
         padding 0 10px
         .add
           position absolute
           right 28px
           top 158px
       .msg-pagination
          padding 21px 0
          height 32px
          line-height 32px
          border 1px solid #ebeef5
          border-top none
          overflow hidden
         .msg-pagination-select
           inline-block-top()
         .msg-pagination-checkbox
           width 34px
           height 32px
           line-height 32px
           text-align center
           inline-block-top()
         .msg-pagination-content
           float right
           margin-right 20px
           inline-block-top()
</style>
