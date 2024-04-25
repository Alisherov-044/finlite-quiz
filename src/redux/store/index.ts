import storage from "redux-persist/lib/storage";
import { combineReducers, configureStore } from "@reduxjs/toolkit";
import {
    authSlice,
    examSlice,
    langSlice,
    practiceSlice,
    quizSlice,
    routeSlice,
    sidebarSlice,
    uploadSlice,
} from "@/redux/slices";
import { persistReducer, persistStore } from "redux-persist";

const persistConfig = {
    key: "root",
    storage,
};

const rootReducer = combineReducers({
    auth: authSlice.reducer,
    lang: langSlice.reducer,
    practice: practiceSlice.reducer,
    quiz: quizSlice.reducer,
    route: routeSlice.reducer,
    upload: uploadSlice.reducer,
    sidebar: sidebarSlice.reducer,
    exam: examSlice.reducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: false,
        }),
});

export const persister = persistStore(store);
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
