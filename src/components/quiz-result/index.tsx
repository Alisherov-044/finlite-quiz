import { clsx } from "clsx";
import { useTranslate } from "@/hooks";
import { Flex, Row, Typography } from "antd";
import { ContentCol, HeaderCol, Title } from "./styles";
import { answerPrefixLetter, type TQuiz } from "@/components/quiz";

export type QuizResultProps = {
    quizzes: TQuiz[];
};

export function QuizResult({ quizzes }: QuizResultProps) {
    const { t } = useTranslate();

    return (
        <Flex className="w-fit flex-col border border-blue-300 rounded-md shadow-main">
            <Row className="flex flex-nowrap">
                <HeaderCol span={8}>
                    <Title level={2}>{t("Savol")}</Title>
                </HeaderCol>
                <HeaderCol span={8}>
                    <Title level={2}>{t("Berilgan javob")}</Title>
                </HeaderCol>
                <HeaderCol span={8}>
                    <Title level={2}>{t("To'g'ri javob")}</Title>
                </HeaderCol>
            </Row>
            {quizzes.map(({ question, answers, selected }, index) => (
                <Row
                    key={question.id}
                    className="w-fit flex flex-nowrap border-b border-blue-300 last-of-type:!border-none"
                >
                    <ContentCol
                        span={8}
                        className="flex gap-x-1 !text-gray-text"
                    >
                        <Typography className="text-nowrap">
                            {index + 1}.
                        </Typography>
                        <Typography>{t(question.content)}</Typography>
                    </ContentCol>
                    <ContentCol span={8}>
                        <Typography
                            className={clsx(
                                "font-medium",
                                answers.some(
                                    (answer) =>
                                        answer.id === selected &&
                                        answer.isCorrect
                                )
                                    ? "!text-success-main"
                                    : "!text-error-main"
                            )}
                        >
                            {answers.map(
                                (answer, index) =>
                                    answer.id === selected &&
                                    `${t(answerPrefixLetter[index])}) ${t(
                                        answer.content
                                    )}`
                            )}
                        </Typography>
                    </ContentCol>
                    <ContentCol span={8}>
                        {!answers.some(
                            (answer) =>
                                answer.id === selected && answer.isCorrect
                        ) &&
                            answers.map(
                                (answer, index) =>
                                    answer.isCorrect && (
                                        <Typography className="!text-gray-text">
                                            {`${t(
                                                answerPrefixLetter[index]
                                            )}) ${t(answer.content)}`}
                                        </Typography>
                                    )
                            )}
                    </ContentCol>
                </Row>
            ))}
        </Flex>
    );
}
