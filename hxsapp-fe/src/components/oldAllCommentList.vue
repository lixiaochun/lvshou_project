
<template>
  <div class="oldAllCommentList">
    <!--
      全部评论区域
    -->
    <div class="title" v-if="total != 0">
      全 部 评 论 ({{total}})
    </div>
    <div class="title" v-if="total == 0">
      全 部 评 论 
    </div>

    <div class="scrollLoading" v-infinite-scroll="loadMore" infinite-scroll-disabled="loading" infinite-scroll-distance="0" infinite-scroll-immediate-check="true">
      <div v-if="!isLoadingStart" class="initText">
        加载数据中...
      </div>
      <div class="initText" v-if="total == 0 ">
        <div class="no_pinlun">
          目前还没有人给你评论哦
        </div>
      </div>

      <div :id='"commentLi_" + data.id ' style="margin:15px 0;"  v-for="(data,index) in commentData" :key="data.id">

        <div class="all-info">
          <div class="img-box">
            <!--
            <img :src="data.head_img">
            -->
            <span v-if="data.head_img" :style="{background:'url(' + data.head_img + ') center center /140% no-repeat'}" @click="goDynamicPage(data)"></span>
          </div>
          <div class="info">
            <div class="name">{{ data.nickname }}</div>
            <span>{{ data.create_time }}</span>
            <!-- <span>{{ data.create_time.substring(5,16) }}</span> -->
          </div>
          <div class="methods">

            <!--点赞按钮区域-->
            <div :class=" data.is_commend == 'yes'? 'give-good yes': 'give-good'" @click="clickZanBtn(data,index)">
              <i></i>
              <em>
                {{ data.commend_num }}
              </em>
            </div>

            <!--评论按钮区域-->
            <div class="content-nun" @click="goContentNunPage(data)">
              <i></i>
              <em v-if="data && data.commentChildren && data.commentChildren.total >= 0 ">{{data.commentChildren.total}}</em>
              <em v-if="data && ! data.commentChildren"> 0</em>
            </div>

          </div>
        </div>
        <div class="content-msg">
          <p class="discuss">
            {{ data.content }}
          </p>
          <div v-if="isApp && isLogin && data.is_mine" class="delete-box" @click="deleteDiscussBtn(data,index)">
            <em>删除</em>
          </div>

          <div class="new_cont_reply" v-if="data.admin_reply">
            <div class="new_reply_content">
                <span><i></i>好享瘦小编回复:</span><em>
                {{data.admin_reply}}
                </em>
            </div>
          </div>

          <div class="reply-comment" v-if="data &&  data.commentChildren &&  data.commentChildren.data.length >= 1">

            <p v-for="msg in data.commentChildren.data" :key="msg.id">
              <span>
                {{msg.nickname}}:
              </span>
              {{msg.content}}
            </p>

            <!-- 点击查看全部回复的事件 -->
            <a href="javascript:;" @click="goContentNunPage(data)" v-if="data &&  data.commentChildren && data.commentChildren.data.length >= 2">
              查看全部回复({{ data.commentChildren.total}}) >>
            </a>
          </div>
        </div>
        <div class="solid"></div>
      </div>

      <div class="loadTip" v-if="loadTip && total >= 10">正在加载中...</div>
      <div class="loadEnd" v-if="loadEnd && total != 0 ">已经到底了，没有数据了...</div>
    </div>

  </div>
</template>
<script>

import axios from 'axios'
import commonJs from '@/util/common.js'
import { MessageBox } from 'mint-ui'
import { Toast } from 'mint-ui'


