<template>
	<div class="signUpSuccess">
		<img src="./../assets/img/chenggong@2x.png" />

		<p>
			恭喜您，注册成功！
		</p>

		<div id="signUpSuccessPageLinkedMeBtn" @click="clickTips">

		</div>

		<div class="bg_signin">
		</div>
    <!--<router-link to="/signUpFail">Go to fail</router-link>-->

	</div>
</template>
<script>
	import commonJs from '@/util/common.js'
	// 初始化loadding的组件
	import preLoading from "@/components/preLoading"
	import { Toast } from 'mint-ui';

	export default{
		name: 'signUpSuccess',
		data(){
			return{
			}
		},
		components: {
			preLoading
		},
		computed: {
			isLogin: function() {
				return commonJs.isLogin()
			},
			isApp: function() {
				return commonJs.isApp()
			}
		},

		methods:{
			clickTips(){
				if($("#linkedMeBtn").length ){
					Toast("正在打开好享瘦，请稍候！")
				}
			},
			share(){
				console.log(commonJs)
				// 具体的场景去调用 shareBtnInApp函数
				window[commonJs.config.hxsBridgeObject].shareBtnInApp( {name:"wuwanbin"},function(data){
					// data是app返回的数据
					// 根据app返回的data数据格式来处理业务

					// {
					// 	code:200,
					// 	data:{
					// 		name:'jerry',
					// 		work:"前端开发"
					// 	}
					// }
					if(data.code == 200){
						console.log("回调成功了-shareBtnInApp")
					}
				})

			},
			goActPage(){
				var __url = "";
				var __user_id = this.$route.query.user_id;
				var __jump_url = this.$route.query.jump_url;

				if( __jump_url && __user_id ){
					__url = this.$route.query.jump_url;

					if( __url.indexOf("?") >= 0 ){
						__url += "&user_id=" + __user_id;

					}else{
						__url += "?user_id=" + __user_id;
					}

					setTimeout(()=>{
						window.location.replace(__url)
					},2000)

				}
				// window.location.href = __url;

			}

		},
		mounted(){
			this.share();

			document.title = '注册成功';
			// 非app场景下面才有用 有有版本限制 是3.0.1开始的
			if( !this.isApp ){
				// http://wiki.sys.hxsapp.net/pages/viewpage.action?pageId=1998876
				this.linkedMe = {
					domId:"signUpSuccessPageLinkedMeBtn",
					domText:"进入好享瘦",
					params:{
						"key": "hxsapp://home"
					}
				}

				commonJs.linkedMe( this.linkedMe,() => {
					var __href = $("#linkedMeDom .linkedme").attr("href")
					$("#linkedMeBtn").attr("href",__href)
				})
			}

			this.goActPage()

		},
		beforeDestroy(){
			document.title = commonJs.config.webTitle;
		}
	}
</script>

<style lang="less" >

	.signUpSuccess{
		width: 100%;
		margin:0 auto;
		text-align: center;
		padding:50px 15px 15px;
		box-sizing: border-box;
		img{
			width: 90px;
			height: 90px;
			display: inline-block;
		}
		p{
			padding: 25px 0 60px;
			font-size: 15px;
			color: #333;
		}

		#signUpSuccessPageLinkedMeBtn{
			width: 250px;
			height: 45px;
			margin: 0 auto;
			line-height: 45px;
			text-align: center;
			background-image: linear-gradient(-270deg, #FF6E8D 0%, #FF68B0 97%);
			border-radius: 32px;
			font-size:17px;
			a{
				color: #fff;
				display: block;
				width: 250px;
				height: 45px;
			}
		}
		.bg_signin{
			width: 100%;
			height: 205px;
			position: fixed;
			left: 0;
			bottom: 0;
			z-index: 99;
			background: url(../assets/img/bg_signin@2x.png) left top repeat;
			background-size: 100% 100%;
		}
	}
</style>
