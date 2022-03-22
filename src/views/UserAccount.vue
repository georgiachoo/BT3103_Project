<template>
  <UserNavBar/>
  <head> My Account </head>
  <UserAccForm/>
</template>

<script>
import UserNavBar from '@/components/UserNavBar.vue'
import UserAccForm from '@/components/UserAccForm.vue'

export default {
    name: 'UserAccount',
    
    components:{
        UserNavBar,
        UserAccForm
    }
}
</script>

<style scoped>

</style>