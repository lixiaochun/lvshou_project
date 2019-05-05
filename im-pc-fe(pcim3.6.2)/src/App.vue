<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'app'
}
$(document).keydown(function(e) {
  if (e.keyCode == 116) {
    location.reload()
  }
})

</script>
<style lang="less">
@import './assets/style/style.css';
@import './assets/style/commonCss.less';
#app {
  font-family: 'PingFangSC-Regular', 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  position: fixed;
  width: 100%;
  height: 100%;
  top: 0;
  border-radius: 5px;
}
</style>
