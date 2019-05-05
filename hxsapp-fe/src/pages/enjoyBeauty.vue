<template>
  <div id="videoSpecialBox">
    <!-- 是否删除了视频详情 -->
    <div class="no_article_box" v-if=" !videoList && !isPreLoading">
      <div class="no_article">
      </div>
    </div>
    <div v-else>
      <!-- 阿里云播放器 -->
      <div v-if="!isClose && !isAndroid" class="close-player" @click="hidePlayer()">
        <img src="../assets/img/close_btn_video.png" alt="">
      </div>
      <aliyunPlayer  @playStatus="playStatus" v-if="nowPlayinfo && !isClose" v-show="playerShow" pageSoure="videoSpecial" article_id="article_id" :sourceUrl="nowPlayinfo.file_name" :coverUrl="nowPlayinfo.images[0]">
        
      </aliyunPlayer>
     
      <!-- 视频下方列表区域 -->
      <!-- @scroll="paperScroll" -->
      <div  v-infinite-scroll="loadMore" infinite-scroll-disabled="busy" infinite-scroll-distance="10" class="list-box" :style="{height:bodyHeight+'px'}">
          <!-- 视频推荐板块 -->
          <div class="video-list-box ">
            <div class="list-title flex flex-pack-justify ">
                <span class="list-title-left">{{videoList.name}}</span>
                <span class="android-btn" v-if="!isClose && isAndroid" @click="hidePlayer()">关闭视频</span>
                <span class="list-title-right flex flex-align-center" @click="checkMore(0)">{{videoList.count}}
                    <img class="more-icon" src="../assets/images/beauty/right.png" alt="">
                </span>
            </div>
            <div class="video-list-content line_xi_after">
                <div class="content-list flex" v-for="(list ,index) in videoList.list" :key="index" v-if="index<3" @click="checkVideo(list.id)">
                    <div class="list-content-img " >
                        <img :src="list.images[0]">
                        <span class="time-badge" v-if="list.play_time!=''">{{list.play_time}}</span>
                    </div>
                    <div class="list-content-right flex flex-warp flex-space">
                        <div class="list-content-title">{{list.title}}</div>
                        <div class="list-content-btn flex flex-algin-end flex-pack-end">
                          <div class="flex" >
                            <img src="../assets/img/pinlun.png" alt="">
                            <span class="list-content-num">{{list.comment_num}}</span>
                          </div>
                          <div class="flex" @click.stop="clickZanBtn(list.id,index,0,'video')">
                            <img v-if="list.checkIsCommend=='no'" src="../assets/img/zan_no.png" alt="">
                            <img v-else src="../assets/img/zan_yes.png" alt="">
                            <span class="list-content-num">{{list.commend_num}}</span>
                          </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="all-list-btn" @click="checkMore(0)">全部视频</div>
          </div>
          <!-- 新闻推荐板块 -->
          <div class="video-list-box">
              <div class="list-title flex flex-pack-justify ">
                  <span class="list-title-left">{{newsList.name}}</span>
                  <span class="list-title-right flex flex-align-center" @click="checkMore(1)">{{newsList.count}}
                      <img class="more-icon" src="../assets/images/beauty/right.png" alt="">
                  </span>
              </div>
              <div class="video-list-content  news-box">
                  <div v-if="index<3" class="content-list flex line_xi_after" v-for="(item ,index) in newsList.list"   :key="index" @click="goArticleDetail(item.id)">
                      <div class="list-content-img">
                          <img :src="item.images[0]">
                      </div>
                      <div class="list-content-right flex flex-warp flex-space">
                          <div class="list-content-title">{{item.title}}</div>
                          <div class="list-content-btn flex flex-algin-end flex-pack-end">
                            <div class="flex">
                              <img src="../assets/img/pinlun.png" alt="">
                              <span class="list-content-num">{{item.comment_num}}</span>
                            </div>
                            <div class="flex"  @click.stop="clickZanBtn(item.id,index,0,'news')">
                              <img v-if="item.checkIsCommend=='no'" src="../assets/img/zan_no.png" alt="">
                              <img v-else src="../assets/img/zan_yes.png" alt="">
                              <span class="list-content-num">{{item.commend_num}}</span>
                            </div>
                          </div>
                      </div>
                  </div>
                  <!-- <div class="content-list line_xi_after " v-show="index<3" v-else>
                      <div class="list-content-right-cell">
                          <div class="list-content-title">可还是空军和发事件发生不过来考虑嘎斯看来很快就跟可见发生口角后赴可是发卡是否可很快就会十分阿娇开卷考六级</div>
                      </div>
                      <div class="list-content-img-cell flex flex-pack-justify">
                          <img src="../assets/images/beauty/video1.png" :style="{height:windowHeigth*0.32-20+'px'}" v-for="(imgItem ,idx ) in item.img"
                              :key="idx" v-if="idx<3">
                      </div>
                      <div class="list-content-btn flex flex-pack-end">
                          <img src="../assets/img/pinlun.png" alt="">
                              <span class="list-content-num">255</span>
                              <img v-if="isZan" src="../assets/img/zan_no.png" alt="">
                              <img src="../assets/img/zan_yes.png" alt="">
                              <span class="list-content-num">44</span>
                      </div>
                  </div> -->
              </div>
              <div class="all-list-btn" @click="checkMore(1)">全部新闻</div>
          </div>
          <!-- 选手动态 -->
          <div class="moving-box ">
              <div class="list-title flex flex-pack-justify ">
                  <span class="list-title-left">选手动态</span>
                  <span class="list-title-right flex flex-align-center" @click="checkMore(2)">{{movingList.count}}
                      <img class="more-icon" src="../assets/images/beauty/right.png" alt="">
                  </span>
              </div>
              <div class="moving-content line_xi_after">
                  <div class="contestant-scroll ">
                      <div class="scroll-item" v-for="(item ,index) in movingList.players" :key="index" @click="goUserInfo(item.user_id)">
                          <div class="avatar-img-box">
                              <img class="item-avatar" :src="item.head_img" alt="">
                          </div>
                          <div class="item-avatar-box">
                            <img class="item-avatar-badge" v-if="item.v=='1'" src="../assets/images/beauty/v_icon.png" alt="">
                          </div>
                          <div class="contestant-name">{{item.nickname.slice(0,5)}}<span v-if="item.nickname.length>5">...</span></div>
                          <div class="contestant-attention" @click.stop="followBtn(item.user_id,index,item.is_follow)">
                            <span v-if="item.is_follow=='no'">关注</span>
                            <span v-else>取消关注</span>
                          </div>
                      </div>
                  </div>
              </div>
              <!-- 选手发表的说说 -->
              <div class="publish-content" v-for="(item,index) in movingList.new_diary" :key="index" v-if="index<3" @click="goTopic(item.tag_id)">
                  <div class="publish-header flex flex-pack-justify flex-align-center">
                    <div class="publish-avatar-box">
                      <img class="publish-avatar" :src="item.head_img" alt="">
                    </div>
                      <div class="publish-content-center">
                          <div class="publish-username">{{item.nickname}}</div>
                          <div class="publish-time">{{item.create_time}}</div>
                      </div>
                      <!-- <img class="publish-content-right" src="../assets/images/beauty/down-icon.png" alt=""> -->
                  </div>
                  <div class="publish-center">
                      <div class="publish-center-text">
                          <span class="publish-center-lable"><span v-if="item.tag_name!=''">#{{item.tag_name}}#</span></span>{{item.content}}</div>
                      <div class="publish-center-imglist flex flex-warp flex-pack-justify line_xi_after">
                          <div v-if='item.images.length<2' :class="item.images.length<2 ? 'one-width' : ''" @click.stop="openImgIndexFn(idx,item.images)"
                              v-for="(_item,idx) in item.images" :key="idx"  >
                            <img :src="_item" alt="">    
                          </div>
                          <div v-else-if='item.images.length<3&&item.images.length>1' :class="item.images.length<3 ? 'two-width' : ''" :style="{'height':windowHeigth*0.5+'px'}" @click.stop="openImgIndexFn(idx,item.images)"
                              src="" alt="">
                            <img :src="_item" alt="" :style="{'min-height':windowHeigth*0.5+'px'}" >    
                          </div>
                          <div v-else  alt="" :key="idx" src=""  :style="{'height':windowHeigth/3.2+'px'}" @click.stop="openImgIndexFn(idx,item.images)">
                            <img :src="_item" alt="" :style="{'min-height':windowHeigth/3.2+'px'}">
                          </div>
                      </div>
                  </div>
                  <div class="publish-bottom flex flex-pack-justify flex-align-center line_xi_after">
                      <div class="publish-bottom-address flex">
                          <span class="lable">{{item.district}}</span>
                          <span class="address">·{{item.city}}</span>
                      </div>
                      
                      <div class="publish-bottom-btn flex flex-pack-end ">
                        <div class="flex">
                          <img src="../assets/img/pinlun.png" alt="">
                          <span class="list-content-num">{{item.comment_num}}</span>
                        </div>
                        <div class="flex" @click.stop="clickZanBtn(item.id,index,2,'publish')">
                          <img v-if="item.checkIsCommend=='no'" src="../assets/img/zan_no.png" alt="">
                          <img v-else src="../assets/img/zan_yes.png" alt="">
                          <span class="list-content-num">{{item.commend_num}}</span>
                        </div>
                      </div>
                  </div>
              </div>
              <div class="all-list-btn " @click="checkMore(2)">全部动态</div>
          </div>
          <!-- 全部评论 -->
          <div class="eval-box">
              <div class="list-title eval-title line_xi_after">
                  <span class="list-title-left">评论区</span>
              </div>
              <div class="initText" v-if="commentData==''">
                <div class="no_pinlun">
                  目前还没有人评论哦
                </div>
              </div>
              <div v-else>
                <div class=" eval-content" v-for="(item,index) in commentData" :key="index" >
                    <div class="publish-header flex flex-pack-justify flex-align-center">
                        <div class="publish-avatar-box">
                          <img class="publish-avatar" :src="item.head_img" alt="">
                        </div>
                        <div class="publish-content-center eval-userbox">
                            <div class="publish-username">{{item.nickname}}</div>
                            <div class="publish-time">{{item.create_time}}</div>
                        </div>
                        <div class="eval-header-right-btn flex flex-pack-end ">
                          <div class="flex" @click.stop="goContentNunPage(item.id,0)">
                            <img src="../assets/img/pinlun.png" alt="">
                            <span class="list-content-num" v-if="item.commentChildren">{{item.commentChildren.total}}</span>
                            <span class="list-content-num" v-else>0</span>
                          </div>
                          <div class="flex"  @click.stop="clickZanBtn(item.id,index,1,'eval')">
                            <img v-if="item.is_commend=='no'" src="../assets/img/zan_no.png" alt="">
                            <img v-else src="../assets/img/zan_yes.png" alt="">
                            <span class="list-content-num">{{item.commend_num}}</span>
                          </div>
                        </div>
                    </div>
                    <div class="eval-text">
                        <p class="line_xi_after">{{item.content}}</p>
                        <div class="children-eval-box" v-if="item.commentChildren&&item.commentChildren.data!=''">
                            <div class="children-item" v-for="(_item,_index) in item.commentChildren.data" :key="_index" v-if="_index<1" @click.stop="goContentNunPage(item.id,0)">
                                <label class="children-name">{{_item.parent_nickname}}:</label>
                                <span class="children-content">{{_item.content}}</span>
                            </div>
                            <div class="children-item" v-if="item.commentChildren.data.length>1"  @click.stop="goContentNunPage(item.id,0)">
                                <label class="children-name">查看全部回复 ({{item.commentChildren.total}}) >></label>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="loading-more">{{loadingText}}</div>
              </div>
          </div>
      </div>
      <!--  更多数据 -->
        <div v-if="showMore" class="list-title flex flex-pack-justify more-float-title ">
          <span class="list-title-left">{{moreTitle}}</span>
          <span class="list-title-right flex flex-align-center" @click="checkMore()">
              <span v-if="moreType==0">{{videoList.count}}</span>
              <span v-if="moreType==1">{{newsList.count}}</span>
              <span v-if="moreType==2">{{movingList.count}}</span>
              <img class="more-icon down-icon" src="../assets/images/beauty/down_icon_enjoy.png" alt="">
          </span>
        </div>
        <div v-if="showMore"  infinite-scroll-disabled="busy" infinite-scroll-distance="10" class="all-list-box" >
          <div class="loading-showmore" v-if="isShowLoading">加载中...</div>
          <div class="video-list-box " v-else>
            <section class="more-content">
              <!-- 更多视频 -->
              <div class="video-list-content line_xi_after" v-if="moreType==0">
                <div class="content-list flex" v-for="(list ,index) in videoList.list" :key="index" @click="checkVideo(list.id)">
                    <div class="list-content-img ">
                        <img :src="list.images">
                        <span class="time-badge" v-if="list.play_time!=''">{{list.play_time}}</span>
                    </div>
                    <div class="list-content-right flex flex-warp flex-space">
                        <div class="list-content-title">{{list.title}}</div>
                        <div class="list-content-btn flex flex-algin-end flex-pack-end">
                            <div class="flex" >
                          <img src="../assets/img/pinlun.png" alt="">
                          <span class="list-content-num">{{list.comment_num}}</span>
                        </div>
                        <div class="flex" @click.stop="clickZanBtn(list.id,index,0,'video')">
                          <img v-if="list.checkIsCommend=='no'" src="../assets/img/zan_no.png" alt="">
                          <img v-else src="../assets/img/zan_yes.png" alt="">
                          <span class="list-content-num">{{list.commend_num}}</span>
                        </div>
                        </div>
                    </div>
                </div>
              </div>
              <!-- 更多新闻 -->
              <div class="video-list-content  news-box" v-if="moreType==1">
                  <div class="content-list flex line_xi_after" v-for="(item ,index) in newsList.list" :key="index" @click="goArticleDetail(item.id)">
                      <div class="list-content-img">
                          <img :src="item.images">
                      </div>
                      <div class="list-content-right flex flex-warp flex-space">
                          <div class="list-content-title">{{item.title}}</div>
                          <div class="list-content-btn flex flex-algin-end flex-pack-end">
                            <div class="flex" >
                              <img src="../assets/img/pinlun.png" alt="">
                              <span class="list-content-num">{{item.comment_num}}</span>
                            </div>
                            <div class="flex" @click.stop="clickZanBtn(item.id,index,0,'news')">
                              <img v-if="item.checkIsCommend=='no'" src="../assets/img/zan_no.png" alt="">
                              <img v-else src="../assets/img/zan_yes.png" alt="">
                              <span class="list-content-num">{{item.commend_num}}</span>
                            </div>
                          </div>
                      </div>
                  </div>
              </div>
              <!-- 更多动态 -->
              <div class="publish-content" v-if="moreType==2" v-for="(item,index) in movingList.new_diary" :key="index" @click="goTopic(item.tag_id)">
                  <div class="publish-header flex flex-pack-justify flex-align-center">
                      <div class="publish-avatar-box">
                        <img class="publish-avatar" :src="item.head_img" alt="">
                      </div>
                      <div class="publish-content-center">
                          <div class="publish-username">{{item.nickname}}</div>
                          <div class="publish-time">{{item.create_time}}</div>
                      </div>
                      <!-- <img class="publish-content-right" src="../assets/images/beauty/down-icon.png" alt=""> -->
                  </div>
                  <div class="publish-center">
                      <div class="publish-center-text">
                          <span class="publish-center-lable"><span v-if="item.tag_name!=''">#{{item.tag_name}}#</span></span> {{item.content}}</div>
                      <div class="publish-center-imglist flex flex-warp flex-pack-justify line_xi_after">
                         <div v-if='item.images.length<2' :class="item.images.length<2 ? 'one-width' : ''" @click.stop="openImgIndexFn(idx,item.images)"
                              v-for="(_item,idx) in item.images" :key="idx"  >
                            <img :src="_item" alt="">    
                          </div>
                          <div v-else-if='item.images.length<3&&item.images.length>1' :class="item.images.length<3 ? 'two-width' : ''" :style="{'height':windowHeigth*0.5+'px'}" @click.stop="openImgIndexFn(idx,item.images)"
                              src="" alt="">
                            <img :src="_item" alt="" :style="{'min-height':windowHeigth*0.5+'px'}" >    
                          </div>
                          <div v-else  alt="" :key="idx" src=""  :style="{'height':windowHeigth/3.2+'px'}" @click.stop="openImgIndexFn(idx,item.images)">
                            <img :src="_item" alt="" :style="{'min-height':windowHeigth/3.2+'px'}">
                          </div>
                      </div>
                  </div>
                  <div class="publish-bottom flex flex-pack-justify flex-align-center line_xi_after">
                      <div class="publish-bottom-address flex">
                          <span class="lable">{{item.district}}</span>
                          <span class="address">·{{item.city}}</span>
                      </div>
                      <div class="publish-bottom-btn flex flex-pack-end ">
                        <div class="flex" >
                          <img src="../assets/img/pinlun.png" alt="">
                          <span class="list-content-num">{{item.comment_num}}</span>
                        </div>
                        <div class="flex" @click.stop="clickZanBtn(item.id,index,2,'publish')">
                          <img v-if="item.checkIsCommend=='no'" src="../assets/img/zan_no.png" alt="">
                          <img v-else src="../assets/img/zan_yes.png" alt="">
                          <span class="list-content-num">{{item.commend_num}}</span>
                        </div>
                      </div>
                  </div>
              </div>
            </section>
          </div>
      </div>
      <popupDownLoad v-if="isPopupDownLoad">
      </popupDownLoad>
      <!--  非app环境下的app下载区域 
      <downLoadApp v-if="!isApp"></downLoadApp>
      -->
      <discussInput 
        soucrePage="videoSpecial" 
        :commentInfo="commentInfo" 
        @addCommentData="addCommentData" 
        v-if="isApp && nowPlayinfo" 
        :initType="0" 
        :shareContent="nowPlayinfo.title"
        :doCommendId="play_id" 
        :comment_num="nowPlayinfo.comment_num" 
        :commend_num="nowPlayinfo.commend_num" 
        :is_commend="nowPlayinfo.checkIsCommend" 
        is_collect="">
    </discussInput>
      <downToLinkedMe v-if=" !isApp && linkedMe" :linkedMe='linkedMe'></downToLinkedMe>
  </div>
  <preLoading v-if="isPreLoading "></preLoading>
  <picture-box :dynamicImages="dynamicImages" v-if="pictureShow" @obtain="pictrueCallBack" :openPictureIndex="openImgIndex"></picture-box>
  </div>
