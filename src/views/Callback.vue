<template>
    <div></div>
</template>

<script>

export default {
    async mounted() {
        const data = window.location.hash;
        this.$store.dispatch('storageItem/parsePayload', data);

        if (this.$store.getters['storageItem/isLoggedIn']) {
            try {
                await this.$store.dispatch('bitbucket/getUserInfo');
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
