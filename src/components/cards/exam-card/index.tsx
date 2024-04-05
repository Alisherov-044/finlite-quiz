import { useEffect } from "react";
import { Button, Flex, Typography } from "antd";
import { Confirmation, CountDown, Icons } from "@/components";
import { TimeUnit } from "@/types";
import { Navigate, useLocation } from "react-router-dom";
import { useCountDown, useOpen, useSelector, useTranslate } from "@/hooks";
import { convertTime, formatDate, formatTime, getCurrentRole } from "@/utils";

export type TExam = {
    starting_date: Date;
    starting_time: string;
    questions_qty: number;
    duration?: number;
};

export type ExamCardProps = {
    exam: TExam;
    onEdit?: () => void;
    onDelete?: () => void;
};

export function ExamCard({ exam, onEdit, onDelete }: ExamCardProps) {
    const { starting_date, starting_time, questions_qty, duration } = exam;

    const location = useLocation();
    const { roles } = useSelector((state) => state.auth);
    const currentRole = getCurrentRole(roles);

    if (!currentRole) {
        return <Navigate to="/login" state={{ from: location }} replace />;
    }

    const { t } = useTranslate();
    const { isOpen, open, close } = useOpen();
    const timePeriod =
        new Date(
            `${starting_date.toLocaleDateString()} ${starting_time}`
        ).getTime() - new Date().getTime();
    const { time, start } = useCountDown(
        convertTime(
            timePeriod > 0 ? timePeriod : 0,
            TimeUnit.Millisecond,
            TimeUnit.Second
        )
    );
    const { hours, minutes } = formatTime((duration ?? 0) * 60);
    const {
        days: leftDays,
        hours: leftHours,
        minutes: leftMinutes,
        seconds: leftSeconds,
    } = formatTime(time);

    useEffect(() => {
        start();
    }, [time]);

    return (
        <Flex className="relative items-end justify-between p-6 border shadow-main rounded-2xl">
            <Flex className="flex-col gap-y-2 font-bold">
                <Typography>
                    {t("starting date")}: {formatDate(starting_date)}
                </Typography>
                <Typography>
                    {t("hour")}: {starting_time}
                </Typography>
                <Typography>
                    {t("questions qty")}: {questions_qty}
                </Typography>
                {duration ? (
                    time === 0 ? (
                        <Flex className="items-center gap-x-1 !text-blue-500 !text-sm">
                            <Icons.infoCircle />
                            <Typography>
                                {t("there is time limit in this mode")}
                            </Typography>
                        </Flex>
                    ) : (
                        <Typography>
                            {t("time")}: {hours} {t("hour")} {minutes}{" "}
                            {t("minute")}
                        </Typography>
                    )
                ) : (
                    <Flex className="items-center gap-x-1 !text-blue-500 !text-sm">
                        <Icons.infoCircle />
                        <Typography>
                            {t("there is no time limit in this mode")}
                        </Typography>
                    </Flex>
                )}
            </Flex>
            <Flex className="items-end gap-x-6">
                {currentRole === "admin" && (
                    <button className="underline" onClick={onDelete}>
                        {t("delete")}
                    </button>
                )}
                {time === 0 ? (
                    <Button className="!py-3" onClick={open}>
                        {t("start")}
                    </Button>
                ) : (
                    <Flex className="flex-col items-end gap-y-1">
                        <Typography>{t("time left")}</Typography>
                        <CountDown
                            days={leftDays}
                            hours={leftHours}
                            minutes={leftMinutes}
                            seconds={Math.round(leftSeconds)}
                        />
                    </Flex>
                )}
            </Flex>
            {currentRole === "admin" && (
                <button
                    onClick={onEdit}
                    className="flex items-center gap-x-1.5 absolute top-3 right-6"
                >
                    <Icons.edit /> {t("edit")}
                </button>
            )}

            <Confirmation
                primaryBtn
                btnText={t("start")}
                description={
                    <Flex className="flex-col">
                        <span>
                            {t(
                                duration
                                    ? "there is time limit in this mode"
                                    : "there is no time limit in this mode"
                            )}
                        </span>
                        {duration && (
                            <span>
                                {t(
                                    "${x} hours are allotted for the exam",
                                    `${hours}:${minutes}`
                                )}
                            </span>
                        )}
                    </Flex>
                }
                isOpen={isOpen}
                onCancel={close}
                onConfirm={() => {}}
                title={t("exam")}
            />
        </Flex>
    );
}
