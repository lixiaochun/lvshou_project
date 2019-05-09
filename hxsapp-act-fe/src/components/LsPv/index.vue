<template>
  <div class="wrapper pvNum" v-if="isShow">
    <b class="left-line" :style="boxSty"></b>
    <b class="right-line" :style="boxSty"></b>
    <i class="left" :style="boxSty"></i>
    <h5 class="editBox" :style="boxSty">{{pvNum}}人参加</h5>
    <i class="right" :style="boxSty"></i>
  </div>
</template>

<script>
import LvshouFetch from 'Api/common'
import { urlGet } from 'Utils/common'
// import { Toast } from 'mint-ui'

export default {
  name: 'ls-pv',
  props: {
    isBg: {
      type: String,
      default: () => ''
    }
  },
  data() {
    return {
      isShow: true,
      pvNum: 0
    }
  },
  mounted() {
    this.getPv();
  },
  computed: {
    boxSty() {
      if (this.isBg) {
        return `background-color: ${this.isBg}`
      }
      return ''
    }
  },
  methods: {
    async getPv() {
      const data = {
        act_id: urlGet('id'),
        sess_token: urlGet('sess_token'),
        utime: urlGet('utime'),
        sign: urlGet('sign')
      }
      if (!data.sess_token) {
        // Toast('sess_token 缺失!')
        return
      }
      const pvData = await LvshouFetch({
        url: 'https://act.hxsapp.com/base/Api/pv',
        data
      })
      this.pvNum = pvData.sum
    }
  }
}
</script>

<style lang="less" scoped>
@import "../../assets/less/var";
.wrapper {
  position: fixed;
  right: 10px;
  top: 0;
  width: 160px;
  height: 60px;
  -webkit-transform: translateZ(0);
  h5 {
    font-size: 25px;
    margin: 27px auto 0;
    height: 31px;
    line-height: 31px;
    font-weight: 400;
    text-align: center;
    width: 80%;
    color: #fff;
  }
  .editBox {
    position: absolute;
    left: 8px; /*no*/
    background-color: @top-pv-bg;
    z-index: 99;
  }
  b {
    position: absolute;
    top: 0;
    width: 2px; /*no*/
    height: 30px;
    background-color: @top-pv-bg;
    z-index: 88;
    &.left-line {
      left: 30px;
    }
    &.right-line {
      right: 30px;
    }
  }
  i {
    position: absolute;
    bottom: 2px;
    display: inline-block;
    width: 30px;
    height: 30px;
    border-radius: 50%;
    background-color: @top-pv-bg;
    z-index: 88;
    &.left {
      left: 0;
    }
    &.right {
      right: 0;
    }
  }
}
</style>
