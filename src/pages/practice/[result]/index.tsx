import { Logo, QuizResult } from "@/components";
import { useDispatch, useSelector, useTranslate } from "@/hooks";
import { axiosPrivate } from "@/lib";
import { setPractice } from "@/redux/slices/practiceSlice";
import {
    clearQuiz,
    clearQuizData,
    endQuiz,
    finishQuiz,
    setCorrectAnswers,
    setCurrentTest,
    setQuestionsCount,
    setResult,
    unfinishQuiz,
} from "@/redux/slices/quizSlice";
import { setRedirectUrl } from "@/redux/slices/routeSlice";
import { PRACTICE_ANSWER_URL, PRACTICE_RESULT_URL } from "@/utils/urls";
import { Button, Flex, Typography } from "antd";
import { useEffect, useState } from "react";
import { useMutation } from "react-query";
import { Navigate, useLocation, useNavigate } from "react-router-dom";

export type TRequest = {
    practice_id: number;
    answers: {
        practice_question_id: number;
        variant_id: number | null;
    }[];
};

export default function PracticeResultPage() {
    const { t } = useTranslate();
    const dispatch = useDispatch();
    const location = useLocation();
    const navigate = useNavigate();
    const { category_ids } = useSelector((state) => state.practice);
    const { access_token } = useSelector((state) => state.auth);
    const { id, data, result, correct_answers, questions_count, items } =
        useSelector((state) => state.quiz);
    const [practiceRes, setPracticeRes] = useState(result);
    const [correctAnswers, setCorrect_Answers] = useState<number | undefined>(
        correct_answers
    );
    const [questionsCount, setQuestions_Count] = useState<number | undefined>(
        questions_count
    );
    const { mutate } = useMutation<any, Error, TRequest>({
        mutationFn: async (data) =>
            await axiosPrivate
                .post(PRACTICE_ANSWER_URL, data, {
                    headers: {
                        Authorization: `Bearer ${access_token}`,
                    },
                })
                .then((res) => res.data),
    });

    function getResult() {
        if (id) {
            try {
                mutate(
                    {
                        practice_id: id,
                        answers: items,
                    },
                    {
                        onSuccess: async () => {
                            const res = await axiosPrivate.get(
                                PRACTICE_RESULT_URL(id),
                                {
                                    headers: {
                                        Authorization: `Bearer ${access_token}`,
                                    },
                                }
                            );
                            dispatch(
                                setResult(
                                    res.data.data.practice_questions.map(
                                        // @ts-ignore
                                        (item) =>
                                            data.find(
                                                (each) => each.id === item.id
                                            )
                                                ? {
                                                      ...item,
                                                      variants: data.find(
                                                          (each) =>
                                                              each.id ===
                                                              item.id
                                                      )?.variants,
                                                  }
                                                : item
                                    )
                                )
                            );
                            dispatch(
                                setCorrectAnswers(
                                    res.data.data.correct_answers_count
                                )
                            );
                            dispatch(
                                setQuestionsCount(res.data.data.questions_count)
                            );
                            setCorrect_Answers(res.data.data.correct_answers);
                            setQuestions_Count(res.data.data.questions_count);
                            setPracticeRes(res.data.data.practice_questions);
                            window.location.reload();
                        },
                        onError: (error) => {
                            console.log(error.message);
                        },
                    }
                );
            } catch (error) {
                console.error(error);
            }
        }
    }

    useEffect(() => {
        try {
            getResult();
        } catch (error) {
            console.error(error);
        }
        dispatch(finishQuiz());
    }, []);

    if (!id) {
        return <Navigate to="/practice" state={{ from: location }} replace />;
    }

    function onFinish() {
        dispatch(unfinishQuiz());
        dispatch(clearQuiz());
        dispatch(
            setPractice({
                category_ids: undefined,
                question_count: undefined,
            })
        );
        dispatch(clearQuizData());
        dispatch(setCurrentTest(1));
        dispatch(endQuiz(true));
        dispatch(setRedirectUrl(null));
        navigate(`/practice`);
    }

    return (
        <main>
            <div className="container">
                <Flex className="justify-center mt-8 mb-20">
                    <Logo />
                </Flex>
                <Flex className="w-full flex-wrap gap-3 items-end justify-between mt-14 mb-6">
                    <Flex className="flex-col gap-y-2.5">
                        <Typography className="uppercase !text-lg !text-blue-500">
                            {t("Amaliyot")}
                        </Typography>
                        <Typography className="font-semibold !text-lg !text-blue-700">
                            {t("Bo'lim: ")}
                            {category_ids}
                        </Typography>
                    </Flex>
                    <Flex className="flex-col mt-5 lg:mt-0 lg:items-end gap-y-2.5">
                        <Typography className="!text-success-main">
                            {t("To'g'ri javoblar soni: ")}
                            {correctAnswers}
                        </Typography>
                        <Typography className="!text-error-main">
                            {t("Noto'g'ri javoblar soni: ")}
                            {questionsCount &&
                                correctAnswers &&
                                questionsCount - correctAnswers}
                        </Typography>
                    </Flex>
                </Flex>
            </div>
            <div className="overflow-scroll pl-4 lg:container lg:mx-auto lg:px-5">
                <QuizResult quizzes={practiceRes} />
            </div>
            <div className="container">
                <Flex className="opacity-0 pointer-events-none w-full mt-4">
                    <Flex className="items-center justify-end container">
                        <Button className="my-5">{t("Yakunlash")}</Button>
                    </Flex>
                </Flex>
                <Flex className="fixed bottom-0 left-0 w-full bg-white border-t mt-4">
                    <Flex className="items-center justify-end container">
                        <Button className="my-5" onClick={onFinish}>
                            {t("Yakunlash")}
                        </Button>
                    </Flex>
                </Flex>
            </div>
        </main>
    );
}
