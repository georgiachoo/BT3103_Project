import { createRouter, createWebHistory } from 'vue-router'
import PreLogin from '@/components/PreLogin.vue'
import Login from '@/components/Login.vue'

const routes = [
{
    path: "/",
    name:"PreLogin",
    component: PreLogin,
}, 
{
    path: "/Login",
    name: "Login",
    component: Login,
}
]

const router = createRouter({
 history: createWebHistory(),
 routes
})

export default router