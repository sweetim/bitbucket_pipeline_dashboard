<template>
    <v-layout row wrap>
        <v-flex xs12 sm8 offset-sm2>
            <v-list
                v-if="isReady"
                three-line>
                <template v-for="(item, index) in pipelines">
                    <v-list-tile
                        :key="item.uuid"
                        avatar>
                        <v-list-tile-avatar>
                            <img :src="item.avatar"
                                :title="item.userName">
                        </v-list-tile-avatar>
                        <v-list-tile-content>
                            <v-list-tile-title>
                                <a :class="item.resultColor"
                                    :href="item.link"
                                    target="_blank">
                                    #{{item.id}} {{ item.repoSlug }}
                                </a>
                            </v-list-tile-title>
                            <v-list-tile-sub-title>
                                {{ item.pipelineTitle }}
                            </v-list-tile-sub-title>
                            <v-list-tile-sub-title>
                                Created on: {{ item.createdOn }} ({{ item.buildSeconds }} seconds)
                            </v-list-tile-sub-title>
                        </v-list-tile-content>
                        <v-list-tile-action>
                            <v-icon :class="item.resultColor">
                                {{ item.resultIcon }}
                            </v-icon>
                        </v-list-tile-action>
                    </v-list-tile>
                    <v-divider v-if="index + 1 < pipelines.length" :key="index"></v-divider>
                </template>
            </v-list>
            <div v-else>
                <tim-loading></tim-loading>
            </div>
        </v-flex>
    </v-layout>
</template>

<script>

import { GET_PIPELINE_STATUS } from '@/store/actions.type';

import Loading from '@/components/Loading.vue';

export default {
    data() {
        return {
            isReady: false,
        };
    },
    components: {
        Loading,
    },
    computed: {
        pipelines() {
            return this.$store.state.bitbucket.pipelines;
        },
    },
    async mounted() {
        this.isReady = false;
        await this.$store.dispatch(GET_PIPELINE_STATUS);
        this.isReady = true;
    },
};

</script>


<style>
    a {
        text-decoration: none;
    }
</style>

