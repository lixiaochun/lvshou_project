<template>
  <c-dialog title="新增文章" @close="goBack" :hasAnimation="hasAnimation">
    <div class="add-article-wrapper">
      <ul class="add-article-item" v-if="loading">
        <li v-for="item in articleLayoutList" :key="item.title"  @click="liAction(item.id, item.layoutName)">
          <div class="item">
            <span>{{ item.id }}</span>
            <div><img :src="item.img"/></div>
            <p>{{ item.layoutName }}</p>
          </div>
        </li>
      </ul>
      <div class="loading" v-else>
        <c-loading size="45px"></c-loading>
      </div>
    </div>
  </c-dialog>
</template>

<script type="text/ecmascript-6">
import { Button, Input, DatePicker, Select, Option, Message } from 'element-ui'
import cDialog from 'base/c-dialog/c-dialog'
import cLoading from 'base/c-loading/c-loading'
import { ERR_SUCCESS } from 'api/config'
import { getArticleLayoutList } from 'api/user'

export default {
  data() {
    return {
      loading: false,
      userInfo: '',
      articleLayoutList: [
        { id: 1, img: require('@/static/1.png'), layoutName: '小图' },
        { id: 2, img: require('@/static/2.png'), layoutName: '横图' },
        { id: 3, img: require('@/static/3.png'), layoutName: '三图' }
      ],
      hasAnimation: true
    }
  },
  created() {
    this._getArticleLayoutList()
  },
  methods: {
    _getArticleLayoutList() {
      getArticleLayoutList().then(res => {
        if (res.code === ERR_SUCCESS) {
          const data = res.data.articleLayoutList
          const articleLayoutList = this.articleLayoutList.slice()
          for (const d of data) {
            const layoutName = d.layoutName
            for (const a of articleLayoutList) {
              if (layoutName === a.layoutName) {
                a.id = d.id
              }
            }
          }
          this.articleLayoutList = articleLayoutList
          this.loading = true
        } else {
          Message.success('操作成功')
        }
      })
    },
    goBack() {
      this.$router.go(-1)
    },
    liAction(id, name) {
      this.hasAnimation = false
      // eslint-disable-next-line standard/object-curly-even-spacing
      this.$router.replace({ path: '/content/contentEdit', query: { id, name }})
    }
  },
  components: {
    [Select.name]: Select,
    [Option.name]: Option,
    [DatePicker.name]: DatePicker,
    [Input.name]: Input,
    [Button.name]: Button,
    cDialog,
    cLoading
  }
}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~common/css/variable"
  @import "~common/css/mixin"

  .add-article-wrapper
    padding 10px 15px
    width 620px
    height 200px
    .add-article-item
      li
        position relative
        float left
        width 33.3%
        height 200px
        cursor pointer
        text-align center
        color #fff
        .item
          width 90%
          span
            width 100%
            display inline-block
            background #00bafa
            line-height 30px
          img
            width 100%
            height 120px
          p
            position absolute
            height 30px
            width 188px
            line-height 30px
            background rgba(0,0,0,0.4)
    .add-appointment-button
      text-align right
      button
        margin-right 15px
        width 105px
    .add-appointment-line
      margin 15px 0
      width 100%
      border-top 1px solid #dcdcdc
.loading
  margin-top 24px
  width 100%
  text-align center
</style>
