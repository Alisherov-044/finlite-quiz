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
// export type TTypeFinish = {
//     id: number;
//     user_id:number;
//     practice_questions: {
//         id: number;
//         answer:null | number;
//         question:{
//             id: number
//         }
//     }[];
// };

export type QuizState = {
    id?: number;
    data: TType[];
    items: TSelectedQuiz[];
    finished?: boolean;
    currentTest: number;
    isLeaving: boolean;
    isQuizEnded: boolean;
};

const initialState: QuizState = {
    data: [],
    items: [],
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
        setLeaving: (state, { payload }: PayloadAction<boolean>) => {
            state.isLeaving = payload;
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
    setQuizId,
} = quizSlice.actions;
