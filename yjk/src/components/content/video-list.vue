<template>
  <div class="video-list">
      <p class="title"><span>视频列表</span></p>
     <div class="video-header">
       <list-table title="视频列表" :border="true" style="box-shadow:none">
         <slot slot="query">
           <div style="background:#f2f2f2;height:40px">
               <div class="el-icon-search" style="margin:10px;font-size:18px"><span style="font-size:12px;padding:5px">筛选查询</span></div>
           </div>
           <div class="video-header-query">
               <div class="firstRow" style="display: inline-flex;">
               <div class="video-header-item">
                   <span class="label">栏目:</span>
                   <div class="video-input-item">
                    <el-select
                    v-model="columnId"
                    @change="clearTopic"
                    placeholder="请选择"
                    size='mini'
                    clearable>
                    <el-option
                      v-for="item in options"
                      :key="item.id"
                      :label="item.name"
                      :value="item.id">
                    </el-option>
                  </el-select>
                   </div>
               </div>
                <div class="video-header-item">
                   <span class="label">专题:</span>
                   <div class="video-input-item">
                   <el-select
                    v-model="topicid"
                    placeholder="请选择"
                    filterable
                    @focus="getTopic"
                    ref="topic"
                    size='mini'
                    clearable>
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
                      style="width: 106%"
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
                  <span class="label" style="text-align:center">ID:</span>
                  <div class="video-input-item">
                     <el-input v-model.trim="tid" clearable placeholder="请输入ID" size="mini" style="width:65%"></el-input>
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
            <el-table-column label="ID" width="80" prop="id" align="center"></el-table-column>
            <el-table-column label="短视频" align="center" width="180" prop="coverUrl" sort-by>
                 <template slot-scope="scope">
                   <div class="icon-playVideo" @click="addVideo(tableData[scope.$index].contentUrl)">
                    <span class="time">{{tableData[scope.$index].duration}}</span>
                   </div>
                   <img :src="tableData[scope.$index].picUrl"
                    width="160" height="90"
                   >
                </template>
            </el-table-column>
            <el-table-column label="标题"  width="" prop="title" align="center"></el-table-column>
            <el-table-column label="分类" width="100"  align="center" prop="categoryName">
               <!-- <template slot-scope="scope">
                  <span>{{_forCategory(tableData[scope.$index].categoryid)}}</span>
                </template> -->
                 </el-table-column>
                  <el-table-column label="栏目" width="140" prop="columnName" align="center"></el-table-column>
            <el-table-column label="发布时间" width="140" prop="publishTime" align="center"></el-table-column>
            <el-table-column label="上传者"  width="80" align="center">
               <template>
                  <span>admin</span>
                </template>
            </el-table-column>
            <!-- <el-table-column  :render-header="renderHeader" width="120" align="center" prop="playCount">
            </el-table-column> -->
            <el-table-column label="播放次数" width="140" prop="pv" align="center"></el-table-column>
            <el-table-column label="操作" width="100" prop="" align="center" v-if="name !== 'content'">
              <template slot-scope="scope">
                <el-button
                  @click.native.prevent="rowAction( scope.$index, tableData, 'unPublish')"
                  class="custom-columnButton"
                  type="text"
                  size="small">
                  <span>关闭</span>
                </el-button>
                <el-button
                  @click.native.prevent="rowAction( scope.$index, tableData, 'delete')"
                  class="custom-columnButton"
                  type="text"
                  size="small">
                  <span>删除</span>
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
     </div>
     <div v-if="dialogFormVisible">
      <el-dialog  :visible.sync="dialogFormVisible" width="920px">
       <el-button @click.prevent="changeLeft" size="small" type="info" class="el-icon-refresh">旋转</el-button>
     <video-player  class="video-player-box"
                 ref="videoPlayer"
                 :options="playerOptions"
                 :playsinline="true"
                 customEventName="customstatechangedeventname"
                 style="overflow:hidden"
               >
  </video-player>
    </el-dialog>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
