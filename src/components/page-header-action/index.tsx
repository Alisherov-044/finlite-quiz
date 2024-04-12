import { Button, Flex, Typography } from "antd";
import type { ReactNode } from "react";

export type PageHeaderActionProps = {
    title: string;
    description?: ReactNode;
    btnText: string;
    onAction: () => void;
};

export function PageHeaderAction({
    title,
    description,
    btnText,
    onAction,
}: PageHeaderActionProps) {
    return (
        <Flex className="items-center justify-between gap-3 flex-wrap p-5 border rounded-2xl shadow-main">
            <Flex className="flex-col justify-center gap-y-1">
                <Typography.Title
                    level={2}
                    className="!text-lg capitalize !text-blue-900 font-bold !m-0"
                >
                    {title}
                </Typography.Title>
                {description}
            </Flex>
            <Button onClick={onAction}>{btnText}</Button>
        </Flex>
    );
}
