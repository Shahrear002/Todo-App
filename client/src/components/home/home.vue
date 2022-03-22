<template>
    <app-header></app-header>
    <div class="home">
        <div class="submit">
          <button type="submit" @click="getTodos">Submit</button>
          <button type="success" @click="autoLogout">Decode</button>
        </div>
        <ul>
            <li v-for="todo in todos" :key="todo.todo">{{ todo.todo }}</li>
        </ul>
    </div>
</template>

<script>
    import header from '../header/header.vue'
    import axios from 'axios'
    import { mapActions, mapGetters } from 'vuex'

    export default {
        components: { 
            appHeader: header
        },
        data() {
            return {
                token: null,
                todos: {},
                errMessage: null
            }
        },
        computed: {
            ...mapGetters(["getToken", "getUser"]),
            ...mapActions(['autoLogout', 'logout'])
        },
        methods: {
            // ...mapGetters(["getToken", "getUser"]),
            async getTodos() {
                try {
                    this.token = this.$store.getters.getToken
                    console.log('token ' + this.token)
                    // console.log('userID ' + this.user_id)
                    let response = await axios.get('/todo/', { headers: { "Authorization":  `${this.token}`} })
                    this.todos = response.data
                } catch (error) {
                    if(error.response.status === 401) {
                        this.errMessage = 'Session expired! Log In again.'
                        this.$store.dispatch('logout')
                    }
                    console.log(error.response)
                }
            }
        }
    }
</script>

<style scoped>
  .home {
    width: 400px;
    margin: 30px auto;
    border: 1px solid #eee;
    padding: 20px;
    box-shadow: 0 2px 3px #ccc;
  }

  .submit button {
    border: 1px solid #521751;
    color: #521751;
    padding: 10px 20px;
    font: inherit;
    cursor: pointer;
    text-align: center;
  }

  .submit button:hover,
  .submit button:active {
    background-color: #521751;
    color: white;
  }

  .submit button[disabled],
  .submit button[disabled]:hover,
  .submit button[disabled]:active {
    border: 1px solid #ccc;
    background-color: transparent;
    color: #ccc;
    cursor: not-allowed;
  }
</style>
