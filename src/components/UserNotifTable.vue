<template>
    <table id="notifTable">
      <tr>
        <th>Details</th>
        <th>Action
          <!--
          <ul>
            <li id="events"><router-link to="/UserMyEvents"> View </router-link></li>
            <li id="acc"><router-link to="/UserAccount"> View </router-link></li>
          </ul>
          -->
        </th>
      </tr>
    </table><br><br>
</template>

<script>
import firebaseApp from '../firebase.js';
import { getFirestore } from 'firebase/firestore';
import { collection, getDocs} from 'firebase/firestore';
import { getAuth } from "firebase/auth";

const db = getFirestore(firebaseApp);

export default {
  name: 'UserNotifTable',

  mounted() {
    const auth = getAuth();
    const currUser = auth.currentUser.email;

    async function display(user) {
      let z = await getDocs(collection(db, String(user)))
      let ind = 1

      z.forEach((docs) => {
        let yy = docs.data()
        var detail = (yy.Detail)
        var category = (yy.Category) //Events, Message, Feedback

        var table = document.getElementById("notifTable")
        var row = table.insertRow(ind)
        var cell1 = row.insertCell(0) 
        var cell2 = row.insertCell(1)

        cell1.innerHTML = detail
        var bu = document.createElement("button")
        bu.class = "viewBtn"
        bu.innerHTML = "View"
        bu.onclick = function() {
           if (category == "Events") {
             this.$router.push('/UserMyEvents')
           } else if (category == "Message") {
             this.$router.push('/UserAccount')
           }
        }
        cell2.appendChild(bu)
      }); 
    }

    display(currUser);
  }
}
</script>

<style>

</style>