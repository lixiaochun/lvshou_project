<template>
  <div class="video-list">
      <p class="title"><span>系统通知</span></p>
     <div class="video-header">
       <list-table title="广播记录"  style="box-shadow:none">
         <div class="addList" style="float: right;margin-right: 10px;margin-bottom:15px;">
           <el-button
                  @click.native.prevent="addList()"
                  type="primary"
                  size="mini">
                  <span>新增系统通知</span>
                </el-button>
         </div>
         <div class="video-table">
              <el-table style="width: 100%;"
                    :data="tableData"
                    ref="multipleTable"
                    border
                    stripe
                    size="mini"
                    v-loading="loading"
                    header-row-class-name="element-headerRowClassName">
            <el-table-column label="ID" width="80" prop="id" align="center"></el-table-column>
            <el-table-column label="系统标题" align="center" width="" prop="title">
            </el-table-column>
                  <el-table-column label="通知状态" width="100" prop="note_state" align="center">
                  </el-table-column>
            <el-table-column label="在线状态" width="100" prop="" align="center">
              <template slot-scope="scope">
                <el-button type="text" size="small" @click="rowAction(scope.$index, tableData)">
                  {{getLine(scope.$index, tableData)}}
                </el-button>
                </template>
            </el-table-column>
            <el-table-column label="开始时间"  width="200" align="center">
               <template slot-scope="scope">
                  <div>{{tableData[scope.$index].onlineTime}}</div>
                   <!--<div>{{tableData[scope.$index].offlineTime}}</div>-->
                </template>
            </el-table-column>
            <el-table-column label="更新时间"  width="200" align="center">
               <template slot-scope="scope">
                   <div>{{tableData[scope.$index].updateTime}}</div>
                </template>
            </el-table-column>
            <el-table-column label="操作" width="100" prop="" align="center">
              <template slot-scope="scope">
                <el-button
                  @click.native.prevent="addList(scope.$index, tableData)"
                  class="custom-columnButton"
                  type="text"
                  size="small">
                  <span>编辑</span>
                </el-button>

                <el-button
                  @click.native.prevent="preview(scope.$index, tableData)"
                  class="custom-columnButton"
                  type="text"
                  size="small">
                  <span>预览</span>
                </el-button>
              </template>
            </el-table-column>
        </el-table>
         <div class="video-pagination">
             <div  class="video-pagination-content">
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
      <el-dialog  :visible.sync="dialogFormVisible" width="620px" :title="name">
       <!-- 添加组件 -->
        <slot>
          <div v-html="contents"></div>
          <div class="upload-item"
               v-for="(upload, index) in uploads"
               :key="index" >
            <!--<img :src="upload.url" :style="{width: upload.width, height: upload.height}">-->
            <a :href="upload.url"> {{upload.fileName}}</a>
          </div>
        </slot>
        <div slot="footer" class="dialog-footer">
          <el-button @click="cancle">返回列表</el-button>
        </div>
      </el-dialog>
    </div>
     </div>
</template>

<script type="text/ecmascript-6">
import {
  Input, Button, DatePicker, Table, TableColumn, Switch, MessageBox, RadioGroup,
  Pagination, Select, Option, Cascader, Dialog, Message, Radio, FormItem, Form
} from 'element-ui'
import listTable from 'base/list-table/list-table'
import { getBroadcastInfoById } from 'api/content'
import { ERR_SUCCESS, ERR_REPEAT } from 'api/config'
import { getBroadcastList, publishBroadcastInfo } from 'api/message'
import { format } from 'common/js/util'

