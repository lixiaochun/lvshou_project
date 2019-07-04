<template>
  <div>
    <div class="member-page">
      <p class="title"><span>健康顾问资料审核列表</span></p>
      <div class="member-header">
        <list-table title="资料审核"
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
                            v-model="queryConsult.mcid"
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
                      style="width: 80px;">状态：</span>
                <el-select v-model="queryConsult.state"
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
                               prop="mcid"
                               align="center"></el-table-column>
              <el-table-column label="BRM账号"
                               width=""
                               prop=""
                               align="center">
                <template slot-scope="scope">
                  {{tableData[scope.$index].code||'—'}}
                </template>
              </el-table-column>
              <el-table-column label="昵称"
                               width=""
                               prop="nickname"
                               align="center">
                <template slot-scope="scope">
                  {{tableData[scope.$index].nickname||'—'}}
                </template>
              </el-table-column>
              <el-table-column label="姓名"
                               width=""
                               prop=""
                               align="center">
                <template slot-scope="scope">
                  {{tableData[scope.$index].name||'—'}}
                </template>
              </el-table-column>
              <el-table-column label="手机号码"
                               width=""
                               prop="mobile"
                               align="center">
                <template slot-scope="scope">
                  {{tableData[scope.$index].mobile||'—'}}
                </template>
              </el-table-column>
              <el-table-column label="提审时间"
                               width=""
                               prop="updateTime"
                               align="center"></el-table-column>
              <el-table-column label="个人主页资料"
                               width=""
                               prop=""
                               align="center">
                <template slot-scope="scope">
                  {{scope.row.auditState ? '完善': '未完善'}}
                </template>
              </el-table-column>
              <el-table-column label="状态"
                               width="200"
                               prop=""
                               align="center">
                <template slot-scope="scope">
                  <p :class="tableData[scope.$index].state ===0?'red':''">{{tableData[scope.$index].state ===1 ? '通过':tableData[scope.$index].state===-1?'不通过':'未审核'}}</p>
                </template>
              </el-table-column>
              <el-table-column label="更新提示"
                               width="200"
                               prop=""
                               align="center">
                <template slot-scope="scope">
                  <div :class="tableData[scope.$index].state ===0?'red':''">{{tableData[scope.$index].state ===1 ? '资料已更新':tableData[scope.$index].state===-1?'—':'资料有更新'}}</div>
                </template>
              </el-table-column>
              <el-table-column label="操作"
                               width="200"
                               prop=""
                               align="center">
                <template slot-scope="scope">
                  <el-button type="text"
                             size="small"
                             @click="showDialog(scope.$index, tableData,scope.row)">
                    详情
                  </el-button>
                </template>
              </el-table-column>
            </el-table>
            <div class="member-pagination">
              <div class="member-pagination-content">
                <!-- 分页 -->
                <el-pagination :page-sizes="[10, 20, 50, 100]"
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
    </div>
    <!-- 审核弹窗 -->
    <el-dialog title="审核资料详情"
               :visible.sync="dialogVisible">
      <div class="content-manage-item">
        <div class="content-top">
          <el-row class="order-info">
            <el-col :span="4"
                    class="blod">用户ID:</el-col>
            <el-col :span="20">{{info.mcid||'—'}}</el-col>
          </el-row>
          <el-row class="order-info">
            <el-col :span="4"
                    class="blod">用户账号:</el-col>
            <el-col :span="20"> {{info.mobile||'—'}}</el-col>
          </el-row>
          <el-row class="order-info">
            <el-col :span="4"
                    class="blod">BRM账号:</el-col>
            <el-col :span="20"> {{info.code||'—'}}</el-col>
          </el-row>
          <el-row class="order-info">
            <el-col :span="4"
                    class="blod">姓名:</el-col>
            <el-col :span="20">{{info.name||'—'}}</el-col>
          </el-row>
          <el-row class="order-info">
            <el-col :span="4"
                    class="blod">手机号码:</el-col>
            <el-col :span="20"> {{info.mobile||'—'}}</el-col>
          </el-row>
        </div>
        <el-form label-width="100px"
                 :data="tabData"
                 class="audit">
          <div class="mytitle">审核资料</div>
          <el-form-item label="头像:">
            <img :src="tabData.portraitUrl"
                 style="width:80px;height: 80px;">
          </el-form-item>
          <el-form-item label="主页背景:">
            <!-- <img :src="tabData.bgiUrl"
                 style="width:200px"> -->
                 <div   v-if="imgList&&imgList.length>0">
            <!-- <img :src="info.bgiUrl" alt="" style="width :250px;height :250px;"> -->
            <img  alt="" v-for="(myimg,index) in imgList" :key="index" :src="myimg" style="width :200px;height :200px;border: 5px solid #ccc;">
          </div>
          <div v-else style="text-indent: 30px;">-</div>
          </el-form-item>
          <el-form-item label="昵称:">
            {{tabData.nickname||'—'}}
          </el-form-item>
          <el-form-item label="性别:"
                        prop="age">
            {{tabData.sex===1? '女': tabData.sex===2 ? '男':'未知'}}
          </el-form-item>
          <el-form-item label="年龄:">
            {{tabData.age}}
          </el-form-item>
          <el-form-item label="城市:">
            {{tabData.city||'—'}}
          </el-form-item>
          <el-form-item label="从业年限:">
            {{tabData.workingYears||'—'}}
          </el-form-item>
          <el-form-item label="签名:">
            {{tabData.signature||'—'}}
          </el-form-item>
          <el-form-item label="标签展示:" >
            <ul v-if="tagList&&tagList.length>0">
              <li v-for="(tag, index) in tagList"
                  :key="index">
                {{tag}}
              </li>
            </ul>
            <div v-else style="text-indent: 30px;">—</div>
          </el-form-item>
          <el-form-item label="个人简介:">
            <el-input type="textarea"
                      v-model="tabData.information"
                      disabled
                      :rows="7"
                      style="width:80%;color:#333"></el-input>
          </el-form-item>
          <el-form-item style="text-align:center"
                        v-if="!tabData.state">
            <el-button size="small"
                       @click="submit(tabData, false)">不通过</el-button>
            <el-button type="primary"
                       size="small"
                       @click="submit(tabData, true)">通过</el-button>
          </el-form-item>
        </el-form>
      </div>
    </el-dialog>
    <el-dialog title="不通过理由"
               :visible.sync="innerDialog">
      <el-input type="textarea"
                v-model="content"
                :placeholder="placeholder"
                :rows="10"></el-input>
      <div style="text-align: center;margin-top:10px;">
        <el-button size="small"
                   type="primary"
                   @click="submitReason(tabData, true)">确定</el-button>
        <el-button size="small"
                   @click="cancel()">取消</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script type="text/ecmascript-6">
