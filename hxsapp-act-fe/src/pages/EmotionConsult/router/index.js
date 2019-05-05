/*
* @desc 页面的路由文件
* @Author chenweiliang@lvshou.com(Ocean)
* */
const routes = [
  {
    path: '/',
    redirect: '/index'
  },
  {
    path: '/index',
    name: 'index',
    component: r => require.ensure([], () => r(require(`../views/index/index.vue`)), 'Index')
  },
  {
    path: '/share',
    name: 'share',
    component: r => require.ensure([], () => r(require(`../views/index/share.vue`)), 'Share')
  },
  {
    path: '/item',
    name: 'item',
    component: r => require.ensure([], () => r(require(`../views/index/item.vue`)), 'Item')
  }
]

export default routes
