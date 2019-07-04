<template>
  <div class="video-list">
      <p class="title"><span>广播记录</span></p>
     <div class="video-header">
       <list-table title="广播记录"  style="box-shadow:none">
         <div class="addList" style="float: right;margin-right: 10px;margin-bottom:15px;">
           <el-button
                  @click.native.prevent="addList()"
                  type="primary"
                  size="mini">
                  <span>新增系统广播</span>
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
            <el-table-column label="广播内容" align="center" width="" prop="content">
            </el-table-column>
                  <el-table-column label="广播状态" width="100" prop="state" align="center">
                  </el-table-column>
            <el-table-column label="在线状态" width="100" prop="" align="center">
              <template slot-scope="scope">
                <el-button type="text" size="small" @click="rowAction(scope.$index, tableData)">
                  {{getLine(scope.$index, tableData)}}
                </el-button>
                </template>
            </el-table-column>
            <el-table-column label="开始/结束时间"  width="200" align="center">
               <template slot-scope="scope">
                  <div>{{tableData[scope.$index].onlineTime}}</div>
                   <div>{{tableData[scope.$index].offlineTime}}</div>
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
                  @click.native.prevent="editList(scope.$index, tableData)"
                  class="custom-columnButton"
                  type="text"
                  size="small">
                  <span>编辑</span>
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
      <el-dialog  :visible.sync="dialogFormVisible" width="920px" :title="name">
       <!-- 添加组件 -->
       <el-form ref="form" label-width="80px">
            <el-form-item label="编辑内容:" style="width:90%;">
              <el-input type="textarea" v-model="content" maxlength="20" placeholder="输入不超过20个字" :rows="6"></el-input>
            </el-form-item>
            <el-form-item>
          <div>
              <span style="margin-right:20px;">已输入{{content ? content.length : 0}} 字(含尾缀)</span>
            <span>发布时间：</span>
            <span>
                <el-date-picker
                v-model="onlineTime"
                size="mini"
                type="datetime"
               placeholder="选择发布时间">
              </el-date-picker>
            </span>
              <span>下线时间：</span>
             <span><el-date-picker
                v-model="offlineTime"
                size="mini"
                type="datetime"
               placeholder="选择下线时间">
              </el-date-picker></span>
            </div>
            </el-form-item>
       </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="cancle">返回列表</el-button>
          <el-button type="primary" @click="handleSave">确定</el-button>
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
import { ERR_SUCCESS, ERR_REPEAT } from 'api/config'
import { getAppBroadcastList, getAppBroadcastById, publishAppBroadcastInfo, updateAppBroadcastInfo, saveAppBroadcastInfo } from 'api/message'
import { format, isNull } from 'common/js/util'

export default {
  data() {
    return {
      pageNum: 1,
      pageSize: 10,
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
    editList(index, table) {
      this.dialogFormVisible = true
      if (table && table.length) {
        const isOnline = table[index].isOnline
        this.name = '编辑系统广播'
        if (isOnline) {
          Message.error('广播发布中，请下线再进行编辑')
          this.dialogFormVisible = false
        } else {
          const id = table[index].id
          this.isEdit = true
          this.id = id
          getAppBroadcastById({ id }).then(res => {
            if (res.code === ERR_SUCCESS) {
              const data = res.data
              this.content = data.content
              this.offlineTime = data.offlineTime
              this.onlineTime = data.onlineTime
            }
          })
        }
      } else {
        this.isEdit = false
        this.name = '新增系统广播'
      }
    },
    // 添加活动
    addList() {
      this.isEdit = false
      this.dialogFormVisible = true
      this.name = '新增系统广播'
      this.content = ''
      this.onlineTime = ''
      this.offlineTime = ''
    },
    // 获取列表
    _getAppBroadcastList(e) {
      const { pageNum, pageSize } = this
      this.loading = true
      getAppBroadcastList({ pageNum, pageSize }).then(res => {
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
      const _isOnline = table[index].isOnline
      if (_isOnline) {
        return '发布中'
      } else {
        return '已下线'
      }
    },
    // 更改状态API
    _getMarketCampaignIsOnline(id, isOnline, sign) {
      publishAppBroadcastInfo({ id, isOnline, sign: 0 }).then(res => {
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
      let curOnline = table[index].isOnline
      const id = table[index].id
      MessageBox.confirm('是否修改在线状态?', '系统提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(action => {
        // this._getMarketCampaignIsOnline(id, !curOnline, 1)
        publishAppBroadcastInfo({ id, isOnline: !curOnline, sign: 0 }).then(res => {
          if (res.code === ERR_SUCCESS) {
            publishAppBroadcastInfo({ id, isOnline: !curOnline, sign: 1 }).then(res => {
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
              publishAppBroadcastInfo({ id, isOnline: !curOnline, sign: 1 }).then(res => {
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
    // 保存增加的
    handleSave() {
      const { content, onlineTime, offlineTime } = this
      if (!onlineTime) {
        return Message.error('请输入上线时间！')
      } else if (!offlineTime) {
        return Message.error('请输入下线时间！')
      } else {
        var _onlineTime = this._format(onlineTime)
        var _offlineTime = this._format(offlineTime)
        var st = new Date(onlineTime).getTime()
        var et = new Date(offlineTime).getTime()
        if (st >= et) {
          return Message.error('下线时间应大于发布时间')
        }
      }
      if (isNull(content)) {
        return Message.error('请输入系统广播内容！')
      }
      if (this.isEdit) {
        const { id } = this
        this._updateAppBroadcastInfo({ id, content, onlineTime: _onlineTime, offlineTime: _offlineTime })
        this.dialogFormVisible = false
        this._getAppBroadcastList()
      } else {
        this._saveAppBroadcastInfo({ content, onlineTime: _onlineTime, offlineTime: _offlineTime })
        this.dialogFormVisible = false
        this._getAppBroadcastList()
      }
    },
    _saveAppBroadcastInfo(form) {
      saveAppBroadcastInfo(form).then(res => {
        if (res.code === ERR_SUCCESS) {
          Message.success('新增活动成功')
        } else {
          Message.error(res.msg)
        }
      })
    },
    _updateAppBroadcastInfo(form) {
      updateAppBroadcastInfo(form).then(res => {
        if (res.code === ERR_SUCCESS) {
          Message.success('更新活动成功')
          this.isEdit = false
        } else {
          Message.error(res.msg)
        }
      })
    },
    // 取消按钮
    cancle() {
      MessageBox.confirm('是否取消保存?', '系统提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(action => {
        this.dialogFormVisible = false
        this._getAppBroadcastList()
      }).catch(erro => {})
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
