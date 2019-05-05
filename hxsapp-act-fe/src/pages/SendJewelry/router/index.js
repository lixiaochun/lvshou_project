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
    path: '/index/:topicId',
    name: 'index',
    component: r => require.ensure([], () => r(require(`../views/index/index.vue`)), 'Index')
  },
  {
    path: '/item/:topicId',
    name: 'item',
    component: r => require.ensure([], () => r(require(`../views/index/item.vue`)), 'Item')
  },
  {
    path: '/share',
    name: 'share',
    component: r => require.ensure([], () => r(require(`../views/index/share.vue`)), 'share')
  }
]

export default routes
