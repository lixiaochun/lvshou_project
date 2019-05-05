<template>
	<div class="sportsLessonDetail" v-if="pageInfoData && pageInfoData.course && pageInfoData.course.is_work == 1 ">
		<aliyunPlayer 
			pageSoure="sportsLessonDetail" 
			:sourceUrl="pageInfoData.course.meida_data" 
			:coverUrl="pageInfoData.course.images" >
		</aliyunPlayer>

		<!-- 课程详情的头部区域 -->
		<div class="lesson_introduce_box">
			<div>
				<p class="lesson_name">
					{{pageInfoData.course.title}}
				</p>

				<p class="lesson_info">
					<span class="lesson_time">
						{{pageInfoData.course.play_time}} / {{pageInfoData.course.calories}} 热量
					</span>
					<span class="lesson_people">
						{{pageInfoData.course.views_num}} 人参加
					</span>
				</p>

				<p class="lesson_tomore" @click="goImgLessonPage()">
					课程图解
				</p>

			</div>

			<div class="lesson_introduce_suggest">
				<div>
					<div class="lesson_teacher">
						<span class="lesson_descr">
							{{pageInfoData.course.descr}}
						</span>
					</div>
					<div class="lesson_introduce_suggest_tab">
						<div class="tabdiv" :key="index" v-for="(data,index) in pageInfoData.course.labels">
							{{data}}
						</div>
						<span class="clear"></span>
					</div>
				</div>
			</div>
		</div>
		<div class="change-background"></div>

			<div v-if="0 && gipageInfoData">
				{{pageInfoData.shareContent}}
			</div>
			
		<!-- 全部评论区域 -->
		<div class="comment_box p_l_15-test">

			<!-- 全部评论区域 -->
			<oldAllCommentList 
			soucrePage="sportsLessonDetail" 
			:initType="3" 
			:initDataId="this.$route.params.course_id" 
			:newCommentData="newCommentData" 
			:scheme_id="this.$route.params.scheme_id" 
			:plan_id="this.$route.params.plan_id" 
			:course_id="this.$route.params.course_id" 
			:comment_num="comment_num" 
			:commend_num="commend_num" 
			:is_commend="pageInfoData.course.is_commend" 
			:is_collect="pageInfoData.course.is_collect" 
			@updateCommentTotalNum="updateCommentTotalNum">
			</oldAllCommentList>
		</div>

		<div class="change-background" style="height:40px;" v-if="0"></div>

		<!-- 底部悬浮区域评论区域 -->
		<!-- 评论区域 或者 下载区域app按钮区域 -->

		<!--  新的弹出层接入linkedme区域 -->
    <popupDownHxsLinkedMe v-if="isPopupDownLoad && !isApp && linkedMe" :linkedMe="linkedMe">
    </popupDownHxsLinkedMe>

		<!--  非app环境下的app下载区域 -->
		<downToLinkedMe v-if=" !isApp && linkedMe" :linkedMe='linkedMe'></downToLinkedMe>

		<!-- 底部悬浮区域评论区域 -->
		<oldDiscussInput 
			soucrePage="sportsLessonDetail" 
			v-if="isApp && pageInfoData && hasShareContentData" 
			:commentInfo="commentInfo" 
			@addCommentData="addCommentData" 
			:initType="3" 
			:shareContent="pageInfoData.shareContent" 
			:scheme_id="this.$route.params.scheme_id" 
			:plan_id="this.$route.params.plan_id" 
			:course_id="this.$route.params.course_id" 
			:comment_num="comment_num" 
			:commend_num="commend_num" 
			:is_commend="pageInfoData.course.is_commend" 
			:is_collect="pageInfoData.course.is_collect">
		</oldDiscussInput>
		
		<preLoading v-if="!pageInfoData"></preLoading>
	</div>
</template>

<script>
import aliyunPlayer from "@/components/aliyunPlayer"

// 文章评论列表组件
import oldAllCommentList from "@/components/oldAllCommentList"

// 下载app组件
import downLoadApp from "@/components/down"
import downToLinkedMe from "@/components/downToLinkedMe"

// 评论输入组件
import oldDiscussInput from "@/components/oldDiscuss"

