<template>
	<div class="achieve-container">
		<div class="header">
			<span class="head-img" :style="{background:'url(' + userInfo.headImg + ') center center /130% no-repeat'}"></span>
			<div class="name-box">
				<div class="name"><span>{{ userInfo.name }}</span><i :class="{girl:userInfo.sex == '0',boy:userInfo.sex == '1'}"></i></div>	
			</div>
			<div class="fraction">我的积分:<span>{{ userInfo.score }}</span></div>
		</div>
		<div class="main">
			<div class="text">
				<span class="left">我的等级</span>
				<span class="right">{{ differIntegral }}</span>
			</div>
			<div class="solid"></div>
			<div class="plt_15">
				<div class="grade-box">
					<div class="grade">
						<!-- <span></span> -->
						<em>V1</em>
					</div>
					<div class="grade">
						<!-- <span></span> -->
						<em>V2</em>
					</div>
					<div class="grade">
						<!-- <span></span> -->
						<em>V3</em>
					</div>
					<div class="grade last">
						<!-- <span></span> -->
						<em>V4</em>
					</div>
				</div>
			</div>
			<div class="scale-box">
				<div :style="{width:speed + 'px'}"><i></i></div>
			</div>
			<div class="badge">我的勋章</div>
			<div class="solid"></div>
			<div class="badge-ling clearfix">
				<div>
					<img src="../assets/images/ywzq.png">
					<em>勇往直前</em>
				</div>
				<div>
					<img src="../assets/images/tszt.png">
					<em>踏上征途</em>
				</div>
			</div>
		</div>
		<div class="footer">
			<a href="javascript:;" @click="toRulepage">查看规则详情</a>
		</div>
        <preLoading v-if="!(userInfo.name && userInfo.level)"></preLoading>
	</div>
</template>
<script>

	import commonJs from '@/util/common.js';
	import preLoading from '@/components/preLoading'
	import axios from 'axios';

	export default{
		name: 'achieve',
		data(){
			return{
				sessToken: '',
				userInfo:{ //用户信息
					name: '',
					headImg: null,
					sex: '',
					score: 0,
					level: 'lv1'

				},
				speed:0, //积分进度条
				differIntegral:'' //积分升级提示语
			}
		},
		mounted(){
			this.sessToken = commonJs.getUrlParam('sess_token');
			//获取用户信息
			this.getUserInfo();
			//获取用户积分
			this.getUserScore();

			//埋点
			commonJs.buriedPoint({
			    access_occurred_type: 150901,//发生访问的【页面】类型
			    access_occurred_type_id: '',//发生访问的【页面】类型ID
			    previous_event_type_obj: '',//【事件】对象类型
			    previous_event_type_obj_id: '',//【事件】对象类型ID
			    previous_content_sort: ''//【事件】事件参数
			});
		},
		methods:{
			getUserInfo(){
				axios.get('https://api.hxsapp.com/account/UserInfo/getSelfUserInfo',{params:{
                    sess_token: this.sessToken
				}}).then((res)=>{
					let data = res.data.data;
					this.userInfo.name = commonJs.subStlength(data.nickname);
					this.userInfo.sex = data.sex;
					this.userInfo.headImg = data.head_img;
				})
			},
			getUserScore(){
				axios.get('https://api.hxsapp.com/bonus/UserScore/getScoreAndHonor',{params:{
                  	sess_token: this.sessToken
				}}).then((res)=>{
					let score = res.data.data.score;
					let level = res.data.data.level;
					let gradeWidth = document.documentElement.clientWidth - 30;

					this.userInfo.score = score;
					this.userInfo.level = level;

                   	if(level == "lv1"){ 

                        if(score == 0){
                          this.speed = 0; 
                        }else{
                          this.speed = (gradeWidth * 0.333333) * (score/500);
                        }

                        var differ = 500 - score;

                        if(differ == 0 ){
                        }else{
                            this.differIntegral="还差" + differ +"分到达V2";
                        }
                   	}
                   	else if(level=="lv2"){
                        this.speed = (gradeWidth * 0.333333) + (width * 0.333333) * ((score-500)/(2000-500));
                        var differ = 2000 - score;

                        if(differ == 0 ){
                            //this.differIntegral="还差" + 1 +"分到达V3";
                        }else{
                            this.differIntegral="还差" + differ +"分到达V3";
                        }
                   	}
                   	else if(level=="lv3"){

                        this.speed =(gradeWidth * 0.666666) + width * 0.333333 * ((score-2000)/(5000-2000));
                        var differ = 5000 - score;

                        if(differ == 0 ){
                            //this.differIntegral="还差" + 1 +"分到达V4";
                        }else{
                            this.differIntegral="还差" + differ +"分到达V4";
                        }
                   	}
                   else if(level=="lv4"){
                      this.speed = gradeWidth;
                      this.differIntegral="到达V4";
                   	}

				}).catch((res)=>{
					console.log(res);
				});
			},
			toRulepage(){//去任务规则页面
				
				//埋点
					commonJs.buriedPoint({
				    access_occurred_type: 260903,//发生访问的【页面】类型
				    access_occurred_type_id: '',//发生访问的【页面】类型ID
				    previous_event_type_obj: '',//【事件】对象类型
				    previous_event_type_obj_id: '',//【事件】对象类型ID
				    previous_content_sort: ''//【事件】事件参数
					});
				setTimeout(()=>{
					window.location.href = 'https://hxsapp_new_webview#' + 'https://app.hxsapp.com/hxsweb/integralRule';
				},300)
			}
		},
		components:{
			preLoading
		}
	}
