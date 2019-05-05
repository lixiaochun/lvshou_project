<template>
	<div class="extend">
			<div class="act_title">
				<img :src=actTitleUrl>
			</div>

			<div id="signUpPageAct">

				<div v-show="isPreLoading && !signUpProtocol">
					<!-- 此段必须要引入 -->
					<div id="_umfp" style="display:inline;width:1px;height:1px;overflow:hidden;text-indent:-99999em;"></div>

					<!-- 引入结束 -->
					<div class="input_box">
						<input id="phoneNumber" type="number" pattern="[0-9]*" placeholder="请输入手机号" v-model="phoneNumber" />
					</div>
					
					<div id="dom_id" class="input_box" style="border: 0 none;height:auto;">
					</div>

					<div class="input_box">
						<input id="yzmStr" type="number" pattern="[0-9]*" placeholder="请输入验证码" v-model="yzmStr" @click="check_yzm" />
						
						<div class="send_yzm" @click="send_yzm">
							{{text}}
						</div>
					</div>


					<div class="input_box">
						<input id="yqmStr" type="text" placeholder="请输入邀请码（选填）" v-model="yqmStr" />
					</div>
					<div class="desc_info">
						使用朋友给你的邀请码，你们均可获得福利。
					</div>

					<div class="res_btn_box">
						<div class="submit_button" @click="res_btn">
							绑定春联
						</div>
						<p>将春联绑定到好享瘦账号</p>
						<p>
							绑定即为同意
							<span @click="showSignUpProtocol">
								《用户协议》
							</span>
						</p>
					</div>

				</div>
				<!-- 用户协议相关 -->
				<div class="signUpProtocolFix" v-show="signUpProtocol" @click="hideSignUpProtocol">
					关闭
				</div>
				<signUpProtocol v-show="signUpProtocol">
				</signUpProtocol>


				<preLoading v-show="!isPreLoading"></preLoading>

			</div>
	</div>
	
