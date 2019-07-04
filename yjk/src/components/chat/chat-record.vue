<template>
  <div class="msg-list">
      <p class="title"><span>顾问历史记录查询</span>
     <div class="msg-header">
       <list-table title="记录查询列表" :border="true" style="box-shadow:none">
         <slot slot="query">
           <div class="msg-header-query" style="margin-top:10px">
               <div class="firstRow">
                <div class="msg-header-item">
                  <span class="label">顾问账号:</span>
                  <div class="msg-input-item">
                     <el-input v-model.trim="username" placeholder="请输入顾问账号" size="mini" clearable></el-input>
                  </div>
              </div>
               <div class="msg-header-item">
                  <span class="label">顾问姓名:</span>
                  <div class="msg-input-item">
                     <el-input v-model.trim="consultantName" placeholder="请输入顾问姓名" size="mini" clearable></el-input>
                  </div>
              </div>
              <div class="msg-header-item">
                  <span class="label">客户ID:</span>
                  <div class="msg-input-item">
                     <el-input v-model.trim="appUserId" placeholder="请输入客户ID" size="mini"
                     style="with:80%" clearable></el-input>
                  </div>
              </div>
              <div class="msg-header-item">
                  <span class="label">客户姓名:</span>
                  <div class="msg-input-item">
                     <el-input v-model.trim="appUserName" placeholder="请输入客户姓名" size="mini" clearable></el-input>
                  </div>
              </div>
              </div>
              <div class="firstRow">
                <div class="msg-header-item">
                  <span class="label">聊天句数:</span>
                  <div class="msg-input-item">
                     <el-input v-model.trim="startMsg" size="mini" style="width:48%" @input="changeStart"></el-input>
                     -
                      <el-input v-model.trim="endMsg" size="mini" style="width:45%"
                    @input="changeEnd"></el-input>
                  </div>
              </div>
               <div class="msg-header-item">
                  <span class="label">时间段:</span>
                  <div class="msg-input-item">
                      <el-date-picker
                      v-model="timeData"
                      style="width: 220px"
                      type="daterange"
                      range-separator="至"
                      size="mini"
                      :picker-options="pickerOptions"
                      :start-placeholder="startTime"
                      :end-placeholder="endTime">
                    </el-date-picker>
                  </div>
              </div>
               <div class="msg-header-item">
                  <span class="label">客户编号:</span>
                  <div class="msg-input-item">
                     <el-input v-model.trim="brmid" placeholder="请输入客户编号" size="mini" clearable></el-input>
                  </div>
              </div>
               <div class="msg-button">
                <el-button size="mini" @click="_queryData" type="primary">查询</el-button>
              </div>
                <div class="msg-button export">
                <el-button size="mini" @click.native.prevent="_getExcel">导出</el-button>
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
            <!-- <el-table-column align="center">
              <template slot-scope="scope">
                <span>{{scope.$index + 1}}</span>
              </template>
            </el-table-column> -->
            <el-table-column label="顾问账号" align="center" prop="username">
            </el-table-column>
            <el-table-column label="顾问姓名"  width="" prop="consultName" align="center"></el-table-column>
            <el-table-column label="客户ID"  width="" prop="userid" align="center"></el-table-column>
            <el-table-column label="客户编号"  width="" prop="brmid" align="center"></el-table-column>
            <el-table-column label="客户姓名"  prop="appUserName" align="center">
            </el-table-column>
            <el-table-column  label="聊天句数"  width="" prop="msgCount" align="center">
            </el-table-column>
             <el-table-column label="敏感词" width="" prop="sensitiveCount" align="center">
            </el-table-column>
             <el-table-column label="图片" width="" prop="picCount" align="center" >
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
                :total="total"
                v-show="show"
               >
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
                    v-model="activeName" @tab-click="handleClick">
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
                  <el-tab-pane label="敏感词" name="敏感词">
                    <sensitive-record :listObj='listObj' v-if="name === '敏感词'"></sensitive-record>
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
  Input, Button, DatePicker, Table, TableColumn,
  Pagination, Select, Option, Message, Tabs, TabPane
} from 'element-ui'
import cDialog from 'base/c-dialog/c-dialog'
import listTable from 'base/list-table/list-table'
import { getMsgList } from 'api/imRptConsult'
import { format } from 'common/js/util'
import { ERR_SUCCESS } from 'api/config'
import PicRecord from './chat-record-pic'
import AllRecord from './chat-record-all'
import VoiceRecord from './chat-record-voice'
import VideoRecord from './chat-record-video'
import SensitiveRecord from './chat-record-sensitive'
import axios from 'axios'
export default {
  data() {
    return {
      startTime: '',
      endTime: '',
      pageNum: 1,
      pageSize: 10,
      brmid: '',
      total: 0,
      appUserName: '',
      appUserId: '',
      username: '',
      consultantName: '',
      startMsg: '',
      dialogVisible: false,
      activeName: '全部',
      endMsg: '',
      tableData: [],
      timeData: [],
      loading: false,
      listObj: {},
      name: '',
      show: true,
      pickerOptions: {
        disabledDate(time) {
          return time.getTime() > Date.now() - 24 * 3600 * 1000
        }
      }
    }
  },
  created() {
    this._getMsgList()
  },
  methods: {
    handleClick(tab) {
      this.name = tab.name
    },
    _queryData() {
      this._getMsgList()
    },
    goBack() {
      this.dialogVisible = false
    },
    _getMsgList() {
      this.loading = true
      const { e } = this.$route.query
      if (e === 1) {
        const { username, startTime, endTime } = this.$route.query
        this.username = username
        this.startTime = startTime
        this.endTime = endTime
      } else {
        if (this.timeData && this.timeData.length > 0) {
          this.startTime = format(this.timeData[0], '$1-$2-$3')
          this.endTime = format(this.timeData[1], '$1-$2-$3')
        } else {
          this.startTime = format(new Date() - 24 * 3600 * 1000, '$1-$2-$3')
          this.endTime = format(new Date() - 24 * 3600 * 1000, '$1-$2-$3')
        }
        if (parseInt(this.startMsg) > parseInt(this.endMsg) && this.endMsg > 0) {
          const start = this.startMsg
          const end = this.endMsg
          this.endMsg = start
          this.startMsg = end
        } else if (this.endMsg === '' && this.startMsg > 0) {
          this.endMsg = 10000
        } else if (this.startMsg === '' && this.endMsg > 0) {
          this.startMsg = 1
        }
      }
      const { consultantName, username, pageNum, pageSize, appUserName, appUserId, startMsg, endMsg, startTime, endTime, brmid } = this
      getMsgList({ consultantName, username, pageNum, pageSize, appUserName, appUserId, startMsg, endMsg, startTime, endTime, brmid }).then(res => {
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
    _getExcel() {
      const { consultantName, username, pageNum, pageSize, timeData, appUserName, appUserId, startMsg, endMsg, brmid } = this
      if (timeData && timeData.length > 0) {
        this.startTime = format(timeData[0], '$1-$2-$3')
        this.endTime = format(timeData[1], '$1-$2-$3')
      } else {
        this.startTime = format(new Date() - 24 * 3600 * 1000, '$1-$2-$3')
        this.endTime = format(new Date() - 24 * 3600 * 1000, '$1-$2-$3')
      }
      const { startTime, endTime } = this
      const url = `/yjk-operation/imRptMsg/exprorExcel/?startTime=${startTime}&endTime=${endTime}&consultantName=${consultantName}&username=${username}&appUserName=${appUserName}&appUserId=${appUserId}&startMsg=${startMsg}&endMsg=${endMsg}&pageSize=${pageSize}&pageNum=${pageNum}&brmid=${brmid}`
      axios({
        method: 'post',
        url: url,
        responseType: 'blob'
      }).then(response => {
        this.download(response)
      }).catch()
    },
    download(data) {
      const self = this
      if (!data) {
        return
      }
      const url = window.URL.createObjectURL(new Blob([data.data], { type: 'application/octet-stream' }))
      const link = document.createElement('a')
      link.style.display = 'none'
      link.href = url
      link.setAttribute('download', `${self.startTime}-${self.endTime}聊天记录.xls`)
      document.body.appendChild(link)
      link.click()
    },
    search(index, list) {
      this.loading = false
      this.dialogVisible = true
      const data = list[index]
      const userid = data.userid
      const consultantId = data.consultid
      const { username, startTime, endTime } = this
      this.listObj = { userid, consultantId, username, startTime, endTime }
    },
    handleSizeChange(val) {
      this.pageSize = val
      this._getMsgList()
    },
    handleCurrentChange(val) {
      this.pageNum = val
      this._getMsgList()
    },
    changeStart(e) {
      setTimeout(() => {
        if (this.startMsg >= 0) {
          this.startMsg = e.replace(/[^0-9]/g, '')
        } else {
          this.startMsg = e.replace(/[^1-9]/g, '')
        }
      }, 20)
    },
    changeEnd(e) {
      setTimeout(() => {
        if (this.endMsg > 1) {
          this.endMsg = e.replace(/[^0-9]/g, '')
        } else {
          this.endMsg = e.replace(/[^1-9]/g, '')
        }
      }, 20)
    }
  },
  components: {
    [Input.name]: Input,
    [Button.name]: Button,
    [Select.name]: Select,
    [Option.name]: Option,
    [DatePicker.name]: DatePicker,
    [Table.name]: Table,
    [TableColumn.name]: TableColumn,
    [Pagination.name]: Pagination,
    [Message.name]: Message,
    [cDialog.name]: cDialog,
    [Tabs.name]: Tabs,
    [TabPane.name]: TabPane,
    listTable,
    PicRecord,
    AllRecord,
    VoiceRecord,
    VideoRecord,
    SensitiveRecord
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
       .refresh
         float right
         margin 10px
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
           width 24%
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
        .time
          position absolute
          right 0
          bottom 0
          color #000
        .msg-button
          right 356px
          display inline-block
          padding-top 5px
          height 28px
          text-align center
          button
            margin-right 25px
            width 80px
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
