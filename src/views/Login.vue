<template>
    <v-container
        align-center="true"
        align-content-center="true">
        <v-layout row wrap>
            <v-flex xs12 sm6 offset-sm3>
                <v-card>
                    <v-card-title primary-title>
                        <div>
                            <div class="headline">Bitbucket Dashboard</div>
                            <span class="grey--text">Please configure the settings below</span>
                        </div>
                    </v-card-title>
                    <v-card-actions>
                        <v-btn
                            v-on:click="loginClick"
                            round
                            color="primary"
                            dark>
                            Log in with Bitbucket
                        </v-btn>
                    </v-card-actions>
                </v-card>
            </v-flex>
        </v-layout>
    </v-container>
</template>

<script>
export default {
    methods: {
        loginClick() {
            const link = this.$store.getters['bitbucket/implicitGrantLink'];

            window.location.href = link;
        },
    },
};
</script>
