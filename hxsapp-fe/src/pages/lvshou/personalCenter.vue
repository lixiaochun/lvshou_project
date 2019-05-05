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
					<p>待付款</p>
				</div>
			</li>
			<li @click="toSmallClassOrder(1)">
				<div>
					<div class="icon">
						<span v-if="listOrderNum && listOrderNum.undelivery > 0">{{ listOrderNum.undelivery }}</span>
					</div>
					<p>待发货</p>
				</div>
			</li>
			<li @click="toSmallClassOrder(2)">
				<div>
					<div class="icon">
						<span v-if="listOrderNum && listOrderNum.untake > 0">{{ listOrderNum.untake }}</span>
					</div>
					<p>待收货</p>
				</div>
			</li>
			<li @click="toSmallClassOrder(3)">
				<div class="icon">
					<span v-if="listOrderNum && listOrderNum.completed > 0">{{ listOrderNum.completed }}</span>
				</div>
				<p>已完成</p>
			</li>
		</ol>
		<div class="my-order">
			<div class="title" @click="toOrderListPage">
				<em>我的订单</em>
				<span></span>
			</div>
			<ul v-if="haveListOrder">
				<li v-for="(item, index) in listOrderData" @click="jumpOrderInfo(index)">
					<div class="imgBox">
						<!-- <img src="../../assets/lvshou/img/order_img_big.png" alt=""> -->
						<img :src="item.OrderDetail[0].ImgList" alt="">
					</div>
					<div class="info">
						<em>订单: {{item.assemblingOrderNo}}</em>
						<em>¥ {{item.Amount}}</em>
						<em>{{ item.OrderDate }}</em>
					</div>
					<span class="statu">{{ item.OrderStatusCode }}</span>
				</li>
			</ul>
			<div class="noListOrder" v-if="!haveListOrder"></div>
			<div class="noListOrderText" v-if="!haveListOrder">暂无订单信息</div>
			<div class="layerTip" v-if="isCorrectVersion">
				<div class="rightsInterest">
					<span class="closeBtn"></span>
					<div class="rightsInterestTitle">好享瘦APP版本过低</div>
					<div class="textBox">
						<div class="cont">更新即刻查看更多精彩</div>
					</div>
					<a href="https://hxsapp_close" class="determine">确定</a>
				</div>
			</div>
		</div>
		<custom></custom>
		<!-- <preLoading v-if="!userInfoloadEnd && !listOrderData && !listOrderNum && !LvGradeClass"></preLoading> -->
		<preLoading v-if="!userInfoloadEnd && !listOrderData && !listOrderNum"></preLoading>
	</div>
