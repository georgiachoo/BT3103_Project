<template>

    <!-- Menu to select Ongoing or Completed events -->
    <div id = "eventSelect">
        <input list="event" id="event-id" oninput="onSelect()" placeholder="Select Events"/>
        <datalist id="event">
            <option value="Ongoing Events">Ongoing Events</option>
            <option value="Completed Events">Completed Events</option>
        </datalist>
    </div>
    <br><br><br><br>

    <!-- Table to display ongoing or completed events -->
    <div id = "eventDisplay">
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
import { getAuth } from 'firebase/auth';
import { collection, getDocs } from "firebase/firestore";
const db = getFirestore(firebaseApp);

export default {


    methods: {


        async onSelect() {      // mount ? 

            const auth = getAuth();
            var currUser = auth.currentUser.email;

            // retrieve input from user
            var selectedEvent = document.getElementById('event-id').value;
            console.log(selectedEvent);

            let z = await getDocs(collection(db, String(currUser)));

            z.forEach((docs) => {
                let yy = docs.data()

                var arrayOfEvents = []
                if (selectedEvent === "Ongoing Events") {
                    arrayOfEvents = (yy.ongoing);
                } else if (selectedEvent === "Completed Events") {
                    arrayOfEvents = (yy.completed);
                } else {
                    return;
                }

                // if array is empty, return.
                if (arrayOfEvents.length === 0) {
                    return;
                }

                let ind = 1
                
                arrayOfEvents.forEach((event) => {
                    // let yy = docs.data()
                    var table = document.getElementById("table")
                    var row = table.insertRow(ind)

                    var eName = (event.Event_Name)
                    var eDescription = (event.Description)
                    var eDate = (event.Date)
                    var eLoc = (event.Location)
                    var eCat = (event.Category)
                    var eSkills = (event.Required_skills)

                    var cell1 = row.insertCell(0); var cell2 = row.insertCell(1); var cell3 = row.insertCell(2);
                    var cell4 = row.insertCell(3); var cell5 = row.insertCell(4); var cell6 = row.insertCell(5);
                    // var cell7 = row.insertCell(6);

                    cell1.innerHTML = eName; cell2.innerHTML = eDescription; cell3.innerHTML = eDate; cell4.innerHTML = eLoc; cell5.innerHTML = eCat;
                    cell6.innerHTML = eSkills; 
                    // cell7.innerHTML = 0;


                    // need additional attribute to indicate whether user has completed feedback form !!!
                    if (selectedEvent === "Completed") {
                        var bu = document.createElement("button");
                        bu.className = "bwt";
                        bu.id = String(eName);

                        // if (user has already completed feedback form for this event) {
                        //     this.disableButton(eName)
                        // } else innerHTML == leaveFeedback ... {
                        // }

                        bu.innerHTML = "Leave Feedback";
                        bu.onclick = function() {
                            this.disableButton(eName);
                            this.leaveFeedback(currUser, eName);
                        }
                        cell7.appendChild(bu);

                    } else {
                        var cell7 = row.insertCell(6);
                        cell7.innerHTML = "";
                    }

                    ind += 1
                })    
            })
            return;
        },

        // go to feedback form page
        async leaveFeedback(currUser, eName) {
            console.log("feedback function");
            // how to access feedback form?
            return currUser, eName
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
        width: 100%;
        padding: 30px;
    }

    tr:nth-child(even) {
        background-color: #e3edee;
    }

    th, td {
        border: 1px, solid #dddddd;
        text-align: center;
        padding: 8px;
    }

    /* .bwt {
        color: rgb(243, 236, 236);
        background-color: rgb(255, 94, 0);
    } */

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

input {
    /* -webkit-flex: 1; */
    text-align: center;
}


</style>