import {
    Confirmation,
    Icons,
    Quiz,
    QuizHeader,
    QuizSkeleton,
} from "@/components";
import { useDispatch, useOpen, useSelector, useTranslate } from "@/hooks";
import { axiosPrivate } from "@/lib";
import { setPractice } from "@/redux/slices/practiceSlice";
import {
    clearQuiz,
    clearQuizData,
    endQuiz,
    finishQuiz,
    setCurrentTest,
    setLeaving,
    setQuizData,
    unfinishQuiz,
} from "@/redux/slices/quizSlice";
import { PRACTICE_CONTENT_URL } from "@/utils/urls";
import { Flex, Typography } from "antd";
import clsx from "clsx";
import { useQuery } from "react-query";
import {
    Navigate,
    useLocation,
    useNavigate,
    useParams,
} from "react-router-dom";
import { TPracticeContentResponse } from "..";

export type TPracticeQuizResponse = {
    data: TPracticeContentResponse;
};

export default function PracticeDetailsPage() {
    const { t } = useTranslate();
    const { slug } = useParams();
    const location = useLocation();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { isOpen, open, close } = useOpen();
    const { category_ids, question_count } = useSelector(
        (state) => state.practice
    );
    const { id, items, currentTest, isLeaving } = useSelector(
        (state) => state.quiz
    );
    const { data: quizzes, isLoading } = useQuery<TPracticeQuizResponse>(
        "practice-quiz",
        {
            queryFn: async () =>
                await axiosPrivate
                    .get(PRACTICE_CONTENT_URL(id!))
                    .then((res) => res.data),
            enabled: !!id,
        }
    );

    if (!id || !category_ids || !question_count) {
        return <Navigate to="/practice" state={{ from: location }} replace />;
    }

    function onFinish() {
        dispatch(finishQuiz());
        if (quizzes) {
            dispatch(setQuizData(quizzes.data.practice_questions));
        }
        navigate(`/practice/quiz/${slug}/result`);
    }

    function onCancelLeave() {
        close();
        dispatch(setLeaving(false));
    }

    return (
        <Flex className="h-full flex-col justify-between">
            <main className="flex-auto">
                <div className="h-full flex flex-col container">
                    <QuizHeader onExit={open} />
                    <Flex className="w-full items-end justify-between mt-14 mb-6">
                        <Flex className="flex-col gap-y-2.5">
                            <Typography className="uppercase !text-lg !text-blue-500">
                                {t("Amaliyot")}
                            </Typography>
                            <Typography className="font-semibold !text-lg !text-blue-700">
                                {t("Bo'lim: ")}
                                {category_ids}
                            </Typography>
                        </Flex>
                        <Typography className="font-semibold !text-blue-700">
                            {currentTest} / {question_count}
                        </Typography>
                    </Flex>
                    {isLoading || !quizzes ? (
                        <QuizSkeleton />
                    ) : (
                        <Quiz
                            quiz={
                                quizzes.data.practice_questions[currentTest - 1]
                            }
                            selectedAnswerId={
                                items.find(
                                    (item) =>
                                        item.practice_question_id ===
                                        quizzes.data.practice_questions[
                                            currentTest - 1
                                        ].question.id
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
                    <button
                        className={clsx("flex items-center gap-x-2.5")}
                        onClick={() =>
                            currentTest === question_count
                                ? onFinish()
                                : dispatch(setCurrentTest(currentTest + 1))
                        }
                    >
                        <Typography>
                            {t(
                                currentTest === question_count
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
                description={t("Amaliyotni tark etmoqchimisiz?")}
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
                    dispatch(clearQuizData());
                }}
            />
        </Flex>
    );
}
