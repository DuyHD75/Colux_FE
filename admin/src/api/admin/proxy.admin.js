import axios from 'axios';
import queryString from 'query-string';

const baseURL = "https://colux.site/";

const proxyAdmin = axios.create({
    baseURL,
    withCredentials: true,
    headers: {
        'Content-Type': 'application/json'
    },
    paramsSerializer: {
        encode: params => queryString.stringify(params)
    }
});

proxyAdmin.interceptors.request.use(async config => {
    return {
        ...config,
        headers: {
            ...config.headers,
            "Content-Type": "application/json"
        }
    };
});

proxyAdmin.interceptors.response.use((response) => {
    if (response && response.data) return response.data;
    return response;
}, (err) => {
    throw err.response.data;
});

export default proxyAdmin;