<template>
    <div id = "displayImage">
        <img id = "OrganisationPic" v-bind:src = this.profilePic>
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
      <div v-if= star1>
        <span class="fa fa-star checked"></span>
        <span class="fa fa-star"></span>
        <span class="fa fa-star"></span>
        <span class="fa fa-star"></span>
        <span class="fa fa-star"></span>
      </div>

      <div v-else-if= star2>
       <span class="fa fa-star checked"></span>
       <span class="fa fa-star checked"></span>
        <span class="fa fa-star"></span>
        <span class="fa fa-star"></span>
        <span class="fa fa-star"></span>
      </div>

      <div v-else-if= star3>
        <span class="fa fa-star checked"></span>
         <span class="fa fa-star checked"></span>
         <span class="fa fa-star checked"></span>
        <span class="fa fa-star"></span>
        <span class="fa fa-star"></span>
       
      </div>

      <div v-else-if= star4>
        <span class="fa fa-star checked"></span>
        <span class="fa fa-star checked"></span>
        <span class="fa fa-star checked"></span>
        <span class="fa fa-star checked"></span>
        <span class="fa fa-star"></span>
      </div>

      <div v-else-if= star5>
        <span class="fa fa-star checked"></span>
        <span class="fa fa-star checked"></span>
        <span class="fa fa-star checked"></span>
        <span class="fa fa-star checked"></span>
        <span class="fa fa-star checked"></span>
       
      </div>

      <div v-else><span class="fa fa-star checked"></span>
        <span class="fa fa-star checked"></span>
        <span class="fa fa-star checked"></span>
        <span class="fa fa-star checked"></span>
        <span class="fa fa-star checked"></span>
      </div>
      </div>

    <table>
        <tr>
        <th>Comments from past volunteers:</th>
        <td>
            <div>
                <table class ="noBorderTb" id = "table">

                </table>
            </div>
        </td>
        </tr>
  
    </table>
    </div>
    <br>
<div id = "display">
<button id = "savebutton" type="button" v-on:click="editProfile()"> Edit Profile </button><br>
</div>

 <div id = "editForm">
        <img id="pic" v-bind:src = this.profilePic>
        <br>
    <input type="file" id="input" accept="image/*">
     <label for="input" id="uploadBtn"> Choose Profile Picture</label><br><br>
    <input type="text" id="name" required="" placeholder="Enter your name"> <br> <br>
    <input type="text" id="intro" required="" placeholder="Enter Your Organisation Introduction">
   
    <div class = "save">
        <br>
        
      <button id = "savebutton" type="button" v-on:click="back()"> Back </button> <br> <br>
      <button id = "savebutton" type="button" v-on:click="savetofs()"> Save </button> <br> <br>
      
    </div>

    
</div>
</template>

<script>
import firebaseApp from '../firebase.js';
import { getAuth, onAuthStateChanged} from "firebase/auth";
import { doc, getDoc,getFirestore,setDoc,getDocs,collection,updateDoc} from 'firebase/firestore';
import { getStorage, ref, getDownloadURL, uploadString } from 'firebase/storage';
const db = getFirestore(firebaseApp);

