<template>
	<div class="consult-container">
		<ul class="list" v-if="isloadEnd">
			<li>
				<a :href="serviceOpenimAccount">
					<em></em>
					<div>专业咨询</div>
					<span></span>
				</a>
			</li>
			<li>
				<a :href="afterSaleServer">
					<em></em>
					<div>售后咨询</div>
					<span></span>
				</a>
			</li>
		</ul>
	</div>
</template>
<script>

    import axios from 'axios'
    import commonJs from '@/util/common.js'

	export default{
		name: 'consult',
		data(){
			return{
				sessToken: null,
				serviceOpenimAccount: null, //专业咨询顾问账号
				afterSaleServer: null, //售后咨询顾问账号
				isloadEnd: false //页面是否加载完毕
			}
		},
		mounted(){

			document.title = '客服及信息';

			//设置sessToken
			this.setSessToken();

			//获取OpenIM账号
			this.getOpenImNumber();
		},
		methods:{
			getOpenImNumber(){//获取OpenIM账号
				axios.get('https://api.hxsapp.com/account/userAccount/getOpenIMAccount',{params:{
					sess_token: this.sessToken
				}}).then((res)=>{
					if(res.data.code == 200){

						let appVersion = commonJs.getHxsAppVersion();
						let isTrue = commonJs.compareAppVersion(appVersion, '3.1.1');
						if(isTrue){
							//专业咨询顾问账号
							this.serviceOpenimAccount = 'https://hxsapp_openim_page?service_id=' + res.data.data.service_openim_account + '&title=' + encodeURIComponent('专业咨询');

							//售后咨询顾问账号
							this.afterSaleServer = 'https://hxsapp_openim_page?service_id=' + res.data.data.after_sale_server + '&title=' + encodeURIComponent('售后咨询');
						}else{

							//专业咨询顾问账号
							this.serviceOpenimAccount = 'https://hxsapp_openim#' + res.data.data.service_openim_account; 

							//售后咨询顾问账号
							this.afterSaleServer = 'https://hxsapp_openim#' + res.data.data.after_sale_server;

						}
					}

					//提醒页面已加载完毕
					this.isloadEnd = true;
				})
			},
			setSessToken(){//设置sessToken 
				this.sessToken = commonJs.getUrlParam('sess_token');
			}
		},
		beforeDestroy(){
			document.title = commonJs.config.webTitle;
		}
	}
</script>
<style scoped lang="less">
	.consult-container{
		.list{
			padding-left:14px;
			li{
				a{
					width: 100%;
					height: 100%;
					display: block;
				}
				height: 52px;
				padding-right:14px;
				border-bottom: rgba(129, 141, 207,0.16) solid 1px;
				div{
					height: 22px;
					line-height: 22px;
					font-size: 15px;
					color: #666;
					letter-spacing: -0.32px;
					padding:15px 0;
					float:left;
				}
				span{
					width: 8px;
					height: 14px;
					background:url(../../assets/lvshou/img/return-blue.png) left top no-repeat;
					background-size:100%;
					float: right;
					margin-top: 19px;
				}
			}
			li:nth-of-type(1){
				em{
					width:21px;
					height: 21px;
					float: left;
					margin-right: 10px;
					background:url(../../assets/lvshou/img/order_icon_consult.png) left top no-repeat;
					background-size:100%;
					margin-top: 16px;
				}
			}
			li:nth-of-type(2){
				em{
					width:21px;
					height: 23px;
					float: left;
					margin-right: 10px;
					background:url(../../assets/lvshou/img/order_icon_service.png) left top no-repeat;
					background-size:100%;
					margin-top: 16px;
				}
			}
		}
	}
</style>