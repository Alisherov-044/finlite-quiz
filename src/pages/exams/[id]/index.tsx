import {
    Confirmation,
    ExamQuiz,
    Icons,
    QuizHeader,
    QuizSkeleton,
} from "@/components";
import {
    useCountDown,
    useDispatch,
    useOpen,
    useSelector,
    useTranslate,
} from "@/hooks";
import { axiosPrivate } from "@/lib";
import {
    finishQuestions,
    setDurations,
    setExamId,
} from "@/redux/slices/examSlice";
import { setPractice } from "@/redux/slices/practiceSlice";
import {
    clearQuiz,
    endQuiz,
    finishQuiz,
    setCurrentTest,
    setLeaving,
    unfinishQuiz,
} from "@/redux/slices/quizSlice";
import { formatNumber, formatTime } from "@/utils";
import { Flex, Typography } from "antd";
import { clsx } from "clsx";
import { useEffect, useState } from "react";
import { useMutation } from "react-query";
import { EXAM_ANSWER_URL } from "@/utils/urls";
import { Navigate, useLocation, useNavigate } from "react-router-dom";

export type TRequest = {
    exam_id: number;
    answers: {
        exam_question_id: number;
        variant_id: number | null;
    }[];
};

export default function ExamQuizPage() {
    const [finished, setFinished] = useState<boolean>(false);
    const { t } = useTranslate();
    const location = useLocation();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { isOpen, open, close } = useOpen();
    const { questions, duration, id } = useSelector((state) => state.exam);
    const { access_token } = useSelector((state) => state.auth);
    const { items, currentTest, isLeaving, isQuizEnded } = useSelector(
        (state) => state.quiz
    );
    const { mutate } = useMutation<any, Error, TRequest>({
        mutationFn: async (data) =>
            await axiosPrivate
                .post(EXAM_ANSWER_URL, data, {
                    headers: {
                        Authorization: `Bearer ${access_token}`,
                    },
                })
                .then((res) => res.data),
    });

    if (!questions?.length || !duration || duration <= 0 || isQuizEnded) {
        return <Navigate to="/exams" state={{ from: location }} replace />;
    }

    const { time, start } = useCountDown((duration / 1000) as number);
    const { hours, minutes, seconds } = formatTime(time);

    function onFinish() {
        setFinished(true);
        if (id) {
            try {
                mutate(
                    {
                        exam_id: id,
                        answers: items.map((item) => ({
                            ...item,
                            exam_question_id: item.practice_question_id,
                        })),
                    },
                    {
                        onSuccess: () => {
                            setFinished(true);
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

    function onCancelLeave() {
        close();
        dispatch(setLeaving(false));
    }

    function onCancelFinished() {
        setFinished(false);
    }

    useEffect(() => {
        start();
    }, []);

    useEffect(() => {
        if (hours <= 0 && minutes <= 0 && seconds <= 0) {
            onFinish();
        }
    }, [hours, minutes, seconds]);

    return (
        <Flex className="h-full flex-col justify-between">
            <main className="flex-auto">
                <div className="h-full flex flex-col container">
                    <QuizHeader onExit={open} />
                    <Flex className="w-full items-end justify-between mt-14 mb-6">
                        <Flex className="flex-col gap-y-2.5">
                            <Typography className="uppercase !text-lg !text-blue-500">
                                {t("Imtihon")}
                            </Typography>
                            <Typography className="font-semibold !text-lg !text-blue-700">
                                {t("Bo'lim: ")}
                            </Typography>
                        </Flex>
                        <Typography className="font-semibold !text-blue-700">
                            {currentTest} / {questions.length}
                        </Typography>
                    </Flex>
                    {!questions ? (
                        <QuizSkeleton />
                    ) : (
                        <ExamQuiz
                            quiz={{
                                question: questions[currentTest - 1],
                            }}
                            selectedAnswerId={
                                items.find(
                                    (item) =>
                                        item.practice_question_id ===
                                        questions[currentTest - 1].id
                                )?.variant_id as number
                            }
                        />
                    )}
                </div>
            </main>
            <Flex className="border-t mt-4">
                <Flex className="items-center justify-between container">
                    <button
                        className={clsx(
                            "flex items-center gap-x-2.5 py-6",
                            currentTest <= 1 && "opacity-0 pointer-events-none"
                        )}
                        onClick={() =>
                            dispatch(setCurrentTest(currentTest - 1))
                        }
                    >
                        <Icons.prev />
                        <Typography>{t("Oldingi savol")}</Typography>
                    </button>
                    <Flex className="items-center gap-x-2">
                        <Icons.oclock />
                        <Typography className="flex justify-start items-start gap-x-1.5">
                            <span>{t("Qolgan Vaqt:")}</span>
                            <span>{`${formatNumber(hours)}:${formatNumber(
                                minutes
                            )}:${formatNumber(seconds)}`}</span>
                        </Typography>
                    </Flex>
                    <button
                        className={clsx("flex items-center gap-x-2.5")}
                        onClick={() =>
                            currentTest === questions.length
                                ? onFinish()
                                : dispatch(setCurrentTest(currentTest + 1))
                        }
                    >
                        <Typography>
                            {t(
                                currentTest === questions.length
                                    ? "Yakunlash"
                                    : "Keyingi savol"
                            )}
                        </Typography>
                        <Icons.next />
                    </button>
                </Flex>
            </Flex>

            <Confirmation
                title={t("Chiqish")}
                description={t("Imtihonni tark etmoqchimisiz?")}
                btnText={t("Chiqish")}
                isOpen={isOpen || isLeaving}
                onCancel={onCancelLeave}
                onConfirm={() => {
                    dispatch(
                        setPractice({
                            category_ids: undefined,
                            question_count: undefined,
                        })
                    );
                    dispatch(setExamId(undefined));
                    dispatch(clearQuiz());
                    dispatch(unfinishQuiz());
                    dispatch(setCurrentTest(1));
                    dispatch(setLeaving(false));
                    dispatch(finishQuestions());
                    dispatch(finishQuiz());
                    dispatch(clearQuiz());
                    dispatch(endQuiz(true));
                    dispatch(setDurations(0));
                    navigate("/exams");
                }}
            />
            <Confirmation
                title={t("Imtihon yakunlandi")}
                description={t("Bosh sahifaga qaytish")}
                btnText={t("Yakunlash")}
                isOpen={finished}
                onCancel={onCancelFinished}
                onConfirm={() => {
                    dispatch(
                        setPractice({
                            category_ids: undefined,
                            question_count: undefined,
                        })
                    );
                    dispatch(clearQuiz());
                    dispatch(unfinishQuiz());
                    dispatch(setCurrentTest(1));
                    setFinished(false);
                    dispatch(endQuiz(true));
                    dispatch(finishQuestions());
                    dispatch(finishQuiz());
                    dispatch(clearQuiz());
                    dispatch(endQuiz(true));
                    dispatch(setDurations(0));
                    navigate("/exams");
                }}
            />
        </Flex>
    );
}
