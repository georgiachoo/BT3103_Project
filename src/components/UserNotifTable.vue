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
import { getFirestore, collection, doc, deleteDoc, getDocs } from 'firebase/firestore';

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

    async deleteReg(userEmail, eventName) {
      await deleteDoc(doc(db, "Users", userEmail, "Newly Registered", eventName));
    },

    async deleteCom(userEmail, eventName) {
      await deleteDoc(doc(db, "Users", userEmail, "Newly Completed", eventName));
    },

    async getRegistered(table, email, ind) {
      const thisInstance = this;
      const allEvents = await getDocs(collection(db, "Users", email, "Newly Registered"));

      allEvents.forEach((doc) => {
        var row = table.insertRow(ind);
        var cell1 = row.insertCell(0); 
        var cell2 = row.insertCell(1);
        cell1.innerHTML = "Successfully registered for " + doc.data().Event_Name + 
                          " with " + doc.data().Organisation_Name
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
        }
        cell2.appendChild(bu);
        thisInstance.deleteReg(email, doc.data().Event_Name);
      });

      console.log("Retrieved registered events");
    },

    async getCompleted(table, email, ind) {
      var thisInstance = this; 
      const allEvents = await getDocs(collection(db, "Users", email, "Newly Completed"));

      allEvents.forEach((doc) => {
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
        thisInstance.deleteCom(email, doc.data().Event_Name);
      });
      console.log("Retrieved completed events");
    }

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
  background-color: rgba(20, 95, 145, 0.609);
}

</style>
