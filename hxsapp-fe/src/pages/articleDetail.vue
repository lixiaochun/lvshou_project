<template>
	<div id="detailBox">
		
		<!-- 是否删除了文章详情 -->
		<div class="no_article_box" v-if=" !initDetailPageInfo && !isPreLoading">
			<div class="no_article">
			</div>
		</div>

		<div v-else> 

			<!-- 站外h5的注册头部模块 -->
			<goSignPage v-if="!isApp && isShowTypeBox != 5" >
			</goSignPage>
			
			<!-- 音频播放器 -->
			<audioPlayer 
			v-if="isShowTypeBox == 6" 
			:data="initDetailPageInfo" >
			</audioPlayer> 
			
			<!-- 阿里云播放器 -->
			<aliyunPlayer 
				pageSoure="articleDetail" 
				v-if="isShowTypeBox == 5" 
				:media_id="initDetailPageInfo.media_data.id" 
				:sourceUrl="initDetailPageInfo.media_data.link" 
				:coverUrl="initDetailPageInfo.media_data.cover">
			</aliyunPlayer>


			<div class="articleDetail" v-if="initDetailPageInfo">
				<!-- scrollTabBox占位区域 -->
				<div class="scrollTabBoxSize">
				</div>
				<!-- 标题＋头部区域 -->
				<articleHeader 
					v-if="initDetailPageInfo && initDetailPageInfo.relate_user" 
					:data="initDetailPageInfo" 
					@update_is_follow='update_is_follow'>
				</articleHeader>

				<!-- 内容 -->
				<div class="articleContent" v-if="initDetailPageInfo">
					<div v-if=" !initDetailPageInfo.is_free">
						<!-- 非app下面 需要付费 不给看-->
						<div v-if="!isApp" @click='showAppDownLoad' class='fufei'>付费阅读内容，请在好享瘦APP内查阅。</div>
						<!-- app下面 需要付费 不给看-->
						<div v-if="isApp" class='fufei'>付费阅读内容，请在好享瘦APP内查阅。</div>
					</div>

					<!-- 非app下面 免费 可以看-->
					<!-- app下面 免费 可以看-->
					<div id="initDetailPageInfoAppendHtml" v-if=" initDetailPageInfo.is_free">
						<div v-html="initDetailPageInfo.content"></div>
					</div>

				</div>

				<!-- 投票区域  文章类型 有这个东西-->
				<getVote v-if="isShowTypeBox != 5 && isShowTypeBox != 6 " :vote_theme_id="initDetailPageInfo.vote_theme_id">
				</getVote>

				<div class="change-background" v-if="isShowTypeBox != 5 && isShowTypeBox != 6 && initDetailPageInfo.vote_theme_id"></div>

				<!-- 打赏区域 -->
				<getReward 
				:article_id="this.$route.params.article_id" 
				:rewardLogData="rewardLogData" >
				</getReward>
				<div class="change-background"></div>

				<!-- 精 选 推 荐 -->
				<infoDetallRecommend>
				</infoDetallRecommend>

				<!-- 全部评论区域 -->
				<allCommentList 
					soucrePage="articleDeatail" 
					:initType="0" 
					:initDataId="this.$route.params.article_id" 
					:newCommentData="newCommentData"
					:commentInfo="commentInfo" 
					:comment_num="comment_num" 
					:callBackObj="callBackObj"
					:views_num="initDetailPageInfo.views_num" 
					:doCommendId="initDetailPageInfo.id" 
					:commend_num="initDetailPageInfo.commend_num"   
					:is_commend="initDetailPageInfo.is_commend"  
					:is_collect="initDetailPageInfo.is_collect" 
					@updateCommentTotalNum="updateCommentTotalNum">
				</allCommentList>
			</div>

			<!--  tab 滚动区域 -->
			<div class="scrollTabBox">
				<div class="li">
					<span class="on" @click="jumpTab('XQ',$event)">
						详情
					</span>
				</div>
				<div class="li">
					<span @click="jumpTab('PL',$event)">
						评论
					</span>
				</div>
			</div>
			<!-- {{playAudioListData}} -->

			<!--  音频列表区域 -->
			<div class="playAudioList" v-if="isPlayAudioList">
				<div class="header_box">
					<div class="title">
						{{playAudioListData.type_info.name}}
					</div>
					<div class="num">
						共{{playAudioListData.list.length}}条音频
					</div>
				</div>
				<div class="list_box" v-if="playAudioListData.list && playAudioListData.list.length != 0">
					
					<div 
						@click="goPlayAduioPage(data)" 
						:class=" data.id == article_id ? 'list on' : 'list' " 
						v-for="data in playAudioListData.list" 
						:key="data.id">
						{{data.title}}
						<span v-if="data.id == article_id"></span>
					</div>
				</div>
				<div class="close_btn" @click="closePlayAudioList()">
					关闭
				</div>
			</div>
			
			<!--  新的弹出层接入linkedme区域 -->
			<popupDownHxsLinkedMe v-if="isPopupDownLoad && !isApp && linkedMe" :linkedMe="linkedMe">
			</popupDownHxsLinkedMe>

			<!--  遮罩区域 -->
			<div id="mask_box" v-show="isMaskBox"></div>

			<!--  非app环境下的app下载区域 
			<downLoadApp v-if="!isApp"></downLoadApp>
			-->
			<!--  是否app推广添加的业务 -->
			<div v-if="!isAppExtend">
				<downToLinkedMe v-if=" !isApp && linkedMe" :linkedMe='linkedMe'></downToLinkedMe>
			</div>
			<div v-else>
				<downAppExtend v-if=" !isApp " :appExtendData="appExtendData"></downAppExtend>
			</div>

			<!-- 底部悬浮区域评论区域 -->
			<discussInput 
				v-if="isApp && initDetailPageInfo && hasShareContentData" 
				soucrePage="articleDeatail"  
				:commentInfo="commentInfo" 
				@addCommentData="addCommentData" 
				@obtain2="callBack2"
				:initType="0" 
				:shareContent="initDetailPageInfo.shareContent" 
				:doCommendId="initDetailPageInfo.id" 
				:comment_num="comment_num" 
				:commend_num="initDetailPageInfo.commend_num" 
				:is_commend="initDetailPageInfo.is_commend" 
				:is_collect="initDetailPageInfo.is_collect">
			</discussInput>
			

		</div>
		<preLoading v-if="isPreLoading && !initDetailPageInfo"></preLoading>
	</div>
