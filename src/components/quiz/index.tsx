import { clsx } from "clsx";
import { useActive, useDispatch, useSelector, useTranslate } from "@/hooks";
import { Flex, Typography } from "antd";
import { setQuiz } from "@/redux/slices/quizSlice";
import { useEffect } from "react";
import { shuffleArray } from "@/utils";

export type TAnswer = {
    id: number;
    content: string;
    isCorrect: boolean;
};

export type TQuiz = {
    id: number;
    question: {
        id: number;
        description: string;
        variants: {
            id: number;
            content: string;
        }[];
    };
    answer: number | null;
};

export type QuizProps = {
    quiz: TQuiz;
    selectedAnswerId?: number;
};

export const answerPrefixLetter: Record<number, "A" | "B" | "C" | "D"> = {
    0: "A",
    1: "B",
    2: "C",
    3: "D",
};

export function Quiz({ quiz, selectedAnswerId }: QuizProps) {
    const { question } = quiz;
    const { t } = useTranslate();
    const { finished } = useSelector((state) => state.quiz);
    const dispatch = useDispatch();
    const { active, setActive } = useActive<number>(selectedAnswerId);
    const htmlTagContentRegex = /<[^>]*>([^<]*)<\/[^>]*>/g;

    const description = question.description
        .split(htmlTagContentRegex)
        .filter((item) => !item.startsWith("<") && !item.endsWith(">"))
        .filter((item) => item.length > 0)
        .join(" ");

    useEffect(() => {
        dispatch(
            setQuiz({
                practice_question_id: question.id,
                variant_id: active as number,
            })
        );
    }, [active]);

    return (
        <Flex className="flex-col lg:flex-row justify-between border border-blue-100 shadow-main rounded-md bg-white">
            <Flex className="w-full lg:w-1/2 flex-col gap-y-6 p-3 lg:p-9 border-b lg:border-b-0 lg:border-r border-blue-300">
                <Typography.Title
                    level={2}
                    className="text-lg font-semibold !text-blue-700 capitalize"
                >
                    {t("Savol")}
                </Typography.Title>
                <Typography className="font-semibold !text-gray-text">
                    {t(description)}
                </Typography>
            </Flex>
            <Flex className="w-full lg:w-1/2 flex-col gap-y-6 p-3 lg:p-9">
                <Typography.Title
                    level={2}
                    className="text-lg font-semibold !text-blue-700 capitalize"
                >
                    {t("Javob")}
                </Typography.Title>
                <Flex className="flex-col gap-y-4">
                    {shuffleArray(question.variants).map(
                        ({ id, content }, index) => (
                            <Flex
                                key={id}
                                onClick={() => !finished && setActive(id)}
                                className={clsx(
                                    "gap-x-3 p-3 border border-blue-500 rounded-md cursor-pointer select-none !text-blue-900",
                                    (active === id ||
                                        selectedAnswerId === id) &&
                                        "bg-blue-500 !text-white",
                                    finished && "cursor-not-allowed"
                                )}
                            >
                                <Typography className="text-nowrap">
                                    {t(answerPrefixLetter[index])}&#41;
                                </Typography>
                                <Typography>{t(content)}</Typography>
                            </Flex>
                        )
                    )}
                </Flex>
            </Flex>
        </Flex>
    );
}
