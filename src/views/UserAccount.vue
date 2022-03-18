<template>
  <head> My Account </head>

  <img id="display">
  <input type="file" id="input" accept="image/*">
  <label for="input" id="uploadBtn"> Choose Profile Picture</label><br><br>

  <img id="gameConsole" src="game.png">
  <label for="gameConsole" id="score"> Score: </label><br><br>

  <UserAccForm @userinfo="show($event)"/>

  <p> Name: {{name}} </p>
  <p> Age: {{age}} </p>
  <p> Gender: {{gender}} </p>
  <p> Email: {{email}} </p>
  <p> Skills: {{skills}} </p>
  <p> Interests: {{interests}} </p>
  <p> Certifications: {{cert}} </p>
  <p> Experience: {{exp}} </p>
  <p> Self-Introduction: {{intro}} </p>

  <!-- <button id="editBtn"> Edit</button><br><br> -->

  <!-- <UserAccTopbar/> -->
  <!-- <UserAccTable/> -->
</template>

<script>
//import UserAccTopbar from '@/components/UserAccTopbar.vue'
//import UserAccTable from '@/components/UserAccTable.vue'
import UserAccForm from '@/components/UserAccForm.vue'

export default {
    name: 'UserAccount',
    
    components:{
        UserAccForm
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
#display{
  height: 100px;
  width: 100px;
  border-radius: 50%;
  border: 1px solid gray;
  background-position: center;
  background-size: cover;
}
#input{
  display: none;
  transform: translateX(-10%);
}
#uploadBtn{
  height: 40px;
  text-align: center;   
  background: rgba(0, 0, 0, 0.5);
  color: wheat;
  line-height: 20px;
  font-size: 15px;
}
#gameConsole{
  height: 80px;
  width: 120px;
  float: right;
  transform: translate(-130%, -150%);
}
#score{
  transform: translate(205%, -150%);
}
/*
#editBtn{
  transform: translate(500px, -120px);
  background-color: darkslategrey;
  color: white;
}*/

</style>