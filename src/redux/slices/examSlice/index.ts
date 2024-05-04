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
    finished?: boolean;
    id?: number;
};

const initialState: ExamState = {
    questions: null,
    duration: null,
    finished: false,
};

export const examSlice = createSlice({
    name: "exam",
    initialState,
    reducers: {
        setQuestions: (state, { payload }: PayloadAction<TExamQuestion[]>) => {
            state.questions = payload;
        },
        setExamId: (state, { payload }: PayloadAction<number | undefined>) => {
            state.id = payload;
        },
        finishQuestions: (state) => {
            state.finished = true;
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

export const {
    setQuestions,
    finishQuestions,
    clearQuestions,
    setDurations,
    clearDurations,
    setExamId,
} = examSlice.actions;
