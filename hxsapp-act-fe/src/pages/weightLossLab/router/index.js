/*
* @desc 页面的路由文件
* @Author chenweiliang@lvshou.com(Ocean)
* */
const routes = [
  {
    path: '/',
    redirect: '/index/:topicId'
  },
  {
    path: '/index/:env/:topicId',
    name: 'index',
    component: r => require.ensure([], () => r(require(`../views/index/index.vue`)), 'Index')
  },
  {
    path: '/topic/:topicId',
    name: 'topic',
    component: r => require.ensure([], () => r(require(`../views/topic/index.vue`)), 'Topic')
  },
  {
    path: '/web',
    name: 'web',
    component: r => require.ensure([], () => r(require(`../views/web/index.vue`)), 'Web')
  }
]

export default routes
