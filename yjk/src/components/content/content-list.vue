<template>
  <div class="custom-page">
    <p class="logistics-title"><span>文章列表</span></p>
    <div class="custom-page-left">
      <div class="custom-page-left-content">
        <list-table title="文章列表" :border="true">
          <slot slot="query">
            <div style="background: #f2f2f2; height: 40px;"></div>
            <div style="padding: 20px 0px">
               <ul class="screening">
                <li>
                  <span class="member-input-label">栏目：</span>
                  <div class="member-input-item">
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
                </li>
                <li>
                  <span class="member-input-label">专题：</span>
                  <div class="member-input-item">
                    <el-select
                    v-model="topicid"
                    placeholder="请选择"
                    filterable
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
                </li>
                <li style="width: 60%">
                  <span  class="member-input-label">发布日期：</span>
                  <div class="member-input-item">
                    <el-date-picker type="date" size="mini" v-model="createTime" placeholder="起始时间" style="width: 160px;">
                    </el-date-picker>
                    <el-date-picker type="date" size="mini" v-model="updateTime" placeholder="结束时间" style="width: 160px;">
                    </el-date-picker>
                  </div>
                </li>
              </ul>
              <ul class="screening">
                <li style="width:40%">
                  <span class="member-input-label">文章标题：</span>
                  <div class="member-input-item" >
                    <el-input placeholder="请输入搜索标题内容" clearable v-model.trim="title" size="mini" style="margin-right: 10px;" >
                      <i slot="prefix" class="el-input__icon el-icon-search"></i>
                    </el-input>
                  </div>
                </li>
                <!-- <li>
                  <span class="member-input-label">文章分类：</span>
                  <div class="member-input-item">
                    <el-cascader
                      clearable
                      size="mini"
                      v-model="ids"
                      :options="listSort"
                      change-on-select
                    ></el-cascader>
                  </div>
                </li> -->
                 <li  style="width:35%">
                  <span class="member-input-label">文章编号：</span>
                  <div class="member-input-item">
                   <el-input placeholder="请输入文章编号" clearable v-model.trim="id" size="mini"></el-input>
                  </div>
                </li>
                <li>
                  <div class="member-input-item">
                  <el-button size="mini"  type="primary" style=" width: 56px; float: left;" @click="_queryData">查询</el-button>
                    <!-- <el-button size="mini"  @click="_resetData"  style=" width: 56px; float: left;">重置</el-button> -->
                  </div>
                </li>
              </ul>
            </div>
          </slot>
          <div class="custom-table">
            <p style="height: 40px"  v-show="name !== 'content'">
              <el-button size="mini" style="float: right; background: #00bafa; color: #fff">
                <router-link to="contentList/addarticle">添加文章</router-link>
             </el-button></p>
            <el-table style="width: 100%;"
                      :data="tableData"
                      v-loading="loading"
                      @select = "selectOn"
                      @select-all = "selectAll"
                      ref="multipleTable"
                      border
                      stripe
                      size="mini"
                      header-row-class-name="element-headerRowClassName">
              <el-table-column
                type="selection"
                width="55">
              </el-table-column>
              <el-table-column label="编号" width="60" prop="id" align="center"></el-table-column>
                <el-table-column label="标题" width="" prop="title" align="center">
                <template slot-scope="scope">
                  <p class="preview" @click="previewHtml(scope.$index, tableData)" style="text-align: left">
                    <span v-if="tableData[scope.$index].isTop" class="isTops"></span>
                    {{tableData[scope.$index].title}}
                  </p>
                </template>
              </el-table-column>
              <el-table-column label="URL" prop="contentUrl" align="center" width="250">
              </el-table-column>
              <el-table-column v-for="column in columnData"
                               :label="column.label"
                               :width="column.width"
                               :align="column.align"
                               :prop="column.prop"
                               :key="column.prop">
              </el-table-column>
              <el-table-column label="显示" width="80px" align="center">
                <template slot-scope="scope">
                  <el-switch
                    v-model="scope.row.isShow"
                    @change="changeSwitch( scope.$index, tableData )"
                    active-color="#13ce66"
                    inactive-color="#ff4949"
                    :active-value="true"
                    :inactive-value="false">
                  </el-switch>
                </template>
              </el-table-column>
              <el-table-column label="操作" width="120px" align="center" v-if="name !== 'content'">
                <template slot-scope="scope">
                  <el-button
                    @click.native.prevent="editAction( scope.$index, tableData)"
                    class="custom-columnButton"
                    type="text"
                    size="small">
                    <span>编辑</span>
                  </el-button>

                  <el-button
                    @click.native.prevent="deleteAction( scope.$index, tableData)"
                    class="custom-columnButton"
                    type="text"
                    size="small">
                    <span>删除</span>
                  </el-button>
                </template>
              </el-table-column>
            </el-table>
            <div style="margin-top: 20px; float: left">
              <el-button @click="batchDelete" size="mini">批量删除</el-button>
              <el-button @click="batchShow(1)"  size="mini">批量显示</el-button>
              <el-button @click="batchShow(0)"  size="mini">批量不显示</el-button>
            </div>
            <div class="custom-pagination">
              <div class="achievement-pagination-content">
                <el-pagination
                  @size-change="handleSizeChange"
                  @current-change="handleCurrentChange"
                  :current-page= pageNum
                  :page-sizes="[10, 20, 50, 100]"
                  :page-size= pageSize
                  layout="total, sizes, prev, pager, next, jumper"
                  :total=total>
                </el-pagination>
              </div>
            </div>
          </div>
        </list-table>
      </div>
      <div v-if="dialogVisible">
      <el-dialog title="文章预览"  :visible.sync="dialogVisible" width="25%">
        <content-preiew :list="list"></content-preiew>
      </el-dialog>
    </div>
    </div>
    <div>
      <router-view></router-view>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
