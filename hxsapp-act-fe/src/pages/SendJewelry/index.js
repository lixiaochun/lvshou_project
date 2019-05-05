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
//import  Share from './lib/util/share'
/*
*type=true 开启分享给你
LsShareInit(type,{
     shareLink: 'url',//分享的连接
    shareTitle: 'title',//分享的标题
    shareImages: 'image',//分享的图片
    shareDescr: 'content',//分享的内容
    shareType: ''
} )  自定义的传值
*/
//Share.LsShareInit(true);

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
