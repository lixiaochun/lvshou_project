<template>
  <div class="wrapper lsLoading" v-if="isLoading">
    <img
      src="http://hxsapp-fe.oss-cn-hangzhou.aliyuncs.com/201905/8pbii2k4gcvcysk1708oihewqh8ufcd2"
    >
  </div>
</template>

<script>
export default {
  name: 'ls-loading',
  data() {
    return {
      isLoading: true
    }
  },
  mounted() {
    this.$nextTick(() => {
      this.loadingState()
    })
  },
  methods: {
    loadingState() {
      var that = this;
      if (document.readyState === 'complete') {
        that.isLoading = false;
        return;
      }
      document.onreadystatechange = () => {
        const _readyState = document.readyState
        if (_readyState === 'complete' || _readyState === 'loaded') {
          setTimeout(() => {
            that.isLoading = false
          }, 200)
        }
      }
    }
  }
}

</script>

<style lang="less" scoped>
.wrapper {
  position: fixed;
  top: 0;
  left: 0;
  background-color: #fff;
  width: 100%;
  height: 100%;
  z-index: 999;

  img {
    position: absolute;
    top: 50%;
    left: 50%;
    width: 260px;
    height: auto;
    transform: translate(-50%, -50%);
  }
}
</style>
