<template>
<div>
  <div class="member-page">
    <p class="title"><span>资料审核</span></p>
    <div class="member-header">
      <list-table title="资料审核" :border="true" style="box-shadow: none;">
        <slot slot="query">
          <div class="member-header-query">
            <div class="member-header-item">
              <span class="label">ID：</span>
              <div class="member-input-item">
                <el-input placeholder="请输入解忧师ID" clearable  v-model="code" size="mini" ></el-input>
              </div>
            </div>
            <div class="member-header-item">
              <span class="label" style="width: 55px;">账号：</span>
              <div class="member-input-item">
                <el-input placeholder="请输入解忧师账号" clearable v-model="account" size="mini" ></el-input>
              </div>
            </div>
            <div class="member-header-item">
              <el-button size="mini" type="primary" @click="query" style="vertical-align: middle;">查询</el-button>
            </div>
          </div>
        </slot>

        <div class="member-table">
          <el-table style="width: 100%;"
                    :data="tableData"
                    ref="multipleTable"
                    border
                    size="mini"
                    v-loading="loading"
                    header-row-class-name="element-headerRowClassName">
            <el-table-column label="解忧师ID" width="" prop="code" align="center"></el-table-column>
            <el-table-column label="提交审核时间" width="" prop="updateTime" align="center"></el-table-column>
            <el-table-column label="个人主页资料" width="" prop="" align="center">
              <template slot-scope="scope">
                {{scope.row.auditState ? '完善': '未完善'}}
              </template>
            </el-table-column>
            <el-table-column label="审核状态" width="200" prop="" align="center">
              <template slot-scope="scope">
                {{tableData[scope.$index].state ===1 ? '审核通过':tableData[scope.$index].state===-1?'不通过':'待审核'}}
              </template>
            </el-table-column>
            <el-table-column label="更新提示" width="200" prop="" align="center">
              <template slot-scope="scope">
                {{tableData[scope.$index].state ===1 ? '资料已更新':tableData[scope.$index].state===-1?'':'资料有更新'}}
              </template>
            </el-table-column>
            <el-table-column label="操作" width="200" prop="" align="center">
              <template slot-scope="scope">
                <el-button type="text" size="small" @click="showDialog(scope.$index, tableData)">
                  资料审核详情
                </el-button>
              </template>
            </el-table-column>
          </el-table>
          <div class="member-pagination">
            <div class="member-pagination-content">
              <el-pagination
                :page-sizes="[10, 20, 50, 100]"
                :page-size="pageSize"
                :current-page="pageNum"
                layout="total, sizes, prev, pager, next, jumper"
                @current-change="(n)=> this.changePage('pageNum', n)"
                @size-change="(n)=> this.changePage('pageSize', n)"
                @next-click="(n)=> this.changePage('pageNum', n)"
                @prev-click="(n)=> this.changePage('pageNum', n)"
                :total="total">
              </el-pagination>
            </div>
          </div>
        </div>
      </list-table>
    </div>
  </div>
   <el-dialog  title="审核资料详情" :visible.sync="dialogVisible">
    <div class="content-manage-item">
     <el-form  label-width="100px" :data="tabData">
      <el-form-item label="头像:">
       <img :src="tabData.portraitUrl"  style="width:100px">
       <span>(*必填)</span>
      </el-form-item>
      <el-form-item label="封面图片:">
        <img :src="tabData.bgiUrl" style="width:200px" >
         <span>(*必填)</span>
      </el-form-item>
      <el-form-item label="昵称:">
        {{tabData.nickname}}
         <span>(*必填)</span>
      </el-form-item>
      <el-form-item label="签名:">
        {{tabData.nickname}}
         <span>(*必填)</span>
      </el-form-item>
      <el-form-item label="语音介绍:">
        <audio :src="tableData"></audio>
         <span>(*必填)</span>
      </el-form-item>
       <el-form-item label="性别:">
        {{tabData.sex===1? '女': tabData.sex===2 ? '男':'未知'}}
         <span>(*必填)</span>
      </el-form-item>
      <el-form-item label="年龄:">
        {{tabData.age}}
         <span>(*必填)</span>
      </el-form-item>
      <el-form-item label="城市:">
        {{tabData.city}}
         <span>(*必填)</span>
      </el-form-item>
      <el-form-item label="个人标签:">
       <ul>
         <li v-for="(tag, index) in tagList" :key="index">
           {{tag}}
         </li>
          <span>(*必填)</span>
       </ul>
      </el-form-item>
       <el-form-item label="个人简介:">
         <el-input type="textarea" v-model="tabData.information" disabled :rows="7" style="width:80%;color:#333"></el-input>
          <span>(*必填)</span>
      </el-form-item>
      <el-form-item style="text-align:center" v-if="!tabData.state" >
        <el-button size="small" @click="submit(tabData, false)">不通过</el-button>
        <el-button type="primary" size="small" @click="submit(tabData, true)">通过</el-button>
      </el-form-item>
    </el-form>
    </div>
  </el-dialog>
  <el-dialog title="不通过理由" :visible.sync="innerDialog">
    <el-input type="textarea" v-model="content" :placeholder="placeholder" :rows="10" ></el-input>
    <div style="text-align: center;margin-top:10px;">
      <el-button size="small"  type="primary" @click="submitReason(tabData, true)">确定</el-button>
      <el-button size="small" @click="innerDialog === false">取消</el-button>
    </div>
  </el-dialog>
  </div>
</template>

