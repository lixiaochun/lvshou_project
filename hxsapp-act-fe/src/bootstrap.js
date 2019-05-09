/*
* @desc 多页面公共入口文件
* @Author chenweiliang@lvshou.com (Ocean)
* */
import Vue from 'vue'
import VueResource from 'vue-resource'
import App from './App'
// 引入mint-ui UI框架
import MintUI from 'mint-ui'
// import VueVideoPlayer from 'vue-video-player'
import ElementUI from 'element-ui'
// import 'video.js/dist/video-js.css'
import 'mint-ui/lib/style.css'
// 引入自适应设计的观察者程序
import '@/lib/utils/lib-flexible'
// 导入css reset
import 'normalize.css'
import './assets/less/public.less'

import VueLazyload from 'vue-lazyload'

// 全局公用组件
import * as Components from '@/components'

// vuex 状态树管理
// import store from './store'

import 'element-ui/lib/theme-chalk/index.css'
Vue.use(ElementUI)

Vue.use(VueLazyload, {
  preLoad: 1.3,
  attempt: 1
})

// Vue.use(ElementUI)
// Vue.use(VueVideoPlayer)
// ajax插件使用 vue-resource
Vue.use(VueResource)

Vue.use(MintUI)

// 配置以application/x-www-form-urlencoded方式
Vue.http.options.emulateJSON = true

// REST/HTTP方式
// Vue.http.options.emulateHTTP = true

const Bootstrap = ({ Router, Component, routerConfig, store, options }) => {
  // 注册全局组件
  Object.values(Components).forEach(component => {
    Vue.component(component.name, component)
  })

  // 实例化路由
  const router = Router ? Router(store, routerConfig, options) : {}

  // 定义入口视图
  const renderComponent = Component || App

  /* eslint-disable no-new */
  new Vue({
    el: '#app',
    render: h => h(renderComponent),
    store,
    router
  })
  if (module.hot) {
    module.hot.accept()
  }
}

export default Bootstrap
