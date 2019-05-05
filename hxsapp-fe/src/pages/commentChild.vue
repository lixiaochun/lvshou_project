<template>
	<div class="reply-container">
		<div v-if="isDelete" class="isDeleteTip">
			该评论已删除
		</div>
		<div v-if="!isDelete">
			<ul >
	            <li style="margin-bottom:0;" v-if="parentData" :class="{commentLiActive:(commentLiId == parentData.id && !parentData.is_mine)}"  @click.stop="selectFn(parentData.id,parentData.is_mine, -1,parentData)">
					<div class="commentLiFn" :class="{commentLiFnWidth:!parentData.is_mine}" v-if="parentData.is_mine">
						<i class="icon"></i>
						<div @click.stop="textareaFocus(-1,parentData)">
							<span></span>
							<em>回复</em>
							<i v-if="parentData.is_mine"></i>
						</div>
						<div v-if="parentData && parentData.is_mine == 1" @click.stop="deleteComment(-1, parentData)">
							<span></span>
							<em>删除</em>
						</div>
					</div>
	                <div class="all-info">
	                    <div class="img-box">
	                    	<span :style="{background:'url(' + parentData.head_img + ') center center /140% no-repeat'}" @click.stop="goDynamicPage(parentData.user_id)"></span>
	                    </div>
	                    <div class="info">
	                        <div class="name">{{ parentData.nickname }}</div>
	                        <span>{{ parentData.create_time }}</span>
	                    </div>
	                    <div class="methods">
	                        <div class="give-good" @click.stop="giveThumb(-1, parentData)">
	                            <i :class="parentData.is_commend"></i>
	                            <em>{{ parentData.commend_num }}</em>
	                        </div>
	                        <div class="content-nun" @click.stop="textareaFocus(-1, parentData)" v-if="false">
	                            <i></i>
	                            <em>{{childrenCommentTotal}}</em>
	                        </div>
	                    </div>
	                </div>
	                <div class="content-msg">
	                    <p class="discuss" v-if="parentData">{{ parentData.content }}</p>
	                    <!-- <div class="delete-box" v-if="parentData && parentData.is_mine == 1">
	                        <em @click="deleteComment(-1, parentData)">删除</em>
	                    </div> -->
		                <div class="new_cont_reply" v-if="parentData && parentData.admin_reply">
		                    <div class="new_reply_content">
		                        <span><i></i>好享瘦小编回复:</span><em>{{parentData.admin_reply}}</em>
		                    </div>
		                </div>
	                </div>
	                <div class="solid"></div>
	            </li>
			</ul>
			<div class="goPrevPage">
				<a  href="https://hxsapp_close" @click="goPrevPagePoint">
					<span></span>
					<em>查看原文章</em>
				</a>
			</div>
	        <div class="change-background"></div>
	      	<ul v-infinite-scroll="loadMore"
			  	infinite-scroll-disabled="loading"
			  	infinite-scroll-distance="0" infinite-scroll-immediate-check="true">
				<li v-for="(item, index) in childData" :key="index" v-if="childData && item.id" :class="{commentLiActive:(commentLiId == item.id && item.is_mine)}"  @click.stop="selectFn(item.id,item.is_mine,index, childData)">
					<div class="commentLiFn" :class="{commentLiFnWidth:!item.is_mine}" v-if="item.is_mine">
						<i class="icon"></i>
						<div @click="textareaFocus(index, childData)">
							<span></span>
							<em>回复</em>
							<i v-if="item.is_mine"></i>
						</div>
						<div  v-if="item.is_mine == 1" @click.stop="deleteComment(index, childData)">
							<span></span>
							<em>删除</em>
						</div>
					</div>
		            <div class="all-info">
		                <div class="img-box">
		                    <span :style="{background:'url(' + item.head_img + ') center center /140% no-repeat'}" @click.stop="goDynamicPage(item.user_id)"></span>
		                </div>
		                <div class="info">
		                    <div class="name">{{ item.nickname }}</div>
		                    <span>{{ item.create_time }}</span>
		                </div>
		                <div class="methods">
		                    <div class="give-good"  @click.stop="giveThumb(index, childData)">
	                            <i :class="item.is_commend"></i>
		                        <em> {{ item.commend_num }}</em>
		                    </div>
	                        <!-- <div class="content-nun" @click="textareaFocus(index, childData)" v-if="!item.reply_nickname">
	                            <i></i>
	                            <em>{{data.commentChildren.data.length}}</em>
	                        </div> -->
		                </div>
		            </div>
		            <div class="content-msg">
		                <p class="discuss"><span v-if="item.reply_nickname"><em>回复</em>{{ item.reply_nickname }}：</span>{{ item.content }}</p>
		               <!--  <div v-if="item.is_mine == 1" class="delete-box">
		                    <em @click.stop="deleteComment(index, childData)">删除</em>
		                </div> -->
		                <div class="new_cont_reply" v-if="item.admin_reply">
		                    <div class="new_reply_content">
		                        <span><i></i>好享瘦小编回复:</span><em>{{item.admin_reply}}</em>
		                    </div>
		                </div>
		            </div>
		            <div class="solid"></div>
		        </li>
			</ul>

	    	<div class="none_tip" v-if="!childDataShowNum(childData)">还没有回复哦</div>
	        <div class="loadTip" v-if="loadTip">正在加载中...</div>
	        <discuss soucrePage="commentChild" @obtain="callBack" :commentInfo="commentInfo"></discuss>
	        <preLoading v-if="!(parentData && !isFirstLoad)"></preLoading>
        </div>
	</div>
