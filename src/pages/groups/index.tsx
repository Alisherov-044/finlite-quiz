import { z } from "zod";
import { useMutation, useQuery } from "react-query";
import { useOpen, useSelector, useTranslate } from "@/hooks";
import { options } from "@/components/data";
import {
    FormDrawer,
    GroupCard,
    GroupCardSkeleton,
    Icons,
    PageHeaderAction,
} from "@/components";
import { debounce } from "lodash";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ChangeEvent, useEffect, useMemo, useState } from "react";
import {
    Button,
    Col,
    Empty,
    Flex,
    Form,
    Input,
    Row,
    Select,
    Typography,
    notification,
} from "antd";
import { FormItem } from "@/components/styles";
import { Navigate, useLocation } from "react-router-dom";
import { getCurrentRole } from "@/utils";
import { axiosPrivate } from "@/lib";
import { GROUPS_URL, STUDENTS_URL } from "@/utils/urls";
import type { TStudentsResponse } from "@/pages/students";
import type { TGroup } from "@/components/cards/group-card";

export const GroupFormScheme = z.object({
    name: z.string({ required_error: "this field is required" }),
});

export type TGroupsResponse = {
    data: TGroup[];
};

export default function GroupsPage() {
    const { t } = useTranslate();
    const { roles, access_token } = useSelector((state) => state.auth);
    const currentRole = getCurrentRole(roles);
    const location = useLocation();

    if (!currentRole) {
        return <Navigate to="/login" state={{ from: location }} replace />;
    }

    const { isOpen, open, close } = useOpen();
    const {
        data: groups,
        isLoading,
        refetch,
    } = useQuery<TGroupsResponse>("groups", {
        queryFn: async () =>
            await axiosPrivate
                .get(GROUPS_URL, {
                    headers: {
                        Authorization: `Bearer ${access_token}`,
                    },
                })
                .then((res) => res.data.data),
    });
    const { data: students, isLoading: isStudentsLoading } =
        useQuery<TStudentsResponse>({
            queryFn: async () =>
                await axiosPrivate
                    .get(STUDENTS_URL, {
                        headers: {
                            Authorization: `Bearer ${access_token}`,
                        },
                    })
                    .then((res) => res.data.data),
        });
    const { mutate, isLoading: isSubmitting } = useMutation<
        TGroupsResponse,
        Error,
        z.infer<typeof GroupFormScheme>
    >({
        mutationFn: async (data) =>
            await axiosPrivate
                .post(GROUPS_URL, data, {
                    headers: {
                        Authorization: `Bearer ${access_token}`,
                    },
                })
                .then((res) => res.data),
    });
    const {
        handleSubmit,
        control,
        reset,
        formState: { isLoading: isFormLoading },
    } = useForm<z.infer<typeof GroupFormScheme>>({
        resolver: zodResolver(GroupFormScheme),
    });
    const [search, setSearch] = useState<string>("");
    const [filter, setFilter] = useState<string>("");

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

    console.log(filter);

    function onSubmit(values: z.infer<typeof GroupFormScheme>) {
        mutate(values, {
            onSuccess: () => {
                notification.success({
                    message: t("Guruh yaratildi"),
                    icon: <Icons.checkCircle />,
                    closeIcon: false,
                });
                refetch();
                onCancel();
            },
            onError: (error) => {
                notification.error({
                    message: t(error.message),
                    closeIcon: false,
                });
            },
        });
    }

    function onCancel() {
        close();
        reset();
    }

    return (
        <main className="pb-10">
            <div className="flex flex-col container">
                {currentRole === "admin" ? (
                    <PageHeaderAction
                        title={t("Guruh yaratish")}
                        btnText={t("Guruh yaratish")}
                        onAction={open}
                    />
                ) : null}
                <Flex className="flex-col gap-y-4 mt-10">
                    <Flex className="items-center justify-between">
                        <Typography className="!text-sm font-bold !text-blue-900">
                            {t("Guruhlar ro'yhati")}
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
                <Flex className="pb-10 flex-auto flex-col gap-y-3 mt-10">
                    {isLoading || isStudentsLoading ? (
                        [...Array(3).keys()].map((key) => (
                            <GroupCardSkeleton key={key} />
                        ))
                    ) : groups?.data && groups.data.length ? (
                        groups.data
                            .filter((group) =>
                                search.length
                                    ? group.name
                                          .toLocaleLowerCase()
                                          .trim()
                                          .replaceAll(" ", "")
                                          .includes(
                                              search
                                                  .toLocaleLowerCase()
                                                  .trim()
                                                  .replaceAll(" ", "")
                                          )
                                    : true
                            )
                            .map((group) => (
                                <GroupCard
                                    group={group}
                                    students={
                                        students?.data.filter(
                                            (student) =>
                                                student.group_id === group.id
                                        ) ?? []
                                    }
                                />
                            ))
                    ) : (
                        <Flex className="flex-auto items-center justify-center">
                            <Empty description={t("Ma'lumotlar mavjud emas")} />
                        </Flex>
                    )}
                </Flex>

                <FormDrawer
                    open={isOpen}
                    width={600}
                    onCancel={onCancel}
                    title={t("Guruh Qo'shish")}
                    footer={
                        <Button
                            form="group-form"
                            htmlType="submit"
                            loading={isFormLoading || isSubmitting}
                            disabled={isFormLoading || isSubmitting}
                            className="!w-full"
                        >
                            {t("Qo'shish")}
                        </Button>
                    }
                >
                    <Form id="group-form" onFinish={handleSubmit(onSubmit)}>
                        <Row>
                            <Col span={24}>
                                <FormItem label={t("Guruh nomi")}>
                                    <Controller
                                        name="name"
                                        control={control}
                                        render={({ field }) => (
                                            <Input {...field} />
                                        )}
                                    />
                                </FormItem>
                            </Col>
                        </Row>
                    </Form>
                </FormDrawer>
            </div>
        </main>
    );
}
