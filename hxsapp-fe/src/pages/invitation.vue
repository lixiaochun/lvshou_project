<template>
	<div class="invitation-container">
		<div class="point-bg"></div>
		<div class="main">
			<div class="user-info" v-if="userInfo">
				<span :style="{background:'url(' + userInfo.headImg + ') center center /135% no-repeat'}"></span>
				<p>{{userInfo.name}}</p>
				<p v-if="welfareText && welfareText.length > 0 ">送你<em>{{welfareText.length}}</em>项福利</p>
			</div>
			<div class="welfareBox" v-if="welfareText && welfareText.length > 0 ">
				<div class="title">注册享好礼</div>
				<ul>
					<li v-for="(item,index) in welfareText" :key="index">{{item}}</li>
				</ul>
			</div>
			<div class="invitation-code">
				<p>专属邀请码</p>
				<p class="codeBtn" :data-clipboard-text="invitationCodeText">{{ invitationCodeText }}</p>
				<a href="javascript:;" @click="goSignPageFn">注册领取福利</a>
			</div>
		</div>
	    <preLoading v-if="!(invitationCodeStatu && userInfo)"></preLoading>
		<downToLinkedMe v-if="linkedMe" :linkedMe='linkedMe'></downToLinkedMe>
	</div> 
</template>
<script>

	import Vue from 'vue';
	import axios from 'axios';
	import { Toast } from 'mint-ui'
	import Clipboard from "clipboard";
	import down from '@/components/down'
	import commonJs from '@/util/common.js';
	import preLoading from '@/components/preLoading'
	import downToLinkedMe from "@/components/downToLinkedMe"

	export default{
		data(){
			return{
				userId:null,//用户id
				invitationCodeText:null,//邀请码
				userInfo:null,//用户详细信息
				welfareText: null, //福利内容
        		linkedMe:null,//接入linkedme在微信打开app
        		invitationCodeStatu: false
			}
		},
		mounted(){

			this.userId = this.$route.params.userId;

			//获取用户信息
			this.getUserInfo();

			//获取福利内容
			this.getWelfareText();

			//获取邀请码
 			this.getInvitationCodeText();

			//点击复制到粘贴板
		  	Vue.nextTick(() => {
				this.clipboard();
			});

			//设置linkedMe的路径
			this.setLinkedMe();

		},
		methods:{
		    getUserInfo(){//获取用户信息
		    	axios.get('https://api.hxsapp.com/account/userInfo/getUserInfo',{params:{
		    		user_id: this.userId
		    	}}).then((res)=>{
		    		if(res.data.code == 200){
		    			let data = res.data.data[this.userId];

		    			//组合用户信息
			    		this.userInfo = {
			    			name: commonJs.subStlength(data.nickname),
			    			headImg: data.head_img
			    		}

			    		//页面设置标题
			    		commonJs.setTitle(this.userInfo.name + '邀请你注册好享瘦');

			    		//微信分享
			    		commonJs.outSideShare({
			    			title: this.userInfo.name + '邀你一起来嗨瘦！',
			    			desc: '多重豪礼送不停，赶快来体验吧！',
			    			link: 'https://app.hxsapp.com/hxsweb/invitation/' + this.userId,
			    			img:'https://app.hxsapp.com/static/wechat_invite.png'
			    		});
		    		}
		    	});
		    },
		    getWelfareText(){//获取福利内容
		    	axios.get('https://act.hxsapp.com/app/Weal/lists',{params:{
		    		last_id: 0
		    	}}).then((res)=>{
		    		if(res.data.code == 200){
		    			console.log(res);
		    			this.welfareText = [];
		    			for (var i = 0; i < res.data.data.rows.length; i++) {
		    				if(i <= 2){
		    					this.welfareText.push('福利'+ (i+1) + '：' + res.data.data.rows[i].title); //最终输出格式 福利1：XXX	
		    				}else{
		    					return;
		    				}
		    			}
		    		}
		    	});
		    },
		    getInvitationCodeText(){//获取邀请码
		    	axios.get('https://api.hxsapp.com/account/userInfo/getInviteCode',{params:{
		    		user_id: this.userId
		    	}}).then((res)=>{

		    		if(res.data.code == 200){
		    			//组合邀请码
			    		if(res.data.data.invite_code){
			    			this.invitationCodeText = res.data.data.invite_code;	
			    		}
		    		}
		    		
		    		this.invitationCodeStatu = true;
		    	});
		    },
		    clipboard(){//点击复制到粘贴板
			    var _this = this;
			    var isClick = false;//复制限制提示语间隔 (配合setTimeout使用)
			    var clipboard = new Clipboard('.codeBtn');

				clipboard.on('success', function(e) {
		        	clipboardToast('复制成功');
				});

				clipboard.on('error', function(e) {
		        	clipboardToast('请长按拷贝');
				});
 
			    function clipboardToast(msg){//点击复制回调信息提示
		        	if(!isClick){
						isClick = true;
		        		Toast({
						   message: msg,
						   duration: 1000
						});

						setTimeout(()=>{
							isClick = false;
						},1000);
		        	}
			    }
		    },
			goSignPageFn(){//跳转到H5注册页面
				let inviteCode = this.invitationCodeText || '';
				if(inviteCode == 'null') inviteCode = '';
				this.$router.push({ 
					path: '/signUpPage?inviteCode=' + inviteCode
				});
				// window.location.href = '/signUpPage?inviteCode=' + inviteCode;
			},
			setLinkedMe(){
				//接入linkedMe在非app浏览器直接打开app
			    this.linkedMe = {
			        params:{
			          "key": 'hxsapp://home'
			        }
			    }
			}
		},
	    components:{
	        downToLinkedMe,
	        preLoading
	    },
		beforeDestroy(){
        	document.title = commonJs.config.webTitle;
		}
	}
