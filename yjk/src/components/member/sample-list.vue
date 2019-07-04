<template>
  <div class="custom-page">
    <p class="logistics-title"><span>标品列表</span></p>
    <div class="custom-page-left">
      <div class="custom-page-left-content">
        <list-table title="标品列表" :border="true">
          <slot slot="query">
            <div style="background: #f2f2f2; height: 40px;">
               <div class="el-icon-search" style="margin:10px;font-size:18px"><span style="font-size:12px;padding:5px">筛选查询</span></div>
            </div>
            <div style="padding: 20px 0px">
              <ul class="screening">
                 <li>
                  <span class="member-input-label">标签分类：</span>
                  <div class="member-input-item">
                  <el-select v-model="labelId" placeholder="选择分类" size="mini" clearable style="width:95%">
                  <el-option
                        v-for="item in labelList"
                        :key="item.id"
                        :label="item.labelName"
                        :value="item.id">
                  </el-option>
                  </el-select>
                  </div>
                </li>
                <li>
                  <span class="member-input-label">标品名称：</span>
                  <div class="member-input-item">
                    <el-input placeholder="输入标品名称" clearable v-model="name" size="mini" style="margin-right: 10px;width:92%">
                    </el-input>
                  </div>
                </li>
                <li style="width: 60%">
                  <span  class="member-input-label">发布日期：</span>
                  <div class="member-input-item">
                     <el-date-picker
                      v-model="timeData"
                      style="width: 38%"
                      type="daterange"
                      range-separator="至"
                      size="mini"
                      start-placeholder="开始日期"
                      end-placeholder="结束日期"
                      :pickerOptions="pickerOptions">
                    </el-date-picker>
                    <el-button size="mini"  type="primary" style="margin-left: 10px;" @click="_queryData">查询</el-button>
                  </div>
                </li>
              </ul>
            </div>
          </slot>
          <div class="custom-table">
            <el-table style="width: 100%;"
                      :data="tableData"
                      v-loading="loading"
                      ref="multipleTable"
                      border
                      stripe
                      size="mini"
                      header-row-class-name="element-headerRowClassName">
              <el-table-column label="序号" width="50" align="center">
                <template slot-scope="scope">
                  {{scope.$index + 1}}
                </template>
              </el-table-column>
                <el-table-column label="分类" width="60" align="center">
                  <template slot-scope="scope">
                  {{tableData[scope.$index].standardType === 1 ? '单品' : '套餐'}}
                </template>
              </el-table-column>
              <el-table-column label="标品图片" width="180"  align="center">
                <template slot-scope="scope">
                  <img :src="tableData[scope.$index].url" style="width:150px; height: 100px;" >
                </template>
              </el-table-column>
              <el-table-column label="标品名称" width="120" prop="name" align="center">
              </el-table-column>
              <el-table-column label="商品组合" width="300" prop="" align="center">
                <template slot-scope="scope">
                   <p style="text-align: left">
                    {{tableData[scope.$index].combineName}}
                  </p>
                </template>
              </el-table-column>
              <el-table-column label="价格" width="80"  align="center">
                <template slot-scope="scope">
                   {{`￥${_formatCurrency(tableData[scope.$index].amountSale)}`}}
                </template>
              </el-table-column>
              <el-table-column label="年龄" width="70"  align="center" prop="">
                <template slot-scope="scope">
                   {{_formatAge(scope.$index, tableData)}}
                </template>
              </el-table-column>
              <el-table-column label="标签分类" width="80" prop="labelName" align="center">
              </el-table-column>
              <el-table-column label="上传者" width="80" prop="createName" align="center">
              </el-table-column>
              <el-table-column label="发布时间" width="140" prop="publicTime" align="center">
                 <template slot-scope="scope" style="text-align: left">
                   {{tableData[scope.$index].publicTime}}
                </template>
              </el-table-column>
              <el-table-column label="发布者" width="80" prop="publicName" align="center">
              </el-table-column>
              <el-table-column label="操作" width="" align="center">
                <template slot-scope="scope">
                  <el-button
                    @click.native.prevent="editAction( scope.$index, tableData)"
                    class="custom-columnButton"
                    type="text"
                    size="small">
                    <span>关闭</span>
                  </el-button>
                </template>
              </el-table-column>
            </el-table>
            <div class="custom-pagination">
              <div class="achievement-pagination-content">
                <el-pagination
                  @size-change="handleSizeChange"
                  @current-change="handleCurrentChange"
                  :current-page= 'pageNum'
                  :page-sizes="[10, 20, 50, 100]"
                  :page-size= 'pageSize'
                  layout="total, sizes, prev, pager, next, jumper"
                  :total='total'>
                </el-pagination>
              </div>
            </div>
          </div>
        </list-table>
      </div>
    </div>
    <div>
      <router-view></router-view>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
