<template>
   <div>
    <img id="pic" v-bind:src=this.profilePic>
    <input type="file" id="input" accept="image/*">
    <label for="input" id="uploadBtn"> Choose Profile Picture</label><br><br>
  </div>
  
  <div>
    <img id="gamePic" :src="game">
    <label for="gamePic" id="score"> Score: {{score}}</label><br><br>
  </div>

  <form id="accForm">
    <label for="name"> Name: </label>
    <input type="text" id="name" required="" placeholder="Enter your name"> <br><br>

    <label for="age"> Age: </label>
    <input type="text" id="age" required="" placeholder="Enter your age"> <br><br>

    <label for="gender"> Gender: </label>
    <input type="text" id="gender" required="" placeholder="Male/Female/Non-binary"> <br><br>

    <label for="skills"> Skills: </label>
    <textarea name="skills" id="skills" cols="30" rows="5" placeholder="Relevant skills"></textarea><br><br>

    <label for="interest"> Volunteering Interests: </label>
    <textarea name="interest" id="interest" cols="30" rows="5" placeholder="Children, Elderly, Environment..."></textarea><br><br>

    <label for="cert"> Certifications: </label>
    <textarea name="cert" id="cert" cols="30" rows="5" placeholder="First-Aid trained, Open water diver..."></textarea><br><br>

    <label for="exp"> Experience: </label>
    <textarea name="exp" id="exp" cols="50" rows="10" placeholder="Relevant volunteering experience"></textarea><br><br>
    
    <label for="intro"> Self-Introduction: </label>
    <textarea name="intro" id="intro" cols="50" rows="10" placeholder="Let volunteer organisations know you better"></textarea><br><br>
 
    <div class = "save">
      <button id = "savebutton" type="button" v-on:click="savetofs()"> Save </button><br>
    </div>
  </form>

  <table id="accTable" class="center">
    <tr>
      <th> Name: </th>
      <td id="nameT"> {{name}} </td>
    </tr>

    <tr>
      <th> Age: </th>
      <td id="ageT"> {{age}} </td>
    </tr>

    <tr>
      <th> Gender: </th>
      <td id="genderT"> {{gender}} </td>
    </tr>

    <tr>
      <th> Email: </th>
      <td id="genderT"> {{email}} </td>
    </tr>

    <tr>
      <th> Skills: </th>
      <td id="skillsT"> {{skills}} </td>
    </tr>

    <tr>
      <th> Volunteering Interests: </th>
      <td id="interestT"> {{interests}} </td>
    </tr>

    <tr>
      <th> Certifications: </th>
      <td id="certT"> {{cert}} </td>
    </tr>

    <tr>
      <th> Experience: </th>
      <td id="expT"> {{exp}} </td>
    </tr>

    <tr>
      <th> Self-Introduction: </th>
      <td id="introT"> {{intro}} </td>
    </tr>

  </table> <br><br>

  <button id="editBtn" type="button" @click="edit()"> Edit </button> <br><br>

</template>

<script>
import firebaseApp from '../firebase.js';
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { getFirestore, doc, setDoc, getDoc, updateDoc } from 'firebase/firestore';
import { getStorage, ref, getDownloadURL, uploadString } from 'firebase/storage';

const db = getFirestore(firebaseApp);

