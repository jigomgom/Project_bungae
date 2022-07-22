import axios from "axios";
import { refresh, refreshError } from "./Refresh";

const AxiosAPI = axios.create({
    baseURL: process.env.REACT_APP_SERVER_URL
});

AxiosAPI.interceptors.request.use( refresh, refreshError );

export default AxiosAPI;