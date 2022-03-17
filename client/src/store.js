// import { createApp } from 'vue'
import { createStore } from 'vuex'

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
            console.log(state.token)
            return state.token
        }
    },
    mutations: {
        setUser: (state, user) => {
            state.user = user
        },
        setToken: (state, token) => {
            state.token = token
        }
    },
    actions: {
        setUser: ({ commit }, user) => {
            commit('setUser', user)
        },
        setToken: ({ commit }, token) => {
            commit('setToken', token)
        },
    }
})



export default store