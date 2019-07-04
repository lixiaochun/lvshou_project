<template>
   <div style="height: 60vh;overflow-y: scroll;">
    <div style="height: 1000px;">
      <!-- 套餐 -->
    </div>
   </div>
</template>

<script type="text/ecmascript-6">
import {
  Input, Button, DatePicker, Table, TableColumn, Switch, Message, MessageBox,
  Pagination, Checkbox, Select, Option, Dialog
} from 'element-ui'
import listTable from 'base/list-table/list-table'
import { ERR_SUCCESS } from 'api/config'
import { getAppUserList, updateState, getLabelList, saveLabelToUser } from 'api/user'
const _levelSequences = [{
  value: '1',
  label: 'VIP1'
}, {
  value: '2',
  label: 'VIP2'
}, {
  value: '3',
  label: 'VIP3'
}, {
  value: '4',
  label: 'VIP4'
}, {
  value: '5',
  label: 'VIP5'
}]
export default {
  name: 'listener-data-audit-details',
  data() {
    return {
      standard: false,
      standardSelect: '',
      startTime: '',
      endTime: '',
      levelSequence: '',
      levelSequences: _levelSequences,
      brms: [{
        value: '',
        label: '全部'
      }, {
        value: 1,
        label: 'brm客户'
      }, {
        value: 0,
        label: 'app客户'
      }],
      isMore: true,
      allCheck: false,
      loading: false,
      state: 1,
      pageNum: 1,
      pageSize: 10,
      queryObj: {
        brmid: '',
        name: '',
        nickName: '',
        mobile: '',
        levelSequence: '',
        startTime: '',
        endTime: '',
        isBrm: '',
        type: '',
        sort: ''
      },
      options: [],
      labelid: '',
      total: 0,
      tableData: []
    }
  },
  created() {
    this.query()
    this._getLabelList()
    this.updateDataSelect = []
  },
  methods: {
    renderHeader(h) {
      return (
        <div>
          <span>注册时间</span>
          <span class='el-icon-caret-top' on-click = {this.ascOrder}></span>
          <span class='el-icon-caret-bottom' on-click = {this.descOrder}></span>
        </div>
      )
    },
    ascOrder() {
      this.queryObj.sort = 'down'
      this._getAppUserList()
    },
    descOrder() {
      this.queryObj.sort = 'up'
      this._getAppUserList()
    },
    query() {
      this.allCheck = false
      this._getAppUserList('reset')
    },
    _isBrm(e) {
      if (e) {
        return 'brm'
      } else {
        return 'app'
      }
    },
    changeAmount(e) {
      setTimeout(() => {
        this.queryObj.id = e.replace(/[^0-9]/g, '')
      }, 20)
    },
    reset() {
      for (const key in this.queryObj) {
        this.queryObj[key] = ''
      }
    },
    changePage(key, num) {
      switch (key) {
        case 'pageSize':
          this.pageSize = num
          this._getAppUserList()
          break
        case 'pageNum':
          this.pageNum = num
          this._getAppUserList()
          break
        default:
          break
      }
    },
    hasMore() {
      this.isMore = !this.isMore
    },
    selectOn(e) {
      if (e.length === this.tableData.length) {
        this.allCheck = true
      } else {
        this.allCheck = false
      }
      this.updateDataSelect = e
    },
    selectAll(e) {
      this.allCheck = true
      this.updateDataSelect = e
    },
    changeSwitch(index, table) {
      const { state, id } = table[index]
      MessageBox.confirm('是否修改状态?', '系统提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(action => {
        updateState({ ids: id, state }).then(res => {
          if (res.code === ERR_SUCCESS) {
            Message({
              message: '修改状态成功！',
              type: 'success'
            })
          } else {
            Message.error(res.msg)
          }
        })
      }).catch(erro => {
        if (table[index].state === 0) {
          table[index].state = 1
        } else {
          table[index].state = 0
        }
      })
    },
    rowAction(index, table, type) {
      const { id } = table[index]
      if (type === 'info') {
        // eslint-disable-next-line standard/object-curly-even-spacing
        this.$router.push({ path: '/member/memberInfo', query: { i: id }})
      } else {
        // eslint-disable-next-line standard/object-curly-even-spacing
        this.$router.push({ path: '/member/memberEdit', query: { i: id }})
      }
    },
    _getAppUserList(e) {
      this.loading = true
      let postObj
      const { brmid, name, nickName, mobile, isBrm, levelSequence, startTime, endTime, sort } = this.queryObj
      // eslint-disable-next-line prefer-const
      let { pageNum, pageSize } = this
      if (e) {
        pageNum = 1
        postObj = { brmid, name, nickName, mobile, isBrm, levelSequence, startTime, endTime, pageNum, pageSize, sort }
      } else {
        postObj = { brmid, name, nickName, mobile, isBrm, levelSequence, startTime, endTime, pageNum, pageSize, sort }
      }
      getAppUserList(postObj).then(res => {
        if (res.code === ERR_SUCCESS) {
          this.tableData = res.data.dataList
          this.total = res.data.total
          this.loading = false
        } else {
          Message.error(res.msg)
        }
      })
    },

    _getLabelList() {
      getLabelList().then(res => {
        if (res.code === ERR_SUCCESS) {
          this.options = res.data.list
        } else {
          Message.error(res.msg)
        }
      })
    },
    _updateState(ids, state, labelid) {
      updateState({ ids, state }).then(res => {
        if (res.code === ERR_SUCCESS) {
          Message({
            message: '修改状态成功！',
            type: 'success'
          })
        } else {
          Message.error(res.msg)
        }
      })

      if (labelid) {
        saveLabelToUser({ ids, labelid }).then(res => {
          if (res.code === ERR_SUCCESS) {
            Message({
              message: '修改标签！',
              type: 'success'
            })
          } else {
            Message.error(res.msg)
          }
        })
      }
    },
    updateAllState() {
      MessageBox.confirm('是否修改状态?', '系统提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(action => {
        const d = this.updateDataSelect
        const ids = []
        for (const _d of d) {
          _d.state = this.state
          ids.push(_d.id)
        }
        this._updateState(ids, this.state, this.labelid)
      }).catch(erro => {})
    }
  },
  watch: {
    allCheck() {
      if (this.allCheck) {
        this.tableData.forEach(row => {
          this.$refs.multipleTable.toggleRowSelection(row)
        })
        this.updateDataSelect = this.tableData
      } else {
        this.$refs.multipleTable.clearSelection()
      }
    }
  },
  components: {
    [Input.name]: Input,
    [Button.name]: Button,
    [Select.name]: Select,
    [Option.name]: Option,
    [Dialog.name]: Dialog,
    [Switch.name]: Switch,
    [DatePicker.name]: DatePicker,
    [Table.name]: Table,
    [TableColumn.name]: TableColumn,
    [Pagination.name]: Pagination,
    [Checkbox.name]: Checkbox,
    listTable
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
</style>
