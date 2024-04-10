import { PayloadAction, createSlice } from "@reduxjs/toolkit";

export type RouteState = {
    previousLocation: string;
    redirectUrl: string | null;
};

const initialState: RouteState = {
    previousLocation: "",
    redirectUrl: null,
};

export const routeSlice = createSlice({
    name: "route",
    initialState,
    reducers: {
        setPreviousLocation: (state, { payload }: PayloadAction<string>) => {
            state.previousLocation = payload;
        },
        setRedirectUrl: (state, { payload }: PayloadAction<string | null>) => {
            state.redirectUrl = payload;
        },
    },
});

export const { setPreviousLocation, setRedirectUrl } = routeSlice.actions;
