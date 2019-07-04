<template>
  <div>
    <div class="sent-title">
      <span style="font-size: 14px">群发记录</span>
    </div>

    <div class="sent-conditions">
      <div class="screening">
        <!--<div class="item-inner">-->
          <!--<el-select v-model="app" size="mini" style="width: 120px" placeholder="选择对象">-->
            <!--<el-option-->
              <!--v-for="item in apps"-->
              <!--:key="item.value"-->
              <!--:label="item.label"-->
              <!--:value="item.value">-->
            <!--</el-option>-->
          <!--</el-select>-->
        <!--</div>-->
        <div class="item-inner">
          <el-select v-model="queryObj.sendChannel" clearable size="mini" style="width: 120px" placeholder="消息类型">
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
          <el-button size="mini" @click="reset">重置</el-button></div>
        <div class="item-inner new-gronp">
          <el-button size="mini"  type="primary" plain @click="newGronp">新建群发</el-button>

        </div>
      </div>
      <div class="add"></div>
    </div>
    <div class="sent-table">
      <el-table style="width: 100%;"
                :data="tableData"
                @select = "selectOn"
                @select-all = "selectAll"
                v-loading="loading"
                ref="multipleTable"
                border
                stripe
                size="mini"
                header-row-class-name="element-headerRowClassName">
        <el-table-column
          type="selection"
          width="55">
        </el-table-column>
        <el-table-column label="短信内容" width="" align="left" prop="content"></el-table-column>
        <el-table-column label="发送时间" width="" align="center" prop="sendTime"></el-table-column>
        <el-table-column label="发送对象" width="" align="center" prop="">
          <template slot-scope="scope">
            <!-- {{sendObj(scope.$index, tableData)}} -->
           <span>客户</span>
          </template>
        </el-table-column>
        <el-table-column label="消息类型" width="" align="center" prop="sendChannelName"></el-table-column>
        <el-table-column label="发送状态" width="" align="center" prop="sendStatusName"></el-table-column>
        <el-table-column label="操作" width="" align="center">
          <template slot-scope="scope" >
            <el-button
              @click.native.prevent="editAction( scope.$index, tableData)"
              class="custom-columnButton"
              type="text"
              v-if="tableData[scope.$index].sendStatus === 1"
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
import { RadioGroup, Select, Option, MessageBox, Message, RadioButton, Cascader, Switch, DatePicker, Button, Table, TableColumn, Pagination, Input } from 'element-ui'
import { groupmsgList, groupmsgDelete } from 'api/message'
import { ERR_SUCCESS } from 'api/config'
import { format } from 'common/js/util'
const _apps = [{
  value: '',
  label: '全部'
}, {
  value: '0',
  label: 'app客户端'
}, {
  value: '1',
  label: 'brm系统'
}]

const _messages = [{
  value: '1',
  label: '短信'
}, {
  value: '2',
  label: 'push'
}, {
  value: '3',
  label: '站内消息'
}, {
  value: '4',
  label: '系统广播'
}]
export default {
  data() {
    return {
      apps: _apps,
      app: '',
      messages: _messages,
      message: '',
      createTime: '',
      loading: false,
      queryObj: {
        sendStatus: '',
        sendChannel: '',
        startTime: '',
        endTime: '',
        pageNum: 1,
        pageSize: 10
      },
      total: 10,
      tableData: []
    }
  },
  created() {
    this._groupmsgList()
  },
  methods: {
    newGronp() {
      this.$router.push({ path: '/message/groupedit' })
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
    },
    _groupmsgList() {
      const { pageNum, pageSize, sendStatus, sendChannel, startTime, endTime } = this.queryObj
      this.loading = true
      groupmsgList({
        pageNum,
        pageSize,
        sendStatus,
        sendChannel,
        startTime: format(startTime, '$1-$2-$3'),
        endTime: format(endTime, '$1-$2-$3') }).then(res => {
        if (res.code === ERR_SUCCESS) {
          this.tableData = res.data.dataList
          this.total = res.data.total
          this.loading = false
        }
      })
    },
    // sendObj (index, table) {
    //   let {sendChannelName} = table[index]
    //   if (sendChannelName === '系统广播') {
    //     return '客户'
    //   } else if (sendChannelName === '短信') {
    //     return '客户'
    //   } else {
    //     return '顾问'
    //   }
    // },
    reset() {
      this.queryObj.sendStatus = ''
      this.queryObj.sendChannel = ''
      this.queryObj.startTime = ''
      this.queryObj.endTime = ''
      this.queryObj.pageNum = 1
      this._groupmsgList()
    },
    query() {
      this.queryObj.pageNum = 1
      this._groupmsgList()
    },
    editAction(index, table) {
      const id = table[index].id
      // eslint-disable-next-line standard/object-curly-even-spacing
      this.$router.push({ path: '/message/groupedit', query: { id }})
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
    selectOn() {

    },
    selectAll() {

    }
  },
  watch: {
    $route() {
      const { path } = this.$route
      if (path === '/message/groupMessage') {
        this._groupmsgList()
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
    Message
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
