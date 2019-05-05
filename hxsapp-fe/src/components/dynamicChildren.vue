<template>
	<div class="dynamic-children">
		<p>{{ dynamicContent }}</p>
    	<div class="picture-box" style="display:_none;" v-show="1">
    		<!-- <div class="once">
    			<img src="https://hxsupload-oss.hxsapp.com/2017-09-12/5af88a264615c0df0fd13a6b1243c093.jpg" alt="">
    		</div> -->
    		<div class="more clearfix">
    			<span :key="index" v-for="(img, index) in dynamicImages" :style="{background:'url(' + img + ') center center no-repeat',backgroundSize:'185%'}" @click="openImgIndexFn(index)" :class="{once: onePictureStyle}"></span>
    		</div>
    	</div>
		<div class="dynamic-share-detail clearfix" style="display:none;">
            <div class="detail-img-box">
                <img src="https://hxsupload-oss.hxsapp.com/2017-08-31/7ad044b8b664b404bbf094bbc5569daa.jpg?x-oss-process=style/thumb" alt="">
            </div>
            <div class="detail-txt">
                <p>健康的身体才是最宝贵的财富，热爱生活！热爱运动！加油！</p>
                <p>健康的身体才是最宝贵的财富，热爱生活！热爱运动！加油！</p>
            </div>
        </div>
        <div class="dynamic-video" style="display:none;">
        	<div class="bg"></div>
            <img src="https://hxsupload-oss.hxsapp.com/2017-08-31/7ad044b8b664b404bbf094bbc5569daa.jpg?x-oss-process=style/thumb" alt="">
            <span></span>
        </div>
        <div class="dynamic-audio" style="display:none;">
        	<div>
        		<span></span>
        		<em>6"</em>
        	</div>
        </div>
	</div>
</template>
<script>
	export default {
		name:"dynamicChildren",
		data(){
			return{
				dynamicContent: null,//正文
				dynamicImages: null,//用户图片数组
				pictureShow: false, //是否展示图片
				openImgIndex: 0, //传递picture组件用户点击第几张图片,
				onePictureStyle: false //用户发表一张图片展示图片样式
			}
		},
		props:{
			dynamicData:{
				type: Object,
				default: ''
			}
		},
		mounted(){
			this.dynamicData()
		},
		methods:{
			dynamicData(){
				//正文 图文
				this.dynamicContent = data.content;
				this.dynamicImages =  data.images;

				//当图片为一张时触发新样式
				if(this.dynamicImages.length == 1){
					this.onePictureStyle = true;
				}
			}
		}
	}
</script>
