<template>
    <nav class="navbar navbar-expand-lg navbar-light bg-light">
        <div class="container-fluid">
            <a href="#" class="navbar-brand">{{ user.name.split(' ').slice(0, 1).join() }}'s To-Do</a>
            <button type="button" class="btn btn-danger navbar-btn" @click="logout">Logout</button>
        </div>
    </nav>
</template>

<script>
    import { mapActions, mapState } from 'vuex'
    
    export default {
        computed: {
            ...mapState({
                user: 'user'
            })
        },
        methods: {
            ...mapActions(['logout'])
        }
    }
</script>

<style scoped>
    .logo {
        border-radius: 64px;
        height: 38px;
    }

    nav {
        height: 100%;
    }
</style>