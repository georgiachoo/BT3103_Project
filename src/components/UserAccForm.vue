<template>
   <div> <!-- v-if="user" -->
    <!-- <img id="profilePic"> -->
    <img id="pic" v-bind:src=profilePic>
    <input type="file" id="input" accept="image/*">
    <label for="input" id="uploadBtn"> Choose Profile Picture</label><br><br>
  </div>
  
  <div>
    <img id="gamePic" :src="game">
    <label for="gamePic" id="score"> Score: </label><br><br>
  </div>

  <br>
  <br>

  <form id="accForm">
    <label for="name" > Name: </label>
    <input type="text" id="name" required="" placeholder="Enter your name"> <br><br>

    <label for="age"> Age: </label>
    <input type="text" id="age" required="" placeholder="Enter your age"> <br><br>

    <label for="gender"> Gender: </label>
    <input type="text" id="gender" required="" placeholder="Male/Female/Non-binary"> <br><br>

    <label for="email"> Email: </label>
    <input type="email" id="email" required="" placeholder="Enter your email"><br><br>

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
      <button id = "savebutton" type="button" v-on:click="savetofs()"> Save </button><br><br>
    </div>
  </form>

  <div id="allInfo">
    <!-- <img id="pic" v-bind:src=profilePic> -->
    <p> Name: {{name}} </p>
    <p> Age: {{age}} </p>
    <p> Gender: {{gender}} </p>
    <p> Email: {{email}} </p>
    <p> Skills: {{skills}} </p>
    <p> Interests: {{interests}} </p>
    <p> Certifications: {{cert}} </p>
    <p> Experience: {{exp}} </p>
    <p> Self-Introduction: {{intro}} </p>
    <button id="editBtn" type="button" @click="edit()"> Edit </button>
  </div>
</template>

