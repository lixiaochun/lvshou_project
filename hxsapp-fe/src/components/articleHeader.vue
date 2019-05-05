<template>
  <div class="articleHeader">
      <!-- 标题＋头部区域 -->
			<h1 class="articleTitle">
				{{data.title}}
			</h1>
			<!-- 作者模块区域 -->
			<div class="author_t_header_box">
				<div class="author_t_header">
					<div class="img_box" @click="goDynamicPage()">
						<img v-if="data && data.relate_user && data.relate_user.head_img" :src="data.relate_user.head_img" />
						<span v-if="data.relate_user.v =='1'"></span>
						<span class="hot-v" v-if="data.relate_user.v && data.relate_user.v == 1"></span>
						<span class="blue-v" v-if="data.relate_user.is_adviser && data.relate_user.is_adviser == 1 "></span>
					</div>

					<div class="info">
						<span>
							{{data.relate_user.nickname}}
						</span>
		
						<i>
							{{time}}
						</i>
					</div>
					<div v-if=" data.is_mine == 0 && data.relate_user.is_follow == 'no' " :class=' data.relate_user.is_follow == "yes" ? "reading_quantity on" : "reading_quantity" ' @click="followBtn()">
						<em v-if="0 && data.relate_user.is_follow == 'yes'">已关注</em>
						<em v-if=" data.relate_user.is_follow == 'no' ">
							<span class="jia"></span>关注
						</em>

					</div>
				</div>
			</div>

  </div>
</template>

<script>
import axios from 'axios'
import { Toast } from 'mint-ui';
import commonJs from '@/util/common.js'

