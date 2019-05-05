<template>
	<div class="downAppExtend">
		<div class="down_hxs">
			<span class="close" @click="closeDownBar"></span>
			<div class="bg"></div>
			<div class="down_main">
				<div class="logo"></div>
				<!-- <div class="text">我瘦了,你随意</div> -->
			<div class="text" :class="{smallSize:isSmallPhone}">想获得更多减肥干货？ </div>
				<a :href="downLink">下载APP</a>
			</div>
			<div class="share-img" v-if="shareImgShow && shareImgStyle" @click="downHxs()" :style="shareImgStyle"></div>
		</div>
		<div class="div_none" :style="shareSeizeSeatStyle"></div>
	</div>
</template>
<script>

	// import Vue from 'vue'
	import commonJs from '@/util/common.js'
	import axios from 'axios'

	export default{
		name:'downAppExtend',
		props:["appExtendData"],
		data(){
			return{
				downLink: "",
				shareImgShow: false,
				shareStyle:null,
				shareSeizeSeatStyle: null,
				shareImgLink:'',
				isSmallPhone: false
			}
		},
		mounted(){
			this.hxsDownload();
			this.isSmallPhoneFn();//兼容小屏幕手机文案
		},
		methods:{
			hxsDownload () {
				var ua = window.navigator.userAgent;
				var IsAndroid = new RegExp('Android').test(ua);
				var isAndroidQQ = new RegExp('Mobile MQQBrowser').test(ua);
				var MicroMessenger = new RegExp('MicroMessenger').test(ua);

				var isIos = new RegExp('iPhone').test(ua);
				var isIpad = new RegExp('iPad').test(ua);
				var isIosQQ = new RegExp(' QQ/').test(ua);


				// if(isIos || isIpad){
				// 		// this.downLink = 'https://at.umeng.com/5viObq';
				// 		this.downLink = 'https://www.hxsapp.com/download';
				// }else if(IsAndroid){
				// 	// this.downLink = 'https://at.umeng.com/aCKnSD';
				// 	this.downLink = 'https://www.hxsapp.com/download';
				// }

				// if((IsAndroid && isAndroidQQ && !MicroMessenger) || (isIos && isIosQQ) || (isIpad && isIosQQ)){
				// 		this.downLink = 'https://www.hxsapp.com/download';
				// }

				this.downLink = this.appExtendData.downLink[this.$route.params.article_id]
				// debugger

				var that = this;
				axios.get('https://api.hxsapp.com/base/ad/getAdListByType', {
					params: {keywords: 'down_load_btn_ad'}
				}).then(function(res){
			        var data = res.data.data[0];
					if (!data) return false;
			        if(!data.image)return false;
			        that.shareImgShow = true;
			        that.shareImgLink = data.link;

			        var shareImgHeight = parseInt(data.height)/2;
			        that.shareImgStyle = {
						width: parseInt(data.width)/2 + 'px',
						height: shareImgHeight + 'px',
						background:'url(' + data.image + ') left top no-repeat',
						backgroundSize: '100%',
						top: -shareImgHeight + 'px'
					}

					that.shareSeizeSeatStyle = {
						height: 59 + shareImgHeight + 'px'
					}
				});

			},
			downHxs () {
				if(this.shareImgLink){
					// window.location.href = this.shareImgLink;
					window.location.replace(this.shareImgLink); 
				}
			},
			closeDownBar(){
				this.downShow = false;
				this.shareSeizeSeatStyle = {
					height: 59 + 'px'
				}
			},
			isSmallPhoneFn(){//小屏幕手机兼容
				if(document.documentElement.clientWidth < 360){
					this.isSmallPhone = true;
				}
			}

		}
	}
</script>
<style scoped lang="less">

.downAppExtend{

	.div_none{
		width: 100%;
	}
	.down_hxs{
		width: 100%;
		height: 50px;
		position: fixed;
		left:0;
		bottom:0;
		z-index: 99;
		background:url(../assets/images/down.png) left top repeat;
		background-size:200%;
	}
	.down_hxs .close{
		width: 11px;
		height: 11px;
		background: url(https://app.hxsapp.com/html/img/colse.png) left top no-repeat;
		background-size: 100%;
		position: absolute;
		right: 4px;
		top:4px;
		z-index: 22;
		opacity: 0.6;

	}
	.down_hxs .bg{
		width: 100%;
		height: 100%;
		position: absolute;
		left: 0;
		top: 0;
		z-index: 9;
	}
	.down_hxs .down_main{
		padding: 8px 20px 7px 15px;
		height: 35px;
		position: relative;
		z-index: 10;
	}
	.down_hxs .logo{
		width: 17px;
		height: 26px;
		border-radius: 5px;
		background:url(../assets/images/page_logo@2x.png) left top no-repeat;
		background-size: 100% 100%;
		float:left;
		margin-right: 7px;
	}
	.down_hxs .text{
		height: 23px;
		line-height: 35px;
		color: #fff;
		font-size: 17px;
		float:left;
		font-weight: 100;
	}
	.down_hxs a{
		width:100px;
		height: 35px;
		line-height: 35px;
		text-align: center;
		background: #ff68ac;
		float: right;
		color:#fff;
		font-size:15px;
		border-radius: 22px;
	}
	.down_hxs .share-img{
		position: absolute;
		right: 5px;
	}
	.down_hxs .smallSize{
		font-size: 14px;
	}

}
</style>
