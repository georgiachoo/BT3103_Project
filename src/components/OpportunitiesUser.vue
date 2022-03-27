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
        <label for="skill-label">Skills:</label>
        <input list="skill" id="skill-label" name="skill-label" placeholder="Select All" />
        <datalist id="skill">
            <option value="All Skills">All Skills</option>
            <option value="Communication">Communication</option>
            <option value="IT/Technology">IT/Technology</option>
            <option value="Admin">Admin</option>
        </datalist>
        </div>

        <div id = "search_btn">
            <button v-on:click = "searchQuery()" style = "margin: 45px 10px 25px;">Search</button>
        </div>


    </div>

    <br><br><br><br>

    <!-- code for display table -->
    <div id = "oppDisplay">
        <table id= "table" class = "auto-index">
        <tr>
        <th>Event Name</th>
        <th>Date</th>
        <th>Location</th>
        <th>Category</th>
        <th>Required Skills</th>
        <th>Options</th>
        </tr>
    </table> <br><br>
    </div>

    <!-- code for modal + registration button -->
    <div id = "eventModal" class = "modal">
        <div class = "modal-content">
            <span class = "closeBtn" >&times;</span>
            <h2> {{ eventName }} </h2>
            
            <p> <strong>Description:</strong> {{ eventDescription }} </p>
            <p> <strong>Category:</strong> {{ eventCategory }} </p>
            <p> <strong>Location:</strong> {{ eventLocation }} </p>
            <p> <strong>Date:</strong> {{ eventDate }} </p>
            <p> <strong>Required Skills:</strong> {{ eventSkills }} </p>
        
            <button v-on:click = "register()">Register</button>
        
        </div>

    </div>
    

</template>


<script>
import firebaseApp from '../firebase.js';
import { getFirestore } from "firebase/firestore";
import { collection, getDocs, query, where } from "firebase/firestore";
const db = getFirestore(firebaseApp);


export default {
    data () {
      return {
          eventName: 'name',
          eventDescription: 'description',
          eventCategory: 'category',
          eventLocation: 'location',
          eventDate: 'date',
          eventSkills: 'skills'
      }
    },

    mounted() {

        // display all events initially
        async function displayAll() {
            // get all organisations' collections
            // loop through each organisation's collection to get all events posted
            // for each event, get event details and put in table/list
            // make each event clickable
        }
        displayAll();

        document.getElementsByClassName('closeBtn')[0].addEventListener('click', this.closeModal);

    },

    methods: {

        changeValue(name, description, category, location, date, skills) {
            this.eventName = name;
            this. eventDescription = description;
            this. eventCategory = category;
            this.eventLocation = location;
            this.eventDate = date;
            this.eventSkills = skills;
        },

        displayTable(result) {
            result.forEach((docs) => {
                let y = docs.data()
                console.log(y)

                var eName = y.Event_Name

                // button.onclick = function () {
                    this.displayModal(eName)
                // }

            });
  
        },

        displayModal(name) {
            // query (get details of event)
            console.log(name);
            // this.changeValue(name, description, category, location, date, skills);
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


        register() {
            console.log('registering')
        },


        async searchQuery() {

            // call getX functions to get selected values
            var s_cat = this.getCategory();
            var s_loc = this.getLocation();
            var s_skill = this.getSkill();
            var s_dates = this.getDates();

            var s_fields = ['category', 'location', 'skill'];
            var selected = [s_cat, s_loc, s_skill];
            const filters = []

            // for loop to create and append where queries
            for (let i = 0; i < s_fields.length; i++) {
                if (selected[i] !== '') {
                    filters.push(where(s_fields[i], '==', selected[i]))
                }
            }

            if (s_dates[0] !== "") {
                filters.push(where('Date', '>=' , s_dates[0]))
            }
            if (s_dates[1] !== "") {
                filters.push(where('Date', '<=' , s_dates[1]))
            }

            // need to figure out how to query across collections of organisations
            // query, get and display results (in another function)
            const sQuery = query(collection(db, 'events'), ...filters)
            const result = await getDocs(sQuery)

            return this.displayTable(result)
        },


        getCategory() {
            let selected_c = document.getElementById("category-label").value;
            console.log(selected_c);
            console.log(selected_c == "");
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

        getSkill() {
            let selected_s = document.getElementById("skill-label").value;
            console.log(selected_s)
            return selected_s;
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

    .modal {
        /*display: none;*/
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