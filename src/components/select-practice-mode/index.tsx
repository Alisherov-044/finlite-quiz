import { z } from "zod";
import { Icons } from "@/components";
import { useTranslate } from "@/hooks";
import { tests } from "./data";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button, Flex, Form, Modal, Select, Typography } from "antd";
import { PracticeState } from "@/redux/slices/practiceSlice";
import { MultiSelect } from "./styles";
import { TDepartmentsResponse } from "@/pages/departments";
import { axiosPublic } from "@/lib";
import { DEPARTMENTS_URL } from "@/utils/urls";
import { useQuery } from "react-query";

export const PracticeModeFormScheme = z.object({
    category_ids: z.array(z.number()),
    question_count: z.number(),
});

export type SelectPracticeModeProps = {
    isOpen: boolean;
    onSubmit: (values: PracticeState) => void;
    onCancel: () => void;
    loading?: boolean;
};

export function SelectPracticeMode({
    isOpen,
    onSubmit,
    onCancel,
    loading,
}: SelectPracticeModeProps) {
    const { t } = useTranslate();
    const {
        control,
        handleSubmit,
        reset,
        formState: { isLoading },
    } = useForm<z.infer<typeof PracticeModeFormScheme>>({
        resolver: zodResolver(PracticeModeFormScheme),
    });
    const { data: departments, isLoading: isDepartmentsLoading } =
        useQuery<TDepartmentsResponse>("departments", {
            queryFn: async () =>
                await axiosPublic
                    .get(DEPARTMENTS_URL)
                    .then((res) => res.data.data),
        });

    return (
        <Modal closable centered open={isOpen} onCancel={onCancel}>
            <Flex className="relative w-fit h-fit min-w-[400px] bg-white shadow-main flex-col items-center justify-between py-8 px-14 rounded-[36px]">
                <Typography.Title
                    level={4}
                    className="font-bold uppercase text-xl !text-blue-500"
                >
                    {t("Amaliyot rejimi")}
                </Typography.Title>
                <Form
                    className="mt-8"
                    onFinish={handleSubmit((values) => {
                        onSubmit(values);
                        reset();
                    })}
                >
                    <Form.Item>
                        <Controller
                            name="category_ids"
                            control={control}
                            render={({ field }) => (
                                <MultiSelect
                                    mode="multiple"
                                    placeholder={t("Bo'lim tanlash")}
                                    loading={isDepartmentsLoading}
                                    options={departments?.data}
                                    fieldNames={{ label: "name", value: "id" }}
                                    suffixIcon={<Icons.arrow.select />}
                                    placement="bottomRight"
                                    {...field}
                                />
                            )}
                        />
                    </Form.Item>
                    <Form.Item>
                        <Controller
                            name="question_count"
                            control={control}
                            render={({ field }) => (
                                <Select
                                    placeholder={t("Test soni")}
                                    options={tests}
                                    suffixIcon={<Icons.arrow.select />}
                                    {...field}
                                />
                            )}
                        />
                    </Form.Item>
                    <Flex className="items-center gap-x-3 my-7">
                        <Icons.infoCircle />
                        <Typography className="!text-blue-700 font-normal">
                            {t("Bu rejimda vaqt chegaralanmagan")}
                        </Typography>
                    </Flex>
                    <Button
                        htmlType="submit"
                        size="large"
                        loading={isLoading || loading}
                        disabled={isLoading || loading}
                        className="!w-full"
                    >
                        {t("Boshlash")}
                    </Button>
                </Form>
            </Flex>
        </Modal>
    );
}
