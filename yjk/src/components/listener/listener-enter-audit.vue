<!-- page name : 解忧师入驻资料审核列表 -->
<!-- created by : lvhaizhou -->
<!-- created time : 2019-04-20 -->
<template>
  <div class="listener-page">
    <p class="title"><span>解忧师入驻审核列表</span></p>
    <div class="listener-header">
      <list-table title="解忧师入驻审核" :border="true" style="box-shadow: none;">
        <slot slot="query">
          <div class="listener-header-query">
            <div class="listener-header-item">
              <span class="label" style="width: 65px; text-align: right;">用户ID ：</span>
              <div class="listener-input-item">
                <el-input placeholder="输入用户ID" clearable v-model="queryListener.userid" size="mini" maxlength="20" ></el-input>
              </div>
            </div>
            <div class="listener-header-item">
              <span class="label" style="width: 65px; text-align: right;">昵称 ：</span>
              <div class="listener-input-item">
                <el-input placeholder="输入昵称" clearable v-model="queryListener.nickName" size="mini" maxlength="30" ></el-input>
              </div>
            </div>
            <div class="listener-header-item">
              <span class="label" style="width: 65px; text-align: right;">姓名 ：</span>
              <div class="listener-input-item">
                <el-input placeholder="输入姓名" clearable v-model="queryListener.name" size="mini" maxlength="10"></el-input>
              </div>
            </div>
            <div class="listener-header-item">
              <span class="label" style="width: 65px; text-align: right;">手机号码 ：</span>
              <div class="listener-input-item">
                <el-input placeholder="输入手机号码" clearable v-model="queryListener.mobile" size="mini" maxlength="20" ></el-input>
              </div>
            </div>
            <div class="listener-header-item">
              <span class="label" style="width: 65px; text-align: right;">状态 ：</span>
              <div class="listener-input-item">
                <el-select v-model="queryListener.state" placeholder="请选择">
                    <el-option
                    v-for="item in statusList"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                    </el-option>
                </el-select>
              </div>
            </div>
            <div class="listener-header-selectbtn">
              <el-button size="small" type="primary" @click="getTableList" style="vertical-align: middle;">查询</el-button>
              <el-button size="small" type="primary" @click="resetInit" style="vertical-align: middle;">重置</el-button>
            </div>
          </div>
        </slot>

        <div class="listener-table">
          <el-table style="width: 100%;"
                :data="tableData"
                ref="multipleTable"
                border
                size="mini"
                v-loading="loading"
                :row-class-name="tableRowClassName"
                header-row-class-name="element-headerRowClassName">
            <el-table-column label="用户ID" width="" prop="userid" align="center" style="color: #999999">
              <template slot-scope="scope">
                <span v-if="scope.row.userid">{{scope.row.userid}}</span>
                <span v-else>-</span>
              </template>
            </el-table-column>
            <el-table-column label="昵称" width="" prop="nickName" align="center">
              <template slot-scope="scope">
                <span v-if="scope.row.nickName">{{scope.row.nickName}}</span>
                <span v-else>-</span>
              </template>
            </el-table-column>
            <el-table-column label="姓名" width="" prop="name" align="center">
              <template slot-scope="scope">
                <span v-if="scope.row.name">{{scope.row.name}}</span>
                <span v-else>-</span>
              </template>
            </el-table-column>
            <el-table-column label="手机号码" width="" prop="mobile" align="center">
              <template slot-scope="scope">
                <span v-if="scope.row.mobile">{{scope.row.mobile}}</span>
                <span v-else>-</span>
              </template>
            </el-table-column>
            <el-table-column label="申请时间" width="" prop="updateTime" align="center">
              <template slot-scope="scope">
                <span v-if="scope.row.updateTime">{{scope.row.updateTime}}</span>
                <span v-else>-</span>
              </template>
            </el-table-column>
            <el-table-column label="状态" width="120" prop="state" align="center">
              <template slot-scope="scope">
                <span v-if="scope.row.state===0" style="color:red;">未审核</span>
                <span v-else-if="scope.row.state===1">通过</span>
                <span v-else>不通过</span>
              </template>
            </el-table-column>
            <el-table-column label="操作" width="" align="center">
              <template slot-scope="scope">
                <el-button
                  @click="getAllListenerInfo(scope)"
                  :data-scope='scope'
                  class="custom-columnButton"
                  type="text"
                  size="small">
                  <span>详情</span>
                </el-button>
              </template>
            </el-table-column>
          </el-table>
          <div class="listener-pagination">
            <div class="listener-pagination-content">
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
    <!-- 详情 -->
    <listener-enter-audit-detail
        ref="auditDetail"
        v-if="detailDialogShow"
        :visible.sync="detailDialogShow"
        @reloadPageData="getTableList"
        :id="id"
        :userid="userid"
      ></listener-enter-audit-detail>
  </div>
