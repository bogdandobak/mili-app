import { createApp } from 'vue'
import App from '@/App.vue'
import '@/index.css'
import BaseButton from '@/components/UI/BaseButton.vue'

export const app = createApp(App)

app.component('BaseButton', BaseButton)

app.mount('#app')
