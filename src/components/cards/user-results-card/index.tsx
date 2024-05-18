import { useMemo } from "react";
import { generateAvatarColor } from "@/utils";
import { useSelector, useTranslate } from "@/hooks";
import { Avatar, Button, Flex, Typography } from "antd";
import type { TUser } from "@/components/cards/user-card";
import { useQuery } from "react-query";
import { axiosPrivate } from "@/lib";
import { STUDENTS_EDIT_URL } from "@/utils/urls";
import { AxiosError } from "axios";
import { Loading } from "@/components/loading";
import { useNavigate } from "react-router-dom";

export type TResult = {
    correct_answers: number;
    incorrect_answers: number;
    duration: number;
};

export type UserResultsCardProps = {
    id: number;
    userId: number;
    result: TResult;
    first_name: string;
    last_name: string;
};

export function UserResultsCard({
    id,
    userId,
    first_name,
    last_name,
    result,
}: UserResultsCardProps) {
    const { t } = useTranslate();
    const { access_token } = useSelector((state) => state.auth);
    const navigate = useNavigate();
    const { data: user, isLoading } = useQuery<TUser, AxiosError<Error>>(
        "student",
        {
            queryFn: async () =>
                await axiosPrivate
                    .get(STUDENTS_EDIT_URL(userId), {
                        headers: {
                            Authorization: `Bearer ${access_token}`,
                        },
                    })
                    .then((res) => res.data.data),
        }
    );
    const { correct_answers, incorrect_answers } = result;
    const full_name = useMemo(
        () => `${first_name} ${last_name}`,
        [first_name, last_name]
    );

    if (isLoading || !user) return <Loading />;

    return (
        <Flex className="items-center justify-between p-3 rounded-2xl shadow-main">
            <Flex className="items-center gap-x-5">
                <Avatar className={user ? generateAvatarColor(first_name) : ""}>
                    {first_name[0].toUpperCase()}
                    {last_name[0].toUpperCase()}
                </Avatar>
                <Flex className="flex-col gap-y-2">
                    <Flex className="items-center gap-x-4">
                        <Typography className="font-semibold text-lg">
                            {full_name}
                        </Typography>
                    </Flex>
                    <Typography className="font-bold">
                        {/* @ts-ignore */}
                        {t(`${user?.group.id}-guruh`)}
                    </Typography>
                </Flex>
            </Flex>
            <Flex className="items-center gap-x-10 capitalize">
                <Flex className="flex-col items-center gap-y-2 !text-success-main">
                    <Typography>{t(`To'g'ri javoblar`)}</Typography>
                    <Typography>{correct_answers}</Typography>
                </Flex>
                <Flex className="flex-col items-center gap-y-2 !text-error-main">
                    <Typography>{t(`Noto'g'ri javoblar`)}</Typography>
                    <Typography>{incorrect_answers}</Typography>
                </Flex>
            </Flex>
            <Button
                type="text"
                className="!h-auto !px-4 !py-1.5 !bg-gray-200 text-black !capitalize !font-normal hover:!bg-gray-300 hover:text-black"
                onClick={() => {
                    navigate(`/exams/results/${id}/${userId}`);
                }}
            >
                {t("Batafsil")}
            </Button>
        </Flex>
    );
}
