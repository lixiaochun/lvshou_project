<template>
  <div class="defaultVideo">
    <div class="video-box" :class="istype==true?'ios':'android'" >

             
        <video id="my-video"  v-if="!imgType"  v-show="imgType4"  :autoplay="autoplay1" class="video-js vjs-default-skin" controls preload="auto"  
        data-setup="{}"  ref="videoPlayer" muted="true"
       x-webkit-airplay="true" x5-playsinline="true" webkit-playsinline="true" playsinline="playsinline">
            <source :src="src1" type="video/mp4"  id="source1">
          </video>

          <div class="playBtn_box"  @click="paly">
            <img  src="../../../src/assets/video/play.png" class="playBtn" v-if="imgType" >
          </div>
          
          <img :src="poster" v-show="imgType2" v-if="imgType3" style="width: 100%; height: auto;position: absolute;top: 0px;
          z-index: 9;">
    </div>
  </div>
</template>
<script>
  import 'video.js/dist/video-js.css'
  import videojs from 'video.js'
  import 'videojs-contrib-hls'
  import common from '@/util/common.js'
  export default {
    name: 'defaultVideo',
    data() {
      return {
         video:"",
         video2:"",
         type2:false,
         imgType:true,
         imgType2:true,
         imgType3:true,
         imgType4:true,
         autoplay1:false,
         istype:true,
         src1:"http://vjs.zencdn.net/v/oceans.mp4",
         poster:require("../../assets/video/video_bg.jpg"),
         scroll: ''
      };
    },
    mounted() { 
     // this.initVideo();
          var  that=this;
          var ua = window.navigator.userAgent;
			    var IsAndroid = new RegExp('Android').test(ua); 
			    var isAndroidQQ = new RegExp('Mobile MQQBrowser').test(ua);
			    var MicroMessenger = new RegExp('MicroMessenger').test(ua);

			    var isIos = new RegExp('iPhone').test(ua);
			    var isIpad = new RegExp('iPad').test(ua);
			    var isIosQQ = new RegExp(' QQ/').test(ua);
          if(!common.isApp() && /Android/i.test(navigator.userAgent)){
          window.addEventListener('scroll', this.scrolls)
          }
			    if(isIos || isIpad){
            that.istype=true;
			    }else if(IsAndroid){
            that.istype=false;
			    }
    },
    methods: {
      scrolls(){
        var that = this;
        that.scroll = document.documentElement.scrollTop || document.body.scrollTop;

        if(that.scroll > 30 && that.video!=""){
          that.video.pause()
        }
      },
      paly(){
        var that=this;
        that.imgType3 = false;
        if(that.imgType2==false){
          that.video.pause();
           that.imgType2=true;
           $("#my-video")[0].click()
           $("#my-video_html5_api")[0].click();
        }else{
          that.imgType=false;
          if(that.video!=""){
            that.video.play()
          }else{
            if(!common.isApp() && /Android/i.test(navigator.userAgent)){
              that.autoplay1 = true;
            }
            that.initVideo();
          }
          setTimeout(function(){
             that.imgType2=false;
          },1000);
       
        //  that.video.load(); 
       
     
        }
      
      },
      paly2(){
        var that=this;
        that.video.play()
      },
      pause(){
      
        this.video.pause()
      },
      fPlayBtn(){
       var that=this;
       this.imgType=false;
        that.initVideo();
        that.video.play();
      
        $("#my-video")[0].click()
        $("#my-video_html5_api")[0].click();
        setTimeout(function(){
          this.imgType2=false;
        },1000)
  
      //   var event = new Event('touchstart');
      //   var bot = document.getElementById('my-video');
      //  bot.addEventListener('touchstart', function () {
      //   that.video.play();
      
      //    $("#my-video")[0].click()
      //     $("#my-video_html5_api")[0].click();
      //  });
    
      //  this.creatTouchstartEventAndDispatch(bot);
      },
      creatTouchstartEventAndDispatch (el) {
        var event = document.createEvent('Events');
        event.initEvent('touchstart', true, true);
          el.dispatchEvent(event);
      },
    
     initVideo(){
      var that=this;
      //$("#source1").attr("src",this.src1);
      //$("#my-video").attr("poster",this.poster);
  
      setTimeout(function(){
        that.video=videojs('my-video', {
          bigPlayButton: false,
          textTrackDisplay: false,
          posterImage: true,
          errorDisplay: false,
          controlBar: true
          }, function () {
            this.play();
            this.load();
            that.$parent.shareBtn();
           
          }) 
         },300)  
          
        }


    }
  };
</script>
<style  >
  .video-js{
    width: 100% !important;
    height: 375px !important;
  }
.video-box{
  height: 375px !important;
}
  .vjs-has-started.vjs-user-inactive.vjs-playing .vjs-control-bar{
    opacity: 1 !important;
  }
  .video-js .vjs-progress-control .vjs-progress-holder{
    margin: 0px 0px !important;
  }
