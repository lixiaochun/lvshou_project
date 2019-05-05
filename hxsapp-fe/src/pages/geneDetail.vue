<template>
	<div>

		<div v-if="isShowCheckResult && checkResultNo">
			<div class="gene_box gene_box_first">
				<div class="gene_box_title">第一部分 基因检测结果</div>
				<div class="image_box">
					<img src="./../assets/img/gene_detail/gene_detail_abnormal.jpg" />
				</div>
			</div>
			<div class="gene_box">
				<div class="gene_box_title">第二部分 什么是FTO肥胖基因？
					<i></i>
				</div>
				<div class="slide_box image_box">
					<img src="./../assets/img/gene_detail/gene_detail_02.jpg" />
					<img src="./../assets/img/gene_detail/gene_detail_03.jpg" />
				</div>
			</div>
			<div class="gene_box">
				<div class="gene_box_title">第三部分 FTO基因突变对肥胖的影响
					<i></i>
				</div>
				<div class="slide_box image_box">
					<img src="./../assets/img/gene_detail/gene_detail_04.jpg" />
					<img src="./../assets/img/gene_detail/gene_detail_05.jpg" />
					<img src="./../assets/img/gene_detail/gene_detail_06.jpg" />
				</div>
			</div>
			<div class="gene_box">
				<div class="gene_box_title">第四部分 肥胖与疾病的关系
					<i></i>
				</div>
				<div class="slide_box image_box">
					<img src="./../assets/img/gene_detail/gene_detail_07.jpg" />
					<img src="./../assets/img/gene_detail/gene_detail_08.jpg" />
					<img src="./../assets/img/gene_detail/gene_detail_09.jpg" />
				</div>
			</div>
			<div class="gene_box">
				<div class="gene_box_title">第五部分 肥胖的一般分类及危害
					<i></i>
				</div>
				<div class="slide_box image_box">
					<img src="./../assets/img/gene_detail/gene_detail_10.jpg" />
					<img src="./../assets/img/gene_detail/gene_detail_11.jpg" />
					<img src="./../assets/img/gene_detail/gene_detail_12.jpg" />
				</div>
			</div>
			<div class="gene_box">
				<div class="gene_box_title">第六部分 绿瘦体重管理建议
					<i></i>
				</div>
				<div class="slide_box image_box">
					<img src="./../assets/img/gene_detail/gene_detail_13_2.jpg" />
				</div>
			</div>
			<div class="gene_box">
				<div class="gene_box_title">第七部分 饮食建议
					<i></i>
				</div>
				<div class="slide_box image_box">
					<img src="./../assets/img/gene_detail/gene_detail_14_2.jpg" />
					<img src="./../assets/img/gene_detail/gene_detail_15_2.jpg" />
					<img src="./../assets/img/gene_detail/gene_detail_16_2.jpg" />
				</div>
			</div>
			<div class="gene_box">
				<div class="gene_box_title">第八部分 消耗能量——“迈开腿”
					<i></i>
				</div>
				<div class="slide_box image_box">
					<img src="./../assets/img/gene_detail/gene_detail_17_2.jpg" />
					<img src="./../assets/img/gene_detail/gene_detail_19.jpg" />
					<img src="./../assets/img/gene_detail/gene_detail_20.jpg" />
				</div>
			</div>
			<div class="gene_box">
				<div class="gene_box_title">第九部分 控制体重——“管住嘴”
					<i></i>
				</div>
				<div class="slide_box image_box">
					<img src="./../assets/img/gene_detail/gene_detail_21.jpg" />
					<img src="./../assets/img/gene_detail/gene_detail_22.jpg" />
					<img src="./../assets/img/gene_detail/gene_detail_23.jpg" />
				</div>
			</div>
			<div class="gene_box">
				<div class="gene_box_title">第十部分 参考文献
					<i></i>
				</div>
				<div class="slide_box image_box">
					<img src="./../assets/img/gene_detail/gene_detail_24.jpg" />
					<img src="./../assets/img/gene_detail/gene_detail_25.jpg" />
					<img src="./../assets/img/gene_detail/gene_detail_26.jpg" />
				</div>
			</div>
			<a href="javascript:;" class="btn custom" @click="clickCustom"></a>

		</div>
		<div v-if="isShowCheckResult && checkResultYes">
			<div class="gene_box gene_box_first">
				<div class="gene_box_title">第一部分 基因检测结果</div>
				<div class="image_box">
					<img src="./../assets/img/gene_detail/gene_detail_normal.jpg" />
				</div>
			</div>
			<div class="gene_box">
				<div class="gene_box_title">第二部分 什么是FTO肥胖基因？
					<i></i>
				</div>
				<div class="slide_box image_box">
					<img src="./../assets/img/gene_detail/gene_detail_02.jpg" />
					<img src="./../assets/img/gene_detail/gene_detail_03.jpg" />
				</div>
			</div>
			<div class="gene_box">
				<div class="gene_box_title">第三部分 FTO基因突变对肥胖的影响
					<i></i>
				</div>
				<div class="slide_box image_box">
					<img src="./../assets/img/gene_detail/gene_detail_04.jpg" />
					<img src="./../assets/img/gene_detail/gene_detail_05.jpg" />
					<img src="./../assets/img/gene_detail/gene_detail_06.jpg" />
				</div>
			</div>
			<div class="gene_box">
				<div class="gene_box_title">第四部分 肥胖与疾病的关系
					<i></i>
				</div>
				<div class="slide_box image_box">
					<img src="./../assets/img/gene_detail/gene_detail_07.jpg" />
					<img src="./../assets/img/gene_detail/gene_detail_08.jpg" />
					<img src="./../assets/img/gene_detail/gene_detail_09.jpg" />
				</div>
			</div>
			<div class="gene_box">
				<div class="gene_box_title">第五部分 肥胖的一般分类及危害
					<i></i>
				</div>
				<div class="slide_box image_box">
					<img src="./../assets/img/gene_detail/gene_detail_10.jpg" />
					<img src="./../assets/img/gene_detail/gene_detail_11.jpg" />
					<img src="./../assets/img/gene_detail/gene_detail_12.jpg" />
				</div>
			</div>
			<div class="gene_box">
				<div class="gene_box_title">第六部分 绿瘦体重管理建议
					<i></i>
				</div>
				<div class="slide_box image_box">
					<img src="./../assets/img/gene_detail/gene_detail_13.jpg" />
				</div>
			</div>
			<div class="gene_box">
				<div class="gene_box_title">第七部分 饮食建议
					<i></i>
				</div>
				<div class="slide_box image_box">
					<img src="./../assets/img/gene_detail/gene_detail_14.jpg" />
					<img src="./../assets/img/gene_detail/gene_detail_15.jpg" />
					<img src="./../assets/img/gene_detail/gene_detail_16.jpg" />
					<img src="./../assets/img/gene_detail/gene_detail_17.jpg" />
				</div>
			</div>
			<div class="gene_box">
				<div class="gene_box_title">第八部分 消耗能量——“迈开腿”
					<i></i>
				</div>
				<div class="slide_box image_box">
					<img src="./../assets/img/gene_detail/gene_detail_18.jpg" />
					<img src="./../assets/img/gene_detail/gene_detail_19.jpg" />
					<img src="./../assets/img/gene_detail/gene_detail_20.jpg" />
				</div>
			</div>
			<div class="gene_box">
				<div class="gene_box_title">第九部分 控制体重——“管住嘴”
					<i></i>
				</div>
				<div class="slide_box image_box">
					<img src="./../assets/img/gene_detail/gene_detail_21.jpg" />
					<img src="./../assets/img/gene_detail/gene_detail_22.jpg" />
					<img src="./../assets/img/gene_detail/gene_detail_23.jpg" />
				</div>
			</div>
			<div class="gene_box">
				<div class="gene_box_title">第十部分 参考文献
					<i></i>
				</div>
				<div class="slide_box image_box">
					<img src="./../assets/img/gene_detail/gene_detail_24.jpg" />
					<img src="./../assets/img/gene_detail/gene_detail_25.jpg" />
					<img src="./../assets/img/gene_detail/gene_detail_26.jpg" />
				</div>
			</div>
			<a href="javascript:;" class="btn custom" @click="clickCustom"></a>
		</div>

		<preLoading v-if="!isPreLoading"></preLoading>
	</div>
