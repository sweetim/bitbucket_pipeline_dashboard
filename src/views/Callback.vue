<template>
    <v-layout row wrap>
        <v-flex xs12 sm8 offset-sm2>
            <tim-loading></tim-loading>
        </v-flex>
    </v-layout>
</template>

<script>
import {
    PARSE_PAYLOAD,
    GET_USER_INFO,
} from '@/store/actions.type';

import TimLoading from '@/components/Loading.vue';

export default {
    components: {
        TimLoading,
    },
    async mounted() {
        const data = window.location.hash;

        await this.$store.dispatch(PARSE_PAYLOAD, data);

        if (this.$store.getters.isLoggedIn) {
            try {
                await this.$store.dispatch(GET_USER_INFO);
                this.$router.push('/home');

                return;
            } catch (e) {
                console.log(e);
            }
        }

        this.$router.push('/');
    },
};
</script>
