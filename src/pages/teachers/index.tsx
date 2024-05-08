import { z } from "zod";
import { useMutation, useQuery } from "react-query";
import {
    useActive,
    useDispatch,
    useOpen,
    usePagination,
    useSelector,
    useTranslate,
} from "@/hooks";
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
import { ChangeEvent, useCallback, useEffect, useMemo, useState } from "react";
import {
    Button,
    Empty,
    Flex,
    Form,
    Input,
    Pagination,
    Typography,
    notification,
} from "antd";
import { axiosPrivate } from "@/lib";
import {
    TEACHERS_DELETE_URL,
    TEACHERS_EDIT_URL,
    TEACHERS_URL,
} from "@/utils/urls";
import { FormItem, Row, Col } from "@/components/styles";
import { fillValues, getCurrentRole, parsePhoneNumber } from "@/utils";
import { Navigate, useLocation } from "react-router-dom";
import type { TSetValue } from "@/utils/fill-values";
import type { TUser } from "@/components/cards/user-card";
import ReactInputMask from "react-input-mask";
import { AxiosError } from "axios";
import { setAuth } from "@/redux/slices/authSlice";

export const TeacherFormScheme = z.object({
    first_name: z.string().optional(),
    last_name: z.string().optional(),
    phone_number: z
        .string({ required_error: "telefon raqamingizni kiriting" })
        .optional(),
    confirm_password: z.string().optional(),
    password: z.string().optional(),
});

export type TTeachersResponse = {
    data: TUser[];
    meta: {
        pageCount: number;
    };
};

export type TTeachersRequest = z.infer<typeof TeacherFormScheme> & {
    role: string;
};

export default function TeachersPage() {
    const { t } = useTranslate();
    const { roles, access_token } = useSelector((state) => state.auth);
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
        error,
    } = useQuery<TTeachersResponse, AxiosError<{ error: string }>>("teachers", {
        queryFn: async () =>
            await axiosPrivate
                .get(TEACHERS_URL, {
                    headers: {
                        Authorization: `Bearer ${access_token}`,
                    },
                })
                .then((res) => res.data.data),
    });
    const { mutate, isLoading: isSubmitting } = useMutation<
        TTeachersResponse,
        Error,
        TTeachersRequest
    >({
        mutationFn: async (data) =>
            await axiosPrivate
                .post(TEACHERS_URL, data, {
                    headers: {
                        Authorization: `Bearer ${access_token}`,
                    },
                })
                .then((res) => res.data),
    });
    const { mutate: update, isLoading: isUpdating } = useMutation<
        TTeachersResponse,
        Error,
        TTeachersRequest
    >({
        mutationFn: async (data) =>
            await axiosPrivate
                .patch(TEACHERS_EDIT_URL(editTeacher!), data, {
                    headers: {
                        Authorization: `Bearer ${access_token}`,
                    },
                })
                .then((res) => res.data),
    });
    const { mutate: deleteUser, isLoading: isDeleting } = useMutation<
        TTeachersResponse,
        Error,
        number
    >({
        mutationFn: async (id: number) =>
            await axiosPrivate
                .delete(TEACHERS_DELETE_URL(deleteTeacher ?? id), {
                    headers: {
                        Authorization: `Bearer ${access_token}`,
                    },
                })
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
        defaultValues: {
            phone_number: "+(998)",
        },
    });
    const [search, setSearch] = useState<string>("");
    const [page, setPage] = useState<number>(1);
    const dispatch = useDispatch();
    const { currentPage, goTo } = usePagination(
        "teachers-pagination",
        teachers ? teachers?.meta.pageCount : 1
    );

    useEffect(() => {
        setPage(currentPage);
    }, [currentPage]);

    useEffect(() => {
        refetch();
    }, [page]);

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
                {
                    ...updatedValues,
                    phone_number: parsePhoneNumber(updatedValues.phone_number),
                    role: "teacher",
                },
                {
                    onSuccess: () => {
                        notification.success({
                            message: t("O'qituvchi tahrirlandi"),
                            icon: <Icons.checkCircle />,
                            closeIcon: false,
                        });
                        refetch();
                        onCancel();
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
            if (!values.phone_number || values.phone_number?.length < 19) {
                return notification.error({
                    message: t("Telefon raqamni to'liq kiring"),
                    closeIcon: false,
                });
            }
            mutate(
                {
                    ...values,
                    phone_number: parsePhoneNumber(values.phone_number),
                    role: "teacher",
                },
                {
                    onSuccess: () => {
                        notification.success({
                            message: t("O'qituvchi yaratildi"),
                            icon: <Icons.checkCircle />,
                            closeIcon: false,
                        });
                        refetch();
                        onCancel();
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

    const filteredTeachers = useCallback(() => {
        return teachers?.data.length
            ? teachers.data.filter((teacher) =>
                  search.length
                      ? `${teacher.first_name} ${teacher.last_name}`
                            .toLocaleLowerCase()
                            .trim()
                            .replaceAll(" ", "")
                            .includes(
                                search
                                    .toLocaleLowerCase()
                                    .trim()
                                    .replaceAll(" ", "")
                            ) ||
                        teacher.phone_number
                            .toLocaleLowerCase()
                            .trim()
                            .replaceAll(" ", "")
                            .includes(
                                search
                                    .toLocaleLowerCase()
                                    .trim()
                                    .replaceAll(" ", "")
                            )
                      : true
              )
            : [];
    }, [search, teachers]);

    return (
        <main className="pb-10">
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
                    </Flex>
                    <Input
                        prefix={<Icons.search />}
                        placeholder={t("Qidirish...")}
                        prefixCls="search-input"
                        onChange={debouncedSearch}
                    />
                </Flex>
                <Flex className="pb-10 flex-auto flex-col gap-y-5 mt-10">
                    {isLoading ? (
                        [...Array(3).keys()].map((key) => (
                            <UserCardSkeleton key={key} role="teacher" />
                        ))
                    ) : teachers?.data && teachers.data.length ? (
                        filteredTeachers().map((teacher) => (
                            <UserCard
                                key={teacher.id}
                                user={teacher}
                                onEdit={() => setEditTeacher(teacher.id)}
                                onDelete={() => setDeleteTeacher(teacher.id)}
                            />
                        ))
                    ) : (
                        <Flex className="flex-auto items-center justify-center">
                            <Empty description={t("Ma'lumotlar mavjud emas")} />
                        </Flex>
                    )}
                </Flex>
                <Pagination
                    className="flex items-center justify-center"
                    current={currentPage}
                    onChange={(e) => goTo(e)}
                    pageSize={10}
                    total={teachers && 10 * teachers.meta.pageCount}
                />

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
                                            <ReactInputMask
                                                className="ant-input"
                                                mask="+(999) 99 999-99-99"
                                                maskChar={null}
                                                type="tel"
                                                {...field}
                                            />
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
                        <Row>
                            <Col span={24}>
                                <FormItem label={t("Parolni tasdiqlash")}>
                                    <Controller
                                        name="confirm_password"
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
