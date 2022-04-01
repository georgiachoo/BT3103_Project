<template>
<p align= "left"><a href="#" class="previous" onclick="history.back()">&laquo;</a>
</p>
  <h2>Leave Your Feedback</h2>
  <div><h4>Event Name : {{ $route.params.eventName }}</h4></div>
  <div><h4>Organisation Name : {{ orgName }}</h4></div>
  <br>
  
  
         <div id = "field1">
         <label for="rate">Rate the event out of 5 :</label>
         <input type = "number" list="rate" id="rate-label" name="rate-label" placeholder="Select All"/>
         <datalist id="rate">
             <option value= 1>1</option>
             <option value= 2>2</option>
             <option value= 3>3</option>
             <option value= 4>4</option>
            <option value= 5>5</option>
         </datalist>
         </div>
  <br> 
  <div id = "field2">
         <label for="comments">Comments on the event : </label>
         <input type="text" id="comments" name="comments" placeholder="Enter comments" />
  </div>

  <div id = "search_btn">
             <button v-on:click = "submit()" style = "margin: 45px 10px 25px;">Submit</button>
         </div>




</template>

<script>
import firebaseApp from '../firebase.js';
import { getFirestore, getDoc, doc,setDoc } from "firebase/firestore";
import { getAuth, onAuthStateChanged } from "firebase/auth"; 
//import { getDocs, query, where, collectionGroup} from "firebase/firestore"; //collection, getDoc, Timestamp, orderBy 
 // import router from '@/router';
const db = getFirestore(firebaseApp);


export default {
    data () {
       return {
           user: false,
           orgName : 'o',
           //orgEmail : {$route.params.orgID}
       }
     },
     mounted() {

         const auth = getAuth();
         onAuthStateChanged(auth, (user) => {
         if (user) {
             this.user = user;
         }
         });
         
         this.display()
         

     },

     methods: {
         async display() {
             console.log(this.$route.params.orgID)
            var nameRef = await getDoc(doc(db,"Organisations",this.$route.params.orgID));
            this.orgName = nameRef.data().Name;
            

         },
         submit() {
              var a = document.getElementById("rate-label").value 
              var b = document.getElementById("comments").value
              var c = Number(a)
              this.savetofb(c,b)
              this.$router.push('/UserMyEvents')
         },
         async savetofb(rate,comments) {
            const orgRef = doc(db, "Organisations",this.$route.params.orgID);
            //const docSnap = await getDoc(orgRef);
         await setDoc(doc(orgRef, "Feedback Form", this.$route.params.eventName),{
                Comments: comments,
                Stars: rate
                })
            
         }

    
     }


}
</script>

<style scoped>
h2{
    background-color: rgb(99, 157, 184);
    text-align: center
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

.previous {
  background-color: #f1f1f1;
  color: black;
}

input {
    

}

#comments {
    width: 300px;
    height: 80px;
}
</style>