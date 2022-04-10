<template>
<OrgSidebar/>
 <ManageEvents/>
 <Logout/>
 
  
</template>

<script>
import ManageEvents from '@/components/ManageEvents.vue';
import Logout from '@/components/Logout.vue'
import OrgSidebar from '@/components/sidebar/OrgSidebar.vue';

export default {
  name: 'OrgManageEvents',
  components:{
    ManageEvents,
    Logout,
    OrgSidebar
  }
}
</script>

<style>

</style>