<template>
    <v-container
        align-center="true"
        align-content-center="true">
        <v-btn
            v-on:click="loginClick"
            round
            color="primary"
            dark>
            Log in with Bitbucket
        </v-btn>
    </v-container>
</template>

<script>
export default {
    methods: {
        loginClick() {
            const { clientId } = this.$store.state;

            window.location.href = `https://bitbucket.org/site/oauth2/authorize?client_id=${clientId}&response_type=token`;
        },
    },
};
</script>
