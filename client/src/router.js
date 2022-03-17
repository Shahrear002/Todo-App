//import Vue from 'vue'
import { createWebHistory, createRouter} from 'vue-router'

import HomePage from './components/home/home.vue'
import LandingPage from './components/landing/landing.vue'
import SignupPage from './components/auth/signup.vue'
import SigninPage from './components/auth/signin.vue'

//Vue.use(VueRouter)

const routes = [
    { path: '/', component: HomePage},
    { path: '/landing', component: LandingPage },
    { path: '/signup', component: SignupPage },
    { path: '/signin', component: SigninPage },
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

export default router