import { clsx } from "clsx";
import { useTranslate } from "@/hooks";
import { Flex, Row, Typography } from "antd";
import { ContentCol, HeaderCol, Title } from "./styles";
import { answerPrefixLetter } from "@/components/quiz";
import type { TType } from "@/redux/slices/quizSlice";
import { variants } from "@/pages/tests/data";
import { Loading } from "../loading";

type TQuiz = TType & {
    selected?: number | null;
};

export type QuizResultProps = {
    quizzes: TQuiz[];
};

export function QuizResult({ quizzes }: QuizResultProps) {
    const { t } = useTranslate();

    if (!variants.length || !quizzes.length) return <Loading />;

    return (
        <Flex className="w-full flex-col border border-blue-300 rounded-md shadow-main">
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
            {quizzes.map(({ id, description, variants, selected }, index) => (
                <Row
                    key={id}
                    className="w-full flex flex-nowrap border-b border-blue-300 last-of-type:!border-none"
                >
                    <ContentCol
                        span={8}
                        className="flex gap-x-1 !text-gray-text"
                    >
                        <Typography className="text-nowrap">
                            {index + 1}.
                        </Typography>
                        <Typography>{t(description)}</Typography>
                    </ContentCol>
                    <ContentCol span={8}>
                        <Typography
                            className={clsx(
                                "font-medium",
                                variants &&
                                    variants.some(
                                        (answer) =>
                                            answer.id === selected &&
                                            answer.is_right
                                    )
                                    ? "!text-success-main"
                                    : "!text-error-main"
                            )}
                        >
                            {variants &&
                                variants.map(
                                    (answer, index) =>
                                        answer.id === selected &&
                                        `${t(answerPrefixLetter[index])}) ${t(
                                            answer.content
                                        )}`
                                )}
                        </Typography>
                    </ContentCol>
                    <ContentCol span={8}>
                        {variants &&
                            variants.some(
                                (answer) =>
                                    answer.id === selected && !answer.is_right
                            ) &&
                            variants &&
                            variants.map(
                                (answer, index) =>
                                    answer.is_right && (
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
