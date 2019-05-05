<template>
	<div class="newSportsLessonDetail" v-if="pageInfoData ">
		<aliyunPlayer 
			pageSoure="newSportsLessonDetail" 
			:pageSoureParent="pageSoureParent" 
			:sourceUrl="pageInfoData.filename" 
			:coverUrl="pageInfoData.images" >
		</aliyunPlayer>

		<!-- 课程详情的头部区域 -->
		<div class="lesson_introduce_box">

			<p class="lesson_name">
				{{pageInfoData.title}}
			</p>
			
			<div class="lesson_introduce_suggest">
				<div>
					<div class="lesson_teacher">
						<span class="lesson_descr">
							{{pageInfoData.descr}}
						</span>
					</div>
					<div class="lesson_introduce_suggest_tab">
						<div class="tabdiv" :key="index" v-for="(data,index) in pageInfoData.labels" v-if="  pageInfoData && pageInfoData.labels && pageInfoData.labels.length">
							{{data}}
						</div>
						<span class="clear"></span>
					</div>
				</div>
			</div>
		</div>
		<div class="change-background"></div>

		<div class="trainingInfo" v-if="trainViewUserData">
			<div class="left">
					<span class="now">
						<i>
							{{trainViewUserData.start_num}}人
						</i> 在训练
					</span>
					<span class="all">
						{{trainViewUserData.views_num}} 人完成训练
					</span>
			</div>
			<ul class="right">
					
					<!-- <li v-if=" trainViewUserData && trainViewUserData.list && trainViewUserData.list.length " v-for="(data,index) in trainViewUserData.list" :key="index" :title="index">
						<img v-if="data" :src="data" :title="'头像_'+index" />
					</li> -->
					<li v-if=" trainViewUserData && trainViewUserData.list || 1" v-for="(data,index) in 5" :key="index" :title="index">
						<img src="https://m.360buyimg.com/babel/jfs/t16852/355/1477193400/100639/5a30dee0/5acc7940N3a626479.jpg" />
					</li>

			</ul>
		</div>

		<div class="change-background"></div>

		<div class="trainingInfoNum">
			<div class="min_box">
				<i></i>
				<span class="num">
					{{play_time}}
				</span>
				<span class="text">min</span>
			</div>
			<div class="kcal_box">
				<i></i>
				<span class="num">
					{{pageInfoData.calories}}
				</span>
				<span class="text">kcal</span>
			</div>
		</div>

		<div class="change-background"></div>

		<newSportsLessonGraphic :dataArr="pageInfoData.action_list"></newSportsLessonGraphic>


		<div class="change-background"></div>

		<div v-if="0 && pageInfoData">
			{{pageInfoData.shareContent}}
		</div>
		<!-- 全部评论区域 -->
		<div class="comment_box p_l_15-test">

		<!-- 全部评论区域 
			:scheme_id="this.$route.params.scheme_id" 
			:plan_id="this.$route.params.plan_id" 
		-->
		<allCommentList 
			soucrePage="newSportsLessonDetail" 
			:initType="3" 
			:initDataId="this.$route.params.sport_id" 
			:newCommentData="newCommentData"
			:commentInfo="commentInfo" 
			:callBackObj="callBackObj"
			:sport_id="this.$route.params.sport_id" 
			:comment_num="comment_num" 
			:commend_num="commend_num" 
			:views_num="pageInfoData.views_num" 
			:is_commend="pageInfoData.is_commend" 
			:is_collect="pageInfoData.is_collect" 
			@updateCommentTotalNum="updateCommentTotalNum">
		</allCommentList>
		</div>

		<div class="change-background" style="height:40px;" v-if="0"></div>

		<!-- 底部悬浮区域评论区域 -->
		<!-- 评论区域 或者 下载区域app按钮区域 -->

		<!--  新的弹出层接入linkedme区域 -->
    <popupDownHxsLinkedMe v-if="isPopupDownLoad && !isApp && linkedMe" :linkedMe="linkedMe">
    </popupDownHxsLinkedMe>

		<!--  非app环境下的app下载区域 -->
		<downToLinkedMe v-if=" !isApp && linkedMe" :linkedMe='linkedMe'></downToLinkedMe>

		<!-- 底部悬浮区域评论区域 
		
			:scheme_id="this.$route.params.scheme_id" 
			:plan_id="this.$route.params.plan_id" 
		-->
		<discussInput 
			soucrePage="newSportsLessonDetail" 
			v-if="isApp && pageInfoData && hasShareContentData" 
			:commentInfo="commentInfo" 
			@addCommentData="addCommentData" 
			:initType="3"
			@obtain2="callBack2"
 			:shareContent="pageInfoData.shareContent" 
			:sport_id="this.$route.params.sport_id" 
			:comment_num="comment_num" 
			:commend_num="commend_num" 
			is_commend="yes" 
			is_collect="yes">
		</discussInput>
		
		<preLoading v-if="!pageInfoData"></preLoading>
	</div>
