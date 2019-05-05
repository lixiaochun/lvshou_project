// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from "vue";
import Bootstrap from "@/bootstrap";
import Router from "@/router";
import routerConfig from "./router";
import store from './store' //引入vuex状态树
//import App from './index.vue'
// 当前页面所需公用组件
import * as LocalComponents from "./components";
Vue.config.productionTip = false;
// 注册所在页面的公共组件
Object.values(LocalComponents).forEach(component => {
  Vue.component(component.name, component);
});
// 启动app
Bootstrap({
  Router,
  routerConfig,
  store
});
