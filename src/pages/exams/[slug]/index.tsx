import { debounce } from "lodash";
import { Icons, UserResultsCard, UserResultsCardSkeleton } from "@/components";
import { useDispatch, useSelector, useTranslate } from "@/hooks";
import { Empty, Flex, Input, Typography } from "antd";
import { useQuery } from "react-query";
import { axiosPrivate } from "@/lib";
import { EXAM_RESULT_URL } from "@/utils/urls";
import { type ChangeEvent, useEffect, useMemo, useState } from "react";
import { AxiosError } from "axios";
import { setAuth } from "@/redux/slices/authSlice";
import { Navigate, useParams } from "react-router-dom";

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
        answer: null;
    }[];
};

export default function ExamsDetailsPage() {
    const { id } = useParams();
    const { t } = useTranslate();
    const { access_token } = useSelector((state) => state.auth);
    const [search, setSearch] = useState<string>("");
    const dispatch = useDispatch();
    const {
        data: result,
        isLoading,
        error,
    } = useQuery<TExamResult[], AxiosError<Error>>({
        queryFn: async () =>
            await axiosPrivate
                .get(EXAM_RESULT_URL(Number(id)), {
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

    useEffect(() => {
        return () => {
            debouncedSearch.cancel();
        };
    });

    const debouncedSearch = useMemo(
        () =>
            debounce(
                ({ target: { value } }: ChangeEvent<HTMLInputElement>) =>
                    setSearch(value),
                200
            ),
        []
    );

    return (
        <main>
            <div className="flex flex-col container">
                <Flex className="flex-col gap-y-4 mt-10">
                    <Flex className="items-center justify-between">
                        <Typography className="!text-sm font-bold !text-blue-900">
                            {t("O'qituvchilar ro'yxati")}
                        </Typography>
                    </Flex>
                    <Input
                        prefix={<Icons.search />}
                        placeholder={t("Qidirish...")}
                        prefixCls="search-input"
                        onChange={debouncedSearch}
                    />
                </Flex>
                <Flex className="flex-auto flex-col gap-y-5 mt-10">
                    {isLoading ? (
                        [...Array(3).keys()].map((key) => (
                            <UserResultsCardSkeleton key={key} />
                        ))
                    ) : result && result.length ? (
                        result
                            .filter((item) =>
                                search
                                    ? `${item.first_name} ${item.last_name}`
                                          .toLowerCase()
                                          .trim()
                                          .replaceAll(" ", "")
                                          .includes(
                                              search
                                                  .toLowerCase()
                                                  .trim()
                                                  .replaceAll(" ", "")
                                          )
                                    : true
                            )
                            .map((item) => (
                                <UserResultsCard
                                    key={item.student_id}
                                    userId={item.student_id}
                                    id={Number(id)}
                                    result={{
                                        correct_answers: item.trues_count,
                                        incorrect_answers: item.wrongs_count,
                                        duration: -1,
                                    }}
                                />
                            ))
                    ) : (
                        <Flex className="flex-auto items-center justify-center">
                            <Empty description={false} />
                        </Flex>
                    )}
                </Flex>
            </div>
        </main>
    );
}
