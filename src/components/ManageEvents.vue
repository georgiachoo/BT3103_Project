<template>
    <h1 id="Current">Manage Posted Event</h1>
        <table id="table" class="auto-index">
        <tr>
            <th>Event_Name</th>
            <th>Description</th>
            <th>Date</th>
            <th>Location</th>
            <th>Category</th>
            <th>Required_skills</th>
            <th>Number_of_volunteers_needed</th>
            <th>Deadline_of_sign_up</th>
        </tr>
        </table>
        <br><br>
</template>

<script>
import firebaseApp from '../firebase.js';
import { getFirestore } from "firebase/firestore";
import { collection, getDocs, doc, deleteDoc } from "firebase/firestore";
import { getAuth, onAuthStateChanged } from "firebase/auth"

const db = getFirestore(firebaseApp);

export default {
    mounted(){
        const auth = getAuth();
        onAuthStateChanged(auth, (user) => {
            if (user) {
                display(user.email)
            }
        })

        async function display(user) {
            let z = await getDocs(collection(db, String(user)))
            //let z = await db.collection("Portfolio").get() // get the whole collection of documents. await because firebse API is promise based
            let ind = 1

            z.forEach((docs) => { // loop through documents in the collection
                let yy = docs.data()
                var table = document.getElementById("table")
                var row = table.insertRow(ind) // access the table

                var event = (yy.Event_Name) // get values from the document
                var date = (yy.Date)
                var loc = (yy.Location)
                var deadline = (yy.Deadline_of_sign_up)

                // create cells for the row
                var cell1 = row.insertCell(0); var cell2 = row.insertCell(1); var cell3 = row.insertCell(2);
                var cell4 = row.insertCell(3); var cell5 = row.insertCell(4); var cell6 = row.insertCell(5);
                var cell7 = row.insertCell(6); var cell8 = row.insertCell(7); var cell9 = row.insertCell(8);

                // fill up the row
                cell1.innerHTML = event; cell2.innerHTML = date; cell3.innerHTML = loc; cell4.innerHTML = deadline; cell5.innerHTML = 0;
                cell6.innerHTML = 0; cell7.innerHTML = 0; cell8.innerHTML = 0;

                // create the delete button for that row
                var bu = document.createElement("button")
                bu.className = "bwt"
                bu.id = String(event)
                bu.innerHTML = "Close registration"
                bu.onclick = function() {
                    deleteinstrument2(event, user)
                }
                cell9.appendChild(bu)
            })
        }
        display()

        // Delete instruments
        async function deleteinstrument2(event, user) {
            var x = event
            alert("You are going to close registration for " + x)
            await deleteDoc(doc(db, String(user), x))
            console.log("Registration closed", x);
            let tb = document.getElementById("table")
            while (tb.rows.length > 1) {
                tb.deleteRow(1)
            }
            //document.getElementById("totalProfit").innerHTML=""
            display()
        }
    }
}
</script>

<style scoped>

table {
    font-family: arial, sans-serif;
    width: 100%;
    border-collapse: collapse;
}

tr:nth-child(even) {
    background-color: #e3edee;
}

th, td {
  border: 1px solid #dddddd;
  text-align: center;
  padding: 8px;
}

.bwt {
  color: rgb(243, 236, 236);
  background-color: rgb(255, 94, 0);
}
</style>