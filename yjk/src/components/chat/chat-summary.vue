<template>
  <div class="consult-list">
      <p class="title"><span>顾问聊天汇总</span>
     <div class="consult-header">
       <list-table title="顾问聊天" :border="true" style="box-shadow:none">
         <slot slot="query">
           <div class="consult-header-query" style="margin-top:10px">
               <div class="firstRow">
                <div class="consult-header-item">
                  <span class="label">顾问账号:</span>
                  <div class="consult-input-item">
                     <el-input v-model="username" placeholder="输入顾问账号" size="mini" style="width:182px" clearable></el-input>
                  </div>
              </div>
               <div class="consult-header-item">
                  <span class="label" style="margin-left: 20px">顾问姓名:</span>
                  <div class="consult-input-item">
                     <el-input v-model="name" placeholder="输入顾客姓名" size="mini" style="width:80%" clearable></el-input>
                  </div>
              </div>
              <div class="consult-header-item" >
                  <span class="label">上传日期:</span>
                  <div class="consult-input-item">
                      <el-date-picker
                      v-model="timeData"
                      style="width:220px"
                      type="daterange"
                      range-separator="至"
                      size="mini"
                      :start-placeholder="startTime"
                      :picker-options="pickerOptions"
                      :end-placeholder="endTime">
                    </el-date-picker>
                  </div>
              </div>
              <div class="consult-header-item">
                <div class="consult-input-item">
                <el-button size="mini" @click="_queryData" type="primary">查询</el-button>
                <el-button size="mini" @click.native.prevent= "_getExcel" >导出</el-button>
                </div>
               </div>
              </div>
           </div>
         </slot>
         <div class="consult-table">
            <div style=" border:1px solid #ebeef5;border-bottom:none;height:50px">
               <div style="margin:10px;font-size:18px"><span style="font-size:14px;padding:5px">数据列表</span>
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
            <el-table-column label="ID" width="" align="center">
              <template slot-scope="scope">
                  <span>{{scope.$index + 1}}</span>
                </template>
            </el-table-column>
            <el-table-column label="顾问账号" prop="username" align="center">
            </el-table-column>
            <el-table-column label="顾问姓名"  width="" prop="name" align="center"></el-table-column>
            <el-table-column label="敏感字出现次数"  width="" align="center" prop="sensitiveCount">
            </el-table-column>
            <el-table-column label="聊天句数"  width=""  align="center">
               <template slot-scope="scope">
                   <el-button
                  @click.native.prevent="Inquire(tableData[scope.$index].username)"
                  type="text"
                  size="small"
                  ><span> {{tableData[scope.$index].msgCount}}</span></el-button>
              </template>
             </el-table-column>
            <el-table-column label="图片" width="" align="center">
              <template slot-scope="scope">
                   <el-button
                  @click.native.prevent="Inquire(tableData[scope.$index].username)"
                  type="text"
                  size="small"
                  ><span> {{tableData[scope.$index].picCount}}</span></el-button>
              </template>
            </el-table-column>
        </el-table>
         <div class="consult-pagination">
             <div class="consult-pagination-content">
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
         </div>
       </list-table>
     </div>
      <router-view></router-view>
  </div>
</template>

<script type="text/ecmascript-6">
import {
  Input, Button, DatePicker, Table, TableColumn,
  Pagination, Select, Option, Message
} from 'element-ui'
import listTable from 'base/list-table/list-table'
import { format } from 'common/js/util'
import { getConsultList } from 'api/imRptConsult'
import { ERR_SUCCESS } from 'api/config'
import axios from 'axios'
export default {
  data() {
    return {
      startTime: '',
      endTime: '',
      name: '',
      username: '',
      pageNum: 1,
      pageSize: 10,
      total: 0,
      tableData: [],
      timeData: [],
      loading: false,
      pickerOptions: {
        disabledDate(time) {
          return time.getTime() > Date.now() - 24 * 3600 * 1000
        }
      }
    }
  },
  created() {
    this._getConsultList()
  },
  methods: {
    _queryData() {
      this._getConsultList()
    },
    _getConsultList() {
      this.loading = true
      const { name, username, pageNum, pageSize, timeData } = this
      if (timeData && timeData.length > 0) {
        this.startTime = format(timeData[0], '$1-$2-$3')
        this.endTime = format(timeData[1], '$1-$2-$3')
      } else {
        this.startTime = format(new Date() - 24 * 3600 * 1000, '$1-$2-$3')
        this.endTime = format(new Date() - 24 * 3600 * 1000, '$1-$2-$3')
      }
      const { startTime, endTime } = this
      const list = { startTime, endTime, name, username, pageNum, pageSize }
      getConsultList(list).then((res) => {
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
      const { timeData, name, username } = this
      if (timeData && timeData.length > 0) {
        this.startTime = format(timeData[0], '$1-$2-$3')
        this.endTime = format(timeData[1], '$1-$2-$3')
      } else {
        this.startTime = format(new Date() - 24 * 3600 * 1000, '$1-$2-$3')
        this.endTime = format(new Date() - 24 * 3600 * 1000, '$1-$2-$3')
      }
      const { startTime, endTime } = this
      const url = '/yjk-operation/imRptConsult/exprorExcel' + '?startTime=' + startTime + '&endTime=' + endTime + '&username=' + username + '&name=' + name
      axios({
        method: 'get',
        url: url,
        responseType: 'blob'
      }).then(response => {
        this.download(response)
      }).catch()
    },
    download(data) {
      if (!data) {
        return
      }
      const self = this
      const url = window.URL.createObjectURL(new Blob([data.data], { type: 'application/octet-stream' }))
      const link = document.createElement('a')
      link.style.display = 'none'
      link.href = url
      link.setAttribute('download', `${self.startTime}-${self.endTime}聊天汇总.xls`)
      document.body.appendChild(link)
      link.click()
    },
    Inquire(username) {
      const { startTime, endTime } = this
      // eslint-disable-next-line standard/object-curly-even-spacing
      this.$router.push({ path: '/chat/record', query: { username, startTime, endTime, e: 1 }})
    },
    handleSizeChange(val) {
      this.pageSize = val
      this._getConsultList()
    },
    handleCurrentChange(val) {
      this.pageNum = val
      this._getConsultList()
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
    listTable
  }
}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~common/css/variable"
  @import "~common/css/mixin"
  @import "~common/css/elementCustom"

  .consult-list
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
     .consult-header
       .consult-header-query
         overflow hidden
         width 96%
         margin 0 auto;
         font-size 0
         .consult-header-item
           float left
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
           & > .consult-input-item
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
        .consult-button
          position absolute
          right 12%
          display inline-block
          padding-top 5px
          height 28px
          text-align center
          button
            margin-right 25px
            width 80px
       .consult-table
         padding 0 10px
         .add
           position absolute
           right 28px
           top 158px
       .consult-pagination
          padding 21px 0
          height 32px
          line-height 32px
          border 1px solid #ebeef5
          border-top none
          overflow hidden
         .consult-pagination-select
           inline-block-top()
         .consult-pagination-checkbox
           width 34px
           height 32px
           line-height 32px
           text-align center
           inline-block-top()
         .consult-pagination-content
           float right
           margin-right 20px
           inline-block-top()
</style>
