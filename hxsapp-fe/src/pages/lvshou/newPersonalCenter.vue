<template>
	<div class="personalCenter-container">
		<div class="head" :class="{'iphoneX-head': isIphoneX, 'android-head': isAndroid}">
			<div class="title" v-if="!isCorrectVersion">
				<span @click="closePage"></span>
				<span>个人中心</span>
				<span @click="toSetting"></span>
			</div>
			<div class="userInfo">
				<div class="img-box">
					<span v-if="userInfoData" :style="{background:'url(' + userInfoData.headImg + ') center center /150% no-repeat'}" @click="toUserInfo"></span>	
					<em :class="LvGradeClass" v-if="false"></em>
				</div>
				<p v-if="userInfoData" >{{ userInfoData.name }}</p>
				<div class="lv-logo" @click="toVipClubPage" v-if="false"><em>会员俱乐部</em></div>
			</div>
		</div>
		<ol class="item-statu"> 
			<li @click="toSmallClassOrder(0)">
				<div>
					<div class="icon">
						<span v-if="listOrderNum && listOrderNum.unpay > 0">{{ listOrderNum.unpay }}</span>
					</div>
					<p>全部订单</p>
				</div>
			</li>
			<li @click="toSmallClassOrder(1)">
				<div>
					<div class="icon">
						<span v-if="listOrderNum && listOrderNum.unpay > 0">{{ listOrderNum.unpay }}</span>
					</div>
					<p>待付款</p>
				</div>
			</li>
			<li @click="toSmallClassOrder(2)">
				<div>
					<div class="icon">
						<span v-if="listOrderNum && listOrderNum.undelivery > 0">{{ listOrderNum.undelivery }}</span>
					</div>
					<p>待发货</p>
				</div>
			</li>
			<li @click="toSmallClassOrder(3)">
				<div>
					<div class="icon">
						<span v-if="listOrderNum && listOrderNum.untake > 0">{{ listOrderNum.untake }}</span>
					</div>
					<p>待收货</p>
				</div>
			</li>
			<li @click="toSmallClassOrder(4)">
				<div class="icon">
					<span v-if="listOrderNum && listOrderNum.completed > 0">{{ listOrderNum.completed }}</span>
				</div>
				<p>已完成</p>
			</li>
		</ol>
		<div class="solid_7"></div>
		<ul class="recordWeight" v-if="weightRecord">
			<li>
				<div class="tit">初始体重</div>
				<div class="weight">
					<span>{{weightRecord.first.weight}}</span>
					<em>KG</em>
				</div>
				<span class="statu" :class="{abnormal: getWeightRecordState(weightRecord.last.label) == 3,normalColor: getWeightRecordState(weightRecord.last.label) == 1}">{{weightRecord.last.label}}</span>
			</li>
			<li>
				<div class="tit">当前体重</div>
				<div class="weight">
					<span>{{weightRecord.last.weight}}<i :class="{top:weightRecord.last.weight>weightRecord.first.weight,down:weightRecord.last.weight<weightRecord.first.weight}"></i></span>
					<em>KG</em>
				</div>
				<span class="statu" :class="{abnormal: getWeightRecordState(weightRecord.last.label) == 3,normalColor: getWeightRecordState(weightRecord.last.label) == 1}">{{weightRecord.last.label}}</span>
			</li>
		</ul>
		<div class="listScheme">
			<ul>
				<li>
					<div class="tit">健康评估</div>
					<div class="imgBox clearfix">
						<img src="../../assets/lvshou/img/firstPlan/center_btn_jiankangcheping.png" alt="" @click="toHealthyEvaluation">
						<img src="../../assets/lvshou/img/firstPlan/center_btn_baogaochaxun.png" alt="" @click="toRelativePage(0)">
					</div>
				</li>
			</ul>
			<ul>
				<li>
					<div class="tit">每日方案</div>
					<div class="imgBox clearfix" style="margin-bottom:10px;">
						<img src="../../assets/lvshou/img/firstPlan/center_btn_food.png" alt="" @click="toRelativePage(1)">
						<img src="../../assets/lvshou/img/firstPlan/center_btn_sport.png" alt="" @click="toRelativePage(2)">
					</div>
					<img src="../../assets/lvshou/img/firstPlan/center_btn_foodsport.png" class="longImg" @click="toFoodAndSportRecord">
				</li>
			</ul>
			<ul>
				<li>
					<div class="tit">测量记录</div>
					<div class="imgBox clearfix">
						<img src="../../assets/lvshou/img/firstPlan/center_btn_shentishuju.png" alt="" @click="toScheduleBody">
						<img src="../../assets/lvshou/img/firstPlan/center_btn_bim.png" alt="" @click="toBodyReport">
					</div>
				</li>
			</ul>
		</div>
		<versionControl :hxsVersion="'3.5.0'"></versionControl>
		<custom v-if="false"></custom>
		<preLoading v-if="!userInfoloadEnd  && !listOrderNum && !LvGradeClass"></preLoading>

	</div>
