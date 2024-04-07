import { z } from "zod";
import { FormDrawer, Icons, PageHeaderAction } from "@/components";
import { FormItem } from "@/components/styles";
import { useOpen, useSelector, useTranslate } from "@/hooks";
import { getCurrentRole } from "@/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import {
    Button,
    Col,
    Flex,
    Form,
    Input,
    Row,
    Select,
    Table,
    TableProps,
    notification,
} from "antd";
import { debounce } from "lodash";
import { ChangeEvent, useEffect, useMemo, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { useQuery } from "react-query";
import { Navigate, useLocation } from "react-router-dom";

type ColumnsType<T> = TableProps<T>["columns"];

export type TTest = {
    id: number;
    test: string;
};

const columns: ColumnsType<TTest> = [
    {
        title: null,
        dataIndex: "id",
        width: "10%",
        className: "id",
    },
    {
        title: null,
        dataIndex: "test",
        width: "90%",
    },
];

export const TeacherFormScheme = z.object({
    full_name: z.string({ required_error: "this field is required" }),
    email: z.string({ required_error: "this field is require" }),
    password: z.string({ required_error: "this field is require" }),
});

export default function TestsPage() {
    const { t } = useTranslate();
    const { roles } = useSelector((state) => state.auth);
    const currentRole = getCurrentRole(roles);
    const location = useLocation();

    if (!currentRole) {
        return <Navigate to="/login" state={{ from: location }} replace />;
    }

    const { isOpen, open, close } = useOpen();
    const { data: tests, isLoading } = useQuery<TTest[]>("tests", {
        queryFn: async () =>
            await [
                {
                    id: 1,
                    test: "test",
                },
                {
                    id: 1,
                    test: "test",
                },
                {
                    id: 1,
                    test: "test",
                },
                {
                    id: 1,
                    test: "test",
                },
                {
                    id: 1,
                    test: "test",
                },
                {
                    id: 1,
                    test: "test",
                },
                {
                    id: 1,
                    test: "test",
                },
                {
                    id: 1,
                    test: "test",
                },
                {
                    id: 1,
                    test: "test",
                },
                {
                    id: 1,
                    test: "test",
                },
                {
                    id: 1,
                    test: "test",
                },
                {
                    id: 1,
                    test: "test",
                },
                {
                    id: 1,
                    test: "test",
                },
            ],
    });
    const {
        handleSubmit,
        control,
        reset,
        formState: { isLoading: isFormLoading },
    } = useForm<z.infer<typeof TeacherFormScheme>>({
        resolver: zodResolver(TeacherFormScheme),
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

    function onSubmit(values: z.infer<typeof TeacherFormScheme>) {
        console.log(values);
        notification.success({
            message: t("Test yaratildi"),
            icon: <Icons.checkCircle />,
            closeIcon: false,
        });
        onCancel();
    }

    return (
        <main className="flex flex-col">
            {currentRole === "admin" ? (
                <PageHeaderAction
                    title={t("Test yaratish")}
                    btnText={t("Test yaratish")}
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
                    dataSource={tests?.filter((item) =>
                        search
                            ? item.test
                                  .toLocaleLowerCase()
                                  .includes(search.toLocaleLowerCase())
                            : true
                    )}
                    pagination={tableParams.pagination}
                />
            </Flex>

            <FormDrawer
                open={isOpen}
                width={600}
                onClose={onCancel}
                onCancel={onCancel}
                title={t("Test Yaratish")}
                footer={
                    <Flex className="w-full items-center justify-between">
                        <Select />
                        <Button
                            form="teacher-form"
                            htmlType="submit"
                            loading={isFormLoading}
                            disabled={isFormLoading}
                        >
                            {t("Yaratish")}
                        </Button>
                    </Flex>
                }
            >
                <Form id="teacher-form" onFinish={handleSubmit(onSubmit)}>
                    <Row>
                        <Col span={24}>
                            <FormItem label={t("F.I.SH")}>
                                <Controller
                                    name="full_name"
                                    control={control}
                                    render={({ field }) => <Input {...field} />}
                                />
                            </FormItem>
                        </Col>
                    </Row>
                    <Row gutter={24}>
                        <Col span={12}>
                            <FormItem label={t("Login")}>
                                <Controller
                                    name="email"
                                    control={control}
                                    render={({ field }) => <Input {...field} />}
                                />
                            </FormItem>
                        </Col>
                        <Col span={12}>
                            <FormItem label={t("Parol")}>
                                <Controller
                                    name="password"
                                    control={control}
                                    render={({ field }) => (
                                        <Input.Password {...field} />
                                    )}
                                />
                            </FormItem>
                        </Col>
                    </Row>
                </Form>
            </FormDrawer>
        </main>
    );
}
