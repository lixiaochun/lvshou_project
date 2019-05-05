<template>
  <div class="webIframe flex flex-align-center flex-pack-end" @click.stop="close">
    <div class="webWindow" @click.stop="stop">
      <div class="window-header flex  flex-pack-center line_xi_after">
        好享瘦
        <img class="header-close no-drag" src="../assets/img/header/icon_close.png" alt="" @click.stop="close">
      </div>
      <div class="iframe-box" v-loading="isLoading">
        <iframe id="show-iframe" width="100%" height="100%" frameborder=0 scrolling=auto :src="webUrl"></iframe>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'webIframe',
  props: {
    webUrl: {
      type: String,
      default: function() {}
    }
  },
  watch: {
    webUrl(value) {}
  },
  data() {
    return {
      isLoading: true
    }
  },
  mounted() {
    var iframe = document.getElementById('show-iframe')
    iframe.onload = () => {
      this.isLoading = false
    }
  },
  methods: {
    stop() {},
    close() {
      this.$emit('closeWebIframe', false)
    }
  }
}
</script>
<style lang="less">
.webIframe {
  position: fixed;
  width: 100%;
  height: 100%;
  .webWindow {
    width: 375px;
    height:100%;
    background: rgba(255, 255, 255, 1);
    .window-header {
      width: 100%;
      font-size: 18px;
      color: #657293;
      text-align: center;
      line-height: 40px;
      position: relative;
      img {
        width: 11px;
        height: 11px;
        position: absolute;
        top: 15px;
        right: 15px;
        cursor: pointer;
      }
      &:after {
        width: 100%;
        position: absolute;
        right: 0;
        left: 0;
        bottom: 0px;
        height: 1px;
        content: '';
        margin: auto;
        -webkit-transform: scaleY(0.5);
        transform: scaleY(0.5);
        background-color: rgba(129, 141, 207, 0.16);
      }
    }
    .iframe-box {
      width: 100%;
      height: calc(100% - 40px);
    }
  }
}
</style>