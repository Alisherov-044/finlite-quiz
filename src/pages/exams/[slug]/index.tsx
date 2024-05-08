import { debounce } from "lodash";
import { Icons, UserResultsCard, UserResultsCardSkeleton } from "@/components";
import { useDispatch, useTranslate } from "@/hooks";
import { Empty, Flex, Input, Typography } from "antd";
import { useQuery } from "react-query";
import { axiosPublic } from "@/lib";
import { STUDENTS_URL } from "@/utils/urls";
import { type ChangeEvent, useEffect, useMemo, useState } from "react";
import type { TStudentsResponse } from "@/pages/students";
import { AxiosError } from "axios";
import { setAuth } from "@/redux/slices/authSlice";
import { Navigate } from "react-router-dom";

export default function ExamsDetailsPage() {
    const { t } = useTranslate();
    const [search, setSearch] = useState<string>("");
    const dispatch = useDispatch();
    const {
        data: students,
        isLoading: isLoading,
        error,
    } = useQuery<TStudentsResponse, AxiosError<Error>>("students", {
        queryFn: async () =>
            await axiosPublic.get(STUDENTS_URL()).then((res) => res.data.data),
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
                    ) : students?.data && students.data.length ? (
                        students.data
                            .filter((student) =>
                                search.length
                                    ? `${student.first_name} ${student.last_name}`
                                          .toLocaleLowerCase()
                                          .includes(search.toLocaleLowerCase())
                                    : true
                            )
                            .map((student) => (
                                <UserResultsCard
                                    key={student.id}
                                    user={student}
                                    result={{
                                        correct_answers: 16,
                                        incorrect_answers: 14,
                                        duration: 140,
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
