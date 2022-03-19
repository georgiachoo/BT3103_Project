<template>
    <h1>Opportunities</h1>

    <br>

    <div id = "container">
        <div id = "field1">
        <label for="category">Category:</label>
        <input list="category" id="category-label" name="category-label" placeholder="Select All"/>
        <datalist id="category">
            <!-- <option value="Select All">Select All</option> -->
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
            <!-- <option value="Select All">Select All</option> -->
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
            <!-- <option value="Select All">Select All</option> -->
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

</template>


<script>
import firebaseApp from '../firebase.js';
import { getFirestore } from "firebase/firestore";
const db = getFirestore(firebaseApp);


export default {
    data () {
      return {}
    },

    mounted() {

        // display all events initially
        async function display() {
            // get all organisations' collections
            // loop through each organisation's collection to get all events posted
            // for each event, get event details and put in table/list
            // make each event clickable
        }
        display();
    },

    methods: {
        searchQuery() {

            // call getX functions to get selected values
            var s_cat = this.getCategory();
            var s_loc = this.getLocation();
            var s_skill = this.getSkill();
            var s_dates = this.getDates();
            var s_fields = ['category', 'location', 'skill'];
            var selected = [s_cat, s_loc, s_skill];

            var sQuery = db.collection('event');
            // for loop to create and append where queries
            for (let i = 0; i < s_fields.length; i++) {
                if (selected[i] != '') {
                    sQuery = sQuery.where(s_fields[i], '==', selected[i]);
                }
            }

            if (s_dates[0] != "") {
                sQuery = sQuery.where('Date', '>=' , s_dates[0])
            }
            if (s_dates[1] != "") {
                sQuery = sQuery.where('Date', '<=' , s_dates[1])
            }


            // query, get and display results (need to write another function)
            // functiontodisplayresults(sQuery)

            sQuery.get().then((querySnapshot) => {
                querySnapshot.forEach((doc) => {
                    console.log(doc.data());
                });
            });

            return;
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

    #container {
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

</style>