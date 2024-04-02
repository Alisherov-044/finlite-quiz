import { configureStore } from "@reduxjs/toolkit";
import { authSlice, langSlice } from "@/redux/slices";

export const store = configureStore({
    reducer: {
        auth: authSlice.reducer,
        lang: langSlice.reducer,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
