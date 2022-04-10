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
  

    <div id = "search_btn">
            <button id="usersBtn" v-on:click = "displayModalOtherUsers()" style = "margin: 45px 10px 25px;">View Other users</button>
    </div>

    <div id = "eventModal" class = "modal">
         <div class = "modal-content">
             <span class = "closeBtn" >&times;</span>
             <h2> {{ name }} </h2>

             <p> <strong>Email:</strong> {{ email }} </p>
             <p> <strong>Age:</strong> {{ age }} </p>
             <p> <strong>Gender:</strong> {{ gender }} </p>
             <p> <strong>Certifications:</strong> {{ certifi }} </p>
             <p> <strong>Experience:</strong> {{ exper }} </p>
             <p> <strong>Interests:</strong> {{ interests }} </p>
             <p> <strong>Skills:</strong> {{ skills }} </p>
             <p> <strong>Introduction:</strong> {{ intro }} </p>
             <button  style = "margin: 45px 10px 25px;" v-on:click="msg(email)">Message</button>

         </div>

     </div>

     <div id = "eventModalOtherUsers" class = "modalOtherUsers">
         <div class = "modal-contentOtherUsers">
             <span class = "closeBtnOtherUsers" >&times;</span>
             <h1>Users Profiles</h1>
             <table id= "otherUsersTable" class = "auto-index">
        <thead>
        </thead>
    </table>

         </div>
     </div>

</template>

