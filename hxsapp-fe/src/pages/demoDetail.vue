<template>
  <div id="demoDetailBox">
    <!-- 站外h5的注册头部模块 -->
    <goSignPage v-if="!isApp">
    </goSignPage>

    <div class="video-player" v-if="initDetailPlayerDataBoolean">
      <!-- 阿里云播放器 -->
      <div v-if="!isClose && !isAndroid" class="close-player" @click="hidePlayer()">
        <img src="../assets/img/close_btn_video.png" alt="">
      </div>

      <!-- 阿里云播放器 -->
      <aliyunPlayer v-if="!isClose" class="alyPlayerBox" pageSoure="demoDetail" :media_id="initDetailPageInfo.info.media_data.id" :sourceUrl="initDetailPageInfo.info.media_data.link" :coverUrl="initDetailPageInfo.info.media_data.cover">
      </aliyunPlayer>
      <div class="android-btn-box" v-if="!isClose && isAndroid">
        <span class="android-btn" @click="hidePlayer()">
          <i>关闭视频</i>
        </span>
      </div>
    </div>

    <div class="title_box" v-if="initDetailPageInfo && initDetailPageInfo.info && initDetailPageInfo.info.title">
      <p>
        {{initDetailPageInfo.info.title}}
      </p>
    </div>

    <div class="change_background"></div>

    <div class="demo_detail_box" v-if="initDetailPageInfo && initDetailPageInfo.info">
      <!-- 个人头部 -->
      <div class="title_header">
        <p>
          个人档案
        </p>
        <p v-if="initDetailPageInfo && initDetailPageInfo.info && initDetailPageInfo.info.time">
          发布时间：{{initDetailPageInfo.info.time}}
        </p>
      </div>
      <!-- 个人信息区域 -->
      <div class="info_box" v-if="initDetailPageInfo && initDetailPageInfo.user">
        <div class="info_img" @click="goDynamicPage">
          <img :src="initDetailPageInfo.user.head_img" />
          <i class="hot-v" v-if="initDetailPageInfo.user.v && initDetailPageInfo.user.v == 1"></i>
          <i class="blue-v" v-if="initDetailPageInfo.user.is_adviser
 && initDetailPageInfo.user.is_adviser == 1 "></i>
        </div>
        <div class="info_main">
          <div class="gz_btn" @click="followBtn" v-if="is_follow && initDetailPageInfo.user.is_mine == 'no' && initDetailPageInfo.user.isFollowed && initDetailPageInfo.user.isFollowed == 'no' ">
            关注
          </div>
          <ul>
            <li class="one_li">
              <p class="name">
                {{initDetailPageInfo.user.nickname}}
              </p>
              <i v-if="initDetailPageInfo.user.sex==1 " class="man"></i>
              <i v-if="initDetailPageInfo.user.sex== 0 " class="woman"></i>
              <p class="age" v-if="initDetailPageInfo.user.age && initDetailPageInfo.user.age.length">
                {{initDetailPageInfo.user.age}}岁
              </p>
            </li>
            <li class="two_li">
              <p class="height_cm">
                {{initDetailPageInfo.user.bodyHeight}}cm
              </p>
              <p class="adress">
                {{initDetailPageInfo.user.city}}
              </p>
              <p class="identity" v-if="initDetailPageInfo.user.vocation && initDetailPageInfo.user.vocation.length">
                {{initDetailPageInfo.user.vocation}}
              </p>
              <p class="identity" v-else>
                暂无职业
              </p>
            </li>
            <li class="three_li" v-if="initDetailPageInfo.plan">
              <div class="w6_btn " v-if="initDetailPageInfo.plan" @click="diy_taocan_btn( initDetailPageInfo.plan )  ">
                <img v-if="initDetailPageInfo.plan.icon" :src="initDetailPageInfo.plan.icon" />
                <p v-if="initDetailPageInfo.plan.name">
                  <span>
                    {{initDetailPageInfo.plan.name}}
                  </span>
                </p>
              </div>
            </li>
            <li class="four_li" v-if="initDetailPageInfo.user.descr && initDetailPageInfo.user.descr.length ">
              <div class="desc_text">
                {{initDetailPageInfo.user.descr}}
              </div>
            </li>
          </ul>
        </div>
      </div>
      <!--前后体重-对比区域-->
      <div id="header_contrast_box" class="contrast_box" v-if="initDetailPageInfo && initDetailPageInfo.info">
        <div class="before_img" v-if="initDetailPageInfo.info.before">
          <img :src="initDetailPageInfo.info.before" />
          <div class="text" v-if="initDetailPageInfo.info.beforeWeight">
            <i>Before</i>
            <i>{{initDetailPageInfo.info.beforeWeight}}</i>
            <i>kg</i>
          </div>
        </div>
        <div class="after_img" v-if="initDetailPageInfo.info.after">
          <img :src="initDetailPageInfo.info.after" />
          <div class="text" v-if="initDetailPageInfo.info.afterWeight">
            After {{initDetailPageInfo.info.afterWeight}}kg
          </div>
        </div>
        <div class="clear"></div>
      </div>
      <div class="rich_text_box" id="initDetailPageInfoAppendHtml" v-if="initDetailPageInfo && initDetailPageInfo.info && initDetailPageInfo.info.content">
        <div v-html="initDetailPageInfo.info.content"></div>
      </div>
      <div class="show_tab_box" v-if="initDetailPageInfo && initDetailPageInfo.label && initDetailPageInfo.label.length">
        <div class="icon_tab"></div>
        <div class="tab_ul">
          <div class="tab_li" @click="show_tab_li(data.id)" v-for="(data,index) in initDetailPageInfo.label" :key="index" v-if="index <= 4">
            {{data.labelName}}
          </div>
          <div class="clear"></div>
        </div>
      </div>
    </div>
    <div class="change_background"></div>
    <div v-if=" initDetailPageInfo && initDetailPageInfo.adviser">
      <counselors :adviserInfo="initDetailPageInfo.adviser"></counselors>
    </div>
    <div style="margin-top:10px;" class="change_background" v-if="initDetailPageInfo && initDetailPageInfo.adviser && initDetailPageInfo.adviser.length"></div>
    <div class="tuijian_box" v-if="tuijian_info.length">
      <div class="anli_header">
        案例推荐
      </div>
      <div id="tuijian_contrast_box">
        <div class="tuijian_li" v-for="(data,index) in tuijian_info " :key="index">
          <div class="contrast_box">
            <div class="before_img">
              <img :src="data.info.before" />
              <div class="text">
                Before
              </div>
            </div>
            <div class="after_img">
              <img :src="data.info.after" />
              <div class="text">
                After
              </div>
            </div>
            <div class="clear"></div>
          </div>
          <div class="desc_box">
            <div class="views_title" @click="go_demo_detail_page(data)">
              {{data.info.title}}
            </div>
            <div class="views_num">
              <i></i>
              <em>
                {{data.community.viewsNum}}
              </em>
            </div>
          </div>
          <div class="clear"></div>
        </div>
      </div>
    </div>
    <div class="change_background"></div>
    <!-- 全部评论区域 -->
    <allCommentList v-if="initDetailPageInfo" soucrePage="demoDetail" :initType="6" :initDataId="demo_id" :newCommentData="newCommentData" :commentInfo="commentInfo" :comment_num="comment_num" :callBackObj="callBackObj" :views_num="initDetailPageInfo.community.viewsNum" :doCommendId="demo_id" :commend_num="initDetailPageInfo.community.commendNum" :is_commend="initDetailPageInfo.community.isCommend" :is_collect="initDetailPageInfo.community.isCollect" @updateCommentTotalNum="updateCommentTotalNum">
    </allCommentList>
    <!-- 
    isApp:{{isApp}}
    
    底部悬浮区域评论区域 -->
    <discussInput v-if="isApp && initDetailPageInfo" soucrePage="demoDetail" :commentInfo="commentInfo" @addCommentData="addCommentData" :initType="6" @obtain2="callBack2" :shareContent="initDetailPageInfo.shareContent" :doCommendId="demo_id" :comment_num="comment_num" :commend_num="initDetailPageInfo.community.commentNum" :is_commend="initDetailPageInfo.community.isCommend" :is_collect="initDetailPageInfo.community.isCollect">
    </discussInput>
    <!--  新的弹出层接入linkedme区域 -->
    <popupDownHxsLinkedMe v-if="isPopupDownLoad && !isApp && linkedMe" :linkedMe="linkedMe">
    </popupDownHxsLinkedMe>
    <downToLinkedMe v-if=" !isApp && linkedMe" :linkedMe='linkedMe'></downToLinkedMe>
    <!-- preloadidng 
    -->
    <preLoading v-if="isPreLoading && !initDetailPageInfo"></preLoading>
  </div>