</template>

<script>
// 阿里云视频的播放器
import aliyunPlayer from "@/components/aliyunPlayer";
// 下载app组件
import downLoadApp from "@/components/down";
import downToLinkedMe from "@/components/downToLinkedMe";
// 评论输入组件
import discussInput from "@/components/discuss";
// 居中弹出下载appdownload组件
import popupDownLoad from "@/components/popupDownLoad";
// 初始化loadding的组件
import preLoading from "@/components/preLoading";
// 图片预览
import picture from "@/components/picture";
import axios from "axios";
import { Toast } from "mint-ui";
import commonJs from "@/util/common.js";
// import { MessageBox } from 'mint-ui'
export default {
  id: "videoSpecialBox",
  data() {
    return {
      windowHeigth: null, // 窗口高度
      bodyHeight: null, //列表区域高度
      videoHeight: null,
      imgWidth: this.windowHeigth / 3 - 26 + "px",
      hasShareContentData: false,
      isPreLoading: true,
      dynamicImages: [], //用户图片数组
      pictureShow: false, //是否展示图片
      openImgIndex: 0, //传递picture组件用户点击第几张图片,
      linkedMe: null,
      loading: true,
      showMore: false, // 是否显示更多
      moreTitle: null, // 当前显示更多的标题
      moreType: null, // 当前显示更多的类型
      loadingText: "上拉加载更多",
      commentData: [], //评论数据
      evalLast_id: 0,
      showEval: false, // 查看全部评论
      link: "",
      initType: 0,
      playerShow: true,
      Zindex: -1,
      isShowLoading: true,
      commentInfo: {
        type: null, //文章类型
        data_id: null, //文章id
        parent_comment_id: null, //父级评论id,(可无)
        reply_comment_id: null, //二级评论id,(可无)
        arguedName: null, //被回复人的评论(可无)
        sess_token: null
      },
      videoList: [], // 视频数据
      nowPlayinfo: null,
      isPlayer: false, //播放状态
      play_id: null, //当前播放的视频id
      type_id: 57, //享受美吧视频id
      news_id: 58, //享受美吧新闻id
      is_all: 1, // 是否加载全部 1否，2是
      last_id: 0,
      isClose: false,
      newsList: [], // 新闻列表数据
      allList: [], //全部数据
      movingList: [], // 选手动态数据
      shareContent: null, //分享数据
      allEvaldata: null, // 全部评论数据
      // 评论列表的总数
      comment_num: 0,
      // 点赞的数量
      commend_num: 0,
      isAndroid: null,
      // 发布box推送给评论列表的数据格式
      newCommentData: null,
      // 控制pop弹出下载框的问题
      isPopupDownLoad: false,
      // test data
      // msg: 'page web - Welcome to Your Vue.js App',
      // columns: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
      articleIdData: null
    };
  },
  components: {
    aliyunPlayer,
    // downLoadApp,
    downToLinkedMe,
    discussInput,
    "picture-box": picture,
    popupDownLoad,
    preLoading
  },
  watch: {
    $route() {
      // $(window).off('scroll', this.onScrollTabBox)
      console.log("wtach-route-log-videoSpecialBox");
    },
    isPreLoading() {
      console.log("isPreLoading-watch");
      document.title = "享受美吧";
    }
  },
  beforeDestroy() {
    console.log("beforeDestroy-log-videoSpecialBox");
    document.title = commonJs.config.webTitle;
    window.hxsapp_visible_share_btn_mar &&
      delete window.hxsapp_visible_share_btn_mar;
  },
  computed: {
    isLogin: function() {
      return commonJs.isLogin();
    },
    isApp: function() {
      return commonJs.isApp();
    }
  },
  mounted() {
    // console.log("mounted--log")
    var that = this;
    //文章类型/文章的id/父评论id/sess_token
    this.commentInfo.type = 0;
    var __version = commonJs.getHxsAppVersion();
    let ua = window.navigator.userAgent;
    this.isAndroid = new RegExp("Android").test(ua);
    // this.commentInfo.data_id = this.$route.params.article_id;
    this.commentInfo.sess_token = commonJs.getUrlParam("sess_token");
    this.play_id = commonJs.getUrlParam("play_id");
    this.type_id = commonJs.getUrlParam("type_id");
    this.news_id = commonJs.getUrlParam("news_id");
    var __type_id = this.$route.params.type_id;
    commonJs.buriedPoint({
      access_occurred_type: 110701, //发生访问的【页面】类型
      access_occurred_type_id: __type_id, //发生访问的【页面】类型ID
      previous_event_type_obj: "", //【事件】对象类型
      previous_event_type_obj_id: "", //【事件】对象类型ID
      previous_content_sort: "" //【事件】事件参数
    });

    // 非app场景下面才有用 有有版本限制 是3.0.1开始的
    if (!this.isApp) {
      // http://wiki.sys.hxsapp.net/pages/viewpage.action?pageId=1998876
      var __url =
        commonJs.config.prefixUrl +
        "enjoyBeauty?type_id=" +
        __type_id +
        "&news_id=" +
        this.news_id;
      if (this.play_id) {
        __url =
          commonJs.config.prefixUrl +
          "enjoyBeauty?type_id=" +
          __type_id +
          "?play_id=" +
          this.play_id +
          "&news_id=" +
          this.news_id;
      }
      this.linkedMe = {
        params: {
          // key 是写死的   value是协议，具体见这里－http://wiki.sys.hxsapp.net/pages/viewpage.action?pageId=1998876
          key: "hxsapp://web?url=" + __url
        }
      };
    }
    this.windowHeigth = document.documentElement.clientWidth;
    var videoHeight = document.documentElement.clientWidth * 0.5625;
    this.bodyHeight = document.documentElement.clientHeight - videoHeight; //高度
    this.videoHeight = videoHeight;
    this.getListByTypeId();
    this.getListByNews();
    this.getListBymoving();
  },
  methods: {
    // paperScroll(e){
    //   var scrollTop=e.target.scrollTop;
    // },
    // 设置删除文章的同期高度
    set_no_article_box_css() {
      this.$nextTick(() => {
        $(".no_article_box").css({
          height: $(window).height() + "px"
        });
      });
    },
    playStatus(data) {
      this.isPlayer = data;
    },
    hidePlayer() {
      this.isClose = true;
      this.bodyHeight = document.documentElement.clientHeight;
    },
    pictrueCallBack(isBoolean) {
      //接受picture子组件参数
      this.pictureShow = isBoolean;
    },
    // 预览图片
    openImgIndexFn(index, imglist) {
      //查看图片
      this.dynamicImages = imglist;
      this.openImgIndex = index;
      this.pictureShow = true;
    },
    //跳转享受美吧话题页
    goTopic(id) {
      var __version = commonJs.getHxsAppVersion();
      let ua = window.navigator.userAgent;
      let isAndroid = new RegExp("Android").test(ua);
      if (!this.isApp) {
        this.showPopupDownLoadCall();
        return false;
      }
      if (isAndroid) {
        window.location.href = "hxsapp://topicInfo?topicId=" + id;
        return false;
      }
      if (
        commonJs.compareAppVersion(__version, "3.3.5") ||
        __version == "3.3.5"
      ) {
        var isIos = new RegExp("iPhone").test(ua);
        var isIpad = new RegExp("iPad").test(ua);
        if (isIos || isIpad) {
          window.location.href = "https://hxsapp_topic_page?topicId=" + id;
        }
      } else {
        Toast("此版本暂不支持");
      }
    },
    // 显示或隐藏更多
    checkMore(type) {
      // if (!this.isApp) {
      //   this.showPopupDownLoadCall();
      //   return false;
      // }
      this.showMore = !this.showMore;
      this.playerShow = !this.playerShow;
      this.isShowLoading = true;
      if (!this.showMore) return false;
      switch (type) {
        case 0:
          this.moreType = type;
          this.moreTitle = "视频集合";
          this.is_all = 2;
          this.getListByTypeId();
          break;
        case 1:
          this.newsList = [];
          this.moreTitle = "节目新闻";
          this.is_all = 2;
          this.moreType = type;
          this.getListByNews();
          break;
        case 2:
          this.movingList = [];
          this.moreType = type;
          this.is_all = 2;
          this.moreTitle = "选手动态";
          this.getListBymoving();
          break;
      }
    },
    //跳转个人主页
    goUserInfo(id) {
      if (!this.isApp) {
        this.showPopupDownLoadCall();
        return false;
      }
      if (this.isLogin) {
        // 登陆了跳转个人主页
        window.location.href = "https://hxsapp_user_info#" + id;
      } else {
        // 没有登录调起app登录
        commonJs.h5CallAppAction.hxsapp_showloginpage();
      }
    },
    // 加载更多
    loadMore() {
      if (
        this.loadingText == "加载中..." ||
        this.loadingText == "没有更多数据了"
      )
        return false;
      this.getCommentData(0);
    },
    // 切换视频
    checkVideo(id) {
      var __array = window.location.search.split("?")[1].split("&");
      var url = "";
      if (!commonJs.getUrlParam("play_id")) {
        __array.push("play_id=" + id);
      }
      for (var i = 0; i < __array.length; i++) {
        if (
          __array[i] == "play_id=" + this.play_id ||
          __array[i] == "play_id="
        ) {
          __array.splice(i, 1, "play_id=" + id);
        }
        if (url == "") {
          url = "?" + __array[i];
        } else {
          url = url + "&" + __array[i];
        }
      }
      this.link = commonJs.config.prefixUrl + "enjoyBeauty" + url;
      this.isPreLoading = true;
      window.location.replace(this.link);
    },
    //H5通知客户端显示分享数据
    setShareContent() {
      var shareTitle = "享受美吧";
      var __search = "";
      if (this.play_id) {
        __search = "&play_id=" + this.play_id;
      }
      var shareLink =
        commonJs.config.prefixUrl +
        "enjoyBeauty?type_id=" +
        this.$route.params.type_id +
        __search +
        "&news_id=" +
        this.news_id;
      var shareImages = this.nowPlayinfo.images[0];
      var shareDescr = encodeURIComponent(this.nowPlayinfo.descr); //分享描述
      // article_id 从数据里面拿出来
      var shareArticleId = this.nowPlayinfo.id;
      var shareType = "videoSpecial";
      var shareMediaLink = this.nowPlayinfo.file_name
        ? this.nowPlayinfo.file_name
        : "";
      var shareActWindowTitle = "";
      var shareActWindowDescr = "";
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
      };
      this.shareContent = shareData;
      this.hasShareContentData = true;
      this.initShare(shareData);
    },

    // app右上角分享
    initShare(shareData) {
      console.log("initShare-initShare-function");
      if (this.isApp) {
        var __article_id = this.nowPlayinfo.id;
        var json = {
          access_occurred_type: 210563, //发生访问的【页面】类型
          access_occurred_type_id: "", //发生访问的【页面】类型ID
          previous_event_type_obj: __article_id, //【事件】对象类型
          previous_event_type_obj_id: "", //【事件】对象类型ID
          previous_content_sort: "" //【事件】事件参数
        };
        // debugger
        // console.log(this.setShareContent())
        // 点击app上右上角分享按钮，app回调 h5的全局函数
        //  app 开始 3.0.0 支持
        window.hxsapp_visible_share_btn_mar = function() {
          commonJs.buriedPoint(json);
        };
        commonJs.h5CallAppAction.hxsapp_visible_share_btn(shareData);
      } else {
        //二次分享－微信下
        // setShareContent
        // seconDaryShare(decodeURIComponent(Info.title), decodeURIComponent(Info.desc), Info.link, Info.img, data.appId, data.timestamp, data.noncestr, data.signature);
        var title = shareData.shareTitle;
        var desc = shareData.shareDescr;
        var link = shareData.shareLink;
        var img = shareData.shareImages;

        commonJs.outSideShare({
          title,
          desc,
          link,
          img
        });
      }
    },
    // 获取视选集的数据
    getListByTypeId() {
      // 接口请求数据
      let json = {
        type_id: this.type_id,
        is_all: this.is_all,
        play_id: this.play_id,
        sess_token: commonJs.getUrlParam("sess_token")
      };
      axios
        .get("https://act.hxsapp.com/content/Program/article", {
          params: json
        })
        .then(res => {
          if (res.data.code == 200) {
            this.videoList = res.data.data;
            if (this.is_all != 2) {
              this.nowPlayinfo = res.data.data.player;
            }
            this.play_id = res.data.data.player.id;
            this.commentInfo.data_id = res.data.data.player.id;
            this.isShowLoading = false;
            this.getCommentData(0);
          } else {
            this.isShowLoading = false;
          }
        })
        .catch(Error => {
          console.log(Error);
          this.isShowLoading = false;
        });
    },
    // 获取新闻列表数据
    getListByNews() {
      // 接口请求数据
      let json = {
        type_id: this.news_id,
        is_all: this.is_all,
        sess_token: commonJs.getUrlParam("sess_token")
      };
      axios
        .get("https://act.hxsapp.com/content/Program/article", {
          params: json
        })
        .then(res => {
          if (res.data.code == 200) {
            this.newsList = res.data.data;
            this.isShowLoading = false;
          } else {
            this.isShowLoading = false;
          }
        })
        .catch(Error => {
          console.log(Error);
        });
    },
    // 获取选手动态列表
    getListBymoving() {
      // 接口请求数据
      let json = {
        is_all: this.is_all,
        sess_token: commonJs.getUrlParam("sess_token")
      };
      axios
        .get("https://act.hxsapp.com/content/Program/players", {
          params: json
        })
        .then(res => {
          if (res.data.code == 200) {
            this.movingList = res.data.data;
            this.isShowLoading = false;
          } else {
            this.isShowLoading = false;
          }
        })
        .catch(Error => {
          console.log(Error);
        });
    },
    // 获取用户评论列表的方法
    getCommentData(initType) {
      // 接口请求数据
      let json = {
        type: initType,
        // data_id: this.$route.params.article_id,
        data_id: this.nowPlayinfo.id,
        last_id: this.lastId,
        sess_token: commonJs.getUrlParam("sess_token")
      };
      // debugger
      axios
        .get("https://api.hxsapp.com/community/userComment/getCommentList", {
          params: json
        })
        .then(res => {
          if (res.data.code == 200) {
            if (res.data.data != "") {
              if (this.commentData) {
                this.commentData = this.commentData.concat(res.data.data);
              } else {
                this.commentData = res.data.data;
              }
              this.lastId = this.commentData[this.commentData.length - 1].id;
              this.loadingText = "上拉加载更多";
            } else {
              this.loadingText = "没有更多数据了";
            }
            this.isPreLoading = false;
          } else {
            this.isPreLoading = false;
          }
        });
    },
    addCommentData(data) {
      if (this.commentData) {
        this.commentData.unshift(data.item);
        this.commentData = this.commentData;
      } else {
        this.commentData.push(data.item);
      }
    },
    // 跳转文章详情
    goArticleDetail(id) {
      if (this.isApp) {
        var url = commonJs.config.prefixUrl + "articleDetail/" + id;
        window.location.href = "https://hxsapp_new_webview#" + url;
      } else {
        this.showPopupDownLoadCall();
        return false;
      }
    },
    // 关注按钮
    followBtn(id, index, is_follow) {
      if (this.isApp) {
        // 点击app上右上角分享按钮，app回调 h5的全局函数
        //  app 开始 3.0.0 支持
        if (this.isLogin) {
          // 接口请求数据
          let json = {
            sess_token: commonJs.getUrlParam("sess_token"),
            followed_user_id: id
          };
          var __url;
          if (is_follow == "yes") {
            __url = "https://api.hxsapp.com/community/userRelate/cancelFollow";
          } else if (is_follow == "no") {
            // __url = "https://api.hxsapp.com/community/userRelate/cancelFollow"
            __url = "https://api.hxsapp.com/community/userRelate/follow";
          }
          axios
            .get(__url, {
              params: json
            })
            .then(res => {
              if (res.data.code == 200) {
                Toast(res.data.msg);
                if (is_follow == "yes") {
                  this.movingList.players[index].is_follow = "no";
                } else if (is_follow == "no") {
                  this.movingList.players[index].is_follow = "yes";
                }
              } else {
                Toast(res.data.msg);
                if (res.data.msg == "已经关注") {
                  this.movingList.players[index].is_follow = "yes";
                } else if (res.data.msg == "尚未关注") {
                  this.movingList.players[index].is_follow = "no";
                }
              }
            })
            .catch(Error => {
              console.log(Error);
            });
        } else {
          console.log("没有登录了,这里调起app的登录协议");
          commonJs.h5CallAppAction.hxsapp_showloginpage();
        }
      } else {
        this.popAppDownBox();
      }
    },
    showPopupDownLoadCall() {
      this.isPopupDownLoad = true;
    },
    hidePopupDownLoadCall() {
      this.isPopupDownLoad = false;
    },
    popAppDownBox() {
      this.isPopupDownLoad = true;
    },
    // 加载页面依赖的数据
    loaddPage(obj) {
      // debugger
      // 根据obj传回来的对象键名 action 来做处理
      // action aliyunPlaer
      // action audioPlaer
      // action:"defaultArticle"
    },
    // 组件回调处理 为视频组件 去使用
    renderVideoCall(data) {
      this.$nextTick(() => {
        this.loaddPage(data);
      });
    },
    clickZanBtn(id, index, type, btnType) {
      if (this.isApp) {
        if (this.isLogin) {
          // 接口请求数据
          let json = {
            // 需要找极光确认一下
            type: type,
            // type: this.initType,
            data_id: id,
            sess_token: commonJs.getUrlParam("sess_token")
          };
          axios
            .get("https://api.hxsapp.com/community/userCommend/doCommend", {
              params: json
            })
            .then(res => {
              if (res.data.code == 200) {
                Toast(res.data.msg);
                if (res.data.action == "commend") {
                  // 视频类型点赞
                  if (btnType == "video") {
                    this.videoList.list[index].checkIsCommend = "yes";
                    this.videoList.list[index].commend_num =
                      parseInt(this.videoList.list[index].commend_num) + 1;
                  }
                  // 文章类型点赞
                  if (btnType == "news") {
                    this.newsList.list[index].checkIsCommend = "yes";
                    this.newsList.list[index].commend_num =
                      parseInt(this.newsList.list[index].commend_num) + 1;
                  }
                  // 动态类型点赞
                  if (btnType == "publish") {
                    this.movingList.new_diary[index].checkIsCommend = "yes";
                    this.movingList.new_diary[index].commend_num =
                      parseInt(this.movingList.new_diary[index].commend_num) +
                      1;
                  }
                  // 评论类型点赞
                  if (btnType == "eval") {
                    this.commentData[index].is_commend = "yes";
                    this.commentData[index].commend_num =
                      parseInt(this.commentData[index].commend_num) + 1;
                  }
                } else if (res.data.action == "cancel") {
                  // 视频类型取消点赞
                  if (btnType == "video") {
                    this.videoList.list[index].checkIsCommend = "no";
                    this.videoList.list[index].commend_num =
                      parseInt(this.videoList.list[index].commend_num) - 1 < 0
                        ? 0
                        : parseInt(this.videoList.list[index].commend_num) - 1;
                  }
                  // 文章类型取消点赞
                  if (btnType == "news") {
                    this.newsList.list[index].checkIsCommend = "no";
                    this.newsList.list[index].commend_num =
                      parseInt(this.newsList.list[index].commend_num) - 1 < 0
                        ? 0
                        : parseInt(this.newsList.list[index].commend_num) - 1;
                  }
                  // 动态类型取消点赞
                  if (btnType == "publish") {
                    this.movingList.new_diary[index].checkIsCommend = "no";
                    this.movingList.new_diary[index].commend_num =
                      parseInt(this.movingList.new_diary[index].commend_num) -
                        1 <
                      0
                        ? 0
                        : parseInt(
                            this.movingList.new_diary[index].commend_num
                          ) - 1;
                  }
                  // 评论类型取消点赞
                  if (btnType == "eval") {
                    this.commentData[index].is_commend = "no";
                    this.commentData[index].commend_num =
                      parseInt(this.commentData[index].commend_num) - 1 < 0
                        ? 0
                        : parseInt(this.commentData[index].commend_num) - 1;
                  }
                }
              } else {
                Toast(res.data.msg);
              }
            })
            .catch(Error => {
              console.log("doCommend-error");
            });
        } else {
          console.log("没有登录了,这里调起app的登录协议");
          commonJs.h5CallAppAction.hxsapp_showloginpage();
        }
      } else {
        console.log("弹出下载的提示框box设计");
        this.popAppDownBox();
      }
    },
    // 点击去评论的页面
    goContentNunPage(parent_comment_id, type) {
      if (this.isApp) {
        if (this.isLogin) {
          var __url =
            commonJs.config.prefixUrl +
            "commentChild/" +
            type +
            "/" +
            this.play_id +
            "/" +
            parent_comment_id +
            "?soucrePage=videoSpecial&sess_token=" +
            commonJs.getUrlParam("sess_token") +
            "&data_id=" +
            this.play_id;
          commonJs.h5CallAppAction.hxsapp_new_webview(
            encodeURIComponent(__url)
          );
          // this.$router.replace({
          //   //全部评论回复页面（文章类型/文章id，父级评论id）
          //   path: "/commentChild/" + this.initType + "/" + this.initDataId + "/" + data.id
          // })
        } else {
          console.log("没有登录了,这里调起app的登录协议");
          commonJs.h5CallAppAction.hxsapp_showloginpage();
        }
      } else {
        console.log("弹出下载的提示框box设计");
        this.popAppDownBox();
      }
    }
  }
};
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
/* 边框线 */
.line_xi_before {
  position: relative;
}

