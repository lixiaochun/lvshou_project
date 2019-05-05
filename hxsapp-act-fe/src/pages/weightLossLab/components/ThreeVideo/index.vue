<template>
  <div class="three-video">
     <section class="one">
       <ls-video-player></ls-video-player>
     </section>
     <section>
       <div>
         <ls-video-player></ls-video-player>
       </div>
       <div>
         <ls-video-player></ls-video-player>
       </div>
     </section>
  </div>
</template>

<script>
// Similarly, you can also introduce the plugin resource pack you want to use within the component
// import 'some-videojs-plugin'
export default {
  name: 'three-video',
  data() {
    return {

    }
  },
  mounted() {
    console.log('this is current player instance object', this.player)
  },
  computed: {

  },
  methods: {

  }
}
</script>

<style lang="less">
  .three-video{
    width: 100%;
    display: flex;
    display: -webkit-flex;
    display: -webkit-inline-flex;
  }
  .three-video section{
    width: calc( 50% - 5px );
  }
  .three-video section:last-child{
    margin-left:10px;
  }
  .three-video .video-player,.three-video .video-js{
    width: 100%;
    height: 320px;
  }
  .three-video section:last-child .video-player,.three-video section:last-child .video-js{
    height: 155px;
    margin-bottom: 10px
  }
</style>
