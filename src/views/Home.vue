<template>
    <v-layout row wrap>
        <v-flex xs12 sm8 offset-sm2>
            <v-list two-line >
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

export default {
    name: 'home',
    computed: {
        repositories() {
            return this.$store.state.bitbucket.repositories;
        }
    },
    mounted() {
        this.$store.dispatch('bitbucket/getRepositories');
    },
    methods: {
        nextClick() {
            this.$router.push('pipeline');
        },
    },
};
</script>
