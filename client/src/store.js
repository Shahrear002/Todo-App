// import { createApp } from 'vue'
import { createStore } from 'vuex'
import router from './router'

const store = createStore({
    state: {
        user: null,
        token: null
    },
    getters: {
        getUser: (state) => {
            return state.user
        },
        getToken: (state) => {
            return state.token
        }
    },
    mutations: {
        setUser: (state, user) => {
            state.user = user
        },
        setToken: (state, token) => {
            state.token = token
        },
        updateToken: (state, token) => {
            state.token = token
        },
        logout: state => {
            state.token = null
        }
    },
    actions: {
        setUser: ({ commit }, user) => {
            commit('setUser', user)
        },
        setToken: ({ commit }, token) => {
            commit('setToken', token)
        },
        fetchToken: ({ commit }) => {
            commit('updateToken', localStorage.getItem('token'))
        },
        logout: ({ commit }) => {
            localStorage.removeItem('token')
            commit('logout')
            router.push('/signin')
        }
    }
})



export default store