</template>

<script>
window.onload = function() {
	document.documentElement.scrollTop = 0;
}

// 投票组件
import getVote from "@/components/getVote"

// 打赏组件
import getReward from "@/components/getReward"

// 精 选 推 荐-组件
import infoDetallRecommend from "@/components/infoDetallRecommend"

// 阿里云视频的播放器
import aliyunPlayer from "@/components/aliyunPlayer"

// 音频播放组件
import audioPlayer from "@/components/audioPlayer"

// 下载app组件
import downLoadApp from "@/components/down"
import downToLinkedMe from "@/components/downToLinkedMe"
import downAppExtend from "@/components/downAppExtend"

// 文章头部组件
import articleHeader from "@/components/articleHeader"

// 文章评论列表组件
import allCommentList from "@/components/allCommentList"

// 评论输入组件
import discussInput from "@/components/discuss"

// 居中弹出下载appdownload组件
import popupDownHxsLinkedMe from "@/components/popupDownHxsLinkedMe"

// 初始化loadding的组件
import preLoading from "@/components/preLoading"

// 站外h5的注册头部模块
import goSignPage from "@/components/goSignPage"

import axios from 'axios'
import { Toast } from 'mint-ui';
import commonJs from '@/util/common.js'
// import { MessageBox } from 'mint-ui'


window.ARTICLE_ID = "";

