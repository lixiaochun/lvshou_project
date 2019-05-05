<template>
	<div class="securityCheck-container">
		<div class="sort-box">
			<div class="sort">
				<span class="left"></span>
				<em>01</em>
				<span class="right"></span>
			</div>
			<div class="text">
				<span class="left"></span>
				<em>在防伪标贴中刮开防伪码</em>
				<span class="right"></span>
			</div>
		</div>
		<div class="img-box">
			<img src="./../../assets/lvshou/img/security/bg_scratchsecuritycode.png">
		</div>
		<div class="sort-box">
			<div class="sort">
				<span class="left"></span>
				<em>02</em>
				<span class="right"></span>
			</div>
			<div class="text short">
				<span class="left"></span>
				<em>输入防伪码</em>
				<span class="right"></span>
			</div>
		</div>
		<div class="input-box">
			<div class="number entry clearfix">
				<input type="input" placeholder="6位或者20位数" v-model="checkCode" maxlength="20">
			</div>
			<div class="verification-code entry clearfix">
				<input type="input" placeholder="请输入验证码" v-model="userVerificationCode">
				<em @click="getVerificationCode">看不清,换一张</em>
				<img v-if="imgVerificationCode" class="code" :src="imgVerificationCode">
			</div>
		</div>
		<div class="result-box" v-if="isShowResetBox">
			<div class="result" :class="{resultCorrect: resultStyle}">
				<p>{{checkTip}}</p>
				<a href="javascript:;" @click="isShowResetBoxFn">确定</a>
			</div>
		</div>
		<a href="javascript:;" class="submit" @click="securityCheck">提交查询</a>
		<a href="javascript:;" class="reset" @click="resetFn">重置</a>
	</div>
</template>
<script>

	import commonJs from '@/util/common.js'
	import { Toast } from 'mint-ui';
	import axios from 'axios'

	export default{
		name:'securityCheck',
		data(){
			return{
				isShowResetBox: false,//验证防伪码提示框
				verificationCode: null,//验证码
				imgVerificationCode:null,//验证码图片
				userVerificationCode: null,//用户输入的验证码
				checkCode:null,//防伪码
				checkTip:null,//提示框文本
				resultStyle:false
			}
		},
		mounted(){
			document.title = '商品防伪查询';
			//获取验证码和验证码图片
			this.getVerificationCode();

      common.buriedPoint({
        access_occurred_type: 110204,//发生访问的【页面】类型
        access_occurred_type_id: '',//发生访问的【页面】类型ID
        previous_event_type_obj: '',//【事件】对象类型
        previous_event_type_obj_id: '',//【事件】对象类型ID
        previous_content_sort: ''//【事件】事件参数
      });
		},
		methods:{

			//获取验证码和验证码图片
			getVerificationCode(){
				axios.get('https://api.hxsapp.com/base/Common/getImgCode',{params:{
				}}).then((res)=>{
					console.log(res);
					if(res.data.code == 200){
						this.verificationCode = (res.data.data.text_code).toLowerCase();//验证码
						this.imgVerificationCode = res.data.data.img_code;//验证码图片
					}
				});
			},
			securityCheck(){
				if(!this.userVerificationCode){
					Toast({
					   message: '请输入验证码',
					   duration: 1000
					});
					return false;
				}
				//对比用户输入与后台传过来的验证码
				if(this.verificationCode == this.userVerificationCode.toLowerCase()){
					if(!this.checkCode){
						Toast({
						   message: '请输入防伪码',
						   duration: 1000
						});
						return false;
					}

					//查询验证码
					axios.get('https://api.hxsapp.com/base/Common/checkSecurityCode',{params:{
						security_code: this.checkCode
					}}).then((res)=>{
						if(res.data.code == 200){
							this.checkTip = res.data.data.text;//提示框文字
							this.isShowResetBox = true;//展示提示框
							if((this.checkTip).indexOf('防伪码属于正品') != -1 ){this.resultStyle = true};
						}
						this.getVerificationCode();//重置验证码
					});

				}else{
					Toast({
					   message: '验证码不正确',
					   duration: 1000
					});
				}
			},
			isShowResetBoxFn(){//关闭提示框
				this.isShowResetBox = false;
			},
			resetFn(){//重置输入框
				this.userVerificationCode = null;//验证码
				this.checkCode = null;//防伪码
			}

		},
    beforeDestroy(){
      document.title = commonJs.config.webTitle;
    }
	}
