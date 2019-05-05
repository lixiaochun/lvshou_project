<template>
	<div class="vipClub-container" :class="{notScroll:popupVisible}">
		<div :style="popupVisible? ContainerActive: windowScrollTopFn()">
			<div class="head" v-if="userInfoData">
				<span class="imgBox" :style="{background:'url(' + userInfoData.headImg + ') center center /150% no-repeat'}"></span>
				<div class="userInfo">
					<p>{{ userInfoData.name }}</p>
					<div>{{ vipGradeText }}</div>
				</div>
			</div>
			<div class="main">
				<div class="grade-icon-box">
					<ol class="grade-icon">
						<li>
							<span :class="{on:LvshouLevel == 1}"></span>
							<em>悦享</em>
						</li>
						<li>
							<span :class="{on:LvshouLevel == 2}"></span>
							<em>惠享</em>
						</li>
						<li>
							<span :class="{on:LvshouLevel == 3}"></span>
							<em>优享</em>
						</li>
						<li>
							<span :class="{on:LvshouLevel == 4}"></span>
							<em>尊享</em>
						</li>
						<li>
							<span :class="{on:LvshouLevel == 5}"></span>
							<em>尊享+</em>
						</li>
					</ol>
					<div class="dashed"></div>
				</div>
				<div class="grade-explain">
					<div class="common-title">
						<div>
							<span></span>
							<em>会员等级</em>
							<span></span>
						</div>
					</div>
					<ul>
						<li class="clearfix" :class="{active:LvshouLevel == 1}">
							<img src="../../assets/lvshou/img/grade/center_icon_vip_disabled.png">
							<div class="text" :style="{width:gradeExplainTextWidth}">
								<em>悦享会员</em>
								<p>即会员当日起，两年内消费额为1-1000元</p>
							</div>
						</li>
						<li class="clearfix" :class="{active:LvshouLevel == 2}">
							<img src="../../assets/lvshou/img/grade/center_icon_dm_disbled.png">
							<div class="text" :style="{width:gradeExplainTextWidth}">
								<em>惠享会员</em>
								<p>即会员当日起，两年内消费额为1001-10000元</p>
							</div>
						</li>
						<li class="clearfix" :class="{active:LvshouLevel == 3}">
							<img src="../../assets/lvshou/img/grade/center_icon_gift_disbled.png">
							<div class="text" :style="{width:gradeExplainTextWidth}">
								<em>优享会员</em>
								<p>即会员当日起，两年内消费额为10001-19999元</p>
							</div>
						</li>
						<li class="clearfix" :class="{active:LvshouLevel == 4}">
							<img src="../../assets/lvshou/img/grade/center_icon_senior_disbled.png">
							<div class="text" :style="{width:gradeExplainTextWidth}">
								<em>惠享会员</em>
								<p>即会员当日起，两年内消费额≥20000元，消费次数<6</p>
							</div>
						</li>
						<li class="clearfix" :class="{active:LvshouLevel == 5}">
							<img src="../../assets/lvshou/img/grade/center_icon_vvip_disbled.png">
							<div class="text" :style="{width:gradeExplainTextWidth}">
								<em>尊享PLUS</em>
								<p>即会员当日起，两年内消费额≥20000元，消费次数≥6</p> 
							</div>
						</li>
					</ul>
				</div>
				<div class="vip-term-tip">会员等级有效期至2018年1月1日，后期将更新，敬请期待。</div>
				<div class="vip-rights">
					<div class="common-title">
						<div>
							<span></span>
							<em>会员权益</em>
							<span></span>
						</div>
					</div>
					<div class="content" v-if="activeLegalRight">
						<ul>
							<li @click="selectExplainText(0)">
								<span :class="{not: activeLegalRight[0]==0}"></span>
								<em>生日礼遇</em>
							</li><!-- 
							<li @click="selectExplainText(1)">
								<span :class="{not: activeLegalRight[1]==0}"></span>
								<em>生日积分</em>
							</li> -->
							<li @click="selectExplainText(2)">
								<span :class="{not: activeLegalRight[2]==0}"></span>
								<em>消费送分</em>
							</li>
							<li @click="selectExplainText(3)">
								<span :class="{not: activeLegalRight[3]==0}"></span>
								<em>积分兑换</em>
							</li>
							<li @click="selectExplainText(4)">
								<span :class="{not: activeLegalRight[4]==0}"></span>
								<em>免费试用</em>
							</li>
						</ul>
						<ul>
							<li @click="selectExplainText(5)">
								<span :class="{not: activeLegalRight[5]==0}"></span>
								<em>积分抽奖</em>
							</li>
							<li @click="selectExplainText(6)">
								<span :class="{not: activeLegalRight[6]==0}"></span>
								<em>异业优惠</em>
							</li>
							<li @click="selectExplainText(7)">
								<span :class="{not: activeLegalRight[7]==0}"></span>
								<em>会员日秒杀</em>
							</li>
							<li @click="selectExplainText(8)">
								<span :class="{not: activeLegalRight[8]==0}"></span>
								<em>尊享活动</em>
							</li>
						</ul>
						<ul>
							<li @click="selectExplainText(9)">
								<span :class="{not: activeLegalRight[9]==0}"></span>
								<em>专属客服</em>
							</li>
							<li>
								<span></span>
								<em>敬请期待</em>
							</li>
							<li>
								<span></span>
								<em>敬请期待</em>
							</li>
							<li>
								<span></span>
								<em>敬请期待</em>
							</li>
						</ul>
					</div>
				</div>
				<mt-popup v-model="popupVisible" position="center">
					<div class="rightsInterest">
						<span class="closeBtn" @click="closeMintPopup"></span>
						<div class="title">{{ vipExplainActiveTitle }}</div>
						<div class="textBox">
							<div class="cont" v-html="vipExplainActiveContent"></div>
						</div>
					</div>
				</mt-popup>
			</div>
		</div>
		<preLoading v-if="!isLoadEnd"></preLoading>
	</div>
