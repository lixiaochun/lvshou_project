<template>
  <div class="video-list">
      <p class="title"><span>营销活动列表</span></p>
     <div class="video-header">
       <list-table title="营销活动列表" :border="true" style="box-shadow:none">
         <slot slot="query">
           <div style="background:#f2f2f2;height:40px">
               <div class="el-icon-search" style="margin:10px;font-size:18px"><span style="font-size:12px;padding:5px">筛选查询</span></div>
           </div>
           <div class="video-header-query" style="padding:10px;">
               <div class="firstRow" style="display: inline-flex;">
                <div class="video-header-item">
                  <span class="label">标题:</span>
                  <div class="video-input-item">
                     <el-input v-model.trim="title" clearable placeholder="请输入活动标题" size="mini"></el-input>
                  </div>
              </div>
              <div class="video-header-item">
                  <span class="label">编号:</span>
                  <div class="video-input-item">
                     <el-input v-model.trim="id" clearable placeholder="请输入活动ID" size="mini"></el-input>
                  </div>
              </div>
               <div class="video-header-item">
                   <div class="video-input-item">
                    <el-select
                    v-model="status"
                    size='mini'
                    clearable>
                    <el-option
                      v-for="item in activityOptions"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value">
                    </el-option>
                  </el-select>
                   </div>
               </div>
                <div class="video-header-item">
                   <div class="video-input-item">
                   <el-select
                    v-model="isOnline"
                    ref="topic"
                    size='mini'>
                    <el-option
                      v-for="item in onlineOptions"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value">
                      </el-option>
                    </el-select>
                   </div>
                   </div>
                <div class="video-header-item">
                 <el-button size="mini" @click="_queryData" type="primary" style="margin-top:4px;">查询</el-button>
              </div>
               </div>
              </div>
         </slot>
         <div class="addList" style="float: right;margin-right: 10px;margin-bottom:15px;">
           <el-button
                  @click.native.prevent="addList()"
                  type="primary"
                  size="mini">
                  <span>新增营销活动</span>
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
            <el-table-column label="标题/描述" align="center" width="">
             <template slot-scope="scope">
             <div><span style="color:#000;">{{tableData[scope.$index].title}}</span></div>
             <div>{{tableData[scope.$index].comment}}</div>
             </template>
            </el-table-column>
            <el-table-column label="链接"  width="180" align="center">
              <template slot-scope="scope">
                {{tableData[scope.$index].campaignUrl}}
              </template>
            </el-table-column>
            <el-table-column label="活动图" width="300" align="center">
               <template slot-scope="scope">
                 <div style="display:inline-block;text-align:left;">
                  <img :src="tableData[scope.$index].bannerUrl"
                    width="160" height="90"
                   >
                  <img :src="tableData[scope.$index].shareUrl"
                    width="100" height="90"
                   >
                   </div>
                </template>
                 </el-table-column>
                  <el-table-column label="活动状态" width="100" prop="" align="center">
                  <template slot-scope="scope">
                  {{getStatus(scope.$index, tableData)}}
                </template>
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
                  <div>{{tableData[scope.$index].startTime}}</div>
                   <div>{{tableData[scope.$index].endTime}}</div>
                </template>
            </el-table-column>
            <el-table-column label="创建/修改时间"  width="200" align="center">
               <template slot-scope="scope">
                   <div>{{tableData[scope.$index].createTime}}</div>
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
       <el-form ref="form" :model="form" label-width="80px">
            <el-form-item label="活动标题:" style="width:80%;">
              <el-input v-model="form.title" size="mini" placeholder="输入活动标题，不超过36个字" maxlength="36"></el-input>
              <span class="msg" style="top:0px;right:-50px;">(<em>*</em>必填)</span>
            </el-form-item>
            <el-form-item label="活动描述:" style="width:80%;">
              <el-input type="textarea" v-model="form.comment" maxlength="28" placeholder="输入活动简介，不超过28个字"></el-input>
              <span class="msg" style="top:5px;right:-50px;">(<em>*</em>必填)</span>
            </el-form-item>
            <el-form-item label="Banner:">
              <div class="upload-item" v-if="form.bannerUrl">
                        <img :src="form.bannerUrl" style="width: 300px; height: 150px">
                        <span class="upload-item-close icon-close" @click="handleDelete(form.bannerUrl)" ></span>
                </div>
                <div v-else>
                  <el-button size="small" type="primary">上传图片</el-button>
                <input type="file" class="list-upload" @change="handleUploadBanner">
                </div>
              <span class="msg" style="top:3px;left:300px;">(<em>*</em>必填，图片像素1035x345)</span>
            </el-form-item>
            <el-form-item label="Share:">
            <div class="upload-item" v-if="form.shareUrl">
                        <img :src="form.shareUrl" style="width: 150px; height: 150px">
                        <span class="upload-item-close icon-close" @click="handleDelete(form.shareUrl)" ></span>
                </div>
                <div v-else>
                  <el-button size="small" type="primary">上传图片</el-button>
                <input type="file" class="list-upload" @change="handleUploadShare" >
                </div>
              <span class="msg" style="top:3px;left:300px;">(<em>*</em>必填，图片像素150x150)</span>
            </el-form-item>
            <el-form-item label="活动链接:" style="width:80%">
              <el-input v-model="form.campaignUrl" size="mini"></el-input>
              <span class="msg" style="top:5px;right:-50px;">(<em>*</em>必填)</span>
            </el-form-item>
            <el-form-item label="活动时间:">
              <el-date-picker
                v-model="form.timeData"
                size="mini"
                type="datetimerange"
                range-separator="至"
                start-placeholder="选择活动开始时间"
                end-placeholder="选择活动结束时间">
              </el-date-picker>
              <span class="msg" style="top:5px;right:352px;">(<em>*</em>必填)</span>
            </el-form-item>
            <el-form-item label="状态:">
              <el-radio-group v-model="form.isOnline">
                <el-radio :label="true">上线</el-radio>
                <el-radio :label="false">下线</el-radio>
              </el-radio-group>
            </el-form-item>
       </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="cancle">取 消</el-button>
          <el-button type="primary" @click="handleSave">保存</el-button>
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
import { uploadPic } from 'api/upload'
import { ERR_SUCCESS } from 'api/config'
import { getMarketList, updateMarketCampaignIsOnline, saveMarketList, getMarketCampaignById, updateMarketCampaign } from 'api/market'
import { isNull } from 'common/js/util'

