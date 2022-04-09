<template>
  <OrgSidebar/>
  <div style="text-align:right">
    <router-link to="/OrgManageEvents" tag="button" id="postedevents">Manage Posted Events</router-link>
  </div>
  <PostNewEvent/>
  <Logout/>
</template>

<script>
import PostNewEvent from '@/components/PostNewEvent.vue';
import OrgSidebar from '@/components/sidebar/OrgSidebar.vue';
import Logout from '@/components/Logout.vue'


export default {
  name: 'OrgPostEvent',
  components:{
    PostNewEvent,
    OrgSidebar,
    Logout
  },
}
</script>

<style scoped>

</style>