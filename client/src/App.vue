<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
  export default {
    name: 'App'
  }
</script>

<style>
  .form-field input {
    width: 100%;
  }

  #app {
    margin: 0 auto;
    width: 70vw;
  }
</style>
