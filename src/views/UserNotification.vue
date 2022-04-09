<template>
  <Sidebar />
  <div :style="{ 'margin-left': sidebarWidth }">
    <router-view />
  </div>
  <h1> Notifications </h1>
  <UserNotifTable/>
  <Logout/>
</template>

<script>
import Sidebar from '@/components/sidebar/Sidebar'
import { sidebarWidth } from '@/components/sidebar/state.js'
import UserNotifTable from '@/components/UserNotifTable.vue'
import Logout from '@/components/Logout.vue'

export default {
    name: 'UserNotification',
    
    components:{
        Sidebar,
        UserNotifTable,
        Logout
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