<template>
  <div class="video-list">
      <p class="title"><span>首页banner</span></p>
     <div class="video-header">
       <list-table title="首页banner列表" :border="true" style="box-shadow:none">
         <slot slot="query">
           <div style="background:#f2f2f2;height:40px">
               <div class="el-icon-search" style="margin:10px;font-size:18px"><span style="font-size:12px;padding:5px">筛选查询</span></div>
           </div>
           <div class="video-header-query" style="padding:10px;">
               <div class="firstRow" style="display: inline-flex;">
                <div class="video-header-item">
                  <span class="label">标题:</span>
                  <div class="video-input-item">
                     <el-input v-model.trim="title" clearable placeholder="请输入banner标题" size="mini"></el-input>
                  </div>
              </div>
              <div class="video-header-item">
                  <span class="label">编号:</span>
                  <div class="video-input-item">
                     <el-input v-model.trim="id" clearable placeholder="请输入ID" size="mini"></el-input>
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
                  @click.native.prevent="changeOrder()"
                  type="primary"
                  size="mini">
                  <span>调整排序</span>
                </el-button>
                <el-button
                  @click.native.prevent="addList()"
                  type="primary"
                  size="mini">
                  <span>新增Banner</span>
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
            <el-table-column label="Banner标题" prop="title" align="center" width="">
            </el-table-column>
            <el-table-column label="图片" width="300" align="center">
               <template slot-scope="scope">
                 <div style="display:inline-block;text-align:left;">
                  <img :src="tableData[scope.$index].picUrl"
                    width="160" height="90">
                   </div>
                </template>
                 </el-table-column>
            <el-table-column label="链接"  width="180" align="center">
              <template slot-scope="scope">
                {{tableData[scope.$index].visitUrl}}
              </template>
            </el-table-column>
            <el-table-column label="在线状态" width="100" prop="" align="center">
              <template slot-scope="scope">
                <el-button type="text" size="small" @click="rowAction(scope.$index, tableData)">
                  {{getLine(scope.$index, tableData)}}
                </el-button>
                </template>
            </el-table-column>
            <el-table-column label="排序" align="center" width="">
              <template slot-scope="scope">
                  {{formatsort(scope.$index, tableData)}}
                </template>
            </el-table-column>
            <el-table-column label="更新时间"  width="200" align="center" prop="updateTime">
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
       <div class="order" v-if="name==='调整排序'">
         <el-table style="width: 100%;"
                    :data="tableList"
                    ref="multipleTable"
                    border
                    stripe
                    size="mini"
                    v-loading="loading"
                    header-row-class-name="element-headerRowClassName">
            <el-table-column label="排序" width="160" prop="sort" align="center">
              <template slot-scope="scope">
                <el-input v-model="tableList[scope.$index].sort" type="number" @blur="changeData(scope.$index, tableList)" style="text-align:center"></el-input>
              </template>
            </el-table-column>
            <el-table-column label="Banner标题" width="" prop="title" align="center"></el-table-column>
            <el-table-column label="状态" width="" prop="id" align="center">
              <template slot-scope="scope">
                {{getLine(scope.$index, tableList)}}
              </template>
            </el-table-column>
         </el-table>
        <div slot="footer" class="dialog-footer" style="text-align:center;margin-top:15px">
          <el-button @click="cancle" style="padding:10px 88px">取 消</el-button>
          <el-button type="primary" @click="handleSubmit" style="padding:10px 88px">确认</el-button>
        </div>
        </div>
      <div class="addForm" v-else>
       <el-form ref="form" :model="form" label-width="90px">
            <el-form-item label="Banner名称:" style="width:80%;">
              <el-input v-model="form.title" size="mini" placeholder="输入Banner名称，不超过36个字" maxlength="36"></el-input>
              <span class="msg" style="top:0px;right:-50px;">(<em>*</em>必填)</span>
            </el-form-item>
            <el-form-item label="Banner:">
              <div class="upload-item" v-if="form.picUrl">
                        <img :src="form.picUrl" style="width: 300px; height: 150px">
                        <span class="upload-item-close icon-close" @click="handleDelete()" ></span>
                </div>
                <div v-else>
                  <el-button size="small" type="primary">上传图片</el-button>
                <input type="file" class="list-upload" @change="handleUploadBanner">
                </div>
              <span class="msg" style="top:3px;left:300px;">(<em>*</em>必填，图片像素1035*474，格式为jpeg、jpg、png、bmg)</span>
            </el-form-item>
            <el-form-item label="URL链接:" style="width:80%">
              <el-input v-model="form.visitUrl" size="mini" placeholder="输入URL链接"></el-input>
              <span class="msg" style="top:5px;right:-50px;">(<em>*</em>必填)</span>
            </el-form-item>
            <el-form-item label="状态:">
              <el-radio-group v-model="form.isOnline">
                <el-radio :label="true">上线中</el-radio>
                <el-radio :label="false">已下线</el-radio>
              </el-radio-group>
            </el-form-item>
       </el-form>
        <div slot="footer" class="dialog-footer" style="text-align:center">
          <el-button @click="cancle" style="padding:10px 88px">取 消</el-button>
          <el-button type="primary" @click="handleSave" style="padding:10px 88px">保存</el-button>
        </div>
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
import { getAppIndexBannerInfoById, getAppIndexBannerList, setAppIndexBannerOnline, updateAppIndexBannerInfo, getAppIndexBannerOnlieList, setAppIndexBannerOnlieSort, saveAppIndexBannerInfo } from 'api/market'
import { isNull } from 'common/js/util'

