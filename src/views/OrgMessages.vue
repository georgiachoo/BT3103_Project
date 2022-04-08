<template>
  <OrgSidebar />
  <div :style="{ 'margin-left': sidebarWidth }">
    <router-view />
  </div>
  <h3> My Messages </h3>
  <MessagesForOrganisations/>
</template>

<script>
//import UserNavBar from '@/components/UserNavBar.vue'
import OrgSidebar from '@/components/sidebar/OrgSidebar'
import { sidebarWidth } from '@/components/sidebar/state.js'
import MessagesForOrganisations from '@/components/MessagesForOrganisations.vue'

export default {
  name: 'OrgMessages',

  components: {
      OrgSidebar,
      MessagesForOrganisations
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