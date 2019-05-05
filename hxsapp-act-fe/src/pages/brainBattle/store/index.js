/*
* @desc state为vuex 状态树管理
* */

import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

function setStorage(key, value) {
  if (value && JSON.stringify(value)) {
    localStorage.setItem(key, JSON.stringify(value))
  }
}
function getStorage(key) {
  // removeStorage(key)
  return localStorage.getItem(key) ? JSON.parse(localStorage.getItem(key)) : null
}

function removeStorage(key) {
  localStorage.removeItem(key)
}

// 礼品
let gift = [
  {
    img: require('../assets/images/gift/img_5.png'),
    name: '价值2999元扫地机器人'
  },
  {
    img: require('../assets/images/gift/img_6.png'),
    name: '维多利亚秘密化妆包'
  },
  {
    img: require('../assets/images/gift/img_2.png'),
    name: '阿玛尼丝绒唇釉504#'
  },
  {
    img: require('../assets/images/gift/img_4.png'),
    name: '荷叶茶'
  },
  {
    img: require('../assets/images/gift/img_3.png'),
    name: '代餐能量棒'
  },
  {
    img: require('../assets/images/gift/img_1.png'),
    name: '绿豆'
  }
]

export default new Vuex.Store({
  state: {
    isFirstLoad: true,
    topicId: '',
    gift: gift,
    baseInformation: null,
    baseActiveInfo: getStorage('baseActiveInfo'),
    userInfo: getStorage('userInfo'),
    grameInfo: getStorage('grameInfo'), // 游戏匹配信息
    guessAnswerCount: getStorage('guessAnswerCount'), // 结束游戏统计
    grameItemsList: getStorage('grameItemsList'),
    rankingList: getStorage('rankingList')
  },
  mutations: {
    removeStorage(state, options) {
      let self = this;
      if (!options) {
        options = this.state;
      }
      if (typeof options === 'object') {

      }
      Object.keys(options).forEach((item) => {
        if (item !== 'gift') {
          self.state[item] = null;
          removeStorage(item)
        }
      })
    },
    isFirstLoad(state) {
      this.state.isFirstLoad = false;
    },
    topicId(state, option) {
      this.state.topicId = option;
    },
    baseInformation(state, option) {
      this.state.baseInformation = option;
      setStorage('baseInformation', this.state.baseInformation)
    },
    baseActiveInfo(state, option) {
      this.state.baseActiveInfo = option;
      setStorage('baseActiveInfo', this.state.baseActiveInfo)
    },
    userInfo(state, option) {
      this.state.userInfo = option;
      setStorage('userInfo', this.state.userInfo)
    },
    grameInfo(state, option) {
      this.state.grameInfo = option;
      setStorage('grameInfo', this.state.grameInfo)
    },
    guessAnswerCount(state, option) {
      this.state.guessAnswerCount = option;
      setStorage('guessAnswerCount', this.state.guessAnswerCount)
    },
    rankingList(state, option) {
      this.state.rankingList = option;
      setStorage('rankingList', this.state.rankingList)
    },
    grameItemsList(state, item) {
      let grameInfo = this.state.grameInfo;
      this.state.grameItemsList = this.state.grameItemsList ? this.state.grameItemsList : {};
      if (grameInfo && grameInfo.number) {
        if (!this.state.grameItemsList[grameInfo.number]) {
          this.state.grameItemsList[grameInfo.number] = [];
        }
        this.state.grameItemsList[grameInfo.number].push(item)
        setStorage('grameItemsList', this.state.grameItemsList)
      }
    }
  }
})
