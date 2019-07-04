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
                    <el-input placeholder="输入标品名称" clearable v-model="name" size="mini" style="margin-right: 10px; width:92%">
                    </el-input>
                  </div>
                </li>
                <li style="width: 60%">
                  <span  class="member-input-label">上传日期：</span>
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
            <p style="height: 40px">
              <el-button size="mini" style="float: right; background: #00bafa; color: #fff"
              @click="addGoods">
              添加标品
                <!-- <router-link to='sampleReleased/sampleAdd'>添加标品</router-link> -->
             </el-button></p>
            <el-table style="width: 100%;"
                      :data="tableData"
                      v-loading="loading"
                      ref="multipleTable"
                      border
                      stripe
                      size="mini"
                      header-row-class-name="element-headerRowClassName">
              <el-table-column label="序号" width="60" align="center">
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
              <el-table-column label="标品名称" width="100" prop="name" align="center">
              </el-table-column>
              <el-table-column label="商品组合" width=""  align="center">
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
              <el-table-column label="年龄" width="65"  align="center" prop="">
                <template slot-scope="scope">
                  {{_formatAge(scope.$index, tableData)}}
                </template>
              </el-table-column>
              <el-table-column label="标签分类" width="80" prop="labelName" align="center">
              </el-table-column>
              <el-table-column label="上传者" width="80" prop="createName" align="center">
              </el-table-column>
              <el-table-column label="上传时间" width="150" prop="createTime" align="center">
              </el-table-column>
              <el-table-column label="操作" width="100" align="center">
                <template slot-scope="scope">
                  <el-button
                    @click.native.prevent="rowAction( scope.$index, tableData, 'preview')"
                    type="text"
                    size="small"
                  >
                    <div>预览</div>
                  </el-button>
                   <el-button
                    @click.native.prevent="rowAction( scope.$index, tableData, 'edit')"
                    type="text"
                    size="small"
                    style="margin-left:0; border:none">
                    <div>编辑</div>
                  </el-button>
                   <el-button
                    @click.native.prevent="rowAction( scope.$index, tableData, 'publish')"
                    type="text"
                    size="small"
                    style="margin-left:0; border:none">
                    <div>发布</div>
                  </el-button>
                   <el-button
                    @click.native.prevent="rowAction( scope.$index, tableData, 'delete')"
                    type="text"
                    size="small"
                    style="margin-left:0; border:none">
                    <div>删除</div>
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
                  :total=total>
                </el-pagination>
              </div>
            </div>
          </div>
        </list-table>
      </div>
       <div v-if="dialogVisible">
      <c-dialog title="标品预览"  :visible.sync="dialogVisible" @close="goBack">
        <sample-preview :list="list"></sample-preview>
      </c-dialog>
    </div>
    </div>
    <div>
      <!-- <router-view></router-view> -->
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
import { RadioGroup, Select, Option, Message, MessageBox, RadioButton, Cascader, Switch, DatePicker, Button, Table, TableColumn, Pagination, Input } from 'element-ui'
import cDialog from 'base/c-dialog/c-dialog'
import listTable from 'base/list-table/list-table'
import { ERR_SUCCESS } from 'api/config'
import { formatCurrency, format } from 'common/js/util'
import { getLabel, getStandardProductList, updateStatus } from 'api/sample'
import samplePreview from './sample-preview'
export default {
  data() {
    return {
      dialogVisible: false,
      status: '0',
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
      list: {},
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
    _getLabel() {
      getLabel().then(res => {
        if (res.code === ERR_SUCCESS) {
          this.labelList = res.data
        } else {
          Message.error(res.msg)
        }
      })
    },
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
      const obj = { status, labelId, name, pageNum, pageSize, startTime: StartTime, endTime: EndTime }
      this.loading = true
      getStandardProductList(obj).then(res => {
        if (res.code === ERR_SUCCESS) {
          // console.log(res.data)
          this.tableData = res.data.dataList
          this.total = res.data.total
          this.loading = false
        }
      })
    },
    addGoods() {
      this.$router.push({ path: '/member/sampleAdd' })
    },
    _formatCurrency(e) {
      return formatCurrency(e)
    },
    goBack() {
      this.dialogVisible = false
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
    rowAction(index, table, type) {
      const id = table[index].id
      if (type === 'edit') {
        // console.log(id)
        // eslint-disable-next-line standard/object-curly-even-spacing
        this.$router.push({ path: '/member/sampleAdd', query: { id, e: 1 }})
      } else if (type === 'delete') {
        MessageBox.confirm('是否确定删除?', '系统提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(action => {
          updateStatus({ id, status: -1 }).then(res => {
            if (res.code === ERR_SUCCESS) {
              Message.success('删除成功')
              this._getStandardProductList()
            } else {
              Message.error(res.msg)
            }
          })
        }).catch(erro => {
        })
      } else if (type === 'preview') {
        this.dialogVisible = true
        this.list = { id }
      } else if (type === 'publish') {
        MessageBox.confirm('是否确定发布?', '系统提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(action => {
          updateStatus({ id, status: 1 }).then(res => {
            if (res.code === ERR_SUCCESS) {
              Message.success('发布成功')
              this._getStandardProductList()
            } else {
              MessageBox.alert('对应标品已存在，请到【发布列表】关闭后再重新发布！', '发布失败！', {
                confirmButtonText: '我知道了'
              }).catch(erro => {})
              // Message.error('发布失败！对应标品已存在，请到【发布列表】关闭后再重新发布！')
            }
          })
        }).catch(erro => {
          if (table[index].status === '0') {
            table[index].status = 1
          }
        })
      }
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
    [cDialog.name]: cDialog,
    listTable,
    Message,
    samplePreview
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
