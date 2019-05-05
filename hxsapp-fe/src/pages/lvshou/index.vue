<template>
  <div id="lvshouIndex">

    hello
    <br />
    <button @click="alertUA">
      点击测试-弹出UA的信息
    </button>
    <div v-if="UA">
      UA数据:<br />
      {{UA}}
    </div>
    <div @click="gopage">
      lvshou/vipClub?sess_token=f00e325214159ab2b207ebae92643448&utime=1514359705&sign=ZDIyNTQyZTQ2MDRmYTNhODk4NjNmN2M1MThjZWMzYmU%3D
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
  name: 'lvshouIndex',
  data() {
    return {
      // 显示选中列表
      UA:null
    }
  },
  methods:{
    gopage(){
      this.$router.push({
        path:"/lvshou/vipClub?sess_token=f00e325214159ab2b207ebae92643448&utime=1514359705&sign=ZDIyNTQyZTQ2MDRmYTNhODk4NjNmN2M1MThjZWMzYmU%3D"
      })
    },
    
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
