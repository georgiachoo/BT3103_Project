import { createApp } from 'vue'
import App from './App.vue'
//import VueSidebarMenu from 'vue-sidebar-menu'
//import 'vue-sidebar-menu/dist/vue-sidebar-menu.css'
import router from './router/index.js'

// const app = createApp(App)
//app.use(VueSidebarMenu)
createApp(App).use(router).mount('#app')

