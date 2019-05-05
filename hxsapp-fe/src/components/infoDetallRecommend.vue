<template>
	<!-- 精 选 推 荐 -->
		<div id="infoDetall_recommend" v-if="adLinkShowData || infoDetallRecommendData.length ">
			<div class="title">
				精 选 推 荐
			</div>
			<div class="recommend_article">
				<div>

					<div class="li" v-if="adLinkShowData">
						<img v-if="adLinkShowData.image" :src="adLinkShowData.image" @click="goLinkPage(adLinkShowData)" />
						<div class="article_info showLine" @click="goLinkPage(adLinkShowData)">
							<div class="tit">
								{{adLinkShowData.title}}
							</div>
							
							<div class="info">
								<div class="read">
									<em>广告</em>
								</div>
							</div>
						</div>
					</div>
							
					<div class="li" v-for="(item,index) in infoDetallRecommendData" :key="index">
						<img v-if="item.images" :src="item.images[0]" @click="goArticleLinkPage(item.article_id)" />
						<div :class=' index != 1 ?  "article_info showLine" : "article_info" ' @click="goArticleLinkPage(item.article_id,index)">
							<div class="tit">
								{{item.title}}
							</div>
							
							<div class="info">
								<div class="read">
									<span></span>
									<em>
										{{item.views_num}}
									</em>
								</div>
								<div class="good">
									<span></span>
									<em>
										{{item.commend_num}}
									</em>
								</div>
							</div>
						</div>
					</div>


				</div>
			</div>

			<div class="change-background"></div>
		</div>
</template>

<script>

import axios from 'axios'
import { Toast } from 'mint-ui';
import commonJs from '@/util/common.js'

export default {
	name: "infoDetallRecommend",
	data() {
		return {
			infoDetallRecommendData:[],
			adLinkShowData: null
		}
	},
	mounted(){
		this.initAdData();
		this.initInfoDetallRecommendData();
	},
	methods: {
		goLinkPage(adLinkShowData){

			var __ac_id = adLinkShowData.id || ""
			var __article_id = this.$route.params.article_id
			commonJs.buriedPoint({
				access_occurred_type: 250001,//发生访问的【页面】类型
				access_occurred_type_id: __ac_id,//发生访问的【页面】类型ID
				previous_event_type_obj: '',//【事件】对象类型
				previous_event_type_obj_id: __article_id,//【事件】对象类型ID
				previous_content_sort: ''//【事件】事件参数
			});

			console.log("adLinkShowData.link:"+adLinkShowData.link)
			if(adLinkShowData.link){
				window.location.replace( adLinkShowData.link )
			}else{
				console.log("没有link的数据")
			}
		},
		goArticleLinkPage(article_id,index){

			if(index == 0){
				var __access_occurred_type = 211122;
			}else if(index == 1){
				var __access_occurred_type = 211123;
			}
			var __article_id = this.$route.params.article_id

			commonJs.buriedPoint({
				access_occurred_type: __access_occurred_type,//发生访问的【页面】类型
				access_occurred_type_id: __article_id,//发生访问的【页面】类型ID
				previous_event_type_obj: '',//【事件】对象类型
				previous_event_type_obj_id: '',//【事件】对象类型ID
				previous_content_sort: ''//【事件】事件参数
			});


			console.log("article_id:"+article_id)
			if(article_id){
				
				setTimeout(()=>{
					window.location.replace(commonJs.config.prefixUrl + "articleDetail/" + article_id + window.location.search);
				},10)

			}else{
				console.log("没有link的数据")
			}
		},

		initInfoDetallRecommendData(){
			// 接口请求数据

      let json = {
        keywords: 'hxs_article_detail_mid',
        rand_num:2,
        sess_token:commonJs.getUrlParam("sess_token")
      };

			// https://api.hxsapp.com/community/recommend/getRecommendList
			axios.get('https://api.hxsapp.com/community/recommend/getRecommendList',
        { params: json }
      ).then((res) => {
        if (res.data.code == 200) {
          // Toast(res.data.msg)
        	// this.adLinkShowData = res.data.data;
					if ( res.data.data && res.data.data.article_list )  {
        		this.infoDetallRecommendData = res.data.data.article_list;
					}
	      }
	    }).catch((Error) => {
	      console.log(Error)
	      // Toast("服务异常，请稍后再试！")
	    })
		},
		initAdData(){
			// 接口请求数据
      let json = {
        keywords: 'hxs_article_detail_mid_ad',
        sess_token:commonJs.getUrlParam("sess_token")
      };

			// https://api.hxsapp.com/base/ad/getAdListByType
			axios.get('https://api.hxsapp.com/base/ad/getAdListByType',
        { params: json }
      ).then((res) => {
        if (res.data.code == 200) {
          // Toast(res.data.msg)
        	// this.adLinkShowData = res.data.data;
        	if(res.data.data.length > 0 ){
        		this.adLinkShowData = res.data.data[0];
        	}
	      } else {
	        // Toast(res.data.msg)
	      }
	    }).catch((Error) => {
	      console.log(Error)
	      // Toast("服务异常，请稍后再试！")
	    })
		}
	}
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>

	/*精彩推荐*/
	#infoDetall_recommend {
		/*标题*/
		.title {
			height: 50px;
			line-height: 50px;
			text-align: center;
			border-bottom: 1px solid rgba(129,141,207,.2);
		}

		.recommend_article {
			width: 100%;
			.li {
				position: relative;
				height: 70px;
				padding-bottom: 5px;
				img {
					width: 70px;
					height: 70px;
					position: absolute;
					top: 0;
					left: 0;
					display: block;
				}
			}

			.article_info {
				width: 100%;
				height: 70px;
				padding-left: 80px;
				padding-right: 10px;
				box-sizing: border-box;
				position: relative;
				
				&.showLine{
					&:after{
						content: "";
						height: 1px;
						background:  rgba(129,141,207,.2);
						// background:  red;
						display: block;
						position: absolute;
						bottom: 0;
						left:80px;
						width: 100%;
					}
				}
			}

			.article_info .tit {
				padding-top: 14px;
				height: 20px;
				font-size: 13px;
				color: #666;
				line-height: 18px;
				overflow: hidden;
			}

			.article_info .read {
				margin-top: 3px
			}

			.article_info .read span {
				width: 15px;
				height: 15px;
				background: url("./../assets/img/view@2x.png") 0 0 no-repeat;
				background-size: 100% 100%;
				float: left;
				margin-top: 0px;
			}

			.article_info .good span {
				width: 15px;
				height: 15px;
				background: url("./../assets/img/pinlun.png") 0 0 no-repeat;
				background-size: 100% 100%;
				float: left;
				margin-top: 2px;
			}

			.article_info .info div {
				height: 18px;
				margin-right: 18px;
				float: left;
			}

			.article_info .info div span {
				margin-right: 4px;
			}

			.article_info .info div em {
				color: #999 ;
				font-size: 11px;
				float: left;
				height: 14px;
				line-height: 14px;
			}

			.article_info .good em {
				margin-top: 3px;
			}
		}
	}
</style>
