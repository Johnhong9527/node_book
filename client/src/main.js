import {createApp} from 'vue'
import ElementPlus from 'element-plus';
import 'element-plus/lib/theme-chalk/index.css';
import App from './App.vue'
import {router} from "./router";

import './index.css'

// createApp(App).use(router).mount('#app')
// createApp(App).mount('#app')

const app = createApp(App)
app.use(ElementPlus)
app.use(router)
app.mount('#app')