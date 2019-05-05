<template>
	<div class="runReady-container">
		<!-- <div class="header">
			跑步准备
		</div> -->
		<div class="content" v-html="contentHtml">
                {{contentHtml}}
		</div>
        <div class="content" v-if="contentHtml==null">
             <p class="null-str">暂无数据</p>
		</div>
	</div>
</template>
<script>
	import axios from "axios";
	export default {
		name:'runReady',
		data(){
			return{
				//文档的内容
				contentTitle:null,
				contentHtml:null,
				contentHtml2:null,
			}
		},
		mounted() {
			var that=this;
			that.getRunReadyContent();
		},
		methods: {
            //获取 url 后的参数值
    getUrl(para){
        var paraArr = location.search.substring(1).split('&');
        for(var i = 0;i < paraArr.length;i++){
            if(para == paraArr[i].split('=')[0]){
                return paraArr[i].split('=')[1];
            }
        }
        return '';
    },
			//获取跑步机准备的说明文档
			getRunReadyContent(){
			
              var that=this;
			  let json = {};
              axios.get("https://act.hxsapp.com/base/Award/rule/runready_word/json", {params: json }).then(res => {
				if (res.data.code == 200) {
				
					that.contentTitle=res.data.data.title;
					document.title = res.data.data.title;
                    that.contentHtml=res.data.data.content;
				}else{

				}

	          });
			},
		}
	}
</script>
<style scoped>
.runReady-container .content{
	     overflow-y: auto; 
		padding: 0px 10px;
		padding-top: 15px;
}
.null-str{
	text-align: center;
}
</style>