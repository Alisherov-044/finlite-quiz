import { clsx } from "clsx";
import {
    Icons,
    PageHeaderAction,
    PracticeCard,
    PracticeCardSkeleton,
    SelectPracticeMode,
} from "@/components";
import { options } from "@/components/data";
import { useDispatch, useOpen, useTranslate } from "@/hooks";
import { useState } from "react";
import { useQuery } from "react-query";
import { Empty, Flex, Row, Select, Typography } from "antd";
import { setPractice } from "@/redux/slices/practiceSlice";
import { useNavigate } from "react-router-dom";
import type { TPractice } from "@/components/cards/practice-card";
import {
    clearQuiz,
    endQuiz,
    setCurrentTest,
    unfinishQuiz,
} from "@/redux/slices/quizSlice";

export default function PracticePage() {
    const { t } = useTranslate();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { isOpen, open, close } = useOpen();
    const [_, setFilter] = useState<string>("");
    const { data: practices, isLoading } = useQuery<TPractice[]>("practices", {
        queryFn: async () =>
            await [
                {
                    id: 1,
                    date: new Date("2024-04-05"),
                    department: "1C Dasturi prinsiplari",
                    test_qty: 10,
                    correct_answers: 8,
                },
                {
                    id: 1,
                    date: new Date("2024-04-05"),
                    department: "1C Dasturi prinsiplari",
                    test_qty: 10,
                    correct_answers: 8,
                },
                {
                    id: 1,
                    date: new Date("2024-04-05"),
                    department: "1C Dasturi prinsiplari",
                    test_qty: 10,
                    correct_answers: 8,
                },
                {
                    id: 1,
                    date: new Date("2024-04-05"),
                    department: "1C Dasturi prinsiplari",
                    test_qty: 10,
                    correct_answers: 8,
                },
            ],
    });

    return (
        <main>
            <div
                className={clsx(
                    "flex flex-col container",
                    practices?.length && "!h-fit"
                )}
            >
                <PageHeaderAction
                    title={t("Amaliyot")}
                    btnText={t("Boshlash")}
                    description={
                        <Flex className="items-center gap-x-1.5">
                            <Icons.infoCircle />
                            <Typography className="!text-blue-300">
                                {t("Bu rejimda vaqt chegaralanmagan")}
                            </Typography>
                        </Flex>
                    }
                    onAction={open}
                />
                <Flex className="items-center justify-between py-8">
                    <Typography className="!text-sm font-bold !text-blue-900">
                        {t("Amaliyot tarixi")}
                    </Typography>
                    <Select
                        placeholder={t("Saralash")}
                        suffixIcon={<Icons.arrow.select />}
                        prefixCls="sort-select"
                        placement="bottomRight"
                        options={options}
                        onChange={(value) => setFilter(value)}
                    />
                </Flex>
                <SelectPracticeMode
                    isOpen={isOpen}
                    onSubmit={(values) => {
                        dispatch(clearQuiz());
                        dispatch(unfinishQuiz());
                        dispatch(setCurrentTest(1));
                        dispatch(setPractice(values));
                        dispatch(endQuiz(false));
                        navigate("/practice/quiz/1c-buxgalteriya");
                    }}
                    onCancel={close}
                />
                <Row
                    className={clsx(
                        "grid grid-cols-2 gap-5",
                        !practices?.length && "grid-cols-1 flex-auto"
                    )}
                >
                    {isLoading ? (
                        [...Array(3).keys()].map((key) => (
                            <PracticeCardSkeleton key={key} />
                        ))
                    ) : practices && practices.length ? (
                        practices.map((practice) => (
                            <PracticeCard
                                key={practice.id}
                                practice={practice}
                            />
                        ))
                    ) : (
                        <Flex className="flex-auto items-center justify-center">
                            <Empty description={false} />
                        </Flex>
                    )}
                </Row>
            </div>
        </main>
    );
}
