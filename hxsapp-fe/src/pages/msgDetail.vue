
<template>
    <div class="userMsg-container">
        <b id="userMsgTitle"></b>
        <p id="userMsgContent">
            
        </p>
        <!-- <em id="userMsgTime"></em> -->
    </div>
</template>
<script>
    import axios from 'axios'
	import commonJs from '@/util/common.js'
	export default{
		name: 'msgDetail',
		data(){
			return {

			}
		},
		mounted(){
			document.title = '消息详情';
			this.getUserNew();
		},
		methods:{
			getUserNew(){

			    var msgId = this.$route.params.msgId;

			    if(msgId==null){
			        msgId=1;
			    }else{
			        msgId=parseInt(msgId)
			    }
			    var datas={
			        id:msgId,
			        sess_token: commonJs.getUrlParam('sess_token')
			    }
                axios.get('https://api.hxsapp.com/base/notice/getNoticeById', {params:datas}).then((result) => {
            	 	console.log(result)
		            if(result.data.code=200){
		                $("#userMsgContent").html(result.data.data.content);
		                $("#userMsgTitle").html(result.data.data.title);
		                // $("#userMsgTime").html(result.data.data.update_time);

		                var linklable = $('#userMsgContent a');
		                if(linklable.length > 0){
		                    $.each(linklable, function(i){
		                        var linkUrl = linklable.eq(i).attr('href');
		                        linklable.eq(i).attr('href','https://hxsapp_new_webview#'+ linkUrl);
		                    })
		                }
		            }   
                })
			}
		},
		beforeDestroy() {
			document.title = commonJs.config.webTitle;
		}
	}
</script>
<style scoped>
	.userMsg-container{
		padding:15px;
	}
	.userMsg-container b{
		color:#333;
		display: block;
		padding-bottom:6px;
		font-size: 16px;
	}
	.userMsg-container em{
		color:#999; 
		font-size:12px;
	}
	.userMsg-container p{
		position: relative;
		font-size: 16px;
    	color: #333;
    	margin-bottom: 3px;
	}
	.userMsg-container img{
		max-width: 100%; 
		margin: 0 auto;
	}
</style>
