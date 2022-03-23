<template>
    <div id="logged" v-if="user">
        <div>
            <router-link to="/UserOpportunities">Opportunities</router-link> |
            <router-link to="/UserMyEvents">My Event</router-link> |
            <router-link to="/UserNotification"> Notifications</router-link> |
            <router-link to="/UserAccount">Account</router-link>
        </div>
    </div>
</template>

<script>
import { getAuth, onAuthStateChanged } from "firebase/auth";

export default {
    name: 'UserNavBar',

    data() {
        return {
            user: false,
        }
    },

    mounted() {
        const auth = getAuth();
        onAuthStateChanged(auth, (user) => {
            if (user) {
                this.user = user;
            }
        })
    }
}
</script>

<style scoped>
#nav {
    padding: 30px;
    text-align: center;
}

#nav a {
    font-weight: bold;
    color: #2c3e50;
}

#nav a.router-link-exact-active {
    color: #42b983;
}
</style>