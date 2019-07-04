<template>
  <div class="video-list">
     <div class="video-header">
       <list-table title="" :border="true" style="box-shadow:none">
         <slot slot="query">
           <div style="background:#f2f2f2;height:40px">
               <div class="el-icon-search" style="margin:10px;font-size:18px"><span style="font-size:12px;padding:5px">筛选查询</span></div>
           </div>
           <div class="video-header-query">
               <div class="firstRow" style="display: inline-flex;">
               <div class="video-header-item">
                   <span class="label">栏目:</span>
                   <div class="video-input-item">
                  <el-input disabled size="mini" v-model="columnName"></el-input>
                   </div>
               </div>
                <div class="video-header-item">
                   <span class="label">专题:</span>
                   <div class="video-input-item">
                   <el-select
                    v-model="topicid"
                    placeholder="请选择"
                    filterable
                    clearable
                    @focus="getTopic"
                    ref="topic"
                    size='mini'>
                    <el-option
                      v-for="item in topicOptions"
                      :key="item.id"
                      :label="item.name"
                      :value="item.id">
                    </el-option>
                  </el-select>
                   </div>
               </div>
              <div class="video-header-item">
                  <span class="label">发布日期:</span>
                  <div class="video-input-item">
                      <el-date-picker
                      v-model="timeData"
                      style="width: 100%"
                      type="daterange"
                      range-separator="至"
                      size="mini"
                      start-placeholder="开始日期"
                      end-placeholder="结束日期">
                    </el-date-picker>
                  </div>
              </div>
              </div>
            <div class="firstRow">
              <div class="video-header-item">
                  <span class="label">标题:</span>
                  <div class="video-input-item">
                     <el-input v-model.trim="title" clearable placeholder="请输入标题" size="mini"></el-input>
                  </div>
              </div>
               <div class="video-header-item">
                  <span class="label" style="text-align:center">编号:</span>
                  <div class="video-input-item">
                     <el-input v-model.trim="tid" clearable placeholder="请输入编号" size="mini" type="number" style="width:65%"></el-input>
                  </div>
              </div>
               <div class="video-button">
                 <el-button size="mini" @click="_queryData" type="primary" style=" width: 56px; float: left">查询</el-button>
                 <!-- <el-button size="mini"  plain @click="_resetData"  style=" width: 56px; float: left">重置</el-button> -->
              </div>
               </div>
           </div>
         </slot>
         <div class="video-table">
              <el-table style="width: 100%;"
                    :data="tableData"
                    ref="multipleTable"
                    border
                    stripe
                    size="mini"
                    v-loading="loading"
                    header-row-class-name="element-headerRowClassName">
            <el-table-column label="序号" width="80" prop="" align="center">
              <template slot-scope="scope">
                {{scope.$index + 1}}
              </template>
            </el-table-column>
            <el-table-column label="编号" width="80" prop="id" align="center"></el-table-column>
            <el-table-column label="标题"  width=""  align="center">
               <template slot-scope="scope">
                  <p  style="text-align: left">
                    {{tableData[scope.$index].title}}
                  </p>
                </template>
            </el-table-column>
            <el-table-column label="专题"  width="" prop="dissertationName" align="center" v-if="type === '男性魅力'"></el-table-column>
            <el-table-column label="URL"  width="" prop="contentUrl" align="center"></el-table-column>
            <el-table-column label="类型"  width=""  align="center">
              <template slot-scope="scope">
                 {{tableData[scope.$index].contentType === 1 ? '图文' : '视频'}}
                </template>
            </el-table-column>
            <el-table-column label="发布时间" width="140" prop="publishTime" align="center"></el-table-column>
            <el-table-column label="浏览量（PV)" width="100" align="center">
               <template slot-scope="scope">
                 <div>{{tableData[scope.$index].pv}}</div>
                 <el-button type="text" @click="showForm(scope.$index, tableData, 'pv')">({{formatValue(tableData[scope.$index].initpv)}})</el-button>
                </template>
            </el-table-column>
            <el-table-column label="浏览量（UV)" width="100" align="center">
                <template slot-scope="scope">
                  <div>
                    {{tableData[scope.$index].uv}}
                  </div>
                  <el-button type="text" @click="showForm(scope.$index, tableData, 'uv')">({{formatValue
                    (tableData[scope.$index].inituv)}})</el-button>
                </template>
            </el-table-column>
            <el-table-column label="首页展示"  width="" prop="isFirstpage" align="center" v-if="type === '男性魅力'">
             <template slot-scope="scope">
                  <el-switch
                    v-model="scope.row.isFirstpage"
                    @change="changeSwitchFirstpage( scope.$index, tableData )"
                    active-color="#13ce66"
                    inactive-color="#ff4949"
                    :active-value="true"
                    :inactive-value="false">
                  </el-switch>
                </template>
            </el-table-column>
            <el-table-column label="置顶"  width="" align="center">
              <template slot-scope="scope">
                  <el-switch
                    v-model="scope.row.isTop"
                    @change="changeSwitchTop( scope.$index, tableData )"
                    active-color="#13ce66"
                    inactive-color="#ff4949"
                    :active-value="true"
                    :inactive-value="false">
                  </el-switch>
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
     </div>
     <div v-if="dialogFormVisible">
      <el-dialog  :visible.sync="dialogFormVisible" width="920px" :title="name">
         <div class="changeMount" v-if="name==='修改浏览量'">
          <span>添加浏览量:</span>
          <el-input-number v-model="num" controls-position="right" :min="0" :max="1000000000"></el-input-number>
          <span style="color:#ccc;">提示：APP显示浏览量=实际浏览量+添加浏览量</span>
           <div slot="footer" class="dialog-footer" style="text-align:center;margin-top:10px">
          <el-button @click="cancle" style="padding:10px 88px">取 消</el-button>
          <el-button type="primary" @click="handleSave" style="padding:10px 88px">确认</el-button>
        </div>
        </div>
        <div class="videoShow" v-else>
       <el-button @click.prevent="changeLeft" size="small" type="info" class="el-icon-refresh">旋转</el-button>
     <video-player  class="video-player-box"
                 ref="videoPlayer"
                 :options="playerOptions"
                 :playsinline="true"
                 customEventName="customstatechangedeventname"
                 style="overflow:hidden"
               >
  </video-player>
  </div>
    </el-dialog>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
