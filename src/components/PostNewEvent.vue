<template>
    <div class="container">
            <form id="userForm">
                <h1>Post New Event</h1>
                <div class = "formli">
        
                    <label for="coin1">Event Name: </label>
                    <input type="text" id="event" required="" placeholder="Enter Event Name" /> <br><br>
                    <label for="ticker1">Description: </label>
                    <input type="text" id="description" required="" placeholder="Event Description" /> <br><br>
                    <label for="buy1">Date: </label>
                    <input type="date" id="date" required="" placeholder="Date" /> <br><br>



                    <!-- <label for="quant1">Location: </label> -->
                    <!-- <input type="number" id="loc" required="" placeholder="Location" /> <br><br> -->
                    <div id = "loc field">
                    <label for="loc">Location: </label>
                    <input list="locations" id="loc" name="loc" onfocus="this.value=''" onchange="this.blur()" placeholder="Location" />
                    <datalist id="locations">
                        <option value="North">North</option>
                        <option value="South">South</option>
                        <option value="East">East</option>
                        <option value="West">West</option>
                    </datalist>
                    </div>
                    <br>

                    <!-- <label for="quant1">Category: </label> -->
                    <!-- <input type="text" id="cat" required="" placeholder="Select category" /> <br><br> -->
                    <div id = "cat field">
                    <label for="cat">Category: </label>
                    <input list="categories" id="cat" name="cat" onfocus="this.value=''" onchange="this.blur()" placeholder="Category"/>
                    <datalist id="categories">
                        <option value="Animals">Animals</option>
                        <option value="Arts/Culture">Arts/Culture</option>
                        <option value="Children/Youth">Children/Youth</option>
                        <option value="Education">Education</option>
                        <option value="Environment">Environment</option>
                    </datalist>
                    </div>
                    <br>

                    <!-- <label for="quant1">Required skills: </label> -->
                    <!-- <input type="text" id="skills" required="" placeholder="Required skills" /> <br><br> -->
                    <div id = "skill field">
                    <label for="skills">Required skills: </label>
                    <input list="skill" id="skills" name="skills" onfocus="this.value=''" onchange="this.blur()" placeholder="Required skills" />
                    <datalist id="skill">
                        <option value="Admin">Admin</option>
                        <option value="Communication">Communication</option>
                        <option value="IT/Technology">IT/Technology</option>
                        <option value="Marketing">Marketing</option>
                        <option value="Planning/Organisation">Planning/Organisation</option>
                        <option value="None">None</option>
                    </datalist>
                    </div>
                    <br>

                    <label for="quant1">Number of volunteered needed: </label>

                    <input type="number" id="numVol" required="" placeholder="Enter number" /> <br><br>
                    <label for="quant1">Deadline of Sign Up: </label>
                    <input type="date" id="deadline" required="" placeholder="Enter deadline" /> <br><br>

                    <div class = "save">
                        <button id="savebutton" type="button" v-on:click="savetofs()">POST</button>
                    </div>
                </div>
            </form>
        </div>
</template>

<script>
import firebaseApp from '../firebase.js';
import { getFirestore } from "firebase/firestore";
import { doc, setDoc, getDoc } from "firebase/firestore";
import { getAuth } from "firebase/auth"
const db = getFirestore(firebaseApp);

export default {
    methods: {
        
        async savetofs() {
            const auth = getAuth();
            
            this.user = auth.currentUser.email;
            const orgRef = doc(db, "Organisations",String(this.user));
            const docSnap = await getDoc(orgRef);
            
            
            var a = document.getElementById("event").value
            var b = document.getElementById("description").value
            var date = new Date(document.getElementById("date").value);
            var c = new Date(date);
            var d = document.getElementById("loc").value
            var e = document.getElementById("cat").value
            var f = document.getElementById("skills").value
            var g = document.getElementById("numVol").value
            var ddl = new Date(document.getElementById("deadline").value);
            var h = new Date(ddl);
            var i = docSnap.data().Name
            var j = {} 
            var k = {}
            


            alert("Confirm to post Event: " + a + "?")

            try{ 
                const docRef = await setDoc(doc(orgRef, "Posted Events", a),{
                Event_Name: a, Description: b, Date: c, Location: d, Category: e,
                Required_skills: f, Number_of_volunteers_needed: g, Deadline_of_sign_up: h, Organisation_Name: i,
                Accepted_volunteers:j,Applied_volunteers:k, Org_Email: this.user
                })
                console.log(docRef)
                document.getElementById('userForm').reset();
                this.$emit("added") // emitting so that the parent knows that event is added
                }
            catch(error){
                console.error("Error adding document: ", error);
            }
            }
    }
}
</script>

<style scoped>

.formli{
    display: inline-block;
    text-align: right;
}

form {
    text-align: center;
    align-items: center;
    margin: auto;
}

input:hover {
  box-shadow: 3px 3px rgb(156, 66, 81);
  border-radius: 5px;
}

.save{
    text-align:center;
}
</style>