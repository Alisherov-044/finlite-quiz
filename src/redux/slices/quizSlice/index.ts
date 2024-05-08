import { PayloadAction, createSlice } from "@reduxjs/toolkit";

export type TSelectedQuiz = {
    practice_question_id: number;
    variant_id: number | null;
};

export type TType = {
    id: number;
    description: string;
    variants: {
        id: number;
        content: string;
        is_right: boolean;
        question_id: number;
    }[];
};

export type TResult = {
    answer: {
        id: number;
        content: string;
        is_right: boolean;
    };
    correct_variant: {
        id: number;
        content: string;
        is_right: boolean;
    };
    id: number;
    description: string;
    variants: {
        id: number;
        content: string;
        is_right: boolean;
        question_id: number;
    }[];
};

export type QuizState = {
    id?: number;
    data: TType[];
    result: TResult[];
    items: TSelectedQuiz[];
    finished?: boolean;
    correct_answers?: number;
    questions_count?: number;
    currentTest: number;
    isLeaving: boolean;
    isQuizEnded: boolean;
};

const initialState: QuizState = {
    data: [],
    items: [],
    result: [],
    finished: false,
    currentTest: 1,
    isLeaving: false,
    isQuizEnded: false,
};

export const quizSlice = createSlice({
    name: "quiz",
    initialState,
    reducers: {
        setQuiz: (state, { payload }: PayloadAction<TSelectedQuiz>) => {
            if (state.finished) return;

            if (
                state.items.some(
                    (item) =>
                        item.practice_question_id ===
                        payload.practice_question_id
                )
            ) {
                state.items = state.items.map((item) =>
                    item.practice_question_id === payload.practice_question_id
                        ? {
                              ...item,
                              variant_id: payload.variant_id,
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
        setQuizData: (state, { payload }: PayloadAction<TType[]>) => {
            state.data = payload;
        },
        setResult: (state, { payload }: PayloadAction<TResult[]>) => {
            state.result = payload;
        },
        setLeaving: (state, { payload }: PayloadAction<boolean>) => {
            state.isLeaving = payload;
        },
        setCorrectAnswers: (state, { payload }: PayloadAction<number>) => {
            state.correct_answers = payload;
        },
        setQuestionsCount: (state, { payload }: PayloadAction<number>) => {
            state.questions_count = payload;
        },
        clearQuizData: (state) => {
            state.data = [];
        },
        endQuiz: (state, { payload }: PayloadAction<boolean>) => {
            state.isQuizEnded = payload;
        },
        setQuizId: (state, { payload }: PayloadAction<number>) => {
            state.id = payload;
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
    clearQuizData,
    setLeaving,
    endQuiz,
    setResult,
    setCorrectAnswers,
    setQuestionsCount,
    setQuizId,
} = quizSlice.actions;