export default {
  name: 'oldAllCommentList',
  props: {
    
    // 埋点路径用的
    soucrePage:{
      type: String,
      default: "default"
    },

    newCommentData: {
      type: Object,
      default: function() {
        return {}
      }
    },

    // 获取数据的类型id
    // 文章=0/动态=1/商品=2/课程=3
    initType: {
      type: [Number, String],
      required: true
    },
    // 获取数据的类型id
    initDataId: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      total: 0,
      // 评论列表数据
      commentData: [],

      // （1）是否已经加载了后端接口评论数据的判断（2）显示默认加载文案
      isLoadingStart: false,

      // 是否已经还需要加载评论数据的判断
      loading: false,

      // 滚动加载后端接口使用的参数lastId
      lastId: null,

      // 是否显示加载中的提示文案
      loadTip: false,

      // 是否显示加载到底部的提示文案
      loadEnd: false
    }
  },
  watch: {
    newCommentData: function(val, oldVal) {
      // debugger
      console.log('new: %s, old: %s', val, oldVal)
      console.log(this.commentData.length)

      val.item.nickname = commonJs.subStlength( val.item.nickname ) 
      
      this.commentData.unshift(val.item)

      console.log(this.commentData.length)
      // console.log(this.total)

      this.total = parseInt(this.total) + 1;
    }
  },
  computed: {
    isLogin: function() {
      return commonJs.isLogin()
    },
    isApp: function() {
      return commonJs.isApp()
    }
  },
  mounted() {
    this.getCommentData();
  },
  beforeDestroy(){
    $(".mint-msgbox-wrapper").length && $(".mint-msgbox-wrapper").remove()
  },
  methods: {
    goDynamicPage(data){
      console.log("goDynamicPage")
      // var url = commonJs.config.prefixUrl + "dynamic/" + data.id;
      // console.log("url:" + url);

      if( this.isApp ){

        window.location.href = "https://hxsapp_user_info#" + data.user_id;	
      }else{
        setTimeout(() => {
          // window.location.href = commonJs.config.prefixUrl + "articleDetail/" + data.id + window.location.search;
          var __url  = commonJs.config.prefixUrl + "dynamic/" + data.id + window.location.search;
          window.location.replace( __url );
        }, 100)
      }

    },
    // 删除评论的事件处理
    deleteDiscussBtn(data, index) {

      if (this.isApp) {
        if (this.isLogin) {
          console.log("若登录了，就去调用机光的删除评论接口-https://api.hxsapp.com/community/userComment/deleteComment")

          // 接口请求数据
          let json = {
            type: this.initType,
            comment_id: data.id,
            sess_token: commonJs.getUrlParam("sess_token")
          };

          // type  int Y 评论对象的类型，文章=0/动态=1/商品=2/课程=3/资讯栏目=4..
          // comment_id  int Y 评论对象的id
          // sess_token  string  Y 用户令牌

          setTimeout(()=>{

            $(".mint-msgbox").css({
                "border-radius": "5px"
            })
            $(".mint-msgbox-content").css({
                "padding": "35px 20px"
            })
            
            $(".mint-msgbox-confirm").css({
                color: "#FF68B0"
            })
            
            $(".mint-msgbox-message").css({
                color: "#333"
            })

          },10)
    
          MessageBox({
            title: '',
            message: '确定执行删除此条评论的操作吗?',
            showCancelButton: true,
            closeOnClickModal: false
          }).then((action) => {
            console.log("actio-value:" + action);
            if (action == "confirm") {
              console.log(action + "-case")

              axios.get('https://api.hxsapp.com/community/userComment/deleteComment',
                { params: json }
              ).then((res) => {
                if (res.data.code == 200) {
                  Toast(res.data.msg)
                  console.log(this.commentData)
                  console.log(this.commentData.length)
                  this.commentData.splice(index, 1)
                  console.log(this.commentData)
                  console.log(this.commentData.length)
                  if (this.total != 0) {
                    this.total = parseInt(this.total) - 1
                  } else {
                    this.total = 0
                  }

                  setTimeout(() => {
                    console.log("1111111111111111111")
                    this.$emit("updateCommentTotalNum", this.total)
                  }, 100)

                }
              }).catch((Error) => {
                console.log(Error)
                Toast("服务异常，请稍后再试！")
              })


            } else if (action == "cancel") {
              console.log(action + "-case")

            }
          });

        } else {
          console.log("没有登录了,这里调起app的登录协议");
          commonJs.h5CallAppAction.hxsapp_showloginpage()
        }
      } else {
        console.log("弹出下载的提示框box设计")
        this.popAppDownBox()
      }
    },

    popAppDownBox() {
      // alert("弹出下载的提示框box设计")
      this.$parent.showPopupDownLoadCall && this.$parent.showPopupDownLoadCall()
    },

    // 点赞按钮的处理
    clickZanBtn(data, index) {
      console.log(data)
      console.log("clickZanBtn-clickZanBtn=index:" + index);
      
      //文章=0/动态=1/商品=2/课程=3 
      if(this.initType == 3){

        //埋点
        // commonJs.buriedPoint({
        //   access_occurred_type: ,//发生访问的【页面】类型
        //   access_occurred_type_id: '',//发生访问的【页面】类型ID
        //   previous_event_type_obj: '',//【事件】对象类型
        //   previous_event_type_obj_id: this.initDataId,//【事件】对象类型ID
        //   previous_content_sort: ''//【事件】事件参数
        // });

      }
      if(this.soucrePage == "videoSpecial" ) {
        //埋点
        commonJs.buriedPoint({
          access_occurred_type: 210574,//发生访问的【页面】类型
          access_occurred_type_id: this.initDataId,//发生访问的【页面】类型ID
          previous_event_type_obj: '',//【事件】对象类型
          previous_event_type_obj_id: '',//【事件】对象类型ID
          previous_content_sort: ''//【事件】事件参数
        });
      }

      if (this.isApp) {
        if (this.isLogin) {
          console.log("若登录了，就去调用极光的接口-https://api.hxsapp.com/community/userCommend/doCommend")
          
          // http://wiki.sys.hxsapp.net/pages/viewpage.action?pageId=7343785
          // 接口请求数据
          let json = {

            // 需要找极光确认一下
            type: 1, 
            // type: this.initType,
            data_id: data.id,
            sess_token: commonJs.getUrlParam("sess_token")
          };
          axios.get('https://api.hxsapp.com/community/userCommend/doCommend',
            { params: json }
          ).then((res) => {
            if (res.data.code == 200) {
              Toast(res.data.msg)
              if (res.data.action == "commend") {
                // debugger

                this.commentData.splice(index, 1, Object.assign({}, data, {
                  is_commend: "yes",
                  commend_num: parseInt(data.commend_num) + 1
                }))
              } else if (res.data.action == "cancel") {
                this.commentData.splice(index, 1, Object.assign({}, data, {
                  is_commend: "no",
                  commend_num: parseInt(data.commend_num) - 1 < 0 ? 0 : parseInt(data.commend_num) - 1
                  // commend_num: parseInt(data.commend_num) - 1
                }))

              }
            }
          }).catch((Error) => {
            console.log("doCommend-error")
          })


        } else {
          console.log("没有登录了,这里调起app的登录协议");
          commonJs.h5CallAppAction.hxsapp_showloginpage()
        }
      } else {
        console.log("弹出下载的提示框box设计")
        this.popAppDownBox()
      }

    },
    // 点击去评论的页面
    goContentNunPage(data) {
      console.log(data)
      console.log("goContentNunPage-goContentNunPage");
      
      if(this.soucrePage == "videoSpecial"){ //运动课程
        //埋点
        commonJs.buriedPoint({
          access_occurred_type: 210575,//发生访问的【页面】类型
          access_occurred_type_id: '',//发生访问的【页面】类型ID
          previous_event_type_obj: '',//【事件】对象类型
          previous_event_type_obj_id: '',//【事件】对象类型ID
          previous_content_sort: ''//【事件】事件参数
        });

      }else if(this.soucrePage == "sportsLessonDetail"){
        //埋点
        commonJs.buriedPoint({
          access_occurred_type: 210549,//发生访问的【页面】类型
          access_occurred_type_id: '',//发生访问的【页面】类型ID
          previous_event_type_obj: '',//【事件】对象类型
          previous_event_type_obj_id: '',//【事件】对象类型ID
          previous_content_sort: ''//【事件】事件参数
        });
        
      }else if(this.soucrePage == "articleDeatail"){
        //埋点
        commonJs.buriedPoint({
          access_occurred_type: 211111,//发生访问的【页面】类型
          access_occurred_type_id: '',//发生访问的【页面】类型ID
          previous_event_type_obj: '',//【事件】对象类型
          previous_event_type_obj_id: '',//【事件】对象类型ID
          previous_content_sort: ''//【事件】事件参数
        });
      }

      // debugger
      if (this.isApp) {
        if (this.isLogin) {
          console.log("若登录了，就去评论的原生页面的app协议/h5的页面")

          var __url = commonJs.config.prefixUrl + "commentChild/" + this.initType + "/" + this.initDataId + "/" + data.id+"?soucrePage="+this.soucrePage ;
         
          console.log("__url:"+__url)

          // window.location.replace( __url )
          commonJs.h5CallAppAction.hxsapp_new_webview( encodeURIComponent(__url) )

          // this.$router.replace({
          //   //全部评论回复页面（文章类型/文章id，父级评论id）
          //   path: "/commentChild/" + this.initType + "/" + this.initDataId + "/" + data.id
          // })

        } else {
          console.log("没有登录了,这里调起app的登录协议");
          commonJs.h5CallAppAction.hxsapp_showloginpage()
        }
      } else {
        console.log("弹出下载的提示框box设计");
        this.popAppDownBox()
      }
    },
    // 无限加载的获取数据方法入口
    loadMore() {
      this.getCommentData(this.lastId);
    },
    // 获取列表的方法
    getCommentData(lastId = 0) {
      // 通过插件的 loadding 数据来判断既可 
      // if (this.loadEnd) {
      //   console.log("已经没有数据了-getCommentData")
      //   return;
      // }

      // 接口请求数据
      let json = {
        type: this.initType,
        // data_id: this.$route.params.article_id,
        data_id: this.initDataId,
        last_id: lastId,
        sess_token: commonJs.getUrlParam("sess_token")
      };
      // debugger
      axios.get('https://api.hxsapp.com/community/userComment/getCommentList', { params: json }).then((res) => {
        !this.isLoadingStart && setTimeout(() => {
          this.isLoadingStart = true;
        }, 200)
        if (res.data.code == 200) {
          let data = res.data.data;
          // let data = mockData.data;

          this.total = res.data.total;
          // this.total = mockData.data.length;

          //加载回来数据超过一个
          if (data.length > 0) {

              for (let i = 0; i < data.length; i++) {
                data[i].nickname = commonJs.subStlength( data[i].nickname)
                this.commentData.push(data[i]);
              }
              
              console.log("执行js变化高度的log")

              if (data.length <= 0 ) {
                $(".oldAllCommentList .scrollLoading").css({
                  height: "300px"
                })
              } else {
                var __height = $(window).height();
                console.log("getCommentData-oldAllCommentListPage:"+__height)

                
                $(".oldAllCommentList .scrollLoading").css({
                  height: __height+"px"
                })
              }
              
              this.lastId = this.commentData[this.commentData.length - 1].id;
              //加载个数超过10个显示加载更多
              data.length >= 1 ? this.loadTip = true : this.loadTip = false;
              
          } else {
            //个数为0 解除滚动绑定和加载更多隐藏

            this.loadTip = false;
            this.loading = true;
            this.loadEnd = true;

          }
        }

      })
    }
  }
}
</script>
<style scoped>
/* 
加载更多数据
底线数据
 */