</script>
<style scoped lang="less">
	.securityCheck-container{
		padding-top: 16px;
		.sort{
			width: 79px;
			height: 16px;
			margin:0 auto;
			overflow: hidden;
			margin-bottom: 22px;
			span{
				width: 20px;
				height: 16px;
				float:left;
				&.left{
			        background: url("./../../assets/lvshou/img/security/icon_number_left.png") left top no-repeat;
			        background-size: 100% 100%;
				}
				&.right{
			        background: url("./../../assets/lvshou/img/security/icon_number_right.png") left top no-repeat;
			        background-size: 100% 100%;
				}
			}
			em{
				width: 39px;
				height: 20px;
				line-height: 20px;
				font-size: 17px;
				color: #FF668C;
				letter-spacing: -0.41px;
				text-align: center;
				float: left;
			}
		}
		.text{
			width: 230px;
			height: 18px;
			margin:0 auto;
			span{
				width: 20px;
				height: 16px;
				float:left;
				margin-top: 8px;
				&.left{
			        background: url("./../../assets/lvshou/img/security/font_left.png") left top no-repeat;
			        background-size: 100%;
				}
				&.right{
			        background: url("./../../assets/lvshou/img/security/font_right.png") left top no-repeat;
			        background-size: 100%;
				}
			}
			em{
				line-height: 18px;
				font-size: 15px;
				color: #818DCF;
				text-align: center;
				float: left;
				padding:0 7px;
				background: #F5F5F8;
				border-radius: 100px;
				margin:0 5px;
			}
		}
		.short{
			width: 150px;
		}
		.img-box{
			margin:20px 0;
			img{
				width:53%;
				margin:0 auto;
			}
		}
		.input-box{
			padding:0 15px;
			.entry{
				margin-top: 25px;
				border-bottom: 1px solid rgba(129,141,207,0.20);
				input{
					height: 22px;
					line-height: 22px;
					font-size: 15px;
					color: #333;
					margin-bottom: 10px;
					float: left;
				}
				input::-webkit-input-placeholder{
					opacity: 0.3;
					color: #333;
				}
				&.verification-code{
					input{
						width: 35%;
					}
					.code{
						width: 82px;
						height: 32px;
						float: right;
						margin-top: -8px;
						margin-right: 15px;
					}
					em{
						height: 18px;
						line-height: 18px;
						font-size: 13px;
						color: #818DCF;
						float: right;
					}
				}
			}
		}
		.submit{
			width: 80%;
			height: 45px;
			line-height: 45px;
			margin:0 auto;
			text-align: center;
			margin-top: 40px;
			color: #fff;
			background-image: linear-gradient(-270deg, #FF68B0 0%, #FF6E8D 97%);
			border-radius: 31px;
			display: block;
		}
		.reset{
			width: 100%;
			height: 22px;
			line-height: 22px;
			font-size: 15px;
			color: #818DCF;
			margin-top: 12px;
			text-align: center;
			display: block;
		}
		.result-box{
			width: 100%;
			height: 100%;
			position: fixed;
			left:0;
			top:0;
			background: rgba(51,51,51,0.30);
			.result{
				width: 74%;
				height: 170px;
				position: absolute;
				left: 50%;
				top: 50%;
				margin-left: -37%;
				margin-top: -85px;
				background: #fff;
				border-radius: 5px;
				p{
					padding: 24px;
					line-height: 24px;
					font-size: 15px;
					color:#333;
					text-align: center;
					border-bottom: rgba(129, 141, 207,0.2) 1px solid;
				}
				a{
					height: 50px;
					line-height: 50px;
					font-size: 15px;
					color: #FF668C;
					display: block;
					text-align: center;
				}
			}
			.resultCorrect{
				height: 147px;
			}

		}
	}
</style>
