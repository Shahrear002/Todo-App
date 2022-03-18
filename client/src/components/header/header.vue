<template>
    <nav class="navbar navbar-light bg-light">
        <span class="navbar-brand mb-0 h1">TO DO APP</span>
        <button type="button" class="btn btn-outline-light" @click="logout">Logout</button>
    </nav>
</template>

<script>
    import { mapActions } from 'vuex'
    
    export default {
        methods: {
            ...mapActions(['logout'])
        }
    }
</script>

<style scoped>
  nav {
    height: 100%;
  }
</style>