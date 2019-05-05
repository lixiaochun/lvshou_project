<template>
	<div id="assess-container">
		<div class="main">
			<div class="title">
				<span></span>
				<em>评价</em>
				<em>发表</em>
			</div>
			<div class="content">
				<textarea placeholder="请写下你的评价"></textarea>
			</div>
		</div>
	</div>
</template>
<style scoped lang="less">
	#assess-container{
		.main{
			.title{
				display: flex;
				display: -webkit-flex;
				justify-content: space-between;
				-webkit-justify-content: space-between;
				height: 30px;
				padding:0 15px;
				span{
					width: 11px;
					height:20px;
					background:url(../../assets/lvshou/img/fanhui.png) left top no-repeat #000;
					background-size: 100%;
					display: block;
				}
				em:nth-of-type(1){
					height: 30px;
					line-height: 30px;
					text-align: right;
					font-size: 17px;
					color: #666;
				}
				em:nth-of-type(2){
					width: 40px;
					height: 30px;
					line-height: 30px;
					text-align: right;
					opacity: 0.3;
					font-size: 15px;
					color: #333333;
				}
			}
			.content{
				padding:10px 20px 0;
				textarea{
					height: 180px;
				    color: #333;
				    width: 100%;
				    resize: none;
				    font-size: 16px;
				    line-height: 24px;
				}
				::-webkit-input-placeholder{
					opacity: 0.3;
					font-size: 17px;
					color: #333;
				}
			}

		}
	}
</style>