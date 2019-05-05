<template>
	<div class="declaration-container">
		<ul class="list">
			<li>
				<a href="https://act.hxsapp.com/base/Award/rule/customerService">
					<div>售后协议</div>
					<span></span>
				</a>
			</li>
			<li>
				<a href="https://act.hxsapp.com/base/Award/rule/serviceProtocol">
					<div>服务协议</div>
					<span></span>
				</a>
			</li>
			<li>
				<a href="https://act.hxsapp.com/base/Award/rule/useProtocol">
					<div>APP使用协议</div>
					<span></span>
				</a>
			</li>
		</ul>
	</div>
</template>
<script>
    import commonJs from '@/util/common.js'
	export default{
		name: 'declaration',
		mounted(){
			document.title = '协议及声明';
		},
		beforeDestroy(){
			document.title = commonJs.config.webTitle;
		}
	}
</script>
<style scoped lang="less">
	.declaration-container{
		.list{
			padding-left:14px;
			li{
				a{
					width: 100%;
					height: 100%;
					display: block;
				}
				height: 52px;
				padding-right:14px;
				border-bottom: rgba(129, 141, 207,0.16) solid 1px;
				div{
					height: 22px;
					line-height: 22px;
					font-size: 15px;
					color: #333333;
					letter-spacing: -0.32px;
					padding:15px 0;
					float:left;
				}
				span{
					width: 8px;
					height: 14px;
					background:url(../../assets/lvshou/img/return-blue.png) left top no-repeat;
					background-size:100%;
					float: right;
					margin-top: 19px;
				}
			}
		}
	}
</style>