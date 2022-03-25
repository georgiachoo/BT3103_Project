<template>
    <h1>Organisation Login</h1>
    <div id= "firebaseui-auth-container"></div>
</template>

<script>
import firebase from '@/uifire.js'
import 'firebase/compat/auth';
import * as firebaseui from 'firebaseui'
import 'firebaseui/dist/firebaseui.css'

export default ({
    name: 'OrganisationLogin',
    mounted() {

        var ui = firebaseui.auth.AuthUI.getInstance();
        if (!ui) {
            ui = new firebaseui.auth.AuthUI(firebase.auth());
        }

        var uiConfig = {
        // to link to organisation home pg
        signInSuccessUrl: '/Home',
        signInOptions: [
            firebase.auth.GoogleAuthProvider.PROVIDER_ID,
            firebase.auth.EmailAuthProvider.PROVIDER_ID,
        ]}

        ui.start("#firebaseui-auth-container", uiConfig)
    },
    created() {
            this.type = this.$route.params.type;
    },
})
</script>

<style scoped>

#firebaseui-auth-container {
    margin-top: 50px;
    margin-bottom: 50px;
    margin-left: 35%;
    margin-right: 35%;

    padding: 50px 50px 50px 50px;
    border-radius: 30px;
    border-color: transparent;
    background-color: #dfb7b7;
    box-shadow: 0 5px 15px rgb(0 0 0 / 0.2);
}

</style>