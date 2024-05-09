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
    Select,
    Table,
    TableProps,
    notification,
} from "antd";
import { debounce } from "lodash";
import { ChangeEvent, useEffect, useMemo, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { useMutation, useQuery } from "react-query";
import { Navigate, useLocation } from "react-router-dom";
import RichTextEditor from "react-rte";
import { variants } from "./data";
import { axiosPrivate, axiosPublic } from "@/lib";
import { DEPARTMENTS_URL, TESTS_URL } from "@/utils/urls";
import { TDepartmentsResponse } from "../departments";
import parse from "react-html-parser";
import { AxiosError } from "axios";
import { setAuth } from "@/redux/slices/authSlice";

const toolbarConfig = {
    display: [
        "HISTORY_BUTTONS",
        "BLOCK_TYPE_DROPDOWN",
        "INLINE_STYLE_BUTTONS",
        "BLOCK_TYPE_BUTTONS",
        "LINK_BUTTONS",
        "CUSTOM_BUTTONS",
    ],
    HISTORY_BUTTONS: [
        { label: "Undo", style: "undo" },
        { label: "Redo", style: "redo" },
    ],
    INLINE_STYLE_BUTTONS: [
        { label: "Bold", style: "BOLD" },
        { label: "Italic", style: "ITALIC" },
        { label: "Underline", style: "UNDERLINE" },
        { label: "Strikethrough", style: "STRIKETHROUGH" },
    ],
    BLOCK_TYPE_DROPDOWN: [
        { label: "Normal", style: "unstyled" },
        { label: "Heading Large", style: "header-one" },
        { label: "Heading Medium", style: "header-two" },
        { label: "Heading Small", style: "header-three" },
    ],
    BLOCK_TYPE_BUTTONS: [
        { label: "UL", style: "unordered-list-item" },
        { label: "OL", style: "ordered-list-item" },
    ],
    CUSTOM_BUTTONS: [
        { label: "Image", style: "IMG" },
        { label: "Blockquote", style: "BLOCKQUOTE" },
        { label: "Dash", style: "DASH" },
    ],
};

type ColumnsType<T> = TableProps<T>["columns"];

export type TTest = {
    id: number;
    description: string;
    category_id: number;
    variants: {
        content: string;
        is_right: boolean;
    }[];
};

export type TTestsResponse = {
    data: TTest[];
    meta: {
        pageCount: number;
    };
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
        render: (item) => parse(item.description),
        width: "90%",
    },
];

export const TestsFormScheme = z.object({
    category_id: z.number(),
    description: z.string(),
    answerA: z.string(),
    answerB: z.string(),
    answerC: z.string(),
    answerD: z.string(),
    correctAnswer: z.string(),
});