.defaultVideo {
  height: 375px;
}
.defaultVideo .playBtn_box{
  position: absolute;
    top: 50%;
    left: 50%;
    -webkit-transform: translate(-50%,-50%);
    transform: translate(-50%,-50%);
    height: 80px;
    height: 60%;
    width: 100%;
    z-index: 99;
    /* background-color: #0000002e; */
}
.defaultVideo .playBtn{
  position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%,-50%);
    height: 60px;
    width: auto;
}


.defaultVideo .vjs-paused.vjs-button > .vjs-icon-placeholder:before {
  font-size: 5.8em;
  padding-top: 130px;
}
.defaultVideo .vjs-custom-skin > .video-js{
height: 100%;
  /* width: auto; */
}
.defaultVideo .vjs-custom-skin > .video-js .vjs-big-play-button{
   display: none !important;
}
.video-js .vjs-big-play-button{
  display: none !important;
}
.defaultVideo .playBox{
position:absolute;
top: 50%;
left: 50%;
transform: translate(-50%,-50%);
display: flex;
width: 70%;
height: 70%;
justify-content: center;
align-items: center;
z-index: 99;

}
.video-js .vjs-tech{
  /* height: auto !important; */
     max-width: 100% !important;
    width: auto !important;
    margin: 0 auto;
    top: 48% !important;
    left: 50% !important;
    -o-object-fit: fill !important;
    object-fit: fill !important;
    max-height: 310px !important;
    height: auto !important;
    -webkit-transform: translate(-50%,-50%) !important;
    transform: translate(-50%,-50%) !important;
}

  .vjs-poster{
background-size: cover;
}
.video-box{
width: 100%;
height:auto;
margin-left: auto;
margin-right: auto;
position:relative;
}
.defaultVideo .video-js .vjs-play-progress:before{
display:none;
}
.defaultVideo .video-js .vjs-progress-holder{
height:4px;
}
.video-js .vjs-mute-control .vjs-icon-placeholder:before, .vjs-icon-volume-high:before{
  content: "" !important;
}
.vjs-custom-skin>.video-js .vjs-play-progress, .vjs-custom-skin>.video-js .vjs-volume-level{
  background:rgba(255,102,140,1);
}
 .video-js .vjs-play-progress{
height:4px;
background:rgba(255,102,140,1) !important;
}
 .video-player{
width:100%;
height: 375px;
background-color: black;
    display: flex;
    align-items: center;
}
.video-js .vjs-control-bar{
    background-color: rgba(43,51,63,0)!important;
}
.video-js .vjs-fullscreen-control{
display:none;
}
.video-js .vjs-volume-panel{
  position: absolute !important;
    right: -15px;
    bottom: 10px;
    padding-left: 4px !important;
    height: 20px !important;
}
 .video-js .vjs-fullscreen-control{
display:none !important;
}
.video-js .vjs-time-control{
  margin-top: -23px !important;
    position: absolute !important;
    left: 15px !important;
 
    overflow: hidden;
    height: 20px !important;
    width: 38px !important;
    line-height: inherit !important;
}
.vjs-icon-volume-high:before, .video-js .vjs-mute-control .vjs-icon-placeholder:before{
content: "";
}
.vjs-icon-volume-mute:before, .video-js .vjs-mute-control.vjs-vol-0 .vjs-icon-placeholder:before{
content: "";
}
 .vjs-vol-1,  .vjs-vol-2,.vjs-vol-3{
  background-image: url("../../../src/assets/video/colume2.png") !important;
background-position:50% 50%;background-size:cover;background-repeat:no-repeat !important;
background-size: 40% !important;
}
 .vjs-vol-0{
  background-image: url("../../../src/assets/video/colume1.png") !important;
 background-position:50% 50%;background-size:cover;background-repeat:no-repeat !important;
 background-size: 40% !important;

}
 .vjs-big-play-button{
top:50% !important;
left:50%  !important;
transform: translate(-50%,-50%);
}
.video-js .vjs-progress-control .vjs-progress-holder{
margin:0px 0px;
}
 .video-js .vjs-play-control{

}
 .vjs-paused.vjs-button>.vjs-icon-placeholder:before{
    font-size: 5.8em;
}   
 .video-js .vjs-playing {

   position: absolute !important;
  top: 50% !important;
  left: 50% !important;
  transform: translate(-50%,-375px);
  width: 80%;
  height:220px;

  opacity: 0;
}
.video-js .vjs-paused {
  position: absolute !important;
  top: -375px;
  left: 50% !important;
  transform: translateX(-50%);
  height: 375px;
  width: 100%;
  background-color: rgba(0,0,0,0.3);
}
.video-js .vjs-control-bar{
height:auto !important;
}
  .ios .vjs-remaining-time-display{
  margin-left: -7px !important;
    z-index: 1;
    position: absolute !important;
    font-size: 12px !important;
    left: 0px;
}
  .android .vjs-remaining-time-display{
    margin-left: -4px !important;
    z-index: 1;
    position: absolute !important;
    font-size: 12px !important;
    left: 0px;
  }

</style> 