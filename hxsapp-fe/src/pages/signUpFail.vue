<template>
  <div>
    <span>fail</span>
    <router-view></router-view>
    <router-link mars_sign="test" to="/signUpSuccess">Go to success</router-link>
    <router-link to="/signUpFail/signUpFail1">Go to fail1</router-link>
    <router-link to="/signUpFail/signUpFail2">Go to fail2</router-link>
    <button mars_sign="marsSignInformation">test</button>
  </div>
</template>

<script>
    export default {
        name: "signUpFail"
    }
</script>

<style scoped>

</style>
