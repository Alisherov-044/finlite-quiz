import axios from "axios";

const baseURL = import.meta.env.VITE_BASE_URL;

export const axiosPublic = axios.create({
    baseURL,
});

export const axiosPrivate = axios.create({
    baseURL,
});
