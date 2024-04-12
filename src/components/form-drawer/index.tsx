import { Drawer } from "./styles";
import { Icons } from "@/components";
import { DrawerProps, Flex } from "antd";
import type { ReactNode } from "react";

export type FormDrawerProps = DrawerProps & {
    title: string;
    children: ReactNode;
    footer: ReactNode;
    onCancel: () => void;
};

export function FormDrawer({
    title,
    children,
    footer,
    onCancel,
    ...rest
}: FormDrawerProps) {
    return (
        <Drawer
            title={title}
            closeIcon={null}
            closable={false}
            extra={
                <button onClick={onCancel}>
                    <Icons.closeCircle />
                </button>
            }
            {...rest}
        >
            <Flex className="flex-auto flex-col justify-between">
                {children}
                <Flex className="items-center justify-between pb-5">
                    {footer}
                </Flex>
            </Flex>
        </Drawer>
    );
}
