<template>
  <div class="member-page">
    <p class="title"><span>壹豆赠送机制</span></p>
    <div class="member-header">
      <list-table title="会员列表" :border="true" style="box-shadow: none;">
        <slot slot="query">
          <div style="background: #f2f2f2; height: 40px;">
            <span class="el-icon-menu">规则设置</span>
          </div>
          <div class="desc">
               <i class="el-icon-info"></i>
               <p>说明</p>
             <span>赠送壹豆仅能用于倾听者服务，不能兑换现金，不能进行任何转账交易，不能兑换公司服务体系以外的产品和服务</span>
          </div>
          <!-- 第一个框 -->
         <div class="tab">
             <tag-table title="新会员赠送壹豆">
             <div class="content">
                    <el-form >
                       <el-form-item label="赠送壹豆：">
                        <el-input  size="mini" style="width: 22%" v-model="newGiveEbean">
                          <template slot="append">个</template>
                        </el-input>
                        <span style="font-size:12px;color:#c0c4cc;"> 赠送壹豆范围 (0 ~ 999999)</span>
                        <span style="margin-left:240px;">
                           <el-button type="primary" @click="onNewSubmit" size="mini" >提交</el-button>
                        </span>
                       </el-form-item>
                    </el-form>
             </div>
             </tag-table>
         </div>
         <!-- 第二个框 -->
         <div class="tab">
              <tag-table title="指定会员赠送壹豆">
             <div class="content">
                    <el-form>
                       <el-form-item label="赠送壹豆：">
                         <el-input  size="mini" style="width:22%" v-model="count">
                          <template slot="append">个</template>
                        </el-input>
                         <span style="font-size:12px;color:#c0c4cc;"> 赠送壹豆范围 (1 ~ 999999)</span>
                       </el-form-item>
                       <el-form-item label="选择会员：">
                         <!-- <input v-if="name" type="text" :placeholder="name"> -->
                         <input  type="text" :placeholder="name" disabled style="padding:7px;">
                          <el-button type="primary" size="mini"><a href="http://resource.yijiankang.info/doc/template/template01.xlsx" style="color:white">下载模版</a></el-button>
                        <input type="file" accept="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"  @change="handleUpload" class="input"/>
                          <el-button type="primary" size="mini" class="importMember">导入会员</el-button>
                          <!-- <div style="font-size:12px;color:#c0c4cc;">已选择{{num}}人</div> -->
                          <span style="font-size:12px;color:#c0c4cc;">（说明：先下载模板然后导入会员）</span>
                       </el-form-item>
                       <el-form-item>
                          <el-button type="primary" @click="importMember" size="mini" class="tijiao">提交</el-button>
                       </el-form-item>
                    </el-form>
             </div>
              </tag-table>
         </div>
        </slot>
      </list-table>
      <wrong-tip :account=account :list=list :dialogVisible=dialogVisible @close='close'></wrong-tip>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
import listTable from 'base/list-table/list-table'
import { importExcel, registerEbean, updateRegisterEbean } from 'api/ebean'
import { ERR_SUCCESS } from 'api/config'
import tagTable from 'base/tag-table/tag-table'
import wrongTip from 'base/wrong-tip/wrong-tip'
import { isNumber } from 'common/js/verify'
import { Button, Form, Input, DatePicker, Message, MessageBox, FormItem, Select, Option, Dialog } from 'element-ui'

export default {
  data() {
    return {
      newGiveEbean: 0,
      count: '',
      file: '',
      name: 'xxx.xlsx',
      num: 0,
      dialogVisible: false,
      list: [],
      account: 0
    }
  },
  created() {
    this._registerEbean()
  },
  computed: {
  },
  methods: {
    _registerEbean() {
      registerEbean({ type: 'app_user', code: 'register_ebean' }).then(res => {
        if (res.code === ERR_SUCCESS) {
          this.newGiveEbean = res.data.value
        } else {
          Message.error(res.Message)
        }
      })
    },
    _updateRegisterEbean() {
      const { newGiveEbean } = this
      updateRegisterEbean({ type: 'app_user', code: 'register_ebean', value: newGiveEbean }).then(res => {
        if (res.code === ERR_SUCCESS) {
          Message.success('更新成功')
        } else {
          Message.error('更新失败')
        }
      })
    },
    _importExcel() {
      const { count, file } = this
      importExcel(file, count).then(res => {
        if (res.code === ERR_SUCCESS) {
          const data = res.data
          if (data.code === 'success') {
            MessageBox.confirm(`成功${data.count}笔`, '会员导入验证成功', {
              confirmButtonText: '确定',
              type: 'warning'
            }).then(actions => {
              Message.success('操作成功')
            })
          } else if (data.code === 'error') {
            this.list = data.errorList
            this.dialogVisible = true
            this.account = data.count
          }
        } else {
          return Message.error(res.msg)
        }
      })
    },
    close() {
      this.dialogVisible = false
    },
    onNewSubmit() {
      const { newGiveEbean } = this
      if (!isNumber(newGiveEbean) || newGiveEbean < 0 || newGiveEbean > 999999) {
        return Message.error('请填写正确的数量')
      }
      MessageBox.confirm(`赠送给新用户的壹豆数为${this.newGiveEbean}`, '系统提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(actions => {
        this._updateRegisterEbean()
      })
    },
    handleUpload(event) {
      const target = event.target
      const files = target.files
      const file = files[0]
      this.file = file
      this.name = file.name
    },
    importMember() {
      const { count } = this
      if (!isNumber(count) || count < 0 || count > 999999) {
        return Message.error('请填写正确的数量')
      }
      if (!count) {
        return Message.error('请填写赠送数量')
      }
      MessageBox.confirm(`赠送给会员的壹豆数为${this.count}`, '系统提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(actions => {
        this._importExcel()
      })
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
    [Dialog.name]: Dialog,
    tagTable,
    listTable,
    wrongTip
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
  .input
    position absolute
    bottom 8px
    width 73px
    height 24px
    z-index 999
    opacity 0
  .tijiao
    position absolute
    left 43%
    bottom -10px
</style>
