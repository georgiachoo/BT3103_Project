<template>
    <p align= "right"><a href="#" class="previous" onclick="history.back()">&laquo;</a> </p>
    <OrgSidebar/>
    <h1 id="Current">Manage Posted Event</h1>
        <table id="table" class="auto-index" align="right">
        <tr>
            <th>Event Name</th>
            <th>Date</th>
            <th>Location</th>
            <th>Deadline of sign up</th>
            <th>Options</th>
        </tr>
        </table>
        <br><br>
</template>

<script>
import firebaseApp from '../firebase.js';
import { collection, query, where, getFirestore } from "firebase/firestore";
import { getDocs, doc, deleteDoc, getDoc, setDoc } from "firebase/firestore";
import { getAuth, onAuthStateChanged } from "firebase/auth"
import OrgSidebar from '@/components/sidebar/OrgSidebar.vue';

const db = getFirestore(firebaseApp);

export default {
    name: 'ManageEvents',
    components:{
        OrgSidebar
    },

    mounted(){
        const auth = getAuth();
        onAuthStateChanged(auth, (user) => {
            if (user) {
                display(user.email)
            }
        })

        async function display(user) {
            const email = auth.currentUser.email
            const q = query(collection(db, "Organisations", email, "Posted Events"), where("Org_Email", "==", email));
            const events = await getDocs(q);
            let ind = 1

            events.forEach((docs) => { // loop through documents in the collection
                let yy = docs.data()
                var table = document.getElementById("table")
                var row = table.insertRow(ind) // access the table

                var event = (yy.Event_Name) // get values from the document
                var date = ((yy.Date).toDate()).toDateString()
                var loc = (yy.Location)
                var deadline = ((yy.Deadline_of_sign_up).toDate()).toDateString()

                // create cells for the row
                var cell1 = row.insertCell(0); var cell2 = row.insertCell(1); var cell3 = row.insertCell(2);
                var cell4 = row.insertCell(3); var cell5 = row.insertCell(4);

                // fill up the row
                cell1.innerHTML = event; cell2.innerHTML = date; cell3.innerHTML = loc; cell4.innerHTML = deadline;

                // create the delete button for that row
                var bu = document.createElement("button")
                bu.className = "bwt"
                bu.id = String(event)
                bu.innerHTML = "Close event"
                bu.style.backgroundColor = "rgba(231, 207, 27, 0.904)"
                bu.style.cursor = "pointer"
                bu.style.borderColor = "rgba(231, 207, 27, 0.904)"
                bu.style.textAlign = "center"
                bu.style.padding = "5px 14px"
                bu.onclick = function() {
                    deleteinstrument2(event, user)
                }
                cell5.appendChild(bu)
            })
        }

        // Delete instruments
        async function deleteinstrument2(event) {
            var x = event
            alert("You are going to close the event: " + x)
            const docRef = await getDoc(doc(db, "Organisations", auth.currentUser.email, "Posted Events", x))
            console.log("Event closed");

            const acceptedArr = docRef.data().Accepted_volunteers
            for (var i = 0; i < acceptedArr.length; i++) {
                await setDoc(doc(db, "Users", acceptedArr[i], "Completed Events", x), {
                  "Category": docRef.data().Category,
                  "Date": docRef.data().Date,
                  "Deadline_of_sign_up": docRef.data().Deadline_of_sign_up,
                  "Description": docRef.data().Description,
                  "Event_Name": x,
                  "Location": docRef.data().Location,
                  "Number_of_volunteers_needed": docRef.data().Number_of_volunteers_needed,
                  "Organisation_Name": docRef.data().Organisation_Name,
                  "Org_Email": auth.currentUser.email,
                  "Required_skills": docRef.data().Required_skills,
                  "Feedback_Completed": false
                });

                await setDoc(doc(db, "Users", acceptedArr[i], "Newly Completed", x), {
                  "Event_Name": x,
                });

                await deleteDoc(doc(db, "Users", acceptedArr[i], "Registered Events", x));
            }

            await deleteDoc(doc(db, "Organisations", auth.currentUser.email, "Posted Events", x))

            let tb = document.getElementById("table")
            while (tb.rows.length > 1) {
                tb.deleteRow(1)
            }

            display()
        }
    }
}
</script>

<style scoped>

table {
    font-family: arial, sans-serif;
    width: 80%;
    border-collapse: collapse;
    margin-right: 30px;
}

tr:nth-child(even) {
    background-color: #e3edee;
}

th, td {
  border: 1px solid #dddddd;
  text-align: center;
  padding: 8px;
  background-color: rgba(20, 95, 145, 0.609);
}

.bwt {
  background-color: rgba(231, 207, 27, 0.904);
  color: black;
  cursor: pointer;
  text-align: center;
  padding: 20px;
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
  background-color: rgb(234, 220, 86);
  color: black;
}
</style>