import {
  Input, Button, DatePicker, Table, TableColumn, Switch, Message, MessageBox,
  Pagination, Select, Option, Cascader, Dialog, InputNumber
} from 'element-ui'
import listTable from 'base/list-table/list-table'
import { ERR_SUCCESS } from 'api/config'
import { format } from 'common/js/util'
import { videoPlayer } from 'vue-video-player'
import { getList, deleteDiscContent, updateDiscContentStatus, getColumnList, updateInitPvOrUv } from 'api/content'
export default {
  props: ['type'],
  data() {
    return {
      categoryid: '',
      title: '',
      tid: '',
      deg: 0,
      numType: '',
      i: 0,
      name: '',
      startTime: '',
      columnName: '',
      contentid: '', // 内容id
      num: '', // 添加量
      endTime: '',
      listSort: [],
      timeData: [],
      forCategory: [],
      oldpv: '', // 旧的pv值
      olduv: '', // 旧的uv值
      ids: [],
      url: '',
      pageNum: 1,
      pageSize: 10,
      total: 0,
      loading: false,
      isPublished: true,
      isFirstpageArray: [],
      columnId: '',
      options: [],
      topicOptions: [], // 专题列表
      topicid: '', // 专题id
      columnid: '',
      tableData: [],
      dialogFormVisible: false,
      playerOptions: {
        // videojs options
        width: '900px',
        height: '500px',
        muted: false,
        language: 'zh-CN',
        playbackRates: [0.7, 1.0, 1.5, 2.0],
        controlBar: {
          fullscreenToggle: false
        },
        sources: {
          type: 'video/mp4'
        }
      }
    }
  },
  created() {
    this._getVideoList()
    this._getColumnList()
  },
  computed: {
    player() {
      return this.$refs.videoPlayer.player
    }
  },
  methods: {
    // 格式化增加的pv 显示值
    formatValue(val) {
      if (parseInt(val) > 9999 && parseInt(val) < 99999999) {
        const a = val.toString()
        return a.slice(0, a.length - 4) + 'w+'
      } else if (parseInt(val) > 99999999) {
        return '9999w+'
      } else {
        return val
      }
    },
    _queryData() {
      this._getVideoList('reset')
    },
    _resetData() {
      this.title = ''
      this.tid = ''
      this.timeData = null
      this._getVideoList()
    },
    _forCategory(id) {
      var newsName = ''
      const { forCategory } = this
      forCategory.map(e => {
        if (e.id === id) {
          newsName = e['name']
        }
      })
      return newsName
    },
    changeDirection(rotate) {
      const ele = document.getElementsByClassName('vjs-tech')[0]
      ele.style.transform = 'rotate(' + rotate + 'deg' + ')'
    },
    changeLeft() {
      this.i++
      this.deg = 90 * (this.i)
      this.changeDirection(this.deg)
    },
    addVideo(url) {
      this.dialogFormVisible = true
      this.playerOptions.sources.src = url
    },
    cancel() {
      this.playerOptions.sources.src = ''
      this.dialogFormVisible = false
    },
    reset() {
      this._getVideoList('reset')
    },
    _getVideoList(e) {
      if (this.type === '男性魅力') {
        this.columnId = 1
        this.columnName = '男性魅力'
      } else if (this.type === '精选内容') {
        this.columnId = 6
        this.columnName = '精选内容'
      }
      // eslint-disable-next-line prefer-const
      let { title, tid, timeData, pageNum, pageSize, columnId, topicid, columnid } = this
      if (timeData && timeData.length > 0) {
        this.startTime = format(timeData[0], '$1-$2-$3') + ' 00:00:00'
        this.endTime = format(timeData[1], '$1-$2-$3') + ' 23:59:59'
      } else {
        this.startTime = ''
        this.endTime = ''
      }
      const { startTime, endTime } = this
      if (e === 'reset') {
        pageNum = 1
      }
      if (columnId) {
        getColumnList({ id: columnId }).then(res => {
          if (res.code === ERR_SUCCESS) {
            this.topicOptions = res.data
          }
        })
      }
      if (topicid) {
        columnid = topicid
      } else if (columnId && !topicid) {
        columnid = columnId
      } else {
        columnid = ''
      }
      this.loading = true
      getList({ id: tid, title, pageNum, pageSize, columnid, startTime, endTime, isShow: 1, type: 1 }).then(res => {
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
    _getArticleisFirstpageState(isFirstpage, ids) {
      updateDiscContentStatus({ isFirstpage, ids }).then(res => {
        if (res.code === ERR_SUCCESS) {
          this._getVideoList()
          Message.success('修改成功')
        } else {
          Message.error(res.msg)
          this._getVideoList()
        }
      })
    },
    showForm(index, table, type) {
      this.name = '修改浏览量'
      this.dialogFormVisible = true
      this.numType = type
      this.contentid = table[index].id
      if (type === 'pv') {
        this.num = table[index].initpv
        this.oldpv = table[index].initpv
      } else {
        this.num = table[index].inituv
        this.olduv = table[index].inituv
      }
    },
    cancle() {
      this.dialogFormVisible = false
    },
    handleSave() {
      const { numType, num, contentid } = this
      const obj = { type: numType, num, contentid }
      updateInitPvOrUv(obj).then(res => {
        if (res.code === ERR_SUCCESS) {
          this.dialogFormVisible = false
          Message.success('修改成功')
          this._getVideoList()
          this._getColumnList()
        } else {
          Message.error(res.msg)
        }
      })
    },
    // 提交修改数据
    _getArticleisTopState(isTop, ids) {
      updateDiscContentStatus({ isTop, ids }).then(res => {
        if (res.code === ERR_SUCCESS) {
          this._getVideoList()
          Message.success('修改成功')
        } else {
          Message.success('操作成功')
        }
      })
    },
    changeSwitchFirstpage(index, table) { // 是否首页展示
      const isFirstpage = table[index].isFirstpage
      const ids = table[index].id
      MessageBox.confirm('是否修改状态?', '系统提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(action => {
        this._getArticleisFirstpageState(isFirstpage, ids)
      }).catch(erro => {
        if (table[index].isFirstpage) {
          table[index].isFirstpage = false
        } else {
          table[index].isFirstpage = true
        }
      })
    },
    changeSwitchTop(index, table) { // 是否显示
      const isTop = table[index].isTop
      const ids = table[index].id
      MessageBox.confirm('是否修改状态?', '系统提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(action => {
        this._getArticleisTopState(isTop, ids)
      }).catch(erro => {
        if (table[index].isTop) {
          table[index].isTop = false
        } else {
          table[index].isTop = true
        }
      })
    },
    getTopic() {
      if (this.columnId) {
        getColumnList({ id: this.columnId }).then(res => {
          if (res.code === ERR_SUCCESS) {
            this.topicOptions = res.data
          }
        })
      }
    },
    clearTopic() {
      this.topicid = ''
    },
    _getColumnList() {
      getColumnList().then(res => {
        if (res.code === ERR_SUCCESS) {
          this.options = res.data
        }
      })
    },
    _format(e) {
      return '' + format(e)
    },
    handleSizeChange(val) {
      this.pageSize = val
      this._getVideoList()
    },
    handleCurrentChange(val) {
      this.pageNum = val
      this._getVideoList()
    },
    rowAction(index, table, type) {
      const { id } = table[index]
      if (type === 'unPublish') {
        updateDiscContentStatus({ ids: id, isShow: 0 }).then(res => {
          if (res.code === ERR_SUCCESS) {
            MessageBox.confirm('确定不发布该视频?', '系统提示', {
              confirmButtonText: '确定',
              cancelButtonText: '取消',
              type: 'warning'
            }).then(action => {
              this._getVideoList()
            }).catch(erro => {})
          }
        })
      } else {
        MessageBox.confirm('确定删除该视频?', '系统提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(action => {
          deleteDiscContent({ ids: id }).then(res => {
            if (res.code === ERR_SUCCESS) {
              Message({
                message: '删除成功！',
                type: 'success'
              })
              this._getVideoList()
            } else {
              Message.error(res.msg)
            }
          })
        }).catch(erro => {})
      }
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
    [InputNumber.name]: InputNumber,
    videoPlayer,
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
     .video-header
       position relative
       .video-header-query
         width 96%
         margin 0 auto;
         font-size 0
         .video-header-item
           padding-right 1%
           width 30%
           height 40px
           line-height 40px
           inline-block-top()
           & > .label
            float left
            width 60px
            font-size $font-size-sm
            inline-block-top()
           & > .video-input-item
            display block
            margin-left 60px
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
     button.el-icon-refresh{
       position: absolute;
       top: 12px;
     }
</style>
