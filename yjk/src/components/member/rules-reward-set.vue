<template>
  <div class="tag-manage-wrapper">
    <p class="title"><span>任务奖励设置</span></p>
    <list-table title="标签管理" style="box-shadow: none; margin-top: 20px" :hideQuery="true">
      <div class="tag-manage">
        <div class="table-header">
          <span class="table-header-title">数据列表</span>
        </div>
        <el-table
            style="width: 100%;"
            :data="tableData"
            v-loading="loading"
            border
            stripe
            size="mini"
            header-row-class-name="element-headerRowClassName">
            <el-table-column label="任务名称"  width="180px" prop="taskName" align="center"></el-table-column>
            <el-table-column label="类型" prop="taskType" sortable align="center">
              <template slot-scope="scope">
                {{_forType(tableData[scope.$index].taskType)}}
              </template>
            </el-table-column>
            <el-table-column label="魅力分" width="60px" prop="points" align="center"></el-table-column>
            <el-table-column label="魅力值" width="80px" prop="score" align="center"></el-table-column>
            <el-table-column label="壹豆" width="60px" prop="ebean" align="center"></el-table-column>
            <el-table-column label="创建时间" width="180px" prop="createTime" align="center"></el-table-column>
            <el-table-column label="状态" width="140px" prop="isValid" align="center">
              <template slot-scope="scope">
                <el-switch
                  v-model="scope.row.isValid"
                  @click.native.prevent="changeSwitch( scope.$index, scope.row )"
                  active-color="#13ce66"
                  inactive-color="#ff4949"
                  :active-value="true"
                  :inactive-value="false">
                </el-switch>
              </template>
            </el-table-column>

            <el-table-column label="生效时间" width="180px" prop="validStart" align="center"></el-table-column>
            <el-table-column label="操作" width="120px" align="center">
              <template slot-scope="scope">
                <el-button
                    @click.native.prevent="editAction( scope.$index, scope.row)"
                    type="text"
                    size="small">
                    <span>编辑</span>
                </el-button>
              </template>
            </el-table-column>
        </el-table>
      </div>
    </list-table>
    <router-view></router-view>
  </div>
</template>

<script type="text/ecmascript-6">
import { Button, Input, Table, MessageBox, Pagination, TableColumn, Switch, Message } from 'element-ui'
import listTable from 'base/list-table/list-table'
import { gettaskRewardConfigList, updateStatusById } from 'api/user'
import { ERR_SUCCESS } from 'api/config'
export default {
  data() {
    return {
      tableData: [],
      loading: false,
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
    this._gettaskRewardConfigList()
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
    _forType(number) {
      if (number === 1) {
        return '新手任务'
      } else {
        return '日常任务'
      }
    },
    editAction(index, row) {
      // eslint-disable-next-line standard/object-curly-even-spacing
      this.$router.push({ path: '/member/rewardset/edit', query: { id: row.id }})
    },
    _gettaskRewardConfigList() {
      this.loading = true
      gettaskRewardConfigList().then(res => {
        if (res.code === ERR_SUCCESS) {
          this.tableData = res.data.list
          this.loading = false
        } else {
          Message.error(res.msg)
        }
      })
    },
    _updateStatusById(msg) {
      updateStatusById(msg).then(res => {
        if (res.code === ERR_SUCCESS) {
          Message.success('修改成功')
        } else {
          Message.error('修改失败')
        }
      })
    },
    changeSwitch(index, row) {
      const { isValid, id } = row
      MessageBox.confirm('是否修改状态?', '系统提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(action => {
        this._updateStatusById({ isValid, id })
      }).catch(erro => {
        if (row.isValid === false) {
          row.isValid = true
        } else {
          row.isValid = false
        }
      })
    }
  },
  watch: {
    $route() {
      const { path } = this.$route
      if (path === '/member/rewardset') {
        this._gettaskRewardConfigList()
      }
    }
  },
  components: {
    [Switch.name]: Switch,
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
