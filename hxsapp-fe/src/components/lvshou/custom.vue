<template>
	<div>
		<a href="javascript:;" id="custom" @click="toConsultPage"></a>
	</div>
</template>
<script>
	import commonJs from '@/util/common.js'
	export default{
		name: 'custom',
		data(){
			return {
				sessToken:null
			}
		},
		mounted(){
			//设置sessToken
			this.setSessToken();
		},
		methods:{
			setSessToken(){
				this.sessToken = commonJs.getUrlParam('sess_token');
			},
			toConsultPage(){
				setTimeout(()=>{
					window.location.href = 'https://hxsapp_new_webview#https://app.hxsapp.com/hxsweb/lvshou/consult';
				},200);
			}
		}
	}
</script>
<style scoped>
	#custom{
		width: 65px;
		height: 65px;
		position: fixed;
		right: 10px;
		bottom: 10px;
		background: url(../../assets/lvshou/img/center_icon_kefu-default.png) left top no-repeat;
		background-size: 100%;
	}
</style>