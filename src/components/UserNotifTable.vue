<template>
    <div style="overflow: scroll; height: 300px; width: 100%; overflow: auto">
    <table id="notifTable">
      <tr>
        <th>Details</th>
        <th>Action</th>
      </tr>
    </table><br><br>
    </div>
</template>

<script>
import firebaseApp from '../firebase.js';
import router from '@/router';
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { getFirestore, collection, query, where, doc, updateDoc, onSnapshot } from 'firebase/firestore';

const db = getFirestore(firebaseApp);

export default {
  name: 'UserNotifTable',

  data() {
    return {
      user: false,
      title: ""
    }
  },

  methods: {

    async updatefs(userEmail, eventName) {
      const docRef = await updateDoc(doc(db, "Users", userEmail, "Registered Events", eventName), 
                          {"Newly_Registered": false});
      console.log(docRef);
    },

    getRegistered(table, email, ind) {
      var thisInstance = this; 
      const q = query(collection(db, "Users", email, "Registered Events"), where("Newly_Registered", "==", true));
      const result = onSnapshot(q, (snapshot) => {
        snapshot.docChanges().forEach((change) => {
          var row = table.insertRow(ind);
          var cell1 = row.insertCell(0); 
          var cell2 = row.insertCell(1);
          cell1.innerHTML = "Successfully registered for " + change.doc.data().Event_Name + 
                            " with " + change.doc.data().Organisation
          ind += 1

          var bu = document.createElement("button");
          bu.className = "viewBtn"
          bu.innerHTML = "View"
          bu.style.backgroundColor = "rgba(231, 207, 27, 0.904)"
          bu.style.cursor = "pointer"
          bu.style.borderColor = "rgba(231, 207, 27, 0.904)"
          bu.style.textAlign = "center"
          bu.style.padding = "5px 14px"
         
          bu.onclick = function() {
            router.push({name: 'UserMyEvents'});
            thisInstance.updatefs(email, change.doc.data().Event_Name);
          }
          cell2.appendChild(bu);

          console.log(result);
          console.log("Retrieved registered events");
        });
      });
    },

    getCompleted(table, email, ind) {
      const q1 = query(collection(db, "Users", email, "Completed Events"), where("Feedback_Completed", "==", false));
      const result1 = onSnapshot(q1, (snapshot) => {
        snapshot.forEach((doc) => {
          var row = table.insertRow(ind);
          var cell1 = row.insertCell(0); 
          var cell2 = row.insertCell(1);
          cell1.innerHTML = "Leave feedback for " + doc.data().Event_Name
          ind += 1;

          var bu = document.createElement("button");
          bu.className = "viewBtn"
          bu.innerHTML = "View"
          bu.style.backgroundColor = "rgba(231, 207, 27, 0.904)"
          bu.style.cursor = "pointer"
          bu.style.borderColor = "rgba(231, 207, 27, 0.904)"
          bu.style.textAlign = "center"
          bu.style.padding = "5px 14px"

          bu.onclick = function() {
            router.push({name: 'UserMyEvents'});
          }
          cell2.appendChild(bu);
        });
        console.log(result1);
        console.log("Retrieved completed events");
      });
    }, 
  },

  mounted() {
    const auth = getAuth();
    onAuthStateChanged(auth, async (user) => {
      if (user) {
        this.user = user;
        var table = document.getElementById("notifTable");
        var ind = 1;

        this.getRegistered(table, user.email, ind);
        this.getCompleted(table, user.email, ind);

      } else {
        console.log("No user logged in");
      }
    });
  }
}
</script>

<style scoped>
table {
    font-family: arial, sans-serif;
    border-collapse: collapse;
    width: 88%;
    margin: auto;
}

th,td {
    border: 1px solid #f0f3f3;
    text-align: center;
    padding: 8px;
}

th{
  background-color: rgba(20, 95, 145, 0.609);;
}

</style>
