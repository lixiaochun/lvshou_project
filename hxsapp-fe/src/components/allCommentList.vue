
<template>
  <div class="allCommentList">
    <!--
      全部评论区域
    -->
    
    <div class="title_box">
      <div class="title">

        <!-- 点击收藏按钮的事件 -->
        <div title="收藏按钮" class="collectNum" @click.stop="clickCollectBtn" :class=' isCollect == "yes" ? "yes" : "" ' >
        
          <collection :isCollect="isCollect" v-if="isShowCollection"></collection>
        </div>
        <!--
          this.isCollect = this.is_collect;
          this.isCommend = this.is_commend;
          this.commendNum = this.commend_num;
        -->

        <!-- 点击点赞按钮的事件 -->
        <div title="点赞数" class="commendNum"  @click.stop="clickCommendNumBtn" :class=" isCommend == 'yes' ? 'yes': ''">
        	<getGood :isCommend="isCommend"  :commendNum ="commendNum"  v-if="isShowCommend"></getGood>
          <em>
            {{commendNum}}
          </em>
        </div>


        <!-- 评论按钮 -->
        <div title="评论数" class="contentNum">
          <i></i>
          <em>
            {{comment_num}}
          </em>
        </div>

        <!-- 阅读按钮 -->
        <div title="阅读数" class="viewsNum" v-if=' soucrePage != "newSportsLessonDetail" || soucrePage != "diaryDetail"'>
        <!-- <div title="阅读数" class="viewsNum" v-if='false'> -->
          <i></i>
          <em>
            {{views_num}}
          </em>
        </div>

      </div>
      
    </div>
	<div class="hotComments" v-if="hotCommentData && hotCommentData.length>0">
		<div class="commentTitle">热门评论</div>
		<div class="allCommentList" style="overflow-y:hidden;">
			<div :id='"commentLi_" + data.id ' :class="{commentLiActive:(commentLiId == data.id && commentLiType ==1)}" style="padding:15px 15px 0;position:relative;" v-for="(data,index) in hotCommentData" :key="data.id" @click.stop="selectFn(data.id,data.is_mine,index,hotCommentData,1)">
				<div class="commentLiFn" :class="{commentLiFnWidth:!data.is_mine}" v-if="data.is_mine">
					<i class="icon"></i>
					<div @click.stop="textareaFocus(index,hotCommentData,1)">
						<span></span>
						<em>回复</em>
						<i v-if="data.is_mine"></i>
					</div>
					<div v-if="isApp && isLogin && data.is_mine" @click.stop="deleteDiscussBtn(data,index,hotCommentData)">
						<span class="span2"></span>
						<em>删除</em>
					</div>
				</div>
        <div class="all-info">
          <div class="img-box">
            <!--
            <img :src="data.head_img">
            -->
            <span v-if="data.head_img" :style="{background:'url(' + data.head_img + ') center center /140% no-repeat'}" @click.stop="goDynamicPage(data)"></span>
            <i class="hot-v" v-if="data.v && data.v == 1"></i>
            <i class="blue-v" v-if="data.is_adviser && data.is_adviser == 1 "></i>
          </div>
          <div class="info">
            <div class="name">{{ data.nickname }}</div>
            <span>{{ data.time_specification }}</span>
            <!-- <span>{{ data.create_time.substring(5,16) }}</span> -->
          </div>
          <div class="methods">
            
            <!--评论按钮区域-->
            <div class="content-nun" @click.stop="goContentNunPage(data.id)">
              <i></i>
              <em v-if="data && data.commentChildren && data.commentChildren.total >= 0 ">{{data.commentChildren.total}}</em>
              <em v-if="data && ! data.commentChildren"> 0</em>
            </div>

            <!--点赞按钮区域-->
            <div :class=" data.is_commend == 'yes'? 'give-good yes': 'give-good'" @click.stop="clickZanBtn(data,index,1)">
              <i></i>
              <em>
                {{ data.commend_num }}
              </em>
            </div>

          </div>
        </div>
        <div class="content-msg">
          <p class="discuss">
            {{ data.content }}
          </p>
         <!--  <div v-if="isApp && isLogin && data.is_mine" class="delete-box" @click.stop="deleteDiscussBtn(data,index)">
            <em>删除</em>
          </div> -->

          <div class="new_cont_reply" v-if="data.admin_reply">
            <div class="new_reply_content">
                <span><i></i>好享瘦小编回复:</span><em>
                {{data.admin_reply}}
                </em>
            </div>
          </div>

          <div class="reply-comment" v-if="data &&  data.commentChildren &&  data.commentChildren.data.length >= 1" @click.stop="goContentNunPage(data.id)" >

            <p v-for="msg in data.commentChildren.data" :key="msg.id">
              <span>
                {{msg.nickname}}
              </span>
              <em v-if="msg.reply_nickname">回复</em>
              <span v-if="msg.reply_nickname">
                {{msg.reply_nickname}}
              </span>
              <span>
                :
              </span>
              <em>{{msg.content}}</em>
            </p>

            <!-- 点击查看全部回复的事件 -->
            <a href="javascript:;" v-if="data &&  data.commentChildren && data.commentChildren.total >= 3">
              查看全部回复({{ data.commentChildren.total}}) >
            </a>
          </div>
        </div>
        <div class="solid"></div>
      </div>
		</div>
      
	</div>

		<div class="commentTitle">最新评论</div>
    <div class="scrollLoading" 
    v-infinite-scroll="loadMore" 
    :infinite-scroll-disabled="loading" 
    infinite-scroll-distance="10" 
    infinite-scroll-immediate-check="true">

      <div v-if="!isLoadingStart" class="initText">
        加载数据中...
      </div>
      <div class="initText" v-if="total == 0 ">
        <div class="no_pinlun">
          目前还没有人给你评论哦
        </div>
      </div>

      <div :id='"commentLi_" + data.id ' :class="{commentLiActive:(commentLiId == data.id&& commentLiType ==2)}" class="comment-list-bd" style="padding:15px; position:relative;"  v-for="(data,index) in commentData" :key="data.id" @click.stop="selectFn(data.id,data.is_mine,index,commentData,2)">
				<div class="commentLiFn" :class="{commentLiFnWidth:!data.is_mine}" v-if="data.is_mine">
					<i class="icon"></i>
					<div @click.stop="textareaFocus(index,commentData,2)">
						<span></span>
						<em>回复</em>
						<i v-if="data.is_mine"></i>
					</div>
					<div v-if="isApp && isLogin && data.is_mine" @click.stop="deleteDiscussBtn(data,index,commentData)">
						<span class="span2"></span>
						<em>删除</em>
					</div>
				</div>
        <div class="all-info">
          <div class="img-box">
            <!--
            <img :src="data.head_img">
            -->
            <span v-if="data.head_img" :style="{background:'url(' + data.head_img + ') center center /140% no-repeat'}" @click.stop="goDynamicPage(data)"></span>
            <i class="hot-v" v-if="data.v && data.v == 1"></i>
            <i class="blue-v" v-if="data.is_adviser && data.is_adviser == 1 "></i>
          </div>
          <div class="info">
            <div class="name">{{ data.nickname }}</div>
            <span>{{ data.time_specification }}</span>
            <!-- <span>{{ data.create_time.substring(5,16) }}</span> -->
          </div>
          <div class="methods">
            
            <!--评论按钮区域-->
            <div class="content-nun" @click="goContentNunPage(data.id)">
              <i></i>
              <em v-if="data && data.commentChildren && data.commentChildren.total >= 0 ">{{data.commentChildren.total}}</em>
              <em v-if="data && ! data.commentChildren"> 0</em>
            </div>

            <!--点赞按钮区域-->
            <div :class=" data.is_commend == 'yes'? 'give-good yes': 'give-good'" @click.stop="clickZanBtn(data,index,2)">
              <i></i>
              <em>
                {{ data.commend_num }}
              </em>
            </div>


          </div>
        </div>
        <div class="content-msg">
          <p class="discuss">
            {{ data.content }}
          </p>
         <!--  <div v-if="isApp && isLogin && data.is_mine" class="delete-box" @click.stop="deleteDiscussBtn(data,index)">
            <em>删除</em>
          </div> -->

          <div class="new_cont_reply" v-if="data.admin_reply">
            <div class="new_reply_content">
                <span><i></i>好享瘦小编回复:</span><em>
                {{data.admin_reply}}
                </em>
            </div>
          </div>

          <div class="reply-comment" v-if="data &&  data.commentChildren &&  data.commentChildren.data.length >= 1" @click.stop="goContentNunPage(data.id)" >

            <p v-for="msg in data.commentChildren.data" :key="msg.id">
              <span>
                {{msg.nickname}}
              </span>
              <em v-if="msg.reply_nickname">回复</em>
              <span v-if="msg.reply_nickname">
                {{msg.reply_nickname}}
              </span>
              <span>
                :
              </span>
              <em>{{msg.content}}</em>
            </p>

            <!-- 点击查看全部回复的事件 -->
            <a href="javascript:;" v-if="data &&  data.commentChildren && data.commentChildren.total >= 3">
              查看全部回复({{ data.commentChildren.total}}) >
            </a>
          </div>
        </div>
        <div class="solid"></div>
      </div>
      <div class="loadTip" v-if="loadTip && total >= 10">正在加载中...</div>
      <div class="loadEnd" v-if="loadEnd && total != 0 && total >= 3 ">已经到底了，没有数据了...</div>
    </div>
  </div>
