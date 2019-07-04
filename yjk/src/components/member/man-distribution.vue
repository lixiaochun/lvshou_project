<template>
  <div class="member-page">
    <p class="title"><span>资料分配机制</span></p>
    <div class="member-header">
      <list-table title="会员列表" :border="true" style="box-shadow: none;">
        <slot slot="query">
          <div style="background: #f2f2f2; height: 40px;">
            <span class="el-icon-menu">规则设置</span>
          </div>
          <div class="desc">
               <i class="el-icon-info"></i>
               <p>说明</p>
             <span>解决客户资源分配不均，允许管理人员根据需求对资源进行合理分配</span>
          </div>
          <!-- 第一个框 -->
         <div class="tab">
             <!-- <span class="name" style="color:#4897f9"><i class="icon-tag" style="font-size:25px;"></i>批量转会员资料(将客户资料从A顾问转给B顾问)</span> -->
             <tag-table title="批量转会员资料(将客户资料从A顾问转给B顾问)">
             <div class="content">
                 <el-form :inline="inline">
                    <el-form-item label="原顾问：" required>
                    <el-input v-model="userName" placeholder="请输入顾问账号" size="mini" style="width: 100%"
                    :maxlength="20" clearable></el-input>
                    </el-form-item>
                    <el-form-item label="会员等级：" class="level" style="width:740px">
                    <el-select v-model="levelName"  size="mini"  style="width: 20%">
                    <el-option
                      v-for="item in levelShortnames"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value">
                    </el-option>
                    </el-select>
                     <el-select v-model="dateType"  size="mini"  style="width: 25%">
                    <el-option
                      v-for="item in dateChoose"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value">
                    </el-option>
                      </el-select>
                      <el-date-picker
                        v-model="timeData"
                        type="daterange"
                        size="mini"
                        range-separator="至"
                        :start-placeholder="startDate"
                        :end-placeholder="endDate"
                        style="width:43%"
                        v-if="dateType && dateType !== '0'"
                        :picker-options="pickerOptions"
                        :clearable = 'false'
                      >
                      </el-date-picker>
                       <el-button type="primary" @click="onSearch" size="mini">查询</el-button>
                    </el-form-item>
                    </el-form>
                    <span>主人；满足条件共查询<span style="color:red">{{num}} </span>位会员</span>
                    <el-form :inline="inline">
                       <el-form-item label="现顾问：" required>
                        <el-input placeholder="请输入顾问账号" size="mini" style="width: 100%" v-model="targetUserName" :maxlength="20"></el-input>
                       </el-form-item>
                       <el-form-item label="分配个数：" required>
                        <el-input  size="mini" style="width: 75%" v-model="distributionNumber">
                          <template slot="append">位会员</template>
                        </el-input>
                         <el-button type="primary" @click="onSubmit" size="mini">确定</el-button>
                       </el-form-item>
                    </el-form>
             </div>
             </tag-table>
         </div>
         <!-- 第二个框 -->
         <div class="tab">
              <!-- <span class="name" style="color:#4897f9"><i class="icon-tag" style="font-size:25px;"></i>指定客户资料得转移</span> -->
              <tag-table title="指定客户资料转移">
             <div class="content">
                 <el-form :inline="inline">
                    <el-form-item>
                      <el-input placeholder="请输入查询内容" v-model="searchKey"  size="mini">
                      <el-select v-model="searchType" slot="prepend" placeholder="请选择" size="mini" style="width:120px">
                      <el-option
                      v-for="item in searchTypes"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value">
                    </el-option>
                    </el-select>
                  </el-input>
                    </el-form-item>
                     <el-form-item >
                     <el-button type="primary" @click="check" size="mini">查询</el-button>
                    </el-form-item>
                    </el-form>
                     <el-form :inline="inline" v-show="show">
                      <div>客户姓名：{{name}}</div>
                      <span>资料所属人：{{owner}}({{lineMark === '1' ? '一线':lineMark === '2' ? '二线':'未分配' }})</span>
                    </el-form>
                    <el-form  v-show="showNo">
                      <span style="color:red">查询不到匹配的信息</span>
                    </el-form>
                    <el-form :inline="inline">
                       <el-form-item label="现顾问：" required>
                        <el-input placeholder="请输入顾问账号" size="mini" style="width: 70%" v-model="targetUserName2" :maxlength="20"></el-input>
                          <el-button type="primary" @click="Submit" size="mini">确定</el-button>
                       </el-form-item>
                    </el-form>
             </div>
              </tag-table>
         </div>
        </slot>
      </list-table>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
