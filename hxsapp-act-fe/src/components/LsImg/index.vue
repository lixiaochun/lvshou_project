/** 
@desc 定义公用组件 用于img标签 应对图片过大从而导致页面空白的情况
@author Ocean(chenweiliang@lvshou.com)
@USAGE

props 
  src (type: String) 图片的地址
  imgError: 图片加载出错 显示默认图片 (现在默认图片是不可用的, 有时间要向公司设计拿一个图片) 
  imgSty: img 标签的样式 
*/
<template>
  <div class="ls-img-wrapper" :style="imgBox" @click="imgClick">
    <img :src="url" v-if="ready" :style="imgSty" />
    <img-loader v-else></img-loader>
  </div>
</template>

<script>
import imgLoader from './loader'
import { Toast } from 'mint-ui'

export default {
  name: 'ls-img',
  components: {
    imgLoader
  },
  props: {
    src: {
      type: String,
      required: true
    },
    imgError: {
      type: String,
      default: () => require('../../assets/images/load.gif')
    },
    imgSty: String,
    imgBox: String
  },
  data() {
    return {
      url: '',
      ready: false
    }
  },
  mounted() {
    this.load()
  },
  watch: {
    src() {
      this.load()
    }
  },
  methods: {
    // 图片点击事件
    imgClick() {
      this.$emit('click')
    },
    load() {
      if (!this.src) {
        Toast('图片地址不存在')
      } else {
        let objImg = document.createElement('img')
        objImg.src = this.src || this.imgError
        objImg.onload = e => {
          this.ready = true
          this.url = e.target.src
          objImg = null
        }
        objImg.onerror = () => {
          this.ready = true
          Toast('图片错误')
          this.url = this.imgError
          objImg = null
        }
      }
    }
  }
}
</script>

<style lang="less" scoped>
@import "../../assets/less/mixin.less";
.ls-img-wrapper {
  font-size: 0 !important;
  > img {
    max-width: 100%;
    max-height: 100%;
    flex: 0 0 auto;
    vertical-align: top;
  }
}
</style>
