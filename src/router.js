import Vue from 'vue';
import Router from 'vue-router';
import Home from './views/Home.vue';
import Pipeline from './views/Pipeline.vue';
import Callback from './views/Callback.vue';
import Login from './views/Login.vue';

Vue.use(Router);

export default new Router({
    base: '/bitbucket',
    mode: 'history',
    routes: [
        {
            path: '/home',
            name: 'home',
            component: Home,
            meta: { requiresAuth: true },
        },
        {
            path: '/pipeline',
            name: 'pipeline',
            component: Pipeline,
            meta: { requiresAuth: true },
        },
        {
            path: '/',
            name: 'login',
            component: Login,
            meta: { redirectIfTokenExists: true },
        },
        {
            path: '/callback',
            name: 'callback',
            component: Callback,
        },
        {
            path: '*',
            redirect: '/',
        },
    ],
});
