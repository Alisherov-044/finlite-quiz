import { z } from "zod";
import { FormDrawer, Icons, PageHeaderAction } from "@/components";
import { FormItem, Col } from "@/components/styles";
import { useOpen, useSelector, useTranslate } from "@/hooks";
import { getCurrentRole } from "@/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import {
    Button,
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

type ColumnsType<T> = TableProps<T>["columns"];

export type TDepartment = {
    id: number;
    name: string;
};

export type TDepartmentsResponse = {
    data: TDepartment[];
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

    if (!currentRole) {
        return <Navigate to="/login" state={{ from: location }} replace />;
    }

    const { isOpen, open, close } = useOpen();
    const {
        data: departments,
        isLoading,
        refetch,
    } = useQuery<TDepartmentsResponse>("departments", {
        queryFn: async () =>
            await axiosPublic.get(DEPARTMENTS_URL).then((res) => res.data.data),
    });
    const { mutate, isLoading: isSubmitting } = useMutation<
        TDepartmentsResponse,
        Error,
        Omit<TDepartment, "id">
    >({
        mutationFn: async (data) =>
            await axiosPrivate
                .post(DEPARTMENTS_URL, data)
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

    const [tableParams] = useState({
        pagination: {
            current: 1,
            pageSize: 10,
        },
    });
    const [search, setSearch] = useState<string>("");

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

    console.log(departments);

    return (
        <main>
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
                        columns={columns}
                        loading={isLoading}
                        dataSource={
                            departments?.data &&
                            departments.data.filter((item) =>
                                search
                                    ? item.name
                                          .toLocaleLowerCase()
                                          .includes(search.toLocaleLowerCase())
                                    : true
                            )
                        }
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