import {
  Input, Button, DatePicker, Table, TableColumn, Switch, Message, MessageBox,
  Pagination, Select, Option, Cascader, Dialog
} from 'element-ui'
import listTable from 'base/list-table/list-table'
import { ERR_SUCCESS } from 'api/config'
import { format } from 'common/js/util'
import { videoPlayer } from 'vue-video-player'
// import { deleteVideo, isRecommend, getVideoList, pbVideo, changePlayCount } from 'api/video'
import { getList, deleteDiscContent, updateDiscContentStatus, getColumnList } from 'api/content'
// import { vdcategroyList } from 'api/message'
export default {
  data() {
    return {
      name: '',
      categoryid: '',
      title: '',
      tid: '',
      deg: 0,
      i: 0,
      startTime: '',
      endTime: '',
      listSort: [],
      timeData: [],
      forCategory: [],
      ids: [],
      url: '',
      pageNum: 1,
      pageSize: 10,
      total: 0,
      loading: false,
      isPublished: true,
      columnId: '',
      options: [],
      topicOptions: [], // 专题列表
      topicid: '', // 专题id
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
    // this._getvdcategory()
    this._getVideoList()
    this._getColumnList()
    this.name = sessionStorage.getItem('name')
  },
  computed: {
    player() {
      return this.$refs.videoPlayer.player
    }
  },
  methods: {
    _queryData() {
      this._getVideoList('reset')
    },
    _resetData() {
      this.title = ''
      this.tid = ''
      this.timeData = null
      this._getVideoList()
    },
    // renderHeader (h) {
    //   return (
    //     <div>
    //       <span>播放次数</span>
    //       <span class="el-icon-caret-top" on-click = {this.ascOrder}></span>
    //       <span class="el-icon-caret-bottom" on-click = {this.descOrder}></span>
    //     </div>
    //   )
    // },
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
    // _getvdcategory () {
    //   vdcategroyList().then(res => {
    //     if (res.code === ERR_SUCCESS) {
    //       const dataArr = res.data
    //       const cDada = res.data
    //       this.forCategory = cDada
    //       if (dataArr && dataArr.length > 0) {
    //         dataArr.unshift({name: '顶级分类', id: 0, sort: 0})
    //         this.listSort = labelSortArr(dataArr)
    //       } else {
    //         const firstData = [{name: '顶级分类', id: 0, sort: 0}]
    //         this.listSort = labelSortArr(firstData)
    //       }
    //     } else {
    //       Message.error(res.msg)
    //     }
    //   })
    // },
    handleChange() { },
    _getVideoList(e) {
      // eslint-disable-next-line prefer-const
      let { title, tid, timeData, pageNum, pageSize, columnId, topicid } = this
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
      let columnid = ''
      if (topicid) {
        columnid = topicid
      } else if (columnId && !topicid) {
        columnid = columnId
      } else {
        columnid = ''
      }
      this.loading = true
      getList({ id: tid, title, pageNum, pageSize, columnid, startTime, endTime, contentType: 2, isShow: 1, type: 3 }).then(res => {
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
    getTopic() {
      if (this.columnId) {
        getColumnList({ id: this.columnId }).then(res => {
          if (res.code === ERR_SUCCESS) {
            this.topicOptions = res.data
          }
        })
      } else {
        this.topicOptions = []
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
    // descOrder () {
    //   let dataArr = {key: 'playCount', value: 'asc'}
    //   const str = JSON.stringify(dataArr)
    //   const arr = '[' + str + ']'
    //   const sort = arr
    //   const {pageNum, pageSize, url, categoryid, startTime, endTime} = this
    //   changePlayCount({pageNum, pageSize, url, categoryid, startTime, endTime, sort}).then(res => {
    //     if (res.code === ERR_SUCCESS) {
    //       this.tableData = res.data.dataList
    //     } else {
    //       Message.error(res.msg)
    //     }
    //   })
    // },
    // ascOrder () {
    //   let dataArr = {key: 'playCount', value: 'desc'}
    //   const str = JSON.stringify(dataArr)
    //   const arr = '[' + str + ']'
    //   const sort = arr
    //   const {pageNum, pageSize, url, categoryid, startTime, endTime} = this
    //   changePlayCount({pageNum, pageSize, url, categoryid, startTime, endTime, sort}).then(res => {
    //     if (res.code === ERR_SUCCESS) {
    //       this.tableData = res.data.dataList
    //     } else {
    //       Message.error(res.msg)
    //     }
    //   })
    // },
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
