<template>
  <div class="tag-manage-wrapper">
    <p class="title"><span>等级设置</span></p>
    <list-table title="标签管理" style="box-shadow: none; margin-top: 20px" :hideQuery="true">
      <div class="tag-manage">
        <div class="table-header">
          <span class="table-header-title">数据列表</span>
          <!--<span class="table-header-button">-->
            <!--<el-button size="mini" @click="addAction('add')">添加等级</el-button>-->
          <!--</span>-->
        </div>
        <el-table
            style="width: 100%;"
            :data="tableData"
            border
            stripe
            size="mini"
            header-row-class-name="element-headerRowClassName">
            <el-table-column label="等级名称"  width="150px" prop="levelName" align="center"></el-table-column>
            <el-table-column label="等级标识"  width="120px" prop="levelShortname" sortable align="center"></el-table-column>
            <el-table-column label="升级条件" width="" prop="condition" align="center"></el-table-column>
            <el-table-column label="创建人" width="140px" prop="creator" align="center"></el-table-column>
            <el-table-column label="有效期" width="120px" prop="indate" align="center"></el-table-column>
            <!--<el-table-column label="操作" width="120px" align="center">-->
              <!--<template slot-scope="scope">-->
                <!--<el-button-->
                    <!--@click.native.prevent="editAction( scope.$index, tableData)"-->
                    <!--type="text"-->
                    <!--size="small">-->
                    <!--<span>编辑</span>-->
                <!--</el-button>-->
              <!--</template>-->
            <!--</el-table-column>-->
        </el-table>
      </div>
    </list-table>
  </div>
</template>

<script type="text/ecmascript-6">
import { Button, Input, Table, Pagination, TableColumn, Message } from 'element-ui'
import listTable from 'base/list-table/list-table'
import { getList } from 'api/user'
import { ERR_SUCCESS } from 'api/config'
export default {
  data() {
    return {
      tableData: [],
      queryObj: {
        pageNum: 1,
        pageSize: 10,
        id: '',
        name: '',
        nickName: '',
        mobile: '',
        levelShortname: '',
        startTime: '',
        endTime: '',
        type: ''
      },
      total: 0
    }
  },
  created() {
    this._getList()
  },
  methods: {
    changePage(key, num) {
      switch (key) {
        case 'pageSize':
          this.queryObj.pageSize = num
          this._getAppUserList(1)
          break
        case 'pageNum':
          this.queryObj.pageNum = num
          this._getAppUserList(1)
          break
        default:
          break
      }
    },
    _getList() {
      getList().then(res => {
        if (res.code === ERR_SUCCESS) {
          this.tableData = res.data.list
        } else {
          Message.error(res.msg)
        }
      })
    },
    addAction() {
      this.$router.push({ path: '/member/setEdit' })
    },
    // editAction (index, table) {
    // const id = table[index].id
    // this.$router.push({path: '/member/setEdit', query: {id: id}})
    // },
    deleteAction() {

    },
    changeSwitch(index, table) {
      const { state, id } = table[index]
      this._updateState([id], state)
    }
  },
  components: {
    [Input.name]: Input,
    [Table.name]: Table,
    [Pagination.name]: Pagination,
    [TableColumn.name]: TableColumn,
    [Button.name]: Button,
    listTable
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
