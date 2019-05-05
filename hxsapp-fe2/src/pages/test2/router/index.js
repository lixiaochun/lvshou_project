const routes = [
  {
    path: '/index',
    name: 'test2',
    component:resolve => require(['../views/index/index.vue'],resolve)
  },
  {
    path: '/OneDay',
    name: 'OneDay',
    component:resolve => require(['../views/OneDay/index.vue'],resolve)
  }
]

export default routes

