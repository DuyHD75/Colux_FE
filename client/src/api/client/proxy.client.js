import axios from 'axios';
import queryString from 'query-string';

const baseURL = "http://34.121.114.152:8765/";

// const baseURL = "http://localhost:8765/";

const proxyClient = axios.create({
    baseURL,
    withCredentials: true, 
    headers: {
        'Content-Type': 'application/json'  
    },
    paramsSerializer: {
        encode: params => queryString.stringify(params)
    },
});

proxyClient.interceptors.request.use(async config => {
    return {
        ...config,
        headers: {
            ...config.headers,
            "Content-Type": "application/json"  
        }
    };
});

proxyClient.interceptors.response.use((response) => {
    if (response && response.data) return response.data;
    return response;
}, (err) => {
    throw err.response.data;
});

export default proxyClient;
