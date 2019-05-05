<template>
	<div id="downToLinkedMe">
		<div class="down_hxs" v-if="downShow">
			<span class="close" @click="closeDownBar"></span>
			<div class="bg"></div>
			<div class="down_main">
				<div class="logo"></div>
				<!-- <div class="text">我瘦了,你随意</div> -->
				<div class="text" :class="{smallSize:isSmallPhone}">
					{{config.downLoadTitle}}
				</div>
				<div id="LinkedMeDom">
					<!--
						<a id="LinkedMeDom">下载APP</a>
										-->
				</div>
			</div>
			<div class="share-img" v-if="shareImgShow && shareImgStyle" @click="downHxs()" :style="shareImgStyle"></div>
		</div>
		<div class="div_none" v-if="downShow" :style="shareSeizeSeatStyle"></div>
	</div>
</template>
<script>

// import Vue from 'vue'
import commonJs from '@/util/common.js'
import axios from 'axios'

export default {
	name: 'downToLinkedMe',
	props: {
		linkedMe: {
			type: Object,
			default: function() {
				return {}
			}
		}
	},
	data() {
		return {
			config: commonJs.config,
			downLink: commonJs.config.downLoadUrl,
			shareImgShow: false,
			shareStyle: null,
			shareSeizeSeatStyle: null,
			downShow: true,
			shareImgLink: '',
			isSmallPhone: false
		}
	},
	mounted() {
		this.hxsDownload();
		this.isSmallPhoneFn();//兼容小屏幕手机文案
	},
	methods: {
		hxsDownload(params = {}) {

			// debugger
			if(this.linkedMe && this.linkedMe.params){
				commonJs.linkedMe( this.linkedMe)
			}
			
			var that = this;
			axios.get('https://api.hxsapp.com/base/ad/getAdListByType', {
				params: { keywords: 'down_load_btn_ad' }
			}).then(function(res) {
				var data = res.data.data[0];
				if (!data) return false;
				if (!data.image) return false;
				that.shareImgShow = true;
				that.shareImgLink = data.link;

				var shareImgHeight = parseInt(data.height) / 2;
				that.shareImgStyle = {
					width: parseInt(data.width) / 2 + 'px',
					height: shareImgHeight + 'px',
					background: 'url(' + data.image + ') left top no-repeat',
					backgroundSize: '100%',
					top: -shareImgHeight + 'px'
				}

				that.shareSeizeSeatStyle = {
					height: 59 + shareImgHeight + 'px'
				}
			});

		},
		downHxs() {
			if (this.shareImgLink) {
				// window.location.href = this.shareImgLink;
				window.location.replace(this.shareImgLink);
			}
		},
		closeDownBar() {
			this.downShow = false;
			this.shareSeizeSeatStyle = {
				height: 59 + 'px'
			}
		},
		isSmallPhoneFn(){
			if(document.documentElement.clientWidth < 360){
				this.isSmallPhone = true;
			}
		}

	}
}
</script>
<style lang="less">
#downToLinkedMe {
	.div_none {
		width: 100%;
		height: 59px;
	}

	.down_hxs {
		width: 100%;
		height: 50px;
		position: fixed;
		left: 0;
		bottom: 0;
		z-index: 99;
		background: url(../assets/images/down.png) left top repeat;
		background-size: 100% 100%;
	}

	.down_hxs .close {
		width: 11px;
		height: 11px;
		background: url(https://app.hxsapp.com/html/img/colse.png) left top no-repeat;
		background-size: 100%;
		position: absolute;
		right: 4px;
		top: 4px;
		z-index: 22;
		opacity: 0.6;
	}

	.down_hxs .bg {
		width: 100%;
		height: 100%;
		position: absolute;
		left: 0;
		top: 0;
		z-index: 9;
	}

	.down_hxs .down_main {
		padding: 8px 20px 7px 15px;
		height: 35px;
		position: relative;
		z-index: 10;
	}

	.down_hxs .logo {
		width: 17px;
		height: 26px;
		border-radius: 5px;
		background: url(../assets/images/page_logo@2x.png) left top no-repeat;
		background-size: 100% 100%;
		float: left;
		margin-right: 10px;
		margin-top: 4px;
	}

	.down_hxs .text {
		height: 35px;
		line-height: 35px;
		color: #fff;
		font-size: 17px;
		float: left;
		font-weight: normal;
	}
	.down_hxs #LinkedMeDom{

  		width:100px;
		display: none;
		float: right;
		// padding:0 20px;
		height: 35px;
		line-height: 35px;
		text-align: center;
		background: #ff68ac;
		border-radius: 22px;
		font-size: 15px;
		
		.linkedme{
			color: #fff;
			font-weight: normal;
		}
	}

	.down_hxs .share-img {
		position: absolute;
		right: 5px;
	}

	.down_hxs .smallSize{
		font-size: 14px;
	}
}
</style>