export default {
    name: 'UserAccForm',
    
    data() {
      return {
        user: false,
        name: "",
        age: "",
        gender: "",
        email: "",
        skills: "",
        interests: "",
        cert: "",
        exp: "",
        intro: "",
        score: 0,
        game: require('../assets/game.png'),
        profilePic: ""
      }
    },

    mounted() {
      const auth = getAuth();
      onAuthStateChanged(auth, async (user) => {
        if (user) {
          this.user = user;
          this.email = user.email;
      
          const currDoc = doc(db, "Users", this.email);
          const docRef = await getDoc(currDoc);

          if (docRef.exists()) {
            document.getElementById("accForm").style.display = "none";
            document.getElementById('name').setAttribute('value', docRef.data().Name);
            document.getElementById('age').setAttribute('value', docRef.data().Age);
            document.getElementById('gender').setAttribute('value', docRef.data().Gender);
            document.getElementById('skills').value = docRef.data().Skills;
            document.getElementById('interest').value = docRef.data().Interests;
            document.getElementById('cert').value = docRef.data().Certifications;
            document.getElementById('exp').value = docRef.data().Experience;
            document.getElementById('intro').value = docRef.data().Introduction;
            
            this.name = docRef.data().Name;
            this.age = docRef.data().Age;
            this.gender = docRef.data().Gender;
            this.skills = docRef.data().Skills;
            this.interests = docRef.data().Interests; 
            this.cert = docRef.data().Certifications;
            this.exp = docRef.data().Experience;
            this.intro = docRef.data().Introduction;
            this.score = docRef.data().Score;

            const docdata = docRef.data();
            this.profilePic = docdata['profilePic'];

            document.getElementById("accTable").style.display = "block";
            document.getElementById("uploadBtn").style.display = "none";
            document.getElementById("editBtn").style.display = "inline-block";

          } else {
            await setDoc(doc(db, "Users", this.email), {
              Email: this.email, 
              Score: 0, 
              profilePic: "@/assets/volunteer.png"
            });
          }
        }
      });

      var input = document.querySelector('#input');
      input.addEventListener('change', load);
    
      function load() {
        var fileReader = new FileReader();
        var fileObject = this.files[0];
        fileReader.readAsDataURL(fileObject);
        fileReader.onload = () => {
          var result = fileReader.result;
          var img = document.querySelector('#pic');
          img.setAttribute('src', result); 
        };
      }
    },

    methods: {
      async savetofs() {

        var a = document.getElementById("name").value 
        var b = document.getElementById("age").value 
        var c = document.getElementById("gender").value 
        var e = document.getElementById("skills").value
        var f = document.getElementById("interest").value
        var g = document.getElementById("cert").value
        var h = document.getElementById("exp").value
        var i = document.getElementById("intro").value

        alert("Saving changes to My Account");

        const file = document.getElementById("pic").src
        if (file.substring(0,4) !== 'http' && file !== '') {
          const fileURL = file.split(',')[1]
          const metadata = {
            contentType: 'image/jpeg',
          };
          const storage = getStorage();
          const auth = getAuth();
          var email = auth.currentUser.email
          var imgName = email + '.jpg'
          const storageRef = ref(storage, imgName);
          uploadString(storageRef, fileURL, 'base64', metadata).then((snapshot) => {
            getDownloadURL(snapshot.ref).then((downloadURL) => {
              console.log('File available at', downloadURL);
              const userRef = doc(db, "Users", email);
              updateDoc(userRef, {profilePic: downloadURL});
            })
          });
        }

        document.getElementById("accForm").style.display = "none";

        try {
          const docRef = await updateDoc(doc(db, "Users", this.email), 
            {Name: a, Age: b, Gender: c, Skills: e, Interests: f, Certifications: g, 
            Experience: h, Introduction: i});
          console.log(docRef);
        }
        catch(error) {
          console.error("Error making changes: ", error);
        }

        this.name = a;
        this.age = b;
        this.gender = c;
        this.skills = e; 
        this.interests = f; 
        this.cert = g; 
        this.exp = h; 
        this.intro = i;

        const docRef = doc(db, "Users", this.email);
        const docSnap = await getDoc(docRef);
        const docdata = docSnap.data();
        this.profilePic = docdata['profilePic'];

        document.getElementById("accTable").style.display = "block";
        document.getElementById("uploadBtn").style.display = "none";
        document.getElementById("editBtn").style.display = "inline-block";
      },

      edit() {
        document.getElementById("accForm").style.display = "block";
        document.getElementById("accTable").style.display = "none";
        document.getElementById("uploadBtn").style.display = "inline-block";
        document.getElementById("editBtn").style.display = "none";
      }
    }
}
</script>

<style scoped>
#pic{
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
  background: rgba(231, 207, 27, 0.904);
  color: black;
  line-height: 20px;
  font-size: 15px;
  transform: translate(-100%, 95%);
  border-color: rgba(231, 207, 27, 0.904);
}
#gamePic{
  height: 70px;
  width: 110px;
  float: right;
  transform: translate(-500%, -150%);
}
#score{
  transform: translate(130%, -100%);
}
label {
  display: inline-block;
  text-align: right;
  width: 100px;
  font-weight: bold;
  color: rgba(11, 55, 84, 0.609);
}
textarea{
  vertical-align: middle;
}
body{
  display: flex;
  justify-content: center;
  align-items: center;
}
.save {
  text-align: center;
}
#accForm{
  text-align: center;
}
#accTable{
  display: none;
  width: 30%;
}
.center{
  margin-left:auto;
  margin-right:auto;
}
th, td {
  padding: 8px;
}
th{
  color: rgba(11, 55, 84, 0.609);
}
#editBtn{
  background: rgba(231, 207, 27, 0.904);
  color: black;
  cursor: pointer;
  text-align: center;
  padding: 5px 14px;
  border-color: rgba(231, 207, 27, 0.904);
}
#savebutton{
  background: rgba(231, 207, 27, 0.904);
  color: black;
  cursor: pointer;
  text-align: center;
  padding: 5px 14px;
  border-color: rgba(231, 207, 27, 0.904);
}
</style>