</template>
<script>
	import axios from 'axios'
	import discuss from '@/components/discuss'
	import common from '@/util/common.js'
	import preLoading from '@/components/preLoading'
	import { Toast, MessageBox } from 'mint-ui'
	export default{
		name: 'commentChild',
		data(){
			return{
				parentData: null, //父评论数据
				childData: [], //子评论数据
				childLastId:null,
                loading: false,//是否使用下滑加载
                loadTip: false, //下滑加载提示
                loadTipText: ['正在加载中...','没有更多评论了'], //下拉加载或加载完提示
				noneTipShow: false, //子评论数组没有数据
				isFirstLoad: true, //子评论数组是否第一次加载数据
				commentLiId:null,
                commentInfo:{
                	type: null, //文章类型
					data_id:null,//文章id
					parent_comment_id: null,//父级评论id,(可无)
					reply_comment_id: null,//二级评论id,(可无)
					arguedName:null,//被回复人的评论(可无)
					sess_token: null,
					isArguedName: false
                },
        		resultLoading: true,//每次下拉加载完毕才可以加载下一次
        		isDelete: false, //该评论是否删除
        		childrenCommentTotal: null,
				soucrePageName:'commentChild'
			}
		},
		props: {
			// 页面来源处理
			soucrePage:{
				type:String,
	      		default: "articleDeatail"
	    	}
    	},
		computed: {
			isLogin: function() {
				return common.isLogin()
			},
			isApp: function() {
				return common.isApp()
			}
		},
		mounted(){
			var _this = this;
			//文章类型/文章的id/父评论id/sess_token
			let routeParams = this.$route.params;
			this.commentInfo.type = routeParams.type;
			this.commentInfo.data_id = routeParams.data_id;
			this.commentInfo.parent_comment_id = routeParams.parent_comment_id;
			this.commentInfo.sess_token = common.getUrlParam('sess_token');

			document.title = "评论详情";

			//获取父评论的数据
			this.getParentData();
			//获取子评论的数据
			this.getChildData();
			this.documentClick();
			this.documentScroll();

			//埋点
            common.buriedPoint({
			    access_occurred_type: 110404,//发生访问的【页面】类型
			    access_occurred_type_id: _this.commentInfo.data_id,//发生访问的【页面】类型ID
			    previous_event_type_obj: '',//【事件】对象类型
			    previous_event_type_obj_id: '',//【事件】对象类型ID
			    previous_content_sort: ''//【事件】事件参数
            });
		},

		methods:{
		  	documentClick(){
	  			var _this = this;
	  			document.onclick=function(){
	  				_this.commentLiId = null;
	  			}
		  	},
		  	documentScroll(){
		  		var _this = this;
		  		$(window).scroll(function() {
		  			if(_this.commentLiId){
		  				_this.commentLiId = null;
		  			}
				})
		  	},
		  	selectFn(id,isMine,index,data){
		  		if(!isMine){
		  			this.textareaFocus(index,data);
		  			return;
		  		}
		  		this.commentLiId = id;
		  	},
			goDynamicPage(__id){
				console.log("goDynamicPage")

				if( this.isApp ){
					window.location.href = "https://hxsapp_user_info#" + __id;
				}else{
					setTimeout(() => {
						var __url  = common.config.prefixUrl + "dynamic/" + __id + window.location.search;
						window.location.replace( __url );
					}, 100)
				}
				
			},
            loadMore() {
                this.getChildData(this.childLastId);
            },
			getParentData() {
				axios.get('https://api.hxsapp.com/community/userComment/getCommentById',{params:{
					comment_id: this.commentInfo.parent_comment_id,
					sess_token: this.commentInfo.sess_token
				}}).then((res)=>{
					if(res.data.code == 200){
						this.parentData = res.data.data;
						console.log(res);
					}else if(res.data.code == 600){
						this.isDelete = true;
						this.parentData = true;
						this.isFirstLoad = false;
					}
				})
			},
			getChildData(childLastId = 0){

		        //判断是否加载中 如果是 ，则阻止加载；否则加载
		        if(!this.resultLoading){return false}else{this.resultLoading = false;}
				axios.get('https://api.hxsapp.com/community/userComment/getCommentChildrenList',{params:{
					comment_id: this.commentInfo.parent_comment_id,
					last_id: childLastId,
					sess_token: this.commentInfo.sess_token
				}}).then((res)=>{
					if(res.data.code == 200){
						console.log(res);
						this.childrenCommentTotal = res.data.total;
						if(res.data.data.length > 0){
							let data = res.data.data;
                            for (let i = 0; i < data.length; i++) {
                                this.childData.push(data[i]);
                            }
                            //数据最后一个id
                            this.childLastId =  this.childData[ this.childData.length - 1].id;
                            //加载个数超过10个显示加载更多
                            this.loadTip = data.length >= 10 ? true : false;

                            //加载个数少于10个暂停滚动加载
                            if(data.length < 10) this.loading = true;
                            //加载完毕不是第一次 赋值为false
							this.isFirstLoad = false;
						}else{

                            this.loadTip = false;
                            this.loading = true;

                            //第一次加载子评论没有数据操作
                            if(this.isFirstLoad) {
                            	this.noneTipShow = true;
                            	this.isFirstLoad = false;
                        	};
	                    }
					}
					this.resultLoading = true;
				})
			},
			giveThumb(index, obj){//点赞评论
				var key = index < 0? obj: obj[index];
				axios.get('https://api.hxsapp.com/community/userCommend/doCommend',{params:{
					type: 1,
					data_id: key.id,
					sess_token: this.commentInfo.sess_token  
				}}).then((res)=>{
					console.log(res);
					//点赞和取消点赞
					if(res.data.action == 'commend'){
						key.is_commend = 'yes';
						++ key.commend_num;

						//点赞埋点
						if(this.$route.query.soucrePage == 'sportsLessonDetail' || this.$route.query.soucrePage == 'newSportsLessonDetail'){ //运动课程
				            common.buriedPoint({
							    access_occurred_type: 210551,//发生访问的【页面】类型
							    access_occurred_type_id: this.commentInfo.data_id,//发生访问的【页面】类型ID
							    previous_event_type_obj: '',//【事件】对象类型
							    previous_event_type_obj_id: '',//【事件】对象类型ID
							    previous_content_sort: ''//【事件】事件参数
				            });
						}else if(this.$route.query.soucrePage == 'videoSpecial'){//视频专题
				            common.buriedPoint({
							    access_occurred_type: 210575,//发生访问的【页面】类型
							    access_occurred_type_id: this.commentInfo.data_id,//发生访问的【页面】类型ID
							    previous_event_type_obj: '',//【事件】对象类型
							    previous_event_type_obj_id: '',//【事件】对象类型ID
							    previous_content_sort: ''//【事件】事件参数
				            });
						}else if(this.$route.query.soucrePage == 'articleDeatail'){//文章
				            common.buriedPoint({
							    access_occurred_type: 211113,//发生访问的【页面】类型
							    access_occurred_type_id: this.commentInfo.data_id,//发生访问的【页面】类型ID
							    previous_event_type_obj: '',//【事件】对象类型
							    previous_event_type_obj_id: '',//【事件】对象类型ID
							    previous_content_sort: ''//【事件】事件参数
				            });
						}

					}else if(res.data.action == 'cancel'){
						key.is_commend = 'no';
						--key.commend_num;
					}

					Toast({
					   message: res.data.msg,
					   duration: 1000
					});
				});
			},
			deleteComment(index, obj){//删除评论
				//MessageBox.confirm('确定删除该评论吗', '温馨提示');
				var message = index < 0? '确定删除该评论及子评论吗': '确定删除该评论吗';
				this.changeMessageBoxStyle();
				MessageBox({
				title: '温馨提示',
				message: message,
				showCancelButton: true,
				closeOnClickModal: false
				}).then((action) => {
					if(action != 'cancel'){
						var key = index < 0 ? obj: obj[index];
						axios.get('https://api.hxsapp.com/community/userComment/deleteComment',{params:{
							type: 0,
							comment_id: key.id,
							sess_token: this.commentInfo.sess_token
						}}).then((res)=>{
							console.log(res);
							key.id = null;
							if(index < 0) window.location.href = 'https://hxsapp_close';
							Toast({
							   message: res.data.msg,
							   duration: 1000
							});
							this.childrenCommentTotal--;
						});
					}
				})
			},
			textareaFocus(index, obj){
				let key = index < 0? obj: obj[index];
				this.commentInfo.reply_comment_id = key.id;
				this.commentInfo.arguedName = key.nickname;
				if(index >= 0){
					this.commentInfo.isArguedName = true;
				}else{
					this.commentInfo.reply_comment_id = null;
					this.commentInfo.arguedName = null;
					this.commentInfo.isArguedName = false;
				}
				//点赞埋点
				if(this.$route.query.soucrePage == 'sportsLessonDetail' || this.$route.query.soucrePage == 'newSportsLessonDetail'){ //运动课程
		            common.buriedPoint({
					    access_occurred_type: 210552,//发生访问的【页面】类型
					    access_occurred_type_id: this.commentInfo.data_id,//发生访问的【页面】类型ID
					    previous_event_type_obj: '',//【事件】对象类型
					    previous_event_type_obj_id: '',//【事件】对象类型ID
					    previous_content_sort: ''//【事件】事件参数
		            });
				}else if(this.$route.query.soucrePage == 'videoSpecial'){//视频专题
		            common.buriedPoint({ 
					    access_occurred_type: 210578,//发生访问的【页面】类型
					    access_occurred_type_id: this.commentInfo.data_id,//发生访问的【页面】类型ID
					    previous_event_type_obj: '',//【事件】对象类型
					    previous_event_type_obj_id: '',//【事件】对象类型ID
					    previous_content_sort: ''//【事件】事件参数
		            });
				}else if(this.$route.query.soucrePage == 'articleDeatail'){//文章
		            common.buriedPoint({
					    access_occurred_type: 211114,//发生访问的【页面】类型
					    access_occurred_type_id: this.commentInfo.data_id,//发生访问的【页面】类型ID
					    previous_event_type_obj: '',//【事件】对象类型
					    previous_event_type_obj_id: '',//【事件】对象类型ID
					    previous_content_sort: ''//【事件】事件参数
		            });
				}
				$('.textarea-box textarea').focus();
			},
			childDataShowNum(arr){
				var num = 0;
				for (var i = 0; i < arr.length; i++) {
					if(arr[i].id){
						num ++;
					}
				}
				return num;
			},
			goPrevPagePoint(){
				//点赞埋点
				if(this.$route.query.soucrePage == 'sportsLessonDetail' || this.$route.query.soucrePage == 'newSportsLessonDetail'){ //运动课程
		            common.buriedPoint({
					    access_occurred_type: 210555,//发生访问的【页面】类型
					    access_occurred_type_id: this.commentInfo.data_id,//发生访问的【页面】类型ID
					    previous_event_type_obj: '',//【事件】对象类型
					    previous_event_type_obj_id: '',//【事件】对象类型ID
					    previous_content_sort: ''//【事件】事件参数
		            });
				}else if(this.$route.query.soucrePage == 'videoSpecial'){//视频专题
		            common.buriedPoint({
					    access_occurred_type: 210581,//发生访问的【页面】类型
					    access_occurred_type_id: this.commentInfo.data_id,//发生访问的【页面】类型ID
					    previous_event_type_obj: '',//【事件】对象类型
					    previous_event_type_obj_id: '',//【事件】对象类型ID
					    previous_content_sort: ''//【事件】事件参数
		            });
				}else if(this.$route.query.soucrePage == 'articleDeatail'){//文章
		            common.buriedPoint({
					    access_occurred_type: 211117,//发生访问的【页面】类型
					    access_occurred_type_id: this.commentInfo.data_id,//发生访问的【页面】类型ID
					    previous_event_type_obj: '',//【事件】对象类型
					    previous_event_type_obj_id: '',//【事件】对象类型ID
					    previous_content_sort: ''//【事件】事件参数
		            });
				}
			},
			changeMessageBoxStyle(){
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
			},
			callBack(obj){
				//接受发表评论框传过json，推送到评论 子评论数组 第一位
				this.childData.unshift(obj);
				console.log(obj);
				this.noneTipShow = false;
				this.childrenCommentTotal++;
			}
		},
        components:{
            discuss,
            preLoading
        },
        beforeDestroy(){
        	document.title = common.config.webTitle;
        	$(".mint-msgbox-wrapper").length && $(".mint-msgbox-wrapper").remove();
        }
	}
