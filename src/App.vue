<template>
    <div id="app">
        <v-app>
             <v-toolbar
                v-if="isLoggedIn"
                dark
                color="primary">
                <v-btn
                    v-if="isDisplay"
                    v-on:click="backClick"
                    icon
                    class="hidden-xs-only">
                    <v-icon>arrow_back</v-icon>
                </v-btn>
                <v-toolbar-title
                    class="white--text">Bitbucket Pipeline Dashboard</v-toolbar-title>
                <v-spacer></v-spacer>
                <v-toolbar-items>
                    <v-btn
                        v-on:click="logoutClick"
                        flat
                        primary>
                        <span style="margin-right:10px">Logout</span>
                        <v-avatar
                            size="32px">
                            <img :src="userInfo.avatar"
                                :alt="userInfo.userName">
                        </v-avatar>
                    </v-btn>
                </v-toolbar-items>
            </v-toolbar>
            <v-content>
                <v-container
                    fluid
                    fill-height="true">
                    <router-view/>
                </v-container>
            </v-content>
        </v-app>
    </div>
</template>

<script>

import { LOGOUT } from '@/store/actions.type';

export default {
    computed: {
        isLoggedIn() {
            return this.$store.getters.isLoggedIn &&
                !!this.$store.getters.getUserInfo;
        },
        isDisplay() {
            return this.$route.name !== 'home'
                && this.$route.name !== 'callback';
        },
        userInfo() {
            return this.$store.getters.getUserInfo;
        },
    },
    methods: {
        backClick() {
            this.$router.push('home');
        },
        logoutClick() {
            this.$store.dispatch(LOGOUT);
            this.$router.push('/');
        },
    },
};

</script>

