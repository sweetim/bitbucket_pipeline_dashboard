import Vue from 'vue';
import Router from 'vue-router';
import Home from './views/Home.vue';
import Pipeline from './views/Pipeline.vue';
import About from './views/About.vue';
import Callback from './views/Callback.vue';
import Login from './views/Login.vue';

Vue.use(Router);

export default new Router({
    mode: 'history',
    routes: [
        {
            path: '/home',
            name: 'home',
            component: Home,
        },
        {
            path: '/pipeline',
            name: 'pipeline',
            component: Pipeline,
        },
        {
            path: '/',
            name: 'login',
            component: Login,
        },
        {
            path: '/callback',
            name: 'callback',
            component: Callback,
        },
        {
            path: '/about',
            name: 'about',
            component: About,
        },
        {
            path: '*',
            redirect: '/',
        },
    ],
});