export default {
  data() {
    return {
      pageNum: 1,
      pageSize: 10,
      contents: '',
      uploads: [],
      total: 0,
      loading: false,
      tableData: [],
      dialogFormVisible: false,
      name: '',
      content: '',
      onlineTime: '',
      offlineTime: ''
    }
  },
  created() {
    this._getAppBroadcastList()
  },
  computed: {
  },
  methods: {
    _queryData() {
      this.pageNum = 1
      this._getAppBroadcastList()
    },
    // 编辑触发
    addList(index, table) {
      if (table) {
        const state = table[index].state
        const id = table[index].id
        if (state) {
          Message.error('消息发布中，请下线再编辑')
        } else if (id) {
          // eslint-disable-next-line standard/object-curly-even-spacing
          this.$router.push({ path: '/message/systemNoticeEdit', query: { id }})
        }
      } else {
        this.$router.push({ path: '/message/systemNoticeEdit' })
      }
    },
    // 添加活动
    preview(index, table) {
      this.name = '系统通知'
      const id = table[index].id
      this.dialogFormVisible = true
      getBroadcastInfoById({ id }).then(res => {
        if (res.code === ERR_SUCCESS) {
          const data = res.data
          this.contents = data.consultBroadcastContent.content
          this.uploads = data.consultBroadcastAttachment
          console.log(data)
        } else {
          Message.error(res.msg)
        }
      })
    },
    // 获取列表
    _getAppBroadcastList(e) {
      const { pageNum, pageSize } = this
      this.loading = true
      getBroadcastList({ pageNum, pageSize }).then(res => {
        if (res.code === ERR_SUCCESS) {
          const result = res.data
          this.tableData = result.dataList
          this.pageSize = result.pageSize
          this.pageNum = result.pageNum
          this.total = result.total
          this.loading = false
        }
      })
    },
    // 上线状态
    getLine(index, table) {
      const _isOnline = table[index].state
      if (_isOnline === 1) {
        return '发布中'
      } else {
        return '已下线'
      }
    },
    // 更改状态API
    _getMarketCampaignIsOnline(id, isOnline, sign) {
      publishBroadcastInfo({ id, isOnline }).then(res => {
        if (res.code === ERR_SUCCESS) {
          this.pageNum = 1
          this._getAppBroadcastList()
          Message.success('修改成功')
        } else {
          Message.error(res.msg)
        }
        console.log(res)
      })
    },
    // 更改状态
    rowAction(index, table) {
      let curOnline = table[index].state
      const id = table[index].id
      MessageBox.confirm('是否修改在线状态?', '系统提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(action => {
        const state = curOnline === 1 ? 0 : 1
        publishBroadcastInfo({ id, state }).then(res => {
          if (res.code === ERR_SUCCESS) {
            publishBroadcastInfo({ id, state }).then(res => {
              this.pageNum = 1
              this._getAppBroadcastList()
              Message.success('修改成功')
            })
          } else if (res.code === ERR_REPEAT) {
            const ms = res.data
            MessageBox.confirm(ms, '系统提示', {
              confirmButtonText: '确定',
              cancelButtonText: '取消',
              type: 'warning'
            }).then(action => {
              const state = curOnline === 1 ? 1 : 0
              publishBroadcastInfo({ id, state }).then(res => {
                this.pageNum = 1
                this._getAppBroadcastList()
                Message.success('修改成功')
              })
            }).catch(erro => {})
          }
        })
      }).catch(erro => {
        if (curOnline) {
          curOnline = false
        } else {
          curOnline = true
        }
      })
    },
    // 每页显示
    handleSizeChange(val) {
      this.pageSize = val
      this._getAppBroadcastList()
    },
    // 改变页数
    handleCurrentChange(val) {
      this.pageNum = val
      this._getAppBroadcastList()
    },
    _format(e) {
      return format(e, '$1-$2-$3 $4:$5:$6')
    },
    cancle() {
      this.dialogFormVisible = false
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
    [Button.name]: Button,
    [TableColumn.name]: TableColumn,
    [Pagination.name]: Pagination,
    [Cascader.name]: Cascader,
    [Dialog.name]: Dialog,
    [Message.name]: Message,
    [Radio.name]: Radio,
    [FormItem.name]: FormItem,
    [RadioGroup.name]: RadioGroup,
    [Form.name]: Form,
    listTable
  }
}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~common/css/variable"
  @import "~common/css/mixin"
  @import "~common/css/elementCustom"

  .video-list
     height 100%
     overflow-y auto
    .upload-item
      margin-top 20px
      a
        border-radius 4px
        border 1px solid #c2c2c2
        display inline-block
        padding 10px 10px
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
     .video-header
       position relative
       .video-header-query
         width 96%
         margin 0 auto;
         font-size 0
         .video-header-item
           padding-right 1%
           height 40px
           line-height 40px
           inline-block-top()
           & > .label
            float left
            width 40px
            font-size $font-size-sm
            inline-block-top()
           & > .video-input-item
            display block
            margin-left 40px
            font-size $font-size-sm
        .icon-playVideo:before
          content "\E929"
          color #e9eff1
          position absolute
          left 41%
          top 30%
          font-size 30px
          cursor pointer
        .time
          position absolute
          right 10%
          bottom 15%
          color #e9eff1
        .video-button
          position absolute
          display inline-block
          padding-top 5px
          width 21%
          height 28px
          text-align center
          button
            margin-right 25px
            width 120px
       .video-table
         padding 0 10px
       .video-pagination
          padding 21px 0
          height 32px
          line-height 32px
          border 1px solid #ebeef5
          border-top none
          overflow hidden
         .video-pagination-select
           inline-block-top()
         .video-pagination-checkbox
           width 34px
           height 32px
           line-height 32px
           text-align center
           inline-block-top()
         .video-pagination-content
           float right
           margin-right 20px
           inline-block-top()
  .list-upload
    position absolute
    top 30%
    left 0
    margin-top -14px
    width 80px
    height 28px
    opacity 0
    cursor pointer
  .msg
    position absolute
</style>
