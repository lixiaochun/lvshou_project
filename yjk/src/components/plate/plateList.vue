<template>
  <div class="tag-manage-wrapper">
    <p class="title"><span>首页版块</span></p>
    <list-table title="轮播设置" style="box-shadow: none; margin-top: 20px" :hideQuery="true">
      <div class="tag-manage">
        <div class="table-header">
          <span class="table-header-title el-icon-menu">首页版块列表</span>
          <el-button  @click="changeOrder" size="mini" type="primary" >调整排序</el-button>
        </div>
        <el-table
            style="width: 100%;"
            :data="tableData"
            border
            v-loading="loading"
            stripe
            size="mini"
            header-row-class-name="element-headerRowClassName">
            <el-table-column label="ID"  width="100" prop="id" align="center"></el-table-column>
            <el-table-column label="主标题" width="" prop="title" align="center">
            </el-table-column>
            <el-table-column label="副标题" width="" prop="subtitle" align="center">
            </el-table-column>
            <el-table-column label="类型" width="" align="center">
              <template slot-scope="scope">
                  {{formatType(scope.$index, tableData)}}
                </template>
            </el-table-column>
            <el-table-column label="状态" width="100" prop="" align="center">
              <template slot-scope="scope">
                <el-button type="text" size="small" @click="changeStatus(scope.$index, tableData)" v-if="tableData[scope.$index].status !== 2">
                  {{getLine(scope.$index, tableData)}}
                </el-button>
                <span v-else>
                  {{getLine(scope.$index, tableData)}}
                </span>
                </template>
            </el-table-column>
            <el-table-column label="排序" align="center" width="">
              <template slot-scope="scope">
                  {{formatsort(scope.$index, tableData)}}
                </template>
            </el-table-column>
             <el-table-column label="操作" width="180" align="center">
              <template slot-scope="scope">
                <el-button
                  @click.native.prevent="rowAction( scope.$index, tableData )"
                  class="custom-columnButton"
                  type="text"
                  size="small">
                  <span>编辑</span>
                </el-button>
              </template>
            </el-table-column>
        </el-table>
      </div>
    </list-table>
    <el-dialog  :visible.sync="dialogFormVisible" width="920px" :title="name">
      <div class="order" v-if="name==='调整排序'">
         <el-table style="width: 100%;"
                    :data="tableList"
                    ref="multipleTable"
                    border
                    stripe
                    size="mini"
                    v-loading="loading"
                    header-row-class-name="element-headerRowClassName">
            <el-table-column label="排序" width="160" align="center">
              <template slot-scope="scope">
                <el-input v-model="tableList[scope.$index].sort" type="number" @blur="changeData(scope.$index, tableList)" style="text-align:center"></el-input>
              </template>
            </el-table-column>
            <el-table-column label="主标题" width="" prop="title" align="center"></el-table-column>
            <el-table-column label="副标题" width="" prop="subtitle" align="center"></el-table-column>
            <el-table-column label="状态" width="" align="center">
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
       <!-- 添加组件 -->
       <div class="addForm" v-else>
       <el-form ref="form" :model="form" label-width="80px">
            <el-form-item label="主标题:" style="width:90%;">
              <el-input v-model="form.title" size="mini" placeholder="输入主标题，不超过6个字" maxlength="6" clearable style="width:90%"></el-input>
              <span class="msg" style="top:0px;right:-50px;">(<em>*</em>必填)</span>
            </el-form-item>
            <el-form-item label="副标题:" style="width:80%;">
              <el-input  v-model="form.subtitle" placeholder="输入广告简介，不超过12个字" maxlength="12" size="mini" clearable></el-input>
            </el-form-item>
            <el-form-item label="状态:" v-if="form.status !== 2">
              <el-radio-group v-model="form.status">
                <el-radio :label="1">上线中</el-radio>
                <el-radio :label="0">已下线</el-radio>
              </el-radio-group>
            </el-form-item>
       </el-form>
        <div slot="footer" class="dialog-footer" style="text-align:center;margin-top:15px">
          <el-button @click="cancle" style="padding:10px 88px">取 消</el-button>
          <el-button type="primary" @click="handleSave" style="padding:10px 88px">保存</el-button>
        </div>
        </div>
      </el-dialog>
  </div>
</template>

