import { Loading, QuizResult } from "@/components";
import { TUser } from "@/components/cards/user-card";
import { useDispatch, useSelector, useTranslate } from "@/hooks";
import { axiosPrivate } from "@/lib";
import { EXAM_RESULT_URL, STUDENTS_EDIT_URL } from "@/utils/urls";
import { useQuery } from "react-query";
import { Navigate, useLocation, useParams } from "react-router-dom";
import { Flex, Typography } from "antd";
import { AxiosError } from "axios";
import { setAuth } from "@/redux/slices/authSlice";

export type TExamResult = {
    student_id: number;
    first_name: string;
    last_name: string;
    trues_count: number;
    wrongs_count: number;
    answers: {
        id: number;
        description: string;
        correct_variant: {
            id: number;
            content: string;
            is_right: boolean;
        };
        answer: {
            variant: {
                id: number;
                content: string;
                is_right: boolean;
            };
        } | null;
    }[];
};

export default function ExamUserResultPage() {
    const { id, userId } = useParams();
    const { access_token } = useSelector((state) => state.auth);
    const { t } = useTranslate();
    const location = useLocation();
    const dispatch = useDispatch();

    const { data: user, isLoading: isUserLoading } = useQuery<TUser>(
        "student",
        {
            queryFn: async () =>
                await axiosPrivate
                    .get(STUDENTS_EDIT_URL(Number(userId)), {
                        headers: {
                            Authorization: `Bearer ${access_token}`,
                        },
                    })
                    .then((res) => res.data.data),
        }
    );

    const {
        data: result,
        isLoading: isResultLoading,
        error,
    } = useQuery<TExamResult, AxiosError<Error>>("result", {
        queryFn: async () =>
            await axiosPrivate
                .get(EXAM_RESULT_URL(Number(id), Number(userId)), {
                    headers: {
                        Authorization: `Bearer ${access_token}`,
                    },
                })
                .then((res) => res.data.data),
    });

    // @ts-ignore
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

    if (isUserLoading || isResultLoading) return <Loading />;

    return (
        <main className="my-3">
            <div className="container">
                <Flex className="items-center justify-between mb-4">
                    <Flex className="flex-col">
                        <Typography className="!text-blue-900 !text-xl">
                            {t(
                                `O'quvchi: ${
                                    user?.first_name + " " + user?.last_name
                                }`
                            )}
                        </Typography>
                    </Flex>
                    <Flex className="flex-col">
                        <Typography className="!text-success-main !text-lg">
                            {t(`To'gri javoblar soni: ${result?.trues_count}`)}
                        </Typography>
                        <Typography className="!text-error-main !text-lg">
                            {t(
                                `Noto'gri javoblar soni: ${result?.wrongs_count}`
                            )}
                        </Typography>
                    </Flex>
                </Flex>
                <QuizResult
                    // @ts-ignore
                    quizzes={result?.answers.map((item) => ({
                        ...item,
                        answer: item.answer?.variant,
                    }))}
                />
            </div>
        </main>
    );
}
