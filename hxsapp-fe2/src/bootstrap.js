// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from "vue";
import App from "./App";
import $ from 'jquery'
 import 'babel-polyfill'
// 引入自适应设计的观察者程序
import '@/lib/utils/lib-flexible'
import './assets/css/normalize.css'
// 引入字体文件
import('@/assets/font/lvshouIconfont.css')
import 'mint-ui/lib/style.css'
import 'element-ui/lib/theme-chalk/index.css';

import md5 from 'js-md5';
Vue.prototype.$md5 = md5;

import infiniteScroll from 'vue-infinite-scroll'
Vue.use(infiniteScroll)

import MintUI from 'mint-ui'
Vue.use(MintUI);

import ElementUI from 'element-ui';
Vue.use(ElementUI)

import VueLazyload from 'vue-lazyload'
Vue.use(VueLazyload, {
  preLoad: 1.3,
  attempt: 1
})
import VueAwesomeSwiper from 'vue-awesome-swiper'
Vue.use(VueAwesomeSwiper);

Vue.config.productionTip = false;

// 全局公用组件
import * as Components from '@/components'

const Bootstrap = ({ Router, routerConfig, store }) => {
  // 注册全局组件
  Object.values(Components).forEach(component => {
    Vue.component(component.name, component)
  })
  // 实例化路由
  const router = Router({ routerConfig });
  new Vue({
    el: "#app",
    render: h => h(App),
    store,
    router
  });
};

export default Bootstrap;
