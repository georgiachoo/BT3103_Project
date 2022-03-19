<template>
  <OrgNavBar/>
  <PostNewEvent/>
</template>

<script>
import OrgNavBar from '@/components/OrgNavBar.vue';
import PostNewEvent from '@/components/PostNewEvent.vue';

export default {
  name: 'OrgPostEvent',
  components:{
    OrgNavBar,
    PostNewEvent
  }
}
</script>

<style>

</style>