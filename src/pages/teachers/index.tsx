import { z } from "zod";
import { useMutation, useQuery } from "react-query";
import { useActive, useOpen, useSelector, useTranslate } from "@/hooks";
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
import { axiosPrivate, axiosPublic } from "@/lib";
import {
    TEACHERS_DELETE_URL,
    TEACHERS_EDIT_URL,
    TEACHERS_URL,
} from "@/utils/urls";
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
});

export type TTeachersResponse = {
    data: TUser[];
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
    const {
        data: teachers,
        isLoading,
        refetch,
    } = useQuery<TTeachersResponse>("teachers", {
        queryFn: async () =>
            await axiosPublic.get(TEACHERS_URL).then((res) => res.data),
    });
    const { mutate, isLoading: isSubmitting } = useMutation<
        TTeachersResponse,
        Error,
        TTeachersRequest
    >({
        mutationFn: async (data) =>
            await axiosPrivate.post(TEACHERS_URL, data).then((res) => res.data),
    });
    const { mutate: update, isLoading: isUpdating } = useMutation<
        TTeachersResponse,
        Error,
        TTeachersRequest
    >({
        mutationFn: async (data) =>
            await axiosPrivate
                .patch(TEACHERS_EDIT_URL(editTeacher!), data)
                .then((res) => res.data),
    });
    const { mutate: deleteUser, isLoading: isDeleting } = useMutation<
        TTeachersResponse,
        Error,
        number
    >({
        mutationFn: async (id: number) =>
            await axiosPrivate
                .delete(TEACHERS_DELETE_URL(deleteTeacher ?? id))
                .then((res) => res.data),
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
        if (editTeacher) {
            const updatedValues: z.infer<typeof TeacherFormScheme> =
                {} as z.infer<typeof TeacherFormScheme>;
            const teacher = teachers?.data.find(
                (item) => item.id === editTeacher
            );

            const objKeys = Object.keys(values);

            for (let i = 0; i < objKeys.length; i++) {
                // @ts-ignore
                if (values[objKeys[i]] !== teacher[objKeys[i]]) {
                    // @ts-ignore
                    updatedValues[objKeys[i]] = values[objKeys[i]];
                }
            }

            update(
                { ...updatedValues, role: "teacher" },
                {
                    onSuccess: () => {
                        notification.success({
                            message: t("O'qituvchi yaratildi"),
                            icon: <Icons.checkCircle />,
                            closeIcon: false,
                        });
                        refetch();
                    },
                    onError: (error) => {
                        notification.success({
                            message: t(error.message),
                            closeIcon: false,
                        });
                    },
                }
            );
        } else {
            mutate(
                { ...values, role: "teacher" },
                {
                    onSuccess: () => {
                        notification.success({
                            message: t("O'qituvchi yaratildi"),
                            icon: <Icons.checkCircle />,
                            closeIcon: false,
                        });
                    },
                    onError: (error) => {
                        notification.success({
                            message: t(error.message),
                            closeIcon: false,
                        });
                    },
                }
            );
        }
        onCancel();
    }

    function onDelete() {
        if (deleteTeacher) {
            deleteUser(deleteTeacher, {
                onSuccess: () => {
                    notification.success({
                        message: t("O'quvchi o'chirildi"),
                        icon: <Icons.checkCircle />,
                        closeIcon: null,
                    });
                    refetch();
                },
                onError: (error) => {
                    notification.error({
                        message: t(error.message),
                        closeIcon: null,
                    });
                },
            });
        }
        onDeleteCancel();
    }

    function onDeleteCancel() {
        setDeleteTeacher(null);
    }

    useEffect(() => {
        if (editTeacher) {
            let teacher = teachers?.data.find(
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
                    ) : teachers?.data && teachers.data.length ? (
                        teachers.data
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
                    onCancel={onCancel}
                    title={
                        editTeacher ? t("Tahrirlash") : t("O'qituvchi Qo'shish")
                    }
                    footer={
                        <Button
                            form="teacher-form"
                            htmlType="submit"
                            loading={
                                isFormLoading || isSubmitting || isUpdating
                            }
                            disabled={
                                isFormLoading || isSubmitting || isUpdating
                            }
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
                                            <Input.Password
                                                iconRender={(visible) =>
                                                    visible ? (
                                                        <Icons.eye.open />
                                                    ) : (
                                                        <Icons.eye.close />
                                                    )
                                                }
                                                {...field}
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
                    loading={isDeleting}
                    onCancel={onDeleteCancel}
                    onConfirm={onDelete}
                    btnText={t("O'chirish")}
                    title={t("O'chirish")}
                    description={t("O'qituvchini o'chirmoqchimisiz?")}
                />
            </div>
        </main>
    );
}
