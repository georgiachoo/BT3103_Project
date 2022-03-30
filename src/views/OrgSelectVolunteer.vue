<template>
<h1>Organisation Select Volunteer</h1>

<Logout/>
<OrgSelect/>
<OrgSidebar/>
</template>

<script>

import Logout from '@/components/Logout.vue'
import OrgSelect from '@/components/OrgSelect.vue'
import OrgSidebar from '@/components/sidebar/OrgSidebar.vue'


export default {

    components:{
      
      Logout,
      OrgSelect,
      OrgSidebar
    },
   
        
}
</script>

<style>

</style>