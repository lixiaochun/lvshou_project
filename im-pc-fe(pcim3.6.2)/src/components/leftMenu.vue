<template>
  <div class="tabbar">
    <div class="tabbar-item">
        <div class="user-avatar">
            <img :src="loginInfoHeadurl" alt="">
        </div>
    </div>
    <div :class="tabbarIndex==0?'tabbar-item active':'tabbar-item'" @click="checkTab(0)">
         <i class="message"></i>
    </div>
    <div :class="tabbarIndex==1?'tabbar-item active':'tabbar-item'"  @click="checkTab(1)">
         <i class="user"></i>
    </div>
    <div :class="tabbarIndex==2?'tabbar-item active':'tabbar-item'" @click="checkTab(2)">
         <i class="setting"></i>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "leftMenu",
  props: {
    TabarIndex: {
      type: Number,
      default: function() {}
    }
  },
  data() {
    return {
      time: "",
      tabbarIndex: 0,
      loginInfoHeadurl:null
    };
  },
  computed: {},
  watch: {
    TabarIndex(value) {
      this.tabbarIndex = value;
    },
    "$store.getters.loginInfoHeadurlGetter"(url){
      this.loginInfoHeadurl = url;
    }
  },
  created() {
    this.tabbarIndex = this.TabarIndex;
  },
  methods: {
    checkTab(index) {
      if (index == this.tabbarIndex) return false;
      this.$store.commit('changeTabidx',index);
    }
  },
  mounted() {}
};
</script>

<style scoped >
.tabbar {
  color: rgba(255, 255, 255, 0.3);
  text-align: center;
  background: rgba(101, 114, 147, 1);
}

.tabbar-item {
  cursor: pointer;
  padding: 15px 0;
  text-align: center;
}
.tabbar-item i {
  display: block;
  width: 30px;
  height: 30px;
  margin: auto;
}
.tabbar-item .message {
  background: url("../assets/img/tabbar/message.png") no-repeat center;
}
.tabbar-item .user {
  background: url("../assets/img/tabbar/user.png") no-repeat center;
}
.tabbar-item .setting {
  background: url("../assets/img/tabbar/setting.png") no-repeat center;
}
.tabbar-item.active .message {
  background: url("../assets/img/tabbar/message_active.png") no-repeat center;
}
.tabbar-item.active .user {
  background: url("../assets/img/tabbar/user_active.png") no-repeat center;
}
.tabbar-item.active .setting {
  background: url("../assets/img/tabbar/setting_active.png") no-repeat center;
}
.user-avatar {
  width: 40px;
  height: 40px;
  overflow: hidden;
  margin: auto;
  border-radius: 5px;
}
.user-avatar img {
  width: 100%;
  min-height: 40px;
}
</style>
