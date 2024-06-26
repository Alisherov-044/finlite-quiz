import { useEffect, useMemo } from "react";
import { Button, Flex, Typography } from "antd";
import { Confirmation, CountDown, Icons } from "@/components";
import { Navigate, useLocation, useNavigate } from "react-router-dom";
import {
    useCountDown,
    useDispatch,
    useOpen,
    useSelector,
    useTranslate,
} from "@/hooks";
import { formatDate, formatNumber, formatTime, getCurrentRole } from "@/utils";
import { setDurations } from "@/redux/slices/examSlice";
import {
    clearQuiz,
    endQuiz,
    setCurrentTest,
    unfinishQuiz,
} from "@/redux/slices/quizSlice";

export type TExam = {
    id: number;
    title: string;
    start: string;
    end: string;
    questions_count: number;
    participants_count: number;
};

export type ExamCardProps = {
    exam: TExam;
    onConfirm?: () => void;
    onEdit?: () => void;
    onDelete?: () => void;
    onBeforeEdit?: () => void;
    onBeforeEditCancel?: () => void;
};

export function ExamCard({
    exam,
    onConfirm,
    onEdit,
    onDelete,
    onBeforeEdit,
    onBeforeEditCancel,
}: ExamCardProps) {
    const {
        id,
        start: starting_date,
        end: ending_date,
        questions_count,
    } = exam;

    const location = useLocation();
    const { roles } = useSelector((state) => state.auth);
    const currentRole = getCurrentRole(roles);

    if (!currentRole) {
        return <Navigate to="/login" state={{ from: location }} replace />;
    }

    let options = {
        timeZone: "Asia/Tashkent",
        hour12: false,
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
    };
    // @ts-ignore
    let formatter = new Intl.DateTimeFormat("en-US", options);

    const { t } = useTranslate();
    const { isOpen, open, close } = useOpen();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const timePeriod =
        new Date(formatter.format(new Date(starting_date))).getTime() -
        new Date().getTime();
    const { time, start } = useCountDown(timePeriod / 1000);

    const duration =
        new Date(formatter.format(new Date(ending_date))).getTime() -
        new Date().getTime();

    const timeForExam = useMemo(() => {
        return (
            new Date(formatter.format(new Date(ending_date))).getTime() -
            new Date(formatter.format(new Date(starting_date))).getTime()
        );
    }, [starting_date, ending_date]);
    const { hours: timeForExamHours, minutes: timeForExamMinutes } = formatTime(
        timeForExam / 1000
    );
    const {
        days: leftDays,
        hours: leftHours,
        minutes: leftMinutes,
        seconds: leftSeconds,
    } = formatTime(time);

    const startingDate = useMemo(() => {
        return new Date(formatter.format(new Date(starting_date)));
    }, [starting_date]);

    useEffect(() => {
        start();
    }, [time]);

    return (
        <Flex className="relative items-end justify-between p-6 border shadow-main rounded-2xl">
            <Flex className="flex-col gap-y-2">
                <Typography>
                    {t("Boshlanish vaqti")}: {formatDate(startingDate)}
                </Typography>
                <Typography>
                    {t("Soat")}: {formatNumber(startingDate.getHours())}:
                    {formatNumber(startingDate.getMinutes())}:
                    {formatNumber(startingDate.getSeconds())}
                </Typography>
                <Typography>
                    {t("Savollar soni")}: {questions_count}
                </Typography>
                {duration ? (
                    time === 0 ? (
                        <Flex className="items-center gap-x-1 !text-blue-500 !text-sm">
                            <Icons.infoCircle />
                            <Typography>
                                {t("Bu rejimda vaqt chegaralangan")}
                            </Typography>
                        </Flex>
                    ) : (
                        <Typography>
                            {t("Vaqt")}: {timeForExamHours} {t("Soat")}{" "}
                            {timeForExamMinutes > 0 &&
                                formatNumber(timeForExamMinutes) + t("Daqiqa")}
                        </Typography>
                    )
                ) : (
                    <Flex className="items-center gap-x-1 !text-blue-500 !text-sm">
                        <Icons.infoCircle />
                        <Typography>
                            {t("Bu rejimda vaqt chegaralanmagan")}
                        </Typography>
                    </Flex>
                )}
            </Flex>
            <Flex className="items-end gap-x-6">
                {currentRole === "admin" && (
                    <button className="underline" onClick={onDelete}>
                        {t("O'chirish")}
                    </button>
                )}
                {time <= 0 ? (
                    <Button
                        className="!py-3"
                        onClick={() =>
                            ["teacher", "admin"].includes(currentRole)
                                ? navigate(`/exams/results/${id}`)
                                : open()
                        }
                    >
                        {t(
                            ["teacher", "admin"].includes(currentRole)
                                ? "Natijalar"
                                : "Boshlash"
                        )}
                    </Button>
                ) : (
                    <Flex className="flex-col items-end gap-y-1">
                        <Typography>{t("Qolgan vaqt")}</Typography>
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
                    onMouseOver={onBeforeEdit}
                    onMouseOut={onBeforeEditCancel}
                    onClick={onEdit}
                    className="flex items-center gap-x-1.5 absolute top-3 right-6"
                >
                    <Icons.edit /> {t("Tahrirlash")}
                </button>
            )}

            <Confirmation
                primaryBtn
                btnText={t("Boshlash")}
                description={
                    <Flex className="flex-col">
                        <span>
                            {t(
                                duration
                                    ? "Bu rejimda vaqt chegaralangan"
                                    : "Bu rejimda vaqt chegaralanmagan"
                            )}
                        </span>
                        {duration && (
                            <span>
                                {t(
                                    `Imtihon uchun ${formatNumber(
                                        timeForExamHours
                                    )}:${formatNumber(
                                        timeForExamMinutes
                                    )} soat vaqt ajratilgan`
                                )}
                            </span>
                        )}
                    </Flex>
                }
                isOpen={isOpen}
                onCancel={close}
                onConfirm={() => {
                    duration && duration > 0 && onConfirm?.();
                    dispatch(endQuiz(false));
                    dispatch(clearQuiz());
                    dispatch(unfinishQuiz());
                    dispatch(setCurrentTest(1));
                    dispatch(setDurations(duration));
                }}
                title={t("Imtihon")}
            />
        </Flex>
    );
}
