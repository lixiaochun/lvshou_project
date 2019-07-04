<template>
  <div class="message-page">
    <p class="message-title"><span>消息模板</span></p>
    <div class="unified-wapper">
      <div class="unified-item">
        <span>消息类型：</span>
        <div>
          <el-select v-model="value" size="mini" style="width: 400px" placeholder="请选择消息类型">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </div>
      </div>
      <div class="unified-item">
        <span>消息标题：</span>
        <div>
          <el-input size="mini" v-model="notificationTitle" placeholder="【待付款通知】" style="width: 400px"></el-input>
        </div>
      </div>
      <div class="unified-item">
        <span style="height: 30px; float: left">编辑内容：</span>
        <div class="add-wapper">
          <div class="edit-content">
            <el-input type="textarea" v-model="notification"  placeholder="请输入消息内容" style="width: 400px; height: 120px"></el-input>
          </div>
          <div class="prompt">
            <div>已输入<label>{{notification ? notification.length : 0}}</label>字</div>
          </div>
        </div>
      </div>
      <div class="unified-item" style="text-align: right">
        <el-button size="mini" >取消</el-button>
        <el-button size="mini"  type="primary" plain>确定</el-button>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
import {Select, Option, CheckboxGroup, Input, Button, Radio} from 'element-ui'
export default {
  data () {
    return {
      notificationTitle: '',
      notification: '',
      options: [],
      value: ''
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
  .prompt
    margin-top 10px
    font-size 12px
    label
      color red
</style>
