<template>
<h1>SG Volunteer Platform</h1>
    <router-link to="/Login">
        <button v-on:click="nav('volunteer')">
            <img :src="vol"><br>
            Volunteer<br>Log-in
        </button>
    </router-link>
    <router-link to="/Login">
        <button v-on:click="nav('organisation')">
            <img :src="org"><br>
            Organisation<br>Log-in
        </button>
    </router-link>
</template>

<script>
export default {
  name: 'PreLogin',
  data() {
    return {
      org: require('../assets/organisation.png'),
      vol: require('../assets/volunteer.png')
    }
  },
  methods: { 
      nav(value) {
        console.log(value)
      }
  },
};
</script>

<style scoped>
button {
    height: 300px;
    width: 300px;
    margin: 50px;
    font-size: 30px;
    border-radius: 30px;
    border-color: transparent;
    background-color: #dfb7b7;
    box-shadow: 0 5px 15px rgb(0 0 0 / 0.2);
}

button:hover {
  background-color: #da8a8a;
}

img {
    height: 100px;
    padding: 15px;
}
</style>