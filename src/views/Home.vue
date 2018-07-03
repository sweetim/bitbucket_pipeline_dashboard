<template>
    <v-layout row wrap>
        <v-flex xs12 sm8 offset-sm2>
            <v-list two-line
                v-if="isReady">
                <v-subheader inset>Please select the repositories for pipeline status</v-subheader>
                <template v-for="(item, index) in repositories">
                    <v-list-tile
                        :key="item.title"
                        href="javascript:;"
                        ripple
                        avatar>
                        <v-list-tile-avatar>
                            <img :src="item.avatar">
                        </v-list-tile-avatar>
                        <v-list-tile-content
                            @click="toggleClick(index)">
                            <v-list-tile-title>{{ item.fullName }}</v-list-tile-title>
                            <v-list-tile-sub-title>{{ item.updatedOn }}</v-list-tile-sub-title>
                        </v-list-tile-content>
                        <v-list-tile-action>
                            <v-checkbox
                                color="indigo"
                                readonly
                                v-model="item.selected">
                            </v-checkbox>
                        </v-list-tile-action>
                    </v-list-tile>
                    <v-divider v-if="index + 1 < repositories.length" :key="index"></v-divider>
                </template>
            </v-list>
            <div v-else>
                <tim-loading></tim-loading>
            </div>
            <v-btn
                v-on:click="nextClick"
                color="primary"
                dark>
                Next
            </v-btn>
        </v-flex>
    </v-layout>
</template>

<script>

import {
    TOGGLE_SELECTED_REPOSITORY,
    GET_REPOSITORIES,
} from '@/store/actions.type';

import TimLoading from '@/components/Loading.vue';

export default {
    name: 'home',
    components: {
        TimLoading,
    },
    data() {
        return {
            isReady: false,
        };
    },
    computed: {
        repositories() {
            return this.$store.state.bitbucket.repositories;
        },
    },
    async mounted() {
        this.isReady = false;
        await this.$store.dispatch(GET_REPOSITORIES);
        this.isReady = true;
    },
    methods: {
        nextClick() {
            this.$router.push('pipeline');
        },
        async toggleClick(index) {
            await this.$store.dispatch(TOGGLE_SELECTED_REPOSITORY, index);
        },
    },
};
</script>
