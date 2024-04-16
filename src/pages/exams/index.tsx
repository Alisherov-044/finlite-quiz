import { z } from "zod";
import { clsx } from "clsx";
import {
    useActive,
    useDispatch,
    useOpen,
    useSelector,
    useTranslate,
} from "@/hooks";
import {
    Confirmation,
    ExamCard,
    ExamCardSkeleton,
    FileUpload,
    FilterTab,
    FormDrawer,
    Icons,
    PageHeaderAction,
} from "@/components";
import { useMutation, useQuery } from "react-query";
import { FormItem, Row } from "@/components/styles";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { fillValues, formatNumber, getCurrentRole } from "@/utils";
import { Navigate, useLocation } from "react-router-dom";
import {
    Button,
    Col,
    DatePicker,
    Empty,
    Flex,
    Form,
    Input,
    Select,
    TimePicker,
    notification,
} from "antd";
import { TDepartmentsResponse } from "@/pages/departments";
import { axiosPrivate, axiosPublic } from "@/lib";
import {
    EXAMS_URL,
    EXAM_CATEGORIES_URL,
    EXAM_URL,
    STUDENTS_URL,
} from "@/utils/urls";
import { TStudentsResponse } from "../students";
import {
    setCurrentUploadedImage,
    setCurrentUploadedImageOrigin,
} from "@/redux/slices/uploadSlice";
import type { TExam } from "@/components/cards/exam-card";
import { useEffect, useMemo } from "react";
import { TSetValue } from "@/utils/fill-values";

export type TExamsRequest = {
    title: string;
    start: Date;
    end: Date;
    category_id: number;
    participant_ids: number[];
    file: any[];
};

export type TExamDetail = {
    id: number;
    created_at: string;
    updated_at: string;
    title: string;
    start: string;
    end: string;
    participants: {
        id: number;
        first_name: string;
        last_name: string;
    }[];
    answers: [];
    questions: {
        id: number;
        description: string;
    }[];
};

export type TExamsResponse = {
    data: TExam[];
};

export type TExamResponse = {
    data: TExamDetail[] | null;
};

export const ExamFormScheme = z.object({
    title: z.string(),
    starting_date: z.any(),
    starting_time: z.any(),
    ending_time: z.any(),
    category_id: z.number(),
    participant_ids: z.array(z.number()),
    file: z.array(z.any()),
});

