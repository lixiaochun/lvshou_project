<template>
  <div class="member-page">
    <p class="title"><span>服务收费标准设置</span></p>
    <div class="member-header">
      <list-table title="服务收费标准设置" :border="true" style="box-shadow: none;">
        <slot slot="query">
          <div class="member-header-query">
            <div class="member-header-item">
              <span class="label" style="width: 115px;">收费标准名称：</span>
              <div class="member-input-item">
                <el-input placeholder="请输入收费标准名称" clearable @input="changeAmount" v-model="queryObj.name" size="mini" ></el-input>
              </div>
            </div>
            <div class="member-header-item">
              <el-button size="mini" type="primary" @click="query" style="vertical-align: middle;">查询</el-button>
            </div>
            <div class="member-header-item" style="float: right">
              <el-button size="mini" type="primary" @click="dialogServiceSettingAdd" style="vertical-align: middle;">新增</el-button>
            </div>
          </div>
        </slot>

        <div class="member-table">
          <el-table style="width: 100%;"
                    :data="tableData"
                    ref="multipleTable"
                    border
                    stripe
                    size="mini"
                    v-loading="loading"
                    header-row-class-name="element-headerRowClassName">
            <el-table-column label="收费标准名称" width="" prop="serviceName" align="center"></el-table-column>
             <el-table-column label="文字服务" width="" align="center">
              <template slot-scope="scope">
                <div v-if="scope.row.wordService">
                  <div>单价：{{scope.row.wordService.price | formatCurrency}}元/分钟</div>
                  <div>最低服务时长：{{scope.row.wordService.duration}}分钟</div>
                  <div>起步价：{{scope.row.wordService.startPrice | formatCurrency}}元</div>
                  <div>有效期：{{scope.row.wordService.validDate}}</div>
                </div>
              </template>
             </el-table-column>
            <el-table-column label="语音服务" width="" align="center">
              <template slot-scope="scope">
                <div v-if="scope.row.voiceService">
                  <div>单价：{{scope.row.voiceService.price | formatCurrency}}元/分钟</div>
                  <div>最低服务时长：{{scope.row.voiceService.duration}}分钟</div>
                  <div>起步价：{{scope.row.voiceService.startPrice | formatCurrency}}元</div>
                  <div>有效期：{{scope.row.voiceService.validDate}}</div>
                </div>
              </template>
            </el-table-column>
            <el-table-column label="套餐服务" width="" align="center">
              <template slot-scope="scope">
                <div v-if="scope.row.mealService">
                    <div v-for="(item, index) in scope.row.mealService" v-bind:key=" 'key' + index">
                      <span>{{item.name}}</span> /
                      <span>{{item.duration}}分钟</span> /
                      <span>{{item.startPrice | formatCurrency}}元</span> /
                      <span>有效期：{{item.validDate}}</span>
                    </div>
                </div>
              </template>
            </el-table-column>
            <el-table-column label="创建时间" width="150" prop="createTime" align="center"></el-table-column>
            <el-table-column label="更新时间" width="150" prop="updateTime" align="center"></el-table-column>
            <el-table-column label="操作" width="100" prop="" align="center">
              <template slot-scope="scope">
                <el-button
                  @click.native.prevent="dialogServiceSettingEdit(scope)"
                  :data-scope='scope'
                  class="custom-columnButton"
                  type="text"
                  size="small">
                  <span>编辑</span>
                </el-button>
                <!-- <span style="color: #409EFF;">|</span>
                <el-button
                  @click.native.prevent="rowAction( scope.$index, tableData, 'info')"
                  class="custom-columnButton"
                  type="text"
                  size="small">
                  <span>取消默认</span>
                </el-button>
                <span style="color: #409EFF;">|</span>
                <el-button
                  @click.native.prevent="rowAction( scope.$index, tableData, 'info')"
                  class="custom-columnButton"
                  type="text"
                  size="small">
                  <span>设为默认</span>
                </el-button> -->
              </template>
            </el-table-column>
          </el-table>
          <div class="member-pagination">
            <div class="member-pagination-content">
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
      </list-table>
    </div>
    <!--  -->
    <el-dialog
      :title="dialogServiceSettingTitle"
      :visible.sync="dialogServiceSetting"
      :close-on-click-modal='false'
      class="dialogServiceSetting"
      width="900px">
      <listener-service-setting ref="dialogServiceSettingForm"></listener-service-setting>
      <div class="button">
        <el-button @click="dialogServiceSetting = false">取消</el-button>
        <el-button type="primary" @click="preservation">保存</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script type="text/ecmascript-6">
