import { PayloadAction, createSlice } from "@reduxjs/toolkit";

export type PracticeState = {
    category_ids?: number[];
    question_count?: number;
};

const initialState: PracticeState = {};

export const practiceSlice = createSlice({
    name: "practice",
    initialState,
    reducers: {
        setPractice: (state, { payload }: PayloadAction<PracticeState>) => {
            state.category_ids = payload.category_ids;
            state.question_count = payload.question_count;
        },
    },
});

export const { setPractice } = practiceSlice.actions;