// 居中弹出下载appdownload组件
import popupDownHxsLinkedMe from "@/components/popupDownHxsLinkedMe"

// 初始化loadding的组件
import preLoading from "@/components/preLoading"

import axios from 'axios'
import commonJs from '@/util/common.js'
import { Toast } from 'mint-ui';


window.COURSE_ID ="";

// 接口详情数据
// https://app.hxsapp.com/slim/Fitness/getDetailByCourseId?callback=jQuery214028416206503910213_1505698232237&model_idfa=&scheme_id=1&plan_id=9&course_id=24&share_url=https%3A%2F%2Fapp.hxsapp.com%2Fhtml%2Flesson_info.html%3Fcourse_id%3D24%26scheme_id%3D1%26plan_id%3D9&sess_token=&_=1505698232238
export default {
	name: "sportsLessonDetail",
	data() {
		return {
			msg: 'page web - Welcome to Your Vue.js App',
			// 是否you分享数据
			hasShareContentData:false,
			
			linkedMe:null,
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

			// 获取用户的点赞总数
			commend_num: 0,

			// 发布box推送给评论列表的数据格式
			newCommentData: null,

			isPopupDownLoad: false,

			pageInfoData: null
		}
	},
	created(){
		// course_id
		window.COURSE_ID = this.$route.params.course_id
	},
	beforeDestroy() {
		console.log("beforeDestroy-log")
		delete window.COURSE_ID;
		window.hxsapp_visible_share_btn_mar &&  delete window.hxsapp_visible_share_btn_mar;

	},
	mounted() {

		//文章类型/文章的id/父评论id/sess_token
		this.commentInfo.type = 3;
		this.commentInfo.data_id = this.$route.params.course_id;
		this.commentInfo.sess_token = commonJs.getUrlParam('sess_token');

		// 拿列表的数据
		this.getCommentData()

		// 获取点赞的数量
		this.getCommendNums();

		// 获取页面的数据
		this.getDetailByCourseId()

		var __course_id = this.$route.params.course_id
		commonJs.buriedPoint({
			access_occurred_type: 110204,//发生访问的【页面】类型
			access_occurred_type_id: __course_id,//发生访问的【页面】类型ID
			previous_event_type_obj: '',//【事件】对象类型
			previous_event_type_obj_id: '',//【事件】对象类型ID
			previous_content_sort: ''//【事件】事件参数
		});

		// 非app场景下面才有用 有有版本限制 是3.0.1开始的
    if( !this.isApp ){
      // http://wiki.sys.hxsapp.net/pages/viewpage.action?pageId=1998876

      var __url = commonJs.config.prefixUrl+ "sportsLessonDetail/"+ this.$route.params.scheme_id + "/" + this.$route.params.plan_id + "/" + this.$route.params.course_id;
      this.linkedMe = {
        params:{
          // key 是写死的   value是协议，具体见这里－http://wiki.sys.hxsapp.net/pages/viewpage.action?pageId=1998876
          "key": "hxsapp://web?url="+ __url
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
	components: {
		aliyunPlayer,
		oldAllCommentList,
		// downLoadApp,
		downToLinkedMe,
		popupDownHxsLinkedMe,
		oldDiscussInput,
		preLoading
	},
	methods: {
		// 获取用户点赞数量的方法
		getCommendNums(initType = 3) {

			// 接口请求数据
			let json = {
				type: initType,
				data_id: this.$route.params.course_id
				// sess_token: commonJs.getUrlParam("sess_token")
			};
			// debugger
			axios.get('https://api.hxsapp.com/community/userCommend/getCommendNums', { params: json }).then((res) => {
				if (res.data.code == 200) {
					this.commend_num = res.data.data[0];
				}

			})
		},


		// 获取用户评论列表的方法
		getCommentData(initType = 3, lastId = 0) {

			// 接口请求数据
			let json = {
				type: initType,
				// data_id: this.$route.params.article_id,
				data_id: this.$route.params.course_id,
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

		setSportsLessonDetailHeight() {
			var sportsLessonDetailHeight = $(".sportsLessonDetail").outerHeight();

			var windowHeight = $(window).height();

			if (sportsLessonDetailHeight <= windowHeight) {
				$(".sportsLessonDetail").css({
					height: windowHeight + "px"
				})
			}
		},

		addCommentData(data) {
			// 加一条记录
			this.comment_num = parseInt(this.comment_num) + 1;
			this.newCommentData = data;
			// debugger

		},
		updateCommentTotalNum(data) {
			console.log("updateCommentTotalNum-call:" + data)
			this.comment_num = data;
		},

		//H5通知客户端显示分享数据
		setShareContent() {
			// path: '/sportsLessonDetail/:scheme_id/:plan_id/:course_id',
			console.log( this.pageInfoData )

			this.pageInfoData.shareContent = null;
			var __this = this
			// 邀请码
			// var __inviteCode = commonJs.getInviteCode();
			commonJs.getInviteCode( ( res )=>{
				
				var shareTitle = encodeURIComponent(this.pageInfoData.course.title);

				var __search = "?displayThumbBtn=1&inviteCode=" + res;
				var shareLink = commonJs.config.prefixUrl + 'sportsLessonDetail/' + this.$route.params.scheme_id + '/' + this.$route.params.plan_id + '/' + this.$route.params.course_id + __search;
				
				var shareImages = this.pageInfoData.course.images;
				var shareDescr = encodeURIComponent(this.pageInfoData.course.descr);//分享描述
				// var shareArticleId = this.pageInfoData.course.id;
				var shareArticleId = '';
				var shareType = "course";
				// var shareType = 0;
				var shareMediaLink = this.pageInfoData.course.media_data ? this.pageInfoData.course.media_data : "";

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
				}
				
				this.pageInfoData.shareContent = shareData
				this.hasShareContentData = true;

				this.initShare(shareData)
			})	
		},

		hidePopupDownLoadCall() {
			this.isPopupDownLoad = false;
		},

		showPopupDownLoadCall() {
			this.isPopupDownLoad = true;
		},
		popAppDownBox() {
			// alert("弹出下载的提示框box设计")
			this.isPopupDownLoad = true;
		},

		// 去图解课程的页面
		goImgLessonPage() {
			var scheme_id = this.$route.params.scheme_id;
			var plan_id = this.$route.params.plan_id;
			var course_id = this.$route.params.course_id;
			var __search = window.location.search;
			console.log("goImgLessonPage-goImgLessonPage");
			console.log('/sportsLessonGraphic/' + scheme_id + '/' + plan_id + '/' + course_id)
			
			// 埋点
			var __course_id = this.$route.params.course_id;
			var jsonMar = {
				access_occurred_type: 210538,//发生访问的【页面】类型
				access_occurred_type_id: __course_id,//发生访问的【页面】类型ID
				previous_event_type_obj: '',//【事件】对象类型
				previous_event_type_obj_id: '',//【事件】对象类型ID
				previous_content_sort: ''//【事件】事件参数
			};
			
			commonJs.buriedPoint(jsonMar)
				
			
			if (commonJs.isApp()) {
				if (commonJs.isLogin()) {
					// alert("若登录了，就去课程图解的页面去")

					// this.$router.replace({
					// 	path: '/sportsLessonGraphic/' + scheme_id + '/' + plan_id + '/' + course_id + __search
					// })

					var __url = commonJs.config.prefixUrl + "sportsLessonGraphic/" + scheme_id + '/' + plan_id + '/' + course_id + __search
          console.log("__url:"+__url)
          commonJs.h5CallAppAction.hxsapp_new_webview( encodeURIComponent(__url) )

				} else {
					console.log("没有登录了,这里调起app的登录协议");
					commonJs.h5CallAppAction.hxsapp_showloginpage()
				}
			} else {
				console.log("弹出下载的提示框box设计")
				this.popAppDownBox();
			}
		},
		initShare(shareData) {
			if (this.isApp) {
				// debugger
				var __course_id = this.$route.params.course_id;
				var json = {
					access_occurred_type: 210530,//发生访问的【页面】类型
					access_occurred_type_id: __course_id,//发生访问的【页面】类型ID
					previous_event_type_obj: '',//【事件】对象类型
					previous_event_type_obj_id: '',//【事件】对象类型ID
					previous_content_sort: ''//【事件】事件参数
				};
				
				window.hxsapp_visible_share_btn_mar = function(){
					commonJs.buriedPoint(json)
				}
				
				console.log( shareData )
				console.log( this.pageInfoData.shareContent )
				
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
		// 获取详情的页面
		getDetailByCourseId() {
			// 接口请求数据
			let json = {
				sess_token: commonJs.getUrlParam("sess_token"),
				scheme_id: this.$route.params.scheme_id,
				plan_id: this.$route.params.plan_id,
				course_id: this.$route.params.course_id
			};

			console.log(json)
			axios.get('https://api.hxsapp.com/content/Fitness/getDetailByCourseId',
				{ params: json }
			).then((res) => {
				// debugger
				if (res.data.code == 200) {
					// Toast(res.data.msg + res.data.incr_score)
					
					if( !res.data.data){
						Toast(res.data.msg)	
						return
					}
					this.pageInfoData = res.data.data;

					// 分享数据初始化
					this.setShareContent()

					this.$nextTick(() => {
						this.setSportsLessonDetailHeight()
					})


				} else {
					Toast(res.data.msg)
				}
			}).catch((Error) => {
				console.log(Error)
			})
		},
		renderVideoCall(data) {
			console.log("renderVideoCall-test：");
			console.log(data);
		}

	}
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
.sportsLessonDetail {
	width: 100%;
	box-sizing: border-box;
	/*10px 高度*/
	.change-background {
		width: 100%;
		height: 7px;
		background: #f5f5f8;
	}

	.clear {
		zoom: 1;
		clear: both;
	}
	.clear:after {
		content: '';
		display: block;
		clear: both;
		visibility: hidden;
		height: 0;
	}

	.p_l_15 {
		padding: 15px;
	}
	img {
		width: 100%;
	}
	/*课程详情的头部区域－开始 */
	.lesson_introduce_box {
		width: 100%;
		height: auto;
		background-color: #FFF;
		position: relative;
		padding: 15px 15px 0 15px;
		box-sizing: border-box;

		.lesson_name {
			font-size: 15px;
			color: #333;
			display: block;
			width: calc(~"100% - 80px");
			padding-bottom: 10px;
		}
		.lesson_info {
			width: 100%;
			height: 20px;
			line-height: 20px;
			border-bottom: 1px solid #F5F5F8;
			overflow: hidden;
			text-align: left;
			color: #999999;
			font-size: 12px;
			padding-bottom: 10px;
			.lesson_time {
				display: block;
				float: left;
			}
			.lesson_people {
				float: right;
				display: block;
				text-align: right;
				color: #999999;
			}
		}

		.lesson_tomore {
			position: absolute;
			width: 75px;
			height: 25px;
			line-height: 25px;
			text-align: center;
			top: 10px;
			right: 10px;
			font-size: 12px;
			color: #fff;
			border: 1px solid #FF68B0;
			background-image: linear-gradient(-270deg, #FF6E8D 0%, #FF68B0 97%);
			border-radius: 30px;
		}

		.lesson_introduce_suggest {
			width: 100%;
			margin-top: 10px;

			.lesson_teacher {
				font-size: 14px;
				color: #595959;
			}
			.lesson_introduce_suggest_tab {
				margin-top: 10px;
				margin-bottom: 15px;
			}
			.lesson_introduce_suggest_tab .tabdiv {
				margin: 0 10px 10px 0;
				box-sizing: border-box;
				height: 24px;
				line-height: 16px;
				padding: 4px 8px;
				border-radius: 4px;
				font-size: 12px;
				background-color: rgba(129, 141, 207, .8);
				color: #FFFFFF;
				float: left;
			}
		}
	}
	/*课程详情的头部区域－结束 */
	/*底部悬浮区域评论区域*/
	.fix_input_box {
		position: fixed;
		bottom: 0;
		left: 0;
		display: block;
		width: 100%;
		height: 40px;
		line-height: 40px;
		background: red;
		color: #fff;
	}
}
</style>
