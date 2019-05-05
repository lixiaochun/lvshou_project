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
    path: '/test1',
    name: 'test1',
    component: r => require.ensure([], () => r(require(`../views/test1/index.vue`)), 'Test1')
  },
  {
    path: '/protocol',
    name: 'protocol',
    component: r => require.ensure([], () => r(require(`../views/protocol/index.vue`)), 'Protocol')
  },
  {
    path: '*',
    redirect: '/index'
  }
]

export default routes