<script>
import firebaseApp from '../firebase.js';
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { getFirestore } from 'firebase/firestore';
import { doc, updateDoc, getDoc, setDoc } from 'firebase/firestore';
import { getStorage, ref, uploadString, getDownloadURL } from 'firebase/storage';

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
        game: require('../assets/game.png'),
        profilePic: "",
      }
    },

    beforeMount() {
      this.loadData();
    },

    mounted() {
      const auth = getAuth();
      onAuthStateChanged(auth, (user) => {
        if (user) {
          this.user = user;
        }
      });

      var input = document.querySelector('#input');
      input.addEventListener('change', load);
    
      function load() {
        var fileReader = new FileReader();
        var fileObject = this.files[0];
        fileReader.readAsDataURL(fileObject);
        console.log("fileObject:")
        console.log(fileObject)
        fileReader.onload = () => {
          var result = fileReader.result;
          var img = document.querySelector('#pic');
          img.setAttribute('src', result); 

        };
      }

      this.loadData();
    },

    methods: {
      async loadData() {

        const auth = getAuth();
        var email = auth.currentUser.email;
        
        const docRef = doc(db, "Users", email);
        const docSnap = await getDoc(docRef);
        const docdata = docSnap.data();

        if (docdata != undefined) {

          this.name = docdata['Name'] !== undefined ? docdata['Name'] : "",
          this.age = docdata['Age'] !== undefined ? docdata['Age'] : "",
          this.gender = docdata['Gender'] !== undefined ? docdata['Gender'] : "",
          this.email = docdata['Email'] !== undefined ? docdata['Email'] : email,
          this.skills = docdata['Skills'] !== undefined ? docdata['Skills'] : "",
          this.interests = docdata['Interests'] !== undefined ? docdata['Interests'] : "",
          this.cert = docdata['Certifications'] !== undefined ? docdata['Certifications'] : "",
          this.exp = docdata['Experience'] !== undefined ? docdata['Experience'] : "",
          this.intro = docdata['Introduction'] !== undefined ? docdata['Introduction'] : "",
          this.profilePic = docdata['profilePic'] !== undefined ? docdata['profilePic'] : "https://t3.ftcdn.net/jpg/03/46/83/96/360_F_346839683_6nAPzbhpSkIpb8pmAwufkC7c5eD7wYws.jpg",
          console.log(docSnap.data())

          console.log(this.name)
          console.log(this.age)
          console.log(this.gender)
          console.log(this.email)
          console.log(this.skills)
          console.log(this.interests)
          console.log(this.cert)
          console.log(this.exp)
          console.log(this.intro)
          console.log(this.profilePic)
        } else {

            await setDoc(doc(db, "Users", email), {
              Name: "",
              Age: "",
              Gender: "",
              Email: email,
              Skills: "",
              Interests: "",
              Certifications: "",
              Experience: "",
              Introduction: "",
              profilePic: "https://t3.ftcdn.net/jpg/03/46/83/96/360_F_346839683_6nAPzbhpSkIpb8pmAwufkC7c5eD7wYws.jpg",
            });

            this.email = email
            this.profilePic = "https://t3.ftcdn.net/jpg/03/46/83/96/360_F_346839683_6nAPzbhpSkIpb8pmAwufkC7c5eD7wYws.jpg";
        }
      },
      async savetofs() {
        const auth = getAuth();
        email = auth.currentUser.email;
        // this.user = auth.currentUser.email;

        var a = document.getElementById("name").value 
        var b = document.getElementById("age").value 
        var c = document.getElementById("gender").value 
        var d = document.getElementById("email").value
        var e = document.getElementById("skills").value
        var f = document.getElementById("interest").value
        var g = document.getElementById("cert").value
        var h = document.getElementById("exp").value
        var i = document.getElementById("intro").value
        //var j = document.getElementById("input").value
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
              updateDoc(userRef, {
                profilePic: downloadURL
              });
          })});
        }

        
        const accForm = document.getElementById("accForm");
        accForm.style.display = "none";

        try {

          const docRef = await updateDoc(doc(db, "Users", email), 
            {Name: a, Age: b, Gender: c, Email: d, Skills: e, Interests: f, Certifications: g, 
            Experience: h, Introduction: i});
          console.log(docRef);
          //this.$emit('userinfo');

        }
        catch(error) {
          console.error("Error making changes: ", error);
        }

        this.name = a;
        this.age = b;
        this.gender = c;
        this.email = d;
        this.skills = e; 
        this.interests = f; 
        this.cert = g; 
        this.exp = h; 
        this.intro = i;

        const docRef = doc(db, "Users", email);
        const docSnap = await getDoc(docRef);
        const docdata = docSnap.data();
        this.profilePic = docdata['profilePic'];
        console.log("test")
        console.log(this.profilePic)

        const infoContainer = document.getElementById("allInfo");
        infoContainer.style.display = "block";
        document.getElementById("uploadBtn").style.display = "none";
      },

      edit() {
        const editContainer = document.getElementById("accForm");
        editContainer.style.display = "block";
        const infoContainer = document.getElementById("allInfo");
        infoContainer.style.display = "none";
        const uploadBtn = document.getElementById("uploadBtn");
        uploadBtn.style.display = "inline-block";

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
  display: none;
}
#gamePic{
  height: 70px;
  width: 110px;
  float: right;
  transform: translate(-530%, -150%);
}
#score{
  transform: translate(90%, -150%);
}
label {
  display: inline-block;
  text-align: right;
  width: 100px;
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
#allInfo{
  display: block;
}
#editBtn{
  background: rgba(231, 207, 27, 0.904);
  color: black;
  cursor: pointer;
  text-align: center;
  padding: 7px 14px;
  border: block;
}
#savebutton{
  background: rgba(231, 207, 27, 0.904);
  color: black;
  cursor: pointer;
  text-align: center;
  padding: 7px 14px;
  border: none;
}

#accForm{
  display: none;
  text-align: center;
}
</style>