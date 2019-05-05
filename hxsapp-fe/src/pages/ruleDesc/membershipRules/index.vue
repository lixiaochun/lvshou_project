<template>
  <div class="membership">
    <div v-for="(box, key) in boxs" :key="key" :class="'boxs'+ key">
      <img v-if="!box.bg" :src="box.img" width="100%" height="auto">
      <div
        v-else-if="box.bg"
        class="bg-wrapper"
        :class="box.class"
        :style="'background-image: url('+ box.img +')'"
      >
        <p v-if="box.class === 'bg3'">
          会员机制是好享瘦APP回馈会员客户的福
          利机制。后台系统自动将客户的
          <b>消费情况、活跃情况等</b>转化为一定的经验值，随着经
          验值的增长，会员等级会逐渐提升，不同
          会员等级的会员可以
          <b>享受不同的会员权益</b>。
        </p>
        <p v-if="box.class === 'bg6'">
          会员等级划分为V1、V2、V3、V4、V5、
          <b>绿瘦白金、绿瘦钻石、绿瘦黑金、绿瘦尊享</b>等九个
          等级，不同的会员等级对应不同的会员权益。
          <span>具体会员权益详见表</span>。
        </p>
        <p v-if="box.class === 'bg8'">
          经验值即成长值，决定了会员等级。会员可通
          过消费、活跃等方式获取。
          <b>
            即经验值=消费经
            验值+活跃经验值
          </b>。系统自动将会员的消费情
          况、活跃情况换算成升级所需的经验值。
        </p>
        <p v-if="box.class === 'bg10'">
          升级：当会员当前的经验值大于或等于更高等
          级的经验值时,等级将立即提升到相应的会员
          等级。会员等级最高提升到尊享卡。
          <i></i>
          降级：在一个相应等级的R周期内（R=最近一
          次消费时间），会员如果不在绿瘦产生任何消
          费，其经验值将会下降一个等级，直至会员等
          级下降至V2。需要注意的是，银卡及以上等级
          暂不限R值，将针对特殊项目不定期推出新规。
        </p>
        <p v-if="box.class === 'bg12'"></p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      boxs: [
        {
          img: require('./images/img_01.jpg'),
          bg: false
        },
        {
          img: require('./images/img_02.jpg'),
          bg: false
        },
        {
          img: require('./images/img_03.jpg'),
          bg: true,
          class: 'bg3'
        },
        {
          img: require('./images/img_04.jpg'),
          bg: false
        },
        {
          img: require('./images/img_05.jpg'),
          bg: false
        },
        {
          img: require('./images/img_06.jpg'),
          bg: true,
          class: 'bg6'
        },
        {
          img: require('./images/img_07.jpg'),
          bg: false
        },
        {
          img: require('./images/img_08.jpg'),
          bg: true,
          class: 'bg8'
        },
        {
          img: require('./images/img_09.jpg'),
          bg: false
        },
        {
          img: require('./images/img_10.jpg'),
          bg: true,
          class: 'bg10'
        },
        {
          img: require('./images/img_13.jpg'),
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
