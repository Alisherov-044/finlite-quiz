import { AES } from "crypto-js";

const IMAGE_UPLOAD_CLIENT = import.meta.env.VITE_IMAGE_UPLOAD_CLIENT;
const IMAGE_UPLOAD_SECRET = import.meta.env.VITE_IMAGE_UPLOAD_SECRET;
const IMAGE_UPLOAD_KEY = import.meta.env.VITE_IMAGE_UPLOAD_KEY;

export const handleEncrypted = () =>
    AES.encrypt(
        JSON.stringify({
            client: IMAGE_UPLOAD_CLIENT,
            secret: IMAGE_UPLOAD_SECRET,
            time: Date.now(),
        }),
        IMAGE_UPLOAD_KEY
    ).toString();
