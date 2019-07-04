<template>
  <div class="member-info">
    <p class="title"><span>会员列表</span></p>
    <list-table title="会员列表-详情" style="box-shadow: none;" :hideQuery="true">
      <el-tabs v-model="navIndex" type="card">
        <el-tab-pane class="personal-data" label="个人资料" name="0">
          <member-custom></member-custom>
        </el-tab-pane>
      </el-tabs>
    </list-table>
  </div>
</template>

<script type="text/ecmascript-6">
import { Tabs, TabPane } from 'element-ui'
import listTable from 'base/list-table/list-table'
import memberCustom from 'components/member/member-custom'

export default {
  data() {
    return {
      navIndex: '0'
    }
  },
  components: {
    [Tabs.name]: Tabs,
    [TabPane.name]: TabPane,
    listTable,
    memberCustom
  }
}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
@import "~common/css/variable"
@import "~common/css/mixin"

.member-info
  height 100%
  overflow-y auto
  & >>> .el-tabs__nav-wrap.is-top
    padding-left 20px
.title
  margin-bottom 20px
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
</style>
<style>
  .member-info .el-tabs__nav>div{
    font-weight: bold;
  }
</style>
