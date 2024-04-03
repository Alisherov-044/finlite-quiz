import { PayloadAction, createSlice } from "@reduxjs/toolkit";

export type AuthState = {
    roles: number[];
    isAuthenticated: boolean;
    name?: string;
};

const initialState: AuthState = {
    roles: [],
    isAuthenticated: false,
};

export const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        setAuth: (state, { payload }: PayloadAction<AuthState>) => {
            state.isAuthenticated = payload.isAuthenticated;
            state.roles = payload.roles;
            state.name = payload?.name;
        },
    },
});

export const { setAuth } = authSlice.actions;
