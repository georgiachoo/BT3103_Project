<template>
  <Sidebar />
  <div :style="{ 'margin-left': sidebarWidth }">
    <router-view />
  </div>
  <h1>Opportunities</h1>
  <br><br>
  <OpportunitiesUser/>
  <Logout/>
</template>

<script>
import Sidebar from '@/components/sidebar/Sidebar'
import { sidebarWidth } from '@/components/sidebar/state.js'
import OpportunitiesUser from '@/components/OpportunitiesUser.vue'
import Logout from '@/components/Logout.vue'

export default {
  name: 'UserOpportunities',

  components:{
    Sidebar,
    OpportunitiesUser,
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