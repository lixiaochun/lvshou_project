<template>
	<div>
		<preLoading v-if="!isPreLoading"></preLoading>

		<div class="signPage">
			<div class="sign_topbox">
				<div>
					<p class="sign_state">今天已签到，马上翻牌抽奖吧</p>
					<!--  <p>今天已签到，已完成翻牌抽奖</p> -->
				</div>
			</div>
			<div class="sign_linebox">
				<hr>
			</div>
			<div class="sign_content">
				<ul class="sign_cardbox">
					<li v-for='n in 3' :key='n'>
						<!-- <div class="sign_card" v-for='m in 3' :key='m' :class='cardType' @click='switchCard( (n-1) *3 + (m-1) )'> -->
						<div class="sign_card" v-for='m in 3' :key='m' :class='cardType'>
							<div class="sign_card_flipper" :style='signFlip'>
								<div class="sign_cardfront" :style='cardFront'></div>
								<div class="sign_cardback" :style='cardBack'></div>
							</div>
						</div>
					</li>
				</ul>
				<div class="sign_rewardtitle">
					<hr>
					<span>获奖名单</span>
					<hr>
				</div>
				<ul class="sign_rewardlist">
					<li class="" v-for='n in 9' :key='n'>
						<span>{{rewardListName[n]}}</span>
						<span>翻到</span>
						<span>{{rewardListAward[n]}}</span>
					</li>
				</ul>
			</div>
		</div>
	</div>
</template>
<script>
import common from '@/util/common.js'
import { Toast } from 'mint-ui'

// 初始化loadding的组件
import preLoading from "@/components/preLoading"

