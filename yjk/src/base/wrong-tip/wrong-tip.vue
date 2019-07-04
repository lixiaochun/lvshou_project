<template>
    <el-dialog
          title="会员验证失败"
          :visible.sync="dialogVisible"
          width="30%">
         <div v-if="account">失败{{account}}笔！
             <div v-for="(member, index) in list" :key="index">第{{member.addressId}}行, 姓名：{{member.name}}, 手机号：{{member.mobile}}</div>
         </div>
          <div v-else>上传文件为空</div>
          <span slot="footer" class="dialog-footer">
            <el-button type="primary" @click="submit">确 定</el-button>
          </span>
    </el-dialog>
</template>

<script type="text/ecmascript-6">
import { Dialog, Button } from 'element-ui'

export default {
  props: ['list', 'account', 'dialogVisible'],
  // data () {
  //   return {
  //     dialogVisible: false
  //   }
  // },
  methods: {
    submit() {
      this.$emit('close')
    }
  },
  components: {
    [Dialog.name]: Dialog,
    [Button.name]: Button
  }
}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~common/css/variable"
  @import "~common/css/mixin"
</style>
