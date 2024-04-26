import {
    Confirmation,
    ExamQuiz,
    Icons,
    Quiz,
    QuizHeader,
    QuizSkeleton,
} from "@/components";
import { useCountDown, useDispatch, useOpen, useSelector, useTranslate } from "@/hooks";
import { axiosPrivate } from "@/lib";
import { finishQuestions, setQuestions } from "@/redux/slices/examSlice";
import { setPractice } from "@/redux/slices/practiceSlice";
import {
    clearQuiz,
    endQuiz,
    finishQuiz,
    setCurrentTest,
    setLeaving,
    setQuizData,
    unfinishQuiz,
} from "@/redux/slices/quizSlice";
import { formatNumber, formatTime } from "@/utils";
import { Flex, Typography } from "antd";
import clsx from "clsx";
import { useEffect } from "react";
import { useQuery } from "react-query";
import {
    Navigate,
    useLocation,
    useNavigate,
    useParams,
} from "react-router-dom";

export default function ExamQuizPage() {
    const { t } = useTranslate();
    const { slug } = useParams();
    const location = useLocation();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { isOpen, open, close } = useOpen();
    const { questions, duration } = useSelector((state) => state.exam);
    const { items, currentTest, isLeaving } = useSelector(
        (state) => state.quiz
    );
    // const { data: quizzes, isLoading } = useQuery<any>("exam-quiz", {
    //     queryFn: async () => await axiosPrivate.get(""),
    // });

    if (!questions?.length) {
        return <Navigate to="/exams" state={{ from: location }} replace />;
    }

    // console.log(questions);
    const {time , start } = useCountDown(duration as number)
    const {hours, minutes,seconds} = formatTime(time)
    function onFinish() {
        dispatch(finishQuestions());
        if (questions) {
            dispatch(setQuestions(questions));
        }
        navigate(`/exams/quiz/${slug}/result`);
    }

    function onCancelLeave() {
        close();
        dispatch(setLeaving(false));
    }

    useEffect(() => {
        start()
    } , [])

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
                    <Typography className="flex justify-start items-start gap-x-1.5">
                        <span>{t("Qolgan Vaqt:")}</span>
                        <span>{`${formatNumber(hours)}:${formatNumber(minutes)}:${formatNumber(seconds)}`}</span>
                    </Typography>
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
                    dispatch(clearQuiz());
                    dispatch(unfinishQuiz());
                    dispatch(setCurrentTest(1));
                    dispatch(setLeaving(false));
                    dispatch(endQuiz(true));
                }}
            />
        </Flex>
    );
}
