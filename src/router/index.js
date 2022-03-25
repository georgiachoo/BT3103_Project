
import { createRouter, createWebHistory } from 'vue-router'
import PreLogin from '@/components/PreLogin.vue'
import Home from '@/views/Home.vue';
import UserAccount from '@/views/UserAccount.vue';
import OrganisationAccount from '@/views/OrganisationAccount.vue';
import UserOpportunities from '@/views/UserOpportunities.vue';
import UserMyEvents from '@/views/UserMyEvents.vue';
import VolunteerLogin from '@/components/VolunteerLogin.vue';
import OrganisationLogin from '@/components/OrganisationLogin.vue';
import OrgPostEvent from "@/views/OrgPostEvent.vue";
import OrgManageEvents from "@/views/OrgManageEvents.vue";
import Messages from "@/components/Messages.vue";
import UserNotification from "@/views/UserNotification.vue";

const routes = [
  {
    path: "/",
    name: "PreLogin",
    component: PreLogin,

}, 
{
    path: "/VolunteerLogin",
    name: "VolunteerLogin",
    component: VolunteerLogin,
},
{
    path: "/OrganisationLogin",
    name: "OrganisationLogin",
    component: OrganisationLogin,
},
{
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/UserAccount",
    name: "UserAccount",
    component: UserAccount,
  },
  {
    path: "/UserOpportunities",
    name: "UserOpportunities",
    component: UserOpportunities,
  },
  {
    path: "/UserMyEvents",
    name: "UserMyEvents",
    component: UserMyEvents,
  },
{
    path: '/OrganisationAccount',
    name: 'OrganisationAccount',
    component: OrganisationAccount
},
{
    path: "/OrgPostEvent",
    name: "OrgPostEvent",
    component: OrgPostEvent,
 },
 {
    path: "/OrgManageEvents",
    name: "OrgManageEvents",
    component: OrgManageEvents,
  },
  {
    path: "/Messages",
    name: "Messages",
    component: Messages,
  },
  {
    path: "/UserNotification",
    name: "UserNotification",
    component: UserNotification,
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
