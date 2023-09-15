import { createApp } from 'vue'
import { createPinia } from 'pinia'
import * as Maska from "maska"

import App from './App.vue'
import router from './app/router'

import './app/assets/scss/main.scss'

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(Maska)

app.mount('#app')
