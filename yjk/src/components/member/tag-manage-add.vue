<template>
 <c-dialog :title="titile" @close="goBack">
    <div class="content-manage-item">
      <ul class="warning-wapper">
        <li>
          <span class="choose">标签名称：</span>
          <div>
            <p><el-input size="mini" v-model="labelName" style="width: 210px" :maxlength="20" type="textarea"></el-input></p>
          </div>
        </li>
        <!--<li>-->
          <!--<span class="">自动打标签条件：</span>-->
          <!--<div>-->
            <!--<p><el-input size="mini" style="width: 200px"></el-input></p>-->
          <!--</div>-->
        <!--</li>-->
        <li>
          <span class="choose">标签分类：</span>
          <div style="height: 30px; line-height: 30px">
            <el-select v-model="labelType" placeholder="请选择" size="mini">
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </div>
        </li>
        <li>
          <span class="choose">启用状态：</span>
          <div style="height: 30px; line-height: 30px">
            <el-radio v-model="isValid" :label="true" style="width: 60px">开启</el-radio>
            <el-radio v-model="isValid" :label="false" style="margin-left: 10px">不开启</el-radio>
          </div>
        </li>
       <li>
          <span>标签描述：</span>
          <div>
            <p><el-input type="textarea" size="mini" v-model="remark" class="input-border-radius" style="width: 282px" :maxlength="15" ></el-input></p>
          </div>
        </li>
        <li>
          <el-button type="primary" size="mini" style="width: 60px" @click="saveWarning()" >保存</el-button>
          <el-button size="mini"  style="width: 60px" @click="goBack()" >取消</el-button>
        </li>
      </ul>
    </div>
 </c-dialog>
</template>

<script type="text/ecmascript-6">
import { Radio, Input, Button, Message, Select, Option } from 'element-ui'
import cDialog from 'base/c-dialog/c-dialog'
import { saveLabelLib } from 'api/user'
import { ERR_SUCCESS } from 'api/config'
import { isNull } from 'common/js/util'
export default {
  data() {
    return {
      titile: '新增标签',
      isValid: '',
      labelName: '',
      remark: '',
      options: [{
        value: '1',
        label: '用户症状类型'
      }],
      labelType: ''
    }
  },
  created() {
    // this.init()
  },
  methods: {
    goBack() {
      this.$router.go(-1)
    },
    _saveLabelLib() {
      const { labelName, isValid, labelType, remark } = this
      if (isNull(labelName)) {
        return Message.error('请输入标签名称')
      }
      if (isNull(labelType)) {
        return Message.error('请选择标签分类！')
      }
      if (isNull(isValid)) {
        return Message.error('请选择启用状态！')
      }
      saveLabelLib({ labelName, isValid, labelType, remark }).then(res => {
        if (res.code === ERR_SUCCESS) {
          // console.log(res)
          Message.success('新增成功')
          this.$router.go(-1)
        } else {
          Message.error(res.msg)
        }
      })
    },
    saveWarning() {
      if (this.id) {
        this._updateLabelLib()
      } else {
        this._saveLabelLib()
      }
    }
  },
  components: {
    [cDialog.name]: cDialog,
    [Radio.name]: Radio,
    [Select.name]: Select,
    [Option.name]: Option,
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
      font-size 12px
      margin-bottom 10px
      width 100%
      &:last-child
        text-align center
      .unit
        display inline-block
        padding 0 10px
        margin-left -3px
        background #dcdfe6
        color #333
        height 28px
        line-height 28px
        border-top-right-radius 3px
        border-bottom-right-radius 3px

      .choose
        &:before
          content '*'
          color red
          padding-right 4px
      &>span
        float left
        margin-right 6px
        width 100px
        height 30px
        line-height 30px
        font-size 12px
        text-align right

</style>
