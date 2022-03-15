<template>

    <h1 id = "myevents">My Events</h1>
    <br>

    <!-- Menu to select Ongoing or Completed events -->
    <div id = "eventSelect">
        <input list="event" id="event-id" oninput="onSelect()" placeholder="Select Events"/>
        <datalist id="event">
            <option value="Ongoing Events">Ongoing Events</option>
            <option value="Completed Events">Completed Events</option>
        </datalist>
    </div>
    <br>
   
</template>


<script>
// import firebaseApp from '../firebase.js';
// import { getFirestore } from "firebase/firestore";
// import { getAuth } from 'firebase/auth';
// import { collection, getDocs, doc } from "firebase/firestore";
// const db = getFirestore(firebaseApp);

export default {


    methods: {


        async onSelect() {      // mount ? 

            // const auth = getAuth();
            // this.user = auth.currentUser.email;
            // let z = await getDocs(collection(db, String(this.user)))

            var selectedEvent = document.getElementById('event-id').value;
            console.log(selectedEvent);

            // query from this user's collection 
            // to obtain their ongoing / completed events
            // display in the list
            // if selectedEvent == 'completed', button to do feedback form needs to be included

            return;
        }
       
    }
    
}
</script>


<style scoped>

/* #myevents {
    background-color: #da8a8a;
    margin-top: 10px;
    margin-bottom: 10px;
    border: solid #da8a8a;
} */

/* #eventSelect {
    margin: 50px;
    display: -webkit-flex;
} */

input {
    /* -webkit-flex: 1; */
    text-align: center;
}


</style>