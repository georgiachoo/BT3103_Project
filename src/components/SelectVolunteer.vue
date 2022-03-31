<template>
  
   

    <!-- code for display table -->
    <div id = "oppDisplay">
        <table id= "table" class = "auto-index">
        <thead>
        <tr>
        <th>Notifications</th>
        <th>Option</th>
        <th>Manage</th>

        
        </tr>
        </thead>
    </table> <br><br>
    </div>

    <!-- code for modal + registration button -->
    

    <div id = "search_btn">
            <button v-on:click = "searchQuery()" style = "margin: 45px 10px 25px;">View Other users</button>
        </div>
    

</template>

<script>
import firebaseApp from '../firebase.js';
import { collection, getFirestore,doc, arrayUnion, arrayRemove } from "firebase/firestore";
import { getAuth, onAuthStateChanged } from "firebase/auth"; 
import { getDocs, getDoc, updateDoc} from "firebase/firestore"; //collection, getDoc, Timestamp, orderBy 
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
        //document.getElementsByClassName('closeBtn')[0].addEventListener('click', this.closeModal);

    },

    methods: {


        async displayAll() {
            // get all events posted by organisations
            // const postedEvents = query(collectionGroup(db, 'Posted Events'), orderBy('Date'), orderBy('Category'), orderBy('Location'), orderBy('Required_skills'));
            //const postedEvents = query(collectionGroup(db, 'Posted Events'));
            //const allEvents = await getDocs(postedEvents);
            
            //const orgRef = doc(db, "Organisations",String(this.user));
            
            const auth = getAuth();
            const currUser = auth.currentUser;
            console.log(currUser.email)
            this.user = currUser;
            const allEvents = await getDocs(collection(db,"Organisations",this.user.email,"Posted Events"));
            console.log(allEvents.length)
            // display in table and append button
            return this.displayTable(allEvents);
        },
        async getUserNameByEmailAndDisplayEachRow(email,ind,eventName) {
            var thisInstance = this; 
            var nameRef = await getDoc(doc(db,"Users",email));
            var name = nameRef.data().Name
            var table = document.getElementById("table");
            var row = table.insertRow(ind);
            var cell1 = row.insertCell(0);
            cell1.innerHTML = name + " signed up for " + eventName; 
            var cell2 = row.insertCell(1);
            var cell3 = row.insertCell(2);
             
            var bu = document.createElement("button");
            bu.className = "bwt";
            //bu.id = String(eName);
            bu.innerHTML = "View Profile";
            bu.onclick = function() {
                //thisInstance.displayModal(eName, eDesc, eCat, eLoc, eDate, eSkills, eDL, eNumV, eOrg,eOrgName);
            }
            cell2.appendChild(bu); 
            var bu2 = document.createElement("button");
            bu2.className = "bwt";
            //bu.id = String(eName);
            bu2.innerHTML = "Accept";
            bu2.onclick = function() {
                //thisInstance.displayModal(eName, eDesc, eCat, eLoc, eDate, eSkills, eDL, eNumV, eOrg,eOrgName);
                thisInstance.addToAcceptedArray(email,eventName)
                alert("Accepted " + name + " for " + eventName)
                thisInstance.removeFromAppliedArray(email,eventName)
                thisInstance.displayAll()
            }
            cell3.appendChild(bu2); 
            return

        },
        async addToAcceptedArray(email,eventName) {
            const thisEventRef = doc(db,"Organisations",this.user.email,"Posted Events",eventName);
            await updateDoc(thisEventRef, {
                Accepted_volunteers: arrayUnion(email)
            });
        },
        async removeFromAppliedArray(email,eventName) {
            const thisEventRef = doc(db,"Organisations",this.user.email,"Posted Events",eventName);
            await updateDoc(thisEventRef, {
                Applied_volunteers: arrayRemove(email)
            });
        },



        async displayTable(result) {
            // clear table first
            var table = document.getElementById("table");
            while (table.rows.length > 1) {
                table.deleteRow(1);
            }

            //var thisInstance = this; 
            
            //var auth = getAuth();
            //var currUser = auth.currentUser.email;
            //this.user = currUser;
            //console.log(this.user)

            let ind = 1;

            result.forEach((docs) => {
                let y = docs.data();

                console.log(y)
                
                
                var arrayLen = y.Applied_volunteers.length;
                //console.log(y.Applied_volunteers)
                //alert(arrayLen)
                if (arrayLen > 0) {
                    for (let i = 0;i < arrayLen;i++) {
                        console.log(y.Applied_volunteers[i])
                        this.getUserNameByEmailAndDisplayEachRow(y.Applied_volunteers[i],ind,y.Event_Name);
                        
                        
                        
                    }
                    ind += 1;

                }
                /*var row = table.insertRow(ind);

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
                */

                
            });
            return
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