<!-- 页面介绍 : 音频组件，目前支持传参：src size。其中size在18-28之间 -->
<!-- created by : lvhaizhou -->
<!-- created time : 2019-04-27 -->
<template>
    <div>
        <div class="voice-introduced" :style="wrapStyle" @click="audioStartAndEndHandler">
            <i class="icon-mic" :style="micPhoneStyle"></i>
            <span v-if="!audioRunning" :style="showSec">{{duration}}s</span>
            <div v-else class="box" :style="boxStyle">
                <div class="wifi-symbol">
                    <div class="wifi-circle first"></div>
                    <div class="wifi-circle second"></div>
                    <div class="wifi-circle third"></div>
                </div>
            </div>
        </div>
        <audio ref="audio" @canplay="getAudioDuration" @timeupdate="audioUpdateTime" preload controls hidden>
            <source :src="src">
        </audio>
    </div>
</template>

<script>
export default {
    props: {
        size: {
            type: Number,
            default: 20
        },
        src: {
            type: String,
            default: require('./支付宝到账10万.mp3')
        }
    },
    data (){
        return {
            audioRunning: false, // 音频是否正在播放
            duration: 0, // 音频长度（秒）
            audioCurrentTime: 0 // 当前播放时间
        }
    },
    computed: {
        styleSize(){ // 样式使用的size
            if (this.size < 18){
                return 18
            }
            if (this.size > 28){
                return 28
            }
            return this.size
        },
        micPhoneStyle(){ // 麦克风图标样式
            return {
                'font-size': this.styleSize + 'px',
                'line-height': parseInt(this.styleSize / 2 * 3) + 'px'
            }
        },
        wrapStyle(){ // 最外层样式
            return {
                'height': parseInt(this.styleSize / 2 * 3) + 'px',
                'width': parseInt(this.styleSize * 5) + 'px'
            }
        },
        showSec(){ // 显示秒数
            return {
                'font-size': parseInt(this.styleSize / 3 * 2) + 'px',
                'line-height': parseInt(this.styleSize / 2 * 3) + 'px'
            }
        },
        boxStyle(){ // box样式
            return {
                'margin-left': parseInt(this.styleSize * 5) - 15 + 'px',
                'margin-top': parseInt(-10 + (this.styleSize - 20) / 2) + 'px'
            }
        }
    },
    watch: {
        src(){
            this.getAudioDuration()
        }
    },
    methods: {
        // 控制音频播放和暂停
        audioStartAndEndHandler(){
            if (!this.$refs.audio) return
            const audioSrc = this.$refs.audio.currentSrc // 获取此音频的src
            const arr = audioSrc.split('.')
            const fileType = arr[arr.length - 1]
            if (this.$refs.audio.canPlayType('audio/' + fileType) === '') {
                alert('当前浏览器不支持.' + fileType + '类型的文件播放')
                return
            }
            if (this.$refs.audio.paused){
                this.$refs.audio.play()
                this.audioRunning = true
            } else {
                this.$refs.audio.pause()
                this.$refs.audio.load()
                this.audioRunning = false
            }
        },
        // 获取播放总时长
        getAudioDuration(){
            this.duration = parseInt(this.$refs.audio.duration)
        },
        // 获取当前播放时间
        audioUpdateTime(e){
            this.audioCurrentTime = parseInt(e.target.currentTime)
            if (this.audioCurrentTime >= this.duration){
                this.audioRunning = false
            }
        }
    },
    created (){
    }
}
</script>

<style lang="scss" scope>
.voice-introduced{
    width: 105px;
    height: 30px;
    display: inline-block;
    border: 1px solid #d7d7d7;
    border-radius: 10px;
    cursor: pointer;
    transition: all .5s;
    -webkit-transition: all .5s;
    -o-transition: all .5s;
    -moz-transition: all .5s;
    >i,span{
        line-height: 30px;
        float: left;
    }
    i{
        margin-left: 5px;
    }
    span{
        display: inline-block;
        height: 30px;
        padding-top: 1px;
        padding-left: 4px;
    }
}
.voice-introduced:hover{
    background: #ebe5e5;
}
/* 音频扩展符图标 */
.box {
    display: block !important;
    float: none !important;
    width: 120px;
    height: 120px;
    box-sizing: border-box;
    position: relative;
    margin: 0;
    margin-left: 86px;
    margin-top: -9px;
}
.wifi-symbol {
    width: 50px;
    height: 50px;
    box-sizing: border-box;
    overflow: hidden;
    transform: rotate(135deg);

}
.wifi-circle {
    border: 2px solid #999999;
    border-radius: 50%;
    position: absolute;
}

.first {
    width: 0px;
    height: 0px;
    background: #cccccc;
    top: 45px;
    left: 45px;
}

.second {
    width: 15px;
    height: 15px;
    top: 38px;
    left: 38px;
    animation: fadeInOut 1s infinite 0.2s;
}

.third {
    width: 25px;
    height: 25px;
    top: 32px;
    left: 32px;
    animation: fadeInOut 1s infinite 0.4s;
}

@keyframes fadeInOut {
    0% {
        opacity: 0;
    }
    100% {
        opacity: 1;
    }
}
@font-face {
  font-family: 'icomoon';
  src:  url('fonts/icomoon.eot?v163x9');
  src:  url('fonts/icomoon.eot?v163x9#iefix') format('embedded-opentype'),
    url('fonts/icomoon.ttf?v163x9') format('truetype'),
    url('fonts/icomoon.woff?v163x9') format('woff'),
    url('fonts/icomoon.svg?v163x9#icomoon') format('svg');
  font-weight: normal;
  font-style: normal;
}

[class^="icon-"], [class*=" icon-"] {
  /* use !important to prevent issues with browser extensions that change fonts */
  font-family: 'icomoon' !important;
  speak: none;
  font-style: normal;
  font-weight: normal;
  font-variant: normal;
  text-transform: none;
  line-height: 1;

  /* Better Font Rendering =========== */
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

.icon-mic:before {
  content: "\e91e";
}
.icon-mic{
    text-indent: 0;
}
</style>

