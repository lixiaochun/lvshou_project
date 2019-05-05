<template>
	<div class="thumb-container">
		<div class="thumbBtn" id="thumbBtn"></div>
		<div class="thumb" id="thumb"></div>
	</div>
</template>
<script>
    import commonJs from '@/util/common.js'
		import { Toast } from 'mint-ui'
    import animationGetGoodBtnJs from '../../static/lottie/getGoodBtn.js'
    import animationGetGoodJs from '../../static/lottie/getGood.js'
	   export default{
      name:'thumb',
      props:{
			isCommend: String,
			commendNum: Number
      },
      data(){
        return{

        }
      },
      mounted(){
        this.animationThumb()
      },
      methods:{
        animationThumb(){
        	var _this = this;

          //页面是否点赞判断标识
          var isDianZan = '';
        	if(this.isCommend == 'yes')
          {
          	isDianZan = true;  
        	}else{
          	isDianZan = false;
        	}

          //全局动画锁，动画加载完毕才重新赋值
          window.isLock = false;

          var thumbBtn = document.getElementById('thumbBtn');
          var thumb = document.getElementById('thumb');

          //点赞按钮动画参数
          var thumbBtnParams = {
            container: thumbBtn, 
            animationData: animationGetGoodBtnJs,
            renderer: 'svg',
            loop: false, 
            autoplay: false 
          }
          
          //点赞大动画参数
          var thumbParams = {
            container: thumb, 
            animationData: animationGetGoodJs,
            renderer: 'svg',
            loop: false, 
            autoplay: false 
          }

          var animation = bodymovin.loadAnimation(thumbBtnParams);
          var animationThumb = bodymovin.loadAnimation(thumbParams);

          animation.addEventListener("complete",function (argument) 
          {
            //全局动画锁，动画加载完毕才重新赋值
            window.isLock = false;
            //大动画展示完毕需要隐藏
            thumb.style.display='none';
          });


          //加载页面时判断是否点赞，停到加载指定的帧数
          if( !isDianZan ){
            animation.goToAndStop(0,true);
            animationThumb.goToAndStop(0,true);
          }else{
            animation.goToAndStop(36,true);
            animationThumb.goToAndStop(36,true);
          }
          
          //用户点击点赞按钮
          thumbBtn.onclick=function(){
            if(!commonJs.isLogin()) return;
            if(window.isLock) return;
            window.isLock = true;

            if (!isDianZan) //点赞动作
            {
          	  thumb.style.display='block';

            	animation.playSegments([0,36],true);
            	animationThumb.playSegments([0,36],true);
            	isDianZan = true;

              _this.$parent.commendNum = parseInt(_this.commendNum) +1;

      				// Toast({
      				// 	message: '点赞成功',
      				// 	duration: 1000
      				// })

              } else //取消点赞动作
              {
                animation.playSegments([36,72],true);
                isDianZan = false;

                _this.$parent.commendNum = parseInt(_this.commendNum) -1;

        				// Toast({
        				// 	message: '取消点赞',
        				// 	duration: 1000
        				// })

              }
            }
          }
     }
    }
</script>
<style scoped lang="less">
	.thumb-container{
	      float: left;
		.thumbBtn{
	      width: 23px;
	      height: 23px;
	      margin-top: 5px;
		}
		.thumb{
			width: 100px;
			height: 100px;
			position: fixed;
			left: 50%;
			top:30%;
			margin-left: -50px;
			display: none;
		}
	}
</style>