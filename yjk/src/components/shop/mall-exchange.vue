<template>
  <div class="summary-wapper">
    <p class="title"><span>魅力分金钱比例</span></p>
    <div class="exchange-content">
      <div class="note">
        注：魅力分金钱换算比例
      </div>

      <div class="rules">
        魅力分<el-input size="mini" @input="changeAmount" v-model="price" style="width: 120px; margin: 0 10px"></el-input>
        等于1现金
      </div>
      <div class="save">
        <el-button @click="save" size="mini"  type="primary" style="width: 100px">保存</el-button>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
import cDialog from 'base/c-dialog/c-dialog'
import { Button, Input, DatePicker, Select, Option, Message } from 'element-ui'
import { ERR_SUCCESS } from 'api/config'
import { getSystemParams, updateSytemParams } from 'api/mall'
export default {
  data() {
    return {
      price: ''
    }
  },
  created() {
    this._getSystemParams()
  },
  methods: {
    save() {
      const { price } = this
      updateSytemParams({ type: 'money_exchange', code: 'points', value: price }).then(res => {
        if (res.code === ERR_SUCCESS) {
          Message.success('修改成功')
        }
      })
    },
    changeAmount(e) {
      setTimeout(() => {
        this.price = e.replace(/[^0-9]/g, '')
      }, 20)
    },
    _getSystemParams() {
      getSystemParams({ type: 'money_exchange', code: 'points' }).then(res => {
        if (res.code === ERR_SUCCESS) {
          this.price = res.data.value
        }
      })
    }
  },
  components: {
    [Select.name]: Select,
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
    width 96%
    height 100%
    overflow-y auto
    background #fff
    font-size 12px
    .note
      margin 0 auto
      margin-top 30px
      height 80px
      line-height 80px
      text-indent 20px
      width 90%
      color #ff9660
      border-radius 10px
      border 1px dashed #dcdcdc
  .rules
    margin 0 auto
    margin-top 150px
    width 400px
  .save
    margin-top 150px
    text-align center
</style>
