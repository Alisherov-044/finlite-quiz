import { formatDate } from "@/utils";
import { useTranslate } from "@/hooks";
import { Flex, Typography } from "antd";
import { easeQuadInOut } from "d3-ease";
import { AnimatedProgressProvider } from "@/providers";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import { useQuery } from "react-query";
import { axiosPublic } from "@/lib";
import { TDepartment } from "@/pages/departments";
import { DEPARTMENT_URL } from "@/utils/urls";
import { Loading } from "@/components/loading";

export type TPractice = {
    categories: {
        category_id: number;
    }[];
    correct_answers_count: number;
    created_at: string;
    id: number;
    questions_count: number;
    user_id: number;
};

export type PracticeCardProps = {
    practice: TPractice;
};

export type TDepartmentResponse = {
    data: TDepartment;
};

export function PracticeCard({ practice }: PracticeCardProps) {
    const { categories, correct_answers_count, created_at, questions_count } =
        practice;

    const { data: departments, isLoading: isDepartmentsLoading } =
        useQuery<TDepartmentResponse>("department", {
            queryFn: async () =>
                await axiosPublic
                    .get(DEPARTMENT_URL(categories[0].category_id))
                    .then((res) => res.data),
        });

    const { t } = useTranslate();

    if (isDepartmentsLoading) return <Loading />;

    return (
        <Flex className="h-fit justify-between rounded-2xl p-4 border transition-all duration-300 shadow-main hover:shadow-main-lg">
            <Flex className="flex-col gap-y-2">
                <Typography>
                    {t("Sana")}: {formatDate(new Date(created_at))}
                </Typography>
                <Typography>
                    {t("Bo'lim")}: {departments?.data?.name}
                </Typography>
                <Typography>
                    {t("Test soni")}: {questions_count}
                </Typography>
            </Flex>
            <Flex className="justify-end flex-wrap gap-0.5">
                <Typography className="!text-sm lg:text-2xl font-extrabold !text-blue-700 text-nowrap uppercase">
                    {t("To'g'ri javoblar")}
                </Typography>
                <AnimatedProgressProvider
                    valueStart={0}
                    valueEnd={correct_answers_count}
                    duration={1.4}
                    easingFunction={easeQuadInOut}
                >
                    {(value) => {
                        const roundedValue = Math.round(value);
                        return (
                            <CircularProgressbar
                                value={value}
                                maxValue={questions_count}
                                text={`${roundedValue}/${questions_count}`}
                                strokeWidth={15}
                                styles={buildStyles({
                                    rotation:
                                        0.5 +
                                        (1 -
                                            correct_answers_count /
                                                questions_count) /
                                            2,
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
