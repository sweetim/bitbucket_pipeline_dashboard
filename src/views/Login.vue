<template>
    <v-container
        fill-height="true"
        align-center="true"
        justify-center="true"
        align-content-center="true">
        <v-layout row>
            <v-flex xs12 sm6 offset-sm3>
                <div class="text-xs-center">
                    <img class="logo-spacer"
                        src="@/assets/bitbucket_logo.png">

                    <h1>Pipeline Dashboard</h1>
                    <p></p>
                    <p>
                        This application is created to have a centralized view
                        of the latest pipeline status for every selected repository
                    </p>
                    <p>
                        I developed this while waiting for
                        <a href="https://bitbucket.org/site/master/issues/12765/pipeline-wallboards"
                            target="_blank">
                            issue #12765
                        </a>
                        to be closed by the Bitbucket development team
                    </p>
                    <v-btn
                        style="margin-top: 3vh;"
                        v-on:click="loginClick"
                        round
                        color="primary"
                        dark>
                        Log in with Bitbucket
                    </v-btn>
                </div>
            </v-flex>
        </v-layout>
    </v-container>
</template>

<script>

import { IMPLICIT_GRANT_LINK } from '@/store/actions.type';

export default {
    methods: {
        async loginClick() {
            const link = await this.$store.dispatch(IMPLICIT_GRANT_LINK);

            window.location.href = link;
        },
    },
};
</script>

<style>

.logo-spacer {
    margin-top: 10vh;
    margin-bottom: 5vh;
}

</style>
