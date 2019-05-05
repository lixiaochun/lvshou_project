<template>
	<div class="dynamic-info-container">
		<div v-if="isdynamicDelete" class="dynamicDeleteTip">
			该动态已删除
		</div>
		<div v-if="!isdynamicDelete">
			<goSignPage></goSignPage>
			<div class="dynamic-main">
				<div class="dynamic-tit">
		            <span class="bg" :style="this.userInfo.headImgStyle"></span>
		            <div class="info">
		            	<p class="name">{{ userInfo.nickName}}</p>
		            	<p class="date">{{ userInfo.date }}</p>
		            </div>
		            <a href="javascript:;" @click="showPopupDownLoadCall" v-if="false">+&nbsp关注</a>
		        </div>
	            <div class="dynamic-content">	
		            <p>{{ dynamicContent }}</p>
	            	<div v-if="dynamicData" v-show="dynamicData.type==1">
		            	<div class="picture-box">
		            		<!-- <div class="once">
		            			<img src="https://hxsupload-oss.hxsapp.com/2017-09-12/5af88a264615c0df0fd13a6b1243c093.jpg" alt="">
		            		</div> -->
		            		<div class="more clearfix">
		            			<span :key="index" v-for="(img, index) in dynamicImages" :style="{background:'url(' + img + ') center center no-repeat',backgroundSize:'180%', width: photoStyleWidth, height:photoStyleWidth}" @click="openImgIndexFn(index)" :class="{once: onePictureStyle}"></span>
		            		</div>
		            	</div>
	            	</div>
					<div class="dynamic-share-detail clearfix" v-if="dynamicData && dynamicData.type==2 && !isDeleteDynamicFn(dynamicData)" @click.stop="goArticleDetail(dynamicData.content_list.id)">
	                    <div class="detail-img-box" v-if="dynamicData.content_list">
	                        <div class="bg" v-if="dynamicData.content_list.show_type == 5 || dynamicData.content_list.show_type == 6"><span :class="{audio: dynamicData.content_list.show_type == 6, video: dynamicData.content_list.show_type == 5}"></span></div>
	                        <!-- <img :src="dynamicData.content_list.images[0]" alt=""> -->
                            <em :style="{background:'url(' + dynamicData.content_list.images[0] + ') center center /150% no-repeat'}"></em>
	                    </div>
	                    <div class="detail-txt" :style="{width:detailTxtWidth}">
	                        <p>{{ dynamicData.content_list.title }}</p>
	                        <p>{{ dynamicData.content_list.descr }}</p>
	                    </div>
	                </div>
	                <!-- <div class="dynamic-video" v-if="dynamicData && dynamicData.type==3" @click="showPopupDownLoadCall" :style="{height:(documentClientWidth - 28)*0.56 + 'px'}">
	                    <div class="bg"></div>
                        <em v-if="dynamicData.type_content_json" :style="{background:'url(' + dynamicData.type_content_json.images + ') center center /100% no-repeat'}"></em>
	                    <span></span>
	                </div> -->
	                <div class="dynamic-video" v-if="dynamicData && dynamicData.type==3">
						<!-- {{ dynamicData.id }} -->
	                    <!-- 阿里云播放器 -->
						<aliyunPlayer
							class="alyPlayerBox"
							pageSoure="dynamicInfo"
							:media_id="dynamicData.id"
							:sourceUrl="dynamicData.type_content_json.url" 
							:coverUrl="dynamicData.type_content_json.images">
						</aliyunPlayer>
	                </div>
                   <div class="dynamic-audio" v-if="dynamicData && dynamicData.type==4" :style="{height:(documentClientWidth - 73)*0.56 + 'px'}" @click="showPopupDownLoadCall">
                        <div class="bg"></div>
                        <em :style="{background:'url(' + dynamicData.type_content_json.images + ') center center /100% no-repeat'}"></em>
                        <span></span>
                    </div> 
	                <div class="dynamic-detail-delete" v-show="dynamicData && isDeleteDynamicFn(dynamicData)">
	                	<img src="../assets/images/icon_deleted.png">
	                	<div class="detail-delete-tip">
	                		<span>抱歉，此文章已被删除。查看帮助:</span>
	                		<a href="https://act.hxsapp.com/base/Award/rule/deleteExplain">网页链接</a>
	                	</div>
	                </div>
	                <div class="border" v-if="dynamicCircle || dynamicPosition"></div>
	                <div class="dynamic-source">
	                	<span v-if="dynamicCircle">{{dynamicCircle}}</span>
	                	<i v-if="dynamicPosition"></i>
	                	<em v-if="dynamicPosition">{{dynamicPosition}}</em>
	                </div>
	            </div>
			</div>
			<div class="solid_7"></div>
			<shareComment :commentInfo="commentInfo" v-if="commentInfo && linkedMe" :linkedMe='linkedMe' @acceptCommentDateFn="commentCallBack" :dynamicThumb="dynamicThumb"></shareComment>
			<!-- <discuss></discuss> -->
			<downToLinkedMe v-if="linkedMe" :linkedMe='linkedMe'></downToLinkedMe>
	        <preLoading v-if="!(dynamicData && acceptCommentDate)"></preLoading>
			<!--<popupDownLoad v-if="isPopupDownLoad"></popupDownLoad>-->
			<popupDownHxsLinkedMe  v-if="linkedMe && isPopupDownLoad" :linkedMe='linkedMe'></popupDownHxsLinkedMe>
			<picture-box :dynamicImages="dynamicImages" v-if="pictureShow" @obtain="pictrueCallBack" :openPictureIndex="openImgIndex"></picture-box>
		</div>
	</div>
