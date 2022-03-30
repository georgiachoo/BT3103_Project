<template>
<h1>Organisation Opportunities</h1>

<OpportunitiesOrg/>
<Logout/>
<OrgSidebar/>


    
      
</template>

<script>

import Logout from '@/components/Logout.vue'
import OrgSidebar from '@/components/sidebar/OrgSidebar.vue'
import OpportunitiesOrg from '@/components/OpportunitiesOrg.vue'


export default {
    

   

    components:{
      OpportunitiesOrg,
      Logout,
      OrgSidebar
    },
   
        Logout 
}
</script>

<style>

</style>