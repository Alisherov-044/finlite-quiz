import { Loading, QuizResult } from "@/components";
import { TUser } from "@/components/cards/user-card";
import { useSelector, useTranslate } from "@/hooks";
import { axiosPrivate } from "@/lib";
import { EXAM_RESULT_URL, STUDENTS_EDIT_URL } from "@/utils/urls";
import { useQuery } from "react-query";
import { useParams } from "react-router-dom";
import { TExamResult } from "../[slug]";
import { Flex, Typography } from "antd";

export default function ExamUserResultPage() {
    const { id, userId } = useParams();
    const { access_token } = useSelector((state) => state.auth);
    const { t } = useTranslate();

    const { data: user, isLoading: isUserLoading } = useQuery<TUser>(
        "student",
        {
            queryFn: async () =>
                await axiosPrivate
                    .get(STUDENTS_EDIT_URL(Number(userId)), {
                        headers: {
                            Authorization: `Bearer ${access_token}`,
                        },
                    })
                    .then((res) => res.data.data),
        }
    );

    const { data: result, isLoading: isResultLoading } = useQuery<TExamResult>(
        "result",
        {
            queryFn: async () =>
                await axiosPrivate
                    .get(EXAM_RESULT_URL(Number(id), Number(userId)), {
                        headers: {
                            Authorization: `Bearer ${access_token}`,
                        },
                    })
                    .then((res) => res.data.data),
        }
    );

    if (isUserLoading || isResultLoading) return <Loading />;

    return (
        <main className="my-3">
            <div className="container">
                <Flex className="items-center justify-between mb-4">
                    <Flex className="flex-col">
                        <Typography className="!text-blue-900 !text-xl">
                            {t(
                                `O'quvchi: ${
                                    user?.first_name + " " + user?.last_name
                                }`
                            )}
                        </Typography>
                    </Flex>
                    <Flex className="flex-col">
                        <Typography className="!text-success-main !text-lg">
                            {t(`To'gri javoblar soni: ${result?.trues_count}`)}
                        </Typography>
                        <Typography className="!text-error-main !text-lg">
                            {t(
                                `Noto'gri javoblar soni: ${result?.wrongs_count}`
                            )}
                        </Typography>
                    </Flex>
                </Flex>
                {/* @ts-ignore */}
                <QuizResult quizzes={result?.answers} />
            </div>
        </main>
    );
}