</template>
<script>
	
    import axios from 'axios'
    import { Popup } from 'mint-ui';
	import commonJs from '@/util/common.js'
	import preLoading from '@/components/preLoading'

	export default{
		name:'vipClub',
		data(){
			return{
				sessToken: null,
				userInfoData: null,//用户信息
				vipGradeText: null,//会员等级名称
				LvshouLevel: null,//会员等级
				vipExplainText:null, //所有权益说明内容
				gradeExplainTextWidth:null,//设置会员等级消费说明的盒子长度
				vipLegalRight: null, //对应是否拥有某个权益
				activeLegalRight: null, //当前等级拥有的权限
				popupVisible: false,//弹窗是否展示控制
				vipExplainActiveTitle: null,//当前说明弹窗的title
				vipExplainActiveContent: null,//当前说明弹窗的title
				isLoadEnd: false,//页面是否加载完毕
				windowScrollTop: null
			}
		},
		mounted(){
			//设置title
			commonJs.setTitle('会员俱乐部');

			//设置sessToken
			this.setSessToken();

			//判断是否登录，没有登录调起登录框
			this.loginApp();

			//获取用户信息
			this.getUserInfo();

			//获取绿瘦会员等级
			this.getLvshouGrade();
			
			//设置会员等级消费说明的盒子长度
			this.setGradeExplainTextWidth();

			//会员权益说明text
			this.setExplainText();
		},
		methods:{
			getUserInfo(){//获取用户信息
				axios.get('https://api.hxsapp.com/account/userInfo/getSelfUserInfo',{params:{
					sess_token: this.sessToken
				}}).then((res)=>{
					console.log(res);
					if(res.data.code == 200){
						this.userInfoData = res.data.data;
						let data = res.data.data
						//用户信息
						this.userInfoData = {
							name: commonJs.subStlength(data.nickname),
							headImg: data.head_img 
						}
					}
				})
			},
			getLvshouGrade(){//获取绿瘦会员等级
				axios.get('https://api.hxsapp.com/mall/Lsuser/userMember',{params:{
					sess_token: this.sessToken
				}}).then((res)=>{
					console.log(res)
					if(res.data.code == 200){

						//会员等级对应的css中的class
						//let vipGradeTextArr = [
							//'悦享会员',
							//'惠享会员',
							//'优享会员',
							//'尊享会员',
							//'尊享PLUS会员'
						//];
						
						//会员等级
						this.LvshouLevel = res.data.data.level;
						this.vipGradeText = res.data.data.levelName;

						//会员拥有对用的权限
						this.activeLegalRight = this.vipLegalRight['level' + parseInt(this.LvshouLevel)];
					}

					setTimeout(()=>{
						this.isLoadEnd = true;
					},900)
				})
			},
			setSessToken(){
				this.sessToken = commonJs.getUrlParam('sess_token');
			},
			loginApp(){//调起登录框
				if(!this.sessToken || this.sessToken.length < 5){
					window.location.href = 'https://hxsapp_showloginpage';
				}
			},
			setGradeExplainTextWidth(){//设置会员等级消费说明的盒子长度
				this.gradeExplainTextWidth = document.documentElement.clientWidth - 30-2-40-20-7 + 'px';
			},
			windowScrollTopFn(){
				if(!this.windowScrollTop) return;
				setTimeout(()=>{
					document.body.scrollTop = this.windowScrollTop;
					document.documentElement.scrollTop  = this.windowScrollTop;
				},1)

			},
			selectExplainText(childIndex){//打开弹窗

				//如果等级没有这个权益 不显示弹窗
				if(!this.activeLegalRight[childIndex]) return;


				//展示权益说明
				this.popupVisible = true;
				this.windowScrollTop =  document.documentElement.scrollTop || document.body.scrollTop;
				
				this.ContainerActive = {
			    	position: 'absolute',
			    	overflow: 'hidden',
					top: -this.windowScrollTop + 'px'
				}

				let activeApp = this.vipExplainText[childIndex];
				this.vipExplainActiveTitle = activeApp.title;
				this.vipExplainActiveContent = activeApp.text;
			},
			closeMintPopup(){//关闭弹窗
				this.popupVisible = false;
			},
			setExplainText(){//会员权益说明text
				this.vipExplainText = [
					{
						title:'生日折扣礼',
						text:'生日当月可在积分商城以折扣的优惠兑换礼品，会员等级不同所享有的折扣特权不同。<br>尊享PLUS会员：8折<br>尊享会员：8.5折<br>优享会员：9折<br>惠享会员：9.2折<br>悦享会员：9.5折<br>例如：积分商城中A产品需用5000积分兑换，如您是尊享PLUS会员，且本月是您的生日月，则A产品您可享受8折兑换特权，故5000*0.8=4000积分即可兑换。'
					},
					{
						title:'生日送积分',
						text:'生日当天可享有积分赠送，会员等级不同所赠送的积分分值不同。<br>尊享PLUS会员：700分<br>尊享会员：600分<br>优享会员：500分<br>惠享会员：300分<br>悦享会员：100分'
					},
					{
						title:'消费送积分',
						text:'消费5元送1积分，消费金额以签收金额为准，积分于签收产品的次日发放账户中。'
					},
					{
						title:'积分兑礼',
						text:'账户的积分可在商城兑换相应的礼品，兑换成功后积分在账户中扣除，礼品于兑换后的3个工作日内以快递的形式发货。'
					},
					{
						title:'免费试用',
						text:'账户中的积分可在积分商城中，兑换绿瘦新推出或研发的新品试用装。兑换后积分扣除，所兑换礼品于3个工作日内发货。'
					},
					{
						title:'积分抽奖',
						text:'账户中的积分可在抽奖专区抽奖，抽奖后积分扣除，所兑换礼品是虚拟奖品的当时发奖，所兑换礼品是实物的于3个工作日内发货。'
					},
					{
						title:'异业优惠',
						text:'享受与异业合作的联合优惠，例如：积分兑换爱奇艺会员月卡，积分+**金额兑换鲜花一束。'
					},
					{
						title:'会员秒杀日',
						text:'每月15日为会员秒杀日，秒杀的产品于3个工作日内发货。'
					},
					{
						title:'尊享活动',
						text:'尊享PLUS会员享受不定期尊享活动，例如：慈善基金会、体验式旅游、私人订制礼品等。'
					},
					{
						title:'专属客服',
						text:'尊享PLUS会员享有专属客服通道，咨询相关问题。'
					}
				];

				//对应是否拥有某个权益， 1为有，0为没有
				this.vipLegalRight = { 
					level1:[0,1,0,0,0,1,0,0,0,0],
					level2:[1,1,1,1,0,1,1,0,0,0],
					level3:[1,1,1,1,1,1,1,0,0,0],
					level4:[1,1,1,1,1,1,1,0,0,0],
					level5:[1,1,1,1,1,1,1,1,1,1]

					// level1:[0,0,0,0,1,0,0,0,0],
					// level2:[1,1,1,0,1,1,0,0,0],
					// level3:[1,1,1,1,1,1,0,0,0],
					// level4:[1,1,1,1,1,1,0,0,0],
					// level5:[1,1,1,1,1,1,1,1,1]

				};
			}
		},
		components:{
			preLoading
		},
		beforeDestory(){
        	document.title = commonJs.config.webTitle;
            document.body.scrollTop = 0;
			document.documentElement.scrollTop  = 0;
		}
	}

