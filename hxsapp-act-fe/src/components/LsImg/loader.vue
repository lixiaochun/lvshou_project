/** 
@desc loading 状态
@author Ocean(chenweiliang@lvshou.com)
*/
<template>
  <div class="loader"></div>
</template>

<script>
export default {
  name: 'loader'
}
</script>

<style lang="less" scoped>
.loader {
  position: relative;
  margin: 0 auto;
  width: 2.5rem;
  height: 2.5rem;
  transform: rotate(165deg);
}
.loader:before,
.loader:after {
  content: "";
  position: absolute;
  top: 50%;
  left: 50%;
  display: block;
  width: 0.5rem;
  height: 0.5rem;
  border-radius: 0.25rem;
  transform: translate(-50%, -50%);
}
.loader:before {
  animation: before 2s infinite;
}
.loader:after {
  animation: after 2s infinite;
}

@keyframes before {
  0% {
    width: 0.5rem;
    box-shadow: 1rem -0.5rem rgba(225, 20, 98, 0.75),
      -1rem 0.5rem rgba(111, 202, 220, 0.75);
  }
  35% {
    width: 2.5rem;
    box-shadow: 0 -0.5rem rgba(225, 20, 98, 0.75),
      0 0.5rem rgba(111, 202, 220, 0.75);
  }
  70% {
    width: 0.5rrem;
    box-shadow: -1rem -0.5rem rgba(225, 20, 98, 0.75),
      1rem 0.5rem rgba(111, 202, 220, 0.75);
  }
  100% {
    box-shadow: 1rem -0.5rem rgba(225, 20, 98, 0.75),
      -1rem 0.5rem rgba(111, 202, 220, 0.75);
  }
}
@keyframes after {
  0% {
    height: 0.5rem;
    box-shadow: 0.5rem 1rem rgba(61, 184, 143, 0.75),
      -0.5rem -1rem rgba(233, 169, 32, 0.75);
  }
  35% {
    height: 2.5rem;
    box-shadow: 0.5rem 0 rgba(61, 184, 143, 0.75),
      -0.5rem 0 rgba(233, 169, 32, 0.75);
  }
  70% {
    height: 0.5rem;
    box-shadow: 0.5rem -1rem rgba(61, 184, 143, 0.75),
      -0.5rem 1rem rgba(233, 169, 32, 0.75);
  }
  100% {
    box-shadow: 0.5rem 1rem rgba(61, 184, 143, 0.75),
      -0.5rem -1rem rgba(233, 169, 32, 0.75);
  }
}
</style>
