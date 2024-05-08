import { z } from "zod";
import { FormDrawer, Icons, PageHeaderAction } from "@/components";
import { FormItem, Col } from "@/components/styles";
import {
    useDispatch,
    useOpen,
    usePagination,
    useSelector,
    useTranslate,
} from "@/hooks";
import { getCurrentRole } from "@/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import {
    Button,
    Empty,
    Flex,
    Form,
    Input,
    Row,
    Table,
    TableProps,
    notification,
} from "antd";
import { debounce } from "lodash";
import { ChangeEvent, useEffect, useMemo, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { useMutation, useQuery } from "react-query";
import { Navigate, useLocation } from "react-router-dom";
import { axiosPrivate, axiosPublic } from "@/lib";
import { DEPARTMENTS_URL } from "@/utils/urls";
import { AxiosError } from "axios";
import { setAuth } from "@/redux/slices/authSlice";

type ColumnsType<T> = TableProps<T>["columns"];

export type TDepartment = {
    id: number;
    name: string;
};

export type TDepartmentsResponse = {
    data: TDepartment[];
    meta: {
        pageCount: number;
    };
};

const columns: ColumnsType<TDepartment> = [
    {
        title: null,
        dataIndex: "id",
        width: "10%",
        className: "id",
        key: "id",
    },
    {
        title: null,
        dataIndex: "name",
        width: "90%",
        key: "name",
    },
];

export const DepartmentsFormScheme = z.object({
    name: z.string(),
});

export default function DepartmentsPage() {
    const { t } = useTranslate();
    const { roles } = useSelector((state) => state.auth);
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
        data: departments,
        isLoading,
        refetch,
        error,
    } = useQuery<TDepartmentsResponse, AxiosError<{ error: string }>>(
        "departments",
        {
            queryFn: async () =>
                await axiosPublic
                    .get(DEPARTMENTS_URL(page, search))
                    .then((res) => res.data.data),
        }
    );
    const { currentPage, goTo } = usePagination(
        "departments-pagination",
        departments ? departments?.meta.pageCount : 1
    );
    const { mutate, isLoading: isSubmitting } = useMutation<
        TDepartmentsResponse,
        Error,
        Omit<TDepartment, "id">
    >({
        mutationFn: async (data) =>
            await axiosPrivate
                .post(DEPARTMENTS_URL(page), data)
                .then((res) => res.data),
    });
    const {
        handleSubmit,
        control,
        reset,
        formState: { isLoading: isFormLoading },
    } = useForm<z.infer<typeof DepartmentsFormScheme>>({
        resolver: zodResolver(DepartmentsFormScheme),
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

    const [tableParams, setTableParams] = useState({
        pagination: {
            current: 1,
            pageSize: 10,
            total: departments ? departments?.meta.pageCount * 10 : 10,
            onChange: (e: number) => goTo(e),
        },
    });

    useEffect(() => {
        setPage(currentPage);
        setTableParams({
            ...tableParams,
            pagination: { ...tableParams.pagination, current: currentPage },
        });
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

    function onCancel() {
        close();
        reset();
    }

    function onSubmit(values: z.infer<typeof DepartmentsFormScheme>) {
        mutate(values, {
            onSuccess: () => {
                notification.success({
                    message: t("Bo'lim yaratildi"),
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

    return (
        <main className="pb-10">
            <div className="flex flex-col container">
                {currentRole === "admin" ? (
                    <PageHeaderAction
                        title={t("Bo'lim yaratish")}
                        btnText={t("Bo'lim yaratish")}
                        onAction={open}
                    />
                ) : null}
                <Flex className="flex-col">
                    <Flex className="items-center justify-center border rounded-md !rounded-b-none p-2.5 mt-8">
                        <Input
                            prefix={<Icons.search />}
                            placeholder={t("Qidirish...")}
                            prefixCls="search-input"
                            onChange={debouncedSearch}
                        />
                    </Flex>
                    <Table
                        locale={{
                            emptyText: (
                                <Empty
                                    description={t("Ma'lumotlar mavjud emas")}
                                />
                            ),
                        }}
                        columns={columns}
                        loading={isLoading}
                        dataSource={departments?.data && departments.data}
                        pagination={tableParams.pagination}
                    />
                </Flex>

                <FormDrawer
                    open={isOpen}
                    width={600}
                    onCancel={onCancel}
                    title={t("Bo'lim Yaratish")}
                    footer={
                        <Button
                            className="!w-full"
                            form="departments-form"
                            htmlType="submit"
                            loading={isFormLoading || isSubmitting}
                            disabled={isFormLoading || isSubmitting}
                        >
                            {t("Yaratish")}
                        </Button>
                    }
                >
                    <Form
                        id="departments-form"
                        onFinish={handleSubmit(onSubmit)}
                    >
                        <Row>
                            <Col span={24}>
                                <FormItem label={t("Bo'lim nomi")}>
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
