/* eslint-disable no-shadow */

import axios from 'axios';
import moment from 'moment';

import { STORAGE_USER_INFO } from '@/constants';

import {
    IMPLICIT_GRANT_LINK,
    GET_USER_INFO,
    GET_REPOSITORIES,
    GET_PIPELINE_STATUS,
    CALL_BITBUCKET_API,
    TOGGLE_SELECTED_REPOSITORY,
} from './actions.type';

import {
    SET_USER_INFO,
    CLEAR_USER_INFO,
    SET_REPOSITORIES,
    SET_PIPELINES,
    SET_SELECTED_REPOSITORY,
} from './mutations.type';

function convertResultToLevel(result) {
    const LEVEL = {
        RUNNING: 5,
        FAILED: 3,
        STOPPED: 2,
        SUCCESSFUL: 0,
    };

    return LEVEL[result];
}

function convertResultToColor(result) {
    const COLOR = {
        FAILED: 'red',
        STOPPED: 'orange',
        RUNNING: 'lime',
        SUCCESSFUL: 'light-green',
    };

    return `${COLOR[result]}--text`;
}

function convertResultToIcon(result) {
    const ICON = {
        FAILED: 'error_outline',
        STOPPED: 'stop',
        RUNNING: 'refresh',
        SUCCESSFUL: 'done',
    };

    return ICON[result];
}

function formatPipelineTitle(x) {
    if (x.target.selector &&
        x.target.selector.type === 'custom') {
        return `${x.trigger.name}: trigger ${x.target.selector.type} ${x.target.selector.pattern}`;
    }

    return `${x.trigger.name}: trigger ${x.target.ref_type} ${x.target.ref_name}`;
}

const state = {
    clientId: process.env.VUE_APP_BITBUCKET_API,
    apiUrl: 'https://api.bitbucket.org/2.0',
    repositories: [],
    repositoriesHash: {},
    pipelines: [],
    userInfo: localStorage.getItem(STORAGE_USER_INFO) || '',
};

export const getters = {
    selectedRepositories({ repositories }) {
        return repositories.filter(x => x.selected);
    },
    getUserInfo({ userInfo }) {
        if (!userInfo) return null;

        try {
            return JSON.parse(userInfo);
        } catch (e) {
            console.log(e);
            return null;
        }
    },
};

export const mutations = {
    [SET_USER_INFO](state, data) {
        const userInfo = JSON.stringify({
            accountId: data.account_id,
            avatar: data.links.avatar.href,
            userLink: data.links.html.href,
            userName: data.username,
        });

        state.userInfo = userInfo;
        localStorage.setItem(STORAGE_USER_INFO, userInfo);
    },
    [CLEAR_USER_INFO](state) {
        localStorage.removeItem(STORAGE_USER_INFO);
        state.userInfo = '';
    },
    [SET_REPOSITORIES](state, data) {
        const values = data || {};

        state.repositoriesHash = values
            .map(x => {
                const fullName = x.full_name;
                const selected = localStorage.getItem(fullName) === 'true';

                return {
                    fullName,
                    name: x.name,
                    slug: x.slug,
                    uuid: x.uuid,
                    link: x.links.html.href,
                    updatedOn: moment(x.updated_on).fromNow(),
                    avatar: x.links.avatar.href,
                    selected,
                };
            })
            .reduce((a, b) => {
                const { fullName } = b;
                if (!a[fullName]) {
                    // eslint-disable-next-line no-param-reassign
                    a[fullName] = b;
                }

                return a;
            }, {});

        state.repositories = Object.values(state.repositoriesHash)
            .sort((a, b) => b.selected - a.selected);
    },
    [SET_PIPELINES](state, data) {
        const values = data || [];

        state.pipelines = values
            .map(x => x.map(y => {
                const fullName = y.repository.full_name;
                const pipelineTitle = formatPipelineTitle(y);
                const result = (y.state.result && y.state.result.name) || 'RUNNING';
                const resultLevel = convertResultToLevel(result);
                const resultColor = convertResultToColor(result);
                const resultIcon = convertResultToIcon(result);

                return {
                    uuid: y.uuid,
                    fullName,
                    id: y.build_number,
                    pipelineTitle,
                    status: y.state.name || '',
                    result,
                    resultLevel,
                    resultColor,
                    resultIcon,
                    userName: y.creator && y.creator.display_name,
                    avatar: y.creator && y.creator.links.avatar.href,
                    repoAvatar: state.repositoriesHash[fullName].avatar,
                    link: `https://bitbucket.org/${y.repository.full_name}/addon/pipelines/home#!/results/${y.build_number}`,
                    completedOn: moment(y.completed_on).fromNow(),
                    createdOn: moment(y.created_on).fromNow(),
                    time: moment(y.created_on).valueOf(),
                    buildSeconds: y.build_seconds_used,
                };
            }))
            .sort((a, b) => (b[0].resultLevel - a[0].resultLevel || b[0].time - a[0].time));
    },
    [SET_SELECTED_REPOSITORY](state, fullName) {
        const { selected } = state.repositoriesHash[fullName];
        const toggleSelected = !selected;
        state.repositoriesHash[fullName].selected = toggleSelected;

        if (toggleSelected) {
            localStorage.setItem(fullName, toggleSelected);
        } else {
            localStorage.removeItem(fullName);
        }
    },
};

