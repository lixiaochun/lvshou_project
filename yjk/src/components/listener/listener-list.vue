<template>
  <div class="member-page">
    <p class="title"><span>解忧师列表</span></p>
    <div class="member-header">
      <list-table title="解忧师列表" :border="true" style="box-shadow: none;">
        <slot slot="query">
          <div class="member-header-query">
            <div class="member-header-item">
              <span class="label" style="width: 65px;">用户ID ：</span>
              <div class="member-input-item">
                <el-input placeholder="输入用户ID" clearable @input="changeAmount" v-model="queryListener.listenerId" size="mini" maxlength="12"></el-input>
              </div>
            </div>
            <div class="member-header-item">
              <span class="label" style="width: 65px;">昵称 ：</span>
              <div class="member-input-item">
                <el-input placeholder="输入昵称" clearable @input="changeAmount" v-model="queryListener.nickname" size="mini" maxlength="30" ></el-input>
              </div>
            </div>
            <div class="member-header-item">
              <span class="label" style="width: 65px;">姓名 ：</span>
              <div class="member-input-item">
                <el-input placeholder="输入姓名" clearable @input="changeAmount" v-model="queryListener.name" size="mini" maxlength="10" ></el-input>
              </div>
            </div>
            <div class="member-header-item">
              <span class="label" style="width: 65px;">手机号码 ：</span>
              <div class="member-input-item">
                <el-input placeholder="输入手机号码" clearable @input="changeAmount" v-model="queryListener.mobile" size="mini" maxlength="20"></el-input>
              </div>
            </div>
            <div class="member-header-item">
              <span class="label" style="width: 65px;">显示 ：</span>
              <div class="member-input-item">
                <el-select v-model="queryListener.onlineState" placeholder="请选择" style="width: 193px; height: 28px;">
                  <el-option
                    v-for="item in showInAppList"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                  </el-option>
                </el-select>
              </div>
            </div>
            <div class="listener-header-selectbtn">
              <el-button size="mini" type="primary" @click="query" style="vertical-align: middle;">查询</el-button>
              <el-button size="small" type="primary" @click="resetInit" style="vertical-align: middle;">重置</el-button>
            </div>
          </div>
        </slot>
        <div class="member-table">
          <el-table style="width: 100%;"
                    :data="tableData"
                    ref="multipleTable"
                    border
                    size="mini"
                    v-loading="loading"
                    :row-class-name="tableRowClassName"
                    header-row-class-name="element-headerRowClassName">
            <el-table-column label="用户ID" width="" prop="listenerId" align="center">
              <template slot-scope="scope">
                <span v-if="scope.row.listenerId">{{scope.row.listenerId}}</span>
                <span v-else>-</span>
              </template>
            </el-table-column>
            <el-table-column label="昵称" width="" prop="nickname" align="center" style="color: #999999">
              <template slot-scope="scope">
                <span v-if="scope.row.nickname">{{scope.row.nickname}}</span>
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
            <el-table-column label="入驻时间" width="" prop="createTime" align="center">
              <template slot-scope="scope">
                <span v-if="scope.row.createTime">{{scope.row.createTime}}</span>
                <span v-else>-</span>
              </template>
            </el-table-column>
            <el-table-column label="个人主页资料" width="" prop="auditState" align="center">
              <template slot-scope="scope">
                <span v-if="scope.row.auditState">已完善</span>
                <span v-else style="color: #d7d7d7;">未完善</span>
              </template>
            </el-table-column>
            <el-table-column label="服务收费标准" width="" prop="serviceName" align="center">
              <template slot-scope="scope">
                <el-button
                  v-if="scope.row.isValid"
                  @click="getAllListenerService(scope)"
                  :data-scope='scope'
                  class="custom-columnButton"
                  type="text"
                  size="small">
                  <span v-if="scope.row.serviceName">{{scope.row.serviceName}}</span>
                  <span v-else style="color:#E6A23C;">请选择</span>
                </el-button>
                <el-button
                  v-else
                  :data-scope='scope'
                  class="custom-columnButton"
                  type="text"
                  size="small"
                  style="color: #999999;cursor: text">
                  <span v-if="scope.row.serviceName">{{scope.row.serviceName}}</span>
                  <span v-else style="color:#E6A23C;">请选择</span>
                </el-button>
              </template>
            </el-table-column>
            <el-table-column label="在APP显示解忧师" width="" align="center">
              <template slot-scope="scope">
                <el-switch
                  v-model="scope.row.onlineState"
                  :active-value=1
                  :inactive-value=0
                  @change="showInAppSwitchChange(scope)"
                  @click.native="showReasonInAppSwitch(scope.row.auditState,scope.row.serviceName)"
                  :disabled="(scope.row.auditState && !!scope.row.serviceName) === true? false : true"><!--该解忧师个【人主页资料】并未完善或并未选择服务收费-->
                </el-switch>
              </template>
            </el-table-column>
            <el-table-column label="置顶" width="" align="center">
              <template slot-scope="scope">
                <el-switch
                  v-model="scope.row.sort"
                  :active-value=1
                  :inactive-value=0
                  @change="TOPSwitchChange(scope)"
                  @click.native="showReasonTOPSwitch(scope.row.sort, scope.row.onlineState)"
                  :disabled="scope.row.onlineState===0 ? true : false"><!--未启用在APP中显示-->
                </el-switch>
              </template>
            </el-table-column>
            <el-table-column label="操作" width="" align="center">
              <template slot-scope="scope">
                <el-button
                  @click="rowAction(scope)"
                  :data-scope='scope'
                  class="custom-columnButton"
                  type="text"
                  size="small">
                  <span>详情</span>
                </el-button>
              </template>
            </el-table-column>
          </el-table>
          <div class="member-pagination">
            <div class="member-pagination-content">
              <el-pagination
                :page-sizes="[10, 20, 50, 100]"
                :page-size="pageSize"
                :current-page.sync="pageNum"
                layout="total, sizes, prev, pager, next, jumper"
                @current-change="handleCurrentPageChange"
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
    <el-dialog title="选择服务收费标准" :visible.sync="standard" width="600px">
      <div>
          <span>服务收费标准：</span>
          <el-select v-model="ServiceValue" placeholder="请选择解忧师">
              <el-option :label="item.label" :value="item.value" v-for="(item, index) in AllServiceName" v-bind:key="'key' + index"></el-option>
          </el-select>
      </div>
      <div style="font-size: 12px;color: #BCBCBC;margin-top: 15px;">注意：服务收费标准在【服务收费标准设置】添加设置。</div>
      <div slot="footer" class="dialog-footer">
        <el-button @click="standard = false">否</el-button>
        <el-button type="primary" @click="updateListenerByService">是</el-button>
      </div>
    </el-dialog>
    <!-- 在APP中显示 -->
    <el-dialog
      :title="appShowListener.title"
      :close-on-click-modal="false"
      width="400px"
      :visible.sync="appShowListener.dialogShow"
      :before-close="showInAppDialogCancel">
      <span style="white-space: pre-line; text-align: center; line-height: 25px; margin: 0 auto; display: block;">{{appShowListener.content}}</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="showInAppDialogCancel">取 消</el-button>
        <el-button type="primary" @click="showInAppSubmit">确 认</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script type="text/ecmascript-6">