</template>

<script type="text/ecmascript-6">
import {
  Input, Button, Table, TableColumn, Message,
  Pagination, Select, Option, Dialog
} from 'element-ui'
import listTable from 'base/list-table/list-table'
import { ERR_SUCCESS } from 'api/config'
import { getMcApplyInfoList } from 'api/listener' // getAllListenerService
// 详情组件
import listenerEnterAuditDetail from '@/components/listener/listener-enter-audit-detail.vue'

// 由于接口还没出，暂时引入自定义json，用以冒充tabledata
// import listenerEnterAuditJSON from '@/static/mock_json/listenerEnterAudit.json'
export default {
  data() {
    return {
      id: null,
      userid: null,
      loading: false,
      queryListener: { // 查询条件
        userid: '',
        name: '',
        nickName: '',
        mobile: '',
        state: ''
      },
      nowQueryListener: { // 点击查询按钮后，确认当前查询条件
        userid: null,
        nickName: null,
        name: null,
        mobile: null,
        state: ''
      },
      pageNum: 1,
      pageSize: 10,
      total: 0,
      tableData: [],
      ServiceValue: '',
      AllServiceName: [],
      getAllListenerServiceScope: {},
      statusList: [ // 查询条件中的状态
        {
          value: '',
          label: '全部'
        },
        {
          value: 0,
          label: '未审核'
        },
        {
          value: 1,
          label: '通过'
        },
        {
          value: -1,
          label: '不通过'
        }
      ],
      detailDialogShow: false // 详情弹框
    }
  },
  created() {
    this.updateDataSelect = []
    this.init()
  },
  methods: {
    init(){
      this.getTableList()
    },
    resetInit(){ // 重置按钮
      this.queryListener = { // 查询条件
        userid: '',
        name: '',
        nickName: '',
        mobile: '',
        state: ''
      }
      this.nowQueryListener = { // 查询条件
        userid: '',
        name: '',
        nickName: '',
        mobile: '',
        state: ''
      }
      this.getTableList()
    },
    getTableList(e){
      const userInQueryListener = Object.assign({}, this.queryListener)
      // eslint-disable-next-line prefer-const
      let { pageNum, pageSize } = this
      if (e) { // 由查询按钮进入时
        pageNum = 1
        const listenerIdReg = /^[1-9]{1}\d*$/g
        if (userInQueryListener.userid && userInQueryListener.userid !== '') {
          userInQueryListener.userid = userInQueryListener.userid.replace(/(^\s*)|(\s*$)/g, '')
          if (!listenerIdReg.test(userInQueryListener.userid) || userInQueryListener.userid.length > 9) {
            Message.warning('请输入正确的ID ')
            return false
          }
        }
        if (userInQueryListener.nickName && userInQueryListener.nickName !== ''){
          userInQueryListener.nickName = userInQueryListener.nickName.replace(/(^\s*)|(\s*$)/g, '')
          if (userInQueryListener.nickName.length > 30){
            Message.warning('请输入正确的昵称 ')
            return false
          }
        }
        if (userInQueryListener.name && userInQueryListener.name !== ''){
          userInQueryListener.name = userInQueryListener.name.replace(/(^\s*)|(\s*$)/g, '')
          if (userInQueryListener.name.length > 10){
            Message.warning('请输入正确的姓名 ')
            return false
          }
        }
        const reg = /^1[3456789]{1}\d{9}$/g
        if (userInQueryListener.mobile && userInQueryListener.mobile !== '') {
          userInQueryListener.mobile = userInQueryListener.mobile.replace(/(^\s*)|(\s*$)/g, '')
          if (!reg.test(userInQueryListener.mobile)) {
            Message.warning('请输入正确的手机号 ')
            return false
          }
        }
        // 将当前输入的查询条件保存
        this.nowQueryListener = userInQueryListener
      }
      this.nowQueryListener.pageNum = pageNum || 1
      this.nowQueryListener.pageSize = pageSize || 10
      console.log(this.nowQueryListener)
      this.loading = true
      getMcApplyInfoList(this.nowQueryListener).then(res => {
        if (res.code === ERR_SUCCESS) {
          this.tableData = res.data.dataList
          this.total = res.data.total
          this.pageNum = res.data.pageNum
          this.pageSize = res.data.pageSize
        } else {
          Message.error(res.msg)
        }
        this.loading = false
      }).catch((err) => {
        Message.error(err.msg)
        this.loading = false
      })
    },
    tableRowClassName({ row, rowIndex }) {
      if (!row.isValid) {
        return 'row-is-valid'
      }
      return ''
    },
    changePage(key, num) {
      switch (key) {
        case 'pageSize':
          this.pageSize = num
          this.getTableList()
          break
        case 'pageNum':
          this.pageNum = num
          this.getTableList()
          break
        default:
          break
      }
    },
    // 获取详情
    getAllListenerInfo(scope){
      const that = this
      that.detailDialogShow = true
      that.id = scope.row.id
      that.userid = scope.row.userid
    }
  },
  watch: {
  },
  components: {
    'listener-enter-audit-detail': listenerEnterAuditDetail,
    [Input.name]: Input,
    [Button.name]: Button,
    [Select.name]: Select,
    [Option.name]: Option,
    [Dialog.name]: Dialog,
    [Table.name]: Table,
    [TableColumn.name]: TableColumn,
    [Pagination.name]: Pagination,
    listTable
  }
}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
@import "~common/css/variable"
@import "~common/css/mixin"
@import "~common/css/elementCustom"

.listener-page
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
  .listener-header
    position relative
  .listener-header-query
    width 96%
    margin 0 auto;
    font-size 0
    padding-top 15px
  .listener-header-item
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
    & > .listener-input-item
      display inline-block
      // margin-left 115px
      font-size $font-size-sm
  .listener-header-more
    height 0px
    transition height 400ms
    overflow hidden
  .listener-more-button
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
  .listener-button
    padding-top 5px
    width 100%
    height 28px
    text-align center
    button
      margin-right 15px
      width 120px
  .listener-table
    padding 0 10px
.listener-pagination
  padding 21px 0
  height 32px
  line-height 32px
  border 1px solid #ebeef5
  border-top none
  overflow hidden
  .listener-pagination-select
    inline-block-top()
  .listener-pagination-checkbox
    width 34px
    height 32px
    line-height 32px
    text-align center
    inline-block-top()
  .listener-pagination-content
    float right
    margin-right 20px
    inline-block-top()
</style>
<style lang="stylus" rel="stylesheet/stylus">
.listener-header-item{
    .listener-input-item{
        .el-select input{
            width: 193px;
            height: 28px;
        }
    }
}
.listener-header-selectbtn{
    display: block;
    text-align: center;
    margin-top: 10px;
}

</style>
