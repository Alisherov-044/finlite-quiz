import { clsx } from "clsx";
import {
    Icons,
    Loading,
    PageHeaderAction,
    PracticeCard,
    PracticeCardSkeleton,
    SelectPracticeMode,
} from "@/components";
import {
    useDispatch,
    useOpen,
    usePagination,
    useSelector,
    useTranslate,
} from "@/hooks";
import { useMutation, useQuery } from "react-query";
import { Empty, Flex, Pagination, Row, Typography, notification } from "antd";
import { PracticeState, setPractice } from "@/redux/slices/practiceSlice";
import { Navigate, useNavigate } from "react-router-dom";
import {
    clearQuiz,
    endQuiz,
    setCurrentTest,
    setQuizId,
    unfinishQuiz,
} from "@/redux/slices/quizSlice";
import { axiosPrivate } from "@/lib";
import { PRACTICE_HISTORY_URL, PRACTICE_URL } from "@/utils/urls";
import { AxiosError } from "axios";
import { setAuth } from "@/redux/slices/authSlice";
import { useEffect, useState } from "react";

export type TPracticeHistoryResponse = {
    data: {
        categories: {
            category_id: number;
        }[];
        correct_answers_count: number;
        created_at: string;
        id: number;
        questions_count: number;
        user_id: number;
    }[];
    meta: {
        pageCount: number;
    };
};

export type TPracticeResponse = {
    data: {
        categories: {
            id: number;
            name: string;
        }[];
        created_at: string;
        id: number;
        student: { id: number; first_name: string; last_name: string };
        updated_at: string;
        user_id: number;
    };
};

export type TPracticeContentResponse = {
    id: number;
    practice_questions: {
        id: number;
        answer: number | null;
        question: {
            id: number;
            description: string;
            variants: {
                id: number;
                content: string;
            }[];
        };
    }[];
    user_id: number;
    success: boolean;
    timestamp: string;
};

export default function PracticePage() {
    const { t } = useTranslate();
    const dispatch = useDispatch();
    const { id, access_token } = useSelector((state) => state.auth);
    const navigate = useNavigate();
    const { isOpen, open, close } = useOpen();
    const [page, setPage] = useState<number>(1);
    const {
        data: practices,
        isLoading,
        error,
        refetch,
    } = useQuery<TPracticeHistoryResponse, AxiosError<{ error: string }>>(
        "practices",
        {
            queryFn: async () =>
                await axiosPrivate
                    .get(PRACTICE_HISTORY_URL(id, page), {
                        headers: {
                            Authorization: `Bearer ${access_token}`,
                        },
                    })
                    .then((res) => res.data.data),
            enabled: !!id,
        }
    );

    const { mutate, isLoading: isSubmitting } = useMutation<
        TPracticeResponse,
        Error,
        PracticeState
    >({
        mutationFn: async (data) =>
            await axiosPrivate
                .post(PRACTICE_URL, data, {
                    headers: {
                        Authorization: `Bearer ${access_token}`,
                    },
                })
                .then((res) => res.data),
    });
    const { currentPage, goTo } = usePagination(
        "practice-pagination",
        practices ? practices?.meta.pageCount : 1
    );

    useEffect(() => {
        setPage(currentPage);
    }, [currentPage]);

    useEffect(() => {
        refetch();
    }, [page]);

    if (error?.response?.data.error === "JWT_EXPIRED") {
        dispatch(
            setAuth({
                id: -1,
                roles: [],
                isAuthenticated: false,
                access_token: "",
                refresh_token: "",
                name: undefined,
                phone_number: undefined,
            })
        );
        return <Navigate to="/login" state={{ from: location }} replace />;
    }

    if (isLoading) return <Loading />;

    return (
        <main className="pb-10">
            <div
                className={clsx(
                    "flex flex-col container",
                    (practices?.data.length || isLoading) && "!h-fit"
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
                </Flex>
                <SelectPracticeMode
                    isOpen={isOpen}
                    loading={isSubmitting}
                    onSubmit={(values) => {
                        mutate(values, {
                            onSuccess: async (data) => {
                                console.log(data);

                                notification.success({
                                    message: t("Amaliyot yaratildi"),
                                    icon: <Icons.checkCircle />,
                                    closeIcon: false,
                                });
                                if (data.data.id) {
                                    dispatch(setQuizId(data.data.id));
                                }
                                dispatch(clearQuiz());
                                dispatch(unfinishQuiz());
                                dispatch(setCurrentTest(1));
                                dispatch(setPractice(values));
                                dispatch(endQuiz(false));
                                if (data.data.id) {
                                    navigate(`/practice/quiz/${data.data.id}`);
                                }
                            },
                            onError: (error) => {
                                notification.error({
                                    message: t(error.message),
                                    icon: <Icons.closeCircle />,
                                    closeIcon: false,
                                });
                            },
                        });
                    }}
                    onCancel={close}
                />
                <Row
                    className={clsx(
                        "grid grid-cols-1 gap-5 lg:grid-cols-2",
                        isLoading && "!grid grid-cols-1 flex-auto",
                        !practices?.data.length && "!flex flex-auto"
                    )}
                >
                    {isLoading ? (
                        [...Array(4).keys()].map((key) => (
                            <PracticeCardSkeleton key={key} />
                        ))
                    ) : practices && practices.data.length ? (
                        practices.data.map((practice) => (
                            <PracticeCard
                                key={practice.id}
                                practice={practice}
                            />
                        ))
                    ) : (
                        <Flex className="w-full flex-auto items-center justify-center">
                            <Empty description={t("Ma'lumotlar mavjud emas")} />
                        </Flex>
                    )}
                </Row>
                <Pagination
                    className="flex items-center justify-center"
                    current={currentPage}
                    onChange={(e) => goTo(e)}
                    pageSize={10}
                    total={practices && 10 * practices.meta.pageCount}
                />
            </div>
        </main>
    );
}
