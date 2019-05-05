<template>
	<div id="measureTip-container">
		<ul>
			<li v-for="item in imagesSrcArr">
			    <img v-lazy="item">
			</li>
		</ul>
        <preLoading v-show="!loadEndTrue"></preLoading>
	</div>
</template>
<script>
	import { Lazyload } from 'mint-ui';
    import commonJs from '@/util/common.js'
    import preLoading from '@/components/preLoading'

	export default{
		name:'measureTip',
		data(){
			return{
				imagesSrcArr:[],
				loadEndTrue:false
			}
		},
		mounted(){
            document.title = '测量小贴士';
			//设置图片路径
			this.setImagesSrc();
		},
		methods:{
			setImagesSrc(){
				for(let i = 1; i < 10; i++){
					this.imagesSrcArr.push(
        				require('@/assets/lvshou/img/measure-tips/0' + i + '.jpg')
					);
				}

				setTimeout(()=>{
					this.loadEndTrue = true;
				},800)
				
			}
		},
        components:{
            preLoading
        },
        beforeDestroy(){
            document.title = commonJs.config.webTitle;
        }
	}
</script>
<style scoped lang="less">
	#measureTip-container{
		ul{
			li{
				img{
					width: 100%;
				}
			}
		}
		img[lazy=loading] {
    		width: 100%;
  			margin: auto;
    		background-image: url("../../assets/img/bg_750_230@3x.png");
    		background-position:  center center;
    		background-size:100%;
		}
	}
</style>