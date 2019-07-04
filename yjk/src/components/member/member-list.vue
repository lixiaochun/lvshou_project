<template>
  <div class="member-page">
    <p class="title"><span>会员列表</span></p>
    <div class="member-header">
      <list-table title="会员列表" :border="true" style="box-shadow: none;">
        <slot slot="query">
          <!-- <div style="background: #f2f2f2; height: 40px;">
            <div class="member-more-button" :class="{active: isMore}" @click="hasMore">
              <el-button type="text" icon="el-icon-arrow-down">
                {{ isMore ? '高级筛选' : '收起筛选'}}
              </el-button>
            </div>
          </div> -->
          <div class="member-header-query">
            <div class="member-header-item">
              <span class="label">用户ID：</span>
              <div class="member-input-item">
                <el-input placeholder="输入用户ID" clearable @input="changeAmount" v-model="queryObj.id" size="mini" maxlength="20" ></el-input>
              </div>
            </div>
            <div class="member-header-item" >
              <span class="label" >BRM客户编号：</span>
              <div class="member-input-item">
                <el-input placeholder="输入BRM客户编号" clearable v-model="queryObj.brmid" size="mini" ></el-input>
              </div>
            </div>
            <div class="member-header-item">
              <span class="label">姓名：</span>
              <div class="member-input-item">
                <el-input placeholder="请输入姓名" clearable v-model="queryObj.name" size="mini" ></el-input>
              </div>
            </div>
            <div class="member-header-item">
              <span class="label">昵称：</span>
              <div class="member-input-item">
                <el-input placeholder="请输入昵称" clearable v-model="queryObj.nickName" size="mini" ></el-input>
              </div>
            </div>
            <div class="member-header-item">
              <span class="label">手机号码：</span>
              <div class="member-input-item">
                <el-input placeholder="请输入手机号码" clearable v-model="queryObj.mobile" size="mini" ></el-input>
              </div>
            </div>
              <!-- <div class="member-header-item">
                <span class="label">会员等级：</span>
                <div class="member-input-item">
                  <el-select v-model="queryObj.levelSequence" clearable size="mini"  style="width: 100%" placeholder="请选择会员等级">
                    <el-option
                      v-for="item in levelSequences"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value">
                    </el-option>
                  </el-select>
                </div>
              </div> -->
              <div class="member-header-item">
                <span class="label">客户来源：</span>
                <div class="member-input-item">
                  <el-select v-model="queryObj.isBrm" size="mini" clearable  style="width: 100%" placeholder="请选择客户来源">
                    <el-option
                      v-for="item in brms"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value">
                    </el-option>
                  </el-select>
                </div>
              </div>
              <div class="member-header-item" style=" width:450px">
                <span class="label">注册日期：</span>
                <div class="member-input-item">
                  <el-date-picker type="date" size="mini"
                                  value-format="yyyy-MM-dd"
                                  format="yyyy-MM-dd"
                                  placeholder="请选择注册日期" style="width: 160px;"
                                  v-model="queryObj.startTime" >
                  </el-date-picker>
                  至
                  <el-date-picker type="date" size="mini"
                                  value-format="yyyy-MM-dd"
                                  format="yyyy-MM-dd"
                                  placeholder="请选择注册日期" style="width: 160px;"
                                  v-model="queryObj.endTime" >
                  </el-date-picker>
                </div>
              </div>
            <div class="member-button">
              <el-button size="mini" type="primary" @click="query">查询</el-button>
              <el-button size="mini" @click="reset">重置</el-button>
            </div>
          </div>
        </slot>

        <div class="member-table">
          <el-table style="width: 100%;"
                    :data="tableData"
                    @select = "selectOn"
                    @select-all = "selectAll"
                    ref="multipleTable"
                    border
                    stripe
                    size="mini"
                    v-loading="loading"
                    header-row-class-name="element-headerRowClassName">
            <!-- <el-table-column type="selection" width="35" align="center"></el-table-column> -->
            <el-table-column label="用户ID" width="" prop="id" align="center"></el-table-column>
             <el-table-column label="BRM客户编号" width="" prop="brmid" align="center"></el-table-column>
             <el-table-column label="昵称" width="" prop="nickName" align="center"></el-table-column>
            <el-table-column label="姓名" width="" prop="name" align="center"></el-table-column>
            <el-table-column label="资料所属人" width="" prop="consultantUserName" align="center"></el-table-column>
            <el-table-column label="手机号码" width="120" prop="mobile" align="center"></el-table-column>
            <el-table-column label="会员等级" width=""  prop="levelShortname" align="center"></el-table-column>
            <!-- <el-table-column label="会员魅力值" width="" prop="levelScore" align="center"></el-table-column> -->
            <el-table-column label="客户来源" width="80" prop="isBrm" align="center">
              <template slot-scope="scope">
                {{_isBrm(tableData[scope.$index].isbrm)}}
              </template>
            </el-table-column>
            <el-table-column  width="" :render-header="renderHeader" prop="createTime" align="center"></el-table-column>
            <!-- <el-table-column label="状态"  align="center" width="60">
              <template slot-scope="scope">
                <el-switch
                  v-model="scope.row.state"
                  @click.native.prevent="changeSwitch( scope.$index, tableData )"
                  active-color="#13ce66"
                  inactive-color="#ff4949"
                  :active-value="1"
                  :inactive-value="0">
                </el-switch>
              </template>
            </el-table-column> -->
            <el-table-column label="操作" width="100" prop="" align="center">
              <template slot-scope="scope">
                <el-button
                  @click.native.prevent="rowAction( scope.$index, tableData, 'info')"
                  class="custom-columnButton"
                  type="text"
                  size="small">
                  <span>详情</span>
                </el-button>
                <el-button
                  @click.native.prevent="rowAction( scope.$index, tableData, 'edit')"
                  class="custom-columnButton"
                  type="text"
                  size="small">
                  <span>编辑</span>
                </el-button>
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
  </div>
