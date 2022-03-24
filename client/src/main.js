import "bootstrap/dist/css/bootstrap.css"
import { createApp } from 'vue'
import dotenv from 'dotenv'
import App from './App.vue'
import axios from 'axios'
import store from './store'
import router from './router'

dotenv.config()
axios.defaults.baseURL = process.env.BASE_URL

// axios.interceptors.request.use(config => {
//     console.log('Request Interceptor', config)
//     return config
// })

// axios.interceptors.response.use(res => {
//     console.log('Response Interceptor', res)
//     return res
// })

const app = createApp(App)

// Installing routes
app.use(router)

// Installing plugins
app.use(store)

app.mount('#app')

import "bootstrap/dist/js/bootstrap.js"