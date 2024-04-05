import { z } from "zod";
import { useQuery } from "react-query";
import { useOpen, useTranslate } from "@/hooks";
import { options } from "./data";
import {
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
import type { TUser } from "@/components/cards/user-card";
import { FormItem } from "@/components/styles";

export const TeacherFormScheme = z.object({
    full_name: z.string({ required_error: "this field is required" }),
    email: z.string({ required_error: "this field is require" }),
    password: z.string({ required_error: "this field is require" }),
});

export default function TeachersPage() {
    const { t } = useTranslate();
    const { isOpen, open, close } = useOpen();
    const { data: teachers, isLoading } = useQuery<TUser[]>("teachers", {
        queryFn: async () => await [],
    });
    const {
        handleSubmit,
        control,
        reset,
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

    function onSubmit(values: z.infer<typeof TeacherFormScheme>) {
        console.log(values);
        reset();
        close();
        notification.success({
            message: t("teacher created"),
            icon: <Icons.checkCircle />,
            closeIcon: false,
        });
    }

    return (
        <main className="flex flex-col">
            <PageHeaderAction
                title={t("add ${something}", t("teacher"))}
                btnText={t("add")}
                onAction={open}
            />
            <Flex className="flex-col gap-y-4 mt-10">
                <Flex className="items-center justify-between">
                    <Typography className="font-bold uppercase !text-blue-900">
                        {t("teachers list")}
                    </Typography>
                    <Select
                        placeholder="Saralash"
                        suffixIcon={<Icons.arrow.select />}
                        prefixCls="sort-select"
                        placement="bottomRight"
                        options={options}
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
                        .filter(
                            (teacher) =>
                                search.length &&
                                [teacher.full_name].includes(search)
                        )
                        .map((teacher) => (
                            <UserCard
                                user={teacher}
                                onEdit={() => {}}
                                onDelete={() => {}}
                            />
                        ))
                ) : (
                    <Flex className="flex-auto items-center justify-center">
                        <Empty description={false} />
                    </Flex>
                )}
            </Flex>

            <FormDrawer
                open={isOpen}
                width={600}
                onClose={close}
                onCancel={close}
                title={t("add ${something}", t("teacher"))}
                footer={
                    <Button
                        form="teacher-form"
                        htmlType="submit"
                        loading={isFormLoading}
                        disabled={isFormLoading}
                        className="!w-full"
                    >
                        {t("create")}
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
        </main>
    );
}
