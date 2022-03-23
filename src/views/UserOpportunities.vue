<template>
  <UserNavBar/>
  <h3>This is the opportunities page</h3>
  <OpportunitiesUser/>
</template>

<script>
import UserNavBar from '@/components/UserNavBar.vue';
import OpportunitiesUser from '@/components/OpportunitiesUser.vue';

export default {
  name: 'App',
  components:{
    UserNavBar,
    OpportunitiesUser
  }
}
</script>

<style scoped>

</style>