</template>

<script>
import aliyunPlayer from "@/components/aliyunPlayer"

// 文章评论列表组件
import allCommentList from "@/components/allCommentList"

// 下载app组件
import downLoadApp from "@/components/down"
import downToLinkedMe from "@/components/downToLinkedMe"

// 评论输入组件
import discussInput from "@/components/discuss"

// 居中弹出下载appdownload组件
import popupDownHxsLinkedMe from "@/components/popupDownHxsLinkedMe"

// 初始化loadding的组件
import preLoading from "@/components/preLoading"

import newSportsLessonGraphic from "@/components/newSportsLessonGraphic"

import axios from 'axios'
import commonJs from '@/util/common.js'
import { Toast } from 'mint-ui';

window.SPORT_ID ="";

// 接口详情数据
// https://app.hxsapp.com/slim/Fitness/getDetailByCourseId?callback=jQuery214028416206503910213_1505698232237&model_idfa=&scheme_id=1&plan_id=9&sport_id=24&share_url=https%3A%2F%2Fapp.hxsapp.com%2Fhtml%2Flesson_info.html%3Fcourse_id%3D24%26scheme_id%3D1%26plan_id%3D9&sess_token=&_=1505698232238
export default {
	name: "newSportsLessonDetail",
	data() {
		return {
			msg: 'page web - Welcome to Your Vue.js App',
			// 是否you分享数据
			hasShareContentData:false,
			
			play_time:0,
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

			callBackObj:null,
			// 获取用户的点赞总数
			commend_num: 0,

			// 发布box推送给评论列表的数据格式
			newCommentData: null,

			isPopupDownLoad: false,

			pageInfoData: null,

			trainViewUserData: null,
			// 保存绿瘦会员2.0的记录
			sportSaveRecordData:null
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
		allCommentList,
		// downLoadApp,
		downToLinkedMe,
		popupDownHxsLinkedMe,
		discussInput,
		newSportsLessonGraphic,
		preLoading
	},
	
	created(){
		// sport_id
		window.SPORT_ID = this.$route.params.sport_id
	},

	mounted() {

		this.pageSoureParent = this.$route.query.pageSoureParent ? this.$route.query.pageSoureParent : this.pageSoureParent; 

		//文章类型/文章的id/父评论id/sess_token
		this.commentInfo.type = 3;
		this.commentInfo.data_id = this.$route.params.sport_id;
		this.commentInfo.sess_token = commonJs.getUrlParam('sess_token');

		// 拿列表的数据
		this.getCommentData()

		// 获取点赞的数量
		this.getCommendNums();

		// 入口
		this.getTrain()

		var __sport_id = this.$route.params.sport_id
		commonJs.buriedPoint({
			access_occurred_type: 110204,//发生访问的【页面】类型
			access_occurred_type_id: __sport_id,//发生访问的【页面】类型ID
			previous_event_type_obj: '',//【事件】对象类型
			previous_event_type_obj_id: '',//【事件】对象类型ID
			previous_content_sort: ''//【事件】事件参数
		});

		// 非app场景下面才有用 有有版本限制 是3.0.1开始的
    if( !this.isApp ){
      // http://wiki.sys.hxsapp.net/pages/viewpage.action?pageId=1998876

      var __url = commonJs.config.prefixUrl+ "newSportsLessonDetail/" + this.$route.params.sport_id;
      this.linkedMe = {
        params:{
          // key 是写死的   value是协议，具体见这里－http://wiki.sys.hxsapp.net/pages/viewpage.action?pageId=1998876
          "key": "hxsapp://web?url="+ __url
        }
      }
    }

	},

	beforeDestroy() {
		console.log("beforeDestroy-log")
		delete window.SPORT_ID;
		window.hxsapp_visible_share_btn_mar &&  delete window.hxsapp_visible_share_btn_mar;
	},

	methods: {
		trainViewUser(){
			// 接口请求数据
			let json = {
				sess_token: commonJs.getUrlParam("sess_token"),
				id: this.$route.params.sport_id
			};

			console.log(json)
			axios.get('https://api.hxsapp.com/content/Gymnastics/trainViewUser',
				{ params: json }
			).then((res) => {
				// debugger
				if (res.data.code == 200) {
					// Toast(res.data.msg + res.data.incr_score)
					
					if( !res.data.data){
						console.log("22222")
						Toast(res.data.msg)	
						return
					}
					this.trainViewUserData = res.data.data;

					this.sportSaveRecordData = {
						// 	int	Y	消耗卡路里
						out_calory: this.pageInfoData.calories,
						// 	int	N	运动id ( 运动ID和运动名称 ，二选一) . 当 绿瘦会员2.0入口情况下: 传当前的ID
						sport_id:this.$route.params.sport_id,
						// sport_name	string	N	运动名称( 运动ID和运动名称 ，二选一)
						sport_name:this.pageInfoData.title,
						// 	string	N	运动规格(例如:分钟 ,默认为空)
						sport_unit:"分钟",
						// quantity	string	N	规格数量（默认 1）
						// quantity: this.pageInfoData.play_time,
						quantity: this.play_time,
						// 	string	N	运动记录来源，例： 来源于bong，手环计步 - bong-step, 绿瘦会员2.0: lvshou-member2
						source: this.pageSoureParent == "lvshou_sportsPlan" ? 'lvshou-member2' :'',
						// sess_token	string	Y	用户令牌
						sess_token: commonJs.getUrlParam("sess_token")

					}

				} else {
					// Toast(res.data.msg)
					Toast("暂无数据！")
				}
			}).catch((Error) => {
				console.log(Error)
			})
		},
		getTrain(){

			// 接口请求数据
			let json = {
				sess_token: commonJs.getUrlParam("sess_token"),
				id: this.$route.params.sport_id
			};

			console.log(json)
			axios.get('https://api.hxsapp.com/content/Gymnastics/getTrain',
				{ params: json }
			).then((res) => {
				// debugger
				if (res.data.code == 200) {
					// Toast(res.data.msg + res.data.incr_score)
					
					if( !res.data.data){
						console.log("1111")
						Toast(res.data.msg)	
						return
					}
					this.pageInfoData = res.data.data;

					// this.play_time = (this.pageInfoData.play_time	/60).toFixed(2);
					this.play_time = Math.ceil(this.pageInfoData.play_time/60)
					// // 分享数据初始化
					this.setShareContent()
					
					this.trainViewUser()

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

		// 获取用户点赞数量的方法
		getCommendNums(initType = 3) {

			// 接口请求数据
			let json = {
				type: initType,
				data_id: this.$route.params.sport_id
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
				data_id: this.$route.params.sport_id,
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
			// data.commentChildren={};
			// data.commentChildren.data = [];
			this.newCommentData = data;
			// debugger

		},
		updateCommentTotalNum(data) {
			console.log("updateCommentTotalNum-call:" + data)
			this.comment_num = data;
		},

		//H5通知客户端显示分享数据
		setShareContent() {
			// path: '/sportsLessonDetail/:scheme_id/:plan_id/:sport_id',
			console.log( this.pageInfoData )

			this.pageInfoData.shareContent = null;
			var __this = this
			// 邀请码
			// var __inviteCode = commonJs.getInviteCode();
			commonJs.getInviteCode( ( res )=>{
				
				// debugger
				var shareTitle = encodeURIComponent(this.pageInfoData.title);
				var __search = "?displayThumbBtn=1&inviteCode=" + res;
				var shareLink = commonJs.config.prefixUrl + 'newSportsLessonDetail/' + this.$route.params.sport_id + __search;
				
				// var shareImages = this.pageInfoData.course.images;
				var shareImages = this.pageInfoData.share_pic;
				var shareDescr = encodeURIComponent(this.pageInfoData.descr);//分享描述
				// var shareArticleId = this.pageInfoData.course.id;
				var shareArticleId = '';
				var shareType = "course";
				// var shareType = 0;
				var shareMediaLink = this.pageInfoData.filename ? this.pageInfoData.filename : "";

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

		initShare(shareData) {
			if (this.isApp) {
				// debugger
				var __sport_id = this.$route.params.sport_id;
				var json = {
					access_occurred_type: 210530,//发生访问的【页面】类型
					access_occurred_type_id: __sport_id,//发生访问的【页面】类型ID
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
		callBack2(obj){
			//接受发表评论框传过json，推送到评论 子评论数组 第一位
			this.callBackObj = obj;
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
.newSportsLessonDetail {
	width: 100%;
	box-sizing: border-box;
	overflow:hidden ;
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
		padding: 20px 15px 0 15px;
		box-sizing: border-box;

		.lesson_name {
			font-size: 23px;
			color: #333;
			display: block;
			width: 100%;
			padding-bottom: 10px;
		}

		.lesson_introduce_suggest {
			width: 100%;

			.lesson_teacher {
				font-size: 15px;
				color: #666;
			}

			.lesson_introduce_suggest_tab {
				margin-top: 15px;
				margin-bottom: 10px;
			}
			.lesson_introduce_suggest_tab .tabdiv {
				margin: 0 10px 10px 0;
				// box-sizing: border-box;
				// height: 24px;
				// line-height: 16px;
				padding: 5px 9px;
				border-radius: 5px;
				font-size: 13px;
				background-color: #818dcf;
				color: #FFFFFF;
				float: left;
				// box-sizing: border-box;
			}
		}
	}
	/*课程详情的头部区域－结束 */

	.trainingInfo {
		padding: 20px 15px 15px;
		width:100%;
		box-sizing:border-box;
		background: #fff;
		height: 65px;
		position:relative;

		.left {
			position:absolute;
			top:11px;
			left:15px;
			width:130px;
			span {
				display:block;
				font-size: 13px;
				color:#000;
				&.now{
					i {
						font-size: 17px;
						color: #333;
					}
				}
				&.all{
					color:#999;
					font-size:13px;
				}
			}

		}
		.right {
			float: right;
			height: 30px;
			margin-right:5px;
			
			li{
				float: right;
				margin-right: -5px;
				width: 30px;
				height: 30px;
				img {
					width: 30px;
					height: 30px;
					display:block;
					border-radius: 50%;
					border:#fff 1px solid;
				}
			}
		}

	}

	.trainingInfoNum{
		width:100%;
		padding-left:15px;
		box-sizing:border-box;
		height:67px;
		overflow:hidden;
		.min_box{
			float:left;
			i{
				margin-top:22px;
				float:left;
				height:12px;
        width:12px;
        background: url(../assets/img/icon_min@2x.png) left top no-repeat;
        background-size: 100% 100%;
			}
			.num{
				margin:11px 3px 0;
				float:left;
				height:45px;
				line-height:45px;
				font-size:32px;
				color:#333;
			}
			.text{
				margin-top:35px;
				float:left;
				height:15px;
				line-height:15px;
        width:19px;
				font-size:11px;
				color:#999;
			}
		}
		.kcal_box{
			float:left;
			margin-left:50px;
			i{
				margin-top:22px;
				float:left;
				height:12px;
        width:12px;
        background: url(../assets/img/icon_kcal@2x.png) left top no-repeat;
        background-size: 100% 100%;
			}
			.num{
				margin:11px 3px 0;
				float:left;
				height:45px;
				line-height:45px;
				font-size:32px;
				color:#333;
			}
			.text{
				margin-top:35px;
				float:left;
				height:15px;
				line-height:15px;
        width:21px;
				font-size:11px;
				color:#999;
			}
		}
	}
		
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