.line_xi_before:before {
  position: absolute;
  top: 0px;
  right: 0;
  left: 0;
  height: 1px;
  content: "";
  -webkit-transform: scaleY(0.5);
  transform: scaleY(0.5);
  background-color: rgba(129, 141, 207, 0.2);
}

.line_xi_after {
  position: relative;
}

.line_xi_after:after {
  position: absolute;
  right: 0;
  left: 0;
  bottom: 0px;
  height: 1px;
  content: "";
  -webkit-transform: scaleY(0.5);
  transform: scaleY(0.5);
  background-color: rgba(129, 141, 207, 0.2);
}
/*
  *flex：定义布局为盒模型
	*flex-v：盒模型垂直布局
	*flex-PF：子元素占据剩余的空间
	*flex-align-center：子元素垂直居中
	*flex-pack-center：子元素水平居中
	*flex-pack-justify：子元素两端对齐
 */

.flex {
  display: -webkit-box;
  display: -moz-box;
  display: -ms-flexbox;
  display: -webkit-flex;
  display: flex;
}
.flex-warp {
  -webkit-box-lines: multiple;
  box-lines: multiple;
  -webkit-flex-wrap: wrap;
  -moz-flex-wrap: wrap;
  -ms-flex-wrap: wrap;
  -o-flex-wrap: wrap;
  flex-wrap: wrap;
}
.flex-pack-justify {
  -webkit-box-pack: justify;
  -webkit-justify-content: space-between;
  -ms-flex-pack: justify;
  justify-content: space-between;
}
.flex-pack-end {
  -webkit-box-pack: end;
  -webkit-justify-content: flex-end;
  -ms-flex-pack: end;
  justify-content: flex-end;
}
.flex-align-end {
  align-items: flex-end;
}
.flex-pack-center {
  -webkit-box-pack: center;
  -webkit-justify-content: center;
  -moz-justify-content: center;
  -ms-justify-content: center;
  -o-justify-content: center;
  justify-content: center;
}
.flex-align-center {
  -webkit-box-align: center;
  -webkit-align-items: center;
  -ms-flex-align: center;
  align-items: center;
}
.flex-space {
  align-content: space-around;
}
#videoSpecialBox {
  width: 100%;
  max-width: 640px;
  margin: auto; // 文章删除的样式
  .no_article_box {
    position: relative;
    width: 100%;
    margin: 0 auto;
    text-align: center;
    .no_article {
      display: block;
      position: absolute;
      width: 140px;
      height: 140px;
      left: 50%;
      top: 50%;
      z-index: 1;
      margin-left: -70px;
      margin-top: -120px;
      background: url(../assets/images/quesheng_kong.png) left top no-repeat;
      background-size: 100%;
      &:after {
        content: "抱歉，此文章已删除";
        display: block;
        position: absolute;
        bottom: -50px;
        left: -50px;
        width: 240px;
        text-align: center;
        color: #333;
        font-size: 17px;
      }
    }
  }
}
.play-box {
  position: fixed !important;
  top: 0;
  z-index: 10 !important;
  background: #000;
  width: 100%;
  overflow: hidden;
}
.play-box img {
  width: 60px;
  height: 60px;
  margin: auto;
}

