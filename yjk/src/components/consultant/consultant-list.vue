<template>
  <div class="member-page">
    <p class="title"><span>健康顾问列表</span></p>
    <div class="member-header">
      <list-table title="顾问列表"
                  :border="true"
                  style="box-shadow: none;">
        <slot slot="query">
          <div style="background:#f2f2f2;height:40px;">
            <div class="el-icon-search"
                 style="margin:10px;font-size:18px"><span style="font-size:12px;padding:5px">筛选查询</span></div>
          </div>
          <div class="member-header-query">
            <div class="member-header-item">
              <span class="label">用户ID：</span>
              <div class="member-input-item">
                <el-input placeholder="请输入用户ID"
                          clearable
                          v-model="queryConsult.userid"
                          size="mini"></el-input>
              </div>
            </div>
            <div class="member-header-item">
              <span class="label"
                    style="width: 40px;">昵称：</span>
              <div class="member-input-item">
                <el-input placeholder="请输入昵称"
                          clearable
                          v-model="queryConsult.nickname"
                          size="mini"></el-input>
              </div>
            </div>
            <div class="member-header-item">
              <span class="label"
                    style="width: 40px;">姓名：</span>
              <div class="member-input-item">
                <el-input placeholder="请输入姓名"
                          clearable
                          v-model="queryConsult.name"
                          size="mini"></el-input>
              </div>
            </div>
            <div class="member-header-item">
              <span class="label"
                    style="width: 75px;">手机号码：</span>
              <div class="member-input-item">
                <el-input placeholder="请输入手机号码"
                          clearable
                          v-model="queryConsult.mobile"
                          @input="changeMobile"
                          size="mini"
                          maxlength="11"></el-input>
              </div>
            </div>

            <div class="member-header-item">
              <span class="label"
                    style="width: 80px;">显示：</span>
              <el-select v-model="queryConsult.isShow"
                         placeholder="请选择" style="width: 190px;">
                <el-option v-for="item in options"
                           :key="item.value"
                           :label="item.label"
                           :value="item.value">
                </el-option>
              </el-select>
            </div>
            <div class="member-header-item">
              <el-button size="medium"
                         type="primary"
                         @click="getTableList"
                         style="vertical-align: middle;">查询</el-button>
            </div>
          </div>
        </slot>
        <div style="background:#f2f2f2;height:60px;margin-bottom: 13px;">
          <div class="el-icon-menu"
               style="margin-top: 22px;font-size:18px"><span style="font-size:14px;padding:5px">数据列表</span></div>
        </div>
        <div class="member-table">
          <el-table style="width: 100%;"
                    :data="tableData"
                    ref="multipleTable"
                    border
                    size="mini"
                    v-loading="loading"
                    header-row-class-name="element-headerRowClassName">
            <el-table-column label="用户ID"
                             width=""
                             prop="id"
                             align="center"></el-table-column>
            <el-table-column label="BRM账号"
                             width=""
                             prop=""
                             align="center">
                             <template slot-scope="scope">
                {{scope.row.code||'—'}}
              </template>
                             </el-table-column>
            <el-table-column label="昵称"
                             width=""
                             prop=""
                             align="center">
                             <template slot-scope="scope">
                {{scope.row.nickname||'—'}}
              </template>
                             </el-table-column>
            <el-table-column label="姓名"
                             width=""
                             prop=""
                             align="center">
                             <template slot-scope="scope">
                {{scope.row.name||'—'}}
              </template>
                             </el-table-column>
            <el-table-column label="手机号码"
                             width=""
                             prop=""
                             align="center">
                             <template slot-scope="scope">
                {{scope.row.mobile||'—'}}
              </template>
                             </el-table-column>
            <!-- <el-table-column label="用户账号" width="" prop="account" align="center"></el-table-column> -->
            <el-table-column label="入驻时间"
                             width=""
                             prop="createTime"
                             align="center"></el-table-column>
            <!-- <el-table-column label="冻结/解冻" width="120" align="center">
              <template slot-scope="scope">
                {{scope.row.isValid ? '解冻': '冻结'}}
              </template>
            </el-table-column> -->
            <!-- <el-table-column label="在职/离职" width="120" align="center">
              <template slot-scope="scope">
                {{scope.row.isValid ? '在职': '离职'}}
              </template>
            </el-table-column> -->
            <el-table-column label="个人主页资料"
                             width=""
                             prop=""
                             align="center">
              <template slot-scope="scope">
                {{scope.row.auditState ? '完善': '未完善'}}
              </template>
            </el-table-column>
            <el-table-column label="在APP显示健康顾问"
                             width="120"
                             prop=""
                             align="center">
              <template slot-scope="scope">
                <!-- <el-button type="text" size="small" @click="rowAction(scope.$index, tableData)">
                  {{tableData[scope.$index].isShow ? '上线中':'已下线'}}
                </el-button> -->
                <el-switch v-model="scope.row.isShow"
                           @click.native="showReasonInAppSwitch(scope.row.auditState,scope.row.code)"
                           active-color="#3299df"
                           inactive-color="#f2f2f2"
                           :disabled="(scope.row.auditState && !!scope.row.code) === true? false : true"
                           @change="showInAppSwitchChange(scope)">
                </el-switch>
              </template>
            </el-table-column>
            <el-table-column label="置顶"
                             align="center"
                             width="60">
              <template slot-scope="scope">
                <el-switch v-model="scope.row.sort"
                           active-color="#3299df"
                           inactive-color="#f2f2f2"
                           :active-value=1
                           :inactive-value=0
                           @click.native="showReasonTOPSwitch(scope.row.sort, scope.row.isShow)"
                           :disabled="scope.row.isShow===false? true : false"
                           @change="TOPSwitchChange(scope)">
                </el-switch>
              </template>
            </el-table-column>
            <el-table-column label="操作"
                             width="100"
                             prop=""
                             align="center">
              <template slot-scope="scope">
                <el-button type="text"
                           size="small"
                           @click="details( scope.row.id)"><span>详情</span></el-button>
              </template>
            </el-table-column>
          </el-table>
          <div class="member-pagination">
            <div class="member-pagination-content">
              <el-pagination :page-sizes="[10, 20, 50, 100]"
                             :page-size="pageSize"
                             :current-page.sync="pageNum"
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
    <!-- 在APP中显示 -->
    <el-dialog :title="appShowConsultant.title"
               :close-on-click-modal="false"
               width="30%"
               :visible.sync="appShowConsultant.dialogShow"
               :before-close="showInAppDialogCancel">
      <span>{{appShowConsultant.content}}</span>
      <span slot="footer"
            class="dialog-footer">
        <el-button @click="showInAppDialogCancel">取 消</el-button>
        <el-button type="primary"
                   @click="showInAppSubmit">确 认</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script type="text/ecmascript-6">
