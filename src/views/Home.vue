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

import axios from 'axios'

export default {
    name: 'home',
    methods: {
        testClick() {
            const token = this.$store.getters['storageItem/getToken'];
            const url = 'https://api.bitbucket.org/2.0/repositories/sweetim';
                axios.get(url, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                })
                .then((response) => {
                    console.log(response);
                })
                .catch((error) => {
                    console.log(error);
                });
        },
    },
};

</script>
