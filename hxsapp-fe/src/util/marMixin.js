import marRoute from './marRoute';

export default {
  watch: {
    '$route'(newValue, oldValue) {
      // console.log('newValue oldValue', newValue, oldValue)
      if (newValue.path === '/geneProgress') return
      Mar.PageProcess.spaInit({
        oldValue: oldValue,
        newValue: newValue,
        // marRoute: marRoute
      })
    }
  },
  mounted() {
    window.hxs_config_maq = [];

    function S4() {
      // 十六进制数0x10000转成十进制数是65536
      return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
    }

    var __guid = (S4() + S4() + "-" + S4() + "-" + S4() + "-" + S4() + "-" + S4() + S4() + S4());

    // 首次进入，不会触发路由更新，所以要在这里读取配置文件中对当前页的定制信息
    if (0 && this.$route.name && this.$route.name in marRoute) {
      hxs_config_maq.push([
        'pages_init_' + ((new Date()).getTime()),
        marRoute[this.$route.name]
      ]);
    }

    var ma = document.createElement('script');
    var config = {};

    // config.platform必须为以下三者之一：['HxsApp', 'LvShou', 'HxsAdminPc']，否则不埋点。
    config.platform = 'HxsApp';
    ma.config = JSON.stringify(config);
    ma.type = 'text/javascript';
    ma.id = "hxs_config_maq_" + __guid;
    ma.async = true;
    ma.src = " https://misc.hxsapp.com/mars/mars_h5.js?_t=" + ((new Date()).getTime()) + "";
    // debugger
    var s = document.getElementsByTagName('head')[0];
    s.appendChild(ma);

    ma.onload = function () {
      // spaInit可以传入一个对象，目前可以传入的字段包括：
      // expireTime，可以控制用户访问session的超时时间，单位为分钟（默认10分钟），可不传；
      Mar.PageProcess.spaInit()
    }
  },
  beforeDestroy() {
    var scriptArray = Mar.Util.getScriptElementArray('hxs_config_maq');
    scriptArray.forEach(function (script) {
      script.parentNode.removeChild(script);
    })
  }
}