export default {
  name: 'articleHeader',
  props:["data"],
	data(){
		return {
			time:""
		}
	},
	computed: {
		isLogin: function() {
			return commonJs.isLogin() 
		},
		isApp: function() {
			return commonJs.isApp()
		}
	},
	methods: {
		// 去个人的动态主页的页面
    goDynamicPage(){
      console.log("goDynamicPage")

			var user_id = this.data.user_id
			var newUseId = this.data.relate_uid//用户id

      
			if( this.isApp ){
        // window.location.href = "https://hxsapp_user_info#" + user_id;	
        window.location.href = "https://hxsapp_user_info#" + newUseId;	
      }else{
        setTimeout(() => {
          // window.location.href = commonJs.config.prefixUrl + "articleDetail/" + data.id + window.location.search;
          // var __url  = commonJs.config.prefixUrl + "dynamic/" + user_id + window.location.search;
          var __url  = commonJs.config.prefixUrl + "dynamic/" + newUseId + window.location.search;
          window.location.replace( __url );
        }, 100)
      }

    },
		// 关注按钮
		followBtn() {
			// console.log("followBtn-followBtn");


			if (this.isApp) {
				
				// debugger
				// console.log(this.setShareContent())
				// 点击app上右上角分享按钮，app回调 h5的全局函数
				//  app 开始 3.0.0 支持
				

				if (this.isLogin) {
					console.log("若登录了，就去调用极光的接口-https://api.hxsapp.com/community/userCommend/doCommend")

					// 接口请求数据
					let json = {
						sess_token: commonJs.getUrlParam("sess_token"),
						// followed_user_id: this.data.user_id
						followed_user_id: this.data.relate_uid
					};
					var __url;
					if ( this.data.relate_user.is_follow == "yes") {
						__url = "https://api.hxsapp.com/community/userRelate/cancelFollow"
					}else if ( this.data.relate_user.is_follow == "no") {
						// __url = "https://api.hxsapp.com/community/userRelate/cancelFollow"
						__url = "https://api.hxsapp.com/community/userRelate/follow"
					}
          var __version = commonJs.getHxsAppVersion()
					axios.get(__url,
						{ params: json }
					).then((res) => {
						if (res.data.code == 200) {
							Toast(res.data.msg)
								// debugger
							if ( this.data.relate_user.is_follow == "yes") {
								// debugger

								setTimeout(()=>{
									this.$emit("update_is_follow",'no')

								},100)
                // this.data.relate_user.is_follow = "no"

                if (commonJs.compareAppVersion(__version, '3.5.1') || __version == '3.5.1') {
                  window.location.href = 'https://hxsapp_follow_user?id=' + this.data.relate_uid + '&state=0'
                }

							}else if ( this.data.relate_user.is_follow == "no") {
								setTimeout(()=>{
								// debugger
									this.$emit("update_is_follow",'yes')
								},100)
                // this.data.relate_user.is_follow = "yes"
                if (commonJs.compareAppVersion(__version, '3.5.1') || __version == '3.5.1') {
                  window.location.href = 'https://hxsapp_follow_user?id=' + this.data.relate_uid + '&state=1'
                }
							}
							
						} else {
							Toast(res.data.msg)
						}
					}).catch((Error) => {
						console.log(Error)
					})

				} else {
					console.log("没有登录了,这里调起app的登录协议");
					commonJs.h5CallAppAction.hxsapp_showloginpage()
				}
			} else {
				this.popAppDownBox()
			}

		},

		popAppDownBox() {
			console.log("弹出下载的提示框box设计")
			// 显示和异常弹出提示下载层
			this.$parent.showPopupDownLoadCall()
		},
	},
	mounted(){
		this.time = this.data.create_time.substr(0, 10);
	}
}

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
.articleHeader{
  	/*标题 */
	.articleTitle {
		width: 100%;
		box-sizing: border-box;
		padding:0 15px;
		margin: 15px 0;
		font-size: 21px;
		color: #333;
		font-weight: normal;
		line-height: 26px;
		max-height: 52px;
		overflow: hidden;
	}

	//作者模块 
	.author_t_header_box {
		padding: 0 15px;
		width:100%;
		box-sizing: border-box;
		
		.author_t_header {
			height:50px;
			position: relative;
			padding:10px 0;
			border-top: 1px solid rgba(129, 141, 207, .2);
			border-bottom: 1px solid rgba(129, 141, 207, .2);
			.img_box {
				position: absolute;
				left:0;
				top:10px;
				width: 50px;
				height: 50px;
				background: url("./../assets/img/zx_icon.png") left top no-repeat;
				background-size: 100%;
				// float: left;
				span{
					width: 20px;
					height: 20px;
					position: absolute;
					right: 0;
					bottom: 0;
				}

		        span.hot-v {
		          background: url("./../assets/img/vip.png") left top no-repeat;
		          background-size: 100%;
		        }

		        span.blue-v {
		          background: url("./../assets/images/F_icon_guwen.png") left top no-repeat;
		          background-size: 100%;
		        }
			}

			img {
				width: 50px;
				height: 50px;
				border-radius: 50%;
			} // 编辑显示区域
			.info {
				padding-left: 60px;
				padding-top: 3px;
				width:100%;
				box-sizing: border-box;
				word-break:break-all; 
				// float: left;
			}

			.info span {
				display: block;
				height: 17px;
				line-height: 17px;
				font-size: 15px;
				color: #666;
				padding: 5px 0 0 0;
				width: 210px;
				overflow: hidden;
			}

			i {
				width: 210px;
				margin-top:5px;
				display: block;
				height: 14px;
				overflow: hidden;
				text-overflow:ellipsis;
				white-space: nowrap;
				word-break:break-all; 
				line-height: 14px;
				font-size: 13px;
				color: #999;
			} //关注按钮区域
			.reading_quantity {
				position: absolute;
				top: 13px;
				right: 15px;
				width: 60px;
				text-align: center;
				border: 1px solid #818DCF;
				height: 25px;
				line-height: 23px;
				box-sizing: border-box;
				border-radius: 15px;
				em {
					color: #818DCF;
					font-size: 13px;
					display: block;
					width: 100%;
					text-align: center;
					.jia{
						display: inline-block;
						margin-right: 3px;
						margin-left: -6px;
						width: 10px;
						height: 10px;
						background: url("./../assets/img/jia_btn_120x50@2x.png") no-repeat;
						background-size: 100%;		
					}
				}
				&.on {
					background-image: linear-gradient(-270deg, #FF6E8D 0%, #FF68B0 97%);
					border: 1px solid #FF68B0;
					em {
					color: #fff;
					}
				}
			}
		}
	}


}
</style>