</template>

<script type="text/ecmascript-6">
import {
  Input, Button, DatePicker, Table, TableColumn, Switch, Message, MessageBox,
  Pagination, Checkbox, Select, Option
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
  data() {
    return {
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
      // isMore: true,
      allCheck: false,
      loading: false,
      state: 1,
      pageNum: 1,
      pageSize: 10,
      queryObj: {
        id: '',
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
      var id = this.queryObj.id
      if (id){
        id = id.replace(/(^\s*)|(\s*$)/g, '')
        if (id.length > 9) {
          Message.warning('请输入正确的ID ')
          return false
        }
      }
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
      this.query()
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
    // hasMore() {
    //   this.isMore = !this.isMore
    // },
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
    // changeSwitch(index, table) {
    //   const { state, id } = table[index]
    //   MessageBox.confirm('是否修改状态?', '系统提示', {
    //     confirmButtonText: '确定',
    //     cancelButtonText: '取消',
    //     type: 'warning'
    //   }).then(action => {
    //     updateState({ ids: id, state }).then(res => {
    //       if (res.code === ERR_SUCCESS) {
    //         Message({
    //           message: '修改状态成功！',
    //           type: 'success'
    //         })
    //       } else {
    //         Message.error(res.msg)
    //       }
    //     })
    //   }).catch(erro => {
    //     if (table[index].state === 0) {
    //       table[index].state = 1
    //     } else {
    //       table[index].state = 0
    //     }
    //   })
    // },
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
      const { brmid, name, nickName, mobile, isBrm, levelSequence, startTime, endTime, sort, id } = this.queryObj
      // eslint-disable-next-line prefer-const
      let { pageNum, pageSize } = this
      if (e) {
        pageNum = 1
        postObj = { brmid, name, nickName, mobile, isBrm, levelSequence, startTime, endTime, pageNum, pageSize, sort, id }
      } else {
        postObj = { brmid, name, nickName, mobile, isBrm, levelSequence, startTime, endTime, pageNum, pageSize, sort, id }
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
    width 24%
    height 40px
    line-height 40px
    inline-block-top()
    & > .label
      float left
      width 80px
      font-size $font-size-sm
      inline-block-top()
    & > .member-input-item
      display block
      margin-left 80px
      font-size $font-size-sm
  .member-header-item:nth-child(2)
    width 26%
    inline-block-top()
    & > .label
      width 90px
      inline-block-top()
    & > .member-input-item
      margin-left 90px
  .member-header-item:nth-child(4)
    width 22%
    inline-block-top()
    & > .label
      width 70px
      inline-block-top()
    & > .member-input-item
      margin-left 70px
  .member-header-item:nth-child(6)
    width 26%
    inline-block-top()
    & > .label
      width 90px
      inline-block-top()
    & > .member-input-item
      margin-left 90px
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
.member-input-item .el-select .el-input input{
  width: 100% !important;
  height: 28px;

}
</style>
