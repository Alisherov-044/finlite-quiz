import { z } from "zod";
import { Icons } from "@/components";
import { useTranslate } from "@/hooks";
import { departments, tests } from "./data";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button, Flex, Form, Modal, Select, Typography } from "antd";
import { PracticeState } from "@/redux/slices/practiceSlice";

export const PracticeModeFormScheme = z.object({
    department: z.number({ required_error: "This field is required" }),
    testQty: z.number({ required_error: "This field is required" }),
});

export type SelectPracticeModeProps = {
    isOpen: boolean;
    onSubmit: (values: PracticeState) => void;
    onCancel: () => void;
};

export function SelectPracticeMode({
    isOpen,
    onSubmit,
    onCancel,
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
                        const department = {
                            id: Number(values.department),
                            title: departments.find(
                                (option) =>
                                    Number(option.value) ===
                                    Number(values.department)
                            )?.label as string,
                        };
                        onSubmit({ ...values, department });
                        reset();
                    })}
                >
                    <Form.Item>
                        <Controller
                            name="department"
                            control={control}
                            render={({ field }) => (
                                <Select
                                    placeholder={t("Bo'lim tanlash")}
                                    options={departments}
                                    suffixIcon={<Icons.arrow.select />}
                                    placement="bottomRight"
                                    {...field}
                                />
                            )}
                        />
                    </Form.Item>
                    <Form.Item>
                        <Controller
                            name="testQty"
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
                        loading={isLoading}
                        disabled={isLoading}
                        className="!w-full"
                    >
                        {t("Boshlash")}
                    </Button>
                </Form>
            </Flex>
        </Modal>
    );
}
