import * as helper from '../services/serviceHelpers';

import axios from 'axios';

const add = (payload) => {
    const config = {
        method: 'POST',
        url: `${helper.API_HOST_PREFIX}/api/newslettersubscriptions`,
        data: payload,
        withCredentials: true,
        crossdomain: true,
        headers: { 'Content-Type': 'application/json' },
    };
    return axios(config).then(helper.onGlobalSuccess).catch(helper.onGlobalError);
};

const getSubscriberStatus = (email) => {
    const config = {
        method: 'GET',
        url: `${helper.API_HOST_PREFIX}/api/newslettersubscriptions/${email}`,
        withCredentials: true,
        crossdomain: true,
        headers: { 'Content-Type': 'application/json' },
    };
    return axios(config).then(helper.onGlobalSuccess).catch(helper.onGlobalError);
};

const getSubscribers = (isSubscribed) => {
    const config = {
        method: 'GET',
        url: `${helper.API_HOST_PREFIX}/api/newslettersubscriptions/subs?isSubscribed=${isSubscribed}`,
        withCredentials: true,
        crossdomain: true,
        headers: { 'Content-Type': 'application/json' },
    };
    return axios(config).then(helper.onGlobalSuccess).catch(helper.onGlobalError);
};

const getSubscribersPaginated = (pageIndex, pageSize, isSubscribed) => {
    const config = {
        method: 'GET',
        url: `${helper.API_HOST_PREFIX}/api/newslettersubscriptions/paginatedsubs/?pageIndex=${pageIndex}&pageSize=${pageSize}&isSubscribed=${isSubscribed}`,
        withCredentials: true,
        crossdomain: true,
        headers: { 'Content-Type': 'application/json' },
    };
    return axios(config).then(helper.onGlobalSuccess).catch(helper.onGlobalError);
};

const getSubscribersSearchPaginated = (pageIndex, pageSize, query, isSubscribed) => {
    const config = {
        method: 'GET',
        url: `${helper.API_HOST_PREFIX}/api/newslettersubscriptions/search/?pageIndex=${pageIndex}&pageSize=${pageSize}&query=${query}&isSubscribed=${isSubscribed}`,
        withCredentials: true,
        crossdomain: true,
        headers: { 'Content-Type': 'application/json' },
    };
    return axios(config).then(helper.onGlobalSuccess).catch(helper.onGlobalError);
};

const updateSubscription = (payload) => {
    const config = {
        method: 'PUT',
        url: `${helper.API_HOST_PREFIX}/api/newslettersubscriptions/${payload.email}`,
        data: payload,
        withCredentials: true,
        crossdomain: true,
        headers: { 'Content-Type': 'application/json' },
    };
    return axios(config).then(helper.onGlobalSuccess).catch(helper.onGlobalError);
};

const newsletterSubscribersService = {
    add,
    getSubscriberStatus,
    getSubscribers,
    getSubscribersPaginated,
    updateSubscription,
    getSubscribersSearchPaginated,
};

export default newsletterSubscribersService;
