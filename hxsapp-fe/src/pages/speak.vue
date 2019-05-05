<template>
	<div class="speak-container">
            <div class=" sessTokenNone"></div>
            <div class="new_submit-content-box clearfix" style="width:100%;">
                <div class="show-submit-info">
                   <em>快来评论吧</em>
                   <em>0条评论</em>
                </div>
                <div class="new_input_box">
                    <input type="text">
                </div>
                <div class="show-submit-fn">
                    <div>
                        <span class="small-thumb new-thumb"></span>
                    </div>
                    <div>
                        <span class="small-collection new-collection"></span>
                    </div>
                    <div>
                        <span class="small-share"></span>
                    </div>
                </div>
                <a href="javascript:;" class="new_submit">发送</a>
            </div>
            <div class="share-dynamic">
                <a href="javascript:;"></a>
                <span>同时分享到动态</span>
            </div>
        </div>
	</div>
</template>
<script>
	export default {
		name:'speak',
		data(){
			return{
				
			}
		}
	}
</script>
<style scoped>
.sessTokenNone{
	width: 100%;
	height: 100%; 
	position:absolute; 
	left: 0; 
	top:0; 
	display: 
	none; 
	cursor: pointer; 
	z-index: 1;
}
.new_submit-content-box{
	position: relative;
}

.show-submit-info{
	width: 56%; 
	height:40px; 
	border: solid 1px #dedede; 
	background: #fff; 
	float: left; 
	cursor: pointer;
}
.show-submit-info em{
	height: 40px; 
	line-height: 40px; 
	color:#c2c2c2; 
	font-size:14px;
}
.show-submit-info em:nth-of-type(1){
	float:left; 
	margin-left: 12px;
}
.show-submit-info em:nth-of-type(2){
	float:right; 
	margin-right: 12px;
}
</style>