<template>
  <div class="tag-manage-wrapper">
    <p class="title"><span>标签管理</span></p>
    <list-table title="标签管理" style="box-shadow: none; margin-top: 20px" :hideQuery="true">
      <div class="tag-manage">
        <div class="table-header">
          <span class="table-header-title">数据列表</span>
          <span class="table-header-button">
            <el-button size="mini" @click="addLable">添加标签</el-button>
          </span>
        </div>
        <el-table
            style="width: 100%;"
            :data="tableData"
            border
            stripe
            size="mini"
            header-row-class-name="element-headerRowClassName">
            <!-- <el-table-column type="selection" width="55"> </el-table-column> -->
            <el-table-column label="标签名称"  width="160" prop="labelName" align="center"></el-table-column>
            <el-table-column label="标签描述" align="center">
              <template slot-scope="scope">
                 <p  style="text-align: left">
                    {{tableData[scope.$index].remark}}
                </p>
              </template>
            </el-table-column>
            <!-- <el-table-column label="会员人员" width="120px" sortable prop="userCount" align="center"></el-table-column> -->
             <el-table-column label="分类" align="center" width="120">
                 <template slot-scope="scope">
                 <p>
                    {{tableData[scope.$index].labelType === 1 ? '用户症状类型': ''}}
                </p>
              </template>
             </el-table-column>
            <el-table-column label="创建人" width="80" prop="creator" align="center"></el-table-column>
            <el-table-column label="创建时间" width="160" prop="createTime" align="center"></el-table-column>
            <el-table-column label="状态" width="60" align="center">
              <template slot-scope="scope">
                <el-switch
                  v-model="scope.row.isValid"
                  @click.native.prevent="changeSwitch( scope.$index, tableData )"
                  active-color="#13ce66"
                  inactive-color="#ff4949"
                  :active-value="true"
                  :inactive-value="false">
                </el-switch>
              </template>
            </el-table-column>
            <el-table-column label="操作" width="100" align="center">
              <template slot-scope="scope">
                <el-button
                    @click.native.prevent="deleteAction( scope.$index, tableData)"
                    type="text"
                    size="small">
                    <span>删除</span>
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
    <router-view></router-view>
  </div>
</template>

<script type="text/ecmascript-6">
import { Button, Input, Table, Pagination, Message, TableColumn, Switch, MessageBox } from 'element-ui'
import listTable from 'base/list-table/list-table'
import { labelgetList, updateLabelLibStatus, deleteLabelLib } from 'api/user'
import { ERR_SUCCESS } from 'api/config'
export default {
  data() {
    return {
      tableData: [],
      pageNum: 1,
      pageSize: 10,
      dialogVisible: false,
      total: 0
    }
  },
  created() {
    this._labelgetList()
  },
  methods: {
    changePage(key, num) {
      switch (key) {
        case 'pageSize':
          this.pageSize = num
          this._labelgetList()
          break
        case 'pageNum':
          this.pageNum = num
          this._labelgetList()
          break
        default:
          break
      }
    },
    // 获取列表
    _labelgetList(e) {
      this.loading = true
      // eslint-disable-next-line prefer-const
      let { pageNum, pageSize } = this
      if (e) {
        pageNum = 1
      }
      labelgetList({ pageSize, pageNum }).then(res => {
        if (res.code === ERR_SUCCESS) {
          this.tableData = res.data.list
          this.total = res.data.count
        } else {
          Message.error(res.msg)
        }
      })
    },
    // 修改标签
    // _updateLabelLibStatus (message) {
    //   MessageBox.confirm('是否修改该状态?', '系统提示', {
    //     confirmButtonText: '确定',
    //     cancelButtonText: '取消',
    //     type: 'warning'
    //   }).then(action => {
    //     updateLabelLibStatus(message).then(res => {
    //       if (res.code === ERR_SUCCESS) {
    //         Message.success('修改成功')
    //       } else {
    //         Message.error(res.msg)
    //       }
    //     })
    //   }).catch(erro => {})
    // },
    // 添加标签
    addLable() {
      this.$router.push({ path: '/member/tagManage/add' })
    },
    // 删除标签
    deleteAction(index, tableData) {
      const { id } = tableData[index]
      MessageBox.confirm('是否删除该分类?', '系统提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(action => {
        deleteLabelLib({ id }).then(res => {
          if (res.code === ERR_SUCCESS) {
            Message.success('删除成功')
            this._labelgetList()
          } else {
            Message.error(res.msg)
          }
        })
      }).catch(erro => {})
    },
    // 修改状态
    changeSwitch(index, table) {
      const { isValid, id } = table[index]
      MessageBox.confirm('是否修改该状态?', '系统提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(action => {
        updateLabelLibStatus({ isValid, id }).then(res => {
          if (res.code === ERR_SUCCESS) {
            Message.success('修改成功')
          } else {
            Message.error(res.msg)
          }
        })
      }).catch(erro => {
        if (table[index].isValid === false) {
          table[index].isValid = true
        } else {
          table[index].isValid = false
        }
      })
    }
  },
  components: {
    [Switch.name]: Switch,
    [Input.name]: Input,
    [Table.name]: Table,
    [Pagination.name]: Pagination,
    [TableColumn.name]: TableColumn,
    [Button.name]: Button,
    listTable,
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
  .table-header-title
    margin 0 10px
    font-size $font-size-md
    color $color-text
    inline-block-top()
  .table-header-button
    margin 0 10px
    float right
    width 120px
    height 45px
    text-align right
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
</style>
