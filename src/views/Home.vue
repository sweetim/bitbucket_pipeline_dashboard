<template>
    <v-container
        align-center="true"
        align-content-center="true">
        <v-btn
            v-on:click="testClick"
            round
            color="primary"
            dark>
            Test
        </v-btn>
    </v-container>
</template>

<script>

export default {
    name: 'home',
    methods: {
        testClick() {
            this.$store.dispatch('bitbucket/getRepositories');
        },
    },
};

</script>
