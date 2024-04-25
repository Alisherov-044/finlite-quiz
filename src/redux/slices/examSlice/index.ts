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
    duration: number | null;
};

const initialState: ExamState = {
    questions: null,
    duration: null,
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
        setDurations: (state, { payload }: PayloadAction<number>) => {
            state.duration = payload;
        },
        clearDurations: (state) => {
            state.duration = null;
        },
    },
});

export const { setQuestions, clearQuestions, setDurations, clearDurations } =
    examSlice.actions;
