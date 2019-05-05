<template>
	<div class="shopDetailContainer" :class="{shopDetailContainerActiveClass : popupVisible}">
		<div :style="popupVisible? shopDetailContainerActive: windowScrollTopFn()">
	    	<mt-swipe :auto="3000">
				<mt-swipe-item v-for="(item,index) in tabImgSrc" :key="index" >
					<img :src="item" />
				</mt-swipe-item>
			</mt-swipe>
			<div class="ware">
				<p>{{ware.title}}</p>
				<!-- <div class="intro">{{ware.LightPoints}}</div> -->
				<div class="ware-price"><span>￥</span>{{ ware.price }}</div>
				<div class="ware-mail">
					<em>运费：0.0</em>
					<!-- <em>已售:12</em> -->
				</div>
			</div>
			<div class="ware-content">
				<div class="title clearfix">
					<div>
						<span></span>
						<span>商品详情</span>
						<span></span>
					</div>
				</div>
				<div class="ware-info" v-html="ware.detail"></div>
			</div>
			<div class="shop-bar" v-if="!downHxsShow" :class="{'iphoneX-shop-bar': isiPhoneX}">
				<div class="service small-bar" @click="openIm">
					<span></span>
					<em>客服</em>
				</div>
				<div class="cart small-bar" @click="toShopCar">
					<span><i v-if="shopCarNumber">{{ shopCarNumber }}</i></span>
					<em>购物车</em>
				</div>
				<div class="join" @click="toBuy()">加入购物车</div>
				<div class="shop" @click="toBuy('buyNow')">立即购买</div>
			</div>
			<a href="javascript:;" class="bottom-bar seat" v-if="!downHxsShow"></a>
			<down-hxs v-if="downHxsShow"></down-hxs>
			<mt-popup v-model="popupVisible" position="bottom" @touchmove.prevent>
				<div class="to-bug" @touchmove.prevent>
					<em class="close" @click="closePop"></em>
					<div class="info">
						<div class="img-box">
							<img v-if="ware.wareInfo" :src="ware.wareInfo[wareIndex].images[0]">
						</div>
						<div class="design">
							<span v-if="disorderPrice"><em>￥</em>{{disorderPrice[wareIndex]}}</span>
							<span v-if="ware.wareInfo">已选{{ ware.wareInfo[wareIndex].propertys }}{{ wareNumber }}件</span>
						</div>
					</div>
					<div class="border-soild"></div>
					<div class="choice-color">
						<!-- <span>颜色</span> -->
						<div class="pattern clearfix">
							<a href="javascript:;" :key="index" v-for="(value, index) in ware.wareInfo" 
							@touchstart="selected(index)" 
							:class="{active:wareIndex == index}">
								{{ value.propertys }}
							</a>
						</div>
					</div>
					<div class="border-soild"></div>
					<div class="choice-number clearfix">
						<span>数量</span>
						<div class="number clearfix" @touchmove.prevent>
							<em @touchstart.prevent="wareReduce" class="reduce" @touchmove.prevent @touchend.prevent></em>
							<span>{{ wareNumber }}</span> 
							<em @touchstart.prevent="wareIncrease" class="increase" @touchmove.prevent  @touchend.prevent></em>
						</div>
					</div>
				</div>
				<a href="javascript:;" class="bottom-bar yellow" @click="submit">确认</a>
			</mt-popup>
		</div>
	</div>
