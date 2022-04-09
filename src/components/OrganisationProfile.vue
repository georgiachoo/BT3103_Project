<template>
<p align= "left"><a href="#" class="previous" onclick="history.back()">&laquo;</a></p>

    <div>
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

      <div v-else>
          <span class="fa fa-star"></span>
        <span class="fa fa-star"></span>
        <span class="fa fa-star"></span>
        <span class="fa fa-star"></span>
        <span class="fa fa-star"></span>
        
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

</template>


<script>
import firebaseApp from '../firebase.js';
import { getAuth,onAuthStateChanged} from "firebase/auth";
import { getDocs,doc, getDoc,getFirestore,collection} from 'firebase/firestore';
const db = getFirestore(firebaseApp);


export default {
    name: 'OrganisationProfile',
    
    data() {
        return {
            org: require('../assets/organisation.png'),
            name : "",
            intro : "",
            orgEmail: this.$route.params.orgID,
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
        console.log("org email in profile page");
        console.log(this.orgEmail);
        getDoc(doc(db, "Organisations", String(this.orgEmail))).then(docSnap => {

        if (docSnap.exists()) {
            this.name = docSnap.data().Name
            this.intro = docSnap.data().Introduction
            this.profilePic = docSnap.data().profilePic

        } else {
          this.profilePic = this.org

            console.log("error")
        }
        })
        this.displayComments()
    },
    methods: {
        async displayComments() {
             // get all events posted by organisations
             // const postedEvents = query(collectionGroup(db, 'Posted Events'), orderBy('Date'), orderBy('Category'), orderBy('Location'), orderBy('Required_skills'));
    
             const allForms = await getDocs(collection(db,"Organisations",this.orgEmail,"Feedback Form"));
             
               
                
             
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
                 
                 //var table = document.getElementById("table");
                 var row = table.insertRow(ind - 1);

                 var comment = (y.Comments);
                


                 // variables to be displayed when user clicks on view (to be passed to displayModal)
                
                 var stars = (y.Stars);
                 aveStars = (aveStars*(ind - 1) + stars)/ind


                 var cell1 = row.insertCell(0); 

                 cell1.innerHTML = comment; 

                 
                 ind += 1;
             });
             console.log(aveStars)
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
#profilePic{
  height: 100px;
  width: 100px;
  border-radius: 50%;
  border: 1px solid gray;
  background-position: center;
  background-size: cover;
}
#intro {
    width: 300px;
    height: 100px;
}
#name{
    width: 300px;
}
.previous {
  background-color: #f1f1f1;
  color: black;
}
a {  
  text-decoration: none;
  display: inline-block;
  padding: 8px 16px;
}
a:hover {
  background-color: #ddd;
  color: black;
}
</style>
