import Vue from 'vue';
import './plugins/vuetify';
import App from './App.vue';
import router from './router';
import store from './store';
import './registerServiceWorker';

Vue.config.productionTip = false;

router.beforeEach((to, from, next) => {
    const { isLoggedIn } = store.getters;

    if (to.matched.some(record => record.meta.requiresAuth)) {
        if (isLoggedIn) {
            return next();
        }

        return next({
            path: '/',
        });
    }

    if (to.matched.some(record => record.meta.redirectIfTokenExists)) {
        if (isLoggedIn) {
            return next({
                path: '/home',
            });
        }
    }

    return next();
});

new Vue({
    router,
    store,
    render: h => h(App),
}).$mount('#app');
