<template>
	<div id="videoSpecialBox">
		<!-- 是否删除了文章详情 -->
		<div class="no_article_box" v-if=" !initDetailPageInfo && !isPreLoading">
			<div class="no_article">
			</div>
		</div>
		<div v-else>

			<!-- 阿里云播放器 -->
			<aliyunPlayer 
				pageSoure="videoSpecial" 
				v-if="initDetailPageInfo && initDetailPageInfo.show_type == 5" 
				article_id="article_id" 
				:sourceUrl="initDetailPageInfo.media_data.link" 
				:coverUrl="initDetailPageInfo.media_data.cover">
			</aliyunPlayer>
			<div class="videoSpecial" v-if="initDetailPageInfo">

				<!-- 标题＋头部区域 -->
				<!-- 头部区域 -->
				<div class="infoDetall_t_header">
					<div class="img_box">
						<img v-if="initDetailPageInfo && initDetailPageInfo.tinfo && initDetailPageInfo.tinfo.author && initDetailPageInfo.tinfo.author.head_img" :src="initDetailPageInfo.tinfo.author.head_img" />
					</div>

					<div class="info">
						<span>
							{{initDetailPageInfo.tinfo.name}}
						</span>
		
						<i v-if="initDetailPageInfo.tinfo.author">
							{{initDetailPageInfo.tinfo.author.descr}}
						</i>
					</div>

					<div v-if=" initDetailPageInfo.is_mine == 0 " :class=' is_follow == "yes" ? "reading_quantity on" : "reading_quantity" ' @click="followBtn()">
						<em v-if="is_follow == 'yes'">已关注</em>
						
						<em v-if="is_follow == 'no' ">
							<span class="jia"></span>关注
						</em>

					</div>
				</div>

				<div class="articleDesr" v-if="initDetailPageInfo.tinfo && initDetailPageInfo.tinfo.descr">
				{{initDetailPageInfo.tinfo.descr}}
				</div>

				<div class="change-background"></div>

				<!-- 视频选集 -->
				<div class="videolist_recommend" v-if="videoListData && videoListData.length">
					<div class="title">
						视 频 选 集
					</div>
					<div class="recommend_article">
						<div class="li" v-for="(item,index) in videoListData" :key="index">
							<img v-if="item.images" :src="item.images[0]" @click="goVideoLinkPage(item,index)" />
							<div class="article_info" @click="goVideoLinkPage(item,index)">
								<div class="article_info_li">
									<div class="tit">
										{{item.title}}
									</div>

									<div class="info">
										<div class="read">
											<span></span>
											<em>
												{{item.views_num}}
											</em>
										</div>

										<div class="good" v-if="0">
											<span></span>
											<em>
												{{item.commend_num}}
											</em>
										</div>

									</div>

								</div>
							</div>
						</div>
					</div>
				</div>

				<!-- 全部评论区域 -->
				<allCommentList 
					soucrePage="videoSpecial" 
					v-if="videoListData && videoListData.length" 
					:initType="0" 
					:initDataId="this.videoListData[0].id" 
					:newCommentData="newCommentData" 
					:commentInfo="commentInfo"  
					:doCommendId="article_id" 
					:comment_num="comment_num" 
					:callBackObj="callBackObj"
					:commend_num="commend_num" 
					:views_num="initDetailPageInfo.views_num" 
					:is_commend="initDetailPageInfo.is_commend" 
					:is_collect="initDetailPageInfo.is_collect" 
					@updateCommentTotalNum="updateCommentTotalNum">
				</allCommentList>

			</div>
			
			<popupDownLoad v-if="isPopupDownLoad">
			</popupDownLoad>

			<!--  非app环境下的app下载区域 
			<downLoadApp v-if="!isApp"></downLoadApp>
			-->
			<downToLinkedMe v-if=" !isApp && linkedMe" :linkedMe='linkedMe'></downToLinkedMe>

			<!-- 底部悬浮区域评论区域 -->
			<discussInput 
			soucrePage="videoSpecial" 
			:commentInfo="commentInfo" 
			@addCommentData="addCommentData" 
			v-if="isApp && initDetailPageInfo && hasShareContentData" 
			:initType="0" 
			:shareContent="initDetailPageInfo.shareContent" 
			:doCommendId="article_id" 
			@obtain2="callBack2"
			:comment_num="comment_num" 
			:commend_num="commend_num" 
			:is_commend="initDetailPageInfo.is_commend" 
			:is_collect="initDetailPageInfo.is_collect">
			</discussInput>
			
		</div>

		<preLoading v-if="isPreLoading && !typeinfo && !videoListData.length"></preLoading>
	
	</div>
