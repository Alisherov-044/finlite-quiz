import { PayloadAction, createSlice } from "@reduxjs/toolkit";

type TExamQuestion = {
    id: number;
    description: string;
    variants: {
        id: number;
        content: string;
    }[];
};

type ExamState = {
    questions: TExamQuestion[] | null;
};

const initialState: ExamState = {
    questions: null,
};

export const examSlice = createSlice({
    name: "exam",
    initialState,
    reducers: {
        setQuestions: (state, { payload }: PayloadAction<TExamQuestion[]>) => {
            state.questions = payload;
        },
        clearQuestions: (state) => {
            state.questions = null;
        },
    },
});

export const { setQuestions, clearQuestions } = examSlice.actions;
