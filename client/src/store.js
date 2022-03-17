import { createApp } from 'vue'
import { createStore } from 'vuex'
import App from './App.vue'

const store = createStore({
    state() {
        return {
            user: null,
            token: null
        }
    },
    mutations: {
        setUser(state, user) {
            state.user = user
        },
        setToken(state, token) {
            state.token = token
        }
    },
    actions: {},
    getters: {}
})

const app = createApp(App)

app.use(store)

export default store