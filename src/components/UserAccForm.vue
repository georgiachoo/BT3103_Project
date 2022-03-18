<template>
  <form id="accForm">

        <label for="name"> Name: </label>
        <input type="text" id="name" required="" placeholder="Enter your name"> <br><br>
        
        <label for="age"> Age: </label>
        <input list="age" name="age">
        <datalist id="age">
            <option value="13-17"/> 
            <option value="18-20"/> 
            <option value="21-29"/> 
            <option value="30-39"/> 
            <option value="40-59"/>
            <option value="Above 60"/>
        </datalist><br><br>
        
        <label for="gender"> Gender: </label>
        <input list="gender" name="gender">
        <datalist id="gender">
            <option value="Male"/>
            <option value="Female"/>
            <option value="Non-binary"/> 
        </datalist><br><br>
        
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
            <button id = "savebutton" type="button" v-on:click="savetofs()"> Save </button>
        </div>
    </form>
</template>

<script>
import firebaseApp from '../firebase.js';
import { getFirestore } from 'firebase/firestore';
import { doc, setDoc } from 'firebase/firestore';
import { getAuth } from "firebase/auth";
const db = getFirestore(firebaseApp);

export default {
    name: 'UserAccForm',

    emits:["userinfo"],

    data() {
        return {
            user: "",
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
        async savetofs() {
            const auth = getAuth();
            this.user = auth.currentUser.email;

            /*
            var a = document.getElementById("name").value 
            var b = document.getElementById("age").value
            var c = document.getElementById("gender").value
            var d = document.getElementById("email").value
            var e = document.getElementById("skills").value
            var f = document.getElementById("interest").value
            var g = document.getElementById("cert").value
            var h = document.getElementById("exp").value
            var i = document.getElementById("intro").value
            alert("Saving changes to My Account");
            */

            try {
                const docRef = await setDoc(doc(db, String(this.user), this.a), 
                    {Name: this.name, Age: this.age, Gender: this.gender, Email: this.email, 
                     Skills: this.skills, Interests: this.interests, Certifications: this.cert, 
                     Experience: this.exp, Introduction: this.intro});
                console.log(docRef);
                this.$emit('userinfo');
            }
            catch(error) {
                console.error("Error making changes: ", error);
            }
        }
    }
}
</script>

<style scoped>
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
</style>