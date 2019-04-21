<template>
    <v-layout row wrap>
        <v-flex xs12 sm8 offset-sm2
            v-if="isReady"
        >
            <v-text-field
                solo
                label="Search repositories by name"
                v-model="searchKey"
            ></v-text-field>
            <v-list two-line>
                <v-subheader>
                    There are {{ repositories.length }} repositories,select the interested repositories for pipeline status and click NEXT at the bottom of the page
                </v-subheader>
                <template v-for="(item, index) in repositories">
                    <v-list-tile
                        :key="item.title"
                        href="javascript:;"
                        ripple
                        avatar
                    >
                        <v-list-tile-avatar>
                            <img :src="item.avatar">
                        </v-list-tile-avatar>
                        <v-list-tile-content
                            @click="toggleClick(item.fullName)">
                            <v-list-tile-title>{{ item.fullName }}</v-list-tile-title>
                            <v-list-tile-sub-title>
                                Last updated {{ item.updatedOn }}
                            </v-list-tile-sub-title>
                        </v-list-tile-content>
                        <v-list-tile-action>
                            <v-checkbox
                                color="indigo"
                                v-model="item.selected">
                            </v-checkbox>
                        </v-list-tile-action>
                    </v-list-tile>
                    <v-divider v-if="index + 1 < repositories.length" :key="index"></v-divider>
                </template>
            </v-list>
            <v-btn
                @click="nextClick"
                color="primary"
                dark
            >
                Next
            </v-btn>
        </v-flex>
        <v-flex xs12 sm8 offset-sm2
            v-else
        >
            <tim-loading></tim-loading>
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
            searchKey: '',
        };
    },
    computed: {
        repositories() {
            return this.$store.state.bitbucket.repositories
                .filter(({ name }) => name
                    .toLocaleLowerCase()
                    .includes(this.searchKey.toLocaleLowerCase()));
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
        async toggleClick(fullName) {
            await this.$store.dispatch(TOGGLE_SELECTED_REPOSITORY, fullName);
        },
    },
};
</script>
