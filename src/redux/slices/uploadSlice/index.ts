import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import type { RcFile } from "antd/es/upload";
import type { TImageUpload } from "@/components/image-upload";

export type UploadState = {
    currentUploadedImage: TImageUpload | null;
    currentUploadedImageOrigin: RcFile | null;
};

const initialState: UploadState = {
    currentUploadedImage: null,
    currentUploadedImageOrigin: null,
};

export const uploadSlice = createSlice({
    name: "upload",
    initialState,
    reducers: {
        setCurrentUploadedImage: (
            state,
            { payload }: PayloadAction<TImageUpload | null>
        ) => {
            state.currentUploadedImage = payload;
        },
        setCurrentUploadedImageOrigin: (
            state,
            { payload }: PayloadAction<RcFile | null>
        ) => {
            state.currentUploadedImageOrigin = payload;
        },
    },
});

export const { setCurrentUploadedImage, setCurrentUploadedImageOrigin } =
    uploadSlice.actions;