</script>
<style scoped lang="less">
	.isDeleteTip{
		width: 100%;
		height: 250px;
		line-height: 250px;
		text-align: center;
		color: #999;
	}
	.reply-container ul{
		padding-top: 15px;
	}
    .all-info .img-box span{
        width: 40px;
        height: 40px;
        border-radius: 50%;
        display: block;
    }
	.change-background{
	  width: 100%;
	  height: 10px;
	  background: #f7f7f7;
	}
	.loadTip{
		height: 16px;
		line-height: 16px;
		font-size: 14px;
		text-align: center;
		color: #666;
	}
	.comment-related{
		padding-left: 11px;
		margin-bottom: 15px;
	}
	.comment-related li{
		float:left;
		padding-top: 5px;
		margin-right:50px;
	}
	.comment-related li em{
		color: #333;
		height: 34px;
		line-height: 34px;
		font-size:16px;
		display: block;
	}
	.comment-related .active span{
		width: 70%;
		height:2px;
		display: block;
		background: #FF668C;
		margin: 0 auto;
		border-radius: 2px;
	}
	.comment-related .active em{
		color: #FF668C;
	}
	.reply-container ul li .all-info{
	  overflow: hidden;
	}
	.reply-container ul li .img-box{
	    float:left;
	    margin-right: 11px;
	    cursor:pointer;
	}
	.reply-container ul li .img-box img{
	    width: 40px;
	    height: 40px;
	    border-radius: 50%;
	    border:solid 1px #ddd;
	    cursor:pointer;
	}
	.reply-container .info{
	  float:left;
	}
	.reply-container .info .name{
	  height: 16px;
	  line-height: 16px;
	  font-size: 14px;
	  color: #666;
	  margin-top: 4px;
	  margin-bottom: 3px;
	}
	.reply-container .info span{
	  height: 14px;
	  line-height: 14px;
	  font-size: 12px;
	  color: #999;
	}
	.delete_css{
	  height: 16px;
	  line-height: 16px;
	  font-size: 11px;
	  color: #818DCF;
	  cursor: pointer;
	}
	.reply-container .none_tip{
	  width:100%; 
	  height: 110px;
	  padding-bottom: 25px;
	  color:#666; 
	  text-align: 
	  center; 
	  line-height: 100px;
	  font-size: 14px;
	  overflow: hidden;
	}
	.reply-container ul li{
	  padding:15px;
	  position: relative;
	}
	.reply-container ul li .methods{
	  float: right;
	}
	.reply-container ul li .methods i{
	  width:20px;
	  height: 20px;
	  float:left;
	  margin-right: 3px;
	}
	.reply-container ul li .methods .content-nun{
	  float:left;
	  cursor:pointer;
	  padding: 0 0 0 5px;
	}
	.reply-container ul li .methods .give-good{
	  cursor:pointer;
	  float:left;
	  padding: 0 0 0 5px;
	}
	.reply-container ul li .methods .content-nun i{
	    background: url(../assets/img/pinlun.png) left top no-repeat;
	    background-size:100%;
	}
	.reply-container ul li .methods .give-good i{
	    background: url(../assets/img/zan_no.png) left top no-repeat;
	    background-size:100%;
	}
	.reply-container ul li .methods .give-good .yes{
	    background: url(../assets/img/zan_yes.png) left top no-repeat;
	    background-size:100%;
	}
	.reply-container ul li .methods em{
		width: 28px;
		height: 20px;
		line-height: 20px;
	    color:#999;
	    font-size: 14px;
	    float:left;
	}
	.reply-container ul li .discuss{
	  line-height: 20px;
	  color: #333;
	  font-size: 15px;
	  padding-top: 8px; 
	  word-break: break-all;
	}
	.reply-container ul li .discuss span{
	  font-size: 15px;
	  color:#0091ff;
	  word-break: break-all;
	}
	.reply-container ul li .discuss span em{
	  color:#666;
	}
	.reply-container ul li .content-msg{
	    padding-left: 53px;
	    overflow: hidden;
	}
	.reply-container ul li .reply-comment{
	  margin-top: 14px;
	  padding: 8px 11px 4px;
	  background: #f2f2f2;
	  cursor: pointer;
	}
	.reply-container ul li .reply-comment p{
	  line-height: 20px;
	  font-size:13px;
	  color:#595959;
	  margin-bottom: 15px; 
	  word-break: break-all;
	}
	.reply-container ul li .reply-comment a{
	  padding-top: 4px;
	  padding-bottom:7px;
	  font-size:13px;
	  display: block;
	}
	.reply-container ul li .reply-comment p span.reply-container ul li .reply-comment a{
		color: #818DCF;
	}
	.reply-container ul li .reply-comment p span{
	  padding-right: 8px;
	}
	.reply-container ul li .delete-box{
	  height: 16px;
	  margin-top: 11px;
	  cursor: pointer;
	}/*
	.reply-container ul li .delete-box span{
	    width: 14px;
	    height: 14px;
	    background: url(../img/delete.png) left top no-repeat;
	    background-size:14px;
	    float:left;
	    margin-right: 6px;
	}*/
	.reply-container ul li .delete-box em{
	  height: 16px;
	  line-height:16px;
	  font-size: 14px;
	  color:#666;
	  float:left;
	  cursor: pointer;
	}
	.reply-container ul li .solid{
	  height: 1px;
	  margin-top: 19px;
	  background: rgba(129,141,207,0.20);
	  margin-left: 53px;
	  overflow: hidden;
	}
	.goPrevPage{
		width: 100%;
		height: 48px;
	}
	.goPrevPage a{
		height: 18px;
		float:right;
		padding: 15px 0;
	}
	.goPrevPage em{
		height: 18px;
		line-height: 18px;
		font-size:15px;
		color: #818DCF;
		float: right;
		margin-right: 7px;
	}
	.goPrevPage span{
		width: 6px;
		height: 10px;
		float: right;
	    background: url(../assets/images/fh-xiao-lan.png) left top no-repeat;
	    background-size:100%;
	    margin-right:15px;
		margin-top:4px;
	}
	.new_cont_reply{
		padding: 6px 12px;
		margin-top: 13px;
		background: #fefcf2; 
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
	.commentLiFn{
		display: none;
	}
	.commentLiActive{
		background:rgba(153,153,153,0.2);
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
</style>