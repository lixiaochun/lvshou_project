<template>
	<div class="reward-container">
		<div class="text">
			<img src="../assets/images/shang.png">
			<p>点赞是美德 打赏是鼓励</p>
		</div>
		<ul class="quota clearfix">
			<li v-for="(price,index) in prices" :class="{active:index == patternIndex}" @touchstart="select(index)" :key="index">
				{{ '￥' + price }}
			</li>
		</ul>
		<a href="javascript:;" class="wx submit" @click="submit('2')">微信支付</a>
		<a href="javascript:;" class="zfb submit" @click="submit('1')">支付宝支付</a>
		<p class="rule">自愿打赏，不支持退款</p>
	</div>
</template>
<script>
	import common from '@/util/common.js'
	export default{
		name:"reward",
		data(){
			return{
				prices: [
					'1.0',
					'5.0',
					'10.0',
					'20.0',
					'50.0',
					'100.0'
				],
				patternIndex: 0,
				userSelectprice: '1.0',
				articleId: null
			}
		},
		mounted(){
			var _this = this;
			this.articleId = this.$route.params.articleId;

			//埋点
				common.buriedPoint({
			    access_occurred_type: 110405,//发生访问的【页面】类型
			    access_occurred_type_id: _this.articleId,//发生访问的【页面】类型ID
			    previous_event_type_obj: '',//【事件】对象类型
			    previous_event_type_obj_id: '',//【事件】对象类型ID
			    previous_content_sort: ''//【事件】事件参数
				});

				document.title = '打赏';
		},
		methods:{
			select(index){
				this.patternIndex = index;
				this.userSelectprice = this.prices[index];
				//金额埋点
		       common.buriedPoint({
				    access_occurred_type: 211138,//发生访问的【页面】类型
				    access_occurred_type_id: this.articleId,//发生访问的【页面】类型ID
				    previous_event_type_obj: '',//【事件】对象类型
				    previous_event_type_obj_id: '',//【事件】对象类型ID
				    previous_content_sort: ''//【事件】事件参数
		       });
			},
			submit(mode){
				//微信/支付宝埋点
				if(mode == 2){
						common.buriedPoint({
					    access_occurred_type: 211139,//发生访问的【页面】类型
					    access_occurred_type_id: this.articleId,//发生访问的【页面】类型ID
					    previous_event_type_obj: '',//【事件】对象类型
					    previous_event_type_obj_id: '',//【事件】对象类型ID
					    previous_content_sort: ''//【事件】事件参数
						});
				}else if(mode == 1){
						common.buriedPoint({
					    access_occurred_type: 211140,//发生访问的【页面】类型
					    access_occurred_type_id: this.articleId,//发生访问的【页面】类型ID
					    previous_event_type_obj: '',//【事件】对象类型
					    previous_event_type_obj_id: '',//【事件】对象类型ID
					    previous_content_sort: ''//【事件】事件参数
						});
				}
				setTimeout(()=>{
					window.location.href = 'https://hxsapp_reward#' + mode + '#' +  this.userSelectprice + '#' + this.articleId;
				},300);
			}
		},
		beforeDestroy(){
				document.title = common.config.webTitle;
		}
	}
</script>
<style lang="less" scoped>
	@c29:#29CC96;
	.reward-container{
		position: absolute;
		width: 100%;
		min-height: 100%;
	}
	.text{
		margin-top: 20px;
		padding-bottom:47px;
		img{
			width: 86px;
			height:86px;
			margin: 0 auto;
			margin-bottom: 15px;
		}
		p{
			text-align: center;
			color: @c29;
			font-size: 18px;
		}
	}
	.quota{
  		padding: 0 1.38% 33px 6.62%;
		li{
			width: 28.6%;
			height:42px;
			line-height: 42px;
			text-align: center;
		  	border: 1px solid #979797;
			border-radius: 6px;
			margin-right: 4%;
			float: left;
			font-size: 18px;
			color:#666;
			margin-bottom: 15px;
			&.active{
				background: #4990E2;
		  		border: 1px solid #4990E2;
		  		color: #fff;
			}
		}
	}
	.submit{
		width: 66.6%;
		height: 45px;
		text-align: center;
		line-height: 45px;
		color: @c29;
		border-radius: 25px;
		border:solid 1px @c29;
		display: block;
		margin: 0 auto;
		font-size: 18px;
		margin-bottom: 30px;
		position: relative;
		z-index: 3;
	}
	.rule{
		width: 100%;
		height: 16px;
		line-height: 16px;
		font-size: 14px;
		color:#999;
		text-align: center;
		position: absolute;
		left:0;
		bottom:7px;
		z-index: 2;
	}
</style>