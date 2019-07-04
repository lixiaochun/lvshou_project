<!-- 解忧师列表详情 -->
<!-- created by : lvhaizhou -->
<!-- created time : 2019-04-23 -->
<template>
    <div class="member-info">
        <p class="title"><span>解忧师列表</span></p>
        <list-table title="解忧师列表-详情" style="box-shadow: none;" :hideQuery="true">
            <!-- <el-button type="primary"
                style="height: 30px;padding: 0px 15px;cursor: pointer;position: absolute;right: 15px;top: 5px;z-index: 999;"
                @click="returnListenerList"
            >返回</el-button> -->
            <el-tabs v-model="navIndex" type="card">
                <el-tab-pane class="personal-data" label="个人资料" name="0">
                    <listener-list-detail-info :listenerId="listenerId" :queryObj="queryObj"></listener-list-detail-info>
                </el-tab-pane>
            </el-tabs>
            <el-button type="primary" style="display: block; margin: 0 auto;"
                @click="returnListenerList"
            >返回</el-button>
        </list-table>
    </div>
</template>

<script>
import { Tabs, TabPane, Button } from 'element-ui'
import listTable from 'base/list-table/list-table'
import listenerListDetailInfo from 'components/listener/listener-list-detail-info'
export default {
    data (){
        return {
            navIndex: '0',
            listenerId: 0,
            queryObj: {}
        }
    },
    methods: {
      returnListenerList(){
        this.$router.push({
          path: '/listener/listenerList', query: { detailQueryObj: JSON.stringify(this.queryObj) }
        })
      }
    },
    components: {
        [Tabs.name]: Tabs,
        [TabPane.name]: TabPane,
        [Button.name]: Button,
        listTable,
        listenerListDetailInfo
    },
    created (){
      this.listenerId = this.$route.query.listenerId
      this.queryObj = JSON.parse(this.$route.query.queryObj)
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
  .list-table-content{
    position: relative !important;
  }
</style>
