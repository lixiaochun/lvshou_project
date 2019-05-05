<template>
	<div class="counselors-container" v-if="adviserInfo.length>0" @click="jumpPersonalPage">
		<div class="counselors-title">
			指导顾问
		</div>
		<div class="counselors-content clearfix">
			<div class="serviceNum">已服务{{adviserInfo[0].service_num}}人</div>
			<div class="top clearfix">
				<div class="img-box">
          <div class="adv-img">
            <img :src="adviserInfo[0].head_img" alt="">
          </div>
          <!-- <span :style="{background:'url(' + + ') center center no-repeat',backgroundSize:'160%'}" ></span> -->
					<em></em>
				</div>
				<div class="msg clearfix">
					<div class="name">
						<span>{{intercept(adviserInfo[0].nickname)}}</span>
						<em :class="{girl:adviserInfo[0].sex == 0}"></em>
					</div>
					<div class="list-achieve">
						<div class="list-medal clearfix">
							<em v-for="item in adviserInfo[0].medal" :key="item" :style="{background:'url(' + item + ') center center no-repeat',backgroundSize:'100%'}"></em>
						</div>
					</div>
					<div class="list-Star clearfix">
						<em v-for="item in starFn(adviserInfo[0].star)" :class="{half:item == 0.5, full: item == 1}"></em>
						<span>({{adviserInfo[0].score}})</span>
					</div>
				</div>
			</div>
			<div class="botton">
				<p class="text">{{intercept(adviserInfo[0].descr,30,25)}}</p>
				<ul class="clearfix">
					<li v-for="item in adviserInfo[0].impression" :key="item">{{ item }}</li>
				</ul>
			</div>
		</div>
	</div>
</template>
<script>
	import commonJs from '@/util/common.js'
	export default{
		data(){
			return{

			}
		},
		props:{
			adviserInfo:{
				type:Array,
				require: true
			}
		},
		mounted(){
		},
		methods:{
			jumpPersonalPage(){
				if(commonJs.isApp()){//判断是否在app
					if(commonJs.isLogin()){//如果在app，判断是否登录
						//跳转个人主页
      					window.location.href = 'https://hxsapp_user_info#' + this.adviserInfo[0].user_id;
					}else{
						//没有登录调起登录框
						commonJs.h5CallAppAction.hxsapp_showloginpage();
					}
				}else{
	                let inviteCode = commonJs.getUrlParam('inviteCode') || '';
					window.location.href = 'https://app.hxsapp.com/hxsweb/personalHome/'+this.adviserInfo[0].user_id + '?inviteCode=' + inviteCode;
				}
			},
            intercept(str,max,min){//个人简介过长截短
            	return commonJs.subStlength(str,max,min);
            },
			starFn(nun){//函数待优化
				//业务规则详看3.3.0版本 b-1_3_顾问
				let starNun = parseFloat(nun);;
				var startArr = [];

		        // if( n <= 1.2 ){
		        //   starNun = 1;
		        // }else if( n <= 1.3 && n <=1.7){
		        //   starNun = 1.5;
		        // }else if(n>= 1.8 && n <=2.2){
		        //   starNun = 2;
		        // }else if(n>= 2.3 && n <=2.7){
		        //   starNun = 2.5;
		        // }else if(n>= 2.8 && n <=3.2){
		        //   starNun = 3;
		        // }else if(n >=3.3 && n <=3.7){
		        //   starNun = 3.5;
		        // }else if(n >=3.8 && n <= 4.2){
		        //   starNun = 4;
		        // }else if(n >=4.3 && n <= 4.7){
		        //   starNun = 4.5;
		        // }else if(n>= 4.8 && n <= 5){
		        //   starNun = 5;
		        // }

				for(var i = 0; i < 5; i++){
					if(starNun-i > 0.5){
						startArr.push(1);
					}else if(starNun-i == 0.5){
						startArr.push(0.5);
					}else if(starNun-i <= 0){
						startArr.push(0);
					}
				}
				return startArr;
			}
		}
	}
