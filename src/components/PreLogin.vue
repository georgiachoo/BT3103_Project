<template>
<body>
<h1>Easy Volunteer</h1>
<h4>Welcome to the one-stop platform for all your volunteering opportunities! </h4>
    <router-link :to="{ name: 'VolunteerLogin' }">
        <button>
            <img :src="vol" id="logo"><br>
            Volunteer<br>Log-in
        </button>
    </router-link>
    <router-link :to="{ name: 'OrganisationLogin' }">
        <button>
            <img :src="org" id="logo"><br>
            Organisation<br>Log-in
        </button>
    </router-link>
    <br>
    <br>
    <br>
    <br>
    <br>
    <br>
    <br>
    <br>
    <br>
    <br>
    <br>
    <br>
</body>
</template>

<script>
export default {
  name: 'PreLogin',
  data() {
    return {
      org: require('../assets/organisation.png'),
      vol: require('../assets/volunteer.png'),
      bg: require('../assets/background.jpeg')
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

#logo {
    height: 100px;
    padding: 15px;
}

body {
  height: 100%;
  width: 100%;
  padding: 0;
  margin: 0;
  min-height: 100%; 
  background-image: url('../assets/background.jpeg');
  background-repeat: no-repeat;
  background-attachment: fixed;  
  background-size: cover;
}

h1, h4 {
  color: aliceblue;
}
</style>