import axios from "axios";
import { handleEncrypted } from "@/utils";
import { baseURL, mediaBaseURL } from "@/utils/urls";

export const axiosPublic = axios.create({
    baseURL,
    headers: {
        "Content-Type": "application/json",
    },
});

export const axiosPrivate = axios.create({
    baseURL,
    headers: {
        "Content-Type": "application/json",
    },
});

export const axiosMedia = axios.create({
    baseURL: mediaBaseURL,
    headers: {
        "x-auth-key": handleEncrypted(),
    },
});

const responseInterceptorInstance = axiosPrivate.interceptors.response.use(
    (response) => response,
    async (error) => {
        const originalRequest = error.config;
        if (
            error.response.status === 401 &&
            originalRequest &&
            !originalRequest._retry
        ) {
            originalRequest._retry = true;
            location.href = "/login";
        }
        return await Promise.reject(error);
    }
);

const requestInterceptorInstance = axiosPrivate.interceptors.request.use(
    (config) => {
        return config;
    },
    async (error) => await Promise.reject(error)
);

axiosPrivate.interceptors.request.eject(requestInterceptorInstance);
axiosPrivate.interceptors.response.eject(responseInterceptorInstance);