</script>
<style scoped lang="less">
	.invitation-container{
		.codeBtn{
			cursor: pointer;
		}
		width: 100%;
		min-height: 100%;
		background: url(../assets/images/invitation-bg.png) repeat #fff;
		position: absolute;
		.point-bg{
			width: 100%;
			height: 246px;
			background: url(../assets/images/invitation-point-bg.png) left top no-repeat;
			background-size: 100%;
			position: absolute;
			left: 0;
			top: 0;
			z-index: 1;
		}
		.main{
			padding-top: 44px;
			position: relative;
			z-index: 2;
			.user-info{
				padding-bottom: 23px;
				span{
					width: 68px;
					height: 68px;
					margin-bottom:9px;
					display: block;
					margin: 0 auto;
					border-radius: 50%;
					margin-bottom: 10px;
				}
				p{
					width:100%;
					height: 22px;
					line-height: 22px;
					color:#333;
					font-size: 16px;
					text-align: center;
					em{
						color: #ff648d;
					}
				}
			}
			.welfareBox{
				width: 89%;
				margin: 0 auto;
				margin-bottom: 38px;
				background: #fff;
				border-radius: 8px;
				-webkit-box-shadow:4px 4px 12px -2px rgba(20%,20%,40%,0.5);
				.title{
					height: 40px;
					line-height: 40px;
					padding: 8px 0 0;
					color:#333;
					font-size: 18px;
					text-align: center;
				}
				ul{
					padding:0 5%;
					padding-bottom: 29px;
					li{
						line-height: 20px;
						color: #666;
						margin-top: 9px;
					}
				}
			}.invitation-code{
				p{
					text-align: center;
				}
				p:nth-of-type(1){
					height: 22px;
					line-height: 22px;
					color: #333;
					font-size: 20px;
					margin-bottom: 10px;
				}
				p:nth-of-type(2){
					height: 32px;
					line-height: 32px;
					color: #fe668c;
					font-size: 30px;
					margin-bottom: 23px;
				}
				a{
					width: 63%;
					height: 48px;
					margin: 0 auto;
					text-align: center;
					line-height: 48px;
					color: #fff;
					font-size: 20px;
					display: block;
					background:-webkit-gradient(linear, left top, right top, from(#ff6cb3), to(#ff638b));
					border-radius: 30px;
				}
			}

		}
	}
</style>