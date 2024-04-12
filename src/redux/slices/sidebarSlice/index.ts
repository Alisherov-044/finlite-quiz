import { createSlice } from "@reduxjs/toolkit";

export type SidebarState = {
    isOpen: boolean;
};

const initialState: SidebarState = {
    isOpen: false,
};

export const sidebarSlice = createSlice({
    name: "sidebar",
    initialState,
    reducers: {
        open: (state) => {
            state.isOpen = true;
        },
        close: (state) => {
            state.isOpen = false;
        },
    },
});

export const { open, close } = sidebarSlice.actions;
