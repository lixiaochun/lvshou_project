<template>
	<div id="discuss">
		<div class="div_none"></div>
		<div class="discuss-layer"></div>
		<div class="discuss-container">
			<div class="sessTokenNone"></div>
			<div class="discuss-main clearfix">
				
				<div class="speech" v-show="!InputBoxShow">
					<em>写评论...</em>
					<em v-if="false">.../ {{comment_num}} 条评论</em>
					<!-- <em v-if="discussCommendNum">.../ {{comment_num}} 条评论</em> -->
				</div>

				<!-- <div class="series-fn" v-show="!InputBoxShow"  v-if="discussCommendNum" id="seriesFn"> -->
				<div class="series-fn" v-show="!InputBoxShow"  v-if="false" id="seriesFn">
					<!-- 点击点赞按钮的事件 -->
					<div>
						<span @click.stop="clickCommendNumBtn" :class=' isCommend == "yes" ?  "thumb new-thumb-active" : "thumb" '>
							<i>{{ commendNum }}</i>
						</span>
					</div>
					
					<!-- 点击收藏按钮的事件 -->
					<div>
						<span @click.stop="clickCollectBtn" :class=' isCollect == "yes" ? "collection new-collection-active" : "collection" '></span>
					</div>

					<!-- 点击分享按钮的事件 -->
					<div>
						<span @click.stop="clickShareBtn" class="share"></span>
					</div>
				</div>
				<div class="textarea-box">
					<div class="top">
						<!-- 取消按钮的事件 -->
						<!-- <a href="javascript:;" @touchstart.stop="hiddenTextarea">取消</a> -->
						<a href="javascript:;" @click="hiddenTextarea">取消</a>
						<span>评论</span>
						<!-- 发布按钮的事件 -->
						<a href="javascript:;" @touchstart.stop="speak" class="notAllow">发布</a>
					</div>
					<textarea class="fixed_input" v-model="message" placeholder=""></textarea>
					
					<!-- 同时分享到动态按钮的事件 -->
					<div class="share-to-dyanmic" @touchstart.prevent ="shareToDyanmicFn"  v-if="discussCommendNum" v-show="!hideShareDyanmicBtn">
						<div :class="{'active':shareToDyanmic}"></div>
						<em>同时分享到动态</em>
					</div>
				</div>
			</div>
			<loginFrame></loginFrame>
		</div>
	</div>
</template>
<script>
import Vue from "vue";
import axios from "axios";
import { Toast } from "mint-ui";
import commonJs from "@/util/common.js";
import loginFrame from "@/components/loginFrame";

