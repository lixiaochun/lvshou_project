// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import VueLazyLoad from 'vue-lazyload'
import { Select, option, badge, message, Input, Form, FormItem, Loading, dialog, button, MessageBox, Tooltip, Carousel, CarouselItem,confirm,Dialog } from 'element-ui';
import store from './store';
Vue.use(Select);
Vue.use(option);
Vue.use(badge);
Vue.use(Input);
Vue.use(Form);
Vue.use(Loading);
Vue.use(FormItem);
Vue.use(button);
Vue.use(dialog);
Vue.use(Tooltip);
Vue.use(Carousel);
Vue.use(CarouselItem);
Vue.use(Dialog);
Vue.prototype.$message = message
Vue.prototype.$msgbox = MessageBox;
Vue.prototype.$alert = MessageBox.alert;
Vue.prototype.$confirm = MessageBox.confirm;
Vue.config.productionTip = false
Vue.use(VueLazyLoad, {
    error: './assets/img/logo.png', //加载错误时的显示图片
    loading: '' //加载过程中的过渡图片
})

import Raven from 'raven-js';
import RavenVue from 'raven-js/plugins/vue';
let __release = "";
let __YOUR_DSN = "";
// https://sentry.io 测试环境
if (process.env.NODE_ENV == "development") {
    __release = "0e4fdef81448dcfa0e16ecc4433ff3997aa53572";
    __YOUR_DSN = 'https://683cda85e8524a139d393f52ab8812e3@sentry.io/1262647';
} else {
    // https://sentry.io 生产环境 － 待补充 
    __release = "0e4fdef81448dcfa0e16ecc4433ff3997aa53572";
    __YOUR_DSN = "https://c406515d0fb042e8a9078a8ac495028c@sentry.io/1262642";
    Raven.config(__YOUR_DSN, {
        release: __release
    }).addPlugin(RavenVue, Vue).install();
}
new Vue({
    el: '#app',
    router,
    store,
    components: { App },
    template: '<App/>',
})