<template>
  <div class="collection-container">
    <div class="collectionBtn" id="collectionBtn"></div>
    <div class="collection" id="collection"></div>
  </div>
</template>
<script>
    import commonJs from '@/util/common.js'
    import { Toast } from 'mint-ui'
    import collectionBtnJs from '../../static/lottie/collection-btn.js'
    import collectionJs from '../../static/lottie/collection.js'
     export default{
      name:'collection',
      props:{
          isCollect: String//文章页面传递是否收藏 yes收藏 no没收藏
      },
      data(){
        return{

        }
      },
      mounted(){
        this.animationCollection();
      },
      methods:{
        animationCollection(){ 

          //页面是否收藏判断标识
          var isShouCang = '';
          if(this.isCollect == 'yes'){
              isShouCang = true;  
          }else{
              isShouCang = false;  
          }

          //全局动画锁，动画加载完毕才重新赋值
          window.isLock = false;

          var collectionBtn = document.getElementById('collectionBtn');
          var collection = document.getElementById('collection');

          var collectionBtnParams = {//收藏按钮动画参数标识
            container: collectionBtn, 
            animationData: collectionBtnJs,
            renderer: 'svg',
            loop: false, 
            autoplay: false 
          }

          var isCollectParams = {//收藏大动画参数
            container: collection, 
            animationData: collectionJs,
            renderer: 'svg',
            loop: false, 
            autoplay: false 
          }

          var animation = bodymovin.loadAnimation(collectionBtnParams);
          var collectionAnimation = bodymovin.loadAnimation(isCollectParams);

          //判断动画是否加载完毕
          animation.addEventListener("complete",function (argument) 
          {
            //全局动画锁，动画加载完毕才重新赋值
            window.isLock = false;
            //大动画展示完毕需要隐藏
            collection.style.display='none';
          })

          //加载页面时判断是否收藏，停到加载指定的帧数
          if ( !isShouCang )
          {
            animation.goToAndStop(0,true);
            collectionAnimation.goToAndStop(0,true);
          } else
          {
            animation.goToAndStop(36,true);
            collectionAnimation.goToAndStop(36,true);
          }
          
          //用户点击收藏按钮
          collectionBtn.onclick=function(){
            if(!commonJs.isLogin()) return;
            if(window.isLock) return;
            window.isLock = true;

            if ( !isShouCang )
            {//收藏动作
              collection.style.display='block';
                animation.playSegments([0,36],true);
                collectionAnimation.playSegments([0,36],true);
                isShouCang = true;

                // Toast({
                //   message: '收藏成功',
                //   duration: 1000
                // })

            } else
            {//取消收藏动作
              animation.playSegments([36,72],true);
              isShouCang = false;

              // Toast({
              //   message: '取消收藏',
              //   duration: 1000
              // })

            }
          }
        }
     }
    }
</script>
<style scoped lang="less">
  .collection-container{
        float: left;
    .collectionBtn{
        width: 27px;
        height: 27px;
        margin-top:8px;
    }
    .collection{
      width: 100px;
      height: 100px;
      position: fixed;
      left: 50%;
      top:30%;
      margin-left: -50px;
      display: none;
      z-index: 999999;
    }
  }
</style>