import { createRouter, createWebHistory } from 'vue-router'
import PreLogin from '@/components/PreLogin.vue'
import Login from '@/components/Login.vue'
import Home from '@/views/Home.vue';
import UserAccount from '@/views/UserAccount.vue';
import UserOpportunities from '@/views/UserOpportunities.vue';
import UserMyEvents from '@/views/UserMyEvents.vue';

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
},
{
    path: '/UserOpportunities',
    name: 'UserOpportunities',
    component: UserOpportunities
},
{
    path: '/UserMyEvents',
    name: 'UserMyEvents',
    component: UserMyEvents
}
];

const router = createRouter({
 history: createWebHistory(),
 routes
});

export default router;