</template>
<script>

    import axios from 'axios'
    import { Popup } from 'mint-ui';
	import commonJs from '@/util/common.js'
	import preLoading from '@/components/preLoading'
	import custom from '@/components/lvshou/custom'

	export default{
		name: 'personalCenter',
		data(){
			return{
				sessToken: null,
				userInfoData: null,//用户信息
				LvGradeClass:null,//会员等级Class
				listOrderData:null,//我的订单数据
				haveListOrder: true,//是否有订单
				listOrderNum: null, //各个订单数量
				isIphoneX:false,//判断是否是iphoneX
				isAndroid:false,//判断是否是安卓
				popupVisible: true,//弹窗是否展示控制
				userInfoloadEnd: false, //订单数据是否加载完毕
				isCorrectVersion: false //判断是否大于3.1.1版本
			}
		},
		mounted(){
			//隐藏原生的标题栏
			this.setNavibarHide();

			//判断是否大于3.1.1，小于提示升级app版本框
			this.matchingVersion();

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

			//获取5个订单
			this.getListOrder();

			//获取各个订单数量。
			this.getListOrderNum();
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
			getListOrder(){
				axios.get('https://api.hxsapp.com/mall/Lsorder/getOrderList',{params:{
					sess_token: this.sessToken,
					OrderType: 0,
					ADSource: ''
				}}).then((res)=>{
					if(res.data.code == 200){
						this.listOrderData = [];

						//推5个订单进listOrderData
						let data = res.data.data;
						let viewWidth = document.documentElement.clientWidth < 360; //用于手机屏幕小于360判断, 订单号截取

						for(let i = 0; i < data.length;i++){
							if(i <= 4){
								if(!viewWidth){
									//屏幕大于360 订单号截取
									data[i].assemblingOrderNo = data[i].OrderNo;
									this.listOrderData.push(data[i]);
								}else{
									//屏幕小于360 订单号截取
									data[i].assemblingOrderNo = commonJs.subStlength(data[i].OrderNo,8,6);
									this.listOrderData.push(data[i]);
								}
							}else{
								return;
							}
						}

						//判断[我的订单]是否大于1条，用于展示没有数据图表
						if(this.listOrderData.length <= 0) this.haveListOrder = false;

					}else{
						this.haveListOrder = false;
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
			setSessToken(){
				this.sessToken = commonJs.getUrlParam('sess_token');
			},
			matchingVersion(){
				let appVersion = commonJs.getHxsAppVersion();
				let isTrue = commonJs.compareAppVersion(appVersion, '3.1.1');
				if(!isTrue){
					this.isCorrectVersion = true;
				}
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
			jumpOrderInfo(index){//去订单详情页面
				window.location.href = 'https://hxsapp_order_detail?id=' + this.listOrderData[index].OrderNo + '&type=' + this.listOrderData[index].platform;
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
			toSetting(){
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
			toSmallClassOrder(index){
				
				//判断版本
				let appVersion = commonJs.getHxsAppVersion();
				let isTrue = commonJs.compareAppVersion(appVersion, '3.1.1');
				if(!isTrue) return;

				//1	待付款	 2待发货 3待收货 4已完成
				switch(index){
					case(0):
						window.location.href = 'https://hxsapp_orderlist?sortype=1';
						break;
					case(1):
						window.location.href = 'https://hxsapp_orderlist?sortype=2';
						break;
					case(2):
						window.location.href = 'https://hxsapp_orderlist?sortype=3';
						break;
					case(3):
						window.location.href = 'https://hxsapp_orderlist?sortype=4';
						break;
				}
			},
			loginApp(){//调起登录框
				if(!this.sessToken || this.sessToken.length < 5){
					window.location.href = 'https://hxsapp_showloginpage';
				}
			}
		},
		components:{
			custom,
			preLoading
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
					background: url(../../assets/lvshou/img/center_icon_daifukuan.png) left top no-repeat;
					background-size:100%;
				}
			}
			li:nth-of-type(2){
				.icon{
					background: url(../../assets/lvshou/img/center_icon_daifahuo.png) left top no-repeat;
					background-size:100%;
				}
			}
			li:nth-of-type(3){
				.icon{
					width: 31px;
					background: url(../../assets/lvshou/img/daishouhuo.png) left top no-repeat;
					background-size:100%;
				}
			}
			li:nth-of-type(4){
				.icon{
					background: url(../../assets/lvshou/img/center_icon_daipingjia.png) left top no-repeat;
					background-size:100%;
				}
			}
		}
		.my-order{
			padding-bottom: 30px;
			.title{
				padding:0 13px;
				height: 30px;
				background: #F5F5F8;
				em{
					height: 30px;
					line-height: 30px;
					font-size: 17px;
					float: left;
					color: #3E3E3E;
				}
				span{
					width: 8px;
					height: 14px;
					margin-top: 8px;
					float: right;
					background:url(../../assets/lvshou/img/return-blue.png) left top no-repeat;
					background-size:100%;
				}
			}
			ul{
				li{
					height: 72px;
					padding:17px 13px;
					border-bottom:7px solid #F5F5F8;
					.imgBox{
						width:72px;
						height: 72px;
						position: relative;
						float: left;
						margin-right: 13px;
						background: #F5F5F8;
						img{
							width:72px;
							height: 72px;
						}
					}
					.info{
						float: left;
						em{
							display: block;
						}
						em:nth-of-type(1){
							height: 21px;
							line-height: 21px;
							color: #636363;
							font-size:15px;
							margin-top: 4px;
						}
						em:nth-of-type(2){
							height: 18px;
							line-height: 18px;
							color: #636363;
							font-size:13px;
							margin-top: 3px;
						}
						em:nth-of-type(3){
							height: 18px;
							line-height: 18px;
							color: #999;
							font-size:13px;
							margin-top: 10px;
						}
					}
					.statu{
						height: 21px;
						line-height: 21px;
						font-size: 13px;
						float: right;
						color: #FF668C;
						margin-top: 4px;
					}
				}
			}
			.noListOrder{
				width:120px;
				height: 120px;
				margin:0 auto;
				margin-top: 30px;
				background:url(../../assets/lvshou/img/que_kong.png) left top no-repeat;
				background-size:100%;
			}
			.noListOrderText{
				width:100%;
				height: 20px;
				line-height: 20px;
				font-size: 17px;
				text-align:center;
				margin-top: 20px;
				color: #333;
			}
		}
		.layerTip{
			width:100%;
			height: 100%;
			background: rgba(0,0,0,0.4);
			position: fixed;
			left: 0; 
			top:0;
			z-index: 99;
			.rightsInterest{
				width: 60%;
				padding-top: 20px;
				background: #fff;
				margin:0 auto;
				border-radius: 7px;
				position: absolute;
				left: 50%;
				top:35%;
				margin-left: -30%;
				.closeBtn{
					width: 35px;
					height: 35px;
					position: absolute;
					right: 32px;
					top: -10px;
					background: url(../../assets/lvshou/img/vip_explain_close.png) left top no-repeat;
					background-size:100%;
					display: none;
				}
				.rightsInterestTitle{
					height: 30px;
					text-align: center;
					color: #333;
					padding-top: 5px;
				}
				.textBox{
					min-height: 45px;
					max-height: 200px;
					overflow-y: scroll;
					-webkit-overflow-scrolling: touch;
					overflow-x: hidden;
					.cont{
						line-height: 24px;
						color: #333;
						font-size: 14px;
						text-align: center;
					}
				}
				.determine{
					width: 100%;
					height: 40px;
					line-height: 40px;
					text-align: center;		
					background: #ff68ac;
					color: #fff;
					font-size: 18px;
					border-bottom-left-radius: 7px;
					border-bottom-right-radius: 7px;
					display: block;
				}
			}
		}
	}
</style>