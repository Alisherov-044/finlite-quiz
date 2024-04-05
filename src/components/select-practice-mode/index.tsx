import { z } from "zod";
import { Icons } from "@/components";
import { useTranslate } from "@/hooks";
import { departments, tests } from "./data";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button, Flex, Form, Modal, Select, Typography } from "antd";

export const PracticeModeFormScheme = z.object({
    department: z.string({ required_error: "This field is required" }),
    test_qty: z.number({ required_error: "This field is required" }),
});

export type SelectPracticeModeProps = {
    isOpen: boolean;
    onSubmit: (values: z.infer<typeof PracticeModeFormScheme>) => void;
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
                    {t("practice mode")}
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
                            name="department"
                            control={control}
                            render={({ field }) => (
                                <Select
                                    placeholder={t("select department")}
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
                            name="test_qty"
                            control={control}
                            render={({ field }) => (
                                <Select
                                    placeholder={t("test qty")}
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
                            {t("there is no time limit in this mode")}
                        </Typography>
                    </Flex>
                    <Button
                        htmlType="submit"
                        size="large"
                        loading={isLoading}
                        disabled={isLoading}
                        className="!w-full"
                    >
                        {t("start")}
                    </Button>
                </Form>
            </Flex>
        </Modal>
    );
}
