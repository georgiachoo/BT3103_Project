<template>
  <!-- <UserNavBar/> -->
  <Sidebar />
  <div :style="{ 'margin-left': sidebarWidth }">
    <router-view />
  </div>
  <h3> My Notifications </h3>
  <UserNotifTable/>
</template>

<script>
//import UserNavBar from '@/components/UserNavBar.vue'
import Sidebar from '@/components/sidebar/Sidebar'
import { sidebarWidth } from '@/components/sidebar/state.js'
import UserNotifTable from '@/components/UserNotifTable.vue'

export default {
    name: 'UserNotification',
    
    components:{
        Sidebar,
        UserNotifTable
    },

    setup() {
      return { sidebarWidth }
    }
}
</script>

<style scoped>
#nav {
  padding: 30px;
}
#nav a {
  font-weight: bold;
  color: #2c3e50;
}
#nav a.router-link-exact-active {
  color: #42b983;
}
</style>