import { RadioGroup, Select, Option, Message, MessageBox, RadioButton, Cascader, Switch, DatePicker, Button, Table, TableColumn, Pagination, Input, Dialog } from 'element-ui'
// import cDialog from 'base/c-dialog/c-dialog'
import listTable from 'base/list-table/list-table'
import { ERR_SUCCESS } from 'api/config'
import { format } from 'common/js/util'
// import { getCategoryList } from 'api/category'
import { getList, deleteDiscContent, updateDiscContentStatus, getColumnList } from 'api/content'
import ContentPreiew from './content-preiew'
export default {
  data() {
    return {
      loading: false,
      selectData: [],
      id: '',
      selectId: [],
      selecttext: [],
      contentid: '',
      columnId: '',
      ids: [],
      listSort: [],
      updateTime: '',
      startMoney: '',
      type: '',
      feedbackoop: '',
      startTime: '',
      title: '',
      categoryid: '',
      createTime: '',
      topicOptions: [], // 专题列表
      topicid: '', // 专题id
      pageNum: 1,
      pageSize: 10,
      total: 20,
      value1: '1',
      options: [],
      selectedOptions2: [],
      columnData: [
        { prop: 'categoryName', label: '分类', width: '80', align: 'center' },
        { prop: 'picLayoutName', label: '布局类型', width: '72', align: 'center' },
        { prop: 'columnName', label: '栏目', width: '80', align: 'center' },
        { prop: 'publishTime', label: '发布时间', width: '140', align: 'center' },
        { prop: 'pv', label: '浏览量(PV)', width: '90', align: 'center' },
        { prop: 'uv', label: '浏览量(UV)', width: '90 ', align: 'center' }
      ],
      tableData: [],
      dialogVisible: false,
      list: {},
      name: ''
    }
  },
  created() {
    this._getArticleList()
    // this._getBaseTypeList()
    this._getColumnList()
    this.name = sessionStorage.getItem('name')
  },
  methods: {
    selectOn(val) { // 选中
      this.selectData = []
      this.selectData.push(val)
    },
    selectAll(val) { // 全选
      this.selectData = []
      this.selectData.push(val)
    },
    _getArticleList(reset) { // 列表数据获取
      if (reset) {
        this.pageNum = 1
      }
      this.loading = true
      const { title, ids, createTime, updateTime, pageNum, pageSize, columnId, topicid, id } = this
      let categoryid = ''
      let _createTime = ''
      let _updateTime = ''
      let columnid = ''
      if (!createTime) {
        _createTime = ''
      } else {
        _createTime = format(createTime, '$1-$2-$3') + ' 00:00:00'
      }
      if (!updateTime) {
        _updateTime = ''
      } else {
        _updateTime = format(updateTime, '$1-$2-$3') + ' 23:59:59'
      }
      if (ids.length > 0) {
        categoryid = ids[ids.length - 1]
      } else {
        categoryid = ''
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
      if ((!_createTime && _updateTime) || ((_createTime && !_updateTime))) {
        return Message.error('请上传时间段！')
      }
      getList({ contentType: 1, title, categoryid, startTime: _createTime, endTime: _updateTime, pageNum, pageSize, columnid, id, type: 2 }).then(res => {
        if (res.code === ERR_SUCCESS) {
          // console.log(res.data)
          this.tableData = res.data.dataList
          this.pageSize = res.data.pageSize
          this.pageNum = res.data.pageNum
          this.total = res.data.total
          this.loading = false
        }
      })
    },
    _format(e) {
      return format(e)
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
          // console.log(res.data)
          this.options = res.data
        }
      })
    },
    // _getBaseTypeList () {
    //   getCategoryList({type: 1}).then(res => {
    //     if (res.code === ERR_SUCCESS) {
    //       let data = res.data
    //       this.listSort = quickSortArr(data)
    //     }
    //   })
    // },
    _resetData() {
      this.title = ''
      this.ids = []
      this.createTime = null
      this.updateTime = null
      this._getArticleList()
    },
    changeSwitch(index, table) { // 是否显示
      const isShow = table[index].isShow
      const ids = table[index].id
      MessageBox.confirm('是否修改状态?', '系统提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(action => {
        this._getArticleState(isShow, ids)
      }).catch(erro => {
        if (table[index].isShow) {
          table[index].isShow = false
        } else {
          table[index].isShow = true
        }
      })
    },
    _getArticleState(isShow, ids) {
      updateDiscContentStatus({ isShow, ids }).then(res => {
        if (res.code === ERR_SUCCESS) {
          this._getArticleList()
          Message.success('修改成功')
        } else {
          Message.success('操作成功')
        }
      })
    },
    batchShow(type) { // 批量显示先关
      MessageBox.confirm('是否修改状态?', '系统提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(action => {
        if (type === 1) { // 批量显示
          const id = this.joinArray()
          this._getArticleState(1, id)
        } else {
          const id = this.joinArray()
          this._getArticleState(0, id)
        }
      }).catch(erro => {

      })
    },
    joinArray() {
      this.selectId = []
      this.selectData[0].forEach((e, index) => {
        this.selectId.push(e['id'])
      })
      if (this.selectId.length > 1) {
        return this.selectId.join(',')
      } else {
        return this.selectId[0]
      }
    },
    deleteAction(index, row) {
      const id = row[index].id
      this._messageTitle(id)
    },
    _delArticle(rowid) {
      deleteDiscContent({ ids: rowid }).then(res => {
        if (res.code === ERR_SUCCESS) {
          this._getArticleList()
          Message.success('删除成功')
        } else {
          Message.success('操作成功')
        }
      })
    },
    batchDelete() { // 删除
      const id = this.joinArray()
      this.selectData = []
      this._messageTitle(id)
    },
    _messageTitle(id) {
      MessageBox.confirm('是否确认删除?', '系统提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(action => {
        this._delArticle(id)
      }).catch(erro => {
      })
    },
    editAction(index, row) {
      const data = row[index]
      const id = data.id
      const name = data.layoutName
      // eslint-disable-next-line standard/object-curly-even-spacing
      this.$router.push({ path: '/content/contentEdit', query: { id, name, e: 1 }})
    },
    _queryData() { // 条件查询
      this._getArticleList('reset')
    },
    handleSizeChange(val) { // 分页 设置多少条
      this.pageSize = val
      this._getArticleList()
    },
    handleCurrentChange(val) { // 分页 设置多少条
      this.pageNum = val
      this._getArticleList()
    },
    handleChange(value) {
    },
    previewHtml(index, row) {
      const data = row[index]
      const ids = data.id
      // this.$router.push({path: '/content/contentList/preiew', query: {ids}})
      this.list = { ids }
      console.log(this.list)
      this.dialogVisible = true
    },
    goBack() {
      this.dialogVisible = false
    }
  },
  // watch: {
  //   $route () {
  //     const { path } = this.$route
  //     if (path === '/content/contentList') {
  //       this._getArticleList()
  //     }
  //   }
  // },
  components: {
    [RadioGroup.name]: RadioGroup,
    [RadioButton.name]: RadioButton,
    [DatePicker.name]: DatePicker,
    [Button.name]: Button,
    [Table.name]: Table,
    [TableColumn.name]: TableColumn,
    [Pagination.name]: Pagination,
    [Input.name]: Input,
    [Select.name]: Select,
    [Option.name]: Option,
    [Switch.name]: Switch,
    [Cascader.name]: Cascader,
    [Dialog.name]: Dialog,
    listTable,
    Message,
    ContentPreiew
  }
}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~common/css/variable"
  @import "~common/css/mixin"
  @import "~common/css/elementCustom"
  .custom-page
    height 100%
    .logistics-title
      height 40px
      line-height 40px
      background-color #f2f2f2
      color #a4a4a4
      span
        margin-left 10px
        padding-left 10px
        font-size 14px
        border-left 2px solid #00bafa
  .custom-page-left
    height calc(100% - 40px)
    overflow-y auto
  .list-table-content
    padding 0 15px
  .custom-table
    margin-top 20px
    padding 0 15px
  .isTops
    height 30px
    width 30px
    display inline-block
    background url("../../static/isTop.png")
    background-size 100%
  .screening
    height 40px
    line-height 40px
    li
      float left
      width 20%
      height 40px
      .member-input-item
        display block
        margin-left 80px
      .member-input-label
        margin-left 20px
        float left
        display inline-block
  .custom-pagination
    height 40px
    line-height 40px
    .achievement-pagination-content
      float right
      margin-top 20px
      height 40px
      padding-right 15px
  .preview
    cursor pointer

</style>
