<template>
  <div style="display:none;"></div>
</template>

<script>
  export default {
    name: 'remFix',
    data() {
      return {
        data: null
      }
    },
    mounted() {
      this.resizeWindow()
    },
    methods: {
      resizeWindow() {
        function e() {
          var e = document.documentElement.clientWidth,
            t = document.querySelector("html"),
            f = e / 25;
          window.fontSize = f;
          t.style.fontSize = f + "px";
        }
        e(), window.addEventListener("resize", e);
      },
    }
  }
</script>