</template>
<script>

    import axios from 'axios'
	import { Indicator, Toast, Popup} from 'mint-ui';
	import commonJs from '@/util/common.js'
	import preLoading from '@/components/preLoading'
	import custom from '@/components/lvshou/custom'
	import versionControl from '@/components/lvshou/versionControl'

	export default{
		name: 'personalCenter',
		data(){
			return{
				sessToken: null,
				userInfoData: null,//用户信息
				LvGradeClass:null,//会员等级Class
				listOrderNum: null, //各个订单数量
				isIphoneX:false,//判断是否是iphoneX
				isAndroid:false,//判断是否是安卓
				popupVisible: true,//弹窗是否展示控制
				userInfoloadEnd: false, //订单数据是否加载完毕
				isCorrectVersion: false, //判断是否大于3.1.1版本
				weightRecord: null //当天体重记录

			}
		},
		mounted(){
			//隐藏原生的标题栏
			this.setNavibarHide();

			//判断手机系统
			this.mobileSystem();

			//设置sessToken
			this.setSessToken();

			//判断是否登录，没有登录调起登录框
			this.loginApp();

			//获取用户信息
			this.getUserInfo();

			//获取绿瘦会员等级
			// this.getLvshouGrade();

			//获取各个订单数量。
			this.getListOrderNum();

			//获取当天的体重记录
			this.getWeightRecord()
		},
		methods:{
			getUserInfo(){
				axios.get('https://api.hxsapp.com/account/userInfo/getSelfUserInfo',{params:{
					sess_token: this.sessToken
				}}).then((res)=>{
					console.log(res);
					if(res.data.code == 200){
						this.userInfoData = res.data.data;
						let data = res.data.data
						//用户信息
						this.userInfoData = {
							name: commonJs.subStlength(data.nickname),
							headImg: data.head_img,
							userId: data.id
						}
					}
					//延迟1000毫秒，隐藏load页面
					setTimeout(()=>{
						this.userInfoloadEnd = true;
					},1000)
				})
			},
			getLvshouGrade(){
				axios.get('https://api.hxsapp.com/mall/Lsuser/userMember',{params:{
					sess_token: this.sessToken
				}}).then((res)=>{
					if(res.data.code == 200){

						//会员等级对应的css中的class
						let vipGrade = [
							'dm',
							'gift',
							'senior',
							'vip',
							'vvip'
						];

						this.LvGradeClass = vipGrade[res.data.data.level-1];
					}
				})
			},
			getListOrderNum(){//获取各个订单数量。
				axios.get('https://api.hxsapp.com/mall/Lsorder/orderNum',{params:{
					sess_token: this.sessToken
				}}).then((res)=>{
					console.log(res);
					if(res.data.code == 200){
						this.listOrderNum = res.data.data;
					}
				})
			},
			getWeightRecord(){//获取当天的体重记录
                axios.get('https://api.hxsapp.com/slim/weighing/getUserFirstAndLastWeight',{params:{
                    sess_token: this.sessToken
                }}).then((res)=>{
                    if(res.data.code == 200){
                        this.weightRecord = res.data.data;

                        //把体重数据字符串转成数字类型（用于对比）
                        if(this.weightRecord.last.weight)this.weightRecord.last.weight = parseFloat(this.weightRecord.last.weight);
                        if(this.weightRecord.first.weight)this.weightRecord.first.weight = parseFloat(this.weightRecord.first.weight);
                        
                        //没有体重记录 展示--
                        if(!this.weightRecord.first.weight) this.weightRecord.first.weight='--';
                        if(!this.weightRecord.last.weight) this.weightRecord.last.weight='--';
                    }
                });
            },
            hasUserFinishQuestionnaire(type){
                axios.get('https://api.hxsapp.com/slim/Questionnaire/hasUserFinishQuestionnaire',{params:{
                    sess_token: this.sessToken
                }}).then((res)=>{
                    if(res.data.code == 200){
                    	if(has_finish == 1){
	                    	if(type == "1"){//饮食

	                    	}else if(type == "2"){//运动

	                    	}
                    	}else{
							Toast({
							   message: '请先完成健康评测',
							   duration: 1000
							});
                    	}
                    }
                });
            },
			setSessToken(){
				this.sessToken = commonJs.getUrlParam('sess_token');
			},
			mobileSystem(){//判断手机系统
  				let ua = window.navigator.userAgent;
  				this.isIphoneX = new RegExp('iPhone X').test(ua);
  				this.isAndroid = new RegExp('Android').test(ua);
			},
			setNavibarShow(){//显示原生的标题栏
				if(window.location.href.indexOf('sess_token') != -1){
					let appVersion = commonJs.getHxsAppVersion();
					let isTrue = commonJs.compareAppVersion(appVersion, '3.1.1');
					if(isTrue){
						window.location.href = 'https://hxsapp_navi_bar_state?hidden=0';
					}
				}	
			},
			setNavibarHide(){//隐藏原生的标题栏
				if(window.location.href.indexOf('sess_token') != -1){
					let appVersion = commonJs.getHxsAppVersion();
					let isTrue = commonJs.compareAppVersion(appVersion, '3.1.1');
					if(isTrue){
						window.location.href = 'https://hxsapp_navi_bar_state?hidden=1';
					}
				}					
			},
			closePage(){//关闭当前页面
				window.location.href = 'https://hxsapp_close';
			},
			toUserInfo(){//去用户个人信息页面
				let appVersion = commonJs.getHxsAppVersion();
				let isTrue = commonJs.compareAppVersion(appVersion, '3.1.1');
				if(isTrue){
	            	setTimeout(function(){
						window.location.href = 'https://hxsapp_user_setting';
	            	},30);
				}
			},
			toSetting(){//去设置页面
				let appVersion = commonJs.getHxsAppVersion();
				let isTrue = commonJs.compareAppVersion(appVersion, '3.1.1');
				if(isTrue){
	            	setTimeout(function(){
						window.location.href = 'https://hxsapp_setting';
	            	},30);
				}
			},
			toOrderListPage(){//去订单列表页面
				let appVersion = commonJs.getHxsAppVersion();
				let isTrue = commonJs.compareAppVersion(appVersion, '3.1.1');
				if(isTrue){
	            	setTimeout(function(){
						window.location.href = 'https://hxsapp_orderlist?sortype=0';
	            	},30);
				}
			},
			toVipClubPage(){//去绿瘦会员中心页面
				setTimeout(()=>{
					window.location.href = 'https://hxsapp_new_webview#https://app.hxsapp.com/hxsweb/lvshou/vipclub';
				},300);
			},
			toFoodAndSportRecord(){//运动饮食记录
				let appVersion = commonJs.getHxsAppVersion();
				let isTrue = commonJs.compareAppVersion(appVersion, '3.5.0');
				if(isTrue){
	            	setTimeout(function(){
						window.location.href = 'hxsapp://foodAndSportRecord';
	            	},30);
				}
			},
			toBodyReport(){//体脂秤数据
				let appVersion = commonJs.getHxsAppVersion();
				let isTrue = commonJs.compareAppVersion(appVersion, '3.5.0');
				if(isTrue){
	            	setTimeout(function(){
						window.location.href = 'hxsapp://bodyReport';
	            	},30);
				}
			},
			toScheduleBody(){//身体测评
				let appVersion = commonJs.getHxsAppVersion();
				let isTrue = commonJs.compareAppVersion(appVersion, '3.5.0');
				if(isTrue){
	            	setTimeout(function(){
						window.location.href = 'hxsapp://userGirth';
	            	},30);
				}
			},
			toHealthyEvaluation(){//健康测评

				let appVersion = commonJs.getHxsAppVersion();
				let isTrue = commonJs.compareAppVersion(appVersion, '3.5.0');

				//查询是否完成健康评测
                	Indicator.open('查询中');
	                axios.get('https://api.hxsapp.com/slim/Questionnaire/hasUserFinishQuestionnaire',{params:{
	                    sess_token: this.sessToken
	                }}).then((res)=>{
	                	if(res.data.code == 200){
	                		if(res.data.data.has_finish == 1){//完成健康评测
			                    Toast({
			                       message: '你已完成健康评测，请查看方案',
			                       duration: 1000
			                    });
			                    
			                    //上线删除
			            //         setTimeout(()=>{
									// window.location.href = 'https://hxsapp_new_webview#https://app.hxsapp.com/hxsweb/lvshou/healthyEvaluation/1';
			            //         },1000);

	                		}else{//没完成健康评测
								if(isTrue){
					            	setTimeout(function(){
										window.location.href = 'https://hxsapp_new_webview#https://app.hxsapp.com/hxsweb/lvshou/healthyEvaluation/1';
					            	},30);
								}
	                		}
	                	}
                    	Indicator.close();
	                })
			},
			toRelativePage(key,healthyEvaluatio){//身体测评
				let appVersion = commonJs.getHxsAppVersion();
				let isTrue = commonJs.compareAppVersion(appVersion, '3.5.0');
				var arr = [
					{
						url:'https://app.hxsapp.com/hxsweb/lvshou/healthyEvaluationReport',
						value:'报告查询'
					},
					{
						url:'https://app.hxsapp.com/hxsweb/lvshou/dietPlan',
						value:'饮食方案' 
					},
					{
						url:'https://app.hxsapp.com/hxsweb/lvshou/sportsPlan',
						value:'运动方案'
					}
				];
				if(isTrue){
					//查询是否完成健康评测
                	Indicator.open('查询中');
	                axios.get('https://api.hxsapp.com/slim/Questionnaire/hasUserFinishQuestionnaire',{params:{
	                    sess_token: this.sessToken
	                }}).then((res)=>{
	                	if(res.data.code == 200){
	                		if(res.data.data.has_finish == 1){//完成健康评测
								window.location.href = 'https://hxsapp_new_webview#' + arr[key].url;
	                		}else{//没完成健康评测
			                    Toast({
			                       message: '请先完成健康评测，才可以有对应的' + arr[key].value,
			                       duration: 1000
			                    });
	                		}
	                	}
                    	Indicator.close();
	                })
				}
			},
			toSmallClassOrder(index){
				
				//判断版本
				let appVersion = commonJs.getHxsAppVersion();
				let isTrue = commonJs.compareAppVersion(appVersion, '3.1.1');
				if(!isTrue) return;

				//0全部订单 1待付款	 2待发货 3待收货 4已完成
				switch(index){
					case(0):
						window.location.href = 'https://hxsapp_orderlist?sortype=0';
						break;
					case(1):
						window.location.href = 'https://hxsapp_orderlist?sortype=1';
						break;
					case(2):
						window.location.href = 'https://hxsapp_orderlist?sortype=2';
						break;
					case(3):
						window.location.href = 'https://hxsapp_orderlist?sortype=3';
						break;
					case(4):
						window.location.href = 'https://hxsapp_orderlist?sortype=4';
						break;
				}
			},
			loginApp(){//调起登录框
				if(!this.sessToken || this.sessToken.length < 5){
					window.location.href = 'https://hxsapp_showloginpage';
				}
			},
			getWeightRecordState(key){
				switch(key){
					case('低体重'):
						return 0;
						break;
					case('体重正常'):
						return 1;
						break;
					case('超重'):
						return 3;
						break;
					case('肥胖'):
						return 3;
						break;
				}
			}
		},
		components:{
			custom,
			preLoading,
			versionControl
		},
        beforeDestroy(){
        	this.setNavibarShow();
        }
	}