const _onlineOptions = [{
  value: '',
  label: '状态'
}, {
  value: 'true',
  label: '上线中'
}, {
  value: 'false',
  label: '已下线'
}]
export default {
  data() {
    return {
      onlineOptions: _onlineOptions,
      id: '',
      isOnline: '',
      title: '',
      pageNum: 1,
      pageSize: 10,
      total: 0,
      loading: false,
      tableData: [],
      tableList: [],
      dialogFormVisible: false,
      name: '',
      form: {
        id: '',
        title: '',
        isOnline: false,
        picUrl: '',
        visitUrl: ''
      }
    }
  },
  created() {
    this._getAppIndexBannerList()
  },
  computed: {
  },
  methods: {
    _queryData() {
      this.pageNum = 1
      this._getAppIndexBannerList()
    },
    // 编辑触发
    editList(index, table) {
      this.dialogFormVisible = true
      if (table && table.length) {
        const isOnline = table[index].isOnline
        this.name = '编辑首页banner'
        if (isOnline) {
          Message.error('活动上线中，请下线活动再进行编辑')
          this.dialogFormVisible = false
        } else {
          const id = table[index].id
          this.isEdit = true
          this.form.id = id
          getAppIndexBannerInfoById({ id }).then(res => {
            if (res.code === ERR_SUCCESS) {
              const data = res.data
              this.form.title = data.title
              this.form.picUrl = data.picUrl
              this.form.visitUrl = data.visitUrl
              this.form.isOnline = data.isOnline
            }
          })
        }
      } else {
        this.isEdit = false
        this.name = '新增首页banner'
      }
    },
    changeData(index, table) {
      const a = table.map(item => {
        if (item.id === table[index].id) {
          item.sort = parseInt(table[index].sort)
        } else {
          item.sort = parseInt(item.sort)
        }
        return { id: item.id, sort: item.sort }
      })
      this.tab = a
    },
    // 添加活动
    addList() {
      this.isEdit = false
      this.dialogFormVisible = true
      this.name = '新增首页banner'
      this.form.title = ''
      this.form.picUrl = ''
      this.form.visitUrl = ''
      this.form.isOnline = ''
    },
    // 获取列表
    _getAppIndexBannerList(e) {
      const { title, id, isOnline, pageNum, pageSize } = this
      this.loading = true
      getAppIndexBannerList({ title, id, isOnline, pageNum, pageSize }).then(res => {
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
    // 调整排序
    changeOrder() {
      this.name = '调整排序'
      this.dialogFormVisible = true
      this._getAppIndexBannerOnlieList()
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
    // 更改状态API
    _setAppIndexBannerOnline(id, isOnline) {
      setAppIndexBannerOnline({ id, isOnline }).then(res => {
        if (res.code === ERR_SUCCESS) {
          this.pageNum = 1
          this._getAppIndexBannerList()
          Message.success('修改成功')
        } else {
          MessageBox.confirm(res.msg, '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then()
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
        this._setAppIndexBannerOnline(id, !curOnline)
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
      this._getAppIndexBannerList()
    },
    // 改变页数
    handleCurrentChange(val) {
      this.pageNum = val
      this._getAppIndexBannerList()
    },
    // 上传banner
    handleUploadBanner(event) {
      const target = event.target
      const files = target.files
      const file = files[0]
      const { name, size } = file
      const reg = /.(pcx|emf|gif|bmg|tga|jpg|tif|jpeg|png|rle)$/g
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
            this.form.picUrl = res.data.picUrl
          })
        })
        target.value = ''
      }
      reader.readAsDataURL(file)
    },
    // 保存增加的
    handleSave() {
      const { title, isOnline, picUrl, visitUrl } = this.form
      if (isNull(title)) {
        return Message.error('请输入banner名称！')
      }
      if (!isNull(title) && title.length > 36) {
        return Message.error('活动标题不超过36个字！')
      }
      if (isNull(picUrl)) {
        return Message.error('上传banner图片！')
      }
      if (isNull(visitUrl)) {
        return Message.error('上传URL链接！')
      }
      const obj = { title, isOnline, picUrl, visitUrl }
      if (this.isEdit) {
        const id = this.form.id
        this._updateAppIndexBannerInfo(Object.assign({ id: id }, obj))
      } else {
        this._saveAppIndexBannerInfo(Object.assign({}, obj))
      }
      this._getAppIndexBannerList()
    },
    _saveAppIndexBannerInfo(form) {
      saveAppIndexBannerInfo(form).then(res => {
        if (res.code === ERR_SUCCESS) {
          this.dialogFormVisible = false
          Message.success('新增活动成功')
        } else {
          Message.error(res.msg)
        }
      })
    },
    _updateAppIndexBannerInfo(form) {
      updateAppIndexBannerInfo(form).then(res => {
        if (res.code === ERR_SUCCESS) {
          Message.success('更新首页banner成功')
          this.isEdit = false
          this.dialogFormVisible = false
          this._getAppIndexBannerList()
        } else {
          return Message.error(res.msg)
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
        this._getAppIndexBannerList()
      }).catch(erro => {})
    },
    // 取消图片
    handleDelete() {
      this.form.picUrl = ''
    },
    // 格式化序号
    formatsort(index, table) {
      const sort = table[index].sort
      if (sort) {
        return sort
      } else {
        return '--'
      }
    },
    // 获取首页Banner上线状态列表信息
    _getAppIndexBannerOnlieList() {
      getAppIndexBannerOnlieList().then(res => {
        if (res.code === ERR_SUCCESS) {
          this.tableList = res.data
        }
      })
    },
    handleSubmit() {
      const b = this.tab.map(item => {
        return item.sort
      })
      const newb = b.sort()
      for (let i = 0; i < newb.length; i++) {
        if (newb[i] < 0) {
          return Message.error('请填写正确数字')
        } else if (newb[i] === newb[i + 1]) {
          return Message.error('有重复排列号')
        } else if (!newb[i]) {
          return Message.error('排序号不能为空')
        }
      }
      const sortStr = JSON.stringify(this.tab)
      setAppIndexBannerOnlieSort({ sortStr }).then(res => {
        if (res.code === ERR_SUCCESS) {
          this.dialogFormVisible = false
          this.pageNum = 1
          this._getAppIndexBannerList()
        }
      })
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