.oldAllCommentList .loadTip{
  height: 20px;
  line-height: 20px;
  font-size: 14px;
  text-align: center;
  color: #666;
  margin-top: 5px;
  margin-bottom: 5px;
}



/* 滚动加载区域 */


/* 滚动加载区域-中间数据渲染区域 */


/*标题*/

.oldAllCommentList .title {
  display: block;
  width: 100%;
  height: 50px;
  line-height: 50px;
  font-size: 17px;
  text-align: center;
  box-sizing: border-box;
  border-bottom: 1px solid rgba(129,141,207,0.20);
}


/*滚动插件触发区域相关的样式*/

.oldAllCommentList .scrollLoading {
  height: 300px;
  width: 100%;
  margin: 0 auto;
  padding: 0 0 0 11px;
  box-sizing: border-box;
  overflow-y: auto;
  -webkit-overflow-scrolling: touch;
  position: relative;
}
.oldAllCommentList .scrollLoading .loadEnd {
  height: 45px;
  line-height: 45px;
  font-size: 13px;
  text-align: center;
  color: #999;
  background: #f5f5f8;
  margin-left: -11px;
  margin-top:-16px;
}

.oldAllCommentList .scrollLoading .initText {
  padding: 0 0 0 11px;
  margin-bottom: 19px;
  text-align: center;
}

