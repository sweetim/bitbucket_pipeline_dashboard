<template>
    <v-layout row wrap>
        <v-flex xs12 sm8 offset-sm2>
            <p class="text-xs-center">Loading...</p>
            <v-progress-linear
                :indeterminate="true"
                color="secondary"
                height="2"
                value="15">
            </v-progress-linear>
        </v-flex>
    </v-layout>
</template>

<script>
import {
    PARSE_PAYLOAD,
    GET_USER_INFO,
} from '@/store/actions.type';

export default {
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
