import { PayloadAction, createSlice } from "@reduxjs/toolkit";

export type AuthState = {
    roles: number[];
    isAuthenticated: boolean;
};

const initialState: AuthState = {
    roles: [1312],
    isAuthenticated: true,
};

export const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        setAuth: (state, { payload }: PayloadAction<AuthState>) => {
            state = { ...state, ...payload };
        },
    },
});

export const { setAuth } = authSlice.actions;
