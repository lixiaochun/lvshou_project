<template>
  <div class="wrapper">
    <img
      src="http://hxsapp-fe.oss-cn-hangzhou.aliyuncs.com/201904/h10xbgxw3y26lbzqe2ub566cpy4vcpaz"
    >
    <div class="bottom">
      <span>长按保存图片, 去微信扫一扫</span>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {}
  },
  created() {
    document.title = '好享瘦微信公开课'
  },
  methods: {
  }
}
</script>

<style lang="less" scoped>
.wrapper {
  font-size: 0px;
  img {
    width: 100%;
    height: 100%;
  }
  .bottom {
    height: 80px;
    line-height: 80px;
    text-align: center;
    background-color: #fff;
    font-size: 33px;
    font-weight: 600;
  }
}
</style>
