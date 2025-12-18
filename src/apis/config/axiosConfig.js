import axios from "axios";

export const api = axios.create({
    baseURL: "http://localhost:8080",
});

api.interceptors.request.use(config => {
    const accessToken = localStorage.getItem("AccessToken");
    config.headers.Authorization = `Bearer ${accessToken}`;
    return config;
});

/**
 * const p = async () => { return 10 }; -> p를 호출 하였을 때 promise
 * 
 * const p = () => new promise((rs, rj) => { rs(10) });
 * 
 * const p2 = p();
 * 
 * p2.then (r => r = 10)
 */