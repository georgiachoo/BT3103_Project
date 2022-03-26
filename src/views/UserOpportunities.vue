<template>
  <UserNavBar/>
  <h1>Opportunities</h1>
  <br>
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