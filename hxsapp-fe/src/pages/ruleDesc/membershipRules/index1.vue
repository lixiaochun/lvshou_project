<template>
  <div class="membership">
    <div v-for="(box, key) in boxs" :key="key" :class="'boxs'+ key">
      <img v-if="!box.bg" :src="box.img" width="100%" height="auto">
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      boxs: [
        {
          img: require('./images/img_ok_01.jpg'),
          bg: false
        },
        {
          img: require('./images/img_ok_02.jpg'),
          bg: false
        },
        {
          img: require('./images/img_ok_03.jpg'),
          bg: false
        },
        {
          img: require('./images/img_ok_04.jpg'),
          bg: false
        },
        {
          img: require('./images/img_ok_05.jpg'),
          bg: false
        },
        {
          img: require('./images/img_ok_06.jpg'),
          bg: false
        },
        {
          img: require('./images/img_ok_07.jpg'),
          bg: false
        },
        {
          img: require('./images/img_ok_08.jpg'),
          bg: false
        },
        {
          img: require('./images/img_ok_09.jpg'),
          bg: false
        },
        {
          img: require('./images/img_ok_10.jpg'),
          bg: false
        },
        {
          img: require('./images/img_ok_11.jpg'),
          bg: false
        },
        {
          img: require('./images/img_ok_12.jpg'),
          bg: false
        },
        {
          img: require('./images/img_ok_13.jpg'),
          bg: false
        },
        {
          img: require('./images/img_ok_14.jpg'),
          bg: false
        },
        {
          img: require('./images/img_ok_15.jpg'),
          bg: false
        },
        {
          img: require('./images/img_ok_16.jpg'),
          bg: false
        }
      ]
    }
  },
  created() {
    document.title = '会员规则说明'
  }
}
</script>

<style lang="less" scoped>
.membership {
  width: 100%;
  height: auto;
  .boxs10 {
    margin-top: -1px;
  }
  .bg-wrapper {
    position: relative;
    width: 100%;
    background-size: 100% 100%;
    background-repeat: no-repeat;
    margin: 0 auto;
    font-weight: 500;
    &.bg3 {
      p {
        position: absolute;
        top: 25%;
        left: 13%;
        margin: 0 auto;
        width: 74%;
        color: #666666;
        line-height: 28px;
        b {
          color: #fa4483;
          font-weight: normal;
        }
      }
      &:after {
        content: "";
        display: block;
        padding: 37%;
      }
    }
    &.bg6 {
      p {
        position: absolute;
        top: 7%;
        left: 13%;
        margin: 0 auto;
        width: 74%;
        color: #666666;
        line-height: 28px;
        b {
          color: #fa4483;
          font-weight: normal;
        }
        span {
          color: #bebcbc;
          font-weight: normal;
        }
      }
      &:after {
        content: "";
        display: block;
        padding: 20%;
      }
    }
    &.bg8 {
      p {
        position: absolute;
        top: 6%;
        left: 13%;
        margin: 0 auto;
        width: 74%;
        color: #666666;
        line-height: 28px;
        b {
          color: #fa4483;
          font-weight: normal;
        }
        span {
          color: #bebcbc;
          font-weight: normal;
        }
      }
      &:after {
        content: "";
        display: block;
        padding: 22%;
      }
    }
    &.bg10 {
      p {
        position: absolute;
        top: 3%;
        left: 13%;
        margin: 0 auto;
        width: 74%;
        color: #666666;
        line-height: 28px;
        b {
          color: #fa4483;
          font-weight: normal;
        }
        span {
          color: #bebcbc;
          font-weight: normal;
        }
        i {
          display: block;
          padding: 5px 0;
        }
      }
      &:after {
        content: "";
        display: block;
        padding: 43%;
      }
    }
    &.bg12 {
      p {
        position: absolute;
        top: 3%;
        left: 13%;
        margin: 0 auto;
        width: 74%;
        color: #666666;
        line-height: 28px;
        b {
          color: #fa4483;
          font-weight: normal;
        }
        span {
          color: #bebcbc;
          font-weight: normal;
        }
        i {
          display: block;
          padding: 5px 0;
        }
      }
      &:after {
        content: "";
        display: block;
        padding: 43%;
      }
    }
  }
}
</style>
