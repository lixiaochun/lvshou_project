<template>		
	<div class="loginBox" v-if="isShow" @click="showloginpage"></div>
</template>
<script>
	import commonJs from '@/util/common.js'
	export default{
		data(){
			return {
				isShow: false
			}
		},
		mounted(){
			//判断是否登录
			this.showLoginBox();
		},
		methods:{
			showLoginBox(){
				this.isShow = !commonJs.isLogin();
			},
			showloginpage(){
				window.location.href = "https://hxsapp_showloginpage";
			}
		},
		beforeDestroy(){
				this.isShow = false;
		}
	}
</script>
<style scoped>
.loginBox{
	width: 100%; 
	height: 100%;
	position: absolute;
	left:0; 
	top:0;
	z-index: 99;
}
</style>