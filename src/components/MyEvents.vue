<template>


    <h4><span style="font-weight:normal">Select event type to view events</span></h4>
    <!-- <h4>Select event type to view events</h4> -->

    <!-- Menu to select Ongoing or Completed events -->
    <div id = "eventSelect">
        <!-- oninput="this.displayEvent()"  -->
        <input list="event" id="event-id" value="Ongoing Events" onfocus="this.value=''" onchange="this.blur()" placeholder="Select Events"/> 
        <datalist id="event">
            <option value="Ongoing Events">Ongoing Events</option>
            <option value="Completed Events">Completed Events</option>
        </datalist>
    </div>
    <br><br><br>

    <!-- Table to display ongoing or completed events -->
    <div id = "eventDisplay" style="overflow: scroll; height: 300px; width: 100%; overflow: auto">
        <table id= "table" class = "auto-index">
        <tr>
        <th>Event Name</th>
        <th>Description</th>
        <th>Date</th>
        <th>Location</th>
        <th>Category</th>
        <th>Required Skills</th>
        <th>Options</th>
        </tr>
    </table> <br><br>
    </div>
   
</template>


<script>
import firebaseApp from '../firebase.js';
import { getFirestore } from "firebase/firestore";
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { collection, getDoc, getDocs, updateDoc, doc } from "firebase/firestore";
const db = getFirestore(firebaseApp);

export default {

    data() {
        return {
            user: false
        }
    },

    mounted() {

        const auth = getAuth();
        onAuthStateChanged(auth, (user) => {
        if (user) {
            this.user = user;
        }
        });

        document.getElementById('event-id').addEventListener('input', this.displayEvent);

        this.displayEvent()

    },

    methods: {


        async displayEvent() {  

            var thisInstance = this; 
            const auth = getAuth();
            var currUser = auth.currentUser.email;
            this.user = currUser;
            console.log(this.user)

            // clear table first
            var table = document.getElementById("table");
            while (table.rows.length > 1) {
                table.deleteRow(1);
            }

            // retrieve input from user
            var selectedEvent = document.getElementById('event-id').value;
            console.log(selectedEvent);

            let selectedCol = ""
            if (selectedEvent === "Ongoing Events") {
                selectedCol = collection(db, "Users", currUser, "Registered Events");
            } else if (selectedEvent === "Completed Events") {
                selectedCol = collection(db, "Users", currUser, "Completed Events");
            } else {
                return;
            }
            console.log(selectedCol);

            let z = await getDocs(selectedCol);

            // if collection does not exist yet, return
            if (z == null) {
                return;
            }

            let ind = 1

            z.forEach((docs) => {
                let event = docs.data()

                var table = document.getElementById("table")
                var row = table.insertRow(ind)

                var eName = (event.Event_Name)
                var eDescription = (event.Description)
                var eDate = ((event.Date).toDate()).toDateString()
                var eLoc = (event.Location)
                var eCat = (event.Category)
                var eSkills = (event.Required_skills)
                var orgEmail = (event.Org_Email)
                

                var cell1 = row.insertCell(0); var cell2 = row.insertCell(1); var cell3 = row.insertCell(2);
                var cell4 = row.insertCell(3); var cell5 = row.insertCell(4); var cell6 = row.insertCell(5);
                var cell7 = row.insertCell(6);

                cell1.innerHTML = eName; cell2.innerHTML = eDescription; cell3.innerHTML = eDate; cell4.innerHTML = eLoc; cell5.innerHTML = eCat;
                cell6.innerHTML = eSkills; 
                // cell7.innerHTML = 0;

                if (selectedEvent === "Completed Events") {
                    let status = (event.Feedback_completed);

                    var bu = document.createElement("button");
                    bu.className = "bwt";
                    bu.id = String(eName);
                    bu.style.backgroundColor = "rgba(231, 207, 27, 0.904)"
                    bu.style.cursor = "pointer"
                    bu.style.borderColor = "rgba(231, 207, 27, 0.904)"
                    bu.style.textAlign = "center"
                    bu.style.padding = "5px 14px"

                    bu.innerHTML = "Leave Feedback";
                    bu.onclick = function() {
                        thisInstance.disableButton(eName);
                        thisInstance.leaveFeedback(currUser, eName, orgEmail);
                        thisInstance.addScore(currUser);
                    }
                    cell7.appendChild(bu);

                    // if feedback form for event has been completed, disable button
                    if (status === true) {
                        this.disableButton(eName);
                    }

                // Ongoing events do not require users to take any action
                } else {
                    cell7.innerHTML = "-";
                }
                ind += 1
            })

            return;
        },

        // go to feedback form page and update Feedback_completed
        async leaveFeedback(currUser, eName, orgEmail) {
            console.log("in feedback function");

            // update Feedback_completed field in user's completed events subcol
            const currEvent = doc(db, "Users", currUser, "Completed Events", eName);
            await updateDoc(currEvent, { Feedback_completed: true });

            //direct to Feedback Form page
            this.$router.push('/UserMyEvents/FeedbackForms/' + orgEmail + '/Events/' + eName)
            
            return 
        },

        async addScore(currUser) {
            console.log("adding score")
            const userDoc = doc(db, "Users", currUser);
            const userSnap = await getDoc(userDoc);
            if (userSnap.exists()) {
                let userData = userSnap.data();
                let currScore = (userData.Score)
                let updatedScore = 0;
                if (isNaN(parseFloat(currScore))) {
                    updatedScore = 5;
                } else {
                    updatedScore = currScore + 5;
                }
                await updateDoc(userDoc, { Score: updatedScore });
            } else {
                console.log("could not add score")
            }
            return;
        },

        // disable button and indicate that feedback form has been completed
        disableButton(eName) {
            document.getElementById(String(eName)).innerHTML = "Feedback Completed"
            document.getElementById(String(eName)).disabled = true;
            return eName;
        }
       
    }
    
}

</script>


<style scoped>

    table {
        font-family: arial, sans-serif;
        border-collapse: collapse;
        /* width: 100%; */
        width: 88%;
        margin: auto;
        /* padding: 30px; */
    }

    tr:nth-child(even) {
        background-color: #e3edee;
    }

    th, td {
        border: 1px solid #dddddd;
        text-align: center;
        padding: 8px;
    }

    th{
        background-color: rgba(20, 95, 145, 0.609);;
    }

    .bwt{
        background-color: rgba(231, 207, 27, 0.904);
        color: black;
        cursor: pointer;
        text-align: center;
        padding: 7px 14px;
        border: none;
    }

/* #myevents {
    background-color: #da8a8a;
    margin-top: 10px;
    margin-bottom: 10px;
    border: solid #da8a8a;
} */

/* #eventSelect {
    margin: 50px;
    display: -webkit-flex;
} */

/* label {
    display: block;
} */


input {
    /* -webkit-flex: 1; */
    text-align: center;
}


</style>