</script>
<style scoped lang="less">
	.counselors-container{
		// opacity:0.94;
		border-radius: 10px ;
		.counselors-title{
			height:18px;
			font-size:13px;
			color:rgba(153,153,153,1);
			line-height:18px;
			padding: 15px 0 15px 15px;
		}
		.counselors-content{
			width: 96%;
			margin:0 auto;
			background:rgba(255,255,255,1);
			box-shadow: 0px 0px 19px 0px rgba(78,79,109,0.14);
			position: relative;
			border-radius: 5px;
			.serviceNum{
				width: 70px;
				height:20px;
				line-height:20px;
				padding: 2px 8px 0;
				font-size:10px;
				text-align: center;
				color:rgba(253,253,253,1);
				border-radius: 10px 0 0 10px;
				background:#ff80a6;
				// background: url(../assets/images/diaryDetail/B_bg_fw.png) left top no-repeat;
				background-size:100% 100%;
				position: absolute;
				right: 0;
				top:10px;
				overflow: hidden;
			}
			.top{
				height: 60px;
				padding-top: 10px;
				position: relative;
				.img-box{
					position: relative;
					float: left;
          margin:0 10px;
          .adv-img{
            width: 60px;
            height: 60px;
            overflow: hidden;
            border-radius: 50%;
            img{
              width: 100%;
              min-height: 60px;
            }
          }
					em{
						width: 18px;
						height: 18px;
						background: url(../assets/images/F_icon_guwen.png) left top no-repeat;
						background-size: 100%;
						position: absolute;
						right: -2px;
						bottom: 0;
					}
				}
				.msg{
					float: left;
					margin-top: 4px;
					.name{
						height:21px;
						margin-bottom: 12px;
						span{
							height:21px;
							font-size:15px;
							color:rgba(51,51,51,1);
							line-height:21px;
							float:left;
							margin-right: 3px;
						}
						em{
							width: 15px;
							height: 15px;
							background: url(../assets/images/B_icon_boy.png) left top no-repeat;
							background-size: 100%;
							float:left;
							margin-top: 4px;
							&.girl{
								background: url(../assets/images/B_icon_girl.png) left top no-repeat;
								background-size: 100%;
							}
						}
					}
					.list-achieve{
						width: 100%;
						height: 20px;
						.list-medal{
							float: left;
							em{
								width: 20px;
								height: 20px;
								float: left;
								margin-right: 5px;
							}
						}
					}
				}
				.list-Star{
					margin-top: 10px;
					position: absolute;
					right: 0;
					bottom:0;
					em{
						width: 10px;
						height: 10px;
						float: left;
						margin-right: 3px;
						background: url(../assets/images/diaryDetail/B_icon_dstar.png) left top no-repeat;
						background-size: 100%;
						&.full {
							background: url(../assets/images/diaryDetail/F_icon_bys.png) left top no-repeat;
							background-size: 100%;
						}
						background-size: 100%;
						&.half{
							background: url(../assets/images/diaryDetail/F_icon_hbys.png) left top no-repeat;
							background-size: 100%;
						}
					}
					span{
						height:11px;
						font-size:11px;
						color:rgba(153,153,153,1);
						line-height:11px;
						float: left;
						margin-right: 5px;
					}
				}
			}
			.botton{
				padding-left: 80px;
				margin-top: 10px;
				.text{
					border-top: rgba(234,237,255,1) solid 1px;
					padding-top: 10px;
					font-size:13px;
					color:rgba(153,153,153,1);
					line-height:18px;
					margin-bottom: 10px;
				}
				ul{
					padding-bottom: 15px;
					li{
						padding:5px;
						background:rgba(241,241,248,1);
						border-radius: 2px;
						float:left;
						margin-right: 5px;
						font-size: 11px;
						color:rgba(129,141,207,1);
						margin-bottom:5px;
					}
				}
			}
		}
	}
</style>
