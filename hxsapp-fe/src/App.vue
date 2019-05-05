<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>

import maMixin from './util/marMixin.js'

export default {
  name: 'app',
  mixins: [maMixin]
}
</script>
<style>
@import './assets/style/commonCss.less';
</style>
