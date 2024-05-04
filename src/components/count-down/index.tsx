import { useTranslate } from "@/hooks";
import { formatNumber } from "@/utils";
import { Flex, Typography } from "antd";

export type CountDownProps = {
    days: number;
    hours: number;
    minutes: number;
    seconds: number;
};

export function CountDown({ days, hours, minutes, seconds }: CountDownProps) {
    const { t } = useTranslate();

    return (
        <Flex className="items-end justify-center gap-x-0.5 py-2 px-10 bg-error-main text-white !font-bold rounded-md">
            {days > 0 && (
                <>
                    <Flex className="flex-col items-center">
                        <Typography className="text-xs">{t("kun")}</Typography>
                        <Typography>{days}</Typography>
                    </Flex>
                    :
                </>
            )}
            <Flex className="flex-col items-center">
                <Typography className="text-xs">{t("soat")}</Typography>
                <Typography>{formatNumber(hours)}</Typography>
            </Flex>
            :
            <Flex className="flex-col items-center">
                <Typography className="text-xs">{t("daqiqa")}</Typography>
                <Typography>{formatNumber(minutes)}</Typography>
            </Flex>
            :
            <Flex className="flex-col items-center">
                <Typography className="text-xs">{t("soniya")}</Typography>
                <Typography>{formatNumber(seconds)}</Typography>
            </Flex>
        </Flex>
    );
}
