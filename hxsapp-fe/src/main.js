// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import axios from 'axios'
// import "babel-polyfill"

// 引入字体文件
import('@/assets/font/lvshouIconfont.css')

// 新的h5与native的通信 url schema处理
require("./util/h5CallApp")

import md5 from 'js-md5';
Vue.prototype.$md5 = md5;

import infiniteScroll from 'vue-infinite-scroll'
Vue.use(infiniteScroll)

import MintUI from 'mint-ui'
import 'mint-ui/lib/style.css'
Vue.use(MintUI);

import VideoPlayer from 'vue-video-player'
require('video.js/dist/video-js.css')
require('vue-video-player/src/custom-theme.css')
Vue.use(VideoPlayer)

import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
Vue.use(ElementUI)

import vueSource from 'vue-resource'
Vue.use(vueSource)
Vue.http.options.emulateJSON = true

import VueLazyload from 'vue-lazyload'

Vue.use(VueLazyload)

Vue.use(VueLazyload, {
  preLoad: 1.3,
  // loading: require("@/assets/img/bg_750_230@3x.png"),
  attempt: 1
})



import VueAwesomeSwiper from 'vue-awesome-swiper'
Vue.use(VueAwesomeSwiper);

Vue.config.productionTip = false

//配置是否允许 vue-devtools 检查代码, 生产环境禁用vue-devtools
Vue.config.devtools = process.env.NODE_ENV !== 'production'

import util from "./util/common"

if (process.env.NODE_ENV !== 'production') {

  window.debuggerLsApp = {
    Vue,
    router,
    util, // 公共方法
    App // 公共组件
  }

}

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
})



