<template>
    <div id="logged" v-if="user">
        <div>
            <router-link to="/UserOpportunities">Opportunities</router-link> |
            <router-link to="/OrgPostEvent">Post New Event</router-link> |
            <router-link to="/OrgSelectVolunteers">Select volunteers</router-link> |
            <router-link to="/Messages">Messages</router-link> |
            <router-link to="/OrganisationAccount">Account</router-link>
        </div>
    </div>
</template>

<script>
import { getAuth, onAuthStateChanged } from "firebase/auth";

export default {
    name: 'NavBar',

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