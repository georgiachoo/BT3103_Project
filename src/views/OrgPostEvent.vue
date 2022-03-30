<template>
  <OrgSidebar/>
  <!-- <OrgNavBar/> -->
  <div style="text-align:right">
    <router-link to="/OrgManageEvents" tag="button" id="postedevents">Manage Posted Events</router-link>
    <!--<button v-on:click="handleClick()">Manage Posted Events </button>-->
  </div>
  <PostNewEvent/>
</template>

<script>
// import OrgNavBar from '@/components/OrgNavBar.vue';
import PostNewEvent from '@/components/PostNewEvent.vue';
import OrgSidebar from '@/components/sidebar/OrgSidebar.vue';

export default {
  name: 'OrgPostEvent',
  components:{
    // OrgNavBar,
    PostNewEvent,
    OrgSidebar
  },

  //handleClick() {
    //this.$router.push("/OrgManageEvents");
    //router.push("/OrgManageEvents");
  //}
}
</script>

<style scoped>

</style>