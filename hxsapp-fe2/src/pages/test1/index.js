// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from "vue";
import Bootstrap from "@/bootstrap";
import Router from "@/router";
import routerConfig from "./router";
Vue.config.productionTip = false;

/* eslint-disable no-new */

// 启动app
Bootstrap({
  Router,
  routerConfig
  //store
});
