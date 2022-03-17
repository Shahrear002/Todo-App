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
    import { mapGetters } from 'vuex'

    export default {
        data() {
            return {
                user_id: null,
                token: null,
                todos: {}
            }
        },
        methods: {
            ...mapGetters(["getToken", "getUser"]),
            async getTodos() {
                try {
                    this.token = this.$store.getters.getToken
                    this.user_id = this.$store.getters.getUser._id
                    console.log(this.token)
                    console.log(this.user_id)
                    let response = await axios.get('/todo/', { headers: { "Authorization":  `${this.token}`} })
                    console.log(response.data)
                    // this.todos = response.data[0].todo
                } catch (error) {
                    console.log(error.response)
                }
                // axios.get('/todo/:user_id._id').then(res => {
                //     console.log(res)
                //     this.todos = res.data
                // }).catch(error => console.log(error))
            }
        }
    }
</script>
