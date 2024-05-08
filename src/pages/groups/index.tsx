import { z } from "zod";
import { useMutation, useQuery } from "react-query";
import {
    useDispatch,
    useOpen,
    usePagination,
    useSelector,
    useTranslate,
} from "@/hooks";
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
    Pagination,
    Row,
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
import { AxiosError } from "axios";
import { setAuth } from "@/redux/slices/authSlice";

export const GroupFormScheme = z.object({
    name: z.string({ required_error: "this field is required" }),
});

export type TGroupsResponse = {
    data: TGroup[];
    meta: {
        pageCount: number;
    };
};

export default function GroupsPage() {
    const { t } = useTranslate();
    const { roles, access_token } = useSelector((state) => state.auth);
    const currentRole = getCurrentRole(roles);
    const location = useLocation();
    const dispatch = useDispatch();
    const [page, setPage] = useState<number>(1);
    const [search, setSearch] = useState<string>("");

    if (!currentRole) {
        return <Navigate to="/login" state={{ from: location }} replace />;
    }

    const { isOpen, open, close } = useOpen();
    const {
        data: groups,
        isLoading,
        refetch,
        error,
    } = useQuery<TGroupsResponse, AxiosError<{ error: string }>>("groups", {
        queryFn: async () =>
            await axiosPrivate
                .get(GROUPS_URL(page, search), {
                    headers: {
                        Authorization: `Bearer ${access_token}`,
                    },
                })
                .then((res) => res.data.data),
    });
    const { currentPage, goTo } = usePagination(
        "groups-pagination",
        groups ? groups?.meta.pageCount : 1
    );
    const { data: students, isLoading: isStudentsLoading } =
        useQuery<TStudentsResponse>({
            queryFn: async () =>
                await axiosPrivate
                    .get(STUDENTS_URL(1, "", 50), {
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
                .post(GROUPS_URL(page), data, {
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
        setPage(currentPage);
    }, [currentPage]);

    useEffect(() => {
        refetch();
    }, [page, search]);

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
                {["admin", "teacher"].includes(currentRole) ? (
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
                                        students?.data && students?.data.length
                                            ? students?.data.filter(
                                                  (student) =>
                                                      student.group_id ===
                                                      group.id
                                              )
                                            : []
                                    }
                                />
                            ))
                    ) : (
                        <Flex className="flex-auto items-center justify-center">
                            <Empty description={t("Ma'lumotlar mavjud emas")} />
                        </Flex>
                    )}
                </Flex>
                <Pagination
                    className="flex items-center justify-center"
                    current={currentPage}
                    onChange={(e) => goTo(e)}
                    pageSize={10}
                    total={groups && 10 * groups.meta.pageCount}
                />

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
