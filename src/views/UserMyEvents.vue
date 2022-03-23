<template>
  <UserNavBar/>
  <h3>This is the MyEvents page</h3>
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