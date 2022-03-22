<template>
    <app-header></app-header>
    <div class="container mt-5">
        <form class="d-flex" @submit="addTodo">
            <input type="text" class="forrm-control" placeholder="Enter Todo" v-model="todo">
            <input type="submit" value="Add" class="brn btn-md btn-primary mx-3">
        </form>
        <ul class="list-group mt-5">
            <li class="list-group-item hov libasic" 
                v-for="todo in todos" :key="todo.todo"
                :class="{ done: todo.done }"
            >
                {{ todo.todo }}
                <span v-if="todo.done == false">
                    <button class="btn btn-success btn-small" style="margin-right:3px">Done</button>
                    <button class="btn btn-danger">Delete</button>
                </span>
            </li>
        </ul>
    </div>
</template>

<script>
    import header from '../header/header.vue'
    import axios from 'axios'
    import { mapActions, mapGetters, mapState } from 'vuex'

    export default {
        components: { 
            appHeader: header
        },
        data() {
            return {
                token: null,
                todo: null,
                errMessage: null
            }
        },
        computed: {
            ...mapGetters(["getToken", "getUser"]),
            ...mapActions(['autoLogout', 'logout']),
            ...mapState({ todos: 'todos' })
        },
        methods: {
            // ...mapGetters(["getToken", "getUser"]),
            async addTodo() {
                try {
                    this.token = this.$store.getters.getToken
                    console.log('token ' + this.token)
                    // console.log('userID ' + this.user_id)
                    let response = await axios.get('/todo/add-todo', { headers: { "Authorization":  `${this.token}`} })
                    this.todos = response.data
                } catch (error) {
                    if(error.response.status === 401) {
                        this.errMessage = 'Session expired! Log In again.'
                        this.$store.dispatch('logout')
                    }
                    console.log(error.response)
                }
            }
        },
        beforeCreate() {
            let token = this.$store.getters.getToken
            axios.get('/todo/', { headers: { "Authorization":  `${token}`} })
                .then(todos => {
                    console.log(todos.data)
                    this.$store.state.todos = todos.data
                }).catch(error => console.log(error))
        }
    }
</script>

<style scoped>
    .hov:hover {
            background-color: rgb(201, 193, 209);
        }

    .libasic {
            display: flex;
            justify-content: space-between;
            font-family: sans-serif;
            font-size:1.2rem;
    }

    .done {
        background-color: #accec6;
        text-decoration: line-through;
    }

    .basicstyle {
        cursor: pointer;
    }

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
