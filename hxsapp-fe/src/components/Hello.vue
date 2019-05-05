<template>
  <div id="hello">

    hello
    <br />
    <button @click="alertUA">
      点击测试-弹出UA的信息
    </button>
    <div v-if="UA">
      UA数据:<br />
      {{UA}}
    </div>
  </div>
</template>

<script>







import axios from 'axios'
import { Toast } from 'mint-ui';
import commonJs from '@/util/common.js'
// import { Indicator } from 'mint-ui';

// 下载app组件
import downToLinkedMe from "@/components/downToLinkedMe"

// 初始化loadding的组件
import preLoading from "@/components/preLoading"

export default {
  name: 'hello',
  data() {
    return {
      // 显示选中列表
      UA:null
    }
  },
  methods:{
    alertUA(){
      this.UA = window.navigator.userAgent
      Toast(window.navigator.userAgent)
    }
  }
}

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
h1, h2 {
  font-weight: normal;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 10px;
}

a {
  color: #42b983;
}
#hello{
  margin: 0 auto;
  text-align: center;
  width: 100%;
  button{
    width:300px;
    height: 30px;
    line-height: 30px;
    border: 1px solid #666;
    font-size: 14px;
  }
}
</style>
