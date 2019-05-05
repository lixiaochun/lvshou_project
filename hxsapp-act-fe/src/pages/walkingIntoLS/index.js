/*
* @Author chenweiliang@lvshou.com(Ocean)
* @desc 独立页面的入口文件
* */

// 引入基础插件
import Vue from 'vue'
import Bootstrap from '@/bootstrap'
import Router from '@/router'
import routerConfig from './router'
import store from './store' // 引入vuex 状态树

// 当前页面所需公用组件
import * as LocalComponents from './components'
import VideoPlayer from 'vue-video-player'
require('video.js/dist/video-js.css')
require('vue-video-player/src/custom-theme.css')
Vue.use(VideoPlayer)

// 入口视图组件
// import Component from './views'

// 注册所在页面的公共组件
Object.values(LocalComponents).forEach(component => {
  Vue.component(component.name, component)
})

// 启动app
Bootstrap({
  Router,
  routerConfig,
  store
})