</template>
<script>

	import axios from 'axios'
	import shareComment from '@/components/shareComment'
	import down from '@/components/down'
	import picture from '@/components/picture'
	import preLoading from '@/components/preLoading'
	import common from '@/util/common.js'
	import downToLinkedMe from "@/components/downToLinkedMe"
	import popupDownHxsLinkedMe from "@/components/popupDownHxsLinkedMe"
	import goSignPage from "@/components/goSignPage"
	// 阿里云视频播放器
	import aliyunPlayer from "@/components/alyPlayer"

	export default{
		name:'dynamicInfo',
		data(){
			return{
				userInfo:{//用户信息
					headImg: null,
					nickName: null,
					date: null,
					headImgStyle: null
				},
				diaryId:null,//用户动态id
				dynamicData:null, //总数据
				dynamicContent: null,//正文
				dynamicImages: [],//用户图片数组
				pictureShow: false, //是否展示图片
				dynamicCircle:null,//动态所属圈子
				dynamicPosition:null,//发动态位置
				openImgIndex: 0, //传递picture组件用户点击第几张图片,
				onePictureStyle: false, //用户发表一张图片展示图片样式
        		photoStyleWidth: null, //九宫格图片布局
        		isPopupDownLoad: false, //下载app提示框展示/隐藏
        		commentInfo: null,//传递参数给评论组件
        		acceptCommentDate: null,//组件评论数据
                preLoadingShow: true,
                isdynamicDelete: false, //该动态是否删除，
                dynamicThumb: null,
        		detailTxtWidth: null,
        		documentClientWidth:null,//可视区大小
        		linkedMe:null,//接入linkedme在微信打开app
        		shareTitle: null, // 站外分享title
        		shareImg: null, // 站外分享头像图片
        		loginInfo: null, // 登录人的信息
        		dataListContent: null
			}
		},
		mounted(){
			var _this = this;
			//动态内容
			this.dynamicInfo();
			//设置九宫格样式
			this.setPhotoStyle();
			//文章描述的大小
			this.detailTxtWidthFn();
			//获取窗口大小
			this.documentClientWidthFn();

			//埋点
			common.buriedPoint({
			    access_occurred_type: 500002,//发生访问的【页面】类型
			    access_occurred_type_id: _this.diaryId,//发生访问的【页面】类型ID
			    previous_event_type_obj: '',//【事件】对象类型
			    previous_event_type_obj_id: '',//【事件】对象类型ID
			    previous_content_sort: ''//【事件】事件参数
			});

			// console.log(common.isApp()) // 登录状态
			// console.log(common.isLogin()) // 登录状态
		},
		methods:{
			getLoginInfo(callback) {
				let sessToken = common.getUrlParam('sess_token');
				axios.get('https://api.hxsapp.com/account/userInfo/getSelfUserInfo', {params:{
					sess_token: sessToken
				}}).then((res) =>{
					this.loginInfo = res.data.data;
					callback && callback();
					// console.log(this.loginInfo.nickname)
				});
			},
			dynamicInfo(){
				var _this = this;
				let routeParams = this.$route.params;
				this.diaryId = routeParams.id;
				this.commentInfo = {
					type:1,
					data_id: this.diaryId,
					last_id: 0
				}
				axios.get('https://api.hxsapp.com/community/userDiary/getDiaryById', {params:{
					diary_id:this.diaryId
				}}).then((res) =>{
					console.log(res);
					
					if(res.data.code == 200){
						let data = res.data.data;
						let userInfo = data.user_info;

						//总数据
						this.dynamicData = data;
						//动态所属圈子
						if(data.circle_id == 1)this.dynamicCircle = common.subStlength(data.circle_info.title,7,6);

						//发动态位置
						if(data.is_location == 1){
							let locationInfo =  data.location_info;
							let add = locationInfo.province + locationInfo.city + locationInfo.district + locationInfo.address;
							//根据屏幕来截取地址长度
							if(document.documentElement.clientWidth <= 360){
								this.dynamicPosition = common.subStlength(add,13,12)
							}else{
								this.dynamicPosition = common.subStlength(add,16,15)
							}
						};

						//用户相关
						this.userInfo.headImg = userInfo.head_img;
						this.userInfo.nickName = common.subStlength(userInfo.nickname);
						this.userInfo.date = data.create_time.substring(5,16);
						this.userInfo.headImgStyle = {
							background:'url(' + userInfo.head_img + ') center center no-repeat',
							backgroundSize: '160%'
						}

						//传递给评论组件显示
						this.dynamicThumb = data.commend_num;
						//正文 图文
						this.dynamicContent = data.content;
						// console.log(data.images);
						for(let i = 0; i < data.images.length; i++){
							let index = data.images[i].indexOf('?');
							this.dynamicImages.push(data.images[i].substring(0,index));
						}

						//当图片为一张时触发新样式
						if(this.dynamicImages.length == 1){
							this.onePictureStyle = true;
						}
						common.setTitle(_this.userInfo.nickName + '的好享瘦动态');
			            
			            // 修改分享显示逻辑
			            if(common.isApp() && common.isLogin()) { // 已登录状态
			            	this.getLoginInfo(function() {
			            		let name = common.subStlength(_this.loginInfo.nickname);
			            		// console.log(name+','+headImg)
					            let sTitle1 = '@'+ name + ' ' + data.content,
					            	sTitle2 = '@'+ name + '的好享瘦动态';
				            	_this.shareTitle = $.trim(data.content) ? sTitle1 : sTitle2;
				            	_this.shareImg = data.images.length != 0 ? data.images[0] : _this.userInfo.headImg;
			            	});
			            }else { // 未登录状态
			            	_this.shareTitle = common.subStlength(userInfo.nickname);
			            	_this.shareImg = this.userInfo.headImg;
			            }

			            let inviteCode = common.getUrlParam('inviteCode') || '';
			            common.outSideShare({
			                title: _this.shareTitle,
			                desc: '我本仙女，先瘦为敬！',
			                link: common.config.prefixUrl + 'dynamicInfo/'+ this.diaryId + '?inviteCode=' + inviteCode, 
			                img: _this.shareImg
			            });
			            // common.outSideShare({
			            //     title: _this.userInfo.nickName + '的好享瘦动态',
			            //     desc: _this.dynamicContent,
			            //     link: common.config.prefixUrl + 'dynamicInfo/'+ this.diaryId + '?inviteCode=' + inviteCode, 
			            //     img: _this.dynamicImages[0] || _this.userInfo.headImg
			            // });

			            //接入linkedMe在非app浏览器直接打开app
					    this.linkedMe = {
					        params:{
					          "key": 'hxsapp://dynamic/detail?dynamicId=' + this.diaryId + '&showKeyboard=false'
					        }
					    }


					}else if(res.data.code == 600){
						this.isdynamicDelete = true;
						this.dynamicData = true;
						this.acceptCommentDate = true;
					}
				})
			},
            isDeleteDynamicFn(dynamicData){//当前类型是否被删除 只有2 5 6类型存在删除说明
                let type = dynamicData.type;
                if(type == 2){
                    if(dynamicData.content_list.delExplainUrl){
                        this.isDeleteDynamic = true;
                        return true;
                    }else{
                        return false;
                    }
                }
            },
            setPhotoStyle(){ //九宫格样式
                let Width = (document.documentElement.clientWidth - 28 - 8)/3 + 'px';
                this.photoStyleWidth = Width;
            },
			pictrueCallBack(isBoolean){//接受picture子组件参数
				this.pictureShow = isBoolean;
			},
			commentCallBack(obj){//接受评论组件参数
				this.acceptCommentDate = obj;
			},
			hidePopupDownLoadCall() {// 显示和异常弹出提示下载层
				this.isPopupDownLoad = false;
			},
			showPopupDownLoadCall() {
				this.isPopupDownLoad = true;
			},
            detailTxtWidthFn(){ //文章类型描述的大小
                let Width = (document.documentElement.clientWidth - 28 - 60 - 10 - 20) + 'px';
                this.detailTxtWidth = Width;
            },
            documentClientWidthFn(){
            	this.documentClientWidth = document.documentElement.clientWidth;
            },
			openImgIndexFn(index){ //查看图片
				this.openImgIndex = index;
				this.pictureShow = true;
			},
            goArticleDetail(id){//跳转去文章详情页面
                this.$router.push({path:'/articleDetail/'+ id});
            },
            godynamicInfo(id){//跳转去动态详情页面
                this.$router.push({path:'/dynamicInfo/'+ id});
            }
		},
	    components:{
	        shareComment,
	        'picture-box': picture,
	        down,
	        preLoading,
	        downToLinkedMe,
	        popupDownHxsLinkedMe,
	        goSignPage,
    		aliyunPlayer
	    },
        beforeDestroy(){
            document.title = common.config.webTitle;
        }
	}
