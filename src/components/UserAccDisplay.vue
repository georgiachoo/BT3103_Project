<!--
<template>
  <div id="allInfo">
    <p> Name: {{name}} </p>
    <p> Age: {{age}} </p>
    <p> Gender: {{gender}} </p>
    <p> Email: {{email}} </p>
    <p> Skills: {{skills}} </p>
    <p> Interests: {{interests}} </p>
    <p> Certifications: {{cert}} </p>
    <p> Experience: {{exp}} </p>
    <p> Self-Introduction: {{intro}} </p>
  </div>
</template>

<script>
export default {
  name: 'UserAccDisplay',
  
  data() {
    return {
      name: "",
      age: "",
      gender: "",
      email: "",
      skills: "",
      interests: "",
      cert: "",
      exp: "",
      intro: "" 
    }
  },

  methods: {
    show(x) {
      this.name = x.Name;
      this.age = x.Age; 
      this.gender = x.Gender; 
      this.email = x.Email;
      this.skills = x.Skills; 
      this.interests = x.Interests; 
      this.cert = x.Certifications; 
      this.exp = x.Experience; 
      this.intro = x.Introduction
    }
  } 
}
</script>

<style scoped>
#allInfo{
  display: none;
}
</style>
-->