</script>
<style scoped lang="less">
	.personalCenter-container{
		.head{
			width: 100%;
			height: 171px;
			padding-top: 32px;
			background: url(../../assets/lvshou/img/center_bg.png) left top no-repeat;
			background-size: 100% 100%;
			position: relative;
			.title{
				height: 22px;
				position: relative;
				padding:0 13px;
				span:nth-of-type(1){
					width: 11px;
					height:20px;
					float:left;
					background:url(../../assets/lvshou/img/fanhui.png) left top no-repeat;
					background-size: 100%;
				}
				span:nth-of-type(2){
					width: 120px;
					height:22px;
					line-height: 22px;
					color: #fff;
					font-size: 20px;
					text-align: center;
					position: absolute;
					left: 50%;
					margin-left: -60px;
				}
				span:nth-of-type(3){
					width: 25px;
					height:25px;
					float:right;
					background:url(../../assets/lvshou/img/personCenter_setting.png) left top no-repeat;
					background-size: 100%;
				}
			}
			.userInfo{
				margin-top: 20px;
				.img-box{
					width:100px;
					margin:0 auto;
					position: relative;
					span{
						width:70px;
						height: 70px;
						border-radius: 50%;
						display: block;
						margin:0 auto;
					}
					em{
						width: 27px;
						height: 27px;
						position: absolute;
						right: 15px;
						bottom: -4px;
						&.dm{
							background: url(../../assets/lvshou/img/grade/center_icon_vip_disabled.png) center center no-repeat;
							background-size: 100%;
						}
						&.gift{
							background: url(../../assets/lvshou/img/grade/center_icon_dm_disbled.png) center center no-repeat;
							background-size: 100%;
						}
						&.senior{
							background: url(../../assets/lvshou/img/grade/center_icon_gift_disbled.png) center center no-repeat;
							background-size: 100%;
						}
						&.vip{
							background: url(../../assets/lvshou/img/grade/center_icon_senior_disbled.png) center center no-repeat;
							background-size: 100%;
						}
						&.vvip{
							background: url(../../assets/lvshou/img/grade/center_icon_vvip_disbled.png) center center no-repeat;
							background-size: 100%;
						}
					}
				}
				p{
					height: 22px;
					line-height: 22px;
					color: #fff;
					font-size: 16px;
					text-align: center;
					margin-top: 8px;
				}
				.lv-logo{
					width: 100px;
					height: 32px;
					background: url(../../assets/lvshou/img/center_btn_huiyuanjulebu.png) center center no-repeat;
					background-size: 100%;
					position: absolute;
					top: 71px;
					right: 13px;
					em{
						line-height: 15px;
						font-size: 13px;
						color: #fff;
						position: absolute;
						left: 24px;
						top:11px;
					}
				}
			}
			&.iphoneX-head{
				padding-top: 60px;
				.lv-logo{
					top:99px;
				}
			}
			&.android-head{
				padding-top: 23px;
				.lv-logo{
					top:63px;
				}
			}
		}
		.item-statu{
				display: flex;
				display: -webkit-flex;
				justify-content: space-between;
				-webkit-justify-content: space-between;
				padding:0 20px;
			li{	
				padding-top: 21px;
				padding-bottom: 10px;
				.icon{
					width: 26px;
					height:26px;
					position: relative;
					margin:0 auto;
					margin-bottom: 10px;
					span{
						// padding:1px 5px;
						width: 17px;
						height: 17px;
						line-height: 17px;
						color:#fff;
						font-size:10px;
						border-radius: 50%;
						opacity: 0.9;
						background: #F55449;
						position: absolute;
						right: -6px;
						top: -6px;
						text-align: center;
					}
				}
				p{
					height: 18px;
					line-height: 18px;
					font-size: 13px;
					text-align: center;
					color: #636363;
				}
			}
			li:nth-of-type(1){
				.icon{
					background: url(../../assets/lvshou/img/gerenzhongxin_icon_daipingjia.png) left top no-repeat;
					background-size:100%;
				}
			}
			li:nth-of-type(2){
				.icon{
					background: url(../../assets/lvshou/img/center_icon_daifukuan.png) left top no-repeat;
					background-size:100%;
				}
			}
			li:nth-of-type(3){
				.icon{
					background: url(../../assets/lvshou/img/center_icon_daifahuo.png) left top no-repeat;
					background-size:100%;
				}
			}
			li:nth-of-type(4){
				.icon{
					width: 31px;
					background: url(../../assets/lvshou/img/daishouhuo.png) left top no-repeat;
					background-size:100%;
				}
			}
			li:nth-of-type(5){
				.icon{
					background: url(../../assets/lvshou/img/center_icon_daipingjia.png) left top no-repeat;
					background-size:100%;
				}
			}
		}
		.solid_7{
			height: 7px;
			background: #F5F5F8;
		}
		.recordWeight{
			li{
				padding: 16px 13px 10px;
				position: relative;
				border-bottom: solid 7px #F5F5F8;;
				.tit{
					height: 18px;
					line-height: 18px;
					font-size: 13px;
					color: #999999; 
				}
				.weight{
					height: 35px;
					span{
						height: 35px;
						line-height: 35px;
						font-size: 25px;
						color: #333333;
						float:left;
						padding-right: 13px;
						margin-bottom:2px;
						position: relative;
						i{
							width: 10px;
							height:8px;
							position: absolute;
							right: 2px;
							top: 6px;
							&.top{
								background: url(../../assets/lvshou/img/icon_jiantou.png) left top no-repeat;
								background-size:100%;
								-webkit-transform:rotate(180deg)
							}
							&.down{
								background: url(../../assets/lvshou/img/icon_jiantou.png) left top no-repeat;
								background-size:100%;
							}
						}
					}
					em{
						height: 21px;
						line-height: 21px;
						color:#666;
						font-size:15px;
						float:left;
						margin-top: 8px;
					}
				}
				.statu{
					height: 18px;
					line-height: 18px;
					position: absolute;
					right:13px;
					top:50%;
					margin-top:-9px;
					color: #4DA1FF;
					font-size: 13px;
				}
				.abnormal{
					color: #FF6D90;
				}
				.normalColor{
					color: #333333;
				}
			}
		}
		.listScheme{
			padding-bottom: 30px;
			ul{
				li{
					padding:0 4%;
					.tit{
						height: 25px;
						line-height: 25px;
						padding-top: 8px;
						padding-bottom: 3px;
						font-size: 17px;
						color: #333333;
						letter-spacing: 5px;
						text-align: center;
					}
					.imgBox{
						img{
							width: 49%;
							float:left;
						}
						img:nth-of-type(2){
							margin-left: 2%;
						};
					}
					.longImg{
						width: 100%;
					}
				}
			}
		}
	}
</style>