import {
  Input, Button, DatePicker, Table, TableColumn, Switch, Message, MessageBox,
  Pagination, Checkbox, Select, Option, Dialog
} from 'element-ui'
import listTable from 'base/list-table/list-table'
import ListenerServiceSetting from './listener-service-setting.vue'
import { ERR_SUCCESS } from 'api/config'
import { updateState, getLabelList, saveLabelToUser } from 'api/user'
import { getListenerServiceList } from 'api/listener'
import { formatCurrency } from 'common/js/util'
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
      dialogServiceSetting: false,
      dialogServiceSettingTitle: '新增',
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
    // 关闭编辑弹框
    this.$root.$on('dialogServiceSettingClose', (Setting) => {
      this.dialogServiceSetting = Setting || false
    })
    this.$root.$on('getAppUserListReset', (Setting) => {
      this._getAppUserList()
    })
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
    // 服务收费标准设置 新增
    dialogServiceSettingAdd() {
      this.dialogServiceSetting = true
      this.dialogServiceSettingTitle = '新增'
      if (this.$refs.dialogServiceSettingForm && this.$refs.dialogServiceSettingForm.handlInitListenerService) {
        this.$refs.dialogServiceSettingForm.handlInitListenerService()
      } else {
        setTimeout(() => {
          this.$refs.dialogServiceSettingForm.handlInitListenerService()
        }, 500)
      }
    },
    // 服务收费标准设置 编辑
    dialogServiceSettingEdit(scope) {
      this.dialogServiceSetting = true
      this.dialogServiceSettingTitle = '编辑'
      if (scope.row.mealService && scope.row.mealService.length) {
        scope.row.mealService.forEach(elem => {
          elem.price = elem.price || elem.startPrice
        })
      }
      if (this.$refs.dialogServiceSettingForm && this.$refs.dialogServiceSettingForm.dialogServiceSettingEdit) {
        this.$refs.dialogServiceSettingForm.dialogServiceSettingEdit(scope.row)
      } else {
        setTimeout(() => {
          this.$refs.dialogServiceSettingForm.dialogServiceSettingEdit(scope.row)
        }, 500)
      }
    },
    // 确认
    preservation() {
      this.$refs.dialogServiceSettingForm.preservation()
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
      const { name } = this.queryObj
      // eslint-disable-next-line prefer-const
      let { pageNum, pageSize } = this
      if (e) {
        pageNum = 1
      }
      getListenerServiceList(name, pageNum, pageSize).then(res => {
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
  filters: {
    formatCurrency(value) {
      let v = ''
      if (parseFloat(value) < 0) {
        v = '- '
      }
      const $value = formatCurrency(Math.abs(value))
      return $value === 'invalid value' ? '' : v + $value
    }
  },
  components: {
    [Input.name]: Input,
    [Button.name]: Button,
    [Select.name]: Select,
    [Option.name]: Option,
    [Switch.name]: Switch,
    [Dialog.name]: Dialog,
    [DatePicker.name]: DatePicker,
    [Table.name]: Table,
    [TableColumn.name]: TableColumn,
    [Pagination.name]: Pagination,
    [Checkbox.name]: Checkbox,
    listTable,
    ListenerServiceSetting
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
    padding-top 16px
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
.dialogServiceSetting{
  .el-dialog{
    margin-top: 10vh
  }
  .button{
    padding 30px 0 0
    text-align center
    button{
      margin  0 15
    }
  }
}
</style>
