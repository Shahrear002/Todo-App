<template>
    <app-header></app-header>
    <div class="container mt-5">
        <form class="d-flex" @submit.prevent="addTodo" style="padding-bottom: 10px">
            <input type="text" class="form-control" placeholder="Enter Todo" v-model="todo">
            <input type="submit" value="Add" class="btn btn-md btn-primary mx-3">
        </form>
        <p v-if="errors" class="alert alert-danger">{{ errors }}</p>
        <ul class="list-group mt-5">
            <li class="list-group-item hov libasic" 
                v-for="todo in todos" :key="todo.todo"
                :class="{ done: todo.done }"
            >
                {{ todo.todo }}
                <span>
                    <button v-if="todo.done == false" class="btn btn-success btn-small" style="margin-right:3px" @click="updateTodo(todo._id)">Done</button>
                    <button class="btn btn-danger" @click="deleteTodo(todo._id)">Delete</button>
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
                todo: null,
                errors: null
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
                    let token = this.$store.getters.getToken
                    // console.log('token ' + token)
                    // console.log('todo ' + this.todo)
                    let response = await axios.post('/todo/add-todo', { todo: this.todo }, { headers: { "Authorization":  `${token}`} })
                    this.todos = response.data
                    window.location.reload()
                } catch (error) {
                    this.errors = error.response.data
                    console.log(this.errors)
                }
            },
            async updateTodo(id) {
                try {
                    let token = this.$store.getters.getToken
                    let response = await axios.put('/todo/update-todo/' + id, {}, { headers: { "Authorization": `${token}`}})
                    // console.log('response' + response.data)
                    this.todos = response.data
                    window.location.reload()
                } catch(error) {
                    this.errors = error.response.data
                    console.log(this.errors)
                }
            },
            async deleteTodo(id) {
                try {
                    let token = this.$store.getters.getToken
                    let response = await axios.delete('/todo/delete-todo/' + id, { headers: { "Authorization": `${token}`}})
                    // this.todos = null
                    this.todos = response.data
                    window.location.reload()
                } catch(error) {
                    this.errors = error.response.data
                    console.log(this.errors)
                }
            }
        },
        beforeCreate() {
            let token = this.$store.getters.getToken
            axios.get('/todo/', { headers: { "Authorization":  `${token}`} })
                .then(todos => {
                    // console.log(todos.data)
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
