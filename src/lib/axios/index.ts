import axios from "axios";
import { handleEncrypted } from "@/utils";

const baseURL = import.meta.env.VITE_BASE_URL;
const mediaBaseUrl = import.meta.env.VITE_MEDIA_BASE_URL;

export const axiosPublic = axios.create({
    baseURL,
    headers: {
        "Content-Type": "application/json",
    },
});

export const axiosPrivate = axios.create({
    baseURL,
    headers: {
        Authorization: `bearer ${1}`,
        "Content-Type": "application/json",
    },
});

export const axiosMedia = axios.create({
    baseURL: mediaBaseUrl,
    headers: {
        "x-auth-key": handleEncrypted(),
    },
});
