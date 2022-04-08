<template>
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

// collectionGroup
// getDocs
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
            //let z = await getDocs(collection(db, "Organisation"))
            //String(user)
            //let z = await db.collection("Portfolio").get() // get the whole collection of documents. await because firebse API is promise based
            //const z = query(collectionGroup(db, "Posted Events").where("Event_Name", "array-contains", "test event")).get();
            //yanyushan368@gmail.com
            const q = query(collection(db, "Organisations", email, "Posted Events"), where("Org_Email", "==", email));
            const events = await getDocs(q);
            let ind = 1

            events.forEach((docs) => { // loop through documents in the collection
                let yy = docs.data()
                var table = document.getElementById("table")
                var row = table.insertRow(ind) // access the table

                var event = (yy.Event_Name) // get values from the document
                var date = ((yy.Date).toDate()).toDateString()//(yy.Date)
                var loc = (yy.Location)
                var deadline = ((yy.Deadline_of_sign_up).toDate()).toDateString()//(yy.Deadline_of_sign_up)

                // create cells for the row
                var cell1 = row.insertCell(0); var cell2 = row.insertCell(1); var cell3 = row.insertCell(2);
                var cell4 = row.insertCell(3); var cell5 = row.insertCell(4);

                // fill up the row
                cell1.innerHTML = event; cell2.innerHTML = date; cell3.innerHTML = loc; cell4.innerHTML = deadline; //cell5.innerHTML = 0;

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
            //await deleteDoc(doc(db, String(user), x))
            const docRef = await getDoc(db, "Organisations", auth.currentUser.email, "Posted Events", x)
            await deleteDoc(doc(db, "Organisations", auth.currentUser.email, "Posted Events", x))

            console.log("Event closed");

            const acceptedArr = docRef.data().Accepted_volunteers
            for (var i = 0; i < acceptedArr.length; i++) {
                await setDoc(db, "User", acceptedArr[i], "Completed Events", docRef)
            }


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
  /*color: rgb(243, 236, 236);
  background-color: rgb(255, 94, 0);*/
  background-color: rgba(231, 207, 27, 0.904);
  color: black;
  cursor: pointer;
  text-align: center;
  padding: 20px /*7px 14px 7px 7px*/;
}
</style>