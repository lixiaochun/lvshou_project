<template>
	<div class="common-layer">
            <div class="layer-bg"></div>
            <div class="picture-browse">
                <div class="picture-browse-content  swiper-container" data-swiper-zoom="0">
                    <ul class="swiper-wrapper" :style="swiperWidthStyle">
                      	<li class="swiper-slide" v-for="(img,index) in dynamicImageArr" @click="hiddenPhotoBox" :key="index">
	                      	<div class="swiper-zoom-container">
	                            <img :src="img" alt="">
	                        </div>
                        </li>
                    </ul>
                </div>
            </div>
            <div class="img-page">
                (<span>{{ imgActiveIndex + 1 }}</span>/<em v-if="dynamicImageArr">{{ dynamicImageArr.length }}</em>)
            </div>
            <a href="javascript:;" class="close" @click="hiddenPhotoBox">关闭</a>
        </div>
</template>
<script>
	import Vue from 'vue'
	export default {
		name: 'pictrue',
		data(){
			return {
				dynamicImageArr:null,
				swiperWidthStyle:null,
				imgActiveIndex: 0,
			}
		},
		props:{
			dynamicImages:{
				type: Array,
				default: function(){}
			},
			openPictureIndex:{
				type: Number,
				default: 0
			}
		},
		mounted(){
			this.dynamicImageArr = this.dynamicImages;
			this.swiperWidth()
			this.slidePhoto();
			this.imgActiveIndex = this.openPictureIndex;
		},
		methods:{	
			slidePhoto(){
				let _this = this;
				Vue.nextTick(function () {
				    let swiper = new Swiper('.swiper-container', {
				        zoom : true,
				        pagination: '.swiper-pagination',
				        paginationClickable: true,
				        autoHeight: true,
				        initialSlide : _this.imgActiveIndex,
				        onSlideChangeStart: function(swiper){
				        	_this.imgActiveIndex = swiper.activeIndex;
				        }
				    });
				})
			},
			hiddenPhotoBox(){//触发父组件函数
				this.$emit('obtain', false);
			},
			swiperWidth(){
				this.swiperWidthStyle = {
					width:this.dynamicImageArr.length*document.documentElement.clientWidth + 'px'
				}
			}

		}
	}
</script>
<style scoped>
.common-layer{
	width: 100%;
	height: 100%;
	position: fixed;
	left: 0;
	top: 0;
	z-index: 999999999999;
	overflow: hidden;
}
.layer-bg{
	width: 100%;
	height: 100%;
	position: absolute;
	left: 0;
	top: 0;
	background: #000;
}
.common-layer .close{
	height: 14px;
	line-height: 14px;
	position: absolute;
	left: 50%;
	margin-left: -23px;
	bottom: 58px;
	padding-left:18px;
	font-size:14px;
	color:#fff;
	background: url(../assets/images/close.png) left top no-repeat;
	background-size:12px;
	z-index: 999999999;
}
.common-layer .picture-browse-content,.common-layer .picture-browse-content ul{
	height: 100%;
}
.common-layer .picture-browse{
	width: 100%;
	height: 100%;
	position: absolute;
	left: 0;
	top:0;
}
.common-layer .picture-browse ul{
	width: 2000px;
	min-height: 100%;
}
.common-layer .picture-browse li{
	width: 100%;
	min-height: 100%;
	float: left;
	display:-webkit-box;
	-webkit-box-pack:center;
	-webkit-box-align:center;
	overflow: hidden;
}
.common-layer .picture-browse li img{
	max-width: 100%;
	max-height: 100%;
}
.common-layer .img-page{
	width: 100%;
	height: 18px;
	text-align: center;
	color:#fff;
	font-size: 16px;
	position: absolute;
	left:0;
	bottom: 86px;
	z-index: 9;
}
.common-layer .img-page span,.common-layer .img-page em{
	color:#fff;
	font-size: 16px;
}
</style>