export default {
    name: 'OrganisationAccInfo',
    
    data() {
    return {
      newUser :"",
      org: require('../assets/organisation.png'),
      name : "",
      intro : "",
      star1: false,
      star2: false,
      star3: false,
      star4: false,
      star5: false,
      profilePic: ""
      
    }
  },

  mounted() {
      const auth = getAuth();
      onAuthStateChanged(auth, (user) => {
        if (user) {
          this.user = user;
        }
      });

      getDoc(doc(db, "Organisations", String(auth.currentUser.email))).then(docSnap => {
        if (!docSnap.exists()) {
          this.newUser  = true
          this.profilePic = this.org

        } else {
          this.name = docSnap.data().Name
          this.intro = docSnap.data().Introduction
          this.displayComments()
          const docdata = docSnap.data()
          this.profilePic = docdata['profilePic']
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

       const displayImage = document.getElementById("displayImage");
       const display = document.getElementById("display");
       const editForm = document.getElementById("editForm");
       if (this.newUser) {
         displayImage.style.display = "none"
         display.style.display = "none"

       } else {
         editForm.style.display = "none"
         

       }
      
  },
  
  methods: {

      async savetofs() {
        const auth = getAuth();
        const email = auth.currentUser.email;
        
        var a = document.getElementById("name").value 
        var b = document.getElementById("intro").value 

        try {
          const docRef = await setDoc(doc(db, "Organisations", email), 
            {Name: a, Introduction: b, });
          console.log(docRef);
        }
        catch(error) {
          console.error("Error making changes: ", error);
        }

        this.name = a;
        this.intro = b;
        
        const file = document.getElementById("pic").src
        if (file.substring(0,4) !== 'http' && file !== '') {
          const fileURL = file.split(',')[1]
          const metadata = {
            contentType: 'image/jpeg',
          };
          const storage = getStorage();
          var imgName = email + '.jpg'
          const storageRef = ref(storage, imgName);
          uploadString(storageRef, fileURL, 'base64', metadata).then((snapshot) => {
            getDownloadURL(snapshot.ref).then((downloadURL) => {
              console.log('File available at', downloadURL);
              const userRef = doc(db, "Organisations", email);
              console.log(downloadURL)
              this.profilePic = downloadURL
              updateDoc(userRef, {profilePic: downloadURL});
            })
          });
        }
        const displayImage = document.getElementById("displayImage");
       const display = document.getElementById("display");
       const editForm = document.getElementById("editForm");
          displayImage.style.display = "block"
         display.style.display = "block"
          editForm.style.display = "none"
          console.log(this.profilePic)
       
       
        
      },
      editProfile() {
          //this.newUser = true
          const displayImage = document.getElementById("displayImage");
       const display = document.getElementById("display");
       const editForm = document.getElementById("editForm");
          displayImage.style.display = "none"
         display.style.display = "none"
          editForm.style.display = "block"
      },
      back() {
        const displayImage = document.getElementById("displayImage");
       const display = document.getElementById("display");
       const editForm = document.getElementById("editForm");
          displayImage.style.display = "block"
         display.style.display = "block"
          editForm.style.display = "none"
        
      },
      async displayComments() {
             // get all events posted by organisations
             // const postedEvents = query(collectionGroup(db, 'Posted Events'), orderBy('Date'), orderBy('Category'), orderBy('Location'), orderBy('Required_skills'));
    
             const allForms = await getDocs(collection(db,"Organisations",this.user.email,"Feedback Form"));
             // display in table and append button
             return this.displayTable(allForms);
         },

         async displayTable(result) {
             // clear table first
             var table = document.getElementById("table");
             while (table.rows.length > 0) {
                 table.deleteRow(0);
             }

             var auth = getAuth();
             var currUser = auth.currentUser.email;
             this.user = currUser;
             console.log(this.user)

             let ind = 1;
             var aveStars = 0;

             result.forEach((docs) => {
                 let y = docs.data();

                 console.log(y)
                 var row = table.insertRow(ind - 1);

                 var comment = (y.Comments);
                 var stars = (y.Stars);
                 aveStars = (aveStars*(ind - 1) + stars)/ind


                 var cell1 = row.insertCell(0); 

                 cell1.innerHTML = comment; 

                 
                 ind += 1;
             });
             if(aveStars < 0.5) {
               this.star1 = false

             } else if (aveStars < 1.5) {
               this.star1 = true
               
             } else if (aveStars < 2.5) {
               
               this.star2 = true
              
             } else if (aveStars < 3.5) {
               
               
               this.star3 = true
              
             } else if (aveStars < 4.5) {
               
               
               this.star4 = true
               

             } else {
               
               this.star5 = true

             }
             console.log(aveStars)
             return 
         },
         
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
    width:10%;
}
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