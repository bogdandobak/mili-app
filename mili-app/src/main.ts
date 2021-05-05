import { createApp } from 'vue'
import App from '@/App.vue'
import '@/index.css'
import BaseButton from '@/components/UI/BaseButton.vue'
import router from '@/router'

export const app = createApp(App)

app.use(router)

app.component('BaseButton', BaseButton)

app.mount('#app')
