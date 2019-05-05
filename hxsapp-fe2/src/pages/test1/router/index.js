const routes = [
  {
    path: '/',
    redirect: '/index'
  },
  {
    path: '/index',
    name: 'test1',
    component:resolve => require(['../views/index/index.vue'],resolve)
  }
]

export default routes

