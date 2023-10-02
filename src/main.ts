import { createApp } from 'vue'
import * as Maska from "maska"

import pinia from "./shared/plugins/pinia"
import App from './App.vue'
import router from './app/router'
import Notifications from '@kyvg/vue3-notification'

import './app/assets/scss/main.scss'

const app = createApp(App)

app.use(pinia)
app.use(router)
app.use(Maska)
app.use(Notifications)

app.directive('focus', {
    // When the bound element is mounted into the DOM...
    mounted(el) {
      // Focus the element
      el.focus()
    }
  })
  
app.mount('#app')