<script type="text/ecmascript-6">
import {
  Input, Button, DatePicker, Table, TableColumn, Switch, Message,
  Pagination, Checkbox, Select, Option, Dialog, Form, FormItem, MessageBox
} from 'element-ui'
import listTable from 'base/list-table/list-table'
import cDialog from 'base/c-dialog/c-dialog'
import { ERR_SUCCESS } from 'api/config'
import { getPlfConsultAuditHisList, getPlfConsultAuditHisById, updatePlfConsultAuditHis } from 'api/consultant'

const placeholder = `请填写审核资料不通过的理由，将以通知消息的形式告知顾问，参考案例如下：
1. 上传头像不符合规范
2 .个人主页背景图片模糊
3.顾问昵称填写太长
4.头像和性别不一致
......`
export default {
  data() {
    return {
      code: '',

      name: '',
      account: '',
      mobile: '',
      pageSize: 10,
      pageNum: 1,
      total: 0,
      tableData: [],
      loading: false,
      show: false,
      tabData: [],
      dialogVisible: false,
      innerDialog: false,
      tagList: [],
      content: '',
      placeholder: placeholder
    }
  },
  created() {
    this.query()
  },
  methods: {
    // 获取列表
    _getList(e) {
      this.loading = true
      const { code, name, account, mobile, pageSize, pageNum } = this
      const obj = { code, name, account, mobile, pageSize, pageNum }
      getPlfConsultAuditHisList(obj).then(res => {
        if (res.code === ERR_SUCCESS) {
          const data = res.data
          this.tableData = data.dataList
          this.total = data.total
          this.loading = false
        }
      })
    },
    // 点击查询
    query() {
      this.pageNum = 1
      this._getList()
    },
    // 页面变化
    changePage(key, num) {
      switch (key) {
        case 'pageSize':
          this.pageSize = num
          this._getList()
          break
        case 'pageNum':
          this.pageNum = num
          this._getList()
          break
        default:
          break
      }
    },
    // 资料详情查询
    showDialog(index, table) {
      this.dialogVisible = true
      const id = table[index].id
      getPlfConsultAuditHisById({ id }).then(res => {
        if (res.code === ERR_SUCCESS) {
          this.tabData = res.data
          this.tagList = res.data.tags.split(',')
        } else {
          Message.error(res.msg)
        }
      })
    },
    submit(data, state) {
      const { id, consultid } = data
      const content = 'hahah'
      if (state) {
        MessageBox.confirm('点击确认后个人资料审核通过  并更新到APP个人主页资料', '资料更新', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(action => {
          updatePlfConsultAuditHis({ id, consultid, state, content }).then(res => {
            if (res.code === ERR_SUCCESS) {
              Message.success('资料更新成功')
            } else {
              Message.error(res.msg)
            }
          })
          this.dialogVisible = false
          this._getList()
        }).catch(erro => {
        })
      } else {
        this.dialogVisible = false
        this.innerDialog = true
      }
    },
    submitReason(tabData, e) {
      if (e) {
        console.log(tabData)
        const { id, consultid } = tabData
        const { content } = this
        updatePlfConsultAuditHis({ id, consultid, state: 0, content }).then(res => {
          if (res.code === ERR_SUCCESS) {
            Message.success('提交成功')
          } else {
            Message.error(res.msg)
          }
        })
      }
      this.innerDialog = false
      this._getList()
    }
  },
  watch: {
  },
  components: {
    [Input.name]: Input,
    [Button.name]: Button,
    [Select.name]: Select,
    [Option.name]: Option,
    [Dialog.name]: Dialog,
    [Switch.name]: Switch,
    [Form.name]: Form,
    [FormItem.name]: FormItem,
    [MessageBox.name]: MessageBox,
    [DatePicker.name]: DatePicker,
    [Table.name]: Table,
    [TableColumn.name]: TableColumn,
    [Pagination.name]: Pagination,
    [Checkbox.name]: Checkbox,
    listTable,
    cDialog
  }
}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
@import "~common/css/variable"
@import "~common/css/mixin"
@import "~common/css/elementCustom"

.member-page
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
  .member-header
    position relative
  .member-header-query
    width 96%
    margin 0 auto;
    font-size 0
    padding-top 15px
  .member-header-item
    padding-right 1%
    // width 100%
    height 40px
    line-height 40px
    inline-block-top()
    & > .label
      float left
      width 80px
      font-size $font-size-sm
      inline-block-top()
    & > .member-input-item
      display inline-block
      // margin-left 115px
      font-size $font-size-sm
  .member-header-more
    height 0px
    transition height 400ms
    overflow hidden
  .member-more-button
    position absolute
    top 5px
    right 10px
    width 85px
    height 40px
    & >>> .el-icon-arrow-down
      transition transform 400ms
    &.active
      & >>> .el-icon-arrow-down
        transform rotate(180deg)
  .member-button
    padding-top 5px
    width 100%
    height 28px
    text-align center
    button
      margin-right 15px
      width 120px
  .member-table
    padding 0 10px
.member-pagination
  padding 21px 0
  height 32px
  line-height 32px
  border 1px solid #ebeef5
  border-top none
  overflow hidden
  .member-pagination-select
    inline-block-top()
  .member-pagination-checkbox
    width 34px
    height 32px
    line-height 32px
    text-align center
    inline-block-top()
  .member-pagination-content
    float right
    margin-right 20px
    inline-block-top()
.content-manage-item
  height 600px
  overflow-y scroll
  span
    font-size 10px
    color #ccc
  li
    display inline-block
    border 1px solid #e2d9d9
    width 73px
    height 36px
    margin-left 5px
    text-align center
    border-radius 7px
</style>
