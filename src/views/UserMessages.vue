<template>
  <!-- <UserNavBar/> -->
  <Sidebar />
  <div :style="{ 'margin-left': sidebarWidth }">
    <router-view />
  </div>
  <h1> Messages </h1>
  <MessagesForUsers/>
  <Logout/>
</template>

<script>
//import UserNavBar from '@/components/UserNavBar.vue'
import Sidebar from '@/components/sidebar/Sidebar'
import { sidebarWidth } from '@/components/sidebar/state.js'
import MessagesForUsers from '@/components/MessagesForUsers.vue'
import Logout from '@/components/Logout.vue'

export default {
  name: 'UserMessages',

  components: {
      Sidebar,
      MessagesForUsers,
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