/* eslint-disable no-shadow */

import axios from 'axios';

const state = {
    clientId: 'UR83y5yGu3edgXsMAf',
    apiUrl: 'https://api.bitbucket.org/2.0',
    userInfo: JSON.parse(localStorage.getItem('USER_INFO')),
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
            updatedOn: x.updated_on,
            avatar: x.links.avatar.href,
            selected: false,
        }));
    },
    toggleSelectedRepository(state, index) {
        const status = state.repositories[index].selected;
        state.repositories[index].selected = !status;
    },
};

export const actions = {
    async getUserInfo({ state, dispatch, commit }) {
        const url = `${state.apiUrl}/user?fields=account_id,links.avatar.href,links.html.href,username`;

        try {
            const res = await dispatch('callApi', url);

            if (res.status === 200) {
                commit('setUserInfo', res.data);
            }
        } catch (e) {
            console.log(e);
        }
    },
    async getRepositories({ state, dispatch, commit }) {
        const { userName } = state.userInfo;
        const url = `${state.apiUrl}/repositories/${userName}`;

        try {
            const res = await dispatch('callApi', url);

            if (res.status === 200) {
                console.log(res.data);
                commit('setRepositories', res.data);
            }
        } catch (e) {
            console.log(e);
        }
    },
    async getPipelineStatus({ state, getters, dispatch }) {
        const urls = getters.selectedRepositorites.map(x => `${state.apiUrl}/repositories/${x.fullName}/pipelines/`);

        try {
            const res = await Promise.all(urls.map(x => dispatch('callApi', x)));
            console.log(res);
        } catch (e) {
            console.log(e);
        }
    },
    async callApi({ rootGetters }, url) {
        const token = rootGetters['storageItem/getToken'];

        try {
            const res = await axios.get(url, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            return res;
        } catch (e) {
            throw e;
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
