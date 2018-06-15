import { STORAGE_TOKEN } from '@/constants';

export default {
    namespaced: true,
    getters: {
        isLoggedIn(state, getters) {
            return !!getters.getStorageItem
                && !!getters.getStorageItem.token
                && getters.isExpired;
        },
        isExpired(state, getters) {
            if (getters.getStorageItem.time
                && getters.getStorageItem.expiresIn) {
                const diff = Date.now() - getters.getStorageItem.time;
                return diff > (getters.getStorageItem.expiresIn * 1e3);
            }

            return true;
        },
        getToken(state, getters) {
            if (!getters.getStorageItem.token) return {};

            return getters.getStorageItem.token;
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
    },
    mutations: {
        parseCallback(state, data) {
            const payload = data
                .replace('#', '')
                .split('&')
                .map(x => x.split('='))
                .reduce((a, b) => {
                    const key = b[0];
                    const value = decodeURIComponent(b[1]);

                    return Object.assign({}, a, { [key]: value });
                }, {});

            if (payload.access_token
                && payload.expires_in) {
                const storageItem = {
                    token: payload.access_token,
                    expires: payload.expires_in,
                };

                localStorage.setItem(STORAGE_TOKEN, JSON.stringify(storageItem));
            }
        },
    },
};