</template>
<script>
 
import axios from 'axios'
import commonJs from '@/util/common.js'
import { MessageBox } from 'mint-ui'
import { Toast } from 'mint-ui'
import collection from "@/components/collection"
import getGood from "@/components/thumb"

export default {
  name: 'allCommentList',
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

		// 新的训练课程详情的运动id
		sport_id: {
			type: [String, Number],
			default: ""
		},

    // 页面阅读总数
		views_num: {
			type: [String, Number],
			require: true
		},
		callBackObj:{
			type: Object,
			default: function() { }
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

    commentInfo: { //接收传递过来的参数（//文章类型/文章的id/父评论id/sess_token）
			type: Object,
			default: function() { }
		}
  },
  data() {
    return {
      total: 0,
      
      isCollect:"no",
			
      isCommend:"no",

      commendNum:0,

      //选择评论的id
      commentLiId:null,
      commentLiType:null,

      //热门评论数据
      hotCommentData:null,

      // 评论列表数据
      commentData: [],

      commentDataFirstNum: "",

      // （1）是否已经加载了后端接口评论数据的判断（2）显示默认加载文案
      isLoadingStart: false,

      // 是否已经还需要加载评论数据的判断
      loading: true,

      // 滚动加载后端接口使用的参数lastId
      lastId: null,

      // 是否显示加载中的提示文案
      loadTip: false,

      // 是否显示加载到底部的提示文案
      loadEnd: false,

      isShowCommend: false,
      isShowCollection: false
    }
  },
  watch: {
    newCommentData: function(val, oldVal) {
      console.log("2dadasdsad")
      // debugger
      console.log('new: %s, old: %s', val, oldVal)
      console.log(this.commentData.length)

      val.item.nickname = commonJs.subStlength( val.item.nickname ) 
      
      this.commentData.unshift(val.item)

      console.log(this.commentData.length)
      // console.log(this.total)

      this.total = parseInt(this.total) + 1;
    },
    callBackObj:function(val,oldVal){

    		//支持往热评和最新评论中添加子评论 ，也可以单一
    	  var parentId = null; //父评论id
    		if(val.comment_type=='hotComments'){
    				parentId = this.hotCommentData[val.data_type_index].id;
    				// this.hotCommentData[val.data_type_index].commentChildren.data.unshift(val);
    				// this.hotCommentData[val.data_type_index].commentChildren.total ++;
    		}else{
    				parentId = this.commentData[val.data_type_index].id;
    				// this.commentData[val.data_type_index].commentChildren.data.unshift(val);
    				// this.commentData[val.data_type_index].commentChildren.total ++;
    		}

    		//循环热评查找添加
    		for(var i = 0; i < this.hotCommentData.length; i++){
    			if(this.hotCommentData[i].id == parentId){
    				this.hotCommentData[i].commentChildren.data.unshift(val);
    				this.hotCommentData[i].commentChildren.total ++;
    			}
    		}

    		//循环最新查找添加
    		for(var i = 0; i < this.commentData.length; i++){
    			if(this.commentData[i].id == parentId){
    				this.commentData[i].commentChildren.data.unshift(val);
    				this.commentData[i].commentChildren.total ++;
    			}
    		}
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
    // debugger
    this.isCollect = this.is_collect;
		this.isCommend = this.is_commend;
		this.commendNum = parseInt(this.commend_num);
    this.isShowCommend = true;
    this.isShowCollection = true;
    this.getCommentData();
    this.getHotCommentData();
    this.documentClick();
    this.documentScroll();
  },
  beforeDestroy(){
    $(".mint-msgbox-wrapper").length && $(".mint-msgbox-wrapper").remove()
  },
    components:{
    	collection,
    	getGood
	},
  methods: {
  	documentScroll(){
  		var _this = this;
  		$(window).scroll(function() {
  			if(_this.commentLiId){
  				_this.commentLiId = null;
  			}
			})
  	},
  	documentClick(){
  		var _this = this;
  			document.onclick=function(){
  				_this.commentLiId = null;
  			}
  	},
  	selectFn(id,isMine,index,data,typeIndex){
  		if(this.isApp && !isMine){
  			this.textareaFocus(index,data,typeIndex);
  			return;
  		}
  		if(!this.isApp){
      	this.$parent.showPopupDownLoadCall && this.$parent.showPopupDownLoadCall()
  		}else{
  			this.commentLiId = id;
  			this.commentLiType = typeIndex;
  		}
  	},
		// 点击点赞按钮的事件
		clickCommendNumBtn() {
			console.log("clickCommendNumBtn-clickCommendNumBtn");

			if (this.isApp) {
				if (this.isLogin) {
					console.log("若登录了，就去调用极光的接口-https://api.hxsapp.com/community/userCommend/doCommend")

					var __data_id;
					// if( this.soucrePage == "sportsLessonDetail"){
					// 	__data_id = this.sport_id
					// }else 
          			if( this.soucrePage == "newSportsLessonDetail"){
						__data_id = this.sport_id
					}else{
						__data_id = this.doCommendId
					}
					// 接口请求数据
					let json = {
						type: this.initType,

						data_id: __data_id,
						// model_idfa: commonJs.config.model_idfa,

						sess_token: commonJs.getUrlParam("sess_token")
					};
					
					axios.get('https://api.hxsapp.com/community/userCommend/doCommend',
						{ params: json }
					).then((res) => {
						// debugger
						if (res.data.code == 200) {
							// Toast(res.data.msg)
							// Toast({
							// 	message: res.data.msg,
							// 	duration: 1000
							// })

							if (res.data.action == "commend") {
								this.isCommend = "yes";
                
								// this.commendNum = parseInt(this.commendNum) +1

								//用户完成每日任务通知客户端弹起完成框
								if(res.data.can_draw == 1) {
									this.tasksTipNone = true;
									commonJs.h5CallAppAction.hxsapp_accomplishTasksTip();
								}

								//判断是运动课程还是文章
								// if( this.soucrePage == "sportsLessonDetail"){
								// 	//埋点
								// 	commonJs.buriedPoint({
								// 		access_occurred_type: 210548,//发生访问的【页面】类型
								// 		access_occurred_type_id: __data_id,//发生访问的【页面】类型ID
								// 		previous_event_type_obj: '',//【事件】对象类型
								// 		previous_event_type_obj_id: '',//【事件】对象类型ID
								// 		previous_content_sort: ''//【事件】事件参数
								// 	});
								// }else 
                if( this.soucrePage == "newSportsLessonDetail"){
									//埋点
									commonJs.buriedPoint({
										access_occurred_type: 210548,//发生访问的【页面】类型
										access_occurred_type_id: __data_id,//发生访问的【页面】类型ID
										previous_event_type_obj: '',//【事件】对象类型
										previous_event_type_obj_id: '',//【事件】对象类型ID
										previous_content_sort: ''//【事件】事件参数
									});
								}else if( this.soucrePage == "articleDetail"){
									//埋点
									commonJs.buriedPoint({
										access_occurred_type: 211126,//发生访问的【页面】类型
										access_occurred_type_id: __data_id,//发生访问的【页面】类型ID
										previous_event_type_obj: '',//【事件】对象类型
										previous_event_type_obj_id: '',//【事件】对象类型ID
										previous_content_sort: ''//【事件】事件参数
									});
								}else if( this.soucrePage == "videoSpecial"){
									//埋点
									commonJs.buriedPoint({
										access_occurred_type: 210582,//发生访问的【页面】类型
										access_occurred_type_id: __data_id,//发生访问的【页面】类型ID
										previous_event_type_obj: '',//【事件】对象类型
										previous_event_type_obj_id: '',//【事件】对象类型ID
										previous_content_sort: ''//【事件】事件参数
									});
								}

							} else if (res.data.action == "cancel") {
								this.isCommend = "no"
								// this.commendNum = parseInt(this.commendNum) -1 
							}

						}else{
							// Toast({
							// 	message: res.data.msg,
							// 	duration: 1000
							// })
						}


					}).catch((Error) => {
						console.log(Error)
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

		// 点击收藏按钮的事件
		clickCollectBtn() {
			console.log("// 点击收藏按钮的事件-clickCollectBtn")
			console.log("clickCollectBtn-clickCollectBtn");

			if (this.isApp) {
				if (this.isLogin) {
					console.log("若登录了，就去调用极光的接口-https://api.hxsapp.com/community/userCollect/doCollect")

					// var content = { "scheme_id":"1","plan_id":"1" } 
					
					var __data_id;
					var __json;

					// 接口请求数据
					
					// if( this.soucrePage == "sportsLessonDetail"){
					// 	//埋点
					// 	__data_id = this.sport_id

					// 	commonJs.buriedPoint({
					// 		access_occurred_type: 210560,//发生访问的【页面】类型
					// 		access_occurred_type_id: __data_id,//发生访问的【页面】类型ID
					// 		previous_event_type_obj: '',//【事件】对象类型
					// 		previous_event_type_obj_id: '',//【事件】对象类型ID
					// 		previous_content_sort: ''//【事件】事件参数
					// 	});

					// 	__json = {
					// 		type: this.initType,
					// 		data_id: __data_id,
					// 		sess_token: commonJs.getUrlParam("sess_token"),
					// 		links: commonJs.config.proUrl +'hxsweb/sportsLessonDetail/' + this.scheme_id + '/' + this.plan_id + '/' + this.sport_id,
					// 		content : { 
					// 			"scheme_id": this.scheme_id,
					// 			"plan_id":this.plan_id 
					// 		} 
					// 	};
          //   // debugger
						
					// }else 
          if( this.soucrePage == "newSportsLessonDetail"){
						//埋点
						__data_id = this.sport_id

						commonJs.buriedPoint({
							access_occurred_type: 210560,//发生访问的【页面】类型
							access_occurred_type_id: __data_id,//发生访问的【页面】类型ID
							previous_event_type_obj: '',//【事件】对象类型
							previous_event_type_obj_id: '',//【事件】对象类型ID
							previous_content_sort: ''//【事件】事件参数
						});

						__json = {
							type: this.initType,
							data_id: __data_id,
							sess_token: commonJs.getUrlParam("sess_token"),
							links: commonJs.config.proUrl +'hxsweb/newSportsLessonDetail/' + this.sport_id
						};
            // debugger
						
					}else{
						
						__data_id = this.doCommendId

						__json = {
							type: this.initType,
							data_id: __data_id,
							sess_token: commonJs.getUrlParam("sess_token")
						};
					}

          // 用户收藏相关
					axios.get('https://api.hxsapp.com/community/userCollect/doCollect',
						{ params: __json }
					).then((res) => {
						// debugger
						if (res.data.code == 200) {
              // debugger
							if (res.data.action == "collect") {
								// Toast(res.data.msg)
								// Toast({
								// 	message: res.data.msg,
								// 	duration: 1000
								// })
								
								this.isCollect = "yes"



								//用户完成每日任务通知客户端弹起完成框
								if(res.data.can_draw == 1) {

									this.tasksTipNone = true;
									commonJs.h5CallAppAction.hxsapp_accomplishTasksTip()
								};

                if( this.soucrePage == "demoDetail"){
                  this.hxsapp_caces_collect( this.initDataId, 1 );
                }else if(this.soucrePage == "videoSpecial"){//运动课程
								//判断是视频专题
									
									//埋点
									commonJs.buriedPoint({
										access_occurred_type: 210587,//发生访问的【页面】类型
										access_occurred_type_id: __data_id,//发生访问的【页面】类型ID
										previous_event_type_obj: '',//【事件】对象类型
										previous_event_type_obj_id: '',//【事件】对象类型ID
										previous_content_sort: ''//【事件】事件参数
									});

								//判断是运动课程详情
								}
                // else if(this.soucrePage == "sportsLessonDetail"){//运动课程
									
								// 	//埋点
								// 	commonJs.buriedPoint({
								// 		access_occurred_type: 300203,//发生访问的【页面】类型
								// 		access_occurred_type_id: __data_id,//发生访问的【页面】类型ID
								// 		previous_event_type_obj: '',//【事件】对象类型
								// 		previous_event_type_obj_id: '',//【事件】对象类型ID
								// 		previous_content_sort: ''//【事件】事件参数
								// 	});

								// }
                else if(this.soucrePage == "newSportsLessonDetail"){//运动课程
									
									//埋点
									commonJs.buriedPoint({
										access_occurred_type: 300203,//发生访问的【页面】类型
										access_occurred_type_id: __data_id,//发生访问的【页面】类型ID
										previous_event_type_obj: '',//【事件】对象类型
										previous_event_type_obj_id: '',//【事件】对象类型ID
										previous_content_sort: ''//【事件】事件参数
									});

								}else if( this.soucrePage == "articleDetail"){
									//埋点
									commonJs.buriedPoint({
										access_occurred_type: 211127,//发生访问的【页面】类型
										access_occurred_type_id: __data_id,//发生访问的【页面】类型ID
										previous_event_type_obj: '',//【事件】对象类型
										previous_event_type_obj_id: '',//【事件】对象类型ID
										previous_content_sort: ''//【事件】事件参数
									});
								}
								

							} else if (res.data.action == "cancel") {
								this.isCollect = "no";
                if( this.soucrePage == "demoDetail"){
                  this.hxsapp_caces_collect( this.initDataId, 0 );
                }
								// Toast("取消收藏!")
								// Toast({
								// 	message: "取消收藏!",
								// 	duration: 1000
								// })
							}
						} else {
							// Toast(res.data.msg)
						}

					}).catch((Error) => {
						console.log(Error)
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

    hxsapp_caces_collect(demo_id,state){
      var __version = commonJs.getHxsAppVersion();
				
      if ( commonJs.compareAppVersion( __version, "3.3.0" ) || __version == "3.3.0" ) {
        window.location.href = "https://hxsapp_caces_collect?state="+ state +"&caces_id="+demo_id;
      }
    },
  	textareaFocus(index, obj, type){
			let key = index < 0? obj: obj[index];
			// this.commentInfo.reply_comment_id = key.id;
			this.commentInfo.arguedName = key.nickname;
			this.commentInfo.parent_comment_id = key.id;
			this.commentInfo.otherComment=true;
			if(index >= 0){
				this.commentInfo.isArguedName = true;
			}else{
				this.commentInfo.reply_comment_id = null;
				this.commentInfo.arguedName = null; 
				this.commentInfo.isArguedName = false;
			}
			if(type==1){
				this.commentInfo.dataType = 'hotComments';
				this.commentInfo.dataTypeIndex = index;
			}else{
				this.commentInfo.dataType = 'comments';
				this.commentInfo.dataTypeIndex = index;
			}
			this.commentLiId = null;
			$('.textarea-box textarea').focus();
		},

    // 去二级评论的页面
    goDynamicPage(data){
      console.log("goDynamicPage")
      // var url = commonJs.config.prefixUrl + "dynamic/" + data.id;
      // console.log("url:" + url);
      // debugger
      if( this.isApp ){

        window.location.href = "https://hxsapp_user_info#" + data.user_id;	
      }else{
        setTimeout(() => {
          // window.location.href = commonJs.config.prefixUrl + "articleDetail/" + data.id + window.location.search;
          var __url  = commonJs.config.prefixUrl + "dynamic/" + data.user_id + window.location.search;
          window.location.replace( __url );
        }, 100)
      }

    },
    // 删除评论的事件处理
    deleteDiscussBtn(data, index, commentType) {

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
                  
                  if(commentType=='commentData'){
	                  this.commentData.splice(index, 1)
	                  if(this.hotCommentData.length > 0){
		                  for( let i=0; i<this.hotCommentData.length; i++){
		                  	if(this.hotCommentData[i].id == data.id){
	                  			this.hotCommentData.splice(i, 1)
		                  	}
		                  }
	                  }
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
                  }else{
	                  this.hotCommentData.splice(index, 1)
	                  if(this.commentData.length > 0){
		                  for( let i=0; i<this.commentData.length; i++){
		                  	if(this.commentData[i].id == data.id){
	                  			this.commentData.splice(i, 1)
		                  	}
		                  }
	                  }
                  }

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
    clickZanBtn(data, index, dataType) {
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
                if(dataType == 2){
	                this.commentData.splice(index, 1, Object.assign({}, data, {
	                  is_commend: "yes",
	                  commend_num: parseInt(data.commend_num) + 1
	                }))
                }else{

	                this.hotCommentData.splice(index, 1, Object.assign({}, data, {
	                  is_commend: "yes",
	                  commend_num: parseInt(data.commend_num) + 1
	                }))
                }

              } else if (res.data.action == "cancel") {
              	if(dataType == 2){
	                this.commentData.splice(index, 1, Object.assign({}, data, {
	                  is_commend: "no",
	                  commend_num: parseInt(data.commend_num) - 1 < 0 ? 0 : parseInt(data.commend_num) - 1
	                  // commend_num: parseInt(data.commend_num) - 1
	                }))
              	}else{
	                this.hotCommentData.splice(index, 1, Object.assign({}, data, {
	                  is_commend: "no",
	                  commend_num: parseInt(data.commend_num) - 1 < 0 ? 0 : parseInt(data.commend_num) - 1
	                  // commend_num: parseInt(data.commend_num) - 1
	                }))
              	}

              }
            }else{
              Toast(res.data.msg)
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
    goContentNunPage(parent_comment_id) {
      
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

      }
      // else if(this.soucrePage == "sportsLessonDetail"){
      //   //埋点
      //   commonJs.buriedPoint({
      //     access_occurred_type: 210549,//发生访问的【页面】类型
      //     access_occurred_type_id: '',//发生访问的【页面】类型ID
      //     previous_event_type_obj: '',//【事件】对象类型
      //     previous_event_type_obj_id: '',//【事件】对象类型ID
      //     previous_content_sort: ''//【事件】事件参数
      //   });
        
      // }
      else if(this.soucrePage == "newSportsLessonDetail"){
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

          var __url = commonJs.config.prefixUrl + "commentChild/" + this.initType + "/" + this.initDataId + "/" + parent_comment_id+"?soucrePage="+this.soucrePage ;
         
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
      if( this.commentDataFirstNum != "" && this.commentDataFirstNum != 0 ){
      	if(this.loadTip){
					this.loadTip= false;
        	this.getCommentData(this.lastId);
      	}
      }
    },
    getHotCommentData(){//获取热评数据
      let json = {
        type: this.initType,
        // data_id: this.$route.params.article_id,
        data_id: this.initDataId,
        hot:1,
        sess_token: commonJs.getUrlParam("sess_token")
      };
      // let json = {
      //   type: 0,
      //   data_id: 283,
      //   hot:1
      // };

      axios.get('https://api.hxsapp.com/community/userComment/getCommentList', { params: json }).then((res) => {
        if (res.data.code == 200) {
          this.hotCommentData = res.data.data;
          console.log(this.hotCommentData);
        }
      })
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
        if (res.data.code == 200) {
          let data = res.data.data;
          // let data = mockData.data;

          !this.isLoadingStart && setTimeout(() => {
            this.isLoadingStart = true;
            
            this.commentDataFirstNum = res.data.total
          }, 200)

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

                $(".allCommentList").css({
                  height: "auto"
                  // height: "300px"
                })
              } else {
                var __height = $(window).height();
                console.log("getCommentData-allcommentlistPage:"+__height)

                
                // $(".allCommentList").css({
                //   height: __height+"px"
                // })
              }
              
              this.lastId = this.commentData[this.commentData.length - 1].id;
              //加载个数超过10个显示加载更多
              if( data.length >= 10 ){
                this.loadTip = true
              }else{
                this.loadTip = false;
                this.loading = true;
                this.loadEnd = true;
              }
              
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
<style scoped lang="less">
/* 
加载更多数据
底线数据
 */
.commentTitle{
	height: 30px;
	line-height: 30px;
	padding-left: 15px;
	font-size: 13px;
	color: #666;
	background:rgba(248,248,248,1);
}
.allCommentList .loadTip{
  height: 20px;
  line-height: 20px;
  font-size: 14px;
  text-align: center;
  color: #666;
  margin-top: 5px;
  margin-bottom: 5px;
}
.commentLiFn{
	display: none;
}
.commentLiActive{
	.commentLiFn{
		width: 116px;
		height: 64px;
		background: #fff;
		position: absolute;
		left: 50%;
		top:20px;
		margin-left:-55px;
		display: block;
		.icon{
			width:0;
	    height:0;
	    border-width:8px 8px 0;
	    border-style:solid;
	    border-color:#fff transparent transparent;
	    position:absolute;
	    bottom: -8px;
	    left: 50%;
	    margin-left: -8px;
		}
		div{
			width: 28px;
			padding:0 15px;
			height: 64px;
			float: left;
			position: relative;
	    // display: flex;
	    // display: -webkit-flex;
	    // justify-content: center;
	    // -webkit-justify-content: center;
	    // align-items: center;
	    // -webkit-align-items: center;
			span{
				width: 25px;
				height: 25px;
				margin-top: 12px;
				display: block;
        background: url(../assets/images/B_icon_answer.png) left top no-repeat;
        background-size: 100%;
        &.span2{
        	background: url(../assets/images/B_icon_delete.png) left top no-repeat;
        	background-size: 100%;
        }
			}
			em{
				height: 18px;
				line-height: 18px;
				color:#818DCF;
				display: block;
				font-size: 13px;
				margin-top: 2px;
			}
			i{
				width: 1px;
				height: 36px;
		    background:rgba(129,141,207,0.2);
				position: absolute;
				right: -1px;
				top: 50%;
				margin-top: -18px;
			}
		}
	}
	.commentLiFnWidth{
		width: 58px;
		margin-left:-29px;
	}
}

/* 滚动加载区域 */


/* 滚动加载区域-中间数据渲染区域 */


/*标题*/

.allCommentList .title_box {
  width: 100%;
  padding:0 15px;
  box-sizing:border-box;
  .title{
    display: block;
    width: 100%;
    height: 51px;
    line-height: 51px;
    font-size: 15px;
    text-align: center;
    box-sizing: border-box;
    overflow:hidden;

    // 收藏icon
    .collectNum{
      float:left;
      &.yes {
        i{
          background: url(../assets/img/collect_yes.png) left top no-repeat;
          background-size: 100% 100%;
        }
      }
      i {
        height:30px;
        width:30px;
        background: url(../assets/img/collect_no.png) left top no-repeat;
        background-size: 100% 100%;
        float: left;
        margin-top:10px;
      }

    }  

    // 评论icon
    .contentNum{
      float:right;
      padding-left:7px;
      margin-left:10px;
      em {
        color: #999;
        font-size: 13px;
        float: left;
        padding-left:7px;
      }
      i {
        width:22px;
        height:20px;
				background: url(../assets/img/pinlun.png) left top no-repeat;
        background-size: 100% 100%;
        float: left;
        margin-top:15px;
      }
    }

    // 评论icon
    .viewsNum{
      float:right;
      padding-left:7px;
      margin-left:10px;
      em {
        color: #999;
        font-size: 13px;
        float: left;
        padding-left:7px;
      }
      i {
        height:16px;
        width:26px;
				background: url(../assets/img/read_icon@3x.png) left top no-repeat;
        background-size: 100% 100%;
        float: left;
        margin-top:17px;
      }
    }


    // 点赞icon
    .commendNum{
      float:right;
      padding-left:7px;
      margin-left:10px;
      em {
        color: #999;
        font-size: 13px;
        float: left;
        padding-left:7px;
      }
      &.yes {
        i{
          background: url(../assets/img/zan_yes.png) left top no-repeat;
          background-size: 100% 100%;
        }
      }
      i{
        height:15px;
        width:15px;
        background: url(../assets/img/zan_no.png) left top no-repeat;
        background-size: 100% 100%;
        float: left;
        margin-top:17px;
      }
    }

  }
}


/*滚动插件触发区域相关的样式*/

.allCommentList {
  height: auto;
  width: 100%;
  margin: 0 auto;
  // padding: 0 15px;
  box-sizing: border-box;
  // overflow-y: auto;
  -webkit-overflow-scrolling: touch;
  position: relative;
}
.allCommentList .commentLiActive{
	background:rgba(153,153,153,0.2);
}
.allCommentList .loadEnd {
  position: relative;
  height: 45px;
  line-height: 45px;
  font-size: 13px;
  text-align: center;
  color: #999;
  background: #f5f5f8;
  margin-left: -11px;
  margin-top:-17px;
}

.allCommentList .initText {
  padding: 0 0 0 11px;
  margin-bottom: 19px;
  text-align: center;
}

.allCommentList .initText .no_pinlun{
  width: 240px;
  height: 140px;
  background: url(../assets/images/quesheng_kong.png) 50% top no-repeat;
  background-size: 140px 140px;
  display: block;
  margin: 40px auto 0;
  position: relative;
  left: -11px;
  padding-top:150px;
}

.allCommentList .all-info {
  // padding-right: 12px;
  overflow: hidden;
}

.allCommentList .img-box {
  position: relative;
  float: left;
  margin-right: 11px;
  cursor: pointer;
}
.allCommentList .img-box span{
  width: 40px;
  height: 40px;
  border-radius: 50%;
  // border:1px solid rgba(129,141,207,0.20);
  box-sizing: border-box;
  display: block;
}

.allCommentList .img-box i {
  position: absolute;
  bottom: 0;
  right: 0;
  display: block;
  width: 18px;
  height: 18px;
  display: block;
  z-index: 2;
}

.allCommentList .img-box i.hot-v {
  background: url("./../assets/img/vip.png") left top no-repeat;
  background-size: 100%;
}

.allCommentList .img-box i.blue-v {
  background: url("./../assets/images/F_icon_guwen.png") left top no-repeat;
  background-size: 100%;
}

.allCommentList .info {
  float: left;
}

.allCommentList .info .name {
  height: 16px;
  line-height: 16px;
  font-size: 13px;
  color: #595959;
  padding: 3px 0 0;
}

.allCommentList .info span {
  height: 14px;
  line-height: 14px;
  font-size: 11px;
  color: #999;
}

.allCommentList .none_tip {
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



.allCommentList .methods {
  float: right;
}

.allCommentList .methods i {
  width: 20px;
  height: 20px;
  float: left;
  margin-right: 7px;
}

.allCommentList .methods .content-nun {
  float: left;
  cursor: pointer;
  padding: 0px 0 5px 5px;
  display: none;
}

.allCommentList .methods .give-good {
  cursor: pointer;
  float: left;
  padding: 0px 0 5px 5px;
  margin-left: 12px;
}

.allCommentList .methods .content-nun i {
  background: url(../assets/img/pinlun.png) left top no-repeat;
  background-size: 100%;
}

.allCommentList .methods .give-good i {
  background: url(../assets/img/zan_no.png) left top no-repeat;
  background-size: 100%;
}

.allCommentList .methods .give-good.yes i {
  background: url(../assets/img/zan_yes.png) left top no-repeat;
  background-size: 100%;
}

.allCommentList .methods em {
  color: #999;
  font-size: 13px;
  height: 20px;
  line-height: 23px;
  float: left;
}

.allCommentList .discuss {
  line-height: 20px;
  color: #333;
  font-size: 15px;
  padding: 15px 0;
  word-break: break-all;
}

.allCommentList .discuss span {
  font-size: 16px;
  color: #0091ff;
  word-break: break-all;
}

.allCommentList .content-msg {
  padding-left: 53px;
  padding-right: 12px;
  overflow: hidden;
}

.allCommentList .reply-comment {
  margin-bottom: 15px;
  padding: 10px 11px;
  background: #f5f5f8;
  cursor: pointer;
  border-radius: 4px;
}

.allCommentList .reply-comment p {
  line-height: 20px;
  word-break: break-all;
  font-size: 13px;
  text-overflow: ellipsis;
  display: box;
	display: -webkit-box;
	box-orient: vertical;
	-webkit-box-orient: vertical;
	line-clamp: 3;
	-webkit-line-clamp: 3;
	overflow: hidden;
}

.allCommentList .reply-comment a {
  padding-top: 4px;
  padding-bottom: 7px;
  font-size: 13px;
  display: block;
}

.allCommentList .reply-comment p span,
.allCommentList .reply-comment a {
  color: #818DCF;
}

.allCommentList .reply-comment p span,
.allCommentList .reply-comment p em{
  font-size: 13px;
}
.allCommentList .reply-comment p em{
  font-size: 13px;
	// display: -webkit-box;
	// -webkit-box-orient: vertical;
	// -webkit-line-clamp: 3;
	// overflow: hidden;
}
.allCommentList .reply-comment p span {
  // padding-right: 8px;
}

.allCommentList .delete-box {
  height: 16px;
  padding: 10px 0;
  cursor: pointer;
}


.allCommentList .delete-box em {
  height: 16px;
  line-height: 16px;
  font-size: 11px;
  color: #818DCF;
  float: left;
  cursor: pointer;
}

.allCommentList .solid {
  height: 1px;
  background: #EAEDFF;
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