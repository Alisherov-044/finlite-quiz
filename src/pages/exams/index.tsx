import { clsx } from "clsx";
import { useActive, useOpen, useSelector, useTranslate } from "@/hooks";
import {
    Confirmation,
    ExamCard,
    ExamCardSkeleton,
    FilterTab,
    FormDrawer,
    Icons,
    PageHeaderAction,
} from "@/components";
import { Button, Col, Empty, Flex, Form, Input, Row, notification } from "antd";
import { useQuery } from "react-query";
import { TExam } from "@/components/cards/exam-card";
import { FormItem } from "@/components/styles";
import { Controller, useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { getCurrentRole } from "@/utils";
import { Navigate, useLocation } from "react-router-dom";

export const ExamFormScheme = z.object({
    full_name: z.string({ required_error: "this field is required" }),
    email: z.string({ required_error: "this field is require" }),
    password: z.string({ required_error: "this field is require" }),
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
    const { active: editExam, setActive: setEditExam } = useActive<
        number | null
    >(null);
    const { active: deleteExam, setActive: setDeleteExam } = useActive<
        number | null
    >(null);
    const { data: exams, isLoading } = useQuery<TExam[]>("exams", {
        queryFn: async () =>
            await [
                {
                    id: 1,
                    starting_date: new Date("2024-04-08"),
                    starting_time: "11:00",
                    questions_qty: 30,
                    duration: 150,
                },
                {
                    id: 2,
                    starting_date: new Date("2024-04-05"),
                    starting_time: "11:00",
                    questions_qty: 30,
                    duration: 150,
                },
            ],
    });
    const {
        handleSubmit,
        control,
        reset,
        formState: { isLoading: isFormLoading },
    } = useForm<z.infer<typeof ExamFormScheme>>({
        resolver: zodResolver(ExamFormScheme),
    });

    function onSubmit(values: z.infer<typeof ExamFormScheme>) {
        console.log(values);
        notification.success({
            message: t(
                editExam ? "O'qituvchi tahrirlandi" : "O'qituvchi yaratildi"
            ),
            icon: <Icons.checkCircle />,
            closeIcon: false,
        });
        onCancel();
    }

    function onCancel() {
        close();
        reset();
        setEditExam(null);
    }

    const filteredExams = exams?.filter((exam) =>
        active === "incomming"
            ? exam.starting_date.getTime() - new Date().getTime() > 0
            : exam.starting_date.getTime() - new Date().getTime() <= 0
    );

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
                            onAction={open}
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
                                    onEdit={() => setEditExam(exam.id)}
                                    onDelete={() => setDeleteExam(exam.id)}
                                />
                            ))
                        ) : (
                            <Flex className="flex-auto items-center justify-center">
                                <Empty description={false} />
                            </Flex>
                        )}
                    </Flex>

                    <FormDrawer
                        open={isOpen || !!editExam}
                        width={600}
                        onClose={onCancel}
                        onCancel={onCancel}
                        title={
                            editExam
                                ? t("Tahrirlash")
                                : t("O'qituvchi Qo'shish")
                        }
                        footer={
                            <Button
                                form="teacher-form"
                                htmlType="submit"
                                loading={isFormLoading}
                                disabled={isFormLoading}
                                className="!w-full"
                            >
                                {t(editExam ? "Tahrirlash" : "Qo'shish")}
                            </Button>
                        }
                    >
                        <Form
                            id="teacher-form"
                            onFinish={handleSubmit(onSubmit)}
                        >
                            <Row>
                                <Col span={24}>
                                    <FormItem label={t("F.I.SH")}>
                                        <Controller
                                            name="full_name"
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
                                    <FormItem label={t("Login")}>
                                        <Controller
                                            name="email"
                                            control={control}
                                            render={({ field }) => (
                                                <Input {...field} />
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
