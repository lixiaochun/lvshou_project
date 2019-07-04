<template>
  <div class="wapper">
    <p class="logistics-title"><span>群发消息</span></p>
    <div class="add-wapper">
      <div class="sent-title">
        <span>选择客户</span>
      </div>
      <div class="sent-conditions">
        <div class="screening">
          <div class="item-inner">
            <label style="font-size: 14px">客户等级：</label>
            <el-select v-model="queryObj.levelSequence" size="mini" style="width: 120px" placeholder="客户等级">
              <el-option
                v-for="item in leveloptions"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </div>
          <div class="item-inner">
            <label style="font-size: 14px">客户类别：</label>
            <el-select v-model="queryObj.userType" size="mini" style="width: 120px" placeholder="客户类别">
              <el-option
                v-for="item in userTypes"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </div>
          <div class="item-inner">
            <label style="font-size: 14px">客户来源：</label>
            <el-select v-model="queryObj.isBrm" size="mini" style="width: 120px" placeholder="客户来源">
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </div>

          <div class="item-inner">
            <label style="font-size: 14px; margin-left: 20px">注册时间：</label>
            <el-date-picker
              v-model="queryObj.startTime"
              size="mini"
              type="date"
              placeholder="开始时间">
            </el-date-picker>
            <label style="font-size: 14px; padding: 0 4px">至</label>
            <el-date-picker
              v-model="queryObj.endTime"
              type="date"
              size="mini"
              placeholder="结束时间">
            </el-date-picker>
          </div>

          <div class="item-inner">
            <label style="font-size: 14px;">登录时间：</label>
            <el-date-picker
              v-model="queryObj.startLoginDate"
              size="mini"
              type="date"
              placeholder="开始时间">
            </el-date-picker>
            <label style="font-size: 14px; padding: 0 4px">至</label>
            <el-date-picker
              v-model="queryObj.endLoginDate"
              type="date"
              size="mini"
              placeholder="结束时间">
            </el-date-picker>
          </div>
          <div class="item-inner new-gronp">
            <el-button size="mini" type="primary" @click="confirm">确定</el-button>
          </div>
          <div class="item-inner new-gronp">
            <el-button size="mini" type="primary" @click="query">查询</el-button>
          </div>
          <div class="item-inner delete">
          </div>
        </div>
        <div class="add"></div>
      </div>
      <div class="sent-table">
      <el-table style="width: 100%;"
                v-loading="loding"
                :data="tableData"
                @select = "selectOn"
                @select-all = "selectAll"
                ref="multipleTable"
                border
                stripe
                size="mini"
                header-row-class-name="element-headerRowClassName">
        <el-table-column label="客户姓名" width="100px" prop="name" align="left"></el-table-column>
        <el-table-column label="客户编号" width="" prop="brmid" align="center"></el-table-column>
        <el-table-column label="客户VIP等级" width="" prop="levelShortname" align="center"></el-table-column>
        <el-table-column label="注册时间" width="" prop="createTime" align="center"></el-table-column>
        <el-table-column label="当前魅力值" width="" prop="levelScore" align="center"></el-table-column>
        <el-table-column label="消费总额" width="" prop="totalRecharge" align="center"></el-table-column>
      </el-table>
      <div class="custom-pagination">
        <div class="achievement-pagination-content" style="float: right;">
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
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
import { mapActions, mapGetters } from 'vuex'
import { Select, Option, DatePicker, Button, Message, Table, TableColumn, Pagination, Input } from 'element-ui'
import { appUserList } from 'api/message'
import { format } from 'common/js/util'
import { ERR_SUCCESS } from 'api/config'
const _userTypes = [{ value: '意向客户', label: '意向客户' }, { value: '保留客户', label: '保留客户' }, { value: '待转客户', label: '待转客户' }]
const _leveloptions = [{
  value: '1',
  label: 'vip1'
}, {
  value: '2',
  label: 'vip2'
}, {
  value: '3',
  label: 'vip3'
}, {
  value: '4',
  label: 'vip4'
}, {
  value: '5',
  label: 'vip5'
}]
export default {
  data() {
    return {
      loding: false,
      checkList: ['复选框 A'],
      pageSize: 10,
      pageNum: 1,
      total: 20,
      endTime: '',
      startTime: '',
      tableData: [],
      levelSequence: '',
      leveloptions: _leveloptions,
      userTypes: _userTypes,
      options: [{
        value: 1,
        label: 'brm客户'
      }, {
        value: 0,
        label: 'app客户'
      }],
      queryObj: {
        levelSequence: '', // 会员等级
        userType: '', // 客户类别
        isBrm: '', // 客户来源
        startTime: '', // 首次注册时间
        endTime: '', // 最晚注册时间
        startLoginDate: '', // 首次登录时间
        endLoginDate: '', // 最后登录时间
        pageNum: '',
        pageSize: ''
      },
      queryVux: {}
    }
  },
  created() {
    this.queryVux = this.messageUser
    this.queryObj.levelSequence = this.queryVux.levelSequence
    this.queryObj.userType = this.queryVux.userType
    this.queryObj.isBrm = this.queryVux.isBrm
    this.queryObj.startTime = this.queryVux.startTime
    this.queryObj.endTime = this.queryVux.endTime
    this.queryObj.startLoginDate = this.queryVux.startLoginDate
    this.queryObj.endLoginDate = this.queryVux.endLoginDate
    this._appUserList()
  },
  computed: {
    ...mapGetters(['messageUser'])
  },
  methods: {
    changePage(key, num) {
      switch (key) {
        case 'pageSize':
          this.queryObj.pageSize = num
          this._appUserList()
          break
        case 'pageNum':
          this.queryObj.pageNum = num
          this._appUserList()
          break
        default:
          break
      }
    },
    query() {
      this._appUserList('reset')
    },
    confirm() {
      const { levelSequence, userType, isBrm, startTime, endTime, startLoginDate, endLoginDate } = this.queryObj
      this.setMessageUser({ levelSequence, userType, isBrm, startTime, endTime, startLoginDate, endLoginDate })
      this.$router.push({ path: '/message/groupedit' })
    },
    _appUserList() { // 查询数据列表
      const { levelSequence, userType, isBrm, startTime, endTime, startLoginDate, endLoginDate, pageNum, pageSize } = this.queryObj
      appUserList({
        levelSequence,
        userType,
        isBrm,
        startTime: format(startTime, '$1-$2-$3'),
        endTime: format(endTime, '$1-$2-$3'),
        startLoginDate: format(startLoginDate, '$1-$2-$3'),
        endLoginDate: format(endLoginDate, '$1-$2-$3'),
        pageNum,
        pageSize
      }).then(res => {
        if (res.code === ERR_SUCCESS) {
          this.tableData = res.data.dataList
          this.total = res.data.total
        } else {
          Message.error(res.data)
        }
      })
    },
    selectOn() {

    },
    selectAll() {
    },
    handleSizeChange() {

    },
    handleCurrentChange() {

    },
    ...mapActions(['setMessageUser'])
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
  .wapper
    height 100%
    background #f6f7f9
    overflow-y auto
  .logistics-title
    height 40px
    line-height 40px
    background-color #f2f2f2
    border-bottom 1px solid #c2c2c2
    color #a4a4a4
    span
      margin-left 10px
      padding-left 10px
      font-size 14px
      border-left 2px solid #199ed9
  .add-wapper
    margin 10px 0 0 10px
  .sent-title
    height 40px
    line-height 40px
    background #f2f2f2
    span
      padding-left 10px
      margin-left 10px
      color #333
      font-size 14px
      border-left 2px solid #199ed9
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
