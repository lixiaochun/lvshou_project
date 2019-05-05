import Vue from 'vue'
import Router from 'vue-router'
import home from '@/pages/home'
Vue.use(Router)
export default new Router({
    mode: 'history',
    base: '/pcIm/',
    routes: [{
            path: '/',
            name: 'index',
            component: home
        },
        {
            path: '/home',
            name: 'home',
            component: home
        },
        {
            path: '*',
            redirect: "/"
        }
    ]
})