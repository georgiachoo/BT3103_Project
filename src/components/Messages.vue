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
import Talk from "talkjs";
import { getAuth } from "firebase/auth"

    export default {
        name: "Messages",
        // components: {
        //     NavBar,
        // },
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
        console.log(this.email)

        var otherid = this.$route.params.otherID;
        if (otherid == null) {
            otherid = ''
        }
        
      Talk.ready.then(function() {

        var me = new Talk.User({
            id: email,
            name: email,
            email: email,
            photoUrl: "https://thumbs.dreamstime.com/b/man-profile-cartoon-smiling-round-icon-vector-illustration-graphic-design-135443422.jpg",
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
            name: otherid,
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