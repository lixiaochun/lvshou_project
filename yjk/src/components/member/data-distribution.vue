<template>
  <div class="member-page">
    <p class="title"><span>资料分配机制</span></p>
    <div class="member-header">
      <list-table title="会员列表" :border="true" style="box-shadow: none; border:1px solid #f5f2f2;">
        <slot slot="query">
          <div style="background: #f2f2f2; height: 40px;">
            <span class="el-icon-menu">规则设置</span>
          </div>
          <div class="desc">
               <i class="el-icon-info"></i>
               <p>说明</p>
             <span>新客注册时即分配顾问，建立顾问与客户的绑定关系。</span>
             <span> 如果是顾问创建的客户资料，则此顾问为此客户的资料所属人（即自动建立绑定关系）。</span>
          </div>
          <div class="desc" style="border-bottom:none">
            <i class="icon-tag" style="font-size:23px;color:#4897f9"></i><p>智能分配</p>
            <span>智能分配机制基于贝叶斯预测模型结合逻辑回归算法进而抽取的一种分配策略。</span>
            <div class="custom-query-item">
          优先分配：
          <el-radio-group v-model="orderFrom" size="mini" style="margin-right: 41px;">
            <el-radio-button :label="1">近7天下单业绩</el-radio-button>
            <el-radio-button :label="2">  近7天下单平均  </el-radio-button>
          </el-radio-group>
          <el-button @click="submit()" type="primary" size="mini">确定</el-button>
        </div>
          </div>
        </slot>
      </list-table>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
import listTable from 'base/list-table/list-table'
import { RadioGroup, RadioButton, Button } from 'element-ui'
export default {
  data() {
    return {
      orderFrom: 1
    }
  },
  created() {
  },
  methods: {
    submit() {}
  },
  components: {
    listTable,
    [RadioGroup.name]: RadioGroup,
    [RadioButton.name]: RadioButton,
    [Button.name]: Button
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
</style>
