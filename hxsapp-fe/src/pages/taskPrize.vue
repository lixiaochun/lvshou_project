<template>
	<div class="appTaskShare-container">
		<div class="bg"></div>
		<div class="ct">
			<span class="img-box"></span>
			<div class="text">
				<p></p>
				<p>在好享瘦APP完成了今日任务</p>
				<p></p>
			</div>
			<img src="../assets/images/daily_task/default.png" class="zj-img">
			<img src="../assets/images/daily_task/code.png" class="code-img">
			<p class="msg">长按识别二维码 下载好享瘦领取奖品</p>
		</div>
		<preLoading v-if="!loadEnd"></preLoading>
	</div>
</template>
<script>
    
	import Vue from 'vue'
	import commonJs from '@/util/common.js'
	import preLoading from '@/components/preLoading'
	export default {
		name:'taskPrize',
		data(){
			return{
				loadEnd: false
			}
		},
		mounted(){

			!function(){
		        function e(){
		            var e=document.documentElement.clientWidth, t=document.querySelector("html"), f = e/20;
		            window.fontSize=f;
		            t.style.fontSize=f+"px"
		        }
		        e(),window.addEventListener("resize",e);

	    	}();
	    	//获取内容，展示页面
			this.setTaskPrize();
			//隐藏app右上角分享按钮
			this.hiddenShareBtn();
			
		},
		methods:{
			setTaskPrize(){
				let routeParam = this.$route.params;
				
		    	$('.appTaskShare-container .img-box').css({
		    		'background': 'url(' + decodeURIComponent(routeParam.headImg) + ')',
		    		'background-size': '150%',
		    		'background-position': 'center center'
		    	});
		    	$('.appTaskShare-container p').eq(0).text('用户' + commonJs.subStlength(decodeURIComponent(routeParam.name), 6, 5));
		    	$('.appTaskShare-container p').eq(2).text('获得了奖品        ' + commonJs.subStlength(decodeURIComponent(routeParam.prizeName),10,5));
		    	$('.zj-img').attr('src', decodeURIComponent(routeParam.prizeImg));

				//埋点
	            commonJs.buriedPoint({
				    access_occurred_type: 300310,//发生访问的【页面】类型
				    access_occurred_type_id: '',//发生访问的【页面】类型ID
				    previous_event_type_obj: '',//【事件】对象类型
				    previous_event_type_obj_id: '',//【事件】对象类型ID
				    previous_content_sort: ''//【事件】事件参数
	            });
	            
	            //加载完毕,展示页面
	            this.loadEnd = true;
	            //分享协议
	            if(this.loadEnd){
	            	setTimeout(function(){
	              		window.location.href = 'https://hxsapp_photo_share#' +  decodeURIComponent('我在好享瘦抽中了' + routeParam.prizeName + ',快点过来一起抽吧!') + '#task-image';
	            	},1000);
	            }

			},
			hiddenShareBtn(){//隐藏app右上角分享按钮
				let appVersion = commonJs.getHxsAppVersion();
				let isTrue = commonJs.compareAppVersion(appVersion, '3.0.2');
				if(isTrue){
	            	setTimeout(function(){
	            		commonJs.h5CallAppAction.hxsapp_shareBtnNone();
	            	},500);
				}

			}
		},
		components:{
		    preLoading
		},
		beforeDestroy(){
			$(window).off("resize")
		}
	}
</script>
<style scoped>
.appTaskShare-container{
	width: 100%;
	min-width: 100%;
	height: 100%;
	position: absolute;
	left: 0;
	top:0;
	background:#fff6d9;
}
.appTaskShare-container .bg{
	width: 100%;
  	min-width: 100%;
	height: 100%;
  	background: url(../assets/images/daily_task/bg.png) left -3.2rem repeat-y #fff6d9;
  	background-size: 100%;
	position: absolute;
	left: 0;
}
.appTaskShare-container .ct{
	width: 100%;
	height:31.1rem;
    background: url(../assets/images/daily_task/share-bg.png) left top no-repeat;
    background-size:100% 100%;
    position: absolute;
    left: 0;
    top:1rem;
}
.appTaskShare-container .img-box{
	width: 4.9rem;
	height: 4.9rem;
	position: absolute;
	left: 50%;
  margin-left: -2.42rem;
	top:0.35rem;
	border-radius: 50%;
}
.appTaskShare-container .text{
	width:15.8rem;
	position:absolute;
	top:6rem;
	left: 50%;
	margin-left: -7.9rem;
}
.appTaskShare-container p{
	width: 100%;
	height: 1.2rem;
	line-height: 1.2rem;
	text-align: center;
	font-size: 0.69rem;
	color: #999;
  overflow: hidden;
}
.appTaskShare-container .text p:nth-of-type(3){
	color:#333;
}
.appTaskShare-container .zj-img{
	width: 4.4rem;
	height: 4.4rem;
	position: absolute;
	left: 50%;
	top:10.8rem;
	margin-left: -2.2rem;
}
.appTaskShare-container .code-img{
	width: 10.3rem;
	height: 10.3rem; 
	position: absolute;
	left:50%;
	margin-left: -5.1rem;
	bottom:3.5rem;
}
.appTaskShare-container .code-img{
	width: 10.3rem;
	height: 10.3rem; 
	position: absolute;
	left:50%;
	margin-left: -5.1rem;
	bottom:3.9rem;
}
.appTaskShare-container .msg{
	width:15.8rem;
	position:absolute;
	left: 50%;
	margin-left: -7.9rem;
	bottom:2.3rem;
}
</style>