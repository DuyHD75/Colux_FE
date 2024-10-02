import axios from "axios";
import queryString from "query-string"; // parse param to object

// const baseURL = "http://10.12.2.182:8765/";
const baseURL = "http://34.121.114.152:8765/";
const localhostBaseURL = "http://localhost:8765/";


// const baseURL = "http://34.121.114.152:8765/";
axios.defaults.withCredentials = true;
const privateClient = axios.create({
  baseURL,
  paramsSerializer: {
    encode: (params) => queryString.stringify(params),
  },
});

privateClient.interceptors.request.use(async (config) => {

  if (config.multipart) {
    return {
      ...config,
      headers: {
        ...config.headers,
        "Content-type": "multipart/form-data",
        Authorization: `Bearer ${localStorage.getItem("access-token")}`,
      },
    };
  }

  return {
    ...config,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("access-token")}`,
    },
  };
});

privateClient.interceptors.response.use(
  (response) => {
    if (response && response.data) return response.data;
    return response;
  },
  (err) => {
    throw err.response.data;
  }
);

export default privateClient;
