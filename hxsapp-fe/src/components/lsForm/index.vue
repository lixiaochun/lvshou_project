<template>
  <div class="wrapper">
    <div
      v-for="(opt, key) in formOptions"
      :key="key"
      v-if="formOptions.length > 0"
      class="line"
      :class="opt.inlineDisplay ? 'inlineDisplay' : ''"
      :style="(opt.lineNo ? 'display: inline-block; width: 49%;' : '')"
    >
      <!-- button -->
      <mt-button
        v-if="opt.isType === 'button'"
        :type="opt.type"
        :size="opt.size"
        :disabled="opt.disabled"
        :style="opt.sty"
        @click="optClick(opt.click)"
        :class="opt.type"
      >{{opt.name}}</mt-button>
      <div v-if="opt.isMargin" style="width: 100%; height: 30px;"></div>
      <div
        class="more"
        v-if="opt.more && opt.type === 'primary'"
        v-for="(m, index) in opt.more"
        :key="index"
        :style="m.isType === 'label' ? 'background-color: #fff; width: 49%; height: auto; padding: 8px 0 0 0;' : opt.moreSty"
      >
        <span>{{m.name}}:</span>
        <input v-if="m.isType === 'input'" v-model="m.input" :placeholder="m.placeholder">
        <textarea
          v-if="m.isType === 'textarea'"
          rows="5"
          cols="80"
          v-model="m.input"
          :placeholder="m.placeholder"
        ></textarea>
        <ul v-if="m.isType === 'label'">
          <li v-for="(l, lindex) in m.labelList" :key="lindex">
            <!-- <input type="radio" v-bind:checked = 'm.input === lindex+1' :name="l.optName || l.name" :value="lindex+1" v-model="m.input"> 
            <span>{{l.name}}</span>-->
            <el-radio v-model="m.input" :label="lindex+1">{{l.name}}</el-radio>
          </li>
        </ul>
      </div>
      <!-- textarea -->
      <textarea
        v-if="opt.isType === 'textarea'"
        rows="5"
        cols="80"
        v-model="opt.input"
        :placeholder="opt.placeholder"
      ></textarea>
      <p v-if="opt.desction">{{opt.desction}}</p>
      <input
        v-if="opt.isType === 'inputNotTitle'"
        v-model="opt.input"
        :placeholder="opt.placeholder"
      >
      <div v-if="opt.isType === 'label'" class="single">
        <span>{{opt.name}}:</span>
        <ul>
          <li v-for="(ln, lnindex) in opt.labelList" :key="lnindex">
            <!-- <input type="radio" v-bind:checked = 'opt.input === lnindex+1' :name="ln.name" :value="lnindex+1" v-model="opt.input"> 
            <span>{{ln.name}}</span>-->
            <el-radio v-model="opt.input" :label="lnindex+1">{{ln.name}}</el-radio>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    formOptions: {
      type: Array,
      default: []
    }
  },

  computed: {

  },
  methods: {
    // 中转事件 防止clickMethod 这个事件不存在 而导致的报错
    optClick(clickMethod) {
      clickMethod()
    }
  }
}
</script>

<style lang="less" scoped>
.wrapper {
  position: relative;
  .line {
    position: relative;
    width: 100%;
    height: auto;
    min-height: 30px;
    margin-bottom: 8px;
    .single {
      display: inline-block;
      width: 90%;
      ul {
        li {
          width: 37%;
        }
      }
    }
  }
  .inlineDisplay {
    display: inline-block;
    width: 25%;
  }
  .mint-button {
    // position: absolute;
    &.default {
      width: 75px;
      height: 25px;
      border-radius: 20px;
      border: 1px solid #818dcf;
      background-color: #fff;
      color: #818dcf;
    }
    &.primary {
      width: 75px;
      height: 25px;
      border-radius: 20px;
      background: linear-gradient(
        270deg,
        rgba(255, 110, 141, 1) 0%,
        rgba(255, 104, 176, 1) 100%
      );
      color: #fff;
    }
  }
  .el-radio {
    margin-right: 3px;
  }
  textarea {
    display: block;
    padding: 8px 11px;
    width: 94%;
    color: #999999;
    background: rgba(245, 245, 248, 1);
    border-radius: 3px;
  }
  p {
    width: 73%;
    padding: 3px 5px;
    line-height: 20px;
    font-size: 12px;
    display: inline-block;
    vertical-align: middle;
    color: #999;
  }
  input {
    display: block;
    padding: 5px 8px;
    width: 95%;
    color: #999999;
    background: rgba(245, 245, 248, 1);
    border-radius: 3px;
  }
  ul {
    // display: inline-block;
    // width: 60%;
    li {
      display: inline-block;
      width: 30%;
      input {
        display: inline-block;
        width: 20%;
      }
      span {
        display: inline-block;
      }
    }
  }
  .more {
    display: inline-block;
    &:last-child {
      padding-bottom: 15px !important;
    }
    span {
      font-size: 15px;
    }
    input {
      display: block;
      padding: 7px 15px;
      width: 92%;
      font-size: 15px;
      color: #999999;
      background: #f5f5f8;
      border-radius: 3px;
    }
    textarea {
      display: block;
      padding: 8px 15px;
      width: 92%;
      color: #999999;
      background: rgba(245, 245, 248, 1);
      border-radius: 3px;
    }
    ul {
      // display: inline-block;
      // width: 60%;
      li {
        display: inline-block;
        width: 30%;
        input {
          display: inline-block;
          width: 20%;
        }
        span {
          display: inline-block;
        }
      }
    }
  }
}
</style>

