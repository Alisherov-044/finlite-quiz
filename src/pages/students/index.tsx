import { z } from "zod";
import { useQuery } from "react-query";
import { useActive, useOpen, useTranslate } from "@/hooks";
import { options } from "@/components/data";
import {
    Confirmation,
    FormDrawer,
    Icons,
    ImageUpload,
    PageHeaderAction,
    UserCard,
    UserCardSkeleton,
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
import { fillValues } from "@/utils";
import type { TUser } from "@/components/cards/user-card";
import type { TSetValue } from "@/utils/fill-values";

export const StudentFormScheme = z.object({
    full_name: z.string({ required_error: "this field is required" }),
    email: z.string({ required_error: "this field is require" }),
    password: z.string({ required_error: "this field is require" }),
    group: z.number({ required_error: "this field is required" }),
    image: z.string({ required_error: "this field is required" }),
});

export default function StudentsPage() {
    const { t, currentLng } = useTranslate();
    const { isOpen, open, close } = useOpen();
    const { active: deleteStudent, setActive: setDeleteStudent } =
        useActive(null);
    const { active: editStudent, setActive: setEditStudent } = useActive(null);
    const { data: students, isLoading: isStudentsLoading } = useQuery<TUser[]>(
        "students",
        {
            queryFn: async () =>
                await [
                    {
                        id: 1,
                        full_name: "Bekchanov Javlonbek",
                        email: "Javlonbek",
                        group: 1,
                        image: "https://mdbcdn.b-cdn.net/img/new/avatars/2.webp",
                        role: "student",
                        password: "password",
                    },
                ],
        }
    );
    const { data: groups, isLoading: isGroupsLoading } = useQuery("groups", {
        queryFn: async () => await [],
    });
    const {
        handleSubmit,
        control,
        reset,
        setValue,
        formState: { isLoading: isFormLoading },
    } = useForm<z.infer<typeof StudentFormScheme>>({
        resolver: zodResolver(StudentFormScheme),
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

    function onCancel() {
        close();
        reset();
        setEditStudent(null);
    }

    function onSubmit(values: z.infer<typeof StudentFormScheme>) {
        console.log(values);
        notification.success({
            message: t("student created"),
            icon: <Icons.checkCircle />,
            closeIcon: false,
        });
        onCancel();
    }

    useEffect(() => {
        if (editStudent) {
            let student = students?.find(
                (student) => student.id === editStudent
            );

            if (student) {
                fillValues(setValue as TSetValue, student, [
                    "full_name",
                    "email",
                    "password",
                    "group",
                    "image",
                ]);
            }
        }
    }, [editStudent]);

    return (
        <main className="flex flex-col">
            <PageHeaderAction
                title={t("add ${something}", t("student"))}
                btnText={t("add")}
                onAction={open}
            />
            <Flex className="flex-col gap-y-4 mt-10">
                <Flex className="items-center justify-between">
                    <Typography className="!text-sm font-bold !text-blue-900">
                        {t("students list")}
                    </Typography>
                    <Select
                        placeholder={t("sort")}
                        suffixIcon={<Icons.arrow.select />}
                        prefixCls="sort-select"
                        placement="bottomRight"
                        options={options.map((option) => ({
                            ...options,
                            label:
                                currentLng === "ru"
                                    ? option.label.ru
                                    : option.label.uz,
                        }))}
                        onChange={(value) => setFilter(value)}
                    />
                </Flex>
                <Input
                    prefix={<Icons.search />}
                    placeholder={t("search")}
                    prefixCls="search-input"
                    onChange={debouncedSearch}
                />
            </Flex>
            <Flex className="flex-auto flex-col gap-y-5 mt-10">
                {isStudentsLoading ? (
                    [...Array(3).keys()].map((key) => (
                        <UserCardSkeleton key={key} role="student" />
                    ))
                ) : students && students.length ? (
                    students
                        .filter((student) =>
                            search.length
                                ? student.full_name
                                      .toLocaleLowerCase()
                                      .includes(search.toLocaleLowerCase())
                                : true
                        )
                        .map((student) => (
                            <UserCard
                                key={student.id}
                                user={student}
                                onEdit={() => setEditStudent(student.id)}
                                onDelete={() => setDeleteStudent(student.id)}
                            />
                        ))
                ) : (
                    <Flex className="flex-auto items-center justify-center">
                        <Empty description={false} />
                    </Flex>
                )}
            </Flex>

            <FormDrawer
                open={isOpen || !!editStudent}
                width={600}
                onClose={onCancel}
                onCancel={onCancel}
                title={
                    editStudent
                        ? t("edit")
                        : t("add ${something}", t("student"))
                }
                footer={
                    <Button
                        form="student-form"
                        htmlType="submit"
                        loading={isFormLoading}
                        disabled={isFormLoading}
                        className="!w-full"
                    >
                        {t(editStudent ? "edit" : "create")}
                    </Button>
                }
            >
                <Form
                    id="student-form"
                    className="flex flex-col gap-y-5"
                    onFinish={handleSubmit(onSubmit)}
                >
                    <Row>
                        <Col span={24}>
                            <FormItem label={t("full name")}>
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
                            <FormItem label={t("email")}>
                                <Controller
                                    name="email"
                                    control={control}
                                    render={({ field }) => <Input {...field} />}
                                />
                            </FormItem>
                        </Col>
                        <Col span={12}>
                            <FormItem label={t("password")}>
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
                    <Row>
                        <Col span={24}>
                            <FormItem label={t("group")}>
                                <Controller
                                    name="group"
                                    control={control}
                                    render={({ field }) => (
                                        <Select
                                            prefixCls="form-select"
                                            suffixIcon={<Icons.arrow.select />}
                                            loading={isGroupsLoading}
                                            options={groups}
                                            {...field}
                                        />
                                    )}
                                />
                            </FormItem>
                        </Col>
                    </Row>
                    <Row>
                        <Col span={4}>
                            <FormItem>
                                <Controller
                                    name="image"
                                    control={control}
                                    render={() => (
                                        <ImageUpload
                                            onChange={(e) =>
                                                setValue("image", e.file.name)
                                            }
                                        />
                                    )}
                                />
                            </FormItem>
                        </Col>
                    </Row>
                </Form>
            </FormDrawer>

            <Confirmation
                isOpen={!!deleteStudent}
                onCancel={() => setDeleteStudent(null)}
                onConfirm={() => {}}
                btnText={t("delete")}
                title={t("delete")}
                description={t(
                    "do you wanna delete ${something}",
                    t("student")
                )}
            />
        </main>
    );
}