<script type="text/ecmascript-6">
import { Button, Input, Table, TableColumn, MessageBox, Dialog, Message, Radio, FormItem, Form, RadioGroup } from 'element-ui'
import listTable from 'base/list-table/list-table'
import { getAppHomePlateList, getAppHomePlateDetail, updateAppHomePlate, updateAppHomePlateStatus, setAppIndexConfigOnlieSort } from 'api/plate'
import { ERR_SUCCESS } from 'api/config'
export default {
  data() {
    return {
      tableData: [],
      loading: false,
      name: '',
      tableList: [],
      sort: '',
      tab: [],
      form: {
        id: '',
        title: '',
        subtitle: '',
        status: 0
      },
      dialogFormVisible: false
    }
  },
  created() {
    this._getAppHomePlateList()
  },
  methods: {
    _getAppHomePlateList() {
      this.loading = true
      getAppHomePlateList().then(res => {
        if (res.code === ERR_SUCCESS) {
          // console.log(res.data)
          this.tableData = res.data
          this.loading = false
        }
      })
    },
    changeOrder() {
      this.dialogFormVisible = true
      this.name = '调整排序'
      getAppHomePlateList({ status: 1 }).then(res => {
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
      const sortjson = JSON.stringify(this.tab)
      setAppIndexConfigOnlieSort({ sortjson }).then(res => {
        if (res.code === ERR_SUCCESS) {
          this.dialogFormVisible = false
          this.pageNum = 1
          this._getAppHomePlateList()
        }
      })
    },
    getLine(index, table) {
      const _isOnline = table[index].status
      if (_isOnline === 1) {
        return '上线中'
      } else if (_isOnline === 2) {
        return '--'
      } else {
        return '已下线'
      }
    },
    formatType(index, table) {
      const type = table[index].type
      switch (type) {
        case 1:
          return '一线顾问'
        case 2:
          return '二线顾问'
        case 3:
          return '倾听者'
        case 4:
          return '情感咨询'
        case 5:
          return '内容'
      }
    },
    rowAction(index, table) {
      this.dialogFormVisible = true
      this.name = '编辑首页版块'
      const id = table[index].id
      getAppHomePlateDetail({ id }).then(res => {
        if (res.code === ERR_SUCCESS) {
          this.form.title = res.data.title
          this.form.subtitle = res.data.subtitle
          this.form.status = res.data.status
          this.form.id = res.data.id
        }
      })
    },
    _updateAppHomePlateStatus(id, status) {
      updateAppHomePlateStatus({ id, status }).then(res => {
        if (res.code === ERR_SUCCESS) {
          this.pageNum = 1
          this._getAppHomePlateList()
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
    changeStatus(index, table) {
      let curOnline = table[index].status
      const id = table[index].id
      MessageBox.confirm('是否修改在线状态?', '系统提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(action => {
        if (curOnline) {
          curOnline = 0
        } else {
          curOnline = 1
        }
        this._updateAppHomePlateStatus(id, curOnline)
      }).catch(erro => {})
    },
    cancle() {
      MessageBox.confirm('是否取消保存?', '系统提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(action => {
        this.dialogFormVisible = false
        this.getAppHomePlateList()
      }).catch(erro => {})
    },
    formatsort(index, table) {
      const sort = table[index].sort
      if (sort) {
        return sort
      } else {
        return '--'
      }
    },
    handleSave() {
      const { id, title, subtitle, status } = this.form
      if (!title) {
        Message.error('请输入主标题')
      }
      if (title && title.length > 6) {
        Message.error('主标题的长度不超过6个字')
      }
      updateAppHomePlate({ id, title, subtitle, status }).then(res => {
        if (res.code === ERR_SUCCESS) {
          Message.success('修改成功')
          this.dialogFormVisible = false
        } else {
          Message.error(res.msg)
        }
      })
      this._getAppHomePlateList()
    }
  },
  watch: {
    // $route () {
    //   const { path } = this.$route
    //   if (path === '/content/chuffling') {
    //     this._getSlideshowList()
    //   }
    // }
  },
  components: {
    [Input.name]: Input,
    [Table.name]: Table,
    [TableColumn.name]: TableColumn,
    [Button.name]: Button,
    listTable,
    [Dialog.name]: Dialog,
    [Message.name]: Message,
    [Radio.name]: Radio,
    [FormItem.name]: FormItem,
    [RadioGroup.name]: RadioGroup,
    [Form.name]: Form,
    [MessageBox.name]: MessageBox
  }
}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
@import "~common/css/variable"
@import "~common/css/mixin"

.tag-manage-wrapper
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
.tag-manage
  margin 0 10px
.table-header
  width 100%
  height 45px
  line-height 45px
  border 1px solid #ebeef5
  border-bottom none
  text-align right
  position relative
  .table-header-title
    margin 0 10px
    position absolute
    left 0px
    top 18px
    font-size $font-size-sm
    color $color-text
    inline-block-top()
  button
     margin-left 10px
</style>
