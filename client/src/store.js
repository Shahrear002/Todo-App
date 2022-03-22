import { createStore } from 'vuex'
import router from './router'
import createPersistedState from 'vuex-persistedstate'
// import VueJwtDecode from 'vue-jwt-decode'

const store = createStore({
    state: {
        user: null,
        token: null
    },
    plugins: [ 
        createPersistedState({
            paths: ['user', 'token']
        }) 
    ],
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
            localStorage.removeItem('token')
            state.token = null
            router.push('/signin')
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
            commit('logout')
        }
    }
})

export default store