export default function ExamsPage() {
    const { t } = useTranslate();
    const { roles } = useSelector((state) => state.auth);
    const currentRole = getCurrentRole(roles);
    const location = useLocation();

    if (!currentRole) {
        return <Navigate to="/login" state={{ from: location }} replace />;
    }

    const { isOpen, open, close } = useOpen();
    const { active, setActive } = useActive("incomming");
    const { isOpen: isEdit, open: openEdit, close: closeEdit } = useOpen();
    const { active: editExam, setActive: setEditExam } = useActive<
        number | null
    >(null);
    const { active: deleteExam, setActive: setDeleteExam } = useActive<
        number | null
    >(null);
    const {
        data: exams,
        isLoading,
        refetch,
    } = useQuery<TExamsResponse>("exams", {
        queryFn: async () =>
            await axiosPublic.get(EXAMS_URL).then((res) => res.data.data),
    });
    const { data: students, isLoading: isStudentsLoading } =
        useQuery<TStudentsResponse>("students", {
            queryFn: async () =>
                await axiosPublic
                    .get(STUDENTS_URL)
                    .then((res) => res.data.data),
        });
    const { data: departments, isLoading: isDepartmentsLoading } =
        useQuery<TDepartmentsResponse>("exam-categories", {
            queryFn: async () =>
                await axiosPublic
                    .get(EXAM_CATEGORIES_URL)
                    .then((res) => res.data),
        });
    const { mutate, isLoading: isSubmitting } = useMutation<
        TExamsResponse,
        Error,
        TExamsRequest
    >({
        mutationFn: async (data) =>
            await axiosPrivate
                .post(EXAMS_URL, data)
                .then((res) => res.data.data),
    });
    const {
        data: exam,
        isLoading: isExamLoading,
        refetch: refetchExam,
    } = useQuery<TExamResponse>("exam", {
        queryFn: useMemo(
            () => async () =>
                typeof editExam === "number"
                    ? await axiosPublic
                          .get(EXAM_URL(editExam))
                          .then((res) => res.data)
                    : { data: null },
            [editExam]
        ),
    });
    const {
        handleSubmit,
        control,
        reset,
        setValue,
        resetField,
        formState: { isLoading: isFormLoading },
    } = useForm<z.infer<typeof ExamFormScheme>>({
        resolver: zodResolver(ExamFormScheme),
    });
    const dispatch = useDispatch();

    function onSubmit(values: z.infer<typeof ExamFormScheme>) {
        console.log(values.starting_date);
        const data: TExamsRequest = {
            title: values.title,
            start: new Date(
                `${values.starting_date.$y}-${formatNumber(
                    values.starting_date.$M + 1
                )}-${formatNumber(values.starting_date.$D)}T${formatNumber(
                    values.starting_time.$H
                )}:${formatNumber(values.starting_time.$m)}:${formatNumber(
                    values.starting_time.$s
                )}Z`
            ),
            end: new Date(
                `${values.starting_date.$y}-${formatNumber(
                    values.starting_date.$M + 1
                )}-${formatNumber(values.starting_date.$D)}T${formatNumber(
                    values.ending_time.$H
                )}:${formatNumber(values.ending_time.$m)}:${formatNumber(
                    values.ending_time.$s
                )}Z`
            ),
            category_id: values.category_id,
            participant_ids: values.participant_ids,
            file: values.file,
        };

        mutate(data, {
            onSuccess: () => {
                notification.success({
                    message: t("Imtihon yaratildi"),
                    icon: <Icons.checkCircle />,
                    closeIcon: false,
                });
                refetch();
                onCancel();
            },
        });
    }

    function onCancel() {
        close();
        reset();
        setEditExam(null);
        closeEdit();
        dispatch(setCurrentUploadedImage(null));
        dispatch(setCurrentUploadedImageOrigin(null));
    }

    const filteredExams = exams?.data.filter((exam) =>
        active === "incomming"
            ? new Date(exam.start).getTime() - new Date().getTime() > 0
            : new Date(exam.end).getTime() - new Date().getTime() <= 0
    );

    useEffect(() => {
        refetchExam();

        if (exam?.data) {
            fillValues(
                setValue as TSetValue,
                {
                    ...exam.data[0],
                    participant_ids: exam.data[0].participants.map(
                        (item) => item.id
                    ),
                },
                ["title", "participant_ids"]
            );
        }
    }, [editExam]);

    return (
        <>
            <FilterTab>
                <button
                    onClick={() => setActive("incomming")}
                    className={clsx(active === "incomming" && "active")}
                >
                    {t("Kutilayotgan imtihonlar")}
                </button>
                <button
                    onClick={() => setActive("completed")}
                    className={clsx(active === "completed" && "active")}
                >
                    {t("Tugallangan imtihonlar")}
                </button>
            </FilterTab>
            <main>
                <div className="flex flex-col container">
                    {currentRole === "admin" ? (
                        <PageHeaderAction
                            title={t("Imtihon Yaratish")}
                            btnText={t("Imtihon Yaratish")}
                            onAction={() => {
                                reset();
                                open();
                            }}
                        />
                    ) : null}
                    <Flex className="flex-auto flex-col gap-y-6 mt-6">
                        {isLoading ? (
                            [...Array(3).keys()].map((key) => (
                                <ExamCardSkeleton key={key} />
                            ))
                        ) : filteredExams && filteredExams.length ? (
                            filteredExams.map((exam) => (
                                <ExamCard
                                    key={exam.id}
                                    exam={exam}
                                    onEdit={() => {
                                        setEditExam(exam.id);
                                        openEdit();
                                    }}
                                    onDelete={() => setDeleteExam(exam.id)}
                                    onBeforeEdit={() => setEditExam(exam.id)}
                                    onBeforeEditCancel={() => setEditExam(null)}
                                />
                            ))
                        ) : (
                            <Flex className="flex-auto items-center justify-center">
                                <Empty description={false} />
                            </Flex>
                        )}
                    </Flex>

                    <FormDrawer
                        open={isOpen || isEdit}
                        width={600}
                        onCancel={onCancel}
                        title={
                            editExam ? t("Tahrirlash") : t("Imtihon Qo'shish")
                        }
                        footer={
                            <Button
                                form="exams-form"
                                htmlType="submit"
                                loading={
                                    isFormLoading ||
                                    isSubmitting ||
                                    isExamLoading
                                }
                                disabled={
                                    isFormLoading ||
                                    isSubmitting ||
                                    isExamLoading
                                }
                                className="!w-full mt-4"
                            >
                                {t(editExam ? "Tahrirlash" : "Qo'shish")}
                            </Button>
                        }
                    >
                        <Form id="exams-form" onFinish={handleSubmit(onSubmit)}>
                            <Row gutter={24}>
                                <Col span={12}>
                                    <FormItem label={t("Sarlavha")}>
                                        <Controller
                                            name="title"
                                            control={control}
                                            render={({ field }) => (
                                                <Input {...field} />
                                            )}
                                        />
                                    </FormItem>
                                </Col>
                                <Col span={12}>
                                    <FormItem label={t("Boshlanish sanasi")}>
                                        <Controller
                                            name="starting_date"
                                            control={control}
                                            render={({ field }) => (
                                                <DatePicker
                                                    placeholder=""
                                                    suffixIcon={
                                                        <Icons.calendar />
                                                    }
                                                    allowClear={{
                                                        clearIcon: (
                                                            <Icons.closeCircle />
                                                        ),
                                                    }}
                                                    nextIcon={
                                                        <Icons.arrow.right />
                                                    }
                                                    prevIcon={
                                                        <Icons.arrow.left />
                                                    }
                                                    superNextIcon={
                                                        <Icons.arrow.rightDouble />
                                                    }
                                                    superPrevIcon={
                                                        <Icons.arrow.leftDouble />
                                                    }
                                                    {...field}
                                                />
                                            )}
                                        />
                                    </FormItem>
                                </Col>
                            </Row>
                            <Row gutter={24}>
                                <Col span={12}>
                                    <FormItem label={t("Boshlanish vaqti")}>
                                        <Controller
                                            name="starting_time"
                                            control={control}
                                            render={({ field }) => (
                                                <TimePicker
                                                    placeholder=""
                                                    suffixIcon={<Icons.clock />}
                                                    allowClear={{
                                                        clearIcon: (
                                                            <Icons.closeCircle />
                                                        ),
                                                    }}
                                                    nextIcon={
                                                        <Icons.arrow.right />
                                                    }
                                                    prevIcon={
                                                        <Icons.arrow.left />
                                                    }
                                                    superNextIcon={
                                                        <Icons.arrow.rightDouble />
                                                    }
                                                    superPrevIcon={
                                                        <Icons.arrow.leftDouble />
                                                    }
                                                    {...field}
                                                />
                                            )}
                                        />
                                    </FormItem>
                                </Col>
                                <Col span={12}>
                                    <FormItem label={t("Yakunlanish vaqti")}>
                                        <Controller
                                            name="ending_time"
                                            control={control}
                                            render={({ field }) => (
                                                <TimePicker
                                                    placeholder=""
                                                    suffixIcon={<Icons.clock />}
                                                    allowClear={{
                                                        clearIcon: (
                                                            <Icons.closeCircle />
                                                        ),
                                                    }}
                                                    nextIcon={
                                                        <Icons.arrow.right />
                                                    }
                                                    prevIcon={
                                                        <Icons.arrow.left />
                                                    }
                                                    superNextIcon={
                                                        <Icons.arrow.rightDouble />
                                                    }
                                                    superPrevIcon={
                                                        <Icons.arrow.leftDouble />
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
                                    <FormItem label={t("Qatnashuvchilar")}>
                                        <Controller
                                            name="participant_ids"
                                            control={control}
                                            render={({ field }) => (
                                                <Select
                                                    className="!h-auto"
                                                    mode="multiple"
                                                    placeholder={t(
                                                        "Qatnashuvchilarni tanlang"
                                                    )}
                                                    loading={isStudentsLoading}
                                                    options={students?.data.map(
                                                        (student) => ({
                                                            ...student,
                                                            full_name: `${student.first_name} ${student.last_name}  -  ${student.group_id} guruh`,
                                                        })
                                                    )}
                                                    fieldNames={{
                                                        label: "full_name",
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
                            </Row>
                            <Row>
                                <Col span={24}>
                                    <FormItem label={t("Bo'lim")}>
                                        <Controller
                                            name="category_id"
                                            control={control}
                                            render={({ field }) => (
                                                <Select
                                                    placeholder={t(
                                                        "Bo'lim tanlang"
                                                    )}
                                                    loading={
                                                        isDepartmentsLoading
                                                    }
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
                            </Row>
                            <FileUpload
                                resetUrl={() => resetField("file")}
                                setUrl={(file) => setValue("file", [file])}
                            />
                        </Form>
                    </FormDrawer>

                    <Confirmation
                        isOpen={!!deleteExam}
                        onCancel={() => setDeleteExam(null)}
                        onConfirm={() => {}}
                        btnText={t("O'chirish")}
                        title={t("O'chirish")}
                        description={t("Imtihonni o'chirmoqchimisiz?")}
                    />
                </div>
            </main>
        </>
    );
}
