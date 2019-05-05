<template>
  <div class="ActiveStartAnimation">
    <div class="ActiveStartAnimationContent">
      <active-background-image></active-background-image>
      <div class="userInfoVS">
        <div class="userVS">
          <div class="uservest user_animation user">
            <div class="u">
              <div class="logo">
                <div class="logoimg">
                  <img :src="uimg" alt="" />
                </div>
              </div>
              <div class="name">{{uname}}</div>
            </div>
          </div>
          <div class="uservest vest_animation vest">
            <div class="u">
              <div class="logo">
                <div class="logoimg">
                  <img :src="vimg" alt="" />
                </div>
              </div>
              <div class="name">{{vname}}</div>
            </div>
          </div>
          <div v-bind:class="{vsimg:true, vsimgani: vsimgani}">
            <img :src="vsimg" alt="" />
          </div>
          <!--<div class="vs">-->
            <!--<div class="uvs">-->
              <!--<img :src="s" class="s" alt="" />-->
              <!--<img :src="v" class="v" alt="" />-->
            <!--</div>-->
          <!--</div>-->
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'active-matching-animation',
  data() {
    return {
      v: require('../../assets/images/img_08.png'),
      s: require('../../assets/images/img_09.png'),
      vsimg: require('../../assets/images/img_10.png'),
      vsimgani: false
    }
  },
  props: ['uimg', 'uname', 'vimg', 'vname'],
  mounted() {
    setTimeout(() => {
      this.vsimgani = true
    }, 700)
  },
  methods: {

  }
}
</script>