<script>
import firebaseApp from '../firebase.js';
import { collection, getFirestore,doc, arrayUnion, arrayRemove } from "firebase/firestore";
import { getAuth, onAuthStateChanged } from "firebase/auth"; 
import { getDocs, getDoc, updateDoc, deleteDoc, setDoc } from "firebase/firestore";
import router from '@/router';

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
          orgName:"organisationName",
          age: 'a',
          certifi: 'c',
          userEmail: 'u',
          exper: 'e',
          gender: 'g',
          interests: 'i',
          intro: 'i',
          name: 'n',
          skills: 's',
          oldCustomers: new Array(),
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
        document.getElementsByClassName('closeBtnOtherUsers')[0].addEventListener('click', this.closeModalOtherUsers);

    },

    methods: {

        msg(email) {
            let userEmail = email
            console.log(userEmail)
            router.push({name:"OrgMessages", params:{otherID: userEmail}});
        },

        async displayAll() {
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
            var name = nameRef.data().Name;
            var age = nameRef.data().Age;
            var certifi = nameRef.data().Certifications;
            var exper = nameRef.data().Experience;
            var gender = nameRef.data().Gender;
            var interests = nameRef.data().Interests;
            var intro = nameRef.data().Introduction;
            var skills = nameRef.data().Skills;
            var table = document.getElementById("table");
            var row = table.insertRow(ind);
            var cell1 = row.insertCell(0);
            cell1.innerHTML = name + " signed up for " + eventName; 
            var cell2 = row.insertCell(1);
            var cell3 = row.insertCell(2);
             
            var bu = document.createElement("button");
            bu.className = "bwt";
            bu.innerHTML = "View Profile";
            bu.style.backgroundColor = "rgba(231, 207, 27, 0.904)"
            bu.style.cursor = "pointer"
            bu.style.borderColor = "rgba(231, 207, 27, 0.904)"
            bu.style.textAlign = "center"
            bu.style.padding = "5px 14px"
            bu.onclick = function() {
                thisInstance.displayModal(age,certifi,email,exper,gender,interests,intro,name,skills);
            }
            
            cell2.appendChild(bu); 
            var bu2 = document.createElement("button");
            bu2.className = "bwt";
            bu2.innerHTML = "Accept";
            bu2.style.backgroundColor = "rgba(231, 207, 27, 0.904)"
            bu2.style.cursor = "pointer"
            bu2.style.borderColor = "rgba(231, 207, 27, 0.904)"
            bu2.style.textAlign = "center"
            bu2.style.padding = "5px 14px"
            bu2.onclick = function() {
                thisInstance.addToAcceptedArray(email,eventName)
                alert("Accepted " + name + " for " + eventName)
                thisInstance.removeFromAppliedArray(email,eventName)
                thisInstance.displayAll()
                thisInstance.updateUserSide(email, eventName);
            }
            cell3.appendChild(bu2); 
            this.oldCustomers.push(email)
            console.log(this.oldCustomers)
            
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

        async updateUserSide(userEmail, eventName) {
            await deleteDoc(doc(db, "Users", userEmail, "Applied Events", eventName));
            const docRef = doc(db, "Organisations", this.user.email, "Posted Events", eventName);
            const docSnap = await getDoc(docRef);
            await setDoc(doc(db, "Users", userEmail, "Registered Events", eventName), {
                "Category": docSnap.data().Category,
                "Date": docSnap.data().Date,
                "Deadline_of_sign_up": docSnap.data().Deadline_of_sign_up,
                "Description": docSnap.data().Description,
                "Event_Name": eventName,
                "Location": docSnap.data().Location,
                "Number_of_volunteers_needed": docSnap.data().Number_of_volunteers_needed,
                "Organisation_Name": docSnap.data().Organisation_Name,
                "Org_Email": this.user.email,
                "Required_skills": docSnap.data().Required_skills,
                "Feedback_Completed": false
            })
            await setDoc(doc(db, "Users", userEmail, "Newly Registered", eventName), {
                "Event_Name": eventName,
                 "Organisation_Name": docSnap.data().Organisation_Name
            })
        },

        async displayTable(result) {
            // clear table first
            var table = document.getElementById("table");
            while (table.rows.length > 1) {
                table.deleteRow(1);
            }
            let ind = 1;

            result.forEach((docs) => {
                let y = docs.data();
                console.log(y)         
                var arrayLen = y.Applied_volunteers.length;

                if (arrayLen > 0) {
                    for (let i = 0;i < arrayLen;i++) {
                        console.log(y.Applied_volunteers[i])
                        this.getUserNameByEmailAndDisplayEachRow(y.Applied_volunteers[i],ind,y.Event_Name);
                        }
                    ind += 1;
                }  
            });
            return
        },

        changeValue(age,certifi,email,exper,gender,interests,intro,name,skills) {
            this.name = name;
            this.age = age;
            this.certifi = certifi;
            this.exper = exper;
            this.gender = gender;
            this.interests = interests;
            this.intro = intro;
            this.skills = skills;
            this.email = email;
         },

         displayModal(age,certifi,email,exper,gender,interests,intro,name,skills) {
             // get event info as arguments from displayTable (or query)

             // update mustache values
             this.changeValue(age,certifi,email,exper,gender,interests,intro,name,skills);

             console.log("display")
             // make modal visible
             this.openModal();
         },

         async displayModalOtherUsers() {
            // get event info as arguments from displayTable (or query)

            // update mustache values
            const allUsers = await getDocs(collection(db,"Users"));
            var table = document.getElementById("otherUsersTable");
            while (table.rows.length > 0) {
                table.deleteRow(0);
            }
            let ind = 0;
           

            allUsers.forEach((docs) => {
                var y = docs.data();
                var name = y.Name;
                var intro = y.Introduction;
                var email = docs.id;
                if(!this.oldCustomers.includes(email)) {
                    this.otherUsersRow(name,intro,ind,email);
                    ind += 1;
                }
               
                
            });

             console.log("display")
             // make modal visible
             this.openModalOtherUsers();
         },

         async otherUsersRow(name,intro,ind,email) {
            var table = document.getElementById("otherUsersTable");
            var row = table.insertRow(ind);
            var cell1 = row.insertCell(0);
            var twoLines = document.createElement("table")
            var nameLine = twoLines.insertRow(0);
            var nameCell = nameLine.insertCell(0);
            nameCell.innerHTML = name;
            nameCell.style.font = "bold 18px arial,serif"
            nameCell.style.textAlign = "left"
            var introLine = twoLines.insertRow(1);
            var introCell = introLine.insertCell(0);
            introCell.innerHTML = intro;
            cell1.appendChild(twoLines)
            var cell2 = row.insertCell(1);
            var bu = document.createElement("button");
            bu.className = "bwt";
            bu.innerHTML = "Message";
            bu.style.backgroundColor = "rgba(231, 207, 27, 0.904)"
            bu.style.cursor = "pointer"
            bu.style.borderColor = "rgba(231, 207, 27, 0.904)"
            bu.style.textAlign = "center"
            bu.style.padding = "5px 14px"
            bu.onclick = function() {
                let userEmail = email;
                console.log(userEmail)
                router.push({name:"OrgMessages", params:{otherID: userEmail}});
            }
            cell2.appendChild(bu); 
         },


         openModal() {
             var modal = document.getElementById('eventModal');
             modal.style.display = "block";
         },


         closeModal() {
             var modal = document.getElementById('eventModal');
             modal.style.display = 'none';
         },

         openModalOtherUsers() {
             var modal = document.getElementById('eventModalOtherUsers');
             modal.style.display = "block";
         },


         closeModalOtherUsers() {
             var modal = document.getElementById('eventModalOtherUsers');
             modal.style.display = 'none';
         },
    }
}
</script>

<style scoped>

    #field1, #field2, #start_d, #end_d, #field4 {
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
        width: 88%;
        margin: auto;
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
        background-color: rgba(20, 95, 145, 0.609);
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

    .modalOtherUsers {
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

    .modal-contentOtherUsers {
        background-color: #f4f4f4;
        margin: 20% auto;
        padding: 10px;
        width: 90%;
    }

    .closeBtnOtherUsers {
        color: #ccc;
        float: right;
        font-size: 30px;
    }

    .closeBtnOtherUsers:hover,.closeBtnOtherUsers:focus{
        color: #000;
        text-decoration: none;
        cursor: pointer;
    }
    #usersBtn {
        background-color: rgba(20, 95, 145, 0.609);
        cursor: pointer;
        text-align: center;
        padding: 5px 14px;
    }

</style>