import {
  Input, Button, DatePicker, Table, TableColumn, Switch, Message, MessageBox, Loading,
  Pagination, Checkbox, Select, Option, Dialog
} from 'element-ui'
import listTable from 'base/list-table/list-table'
import { ERR_SUCCESS } from 'api/config'
import { updateState, getLabelList, saveLabelToUser } from 'api/user'
import { getListenerList, getAllListenerService, updateListenerByService, updateListenerOnlineState, topUpdateService } from 'api/listener'
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
  data() {
    return {
      dialogOnlineState: false,
      queryListener: {
        nickname: '',
        listenerId: '',
        name: '',
        mobile: '',
        onlineState: ''
      },
      nowQueryListener: {
        nickname: '',
        listenerId: '',
        name: '',
        mobile: '',
        onlineState: ''
      },
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
      detailQueryObj: {}, // detail返回的obj查询条件
      options: [],
      labelid: '',
      total: 0,
      tableData: [],
      ServiceValue: '',
      AllServiceName: [],
      getAllListenerServiceScope: {},
      appShowListener: { // 在APP中显示的Dialog内容
        title: '',
        dialogShow: false,
        content: '',
        nowScope: {} // 当前点击行的scope
      },
      // 下面这两个参数用于防止用户短时间内点击同一按钮
      nowEventName: '', // 当前正在进行的事件名称
      nowEventDate: 0, // 当前事件完成时的时间点
      showInAppList: [
        {
          label: '全部',
          value: ''
        },
        {
          label: '显示',
          value: 1
        },
        {
          label: '不显示',
          value: 0
        }
      ]
    }
  },
  created() {
    if (this.$route.query.detailQueryObj){
      this.detailQueryObj = JSON.parse(this.$route.query.detailQueryObj)
      this.nowQueryListener.listenerId = this.detailQueryObj.listenerId
      this.nowQueryListener.mobile = this.detailQueryObj.mobile
      this.nowQueryListener.name = this.detailQueryObj.name
      this.nowQueryListener.nickname = this.detailQueryObj.nickname
      this.nowQueryListener.onlineState = this.detailQueryObj.onlineState
      this.pageNum = this.detailQueryObj.pageNum
      this.pageSize = this.detailQueryObj.pageSize
      this._getAppUserList()
    } else {
      this.query()
    }
    this._getLabelList()
    this.updateDataSelect = []
  },
  methods: {
    resetInit(){ // 重置
      this.queryListener = {
        nickname: '',
        listenerId: '',
        name: '',
        mobile: '',
        onlineState: ''
      }
      this.nowQueryListener = {
        nickname: '',
        listenerId: '',
        name: '',
        mobile: '',
        onlineState: ''
      }
      this._getAppUserList()
    },
    tableRowClassName({ row, rowIndex }) {
      if (!row.isValid) {
        return 'row-is-valid'
      }
      return ''
    },
    getAllListenerService(scope) {
      this.getAllListenerServiceScopeRow = scope.row
      this.standard = true
      this.AllServiceName = []
      getAllListenerService().then(res => {
        if (res.code === ERR_SUCCESS) {
          this.AllServiceName = res.data
          if (this.getAllListenerServiceScopeRow.serviceName && this.getAllListenerServiceScopeRow.serviceName !== '') {
            res.data.forEach(elem => {
              if (this.getAllListenerServiceScopeRow.serviceName === elem.label) {
                this.ServiceValue = elem.value
              }
            })
          } else {
            this.ServiceValue = res.data[0].value
          }
        } else {
          Message.warning(res.msg || '获取服务收费标准失败')
        }
      })
    },
    updateListenerByService() {
      updateListenerByService(this.getAllListenerServiceScopeRow.listenerId, this.ServiceValue).then(res => {
        if (res.code === ERR_SUCCESS) {
          this.standard = false
          this.AllServiceName.forEach(elem => {
            if (this.ServiceValue === elem.value) {
              this.getAllListenerServiceScopeRow.serviceId = elem.value
              this.getAllListenerServiceScopeRow.serviceName = elem.label
            }
          })
          Message.success(res.msg && res.msg !== 'OK' ? res.msg : '修改服务收费标准成功')
        } else {
          Message.warning(res.msg || '修改服务收费标准失败')
        }
      })
    },
    query(e) {
      this.allCheck = false
      // eslint-disable-next-line prefer-const
      let { listenerId, nickname, name, mobile } = this.queryListener
      const listenerIdReg = /^[1-9]{1}\d*$/g
      if (listenerId && listenerId !== '') {
        listenerId = listenerId.replace(/(^\s*)|(\s*$)/g, '')
        if (!listenerIdReg.test(listenerId) || listenerId.length > 9) {
          Message.warning('请输入正确的ID ')
          return false
        }
      }
      if (nickname && nickname !== ''){
        nickname = nickname.replace(/(^\s*)|(\s*$)/g, '')
        if (nickname.length > 30){
          Message.warning('请输入正确的昵称 ')
          return false
        }
      }
      if (name && name !== ''){
        name = name.replace(/(^\s*)|(\s*$)/g, '')
        if (name.length > 10){
          Message.warning('请输入正确的姓名 ')
          return false
        }
      }
      const reg = /^1[3456789]{1}\d{9}$/g
      if (mobile && mobile !== '') {
        mobile = mobile.replace(/(^\s*)|(\s*$)/g, '')
        if (!reg.test(mobile)) {
          Message.warning('请输入正确的手机号 ')
          return false
        }
      }
      if (e){
        this.nowQueryListener.listenerId = listenerId
        this.nowQueryListener.nickname = nickname
        this.nowQueryListener.name = name
        this.nowQueryListener.mobile = mobile
        this.nowQueryListener.onlineState = this.queryListener.onlineState
      }
      this.pageNum = 1
      this._getAppUserList()
    },
    changeAmount(e) {
      setTimeout(() => {
        this.queryObj.id = e.replace(/[^0-9]/g, '')
      }, 20)
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
    handleCurrentPageChange(num){
      this.pageNum = num
      this._getAppUserList()
    },
    _getAppUserList(e) {
      this.loading = true
      const nowQueryListener = Object.assign({}, this.nowQueryListener)
      // eslint-disable-next-line prefer-const
      let { pageNum, pageSize } = this
      if (e) {
        pageNum = 1
      }
      nowQueryListener.pageNum = pageNum
      nowQueryListener.pageSize = pageSize
      getListenerList(nowQueryListener).then(res => {
        console.log(res)
        if (res.code === ERR_SUCCESS) {
          this.tableData = []
          res.data.dataList.forEach(elem => {
            if (!elem.serviceName) {
              elem.serviceName = ''
            }
            if (!elem.serviceId) {
              elem.serviceId = 0
            }
            this.tableData.push(elem)
          })
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
            Message.success('修改标签！')
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
    },
    onlineStateColor(row) {
      return row.mobile && row.mobile !== '' && row.serviceName && row.serviceName !== ''
    },
    // 打开详情页
    getListenerDetailService(scope){
      console.log(scope)
    },
    // 在APP中显示，switch开关为禁用状态时，说明原因
    showReasonInAppSwitch(auditState, serviceName){
      if (!auditState || auditState === '' || serviceName === '' || !serviceName){
        Message.warning('该解忧师【个人主页资料】并未完善或并未选择服务收费')
      }
    },
    // 在APP中显示，switch开关变化时
    showInAppSwitchChange(scope){
      this.appShowListener.nowScope = scope
      this.appShowListener.dialogShow = true
      this.appShowListener.nowScope = scope
      if (scope.row.onlineState === 1){
        this.appShowListener.title = '在APP显示解忧师'
        this.appShowListener.content = '请确认是否切换该解忧师为【开启】状态\n确定后该解忧师及相关资料立刻在APP展示'
      } else {
        this.appShowListener.title = '在APP不显示解忧师'
        this.appShowListener.content = '请确认是否切换该解忧师为【关闭】状态\n确定后该解忧师及相关资料不在在APP展示'
      }
    },
    // 确认在APP中显示or确认不在APP中显示
    showInAppSubmit(){
      const loading = Loading.service({ fullscreen: true })
      const that = this
      const listenerId = that.appShowListener.nowScope.row.listenerId
      const onlineState = that.appShowListener.nowScope.row.onlineState
      let sort = that.appShowListener.nowScope.row.sort
      // 如果更改状态为 “不在APP中显示” 则判断是否有置顶，如果有置顶，则先关闭置顶
      if (onlineState === 0){ // 0为离线状态
        if (sort === 1){ // 1为置顶状态
          that.loading = true
          sort = false
          const id = listenerId
          // 更新置顶
          topUpdateService({ id, sort }).then(res => {
            if (res.code === ERR_SUCCESS) {
              that.appShowListener.nowScope.row.sort = 0
            } else {
              Message.error(res.msg)
            }
            that.loading = false
          })
        }
      }
      updateListenerOnlineState(listenerId, onlineState).then((res) => {
        loading.close()
        if (res.code === ERR_SUCCESS) {
          Message.success('切换成功')
        } else {
          Message.error(res.msg)
          that.appShowListener.nowScope.row.onlineState = that.appShowListener.nowScope.row.onlineState === 1 ? 0 : 1
        }
        that.appShowListener.dialogShow = false
      }).catch((err) => {
        loading.close()
        Message.error(err.msg)
      })
    },
    // “在APP中显示”模态框取消事件
    showInAppDialogCancel(){
      // 如果this.nowEventName等于showInAppDialogCancel，说明上次事件也是showInAppDialogCancel，则需要判断是否为doubleclick的误操作
      if (this.nowEventName === 'showInAppDialogCancel'){
        let stamp = 0
        stamp = new Date() - this.nowEventDate
        if (stamp < 500){ // 在500毫秒内触发本事件多次，判断为误操作，直接 return false
          return false
        }
      } else {
        this.nowEventName = 'showInAppDialogCancel'
        this.nowEventDate = new Date()
      }
      this.nowEventDate = new Date()
      this.appShowListener.dialogShow = false
      this.appShowListener.nowScope.row.onlineState = this.appShowListener.nowScope.row.onlineState === 1 ? 0 : 1
    },
    // 置顶，switch开关变化时
    TOPSwitchChange(scope){
      const that = this
      const id = scope.row.listenerId
      that.appShowListener.nowScope = scope
      let sort = false
      if (scope.row.sort === 1){
        sort = true
      }
      that.loading = true
      // 更新置顶
      topUpdateService({ id, sort }).then(res => {
        if (res.code === ERR_SUCCESS) {
          Message({
            message: '切换成功！',
            type: 'success'
          })
        } else {
          Message.error(res.msg)
          that.appShowListener.nowScope.row.sort = 0
        }
        that.loading = false
      })
    },
    // 置顶，switch开关为禁用状态时，说明原因
    showReasonTOPSwitch(isTrueTOP, onlineState){
      if (onlineState !== 1){
        Message.warning('请切换【在APP显示解忧师】为【开启】，才可开启置顶')
        return false
      }
    },
    // 查看详情操作
    rowAction(scope){
      const listenerId = scope.row.listenerId
      const queryObj = {
        'listenerId': this.nowQueryListener.listenerId,
        'nickname': this.nowQueryListener.nickname,
        'name': this.nowQueryListener.name,
        'mobile': this.nowQueryListener.mobile,
        'onlineState': this.nowQueryListener.onlineState,
        'pageNum': this.pageNum || 1,
        'pageSize': this.pageSize || 10
      }
      this.$router.push({
        path: '/listener/listenerListDetail', query: { listenerId: listenerId, queryObj: JSON.stringify(queryObj) }
      })
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
    },
    total(nowVal){
      this.pageNum = this.detailQueryObj.pageNum
      this.pageSize = this.detailQueryObj.pageSize
      this._getAppUserList()
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
    padding-top 15px
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
<style lang="stylus" rel="stylesheet/stylus">
.member-input-item .el-select{
  .el-input input{
    width: 193px;
    height: 28px;
  }
}
.listener-header-selectbtn{
    display: block;
    text-align: center;
    margin-top: 10px;
}
.member-header-item{
  >.label{
    text-align: right !important;
  }
}
</style>