export default {
	name: 'sign',
	data() {
		return {
			isPreLoading: false,
			url: '',
			userInfo: {
				sess_token: ''
			},
			clicked: false,
			// 获奖名单数组
			rewardListName: [],
			rewardListAward: [],
			// 卡面翻转样式
			cardType: {
				switchCardOpen: false,
				switchCardClose: false
			},
			signFlip: null,
			cardFront: null,
			cardBack: null
		}
	},

	mounted() {
		document.title = '';
		common.buriedPoint({ 
			access_occurred_type: 260004,//发生访问的【页面】类型
			access_occurred_type_id: "",//发生访问的【页面】类型ID
			previous_event_type_obj: '',//【事件】对象类型
			previous_event_type_obj_id: '',//【事件】对象类型ID
			previous_content_sort: ''//【事件】事件参数
		});

		// 用户信息
		this.userInfo.sess_token = common.getUrlParam('sess_token');

		this.loadState();
		this.loadRewardList();
		this.switchCard();
		this.locationHref();
	},
	components: {
		preLoading
	},
	methods: {
		locationHref() {
			let sessToken = common.getUrlParam('sess_token');
			this.isPreLoading = true
			if (!sessToken) {
				this.url = 'https://act.hxsapp.com/html/appSign/sign.html';
			} else {
				this.url = 'https://act.hxsapp.com/html/appSign/sign.html?sess_token=' + sessToken;
			}

			// window.location.replace(this.url)
		},
		switch() {

		},
		switchCard() {
			var token = this.userInfo.sess_token
			var that = this
			// var model = common.getUrlParam('model_idfa');
			$('.sign_card').on('click', function() {
				var _this = $(this);
				var cardplace = _this.attr('data-place')
				if (common.isLogin()) {
					var clickJson = {
						sess_token: token,
						// model_idfa: model,
						place: cardplace
					}

					$.getJSON('https://act.hxsapp.com' + '/userSignDraw/Draw/signDraw?callback=?', clickJson, (data) => {
						if (data.code == 200 || data.code == 201) {
							common.buriedPoint({
								access_occurred_type: 260005,//发生访问的【页面】类型
								access_occurred_type_id: "",//发生访问的【页面】类型ID
								previous_event_type_obj: '',//【事件】对象类型
								previous_event_type_obj_id: '',//【事件】对象类型ID
								previous_content_sort: ''//【事件】事件参数
							});

							that.clicked = true;
							//翻转牌面
							_this.find($('.sign_card_flipper')).addClass('sign_card_flip');
							_this.find($('.sign_cardback')).css({
								'background': 'url(' + data.data.parameter[0].image + ') top left no-repeat',
								'background-size': '100% 100%'
							});
							$('.sign_card').addClass('switchCardClose');
							_this.addClass('switchCardOpen').removeClass('switchCardClose');

							//处理其他牌背景
							for (var i = 0; i < $('.switchCardClose').length; i++) {
								var j = i + 1;
								$('.switchCardClose>.sign_card_flipper>.sign_cardback').eq(i).css({
									'background': 'url(' + data.data.parameter[j].image + ') top left no-repeat',
									'background-size': '100% 100%',
								})
							}

							//其他牌翻转
							setTimeout(function() {
								$('.switchCardClose>.sign_card_flipper').addClass('sign_card_flip');
								$('.switchCardClose>.sign_card_flipper>.sign_cardback').addClass('sign_card_gray');
							}, 1500)

							//中奖数据
							that.loadRewardList()
							// this.loadState()
						}
						Toast(data.msg)
					})
				} else {
					common.h5CallAppAction.hxsapp_showloginpage()
				}
			})
		},
		loadState() {
			let that = this
			$('.sign_card').addClass('closed')
			$.getJSON('https://act.hxsapp.com' + '/userSignDraw/Draw/userDrawState?callback=?', that.userInfo, function(data) {
				if (data.code == 200 || data.code == 203) {
					that.clicked = true
					$.getJSON(_ACTHOST + '/userSignDraw/Draw/signDrawLog?callback=?', that.userInfo, function(result) {
						var flipPlace = result.data.place
						if (!result.data.place) {
							flipPlace = 4
						}
						var _this = $('.sign_card').eq(flipPlace)

						$('.sign_card').addClass('switchCardClose');
						_this.addClass('switchCardOpen').removeClass('switchCardClose');
						// 翻转第一张牌
						setTimeout(function() {
							_this.find($('.sign_card_flipper')).addClass('sign_card_flip');
							_this.find($('.sign_cardback')).css({
								'background': 'url(' + result.data.parameter[0].image + ') top left no-repeat',
								'background-size': '100% 100%'
							});
						}, 1000)

						for (var i = 0; i < $('.switchCardClose').length; i++) {
							var j = i + 1;
							$('.switchCardClose>.sign_card_flipper>.sign_cardback').eq(i).css({
								'background': 'url(' + result.data.parameter[j].image + ') top left no-repeat',
								'background-size': '100% 100%',
							})
						}

						// 其他牌翻转
						setTimeout(function() {
							$('.switchCardClose>.sign_card_flipper').addClass('sign_card_flip');
							$('.switchCardClose>.sign_card_flipper>.sign_cardback').addClass('sign_card_gray');
						}, 2000)
					})
				}

				if (data.code == 401) {
					$('.sign_state').text('完成签到才能翻盘抽奖哦')
				} else {
					$('.sign_state').text(data.msg)
				}
			})

			//牌面添加编号
			$.each($('.sign_card'), function(i) {
				$(this).attr('data-place', i)
			})

		},
		loadRewardList() {
			let _this = this
			$.getJSON('https://act.hxsapp.com' + '/userSignDraw/Draw/winningList?callback=?', _this.userInfo, function(data) {
				for (let i = 0; i < data.data.length; i++) {
					_this.rewardListName.push(data.data[i].name)
					_this.rewardListAward.push(data.data[i].award)
				}
			})
		}
	},
	beforeDestroy() {
		document.title = common.config.webTitle;
	}
}
</script>
<style lang="less" scoped>
hr {
	border: none;
}

.sign_topbox {
	margin: 45px auto 0 auto;
	text-align: center;
}