.oldAllCommentList .scrollLoading .initText .no_pinlun{
  width: 240px;
  height: 140px;
  background: url(../assets/images/quesheng_kong.png) 50% top no-repeat;
  background-size: 140px 140px;
  display: block;
  margin: 10px auto 0;
  position: relative;
  left: -11px;
  padding-top:150px;
}

.oldAllCommentList .scrollLoading .all-info {
  padding-right: 12px;
  overflow: hidden;
}

.oldAllCommentList .scrollLoading .img-box {
  float: left;
  margin-right: 11px;
  cursor: pointer;
}
.oldAllCommentList .scrollLoading .img-box span{
  width: 40px;
  height: 40px;
  border-radius: 50%;
  border:1px solid rgba(129,141,207,0.20);
  box-sizing: border-box;
  display: block;
}


.oldAllCommentList .scrollLoading .info {
  float: left;
}

.oldAllCommentList .scrollLoading .info .name {
  height: 16px;
  line-height: 16px;
  font-size: 14px;
  color: #595959;
  padding: 3px 0 0;
}

.oldAllCommentList .scrollLoading .info span {
  height: 14px;
  line-height: 14px;
  font-size: 12px;
  color: #aaa;
}

.oldAllCommentList .scrollLoading .none_tip {
  width: 100%;
  height: 110px;
  padding-bottom: 25px;
  color: #666;
  text-align: center;
  line-height: 100px;
  font-size: 14px;
  display: none;
  overflow: hidden;
}



