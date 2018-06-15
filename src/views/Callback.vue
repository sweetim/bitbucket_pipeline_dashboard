<template>
    <div></div>
</template>

<script>

export default {
    mounted() {
        const data = window.location.hash;
        this.$store.commit('storageItem/parseCallback', data);

        if (this.$store.getters['storageItem/isLoggedIn']) {
            this.$router.push('/home');
            return;
        }

        this.$router.push('/');
    },
};
</script>
