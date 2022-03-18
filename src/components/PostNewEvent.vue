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
                    <label for="quant1">Location: </label>
                    <input type="number" id="loc" required="" placeholder="Location" /> <br><br>
                    <label for="quant1">Category: </label>
                    <input type="text" id="cat" required="" placeholder="Select category" /> <br><br>
                    <label for="quant1">Required skills: </label>
                    <input type="text" id="skills" required="" placeholder="Required skills" /> <br><br>
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
import { doc, setDoc } from "firebase/firestore";
import { getAuth } from "firebase/auth"
const db = getFirestore(firebaseApp);

export default {
    methods: {
        
        async savetofs() {
            const auth = getAuth();
            this.user = auth.currentUser.email;
            
            var a = document.getElementById("event").value
            var b = document.getElementById("description").value
            var c = document.getElementById("date").value
            var d = document.getElementById("loc").value
            var e = document.getElementById("cat").value
            var f = document.getElementById("skills").value
            var g = document.getElementById("numVol").value
            var h = document.getElementById("deadline").value


            alert("Confirm to post Event: " + a + "?")

            try{ 
                const docRef = await setDoc(doc(db, String(this.user), a),{
                Event_Name: a, Description: b, Date: c, Location: d, Category: e,
                Required_skills: f, Number_of_volunteers_needed: g, Deadline_of_sign_up: h
                })
                console.log(docRef)
                document.getElementById('userForm').reset();
                this.$emit("added") // emitting so that the parent knows that coin is added
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
  box-shadow: 3px 3px purple;
  border-radius: 5px;
}

.save{
    text-align:center;
}
</style>