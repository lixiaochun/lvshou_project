<template>
  <!-- 广告区域 -->
  <div class="adLinkShow" v-if="dataArr" >
    <img v-for="(data,index) in dataArr" :key="index" :src="data" />
  </div>
</template>

<script>
// "https://hxsupload-oss.hxsapp.com/2017-08-15/5a2b7e9093c884c36cbf8000fc8f782b.jpg?x-oss-process=style/medium"

export default {
  name: 'adLinkShow',
  props:{
		dataArr:{
			type: Array,
      default: function () {
        return []
      }
		}
	}
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">

	/*广告区域*/
	.adLinkShow {
		margin-top: 10px;
		display: block;
		width: 100%;
    img{
      width: 100%;
      max-width: 100%;
      display: block;
      margin-bottom: 10px;
    }
	}
</style>
