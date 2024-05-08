import { clsx } from "clsx";
import { useTranslate } from "@/hooks";
import { Flex, Row, Typography } from "antd";
import { ContentCol, HeaderCol, Title } from "./styles";
import type { TResult } from "@/redux/slices/quizSlice";
import { variants } from "@/pages/tests/data";
import { Loading } from "../loading";

export type QuizResultProps = {
    quizzes: TResult[];
};

export function QuizResult({ quizzes }: QuizResultProps) {
    const { t } = useTranslate();
    const htmlTagContentRegex = /<[^>]*>([^<]*)<\/[^>]*>/g;

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
            {quizzes.map(
                ({ id, description, answer, correct_variant }, index) => (
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
                            <Typography>
                                {t(
                                    description
                                        .split(htmlTagContentRegex)
                                        .filter(
                                            (item) =>
                                                !item.startsWith("<") &&
                                                !item.endsWith(">")
                                        )
                                        .filter((item) => item.length > 0)
                                        .join(" ")
                                )}
                            </Typography>
                        </ContentCol>
                        <ContentCol span={8}>
                            <Typography
                                className={clsx(
                                    "font-medium",
                                    answer.is_right
                                        ? "!text-success-main"
                                        : "!text-error-main"
                                )}
                            >
                                {t(answer.content)}
                            </Typography>
                        </ContentCol>
                        <ContentCol span={8}>
                            {!answer.is_right && (
                                <Typography className="!text-gray-text">
                                    {`${t(correct_variant.content)}`}
                                </Typography>
                            )}
                        </ContentCol>
                    </Row>
                )
            )}
        </Flex>
    );
}