export default {
  name: "discuss",
  data() {
    return {
      isCollect: "no",
      isCommend: "no",
      commendNum: 0,

      InputBoxShow: false,
      message: "", //输入框信息
      shareToDyanmic: false, //是否分享到动态
      speadLoad: false, //发表评论是否进行中
      discussCommendNum: false,
      hideShareDyanmicBtn: false,
      tasksTipNone: false,
      monitorTextareaValueTime: null
    };
  },
  computed: {
    isLogin: function() {
      return commonJs.isLogin();
    },
    isApp: function() {
      return commonJs.isApp();
    }
  },
  props: {
    // 页面来源处理
    soucrePage: {
      type: String,
      default: "articleDeatail"
    },

    // 分享数据
    shareContent: {
      type: [Object, String],
      require: true
    },

    // 点赞对象的类型，文章=0/评论=1/动态=2/课程=3/资讯栏目=4/100=随身听音频
    initType: {
      type: [String, Number],
      require: true
    },

    // 点赞对象类型的id
    doCommendId: {
      type: [String, Number],
      default: ""
    },

    // // 运动课程的方案id－1
    // scheme_id: {
    // 	type: [String, Number],
    // 	default: ""
    // },

    // // 运动课程的计划id-2
    // plan_id: {
    // 	type: [String, Number],
    // 	default: ""
    // },

    // 运动课程的课程id-3
    sport_id: {
      type: [String, Number],
      default: ""
    },

    // 评论总数
    comment_num: {
      type: [String, Number],
      require: true
    },

    // 点赞数目
    commend_num: {
      type: [String, Number],
      require: true
    },

    // 是否点赞
    is_commend: {
      type: [String],
      require: true
    },

    // 是否收藏
    is_collect: {
      type: [String],
      require: true
    },

    commentInfo: {
      //接收传递过来的参数（//文章类型/文章的id/父评论id/sess_token）
      type: Object,
      default: function() {}
    }
  },
  mounted() {
    var _this = this;
    this.iosFixed();

    this.isCollect = this.is_collect;
    this.isCommend = this.is_commend;
    this.commendNum = this.commend_num;
    console.log(this.doCommendId);
    //监听输入框是否有文字
    this.monitorTextareaValue();
    //是否显示评论条数 点赞、收藏、分享按钮
    this.discussCommendNumFn();
    //用户完成每日任务隐藏栏绑定事件
    document.body.addEventListener(
      "touchmove",
      _this.hxsapp_accomplishTasksTipNone,
      false
    );
    //右边3个按钮样式
    this.seriesFnDivWidth();

    // 3.4.0版本之后会根据路径中的是否带有clickFocusCommentBtnToHomePage来调起输入框
    if (commonJs.getUrlParam("clickFocusCommentBtnToHomePage") == 1) {
      setTimeout(function() {
        $(".fixed_input").focus();
        window.location.href = "https://hxsapp_showkeyboard";
      }, 500);
    }
  },
  methods: {
    // 点击点赞按钮的事件
    clickCommendNumBtn() {
      console.log("clickCommendNumBtn-clickCommendNumBtn");

      if (this.isApp) {
        if (this.isLogin) {
          console.log(
            "若登录了，就去调用极光的接口-https://api.hxsapp.com/community/userCommend/doCommend"
          );

          var __data_id;
          if (this.soucrePage == "newSportsLessonDetail") {
            __data_id = this.sport_id;
          } else {
            __data_id = this.doCommendId;
          }

          // 接口请求数据
          let json = {
            type: this.initType,

            data_id: __data_id,
            // model_idfa: commonJs.config.model_idfa,

            sess_token: commonJs.getUrlParam("sess_token")
          };

          axios
            .get("https://api.hxsapp.com/community/userCommend/doCommend", {
              params: json
            })
            .then(res => {
              // debugger
              if (res.data.code == 200) {
                // Toast(res.data.msg)
                Toast({
                  message: res.data.msg,
                  duration: 1000
                });

                if (res.data.action == "commend") {
                  this.isCommend = "yes";
                  this.commendNum = parseInt(this.commendNum) + 1;

                  //用户完成每日任务通知客户端弹起完成框
                  if (res.data.can_draw == 1) {
                    this.tasksTipNone = true;
                    commonJs.h5CallAppAction.hxsapp_accomplishTasksTip();
                  }

                  //判断是运动课程还是文章
                  if (this.soucrePage == "sportsLessonDetail") {
                    //埋点
                    commonJs.buriedPoint({
                      access_occurred_type: 210548, //发生访问的【页面】类型
                      access_occurred_type_id: __data_id, //发生访问的【页面】类型ID
                      previous_event_type_obj: "", //【事件】对象类型
                      previous_event_type_obj_id: "", //【事件】对象类型ID
                      previous_content_sort: "" //【事件】事件参数
                    });
                  } else if (this.soucrePage == "articleDetail") {
                    //埋点
                    commonJs.buriedPoint({
                      access_occurred_type: 211126, //发生访问的【页面】类型
                      access_occurred_type_id: __data_id, //发生访问的【页面】类型ID
                      previous_event_type_obj: "", //【事件】对象类型
                      previous_event_type_obj_id: "", //【事件】对象类型ID
                      previous_content_sort: "" //【事件】事件参数
                    });
                  } else if (this.soucrePage == "videoSpecial") {
                    //埋点
                    commonJs.buriedPoint({
                      access_occurred_type: 210582, //发生访问的【页面】类型
                      access_occurred_type_id: __data_id, //发生访问的【页面】类型ID
                      previous_event_type_obj: "", //【事件】对象类型
                      previous_event_type_obj_id: "", //【事件】对象类型ID
                      previous_content_sort: "" //【事件】事件参数
                    });
                  }
                } else if (res.data.action == "cancel") {
                  this.isCommend = "no";
                  this.commendNum = parseInt(this.commendNum) - 1;
                }
              } else {
                Toast({
                  message: res.data.msg,
                  duration: 1000
                });
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
        console.log("弹出下载的提示框box设计");
        this.popAppDownBox();
      }
    },

    // 点击收藏按钮的事件
    clickCollectBtn() {
      console.log("// 点击收藏按钮的事件-clickCollectBtn");
      console.log("clickCollectBtn-clickCollectBtn");

      if (this.isApp) {
        if (this.isLogin) {
          console.log(
            "若登录了，就去调用极光的接口-https://api.hxsapp.com/community/userCollect/doCollect"
          );

          // var content = { "scheme_id":"1","plan_id":"1" }

          var __data_id;
          var __json;

          // 接口请求数据

          if (this.soucrePage == "newSportsLessonDetail") {
            //埋点
            commonJs.buriedPoint({
              access_occurred_type: 210560, //发生访问的【页面】类型
              access_occurred_type_id: this.commentInfo.data_id, //发生访问的【页面】类型ID
              previous_event_type_obj: "", //【事件】对象类型
              previous_event_type_obj_id: "", //【事件】对象类型ID
              previous_content_sort: "" //【事件】事件参数
            });

            __data_id = this.sport_id;

            // content : {
            // 	"scheme_id": this.scheme_id,
            // 	"plan_id":this.plan_id
            // }
            __json = {
              type: this.initType,
              data_id: __data_id,
              sess_token: commonJs.getUrlParam("sess_token"),
              links:
                commonJs.config.proUrl +
                "hxsweb/newSportsLessonDetail/" +
                this.sport_id
            };
          } else {
            __data_id = this.doCommendId;

            __json = {
              type: this.initType,
              data_id: __data_id,
              sess_token: commonJs.getUrlParam("sess_token")
            };
          }

          axios
            .get("https://api.hxsapp.com/community/userCollect/doCollect", {
              params: __json
            })
            .then(res => {
              // debugger
              if (res.data.code == 200) {
                if (res.data.action == "collect") {
                  // Toast(res.data.msg)
                  Toast({
                    message: res.data.msg,
                    duration: 1000
                  });

                  this.isCollect = "yes";

                  //用户完成每日任务通知客户端弹起完成框
                  if (res.data.can_draw == 1) {
                    this.tasksTipNone = true;
                    commonJs.h5CallAppAction.hxsapp_accomplishTasksTip();
                  }

                  //判断是视频专题
                  if (this.soucrePage == "videoSpecial") {
                    //运动课程

                    //埋点
                    commonJs.buriedPoint({
                      access_occurred_type: 210587, //发生访问的【页面】类型
                      access_occurred_type_id: __data_id, //发生访问的【页面】类型ID
                      previous_event_type_obj: "", //【事件】对象类型
                      previous_event_type_obj_id: "", //【事件】对象类型ID
                      previous_content_sort: "" //【事件】事件参数
                    });

                    //判断是运动课程详情
                  } else if (this.soucrePage == "newSportsLessonDetail") {
                    //运动课程

                    //埋点
                    commonJs.buriedPoint({
                      access_occurred_type: 300203, //发生访问的【页面】类型
                      access_occurred_type_id: __data_id, //发生访问的【页面】类型ID
                      previous_event_type_obj: "", //【事件】对象类型
                      previous_event_type_obj_id: "", //【事件】对象类型ID
                      previous_content_sort: "" //【事件】事件参数
                    });
                  } else if (this.soucrePage == "articleDetail") {
                    //埋点
                    commonJs.buriedPoint({
                      access_occurred_type: 211127, //发生访问的【页面】类型
                      access_occurred_type_id: __data_id, //发生访问的【页面】类型ID
                      previous_event_type_obj: "", //【事件】对象类型
                      previous_event_type_obj_id: "", //【事件】对象类型ID
                      previous_content_sort: "" //【事件】事件参数
                    });
                  }
                } else if (res.data.action == "cancel") {
                  this.isCollect = "no";
                  // Toast("取消收藏!")
                  Toast({
                    message: "取消收藏!",
                    duration: 1000
                  });
                }
              } else {
                Toast(res.data.msg);
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
        console.log("弹出下载的提示框box设计");
        this.popAppDownBox();
      }
    },

    // 分享按钮的逻辑处理
    clickShareBtn() {
      // alert("// 点击分享按钮的事件-clickShareBtn")
      console.log("discuss.vue-clickShareBtn");
      var _this = this;

      if (this.isApp) {
        var data = Object.assign({}, this.shareContent);
        data.shareActWindowTitle && delete data.shareActWindowTitle;
        data.shareActWindowDescr && delete data.shareActWindowDescr;

        if (this.soucrePage == "videoSpecial") {
          //运动课程
          //埋点
          commonJs.buriedPoint({
            access_occurred_type: 210588, //发生访问的【页面】类型
            access_occurred_type_id: _this.doCommendId, //发生访问的【页面】类型ID
            previous_event_type_obj: "", //【事件】对象类型
            previous_event_type_obj_id: "", //【事件】对象类型ID
            previous_content_sort: "" //【事件】事件参数
          });
        } else if (this.soucrePage == "newSportsLessonDetail") {
          //运动课程
          //埋点
          commonJs.buriedPoint({
            access_occurred_type: 210561, //发生访问的【页面】类型
            access_occurred_type_id: _this.sport_id, //发生访问的【页面】类型ID
            previous_event_type_obj: "", //【事件】对象类型
            previous_event_type_obj_id: "", //【事件】对象类型ID
            previous_content_sort: "" //【事件】事件参数
          });
        } else if (this.soucrePage == "articleDetail") {
          //埋点
          commonJs.buriedPoint({
            access_occurred_type: 211128, //发生访问的【页面】类型
            access_occurred_type_id: __data_id, //发生访问的【页面】类型ID
            previous_event_type_obj: "", //【事件】对象类型
            previous_event_type_obj_id: "", //【事件】对象类型ID
            previous_content_sort: "" //【事件】事件参数
          });
        }
        // alert(JSON.stringify(this.shareContent))
        commonJs.h5CallAppAction.hxsapp_tune_up_share(this.shareContent);
      } else {
        // alert("弹出下载的提示框box设计")
        this.popAppDownBox();
      }
    },

    // 弹出父级的弹出框的样式
    popAppDownBox() {
      // alert("弹出下载的提示框box设计")
      this.$parent.showPopupDownLoadCall &&
        this.$parent.showPopupDownLoadCall();
    },

    //发表评论
    speak() {
      console.log("this.message", this.message);

      if (this.message.match(/^\s+$/)) {
        Toast({
          message: "内容不能为空",
          duration: 1000
        });
        return;
      }

      if (this.message.length > 500) {
        Toast({
          message: "内容不能超过500字哦",
          duration: 1000
        });
        return;
      }

      // 是否登录
      if (!this.isLogin) {
        console.log("没有登录了,这里调起app的登录协议");
        commonJs.h5CallAppAction.hxsapp_showloginpage();
        return;
      }

      if (this.speadLoad) return;
      this.speadLoad = true;

      // debugger
      console.log(JSON.stringify(this.commentInfo));
      //发表评论
      axios
        .get("https://api.hxsapp.com/community/userComment/doComment", {
          params: {
            type: this.commentInfo.type,
            data_id: this.commentInfo.data_id,
            parent_comment_id: this.commentInfo.parent_comment_id,
            reply_comment_id: this.commentInfo.reply_comment_id,
            content: this.message,
            sess_token: this.commentInfo.sess_token
          }
        })
        .then(res => {
          if (res.data.code == 200) {
            // 埋点开始
            if (this.$route.soucrePage && this.$route.soucrePage != "") {
              //文章=0/动态=1/商品=2/课程=3
              // 页面调用的传递参数埋点
              if (this.$route.soucrePage == "articleDetail") {
                if (this.commentInfo.type == 0) {
                  //埋点
                  commonJs.buriedPoint({
                    access_occurred_type: 211116, //发生访问的【页面】类型
                    access_occurred_type_id: this.commentInfo.data_id, //发生访问的【页面】类型ID
                    previous_event_type_obj: "", //【事件】对象类型
                    previous_event_type_obj_id: "", //【事件】对象类型ID
                    previous_content_sort: "" //【事件】事件参数
                  });
                }
              } else if (this.$route.soucrePage == "newSportsLessonDetail") {
                if (this.commentInfo.type == 3) {
                  //埋点
                  commonJs.buriedPoint({
                    access_occurred_type: 210553, //发生访问的【页面】类型
                    access_occurred_type_id: this.commentInfo.data_id, //发生访问的【页面】类型ID
                    previous_event_type_obj: "", //【事件】对象类型
                    previous_event_type_obj_id: "", //【事件】对象类型ID
                    previous_content_sort: "" //【事件】事件参数
                  });
                }
              } else if (this.$route.soucrePage == "videoSpecial") {
                if (this.commentInfo.type == 0) {
                  //埋点
                  commonJs.buriedPoint({
                    access_occurred_type: 210580, //发生访问的【页面】类型
                    access_occurred_type_id: this.commentInfo.data_id, //发生访问的【页面】类型ID
                    previous_event_type_obj: "", //【事件】对象类型
                    previous_event_type_obj_id: "", //【事件】对象类型ID
                    previous_content_sort: "" //【事件】事件参数
                  });
                }
              }
            } else {
              //文章=0/动态=1/商品=2/课程=3
              // 组件调用类型的埋点
              if (this.soucrePage == "newSportsLessonDetail") {
                //埋点
                commonJs.buriedPoint({
                  access_occurred_type: 210558, //发生访问的【页面】类型
                  access_occurred_type_id: this.commentInfo.data_id, //发生访问的【页面】类型ID
                  previous_event_type_obj: "", //【事件】对象类型
                  previous_event_type_obj_id: "", //【事件】对象类型ID
                  previous_content_sort: "" //【事件】事件参数
                });
              } else if (this.soucrePage == "videoSpecial") {
                if (this.commentInfo.type == 0) {
                  //埋点
                  commonJs.buriedPoint({
                    access_occurred_type: 210585, //发生访问的【页面】类型
                    access_occurred_type_id: this.commentInfo.data_id, //发生访问的【页面】类型ID
                    previous_event_type_obj: "", //【事件】对象类型
                    previous_event_type_obj_id: "", //【事件】对象类型ID
                    previous_content_sort: "" //【事件】事件参数
                  });
                }
              } else if (this.soucrePage == "commentChild") {
                if (this.commentInfo.type == 3) {
                  //埋点
                  // commonJs.buriedPoint({
                  // 	access_occurred_type: ,//发生访问的【页面】类型
                  // 	access_occurred_type_id: '',//发生访问的【页面】类型ID
                  // 	previous_event_type_obj: '',//【事件】对象类型
                  // 	previous_event_type_obj_id: this.commentInfo.data_id,//【事件】对象类型ID
                  // 	previous_content_sort: ''//【事件】事件参数
                  // });
                } else if (this.commentInfo.type == 0) {
                  //埋点
                  // commonJs.buriedPoint({
                  // 	access_occurred_type: ,//发生访问的【页面】类型
                  // 	access_occurred_type_id: '',//发生访问的【页面】类型ID
                  // 	previous_event_type_obj: '',//【事件】对象类型
                  // 	previous_event_type_obj_id: this.commentInfo.data_id,//【事件】对象类型ID
                  // 	previous_content_sort: ''//【事件】事件参数
                  // });
                }
              } else if (this.soucrePage == "articleDeatail") {
                if (this.commentInfo.type == 0) {
                  //埋点
                  commonJs.buriedPoint({
                    access_occurred_type: 211119, //发生访问的【页面】类型
                    access_occurred_type_id: this.commentInfo.data_id, //发生访问的【页面】类型ID
                    previous_event_type_obj: "", //【事件】对象类型
                    previous_event_type_obj_id: "", //【事件】对象类型ID
                    previous_content_sort: "" //【事件】事件参数
                  });
                }
              }
            }
            // 埋点结束

            console.log(res.data);
            let msg = res.data.msg;
            let data = res.data;
            let userInfo = data.user_info;
            let insert_id = data.insert_id;

            // 根据评论id 获取插入的数据，文章详情的页面要用这个数据
            if (!this.commentInfo.otherComment && insert_id) {
              axios
                .get(
                  "https://api.hxsapp.com/community/userComment/getCommentById",
                  {
                    params: {
                      comment_id: insert_id,
                      sess_token: this.commentInfo.sess_token
                    }
                  }
                )
                .then(res2 => {
                  console.log(res2);
                  this.$emit("addCommentData", {
                    soucre: this.soucrePage,
                    item: res2.data.data
                  });

                  // debugger
                  this.speadLoad = false;
                });
            }

            if (userInfo) {
              //发表成功 把数据推送到子评论列表数组
              if (!this.commentInfo.otherComment) {
                this.$emit("obtain", {
                  id: data.insert_id,
                  is_mine: 1,
                  content: this.message,
                  create_time: data.create_time,
                  nickname: userInfo.nickname,
                  head_img: userInfo.head_img,
                  reply_nickname: this.commentInfo.arguedName,
                  commend_num: 0,
                  user_id: data.user_info.user_id
                });
              } else {
                this.$emit("obtain2", {
                  other: true,
                  comment_type: this.commentInfo.dataType,
                  data_type_index: this.commentInfo.dataTypeIndex,
                  id: data.insert_id,
                  is_mine: 1,
                  content: this.message,
                  create_time: data.create_time,
                  nickname: userInfo.nickname,
                  head_img: userInfo.head_img,
                  // reply_nickname: this.commentInfo.arguedName,
                  commend_num: 0,
                  user_id: data.user_info.user_id
                });
              }
              var pageType = 2;
              if (this.soucrePage == "newSportsLessonDetail") {
                //判断是否是运动课程
                pageType = 5;
              }
              //分享到动态
              if (this.shareToDyanmic) {
                axios
                  .get("https://api.hxsapp.com/community/userDiary/saveDiary", {
                    params: {
                      content: this.message,
                      type: pageType,
                      nid: this.commentInfo.data_id,
                      sess_token: this.commentInfo.sess_token
                    }
                  })
                  .then(res => {
                    console.log(res);
                  });
              }

              //发表成功清空textarea,隐藏textarea并失焦
              this.message = "";
              $(".textarea-box textarea").blur();
              $(".textarea-box").removeClass("textarea-box_active");
              $(".discuss-container").removeClass("discuss-container_active");

              //取消发表到动态操作
              this.shareToDyanmic = false;
              //已发表可以进行发下一条
              this.speadLoad = false;

              ////是否对某人评论清回复对子评论的状态
              if (this.commentInfo.arguedName) {
                this.commentInfo.reply_comment_id = null;
                this.commentInfo.arguedName = null;
              }
            }

            //提示
            Toast({
              message: msg,
              duration: 1000
            });
            //用户完成每日任务通知客户端弹起完成框
            if (data.can_draw == 1) {
              this.tasksTipNone = true;
              commonJs.h5CallAppAction.hxsapp_accomplishTasksTip();
            }
          } else {
            //提示
            Toast({
              message: res.data.msg,
              duration: 1000
            });
            //已发表可以进行发下一条
            this.speadLoad = false;
          }
          this.commentInfo.otherComment = false;
        });
    },

    // 灰色快来评论吧
    iosFixed() {
      let _this = this;
      Vue.nextTick(() => {
        commonJs.iosInputfixed(
          ".discuss-container",
          ".fixed_input",
          function() {
            //focus操作
            $(".textarea-box").addClass("textarea-box_active");
            $(".discuss-container").addClass("discuss-container_active");
            $(".discuss-layer").show();
            if (_this.message) $(".textarea-box textarea").val(_this.message);

            //是否对某人评论
            if (!_this.commentInfo.isArguedName) {
              $(".textarea-box textarea").attr(
                "placeholder",
                "来发表你的高见吧"
              );
            } else {
              $(".textarea-box textarea").attr(
                "placeholder",
                "回复" + _this.commentInfo.arguedName
              );
              _this.commentInfo.isArguedName = false;
            }

            //文章=0/动态=1/商品=2/课程=3
            if (_this.$route.soucrePage && _this.$route.soucrePage != "") {
              // 页面传递参数埋点
            } else {
              // 组件调用类型埋点
              if (_this.soucrePage == "newSportsLessonDetail") {
                //埋点
                commonJs.buriedPoint({
                  access_occurred_type: 210556, //发生访问的【页面】类型
                  access_occurred_type_id: _this.commentInfo.data_id, //发生访问的【页面】类型ID
                  previous_event_type_obj: "", //【事件】对象类型
                  previous_event_type_obj_id: "", //【事件】对象类型ID
                  previous_content_sort: "" //【事件】事件参数
                });
              } else if (_this.soucrePage == "commentChild") {
                //埋点
                // commonJs.buriedPoint({
                // 	access_occurred_type: ,//发生访问的【页面】类型
                // 	access_occurred_type_id: '',//发生访问的【页面】类型ID
                // 	previous_event_type_obj: '',//【事件】对象类型
                // 	previous_event_type_obj_id: _this.commentInfo.data_id,//【事件】对象类型ID
                // 	previous_content_sort: ''//【事件】事件参数
                // });
              } else if (_this.soucrePage == "videoSpecial") {
                //埋点
                commonJs.buriedPoint({
                  access_occurred_type: 210583, //发生访问的【页面】类型
                  access_occurred_type_id: _this.commentInfo.data_id, //发生访问的【页面】类型ID
                  previous_event_type_obj: "", //【事件】对象类型
                  previous_event_type_obj_id: "", //【事件】对象类型ID
                  previous_content_sort: "" //【事件】事件参数
                });
              }
            }
          },
          function() {
            //blur操作
            setTimeout(() => {
              $(".discuss-layer").hide();
            }, 300);

            if (!$(".textarea-box textarea").val()) {
              $(".textarea-box textarea").attr("placeholder", "");
              $(".textarea-box").removeClass("textarea-box_active");
              $(".discuss-container").removeClass("discuss-container_active");
            } else {
              $(".textarea-box textarea").attr("placeholder", "");
            }

            //是否对某人评论
            if (!_this.commentInfo.arguedName) {
              _this.commentInfo.reply_comment_id = null;
              _this.commentInfo.arguedName = null;
            }
            _this.commentInfo.isArguedName = false;
          }
        );
      });
    },
    //隐藏textarea
    hiddenTextarea() {
      //文章=0/动态=1/商品=2/课程=3
      if (this.$route.soucrePage && this.$route.soucrePage != "") {
        // 页面传递参数埋点
        if (this.$route.soucrePage == "articleDetail") {
          if (this.commentInfo.type == 0) {
            //埋点
            commonJs.buriedPoint({
              access_occurred_type: 211115, //发生访问的【页面】类型
              access_occurred_type_id: this.commentInfo.data_id, //发生访问的【页面】类型ID
              previous_event_type_obj: "", //【事件】对象类型
              previous_event_type_obj_id: "", //【事件】对象类型ID
              previous_content_sort: "" //【事件】事件参数
            });
          }
        } else if (this.$route.soucrePage == "newSportsLessonDetail") {
          if (this.commentInfo.type == 3) {
            //埋点
            commonJs.buriedPoint({
              access_occurred_type: 210554, //发生访问的【页面】类型
              access_occurred_type_id: this.commentInfo.data_id, //发生访问的【页面】类型ID
              previous_event_type_obj: "", //【事件】对象类型
              previous_event_type_obj_id: "", //【事件】对象类型ID
              previous_content_sort: "" //【事件】事件参数
            });
          }
        } else if (this.$route.soucrePage == "videoSpecial") {
          //埋点
          commonJs.buriedPoint({
            access_occurred_type: 210579, //发生访问的【页面】类型
            access_occurred_type_id: this.commentInfo.data_id, //发生访问的【页面】类型ID
            previous_event_type_obj: "", //【事件】对象类型
            previous_event_type_obj_id: "", //【事件】对象类型ID
            previous_content_sort: "" //【事件】事件参数
          });
        }
      } else {
        //文章=0/动态=1/商品=2/课程=3
        // 组件调用的埋点
        if (this.soucrePage == "articleDeatail") {
          if (this.commentInfo.type == 3) {
            //埋点
            // commonJs.buriedPoint({
            // 	access_occurred_type: ,//发生访问的【页面】类型
            // 	access_occurred_type_id: '',//发生访问的【页面】类型ID
            // 	previous_event_type_obj: '',//【事件】对象类型
            // 	previous_event_type_obj_id: this.commentInfo.data_id,//【事件】对象类型ID
            // 	previous_content_sort: ''//【事件】事件参数
            // });
          } else if (this.commentInfo.type == 0) {
            //埋点
            commonJs.buriedPoint({
              access_occurred_type: 211118, //发生访问的【页面】类型
              access_occurred_type_id: this.commentInfo.data_id, //发生访问的【页面】类型ID
              previous_event_type_obj: "", //【事件】对象类型
              previous_event_type_obj_id: "", //【事件】对象类型ID
              previous_content_sort: "" //【事件】事件参数
            });
          }
        } else if (this.soucrePage == "commentChild") {
          if (this.commentInfo.type == 3) {
            //埋点
            commonJs.buriedPoint({
              access_occurred_type: 210554, //发生访问的【页面】类型
              access_occurred_type_id: this.commentInfo.data_id, //发生访问的【页面】类型ID
              previous_event_type_obj: "", //【事件】对象类型
              previous_event_type_obj_id: "", //【事件】对象类型ID
              previous_content_sort: "" //【事件】事件参数
            });
          } else if (this.commentInfo.type == 0) {
          }
        } else if (this.soucrePage == "newSportsLessonDetail") {
          //埋点
          commonJs.buriedPoint({
            access_occurred_type: 210557, //发生访问的【页面】类型
            access_occurred_type_id: this.commentInfo.data_id, //发生访问的【页面】类型ID
            previous_event_type_obj: "", //【事件】对象类型
            previous_event_type_obj_id: "", //【事件】对象类型ID
            previous_content_sort: "" //【事件】事件参数
          });
        } else if (this.soucrePage == "videoSpecial") {
          //文章=0/动态=1/商品=2/课程=3
          if (this.commentInfo.type == 3) {
            //埋点
            // commonJs.buriedPoint({
            // 	access_occurred_type: ,//发生访问的【页面】类型
            // 	access_occurred_type_id: this.commentInfo.data_id,//发生访问的【页面】类型ID
            // 	previous_event_type_obj: '',//【事件】对象类型
            // 	previous_event_type_obj_id: '',//【事件】对象类型ID
            // 	previous_content_sort: ''//【事件】事件参数
            // });
          } else if (this.commentInfo.type == 0) {
            //埋点
            commonJs.buriedPoint({
              access_occurred_type: 210584, //发生访问的【页面】类型
              access_occurred_type_id: this.commentInfo.data_id, //发生访问的【页面】类型ID
              previous_event_type_obj: "", //【事件】对象类型
              previous_event_type_obj_id: "", //【事件】对象类型ID
              previous_content_sort: "" //【事件】事件参数
            });
          }
        }
      }

      setTimeout(() => {
        $(".textarea-box textarea").attr("placeholder", "");
        $(".textarea-box textarea").blur();
        $(".textarea-box").removeClass("textarea-box_active");
        $(".discuss-container").removeClass("discuss-container_active");
      }, 100);
    },

    // 同时分享到动态 按钮
    shareToDyanmicFn() {
      this.shareToDyanmic = !this.shareToDyanmic ? true : false;
      if (this.soucrePage == "sportsLessonDetail") {
        this.shareToDyanmic = false;
      }
      if (this.$route.soucrePage && this.$route.soucrePage != "") {
        //文章=0/动态=1/商品=2/课程=3
        // 页面传递参数埋点
        if (this.$route.soucrePage == "articleDetail") {
          if (this.commentInfo.type == 0) {
            //埋点
            commonJs.buriedPoint({
              access_occurred_type: 211120, //发生访问的【页面】类型
              access_occurred_type_id: this.commentInfo.data_id, //发生访问的【页面】类型ID
              previous_event_type_obj: "", //【事件】对象类型
              previous_event_type_obj_id: "", //【事件】对象类型ID
              previous_content_sort: "" //【事件】事件参数
            });
          }
        }
      } else {
        //文章=0/动态=1/商品=2/课程=3
        // 组件调用的埋点
        if (this.soucrePage == "newSportsLessonDetail") {
          //埋点
          commonJs.buriedPoint({
            access_occurred_type: 210559, //发生访问的【页面】类型
            access_occurred_type_id: this.commentInfo.data_id, //发生访问的【页面】类型ID
            previous_event_type_obj: "", //【事件】对象类型
            previous_event_type_obj_id: "", //【事件】对象类型ID
            previous_content_sort: "" //【事件】事件参数
          });
        } else if (this.soucrePage == "videoSpecial") {
          //埋点
          commonJs.buriedPoint({
            access_occurred_type: 210586, //发生访问的【页面】类型
            access_occurred_type_id: this.commentInfo.data_id, //发生访问的【页面】类型ID
            previous_event_type_obj: "", //【事件】对象类型
            previous_event_type_obj_id: "", //【事件】对象类型ID
            previous_content_sort: "" //【事件】事件参数
          });
        }
      }
    },
    discussCommendNumFn() {
      if (window.location.href.indexOf("commentChild") == -1) {
        this.discussCommendNum = true;
      }
      if (window.location.href.indexOf("demoDetail") != -1) {
        this.hideShareDyanmicBtn = true;
      }
    },
    hxsapp_accomplishTasksTipNone: function() {
      //隐藏用户完成每日任务底部提示行为
      if (!this.tasksTipNone) return;
      let ua = window.navigator.userAgent;
      let isAndroid = new RegExp("Android").test(ua);
      if (isAndroid) return;
      this.tasksTipNone = false;
      window.location.href = "https://hxsapp_accomplish_tasks_tip_none";
    },
    monitorTextareaValue() {
      this.monitorTextareaValueTime = setInterval(() => {
        let value = $(".textarea-box textarea").val();
        if (value + "" && !value.match(/^\s+$/)) {
          $(".textarea-box_active .top a")
            .eq(1)
            .removeClass("notAllow");
        } else {
          $(".textarea-box_active .top a")
            .eq(1)
            .addClass("notAllow");
        }
      }, 10);
    },
    seriesFnDivWidth() {
      setTimeout(function() {
        $(".series-fn div").css({
          width: ($(".series-fn").width() - 15) / 3
        });
      }, 10);
    }
  },

  beforeDestroy() {
    commonJs.offEventIosInputFixed();
    //消除监听输入框定时器
    this.monitorTextareaValueTime = null;
    var _this = this;

    // debugger
    //解除用户完成每日任务隐藏栏事件
    document.body.removeEventListener(
      "touchmove",
      _this.hxsapp_accomplishTasksTipNone,
      false
    );
  },
  components: {
    loginFrame
  }
};
</script>
<style scoped>
.discuss-layer {
  width: 100%;
  height: 100%;
  position: absolute;
  left: 0;
  top: 0;
  z-index: 8;
  background: #333;
  opacity: 0.3;
  display: none;
}
.discuss-container {
  width: 100%;
  height: 50px;
  position: fixed;
  left: 0;
  bottom: 0;
  z-index: 999;
  background: #fff;
  border-top: solid 1px rgba(245, 245, 248, 0.88);
}
.discuss-container_active {
  height: 224px;
  overflow: hidden;
}

.div_none {
  width: 100%;
  height: 46px;
}

.discuss-main {
  width: 100%;
}

.pt_32 {
  padding-top: 32px;
}

.sessTokenNone {
  width: 100%;
  height: 100%;
  position: absolute;
  left: 0;
  top: 0;
  display: none;
  cursor: pointer;
  z-index: 1;
}

.speech {
  height: 30px;
  padding: 10px 15px 0;
  cursor: pointer;
}

.speech em {
  height: 30px;
  line-height: 30px;
  font-size: 13px;
  color: #999;
  display: block;
  overflow: hidden;
}

.speech em:nth-of-type(1) {
  color: #818dcf;
  font-size: 13px;
  color: #999;
  background: #f5f5f8;
  border-radius: 5px;
  padding-left: 15px;
}

.speech em:nth-of-type(2) {
  line-height: 50px;
  color: 12px;
}

.discuss-container .input-box input:-webkit-input-placeholder {
  color: #333;
  font-size: 15px;
}

.discuss-main {
  height: 100%;
  position: relative;
}

.series-fn {
  width: 44%;
  padding-top: 11px;
  float: left;
}

.series-fn div {
  width: 33%;
  height: 22px;
  float: left;
}

.series-fn div .thumb {
  width: 17px;
  height: 18px;
  background: url(../assets/images/zan-db.png) left 0 no-repeat;
  background-size: 100% 100%;
  float: right;
  margin-top: 5px;
  position: relative;
}

.series-fn div .thumb i {
  width: 100%;
  font-size: 11px;
  color: #999;
  position: absolute;
  right: -16px;
  top: -3px;
}

.series-fn div .new-thumb-active {
  background: url(../assets/images/zan-hong-db.png) left 0 no-repeat;
  background-size: 100% 100%;
}

.series-fn div .collection {
  width: 22px;
  height: 23px;
  background: url(../assets/images/sc_db.png) left 0 no-repeat;
  background-size: 100% 100%;
  float: right;
  margin-top: 2px;
}

.series-fn div .new-collection-active {
  background: url(../assets/images/sc-huang-db.png) left top no-repeat;
  background-size: 100% 100%;
}

.series-fn div .share {
  width: 21px;
  height: 22px;
  background: url(../assets/images/fx_db.png) left top no-repeat;
  background-size: 100%;
  float: right;
  margin-top: 3px;
}

.series-fn div .share-active {
  background: url(../assets/images/fx_db.png) left top no-repeat;
  background-size: 100%;
}

.discuss-container .textarea-box {
  width: 100%;
  /*height: 45px;*/
  background: transparent;
  border-radius: 5px;
  float: left;
  font-size: 15px;
  position: absolute;
  left: 0;
  top: 0;
}

.discuss-container .textarea-box_active {
  width: 100%;
  height: 215px;
}

.textarea-box .top {
  background: #f9f9f9;
  height: 46px;
  position: relative;
  border-bottom: solid 1px rgba(129, 141, 207, 0.2);
  display: none;
}

.textarea-box_active .top {
  display: block;
}

.textarea-box_active a {
  height: 100%;
  line-height: 46px;
  font-size: 16px;
  color: #818dcf;
}

.textarea-box_active .top a:nth-of-type(1) {
  float: left;
  margin-left: 13px;
}

.textarea-box_active .top a:nth-of-type(2) {
  float: right;
  margin-right: 13px;
}

.textarea-box .top .notAllow {
  color: #333;
  opacity: 0.3;
}

.textarea-box_active .top span {
  width: 50px;
  height: 100%;
  line-height: 46px;
  font-size: 17px;
  color: #666;
  text-align: center;
  position: absolute;
  left: 50%;
  top: 0;
  margin-left: -25px;
}

.textarea-box textarea {
  width: 100%;
  height: 100%;
  font-size: 18px;
  overflow: hidden;
  color: transparent;
}

.textarea-box_active textarea {
  width: 94%;
  height: 102px;
  color: #333;
  font-size: 18px;
  line-height: 20px;
  padding: 16px 3%;
}

.textarea-box .share-to-dyanmic {
  height: 40px;
  border-top: solid 1px rgba(129, 141, 207, 0.2);
  display: none;
}

.textarea-box .share-to-dyanmic div {
  width: 20px;
  height: 20px;
  background: url(../assets/images/tick.png) left top no-repeat;
  background-size: 100%;
  float: left;
  margin: 10px 10px 0 16px;
}

.textarea-box .share-to-dyanmic .active {
  background: url(../assets/images/gou.png) left top no-repeat;
  background-size: 100%;
}

.textarea-box_active .share-to-dyanmic {
  display: block;
}

.share-to-dyanmic em {
  height: 40px;
  line-height: 40px;
  color: #999;
  float: left;
}

.discuss-container .input-box input {
  width: 90%;
  padding: 0 5%;
  height: 18px;
  background: transparent;
  line-height: 18px;
  color: #dedede;
  border-radius: 5px;
  font-size: 15px;
  color: #333;
}

.discuss-container .input-box input:-webkit-input-placeholder {
  color: #818dcf;
  font-size: 15px;
}

.discuss-container .submit {
  width: 20%;
  height: 40px;
  line-height: 40px;
  text-align: center;
  color: #fff;
  background: #999;
  border-radius: 5px;
  float: right;
}

.discuss-container .active {
  background: #39d9ab;
}
</style>