</template>
<script>

	// import Vue from 'vue'
	import axios from 'axios'
	import { Toast } from 'mint-ui';
	import common from '@/util/common.js'
	import Down from '@/components/down'

	export default {
		name: 'showDetail',
		data(){
			return {
				popupVisible: false, //pop show/hide
				produceID: null,//购买商品id
				mallNumber: 1, //购买商品数量
				beforeShopCarNumber:1,//加入购物车商品数量
				wareNumber:1,
				patternIndex: 0,//默认商品选中的规格
				disorderPrice:null,//价格下定单选规格使用
				downHxsShow:false,//下载好享瘦是否出现
				tabImgSrc:null, //轮播图 地址
				sessToken:'',
				isShopCarWare: true,
				// isOutStock:null,商品是否缺货
				shopCarNumber: null,
				shopDetailContainerActive:null,
				shopDetailContainerActiveNone: null,
				windowScrollTop: null,
				ware:{
					title: null,
					detail:null,
					price:null,
					wareInfo:null
				},
				shopCarproduceID:null,
				shopPatternIndex: 0,
				wareIndex: 0,
				isiPhoneX: null
			}
		},
		components:{
			'down-hxs': Down
		},
		mounted(){
			document.title = '商品详情';

			//判断是否是iphoneX
			this.isiPhoneXFn();

			var _this = this;
			var shareContent = null;
			let routeParams = this.$route.params;
			var wareType = routeParams.id;
			var wareInfoParam = {
				type: wareType
			}
			var locationSearch = window.location.href.split('?');
			this.sessToken = common.getUrlParam('sess_token', locationSearch[1]);

			//获取购物车数量
			this.getShopCar();

			//请求商品详情
			axios.get('https://api.hxsapp.com/mall/Goods/getGoodsList',{params:wareInfoParam}).then( (res)=> {
				console.log(res);
				var data = res.data.data.list;
				var priceNumber = [];//排序之后商品价格

				this.ware.detail = data[0].PartContent;
				this.ware.title = data[0].Model;
				this.ware.wareInfo = []; //整合商品信息(商品名称,id,规格)
				this.disorderPrice = [];//商品价格

				for(var i = 0; i < data.length; i++){
					this.ware.wareInfo.push({
						id: data[i].Produce_ID,
						model: data[i].Model,
						propertys: data[i].Propertys,
						images: data[i].img
					});

					priceNumber.push(parseFloat(data[i].PresentPrice));
					this.disorderPrice.push(parseFloat(data[i].PresentPrice));
				}
				this.tabImgSrc = this.ware.wareInfo[0].images;
				priceNumber.sort((a,b) => {return a - b});

				//商品详情显示的价格
				this.ware.price = priceNumber[0] == priceNumber[priceNumber.length-1] ? priceNumber[0] : priceNumber[0] + '~' + priceNumber[priceNumber.length-1];
				this.produceID = this.ware.wareInfo[0].id;//默认选中第一个商品id
				//_this.isOutStock = data.IsOutStock;商品是否缺货

	            shareContent = [
	                encodeURIComponent(this.ware.wareInfo[0].model),
	                common.config.prefixUrl + 'shopDetail/' + wareType,
	                this.ware.wareInfo[0].images[0],
	                encodeURIComponent(this.ware.wareInfo[0].model),
	                '',
	                // this.produceID,
	                7,
	                '',
	                '',
	                ''
	            ].join("#");
	            
	            //发送客户端分享参数
	            if(window.location.href.indexOf('sess_token') != -1){

	            	window.hxsapp_visible_share_btn_mar = function(){
			            //分享埋点
									common.buriedPoint({
										access_occurred_type: 300313,//发生访问的【页面】类型
										access_occurred_type_id: '',//发生访问的【页面】类型ID
										previous_event_type_obj: '',//【事件】对象类型
										previous_event_type_obj_id: wareType,//【事件】对象类型ID
										previous_content_sort: ''//【事件】事件参数
									});
	            	};

	            	window.location.href = 'https://hxsapp_visible_share_btn#' + shareContent;
	            }else{
	            	this.downHxsShow = true;
	            }

				//发送微信二次分享参数
           		common.outSideShare({
           			title: _this.ware.wareInfo[0].model,
           			desc: _this.ware.wareInfo[0].model,
           			link: common.config.prefixUrl + 'shopDetail/' + wareType,
           			img: _this.ware.wareInfo[0].images[0]
           		});
           		
				// if(!this.sessToken || this.sessToken.length > 5) document.title = _this.ware.wareInfo[0].model;

				//埋点
					common.buriedPoint({
				    access_occurred_type: 130201,//发生访问的【页面】类型
				    access_occurred_type_id: wareType,//发生访问的【页面】类型ID
				    previous_event_type_obj: '',//【事件】对象类型
				    previous_event_type_obj_id: '',//【事件】对象类型ID
				    previous_content_sort: ''//【事件】事件参数
					});
			})
		},
		methods:{
			//商品增加
			wareReduce(){
				var _this = this;
				if(!this.isShopCarWare){

					this.mallNumber = this.mallNumber <= 1 ? 1 : -- this.mallNumber;
					this.wareNumber = this.mallNumber;

				}else{

					this.beforeShopCarNumber = this.beforeShopCarNumber <= 1 ? 1 : -- this.beforeShopCarNumber;
					this.wareNumber = this.beforeShopCarNumber;

				}

				//埋点
	            common.buriedPoint({
				    access_occurred_type: 220607,//发生访问的【页面】类型
				    access_occurred_type_id: _this.ware.wareInfo[this.shopPatternIndex].id,//发生访问的【页面】类型ID
				    previous_event_type_obj: '',//【事件】对象类型
				    previous_event_type_obj_id: '',//【事件】对象类型ID
				    previous_content_sort: ''//【事件】事件参数
	            });

				return false;
			},
			//商品增加
			wareIncrease(){
				var _this = this;
				if(!this.isShopCarWare){

					this.mallNumber = this.mallNumber >= 99 ? 99 : ++ this.mallNumber;
					this.wareNumber = this.mallNumber;

				}else{

					this.beforeShopCarNumber = this.beforeShopCarNumber >= 99 ? 99 : ++ this.beforeShopCarNumber;
					this.wareNumber = this.beforeShopCarNumber;

				}

				//埋点
	            common.buriedPoint({
				    access_occurred_type: 220607,//发生访问的【页面】类型
				    access_occurred_type_id: _this.ware.wareInfo[this.shopPatternIndex].id,//发生访问的【页面】类型ID
				    previous_event_type_obj: '',//【事件】对象类型
				    previous_event_type_obj_id: '',//【事件】对象类型ID
				    previous_content_sort: ''//【事件】事件参数
	            });
				return false;
			},
			selected(index){
				var _this = this;
				if(!this.isShopCarWare){

					this.patternIndex = index;
					this.produceID = this.ware.wareInfo[this.patternIndex].id;//选择规格商品id
					this.wareIndex = this.patternIndex;

				}else{

					this.shopPatternIndex = index;
					this.shopCarproduceID = this.ware.wareInfo[this.shopPatternIndex].id;//选择规格商品id
					this.wareIndex = this.shopPatternIndex;

				}

				//埋点
	            common.buriedPoint({
				    access_occurred_type: 220606,//发生访问的【页面】类型
				    access_occurred_type_id: _this.ware.wareInfo[this.shopPatternIndex].id,//发生访问的【页面】类型ID
				    previous_event_type_obj: '',//【事件】对象类型
				    previous_event_type_obj_id: '',//【事件】对象类型ID
				    previous_content_sort: ''//【事件】事件参数
	            });

			},
			submit(){
				var _this = this;
				this.popupVisible = false;

				if(!this.isShopCarWare){

					//埋点
		            common.buriedPoint({
					    access_occurred_type: 220610,//发生访问的【页面】类型
					    access_occurred_type_id: _this.shopCarproduceID,//发生访问的【页面】类型ID
					    previous_event_type_obj: '',//【事件】对象类型
					    previous_event_type_obj_id: '',//【事件】对象类型ID
					    previous_content_sort: ''//【事件】事件参数
		            });

					setTimeout(()=>{
						window.location.href = 'https://hxsapp_order_info#[{\"ProduceID\":\"' + this.produceID + '\",\"Quantity\":' + this.mallNumber + '}]';
					},100)
				}else{
					this.joinShopCar();
				}
			},
			closePop(){
				var _this = this;
				this.popupVisible = false;

				//埋点
	            common.buriedPoint({
				    access_occurred_type: 220605,//发生访问的【页面】类型
				    access_occurred_type_id: _this.ware.wareInfo[this.patternIndex].id,//发生访问的【页面】类型ID
				    previous_event_type_obj: '',//【事件】对象类型
				    previous_event_type_obj_id: '',//【事件】对象类型ID
				    previous_content_sort: ''//【事件】事件参数
	            });
			},
			toBuy(key){
				var _this = this;

				if(this.isOutStock) return false;
				if((this.sessToken < 5) || (window.location.href.indexOf('sess_token') != -1 && !this.sessToken)){
					window.location.href = 'https://hxsapp_showloginpage';
					return;
				}
				
				//判断点击购物车还是直接购买

				if(key == 'buyNow'){

					this.isShopCarWare = false;
					this.wareNumber = this.mallNumber;
					this.wareIndex = this.patternIndex;

					//埋点
		            common.buriedPoint({
					    access_occurred_type: 220602,//发生访问的【页面】类型
					    access_occurred_type_id: _this.ware.wareInfo[this.patternIndex].id,//发生访问的【页面】类型ID
					    previous_event_type_obj: '',//【事件】对象类型
					    previous_event_type_obj_id: '',//【事件】对象类型ID
					    previous_content_sort: ''//【事件】事件参数
		            });

				}else{
					this.isShopCarWare = true;
					this.wareNumber = this.beforeShopCarNumber;
					this.wareIndex = this.shopPatternIndex;
					this.shopCarproduceID = this.ware.wareInfo[this.shopPatternIndex].id;
					//埋点
		            common.buriedPoint({
					    access_occurred_type: 220601,//发生访问的【页面】类型
					    access_occurred_type_id: _this.ware.wareInfo[this.patternIndex].id,//发生访问的【页面】类型ID
					    previous_event_type_obj: '',//【事件】对象类型
					    previous_event_type_obj_id: '',//【事件】对象类型ID
					    previous_content_sort: ''//【事件】事件参数
		            });
				}

				this.popupVisible = true;
				
				this.windowScrollTop =  document.body.scrollTop;

				this.shopDetailContainerActive = {
			    	position: 'absolute',
			    	overflow: 'hidden',
					top: -this.windowScrollTop + 'px'
				}
				
			},
			toShopCar(){//打开购物车
				var _this = this;
				if((this.sessToken.length < 5) || (window.location.href.indexOf('sess_token') != -1 && !this.sessToken)){
					common.h5CallAppAction.hxsapp_showloginpage();
					return;
				}

				//埋点
	            common.buriedPoint({
				    access_occurred_type: 220604,//发生访问的【页面】类型
				    access_occurred_type_id: this.$route.params.id,//发生访问的【页面】类型ID
				    previous_event_type_obj: '',//【事件】对象类型
				    previous_event_type_obj_id: '',//【事件】对象类型ID
				    previous_content_sort: ''//【事件】事件参数
	            });

				window.location.href = 'https://hxsapp_open_shop_car';

			},
			joinShopCar(){//加入购物车
				var _this = this;
				if((this.sessToken.length < 5) || (window.location.href.indexOf('sess_token') != -1 && !this.sessToken)){
					common.h5CallAppAction.hxsapp_showloginpage();
					return;
				}
				axios.get('https://api.hxsapp.com/mall/Cart/addCart',{params:{
					sess_token: this.sessToken,
					ProduceID: this.shopCarproduceID,
					Quantity: this.beforeShopCarNumber
				}}).then( (res)=> {	
					console.log(res);
					Toast({
					   message: res.data.data.result,
					   duration: 1000
					});
					//成功加入购物车
					if(res.data.code == 200) {
						this.shopCarNumber = res.data.data.cartNum;
						common.h5CallAppAction.hxsapp_addNubmerCar();
					}

					//埋点
		            common.buriedPoint({
					    access_occurred_type: 220608,//发生访问的【页面】类型
					    access_occurred_type_id: _this.shopCarproduceID,//发生访问的【页面】类型ID
					    previous_event_type_obj: '',//【事件】对象类型
					    previous_event_type_obj_id: '',//【事件】对象类型ID
					    previous_content_sort: ''//【事件】事件参数
		            });
					
				})
			},
			getShopCar(){//获取购物车数量
				if (!this.sessToken || this.sessToken.length < 5) return;

				axios.get('https://api.hxsapp.com/mall/Cart/getCartNum',{params:{
					sess_token: this.sessToken
				}}).then( (res)=> {	
					console.log(res);
					if(res.data.code == 200) this.shopCarNumber=res.data.data.cartNum;
				})
			},
			openIm(){//打开商城客服
				var _this = this;
				if((this.sessToken.length < 5) || (window.location.href.indexOf('sess_token') != -1 && !this.sessToken)){
					common.h5CallAppAction.hxsapp_showloginpage();
					return;
				}
				//埋点
				common.buriedPoint({
				    access_occurred_type: 220603,//发生访问的【页面】类型
				    access_occurred_type_id: _this.ware.wareInfo[this.patternIndex].id,//发生访问的【页面】类型ID
				    previous_event_type_obj: '',//【事件】对象类型
				    previous_event_type_obj_id: '',//【事件】对象类型ID
				    previous_content_sort: ''//【事件】事件参数
				});

				setTimeout(()=>{
					common.h5CallAppAction.hxsapp_openIm();
				},100)

			},
			windowScrollTopFn(){
				if(!this.windowScrollTop) return;
				setTimeout(()=>{
					document.body.scrollTop = this.windowScrollTop;
				},1)

			},
	       	isiPhoneXFn(){
				var ua = window.navigator.userAgent;
				this.isiPhoneX = new RegExp('iPhone X').test(ua);
	        }
		},
        beforeDestroy(){
            document.title = common.config.webTitle;
            document.body.scrollTop = 0;
            window.hxsapp_visible_share_btn_mar = null;
        }
	}
