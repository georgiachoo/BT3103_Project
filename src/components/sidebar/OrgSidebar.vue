<template>
  <div class="sidebar" :style="{ width: sidebarWidth }">
    <h1>
      <span v-if="collapsed">
        <div>E</div>
        <div>V</div>
      </span>
      <span v-else>Easy Volunteer</span>
    </h1>

    <SidebarLink to="/OrgOpportunities" icon="fas fa-hand-holding-heart">Opportunities</SidebarLink>
    <SidebarLink to="/OrgPostEvent" icon="fas fa-circle-plus">Post New Event</SidebarLink>
    <SidebarLink to="/OrgSelectVolunteer" icon="fas fa-arrow-pointer">Select Volunteers</SidebarLink>
    <SidebarLink to="/OrgMessages" icon="fa-brands fa-telegram">Messages</SidebarLink>
    <SidebarLink to="/OrganisationAccount" icon="fas fa-user">Account</SidebarLink>

    <span
      class="collapse-icon"
      :class="{ 'rotate-180': collapsed }"
      @click="toggleSidebar"
    >
      <i class="fas fa-angle-double-left" />
    </span>
  </div>
</template>

<script>
import SidebarLink from './SidebarLink'
import { collapsed, toggleSidebar, sidebarWidth } from '@/components/sidebar/state.js'

export default {
  props: {},
  components: { SidebarLink },
  setup() {
    return { collapsed, toggleSidebar, sidebarWidth }
  }
}
</script>

<style>
:root {
  --sidebar-bg-color: #e06666ff;
  --sidebar-item-hover: #ff7575;
  --sidebar-item-active: #f1c232ff;
}
</style>

<style scoped>
.sidebar {
  color: white;
  background-color: var(--sidebar-bg-color);
  float: left;
  position: fixed;
  z-index: 1;
  top: 0;
  left: 0;
  bottom: 0;
  padding: 0.5em;
  transition: 0.3s ease;
  display: flex;
  flex-direction: column;
}
.sidebar h1 {
  height: 2.5em;
}
.collapse-icon {
  position: absolute;
  bottom: 0;
  padding: 0.75em;
  color: rgba(255, 255, 255, 0.7);
  transition: 0.2s linear;
}
.rotate-180 {
  transform: rotate(180deg);
  transition: 0.2s linear;
}
</style>