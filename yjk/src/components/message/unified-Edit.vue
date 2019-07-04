<template>
  <div class="message-page">
    <p class="message-title"><span>消息模板</span></p>
    <div class="unified-wapper">
      <div class="unified-item">
        <span class="choose">消息类型：</span>
        <div>
          <el-select v-model="typeId" size="mini" style="width: 400px" placeholder="请选择消息类型">
            <el-option
              v-for="item in options"
              :key="item.parentId"
              :label="item.parentName"
              :value="item.parentId">
            </el-option>
          </el-select>
        </div>
      </div>
      <div class="unified-item">
        <span class="choose">消息标题：</span>
        <div>
          <el-input size="mini" v-model="tempTitle" placeholder="请输入消息标题" style="width: 400px"></el-input>
        </div>
      </div>
      <div class="unified-item">
        <span style="height: 30px; float: left" class="choose">编辑内容：</span>
        <div class="add-wapper">
          <div class="edit-content">
            <el-input type="textarea" v-model="tempContent"  placeholder="请输入消息内容" style="width: 400px; height: 120px"></el-input>
          </div>
          <div class="prompt">
            <div>已输入<label>{{tempContent ? tempContent.length : 0}}</label> / 300字</div>
          </div>
        </div>
      </div>
      <div class="unified-item" style="text-align: right">
        <el-button size="mini" @click="cancel()">取消</el-button>
        <el-button size="mini"  type="primary" plain @click="_save()">确定</el-button>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
import { Select, Option, CheckboxGroup, Input, Button, Radio, Message } from 'element-ui'
import { isNull } from 'common/js/util'
import { list, save, update, detail } from 'api/message'
import { ERR_SUCCESS } from 'api/config'
export default {
  data() {
    return {
      tempTitle: '',
      id: '',
      tempContent: '',
      options: [],
      typeId: ''
    }
  },
  created() {
    this._getlist()
    this.init()
  },
  methods: {
    init() {
      const { id, parentId } = this.$route.query
      this.id = id
      if (id) {
        this._detail(id)
      }
      if (parentId) {
        this.typeId = parentId
      }
    },
    edit() {
      this.$router.push({ path: '/message/unifiededit' })
    },
    _getlist() {
      list().then(res => {
        if (res.code === ERR_SUCCESS) {
          this.options = res.data
        }
      })
    },
    _detail(id) {
      detail({ id: id }).then(res => {
        if (res.code === ERR_SUCCESS) {
          this.typeId = res.data.typeId
          this.tempTitle = res.data.tempTitle
          this.tempContent = res.data.tempContent
        }
      })
    },
    cancel() {
      this.$router.go(-1)
    },
    _save() {
      if (isNull(this.typeId)) {
        return Message.error('请选择消息类型！')
      }
      if (isNull(this.tempTitle)) {
        return Message.error('请输入消息标题！')
      }
      if (isNull(this.tempContent)) {
        return Message.error('请输入编辑内容！')
      }
      if (this.id) {
        const { typeId, tempTitle, tempContent, id } = this
        update({ typeId, tempTitle, tempContent, id }).then(res => {
          if (res.code === ERR_SUCCESS) {
            Message.success('修改成功')
            this.$router.go(-1)
          }
        })
      } else {
        const { typeId, tempTitle, tempContent } = this
        save({ typeId, tempTitle, tempContent }).then(res => {
          if (res.code === ERR_SUCCESS) {
            Message.success('新增成功')
            this.$router.go(-1)
          }
        })
      }
    }
  },
  watch: {
    tempContent(value) {
      this.tempContent = value.substring(0, 300)
    }
  },
  components: {
    [CheckboxGroup.name]: CheckboxGroup,
    [Input.name]: Input,
    [Select.name]: Select,
    [Button.name]: Button,
    [Radio.name]: Radio,
    [Option.name]: Option
  }

}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~common/css/variable"
  @import "~common/css/mixin"

  .message-page
    height 100%;
    overflow-y auto
  .message-title
    height 50px
    line-height 50px
    background-color #f2f2f2
    span
      margin-left 10px
      padding-left 10px
      border-left 2px solid #00bafa
      color #333
  .unified-wapper
    margin 0 auto
    margin-top 30px
    padding-bottom 20px
    width 98%
    background-color #fff
    font-size 12px
    .unified-item
      margin-left 30px
      margin-bottom 10px
      font-size 0
      width 482px
      span
        width 80px
        display inline-block
        font-size 12px
        height 30px
        line-height 30px
      &>div
        display inline-block
  .choose
    &:before
      content '*'
      color red
      padding-right 4px
  .prompt
    margin-top 10px
    font-size 12px
    label
      color red
</style>
