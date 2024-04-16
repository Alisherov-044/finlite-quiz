import { useMemo } from "react";
import { formatTime, generateAvatarColor } from "@/utils";
import { useTranslate } from "@/hooks";
import { Avatar, Button, Flex, Typography } from "antd";
import type { TUser } from "@/components/cards/user-card";

export type TResult = {
    correct_answers: number;
    incorrect_answers: number;
    duration: number;
};

export type UserResultsCardProps = {
    user: TUser;
    result: TResult;
};

export function UserResultsCard({ user, result }: UserResultsCardProps) {
    const { t } = useTranslate();
    const { first_name, last_name, group_id } = user;
    const { correct_answers, incorrect_answers, duration } = result;
    const { minutes, seconds } = formatTime(duration);
    const full_name = useMemo(
        () => `${first_name} ${last_name}`,
        [first_name, last_name]
    );

    return (
        <Flex className="items-center justify-between p-3 rounded-2xl shadow-main">
            <Flex className="items-center gap-x-5">
                <Avatar className={generateAvatarColor(first_name)}>
                    {first_name[0]}
                    {last_name[0]}
                </Avatar>
                <Flex className="flex-col gap-y-2">
                    <Flex className="items-center gap-x-4">
                        <Typography className="font-semibold text-lg">
                            {full_name}
                        </Typography>
                    </Flex>
                    <Typography className="font-bold">
                        {t(`${group_id}-guruch`)}
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
                <Flex className="flex-col items-center gap-y-2">
                    <Typography>{t("Vaqt")}</Typography>
                    <Typography>
                        {minutes}:{Math.round(seconds)}
                    </Typography>
                </Flex>
            </Flex>
            <Button
                type="text"
                className="!h-auto !px-4 !py-1.5 !bg-gray-200 text-black !capitalize !font-normal hover:!bg-gray-300 hover:text-black"
            >
                {t("Batafsil")}
            </Button>
        </Flex>
    );
}
