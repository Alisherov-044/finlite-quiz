import {
    Confirmation,
    Icons,
    Quiz,
    QuizHeader,
    QuizSkeleton,
} from "@/components";
import { TQuiz } from "@/components/quiz";
import { useDispatch, useOpen, useSelector, useTranslate } from "@/hooks";
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
import { Flex, Typography } from "antd";
import clsx from "clsx";
import { useQuery } from "react-query";
import {
    Navigate,
    useLocation,
    useNavigate,
    useParams,
} from "react-router-dom";

export default function PracticeDetailsPage() {
    const { t } = useTranslate();
    const { slug } = useParams();
    const location = useLocation();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { isOpen, open, close } = useOpen();
    const { department, testQty } = useSelector((state) => state.practice);
    const { items, currentTest, isLeaving } = useSelector(
        (state) => state.quiz
    );
    const { data: quizzes, isLoading } = useQuery<TQuiz[]>("practice-quiz", {
        queryFn: async () =>
            await [
                {
                    question: {
                        id: 1,
                        content:
                            "Какие методы необходимо использовать в различных режимах запроса при ведении учета по нескольким планам счетов или с использованием разделителя учета для получение итогов?",
                    },
                    answers: [
                        {
                            id: 1,
                            content:
                                "Если срок эксплуатации истек или истек срок годности, то оборудование должно быть списано.",
                            isCorrect: true,
                        },
                        {
                            id: 2,
                            content:
                                "Необходимо создать отчет о состоянии эксплуатируемого оборудования на выбранную дату",
                            isCorrect: false,
                        },
                        {
                            id: 3,
                            content:
                                "Необходимо создать отчет о состоянии эксплуатируемого",
                            isCorrect: false,
                        },
                        {
                            id: 4,
                            content:
                                "Необходимо создать отчет о состоянии эксплуатируемого",
                            isCorrect: false,
                        },
                    ],
                },
                {
                    question: {
                        id: 2,
                        content:
                            "Какие методы необходимо использовать в различных режимах запроса при ведении учета по нескольким планам счетов или с использованием разделителя учета для получение итогов?",
                    },
                    answers: [
                        {
                            id: 5,
                            content:
                                "Если срок эксплуатации истек или истек срок годности, то оборудование должно быть списано.",
                            isCorrect: true,
                        },
                        {
                            id: 6,
                            content:
                                "Необходимо создать отчет о состоянии эксплуатируемого оборудования на выбранную дату",
                            isCorrect: false,
                        },
                        {
                            id: 7,
                            content:
                                "Необходимо создать отчет о состоянии эксплуатируемого",
                            isCorrect: false,
                        },
                        {
                            id: 8,
                            content:
                                "Необходимо создать отчет о состоянии эксплуатируемого",
                            isCorrect: false,
                        },
                    ],
                },
                {
                    question: {
                        id: 3,
                        content:
                            "Какие методы необходимо использовать в различных режимах запроса при ведении учета по нескольким планам счетов или с использованием разделителя учета для получение итогов?",
                    },
                    answers: [
                        {
                            id: 9,
                            content:
                                "Если срок эксплуатации истек или истек срок годности, то оборудование должно быть списано.",
                            isCorrect: true,
                        },
                        {
                            id: 10,
                            content:
                                "Необходимо создать отчет о состоянии эксплуатируемого оборудования на выбранную дату",
                            isCorrect: false,
                        },
                        {
                            id: 11,
                            content:
                                "Необходимо создать отчет о состоянии эксплуатируемого",
                            isCorrect: false,
                        },
                        {
                            id: 12,
                            content:
                                "Необходимо создать отчет о состоянии эксплуатируемого",
                            isCorrect: false,
                        },
                    ],
                },
                {
                    question: {
                        id: 4,
                        content:
                            "Какие методы необходимо использовать в различных режимах запроса при ведении учета по нескольким планам счетов или с использованием разделителя учета для получение итогов?",
                    },
                    answers: [
                        {
                            id: 9,
                            content:
                                "Если срок эксплуатации истек или истек срок годности, то оборудование должно быть списано.",
                            isCorrect: true,
                        },
                        {
                            id: 10,
                            content:
                                "Необходимо создать отчет о состоянии эксплуатируемого оборудования на выбранную дату",
                            isCorrect: false,
                        },
                        {
                            id: 11,
                            content:
                                "Необходимо создать отчет о состоянии эксплуатируемого",
                            isCorrect: false,
                        },
                        {
                            id: 12,
                            content:
                                "Необходимо создать отчет о состоянии эксплуатируемого",
                            isCorrect: false,
                        },
                    ],
                },
                {
                    question: {
                        id: 5,
                        content:
                            "Какие методы необходимо использовать в различных режимах запроса при ведении учета по нескольким планам счетов или с использованием разделителя учета для получение итогов?",
                    },
                    answers: [
                        {
                            id: 9,
                            content:
                                "Если срок эксплуатации истек или истек срок годности, то оборудование должно быть списано.",
                            isCorrect: true,
                        },
                        {
                            id: 10,
                            content:
                                "Необходимо создать отчет о состоянии эксплуатируемого оборудования на выбранную дату",
                            isCorrect: false,
                        },
                        {
                            id: 11,
                            content:
                                "Необходимо создать отчет о состоянии эксплуатируемого",
                            isCorrect: false,
                        },
                        {
                            id: 12,
                            content:
                                "Необходимо создать отчет о состоянии эксплуатируемого",
                            isCorrect: false,
                        },
                    ],
                },
                {
                    question: {
                        id: 6,
                        content:
                            "Какие методы необходимо использовать в различных режимах запроса при ведении учета по нескольким планам счетов или с использованием разделителя учета для получение итогов?",
                    },
                    answers: [
                        {
                            id: 9,
                            content:
                                "Если срок эксплуатации истек или истек срок годности, то оборудование должно быть списано.",
                            isCorrect: true,
                        },
                        {
                            id: 10,
                            content:
                                "Необходимо создать отчет о состоянии эксплуатируемого оборудования на выбранную дату",
                            isCorrect: false,
                        },
                        {
                            id: 11,
                            content:
                                "Необходимо создать отчет о состоянии эксплуатируемого",
                            isCorrect: false,
                        },
                        {
                            id: 12,
                            content:
                                "Необходимо создать отчет о состоянии эксплуатируемого",
                            isCorrect: false,
                        },
                    ],
                },
                {
                    question: {
                        id: 7,
                        content:
                            "Какие методы необходимо использовать в различных режимах запроса при ведении учета по нескольким планам счетов или с использованием разделителя учета для получение итогов?",
                    },
                    answers: [
                        {
                            id: 9,
                            content:
                                "Если срок эксплуатации истек или истек срок годности, то оборудование должно быть списано.",
                            isCorrect: true,
                        },
                        {
                            id: 10,
                            content:
                                "Необходимо создать отчет о состоянии эксплуатируемого оборудования на выбранную дату",
                            isCorrect: false,
                        },
                        {
                            id: 11,
                            content:
                                "Необходимо создать отчет о состоянии эксплуатируемого",
                            isCorrect: false,
                        },
                        {
                            id: 12,
                            content:
                                "Необходимо создать отчет о состоянии эксплуатируемого",
                            isCorrect: false,
                        },
                    ],
                },
            ],
    });

    if (!department || !testQty) {
        return <Navigate to="/practice" state={{ from: location }} replace />;
    }

    function onFinish() {
        dispatch(finishQuiz());
        if (quizzes) {
            dispatch(setQuizData(quizzes));
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
                                {department.title}
                            </Typography>
                        </Flex>
                        <Typography className="font-semibold !text-blue-700">
                            {currentTest} / {testQty}
                        </Typography>
                    </Flex>
                    {isLoading || !quizzes ? (
                        <QuizSkeleton />
                    ) : (
                        <Quiz
                            quiz={quizzes[currentTest - 1]}
                            selectedAnswerId={
                                items.find(
                                    (item) =>
                                        item.questionId ===
                                        quizzes[currentTest - 1].question.id
                                )?.selectedAnswerId as number
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
                            currentTest === testQty
                                ? onFinish()
                                : dispatch(setCurrentTest(currentTest + 1))
                        }
                    >
                        <Typography>
                            {t(
                                currentTest === testQty
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
                            department: undefined,
                            testQty: undefined,
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