.close-player {
  position: fixed;
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
.loading-more {
  text-align: center;
  line-height: 44px;
  font-size: 0.8em;
  color: #999;
}
.list-box {
  overflow: scroll;
  background: rgba(245, 245, 248, 1);
  -webkit-overflow-scrolling: touch;
}

.list-title {
  padding: 0 10px;
  line-height: 50px;
  font-size: 0.9em;
  position: relative;
}

.list-title-left {
  color: #999;
}
.android-btn {
  position: fixed;
  right: 50px;
  border-radius: 40px;
  color: #818dcf;
  border: 1px #818dcf solid;
  line-height: 26px;
  /* top: 10px; */
  margin-top: 10px;
  padding: 0 15px;
  font-size: 13px;
  padding-top: 1px;
  z-index: 5;
}
.list-title-right {
  font-size: 14px;
  color: #818dcf;
  position: relative;
}

.more-icon {
  width: 12px;
  margin-top: -2px;
}

.video-list-content {
  width: 95%;
  margin: auto;
  padding-bottom: 1px;
}

.video-list-box {
  background: #fff;
  border-bottom: 10px rgba(245, 245, 248, 1) solid;
}

.news-box .content-list {
  padding-bottom: 15px;
}

.content-list {
  margin-bottom: 15px;
}

.news-box .content-list:last-of-type {
  margin-bottom: 0;
}

.content-list .list-content-img {
  width: 40%;
  position: relative;
}
.time-badge {
  position: absolute;
  color: rgba(255, 255, 255, 1);
  font-size: 0.7em;
  background: linear-gradient(
    90deg,
    rgba(82, 90, 133, 0),
    rgba(82, 90, 133, 0.45),
    rgba(82, 90, 133, 1)
  );
  opacity: 0.7;
  bottom: 0;
  right: 0;
  padding: 2px 5px;
}
.list-content-img-cell {
  width: 100%;
}

.list-content-img-cell img {
  width: 32%;
  margin: 10px 0;
  vertical-align: middle;
  height: 85px;
}

.list-content-img img {
  width: 100%;
  min-height: 85px;
  vertical-align: middle;
}

.list-content-right {
  width: 61%;
  padding-left: 10px;
}

.list-content-right-cell {
  width: 100%;
}

.list-content-title {
  width: 100%;
  color: #333;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
  overflow: hidden;
  font-size: 0.9em;
}

.list-content-btn {
  width: 100%;
  padding-top: 5px;
}

.list-content-btn img,
.eval-header-right-btn img,
.publish-bottom-btn img {
  width: 21px;
  height: 21px;
}

.eval-header-right-btn {
  position: relative;
  top: -8px;
}

.list-content-num {
  font-size: 0.9em;
  color: #999;
  padding-left: 2px;
  margin-top: 1px;
  line-height: 21px;
}

.list-content-num:first-of-type {
  padding-right: 15px;
}

.all-list-btn {
  text-align: center;
  line-height: 44px;
  color: #999;
  font-size: 0.9em;
}

.moving-box {
  background: #fff;
  border-bottom: 10px rgba(245, 245, 248, 1) solid;
}

.contestant-scroll {
  width: 100%;
  display: -webkit-box;
  white-space: nowrap;
  overflow-x: scroll;
  /* 1 */
  overflow-y: hidden;
  -webkit-backface-visibility: hidden;
  -webkit-perspective: 1000;
  -webkit-overflow-scrolling: touch;
  /* 2 */
}

.scroll-item {
  width: 25%;
  text-align: center;
  position: relative;
}

.avatar-img-box {
  width: 70px;
  height: 70px;
  overflow: hidden;
  position: relative;
  margin: auto;
  border-radius: 100%;
  margin-bottom: 10px;
}
.item-avatar-box {
  position: relative;
  top: 70px;
  right: 10px;
  margin: auto;
  z-index: 2;
}
.scroll-item .item-avatar {
  width: 100%;
  min-height: 70px;
  margin: auto;
  background-color: #f1f1ff;
}

.item-avatar-badge {
  width: 18px;
  height: 18px;
  position: absolute;
  right: 0;
  bottom: 80px;
}

.contestant-name {
  color: #666;
  font-size: 14px;
  padding-bottom: 5px;
  line-height: 10px;
}

.contestant-attention {
  font-size: 0.9em;
  color: #818dcf;
  padding-bottom: 15px;
}

.publish-content {
  padding: 0 10px;
}

.publish-header {
  padding: 10px 0;
}
.publish-avatar-box {
  width: 40px;
  height: 40px;
  border-radius: 40px;
  overflow: hidden;
}
.publish-avatar {
  width: 100%;
}

.publish-content-center {
  width: 85%;
}

.publish-content-right {
  width: 25px;
  height: 25px;
}

.publish-username {
  font-size: 0.9em;
  color: #666;
}

.publish-time {
  font-size: 0.75em;
  color: #999;
  line-height: 20px;
}
.publish-center-text {
  font-size: 15px;
  color: #333;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 4;
  overflow: hidden;
}

.publish-center-lable {
  color: #818dcf;
}

.publish-center-imglist {
  margin-top: 10px;
}
.publish-center-imglist div {
  width: 32.5%;
  margin-bottom: 4px;
  overflow: hidden;
}
.publish-center-imglist div img {
  width: 100%;
}
.one-width {
  width: 55% !important;
  min-height: 150px;
}
.two-width {
  width: 49% !important;
  min-height: 150px;
}
.other-heigth {
  max-height: 70px;
}
.publish-bottom-address {
  line-height: 44px;
}

.publish-bottom-address .lable {
  color: #818dcf;
  font-size: 0.9em;
}

.publish-bottom-address .address {
  font-size: 0.9em;
  color: #999;
}

.eval-box {
  background: #fff;
  padding-left: 10px;
}

.eval-title {
  padding-left: 0;
}

.eval-content {
  padding-right: 10px;
  margin-top: 10px;
}

.eval-userbox {
  width: 60%;
  padding-left: 10px;
}

.eval-text {
  padding-left: 48px;
  font-size: 0.9em;
  color: #333;
}

.eval-text p {
  padding-bottom: 15px;
  padding-left: 1px;
}
.children-eval-box {
  background: #f1f1f1;
  padding-left: 0 10px;
  border-radius: 3px;
}
.children-item {
  padding: 0 10px;
  line-height: 30px;
}
.children-name {
  color: #818dcf;
}
.children-content {
  font-size: 0.8em;
  padding-left: 5px;
}
.all-list-box {
  position: fixed;
  top: 0;
  width: 100%;
  height: 100%;
  overflow: scroll;
  background: rgba(245, 245, 248, 1);
  -webkit-overflow-scrolling: touch;
  z-index: 1000;
}
.more-float-title {
  width: 100%;
  position: fixed;
  top: 0;
  background: #fff;
  z-index: 1001;
  padding: 0;
}
.more-float-title .list-title-left {
  padding-left: 10px;
}
.more-float-title .list-title-right {
  padding-right: 10px;
}
.more-content {
  margin-top: 50px;
}
.down-icon {
  width: 10px;
  position: relative;
  margin-left:5px;
}
.initText {
  padding: 0 0 0 11px;
  margin-bottom: 19px;
  text-align: center;
}

.initText .no_pinlun {
  width: 240px;
  height: 140px;
  background: url(../assets/images/quesheng_kong.png) 50% top no-repeat;
  background-size: 140px 140px;
  display: block;
  margin: 40px auto 0;
  position: relative;
  left: -11px;
  padding-top: 150px;
}
.loading-showmore {
  position: absolute;
  width: 100%;
  height: 100%;
  line-height: 100vh;
  left: 0;
  right: 0;
  margin: auto;
  text-align: center;
  background: #fff;
}
</style>
