<template>
  <div class="time-down">
    <span>{{time.h}}</span>
    <b>:</b>
    <span>{{time.m}}</span>
    <b>:</b>
    <span>{{time.s}}</span>
  </div>
</template>

<script>
export default {
  name: 'ls-time-down',
  data() {
    return {
      time: {
        h: '03',
        m: '00',
        s: '00'
      },
      clearTime: null
    }
  },
  mounted() {
    this.clearTime = setInterval(() => {
      this.getTime()
    }, 1000)
  },
  methods: {
    getTime() {
      // let beginTime = 1557280775
      let endTime = 1557291575
      // let endTime = 1557282341
      let currentTime = new Date().getTime() / 1000

      if (currentTime > endTime) {
        this.time.h = '00'
        this.time.m = '00'
        this.time.s = '00'
        return
      }

      let currentMin = Math.floor(endTime - currentTime)

      if (currentMin <= 0) clearInterval(this.clearTime)

      let h = Math.floor(currentMin / 3600)
      let m = Math.floor((currentMin - h * 3600) / 60)
      let s = (currentMin - h * 3600) % 60

      this.time.h = '0' + h
      this.time.m = m < 10 ? '0' + m : m
      this.time.s = s < 10 ? '0' + s : s
    }
  }
}
</script>

<style lang="less" scoped>
.time-down {
  margin: 5px auto 0px;
  width: 90%;
  height: 20px;
  line-height: 0;
  color: #88633f;
  font-size: 0px;
  span {
    width: 40px;
    height: 40px;
    line-height: 42px;
    text-align: center;
    border-radius: 4px;
    background-color: #fff;
    font-size: 28px;
  }
  b {
    margin: 0 6px;
    width: 5px;
    height: 40px;
    line-height: 42px;
    font-size: 23px;
  }
}
</style>
