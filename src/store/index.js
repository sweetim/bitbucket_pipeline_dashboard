import Vue from 'vue';
import Vuex from 'vuex';

import storageItem from './storageItem';
import bitbucket from './bitbucket';

Vue.use(Vuex);

export default new Vuex.Store({
    modules: {
        storageItem,
        bitbucket,
    },
});
