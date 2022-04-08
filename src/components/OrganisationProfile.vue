<template>
<p align= "left"><a href="#" class="previous" onclick="history.back()">&laquo;</a></p>

    <div>
        <img id = "OrganisationPic" :src="org" class = center>
        
        <h2>{{name}}</h2>
    <table>
        <tr>
        <th>Organisation Details:</th>
        <td>{{intro}}</td>
        </tr>
  
    </table>
    <br>
    

   
    <div class="left"> 
        <h4>Rate:</h4>  </div>
    <div class="right"> <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">

    <span class="fa fa-star checked"></span>
    <span class="fa fa-star checked"></span>
    <span class="fa fa-star checked"></span>
    <span class="fa fa-star"></span>
    <span class="fa fa-star"></span></div>

    <table>
        <tr>
        <th>Comments from past volunteers:</th>
        <td>
            <div>
                <table class ="noBorderTb" >
                    <tr ><td id = "comment_td">one</td></tr>
                    <tr><td id = "comment_td">two</td></tr>
                    <tr><td id = "comment_td">three</td></tr>
                </table>
            </div>
        </td>
        </tr>
  
    </table>
    </div>
    <br>

</template>


<script>
import firebaseApp from '../firebase.js';
import { doc, getDoc,getFirestore } from 'firebase/firestore';
const db = getFirestore(firebaseApp);


export default {
    name: 'OrganisationProfile',
    data() {
        return {
            org: require('../assets/organisation.png'),
            name : "",
            intro : "",
            orgEmail: this.$route.params.orgID
        }
    },

    mounted() {
        console.log("org email in profile page");
        console.log(this.orgEmail);
        getDoc(doc(db, "Organisations", String(this.orgEmail))).then(docSnap => {

        if (docSnap.exists()) {
            this.name = docSnap.data().Name
            this.intro = docSnap.data().Introduction
        } else {
            console.log("error")
        }
        })
    }


    
}
</script>


<style scoped>
th{
  border: px solid;
}
td { 
    text-align: start;
    border: 1px solid;
    width: 75%;
    height: 200px;
}
#comment_td {
    text-align: start;
    width: 75%;
    height: 100px;
}
#comment_tr {
    text-align: start;
    width: 75%;
    height: 100px;
    border: 0ch;
}
table {
    border: 1px solid;
    width: 100%;
}
.noBorderTb {
    border: 0px solid;
    width: 100%;

}
.checked {
  color: orange;
  

}
.fa {
  font-size: 30px;
}

 .left {
    width: 25%;
    float: left;
    height: 100px;
    text-align: center;     
}
.right {
    width: 75%;
    float:left;
    height: 100px;
    text-align: center;
}
#OrganisationPic{
    display: block;
    margin-left: auto;
    margin-right: auto;
    width:10%;
}
#profilePic{
  height: 100px;
  width: 100px;
  border-radius: 50%;
  border: 1px solid gray;
  background-position: center;
  background-size: cover;
}
#intro {
    width: 300px;
    height: 100px;
}
#name{
    width: 300px;
}
.previous {
  background-color: #f1f1f1;
  color: black;
}
a {  
  text-decoration: none;
  display: inline-block;
  padding: 8px 16px;
}
a:hover {
  background-color: #ddd;
  color: black;
}
</style>
