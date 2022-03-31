<template>
<h1>Organisation Select Volunteer</h1>
<SelectVolunteer/>
<Logout/>
<OrgSidebar/>
</template>

<script>

import Logout from '@/components/Logout.vue'
import OrgSidebar from '@/components/sidebar/OrgSidebar.vue'
import SelectVolunteer from '@/components/SelectVolunteer.vue'





export default {
    

   

    components:{
      
      Logout,
      OrgSidebar,
      SelectVolunteer
    },
   
        
}
</script>

<style>

</style>