</template>
<script>
// 下载app组件
import downToLinkedMe from '@/components/downToLinkedMe'

// 文章评论列表组件
import allCommentList from '@/components/allCommentList'

// 评论输入组件
import discussInput from '@/components/discuss'

// 执导顾问模块
import counselors from '@/components/counselors'

// 居中弹出下载appdownload组件
import popupDownHxsLinkedMe from '@/components/popupDownHxsLinkedMe'

// 初始化loadding的组件
import preLoading from '@/components/preLoading'

// 站外h5的注册头部模块
import goSignPage from '@/components/goSignPage'

// 阿里云视频的播放器
import aliyunPlayer from '@/components/alyPlayer'

import axios from 'axios'
import { Toast } from 'mint-ui'
import commonJs from '@/util/common.js'

export default {
  name: 'demoDetail',
  data() {
    return {
      text_num: [1, 1, 1, 1, 5],

      // 分享数据是否准备好了
      hasShareContentData: false,

      // 判断loadding和文章删除的场景
      isPreLoading: true,

      // 第三方linkedme的接入数据
      linkedMe: null,

      callBackObj: null,

      // 文章id
      demo_id: this.$route.params.demo_id ? this.$route.params.demo_id : '',

      // 是否弹出下载弹出框的判断
      isPopupDownLoad: false,

      // 初始化详情页面数据
      initDetailPageInfo: null,
      initDetailPlayerDataBoolean: false,

      // 推荐的数据
      tuijian_info: [],

      // 评论列表的总数
      comment_num: 0,

      // 发布box推送给评论列表的数据格式
      newCommentData: null,
      // 给评论列表组件使用的数据
      commentInfo: {
        type: null, //文章类型
        data_id: null, //文章id
        parent_comment_id: null, //父级评论id,(可无)
        reply_comment_id: null, //二级评论id,(可无)
        arguedName: null, //被回复人的评论(可无)
        sess_token: null
      },

      isAndroid: null, // 判断是否安卓机
      isClose: false, // 是否关闭播放器
      is_follow: true // true 表示显示关注按钮，false表示关注按钮消失
    }
  },

  components: {
    downToLinkedMe,
    allCommentList,
    discussInput,
    popupDownHxsLinkedMe,
    goSignPage,
    counselors,
    preLoading,
    aliyunPlayer
  },
  computed: {
    isLogin: function() {
      return commonJs.isLogin()
    },

    isApp: function() {
      return commonJs.isApp()
    }
  },
  watch: {},
  beforeDestroy() {},
  mounted() {
    this.set_commentInfo()

    if (!this.isApp) {
      // http://wiki.sys.hxsapp.net/pages/viewpage.action?pageId=1998876
      var __url = commonJs.config.prefixUrl + 'demeDetail/' + this.$route.params.demo_id
      this.linkedMe = {
        params: {
          // key 是写死的   value是协议，具体见这里－http://wiki.sys.hxsapp.net/pages/viewpage.action?pageId=1998876
          key: 'hxsapp://web?url=' + __url
        }
      }
    }

    this.get_demo_detail()

    this.get_tuijian()

    // 判断安卓机
    this.isAndroid = new RegExp('Android').test(window.navigator.userAgent)
  },
  methods: {
    // 去tab的页面的谁
    show_tab_li(case_id) {
      if (this.isApp) {
        var __version = commonJs.getHxsAppVersion()

        if (commonJs.compareAppVersion(__version, '3.3.0') || __version == '3.3.0') {
          window.location.href = 'https://hxsapp_caselabels_page?case_id=' + case_id
        }
      } else {
        this.showAppDownLoad()
        // setTimeout(() => {
        //   // window.location.href = commonJs.config.prefixUrl + "articleDetail/" + data.id + window.location.search;
        //   // var __url  = commonJs.config.prefixUrl + "dynamic/" + user_id + window.location.search;
        //   var __url  = commonJs.config.prefixUrl + "dynamic/" + newUseId + window.location.search;
        //   window.location.replace( __url );
        // }, 100)
      }
    },
    // 去个人动态的页面
    goDynamicPage() {
      console.log('goDynamicPage')

      // var user_id = this.data.user_id
      // 用户id
      var newUseId = this.initDetailPageInfo.user.id ? this.initDetailPageInfo.user.id : ''

      if (newUseId.length == 0) {
        console.log('用户的ID不存在，且长度为0')
        return
      }

      if (this.isApp) {
        // window.location.href = "https://hxsapp_user_info#" + user_id;
        window.location.href = 'https://hxsapp_user_info#' + newUseId
      } else {
        setTimeout(() => {
          // window.location.href = commonJs.config.prefixUrl + "articleDetail/" + data.id + window.location.search;
          // var __url  = commonJs.config.prefixUrl + "dynamic/" + user_id + window.location.search;
          var __url = commonJs.config.prefixUrl + 'dynamic/' + newUseId + window.location.search
          window.location.replace(__url)
        }, 100)
      }
    },

    diy_taocan_btn(data) {
      if (data && data.url) {
        if (this.isApp) {
          // window.location.href = "https://hxsapp_user_info#" + user_id;
          window.location.href = 'https://hxsapp_new_webview#' + data.url
        } else {
          window.location.href = data.url
        }
      } else {
        console.log('套餐的url不存在')
      }
    },

    go_demo_detail_page(data) {
      // debugger
      if (data && data.info && data.info.id) {
        setTimeout(() => {
          window.location.replace(commonJs.config.prefixUrl + 'demoDetail/' + data.info.id + window.location.search)
        }, 10)
      } else {
        console.log('详情id 不存在')
      }
    },

    // 关注按钮
    followBtn() {
      // console.log("followBtn-followBtn");

      // var jsonMar = {
      //  access_occurred_type: 210572,//发生访问的【页面】类型
      //  access_occurred_type_id: "",//发生访问的【页面】类型ID
      //  previous_event_type_obj: this.article_id,//【事件】对象类型
      //  previous_event_type_obj_id: '',//【事件】对象类型ID
      //  previous_content_sort: ''//【事件】事件参数
      // };
      // commonJs.buriedPoint(jsonMar)

      if (this.isApp) {
        // debugger
        // console.log(this.setShareContent())
        // 点击app上右上角分享按钮，app回调 h5的全局函数
        //  app 开始 3.0.0 支持

        if (this.isLogin) {
          console.log('若登录了，就去调用极光的接口-https://api.hxsapp.com/community/userCommend/doCommend')

          // 接口请求数据
          let json = {
            sess_token: commonJs.getUrlParam('sess_token'),
            followed_user_id: this.initDetailPageInfo.user.id
          }
          var __url
          if (this.initDetailPageInfo.user.isFollowed == 'yes') {
            __url = 'https://api.hxsapp.com/community/userRelate/cancelFollow'
          } else if (this.initDetailPageInfo.user.isFollowed == 'no') {
            // __url = "https://api.hxsapp.com/community/userRelate/cancelFollow"
            __url = 'https://api.hxsapp.com/community/userRelate/follow'
          }

          var __version = commonJs.getHxsAppVersion()
          axios
            .get(__url, { params: json })
            .then(res => {
              if (res.data.code == 200) {
                Toast(res.data.msg)
                // if (this.is_follow == "yes") {
                //   this.is_follow = "no"
                // } else if (this.is_follow == "no") {
                //   this.is_follow = "yes"
                // }
                this.is_follow = false
                if (commonJs.compareAppVersion(__version, '3.5.1') || __version == '3.5.1') {
                  window.location.href = 'https://hxsapp_follow_user?id=' + this.initDetailPageInfo.user.id + '&state=1'
                }
              } else {
                Toast(res.data.msg)
              }
            })
            .catch(Error => {
              console.log(Error)
            })
        } else {
          console.log('没有登录了,这里调起app的登录协议')
          commonJs.h5CallAppAction.hxsapp_showloginpage()
        }
      } else {
        this.showAppDownLoad()
      }
    },

    set_commentInfo() {
      //案例类型/文章的id/父评论id/sess_token

      let routeParams = this.$route.params
      this.commentInfo.type = 6
      this.commentInfo.data_id = routeParams.demo_id
      this.commentInfo.sess_token = commonJs.getUrlParam('sess_token')
    },

    get_tuijian() {
      // 接口请求数据
      let json = {
        numbers: 3,
        sess_token: commonJs.getUrlParam('sess_token')
      }
      var that = this
      // debugger
      axios
        .get('https://api.hxsapp.com/content/Cases/recommendCase', { params: json })
        .then(res => {
          if (res.data.code == 200 && res.data.data) {
            this.tuijian_info = res.data.data

            this.$nextTick(function() {
              // that.tuijian_contrast_box_imgHeight();
            })
          } else {
            console.log('加载数据异常，请稍后再试！,code !== 200 ')
            // this.isPreLoading = false;
          }
        })
        .catch(error => {
          console.log('加载数据异常，请稍后再试！getDetailByAid-error')
          this.isPreLoading = false
        })
    },
    get_demo_detail() {
      // 接口请求数据
      let json = {
        id: this.$route.params.demo_id,
        sess_token: commonJs.getUrlParam('sess_token')
      }
      var that = this

      // debugger
      // debugger
      axios
        .get('https://api.hxsapp.com/content/Cases/detail', { params: json })
        .then(res => {
          if (res.data.code == 200 && res.data.data) {
            this.initDetailPageInfo = res.data.data
            this.initDetailPlayerDataBoolean = this.isEmptyObject(this.initDetailPageInfo.info.media_data)

            this.comment_num = res.data.data.community.commentNum

            // 分享数据初始化
            this.setShareContent()

            // 修复富文本的链接跳转的bug
            this.richTextFixBug()

            this.$nextTick(function() {
              // that.header_contrast_box_imgHeight();
            })

            //案例推荐请求
            this.get_tuijian()
          } else {
            console.log('加载数据异常，请稍后再试！,code !== 200 ')
            this.isPreLoading = false
          }
        })
        .catch(error => {
          console.log('加载数据异常，请稍后再试！getDetailByAid-error')
          this.isPreLoading = false
        })
    },

    // 判断是否为空对象，false是空对象，true则不是空对象
    isEmptyObject(e) {
      let t
      for (t in e) return !0
      return !1
    },

    tuijian_contrast_box_imgHeight() {
      // tuijian_contrast_box
      if (this.tuijian_info.length != 0) {
        var dom_before_img_2 = $('#tuijian_contrast_box .before_img img')
        var __before_img_height_2 = parseInt(
          $('#tuijian_contrast_box .before_img')
            .eq(0)
            .width()
        )
        __before_img_height_2 = parseInt(__before_img_height_2 * 182 / 160)
        // debugger
        console.log('__before_img_height_2=' + __before_img_height_2)
        $('#tuijian_contrast_box .tuijian_li').each(function(i) {
          $(this)
            .find('.before_img img')
            .css({
              height: __before_img_height_2 + 'px'
            })

          $(this)
            .find('.after_img img')
            .css({
              height: __before_img_height_2 + 'px'
            })

          // debugger
        })

        // var dom_after_img_2 = $("#tuijian_contrast_box .after_img img");
        // var __after_img_height_2 = parseInt($("#tuijian_contrast_box .after_img").eq(0).width());
        // __after_img_height_2 = parseInt(__after_img_height_2 *182/160)

        // $.each(dom_after_img_2, function(i){
        //  dom_after_img_2.eq(i).css({
        //    'height': __after_img_height_2+"px"
        //  });
        // })
      }
    },

    header_contrast_box_imgHeight() {
      if (this.initDetailPageInfo) {
        // header_contrast_box
        var dom_before_img_1 = $('#header_contrast_box .before_img img')
        // debugger
        var __before_img_height_1 = parseInt($('#header_contrast_box .before_img').width())
        __before_img_height_1 = parseInt(__before_img_height_1 * 388 / 342)

        $('#header_contrast_box .before_img img').css({
          height: __before_img_height_1 + 'px'
        })

        var dom_after_img_1 = $('#header_contrast_box .after_img img')
        var __after_img_height_1 = parseInt($('#header_contrast_box .after_img').width())
        __after_img_height_1 = parseInt(__after_img_height_1 * 388 / 342)

        dom_after_img_1.css({
          height: __after_img_height_1 + 'px'
        })
      }
    },
    //添加发布的新评论的数据给评论列表插入到头部去
    addCommentData(data) {
      // 加一条记录
      // console.log(data)
      // debugger
      this.comment_num = parseInt(this.comment_num) + 1
      data.item.commentChildren = {}
      data.item.commentChildren.data = []
      this.newCommentData = data
    },

    // 更新评论列表的数据
    updateCommentTotalNum(data) {
      console.log('updateCommentTotalNum-call:' + data)
      this.comment_num = data
    },

    // 显示弹出提示下载层
    hidePopupDown() {
      this.isPopupDownLoad = false
    },
    showPopupDown() {
      this.isPopupDownLoad = true
    },
    callBack2(obj) {
      //接受发表评论框传过json，推送到评论 子评论数组 第一位
      this.callBackObj = obj
    },
    //H5通知客户端显示分享数据
    setShareContent() {
      // debugger
      // 邀请码
      console.log('getInviteCode-function-dosomething:' + Math.random())

      var __this = this

      commonJs.getInviteCode(res => {
        var shareTitle =
          this.initDetailPageInfo.info && this.initDetailPageInfo.info.title
            ? encodeURIComponent(this.initDetailPageInfo.info.title)
            : encodeURIComponent(commonJs.config.webTitle)
        var __search = '?displayThumbBtn=1&inviteCode=' + res

        var shareLink = commonJs.config.prefixUrl + 'demoDetail/' + this.$route.params.demo_id + __search
        var shareImages =
          this.initDetailPageInfo.info && this.initDetailPageInfo.info.before
            ? encodeURIComponent(this.initDetailPageInfo.info.before)
            : ''

        //分享描述
        var shareDescr =
          this.initDetailPageInfo.info && this.initDetailPageInfo.info.descr
            ? encodeURIComponent(this.initDetailPageInfo.info.descr)
            : encodeURIComponent(commonJs.config.webTitle)

        // var shareArticleId = "";
        var shareArticleId = this.$route.params.demo_id ? this.$route.params.demo_id : ''

        var shareType = 'demoDetail'
        var shareMediaLink = ''

        var shareActWindowTitle = ''
        var shareActWindowDescr = ''
        console.log(shareLink)

        var shareData = {
          shareTitle,
          shareLink,
          shareImages,
          shareDescr,
          shareArticleId,
          shareType,
          shareMediaLink,
          shareActWindowTitle,
          shareActWindowDescr
        }

        this.initDetailPageInfo.shareContent = shareData
        this.hasShareContentData = true

        this.initShare(shareData)
      })
    },

    // 修复富文本的链接跳转的bug
    richTextFixBug() {
      var linklable = $('#initDetailPageInfoAppendHtml a')
      // debugger
      if (this.isApp && linklable.length > 0) {
        $.each(linklable, function(i) {
          var linkUrl = linklable.eq(i).attr('href')
          linklable.eq(i).attr('href', 'javascript:void(0);')
          linklable.eq(i).attr('data-href', linkUrl)
        })

        $('#initDetailPageInfoAppendHtml').on('click', 'a', function() {
          var linkUrl = $(this).attr('data-href')
          if (linkUrl) {
            window.location.href = 'https://hxsapp_new_webview#' + linkUrl
          }
        })
      }
    },

    showPopupDownLoadCall() {
      this.isPopupDownLoad = true
    },
    hidePopupDownLoadCall() {
      this.isPopupDownLoad = false
    },
    //是否显示下载app区域
    showAppDownLoad() {
      console.log('弹出下载的提示框box设计')
      // 显示和异常弹出提示下载层
      this.isPopupDownLoad = true
    },

    // app右上角分享
    initShare(shareData) {
      var __this = this

      if (this.isApp) {
        console.log(this.initDetailPageInfo.shareContent)
        console.log(this.hasShareContentData)
        // debugger
        var __article_id = this.$route.params.demo_id

        // var json = {
        //  access_occurred_type: 211102,//发生访问的【页面】类型
        //  access_occurred_type_id: __article_id,//发生访问的【页面】类型ID
        //  previous_event_type_obj: "",//【事件】对象类型
        //  previous_event_type_obj_id: '',//【事件】对象类型ID
        //  previous_content_sort: ''//【事件】事件参数
        // };

        // 点击app上右上角分享按钮，app回调 h5的全局函数
        //  app 开始 3.0.0 支持

        // window.hxsapp_visible_share_btn_mar = function(){
        //  commonJs.buriedPoint(json)
        // }
        // alert("shareTitle-1")
        commonJs.h5CallAppAction.hxsapp_visible_share_btn(shareData)
      } else {
        // alert("shareTitle-2")
        //二次分享－微信下
        // setShareContent
        // seconDaryShare(decodeURIComponent(Info.title), decodeURIComponent(Info.desc), Info.link, Info.img, data.appId, data.timestamp, data.noncestr, data.signature);
        var title = shareData.shareTitle
        var desc = shareData.shareDescr
        var link = shareData.shareLink
        var img = decodeURIComponent(shareData.shareImages)

        commonJs.outSideShare({
          title,
          desc,
          link,
          img
        })
      }
    },

    // 关闭播放器
    hidePlayer() {
      this.isClose = true
      this.bodyHeight = document.documentElement.clientHeight
    }
  }
}
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less">
#demoDetailBox {
  width: 100%;
  overflow: hidden; // 遮罩区域
  .title_box {
    width: 100%;
    padding: 14px 15px 13px;
    box-sizing: border-box;
    p {
      width: 100%;
      line-height: 24px;
      font-size: 18px;
      font-weight: bold;
      max-height: 74px;
      overflow: hidden;
      color: #333;
    }
  }

  .demo_detail_box {
    width: 100%;
    padding: 0 15px;
    box-sizing: border-box;
    .title_header {
      width: 100%;
      height: 39px;
      overflow: hidden;
      position: relative;
      border-bottom: 1px solid rgba(129, 141, 207, 0.16);

      p:nth-child(1) {
        float: left;
        line-height: 19px;
        color: #999;
        font-size: 13px;
        margin-top: 10px;
      }
      p:nth-child(2) {
        float: right;
        margin-top: 12px;
        line-height: 15px;
        font-size: 11px;
        color: #999;
        font-size: 11px;
      }
    }
    /** 个人信息区域 */
    .info_box {
      width: 100%;
      padding: 15px 0;
      box-sizing: border-box;
      position: relative;

      .info_img {
        position: absolute;
        top: 15px;
        left: 0;
        width: 60px;
        height: 60px;
        display: block;
        z-index: 1;
        img {
          width: 60px;
          height: 60px;
          display: block;
          border-radius: 50%;
        }

        i {
          position: absolute;
          bottom: 0;
          right: 0;
          display: block;
          width: 18px;
          height: 18px;
          display: block;
          z-index: 2;
        }

        i.hot-v {
          background: url('./../assets/img/vip.png') left top no-repeat;
          background-size: 100%;
        }

        i.blue-v {
          background: url('./../assets/images/F_icon_guwen.png') left top no-repeat;
          background-size: 100%;
        }
      }
      .info_main {
        width: 100%;
        padding-left: 70px;
        box-sizing: border-box;
        position: relative;

        .gz_btn {
          position: absolute;
          top: 0;
          right: 0;
          width: 27px;
          height: 19px;
          line-height: 19px;
          text-align: right;
          color: #818dcf;
          display: block;
          z-index: 3;
          font-size: 13px;
        }
        ul {
          width: 100%;

          li {
            p {
              float: left;
            }

            &.one_li {
              height: 21px;
              line-height: 21px;
              width: 100%;
              overflow: hidden;
              .name {
                display: block;
                font-size: 15px;
                color: #333;
                height: 21px;
                line-height: 21px;
                text-align: left;
              }
              i {
                display: block;
                margin: 2px 5px 0;
                float: left;
                color: #333;
                height: 15px;
                width: 15px; // background: red;
                &.man {
                  background: url('./../assets/img/demo_detail/B_icon_boy@2x.png') left top no-repeat;
                  background-size: 100%;
                }
                &.woman {
                  background: url('./../assets/img/demo_detail/B_icon_girl@2x.png') left top no-repeat;
                  background-size: 100%;
                }
              }
              .age {
                display: block;
                font-size: 13px;
                color: #666;
                height: 21px;
                width: 60px;
                text-align: left;
                line-height: 21px;
              }
            }
            &.two_li {
              padding-top: 11px;
              width: 100%;
              overflow: hidden;
              font-size: 13px;
              color: #666;
              .height_cm {
                height: 18px;
                line-height: 18px;
                margin-right: 8px;
              }
              .adress {
                border-left: 1px solid rgba(129, 141, 207, 0.16);
                border-right: 1px solid rgba(129, 141, 207, 0.16);
                padding: 0 7px;
                height: 18px;
                line-height: 18px;
              }
              .identity {
                padding-left: 8px;
                height: 18px;
                line-height: 18px;
              }
            }

            &.three_li {
              padding: 15px 0 0;
              width: 100%;
              overflow: hidden;
              .w6_btn {
                display: inline-block;
                height: 24px;
                line-height: 24px;
                background: linear-gradient(-138.1deg, rgba(159, 138, 254, 1), rgba(240, 147, 254, 1));
                border-radius: 13px;
                position: relative;
                img {
                  position: absolute;
                  width: 12px;
                  left: 15px;
                  top: 50%;
                  margin-top: -5px;
                }
                p {
                  height: 24px;
                  font-size: 13px;
                  color: #fff;
                  padding-left: 32px;
                  padding-right: 15px;
                  line-height: 24px;
                  padding-top: 1px;
                }
              }
            }
            &.four_li {
              padding: 15px 0 25px;
              line-height: 21px;
              width: 100%;
              overflow: hidden;
              .desc_text {
                width: 100%;
                font-size: 15px;
                color: #666;
                text-align: left;
              }
            }
          }
        }
      }
    }

    /* 任务体重对比区域 */
    .contrast_box {
      width: 100%;
      box-sizing: border-box;

      .before_img {
        float: left;
        width: 50%;
        box-sizing: border-box;
        position: relative;
        padding-right: 2px;
        img {
          width: 100%;
          display: block;
          border-radius: 5px;
        }
        .text {
          position: absolute;
          display: block; // text-align: center;
          width: 85px;
          height: 18px;
          line-height: 18px;
          font-size: 13px;
          bottom: 0;
          right: 2px;
          border-radius: 5px;
          border-top-right-radius: 0;
          border-bottom-left-radius: 0;
          background: rgba(114, 133, 243, 0.5);
          color: #fff;
          z-index: 1;
        }
      }
      .after_img {
        float: left;
        width: 50%;
        padding-left: 2px;
        box-sizing: border-box;
        position: relative;
        img {
          width: 100%;
          display: block;
          border-radius: 5px;
        }
        .text {
          position: absolute;
          display: block;
          text-align: center;
          width: 85px;
          height: 18px;
          line-height: 18px;
          font-size: 13px;
          bottom: 0;
          left: 2px;
          border-radius: 5px;
          border-top-left-radius: 0;
          border-bottom-right-radius: 0;
          background: rgba(255, 102, 140, 0.5);
          color: #fff;
          z-index: 1;
        }
      }
    }

    /** 富文本编辑区域 */
    .rich_text_box {
      width: 100%;
      box-sizing: border-box;
      padding: 14px 0;
      line-height: 30px;
      font-size: 16px;
      box-sizing: border-box;
      word-break: break-all;

      table,
      table tr th,
      table tr td {
        border: 1px solid #eaedff;
      }
      table {
        min-width: 320px;
        width: 100%;
        border-collapse: collapse;
      }

      img,
      video {
        width: 100%;
        display: block;
        height: auto;
        margin: 5px 0;
      }

      img {
        width: 100%;
      }
    }

    .show_tab_box {
      width: 100%;
      margin: 30px 0 15px;
      box-sizing: border-box;
      position: relative;

      .icon_tab {
        position: absolute;
        top: 7px;
        left: 0;
        width: 13px;
        height: 13px;
        background: url('./../assets/img/demo_detail/B_icon_tip@2x.png') left top no-repeat;
        background-size: 100%;
        display: block;
        z-index: 1;
      }
      .tab_ul {
        padding: 0 0 0 25px;
        width: 100%;
        box-sizing: border-box;

        .tab_li {
          float: left;
          width: 58px;
          height: 24px;
          margin: 2px 2px;
          padding: 0 2px;
          line-height: 24px;
          background: rgba(245, 245, 248, 1);
          border-radius: 2px;
          color: #818dcf;
          font-size: 11px;
          text-align: center;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }
      }
    }
  }

  .tuijian_box {
    width: 100%;
    padding: 0 15px;
    box-sizing: border-box;

    .anli_header {
      display: block;
      padding: 14px 0 8px;

      font-size: 13px;
      color: #999;
      height: 18px;
      line-height: 18px;
      text-align: left;
      margin-bottom: 15px;
      border-bottom: 1px solid rgba(129, 141, 207, 0.16);
    }
    .tuijian_li {
      width: 100%;
      margin-bottom: 10px;
      padding-bottom: 10px;
      position: relative; // z-index:2;
      &:before {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        border: 0 none;
        border-bottom: 1px solid white;
        -webkit-box-sizing: border-box;
        box-sizing: border-box;
        width: 200%;
        height: 200%;
        -webkit-transform: scale(0.5);
        transform: scale(0.5);
        -webkit-transform-origin: left top;
        transform-origin: left top;
        z-index: -1;
      }
      &:after {
        content: '';
        position: absolute;
        top: 0;
        left: 14.49275%;
        border: 0 none; // border-bottom: 1px solid blue;
        // border-bottom: 1px solid rgba(129, 141, 207, .2);
        border-bottom: 1px solid rgba(129, 141, 207, 0.32);
        -webkit-box-sizing: border-box;
        box-sizing: border-box;
        width: 200%;
        height: 200%;
        -webkit-transform: scale(0.5);
        transform: scale(0.5);
        -webkit-transform-origin: left top;
        transform-origin: left top;
        z-index: -1;
      }
      &:last-child {
        &:before,
        &:after {
          display: none;
        }
      }
      .contrast_box {
        width: 50%;
        box-sizing: border-box;
        float: left;
        .before_img {
          float: left;
          width: 50%;
          box-sizing: border-box;
          position: relative;
          padding-right: 2px;
          img {
            width: 100%;
            display: block;
            border-radius: 5px;
          }
          .text {
            position: absolute;
            display: block;
            text-align: center;
            width: 50px;
            height: 18px;
            line-height: 18px;
            font-size: 13px;
            bottom: 0;
            right: 2px;
            border-radius: 5px;
            border-top-right-radius: 0;
            border-bottom-left-radius: 0;
            background: rgba(114, 133, 243, 0.5);
            color: #fff;
            z-index: 1;
          }
        }
        .after_img {
          float: left;
          width: 50%;
          padding-left: 2px;
          box-sizing: border-box;
          position: relative;
          img {
            width: 100%;
            display: block;
            border-radius: 5px;
          }
          .text {
            position: absolute;
            display: block;
            text-align: center;
            width: 50px;
            height: 18px;
            line-height: 18px;
            font-size: 13px;
            bottom: 0;
            left: 2px;
            border-radius: 5px;
            border-top-left-radius: 0;
            border-bottom-right-radius: 0;
            background: rgba(255, 102, 140, 0.5);
            color: #fff;
            z-index: 1;
          }
        }
      }

      .desc_box {
        width: 50%;
        box-sizing: border-box;
        float: left;
        padding-left: 10px;
        .views_title {
          height: 40px;
          line-height: 20px;
          font-size: 15px;
          color: #333;
          padding-top: 5px;
          text-align: left;
          overflow: hidden;
        }
        .views_num {
          height: 15px;
          width: 100%;
          margin-top: 20px;
          box-sizing: border-box;
          display: flex;
          justify-content: flex-end;

          em {
            display: block;
            color: #999;
            font-size: 13px;
            padding-left: 7px;
          }
          i {
            display: block;
            width: 24px;
            height: 15px;
            background: url(../assets/img/read_icon@3x.png) left top no-repeat;
            background-size: 100% 100%;
          }
        }
      }
    }
  }
  /*10px 高度*/
  .change_background {
    width: 100%;
    height: 7px;
    background: #f5f5f8;
  }

  .clear {
    clear: both;
  }
}

.video-player {
  position: relative;
  overflow: hidden;
}

.close-player {
  position: absolute;
  z-index: 100 !important;
  color: #fff;
  right: 5px;
  top: 10px;
  padding: 5px 10px;
}
.close-player img {
  width: 15px;
  height: 15px;
}
.android-btn-box {
  height: 33px;
  position: relative;
  overflow: hidden;
}
.android-btn {
  position: absolute;
  right: 7px;
  top: 7px;
}
.android-btn i {
  display: inline-flex;
  // right: 5px;
  border-radius: 40px;
  color: #818dcf;
  border: 1px #818dcf solid;
  height: 24px;
  overflow: hidden;
  line-height: 26px;
  // top: 5px;
  padding: 0 15px;
  font-size: 13px;
  // padding-top: 1px;
  z-index: 5;
}
</style>
