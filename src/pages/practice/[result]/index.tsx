import { Logo, QuizResult } from "@/components";
import { useDispatch, useSelector, useTranslate } from "@/hooks";
import { setPractice } from "@/redux/slices/practiceSlice";
import {
    clearQuiz,
    finishQuiz,
    setCurrentTest,
    unfinishQuiz,
} from "@/redux/slices/quizSlice";
import { Button, Flex, Typography } from "antd";
import { useEffect } from "react";
import { Navigate, useLocation, useNavigate } from "react-router-dom";

export default function PracticeResultPage() {
    const { t } = useTranslate();
    const dispatch = useDispatch();
    const location = useLocation();
    const navigate = useNavigate();
    const { department } = useSelector((state) => state.practice);
    const { data, items } = useSelector((state) => state.quiz);

    useEffect(() => {
        dispatch(finishQuiz());
    }, []);

    const formattedData = data.map((item) => ({
        ...item,
        selected: items.find((each) => each.questionId === item.question.id)
            ?.selectedAnswerId,
    }));

    const correctAnswers = formattedData.filter(
        (item) =>
            item.selected === item.answers.find((each) => each.isCorrect)?.id
    ).length;
    const incorrectAnswers = data.length - correctAnswers;

    if (!department) {
        return <Navigate to="/practice" state={{ from: location }} replace />;
    }

    function onFinish() {
        dispatch(unfinishQuiz());
        dispatch(clearQuiz());
        dispatch(
            setPractice({
                department: undefined,
                testQty: undefined,
            })
        );
        dispatch(setCurrentTest(1));
        navigate(`/practice`);
    }

    return (
        <main className="container">
            <Flex className="justify-center mt-8 mb-20">
                <Logo />
            </Flex>
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
                <Flex className="flex-col items-end gap-y-2.5">
                    <Typography className="!text-success-main">
                        {t("To'g'ri javoblar soni: ")}
                        {correctAnswers}
                    </Typography>
                    <Typography className="!text-error-main">
                        {t("Noto'g'ri javoblar soni: ")}
                        {incorrectAnswers}
                    </Typography>
                </Flex>
            </Flex>
            <QuizResult quizzes={formattedData} />
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
        </main>
    );
}
