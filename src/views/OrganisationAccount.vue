<template>
<h1>Organisation Account</h1>
<OrganisationAccInfo/>
<Logout/>
<OrgSidebar/>


    
      
</template>

<script>
import OrganisationAccInfo from '@/components/OrganisationAccInfo.vue'
import Logout from '@/components/Logout.vue'
import OrgSidebar from '@/components/sidebar/OrgSidebar.vue'


export default {
    

   

    components:{
      OrganisationAccInfo,
      Logout,
      OrgSidebar
    },
   
        Logout 
}
</script>

<style>

</style>