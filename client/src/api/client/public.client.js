import axios from 'axios';
import queryString from 'query-string'; // parse param to object 

// const baseURL = "http://34.121.114.152:8765/";
const baseURL = "http://10.12.2.182:8765/";


const publicClient = axios.create({
     baseURL,
     paramsSerializer: {
          encode: params => queryString.stringify(params)
     },
     withCredentials: true,
});

publicClient.interceptors.request.use(async config => {
     return {
          ...config,
          headers: {
               "Content-Type": "application/json"
          }
     };
});

publicClient.interceptors.response.use((response) => {
     if (response && response.data) return response.data;
     return response;
}, (err) => {
     throw err.response.data;
});


export default publicClient;