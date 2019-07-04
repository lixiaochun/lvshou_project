<template>
  <div class="summary-wapper">
    <p class="title"><span>建立售后单</span></p>
    <div class="exchange-content">
      <p class="created">创建售后联络单</p>
       <ul class="selectUl">
         <li>
           <span class="liLabel red">订单编号：</span>
           <el-input class="orderName" size="mini" style=" width: 600px; float: left; margin: 0 10px">处理方案</el-input>
           <el-button @click="valiDateFn" size="mini"  type="success" class="orderBtn" style="cursor: pointer">验证</el-button>
         </li>
         <li v-show="validation">
              <el-button @click="watchOrder"  size="mini"  type="success" class="orderBtn" style="cursor: pointer; margin-left: 80px">查看订单</el-button>
         </li>
         <li v-show="areIn">
           <div style="color: red; margin-left: 70px; font-size: 12px">
             暂无改订单
           </div>
         </li>
         <li class="liLabel">
           <span>处理方案：</span>
          <div style="margin-left: 70px; height: 30px; line-height: 30px">
            <el-radio-group v-model="radio2">
              <el-radio :label="3">退款</el-radio>
              <el-radio :label="6">漏发补货</el-radio>
              <el-radio :label="9">质量问题</el-radio>
            </el-radio-group>
          </div>
         </li>
         <li>
           <span class="liLabel red">内容描述：</span>
           <el-input size="mini" type="textarea" placeholder="详细描述售后问题"
                     :rows="8" style=" width: 600px; float: left; margin: 0 10px"></el-input>
         </li>
       </ul>

      <div class="labelOk"><el-button style="margin-left: 400px; width: 80px" size="mini" type="danger">完成</el-button></div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
import cDialog from 'base/c-dialog/c-dialog'
import { Button, Input, DatePicker, Radio, RadioGroup, Select, Option } from 'element-ui'
export default {
  data() {
    return {
      mini: '100',
      radio2: 3,
      biggest: '1',
      validation: false,
      areIn: false
    }
  },
  created() {
  },
  methods: {
    save() {
      const { mini, biggest } = this
      this.submit({ mini, biggest }).then(e => {})
    },
    watchOrder() {
      // eslint-disable-next-line standard/object-curly-even-spacing
      this.push({ path: '', query: {}})
    },
    valiDateFn() {
      this.validation = true
      this.areIn = false
    },
    submit() {
    }
  },
  components: {
    [Select.name]: Select,
    [RadioGroup.name]: RadioGroup,
    [Radio.name]: Radio,
    [Option.name]: Option,
    [DatePicker.name]: DatePicker,
    [Input.name]: Input,
    [Button.name]: Button,
    cDialog
  }
}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~common/css/variable"
  @import "~common/css/mixin"
  .summary-wapper
    height 100%
    overflow-y auto
    background #f2f2f2
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
  .exchange-content
    border-top 1px solid #fff
    margin 0 auto
    width 100%
    height 100%
    padding-left 20px
    overflow-y auto
    background #fff
    font-size 12px
    .created
      height 80px
      line-height 80px
      font-size 18px
      font-weight bold
      text-indent 20px
    .selectUl
      width 800px
      float left
      margin-left 50px
      li
        margin-bottom 20px
        width 100%
        overflow hidden
        .red
          &:before
            display inline-block
            content '*'
            float left
            padding-top 3px
            padding-right 4px
            color red
      span
        float left
        display inline-block
        height 30px
        line-height 30px
  .labelOk
    margin-top 40px
    width 100%
    float left
  .rules
    margin 0 auto
    margin-top 150px
    width 400px
  .save
    margin-top 150px
    text-align center
</style>
