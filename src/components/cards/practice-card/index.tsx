import { formatDate } from "@/utils";
import { useTranslate } from "@/hooks";
import { Flex, Typography } from "antd";
import { easeQuadInOut } from "d3-ease";
import { AnimatedProgressProvider } from "@/providers";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";

export type TPractice = {
    id: number;
    date: Date;
    department: string;
    test_qty: number;
    correct_answers: number;
};

export type PracticeCardProps = {
    practice: TPractice;
};

export function PracticeCard({ practice }: PracticeCardProps) {
    const { date, department, test_qty, correct_answers } = practice;

    const { t } = useTranslate();

    return (
        <Flex className="h-fit justify-between rounded-2xl p-4 border transition-all duration-300 shadow-main hover:shadow-main-lg">
            <Flex className="flex-col gap-y-2">
                <Typography>
                    {t("Sana")}: {formatDate(date)}
                </Typography>
                <Typography>
                    {t("Bo'lim")}: {department}
                </Typography>
                <Typography>
                    {t("Test soni")}: {test_qty}
                </Typography>
            </Flex>
            <Flex className="justify-end flex-wrap gap-0.5">
                <Typography className="!text-sm lg:text-2xl font-extrabold !text-blue-700 text-nowrap uppercase">
                    {t("To'g'ri javoblar")}
                </Typography>
                <AnimatedProgressProvider
                    valueStart={0}
                    valueEnd={correct_answers}
                    duration={1.4}
                    easingFunction={easeQuadInOut}
                >
                    {(value) => {
                        const roundedValue = Math.round(value);
                        return (
                            <CircularProgressbar
                                value={value}
                                maxValue={test_qty}
                                text={`${roundedValue}/${test_qty}`}
                                strokeWidth={15}
                                styles={buildStyles({
                                    rotation:
                                        0.5 +
                                        (1 - correct_answers / test_qty) / 2,
                                    pathTransition: "none",
                                    textColor: "#000",
                                    pathColor: "#8387c5",
                                    trailColor: "#c1c3e2",
                                })}
                            />
                        );
                    }}
                </AnimatedProgressProvider>
            </Flex>
        </Flex>
    );
}
