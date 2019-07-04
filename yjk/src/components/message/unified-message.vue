<template>
  <div class="message-page">
    <p class="logistics-title"><span>消息模板</span></p>
    <div class="unified-wapper" :class="{active: listItem.length > 0}">
      <div class="" v-for="item in listItem" :key="item.parentName">
        <p class="unified-title">{{ item.parentName}}</p>
        <ul class="unified-content">
          <li v-if="item.list.length !== 0" v-for="listItem in item.list" :key="listItem.tempTitle">
            <div class="unified-item">
              <p class="title">{{listItem.tempTitle}}</p>
              <div class="detail">
                <p :class="{more: listItem.tempContent.length>90}">{{listItem.tempContent}}</p></div>
              <div class="way">
                <div class="way-item delete" @click="deleteList(listItem.id)">
                  删除
                </div>
                <div class="way-item edit" @click="edit(listItem.id)">
                  编辑
                </div>
              </div>
            </div>
          </li>
          <li>
            <div class="add-item" @click="edit('add', item.parentId)">
              +
            </div>
          </li>
        </ul>
        <div>
      </div>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
import { Message } from 'element-ui'
import { list, deletes } from 'api/message'
import { ERR_SUCCESS } from 'api/config'
export default {
  data() {
    return {
      listItem: []
    }
  },
  created() {
    this._getlist()
  },
  methods: {
    edit(type, id) {
      if (type === 'add') {
        // eslint-disable-next-line standard/object-curly-even-spacing
        this.$router.push({ path: '/message/unifiededit', query: { parentId: id }})
      } else {
        // eslint-disable-next-line standard/object-curly-even-spacing
        this.$router.push({ path: '/message/unifiededit', query: { id: type }})
      }
    },
    deleteList(id) {
      deletes({ id: id }).then(res => {
        if (res.code === ERR_SUCCESS) {
          Message.success('删除成功')
          this._getlist()
        }
      })
    },
    _getlist() {
      list().then(res => {
        if (res.code === ERR_SUCCESS) {
          this.listItem = res.data
        }
      })
    }
  },
  watch: {
    $route() {
      const { path } = this.$route
      if (path === '/message/unifiedMessage') {
        this._getlist()
      }
    }
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
    width 98%
    padding-bottom 20px
    background-color #fff
    margin-top 10px
    .unified-title
      height 50px
      line-height 50px
      font-size 14px
      text-indent 10px
      background-color #f2f2f2
      span
        margin-left 10px
        padding-left 10px
        border-left 2px solid #00bafa
        color #333
  .active
    border 1px solid #c2c2c2
  .unified-content
    margin-top 10px
    margin-bottom 20px
    overflow hidden
    li
      float left
      margin-bottom 10px
      width 33.3%
      height 172px
      .unified-item
        margin 0 auto
        padding 10px 15px
        width 90%
        background-color #fff
        border 1px solid #fff
        &:hover
          border 1px solid #00bafa
          .way
            display block
      .add-item
        margin 0 auto
        font-size 40px
        padding 10px 15px
        cursor pointer
        width 90%
        height 170px
        line-height 170px
        border 1px solid #f2f2f2
        background-color #f2f2f2
        text-align center
      .title
        height 30px
        line-height 30px
        font-size 14px
      .detail
        font-size 12px
        height 80px;
        p
          line-height 22px
          max-height 64px
          overflow hidden
          position relative
        .more
          &::after
            content:'.....'
            position absolute
            right 0
            bottom 0
            background-color #fff
            display inline-block
            height 20px
            line-height 16px
      .way
        height 40px
        display none
      .way-item
        width 100px
        height 30px
        cursor pointer
        line-height 30px
        font-size 12px
        text-align center
        border 1px solid #00bafa
        color #00bafa
        display inline-block
        float right
        margin-left 30px

</style>
