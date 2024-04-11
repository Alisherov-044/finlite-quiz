import { clsx } from "clsx";
import { Icons } from "@/components";
import { Button, Flex, Modal, Typography } from "antd";
import type { ReactNode } from "react";

export type ConfirmationProps = {
    title: string;
    description: ReactNode;
    btnText: string;
    isOpen: boolean;
    onCancel: () => void;
    onConfirm: () => void;
    prefixIcon?: ReactNode;
    primaryBtn?: boolean;
    loading?: boolean;
};

export function Confirmation({
    title,
    description,
    btnText,
    isOpen,
    onCancel,
    onConfirm,
    loading = false,
    primaryBtn = false,
    prefixIcon = <Icons.infoCircleLg className="lex-shrink-0" />,
}: ConfirmationProps) {
    return (
        <Modal closable centered open={isOpen} onCancel={onCancel}>
            <Flex className="relative w-fit h-fit min-w-[400px] bg-white shadow-main flex-col items-center justify-between py-8 px-14 rounded-[36px]">
                <Typography.Title
                    level={4}
                    className="font-bold uppercase text-xl !text-blue-500"
                >
                    {title}
                </Typography.Title>
                <Flex className="items-center gap-x-3 mt-8">
                    {prefixIcon}
                    <Typography className="!text-blue-700 font-normal">
                        {description}
                    </Typography>
                </Flex>
                <Button
                    loading={loading}
                    disabled={loading}
                    size="large"
                    onClick={onConfirm}
                    ghost={!primaryBtn}
                    className={clsx(
                        "mt-10 capitalize",
                        !primaryBtn &&
                            "!text-error-main font-bold !border-none hover:!text-red-700"
                    )}
                >
                    {btnText}
                </Button>
                <button onClick={onCancel} className="absolute top-4 right-4">
                    <Icons.closeCircle />
                </button>
            </Flex>
        </Modal>
    );
}
