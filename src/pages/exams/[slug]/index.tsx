import { debounce } from "lodash";
import { Icons, UserResultsCard, UserResultsCardSkeleton } from "@/components";
import { useTranslate } from "@/hooks";
import { options } from "@/components/data";
import { Empty, Flex, Input, Select, Typography } from "antd";
import { useQuery } from "react-query";
import { axiosPublic } from "@/lib";
import { STUDENTS_URL } from "@/utils/urls";
import { type ChangeEvent, useEffect, useMemo, useState } from "react";
import type { TStudentsResponse } from "@/pages/students";

export default function ExamsDetailsPage() {
    const { t } = useTranslate();
    const [search, setSearch] = useState<string>("");
    const [_, setFilter] = useState<string>("");
    const { data: students, isLoading: isLoading } =
        useQuery<TStudentsResponse>("students", {
            queryFn: async () =>
                await axiosPublic
                    .get(STUDENTS_URL)
                    .then((res) => res.data.data),
        });

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
                        <Select
                            placeholder={t("Saralash")}
                            suffixIcon={<Icons.arrow.select />}
                            prefixCls="sort-select"
                            placement="bottomRight"
                            options={options}
                            onChange={(value) => setFilter(value)}
                        />
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
