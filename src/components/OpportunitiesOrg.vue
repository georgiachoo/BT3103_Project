<template>
    <div id = "fields">
        <div id = "field1">
        <label for="category">Category:</label>
        <input list="category" id="category-label" name="category-label" placeholder="Select All"/>
        <datalist id="category">
            <option value="Animals">Animals</option>
            <option value="Arts/Culture">Arts/Culture</option>
            <option value="Education">Education</option>
            <option value="Environment">Environment</option>
        </datalist>
        </div>

        <div id = "field2">
        <label for="location">Location:</label>
        <input list="location" id="location-label" name="location-label" placeholder="Select All" />
        <datalist id="location">
            <option value="North">North</option>
            <option value="South">South</option>
            <option value="East">East</option>
            <option value="West">West</option>
        </datalist>
        </div>

        <div id = "field3">
            <div id = "start_d">
                <label for="startDate">Start Date: </label>
                <input type="date" id = "startDate"> 
            </div>
            <div id = "end_d">
                <label for="endDate">End Date: </label>
                <input type="date" id = "endDate">
            </div>
        </div>

        <div id = "field4">
        <label for="Organisation Name">Organisation Name:</label>
        <input type="text" id="orgName-label" name="orgName-label" placeholder="Enter Name" />
        </div>

        
        

        <div id = "search_btn">
            <button v-on:click = "searchQuery()" style = "margin: 45px 10px 25px;">Search</button>
        </div>


    </div>

    <br><br><br>

    <!-- code for display table -->
    <div id = "oppDisplay">
        <table id= "table" class = "auto-index">
        <thead>
        <tr>
        <th>Event Name</th>
        <th>Category</th>
        <th>Location</th>
        <th>Date</th>
        <th>Organisation Name</th>
        <th>Options</th>
        </tr>
        </thead>
    </table> <br><br>
    </div>

    <!-- code for modal + registration button -->
    <div id = "eventModal" class = "modal">
        <div class = "modal-content">
            <span class = "closeBtn" >&times;</span>
            <h2> {{ eventName }} </h2>

            <p> <strong>Organisation Name:</strong> {{ orgName }} </p>
            <p> <strong>Description:</strong> {{ eventDescription }} </p>
            <p> <strong>Category:</strong> {{ eventCategory }} </p>
            <p> <strong>Location:</strong> {{ eventLocation }} </p>
            <p> <strong>Date:</strong> {{ eventDate }} </p>
            <p> <strong>Required Skills:</strong> {{ eventSkills }} </p>
            <p> <strong>Number of Volunteers required:</strong> {{ eventNumV }} </p>
            <p> <strong>Deadline of sign up:</strong> {{ eventDL }} </p>
        
        </div>

    </div>
    

</template>

<script>
import firebaseApp from '../firebase.js';
import { getFirestore } from "firebase/firestore";
import { getAuth, onAuthStateChanged } from "firebase/auth"; 
import { getDocs, query, where, collectionGroup} from "firebase/firestore"; //collection, getDoc, Timestamp, orderBy 
// import router from '@/router';
const db = getFirestore(firebaseApp);




