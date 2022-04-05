<template>
 
    <Messages @notif = "messageNotif($event)" v-show="false"/>
    <p> {{title}} </p>

    <table id="notifTable">
      <tr>
        <th>Details</th>
        <th>Action</th>
      </tr>
    </table><br><br>
</template>

<script>
import firebaseApp from '../firebase.js';
import { getFirestore } from 'firebase/firestore';
import { collection, onSnapshot, query, where } from 'firebase/firestore';
import { getAuth, onAuthStateChanged } from "firebase/auth";
import router from '@/router';
import Messages from '@/components/Messages.vue';

const db = getFirestore(firebaseApp);

export default {
  name: 'UserNotifTable',

  data() {
    return {
      user: false,
      title: " "
    }
  },

  components: {
    Messages
  },

  methods: {
    messageNotif(x) {
      this.title = x;
    }
  },

  mounted() {
    const auth = getAuth();
    onAuthStateChanged(auth, (user) => {
      if (user) {
        this.user = user;
        
        var table = document.getElementById("notifTable");
        var ind = 1;

        const colSuccess = collection(db, "Users", user.email, "Registered events");
        const result = onSnapshot(colSuccess, (snapshot) => {
          snapshot.docChanges().forEach((change) => {
            var row = table.insertRow(ind);
            var cell1 = row.insertCell(0); 
            var cell2 = row.insertCell(1);
            cell1.innerHTML = "Successfully registered for " + change.doc.data().Event_Name;
            ind += 1;

            var bu = document.createElement("button");
            bu.className = "viewBtn";
            bu.innerHTML = "View";
            bu.onclick = function(ind) {
              router.push({name: 'UserMyEvents'});
              var rows = document.getElementById("notifTable").getElementsByTagName('tr');
              rows[ind].style.backgroundColor = "white";
            }
            cell2.appendChild(bu);
          });
          console.log(result);
          console.log("Retrieved registered events");
        });
        
        const q = query(collection(db, "Users", user.email, "Completed events"), where("Feedback_Completed", "==", false));
        const result1 = onSnapshot(q, (snapshot) => {
          snapshot.forEach((doc) => {
            var row = table.insertRow(ind);
            var cell1 = row.insertCell(0); 
            var cell2 = row.insertCell(1);
            cell1.innerHTML = "Leave feedback for " + doc.data().Event_Name;
            ind += 1;

            var bu = document.createElement("button");
            bu.className = "viewBtn";
            bu.innerHTML = "View";
            bu.onclick = function(ind) {
              router.push({name: 'UserMyEvents'});
              var rows = document.getElementById("notifTable").getElementsByTagName('tr');
              rows[ind].style.backgroundColor = "white";
            }
            cell2.appendChild(bu);
          });
          console.log(result1);
          console.log("Retrieved completed events");
        });
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
    margin-left: auto;
    background-color: rgb(149, 184, 217);
}

th,td {
    border: 1px solid #dddddd;
    text-align: center;
    padding: 8px;
}

th{
  background-color: rgba(20, 95, 145, 0.609);;
}

.viewBtn{
  color: rgba(231, 207, 27, 0.904);
  cursor: pointer;
  text-align: center;
  padding: 7px 14px;
  border: none;
}
</style>