.oldAllCommentList .scrollLoading .methods {
  float: right;
}

.oldAllCommentList .scrollLoading .methods i {
  width: 15px;
  height: 15px;
  float: left;
  margin-right: 5px;
}

.oldAllCommentList .scrollLoading .methods .content-nun {
  float: left;
  cursor: pointer;
  padding: 5px 0 5px 5px;
}

.oldAllCommentList .scrollLoading .methods .give-good {
  cursor: pointer;
  float: left;
  padding: 5px 0 5px 5px;
  margin-right: 10px;
}

.oldAllCommentList .scrollLoading .methods .content-nun i {
  background: url(../assets/img/pinlun.png) left top no-repeat;
  background-size: 100%;
}

.oldAllCommentList .scrollLoading .methods .give-good i {
  background: url(../assets/img/zan_no.png) left top no-repeat;
  background-size: 100%;
}

.oldAllCommentList .scrollLoading .methods .give-good.yes i {
  background: url(../assets/img/zan_yes.png) left top no-repeat;
  background-size: 100%;
}

.oldAllCommentList .scrollLoading .methods em {
  color: #999;
  font-size: 12px;
  float: left;
}

.oldAllCommentList .scrollLoading .discuss {
  line-height: 20px;
  color: #595959;
  font-size: 15px;
  padding: 15px 0;
  word-break: break-all;
}

.oldAllCommentList .scrollLoading .discuss span {
  font-size: 16px;
  color: #0091ff;
  word-break: break-all;
}

.oldAllCommentList .scrollLoading .content-msg {
  padding-left: 53px;
  padding-right: 12px;
  overflow: hidden;
}

.oldAllCommentList .scrollLoading .reply-comment {
  margin-bottom: 15px;
  padding: 10px 11px;
  background: #f5f5f8;
  cursor: pointer;
  border-radius: 4px;
}

.oldAllCommentList .scrollLoading .reply-comment p {
  line-height: 20px;
  font-size: 13px;
  color: #595959;
  word-break: break-all;
}

.oldAllCommentList .scrollLoading .reply-comment a {
  padding-top: 4px;
  padding-bottom: 7px;
  font-size: 13px;
  display: block;
}

.oldAllCommentList .scrollLoading .reply-comment p span,
.oldAllCommentList .scrollLoading .reply-comment a {
  color: #818DCF;
}

.oldAllCommentList .scrollLoading .reply-comment p span {
  padding-right: 8px;
}

.oldAllCommentList .scrollLoading .delete-box {
  height: 16px;
  padding: 10px 0;
  cursor: pointer;
}


.oldAllCommentList .scrollLoading .delete-box em {
  height: 16px;
  line-height: 16px;
  font-size: 11px;
  color: #818DCF;
  float: left;
  cursor: pointer;
}

.oldAllCommentList .scrollLoading .solid {
  height: 1px;
  background: rgba(129,141,207,0.20);
  margin-left: 53px;
  overflow: hidden;
}

.new_cont_reply{
  padding: 6px 12px;
  background: #fefcf2; 
  margin: 0 0 15px;
}
.new_reply_content{
  line-height: 20px;
  color:#595959;
  word-break: break-all;
}
.new_reply_content span{
  font-size: 14px; 
  padding-right:8px;
  color: #818DCF; 
  position: relative;
}
.new_reply_content span i{
  width: 14px; 
  height:14px;  
  position: absolute; 
  left: 0; 
  top:50%; 
  margin-top: -8px;
}
.new_reply_content em{
  font-size: 14px;
  color: #666;
}
      
</style>