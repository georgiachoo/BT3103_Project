<template>
    <h1>Organisation Login</h1>
    <div id= "firebaseui-auth-container"></div>

</template>

<script>
import firebase from '@/uifire.js'
import 'firebase/compat/auth';
import * as firebaseui from 'firebaseui'
import 'firebaseui/dist/firebaseui.css'

/*import firebaseApp from '../firebase.js';
import { getFirestore } from "firebase/firestore";
import { doc,setDoc } from "firebase/firestore";
import { getAuth } from "firebase/auth"
const db = getFirestore(firebaseApp);*/



export default ({
    name: 'OrganisationLogin',
    mounted() {

        var ui = firebaseui.auth.AuthUI.getInstance();
        
        
        
        if (!ui) {
            ui = new firebaseui.auth.AuthUI(firebase.auth());
            //this.savetofs();
            
        }
        
        

        

        var uiConfig = {
        
        // to link to organisation home pg
        signInSuccessUrl: '/OrgOpportunities' ,
        signInOptions: [
            firebase.auth.GoogleAuthProvider.PROVIDER_ID,
            firebase.auth.EmailAuthProvider.PROVIDER_ID,

        ],
        
        /* callbacks: {
        
             
             
    signInSuccessWithAuthResult: async  function(authResult) {
      // User successfully signed in.
      // Return type determines whether we continue the redirect automatically
      // or whether we leave that to developer to handle.
      
            
            
            
            //this.user = authResult.email;
            
            //var a = this.user
            
             

            alert("Add new collection for " + String(authResult.user) + " to firebase")

            
                await setDoc(doc(db, String(authResult.user),authResult.user.email),{
               // Organisation_Email: String(authResult.user.email)
                })
            //    alert("Add new collection testestes "  )
                
                //document.getElementById('userForm').reset();
                //this.$emit("added") // emitting so that the parent knows that coin is added
            
           
          //  docRef.addDoc()

      return true;
    },
    
    
  },*/
        }

        ui.start("#firebaseui-auth-container", uiConfig)
        
        
        
        
    },

    created() {
        //var ui = firebaseui.auth.AuthUI.getInstance();
            this.type = this.$route.params.type;
           // this.savetofs()
            

    },
    
   /* methods: {
        async savetofs() {
            //alert("hi")
            
            const auth = getAuth();
            
            
            
            this.user = auth.currentUser.email;
            
            var a = this.user


            alert("Add new collection for " + a + " to firebase")

            try{ 
                const docRef = await setDoc(doc(db, String(this.user), a),{
                Organisation_Email: a
                })
                console.log(docRef)
                //document.getElementById('userForm').reset();
                //this.$emit("added") // emitting so that the parent knows that coin is added
                }
            catch(error){
                console.error("Error adding document: ", error);
            }
            
        }
    }*/
})
</script>

<style scoped>

#firebaseui-auth-container {
    margin-top: 50px;
    margin-bottom: 50px;
    margin-left: 35%;
    margin-right: 35%;

    padding: 50px 50px 50px 50px;
    border-radius: 30px;
    border-color: transparent;
    background-color: #dfb7b7;
    box-shadow: 0 5px 15px rgb(0 0 0 / 0.2);
}

</style>