.sign_topbox div {
	display: inline-block;
	border: #fee0b3 4px solid;
	box-shadow: 0 4px #ffad33;
	border-radius: 4px;
	padding: 16px 24px;
	background-color: #FFF;
}

.sign_topbox p {
	color: #000;
	font-weight: bold;
	font-size: 16px;
}

.sign_linebox {
	margin-top: 4px;
	text-align: center;
}

.sign_linebox hr {
	height: 45px;
	width: 2px;
	background-color: #fee0b3;
	margin: 0 auto;
	border: none;
}

.sign_content {
	border-top: #fee0b3 1px solid;
	border-left: #fee0b3 1px solid;
	border-right: #fee0b3 1px solid;
	border-top-left-radius: 5px;
	border-top-right-radius: 5px;
	background-color: #FFF;
	margin: 0 12px;
	padding: 32px 12px 0 12px;
}

.sign_cardbox li {
	display: flex;
	display: -webkit-flex;
	justify-content: space-around;
	-webkit-justify-content: space-around;
}

.sign_card {
	/*height: 9rem;
	width: 6.66rem;*/
	height: 135px;
	width: 100px;
	display: inline-block;
	margin: 12px 6px;
	perspective: 1000;
}

.sign_card_flipper {
	position: relative;
	transition: .8s;
	transform-style: preserve-3d;
	height: 100%;
	width: 100%;
}

.sign_cardfront {
	background: url(https://act.hxsapp.com/html/appSign/img/sign_card.png) top left no-repeat;
	background-size: 100% 100%;
	z-index: 2;
	transform: rotateY(0deg);
}

.sign_cardback {
	background: url(https://act.hxsapp.com/html/appSign/img/sign_card2.png) top left no-repeat;
	background-size: 100% 100%;
	transform: rotateY(180deg);
	-webkit-transform: rotateY(180deg);
}

.sign_cardfront,
.sign_cardback {
	-webkit-backface-visibility: hidden;
	backface-visibility: hidden;
	height: 100%;
	width: 100%;
	cursor: pointer;
	position: absolute;
	top: 0;
	left: 0;
}

.sign_cardbox {
	perspective: 1000;
	transition: 0.6s;
	transform-style: preserve-3d;
	position: relative;
}

.sign_card_flip {
	transform: rotateY(180deg);
	-webkit-transform: rotateY(180deg);
}

.sign_card_gray {
	-webkit-filter: grayscale(100%);
	filter: grayscale(100%);
	filter: gray;
}

.sign_rewardtitle {
	text-align: center;
}

.sign_rewardtitle hr {
	height: 2px;
	width: 25%;
	display: inline-block;
	background-color: #fee0b3;
	margin: 0 auto;
	vertical-align: middle;
	margin: 20px 0 22.5px 0;
}

.sign_rewardtitle span {
	color: #000;
	font-weight: bold;
	font-size: 16px;
	margin: 0 2%;
}

.sign_rewardlist {
	padding: 0 12px 22.5px 12px;
	li {
		display: flex;
		display: -webkit-flex;
		-webkit-justify-content: space-between;
		justify-content: space-between;
		margin: 7.5px 0;
		span {
			font-size: 12px;
		}
		span:nth-child(1) {
			width: 35%;
		}
		span:nth-child(2) {
			width: 15%;
			text-align: center;
		}
		span:nth-child(3) {
			width: 50%;
			text-align: right;
		}
	}
}

// .sign_rewardlist li span:nth-child(1) {
// 	width: 35%;
// }
// .sign_rewardlist li span:nth-child(2) {
// 	width: 15%;
// 	text-align: center;
// }
// .sign_rewardlist li span:nth-child(3) {
// 	width: 50%;
// 	text-align: right;
// }
.sign_bottom {
	height: auto;
	margin: 0 12px;
	width: calc(100% - 24px);
}
</style>