export const actions = {
    [IMPLICIT_GRANT_LINK]({ state }) {
        return `https://bitbucket.org/site/oauth2/authorize?client_id=${state.clientId}&response_type=token`;
    },
    [TOGGLE_SELECTED_REPOSITORY]({ commit }, fullName) {
        commit(SET_SELECTED_REPOSITORY, fullName);
    },
    async [GET_USER_INFO]({ state, dispatch, commit }) {
        const url = `${state.apiUrl}/user?fields=account_id,links.avatar.href,links.html.href,username`;

        try {
            const res = await dispatch(CALL_BITBUCKET_API, url);

            if (res.status === 200) {
                commit(SET_USER_INFO, res.data);
            }
        } catch (e) {
            console.log(e);
        }
    },
    async [GET_REPOSITORIES]({
        state, dispatch, commit,
    }) {
        function loadAllRepos(url) {
            const repos = [];

            async function loadRepoUrl(url) {
                const res = await dispatch(CALL_BITBUCKET_API, url);

                if (res.status === 200) {
                    repos.push(res.data);
                    if (res.data.next) {
                        return loadRepoUrl(res.data.next);
                    }
                }

                return repos;
            }

            return loadRepoUrl(url);
        }

        try {
            const url = `${state.apiUrl}/repositories/?role=member&pagelen=100&sort=-updated_on`;
            const data = await loadAllRepos(url);

            commit(
                SET_REPOSITORIES,
                data.reduce((a, b) => a.concat(b.values), []),
            );
        } catch (e) {
            console.log(e);
        }
    },
    async [GET_PIPELINE_STATUS]({
        state, getters, dispatch, commit,
    }) {
        if (getters.selectedRepositories.length === 0) {
            await dispatch(GET_REPOSITORIES);
        }

        const MAX_PIPELINE_HISTORY = 5;
        const urls = getters.selectedRepositories
            .map(x => `${state.apiUrl}/repositories/${x.fullName}/pipelines/?sort=-created_on&pagelen=${MAX_PIPELINE_HISTORY}`);

        try {
            const res = await Promise.all(urls.map(x => dispatch(CALL_BITBUCKET_API, x)));

            const pipelines = res.filter(x => x.status === 200)
                .filter(x => x.data.size > 0)
                .map(x => x.data.values);

            commit(SET_PIPELINES, pipelines);
        } catch (e) {
            console.log(e);
        }
    },
    async [CALL_BITBUCKET_API]({ getters }, url) {
        const token = getters.getToken;

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
    state,
    actions,
    getters,
    mutations,
};
