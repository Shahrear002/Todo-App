import { createApp } from 'vue'
import App from './App.vue'
import axios from 'axios'
import store from './store'

import router from './router'

axios.defaults.baseURL = 'http://localhost:3000'
// axios.defaults.headers.common['Authorization'] = `Bearer ${store.state.token}`

const app = createApp(App)

// Installing routes
app.use(router)

// Installing plugins
app.use(store)

app.mount('#app')