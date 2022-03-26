<template>
  <UserNavBar/>
  <h1>My Events</h1>
  <br>
  <MyEvents/>
</template>

<script>
import UserNavBar from '@/components/UserNavBar.vue';
import MyEvents from '@/components/MyEvents.vue';

export default {
  name: 'App',
  components:{
    UserNavBar,
    MyEvents
  }
}
</script>

<style scoped>

</style>