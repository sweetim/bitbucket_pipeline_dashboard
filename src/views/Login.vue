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
            const link = this.$store.getters['bitbucket/implicitGrantLink'];

            window.location.href = link;
        },
    },
};
</script>