export default {
	name: "articleDetail",
	data() {
		return {
			// app推广的落地页面 wiki：http://jira.sys.hxsapp.net/browse/HXSAPP-2907
			appExtendData:{
				articleId:[
					4368,4411,4338,4392
					// 调试
					// 1762,4368,4411,4338,4392
				],
				downLink:{
					// "1762":"https://hxsapp-oss.hxsapp.com/package/2018-04/hxs_release_v3.2.2_c76_2018_03_21_app-meiyou2.apk",
					"4368":"https://hxsapp-oss.hxsapp.com/package/2018-04/hxs_release_v3.2.2_c76_2018_03_21_app-meiyou2.apk",
					"4411":"https://hxsapp-oss.hxsapp.com/package/2018-04/hxs_release_v3.2.2_c76_2018_03_21_app-meiyou1.apk",
					"4338":"https://hxsapp-oss.hxsapp.com/package/2018-04/hxs_release_v3.2.2_c76_2018_03_21_app-tashequ1.apk",
					"4392":"https://hxsapp-oss.hxsapp.com/package/2018-04/hxs_release_v3.2.2_c76_2018_03_21_app-tashequ2.apk"
				}
			},
			hasShareContentData:false,

			// 打赏app回装数据－uid
			uid:0,

			callBackObj:null,

			// 打赏app回装数据－用户头像
			newRewardImage:"",

			// 打赏的数据
			rewardLogData:null,

			// 判断loadding和文章删除的场景
			isPreLoading:true,

			// 第三方linkedme的接入数据
			linkedMe:null,

			// 文章id
			article_id:this.$route.params.article_id,

			// 给评论列表组件使用的数据
			commentInfo: {
				type: null, //文章类型
				data_id: null,//文章id
				parent_comment_id: null,//父级评论id,(可无)
				reply_comment_id: null,//二级评论id,(可无)
				arguedName: null,//被回复人的评论(可无)
				sess_token: null
			},

			// 评论列表的总数
			comment_num: 0,

			// 发布box推送给评论列表的数据格式
			newCommentData: null,
			
			// 是否弹出下载弹出框的判断
			isPopupDownLoad: false,

			// 初始化详情页面数据
			initDetailPageInfo: null,

			// 显示音频的列表
			isPlayAudioList: false,

			// 显示音频的列表的数据
			playAudioListData: null,

			// 全局的遮罩mask
			isMaskBox: false,

			//文章的类型，是否显示视频或音频 
			isShowTypeBox: 0,

			// test data 可以忽略
			msg: 'page web - Welcome to Your Vue.js App',
			columns: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]

		}
	},
	components: {
		aliyunPlayer,
		getReward,
		infoDetallRecommend,
		getVote,
		audioPlayer,
		// downLoadApp,
		downAppExtend,
		downToLinkedMe,
		articleHeader,
		allCommentList,
		discussInput,
		popupDownHxsLinkedMe,
		goSignPage,
		preLoading
	},
	computed: {
		isLogin: function() {
			return commonJs.isLogin()
		},
		isAppExtend:function() {
			var __articleId = parseInt( this.article_id );
			var __hasAppExtend = this.$route.query.appExtend && this.$route.query.appExtend >= 0;

			if( this.appExtendData.articleId.indexOf(__articleId)>= 0 && __hasAppExtend){
				return true;	
			}
			// debugger
			return false;
		},
		isApp: function() {
			return commonJs.isApp()
		}
	},
	created(){
		window.ARTICLE_ID = this.$route.params.article_id
	},
	watch: {
		$route() {
			$(window).off('scroll', this.onScrollTabBox)
			console.log("wtach-route-log")
		},
		isPreLoading(){
			console.log("isPreLoading-watch")
			if( !this.initDetailPageInfo && !this.isPreLoading ) {
				document.title = "文章出错了"
			}
		}
	},
	beforeDestroy() {
		var __version = commonJs.getHxsAppVersion();
		
		console.log("beforeDestroy-log")
		document.title = commonJs.config.webTitle;

		$(window).off('scroll', this.onScrollTabBox)
		delete window.ARTICLE_ID;
		
		// app 回调删除相关处理
		window.hxsapp_visible_share_btn_mar &&  delete window.hxsapp_visible_share_btn_mar;
		
		if ( commonJs.compareAppVersion( __version, "3.0.2" ) || __version == "3.0.2" ) {
			console.log("删除数据打赏的app全局函数");
			window.hxsapp_update_get_reward &&  delete window.hxsapp_update_get_reward;
		}

		if( this.isApp ){
			$('#initDetailPageInfoAppendHtml').off("click","a");
		}
	},

	mounted() {
		// alert("navigator.userAgent:"+ navigator.userAgent)
		

		// $(".scrollTabBoxSize").show();
		// $(".scrollTabBox").show();
		
		//文章类型/文章的id/父评论id/sess_token
		let routeParams = this.$route.params;
		this.commentInfo.type = 0;
		this.commentInfo.data_id = routeParams.article_id;
		this.commentInfo.sess_token = commonJs.getUrlParam('sess_token');
		
		// 拿列表数量的数据
		// this.getCommentData()

		// 拿打赏相关的数据
		this.getRewardLogData();

		// 非app场景下面才有用 有有版本限制 是3.0.1开始的
    if( !this.isApp ){
      // http://wiki.sys.hxsapp.net/pages/viewpage.action?pageId=1998876
      var __url = commonJs.config.prefixUrl+ "articleDetail/"+ this.commentInfo.data_id;
      this.linkedMe = {
        params:{
          // key 是写死的   value是协议，具体见这里－http://wiki.sys.hxsapp.net/pages/viewpage.action?pageId=1998876
          "key": "hxsapp://web?url="+ __url
        }
      }
    }

		// 拿详情的数据
		this.getDetailByAid()
	},

	methods: {
		update_is_follow(data){
			console.log(data)

			this.initDetailPageInfo.relate_user.is_follow = data;
		},
		clientUpdateRewardLogData(){
			var __uid = this.uid;
			var __head_img = this.newRewardImage;

			this.rewardLogData.list.unshift({
				"user_id": __uid,
				"head_img": __head_img
				// "head_img": "https://hxsupload-oss.hxsapp.com/2017-09-27/f4a4ddfdfe240db067eff4f2c3214091.jpg?x-oss-process=style/medium"
			});
			this.rewardLogData.total = this.rewardLogData.total +1
			// alert("clientUpdateRewardLogData－rewardLogData-JSON:"+ JSON.stringify( this.rewardLogData ))

		},
		//  打赏数据
		getRewardLogData(){
			
			var __article_id = this.$route.params.article_id

			// https://api.hxsapp.com/mall/Reward/getRewardLog
			axios.get("https://api.hxsapp.com/mall/Reward/getRewardLog?article_id=" + __article_id).then((res)=>{
				console.log(res)
				// debugger
				if(res.data.code == 200){
					this.rewardLogData = res.data.data;
					// alert("rewardLogData-JSON:"+ JSON.stringify( this.rewardLogData ))
					
				}else{
					console.log("加载数据异常，请稍后再试！code != 200 ")
				}
			})
		},
		// 设置删除文章的同期高度
		set_no_article_box_css(){
			this.$nextTick(()=>{
				$(".no_article_box").css({
					"height": $(window).height()+"px"
				})
			})
		},

		//添加发布的新评论的数据给评论列表插入到头部去 
		addCommentData(data) {
			// 加一条记录
			console.log(data)
			// debugger
			this.comment_num = parseInt(this.comment_num) + 1;
			data.item.commentChildren={};
			data.item.commentChildren.data = [];
			this.newCommentData = data;

		},

		// 更新评论列表的数据
		updateCommentTotalNum(data) {
			console.log("updateCommentTotalNum-call:" + data)
			this.comment_num = data;
		},

		// 显示和异常弹出提示下载层
		hidePopupDownLoadCall() {
			this.isPopupDownLoad = false;
		},
		showPopupDownLoadCall() {
			this.isPopupDownLoad = true;
		},

		//H5通知客户端显示分享数据
		setShareContent() {
			// debugger
			// 邀请码
			console.log("getInviteCode-function-dosomething:"+Math.random() )

			var __this = this;

			commonJs.getInviteCode( ( res ) =>{

				var shareTitle = encodeURIComponent( this.initDetailPageInfo.title);
				var __search = "?displayThumbBtn=1&inviteCode=" + res;

				var shareLink = commonJs.config.prefixUrl + 'articleDetail/' + this.$route.params.article_id + __search;
				var shareImages = this.initDetailPageInfo.images[0];
				//分享描述
				var shareDescr = this.initDetailPageInfo.descr ? encodeURIComponent(this.initDetailPageInfo.descr) : encodeURIComponent( commonJs.config.webTitle );
				var shareArticleId = this.$route.params.article_id;
				var shareType = this.initDetailPageInfo.show_type;
				var shareMediaLink = this.initDetailPageInfo.media_data && this.initDetailPageInfo.media_data.link ? this.initDetailPageInfo.media_data.link : "";

				var shareActWindowTitle = "";
				var shareActWindowDescr = "";
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
				this.hasShareContentData = true;

				this.initShare(shareData)

			})
		},

		// 埋点
		buriedPoint(access_occurred_type){
			var __article_id = this.$route.params.article_id

			commonJs.buriedPoint({
				access_occurred_type: access_occurred_type,//发生访问的【页面】类型
				access_occurred_type_id: __article_id,//发生访问的【页面】类型ID
				previous_event_type_obj: '',//【事件】对象类型
				previous_event_type_obj_id: '',//【事件】对象类型ID
				previous_content_sort: ''//【事件】事件参数
			});
		},

		// 修复富文本的链接跳转的bug
		richTextFixBug(){

			var linklable = $('#initDetailPageInfoAppendHtml a');
			// debugger
			if( this.isApp && linklable.length > 0){
				$.each(linklable, function(i){
					var linkUrl = linklable.eq(i).attr('href');
					linklable.eq(i).attr('href',"javascript:void(0);");
					linklable.eq(i).attr('data-href', linkUrl);
				})

				$('#initDetailPageInfoAppendHtml').on("click","a",function(){
					var linkUrl = $(this).attr('data-href');
					if(linkUrl){
						window.location.href = 'https://hxsapp_new_webview#'+ linkUrl;
					}
				})
				
			}
	
		},
		// 获取文章内容详情的数据
		// http://wiki.sys.hxsapp.net/pages/viewpage.action?pageId=7343652
		getDetailByAid() {

			let json = {
				from_where:this.$route.query.from_where,
				article_id: this.$route.params.article_id,
				sess_token: commonJs.getUrlParam("sess_token")
			};

			axios.get("https://api.hxsapp.com/content/Article/getDetailByAid", { params: json }).then((res) => {
				console.log(res)

				if (res.data.code == 200 && res.data.data) {
					this.initDetailPageInfo = res.data.data;
					console.log(this.initDetailPageInfo)


					this.comment_num = this.initDetailPageInfo.comment_num;
					

					if ( !this.initDetailPageInfo.is_free ) {
						console.log("这片文章需要购买才可以才可以查看！这里等待接入app协议的页面或者h5的购买页面")
						var articleId = this.$route.params.article_id;
						commonJs.h5CallAppAction.hxsapp_buy_article_detail( articleId);
						return;
					}

					// 分享数据初始化
					this.setShareContent()
					
					// 常规默认加载数据
					this.isShowTypeBox = this.initDetailPageInfo.show_type;

					if(this.isShowTypeBox == 5){
					// 视频
						this.buriedPoint(110303)
					}else if(this.isShowTypeBox == 6){
					// 音频
						this.buriedPoint(110403)
					}else {
						this.buriedPoint(110402)
					}
					// debugger
					if (this.isShowTypeBox != 5 && this.isShowTypeBox != 6) {

						this.$nextTick(()=>{
							console.log("loaddPage-加载文章类型")
							this.loaddPage({
								action: "defaultArticle"
							})

						})

					}

				} else {
					console.log("加载数据异常，请稍后再试！,code !== 200 ")
					this.isPreLoading = false;
				}
				this.set_no_article_box_css()

			})
			.catch( (error)=>{
				console.log("加载数据异常，请稍后再试！getDetailByAid-error")
				this.isPreLoading = false;
			})
		},

		// tab切换标签的点击事件处理
		jumpTab(typeString, event) {
			if (typeString == "XQ") {
				this.buriedPoint(211124)	
			}else if (typeString == "PL") {
				this.buriedPoint(211125)	
			}
			
			var __this = this
			function __window_scrollTop() {
				// 40
				var scrollTabBoxHeight = $(".scrollTabBox").outerHeight();
				// var commentBoxOffSetTop = $(".allCommentList").position().top;

				let commentBoxOffSetTop = $(".allCommentList").offset().top;
				// var commentBoxOffSetTop = 0;
				console.log( "__this.isShowTypeBox:"+__this.isShowTypeBox)
				
				// if (__this.isShowTypeBox == 6) {
				// 	$(window).scrollTop(commentBoxOffSetTop - scrollTabBoxHeight)
				if (__this.isShowTypeBox == 5) {
					$(window).scrollTop($(".allCommentList").position().top - scrollTabBoxHeight )
				// } else {
				}else{
					$(window).scrollTop(commentBoxOffSetTop - scrollTabBoxHeight)
				}

				console.log(
					"jumpTab－commentBoxOffSetTop:" + commentBoxOffSetTop +
					"jumpTab－scrollTabBoxHeight:" + scrollTabBoxHeight
				)
			}
			console.log(event.target.className);
			var __className = event.target.className;

			if (__className.indexOf("on") >= 0) {
				console.log("不处理on选中的逻辑");
				if (typeString == "XQ") {
					$(window).scrollTop(0)
					this.isScrollTabBoxShow("hideDom")

				} else if (typeString == "PL") {
					// debugger
					__window_scrollTop()
					this.isActiveTab("PL")
				}

			} else {
				if (typeString == "XQ") {
					$(window).scrollTop(0)
					this.isScrollTabBoxShow("hideDom")

				} else if (typeString == "PL") {
					// debugger
					__window_scrollTop()
					this.isActiveTab("PL")
				}
			}

		},

		// 控制 window 上滚动 scroll 处理 tab选项卡的业务
		onScrollTabBox() {
			// let containerHeight = $("#detailBox")[0].scrollHeight;
			// let viewHeight = $("#detailBox")[0].clientHeight;
			let viewScrollTop = $(window).scrollTop();
			let commentBoxOffSetTop3 = $(".allCommentList")[0].offsetTop;

			let commentBoxOffSetTop = $(".allCommentList").offset().top;
			let commentBoxOffSetTop2 = $(".allCommentList").position().top;

			let articleContentOffSetTop = $(".articleContent")[0].offsetTop;

			console.log(
				// " containerHeight:" + containerHeight +
				// " viewHeight:" + viewHeight +
				" viewScrollTop:" + viewScrollTop +
				" commentBoxOffSetTop:" + commentBoxOffSetTop +
				" commentBoxOffSetTop2:" + commentBoxOffSetTop2 +
				" commentBoxOffSetTop3:" + commentBoxOffSetTop3
			)
			// debugger
			// 滚动窗口高度 + 向上滚动高度 + 滚动响应区域高度 >= 滚动文档高度
			// var aliyunPlayerHeight = $(".aliyunPlayer").height();

			var articleTitleHeight = $(".articleTitle").outerHeight();
			console.log('articleTitleHeight-' + $(".articleTitle").outerHeight());
			// if ( viewScrollTop +5 > articleTitleHeight){

			var dongtaiDomHeight = 0;
			var dongtaiDomHeight1 = 0;

			if (this.isShowTypeBox == 6) {
				//音频 
				dongtaiDomHeight = $(".audioPlayer").outerHeight();
			} else if (this.isShowTypeBox == 5) {
				//视频 
				dongtaiDomHeight1 = $(".aliyunPlayer").outerHeight();
				dongtaiDomHeight = 0;
				//文章 
			} else {
				dongtaiDomHeight = 0
			}
			console.log("dongtaiDomHeight:" + dongtaiDomHeight)
			console.log("dongtaiDomHeight1:" + dongtaiDomHeight1)

			// 滚动选择tab 添加class的问题
			if (viewScrollTop + 60 + dongtaiDomHeight1 > commentBoxOffSetTop ) {
				//显示评论选中了 评论取消
				this.isActiveTab("PL")
			} else {
				//显示评论选中了 评论取消
				this.isActiveTab("XQ")
			}

			if (this.isShowTypeBox == 5) {
				//显示tab的滚动出现逻辑
				if (viewScrollTop + 5 > articleTitleHeight + dongtaiDomHeight) {

					this.isScrollTabBoxShow("showDom");

					this.setScrollTabBoxTop()

					console.log('$(".allCommentList").outerHeight() :' + $(".allCommentList").outerHeight())

				} else {
					this.isScrollTabBoxShow("hideDom")
				}
				
			}else {
				//显示tab的滚动逻辑
				if (viewScrollTop + 5 > articleTitleHeight + dongtaiDomHeight) {

					this.isScrollTabBoxShow("showDom");

					this.setScrollTabBoxTop()

					console.log('$(".allCommentList").outerHeight() :' + $(".allCommentList").outerHeight())

				} else {
					this.isScrollTabBoxShow("hideDom")
				}
				
			}

		},

		// scrollTabBox区域 js事件处理dom选中classname
		isActiveTab(str) {
			//显示评论选中了 评论取消
			if (str == "PL") {
				$(".scrollTabBox .li").eq(0).find("span").removeClass("on");
				$(".scrollTabBox .li").eq(1).find("span").addClass("on");
			} else if (str == "XQ") {
				//显示详情选中了 评论取消
				$(".scrollTabBox .li").eq(1).find("span").removeClass("on");
				$(".scrollTabBox .li").eq(0).find("span").addClass("on");
			}
		},

		//tab滚动占位区域的jd dom操作 
		isScrollTabBoxShow(str) {
			console.log("str:" + str)
			console.log('$(".scrollTabBoxSize").length:' + $(".scrollTabBoxSize").length)
			console.log('$(".scrollTabBox").length:' + $(".scrollTabBox").length)

			if (str == "hideDom") {
				$(".scrollTabBoxSize").hide();
				$(".scrollTabBox").hide();
			} else if (str == "showDom") {
				$(".scrollTabBoxSize").show();
				$(".scrollTabBox").show();
			}
		},

		// js设置滚动tab的Top样式
		setScrollTabBoxTop() {
			var _top = 0;
			//音频 
			if (this.isShowTypeBox == 6) {
				_top = 0;
				//视频 
			} else if (this.isShowTypeBox == 5) {
				_top = $(".aliyunPlayer").outerHeight();
				//文章 
			} else {
				_top = 0
			}

			$(".scrollTabBox").css({
				top: _top + "px"
			});
		},

		//是否显示下载app区域
		showAppDownLoad() {
			// alert("showAppDownLoad-showAppDownLoad");
			this.isPopupDownLoad = true;
		},

		// 获取列表的方法
		getCommentData(initType = 0, lastId = 0) {

			// 接口请求数据
			let json = {
				type: initType,
				// data_id: this.$route.params.article_id,
				data_id: this.$route.params.article_id,
				last_id: lastId,
				sess_token: commonJs.getUrlParam("sess_token")
			};
			// debugger
			axios.get('https://api.hxsapp.com/community/userComment/getCommentList', { params: json }).then((res) => {
				if (res.data.code == 200) {
					this.comment_num = res.data.total;
				}

			})
		},

		// app右上角分享
		initShare(shareData) {
			var __this = this;
			
			// 打赏成功后，app回调全局h5函数 此时更新文章详情页面的打赏部分数据，
			//  app 开始 3.0.2 支持
			window.hxsapp_update_get_reward = function(__uid,__image){
				// alert("window.hxsapp_update_get_reward")
				var __version = commonJs.getHxsAppVersion();

				// alert("__version:"+__version)
				// alert("navigator.userAgent:"+ navigator.userAgent)

				var __is =  !! ( commonJs.compareAppVersion( __version, "3.0.2" ) || __version == "3.0.2" ) 
				// alert('!!(commonJs.compareAppVersion( __version, "3.0.2") || __version == "3.0.2") = '+ __is )
				
				__this.uid = __uid;
				__this.newRewardImage = __image;

				// if ( commonJs.compareAppVersion( __version, "3.0.2" ) || __version == "3.0.2" ) {
				if ( !! (commonJs.compareAppVersion( __version, "3.0.2") || __version == "3.0.2") ) {
					// alert("更新数据打赏数据");
					__this.buriedPoint(211137)

					Toast("谢金主赏赐！祝你身材一级棒！")
					// alert("uid="+__this.uid +",newRewardImage:"+__this.newRewardImage)
					__this.clientUpdateRewardLogData()
					
				}else{
					console.log("更新数据打赏数据-非当前版本");

				}
			}

			if (this.isApp) {

				console.log(this.initDetailPageInfo.shareContent)
				console.log(this.hasShareContentData)
				// debugger
				var __article_id = this.$route.params.article_id;
				
				var json = {
					access_occurred_type: 211102,//发生访问的【页面】类型
					access_occurred_type_id: __article_id,//发生访问的【页面】类型ID
					previous_event_type_obj: "",//【事件】对象类型
					previous_event_type_obj_id: '',//【事件】对象类型ID
					previous_content_sort: ''//【事件】事件参数
				};
				
				// 点击app上右上角分享按钮，app回调 h5的全局函数
				//  app 开始 3.0.0 支持
				window.hxsapp_visible_share_btn_mar = function(){
					commonJs.buriedPoint(json)
				}
				// alert("shareTitle-1")
				commonJs.h5CallAppAction.hxsapp_visible_share_btn(shareData)
			} else {
				// alert("shareTitle-2")	
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
		// 加载页面依赖的数据
		loaddPage(obj) {
			// debugger  
			// 根据obj传回来的对象键名 action 来做处理
			// action aliyunPlaer
			// action audioPlaer
			// action:"defaultArticle"


			$(window).on('scroll', this.onScrollTabBox)
			// this.articleHeaderData = {};

			// this.articleHeaderData.time = this.initDetailPageInfo.create_time.substr(0, 10);
			
			// this.articleHeaderData.title = this.initDetailPageInfo.title;
			// this.articleHeaderData.user_id = this.initDetailPageInfo.user_id;

			// this.articleHeaderData.relate_user = this.initDetailPageInfo.relate_user;

			// this.articleHeaderData.type_name = this.initDetailPageInfo.type_name;

			// this.articleHeaderData.is_follow = this.initDetailPageInfo.relate_user.is_follow;
			// this.articleHeaderData.is_mine = this.initDetailPageInfo.is_mine;

			// this.articleHeaderData.source = this.initDetailPageInfo.source ? this.initDetailPageInfo.source : "";
			// this.articleHeaderData.readNum = this.initDetailPageInfo.views_num;

			// 修复富文本的链接跳转的bug
			this.richTextFixBug()
		},

		// 组件回调处理 为视频组件 去使用
		renderVideoCall(data) {
			console.log("父级 renderVideoCall-test：");
			console.log(data);

			this.$nextTick(() => {
				this.loaddPage(data)
			})

		},

		// 组件回调处理 为音频组件 去使用
		renderAudioCall(data) {
			console.log("父级 renderAudioCall-test：");
			console.log(data);
			// debugger
			this.$nextTick(() => {
				this.loaddPage(data)
			})

		},


		// 显示音频的列表的回调事件
		showAudioListCall(data) {
			//音频 
			if (this.isShowTypeBox == 6) {
				console.log("showAudioListCall-显示音频的列表")
				this.isMaskBox = true;
				this.isPlayAudioList = true;
				this.playAudioListData = data.data.data;
				// debugger
				this.$nextTick(() => {
					$("body").addClass("playAudioListBODY");
					$(".playAudioList").find(".list_box").css({
						height: $(window).height() / 2 + "px"
					})
				})

				//视频 
			} else if (this.isShowTypeBox == 5) {
				// _top = $(".aliyunPlayer").outerHeight();
			} else {
				//文章 
				// dongtaiDomHeight = 0
			}
		},

		goPlayAduioPage(data) {
			console.log("data.id="+ data.id)
			if( data.id == this.article_id ){
				return;
			}
			console.log(data.title)
			setTimeout(() => {
				$(".mint-msgbox-confirm").css({
					color: "#FF68B0"
				})
			}, 10)

			// MessageBox({
			// 	title: '提示',
			// 	message: '确定执行此操作,跳转到新的音频名称：<br />' + data.title + "?",
			// 	showCancelButton: true,
			// 	closeOnClickModal: false
			// }).then((action) => {
				// console.log("actio-value:" + action);
				// if (action == "confirm") {
				// 	console.log(action + "-case")

					$("body").removeClass("playAudioListBODY");

					var url = commonJs.config.prefixUrl + "articleDetail/" + data.id;
					console.log("url:" + url);
					setTimeout(() => {
						// window.location.href = commonJs.config.prefixUrl + "articleDetail/" + data.id + window.location.search;
						var __url  = commonJs.config.prefixUrl + "articleDetail/" + data.id + window.location.search;
						window.location.replace( __url );
					}, 200)
			// 	} else if (action == "cancel") {
			// 		console.log(action + "-case")

			// 	}
			// });

		},
		// 点击关闭playAudioList
		closePlayAudioList() {
			console.log("closePlayAudioList-fun-do code")
			this.isMaskBox = false;
			this.isPlayAudioList = false;

			$("body").removeClass("playAudioListBODY");
		},
		callBack2(obj){
			//接受发表评论框传过json，推送到评论 子评论数组 第一位
			this.callBackObj = obj;
		}
	}

}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less">
//音频播放的音频列表－给body 添加样式
.playAudioListBODY {
	height: 100%;
	overflow: hidden;
}

#detailBox {
	width: 100%; 
	overflow: hidden;
	// 遮罩区域

	#mask_box {
		position: fixed;
		top: 0;
		left: 0;
		height: 100%;
		width: 100%;
		background: rgba(0, 0, 0, .5);
		z-index: 100;
	}

	// tab滚动占位区域
	.scrollTabBoxSize {
		height: 40px;
		display: none;
	}

	//音频播放的音频列表
	.playAudioList {
		position: fixed;
		left: 0;
		bottom: -1px;
		width: 100%;
		z-index: 10000;
		background: #fff;

		.header_box {
			height: 50px;
			line-height: 50px;
			width: 100%;
			overflow: hidden;
			padding: 0 15px;
			box-sizing: border-box;
			color: #333;
			font-size: 15px;
			border-bottom: 1px solid rgba(129, 141, 207, .2);

			.title {
				float: left;
			}
			.num {
				float: right;
				text-align: right;
				font-size: 13px;
				color: rgba(153, 153, 153, .6);
			}
		}

		.list_box {
			width: 100%;
			height: 300px;
			overflow-y: auto;
			font-size: 16px;
			padding: 0 0 0 15px;
			.list {
				position: relative;
				width: 100%;
				height: 50px;
				line-height: 50px;
				// box-shadow: inset 0px -1px 1px -1px rgba(129, 141, 207, .6);
				// border-bottom: 1px solid rgba(129, 141, 207, .2);
				overflow: hidden;
				text-overflow: ellipsis;
				white-space: nowrap;
				font-size: 15px;
				color: #666;
				padding-right: 60px;
				box-sizing: border-box;
				border:none;
				&:after{
					content: '';
					position: absolute;
					top: 0;
					left: 0;
					border:0 none; 
					border-bottom: 1px solid rgba(129, 141, 207, .2);
					-webkit-box-sizing: border-box;
					box-sizing: border-box;
					width: 200%;
					height: 200%;
					-webkit-transform: scale(0.5);
					transform: scale(0.5);
					-webkit-transform-origin: left top;
					transform-origin: left top;
				}
				span {
					display: none;
				}
				&.on {
					color: #FF668C;

					span {
						position: absolute;
						display: block;
						right: 30px;
						top: 20px;
						width: 20px;
						height: 20px;
						background: url("./../assets/img/zx_icon.png") left top no-repeat;
						background-size: 100%;
						animation: auto-circle 1s step-end infinite;
					}
					@keyframes auto-circle {
						0% {
							background-image: url("./../assets/img/audio_movie/audio_1@2x.png")
						}
						15% {
							background-image: url("./../assets/img/audio_movie/audio_2@2x.png")
						}
						30% {
							background-image: url("./../assets/img/audio_movie/audio_3@2x.png")
						}
						45% {
							background-image: url("./../assets/img/audio_movie/audio_2@2x.png")
						}
						60% {
							background-image: url("./../assets/img/audio_movie/audio_1@2x.png")
						}
						75% {
							background-image: url("./../assets/img/audio_movie/audio_2@2x.png")
						}
						90% {
							background-image: url("./../assets/img/audio_movie/audio_3@2x.png")
						}
						100% {
							background-image: url("./../assets/img/audio_movie/audio_2@2x.png")
						}
					}
				}
			}
		}

		.close_btn {
			background: #f9f9f9;
			width: 100%;
			text-align: center;
			padding: 10px;
			box-sizing: border-box;
			color: #818dcf;
			font-size: 17px;
		}
	}

	// tab滚动选项卡的区域
	.scrollTabBox {
		position: fixed;
		width: 100%;
		height: 40px;
		overflow: hidden;
		line-height: 40px;
		text-align: center;
		top: -223px;
		left: 0;
		border-bottom: 1px solid rgba(129, 141, 207, .2);
		background: #fff;
		z-index: 99;
		.li {
			width: 50%;
			float: left;
			.on {
				display: block;
				color: #FF668C;
				height: 40px;
				width: 40px;
				margin: 0 auto;
				text-align: center;
				position: relative;
				&:after {
					position: absolute;
					left: -5px;
					bottom: 0;
					content: "";
					width: 50px;
					height: 2px;
					border:0 none;
					border-radius: 2px; 
					background: #FF668C;
				}
			}
		}
	}
	// 文章删除的样式
	.no_article_box{
		position: relative;
		width: 100%;
		margin: 0 auto;
		text-align: center;
		.no_article{
			display: block;
			position: absolute;
			width: 140px;
			height: 140px;
			left: 50%;
			top: 50%;
			z-index: 1;
			margin-left:-70px;
			margin-top:-120px;
			background: url(../assets/images/quesheng_kong.png) left top no-repeat;
			background-size: 100%;
			&:after{
				content: "抱歉，此文章已删除";
				display: block;
				position: absolute;
				bottom:-50px;
				left: -50px;
				width: 240px;
				text-align: center;
				color: #333;
				font-size: 17px;
			}
		}
	}

	//文章详情样式
	.articleDetail {
		width: 100%;
		position: relative;
		box-sizing: border-box;
		img {
			width: 100%;
		}
		
		/*内容显示区域－大区域 */
		.articleContent {
			padding: 15px 15px 15px 15px;
			line-height: 30px;
			font-size: 18px;
			box-sizing: border-box;
			word-break: break-all;
			.fufei {
				height: 200px;
				line-height: 200px;
				font-size: 14px;
				text-align: center;
			}
			p {
				line-height: 30px;
				font-size: 18px;
			}

			// strong,
			// span {
			// 	font-weight: inherit;
			// }
			table,
			table tr th, 
			table tr td { 
				border: 1px solid #EAEDFF; 
			}
			table { 
				min-width: 320px; 
				width: 100%; 
				border-collapse: collapse; 
				// padding:2px;
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

		/*文章来源－区域*/
		.subtitle {
			padding: 15px 15px 10px 15px;
			font-size: 12px;
			color: #999;
			display: block;

			>* {
				font-size: 12px;
			}

			i {
				padding-right: 18px;
				display: _none;
			}
		}
		/*10px 高度*/
		.change-background {
			width: 100%;
			height: 7px;
			background: #f5f5f8;
		}
	}

}

</style>
