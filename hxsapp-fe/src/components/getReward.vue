<template>
	<div id="getReward_show_box" v-if="rewardLogData">

	<!-- 打赏 -->
		<p class="title">
			" 点赞是美德 打赏是鼓励 "
		</p>
		<div class="getbutton" @click="goPayPage()">
			打赏
		</div>
		<div class="ren_zan" v-if="rewardLogData && rewardLogData.total == 0">
			马上成为第一个打赏的人
		</div>
		<div class="ren_zan" v-if="rewardLogData && rewardLogData.total != 0">
			<span>{{rewardLogData.total}}</span>人打赏
		</div>

		<div v-if="rewardLogData && rewardLogData.total != 0 " class="list_img">
			<img v-if="index <= 5" @click="clickGetReward(index)" v-for="(data,index) in rewardLogData.list" :key="index" :src="data.head_img" />
		</div>

	</div>
</template>

<script>
import axios from 'axios'
import commonJs from '@/util/common.js'
import { Toast } from 'mint-ui'

export default {
	name: "getReward",
	props:{
		rewardLogData:{
			type:Object,
      default: function() {
        return null
      }
		},
		article_id:{
			type:String,
			require:true
		}
	},
	data() {
		return {
			// 测试数据
			columns: [
				'http://tva2.sinaimg.cn/crop.0.0.1080.1080.50/665b9eddjw8eoqeasw93uj20u00u0mzs.jpg',
				'http://tva2.sinaimg.cn/crop.0.0.1080.1080.50/665b9eddjw8eoqeasw93uj20u00u0mzs.jpg',
				'http://tva2.sinaimg.cn/crop.0.0.1080.1080.50/665b9eddjw8eoqeasw93uj20u00u0mzs.jpg',
				'http://tva2.sinaimg.cn/crop.0.0.1080.1080.50/665b9eddjw8eoqeasw93uj20u00u0mzs.jpg',
				'http://tva2.sinaimg.cn/crop.0.0.1080.1080.50/665b9eddjw8eoqeasw93uj20u00u0mzs.jpg',
				'http://ww4.sinaimg.cn/large/665b9eddjw1el1mc5hfb9j20u00i0q4e.jpg',
			]
		}
	},
	computed:{
    isLogin: function () {
      return commonJs.isLogin()
    },
    isApp: function () {
      return commonJs.isApp()
    }
  },
	methods: {
		goPayPage(){
			console.log("goPayPage-goPayPage-goPayPage")
			if( !this.isApp){
				this.$parent.showPopupDownLoadCall && this.$parent.showPopupDownLoadCall() 
			}else{
				
				var __article_id = this.$route.params.article_id
				commonJs.buriedPoint({
					access_occurred_type: 211136,//发生访问的【页面】类型
					access_occurred_type_id: __article_id,//发生访问的【页面】类型ID
					previous_event_type_obj: '',//【事件】对象类型
					previous_event_type_obj_id: '',//【事件】对象类型ID
					previous_content_sort: ''//【事件】事件参数
				});

				if( this.isLogin ){
					
					console.log('去发记之前写的打赏页面')
					var __url = commonJs.config.prefixUrl+"reward/"+this.article_id
					commonJs.h5CallAppAction.hxsapp_new_webview( encodeURIComponent(__url) )
				}else{
					commonJs.h5CallAppAction.hxsapp_showloginpage()
				}
			}
		},
		callbackTest1(data) {
			console.log("callbackTest1-test：");
			console.log(data);
		},
		clickGetReward(index){
			console.log(index)
		},
	}
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
/*打赏区域*/

#getReward_show_box {
	width: 100%;
	margin: 0 auto;
	text-align: center;
	.ren_zan{
		font-size: 13px;
		color: #999;
		height: 25px;
		line-height: 25px;
		margin-bottom: 15px;
		margin-top: 6px;
		span{
			color: #818dcf;
			padding-right: 5px;
		}
	}
	.title{
		font-size: 18px;
		line-height: 20px;
		margin: 10px auto 10px;
	}

	.getbutton {
		width: 55px;
		box-sizing: border-box;
		border: 1px solid #FF68B0;
		background: linear-gradient(-270deg, #FF6E8D 0%, #FF68B0 97%);
		color: #fff;
		border-radius: 15px;
		font-size: 13px;
		height: 25px;
		line-height: 23px;
		margin: 0 auto;
		text-align: center;
	}
	.list_img {
		text-align: center;
		width: 100%;
		margin-bottom: 30px;
		img {
			display: inline-block;
			height: 30px;
			line-height: 30px;
			width: 30px;
			border: 1px solid none;
			box-sizing: border-box;
			border-radius: 15px;
			margin:0 5px;
		}
	}
}
</style>
