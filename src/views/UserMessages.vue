<template>
  <UserNavBar/>
  <h3> My Messages </h3>
  <Messages/>
</template>

<script>
import UserNavBar from '@/components/UserNavBar.vue'
import Messages from '@/components/Messages.vue'

export default {
  name: 'UserMessages',

  components: {
      UserNavBar,
      Messages
  }
}
</script>

<style>

</style>