import {
  Input, Button, DatePicker, Table, TableColumn, Switch, Message,
  Pagination, Checkbox, Select, Option, Dialog, Form, FormItem, MessageBox, Row,
  Col
} from 'element-ui'
import listTable from 'base/list-table/list-table'
import cDialog from 'base/c-dialog/c-dialog'
import { ERR_SUCCESS } from 'api/config'
import { getPlfConsultAuditHisList, getPlfConsultAuditHisById, updatePlfConsultAuditHis } from 'api/consultant'

const placeholder = `请填写审核资料不通过的理由，将以通知消息的形式告知顾问，参考案例如下：
1. 上传头像不符合规范
2 .个人主页背景图片模糊
3.顾问昵称填写太长
4.头像和性别不一致
......`
export default {
  data() {
    return {
      queryConsult: {
         mcid: '', // 用户ID
         name: '', // 顾问姓名
         state: '',
         nickname: '',
         mobile: '' // 手机
      },
      nowqueryConsult: {
        mcid: null,
         name: null,
         state: '',
         nickname: null,
         mobile: null
      },
      code: '', // BRM编号
      pageSize: 10, // 每页显示多少条数据
      pageNum: 1, // 当前页码
      total: 0, // 数据总条数
      tableData: [], // table的数据数组
      loading: false, // 是否加载中
      show: false,
      tabData: [], // 审核资料的数据
      info: {}, // 审核资料新增的信息
      dialogVisible: false, // 控制审核弹窗的显示
      innerDialog: false, // 控制不通过弹窗的显示
      tagList: [], // 标签展示数组
      imgList: [], // 图片数组
      content: '', // 不通过审核的理由
      placeholder: placeholder, // 不通过理由的参考
      time: new Date().getTime(),
      options: [
        {
          value: '',
          label: '全部'
        },
        {
          value: '0',
          label: '未审核'
        },
        {
          value: '1',
          label: '通过'
        },
        {
          value: '-1',
          label: '不通过'
        }
      ]
    }
  },
  created() {
    // 初始化
    this.init()
  },
  methods: {
    init(){
this.getTableList()
    },
    // 获取列表
    // _getList(e) {
    //   this.loading = true
    //   const { code, name, nickname, mobile, pageSize, pageNum, mcid, state } = this
    //   const obj = { code, name, nickname, mobile, pageSize, pageNum, mcid, state }
    //   // console.log(this,obj)
    //   getPlfConsultAuditHisList(obj).then(res => {
    //     console.log(res)
    //     if (res.code === ERR_SUCCESS) {
    //       const data = res.data
    //       this.tableData = data.dataList
    //       console.log(this.tableData)
    //       this.total = data.total
    //       this.loading = false
    //     }
    //   })
    // },
    // 点击查询
    getTableList(e) {
      const userInqueryConsult = Object.assign({}, this.queryConsult)
      // eslint-disable-next-line prefer-const
      let { pageNum, pageSize } = this
      if (e) {
        pageNum = 1
        const consultantIdReg = /^[1-9]{1}\d*$/g
      if (userInqueryConsult.mcid && userInqueryConsult.mcid !== '') {
          userInqueryConsult.mcid = userInqueryConsult.mcid.replace(/\s*/g, '')
          if (!consultantIdReg.test(userInqueryConsult.mcid) || userInqueryConsult.mcid.length > 9) {
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
      this.nowqueryConsult.pageSize = pageSize || 10
       this.loading = true
       getPlfConsultAuditHisList(this.nowqueryConsult).then(res => {
        console.log(res)
        if (res.code === ERR_SUCCESS) {
          const data = res.data
          this.tableData = data.dataList
          console.log(this.tableData)
          this.total = data.total
          this.loading = false
        }
      })
      // this.pageNum = 1
      // this._getList()
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
    // 资料详情查询
    showDialog(index, table, row) {
      // console.log(index,table)
      console.log(row)
      this.info = row
      this.dialogVisible = true
      const id = table[index].id
      getPlfConsultAuditHisById({ id }).then(res => {
        console.log(res)
        if (res.code === ERR_SUCCESS) {
          this.tabData = res.data
          // this.tagList = res.data.tags.split(',')
          if (!res.data.tags) {
            this.tagList = []
          } else {
            this.tagList = res.data.tags.split(',')
          }
          // this.imgList = res.data.slideshow.split(',')
          if (!res.data.slideshow) {
            this.imgList = []
          } else {
            this.imgList = res.data.slideshow.split(',')
          }
          console.log(this.imgList)
        } else {
          Message.error(res.msg)
        }
      })
    },
    // 提交审核
    // _updatePlfConsultAuditHis (id, consultid, content) {
    //   updatePlfConsultAuditHis({id, consultid, state, content}).then(res => {
    //     if (res.code === ERR_SUCCESS) {
    //       Message.success('更新成功')
    //     } else {
    //       Message.error(res.msg)
    //     }
    //   })
    // },
    // 关闭dialog
    submit(data, state) {
      const { id, mcid } = data
      const { content } = this
      if (state) {
        MessageBox.confirm('点击确认后个人资料审核通过  并更新到APP个人主页资料', '资料更新', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(action => {
          updatePlfConsultAuditHis({ id, mcid, state, content }).then(res => {
            if (res.code === ERR_SUCCESS) {
              Message.success('资料更新成功')
              this.init()
            } else {
              Message.error(res.msg)
            }
          })
          this.dialogVisible = false
        }).catch(erro => {
        })
      } else {
        this.dialogVisible = false
        this.innerDialog = true
      }
    },
    // 不通过审核确定事件
    submitReason(tabData, e) {
      console.log(tabData, e)
      if (e) {
        // console.log(tabData)
        const { id, mcid } = tabData
        const { content } = this
        console.log(content)
        if (!content) {
          return Message.error('请填写不通过理由')
        } else if (content.length > 500) {
          return Message.error('不通过理由长度不能超过500字')
        }
        updatePlfConsultAuditHis({ id, mcid, state: false, content }).then(res => {
          if (res.code === ERR_SUCCESS) {
            Message.success('提交成功')
            this.init()
          } else {
            Message.error(res.msg)
            this.innerDialog = false
          }
        })
      }
      this.innerDialog = false
      this.content = ''
    },
    // 不通过审核取消事件
    cancel() {
      this.innerDialog = false
      this.content = ''
    },
    // 确保搜索ID只能输入数字
    // changeAmount(e) {
    //   setTimeout(() => {
    //     this.mcid = e.replace(/[^0-9]/g, '')
    //   }, 20)
    // },
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
    [Form.name]: Form,
    [FormItem.name]: FormItem,
    [MessageBox.name]: MessageBox,
    [DatePicker.name]: DatePicker,
    [Table.name]: Table,
    [TableColumn.name]: TableColumn,
    [Pagination.name]: Pagination,
    [Checkbox.name]: Checkbox,
    [Row.name]: Row,
    [Col.name]: Col,
    listTable,
    cDialog

  }
}
</script>

<style>
.audit .el-form-item__label {
  text-align: left;
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
    background: #ffffff;
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

.content-manage-item {
  height: 600px;
  overflow-y: scroll;

  span {
    font-size: 10px;
    color: #ccc;
  }

  li {
    display: inline-block;
    border: 1px solid #e2d9d9;
    // width: 73px;
    height: 36px;
    margin-left: 5px;
    text-align: center;
    border-radius: 7px;
  }
  li:nth-child(1){
    margin-left: 0;
  }
}

.order-info {
  line-height: 3;

  .blod {
    font-weight: bold;
  }
}

.content-top {
  margin-bottom: 25px;
  padding-bottom: 20px;
  border-bottom: 1px solid black;
}

.mytitle {
  font-weight: bold;
  font-size: 22px;
  margin-bottom: 30px;
}

.red {
  color: red;
}

.el-form-item {
  margin-bottom: 0;
}
</style>
