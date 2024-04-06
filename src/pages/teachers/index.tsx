import { z } from "zod";
import { useQuery } from "react-query";
import { useActive, useOpen, useTranslate } from "@/hooks";
import { options } from "@/components/data";
import {
    Confirmation,
    FormDrawer,
    Icons,
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
import { fillValues } from "@/utils";
import { FormItem } from "@/components/styles";
import type { TSetValue } from "@/utils/fill-values";
import type { TUser } from "@/components/cards/user-card";

export const TeacherFormScheme = z.object({
    full_name: z.string({ required_error: "this field is required" }),
    email: z.string({ required_error: "this field is require" }),
    password: z.string({ required_error: "this field is require" }),
});

export default function TeachersPage() {
    const { t, currentLng } = useTranslate();
    const { isOpen, open, close } = useOpen();
    const { active: deleteTeacher, setActive: setDeleteTeacher } =
        useActive(null);
    const { active: editTeacher, setActive: setEditTeacher } = useActive(null);
    const { data: teachers, isLoading } = useQuery<TUser[]>("teachers", {
        queryFn: async () =>
            await [
                {
                    id: 1,
                    full_name: "Bekchanov Javlonbek",
                    email: "Javlonbek",
                    group: 1,
                    image: "https://mdbcdn.b-cdn.net/img/new/avatars/2.webp",
                    role: "teacher",
                    password: "password",
                },
            ],
    });
    const {
        handleSubmit,
        control,
        reset,
        setValue,
        formState: { isLoading: isFormLoading },
    } = useForm<z.infer<typeof TeacherFormScheme>>({
        resolver: zodResolver(TeacherFormScheme),
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
        setEditTeacher(null);
    }

    function onSubmit(values: z.infer<typeof TeacherFormScheme>) {
        console.log(values);
        notification.success({
            message: t(editTeacher ? "edited" : "teacher created"),
            icon: <Icons.checkCircle />,
            closeIcon: false,
        });
        onCancel();
    }

    useEffect(() => {
        if (editTeacher) {
            let teacher = teachers?.find(
                (teacher) => teacher.id === editTeacher
            );

            if (teacher) {
                fillValues<TUser>(setValue as TSetValue, teacher, [
                    "full_name",
                    "email",
                    "password",
                ]);
            }
        }
    }, [editTeacher]);

    return (
        <main className="flex flex-col">
            <PageHeaderAction
                title={t("add ${something}", t("teacher"))}
                btnText={t("add")}
                onAction={open}
            />
            <Flex className="flex-col gap-y-4 mt-10">
                <Flex className="items-center justify-between">
                    <Typography className="!text-sm font-bold !text-blue-900">
                        {t("teachers list")}
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
                {isLoading ? (
                    [...Array(3).keys()].map((key) => (
                        <UserCardSkeleton key={key} role="teacher" />
                    ))
                ) : teachers && teachers.length ? (
                    teachers
                        .filter((teacher) =>
                            search.length
                                ? teacher.full_name
                                      .toLocaleLowerCase()
                                      .includes(search.toLocaleLowerCase())
                                : true
                        )
                        .map((teacher) => (
                            <UserCard
                                key={teacher.id}
                                user={teacher}
                                onEdit={() => setEditTeacher(teacher.id)}
                                onDelete={() => setDeleteTeacher(teacher.id)}
                            />
                        ))
                ) : (
                    <Flex className="flex-auto items-center justify-center">
                        <Empty description={false} />
                    </Flex>
                )}
            </Flex>

            <FormDrawer
                open={isOpen || !!editTeacher}
                width={600}
                onClose={onCancel}
                onCancel={onCancel}
                title={
                    editTeacher
                        ? t("edit")
                        : t("add ${something}", t("teacher"))
                }
                footer={
                    <Button
                        form="teacher-form"
                        htmlType="submit"
                        loading={isFormLoading}
                        disabled={isFormLoading}
                        className="!w-full"
                    >
                        {t(editTeacher ? "edit" : "create")}
                    </Button>
                }
            >
                <Form id="teacher-form" onFinish={handleSubmit(onSubmit)}>
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
                </Form>
            </FormDrawer>

            <Confirmation
                isOpen={!!deleteTeacher}
                onCancel={() => setDeleteTeacher(null)}
                onConfirm={() => {}}
                btnText={t("delete")}
                title={t("delete")}
                description={t(
                    "do you wanna delete ${something}",
                    t("teacher")
                )}
            />
        </main>
    );
}