</script>
<style lang="less">
    .shopDetailContainer{
    	width: 100%;
    	height: auto;
	    position: relative;
    	overflow: hidden;
    	&.shopDetailContainerActiveClass{
    		position: absolute;
	    	height: 100%;
    		overflow: hidden;
    	}
    	.buy-now{
    		position: fixed;
    		left: 0;
    		bottom: 0;
    	}
    	.bottom-bar{
			width: 100%;
			height: 50px;
			line-height: 50px;
			text-align: center;
			color:#fff;
			background: #FF668C;
			font-size:16px;
			display: block;
    	}
    	.seat{
    		background: transparent;
    	}
    	.border-soild{
    		width: 100%;
    		height: 1px;
    		background:rgba(129,141,207,0.20);

    	}
    	.grey{
    		background: #ccc;
    	}
    }
    .div_f5{
    	width: 100%;
    	height: 10px;
    	background: #f5f5f5;
    }
	.mint-swipe{
		width: 100%;
		height: 375px;
		.mint-swipe-item{
			width: 100%;
			height: 100%;
			line-height: 300px;
			text-align: center;
			background: #ccc;
			color: #000;
			font-size: 30px;
			img{
				width: 100%;
				height: 100%;
			}
		}
		.mint-swipe-indicator{
			background: #fff;
			margin-right: 5px;
			&.is-active{
				background: #ffad33;
				opacity: 1;
			}
		}
	}
	.ware{
		padding:0 12px;
		p{
			color: #333;
			font-size:20px;
			min-height: 24px;
			line-height: 24px;
			padding: 13px 0 3px;
		}
		.intro{
			font-size: 16px;
			line-height: 22px;
			color:#999;
		}
		.ware-price{
			height: 23px;
			line-height: 23px;
			color: #FF668C;
			font-size:21px;
			padding: 5px 0 15px;
			span{
				font-size:16px;
			}
		}
		.ware-mail{
			font-size: 13px;
			height: 15px;
			line-height: 15px;
			padding-bottom:14px;
			display: none;
			em:nth-of-type(1){
				float:left;
				color:#999;
			}
			em:nth-of-type(2){
				float:right;
				color:#999;
			}
		}
	}
	.ware-content{
		.title{
			height: 40px;
			background: #f5f5f8;
			div{
				width: 112px;
				height: 40px;
				margin: 0 auto;
				overflow: hidden;
			}
 			span:nth-of-type(1){
 				width: 23px;
 				height: 1px;
 				background: #818DCF;
 				opacity: 0.2;
 				float: left;
 				margin-top: 19px;
 				margin-right: 4px;
 			}
 			span:nth-of-type(2){
 				height: 40px;
 				line-height: 40px;
 				float:left;
 				font-size:14px;
 				color:#999;
 				text-align: center;
 				margin-right: 4px;
 			}
 			span:nth-of-type(3){
 				width: 23px;
 				height: 1px;
 				background: #818DCF;
 				opacity: 0.2;
 				float: left;
 				margin-top: 19px;
 			}
		}
		.ware-info{
		 	padding: 0 0 10px;
		 	color:#666;
		 	word-wrap:break-word; 
			img{
				width: 100%;
			}
		}
	}
	.shop-bar{
		width: 100%;
		height: 50px;
		background: #fff;
		position: fixed;
		left:0;
		bottom:0;
		display: -webkit-flex;
		.small-bar{
			span{
				width: 24px;
				height: 23px;
				display: block;
				margin: 0 auto;
				margin-top: 6px;
				position: relative;
			}
			em{
				width: 100%;
				height: 14px;
				line-height: 14px;
				font-size:12px;
				text-align: center;
				color: #999;
				margin-top: 4px;
				display: block;
			}
		}
		.service{
			width: 49px;
			border-right: 1px solid rgba(129,141,207,0.20);
			border-top: 1px solid rgba(129,141,207,0.20);
			span{
				background: url(../assets/images/kefu_icon.png) left top no-repeat;
				background-size:100%;
			}
		}
		.cart{
			width: 49px;
			border-right: 1px solid rgba(129,141,207,0.20);
			border-top: 1px solid rgba(129,141,207,0.20);
			span{
				background: url(../assets/images/shop_cart.png) left top no-repeat;
				background-size:100%;
				i{
					width: 14px;
					height: 14px;
					line-height: 14px;
					text-align: center;
					background-color: rgb(245, 84, 73, 0.9);
					opacity: 0.9;
					font-size: 10px;
					color:#fff;
					position: absolute;
					right:-4px;
					top: -4px;
					border-radius: 50%;
				}
			}
		}
		.shop{
			-webkit-flex:1.5;
			text-align: center;
			line-height: 50px;
			background: #FF668C;
			font-size: 17px;
			border-top: 1px solid #FF668C;
			color: #fff;
		}
		.join{
			-webkit-flex:1.5;
			text-align: center;
			line-height: 50px;
			color: #666;
			font-size: 17px;
			border-top: 1px solid rgba(129,141,207,0.20);
		}

	}
	.iphoneX-shop-bar{
		height: 60px;
		.small-bar{
			padding-bottom:10px;
			.service{
				width: 66px;
			}
			.cart{
				width: 66px;
			}
		}
		
	}
	.mint-popup-bottom{
		width: 100%;
		opacity: 1;
		.to-bug{
			padding: 0 12px;
			position: relative;
			.info{
				height: 75px;
				position: relative;
				.img-box{
					width: 86px;
					height: 86px;
					background: #fff;
					// border-radius:8px;
					position: absolute; 
					left: 0;
					top:-23px;
				}
				img{
					width: 80px;
					height: 80px;
					// border-radius:8px;
					border: solid 3px #fff;
				}
			}
			.design{
				padding-left: 100px;
				padding-top:13px;
				span{
					display: block;
				}
				span:nth-of-type(1){
					color: #FF668C;
					font-size: 16px;
					line-height: 18px;
					line-height: 18px;
					em{
						font-size: 12px;

					}
				}
				span:nth-of-type(2){
					color: #999;
					font-size: 13px;
					line-height: 16px;
					line-height: 16px;
					padding-top: 9px;
				}
			}
			.close{
				width:15px;
				height: 15px;
				background: url(../assets/images/close-color.png) left top no-repeat;
				background-size:100%;
				position: absolute;
				right:10px;
				top:10px;
				z-index: 2;
			}
			.choice-color{
				span{
					color:#333;
					font-size: 14px;
					height: 16px;
					line-height: 16px;
					padding: 19px 0 14px 0;
					display: block;
				}
				.pattern{
					padding-bottom:15px;
					a{
						margin-top: 20px;
						padding: 6px 15px;
						color:#818DCF;
						font-size:13px;
						border-radius: 3px;
						border:solid 1px rgba(129,141,207,0.70);
						border-radius: 2px;
						float: left;
						margin-right: 10px;
						background:#fff;
						&.active{
							border:solid 1px #FF668C;
							background: #FF668C;
							color:#fff;
						}
					}
				}
			}
			.choice-number{
				padding:20px 0;
				span{
					height: 21px;
					line-height:21px;
					color:#999;
					font-size:14px;
					float:left;
				}
				.number{
					width: 127px;
					float:right;
					em{
						width:21px;
						height: 21px;
						&.reduce{
							float:left;
							background: url(../assets/images/jian_s_icon.png) left top no-repeat;
							background-size:100%;
						}
						&.increase{
							float:right;
							background: url(../assets/images/jia_s_icon.png) left top no-repeat;
							background-size:100%;
						}
					}
					span{
						width:85px;
						height: 21px;
						line-height: 21px;
						font-size:14px;
						color:#333;
						text-align: center;
						float:left;
					}
				}
			}
	    }
	}
</style>