</script>
<style scoped lang="less">
	.vipClub-container{
		&.notScroll{
			width: 100%;
			height: 100%;
			position: absolute;
			overflow: hidden;
		}
		.head{
			width: 100%;
			height: 64px;
			padding-top: 20px;
			background: url(../../assets/lvshou/img/club_icon_bg.png) left top no-repeat;
			background-size: 100% 100%;
			.imgBox{
				width: 52px;
				height: 52px;
				float: left;
				border-radius: 50%;
				margin-left: 28px;
				margin-right: 10px;
			}
			.userInfo{
				float:left;
				p{
					height: 21px;
					line-height: 21px;
					font-size: 15px;
					color: #5E6095;
					margin-bottom: 6px;
				}
				div{
					height: 20px;
					line-height: 20px;
					padding:0 7px;
					text-align: center;
					color:#fff;
					font-size:11px;
					background-image: linear-gradient(-270deg, #F88C72 0%, #FF68B0 97%);
					box-shadow: 0 1px 2px 0 rgba(198,31,97,0.48);
					border-radius: 15px;
				}
			}
		}
		.main{
			.grade-icon-box{
				position: relative;
				.grade-icon{
					display: flex;
					display: -webkit-flex;
					justify-content: space-between;
					-webkit-justify-content: space-between;
					padding:0 15px;
					position: relative;
					z-index: 5;
					li{
						padding-top: 5px;
						span{
							width:44px;
							height: 44px;
							margin-bottom: 10px;
							display: block;
							margin-top: 14px;
							&.on{
								width: 64px;
								height: 60px;
								margin-bottom: 4px;
								margin-top: 4px;
							}
						}
						em{	
							height: 15px;
							line-height: 15px;
							font-size: 11px;
							color: #9B9B9B;
							display: block;
							text-align: center;
							letter-spacing: 1px;
						}
					}
					li:nth-of-type(1){
						span{
							background: url(../../assets/lvshou/img/grade/club_icon_vip.png) left top no-repeat #fff;
							background-size:100%;
							&.on{
								background: url(../../assets/lvshou/img/grade/club_icon_vip_on.png) left top no-repeat #fff;
								background-size:100%;
							}
						}
					}
					li:nth-of-type(2){
						span{
							background: url(../../assets/lvshou/img/grade/club_icon_dm.png) left top no-repeat #fff;
							background-size:100%;
							&.on{
								background: url(../../assets/lvshou/img/grade/club_icon_dm_on.png) left top no-repeat #fff;
								background-size:100%;
							}
						}
					}
					li:nth-of-type(3){
						span{
							background: url(../../assets/lvshou/img/grade/club_icon_gift.png) left top no-repeat #fff;
							background-size:100%;
							&.on{
								background: url(../../assets/lvshou/img/grade/club_icon_gift_on.png) left top no-repeat #fff;
								background-size:100%;
							}
						}
					}
					li:nth-of-type(4){
						span{
							background: url(../../assets/lvshou/img/grade/club_icon_senior.png) left top no-repeat #fff;
							background-size:100%;
							&.on{
								background: url(../../assets/lvshou/img/grade/club_icon_senior_on.png) left top no-repeat #fff;
								background-size:100%;
							}
						}
					}
					li:nth-of-type(5){
						span{
							background: url(../../assets/lvshou/img/grade/club_icon_vvip.png) left top no-repeat;
							background-size:100%;
							&.on{
								background: url(../../assets/lvshou/img/grade/club_icon_vvip_on.png) left top no-repeat;
								background-size:100%;
							}
						}
					}
				}
				.dashed{
					width: 85%;
					position: absolute;
					top: 38px;
					left: 50%;
					margin-left: -43%;
					opacity: 0.37;
					border: 1px dashed rgba(168,70,255,0.40);
					z-index: 4;
				}
			}
			.common-title{
				height: 24px;
				padding-bottom: 19px;
				display:-webkit-box;
				-webkit-box-pack:center;
				div{
					span{
						width:46px;
						height: 1px;
						background: #B3B3B3;
						float: left;
						margin-top: 11px;
					}
					em{
						height: 24px;
						line-height: 24px;
						float: left;
						font-size:18px;
						letter-spacing: 3.5px;
						padding:0 7px;
					}
				}
			}
			.grade-explain{
				padding: 27px 15px 0;
				ul{
					border-top:solid 1px #E1E1E1;
					border-left:solid 1px #E1E1E1;
					border-right:solid 1px #E1E1E1;
					li{
						display: flex;
						display: -webkit-flex;
						padding:18px 10px 18px;
						border-bottom:solid 1px #E1E1E1;
						&.active{
							background: #F8F5FF;
						}
						img{
							width:40px;
							height: 40px;
							margin-right: 7px;
						}
						.text{
							em{
								height: 20px;
								line-height: 20px;
								font-size: 14px;
								color: #615697;
								letter-spacing: 2px;
								display: block;
							}
							p{
								line-height: 16px;
								color: #999999;
								font-size: 14px;
							}
						}
					}
				}
			}
			.vip-term-tip{
				font-size: 14px;
				line-height: 20px;
				color: #333;
				padding: 12px 15px 0;
			}
			.vip-rights{
				padding-top: 25px;
				.content{
					ul{
						display: flex;
						display: -webkit-flex;
  						flex-wrap: wrap;
						-webkit-justify-content: space-between;
						padding:0 32px;
						li{
  							box-sizing: border-box;
  							margin-bottom: 34px;
							span{
								width: 35px;
								height: 29px;
								display: block;
								margin:0 auto;
								margin-bottom: 6px;
							}
							em{
								width: 100%;
								height: 18px;
								line-height: 18px;
								font-size: 12px;
								color: #636363;
								letter-spacing: -0.2px;
								margin:0 auto;
								text-align: center;
								display: block;
							}
						}
					}
					ul:nth-of-type(1){
						li:nth-of-type(1){
							span{
								padding-top: 3px;
								margin-top: -3px;
								background: url(../../assets/lvshou/img/vipRights.png) -1px -1px no-repeat;
								background-size:288px;
								&.not{
									background: url(../../assets/lvshou/img/vipRightsNone.png) -1px -1px no-repeat;
									background-size:288px;
								}
							}
						}
						// li:nth-of-type(2){
						// 	span{
						// 		padding-top: 3px;
						// 		margin-top: -3px;
						// 		background: url(../../assets/lvshou/img/vipRights.png) -88px 1px no-repeat;
						// 		background-size:288px;
						// 		&.not{
						// 			background: url(../../assets/lvshou/img/vipRightsNone.png) -88px 1px no-repeat;
						// 			background-size:288px;
						// 		}
						// 	}
						// }
						li:nth-of-type(2){
							span{
								padding-top: 3px;
								margin-top: -3px;
								background: url(../../assets/lvshou/img/vipRights.png) -173px -1px no-repeat;
								background-size:288px;
								&.not{
									background: url(../../assets/lvshou/img/vipRightsNone.png) -173px -1px no-repeat;
									background-size:288px;
								}
							}
						}
						li:nth-of-type(3){
							span{
								padding-top: 3px;
								margin-top: -3px;
								background: url(../../assets/lvshou/img/vipRights.png) -257px 0 no-repeat;
								background-size:288px;
								&.not{
									background: url(../../assets/lvshou/img/vipRightsNone.png) -257px 0 no-repeat;
									background-size:288px;
								}
							}
						}
						li:nth-of-type(4){
							span{
								padding-top: 3px;
								margin-top: -3px;
								background: url(../../assets/lvshou/img/vipRights.png) -1px -68px no-repeat;
								background-size:288px;
								&.not{
									background: url(../../assets/lvshou/img/vipRightsNone.png) -1px -68px no-repeat;
									background-size:288px;
								}
							}
						}
					}
					ul:nth-of-type(2){
						li:nth-of-type(1){
							span{
								padding-top: 3px;
								margin-top: -3px;
								padding-right: 4px;
								background: url(../../assets/lvshou/img/vipRights.png) -84px -68px no-repeat;
								background-size:288px;
								&.not{
									background: url(../../assets/lvshou/img/vipRightsNone.png) -84px -68px no-repeat;
									background-size:288px;
								}
							}
						}
						li:nth-of-type(2){
							span{
								padding-top: 3px;
								margin-top: -3px;
								background: url(../../assets/lvshou/img/vipRights.png) -166px -68px no-repeat;
								background-size:288px;
								&.not{
									background: url(../../assets/lvshou/img/vipRightsNone.png) -166px -68px no-repeat;
									background-size:288px;
								}
							}
						}
						li:nth-of-type(3){
							span{
								padding-top: 3px;
								margin-top: -3px;
								padding-right: 3px;
								background: url(../../assets/lvshou/img/vipRights.png) -248px -66px no-repeat;
								background-size:288px;
								&.not{
									background: url(../../assets/lvshou/img/vipRightsNone.png) -248px -66px no-repeat;
									background-size:288px;
								}
							}
						}
						li:nth-of-type(4){
							span{
								padding-top: 3px;
								margin-top: -3px;
								background: url(../../assets/lvshou/img/vipRights.png) -1px -134px no-repeat;
								background-size:288px;
								&.not{
									background: url(../../assets/lvshou/img/vipRightsNone.png) -1px -134px no-repeat;
									background-size:288px;
								}
							}
						}
					}
					ul:nth-of-type(3){
						li:nth-of-type(1){
							span{
								padding-top: 3px;
								margin-top: -3px;
								background: url(../../assets/lvshou/img/vipRights.png) -88px -135px no-repeat;
								background-size:288px;
								&.not{
									background: url(../../assets/lvshou/img/vipRightsNone.png) -88px -135px no-repeat;
									background-size:288px;
								}
							}
						}
						li:nth-of-type(2){
							span{
								padding-top: 3px;
								margin-top: -3px;
								background: url(../../assets/lvshou/img/vipRights.png) -172px -134px no-repeat;
								background-size:288px;
							}
						}
						li:nth-of-type(3){
							span{
								padding-top: 3px;
								margin-top: -3px;
								background: url(../../assets/lvshou/img/vipRights.png) -172px -134px no-repeat;
								background-size:288px;
							}
						}
						li:nth-of-type(4){
							span{
								padding-top: 3px;
								margin-top: -3px;
								background: url(../../assets/lvshou/img/vipRights.png) -172px -134px no-repeat;
								background-size:288px;
							}
						}
					}
					
				}
			}
		}
		.mint-popup{
			width:100%;
			min-height: 100px;
			background: transparent;
			.rightsInterest{
				width: 68%;
				padding: 20px 17px;
				background: #fff;
				margin:0 auto;
				border-radius: 15px;
				.closeBtn{
					width: 35px;
					height: 35px;
					position: absolute;
					right: 32px;
					top: -10px;
					background: url(../../assets/lvshou/img/vip_explain_close.png) left top no-repeat;
					background-size:100%;
				}
				.title{
					height: 30px;
					text-align: center;
					color: #333;
				}
				.textBox{
					min-height: 100px;
					max-height: 200px;
					overflow-y: scroll;
					-webkit-overflow-scrolling: touch;
					overflow-x: hidden;
					.cont{
						line-height: 24px;
						color: #333;
						font-size: 14px;
					}
				}
			}
		}
	}
</style>