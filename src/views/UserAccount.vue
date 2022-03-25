<template>
  <!-- <UserNavBar/> -->
  <Sidebar />
  <div :style="{ 'margin-left': sidebarWidth }">
    <router-view />
  </div>

  <head> My Account </head>
  <UserAccForm/>
</template>

<script>
//import UserNavBar from '@/components/UserNavBar.vue'
import Sidebar from '@/components/sidebar/Sidebar'
import { sidebarWidth } from '@/components/sidebar/state.js'
import UserAccForm from '@/components/UserAccForm.vue'

export default {
    name: 'UserAccount',
    
    components:{
        Sidebar,
        UserAccForm
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