</script>
<style scoped>
.dynamicDeleteTip{
	width: 100%;
	height: 250px;
	line-height: 250px;
	text-align: center;
	color: #999;
}
.solid_7{
	width: 100%;
	height: 7px;
	background:#F5F5F8;
}
.dynamic-main{
  padding: 19px 14px 0;
  position: relative;
}
.dynamic-tit {
    height: 42px;
}
.dynamic-tit .bg{
	width: 40px;
	height: 40px;
	border-radius:50%;
	border:solid 1px #ddd;
	float:left;
	margin-right: 14px;
}
.dynamic-tit .info{
	height: 40px;
	line-height:40px;
	font-size: 14px;
	color:#595959;
	float:left;
}
.dynamic-tit .name{
	height: 16px;
	line-height:16px;
	font-size: 14px;
	color:#333;
	margin-top: 2px;
	margin-bottom: 10px;
}
.dynamic-tit .date{
	height: 14px;
	line-height:14px;
	font-size: 11px;
	color:#666;
}
.dynamic-tit a{
	width: 60px;
	height: 26px;
	background: #fff;
	line-height: 26px;
	text-align: center;
	font-size: 14px;
	color:#818DCF;
	border: solid 1px #818DCF;
	float: right;
	border-radius: 16px;
	margin-top: 5px;
}
.dynamic-main .dynamic-content{
	padding:17px 0 12px 0;
	word-break: break-all;
}
.dynamic-content p:nth-of-type(1){
	font-size: 15px;
	color: #595959;
	line-height: 22px;
	margin-bottom: 12px;
}
.picture-box .more span{
	width: 31.33%;
  	height: 100px;
  	margin-right: 4px;
  	margin-bottom: 4px;
  	float: left;
}
.picture-box .more span:nth-of-type(3),.picture-box .more span:nth-of-type(6),.picture-box .more span:nth-of-type(9){
  	margin-right: 0px;
}
.picture-box .more .once{
	width: 130px;
	height: 130px;
}
.dynamic-share-detail{
	margin-top: 10px;
	padding: 10px;
	background: #f5f5f5;
	margin-bottom: 14px;
}
.dynamic-share-detail .detail-img-box{
	position: relative;
	float: left;
	margin-right: 10px;
}
.dynamic-share-detail .detail-img-box .bg,.dynamic-share-detail .detail-img-box .bg2{
	width: 100%;
	height: 100%;
	background: rgba(0,0,0,0.3);
	position: absolute;
	left: 0;
	top:0;
}
.dynamic-share-detail .detail-img-box span{
    width: 30px;
    height: 30px;
    position: absolute;
    left:50%;
    top:50%;
    margin-left:-15px;
    margin-top:-15px;
}
.dynamic-share-detail .detail-img-box .video{
    background: url(../assets/images/fx_shiping.png) left top no-repeat;
    background-size: 100%;
}
.dynamic-share-detail .detail-img-box .audio{
    background: url(../assets/images/fx_yinping.png) left top no-repeat;
    background-size: 100%;
}
.dynamic-share-detail .detail-img-box .bg2{
	z-index: 2;
	background: transparent;
}
.dynamic-share-detail .detail-img-box img{
	width: 60px;
	height: 60px;
}
.dynamic-share-detail .detail-img-box em{
	width: 60px;
	height: 60px;
	display: block;
}
.dynamic-share-detail .detail-img-box span{
	width: 25px;
	height: 25px;
	position: absolute;
	left: 50%;
	top:50%;
	margin-left: -13px;
	margin-top: -13px;
}
/*.dynamic-share-detail .detail-img-box .audio{
  background: url(../img/fx_yinping.png) left top no-repeat;
  background-size:100%;
}
.dynamic-share-detail .detail-img-box .play{
  background: url(../img/fx_shiping.png) left top no-repeat;
  background-size:100%;
}*/
.dynamic-share-detail .detail-txt{
	width: 200px;
	float:left;
}
.dynamic-share-detail .detail-txt p:nth-of-type(1){
	color: #333;
	height: 16px;
	line-height: 16px;
	font-size:14px;
	overflow: hidden;
	margin-top: 12px;
	margin-bottom: 8px;
}
.dynamic-share-detail .detail-txt p:nth-of-type(2){
	height: 14px;
	line-height: 14px;
	color: #666;
	font-size:12px;
	overflow: hidden;
	margin-bottom: 0;
}
.dynamic-video, .dynamic-audio{
    width: 100%;
    height: 210px;
    position: relative;
}
.dynamic-video em, .dynamic-audio em{
    width: 100%;
    height: 100%;
    display: block;
}
.dynamic-video .bg, .dynamic-audio .bg{
    width: 100%;
    height: 100%;
    position: absolute;
    left:0;
    top:0;
}
.dynamic-video span,.dynamic-audio span{
    width: 50px;
    height: 50px;
    background: url(../assets/images/fx_shiping2.png) left top no-repeat;
    background-size: 100%;
    position: absolute;
    left:50%;
    top:50%;
    margin-left: -25px;
    margin-top: -25px;
}
.dynamic-audio span{
    background: url(../assets/images/fx_yinping.png) left top no-repeat;
    background-size: 100%;
}
.dynamic-detail-delete{
	padding:8px;
	height: 40px;
	background: #F5F5F8;
}
.dynamic-detail-delete img{
	width: 40px;
	height: 40px;
	margin-right: 8px;
	float: left;
}
.detail-delete-tip{
	float: left;
	height: 40px;
}
.dynamic-detail-delete span{
	font-size: 14px;
	height: 18px;
	line-height: 18px;
	color: #666666;
	margin-top: 3px;
	display: block;
}
.dynamic-detail-delete a{
	font-size: 14px;
	height: 18px;
	line-height: 18px;
	color: #818DCF;
}
.dynamic-content .border{
	width:100%;
	height: 1px;
	background: rgba(129, 141, 207, 0.16);
	margin: 15px 0 11px;
}
.dynamic-source{
    height: 18px;
}
.dynamic-source span{
	height: 18px;
	line-height: 18px;
	font-size: 13px;
	color: #818DCF;
	margin-right: 10px;
	float:left;
}
.dynamic-source i{
	width: 16px;
	height: 18px;
    background: url(../assets/images/icon_lovation.png) left top no-repeat;
    background-size: 100%;
    margin-right: 3px;
	float:left;
}
.dynamic-source em{
	height: 18px;
	line-height: 18px;
	font-size: 13px;
	color: #999999;
	float:left;
}


</style>