<template>
    <div>
        <p class="text-xs-center">Loading...</p>
        <v-progress-linear
            :indeterminate="true"
            color="secondary"
            height="2"
            value="15">
        </v-progress-linear>
    </div>
</template>

<script>
export default {
    name: 'tim-loading',
};
</script>