import {
  Input, Button, DatePicker, Table, TableColumn, Switch, Message,
  Pagination, Checkbox, Select, Option, Dialog
} from 'element-ui'
import listTable from 'base/list-table/list-table'
import { ERR_SUCCESS } from 'api/config'
import { getList, updatePlfConsultantIsShow, updatePlacement } from 'api/consultant'
export default {
  data() {
    return {
      pageSize: 10, // 页面显示的条数
      pageNum: 1, // 当前页码
      total: 0, // 总条数
      tableData: [], // 列表数据数组
      loading: false, // 是否加载中
      nums: 0,
      queryConsult: { // 查询条件
        userid: '', // 用户ID
        name: '', // 姓名
        nickname: '', // 昵称
        mobile: '', // 手机
        isShow: '' // 控制APP上是否显示
      },
      nowqueryConsult: { // 点击查询按钮后，确认当前查询条件
        userid: null,
        nickName: null,
        name: null,
        mobile: null,
        isShow: ''
      },
      appShowConsultant: { // 在APP中显示的Dialog内容
        title: '',
        dialogShow: false,
        content: '',
        nowScope: {} // 当前点击行的scope
      },
      myrow: {},
      // 下拉选项
      options: [
        {
          value: '',
          label: '全部'
        },
        {
          value: true,
          label: '显示'
        },
        {
          value: false,
          label: '不显示'
        }
      ]
    }
  },
  created() {
    // this.pageNum = this.$route.query.pageNum || 1
    if (this.$route.query.pageNum) {
      this.pageNum = this.$route.query.pageNum
    } else {
      this.pageNum = 1
    }
    // 初始化
    this.init()
  },
  methods: {
    init(){
this.getTableList()
    },
    // 获取列表
    // _getList() {
    //   this.loading = true
    //   const { userid, name, nickname, mobile, isShow, pageSize, pageNum } = this
    //   const obj = { userid, name, nickname, mobile, isShow, pageSize, pageNum }
    //   console.log(obj)
    //   getList(obj).then(res => {
    //     console.log(res)
    //     if (res.code === ERR_SUCCESS) {
    //       const data = res.data
    //       this.tableData = data.dataList
    //       this.total = data.total
    //       this.loading = false
    //     }
    //   })
    // },
    // 修改状态API
    // _updatePlfConsultantIsShow(id, isShow) {
    //   updatePlfConsultantIsShow({ id, isShow }).then(res => {
    //     if (res.code === ERR_SUCCESS) {
    //       this.pageNum = 1
    //       this._getList()
    //       Message.success('修改成功')
    //     } else {
    //       Message.error(res.msg)
    //     }
    //   })
    // },
    // 更改状态
    // rowAction(index, table) {
    //   let curIsShow = table[index].isShow
    //   const id = table[index].id
    //   if (curIsShow) {
    //     MessageBox.confirm('请确认是否切换该顾问为【上线中】状态  确定后该顾问及相关资料将在APP展示', '状态切换', {
    //       confirmButtonText: '确定',
    //       cancelButtonText: '取消',
    //       type: 'warning'
    //     }).then(action => {
    //       this._updatePlfConsultantIsShow(id, !curIsShow)
    //     }).catch(erro => {
    //       if (curIsShow) {
    //         curIsShow = false
    //       } else {
    //         curIsShow = true
    //       }
    //     })
    //   } else {
    //     MessageBox.confirm('请确认是否切换该顾问为【已下线】状态  确定后该顾问及相关资料将不在APP展示', '状态切换', {
    //       confirmButtonText: '确定',
    //       cancelButtonText: '取消',
    //       type: 'warning'
    //     }).then(action => {
    //       this._updatePlfConsultantIsShow(id, !curIsShow)
    //     }).catch(erro => {
    //       if (curIsShow) {
    //         curIsShow = false
    //       } else {
    //         curIsShow = true
    //       }
    //     })
    //   }
    // },
    // 点击查询
    getTableList(e) {
      const userInqueryConsult = Object.assign({}, this.queryConsult)
      // eslint-disable-next-line prefer-const
      let { pageNum, pageSize } = this
      console.log(pageNum)
      if (e) {
        pageNum = 1
        const consultantIdReg = /^[1-9]{1}\d*$/g
      // let userid = this.userid
      // const mobile = this.mobile
      if (userInqueryConsult.userid && userInqueryConsult.userid !== '') {
          userInqueryConsult.userid = userInqueryConsult.userid.replace(/\s*/g, '')
          if (!consultantIdReg.test(userInqueryConsult.userid) || userInqueryConsult.userid.length > 9) {
            Message.warning('请输入正确的ID ')
            return false
          }
        }
        if (userInqueryConsult.nickName && userInqueryConsult.nickName !== ''){
          userInqueryConsult.nickName = userInqueryConsult.nickName.replace(/(^\s*)|(\s*$)/g, '')
          if (userInqueryConsult.nickName.length > 30){
            Message.warning('请输入正确的昵称 ')
            return false
          }
        }
        if (userInqueryConsult.name && userInqueryConsult.name !== ''){
          userInqueryConsult.name = userInqueryConsult.name.replace(/(^\s*)|(\s*$)/g, '')
          if (userInqueryConsult.name.length > 10){
            Message.warning('请输入正确的姓名 ')
            return false
          }
        }
        const reg = /^1[3456789]{1}\d{9}$/g
        if (userInqueryConsult.mobile && userInqueryConsult.mobile !== '') {
          userInqueryConsult.mobile = userInqueryConsult.mobile.replace(/(^\s*)|(\s*$)/g, '')
          if (!reg.test(userInqueryConsult.mobile)) {
            Message.warning('请输入正确的手机号 ')
            return false
          }
        }
        this.nowqueryConsult = userInqueryConsult
      }
        this.nowqueryConsult.pageNum = pageNum || 1
        console.log(this.nowqueryConsult.pageNum)
      this.nowqueryConsult.pageSize = pageSize || 10
       this.loading = true
       console.log(this.nowqueryConsult)
       getList(this.nowqueryConsult).then(res => {
         console.log(res)
if (res.code === ERR_SUCCESS) {
          const data = res.data
          this.tableData = data.dataList
          this.total = data.total
          this.pageNum = data.pageNum
          this.pageSize = data.pageSize
          this.loading = false
        }
       })
    },
    // 页面变化
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
    // 查看详情
    details(id) {
      console.log(id, this.pageNum)
      this.$router.push(
        {
          path: 'consultantDetail',
          query: { id: id, pageNum: this.pageNum }}
      )
    },
    // 在APP中显示，switch开关变化时
    showInAppSwitchChange(scope) {
      console.log(scope)
      this.myrow = scope.row
      this.appShowConsultant.nowScope = scope
      this.appShowConsultant.dialogShow = true
      if (scope.row.isShow) {
        this.appShowConsultant.title = '在APP显示健康顾问'
        this.appShowConsultant.content = '请确认是否切换该健康顾问为【开启】状态确定后该健康顾问及相关资料立刻在APP展示'
      } else {
        this.appShowConsultant.title = '在APP不显示健康顾问'
        this.appShowConsultant.content = '请确认是否切换该健康顾问为【关闭】状态确定后该健康顾问及相关资料不在在APP展示'
      }
    },
    // “在APP中显示”模态框取消事件
    showInAppDialogCancel() {
      this.appShowConsultant.dialogShow = false
      this.appShowConsultant.nowScope.row.isShow = !this.appShowConsultant.nowScope.row.isShow
    },
    // 确认在APP中显示or确认不在APP中显示
    showInAppSubmit() {
      console.log(this.myrow)
      const that = this
      const id = that.myrow.id
      const isShow = that.myrow.isShow
      let sort = that.myrow.sort
      updatePlfConsultantIsShow({ id, isShow }).then(res => {
        console.log(res)
        if (res.code === ERR_SUCCESS) {
          Message.success('修改成功')
          if (isShow === false) {
        console.log(11111111)
        if (sort === 1) {
          sort = false
          // 更新置顶
          console.log(sort)
          updatePlacement({ id, sort }).then(res => {
            if (res.code === ERR_SUCCESS) {
              that.appShowConsultant.nowScope.row.sort = 0
            } else {
              Message.error(res.msg)
            }
            that.loading = false
          })
        }
      }
        } else {
          Message.error(res.msg)
        }
      })
      // console.log(id, isShow)
      this.appShowConsultant.dialogShow = false
      // const loading = Loading.service({ fullscreen: true })
      // const that = this
      // var messageContent = ''
      // if (that.appShowConsultant.nowScope.row.isShow){
      //   messageContent = '测试，当前为在APP中显示'
      // } else {
      //   messageContent = '测试，当前为不在APP中显示'
      // }
      // 此处模拟调用接口
      // setTimeout(function(){
      //   Message.success(messageContent)
      //   that.appShowConsultant.dialogShow = false
      //   // loading.close()
      // }, 2000)
    },
    // 在APP中显示，switch开关为禁用状态时，说明原因
    showReasonInAppSwitch(auditState, code) {
      if (!auditState) {
        Message.warning('该健康顾问【人主页资料】并未完善')
      } else if (!code || code === '') {
        Message.warning('该健康顾问【BRM账号】并未完善')
      }
    },
    // 置顶，switch开关变化时
    TOPSwitchChange(scope) {
      const that = this
      console.log(scope.row.sort, scope.row.id)
      const id = scope.row.id
      that.appShowConsultant.nowScope = scope
      // let sort=scope.row.sort
      let sort = false
      if (scope.row.sort === 1) {
        sort = true
      }
      console.log(sort)
      updatePlacement({ id, sort }).then(res => {
        console.log(res)
        if (res.code === ERR_SUCCESS) {
          Message({
            message: '切换成功！',
            type: 'success'
          })
          // this.query()
        } else {
          Message.error(res.msg)
          that.appShowConsultant.nowScope.row.sort = 0
        }
      })
    },
    // 置顶，switch开关为禁用状态时，说明原因
    showReasonTOPSwitch(isTrueTOP, isShow) {
      if (!isShow) {
        Message.warning('请切换【在APP显示健康顾问】为【开启】，才可开启置顶')
        return false
      }
    },
    changeMobile(e){
setTimeout(() => {
        this.queryConsult.mobile = e.replace(/(^\s*)|(\s*$)/g, '')
      }, 20)
    }
  },
  watch: {
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
<style >
.el-table th > .cell {
  font-weight: 600;
}
</style>
<style scoped lang="stylus" rel="stylesheet/stylus">
@import '~common/css/variable';
@import '~common/css/mixin';
@import '~common/css/elementCustom';

.member-page {
  height: 100%;
  overflow-y: auto;
  background: #e4e4e4;

  .title {
    height: 60px;
    line-height: 60px;
    background: #f2f2f2;

    span {
      position: relative;
      margin-left: 8px;
      padding-left: 10px;
      color: #666;
      font-size: 16px;

      &:before {
        position: absolute;
        top: 2px;
        left: -2px;
        content: '';
        width: 2px;
        display: inline-block;
        height: 14px;
        background: #00bafa;
      }
    }
  }

  .member-header {
    position: relative;
  }

  .member-header-query {
    width: 100%;
    margin: 0 auto;
    font-size: 0;
    padding-top: 15px;
    background-color: #fff;
    padding-bottom: 16px;
  }

  .member-header-item {
    padding-left: 1%;
    padding-right: 1%;
    // width 100%
    height: 40px;
    line-height: 40px;
    inline-block-top();

    & > .label {
      float: left;
      width: 80px;
      font-size: $font-size-sm;
      inline-block-top();
    }

    & > .member-input-item {
      display: inline-block;
      // margin-left 115px
      font-size: $font-size-sm;
    }
  }

  .member-header-more {
    height: 0px;
    transition: height 400ms;
    overflow: hidden;
  }

  .member-more-button {
    position: absolute;
    top: 5px;
    right: 10px;
    width: 85px;
    height: 40px;

    & >>> .el-icon-arrow-down {
      transition: transform 400ms;
    }

    &.active {
      & >>> .el-icon-arrow-down {
        transform: rotate(180deg);
      }
    }
  }

  .member-button {
    padding-top: 5px;
    width: 100%;
    height: 28px;
    text-align: center;

    button {
      margin-right: 15px;
      width: 120px;
    }
  }

  .member-table {
    // padding 0 10px
  }
}

.member-pagination {
  padding: 21px 0;
  height: 32px;
  line-height: 32px;
  border: 1px solid #ebeef5;
  border-top: none;
  overflow: hidden;

  .member-pagination-select {
    inline-block-top();
  }

  .member-pagination-checkbox {
    width: 34px;
    height: 32px;
    line-height: 32px;
    text-align: center;
    inline-block-top();
  }

  .member-pagination-content {
    float: right;
    margin-right: 20px;
    inline-block-top();
  }
}
</style>