export default function TestsPage() {
    const { t } = useTranslate();
    const { roles } = useSelector((state) => state.auth);
    const currentRole = getCurrentRole(roles);
    const location = useLocation();
    const [currectAnswer, setCurrectAnswer] = useState<string | null>(null);
    const [rteValue, setRteValue] = useState<any>(
        RichTextEditor.createEmptyValue()
    );
    const [page, setPage] = useState<number>(1);
    const dispatch = useDispatch();
    const [search, setSearch] = useState<string>("");

    if (!currentRole) {
        return <Navigate to="/login" state={{ from: location }} replace />;
    }

    const { isOpen, open, close } = useOpen();
    const {
        data: tests,
        isLoading,
        refetch,
        error,
    } = useQuery<TTestsResponse, AxiosError<{ error: string }>>("tests", {
        queryFn: async () =>
            await axiosPublic
                .get(TESTS_URL(page, search.trim().replaceAll(" ", "")))
                .then((res) => res.data.data),
    });
    const { currentPage, goTo } = usePagination(
        "tests-pagination",
        tests ? tests?.meta.pageCount : 1
    );
    const { data: departments, isLoading: isDepartmentsLoading } =
        useQuery<TDepartmentsResponse>("departments", {
            queryFn: async () =>
                await axiosPublic
                    .get(DEPARTMENTS_URL())
                    .then((res) => res.data.data),
        });
    const { mutate, isLoading: isSubmitting } = useMutation<
        TTestsResponse,
        Error,
        Omit<TTest, "id">
    >({
        mutationFn: async (data) =>
            await axiosPrivate.post(TESTS_URL(), data).then((res) => res.data),
    });
    const {
        handleSubmit,
        control,
        reset,
        setValue,
        formState: { isLoading: isFormLoading },
    } = useForm<z.infer<typeof TestsFormScheme>>({
        resolver: zodResolver(TestsFormScheme),
    });
    const [tableParams, setTableParams] = useState({
        pagination: {
            current: currentPage,
            pageSize: 10,
            total: tests ? tests?.meta.pageCount * 10 : 10,
            onChange: (e: number) => goTo(e),
        },
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

    useEffect(() => {
        setPage(currentPage);
        setTableParams({
            ...tableParams,
            pagination: { ...tableParams.pagination, current: currentPage },
        });
    }, [currentPage]);

    useEffect(() => {
        refetch();
    }, [page]);

    function onCancel() {
        close();
        reset();
        setCurrectAnswer(null);
        setRteValue(RichTextEditor.createEmptyValue());
    }

    function onSubmit(values: z.infer<typeof TestsFormScheme>) {
        const variants = [
            {
                content: values.answerA,
                is_right: values.correctAnswer === "a",
            },
            {
                content: values.answerB,
                is_right: values.correctAnswer === "b",
            },
            {
                content: values.answerC,
                is_right: values.correctAnswer === "c",
            },
            {
                content: values.answerD,
                is_right: values.correctAnswer === "d",
            },
        ];

        const data = {
            description: values.description,
            category_id: Number(values.category_id),
            variants,
        };

        mutate(data, {
            onSuccess: () => {
                notification.success({
                    message: t("Test yaratildi"),
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

    function onChange(e: any) {
        setRteValue(e);
        setValue("description", e.toString("html"));
    }

    return (
        <main className="pb-10">
            <div className="flex flex-col container">
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
                        locale={{
                            emptyText: (
                                <Empty
                                    description={t("Ma'lumotlar mavjud emas")}
                                />
                            ),
                        }}
                        columns={columns}
                        loading={isLoading}
                        dataSource={tests?.data ? tests.data : []}
                        pagination={tableParams.pagination}
                    />
                </Flex>

                <FormDrawer
                    open={isOpen}
                    width={600}
                    onCancel={onCancel}
                    title={t("Test Yaratish")}
                    footer={
                        <Flex className="w-full items-center justify-between">
                            <Select
                                suffixIcon={<Icons.arrow.select />}
                                options={variants.map((item) => ({
                                    ...item,
                                    label: t(item.label),
                                }))}
                                placeholder={t("To'g'ri javob")}
                                value={currectAnswer}
                                onChange={(e) => {
                                    e && setValue("correctAnswer", e);
                                    setCurrectAnswer(e);
                                }}
                            />
                            <Button
                                form="tests-form"
                                htmlType="submit"
                                loading={isFormLoading || isSubmitting}
                                disabled={isFormLoading || isSubmitting}
                            >
                                {t("Yaratish")}
                            </Button>
                        </Flex>
                    }
                >
                    <Form id="tests-form" onFinish={handleSubmit(onSubmit)}>
                        <Row>
                            <Col span={24}>
                                <FormItem label={t("Bo'lim")}>
                                    <Controller
                                        name="category_id"
                                        control={control}
                                        render={({ field }) => (
                                            <Select
                                                placeholder={t(
                                                    "Bo'limni tanlang"
                                                )}
                                                loading={isDepartmentsLoading}
                                                options={departments?.data}
                                                fieldNames={{
                                                    label: "name",
                                                    value: "id",
                                                }}
                                                suffixIcon={
                                                    <Icons.arrow.select />
                                                }
                                                dropdownStyle={{
                                                    borderRadius: 0,
                                                }}
                                                {...field}
                                            />
                                        )}
                                    />
                                </FormItem>
                            </Col>
                            <Col span={24}>
                                <FormItem
                                    label={t("Savol")}
                                    className="rich-text-editor"
                                >
                                    <Controller
                                        name="description"
                                        control={control}
                                        render={({ field }) => (
                                            <RichTextEditor
                                                {...field}
                                                value={rteValue}
                                                onChange={onChange}
                                                // @ts-ignore
                                                toolbarConfig={toolbarConfig}
                                                className="rich-text-editor-wrapper"
                                            />
                                        )}
                                    />
                                </FormItem>
                            </Col>
                            <Col span={24}>
                                <FormItem label={t("A Javob")}>
                                    <Controller
                                        name="answerA"
                                        control={control}
                                        render={({ field }) => (
                                            <Input {...field} />
                                        )}
                                    />
                                </FormItem>
                            </Col>
                            <Col span={24}>
                                <FormItem label={t("B Javob")}>
                                    <Controller
                                        name="answerB"
                                        control={control}
                                        render={({ field }) => (
                                            <Input {...field} />
                                        )}
                                    />
                                </FormItem>
                            </Col>
                            <Col span={24}>
                                <FormItem label={t("C Javob")}>
                                    <Controller
                                        name="answerC"
                                        control={control}
                                        render={({ field }) => (
                                            <Input {...field} />
                                        )}
                                    />
                                </FormItem>
                            </Col>
                            <Col span={24}>
                                <FormItem label={t("D Javob")}>
                                    <Controller
                                        name="answerD"
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
