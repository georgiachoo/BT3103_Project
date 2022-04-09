<template>
  <ManageEvents/>
  <Logout/>
</template>

<script>
import ManageEvents from '@/components/ManageEvents.vue';
import Logout from '@/components/Logout.vue'

export default {
  name: 'OrgManageEvents',
  components:{
    ManageEvents,
    Logout
  }
}
</script>

<style>

</style>