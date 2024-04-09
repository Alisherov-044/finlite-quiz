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
import { departments } from "@/components/select-practice-mode/data";
import RichTextEditor from "react-rte";

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
    departments: z.string({ required_error: "this field is required" }),
    question: z.string({ required_error: "this field is require" }),
    answerA: z.string({ required_error: "this field is require" }),
    answerB: z.string({ required_error: "this field is require" }),
    answerC: z.string({ required_error: "this field is require" }),
    answerD: z.string({ required_error: "this field is require" }),
});

export default function TestsPage() {
    const { t } = useTranslate();
    const { roles } = useSelector((state) => state.auth);
    const currentRole = getCurrentRole(roles);
    const location = useLocation();
    const [value, setValue] = useState<any>(RichTextEditor.createEmptyValue());

    function onChange(e: any) {
        setValue(e);
        e.toString("html");
    }

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
                            <FormItem label={t("Bo'limlar")}>
                                <Controller
                                    name="departments"
                                    control={control}
                                    render={({ field }) => (
                                        <Select
                                            mode="multiple"
                                            options={departments}
                                            suffixIcon={<Icons.arrow.select />}
                                            dropdownStyle={{ borderRadius: 0 }}
                                            {...field}
                                        />
                                    )}
                                />
                            </FormItem>
                        </Col>
                        <Col span={24}>
                            <FormItem label={t("Savol")}>
                                <Controller
                                    name="question"
                                    control={control}
                                    render={({ field }) => (
                                        <RichTextEditor
                                            {...field}
                                            value={value}
                                            onChange={onChange}
                                            // @ts-ignore
                                            toolbarConfig={toolbarConfig}
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
                                    render={({ field }) => <Input {...field} />}
                                />
                            </FormItem>
                        </Col>
                    </Row>
                </Form>
            </FormDrawer>
        </main>
    );
}
