<template>
  <div>index indexddddd
    <!--<test-headers></test-headers>-->
    <!--<ls-img :src="imgData" :img-sty="imgSty"></ls-img>-->
    <!-- <ls-img :src="imgData"></ls-img> -->
    <ls-img :src="imgData"></ls-img>
    <div @click="btn" class="btn">okssss Activity</div>
    <test-single-com></test-single-com>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import LvshouFetch from 'Api/common'
import { splicingUrl } from 'Utils/common'
export default {
  data() {
    return {
      imgData: 'https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=2486956696,687545127&fm=27&gp=0.jpg',
      imgSty: 'width: 100%; height: auto;'
    }
  },
  created() {
    this.test('测试 测试')
    console.log(splicingUrl({
      a: 'Mark',
      b: 'Ocean',
      c: 'Jean'
    }, 'http://www.baidu.com')) // http://www.baidu.com?a=Mark&b=Ocean&c=Jean
  },
  computed: {
    ...mapGetters([
      'pushTest'
    ])
  },
  methods: {
    ...mapActions([
      'test'
    ]),
    async btn() {
      console.log(this.pushTest)
      const data = await LvshouFetch({
        url: 'https://act.hxsapp.com/base/Api/actInfo',
        data: {
          act_id: '260'
        }
      })
      console.log('data: 111dddd', data)
    }
  }
}
</script>

<style lang="less" scoped>
.btn {
  font-size: 60px;
  color: rgb(205, 50, 159);
  font-weight: bold;
}
</style>
