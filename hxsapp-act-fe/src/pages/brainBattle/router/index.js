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
    path: '/index/:topicId',
    name: 'index',
    component: r => require.ensure([], () => r(require(`../views/index/index.vue`)), 'Index')
  },
  {
    path: '/rules/:topicId',
    name: 'rules',
    component: r => require.ensure([], () => r(require(`../views/rules/index.vue`)), 'Rules')
  },
  {
    path: '/answer/:topicId',
    name: 'answer',
    component: r => require.ensure([], () => r(require(`../views/answer/index.vue`)), 'Answer')
  },
  {
    path: '/endOfAnswer/:topicId',
    name: 'endOfAnswer',
    component: r => require.ensure([], () => r(require(`../views/endOfAnswer/index.vue`)), 'EndOfAnswer')
  },
  {
    path: '/rankingList/:topicId',
    name: 'rankingList',
    component: r => require.ensure([], () => r(require(`../views/rankingList/index.vue`)), 'RankingList')
  },
  {
    path: '/share/:topicId',
    name: 'share',
    component: r => require.ensure([], () => r(require(`../views/share/index.vue`)), 'Share')
  },
  {
    path: '/treasureBox/:topicId',
    name: 'treasureBox',
    component: r => require.ensure([], () => r(require(`../views/treasureBox/index.vue`)), 'treasureBox')
  }
]

export default routes