</template>
<script>
import commonJs from '@/util/common.js'
import { Toast } from 'mint-ui'
import axios from 'axios'

// 初始化loadding的组件
import preLoading from "@/components/preLoading"

export default {
	name: 'geneDetail',
	data() {
		return {
			isPreLoading: false,
			isShowCheckResult: false,
			checkResultYes: false,
			checkResultNo: false,
			

			url: {
				success: "https://app.hxsapp.com/html/gene_detail_0.html",
				error: "https://app.hxsapp.com/html/gene_detail_1.html"
			}
		}
	},
	mounted() {
		document.title = '';
		this.getReportById();
	},
	components: {
		preLoading
	},
	methods: {
		gene_box_titleEvnet() {
			$('.gene_box_title').on('click', function() {

				if ($(this).find('i').hasClass('open')) {
					$(this).find('i').removeClass('open');
					$(this).parent().find('.slide_box').slideUp(500);
				} else {
					$(this).find('i').addClass('open');
					$(this).parent().find('.slide_box').slideDown(500);
				}

			});
		},

		clickCustom() {

			//随机数
			function rnd(n, m) {
				return parseInt(Math.random() * (m - n) + n);
			}
			//设置cookie
			function setCookie(name, value, iDay) {
				var oDate = new Date();
				oDate.setDate(oDate.getDate() + iDay);
				document.cookie = name + '=' + value + ';expires=' + oDate;
			}

			//获取cookie
			function getCookie(name) {
				var arr = document.cookie.split('; ');
				//blue=123   busy=250

				for (var i = 0; i < arr.length; i++) {
					var arr2 = arr[i].split('=');
					//arr2[0]->blue  arr2[1]->123
					if (arr2[0] == name) {
						return arr2[1];
					}
				}
				return '';
			}

			var __arr = ['brm-110354224754518', 'brm-110354224754775'];
			var __iNow = getCookie('ArrRnd');

			var __now = rnd(0, 2);
			if (__iNow) {
				__now = __iNow;
			}

			
			var __version = commonJs.getHxsAppVersion()
			console.log("__version:"+__version)
			
			console.log('commonJs.compareAppVersion("3.0.1", "2.2.0"):'+ commonJs.compareAppVersion( '3.0.1', "2.2.0") )

			if ((commonJs.compareAppVersion(__version, "2.2.0") || __version == "2.2.0") && __version) {

				window.location.href = 'https://hxsapp_openim#' + __arr[__now];
			} else {
				window.location.href = 'hxsapp://openim|' + __arr[__now];
			}

			setCookie('ArrRnd', __now, 1);
		},

		getReportById() {
			let sessToken = commonJs.getUrlParam('sess_token');
			let json = {
				id: this.$route.query.id,
				sess_token: sessToken
			};
			// debugger

			axios.get("https://api.hxsapp.com/slim/gene/getGeneReportById", { params: json }).then((res) => {
				console.log(res)
				// debugger
				this.isPreLoading = true;
				
				if (res.data.code == 200) {
					this.isShowCheckResult = true;

					// "check_result": "0",//检测结果：检测结果：0-正常 TT，1-不正常 AA
					var url;
					if (res.data.data.check_result == 0 ) {
						// url = this.url.success + '?sess_token=' + sessToken;
						this.checkResultYes = true;
					} else if (res.data.data.check_result == 1) {
						this.checkResultNo = true;
						// url = this.url.error + '?sess_token=' + sessToken;
					}

					this.$nextTick(() => {
						this.gene_box_titleEvnet()
					})
					// window.location.replace(url)

				} else {
					Toast("加载数据异常，请稍后再试！")
				}
			}).catch((error) => {
				Toast("加载数据异常，请稍后再试！")
			})
		},

	},
	beforeDestroy() {
		document.title = commonJs.config.webTitle;
		$('.gene_box_title').off('click')
	}
}
</script>
<style scoped lang="less">
.gene_box {
	margin: 7px 0;
}

.gene_box_first {
	margin-top: 0;
}

.gene_box_title {
	padding-left: 12px;
	font-size: 1rem;
	background-color: #F5F5F8;
	color: black;
	line-height: 2.7rem;
	position: relative;
	cursor: pointer;
}

.gene_box_title i {
	width: 15px;
	height: 9px;
	background: url(./../assets/img/return01-blue@2x.png) no-repeat;
	position: absolute;
	right: 5%;
	top: 50%;
	margin-top: -5px;
	-webkit-background-size: 100% auto;
	background-size: 100% auto;
}

.slide_box {
	display: none;
}

.slide_box p {
	padding: 5px 10px;
	line-height: 1.5em;
}

.slide_box p span {
	font-weight: bold;
}

.image_box img {
	width: 100%;
}

.custom {
	width: 65px;
	height: 70px;
	background: url(./../assets/img/kefu_btn@3x.png) no-repeat;
	background-size: 65px 70px;
	position: fixed;
	right: 14px;
	bottom: 88px;
	z-index: 99;
	display: block;
}

.open {
	-webkit-transform: rotate(180deg);
	-ms-transform: rotate(180deg);
	-o-transform: rotate(180deg);
	transform: rotate(180deg);
}
</style>
