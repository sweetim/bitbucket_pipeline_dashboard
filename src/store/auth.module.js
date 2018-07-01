/* eslint-disable no-shadow */

import { STORAGE_TOKEN } from '@/constants';
import {
    PARSE_PAYLOAD,
    LOGOUT,
} from './actions.type';

import {
    PURGE_AUTH,
    STORE_AUTH,
    CLEAR_USER_INFO,
} from './mutations.type';

const state = {
    storage: localStorage.getItem(STORAGE_TOKEN) || '',
    isLoggedIn: false,
};

export const getters = {
    isLoggedIn({ storage }) {
        try {
            const { token, expriredBy } = JSON.parse(storage);
            return token && (expriredBy > Date.now());
        } catch (e) {
            // console.error(e);
            return false;
        }
    },
    getToken({ storage }) {
        if (!storage) return '';

        try {
            const { token } = JSON.parse(storage);
            return token;
        } catch (e) {
            console.error(e);
            return '';
        }
    },
};

export const mutations = {
    [STORE_AUTH](state, payload) {
        /* eslint-disable camelcase */
        let isLoggedIn = false;
        let storageItem = {};

        if (payload.access_token
            && payload.expires_in) {
            const expiresIn_s = payload.expires_in;
            const expriredBy = Date.now() + (expiresIn_s * 1000);

            storageItem = JSON.stringify({
                token: payload.access_token,
                expriredBy,
            });

            localStorage.setItem(STORAGE_TOKEN, storageItem);
            isLoggedIn = true;
        }

        state.storage = storageItem;
        state.isLoggedIn = isLoggedIn;
    },
    [PURGE_AUTH](state) {
        localStorage.removeItem(STORAGE_TOKEN);
        state.storage = '';
        state.isLoggedIn = false;
    },
};

export const actions = {
    [PARSE_PAYLOAD]({ commit }, data) {
        const payload = data
            .replace('#', '')
            .split('&')
            .map(x => x.split('='))
            .reduce((a, b) => {
                const key = b[0];
                const value = decodeURIComponent(b[1]);

                return Object.assign({}, a, { [key]: value });
            }, {});

        commit(STORE_AUTH, payload);
    },
    [LOGOUT]({ commit }) {
        commit(PURGE_AUTH);
        commit(CLEAR_USER_INFO);
    },
};

export default {
    state,
    actions,
    getters,
    mutations,
};
