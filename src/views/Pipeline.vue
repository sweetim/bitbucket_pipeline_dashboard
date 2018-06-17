<template>
    <v-list two-line >
        <template v-for="(item, index) in repositories">
            <v-list-tile
                :key="item.title"
                avatar>
                <v-list-tile-avatar>
                    <img :src="item.avatar">
                </v-list-tile-avatar>
                <v-list-tile-content>
                    <v-list-tile-title>{{ item.fullName }}</v-list-tile-title>
                    <v-list-tile-sub-title>{{ item.updatedOn }}</v-list-tile-sub-title>
                </v-list-tile-content>
            </v-list-tile>
            <v-divider v-if="index + 1 < repositories.length" :key="index"></v-divider>
        </template>
    </v-list>
</template>

<script>

export default {
    computed: {
        repositories() {
            return this.$store.getters['bitbucket/selectedRepositorites'];
        },
    },
    mounted() {
        this.$store.dispatch('bitbucket/getPipelineStatus');
    }
}

</script>