import listTable from 'base/list-table/list-table'
import { getOneLineConsUserNumber, setManualBatchDistributionUser, getMemberInfo, setConsByMemberInfo } from 'api/user'
import { ERR_SUCCESS } from 'api/config'
import tagTable from 'base/tag-table/tag-table'
import { format, isNull } from 'common/js/util'
import { isNumber } from 'common/js/verify'
import { Button, Form, Input, DatePicker, Message, MessageBox, FormItem, Select, Option } from 'element-ui'
const _levelShortnames = [{
  value: '',
  label: '全部'
}, {
  value: 'VIP1',
  label: 'VIP1'
}, {
  value: 'VIP2',
  label: 'VIP2'
}, {
  value: 'VIP3',
  label: 'VIP3'
}, {
  value: 'VIP4',
  label: 'VIP4'
}, {
  value: 'VIP5',
  label: 'VIP5'
}]
const _dateChoose = [{
  value: '0',
  label: '不限日期'
}, {
  value: '1',
  label: '注册日期'
}, {
  value: '2',
  label: '最近跟进日期'
}, {
  value: '3',
  label: '分配日期'
}]
export default {
  data() {
    return {
      levelShortnames: _levelShortnames,
      dateChoose: _dateChoose,
      timeData: [],
      searchTypes: [{
        value: '1',
        label: '会员账号'
      }, {
        value: '2',
        label: '手机号码'
      }],
      pickerOptions: {
        disabledDate(time) {
          return time.getTime() > Date.now() - 8.64e6
        }
      },
      inline: true,
      dateType: '0',
      searchType: '',
      num: 0,
      startDate: '',
      endDate: '',
      userName: '',
      levelName: '',
      distributionNumber: '',
      targetUserName: '',
      list: {},
      searchKey: '',
      searchList: {},
      targetUserName2: '',
      name: '',
      owner: '',
      show: false,
      showNo: false,
      StartDate: '',
      EndDate: '',
      lineMark: ''
    }
  },
  created() {
  },
  computed: {
  },
  methods: {
    _getOneLineConsUserNumber() {
      const { levelName, dateType } = this
      const userName = this.trim(this.userName)
      if (this.timeData && this.timeData.length > 0) {
        this.startDate = format(this.timeData[0], '$1-$2-$3')
        this.endDate = format(this.timeData[1], '$1-$2-$3')
        this.StartDate = this.startDate + ' 00:00:00'
        this.EndDate = this.endDate + ' 23:59:59'
        const { StartDate, EndDate } = this
        this.list = { userName, levelName, dateType, startDate: StartDate, endDate: EndDate }
        if (dateType === '0') {
          this.startDate = ''
          this.endDate = ''
          this.StartDate = this.startDate
          this.EndDate = this.endDate
          const { StartDate, EndDate } = this
          this.list = { userName, levelName, dateType, startDate: StartDate, endDate: EndDate }
        }
      } else {
        this.startDate = ''
        this.endData = ''
        this.StartDate = this.startDate
        this.EndDate = this.endDate
        const { StartDate, EndDate } = this
        this.list = { userName, levelName, dateType, startDate: StartDate, endDate: EndDate }
      }
      if (isNull(userName)) {
        return Message.error('请输入顾问账号')
      }
      getOneLineConsUserNumber(this.list).then(res => {
        if (res.code === ERR_SUCCESS) {
          // console.log(res)
          this.num = res.data
        } else {
          Message.error(res.msg)
        }
      })
    },
    trim(e) {
      return e.replace(/^\s+|\s+$/g, '')
    },
    _setManualBatchDistributionUser() {
      const { list, distributionNumber, StartDate, EndDate } = this
      const { userName, levelName, dateType } = list
      const targetUserName = this.trim(this.targetUserName)
      const objList = { userName, levelName, dateType, startDate: StartDate, endDate: EndDate, distributionNumber, targetUserName }
      if (isNull(userName)) {
        return Message.error('请输入原顾问账号')
      }
      if (isNull(targetUserName)) {
        return Message.error('请输入现顾问账号')
      }
      if (userName === targetUserName) {
        return Message.error('原顾问账号与现顾问账号不能相同')
      }
      if (isNull(distributionNumber)) {
        return Message.error('请输入分配个数')
      }
      if (!isNumber(distributionNumber)) {
        return Message.error('请输入正确分配数')
      }
      if (Number(distributionNumber) > this.num) {
        return Message.error('分配数大于查询数，请重新输入分配数')
      }
      MessageBox.confirm('是否确认此操作?', '系统提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(action => {
        setManualBatchDistributionUser(objList).then(res => {
          if (res.code === ERR_SUCCESS && res.data) {
            Message.success('分配成功')
            getOneLineConsUserNumber(list).then(res => {
              if (res.code === ERR_SUCCESS) {
                this.num = res.data
              }
            })
          } else {
            Message.error(res.msg)
          }
        })
      }).catch(erro => {})
    },
    _getMemberInfo() {
      const { searchType } = this
      const searchKey = this.trim(this.searchKey)
      this.searchList = { searchType, searchKey }
      getMemberInfo({ searchType, searchKey }).then(res => {
        if (res.code === ERR_SUCCESS) {
          const data = res.data
          this.name = name
          if (data) {
            this.owner = data.owner
            this.name = data.name
            this.lineMark = data.lineMark
            this.show = true
            this.showNo = false
          } else {
            this.show = false
            this.showNo = true
          }
        } else {
          this.show = false
          this.showNo = true
        }
      })
    },
    _setConsByMemberInfo() {
      const { searchList, lineMark } = this
      const targetUserName2 = this.trim(this.targetUserName2)
      const { searchType, searchKey } = searchList
      if (lineMark === '2') {
        Message.error('该顾客为二线顾客，不应分配')
        return
      }
      MessageBox.confirm('是否确认此操作?', '系统提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(action => {
        setConsByMemberInfo({ searchType, searchKey, targetUserName: targetUserName2 }).then(res => {
          if (res.code === ERR_SUCCESS && res.data) {
            Message.success('分配成功')
          } else {
            Message.error(res.msg)
          }
        })
      }).catch(erro => {})
    },
    onSearch() {
      this._getOneLineConsUserNumber()
    },
    onSubmit() {
      this._setManualBatchDistributionUser()
    },
    check() {
      this._getMemberInfo()
    },
    Submit() {
      this._setConsByMemberInfo()
    }
  },
  components: {
    [Button.name]: Button,
    [Input.name]: Input,
    [Select.name]: Select,
    [Option.name]: Option,
    [DatePicker.name]: DatePicker,
    [Form.name]: Form,
    [Message.name]: Message,
    [MessageBox.name]: MessageBox,
    [FormItem.name]: FormItem,
    tagTable,
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
    .desc
      padding 30px
      box-sizing content-box
      border-bottom 1px solid #dedede
      p
       font-size 14px
       display inline-block
      span
       display block
       text-indent 28px
      .custom-query-item
        padding: 10px 0 0 70px
  .el-icon-menu
    padding 14px
    font-size 14px
   .tab
     border 1px solid #dedede
     margin 30px
     padding-top 30px
     padding-left 90px
     position relative
    .tag-table >>> .tag-table-header
      margin-top -10px
      margin-left -70px
      color #4897f9
     .name
       position absolute
       top -16px
       left -5px
     .level >>> .el-form-item__content
        width 648px
</style>
