import { createApp } from 'vue'
import App from './App.vue'
import axios from 'axios'
import store from './store'

import router from './router'

axios.defaults.baseURL = 'http://localhost:3000'
axios.defaults.headers.common['Authorization'] = `Bearer ${store.state.token}`

const app = createApp(App)

app.use(router)
app.mount('#app')