<style lang="less" scoped>
  .ActiveStartAnimation{
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: #250b6c;
    z-index: 1000;
    .ActiveStartAnimationContent{
      position: relative;
      width: 100%;
      height: 100%;
      .userInfoVS{
        position: absolute;
        top: 50%;
        left: 0;
        width: 100%;
        transform: translateY(-50%);
        -webkit-transform: translateY(-50%);
        .userVS{
          .uservest{
            float: left;
            width: calc( 50vw - 12px );
            padding: 10vw 0;
            background: rgba(0,0,0,0.5);
            display: flex;
            display: -webkit-flex;
            display: -webkit-inline-flex;
            justify-content: center;
            align-items: center;
            .u{
              .logo{
                margin: 0 auto;
                width: 23vw;
                height: 23vw;
                border-radius: 50%;
                border: 1vw solid #000000;
                overflow: hidden;
                padding: 2vw;
                background: #ffffff;
                box-shadow: 0 -1vw 0 inset #e3e3e3;
                .logoimg{
                  background: #808080;
                  border-radius: 50%;
                  width: 18vw;
                  height: 18vw;
                  overflow: hidden;
                  margin-top: -1vw;
                  margin-left: -0.5vw;
                  img{
                    width: 100%;
                  }
                }
              }
              .name{
                font-size: 30px;
                font-weight: 600;
                color: #ffffff;
                margin-top: 3vw;
                height: 2em;
              }
            }
          }
          .user_animation{
            animation: myfirst 0.6s;
            -moz-animation: myfirst 0.6s;
            -webkit-animation: myfirst 0.6s;
            -o-animation: myfirst 0.6s;
            animation-fill-mode: forwards;
          }
          @keyframes myfirst
          {
            0%{
              transform: translateX(-50vw);
              -webkit-transform: translateX(-50vw);
            }
            50%{
              transform: translateX(0);
              -webkit-transform: translateX(0);
            }
            75%{
              transform: translateX(-30vw);
              -webkit-transform: translateX(-30vw);
            }
            100%{
              transform: translateX(0);
              -webkit-transform: translateX(0);
            }
          }

          @-moz-keyframes myfirst /* Firefox */
          {
            0%{
              transform: translateX(-50vw);
              -webkit-transform: translateX(-50vw);
            }
            50%{
              transform: translateX(0);
              -webkit-transform: translateX(0);
            }
            75%{
              transform: translateX(-30vw);
              -webkit-transform: translateX(-30vw);
            }
            100%{
              transform: translateX(0);
              -webkit-transform: translateX(0);
            }
          }

          @-webkit-keyframes myfirst /* Safari 和 Chrome */
          {
            0%{
              transform: translateX(-50vw);
              -webkit-transform: translateX(-50vw);
            }
            50%{
              transform: translateX(0);
              -webkit-transform: translateX(0);
            }
            75%{
              transform: translateX(-30vw);
              -webkit-transform: translateX(-30vw);
            }
            100%{
              transform: translateX(0);
              -webkit-transform: translateX(0);
            }
          }

          @-o-keyframes myfirst /* Opera */
          {
            0%{
              transform: translateX(-50vw);
              -webkit-transform: translateX(-50vw);
            }
            50%{
              transform: translateX(0);
              -webkit-transform: translateX(0);
            }
            75%{
              transform: translateX(-30vw);
              -webkit-transform: translateX(-30vw);
            }
            100%{
              transform: translateX(0);
              -webkit-transform: translateX(0);
            }
          }
          .user{
            border-radius: 0 60px 60px 0;
            margin-right: 12px;
            transform: translateX(-50vw);
            -webkit-transform: translateX(-50vw);
          }
          .vest{
            border-radius: 60px 0 0 60px;
            margin-left: 12px;
            transform: translateX(50vw);
            -webkit-transform: translateX(50vw);
          }
          .vest_animation{
            animation: vestmyfirst 0.6s;
            -moz-animation: vestmyfirst 0.6s;
            -webkit-animation: vestmyfirst 0.6s;
            -o-animation: vestmyfirst 0.6s;
            animation-fill-mode: forwards;
          }
          @keyframes vestmyfirst
          {
            0%{
              transform: translateX(50vw);
              -webkit-transform: translateX(50vw);
            }
            50%{
              transform: translateX(0);
              -webkit-transform: translateX(0);
            }
            75%{
              transform: translateX(30vw);
              -webkit-transform: translateX(30vw);
            }
            100%{
              transform: translateX(0);
              -webkit-transform: translateX(0);
            }
          }

          @-moz-keyframes vestmyfirst
          {
            0%{
              transform: translateX(50vw);
              -webkit-transform: translateX(50vw);
            }
            50%{
              transform: translateX(0);
              -webkit-transform: translateX(0);
            }
            75%{
              transform: translateX(30vw);
              -webkit-transform: translateX(30vw);
            }
            100%{
              transform: translateX(0);
              -webkit-transform: translateX(0);
            }
          }

          @-webkit-keyframes vestmyfirst
          {
            0%{
              transform: translateX(50vw);
              -webkit-transform: translateX(50vw);
            }
            50%{
              transform: translateX(0);
              -webkit-transform: translateX(0);
            }
            75%{
              transform: translateX(30vw);
              -webkit-transform: translateX(30vw);
            }
            100%{
              transform: translateX(0);
              -webkit-transform: translateX(0);
            }
          }

          @-o-keyframes vestmyfirst
          {
            0%{
              transform: translateX(50vw);
              -webkit-transform: translateX(50vw);
            }
            50%{
              transform: translateX(0);
              -webkit-transform: translateX(0);
            }
            75%{
              transform: translateX(30vw);
              -webkit-transform: translateX(30vw);
            }
            100%{
              transform: translateX(0);
              -webkit-transform: translateX(0);
            }
          }
          >::after{
            content:"."; display:block; height:0; visibility:hidden; clear:both;
          }
          .vsimg{
            position: absolute;
            display: none;
            top: 50%;
            left: 50%;
            width: 25.8vw;
            transform: translateX(-50%) translateY(-50%);
            -webkit-transform: translateX(-50%) translateY(-50%);
            img{
              width: 100%
            }
          }
          .vsimgani{
            display: block;
            animation: vsimganimation 0.4s;
            -moz-animation: vsimganimation 0.4s;
            -webkit-animation: vsimganimation 0.4s;
            -o-animation: vsimganimation 0.4s;
            animation-fill-mode: forwards;
          }
          @keyframes vsimganimation
          {
            0%   {
              transform: translateX(-50%) translateY(-50%) scale(10);
              -webkit-transform: translateX(-50%) translateY(-50%) scale(10);
            }
            100% {
              transform: translateX(-50%) translateY(-50%) scale(1);
              -webkit-transform: translateX(-50%) translateY(-50%) scale(1);
            }
          }
          @-webkit-keyframes  vsimganimation
          {
            0%   {
              transform: translateX(-50%) translateY(-50%) scale(10);
              -webkit-transform: translateX(-50%) translateY(-50%) scale(10);
            }
            100% {
              transform: translateX(-50%) translateY(-50%) scale(1);
              -webkit-transform: translateX(-50%) translateY(-50%) scale(1);
            }
          }
          .vs{
            position: absolute;
            top: 50%;
            left: 0;
            width: 100%;
            text-align: center;
            transform: translateY(-50%);
            -webkit-transform: translateY(-50%);
            .uvs{
              display: inline-block;
              position: relative;
              .v{
                position: absolute;
                top: 0;
                left: 0;
                width: 17.7vw;
                z-index: 100;
              }
              .s{
                position: absolute;
                top: 7vw;
                left: 7vw;
                width: 24.2vw;
              }
            }
          }
        }
      }
    }
  }
</style>