</template>
<script>
	import commonJs from '@/util/common.js'
	import axios from 'axios'
	
	// 初始化loadding的组件
	import preLoading from "@/components/preLoading"
	import signUpProtocol from "@/pages/signUpProtocol"
	
	import { Toast } from 'mint-ui';

	function huaDongSdk( callback ){

		window.nc_appkey =  'FFFF000000000177D557'; // 应用标识,不可更改
    window.nc_scene = 'register_h5';  //场景,不可更改
		window.nc_token = [nc_appkey, (new Date()).getTime(), Math.random()].join(':');
		

		var nc_option = {
			renderTo: '#dom_id',//渲染到该DOM ID指定的Div位置
			appkey: nc_appkey, 
			scene: nc_scene,
			token: nc_token,
			// trans: '{"name1":"code0"}',//测试用，特殊nc_appkey时才生效，正式上线时请务必要删除；code0:通过;code100:点击验证码;code200:图形验证码;code300:恶意请求拦截处理
			callback: function (data) {// 校验成功回调
				// debugger
				console.log(JSON.stringify( data ) )
				callback && callback( data )
			},
			error: function (s) {
				console.log(JSON.stringify(s))
			},
			verifycallback: function (data) {
				if (data.code == "200") {
					Toast("验证没有通过")
				}
			}
		};

		if ( process.env.NODE_ENV == 'production' ){
			nc_option = Object.assign({},nc_option)
		}else{
			nc_option = Object.assign({},{
				trans: '{"name1":"code100"}'
			},nc_option)
		}

		NoCaptcha.init(nc_option);
		NoCaptcha.setEnabled(true);
	}

	export default{
		name: 'signUpPageAct',
		data(){
			return {

				signUpProtocol:false,

				// 是否重新设置验证码
				isReSetYzm:false,
				// 是否显示loading
				isPreLoading:false,
				// 阿里滑动验证触发后的回调数据
				huaDongSdkData:null,
				// 滑动验证的锁判断
				isLock:false,
				// 验证码的倒计时
				second:60,
				// 判断获取验证码/倒计时/重新获取的文字
				time: -1,

				// disabled: false,

				// 手机号码数据
				phoneNumber:'',
				// 邀请码数据
				yqmStr:"",
				// 验证码数据
				yzmStr:"",

				actTitleUrl: require('./../assets/actimages/couplets.jpg')
			}	
		},
		components: {
			preLoading,
			signUpProtocol
		},
		watch:{
			phoneNumber:function(val,oldval){
				console.log(val)
				if(val.length>11) {
					this.phoneNumber = val.slice(0,11)
				}
			},
			yzmStr:function(val,oldval){
				console.log(val)
				if(val.length>4) {
					this.yzmStr = val.slice(0,4)
				}
			}
		},

		computed: {
			isLogin: function() {
				return commonJs.isLogin()
			},
			isApp: function() {
				return commonJs.isApp()
			},
			text: function () {
				if( this.time != -1){
					return this.time > 0 ? this.time + ' s' : '重新获取';
				}else{
					return '获取验证码';
				}
			}
		},
		
		mounted(){
			this.initHuaDongSdk()

			this.phoneNumber = this.$route.query.phoneNumber ? this.$route.query.phoneNumber : "" ;
			
			this.yqmStr = this.$route.query.inviteCode ? this.$route.query.inviteCode :"";  
			
			document.title = '绑定春联';
			
			setTimeout( () => {
				this.isPreLoading = true;
			},300)
		},

		methods:{
			// 内嵌阿里云sdk－js
			initHuaDongSdk(){

				huaDongSdk((data)=>{
					
					
					this.isLock = true;
					this.huaDongSdkData = data;
					Toast("滑动验证解锁了！")
				});
			},
			//  执行定时器
			run() {
				this.time = this.second
				this.timer()
			},
			//  递归定时器
			timer() {
				if (this.time > 0) {
					this.time--;
					setTimeout(this.timer, 1000);
				}
				if( this.time == 0){
					this.isReSetYzm = true;
				}
			},

			//加载页面 
			readLoadPage( code ){
				// NoCaptcha.reset()
				
			  var __inviteCode = commonJs.getUrlParam('inviteCode') ? commonJs.getUrlParam('inviteCode') : "" ;
				var __url  = commonJs.config.prefixUrl + "signUpPageAct?inviteCode=" + __inviteCode;
				var __phoneNumber = this.phoneNumber ;

				if( code && code == "600"){
					Toast("该手机号已注册")

					setTimeout(()=>{

						// act 的 判断跳回的逻辑处理！
						if( this.$route.query.jump_url ){

							var __jump_url = this.$route.query.jump_url;
							var __phone_number = this.phoneNumber;

							if( __jump_url.indexOf("?") >= 0 ){
								__jump_url += "&phone_number=" + __phone_number;  
							}else{
								__jump_url += "?phone_number=" + __phone_number;  
							}

							window.location.replace( __jump_url )

						}else{
							window.location.replace(__url)
						}
						
					},3000)
				}else{
					__url =  __url + "&phoneNumber=" + __phoneNumber;
					window.location.replace(__url)
				}
				return;
			},

			// 发送验证码
			send_yzm(){
				console.log($("#phoneNumber").val())

				if( !this.isLock ){
					Toast("请先滑动解锁")
					return;
				}

				if( this.time > 0){
					console.log("倒计时中，不能点击执行")
					return;
				}

				if( this.isLock && this.isReSetYzm){
					this.readLoadPage()
				}

				console.log("send_yzm");

      	var isPhoneNumber = /^(1[3-8][0-9])\d{8}$/.test( parseInt(this.phoneNumber) );

				console.log("send_yzm");
				if( $("#phoneNumber").val().length == 0 ){
				// if( this.phoneNumber == ''){
					Toast("手机号码不能为空")
					return;
				}else if( !isPhoneNumber ){
					Toast("手机号码有误，请重填");
					return;
				}else{
					$("#phoneNumber").blur()
					var __ncpc = JSON.stringify(this.huaDongSdkData);

					var json = {
						mobile: this.phoneNumber,
						smsType:'register',
						app_name:"hxs_h5",
						ncpc:__ncpc,
						appkey: nc_appkey, 
						scene: nc_scene,
						token: nc_token,
					};
					axios({
						method: 'POST',
						url: 'https://api.hxsapp.com/account/userAccount/sendSMS',
						data: json,
						transformRequest: [function (data) {
							// Do whatever you want to transform the data
							let ret = ''
							for (let it in data) {
								ret += encodeURIComponent(it) + '=' + encodeURIComponent(data[it]) + '&'
							}
							return ret
						}],
						headers: {
							'Content-Type': 'application/x-www-form-urlencoded'
						}
					}).then((res) => {
						console.log(JSON.stringify(res))
						// 请求正常
						if (res.data.code == 200) {
							var data = res.data.data;
							Toast(res.data.msg)
							this.run()
						// 短信接口请求频繁
						}else if(res.data.code == 601) {
							Toast(res.data.msg)
						// 短信请求其他异常 
						}else{
							Toast(res.data.msg)
							
							this.readLoadPage( res.data.code );
						}

					}).catch((error) => {
						console.log("error")
						console.log(error);
						Toast('验证码接口繁忙，请稍后再试');

					});

				}

			},
			// 检查验证码
			check_yzm(){
				if( !this.isLock ){
					Toast("请先滑动解锁")
					return
				}

				console.log("check_yzm")
				var isPhoneNumber = /^(1[3-8][0-9])\d{8}$/.test( parseInt(this.phoneNumber) );

				if( $("#phoneNumber").val().length == 0 ){
					Toast("手机号码不能为空")
					$("#yzmStr").blur()
					$("#phoneNumber").focus()
					return
				}else if (!isPhoneNumber ){
					Toast("手机号码有误，请重填");
					return
				}else {
					console.log("可以do-input_yzm")
				}

			},
			// 注册按钮的事件
			res_btn(){
				
				if( !this.isLock ){
					Toast("请先滑动解锁")
					return
				}

				console.log("check_yzm")
				var isPhoneNumber = /^(1[3-8][0-9])\d{8}$/.test( parseInt(this.phoneNumber) );

				if( this.phoneNumber == "" ){
					Toast("手机号码不能为空")
					$("#yzmStr").blur()
					$("#phoneNumber").focus()
					return
				}else if (!isPhoneNumber ){
					Toast("手机号码有误，请重填");
					return
				}else if (this.yzmStr == "") {
					Toast("验证码不能为空")
					return
				}
				
				console.log("这里去调用李丰的接口,test")				
				var json = {
					username: this.phoneNumber,
					verifyCode:this.yzmStr,
					app_name:"hxs_h5",
					invited_code: this.yqmStr
				};
				
				axios.get('https://api.hxsapp.com/account/userAccount/register', {
					params: json
				}).then( (res) => {
					// debugger
					console.log(JSON.stringify(res))

					if (res.data.code == 200) {
						
						this.showSignUpSuccess(res.data)

					}else if (res.data.code == 602) {
						
						// this.showSignUpSuccess(res.data)
						var __inviteCode = commonJs.getUrlParam('inviteCode') ? commonJs.getUrlParam('inviteCode') : "" ;
						var __url  = commonJs.config.prefixUrl + "signUpPageAct?inviteCode=" + __inviteCode;
						var __phoneNumber = this.phoneNumber ;
						Toast(res.data.msg)
						setTimeout(()=>{
							// act 的 判断跳回的逻辑处理！
							if( this.$route.query.jump_url ){

								var __jump_url = this.$route.query.jump_url;
								var __phone_number = this.phoneNumber;

								if( __jump_url.indexOf("?") >= 0 ){
									__jump_url += "&phone_number=" + __phone_number;  
								}else{
									__jump_url += "?phone_number=" + __phone_number;  
								}

								window.location.replace( __jump_url )

							}
							
						},3000)

					}else{
							
						Toast(res.data.msg)
					}
				})
			},

			// 查看注册成功页面
			showSignUpSuccess(data){
				var __url = commonJs.config.prefixUrl+"signUpSuccess";
				if( this.$route.query.jump_url && data.data.user_id ){
					__url += "?jump_url=" + encodeURIComponent(this.$route.query.jump_url) + "&user_id=" + data.data.user_id
				}
				// window.location.href = __url;
				window.location.replace(__url)
			},

			// 查看用户协议页面
			showSignUpProtocol(){
				var __url = commonJs.config.prefixUrl+"signUpProtocol";
				if( this.isApp ){
					commonJs.h5CallAppAction.hxsapp_new_webview( encodeURIComponent(__url) )
				}else{
					this.signUpProtocol = true;
					
					// $("#signUpPageAct").css({
					// 	"height": $(window).height()+"px"
					// })
					

					// 单页面的 spa路由
					// this.$router.push({
					// 	path:'/signUpProtocol'
					// });

					// window.location.href = __url;

				}
			},
			hideSignUpProtocol(){
				this.signUpProtocol = false;
				// $("#signUpPageAct").css({
				// 	"height": "auto"
				// })
			}
		},


		beforeDestroy(){
			delete window.nc_appkey; 
			delete window.nc_scene;
			delete window.nc_token;

			document.title = commonJs.config.webTitle;

			// $("body").off('touchmove')
		}
	}
