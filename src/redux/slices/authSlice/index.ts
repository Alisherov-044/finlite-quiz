import { PayloadAction, createSlice } from "@reduxjs/toolkit";

export type AuthState = {
    roles: number[];
    isAuthenticated: boolean;
    name?: string;
};

const initialState: AuthState = {
    roles: [],
    isAuthenticated: true,
};

export const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        setAuth: (state, { payload }: PayloadAction<AuthState>) => {
            state = { ...state, ...payload };
            localStorage.setItem("user", JSON.stringify(state));
        },
    },
});

export const { setAuth } = authSlice.actions;
