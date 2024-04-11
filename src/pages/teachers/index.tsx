import { z } from "zod";
import { useQuery } from "react-query";
import { useActive, useOpen, useSelector, useTranslate } from "@/hooks";
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
import { axiosPublic } from "@/lib";
import { TEACHERS_URL } from "@/utils/urls";
import { FormItem } from "@/components/styles";
import { fillValues, getCurrentRole } from "@/utils";
import { Navigate, useLocation } from "react-router-dom";
import type { TSetValue } from "@/utils/fill-values";
import type { TUser } from "@/components/cards/user-card";

export const TeacherFormScheme = z.object({
    first_name: z.string(),
    last_name: z.string(),
    phone_number: z.string(),
    password: z.string().optional(),
    image_url: z.string().optional(),
});

export type TTeachersResponse = {
    data: {
        data: TUser[];
    };
};

export type TTeachersRequest = z.infer<typeof TeacherFormScheme> & {
    role: string;
};

export default function TeachersPage() {
    const { t } = useTranslate();
    const { roles } = useSelector((state) => state.auth);
    const currentRole = getCurrentRole(roles);
    const location = useLocation();

    if (!currentRole) {
        return <Navigate to="/login" state={{ from: location }} replace />;
    }

    const { isOpen, open, close } = useOpen();
    const { active: deleteTeacher, setActive: setDeleteTeacher } = useActive<
        number | null
    >(null);
    const { active: editTeacher, setActive: setEditTeacher } = useActive<
        number | null
    >(null);
    const { data: teachers, isLoading } = useQuery<TTeachersResponse>(
        "teachers",
        {
            queryFn: async () => await axiosPublic.get(TEACHERS_URL),
        }
    );
    const {
        handleSubmit,
        control,
        reset,
        resetField,
        setValue,
        getValues,
        formState: { isLoading: isFormLoading },
    } = useForm<z.infer<typeof TeacherFormScheme>>({
        resolver: zodResolver(TeacherFormScheme),
    });
    const [search, setSearch] = useState<string>("");
    const [_, setFilter] = useState<string>("");

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
        setEditTeacher(null);
    }

    function onSubmit(values: z.infer<typeof TeacherFormScheme>) {
        console.log(values);
        notification.success({
            message: t(
                editTeacher ? "O'qituvchi tahrirlandi" : "O'qituvchi yaratildi"
            ),
            icon: <Icons.checkCircle />,
            closeIcon: false,
        });
        onCancel();
    }

    useEffect(() => {
        if (editTeacher) {
            let teacher = teachers?.data.data.find(
                (teacher) => teacher.id === editTeacher
            );

            if (teacher) {
                fillValues<TUser>(setValue as TSetValue, teacher, [
                    "first_name",
                    "last_name",
                    "phone_number",
                ]);
            }
        }
    }, [editTeacher]);

    return (
        <main>
            <div className="flex flex-col container">
                {currentRole === "admin" ? (
                    <PageHeaderAction
                        title={t("O'qituvchi yaratish")}
                        btnText={t("Qo'shish")}
                        onAction={open}
                    />
                ) : null}
                <Flex className="flex-col gap-y-4 mt-10">
                    <Flex className="items-center justify-between">
                        <Typography className="!text-sm font-bold !text-blue-900">
                            {t("O'qituvchilar ro'yxati")}
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
                <Flex className="flex-auto flex-col gap-y-5 mt-10">
                    {isLoading ? (
                        [...Array(3).keys()].map((key) => (
                            <UserCardSkeleton key={key} role="teacher" />
                        ))
                    ) : teachers?.data.data && teachers.data.data.length ? (
                        teachers.data.data
                            .filter((teacher) =>
                                search.length
                                    ? `${teacher.first_name} ${teacher.last_name}`
                                          .toLocaleLowerCase()
                                          .includes(search.toLocaleLowerCase())
                                    : true
                            )
                            .map((teacher) => (
                                <UserCard
                                    key={teacher.id}
                                    user={teacher}
                                    onEdit={() => setEditTeacher(teacher.id)}
                                    onDelete={() =>
                                        setDeleteTeacher(teacher.id)
                                    }
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
                        editTeacher ? t("Tahrirlash") : t("O'qituvchi Qo'shish")
                    }
                    footer={
                        <Button
                            form="teacher-form"
                            htmlType="submit"
                            loading={isFormLoading}
                            disabled={isFormLoading}
                            className="!w-full"
                        >
                            {t(editTeacher ? "Tahrirlash" : "Qo'shish")}
                        </Button>
                    }
                >
                    <Form id="teacher-form" onFinish={handleSubmit(onSubmit)}>
                        <Row gutter={24}>
                            <Col span={12}>
                                <FormItem label={t("Ism")}>
                                    <Controller
                                        name="first_name"
                                        control={control}
                                        render={({ field }) => (
                                            <Input {...field} />
                                        )}
                                    />
                                </FormItem>
                            </Col>
                            <Col span={12}>
                                <FormItem label={t("Familiya")}>
                                    <Controller
                                        name="last_name"
                                        control={control}
                                        render={({ field }) => (
                                            <Input {...field} />
                                        )}
                                    />
                                </FormItem>
                            </Col>
                        </Row>
                        <Row gutter={24}>
                            <Col span={12}>
                                <FormItem label={t("Telefon Raqam")}>
                                    <Controller
                                        name="phone_number"
                                        control={control}
                                        render={({ field }) => (
                                            <Input type="tel" {...field} />
                                        )}
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
                        <Row>
                            <Col span={24}>
                                <FormItem>
                                    <Controller
                                        name="image_url"
                                        control={control}
                                        render={() => (
                                            <ImageUpload
                                                setUrl={(url) => {
                                                    setValue("image_url", url);
                                                    console.log(getValues());
                                                }}
                                                resetUrl={() =>
                                                    resetField("image_url")
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
                    isOpen={!!deleteTeacher}
                    onCancel={() => setDeleteTeacher(null)}
                    onConfirm={() => {}}
                    btnText={t("O'chirish")}
                    title={t("O'chirish")}
                    description={t("O'qituvchini o'chirmoqchimisiz?")}
                />
            </div>
        </main>
    );
}
