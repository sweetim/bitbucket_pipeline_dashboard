<template>
    <v-layout row wrap>
        <v-flex xs12 sm8 offset-sm2>
            <v-text-field
                v-if="isReady"
                placeholder="Search repository by name"
                solo
                v-model="searchKey"
            ></v-text-field>
            <v-list two-line
                v-if="isReady"
            >
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
                v-if="isReady"
                @click="nextClick"
                color="primary"
                dark>
                Next
            </v-btn>
            <tim-loading
                v-if="!isReady"
            ></tim-loading>
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
        async toggleClick(index) {
            await this.$store.dispatch(TOGGLE_SELECTED_REPOSITORY, index);
        },
    },
};
</script>
