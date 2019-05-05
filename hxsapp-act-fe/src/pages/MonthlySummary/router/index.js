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
  }
]

export default routes
