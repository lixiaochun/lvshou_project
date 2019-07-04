<template>
  <c-dialog :title="titile" @close="goBack">
    <div class="content-manage-item">
      <ul class="warning-wapper">
        <li>
          <span>库存预警值:</span>
          <div>
            <p><el-input size="mini" style="width: 200px" @input="changeAmount" v-model="sku"></el-input></p>
            <p class="note">当库存等于或小于该值时将处于预警状态</p>
          </div>
        </li>
        <li>
          <span>开启库存预警：</span>
          <div style="height: 30px; line-height: 30px">
            <el-radio v-model="status" label="1" style="width: 60px">开启</el-radio>
            <el-radio v-model="status" label="0" style="margin-left: 10px">不开启</el-radio>
          </div>
        </li>
        <li>
          <el-button type="primary" size="mini" style="width: 60px" @click="saveWarning()" >保存</el-button>
          <el-button size="mini"  style="width: 60px" @click="cancelWarning()" >取消</el-button>
        </li>
      </ul>
    </div>
  </c-dialog>
</template>

<script type="text/ecmascript-6">
import { Radio, Input, Button, Message } from 'element-ui'
import cDialog from 'base/c-dialog/c-dialog'
import { ERR_SUCCESS } from 'api/config'
import { updateSku, getSku } from 'api/mall'
export default {
  data() {
    return {
      titile: '库存预警',
      sku: '',
      status: '1'
    }
  },
  created() {
    this._getSku()
  },
  methods: {
    goBack() {
      this.$router.go(-1)
    },
    _getSku() {
      getSku().then(res => {
        const data = res.data
        this.sku = data.sku
        this.status = data.skuOpen
      })
    },
    changeAmount(e) {
      setTimeout(() => {
        if (this.sku <= 0) {
          this.sku = ''
        } else {
          this.sku = e.replace(/[^0-9]/g, '')
        }
      }, 20)
    },
    saveWarning() {
      const { sku, status } = this
      updateSku({ sku, status }).then(res => {
        if (res.code === ERR_SUCCESS) {
          Message.success('设置成功')
          this.$router.go(-1)
        } else {
          Message.error('设置失败')
        }
      })
    },
    cancelWarning() {}
  },
  components: {
    [cDialog.name]: cDialog,
    [Radio.name]: Radio,
    [Button.name]: Button,
    [Input.name]: Input
  }
}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~common/css/variable"
  @import "~common/css/mixin"
  .content-manage-item
    width 500px
  .warning-wapper
    width 400px
    margin 0 auto
    padding-top 20px
    overflow hidden
    padding-bottom 40px
    li
      float left
      margin-bottom 10px
      width 100%
      &:last-child
        text-align center
      .note
        font-size 1px
        text-indent 100px
        margin-top 10px
        color #999
      span
        float left
        margin-right 6px
        width 90px
        height 30px
        line-height 30px
        font-size 12px
        text-align right

</style>
