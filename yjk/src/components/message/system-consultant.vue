<template>
  <div>
    <div v-if="listData.length>0" v-for="item in listData" :key="item.parentName">
      <p class="logistics-title"><span>{{ item.name}}</span></p>
      <ul class="logistics-content">
        <li v-if="item.list.length>0" v-for="(listItem, index) in item.list" :key="index" @click="edit(listItem.id, listItem.code)">
          <div class="logistics-item">
            <p class="title">{{listItem.name}}</p>
            <p class="type">类型：{{listItem.condDesc}}</p>
            <div class="detail">{{listItem.content}}</div>
          </div>
        </li>
      </ul>
    </div>
    <div v-else>
      暂无数据
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
import { Tabs, TabPane, Radio } from 'element-ui'
import { ERR_SUCCESS } from 'api/config'
import { sysmsgList } from 'api/message'
export default {
  data() {
    return {
      radio: '1',
      listData: ''
    }
  },
  created() {
    this._getlist()
  },
  methods: {
    edit(id, code) {
      // eslint-disable-next-line standard/object-curly-even-spacing
      this.$router.push({ path: '/message/consultantEdit', query: { userType: 2, modleType: 1, code, id }})
    },
    _getlist() {
      sysmsgList({ userType: 2 }).then(res => {
        if (res.code === ERR_SUCCESS) {
          this.listData = res.data
        }
      })
    }
  },
  components: {
    [Tabs.name]: Tabs,
    [TabPane.name]: TabPane,
    [Radio.name]: Radio
  }
}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~common/css/variable"
  @import "~common/css/mixin"

  .message-page
    height 100%;
    overflow-y auto
  .logistics-title
    height 40px
    line-height 40px
    background-color #f2f2f2
    span
      margin-left 10px
      padding-left 6px
      border-left 2px solid #00bafa
      font-size 14px
      color #666
  .logistics-content
    background #e4e4e4
    padding 10px
    overflow hidden
    li
      float left
      margin-bottom 20px
      width 33.3%
      cursor pointer
      .logistics-item
        padding 10px
        padding-top 0px
        padding-bottom 0px
        width 90%
        height 131px
        font-size 12px
        overflow hidden
        background-color #fff
      .type
        margin-bottom 8px
        font-size 12px
        color #999
      .detail
        margin-bottom 10px
        font-size 12px
        color #999
        line-height 20px
      .title
        height 34px
        font-size 14px
        line-height 34px
      .way-item
        float left
        width 50%
        height 30px
        line-height 30px
        cursor pointer
        text-align center
</style>
