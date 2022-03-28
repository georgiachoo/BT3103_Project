<template>
    
    <div v-if = newUser>
        <img id="profilePic">
        <br>
    <input type="file" id="input" accept="image/*">
     <label for="input" id="uploadBtn"> Choose Profile Picture</label><br><br>
    <input type="text" id="name" required="" placeholder="Enter your name"> <br> <br>
    <input type="text" id="intro" required="" placeholder="Enter Your Organisation Introduction">
   
    <div class = "save">
        <br>
      <button id = "savebutton" type="button" v-on:click="savetofs()"> Save </button><br><br>
    </div>

    
    </div>
    <div v-else>
        <img id = "OrganisationPic" :src="org" class = center>
        
        <h2>{{name}}</h2>
    <table>
        <tr>
        <th>Organisation Details:</th>
        <td>{{intro}}</td>
        </tr>
  
    </table>
    <br>
    

   
    <div class="left"> 
        <h4>Rate:</h4>  </div>
    <div class="right"> <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">

    <span class="fa fa-star checked"></span>
    <span class="fa fa-star checked"></span>
    <span class="fa fa-star checked"></span>
    <span class="fa fa-star"></span>
    <span class="fa fa-star"></span></div>

    <table>
        <tr>
        <th>Comments from past volunteers:</th>
        <td>
            <div>
                <table class ="noBorderTb" >
                    <tr ><td id = "comment_td">one</td></tr>
                    <tr><td id = "comment_td">two</td></tr>
                    <tr><td id = "comment_td">three</td></tr>

                </table>
            </div>
        </td>
        </tr>
  
    </table>
    </div>
    <br>
<div v-if = !newUser>
<button id = "savebutton" type="button" v-on:click="editProfile()"> Edit Profile </button><br>
</div>
</template>

<script>
import firebaseApp from '../firebase.js';
import { getAuth, onAuthStateChanged } from "firebase/auth";

import { doc, getDoc,getFirestore,setDoc } from 'firebase/firestore';
const db = getFirestore(firebaseApp);
//const auth = getAuth();
//const email = auth.currentUser.email;


export default {
    name: 'OrganisationAccInfo',
    data() {
    return {
      newUser : true,
      org: require('../assets/volunteer.png'),
      name : "",
      intro : "",
      
    }
  },
  created() {
      const auth = getAuth();
      onAuthStateChanged(auth, (user) => {
        if (user) {
          this.user = user;
          
          
          }


        }
      );
      //alert(auth.currentUser.email)
      
      getDoc(doc(db, "Organisations", String(auth.currentUser.email))).then(docSnap => {
          alert("wuwuw")
          alert(docSnap.data().Name)
  if (docSnap.exists()) {
      this.newUser  = false
      this.name = docSnap.data().Name
      this.intro = docSnap.data().Introduction
    alert("Document data:");
    
  } else {
    alert("No such document!");
  }
})
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
        fileReader.onload = () => {
          var result = fileReader.result;
          var img = document.querySelector('#profilePic');
          img.setAttribute('src', result); 
        };
      

    
        }
},
methods: {
      async savetofs() {
        //const auth = getAuth();
        //var this.user = auth.currentUser.email;
        const auth = getAuth();
        const email = auth.currentUser.email;
        //const reader = new FileReader();
        

        var a = document.getElementById("name").value 
        var b = document.getElementById("intro").value 
        //var j = reader.readAsDataURL(document.getElementById("input"))
        alert("dengzhe")
        alert(document.getElementById("input").value);
        alert("Saving changes to My Organisation Account");

        //const accForm = document.getElementById("accForm");
        //accForm.style.display = "none";

        try {
          const docRef = await setDoc(doc(db, "Organisations", email), 
            {Name: a, Introduction: b, });
          console.log(docRef);
          //this.$emit('userinfo');
        }
        catch(error) {
          console.error("Error making changes: ", error);
        }

        this.name = a;
        this.intro = b;
        this.newUser=false
        
      },
      editProfile() {
          this.newUser = true
      }
}
}
      

    

</script>

<style scoped>
 th{
  
  border: px solid;
  
  
}
td {
    
    text-align: start;
    border: 1px solid;
    width: 75%;
    height: 200px;

}
#comment_td {
    text-align: start;
    width: 75%;
    height: 100px;
  


}
#comment_tr {
    text-align: start;
    width: 75%;
    height: 100px;
    border: 0ch;


}
table {
    border: 1px solid;
    width: 100%;
}
.noBorderTb {
    border: 0px solid;
    width: 100%;

}
.checked {
  color: orange;
  

}
.fa {
  font-size: 30px;
}

 .left {
            width: 25%;
            float: left;
            height: 100px;
            text-align: center;
            
            
        }
.right {
            width: 75%;
            float:left;
            height: 100px;
            text-align: center;
        }
#OrganisationPic{
    display: block;
    margin-left: auto;
    margin-right: auto;
    width:60%;
}
#profilePic{
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
  transform: translate(-100%, 95%)
}
#intro {
    width: 300px;
    height: 100px;
}
#name{
    width: 300px;
}

</style>
