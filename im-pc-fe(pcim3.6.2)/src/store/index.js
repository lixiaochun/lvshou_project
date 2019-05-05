import Vue from 'vue';
import Vuex from 'vuex';
Vue.use(Vuex);

const store = new Vuex.Store({
    state: {
        sessionId: null, //当前会话id
        selSess: null, //当前聊天会话对象
        selType: null, //当前聊天类型
        selHeadSrc: null, //当前聊天头像
        selNikename: null, //当前聊天用户昵称
        loginInfoHeadurl: null, //当前顾问聊天头像
        tabbarIndex: 0, //当前选中的左侧菜单下标
        encodePhone: null, //当前加密电话
        setTopUser: null, //置顶的所有用户       
        userInfo: null, //通讯录选中用户信息
        isLogin: false, // 是否登录
        conductInfo: null, // 显示交互页面数据（status,title, type,id）显示状态，标题，类型（动态，日记，评论，订单）
        sendImgFile:null, //复制粘贴图片文件
        showAudio:false,// 语音通话显示状态
        beCalling:false,//是否被叫中
        beCalledInfo:false,// 是否正忙
    },
    getters: {
        sessionIdGetter: state => state.sessionId,
        selSessGetter: state => state.selSess,
        selTypeGetter: state => state.selType,
        tabidxGette: state => state.tabbarIndex,
        selHeadSrcGetter: state => state.selHeadSrc,
        selNikenameGetter: state => state.selNikename,
        encodePhoneGetter: state => state.encodePhone,
        setTopUserGetter: state => state.setTopUser,
        userInfoGetter: state => state.userInfo,
        isLoginGetter: state => state.isLogin,
        loginInfoHeadurlGetter: state => state.loginInfoHeadurl,
        conductGetter: state => state.conductInfo,
        sendImgGetter: state => state.sendImgFile,
        showAudioGetter: state => state.showAudio,
        beCallingGetter: state => state.beCalling,
        beCalledInfoGetter: state => state.beCalledInfo,
    },
    mutations: {
        //改变当前会话id 
        changeSessionId: (state, userId) => state.sessionId = userId,

        //改变当前聊天会话对象
        changeSelSess: (state, selSess) => state.selSess = selSess,

        //改变当前聊天类型
        changeSelType: (state, type) => state.selType = type,

        //改变当前聊天头像
        changeSelHeadSrc: (state, src) => state.selHeadSrc = src,
        // 改变当前聊天的用户昵称
        changeSelNikename: (state, name) => state.selNikename = name,

        //改变当前左侧菜单选中
        changeTabidx: (state, index) => state.tabbarIndex = index,

        //改变当前用户加密电话
        changeEncodePhone: (state, phone) => state.encodePhone = phone,
        //改变置顶的所有用户
        changeSetTopUser: (state, user) => state.setTopUser.push(user),
        // 改变登录状态
        changeIsLogin: (state, value) => state.isLogin = value,
        // 存储当前通讯录中选中的用户信息
        changeUserInfo: (state, data) => state.userInfo = data,
        // 存储当前通讯录中选中的用户信息
        changeloginInfoHeadurl: (state, src) => state.loginInfoHeadurl = src,
        // 记录是否点击了行为数据  
        changeConduct: (state, data) => state.conductInfo = data,
        // 改变语音显示状态
        changeShowAudio: (state, data) => state.showAudio = data,
        // 改变语音呼叫状态
        changeBeCalling: (state, data) => state.beCalling = data,
        // 改变语音忙碌状态
        changeBeCalledInfo: (state, data) => state.beCalledInfo = data,

        //改变当前粘贴板图片文件 
        changeSendImg: (state, data) => state.sendImgFile = data,

    }
})














export default store;