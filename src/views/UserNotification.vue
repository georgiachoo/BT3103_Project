<template>
  <UserNavBar/>
  <h3> My Notifications </h3>
  <UserNotifTable/>
</template>

<script>
import UserNavBar from '@/components/UserNavBar.vue'
import UserNotifTable from '@/components/UserNotifTable.vue'

export default {
    name: 'UserNotification',
    
    components:{
        UserNavBar,
        UserNotifTable
    }
}
</script>

<style scoped>

</style>