</script>
<style lang="less" >
	.act_title{
		width: 100%;
		img{
			width: 100%
		}
	}
	#signUpPageAct{
		width: 100%;
		padding: 15px;
		box-sizing: border-box;

		// 阿里滑动sdk-重置样式－开始
		._nc{
			width: 80%;
			margin: 0 auto;
		}
		#nc_1-stage-1{
			padding: 0;
			.slider{
				left: 0;
				right:0;
				.bg-green{
					background: linear-gradient(-270deg, #FF6E8D 0%, #FF68B0 97%);
				}
				.icon-ok{
					color: #FF68B0;
				}
			}
		}
		// 阿里滑动sdk-重置样式－结束
		.input_box{
			width: 100%;
			position: relative;
			height: 50px;
			line-height: 49px;
			box-sizing: border-box;
			border-bottom: 1px solid rgba(129,141,207,0.20); 
			margin-bottom: 15px;
			input{
				width: 100%;
				padding-right:85px;
				box-sizing: border-box;
				height: 50px;
				font-size: 15px;
				&::-webkit-input-placeholder {
					color:#818dcf;
					opacity: .7;
				}
			}
			.send_yzm{
				position: absolute;
				right: 0;
				top:10px;
				width: 85px;
				height: 30px;
				display: block;
				line-height: 28px;
				border: 1px solid #818dcf;
				border-radius: 50px;
				text-align: center;
				box-sizing: border-box;
				color:#818dcf;
				font-size: 13px;
			}
		}
		.desc_info{
			font-size: 13px;
			color: #999;
		}

		.res_btn_box{
			margin: 84px auto 0;
			width: 100%; 
			text-align: center;
			.submit_button{
				display: inline-block;
				width: 300px;
				height: 45px;
				line-height: 45px;
				text-align: center;
				background-image: linear-gradient(-270deg, #FF6E8D 0%, #FF68B0 97%);
				border-radius: 32px;
				font-size:17px;
				color: #fff;
			}
			p:nth-child(2){
				font-size:15px;
			}
			p{
				margin: 12.5px 25px;
				font-size:13px;
				color: #999;
				span{
					color:#818dcf;
				}
			}
		}

		// 弹出关闭的按钮
		.signUpProtocolFix{
			position: fixed;
			width: 30px;
			height:30px;
			text-align: center;
			line-height: 30px;
			top:0;
			right: 0;
			font-size: 12px;
			background: linear-gradient(-270deg, #FF6E8D 0%, #FF68B0 97%);
			color: #fff;
			z-index: 2;
		}

	}
</style>