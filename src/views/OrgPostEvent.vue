<template>
  <OrgSidebar/>
  <OrgNavBar/>
  <PostNewEvent/>
</template>

<script>
import OrgNavBar from '@/components/OrgNavBar.vue';
import PostNewEvent from '@/components/PostNewEvent.vue';
import OrgSidebar from '@/components/sidebar/OrgSidebar.vue';

export default {
  name: 'OrgPostEvent',
  components:{
    OrgNavBar,
    PostNewEvent,
    OrgSidebar
  }
}
</script>

<style>

</style>