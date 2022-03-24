//import Vue from 'vue'
import { createWebHistory, createRouter} from 'vue-router'
import store from './store'

import HomePage from './components/home/home.vue'
import LandingPage from './components/landing/landing.vue'
import SignupPage from './components/auth/signup.vue'
import SigninPage from './components/auth/signin.vue'

//Vue.use(VueRouter)

const routes = [
    { path: '/landing', component: LandingPage },
    { path: '/', component: HomePage},
    { path: '/signup', component: SignupPage },
    { path: '/signin', component: SigninPage },
    { path: '/:catchAll(.*)', redirect: 'landing' }
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

router.beforeEach((to, from, next) => {
    store.dispatch('fetchToken')
    if(to.fullPath === '/'){
        if(!store.state.token) {
            next('/landing')
        }
    }

    if(to.fullPath === '/signin' || to.fullPath === '/signup' || to.fullPath === '/landing'){
        if(store.state.token) {
            next('/')
        }
    }
    next()
})

export default router