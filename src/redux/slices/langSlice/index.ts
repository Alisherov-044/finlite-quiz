import { createSlice } from "@reduxjs/toolkit";

export type LangState = {
    currentLang: string;
};

const initialState: LangState = {
    currentLang: "uz",
};

export const langSlice = createSlice({
    name: "lang",
    initialState,
    reducers: {
        setLang: (state, { payload }) => {
            state.currentLang = payload;
            localStorage.setItem("lang", JSON.stringify(payload));
        },
    },
});

export const { setLang } = langSlice.actions;
