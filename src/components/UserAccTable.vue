<template>
  <h1> My Account</h1>
    <table id = "accTable">
        <tr>
            <th>Name</th>
            <th>Age</th>
            <th>Gender</th>
            <th>Email</th>
            <th>Skills</th>
        </tr>

        <tr>
            <th>Interests</th>
            <th>Certifications</th>
            <th>Experience</th>
        </tr>

        <tr>
            <th>SelfIntroduction</th>
        </tr>
    </table><br><br>
</template>

<script>
import firebaseApp from '../firebase.js';
import { getFirestore } from 'firebase/firestore';
import { collection, getDocs } from 'firebase/firestore';
const db = getFirestore(firebaseApp);

export default {
    mounted() {
        async function display() {
            let docs = await getDocs(collection(db, "User"));
            let ind = 1;

            let yy = docs.data();
            var table = document.getElementById("accTable");
            var row = table.insertRow(ind);

            var name = (yy.Name);
            var age = (yy.Age);
            var gender = (yy.Gender);
            var email = (yy.Email);
            var skills = (yy.Skills);

            var cell1 = row.insertCell(0); 
            var cell2 = row.insertCell(1); 
            var cell3 = row.insertCell(2); 
            var cell4 = row.insertCell(3); 
            var cell5 = row.insertCell(4);
            cell1.innerHTML = name; 
            cell2.innerHTML = age; 
            cell3.innerHTML = gender; 
            cell4.innerHTML = email; 
            cell5.innerHTML = skills; 

            ind += 2;
            var row2 = table.insertRow(ind);

            var interest = (yy.Interests);
            var cert = (yy.Certifications);
            var exp = (yy.Experience);

            var cell6 = row2.insertCell(0); 
            var cell7 = row2.insertCell(1); 
            var cell8 = row2.insertCell(2); 
            cell6.innerHTML = interest; 
            cell7.innerHTML = cert;
            cell8.innerHTML = exp; 

            ind += 2;
            var row3 = table.insertRow(ind);
            var intro = (yy.Introduction);
            var cell9 = row3.insertCell(0); 
            cell9.innerHTML = intro;

        }
        display();
    }
}
</script>

<style>
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

</style>