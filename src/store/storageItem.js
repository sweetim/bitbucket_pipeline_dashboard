import { STORAGE_TOKEN } from '@/constants';

export const getters = {
    isLoggedIn(_, { getStorageItem, isExpired }) {
        return !!getStorageItem
            && !!getStorageItem.token
            && isExpired;
    },
    isExpired(_, { getStorageItem }) {
        if (getStorageItem.time
            && getStorageItem.expiresIn) {
            const diff = Date.now() - getStorageItem.time;
            return diff > (getStorageItem.expiresIn * 1e3);
        }

        return true;
    },
    getToken(_, { getStorageItem }) {
        if (!getStorageItem.token) return {};

        return getStorageItem.token;
    },
    getStorageItem() {
        let storage = {};

        try {
            const item = localStorage.getItem(STORAGE_TOKEN);
            storage = JSON.parse(item);
        } catch (e) {
            console.log(e);
        }

        return storage;
    },
};

export const mutations = {
    storePayload(_, payload) {
        if (payload.access_token
            && payload.expires_in) {
            const storageItem = {
                token: payload.access_token,
                expires: payload.expires_in,
            };

            localStorage.setItem(STORAGE_TOKEN, JSON.stringify(storageItem));
        }
    },
};

export const actions = {
    parsePayload({ commit }, data) {
        const payload = data
            .replace('#', '')
            .split('&')
            .map(x => x.split('='))
            .reduce((a, b) => {
                const key = b[0];
                const value = decodeURIComponent(b[1]);

                return Object.assign({}, a, { [key]: value });
            }, {});

        commit('storePayload', payload);
    },
};

export default {
    namespaced: true,
    actions,
    getters,
    mutations,
};
