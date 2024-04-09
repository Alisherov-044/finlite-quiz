import { PayloadAction, createSlice } from "@reduxjs/toolkit";

export type PracticeState = {
    department?: {
        id: number;
        title: string;
    };
    testQty?: number;
};

const initialState: PracticeState = {};

export const practiceSlice = createSlice({
    name: "practice",
    initialState,
    reducers: {
        setPractice: (state, { payload }: PayloadAction<PracticeState>) => {
            state.department = payload.department;
            state.testQty = payload.testQty;
        },
    },
});

export const { setPractice } = practiceSlice.actions;
