import axios from "axios";

const axiosInstance = axios.create({
    baseURL: process.env.API_BASE,
});

export default axiosInstance;