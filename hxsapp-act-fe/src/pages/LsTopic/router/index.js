/*
* @desc 页面的路由文件
* @Author zhoudihang@lvshou.com
* */

const routes = [
  {
    path: '/NoFatInWinter/:topicId',
    name: 'NoFatInWinter',
    description: '冬天不养膘', // 备注
    baiduId: 'e71f1b90d60d694defc7afc54e3f784e', // 备份
    component: r => $baidu('e71f1b90d60d694defc7afc54e3f784e', require.ensure([], () => r(require(`../views/NoFatInWinter/index.vue`)), 'NoFatInWinter'))
  },
  {
    path: '/weightLossPartner/:topicId',
    name: 'weightLossPartner',
    description: '减肥征搭档', // 备注
    baiduId: 'cd7c27f092fd41ddf0531affe2133dd7', // 备份
    component: r => $baidu('cd7c27f092fd41ddf0531affe2133dd7', require.ensure([], () => r(require(`../views/weightLossPartner/index.vue`)), 'weightLossPartner'))
  },
  {
    path: '/smallWeightLossTarget/:topicId',
    name: 'smallWeightLossTarget',
    description: '2019减肥小目标', // 备注
    baiduId: 'a190906aafab3bbac85aeb8e1ca88b14', // 备份
    component: r => $baidu('a190906aafab3bbac85aeb8e1ca88b14', require.ensure([], () => r(require(`../views/smallWeightLossTarget/index.vue`)), 'smallWeightLossTarget'))
  },
  {
    path: '/starPackageOne/:newshopDetail',
    name: 'starPackageOne',
    description: '明星套餐一', // 备注 （支撑380广告位）：明星套餐一
    baiduId: '9bd88eace45a01b698bb0a12d06d8b9a', // 备份
    component: r => $baidu('9bd88eace45a01b698bb0a12d06d8b9a', require.ensure([], () => r(require(`../views/starPackageOne/index.vue`)), 'StarPackageOne'))
  },
  {
    path: '/starPackageTwo/:newshopDetail',
    name: 'starPackageTwo',
    description: '明星套餐二', // 备注 （支撑380广告位）：明星套餐二
    baiduId: '2887b3813d68ed8e6043cf644180f206', // 备份
    component: r => $baidu('2887b3813d68ed8e6043cf644180f206', require.ensure([], () => r(require(`../views/starPackageTwo/index.vue`)), 'starPackageTwo'))
  },
  {
    path: '/starPackageThree/:newshopDetail',
    name: 'starPackageThree',
    description: '明星套餐三', // 备注 （支撑380广告位）：明星套餐三
    baiduId: '4e76c73fa37d3a4d3991028611307803', // 备份
    component: r => $baidu('4e76c73fa37d3a4d3991028611307803', require.ensure([], () => r(require(`../views/starPackageThree/index.vue`)), 'starPackageThree'))
  },
  {
    path: '/punchTheClock/:topicId',
    name: 'punchTheClock',
    description: '每天吃水果打卡', // 每天吃水果打卡
    baiduId: 'c6d4c203758ce94eb13fd2ad98156603', // 备份
    component: r => $baidu('c6d4c203758ce94eb13fd2ad98156603', require.ensure([], () => r(require(`../views/punchTheClock/index.vue`)), 'punchTheClock'))
  },
  {
    path: '/SunshineAlone/:topicId',
    name: 'SunshineAlone',
    description: '晒单有礼', // 每天吃水果打卡
    baiduId: '67853a060f049c7c06b069336e46fdd3', // 备份
    component: r => $baidu('67853a060f049c7c06b069336e46fdd3', require.ensure([], () => r(require(`../views/SunshineAlone/index.vue`)), 'SunshineAlone'))
  },
  {
    path: '/smartRunningShoes/:topicId',
    name: 'smartRunningShoes',
    description: '智能跑鞋，助力享瘦', // 智能跑鞋，助力享瘦
    baiduId: '3b703a0d90223609adc2a79ed2926fd4', // 备份
    component: r => $baidu('3b703a0d90223609adc2a79ed2926fd4', require.ensure([], () => r(require(`../views/smartRunningShoes/index.vue`)), 'smartRunningShoes'))
  },
  {
    path: '/WomenDay/:topicId',
    name: 'WomenDay',
    description: '女人节的许愿池', // 女人节的许愿池
    baiduId: '7395787b521e87078a4264e0ffa02259', // 备份
    component: r => $baidu('7395787b521e87078a4264e0ffa02259', require.ensure([], () => r(require(`../views/WomenDay/index.vue`)), 'WomenDay'))
  }
  // 
]

// 添加百度埋点
const insertBaiduPoint = async (baiduId) => {
  var hm = document.createElement('script');
  hm.src = 'https://hm.baidu.com/hm.js?' + baiduId;
  hm.id = 'baidu_hm';
  hm.setAttribute('data-id', baiduId);
  // 如果有百度埋点并且埋点和当前埋点不一致时，先移除埋点，再添加埋点
  var baidu_point = document.getElementById(hm.id);
  if (baidu_point) {
    var baidu_point_id = baidu_point.getAttribute('data-id');
    if (baidu_point_id !== baiduId) {
      window._htm = [];
      document.removeChild(baidu_point);
    } else {
      // 如果有百度埋点并且埋点和当前埋点一致 则终止执行
      return false;
    }
  }
  var s = document.getElementsByTagName('script')[0];
  await s.parentNode.insertBefore(hm, s);
}

// 调用百度埋点
const $baidu = (baiduId, fun) => {
  insertBaiduPoint(baiduId) // 百度ID
  if (fun) {
    return fun
  }
}

export default routes
