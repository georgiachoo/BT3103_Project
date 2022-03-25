<template>
    <table id="notifTable">
      <tr>
        <th>Details</th>
        <th>Action</th>
      </tr>
    </table><br><br>
</template>

<script>
//import firebaseApp from '../firebase.js';
//import { getFirestore } from 'firebase/firestore';
//import { collection, getDocs} from 'firebase/firestore';
//import { getAuth } from "firebase/auth";
import router from '@/router';

//const db = getFirestore(firebaseApp);

export default {
  name: 'UserNotifTable',

  mounted() {

        var table = document.getElementById("notifTable")
        var row = table.insertRow(1)
        var cell1 = row.insertCell(0) 
        var cell2 = row.insertCell(1)

        cell1.innerHTML = '[Org name] sent you a message'
        var bu = document.createElement("button")
        bu.class = "viewBtn"
        bu.innerHTML = "View"
        bu.onclick = function() {
          router.push({name: 'UserMessages'})
        }
        cell2.appendChild(bu)

    //const auth = getAuth();
    //const currUser = auth.currentUser.email;

    /*
    async function display(user) {
      let z = await getDocs(collection(db, String(user)))
      let ind = 1

      z.forEach((docs) => {
        let yy = docs.data()
        var detail = (yy.Detail) //'[Org name] sent you a message'. 
                                 //'Successful application to [Event name]'.
                                 //'Leave feedback for [Event name]'.
        var category = (yy.Category) //Application success, Message, Feedback

        var table = document.getElementById("notifTable")
        var row = table.insertRow(ind)
        var cell1 = row.insertCell(0) 
        var cell2 = row.insertCell(1)

        cell1.innerHTML = detail
        var bu = document.createElement("button")
        bu.class = "viewBtn"
        bu.innerHTML = "View"
        bu.onclick = function() {
           if (category == "Events" || category == "Feedback") {
             router.push({name: 'UserMyEvents'})
           } else if (category == "Message") {
             router.push({name: 'UserMessages'})
           }
        }
        cell2.appendChild(bu)
      }); 
    }
    display(currUser);
    */
  }
}
</script>

<style scoped>
table {
    font-family: arial, sans-serif;
    border-collapse: collapse;
    width: 100%;
}

tr:nth-child(even) {
    background-color: #e3edee;
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
    background-color: rgba(0, 153, 255, 0.609);
    color: white;
    display: inline-block;
    font-size: 12px;
    margin: 2px 1px;
    cursor: pointer;
}
</style>