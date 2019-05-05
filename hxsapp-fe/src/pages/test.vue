<template>
	<div class="test-container">
       <h2>测试页面</h2>
       <aliyunPlayer
        :sourceUrl="sourceUrl"
        :coverUrl="coverUrl" >

       </aliyunPlayer>
	</div>
</template>
<script>
    
	import Vue from 'vue'
	import commonJs from '@/util/common.js'
  import preLoading from '@/components/preLoading'
  import aliyunPlayer from '@/components/aliyunPlayer'
	export default {
		name:'taskPrize',
		data(){
			return{
        loadEnd: false,
        sourceUrl:"http://vjs.zencdn.net/v/oceans.mp4",
        coverUrl:"http://hxsupload.oss-cn-hangzhou.aliyuncs.com/2019-03-25/ce4a2773c1987bf5260cffd76d7a5037.jpg",
			}
		},
		mounted(){
			
		},
		methods:{

		},
		components:{
      aliyunPlayer
		},
		beforeDestroy(){
			$(window).off("resize")
		}
	}
</script>
<style scoped>
</style>