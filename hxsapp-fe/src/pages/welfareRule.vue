<template>
	<div class="rule-container" id="new-rule-container">
		<div class="top">
			<p>恭喜你参加</p>
			<p></p>
			<div class="img-box">
				<div class="bg"></div>
				<img src="">
			</div>
			<p></p>
		</div>
		<div class="text-box">
			<div class="title">奖品兑换及使用规则</div>
			<div class="text"></div>
		</div>
		<a href="javascript:;" class="rule-btn">邀请好友抽大奖</a>
        <div class="stressing" id="stressing">
            <span></span>
        </div>
	    <preLoading v-if="!loadEnd"></preLoading>
	</div>
</template>
<script>
    import axios from 'axios'
	import commonJs from '@/util/common.js'
	import preLoading from '@/components/preLoading'
	export default {
	name: 'welfaRule',
	data() {
		return {
			loadEnd:false
		}
	},
	mounted() {
		document.title = '奖品细则';
		this.getWelfareRule();
	},
	methods: {
		getWelfareRule(){

			var ruleId = this.$route.params.id;
			var ruleJson = {
    			id: ruleId,
    			sess_token: commonJs.getUrlParam('sess_token')
    		}

            axios.get('https://act.hxsapp.com/base/Award/detailRule', {params:ruleJson}).then((data) => {
            	console.log(data);
				if(data.data.code == 200){
					var data = data.data.data;
					var title = data.title;
					var award = data.award;
					var imgLink = data.img;
					var ulr = data.rule + '/json';
					var info = '#' + encodeURIComponent(title) + '#'+ encodeURIComponent(award) + '#' + imgLink; 
					var ruleLink = 'https://hxsapp_welfare_info' + info;

					// $('.rule-btn').attr('href', ruleLink);
					$('.rule-btn').click(function(){
						//埋点
			            commonJs.buriedPoint({
						    access_occurred_type: 260806,//发生访问的【页面】类型
						    access_occurred_type_id: '',//发生访问的【页面】类型ID
						    previous_event_type_obj: '',//【事件】对象类型
						    previous_event_type_obj_id: '',//【事件】对象类型ID
						    previous_content_sort: ''//【事件】事件参数
			            });

						setTimeout(()=>{
							window.location.href = ruleLink;
						},300)
					})
					$('.rule-container .top p').eq(1).text(title + '活动');
					$('.rule-container .top p').eq(2).text(award);
					$('.rule-container .img-box img').attr('src', imgLink);


					//获取规则说明
					if(data.rule){
						axios.get(ulr, {params:{}}).then((res) => {
							if(res.data.code == 200){
								$('.text-box .text').append(res.data.data.content);
							}
						})
					}else{
						$('.text-box').hide();
					}

					//埋点
		            commonJs.buriedPoint({
					    access_occurred_type: 150802,//发生访问的【页面】类型
					    access_occurred_type_id: '',//发生访问的【页面】类型ID
					    previous_event_type_obj: '',//【事件】对象类型
					    previous_event_type_obj_id: '',//【事件】对象类型ID
					    previous_content_sort: ''//【事件】事件参数
		            });
				}
				//加载完毕展示页面
				this.loadEnd = true;
			})

			//图片框及图片大小兼容
			// $('.rule-container .img-box').css({
			// 	height: $('.rule-container .img-box').width()
			// });
			// $('.rule-container .img-box img').css({
			// 	height: $('.rule-container .img-box img').width()
			// });
		}
	},
    components:{
        preLoading
    },
	beforeDestroy() {
		document.title = commonJs.config.webTitle;
	}
}
</script>
<style lang="less" scoped>
	.rule-container .top{
		width:100%;
		height: 260px;
		background:url(../assets/images/rule-bg.png) left top no-repeat;
		background-size:100% 100%;
		padding-top: 20px;
	}
	.rule-container .top p{
		width: 100%;
		height: 17px;
		line-height: 17px;
		font-size: 15px;
		color:#fff;
		text-align: center;
		letter-spacing: -0.72px;
		overflow: hidden;
	}
	.rule-container .top p:nth-of-type(1){
		padding-bottom: 5px;
	}
	.rule-container .top p:nth-of-type(3){
		height: 23px;
		line-height: 23px;
		font-size: 17px;
		color:#fff;
		text-align: center;
		padding-top: 20px;
		padding-bottom:20px;
	}
	.rule-container .img-box{
		width:36%;
		max-width: 120px;
		margin: 0 auto;
		position: relative;
		margin-top: 31px;
	}
	.rule-container .img-box .bg{
		width:100%;
		height: 100%;
		background: #000;
		opacity: 0.3;
		position: absolute;
		left: 0;
		top:0;
		display: none;
	}
	.rule-container .img-box img{
		width:100%;
		max-height: 120px;
	}
	.rule-container .text-box{
		padding: 0 10px 25px;
		background: #fff;
	}
	.rule-container .text-box .title{
		height: 16px;
		line-height: 16px;
		font-size:15px;
		color:#333;
		padding-top: 20px;
		padding-bottom: 8px;
	}
	.rule-container .text-box .text{
		line-height: 24px;
		font-size:14px;
		color:#999;	
	}
	.rule-btn{
		width: 80%;
		height:45px;
		line-height: 45px;
		text-align: center;
		color: #fff;
		font-size: 14px;
		display: block;
		margin: 0 auto;
		border-radius: 50px;
		margin-top: 83px;
		margin-bottom: 30px;
		background-image: linear-gradient(-270deg, #FF6E8D 0%, #FF68B0 97%);
	}
</style>
<style>
	#new-rule-container .text-box img{
		width: 100%;
	}
	#new-rule-container .text-box .text img{
		width: 100%;
	}
</style>