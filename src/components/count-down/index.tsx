import { Flex } from "antd";

export type CountDownProps = {
    days: number;
    hours: number;
    minutes: number;
    seconds: number;
};

export function CountDown({ days, hours, minutes, seconds }: CountDownProps) {
    return (
        <Flex className="items-center justify-center gap-x-0.5 py-2 px-10 bg-error-main text-white !font-bold rounded-md">
            {days > 0 && (
                <>
                    <span>{days + "D"}</span>:
                </>
            )}
            <span>{hours + "H"}</span>:<span>{minutes + "M"}</span>:
            <span>{seconds + "S"}</span>
        </Flex>
    );
}