import { RadioGroup, Select, Option, Message, MessageBox, RadioButton, Cascader, Switch, DatePicker, Button, Table, TableColumn, Pagination, Input } from 'element-ui'
import listTable from 'base/list-table/list-table'
import { ERR_SUCCESS } from 'api/config'
import { formatCurrency, format } from 'common/js/util'
import { getLabel, getStandardProductList, updateStatus } from 'api/sample'
export default {
  data() {
    return {
      status: '1',
      labelId: '',
      name: '',
      startDate: '',
      endDate: '',
      labelList: [],
      loading: false,
      timeData: [],
      StartTime: '',
      EndTime: '',
      pageNum: 1,
      pageSize: 10,
      tableData: [],
      total: 0,
      pickerOptions: {
        disabledDate(time) {
          return time.getTime() > Date.now() - 8.64e6
        }
      }
    }
  },
  created() {
    this._getStandardProductList()
    this._getLabel()
  },
  methods: {
    // 获取标签分类
    _getLabel() {
      getLabel().then(res => {
        if (res.code === ERR_SUCCESS) {
          this.labelList = res.data
        } else {
          Message.error(res.msg)
        }
      })
    },
    // 获取标品列表
    _getStandardProductList() {
      const { status, labelId, name, pageNum, pageSize, timeData } = this
      if (timeData && timeData.length > 0) {
        this.startDate = format(timeData[0], '$1-$2-$3')
        this.endDate = format(timeData[1], '$1-$2-$3')
        this.StartTime = this.startDate + ' 00:00:00'
        this.EndTime = this.endDate + ' 23:59:59'
      } else {
        this.startDate = ''
        this.endDate = ''
        this.StartTime = this.startDate
        this.EndTime = this.endDate
      }
      const { StartTime, EndTime } = this
      const obj = { status, labelId, name, pageNum, pageSize, startDate: StartTime, endDate: EndTime }
      this.loading = true
      getStandardProductList(obj).then(res => {
        if (res.code === ERR_SUCCESS) {
          this.loading = false
          this.tableData = res.data.dataList
          // console.log(res.data.dataList)
          this.total = res.data.total
        }
      })
    },
    _formatCurrency(e) {
      return formatCurrency(e)
    },
    _formatAge(index, table) {
      const age = table[index].agePeriod
      switch (age) {
        case 1:
          return '15-35岁'
        case 2:
          return '36-45岁'
        case 3:
          return '46-60岁'
        case 4:
          return '60岁+'
        case 0:
          return '未知年龄'
      }
    },
    editAction(index, table) { // 是否显示
      const id = table[index].id
      MessageBox.confirm('你确认要关闭标品，关闭后APP端将不再显示哦?', '标品关闭', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(action => {
        updateStatus({ id, status: 0 }).then(res => {
          if (res.code === ERR_SUCCESS) {
            this._getStandardProductList()
            console.log(res.msg)
          }
        })
      }).catch(erro => {})
    },
    _queryData() { // 条件查询
      this._getStandardProductList()
    },
    handleSizeChange(val) { // 分页 设置多少条
      this.pageSize = val
      this._getStandardProductList()
    },
    handleCurrentChange(val) { // 分页 设置多少条
      this.pageNum = val
      this._getStandardProductList()
    },
    handleChange(value) {
    }
  },
  watch: {
    $route() {
      const { path } = this.$route
      if (path === '/member/sampleList') {
        this._getStandardProductList()
      }
    }
  },
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
    listTable,
    Message
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
