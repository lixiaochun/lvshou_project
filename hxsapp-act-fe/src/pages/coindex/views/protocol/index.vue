<template>
  <div>
    <h5>站内协议</h5>
    <el-button
      @click="test('https://hxsapp_scancode')"
      type="success"
      style="display:block;"
    >H5通知客户端调起扫一扫，扫描完成后打开H5(https://hxsapp_scancode)</el-button>
    <el-button
      @click="test('https://hxsapp_comeback')"
      type="success"
      style="display:block;"
    >H5返回上一页('https://hxsapp_comeback')</el-button>
    <el-button
      @click="test('https://hxsapp_gene_report#222')"
      type="success"
      style="display:block;"
    >查看指定基因报告(https://hxsapp_gene_report#222)</el-button>
    <el-button
      @click="test('https://hxsapp_openim_page?service_id=1&title=标题')"
      type="success"
      style="display:block;"
    >H5页面调原生im单聊窗口('https://hxsapp_openim_page?service_id=1&title=标题')</el-button>
    <el-button
      @click="test('https://hxsapp_close')"
      type="success"
      style="display:block;"
    >h5需要关闭app内原生浏览器('https://hxsapp_close')</el-button>
    <el-button
      @click="test('https://hxsapp_comeback')"
      type="success"
      style="display:block;"
    >H5返回上一页('https://hxsapp_comeback')</el-button>
    <el-button
      @click="test('https://hxsapp_showloginpage')"
      type="success"
      style="display:block;"
    >H5 弹出登录窗协议('https://hxsapp_showloginpage')</el-button>
    <el-button
      @click="test('https://hxsapp_new_webview#https://www.baidu.com')"
      type="success"
      style="display:block;"
    >跳转web浏览器新窗口('https://hxsapp_new_webview#https://www.baidu.com')</el-button>
    <el-button
      @click="test('https://hxsapp_user_info#2222')"
      type="success"
      style="display:block;"
    >跳转个人主页('https://hxsapp_user_info#2222')</el-button>
    <el-button
      @click="test('https://hxsapp_jump_dynamic#400')"
      type="success"
      style="display:block;"
    >跳转写动态页面('https://hxsapp_jump_dynamic#400')</el-button>
    <el-button
      @click="test('https://hxsapp_newdynamic#333#活动话题字符串#1')"
      type="success"
      style="display:block;"
    >跳转活动写动态页面，如果发布成功:重新刷新网页('https://hxsapp_newdynamic#333#活动话题字符串#1')</el-button>
    <el-button
      @click="test('https://hxsapp_jump_myactivity#0')"
      type="success"
      style="display:block;"
    >0任务福利-已参加('https://hxsapp_jump_myactivity#0')</el-button>
    <el-button
      @click="test('https://hxsapp_jump_myactivity#1')"
      type="success"
      style="display:block;"
    >1任务福利-我的福利 ('https://hxsapp_jump_myactivity#1')</el-button>
    <el-button
      @click="test('https://hxsapp_jump_myactivity#2')"
      type="success"
      style="display:block;"
    >2任务福利-进行中('https://hxsapp_jump_myactivity#2')</el-button>
    <el-button
      @click="test('https://hxsapp_get_network_state')"
      type="success"
      style="display:block;"
    >客户端向h5返回当前网络状态('https://hxsapp_get_network_state')</el-button>
    <el-button
      @click="test('https://hxsapp_set_audio_info')"
      type="success"
      style="display:block;"
    >隐藏音频窗口('https://hxsapp_set_audio_info')</el-button>
    <el-button
      @click="test('https://hxsapp_set_audio_info#pause')"
      type="success"
      style="display:block;"
    >隐藏暂停音频</el-button>
    <el-button
      @click="test('https://hxsapp_photo_share#分享标题#分享的type')"
      type="success"
      style="display:block;"
    >分享当前截屏图片('https://hxsapp_photo_share#分享标题#分享的type')</el-button>
    <el-button
      @click="test('https://hxsapp_jump_weighing')"
      type="success"
      style="display:block;"
    >去称重(体脂秤)页面('https://hxsapp_jump_weighing')</el-button>
    <el-button
      @click="test('https://hxsapp_jump_newdynamic')"
      type="success"
      style="display:block;"
    >去发新动态页面('https://hxsapp_jump_newdynamic')</el-button>
    <el-button
      @click="test('https://hxsapp_jump_foodrecord')"
      type="success"
      style="display:block;"
    >记录饮食页面('https://hxsapp_jump_foodrecord')</el-button>
    <el-button
      @click="test('https://hxsapp_jump_sportrecord')"
      type="success"
      style="display:block;"
    >记录运动页面('https://hxsapp_jump_sportrecord')</el-button>
    <el-button
      @click="test('https://hxsapp_jump_dynamiccircle')"
      type="success"
      style="display:block;"
    >去动态-享瘦圈('https://hxsapp_jump_dynamiccircle')</el-button>
    <el-button
      @click="test('https://hxsapp_jump_slimmingcourselist')"
      type="success"
      style="display:block;"
    >运动课程列表页('https://hxsapp_jump_slimmingcourselist')</el-button>
    <el-button
      @click="test('https://hxsapp_jump_articlelist')"
      type="success"
      style="display:block;"
    >去资讯列表页('https://hxsapp_jump_articlelist')</el-button>
    <el-button
      @click="test('https://hxsapp_accomplish_tasks_tip')"
      type="success"
      style="display:block;"
    >用户完成每日任务底部提示行为('https://hxsapp_accomplish_tasks_tip')</el-button>
    <el-button
      @click="test('https://hxsapp_accomplish_tasks_tip_none')"
      type="success"
      style="display:block;"
    >隐藏用户完成每日任务底部提示行为('https://hxsapp_accomplish_tasks_tip_none')</el-button>
    <el-button
      @click="test('https://hxsapp_welfare_info#活动标题#奖品名称#https://hxsupload-oss.hxsapp.com/2019-01-03/d4aff7d930423c7bd2d57d79334b52f5.jpg')"
      type="success"
      style="display:block;"
    >福利规则传递活动奖品信息('https://hxsapp_welfare_info#活动标题#奖品名称#https://hxsupload-oss.hxsapp.com/2019-01-03/d4aff7d930423c7bd2d57d79334b52f5.jpg')</el-button>
    <el-button
      @click="test('https://hxsapp_order_info# [{\'ProduceID\':234,\'Quantity\':3}]')"
      type="success"
      style="display:block;"
    >h5向客户端发送商城订单详情('https://hxsapp_order_info# [{\'ProduceID\':234,\'Quantity\':3}]')</el-button>
    <el-button
      @click="test('https://hxsapp_reward#1#23#2222')"
      type="success"
      style="display:block;"
    >用户打赏（支付渠道支付宝=1 微信=2）('https://hxsapp_reward#1#23#2222')</el-button>
    <el-button
      @click="test('https://hxsapp_open_shop_car')"
      type="success"
      style="display:block;"
    >打开购物车('https://hxsapp_open_shop_car')</el-button>
    <el-button
      @click="test('https://hxsapp_add_number_car')"
      type="success"
      style="display:block;"
    >h5商品详情页面上，添加购物车成功后，协议通知app去更新app上的购物车的商品数量('https://hxsapp_add_number_car')</el-button>
    <el-button
      @click="test('https://hxsapp_buy_article_detail?id=22222')"
      type="success"
      style="display:block;"
    >场景：在app内查看文章，如果文章不是免费的，就需要购买，需要h5页面调起app原生实现的购买页面('https://hxsapp_buy_article_detail?id=22222')</el-button>
    <el-button
      @click="test('https://hxsapp_home_page')"
      type="success"
      style="display:block;"
    >跳到主页('https://hxsapp_home_page')</el-button>
    <el-button
      @click="test('https://hxsapp_order_detail?id=12&type=APP')"
      type="success"
      style="display:block;"
    >场景：h5页面去app的订单详情协议('https://hxsapp_order_detail?id=12&type=APP')</el-button>
    <el-button
      @click="test('https://hxsapp_orderlist?sortype=1')"
      type="success"
      style="display:block;"
    >不带参数默认订单列表，全部('https://hxsapp_orderlist?sortype=1')</el-button>
    <el-button
      @click="test('https://hxsapp_navi_bar_state?hidden=1')"
      type="success"
      style="display:block;"
    >hidden = 1 隐藏顶部导航栏,0显示('https://hxsapp_navi_bar_state?hidden=1')</el-button>
    <el-button
      @click="test('https://hxsapp_auto_fill_float_picker?type=height&title=身高&unit=cm&min=20&max=180&curr=150')"
      type="success"
      style="display:block;"
    >自动填充，左右滑动条选择一个期间的数字(带小数点)('https://hxsapp_auto_fill_float_picker?type=height&title=身高&unit=cm&min=20&max=180&curr=150')</el-button>
    <el-button
      @click="test('https://hxsapp_gopage?page_name=com.lvshou.hxs.activity.WelfareActivity')"
      type="success"
      style="display:block;"
    >任务福利--- 安卓('https://hxsapp_gopage?page_name=com.lvshou.hxs.activity.WelfareActivity')</el-button>
    <el-button
      @click="test('https://hxsapp_gopage?page_name=TaskBenefitController')"
      type="success"
      style="display:block;"
    >任务福利--- ios('https://hxsapp_gopage?page_name=TaskBenefitController')</el-button>
    <el-button
      @click="test('https://hxsapp_gopage?page_name=com.lvshou.hxs.activity.shop.ShopActivity')"
      type="success"
      style="display:block;"
    >商城首页--- 安卓('https://hxsapp_gopage?page_name=com.lvshou.hxs.activity.shop.ShopActivity')</el-button>
    <el-button
      @click="test('https://hxsapp_gopage?page_name=MallHomeController')"
      type="success"
      style="display:block;"
    >商城首页--- ios('https://hxsapp_gopage?page_name=MallHomeController')</el-button>
    <el-button
      @click="test('https://hxsapp_caselabels_page?case_id=2222')"
      type="success"
      style="display:block;"
    >案例标签列表页, case_id 默认选择该案例('https://hxsapp_caselabels_page?case_id=2222')</el-button>
    <el-button
      @click="test('https://hxsapp_diary_page?did=1')"
      type="success"
      style="display:block;"
    >调到日记详情页(推荐使用站外H5调用协议，改协议是为了兼容ios8及以下无法识别hxsapp://***做兼容)('https://hxsapp_diary_page?did=1')</el-button>
    <el-button
      @click="test('https://hxsapp_caces_collect?state=1&caces_id=1234')"
      type="success"
      style="display:block;"
    >案例详情的收藏状态 0=未收藏 1=已收藏 caces_id 案例id('https://hxsapp_caces_collect?state=1&caces_id=1234')</el-button>
    <el-button
      @click="test('https://hxsapp_topic_page?topicId=22')"
      type="success"
      style="display:block;"
    >话题详情页,did = 话题id 该协议是为了兼容ios8及以下无法识别hxsapp://***做兼容),应用hxsapp://开头的协议('https://hxsapp_topic_page?topicId=22')</el-button>
    <el-button
      @click="test('https://hxsapp_showkeyboard')"
      type="success"
      style="display:block;"
    >安卓使用，h5设置焦点后，调起安卓键盘(执行弹起键盘代码)('https://hxsapp_showkeyboard')</el-button>
    <el-button
      @click="test('https://hxsapp_circle_detail?id=123')"
      type="success"
      style="display:block;"
    >跳转圈子内页，id=circle_id （圈子id）('https://hxsapp_circle_detail?id=123')</el-button>
    <el-button
      @click="test('https://hxsapp_follow_user?id=123&state=1')"
      type="success"
      style="display:block;"
    >id (要关注用户的id) state (1 关注 0 取消关注)('https://hxsapp_follow_user?id=123&state=1')</el-button>
    <el-button
      @click="test('https://hxsapp_scanordercode')"
      type="success"
      style="display:block;"
    >H5调起摄像头扫描二维码，扫描成功后回调 returnErCode (string) 方法('https://hxsapp_scanordercode')</el-button>
    <el-button
      @click="test('https://hxsapp_dynamicdetail?dynamic_id=666&show_keyboard=false')"
      type="success"
      style="display:block;"
    >打开动态详情 ，showKeyboard代表是否弹出开手机键盘，dynamicId动态详情id('https://hxsapp_dynamicdetail?dynamic_id=666&show_keyboard=false')</el-button>

    <h5>站外协议(用手机浏览器点击)</h5>
    <el-button
      @click="test('hxsapp://home')"
      type="success"
      style="display:block;"
    >打开app并跳到主页('hxsapp://home')</el-button>
    <el-button
      @click="test('hxsapp://web?url=https://www.baidu.com')"
      type="success"
      style="display:block;"
    >调用app浏览器打开url('hxsapp://web?url=https://www.baidu.com')</el-button>
    <el-button
      @click="test('hxsapp://userInfo/index?uid=123')"
      type="success"
      style="display:block;"
    >调用app用户资料('hxsapp://userInfo/index?uid=123')</el-button>
    <el-button
      @click="test('hxsapp://dynamic/detail?dynamicId=111&showKeyboard=true')"
      type="success"
      style="display:block;"
    >动态详情页('hxsapp://dynamic/detail?dynamicId=111&showKeyboard=true')</el-button>
    <el-button
      @click="test('hxsapp://dynamic/subComment?commentId=22&showKeyboard=true')"
      type="success"
      style="display:block;"
    >动态评论子评论详情('hxsapp://dynamic/subComment?commentId=22&showKeyboard=true')</el-button>
    <el-button
      @click="test('hxsapp://userInfo/FansOrFollows?uid=22&isFollowList=true')"
      type="success"
      style="display:block;"
    >用户关注或粉丝列表('hxsapp://userInfo/FansOrFollows?uid=22&isFollowList=true')</el-button>
    <el-button
      @click="test('hxsapp://scheduleBody')"
      type="success"
      style="display:block;"
    >调到原生身体评测('hxsapp://scheduleBody')</el-button>
    <el-button
      @click="test('hxsapp://geneScan')"
      type="success"
      style="display:block;"
    >绿瘦会员2.0基因编码扫描('hxsapp://geneScan')</el-button>
    <el-button
      @click="test('hxsapp://foodAndSportRecord')"
      type="success"
      style="display:block;"
    >绿瘦会员2.0添加饮食运动记录界面('hxsapp://foodAndSportRecord')</el-button>
    <el-button
      @click="test('hxsapp://sportPool')"
      type="success"
      style="display:block;"
    >绿瘦会员2.0，运动库，添加运动记录界面('hxsapp://sportPool')</el-button>
    <el-button
      @click="test('hxsapp://foodPool')"
      type="success"
      style="display:block;"
    >绿瘦会员2.0，食物库，添加饮食记录界面('hxsapp://foodPool')</el-button>
    <el-button
      @click="test('hxsapp://bodyReport?id=123')"
      type="success"
      style="display:block;"
    >绿瘦会员2.0，查看称重报告(id)数据数据，不传id，取用户最后一条报告('hxsapp://bodyReport?id=123')</el-button>
    <el-button
      @click="test('hxsapp://userGirth')"
      type="success"
      style="display:block;"
    >绿瘦会员2.0，身体数据测量(旧版本的围度记录界面)('hxsapp://userGirth')</el-button>
    <el-button
      @click="test('hxsapp://goPage?pageName=com.lvshou.hxs.activity.WelfareActivity')"
      type="success"
      style="display:block;"
    >任务福利 --- 安卓('hxsapp://goPage?pageName=com.lvshou.hxs.activity.WelfareActivity')</el-button>
    <el-button
      @click="test('hxsapp://goPage?pageName=com.lvshou.hxs.activity.shop.ShopActivity')"
      type="success"
      style="display:block;"
    >商城首页 --- 安卓('hxsapp://goPage?pageName=com.lvshou.hxs.activity.shop.ShopActivity')</el-button>
    <el-button
      @click="test('hxsapp://goPage?pageName=com.lvshou.hxs.activity.InvitationActivity')"
      type="success"
      style="display:block;"
    >邀请码 --- 安卓('hxsapp://goPage?pageName=com.lvshou.hxs.activity.InvitationActivity')</el-button>
    <el-button
      @click="test('hxsapp://goPage?pageName=TaskBenefitController')"
      type="success"
      style="display:block;"
    >任务福利 --- ios('hxsapp://goPage?pageName=TaskBenefitController')</el-button>
    <el-button
      @click="test('hxsapp://goPage?pageName=MallHomeController')"
      type="success"
      style="display:block;"
    >商城首页 --- ios('hxsapp://goPage?pageName=MallHomeController')</el-button>
    <el-button
      @click="test('hxsapp://caselabels_page?case_id=111')"
      type="success"
      style="display:block;"
    >案例标签列表页，传案例id('hxsapp://caselabels_page?case_id=111')</el-button>
    <el-button
      @click="test('hxsapp://diary/detail?id=1')"
      type="success"
      style="display:block;"
    >日记详情页('hxsapp://diary/detail?id=1')</el-button>
    <el-button
      @click="test('hxsapp://topicInfo?topicId=32')"
      type="success"
      style="display:block;"
    >话题详情页,did = 话题id('hxsapp://topicInfo?topicId=32')</el-button>
  </div>
</template>

<script>
import {
  userAgent,
  compareAppVersion
} from 'Utils/common'
import { Toast } from 'mint-ui'
export default {
  mounted() {
    alert('版本号验证  ')
    alert(window.navigator.userAgent.split('hxsapp-version-')[1].split('&')[0]) // 
    // alert(compareAppVersion('3.8.0', '3.7.0'))
    window.returnErCode = str => {
      alert(str)
    }
  },
  methods: {
    test(url) {
      window.location.href = url
    },
    go1() {
      if (userAgent() === 'ios') {
        window.location.href = 'hxsapp://scheduleBody'
      } else if (userAgent() === 'and') {
        window.location.href = 'hxsapp://sportPool'
      }
    },
    go2() {
      // window.location.href = 'https://hxsapp_showloginpage' // ios 不行
      window.location.href = 'https://hxsapp_accomplish_tasks_tip'
    },
    go3() {
      window.location.href = 'https://hxsapp_jump_slimmingcourselist'
    }
  }
}
</script>

<style lang="less" scoped>
.el-button {
  margin: 6px auto;
  padding: 25px;
  font-size: 24px;
}
</style>
