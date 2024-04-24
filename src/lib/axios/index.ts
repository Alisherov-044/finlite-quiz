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
