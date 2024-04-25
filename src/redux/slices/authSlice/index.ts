import { PayloadAction, createSlice } from "@reduxjs/toolkit";

export type AuthState = {
    id: number;
    roles: number[];
    isAuthenticated: boolean;
    name?: string;
    phone_number?: string;
    access_token: string;
    refresh_token: string;
};

const initialState: AuthState = {
    id: -1,
    roles: [],
    isAuthenticated: false,
    access_token: "",
    refresh_token: "",
};

export const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        setAuth: (state, { payload }: PayloadAction<AuthState>) => {
            state.id = payload.id;
            state.isAuthenticated = payload.isAuthenticated;
            state.roles = payload.roles;
            state.name = payload?.name;
            state.access_token = payload.access_token;
            state.refresh_token = payload.refresh_token;
            state.phone_number = payload?.phone_number;
        },
    },
});

export const { setAuth } = authSlice.actions;
