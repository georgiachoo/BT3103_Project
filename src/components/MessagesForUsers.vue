<template>

    <div
        class="col-xs-4"
        id="talkjs-container"
        ref="talkjs-container"
        style="width: 90%; margin-top: 10px; height: 900px"
    >

    <i>Loading chat...</i>

    </div>
</template>

<script>
import firebaseApp from '../firebase.js';
import Talk from "talkjs";
import { getAuth } from "firebase/auth"
import { getFirestore, doc, getDoc } from 'firebase/firestore';
const db = getFirestore(firebaseApp);

    export default {
        name: "Messages",

        data() {
            return {
                conversation: null,
                chatbox: null,
            };
        },
        props: {
            otherID: {
                type: String,
                required: false,
            },
        },

        async mounted() {
          const auth = getAuth();
          this.email = auth.currentUser.email;

          // to query name and photo from firebase for 'me' and 'other' user
          var email = this.email
          const userRef = await getDoc(doc(db, "Users", this.email))
          const userData = userRef.data();

          var otherid = this.$route.params.otherID;

          if (otherid == null) {
              otherid = ''
          }

          var otherData = undefined
          if (otherid != '') {
            const otherRef = await getDoc(doc(db, "Organisations", otherid))
            otherData = otherRef.data()
          } 

          console.log(otherData)


          var othername = otherid
          var myname = this.email
          var otherpic = "https://thumbs.dreamstime.com/b/man-profile-cartoon-smiling-round-icon-vector-illustration-graphic-design-135443422.jpg"
          var mypic = "https://thumbs.dreamstime.com/b/man-profile-cartoon-smiling-round-icon-vector-illustration-graphic-design-135443422.jpg"

          if (userData != undefined) {
            myname = userData['Name'] != undefined ? userData['Name'] : this.email
            mypic = userData['profilePic'] != undefined ? userData['profilePic'] : mypic
            
          } 

          if (otherData != undefined) {
            othername = otherData['Name'] != undefined ? otherData['Name'] : otherid
            otherpic = otherData['profilePic'] != undefined ? otherData['profilePic'] : otherpic
          }

          console.log("!!!")
          console.log(othername)

          Talk.ready.then(function() {

            var me = new Talk.User({
              id: email,
              name: myname,
              email: email,
              photoUrl: mypic,
              role: "default",
            });

            var talkSession = new Talk.Session({
              appId: "tbmsHGYO",
              me: me
            });

            var inbox;

            if (otherid !== '') {
              var other = new Talk.User({
                id: otherid,
                name: othername,
                photoUrl: otherpic,
                role: "default",

              });
        
              var conversation = talkSession.getOrCreateConversation(Talk.oneOnOneId(me, other));
              conversation.setParticipant(me);
              conversation.setParticipant(other);
              inbox = talkSession.createInbox({selected: conversation});
              inbox.mount(document.getElementById("talkjs-container"));
            } else {
              inbox = talkSession.createInbox();
              inbox.mount(document.getElementById("talkjs-container"));
            }
          });
        }         
    }

</script>