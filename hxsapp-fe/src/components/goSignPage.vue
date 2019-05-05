<template>
	<div>
		<div class="goSignPage-container">
	        <!-- <span class="close"></span> -->
	        <div class="down_main">
	            <div class="logo"></div>
	            <div class="text">变美就差这一步！</div>
	            <a href="javascript:;" @click="goSignPageFn">开始体验</a>
	        </div>
		</div>
	</div>
</template>
<script>

	import commonJs from '@/util/common.js'

	export default{
		name:'goSignPage',
		data(){
			return{

			}
		},
		mounted(){
		},
		methods:{
			goSignPageFn(){
				let inviteCode = commonJs.getUrlParam('inviteCode') || '';
        if(inviteCode == 'null') inviteCode = '';
				this.$router.push({ path: '/signUpPage?inviteCode='+ inviteCode});
			}
		}
	}  
</script>
<style scoped>
.div_none{
	width: 100%;
}
.goSignPage-container{
  width: 100%;
  height: 50px;
  background-image: linear-gradient(-135deg, #E8ECFE 0%, #EBE4FF 100%);
}
.goSignPage-container .close{
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
.goSignPage-container .bg{
  width: 100%;
  height: 100%;
  position: absolute;
  left: 0;
  top: 0;
  z-index: 9;
}
.goSignPage-container .down_main{
  padding: 8px 15px 7px;
  height: 35px;
  position: relative;
  z-index: 10;
}
.goSignPage-container .logo{
	width: 32px;
	height: 32px;
  border-radius: 7px;
  background:url(../assets/images/hxslogo60X60.png) left top no-repeat;
  background-size: 100% 100%;
  float:left;
  margin-right: 7px;
}
.goSignPage-container .text{ 

	height: 35px;
  line-height: 35px;
  color: #818DCF;
  font-size: 17px;
  float:left;
}
.goSignPage-container a{
  width:87px;
  height: 35px;
  line-height: 35px;
  text-align: center;
  background: #ff68ac;
  float: right;
  color:#fff;
  font-size:15px;
  border-radius: 23px;
}
.goSignPage-container .share-img{
  position: absolute;
  right: 5px;
}
</style>