</template>

<script>

// 阿里云视频的播放器
import aliyunPlayer from "@/components/aliyunPlayer"


// 下载app组件
import downLoadApp from "@/components/down"
import downToLinkedMe from "@/components/downToLinkedMe"


// 文章评论列表组件
import allCommentList from "@/components/allCommentList"

// 评论输入组件
import discussInput from "@/components/discuss"

// 居中弹出下载appdownload组件
import popupDownLoad from "@/components/popupDownLoad"

// 初始化loadding的组件
import preLoading from "@/components/preLoading"

import axios from 'axios'
import { Toast } from 'mint-ui';
import commonJs from '@/util/common.js'
// import { MessageBox } from 'mint-ui'

export default {
	name: "videoSpecial",
	data() {
		return {
			hasShareContentData:false,

			isPreLoading: true,

			linkedMe:null,

			// 文章id
			article_id:"",
			// 关注按钮的显示逻辑
			is_follow: "no",
			callBackObj:null,
			// 初始化详情页面数据
			initDetailPageInfo: null,

			// 视频列表数据
			videoListData: [],

			// 头部关注的相关信息
			typeinfo:null,

			commentInfo:{
					type: null, //文章类型
					data_id:null,//文章id
					parent_comment_id: null,//父级评论id,(可无)
					reply_comment_id: null,//二级评论id,(可无)
					arguedName:null,//被回复人的评论(可无)
					sess_token: null
			},

			// 评论列表的总数
			comment_num:0,

			// 点赞的数量
			commend_num:0,

			// 发布box推送给评论列表的数据格式
			newCommentData:null,

			// 控制pop弹出下载框的问题
			isPopupDownLoad: false,

			// test data
			// msg: 'page web - Welcome to Your Vue.js App',
			// columns: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
			articleIdData: null
		}
	},
	components: {
		aliyunPlayer,
		// downLoadApp,
		downToLinkedMe,
		allCommentList,
		discussInput,
		popupDownLoad,
		preLoading
	},
	watch: {
		$route() {
			// $(window).off('scroll', this.onScrollTabBox)
			console.log("wtach-route-log-videoSpecialBox")
		},
		isPreLoading(){
			console.log("isPreLoading-watch")
			document.title = "文章出错了"
		}
	},
	beforeDestroy() {
		console.log("beforeDestroy-log-videoSpecialBox")
		document.title = commonJs.config.webTitle;
		window.hxsapp_visible_share_btn_mar &&  delete window.hxsapp_visible_share_btn_mar;
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
		// console.log("mounted--log")

		//文章类型/文章的id/父评论id/sess_token
		this.commentInfo.type = 0;
		// this.commentInfo.data_id = this.$route.params.article_id; 
		this.commentInfo.sess_token = commonJs.getUrlParam('sess_token');

		// $(".scrollTabBoxSize").show();
		// $(".scrollTabBox").show();
		
		// 拿小分类的信息
		this.getListByTypeId()

		var __type_id = this.$route.params.type_id
		commonJs.buriedPoint({
			access_occurred_type: 110701,//发生访问的【页面】类型
			access_occurred_type_id: __type_id,//发生访问的【页面】类型ID
			previous_event_type_obj: '',//【事件】对象类型
			previous_event_type_obj_id: '',//【事件】对象类型ID
			previous_content_sort: ''//【事件】事件参数
		});

		// 非app场景下面才有用 有有版本限制 是3.0.1开始的
    if( !this.isApp ){
      // http://wiki.sys.hxsapp.net/pages/viewpage.action?pageId=1998876
      var __url = commonJs.config.prefixUrl+ "videoSpecial/"+ __type_id;
			
			let __articleId = commonJs.getUrlParam('article_id');

			if( __articleId ){
				__url = commonJs.config.prefixUrl+ "videoSpecial/"+ __type_id+"?article_id=" + __articleId
			}
			
      this.linkedMe = {
        params:{
          // key 是写死的   value是协议，具体见这里－http://wiki.sys.hxsapp.net/pages/viewpage.action?pageId=1998876
          "key": "hxsapp://web?url="+ __url
        }
      }
    }

	},
	methods: {
		// 设置删除文章的同期高度
		set_no_article_box_css(){
			this.$nextTick(()=>{
				$(".no_article_box").css({
					"height": $(window).height()+"px"
				})
			})
		},
		callBack2(obj){
			//接受发表评论框传过json，推送到评论 子评论数组 第一位
			this.callBackObj = obj;
		},
		// 获取用户点赞数量的方法
		getCommendNums(initType = 0) {

			// 接口请求数据
			let json = {
				type: initType,
				data_id: this.article_id,
				sess_token: commonJs.getUrlParam("sess_token")
			};
			// debugger
			axios.get('https://api.hxsapp.com/community/userCommend/getCommendNums', { params: json }).then((res) => {
				if (res.data.code == 200) {
					// debugger
					this.commend_num = res.data.data[0];
				}

			})
		},


		// 获取用户评论列表的方法
		getCommentData(initType = 0, lastId = 0) {

			// 接口请求数据
			let json = {
				type: initType,
				// data_id: this.$route.params.article_id,
				data_id: this.article_id,
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

		addCommentData(data) {
			// 加一条记录
			this.comment_num = parseInt(this.comment_num) + 1;
			data.item.commentChildren={};
			data.item.commentChildren.data = [];
			this.newCommentData = data;
			// debugger

		},
		updateCommentTotalNum(data) {
			// console.log("updateCommentTotalNum-call:" + data)
			this.comment_num = data;
		},
		//H5通知客户端显示分享数据
		setShareContent() {
			var shareTitle = encodeURIComponent(this.initDetailPageInfo.title);

			var __search = "" ;
			var __articleId = commonJs.getUrlParam('article_id');

			if(__articleId){
				__articleId = commonJs.getUrlParam('article_id')
				__search = "?displayThumbBtn=1&article_id="+ __articleId
			}else{
				__search = "?displayThumbBtn=1"
			}

			var shareLink = commonJs.config.prefixUrl + 'videoSpecial/' + this.$route.params.type_id + __search;
			// var __url = commonJs.config.prefixUrl + "videoSpecial/" + __type_id + '?sess_token=' + sessToken + '&article_id=' + this.articleIdData.list[index].id;

			var shareImages = this.initDetailPageInfo.images[0];
			var shareDescr = encodeURIComponent(this.initDetailPageInfo.descr);//分享描述
			// article_id 从数据里面拿出来
			var shareArticleId = this.article_id ;

			var shareType = "videoSpecial";
			// var shareType = 0;
			var shareMediaLink = this.initDetailPageInfo.media_data ? this.initDetailPageInfo.media_data : "";

			var shareActWindowTitle = "";
			var shareActWindowDescr = ""

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

			this.initDetailPageInfo.shareContent = shareData
			this.hasShareContentData = true;

			// return {
			// 	shareTitle,
			// 	shareLink,
			// 	shareImages,
			// 	shareDescr,
			// 	shareArticleId,
			// 	shareType,
			// 	shareMediaLink,
			// 	shareActWindowTitle,
			// 	shareActWindowDescr
			// }

			if (this.initDetailPageInfo.article_type_id) {
				this.initShare(shareData)
			}

		},
		
		// app右上角分享
		initShare(shareData) {

			console.log("initShare-initShare-function")
			if (this.isApp) {

				var __article_id = this.article_id;
				
				var json = {
					access_occurred_type: 210563,//发生访问的【页面】类型
					access_occurred_type_id: "",//发生访问的【页面】类型ID
					previous_event_type_obj: __article_id,//【事件】对象类型
					previous_event_type_obj_id: '',//【事件】对象类型ID
					previous_content_sort: ''//【事件】事件参数
				};
				// debugger
				// console.log(this.setShareContent())
				// 点击app上右上角分享按钮，app回调 h5的全局函数
				//  app 开始 3.0.0 支持
				
				window.hxsapp_visible_share_btn_mar = function(){
					commonJs.buriedPoint(json)
				}
				
				commonJs.h5CallAppAction.hxsapp_visible_share_btn( shareData )
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

		goVideoLinkPage(data,index) {

			var jsonMar = {
				access_occurred_type: 210573,//发生访问的【页面】类型
				access_occurred_type_id: "",//发生访问的【页面】类型ID
				previous_event_type_obj: this.article_id,//【事件】对象类型
				previous_event_type_obj_id: '',//【事件】对象类型ID
				previous_content_sort: ''//【事件】事件参数
			};
			commonJs.buriedPoint(jsonMar)

			console.log(data)
			var __type_id = this.$route.params.type_id;

			// setTimeout(() => {
			// 	$(".mint-msgbox-confirm").css({
			// 		color: "#FF68B0"
			// 	})
			// }, 10)
			// MessageBox({
			// 	title: '提示',
			// 	message: '确定执行此操作,跳转到新的视频名称：<br />' + data.title + "?",
			// 	showCancelButton: true,
			// 	closeOnClickModal: false
			// }).then((action) => {
			// 	console.log("actio-value:" + action);
			// 	if (action == "confirm") {
			// 		console.log(action + "-case")
			
					//改动10/23
					
					var sessToken = "";
					var __url = "";
					if( this.isApp ){
						sessToken = commonJs.getUrlParam('sess_token');
					 	__url = commonJs.config.prefixUrl + "videoSpecial/" + __type_id + '?sess_token=' + sessToken + '&article_id=' + this.articleIdData.list[index].id;
					}else{
					 	__url = commonJs.config.prefixUrl + "videoSpecial/" + __type_id + '?displayThumbBtn=1&article_id=' + this.articleIdData.list[index].id;
					}
					// console.log(__url);
					// console.log("__url:" + __url);
					
					setTimeout(() => {
						window.location.replace(__url );
					}, 100)
			// 	} else if (action == "cancel") {
			// 		console.log(action + "-case")

			// 	}
			// });
		},

		// 获取视选集的数据
		getListByTypeId() {

			// $('.analog-audio-box-bg').css({
			// 	height: $(window).width() * 0.5625
			// });

			// console.log("initAudio-fun-do -code")

			// 接口请求数据
			let json = {
				type_id: this.$route.params.type_id,
				last_id: 0,
				show_type: 5
			};
			axios.get("https://api.hxsapp.com/content/Article/getListByTypeId",
				{ params: json }
			).then((res) => {
				console.log(res)
				// debugger

				if (res.data.code == 200) {
				  // Toast(res.data.msg)
					// debugger
					if( res.data.data && res.data.data.list ){
						this.videoListData = res.data.data.list;
						this.typeinfo = res.data.data.typeinfo;

						// 设置一个article_id 数据  给页面的组件或者接口去使用


						//改动10/23
						let articleId = commonJs.getUrlParam('article_id');

						if(articleId){
							this.article_id = articleId;
						}else{
							this.article_id = res.data.data.list[0].id;
							this.commentInfo.data_id = this.article_id; 
						}

						this.getDetailByAid( )
						this.articleIdData = res.data.data;
					}
				} 

			}).catch((Error) => {
				console.log(Error)
			})

		},
		// 关注按钮
		followBtn() {
			// console.log("followBtn-followBtn");

			var jsonMar = {
				access_occurred_type: 210572,//发生访问的【页面】类型
				access_occurred_type_id: "",//发生访问的【页面】类型ID
				previous_event_type_obj: this.article_id,//【事件】对象类型
				previous_event_type_obj_id: '',//【事件】对象类型ID
				previous_content_sort: ''//【事件】事件参数
			};
			commonJs.buriedPoint(jsonMar)

			if (this.isApp) {
				
				// debugger
				// console.log(this.setShareContent())
				// 点击app上右上角分享按钮，app回调 h5的全局函数
				//  app 开始 3.0.0 支持
				

				if (this.isLogin) {
					console.log("若登录了，就去调用极光的接口-https://api.hxsapp.com/community/userCommend/doCommend")

					// 接口请求数据
					let json = {
						sess_token: commonJs.getUrlParam("sess_token"),
						followed_user_id: this.initDetailPageInfo.tinfo.uid
					};
					var __url;
					if (this.is_follow == "yes") {
						__url = "https://api.hxsapp.com/community/userRelate/cancelFollow"
					}else if (this.is_follow == "no") {
						// __url = "https://api.hxsapp.com/community/userRelate/cancelFollow"
						__url = "https://api.hxsapp.com/community/userRelate/follow"
					}

					axios.get(__url,
						{ params: json }
					).then((res) => {
						if (res.data.code == 200) {
							Toast(res.data.msg)

							
							if (this.is_follow == "yes") {
								this.is_follow = "no"
							}else if (this.is_follow == "no") {
								this.is_follow = "yes"
							}
							
						} else {
							Toast(res.data.msg)
						}
					}).catch((Error) => {
						console.log(Error)
					})

				} else {
					console.log("没有登录了,这里调起app的登录协议");
					commonJs.h5CallAppAction.hxsapp_showloginpage()
				}
			} else {
				this.popAppDownBox()
			}

		},
		showPopupDownLoadCall(){
			this.isPopupDownLoad = true;
		},
		hidePopupDownLoadCall() {
			this.isPopupDownLoad = false;
		},
		popAppDownBox() {
			console.log("弹出下载的提示框box设计")
			// 显示和异常弹出提示下载层
			this.isPopupDownLoad = true;
		},
		// 获取文章内容详情的数据
		// http://wiki.sys.hxsapp.net/pages/viewpage.action?pageId=7343652
		getDetailByAid() {
			// 接口请求数据
			// debugger

			// 拿点赞的数量
			this.getCommendNums()

			// 拿列表评论的数据
			this.getCommentData()
			let json = {
				article_id: this.article_id,
				sess_token: commonJs.getUrlParam("sess_token")
			};
			axios.get("https://api.hxsapp.com/content/Article/getDetailByAid",
				{ params: json }
			).then((res) => {
				console.log(res)

				if (res.data.code == 200 && res.data.data) {

					
					this.initDetailPageInfo = res.data.data;
					
					if ( !this.initDetailPageInfo.is_free ) {
						var __articleId = this.article_id ;

						commonJs.h5CallAppAction.hxsapp_buy_article_detail( __articleId );
						console.log("这片文章需要购买才可以才可以查看！这里等待接入app协议的页面或者h5的购买页面")
						return;
					}


					this.is_follow = this.initDetailPageInfo.is_follow;

					// 分享数据初始化
					this.setShareContent()

				} else {

					console.log("加载数据异常，请稍后再试！,code !== 200 ")
					this.isPreLoading = false;
				}

				this.set_no_article_box_css()
				
			})
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
			console.log("父级 renderVideoCall-test：");
			console.log(data);

			this.$nextTick(() => {
				this.loaddPage(data)
			})

		}

	}

}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
#videoSpecialBox {
	width: 100%;
	
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


	.videoSpecial {
		width: 100%;
		position: relative;
		box-sizing: border-box;
		img {
			width: 100%;
		}


		/*头部编辑按钮－大区域*/
		//头像 
		.infoDetall_t_header {
			margin-top: 10px;
			height: 50px;
			padding: 0 15px 10px;
			border-bottom: 1px solid rgba(129, 141, 207, .16);
			// overflow: hidden;
			position: relative;

			.img_box {
				position: absolute;
				top:0;
				left:15px;
				width: 50px;
				height: 50px;
				background: url("./../assets/img/zx_icon.png") left top no-repeat;
				background-size: 100%;
				// float: left;
			}

			img {
				width: 50px;
				height: 50px;
				border-radius: 50%;
			} // 编辑显示区域
			.info {
				padding-left: 60px;
				padding-top: 3px;
				width:100%;
				box-sizing: border-box;
				word-break:break-all; 
				// float: left;
			}

			.info span {
				display: block;
				height: 17px;
				line-height: 17px;
				font-size: 16px;
				color: #333;
				padding: 5px 0 0 0;
				width: 210px;
				overflow: hidden;
			}

			i {
				width: 210px;
				margin-top:5px;
				display: block;
				height: 14px;
				overflow: hidden;
				text-overflow:ellipsis;
				white-space: nowrap;
				word-break:break-all; 
				line-height: 14px;
				font-size: 13px;
				color: #999;
			} //关注按钮区域
			.reading_quantity {
				position: absolute;
				top: 13px;
				right: 15px;
				width: 60px;
				text-align: center;
				border: 1px solid #818DCF;
				height: 25px;
				line-height: 23px;
				box-sizing: border-box;
				border-radius: 15px;
				em {
					color: #818DCF;
					font-size: 13px;
					display: block;
					width: 100%;
					text-align: center;
					.jia{
						display: inline-block;
						margin-right: 3px;
						margin-left: -6px;
						width: 10px;
						height: 10px;
						background: url("./../assets/img/jia_btn_120x50@2x.png") no-repeat;
						background-size: 100%;		
					}
				}
				&.on {
					background-image: linear-gradient(-270deg, #FF6E8D 0%, #FF68B0 97%);
					border: 1px solid #FF68B0;
					em {
					color: #fff;
					}
				}
			}
		}

		/*描述*/
		.articleDesr {
			width: 100%;
			padding: 15px;
			box-sizing: border-box;
			line-height: 20px;
			color: #333;
			font-size: 14px;
		}

		/*视频选集*/
		.videolist_recommend {
			/*标题*/
			.title {
				height: 50px;
				line-height: 50px;
				text-align: center;
				font-size: 18px;
			}

			.recommend_article {
				width: 100%;
				border-top: 1px solid rgba(153, 153, 153, .1);

				.li {
					position: relative;
					height: 65px;
					padding-bottom: 3px;
					img {
						width: 115px;
						height: 65px;
						position: absolute;
						top: 0;
						left: 0;
						display: block;
					}
				}

				.article_info {
					width: 100%;
					padding: 15px 0 15px 125px;
					box-sizing: border-box;
					height: 65px;
					border-bottom: 1px solid rgba(153, 153, 153, .1); 
					position: relative;
					&:after{
						position: absolute;
						content:"";
						bottom: -1px;
						left:115px;
						width: 10px;
						height: 1px;
						background: #fff;
					}
				}

				// .article_info .article_info_li {
					// box-sizing: border-box;
				// }

				.article_info .article_info_li .tit {
					height: 20px;
					font-size: 14px;
					padding-right: 10px;
					color: #666;
					text-overflow: ellipsis;
					line-height: 20px;
					white-space: nowrap;
					overflow: hidden;
				}
				.article_info .article_info_li .info {
					height: 18px;
					overflow: hidden;
				}

				.article_info .article_info_li .read {
					margin-top: 5px
				}

				.article_info .article_info_li .read span {
					width: 15px;
					height: 17px;
					background: url("./../assets/img/yuedu@2x.png") left top no-repeat;
					background-size: 100%;
					float: left;
					// margin-top: 2px;
				}

				.article_info .article_info_li .good span {
					width: 14px;
					height: 15px;
					background: url("./../assets/img/pinlun.png") -3px -78px no-repeat;
					background-size: 50px;
					float: left;
					// margin-top: 2px;
				}

				.article_info .article_info_li .info div {
					height: 18px;
					margin-right: 18px;
					float: left;
				}

				.article_info .article_info_li .info div span {
					margin-right: 4px;
				}

				.article_info .article_info_li .info div em {
					color: #999;
					font-size: 12px;
					float: left;
					height: 14px;
					line-height: 14px;
				}

				.article_info .article_info_li .good em {
					margin-top: 3px;
				}
			}
		}

		/*10px 高度*/
		.change-background {
			width: 100%;
			height: 7px;
			background: #F5F5F8;
		}
	}
}

</style>
