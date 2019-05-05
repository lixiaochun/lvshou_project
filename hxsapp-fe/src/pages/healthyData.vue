<template>
	<div v-show="0">
	</div>
</template>
<script>
import commonJs from '@/util/common.js'
import { Toast } from 'mint-ui'
import axios from 'axios'

// 初始化loadding的组件
// import preLoading from "@/components/preLoading"

export default {
	name: 'healthyData',
	// data() {
	// 	return {
	// 		isPreLoading:false
	// 	}
	// },
	mounted() {
		// document.title = '';
		
		var __report_id = this.$route.params.report_id;

		// 基因检测
		commonJs.buriedPoint({
			access_occurred_type: 500003,//发生访问的【页面】类型
			access_occurred_type_id: __report_id,//发生访问的【页面】类型ID
			previous_event_type_obj: '',//【事件】对象类型
			previous_event_type_obj_id: '',//【事件】对象类型ID
			previous_content_sort: ''//【事件】事件参数
		});
		this.goPage();

	},

	methods: {
		goPage(){
			var __report_id = this.$route.params.report_id;
			// debugger
			// 邀请码
			// var __inviteCode = commonJs.getInviteCode();

			commonJs.getInviteCode( ( res )=>{
				window.location.replace( 'https://app.hxsapp.com/actweb/exhibitionHall/index?report_id=' + __report_id +'&soucrePage=healthyData_app&inviteCode=' + res);
			})	
		},
	},
	beforeDestroy() {
		// document.title = common.config.webTitle;
	}
 
}
</script>