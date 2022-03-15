<template>
  <head> My Account </head>
  <UserAccTopbar/>
  <UserAccTable/>
  <UserAccForm @added="change"/>
</template>

<script>
import UserAccTopbar from '@/components/UserAccTopbar.vue'
import UserAccTable from '@/components/UserAccTable.vue'
import UserAccForm from '@/components/UserAccForm.vue'

export default {
    name: 'UserAccount',
    components:{
        UserAccTopbar,
        UserAccTable,
        UserAccForm
    }
}
</script>

<style>

</style>