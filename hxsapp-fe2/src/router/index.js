import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

/*
* @desc 路由的配置函数
* @params {Object} store vuex实例对象
* @params {Object} routers 路由配置
* @params {Object} options 路由参数
* */

const Router = ({routerConfig}) =>{
  // 实例化路由
  const opt = window.location.href.split('/hxswap/')[1].split('/')[0]
  const router = new VueRouter({
    mode:'history',  //去掉路由地址的#
    routes:routerConfig,
    base: `/hxswap/${opt}/`, // 打包后 服务器根目录
    scrollBehavior (to, from, savedPosition) {
      return {
        x: 0,
        y: 0
      }
    } 
  })
  // 路由切换之前
  router.beforeEach(({meta, path}, from, next) => {
      // 这里可以一系列操作 例如页面的登录验证
      // ...

      // 进入路由
      next()
  })

  // 路由已进入 页面准备就绪
  router.afterEach(route => {
        // 进入页面之后 可以做一个切换渐变的操作 避免硬切换
  })

  return router
}
export default Router


