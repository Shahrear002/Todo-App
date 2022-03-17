<template>
    <div class="home">
        <div class="submit">
          <button type="submit" @click="getTodos">Submit</button>
        </div>
        <p>{{ todos }}</p>
    </div>
</template>

<script>
    import axios from 'axios'

    export default {
        data() {
            return {
                user_id: null,
                todos: {}
            }
        },
        methods: {
            users() {
                this.user_id = this.$store.state.user.id
            },
            getTodos() {
                console.log(this.user_id)
                axios.get('/todo/:user_id').then(res => {
                    console.log(res)
                    this.todos = res.data
                }).catch(error => console.log(error))
            }
        }
    }
</script>
