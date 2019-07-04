<template>
  <div>
    <div class="sent-title">
      <span style="font-size: 14px">群发记录</span>
    </div>

    <!-- <div class="sent-conditions">
      <div class="screening">
        <div class="item-inner">
          <el-select v-model="queryObj.sendType" clearable size="mini" style="width: 120px" placeholder="消息类型">
            <el-option
              v-for="item in messages"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </div>
        <div class="item-inner">
          <el-date-picker
            v-model="queryObj.startTime"
            size="mini"
            type="date"
            placeholder="开始日期">
          </el-date-picker>
          <span style="font-size: 12px; padding: 0 4px; color: #999">至</span>
          <el-date-picker
            v-model="queryObj.endTime"
            size="mini"
            type="date"
            placeholder="截止日期">
          </el-date-picker>
        </div>
        <div class="item-inner">
          <el-button size="mini" @click="query"  type="primary" style="vertical-align: middle">查询</el-button>
          <el-button size="mini" @click="reset">重置</el-button>
        </div>
      </div>
      <div class="add"></div>
    </div> -->
    <div class="sent-table">
      <el-table style="width: 100%;"
                :data="tableData"
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
        <el-table-column label="短信内容" prop="content" width="600px" align="left"></el-table-column>
        <el-table-column label="修改时间" prop="updateTime" width="" align="center"></el-table-column>
        <el-table-column label="操作" width="" align="center">
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
       <div class="member-pagination-content" style="float: right">
        <el-pagination
          :page-sizes="[10, 20, 50, 100]"
          :page-size="queryObj.pageSize"
          :current-page="queryObj.pageNum"
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
</template>

<script type="text/ecmascript-6">
import { Select, Option, MessageBox, DatePicker, Button, Message, Table, TableColumn, Pagination, Input } from 'element-ui'
import { groupmsgList, groupmsgDelete } from 'api/message'
import { ERR_SUCCESS } from 'api/config'
import { format } from 'common/js/util'
const _messages = [{
  value: '1',
  label: '短信'
}, {
  value: '2',
  label: 'push'
}, {
  value: '3',
  label: '站内消息'
}]
export default {
  data() {
    return {
      messages: _messages,
      message: '',
      queryObj: {
        sendStatus: 0,
        sendType: '',
        startTime: '',
        endTime: '',
        pageNum: 1,
        pageSize: 10
      },
      total: 0,
      tableData: [],
      options: [],
      value: ''
    }
  },
  created() {
    this._groupmsgList()
  },
  methods: {
    _groupmsgList() {
      const { pageNum, pageSize, sendStatus, sendType, startTime, endTime } = this.queryObj
      groupmsgList({
        pageNum,
        pageSize,
        sendStatus,
        sendType,
        startTime: format(startTime, '$1-$2-$3'),
        endTime: format(endTime, '$1-$2-$3') }).then(res => {
        if (res.code === ERR_SUCCESS) {
          this.tableData = res.data.dataList
          this.total = res.data.total
        }
      })
    },
    query() {
      this._groupmsgList()
    },
    reset() {
      this.queryObj.sendStatus = ''
      this.queryObj.sendType = ''
      this.queryObj.startTime = ''
      this.queryObj.endTime = ''
      this._groupmsgList()
    },
    deleteAction(index, table) {
      const id = table[index].id
      MessageBox.confirm('是否确认删除该条记录？', '删除记录', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        groupmsgDelete({ id }).then(res => {
          if (res.code === ERR_SUCCESS) {
            Message.success('删除成功')
            this._groupmsgList()
          }
        })
      }).catch(() => {})
    },
    editAction(index, table) {
      const id = table[index].id
      // eslint-disable-next-line standard/object-curly-even-spacing
      this.$router.push({ path: '/message/groupedit', query: { id, userType: 'draft' }})
    },
    selectOn() {

    },
    selectAll() {

    },
    changePage(key, num) {
      switch (key) {
        case 'pageSize':
          this.queryObj.pageSize = num
          this._groupmsgList(1)
          break
        case 'pageNum':
          this.queryObj.pageNum = num
          this._groupmsgList(1)
          break
        default:
          break
      }
    }
  },
  components: {
    [DatePicker.name]: DatePicker,
    [Button.name]: Button,
    [Table.name]: Table,
    [TableColumn.name]: TableColumn,
    [Pagination.name]: Pagination,
    [Input.name]: Input,
    [Select.name]: Select,
    [Option.name]: Option
  }
}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~common/css/variable"
  @import "~common/css/mixin"
  .sent-title
    height 40px
    line-height 40px
    background #f2f2f2
    span
      padding-left 10px
      margin-left 10px
      color #333
      border-left 2px solid #c2c2c2
  .item-inner
    display inline-block
  .delete
    float right
  .new-gronp
    float right
    margin-left 40px
    margin-right 20px
  .screening
    height 60px
    line-height 60px
    padding-left 20px
</style>