export default {
    data () {
      return {
          user: false,
          eventName: 'name',
          eventDescription: 'description',
          eventCategory: 'category',
          eventLocation: 'location',
          eventDate: 'date',
          eventSkills: 'skills',
          eventDL: 'deadLine',
          eventNumV: 'numVol',
          eventOrg: 'organisation',
          orgName:"organisationName"
      }
    },

    mounted() {

        const auth = getAuth();
        onAuthStateChanged(auth, (user) => {
        if (user) {
            this.user = user;
        }
        });

        // display all events initially
        this.displayAll(); 

        // add event listerner to close button in modal
        document.getElementsByClassName('closeBtn')[0].addEventListener('click', this.closeModal);

    },

    methods: {

        changeValue(name, description, category, location, date, skills, dl, numVol, org, orgName) {
            this.orgName = orgName;
            this.eventName = name;
            this.eventDescription = description;
            this.eventCategory = category;
            this.eventLocation = location;
            this.eventDate = date;
            this.eventSkills = skills;
            this.eventDL = dl;
            this.eventNumV = numVol;
            this.eventOrg = org;
        },

        async displayAll() {
            // get all events posted by organisations
            // const postedEvents = query(collectionGroup(db, 'Posted Events'), orderBy('Date'), orderBy('Category'), orderBy('Location'), orderBy('Required_skills'));
            const postedEvents = query(collectionGroup(db, 'Posted Events'));
            const allEvents = await getDocs(postedEvents);

            // display in table and append button
            return this.displayTable(allEvents);
        },

        async displayTable(result) {
            // clear table first
            var table = document.getElementById("table");
            while (table.rows.length > 1) {
                table.deleteRow(1);
            }

            var thisInstance = this; 

            var auth = getAuth();
            var currUser = auth.currentUser.email;
            this.user = currUser;
            console.log(this.user)

            let ind = 1;

            result.forEach((docs) => {
                let y = docs.data();

                console.log(y)
                
                var table = document.getElementById("table");
                var row = table.insertRow(ind);

                var eName = (y.Event_Name);
                console.log(y.Date)
                var eDate = ((y.Date).toDate()).toDateString();
                var eLoc = (y.Location);
                var eCat = (y.Category);
                var eOrgName = (y.Organisation_Name);
                var eSkills = (y.Required_skills);
                


                // variables to be displayed when user clicks on view (to be passed to displayModal)
                var eDesc = (y.Description);
                var eDL = ((y.Deadline_of_sign_up).toDate()).toDateString();
                var eNumV = (y.Number_of_volunteers_needed);
                var eOrg = (y.Org_Email);


                var cell1 = row.insertCell(0); var cell2 = row.insertCell(1); var cell3 = row.insertCell(2);
                var cell4 = row.insertCell(3); var cell5 = row.insertCell(4); var cell6 = row.insertCell(5);

                cell1.innerHTML = eName; cell2.innerHTML = eCat; cell3.innerHTML = eLoc; 
                cell4.innerHTML = eDate; cell5.innerHTML = eOrgName;

                var bu = document.createElement("button");
                bu.className = "bwt";
                bu.id = String(eName);

                bu.innerHTML = "View";
                bu.onclick = function() {
                    thisInstance.displayModal(eName, eDesc, eCat, eLoc, eDate, eSkills, eDL, eNumV, eOrg,eOrgName);
                }
                cell6.appendChild(bu);

                ind += 1;
            });
            return
        },

        displayModal(name, description, category, location, date, skills, dl, numV, orgEmail,orgName) {
            // get event info as arguments from displayTable (or query)

            // update mustache values
            this.changeValue(name, description, category, location, date, skills, dl, numV, orgEmail,orgName);


            // make modal visible
            this.openModal();
        },


        openModal() {
            var modal = document.getElementById('eventModal');
            modal.style.display = "block";
        },


        closeModal() {
            var modal = document.getElementById('eventModal');
            modal.style.display = 'none';
        },


        async searchQuery() {

            // call getX functions to get selected values
            var s_cat = this.getCategory();
            var s_loc = this.getLocation();
            var s_orgName = this.getOrgName();
            var s_dates = this.getDates();
            var s_fields = ['Category', 'Location', 'Organisation_Name'];
            var selected = [s_cat, s_loc, s_orgName];
            const filters = []

            // for loop to create and append where queries
            for (let i = 0; i < s_fields.length; i++) {
                if (selected[i] !== '') {
                    console.log("selected")
                    console.log(s_fields[i])
                    console.log(selected[i])
                    filters.push(where(s_fields[i], '==', selected[i]))
                }
            }

            if (s_dates[0] !== 0) {
                var s = new Date(s_dates[0]);
                console.log("s: ",s)
                s.setHours(s.getHours() - 8);
                console.log("s: ",s)
                // Timestamp.fromDate(s)
                filters.push(where('Date', '>=' , s))
            }
            if (s_dates[1] !== 0) {
                var e = new Date(s_dates[1]);
                console.log("e: ", e)
                e.setHours(e.getHours() + 8);
                console.log("e: ", e)
                filters.push(where('Date', '<=' , e))
            }

            // get query result
            console.log(filters);
            const sQuery = query(collectionGroup(db, 'Posted Events'), ...filters);
            const result = await getDocs(sQuery);


            // test date query
            // const dateQuery = query(collection(db, "Organisations", 'testperson@gmail.com', 'Posted Events'), where('Date', '>=', dd));
            // const dateQuery = query(collection(db, "Organisations", 'testperson@gmail.com', 'Posted Events'), where('Date', '<=', e));
            // const result = await getDocs(dateQuery)

            return this.displayTable(result);
        },


        getCategory() {
            let selected_c = document.getElementById("category-label").value;
            console.log(selected_c);
            // console.log(selected_c == "");
            return selected_c;
        },

        getLocation() {
            let selected_l = document.getElementById("location-label").value;
            console.log(selected_l)
            return selected_l;
        },

        getDates() {
            let start_date = document.getElementById("startDate").value;
            let end_date = document.getElementById("endDate").value;

            if (start_date == '') {
                start_date = 0;
            }
            if (end_date == '') {
                end_date = 0;
            }
            console.log([start_date, end_date])
            return [start_date, end_date];
        },

        getOrgName() {
            let selected_orgName = document.getElementById("orgName-label").value;
            console.log(selected_orgName)
            return selected_orgName;
        },

    }
}
</script>

<style scoped>

    #field1, #field2, #start_d, #end_d, #field4 {
        /* display: block; */
        display: flex;
        flex-direction: column;
    }

    #fields {
        display:flex; 
        flex-direction: row; 
        justify-content: space-evenly; 
        margin-right: 15px;
        margin-left: 15px;
        align-items: center;
    }


    /* css for the dates */
    input[type="date"] {
        color: #95a5a6;
        font-family: "Helvetica", arial, sans-serif;
        border:1px solid #cccecf;
        background:#ecf0f1;
    }

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

    .modal {
        display: none;
        position: fixed;
        z-index: 1;
        left: 0;
        top: 0;
        height: 100%;
        width: 100%;
        overflow: auto;
        background-color: rgba(0, 0, 0, 0.5);
    }

    .modal-content {
        background-color: #f4f4f4;
        margin: 20% auto;
        padding: 20px;
        width: 70%;
    }

    .closeBtn {
        color: #ccc;
        float: right;
        font-size: 30px;
    }

    .closeBtn:hover,.closeBtn:focus{
        color: #000;
        text-decoration: none;
        cursor: pointer;
    }

</style>