const _onlineOptions = [{
  value: '',
  label: '是否上线'
}, {
  value: 'true',
  label: '上线中'
}, {
  value: 'false',
  label: '已下线'
}]
const _activityOptions = [{
  value: '',
  label: '活动状态'
}, {
  value: '0',
  label: '未开始'
}, {
  value: '1',
  label: '进行中'
}, {
  value: '2',
  label: '已结束'
}]
export default {
  data() {
    return {
      activityOptions: _activityOptions,
      onlineOptions: _onlineOptions,
      id: '',
      status: '',
      isOnline: '',
      title: '',
      pageNum: 1,
      pageSize: 10,
      total: 0,
      loading: false,
      tableData: [],
      dialogFormVisible: false,
      name: '',
      form: {
        id: '',
        comment: '',
        title: '',
        isOnline: false,
        bannerUrl: '',
        shareUrl: '',
        campaignUrl: '',
        startTime: '',
        endTime: '',
        timeData: []
      }
    }
  },
  created() {
    this._getMarketList()
  },
  computed: {
  },
  methods: {
    _queryData() {
      this.pageNum = 1
      this._getMarketList()
    },
    // 编辑触发
    editList(index, table) {
      this.dialogFormVisible = true
      if (table && table.length) {
        const isOnline = table[index].isOnline
        this.name = '编辑营销活动'
        if (isOnline) {
          Message.error('活动上线中，请下线活动再进行编辑')
          this.dialogFormVisible = false
        } else {
          const id = table[index].id
          this.isEdit = true
          this.form.id = id
          getMarketCampaignById({ id }).then(res => {
            if (res.code === ERR_SUCCESS) {
              const data = res.data
              this.form.comment = data.comment
              this.form.title = data.title
              this.form.bannerUrl = data.bannerUrl
              this.form.shareUrl = data.shareUrl
              this.form.startTime = data.startTime
              this.form.endTime = data.endTime
              this.form.isOnline = data.isOnline
              this.form.campaignUrl = data.campaignUrl
              this.form.timeData = [data.startTime, data.endTime]
            }
          })
        }
      } else {
        this.isEdit = false
        this.name = '新增营销活动'
      }
    },
    // 添加活动
    addList() {
      this.isEdit = false
      this.dialogFormVisible = true
      this.name = '新增营销活动'
      this.form.comment = ''
      this.form.title = ''
      this.form.bannerUrl = ''
      this.form.shareUrl = ''
      this.form.startTime = ''
      this.form.endTime = ''
      this.form.isOnline = ''
      this.form.campaignUrl = ''
      this.form.timeData = []
    },
    // 获取列表
    _getMarketList(e) {
      const { title, id, status, isOnline, pageNum, pageSize } = this
      this.loading = true
      getMarketList({ id, title, pageNum, pageSize, isOnline, status }).then(res => {
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
        return '上线中'
      } else {
        return '已下线'
      }
    },
    // 活动状态
    getStatus(index, table) {
      const _status = table[index].status
      switch (_status) {
        case 1:
          return '进行中'
        case 0:
          return '未开始'
        case 2:
          return '已结束'
      }
    },
    // 更改状态API
    _getMarketCampaignIsOnline(id, isOnline) {
      updateMarketCampaignIsOnline({ id, isOnline }).then(res => {
        if (res.code === ERR_SUCCESS) {
          this.pageNum = 1
          this._getMarketList()
          Message.success('修改成功')
        } else {
          Message.error(res.msg)
        }
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
        this._getMarketCampaignIsOnline(id, !curOnline)
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
      this._getMarketList()
    },
    // 改变页数
    handleCurrentChange(val) {
      this.pageNum = val
      this._getMarketList()
    },
    // 上传banner
    handleUploadBanner(event) {
      const target = event.target
      const files = target.files
      const file = files[0]
      const { name, size } = file
      const reg = /.(pcx|emf|gif|bmp|tga|jpg|tif|jpeg|png|rle)$/g
      if (!reg.test(name)) {
        target.value = ''
        Message.error('请上传图片类型的格式！')
        return
      }
      if (size > 500000) {
        target.value = ''
        Message.error('请上传图片大小少于500kb！')
        return
      }
      const reader = new FileReader()
      reader.onload = (e) => {
        const url = e.target.result
        this.getImgStyle(url, (width, height) => {
          const obj = {
            name,
            url,
            file,
            width: width + 'px',
            height: height + 'px',
            progress: 0
          }
          uploadPic(file, function(e) {
            console.log(file)
            obj.progress = e * 100
          }).then(res => {
            obj.url = res.data.picUrl
            this.form.bannerUrl = res.data.picUrl
          })
        })
        target.value = ''
      }
      reader.readAsDataURL(file)
    },
    // 上传share
    handleUploadShare(event) {
      const target = event.target
      const files = target.files
      const file = files[0]
      const { name, size } = file
      const reg = /.(pcx|emf|gif|bmp|tga|jpg|tif|jpeg|png|rle)$/g
      if (!reg.test(name)) {
        target.value = ''
        Message.error('请上传图片类型的格式！')
        return
      }
      if (size > 500000) {
        target.value = ''
        Message.error('请上传图片大小少于500kb！')
        return
      }
      const reader = new FileReader()
      reader.onload = (e) => {
        const url = e.target.result
        this.getImgStyle(url, (width, height) => {
          const obj = {
            name,
            url,
            file,
            width: width + 'px',
            height: height + 'px',
            progress: 0
          }
          uploadPic(file, function(e) {
            obj.progress = e * 100
          }).then(res => {
            obj.url = res.data.picUrl
            this.form.shareUrl = res.data.picUrl
          })
        })
        target.value = ''
      }
      reader.readAsDataURL(file)
    },
    // 保存增加的
    handleSave() {
      const { comment, title, isOnline, bannerUrl, shareUrl, campaignUrl, timeData } = this.form
      if (!timeData) {
        return Message.error('请输入活动时间！')
      } else {
        var StartTime = new Date(timeData[0])
        var EndTime = new Date(timeData[1])
        this.form.startTime = StartTime.getFullYear() + '-' + (StartTime.getMonth() + 1) + '-' + StartTime.getDate() + ' ' + StartTime.getHours() + ':' + StartTime.getMinutes() + ':' + StartTime.getSeconds()
        this.form.endTime = EndTime.getFullYear() + '-' + (EndTime.getMonth() + 1) + '-' + EndTime.getDate() + ' ' + EndTime.getHours() + ':' + EndTime.getMinutes() + ':' + EndTime.getSeconds()
      }
      if (isNull(comment)) {
        return Message.error('请输入活动描述！')
      }
      if (comment && comment.length > 28) {
        return Message.error('活动简介不超过28个字！')
      }
      if (isNull(title)) {
        return Message.error('请输入活动标题！')
      }
      if (!isNull(title) && title.length > 36) {
        return Message.error('活动标题不超过36个字！')
      }
      if (isNull(bannerUrl)) {
        return Message.error('上传banner图片！')
      }
      if (isNull(shareUrl)) {
        return Message.error('上传分享图片！')
      }
      if (isNull(campaignUrl)) {
        return Message.error('上传活动链接！')
      }
      const { startTime, endTime } = this.form
      const obj = { comment, title, isOnline, bannerUrl, shareUrl, campaignUrl, startTime, endTime }
      if (this.isEdit) {
        const id = this.form.id
        this._updateMarketCampaign(Object.assign({ id: id }, obj))
        this.dialogFormVisible = false
        this._getMarketList()
      } else {
        this._saveMarketList(Object.assign({}, obj))
        this.dialogFormVisible = false
        this._getMarketList()
      }
    },
    _saveMarketList(form) {
      saveMarketList(form).then(res => {
        if (res.code === ERR_SUCCESS) {
          Message.success('新增活动成功')
          this._getMarketList()
        } else {
          Message.error(res.msg)
        }
      })
    },
    _updateMarketCampaign(form) {
      updateMarketCampaign(form).then(res => {
        if (res.code === ERR_SUCCESS) {
          Message.success('更新活动成功')
          this.isEdit = false
        } else {
          Message.error(res.msg)
        }
      })
    },
    getImgStyle(url, callback, px = 120) {
      const img = document.createElement('img')
      img.onload = function(e) {
        const { width, height } = e.target
        let _width, _height
        if (width > height) {
          _height = px + 'px'
          _width = px * width / height
        } else {
          _width = px + 'px'
          _height = px * height / width
        }
        callback && callback(_width, _height)
      }
      img.src = url
    },
    // 取消按钮
    cancle() {
      MessageBox.confirm('是否取消保存?', '系统提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(action => {
        this.dialogFormVisible = false
        this._getMarketList()
      }).catch(erro => {})
    },
    // 取消图片
    handleDelete(url) {
      if (url === this.form.bannerUrl) {
        this.form.bannerUrl = ''
      } else {
        this.form.shareUrl = ''
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
