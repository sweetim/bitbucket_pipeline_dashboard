<template>
    <v-layout row wrap>
        <v-flex xs12 sm8 offset-sm2
            v-if="isReady"
        >
            <v-text-field
                solo
                label="Search repository by name"
                v-model="searchKey"
            ></v-text-field>
            <p>Click the repository row to show the pipeline history</p>
            <v-expansion-panel :popout="true">
                <template v-for="(item, index) in pipelines">
                    <v-expansion-panel-content
                        :key="index"
                    >
                        <template v-slot:actions>
                            <v-icon :color="item[0].resultColor.replace(/--text/, '')">{{ item[0].resultIcon }}</v-icon>
                        </template>
                        <template v-slot:header>
                            <v-layout
                                align-center
                                justify-start
                                row
                            >
                                <v-list-tile-avatar>
                                    <img :src="item[0].repoAvatar"
                                        :title="item[0].fullName"
                                    >
                                </v-list-tile-avatar>
                                <v-list-tile-content>
                                    <v-list-tile-title
                                        :class="item[0].resultColor"
                                        style="font-size:large;"
                                    >
                                        {{ item[0].fullName }}
                                    </v-list-tile-title>
                                    <v-list-tile-sub-title
                                        class="caption grey--text"
                                    >
                                        Created on: {{ item[0].createdOn }} ({{ item[0].buildSeconds }} seconds)
                                    </v-list-tile-sub-title>
                                </v-list-tile-content>
                            </v-layout>
                        </template>
                        <v-card>
                             <v-list two-line subheader>
                                <template v-for="(x, index) in item">
                                    <v-list-tile
                                        :key="x.uuid"
                                        avatar
                                    >
                                        <v-list-tile-avatar>
                                            <img :src="x.avatar"
                                                :title="x.userName"
                                            >
                                        </v-list-tile-avatar>
                                        <v-list-tile-content>
                                            <v-list-tile-title>
                                                <a :class="x.resultColor"
                                                    :href="x.link"
                                                    target="_blank"
                                                >
                                                    #{{x.id}} {{ x.pipelineTitle }}
                                                </a>
                                            </v-list-tile-title>
                                            <v-list-tile-sub-title>
                                                Created on: {{ x.createdOn }} ({{ x.buildSeconds }} seconds)
                                            </v-list-tile-sub-title>
                                        </v-list-tile-content>
                                        <v-list-tile-action>
                                            <v-icon :class="x.resultColor">
                                                {{ x.resultIcon }}
                                            </v-icon>
                                        </v-list-tile-action>
                                    </v-list-tile>
                                    <v-divider v-if="index + 1 < item.length" :key="index"></v-divider>
                                </template>
                            </v-list>
                        </v-card>
                    </v-expansion-panel-content>
                </template>
            </v-expansion-panel>
            <v-fab-transition>
                <v-btn
                    @click="refreshClick"
                    color="red"
                    dark
                    fab
                    fixed
                    bottom
                    right
                >
                    <v-icon>refresh</v-icon>
                </v-btn>
            </v-fab-transition>
        </v-flex>
        <v-flex xs12 sm8 offset-sm2
            v-else
        >
            <tim-loading></tim-loading>
        </v-flex>
    </v-layout>
</template>

<script>

import { GET_PIPELINE_STATUS } from '@/store/actions.type';

import TimLoading from '@/components/Loading.vue';

export default {
    data() {
        return {
            isReady: false,
            searchKey: '',
        };
    },
    components: {
        TimLoading,
    },
    computed: {
        pipelines() {
            return this.$store.state.bitbucket.pipelines
                .filter(([ x ]) => x.fullName
                    .toLocaleLowerCase()
                    .includes(this.searchKey.toLocaleLowerCase()));
        },
    },
    async mounted() {
        this.isReady = false;
        await this.$store.dispatch(GET_PIPELINE_STATUS);
        this.isReady = true;
    },
    methods: {
        async refreshClick() {
            this.isReady = false;
            await this.$store.dispatch(GET_PIPELINE_STATUS);
            this.isReady = true;
        },
    },
};

</script>


<style>
    a {
        text-decoration: none;
    }
</style>
