<template>
  <div class="video-list">
      <p class="title"><span>红包活动列表</span></p>
     <div class="video-header">
       <list-table title="红包活动列表" :border="true" style="box-shadow:none">
         <slot slot="query">
           <div style="background:#f2f2f2;height:40px">
               <div class="el-icon-search" style="margin:10px;font-size:18px"><span style="font-size:12px;padding:5px">筛选查询</span></div>
           </div>
           <div class="video-header-query" style="padding:10px;">
               <div class="firstRow" style="display: inline-flex;">
                <div class="video-header-item">
                  <span class="label">标题:</span>
                  <div class="video-input-item">
                     <el-input v-model.trim="name" clearable placeholder="请输入活动标题" size="mini"></el-input>
                  </div>
              </div>
              <div class="video-header-item">
                  <span class="label">编号:</span>
                  <div class="video-input-item">
                     <el-input v-model.trim="id" clearable placeholder="请输入活动ID" size="mini" ></el-input>
                  </div>
              </div>
               <div class="video-header-item">
                   <div class="video-input-item">
                    <el-select
                    v-model="status"
                    size='mini'
                    clearable>
                    <el-option
                      v-for="item in activityOptions"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value">
                    </el-option>
                  </el-select>
                   </div>
               </div>
                <div class="video-header-item">
                   <div class="video-input-item">
                   <el-select
                    v-model="isOnline"
                    ref="topic"
                    size='mini'>
                    <el-option
                      v-for="item in onlineOptions"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value">
                      </el-option>
                    </el-select>
                   </div>
                   </div>
                <div class="video-header-item">
                 <el-button size="mini" @click="_queryData" type="primary" style="margin-top:4px;">查询</el-button>
              </div>
               </div>
              </div>
         </slot>
         <div class="addList" style="float: right;margin-right: 10px;margin-bottom:15px;">
           <el-button
                  @click.native.prevent="addList()"
                  type="primary"
                  size="mini">
                  <span>新增红包活动</span>
                </el-button>
         </div>
         <div class="video-table">
              <el-table style="width: 100%;"
                    :data="tableData"
                    ref="multipleTable"
                    border
                    stripe
                    size="mini"
                    v-loading="loading"
                    header-row-class-name="element-headerRowClassName">
            <el-table-column label="红包活动ID" width="80" prop="id" align="center"></el-table-column>
            <el-table-column label="红包活动名称" align="center" width="">
             <template slot-scope="scope">
             <div>{{tableData[scope.$index].name}}</div>
             </template>
            </el-table-column>
            <el-table-column label="总金额" width="100" prop="amount" align="center"  ></el-table-column>
            <el-table-column label="面值与概率" width="120" align="center">
            <template slot-scope="scope">
             <div v-for="(item, index) in JSON.parse(tableData[scope.$index].probability)" :key="index">
                ¥{{item.denomination}}  ({{item.percentage}}%）
             </div>
             </template>
            </el-table-column>
           <el-table-column label="已发放个数（个）" width="80" prop="outNum" align="center"></el-table-column>
           <el-table-column label="已发放金额（元）" width="150" prop="" align="center">
             <template slot-scope="scope">
               {{tableData[scope.$index].outRedPack}}
                <div style="font-size:10px;color:red;" v-if="tableData[scope.$index].balanceTitle">{{tableData[scope.$index].balanceTitle}}</div>
                </template>
           </el-table-column>
           <el-table-column label="单用户最大领取次数（次）" width="80" prop="playNum" align="center" clearable></el-table-column>
                  <el-table-column label="活动状态" width="100" prop="" align="center">
                  <template slot-scope="scope">
                  {{getStatus(scope.$index, tableData)}}
                </template>
                  </el-table-column>
            <el-table-column label="在线状态" width="100" prop="" align="center">
              <template slot-scope="scope">
                <el-button type="text" size="small" @click="rowAction(scope.$index, tableData)">
                  {{getLine(scope.$index, tableData)}}
                </el-button>
                </template>
            </el-table-column>
            <el-table-column label="开始/结束时间"  width="200" align="center">
               <template slot-scope="scope">
                  <div>{{tableData[scope.$index].startTime}}</div>
                   <div>{{tableData[scope.$index].endTime}}</div>
                </template>
            </el-table-column>
            <el-table-column label="更新时间"  width="200" align="center">
               <template slot-scope="scope">
                 {{tableData[scope.$index].updateTime}}
                </template>
            </el-table-column>
            <el-table-column label="操作" width="100" prop="" align="center">
              <template slot-scope="scope">
                <el-button
                  @click.native.prevent="editList(scope.$index, tableData)"
                  class="custom-columnButton"
                  type="text"
                  size="small">
                  <span>编辑</span>
                </el-button>
                <el-button
                  @click.native.prevent="getDetail(scope.$index, tableData)"
                  class="custom-columnButton"
                  type="text"
                  size="small">
                  <span>详情</span>
                </el-button>
              </template>
            </el-table-column>
        </el-table>
         <div class="video-pagination">
             <div  class="video-pagination-content">
              <el-pagination
                :page-sizes="[10, 20, 50, 100]"
                :page-size="pageSize"
                :current-page="pageNum"
                layout="total, sizes, prev, pager, next, jumper"
                 @size-change="handleSizeChange"
                 @current-change="handleCurrentChange"
                :total="total">
              </el-pagination>
             </div>
             </div>
         </div>
       </list-table>
      <el-dialog  :visible.sync="dialogFormVisible" width="920px" :title="title">
       <!-- 添加组件 -->
       <div v-if="detail">
          <detail :activityid="activityid"></detail>
        </div>
       <div v-else>
       <el-form ref="form" :model="form" label-width="150px">
            <el-form-item label="红包活动名称:" style="width:80%">
              <el-input v-model="form.name" size="mini" placeholder="输入红包活名称，不超过20个字" maxlength="20"></el-input>
              <span class="msg" style="top:0px;right:-50px;">(<em>*</em>必填)</span>
            </el-form-item>
            <el-form-item label="红包总金额:" style="width:80%;">
              <el-input size="mini" v-model="form.amount" placeholder="输入红包活动总金额" :disabled="show" type="number" step="0.01" min="0.01"></el-input>
              <span class="msg" style="top:5px;right:-50px;">(<em>*</em>必填)</span>
              <el-button v-if="changeDisable" type="primary" size="mini" @click="_changeAmount" style="position:absolute;top:8px;right:-110px">修改</el-button>
            </el-form-item>
            <el-form-item label="面值与中奖概率:" style="width:80%;">
                <el-form-item
                :label="'面值' + (index+1)"
                v-for="(item, index) in form.redPacketPrize"
                :key="index"
                label-width="60px" >
                   <el-input
                   v-model="item.denomination"
                   size="mini"
                   type="number"
                   step="0.01"
                   min="0.01"
                   placeholder="输入红包面值"
                   style="width: 30%"></el-input>元
                    <el-input
                    v-model="item.percentage"
                    size="mini"
                    placeholder="输入红包面值"
                    style="width:30%"></el-input>%
                    <el-button type="text" @click.prevent="removeDomain(item)" v-show="form.redPacketPrize.length>1">删除</el-button>
                    <span class="msg" style="top:5px;">(<em>*</em>必填)</span>
                </el-form-item>
            </el-form-item>
           <el-form-item>
             <el-button
             @click="goAdd"
             v-if="form.redPacketPrize.length < 10"
             size="small"
             type="text">继续添加</el-button>
             <!-- <span style="color:red;font-size:12px">当前中奖概率总和不为100%</span> -->
             <span style="padding-left:20px;font-size:12px">(概率总和必须为100% 最多可添加10个)</span>
           </el-form-item>
           <el-form-item label="活动时间:">
              <el-date-picker
                style="width:46%"
                v-model="form.timeData"
                size="mini"
                type="datetimerange"
                range-separator="至"
                start-placeholder="选择活动开始时间"
                end-placeholder="选择活动结束时间">
              </el-date-picker>
              <span class="msg" style="top:5px;right:352px;">(<em>*</em>必填)</span>
            </el-form-item>
             <el-form-item label="单用户最大领取次数:">
             <el-input v-model="form.playNum" size="mini" style="width:35%"></el-input>次
              <span class="msg" style="top:5px;right:352px;">(<em>*</em>必填)</span>
            </el-form-item>
            <el-form-item>
              <span style="font-size:12px;">
                * 单次活动内，单个用户可领取红包的总次数；如活动周期30天，用户每天可领1次，输入30。
              </span>
            </el-form-item>
            <hr/>
            <el-form-item>
            </el-form-item>
            <div style="font-size:18px;font-weight: bold;width:80%;padding-bottom:5px;">红包样式定义</div>
            <el-form-item label="加载页面:">
              <div class="upload-item" v-if="form.picUrl">
                        <img :src="form.picUrl" style="width: 180px; height: 300px">
                        <span class="upload-item-close icon-close" @click="handleDelete(form.picUrl)" ></span>
                </div>
                <div v-else>
                  <!-- <img src="../../static/startRedPacket.png" style="width: 180px; height: 300px"> -->
                  <el-button size="mini" type="primary">重新选择图片</el-button>
                <input type="file" class="list-upload" @change="handleUploadBanner">
                </div>
              <span class="msg" style="top:3px;left:300px;">(<em>*</em>必填，图片像素1029x345)</span>
            </el-form-item>
            <el-form-item label="(领包前)预设文案可修改" label-width="163px">
            </el-form-item>
            <div style="position:absolute; right:100px">
              <img src="../../static/redPacket.png" style="width: 170px; height: 230">
            <span class="content" style="top:20%;">{{form.preTitle}}</span>
            <span class="content" style="top:30%;font-size:12px;">{{form.preContent}}</span>
            <span class="content" style="top:40%;font-size:6px;">{{form.preNotes}}</span>
            </div>
            <el-form-item label="文案1:">
                  <el-input v-model="form.preTitle" maxlength="8" size="mini" style="width:30%" clearable></el-input>
                  <span class="msg" style="top:5px;">(<em>*</em>必填)</span>
                  <div style="font-size:12px">
                    最大输入8个字
                  </div>
              </el-form-item>
                <el-form-item label="文案2:">
                  <el-input v-model="form.preContent" maxlength="14" size="mini" style="width:30%" clearable></el-input>
                  <span class="msg" style="top:5px;">(<em>*</em>必填)</span>
                  <div style="font-size:12px">
                    最大输入14个字
                  </div>
                </el-form-item>
                <el-form-item label="文案3">
                  <el-input v-model="form.preNotes" maxlength="15" size="mini" style="width:30%" clearable></el-input>
                  <span class="msg" style="top:5px;">(<em>*</em>必填)</span>
                  <div style="font-size:12px">
                    最大输入15个字
                  </div>
                </el-form-item>
            <el-form-item label="(领包后)预设文案可修改" label-width="165px">
            </el-form-item>
            <div style="position:absolute; right:100px">
              <img src="../../static/openRedPacket.png" style="width: 170px; height: 230px">
              <span class="content" style="top:12%;color:#cf9236">{{form.sufTitle}}</span>
            <span class="content" style="top:32%;font-size:12px;color:#cf9236">{{form.sufContent}}</span>
            <span class="content" style="top:40%;font-size:6px;color:#cf9236">{{form.sufNotes}}</span>
            </div>
                <el-form-item label="文案1">
                  <el-input v-model="form.sufTitle" maxlength="8" size="mini" style="width:30%" clearable></el-input>
                  <span class="msg" style="top:5px;">(<em>*</em>必填)</span>
                  <div style="font-size:12px">
                    最大输入8个字
                  </div>
                </el-form-item>
                <el-form-item label="文案2">
                  <el-input v-model="form.sufContent" maxlength="10" size="mini" style="width:30%" clearable></el-input>
                  <span class="msg" style="top:5px;">(<em>*</em>必填)</span>
                  <div style="font-size:12px">
                    最大输入10个字
                  </div>
                </el-form-item>
                <el-form-item label="文案3">
                  <el-input v-model="form.sufNotes" maxlength="12" size="mini" style="width:30%" clearable></el-input>
                  <span class="msg" style="top:5px;">(<em>*</em>必填)</span>
                  <div style="font-size:12px">
                    最大输入12个字
                  </div>
                </el-form-item>
       </el-form>
        <div slot="footer" class="dialog-footer" style="text-align:center;">
          <el-button @click="cancle">取 消</el-button>
          <el-button type="primary" @click="handleSave">保存</el-button>
        </div>
        </div>
      </el-dialog>
    </div>
     </div>
</template>

<script type="text/ecmascript-6">
import {
  Input, Button, DatePicker, Table, TableColumn, Switch, MessageBox, RadioGroup,
  Pagination, Select, Option, Cascader, Dialog, Message, Radio, FormItem, Form
} from 'element-ui'
import listTable from 'base/list-table/list-table'
import Detail from '../market/detail.vue'
import { uploadPic } from 'api/upload'
import { ERR_SUCCESS } from 'api/config'
import { isNumber } from 'common/js/verify'
import { getRedPacketActivityList, redHasOnline, updateRedPacketActivitySate, addRedPacketActivity, getRedPacketActivityDetail, editRedPacketActivity } from 'api/market'
import { format, isNull } from 'common/js/util'

const _onlineOptions = [{
  value: '',
  label: '上线状态'
}, {
  value: 'true',
  label: '上线中'
}, {
  value: 'false',
  label: '已下线'
}]
const _activityOptions = [{
  value: '',
  label: '活动状态'
}, {
  value: '0',
  label: '未开始'
}, {
  value: '1',
  label: '进行中'
}, {
  value: '2',
  label: '已结束'
}]
export default {
  data() {
    return {
      activityOptions: _activityOptions,
      onlineOptions: _onlineOptions,
      id: '',
      status: '',
      isOnline: '',
      outRedPack: '',
      name: '',
      pageNum: 1,
      pageSize: 10,
      total: 0,
      loading: false,
      tableData: [],
      show: false,
      activityid: '',
      changeDisable: false,
      dialogFormVisible: false,
      title: '',
      oldValue: '',
      detail: false,
      form: {
        name: '',
        amount: '',
        picUrl: '',
        preTitle: '',
        preContent: '',
        preNotes: '',
        sufTitle: '',
        sufContent: '',
        sufNotes: '',
        timeData: [],
        playNum: '',
        startTime: '',
        endTime: '',
        redPacketPrize: [{
          denomination: '',
          percentage: ''
        }]
      }
    }
  },
  created() {
    this._getList()
  },
  computed: {
  },
  methods: {
    _queryData() {
      this.pageNum = 1
      this._getList()
    },
    // 编辑触发
    editList(index, table) {
      this.dialogFormVisible = true
      this.detail = false
      this.changeDisable = true
      this.show = true
      this.outRedPack = table[index].outRedPack
      if (table && table.length) {
        const isOnline = table[index].isOnline
        this.title = '编辑红包活动'
        if (isOnline) {
          Message.error('活动上线中，请下线活动再进行编辑')
          this.dialogFormVisible = false
        } else {
          const id = table[index].id
          this.isEdit = true
          this.form.id = id
          getRedPacketActivityDetail({ activityid: id }).then(res => {
            if (res.code === ERR_SUCCESS) {
              const data = res.data
              this.form.name = data.name
              this.form.amount = data.amount
              this.oldValue = data.amount
              this.form.picUrl = data.picUrl
              this.form.preTitle = data.preTitle
              this.form.preContent = data.preContent
              this.form.preNotes = data.preNotes
              this.form.sufTitle = data.sufTitle
              this.form.sufContent = data.sufContent
              this.form.sufNotes = data.sufNotes
              this.form.playNum = data.playNum
              this.form.redPacketPrize = JSON.parse(data.probability)
              this.form.timeData = [data.startTime, data.endTime]
            }
          })
        }
      } else {
        this.isEdit = false
        this.title = '新增红包活动'
      }
    },
    // 添加活动
    addList() {
      this.isEdit = false
      this.detail = false
      this.show = false
      this.dialogFormVisible = true
      this.title = '新增红包活动'
      this.form.name = ''
      this.form.amount = ''
      this.form.picUrl = ''
      this.form.preTitle = '恭喜您'
      this.form.preContent = '获得一个现金红包'
      this.form.preNotes = '打开红包，看看能领多少？'
      this.form.sufTitle = '恭喜您获得现'
      this.form.sufContent = '已存入红包余额'
      this.form.sufNotes = '使用红包，马上支付'
      this.form.playNum = ''
      this.form.redPacketPrize = [{
        denomination: '',
        percentage: ''
      }]
      this.form.timeData = []
    },
    // 获取列表
    _getList(e) {
      const { name, id, status, isOnline, pageNum, pageSize } = this
      this.loading = true
      getRedPacketActivityList({ id, name, pageNum, pageSize, isOnline, status }).then(res => {
        if (res.code === ERR_SUCCESS) {
          const result = res.data
          this.tableData = result.dataList
          this.pageSize = result.pageSize
          this.pageNum = result.pageNum
          this.total = result.total
          this.loading = false
        }
      })
    },
    // 总金额修改提示
    _changeAmount() {
      this.show = false
      Message('你正对【红包总金额】进行修改！')
    },
    // 修改之后提示
    changeAmount() {
      if (this.oldValue) {
        MessageBox.confirm(`你已将${this.form.name}总金额：${this.oldValue}，修改为：${this.form.amount}, 是否确认修改！`, '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(actions => {
          this.show = true
          if (parseFloat(this.form.amount) < parseFloat(this.oldValue)) {
            MessageBox.confirm(`${this.form.name}的已经发放金额：${this.outRedPack}，大于你修改的红包总金额：${this.form.amount}, 请返回修改，或新建红包活动！`, '提示', {
              confirmButtonText: '确定'
            }).then(actions => {})
          }
        })
      }
    },
    // changeEnd (e) {
    //   setTimeout(() => {
    //     this.form.amount = e.replace(/^(([1-9][0-9]*)|(([0]\.\d{0,2}|[1-9][0-9]*\.\d{0,2})))$/g, '')
    //   }, 20)
    // },
    // 上线状态
    getLine(index, table) {
      const _isOnline = table[index].isOnline
      if (_isOnline) {
        return '上线中'
      } else {
        return '已下线'
      }
    },
    // 活动状态
    getStatus(index, table) {
      const _status = table[index].status
      switch (_status) {
        case 1:
          return '进行中'
        case 0:
          return '未开始'
        case 2:
          return '已结束'
      }
    },
    // 修改状态API
    _updateRedPacketActivitySate(id, isOnline, status) {
      updateRedPacketActivitySate({ id, isOnline, status }).then(res => {
        if (res.code === ERR_SUCCESS) {
          if (res.data.data) {
            this.pageNum = 1
            this._getList()
            Message.success('修改成功')
          }
        } else {
          Message.error(res.msg)
        }
      })
    },
    // 更改状态
    rowAction(index, table) {
      let curOnline = table[index].isOnline
      const id = table[index].id
      const status = table[index].status
      if (curOnline) {
        MessageBox.confirm('是否修改在线状态?', '系统提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(action => {
          this._updateRedPacketActivitySate(id, !curOnline, status)
        }).catch(erro => {
          if (curOnline) {
            curOnline = false
          } else {
            curOnline = true
          }
        })
      } else {
        redHasOnline().then(res => {
          if (res.code === ERR_SUCCESS) {
            const data = res.data.success
            const name = res.data.name
            if (!data) {
              MessageBox.confirm(`已存在上线中的${name}活动是否进行活动替换`, '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
              }).then(action => {
                this._updateRedPacketActivitySate(id, !curOnline, status)
              }).catch(erro => {
                if (curOnline) {
                  curOnline = false
                } else {
                  curOnline = true
                }
              })
            } else {
              MessageBox.confirm('是否修改在线状态?', '系统提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
              }).then(action => {
                this._updateRedPacketActivitySate(id, !curOnline, status)
              }).catch(erro => {
                if (curOnline) {
                  curOnline = false
                } else {
                  curOnline = true
                }
              })
            }
          }
        })
      }
    },
    // 添加每行
    goAdd() {
      this.form.redPacketPrize.push({
        denomination: '',
        percentage: ''
      })
    },
    // 删除每行
    removeDomain(item) {
      var index = this.form.redPacketPrize.indexOf(item)
      if (index !== -1) {
        this.form.redPacketPrize.splice(index, 1)
      }
    },
    // 格式化表单数据动态表单生成的是一个对象数组，需要把对象数组转成一个对象
    formatData(data) {
      const obj = {}
      data.forEach((item, index) => {
        obj['denomination'] = item.denomination
        obj['percentage'] = item.percentage
      })
      return obj
    },
    // showVal (e) {
    //   alert(e)
    // },
    // 每页显示
    handleSizeChange(val) {
      this.pageSize = val
      this._getList()
    },
    // 改变页数
    handleCurrentChange(val) {
      this.pageNum = val
      this._getList()
    },
    // 点击详情
    getDetail(index, table) {
      this.detail = true
      this.dialogFormVisible = true
      this.activityid = table[index].id
      this.title = '修改详情'
    },
    // 上传banner
    handleUploadBanner(event) {
      const target = event.target
      const files = target.files
      const file = files[0]
      const { name, size } = file
      const reg = /.(pcx|emf|gif|bmp|tga|jpg|tif|jpeg|png|rle)$/g
      if (!reg.test(name)) {
        target.value = ''
        Message.error('请上传图片类型的格式！')
        return
      }
      if (size > 500000) {
        target.value = ''
        Message.error('请上传图片大小少于500kb！')
        return
      }
      const reader = new FileReader()
      reader.onload = (e) => {
        const url = e.target.result
        this.getImgStyle(url, (width, height) => {
          const obj = {
            name,
            url,
            file,
            width: width + 'px',
            height: height + 'px',
            progress: 0
          }
          uploadPic(file, function(e) {
            console.log(file)
            obj.progress = e * 100
          }).then(res => {
            obj.url = res.data.picUrl
            this.form.picUrl = res.data.picUrl
          })
        })
        target.value = ''
      }
      reader.readAsDataURL(file)
    },
    // 验证面值与中奖概率
    checkRedPacketPrize(redPacketArr) {
    },
    // 保存增加的
    handleSave() {
      const { name,
        amount,
        picUrl,
        preTitle,
        preContent,
        preNotes,
        sufTitle,
        sufContent,
        sufNotes,
        timeData,
        playNum,
        redPacketPrize } = this.form
      if (isNull(amount)) {
        return Message.error('总金额不能为空！')
      }
      if (amount <= 0) {
        return Message.error('请输入正确的总金额数')
      }
      if (!/^(([1-9][0-9]*)|(([0]\.\d{0,2}|[1-9][0-9]*\.\d{0,2})))$/.test(amount)) {
        return Message.error('总金额数小数点后只能有两位')
      }
      if (parseFloat(amount) > 10000000000000000) {
        return Message.error('金额过大，请重新输入')
      }
      for (let i = 0; i < redPacketPrize.length; i++) {
        if (!redPacketPrize[i].denomination || !redPacketPrize[i].percentage) {
          return Message.error('请填写面值与概率')
        }
        if (!/^(([1-9][0-9]*)|(([0]\.\d{0,2}|[1-9][0-9]*\.\d{0,2})))$/.test(redPacketPrize[i].denomination)) {
          return Message.error('面值小数点后只能有两位')
        }
      }
      if (isNull(name)) {
        return Message.error('请输入活动名称！')
      }
      if (name && name.length > 20) {
        return Message.error('活动名称不超过20个字！')
      }
      if (isNull(picUrl)) {
        return Message.error('请上传加载页！')
      }
      if (timeData && timeData.length > 0) {
        var StartTime = new Date(timeData[0])
        var EndTime = new Date(timeData[1])
        this.form.startTime = format(StartTime, '$1-$2-$3 $4:$5:$6')
        this.form.endTime = format(EndTime, '$1-$2-$3 $4:$5:$6')
      } else {
        return Message.error('请输入活动时间！')
      }
      if (isNull(playNum)) {
        return Message.error('单人玩次数不能为空！')
      }
      if (!isNumber(playNum) || parseFloat(playNum) < 0) {
        return Message.error('请填写正确次数！')
      }
      if (!isNull(preTitle) && preTitle.length > 8) {
        return Message.error('领包前文案1不能超过8个字！')
      }
      if (!isNull(preContent) && preContent.length > 14) {
        return Message.error('领包前文案2不能超过14个字！')
      }
      if (!isNull(preNotes) && preNotes.length > 15) {
        return Message.error('领包前文案3不能超过15个字！')
      }
      if (!isNull(sufTitle) && sufTitle.length > 8) {
        return Message.error('领包后文案1不能超过8个字！')
      }
      if (!isNull(sufContent) && sufContent.length > 10) {
        return Message.error('领包后文案2不能超过10个字！')
      }
      if (!isNull(sufNotes) && sufNotes.length > 12) {
        return Message.error('领包后文案3不能超过12个字！')
      }
      const percentageArr = redPacketPrize.map(item => parseFloat(item.percentage))
      const sum = percentageArr.reduce((prev, curr) => prev + curr, 0)
      if (sum && sum !== 100) {
        return Message.error('当前中奖概率总和不为100%')
      }
      const { startTime, endTime } = this.form
      const obj = { name,
        amount: (amount * 100) | 0,
        picUrl,
        preTitle,
        preContent,
        preNotes,
        sufTitle,
        sufContent,
        sufNotes,
        startTime,
        endTime,
        playNum,
        redPacketPrize: JSON.stringify(redPacketPrize) }
      if (this.isEdit) {
        const id = this.form.id
        if (this.oldValue && parseFloat(this.form.amount) > parseFloat(this.oldValue)) {
          MessageBox.confirm(`你已将【${this.form.name}】总金额：${this.oldValue}，修改为：${this.form.amount}, 是否确认修改！`, '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(actions => {
            MessageBox.confirm('你已对活动进行变更，是否确认无误', '提示', {
              confirmButtonText: '确定',
              cancelButtonText: '取消',
              type: 'warning'
            }).then(actions => {
              this._editRedPacketActivity(Object.assign({ id: id }, obj))
            })
          })
        } else if (parseFloat(this.form.amount) < parseFloat(this.oldValue)) {
          MessageBox.alert(`【${this.form.name}】的已经发放金额：${this.outRedPack}，大于你修改的红包总金额：${this.form.amount}, 请返回修改，或新建红包活动！`, '提示', {
            confirmButtonText: '确定'
          }).then(actions => {
          })
        } else {
          MessageBox.confirm('你已对活动进行变更，是否确认无误', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(actions => {
            this._editRedPacketActivity(Object.assign({ id: id }, obj))
          })
        }
      } else {
        this._addRedPacketActivity(Object.assign({}, obj))
      }
    },
    _addRedPacketActivity(form) {
      addRedPacketActivity(form).then(res => {
        if (res.code === ERR_SUCCESS) {
          Message.success('新增活动成功')
          this.dialogFormVisible = false
          this._getList()
        } else {
          Message.error(res.msg)
        }
      })
    },
    // 更新活动
    _editRedPacketActivity(form) {
      editRedPacketActivity(form).then(res => {
        if (res.code === ERR_SUCCESS) {
          Message.success('更新活动成功')
          this.isEdit = false
          this.dialogFormVisible = false
          this._getList()
        } else {
          Message.error(res.msg)
        }
      })
    },
    getImgStyle(url, callback, px = 120) {
      const img = document.createElement('img')
      img.onload = function(e) {
        const { width, height } = e.target
        let _width, _height
        if (width > height) {
          _height = px + 'px'
          _width = px * width / height
        } else {
          _width = px + 'px'
          _height = px * height / width
        }
        callback && callback(_width, _height)
      }
      img.src = url
    },
    // 取消按钮
    cancle() {
      MessageBox.confirm('你已对活动进行变更，请确认是否放弃修改并【退出】?', '系统提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(action => {
        this.dialogFormVisible = false
        this._getList()
      }).catch(erro => {})
    },
    // 取消图片
    handleDelete(url) {
      if (url === this.form.picUrl) {
        this.form.picUrl = ''
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
    [Button.name]: Button,
    [TableColumn.name]: TableColumn,
    [Pagination.name]: Pagination,
    [Cascader.name]: Cascader,
    [Dialog.name]: Dialog,
    [Message.name]: Message,
    [Radio.name]: Radio,
    [FormItem.name]: FormItem,
    [RadioGroup.name]: RadioGroup,
    [Form.name]: Form,
    listTable,
    Detail
  }
}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~common/css/variable"
  @import "~common/css/mixin"
  @import "~common/css/elementCustom"

  .video-list
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
     .video-header
       position relative
       .video-header-query
         width 96%
         margin 0 auto;
         font-size 0
         .video-header-item
           padding-right 1%
           height 40px
           line-height 40px
           inline-block-top()
           & > .label
            float left
            width 40px
            font-size $font-size-sm
            inline-block-top()
           & > .video-input-item
            display block
            margin-left 40px
            font-size $font-size-sm
        .icon-playVideo:before
          content "\E929"
          color #e9eff1
          position absolute
          left 41%
          top 30%
          font-size 30px
          cursor pointer
        .time
          position absolute
          right 10%
          bottom 15%
          color #e9eff1
        .video-button
          position absolute
          display inline-block
          padding-top 5px
          width 21%
          height 28px
          text-align center
          button
            margin-right 25px
            width 120px
       .video-table
         padding 0 10px
       .video-pagination
          padding 21px 0
          height 32px
          line-height 32px
          border 1px solid #ebeef5
          border-top none
          overflow hidden
         .video-pagination-select
           inline-block-top()
         .video-pagination-checkbox
           width 34px
           height 32px
           line-height 32px
           text-align center
           inline-block-top()
         .video-pagination-content
           float right
           margin-right 20px
           inline-block-top()
  .list-upload
    position absolute
    top 32%
    left 0%
    width 80px
    height 28px
    opacity 0
    cursor pointer
  .msg
    position absolute
  .content
    position absolute
    color #fff
    left 0
    bottom 0
    right 0
    margin auto
    text-align center
</style>
