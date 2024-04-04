import { useEffect } from "react";
import { Flex, Typography } from "antd";
import { CountDown, Icons } from "@/components";
import { type TRole, TimeUnit } from "@/types";
import { Navigate, useLocation } from "react-router-dom";
import { useCountDown, useSelector, useTranslate } from "@/hooks";
import { convertTime, formatDate, formatTime, getCurrentRole } from "@/utils";

export type TExam = {
    starting_date: Date;
    starting_time: string;
    questions_qty: number;
    duration: number;
};

export type ExamCardProps = {
    exam: TExam;
    onEdit?: () => void;
    onDelete?: () => void;
    role: TRole;
};

export function ExamCard({ exam, onEdit, onDelete, role }: ExamCardProps) {
    const { starting_date, starting_time, questions_qty, duration } = exam;

    const location = useLocation();
    const { roles } = useSelector((state) => state.auth);
    const currentRole = getCurrentRole(roles);

    if (!currentRole) {
        return <Navigate to="/login" state={{ from: location }} replace />;
    }

    const { t } = useTranslate();
    const { time, start } = useCountDown(
        convertTime(
            new Date(
                `${starting_date.toLocaleDateString()} ${starting_time}`
            ).getTime() - new Date().getTime(),
            TimeUnit.Millisecond,
            TimeUnit.Second
        )
    );
    const { hours, minutes } = formatTime(duration * 60);
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
                <Typography>
                    {t("time")}: {hours} {t("hour")} {minutes} {t("minute")}
                </Typography>
            </Flex>
            <Flex className="items-end gap-x-6">
                {currentRole === "admin" && role === "admin" && (
                    <button className="underline" onClick={onDelete}>
                        {t("delete")}
                    </button>
                )}
                <Flex className="flex-col items-end gap-y-1">
                    <Typography>{t("time left")}</Typography>
                    <CountDown
                        days={leftDays}
                        hours={leftHours}
                        minutes={leftMinutes}
                        seconds={Math.round(leftSeconds)}
                    />
                </Flex>
            </Flex>
            {currentRole === "admin" && role === "admin" && (
                <button
                    onClick={onEdit}
                    className="flex items-center gap-x-1.5 absolute top-3 right-6"
                >
                    <Icons.edit /> {t("edit")}
                </button>
            )}
        </Flex>
    );
}
