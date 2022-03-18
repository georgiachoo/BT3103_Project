<template>
  <div id="nav">
    <router-link to="/"> Home</router-link> | 
    <router-link to="/UserAccount"> Account</router-link> | 
    <router-link to="/UserOpportunities"> Opportunities</router-link> |
    <router-link to="/OrganisationAccount"> Organisation Account</router-link> |
    <router-link to="/Messages">Messages</router-link> | 
    <button v-on:click=passID()>Test Button To Msg Someone</button>

  </div>
  <router-view/>
</template>

<script>
import {getAuth, onAuthStateChanged } from 'firebase/auth'
export default {
  name: 'App',
  components: {

  },

  mounted() {
        const auth = getAuth();
        onAuthStateChanged(auth, (user) => {
            if (user) {
                this.user = user;
            }
        })
  },

  methods: {
    async passID() {
      // to replace otherID with actual email
      this.$router.push({name:"Messages", params:{otherID: '456'}})
    }
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>