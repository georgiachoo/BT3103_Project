
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
import OrgOpportunities from "@/views/OrgOpportunities.vue";
import OrgSelectVolunteer from "@/views/OrgSelectVolunteer.vue";
import Messages from "@/components/Messages.vue";
import UserNotification from "@/views/UserNotification.vue";
import UserMessages from '@/views/UserMessages.vue'
import OrgMessages from '@/views/OrgMessages.vue'
import FeedbackForm from '@/components/FeedbackForm.vue'
import OrganisationProfile from '@/components/OrganisationProfile'


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
    path: "/OrgOpportunities",
    name: "OrgOpportunities",
    component: OrgOpportunities,
  },
  {
    path: '/OrgSelectVolunteer',
    name: 'OrgSelectVolunteer',
    component: OrgSelectVolunteer
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
  },
  {
    path: "/UserMessages",
    name: "UserMessages",
    component: UserMessages,
  },
  {
    path: "/OrgMessages",
    name: "OrgMessages",
    component: OrgMessages,
  },
  
    
  { 
    path: '/UserMyEvents/FeedbackForms/:orgID/Events/:eventName', 
    component: FeedbackForm
   },

   { 
    path: '/UserOpportunities/OrganisationProfile/:orgID', 
    component: OrganisationProfile
   },
  
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;