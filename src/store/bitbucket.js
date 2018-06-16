/* eslint-disable no-shadow */

import axios from 'axios';

const state = {
    clientId: 'UR83y5yGu3edgXsMAf',
    apiUrl: 'https://api.bitbucket.org/2.0',
    userInfo: {},
    repositories: [],
};

export const getters = {
    implicitGrantLink({ clientId }) {
        return `https://bitbucket.org/site/oauth2/authorize?client_id=${clientId}&response_type=token`;
    },
};

export const mutations = {
    setUserInfo(state, data) {
        state.userInfo = {
            accountId: data.account_id,
            avatar: data.links.avatar.href,
            userLink: data.links.html.href,
            userName: data.username,
        };
    },
    setRepositories(state, data) {
        const values = data.values || [];

        state.repositories = values.map(x => ({
            fullName: x.full_name,
            name: x.name,
            slug: x.slug,
            uuid: x.uuid,
            link: x.links.html.href,
        }));
    },
};

export const actions = {
    async getUserInfo({ state, dispatch }) {
        const url = `${state.apiUrl}/user`;

        try {
            await dispatch('callApi', {
                url,
                mutationsKey: 'setUserInfo',
            });
        } catch (e) {
            console.log(e);
        }
    },
    async getRepositories({ state, dispatch }) {
        const { userName } = state.userInfo;
        const url = `${state.apiUrl}/repositories/${userName}`;

        try {
            await dispatch('callApi', {
                url,
                mutationsKey: 'setRepositories',
            });
        } catch (e) {
            console.log(e);
        }
    },
    async callApi({ commit, rootGetters }, { url, mutationsKey }) {
        const token = rootGetters['storageItem/getToken'];

        try {
            const res = await axios.get(url, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            if (res.status === 200) {
                commit(mutationsKey, res.data);
            }
        } catch (e) {
            console.log(e);
        }
    },
};

export default {
    namespaced: true,
    state,
    actions,
    getters,
    mutations,
};
