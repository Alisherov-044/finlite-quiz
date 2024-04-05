import { clsx } from "clsx";
import { useActive, useTranslate } from "@/hooks";
import { Flex, Typography } from "antd";

export type TAnswer = {
    id: number;
    uz: string;
    ru: string;
    isCorrect: boolean;
};

export type QuizProps = {
    question: {
        id: number;
        uz: string;
        ru: string;
    };
    answers: TAnswer[];
    selected?: number;
};

const answerPrefixLetter: Record<number, "A" | "B" | "C" | "D"> = {
    0: "A",
    1: "B",
    2: "C",
    3: "D",
};

export function Quiz({ question, answers, selected }: QuizProps) {
    const { t, currentLng } = useTranslate();
    const { active, setActive } = useActive(selected);

    return (
        <Flex className="justify-between border border-blue-100 shadow-main rounded-md bg-white">
            <Flex className="w-1/2 flex-col gap-y-6 p-9 border-r border-blue-300">
                <Typography.Title
                    level={2}
                    className="text-lg font-semibold !text-blue-700 capitalize"
                >
                    {t("question")}
                </Typography.Title>
                <Typography className="font-semibold !text-gray-text">
                    {currentLng === "ru" ? question.ru : question.uz}
                </Typography>
            </Flex>
            <Flex className="w-1/2 flex-col gap-y-6 p-9">
                <Typography.Title
                    level={2}
                    className="text-lg font-semibold !text-blue-700 capitalize"
                >
                    {t("answer")}
                </Typography.Title>
                <Flex className="flex-col gap-y-4">
                    {answers.map(({ id, uz, ru }, index) => (
                        <Flex
                            key={id}
                            onClick={() => setActive(id)}
                            className={clsx(
                                "gap-x-3 p-3 border border-blue-500 rounded-md cursor-pointer select-none !text-blue-900",
                                active === id && "bg-blue-500 !text-white"
                            )}
                        >
                            <Typography className="text-nowrap">
                                {t(answerPrefixLetter[index])}&#41;
                            </Typography>
                            <Typography>
                                {currentLng === "ru" ? ru : uz}
                            </Typography>
                        </Flex>
                    ))}
                </Flex>
            </Flex>
        </Flex>
    );
}
