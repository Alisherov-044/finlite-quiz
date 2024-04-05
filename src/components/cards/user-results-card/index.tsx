import { formatTime } from "@/utils";
import { useTranslate } from "@/hooks";
import { Button, Flex, Typography } from "antd";
import { LazyLoadImage } from "react-lazy-load-image-component";

export type TUser = {
    image: string;
    full_name: string;
    group: number;
};

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
    const { image, full_name, group } = user;
    const { correct_answers, incorrect_answers, duration } = result;
    const { minutes, seconds } = formatTime(duration);

    return (
        <Flex className="items-center justify-between p-3 rounded-2xl shadow-main">
            <Flex className="items-center gap-x-5">
                <LazyLoadImage
                    loading="lazy"
                    effect="blur"
                    src={image}
                    width={56}
                    height={56}
                    alt={full_name}
                    className="rounded-full"
                />
                <Flex className="flex-col gap-y-2">
                    <Flex className="items-center gap-x-4">
                        <Typography className="font-semibold text-lg">
                            {full_name}
                        </Typography>
                    </Flex>
                    <Typography className="font-bold">
                        {t("${n}th group", group)}
                    </Typography>
                </Flex>
            </Flex>
            <Flex className="items-center gap-x-10 capitalize">
                <Flex className="flex-col items-center gap-y-2 !text-success-main">
                    <Typography>{t("correct answers")}</Typography>
                    <Typography>{correct_answers}</Typography>
                </Flex>
                <Flex className="flex-col items-center gap-y-2 !text-error-main">
                    <Typography>{t("incorrect answers")}</Typography>
                    <Typography>{incorrect_answers}</Typography>
                </Flex>
                <Flex className="flex-col items-center gap-y-2">
                    <Typography>{t("time")}</Typography>
                    <Typography>
                        {minutes}:{Math.round(seconds)}
                    </Typography>
                </Flex>
            </Flex>
            <Button
                type="text"
                className="!h-auto !px-4 !py-1.5 !bg-gray-200 text-black !capitalize !font-normal hover:!bg-gray-300 hover:text-black"
            >
                {t("in detail")}
            </Button>
        </Flex>
    );
}
