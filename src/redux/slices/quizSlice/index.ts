import { TQuiz } from "@/components/quiz";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";

export type TSelectedQuiz = {
    questionId: number;
    selectedAnswerId: number | undefined;
};

export type QuizState = {
    data: TQuiz[];
    items: TSelectedQuiz[];
    finished?: boolean;
    currentTest: number;
};

const initialState: QuizState = {
    data: [],
    items: [],
    finished: false,
    currentTest: 1,
};

export const quizSlice = createSlice({
    name: "quiz",
    initialState,
    reducers: {
        setQuiz: (state, { payload }: PayloadAction<TSelectedQuiz>) => {
            if (state.finished) return;

            if (
                state.items.some(
                    (item) => item.questionId === payload.questionId
                )
            ) {
                state.items = state.items.map((item) =>
                    item.questionId === payload.questionId
                        ? {
                              ...item,
                              selectedAnswerId: payload.selectedAnswerId,
                          }
                        : item
                );
            } else {
                state.items = [...state.items, payload];
            }
        },
        setCurrentTest: (state, { payload }: PayloadAction<number>) => {
            state.currentTest = payload;
        },
        clearQuiz: (state) => {
            state.items = [];
        },
        finishQuiz: (state) => {
            state.finished = true;
        },
        unfinishQuiz: (state) => {
            state.finished = false;
        },
        setQuizData: (state, { payload }: PayloadAction<TQuiz[]>) => {
            state.data = payload;
        },
    },
});

export const {
    setQuiz,
    clearQuiz,
    setCurrentTest,
    finishQuiz,
    unfinishQuiz,
    setQuizData,
} = quizSlice.actions;
