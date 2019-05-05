<template>
    <div class="preLoading" v-if="preLoad">
        <span></span>
    </div>
</template>
<script>
	export default{
		name: 'preLoading',
		data(){
			return{
				preLoad: true
			}
		},
		mounted(){

		},
		methods:{
			// preLoading(fn) {
			//     document.onreadystatechange = function(){
			//         if(document.readyState == 'complete' || document.readyState == 'loaded'){
			//             finish(fn);
			//         }
			//     }
			//     function finish(fn){
			//         setTimeout(function(){
			//             if(fn){
			//                 fn();
			//             }
			//         },1000);
			//     }
			// }
		},
	}
</script>
<style scoped>
.preLoading{
  width: 100%;
  height: 100%;
  position: fixed;
  left: 0;
  top: 0;
  background: #fff;
  z-index: 9999999999999;
}
.preLoading span{
    width: 80px;
    height: 100px;
    background: url(../assets/images/load.gif) left top no-repeat;
    background-size: 80px;
    position: absolute;
    left: 50%;
    top: 45%;
    margin-left: -38px;
    margin-top: -60px;
}
</style>