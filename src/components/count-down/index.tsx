import { Flex } from "antd";
import { useTranslate } from "@/hooks";

export type CountDownProps = {
    days: number;
    hours: number;
    minutes: number;
    seconds: number;
};

export function CountDown({ days, hours, minutes, seconds }: CountDownProps) {
    const { t } = useTranslate();

    return (
        <Flex className="items-center justify-center gap-x-0.5 py-2 px-10 bg-error-main text-white !font-bold rounded-md">
            {days > 0 && (
                <>
                    <span>{days + t("Day")}</span>:
                </>
            )}
            <span>{hours + t("Hour")}</span>:
            <span>{minutes + t("Minute")}</span>:
            <span>{seconds + t("Second")}</span>
        </Flex>
    );
}
