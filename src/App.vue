<template>
    <div id="app">
        <!-- <div id="nav">
            <router-link to="/">Home</router-link> |
            <router-link to="/about">About</router-link>
        </div> -->
        <v-app>
             <v-toolbar dark color="primary">
                <v-toolbar-title class="white--text">Title</v-toolbar-title>
                <v-spacer></v-spacer>
                <v-toolbar-items>
                    <v-btn
                        icon
                        flat>
                         <v-avatar
                            size="32px">
                            <img :src="userInfo.avatar" :alt="userInfo.userName">
                        </v-avatar>
                    </v-btn>
                </v-toolbar-items>
            </v-toolbar>
            <v-content>
                <v-container
                    fluid
                    align-center="true"
                    align-content-center="true"
                    grid-list-sm>
                    <router-view/>
                </v-container>
            </v-content>
        </v-app>
    </div>
</template>

<script>

export default {
    computed: {
        isLoggedIn() {
            return this.$store.state.storageItem.isLoggedIn;
        },
        userInfo() {
            return this.$store.state.bitbucket.userInfo;
        }
    }
}

</script>

