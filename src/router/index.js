import { createRouter, createWebHistory } from 'vue-router'
import PreLogin from '@/components/PreLogin.vue'
import Login from '@/components/Login.vue'
import Home from '@/views/Home.vue';
import UserAccount from '@/views/UserAccount.vue';

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
},
{
    path: '/',
    name: 'Home',
    component: Home
},
{
    path: '/UserAccount',
    name: 'UserAccount',
    component: UserAccount
}
];

const router = createRouter({
 history: createWebHistory(),
 routes
});

export default router;