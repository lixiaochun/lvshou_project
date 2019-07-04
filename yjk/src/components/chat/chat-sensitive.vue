<template>
  <div class="chat-manage-wrapper">
    <p class="title"><span>敏感字过滤</span></p>
    <list-table title="敏感字过滤" style="box-shadow: none; margin-top: 20px" :hideQuery="true">
      <div class="chat-manage">
        <div class="table-header">
          <span class="table-header-title">敏感字设置</span>
          <span class="table-header-button">
            <el-button size="mini" @click="addSensitive">添加</el-button>
          </span>
        </div>
        <el-table
            style="width: 100%;"
            :data="tableData"
            ref="multipleTable"
            border
            stripe
            @selection-change="selsChange"
            @row-click="handleCurrentChange"
            size="mini"
            v-loading = loading
            header-row-class-name="element-headerRowClassName">
            <el-table-column  type="selection" width="55" align="center">
            </el-table-column>
            <el-table-column label="敏感字/词"  width="280px"  align="center" prop="word">
            </el-table-column>
            <el-table-column label="类型"  align="center">
              <template slot-scope="scope">
                {{tableData[scope.$index].type===0?"禁发":"提醒"}}
              </template>
            </el-table-column>
            <el-table-column label="描述"  align="center">
              <template slot-scope="scope">
                  <p  style="text-align: left">
                    {{tableData[scope.$index].remark}}
                  </p>
                </template>
            </el-table-column>
            <el-table-column label="操作" width="120px" align="center">
              <template slot-scope="scope">
                <el-button
                    @click.native.prevent="delAction( scope.$index, tableData)"
                    type="text"
                    size="small">
                    <span>删除</span>
                </el-button>
              </template>
            </el-table-column>
        </el-table>
        <div class="member-pagination">
          <div class="member-pagination-select">
              <el-button size="mini" @click="updateAllState"> 批量删除</el-button>
            </div>
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
import { Button, Input, Table, Pagination, TableColumn, Switch, Checkbox, Message, MessageBox } from 'element-ui'
import listTable from 'base/list-table/list-table'
import { getSensitiveWordList, deltSensitiveWord } from 'api/imRptConsult'
import { ERR_SUCCESS } from 'api/config'
export default {
  data() {
    return {
      tableData: [],
      pageNum: 1,
      pageSize: 10,
      total: 0,
      type: '',
      loading: false,
      arrID: []
    }
  },
  created() {
    this._getSensitiveWordList()
  },
  methods: {
    changePage(key, num) {
      switch (key) {
        case 'pageSize':
          this.pageSize = num
          this._getSensitiveWordList(1)
          break
        case 'pageNum':
          this.pageNum = num
          this._getSensitiveWordList(1)
          break
        default:
          break
      }
    },
    _getSensitiveWordList(pageNum) {
      pageNum = this.pageNum
      this.loading = true
      const { pageSize, type } = this
      getSensitiveWordList({ pageNum, pageSize, type }).then(res => {
        if (res.code === ERR_SUCCESS) {
          this.loading = false
          const result = res.data
          this.tableData = result.dataList
          this.total = result.total
          if (this.pageNum > 1) {
            if (res.data.dataList.length === 0) {
              this.changePage('pageNum', 1)
            }
          }
        }
      })
    },
    addSensitive() {
      this.$router.push({ path: '/chat/sensitive/add' })
    },
    delAction(index, tableData) {
      MessageBox.confirm('是否删除?', '系统提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(action => {
        const id = tableData[index].id
        deltSensitiveWord({ ids: id }).then((res) => {
          if (res.code === ERR_SUCCESS) {
            Message.success('删除成功')
            this._getSensitiveWordList()
          }
        }).catch((err) => {
          Message.error(err)
        })
      })
    },
    updateAllState() {
      MessageBox.confirm('是否全部删除?', '系统提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(action => {
        const ids = this.arrID.join(',')
        deltSensitiveWord({ ids }).then(res => {
          if (res.code === ERR_SUCCESS) {
            Message.success('删除成功')
            this._getSensitiveWordList()
          }
        })
      })
    },
    handleCurrentChange(row, event, column) {
      let same = false
      if (this.arrID.length > 0) {
        for (let i = 0; i < this.arrID.length; i++) {
          if (this.arrID[i] === row.id) {
            same = true
            // this.removeByValue(this.arrID, row.id)
            break
          }
        }
        if (same === true) {
          this.$refs.multipleTable.toggleRowSelection(row, false)
        } else {
          this.$refs.multipleTable.toggleRowSelection(row, true)
          this.arrID.push(row.id)
        }
      } else {
        this.$refs.multipleTable.toggleRowSelection(row, true)
        this.arrID.push(row.id)
      }
    },
    selsChange(val) {
      const valId = []
      for (let i = 0; i < val.length; i++) {
        valId.push(val[i].id)
      }
      this.arrID = valId
    }
  },
  watch: {
    // $route () {
    //   const { path } = this.$route
    //   if (path === '/chat/sensitive') {
    //     this._getSensitiveWordList()
    //   }
    // }
  },
  components: {
    [Switch.name]: Switch,
    [Input.name]: Input,
    [Table.name]: Table,
    [Pagination.name]: Pagination,
    [TableColumn.name]: TableColumn,
    [Button.name]: Button,
    [Checkbox.name]: Checkbox,
    [MessageBox.name]: MessageBox,
    listTable
  }
}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
@import "~common/css/variable"
@import "~common/css/mixin"

.chat-manage-wrapper
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
.chat-manage
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
    margin-left 20px
  .member-pagination-content
    float right
    margin-right 20px
    inline-block-top()
</style>