</script>
<style lang="less" scoped>
	.achieve-container{
		padding-bottom: 25px;
		.plt_15{
			padding: 0 15px;
		}
		.solid{
			margin: 0 15px;
			height: 1px;
			background: rgba(129,141,207,0.10);
		}
		.header{
	 		.head-img{
				width: 80px;
				height: 80px;
				margin: 0 auto;
				margin-top: 15px;
				display: block;
				border-radius: 100%;
	 		}
	 		.name-box{
	 			height: 18px;
	 			text-align: center;
	 			margin-top: 9px;
	 			margin-bottom: 15px;
		 		.name{
		 			span{
			 			height: 18px;
			 			line-height: 18px;
			 			text-align: center;
			 			color:#333;
			 			font-size:16px;
		 			}
		 			.boy{
			 			width: 8px;
			 			height: 13px;
		 				background: url('../assets/images/fh-nan.png') left top no-repeat;
		 				background-size: 100%;
		 				display: inline-block;
		 				margin-left: 3px;
		 			}
		 			.girl{
			 			width: 13px;
			 			height: 13px;
		 				background: url('../assets/images/fh-nv.png') left top no-repeat;
		 				background-size: 100%;
		 				display: inline-block;
		 				margin-left: 3px;
		 			}
		 		}	
	 		}
	 		.fraction{
	 			height: 18px;
	 			line-height: 18px;
	 			text-align: center;
	 			color: #666;
	 			padding-bottom: 30px;
	 			font-size: 14px;
	 			span{
	 				color: #ff6aa9;
	 				font-size: 14px;
	 			}
	 		}
		}
		.main{
			.text{
				padding:0 15px 15px;
				height: 18px;
				.left{
					height: 18px;
					line-height: 18px;
					float: left;
					color: #333;
					font-size: 16px;
				}
				.right{
					height: 18px;
					line-height: 18px;
					float: right;
					color: #D8D8D8;
					font-size: 16px;
				}
			}
			.grade-box{
				position: relative;
				height: 23px;
				margin-top: 18px;
				overflow: hidden;
				.grade{
					width: 33.333%;
					height: 23px;
					position: relative;
					float:left;
					span{
						width: 20px;
						height: 15px;
						background: url(../assets/images/zs.png) left top no-repeat;
						background-size:100%;
						position: absolute;
						left: 0;
						top:0;
					}
					em{
						height: 16px;
						line-height: 16px;
						font-size: 14px;
						color: #333;
						position: absolute;
						left: 0px;
						top:6px;
					}
				}
				.last{
					width: 18px;
					position: absolute;
					right: 0;
					top:0;
				}
			}
			.badge{
				height: 18px;
				line-height: 18px;
				padding: 48px 0 12px 0;
				text-align: center;
				font-size: 16px;
				color: #333333;
			}
			.badge-ling{
				padding: 0 15px 46px;
				div{
					width: 50%;
					float:left;
					padding-top: 15px;
					img{
						width: 80px;
						height: 80px;
						margin: 0 auto;
					}
					em{
						width: 73px;
						height: 32px;
						line-height: 32px;
						font-size:14px;
						color:#666;
						display: block;
						text-align: center;
						margin: 0 auto;
					}
				}
			}
			.scale-box{
				margin-top: 14px;
				background: #818DCF;
				border-radius: 2px;
				margin:20px 15px 0;
				div{
					width: 20%;
					height: 2px;
					background: #ff668c;
					border-radius: 2px;
					position: relative;
					i{
						width: 12px;
						height: 12px;
						background: url(../assets/images/yuan-sp.png) left top no-repeat;
						background-size:100%;
						position: absolute;
						right: -6px;
						top:50%;
						margin-top: -6px;
					}
				}
			}
		}
		.footer{
			a{
				width: 67%;
				height: 46px;
				line-height: 46px;
				font-size: 17px;
				color: #FFFFFF;
				display: block;
				text-align: center;
				margin: 0 auto;
				border-radius: 23px;
				background:-webkit-gradient(linear, left top, right top, from(#FF6E8D), to(#FF68B0));
			}
		}
	}
</style>