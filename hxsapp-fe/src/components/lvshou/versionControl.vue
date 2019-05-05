<template>
	<div class="layerTip" v-if="isCorrectVersion">
		<div class="rightsInterest">
			<span class="closeBtn"></span>
			<div class="rightsInterestTitle">好享瘦APP版本过低</div>
			<div class="textBox">
				<div class="cont">更新即刻查看更多精彩</div>
			</div>
			<a href="https://hxsapp_close" class="determine">确定</a>
		</div>
	</div>
</template>
<script>
	import commonJs from '@/util/common.js'
	export default {
		name: 'versionControl',
		data(){
			return{
				isCorrectVersion: false	
			}
		},
		props:{
			hxsVersion:{
				type: String,
				default: '3.0.0'
			}
		},
		mounted(){
			//判断是否大于传过来版本号，小于提示升级app版本框
			this.matchingVersion();
		},
		methods:{
			matchingVersion(){
				let appVersion = commonJs.getHxsAppVersion();
				let isTrue = commonJs.compareAppVersion(appVersion, this.hxsVersion);
				if(!isTrue){
					this.isCorrectVersion = true;
				}
			}
		}
	}
</script>
<style scoped lang="less">
	.layerTip{
		width:100%;
		height: 100%;
		background: rgba(0,0,0,0.4);
		position: fixed;
		left: 0; 
		top:0;
		z-index: 99;
		.rightsInterest{
			width: 60%;
			padding-top: 20px;
			background: #fff;
			margin:0 auto;
			border-radius: 7px;
			position: absolute;
			left: 50%;
			top:35%;
			margin-left: -30%;
			.closeBtn{
				width: 35px;
				height: 35px;
				position: absolute;
				right: 32px;
				top: -10px;
				background: url(../../assets/lvshou/img/vip_explain_close.png) left top no-repeat;
				background-size:100%;
				display: none;
			}
			.rightsInterestTitle{
				height: 30px;
				text-align: center;
				color: #333;
				padding-top: 5px;
			}
			.textBox{
				min-height: 45px;
				max-height: 200px;
				overflow-y: scroll;
				-webkit-overflow-scrolling: touch;
				overflow-x: hidden;
				.cont{
					line-height: 24px;
					color: #333;
					font-size: 14px;
					text-align: center;
				}
			}
			.determine{
				width: 100%;
				height: 40px;
				line-height: 40px;
				text-align: center;		
				background: #ff68ac;
				color: #fff;
				font-size: 18px;
				border-bottom-left-radius: 7px;
				border-bottom-right-radius: 7px;
				display: block;
			}
		}
	}
</style>