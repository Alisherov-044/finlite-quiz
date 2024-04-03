import { clsx } from "clsx";
import type { ComponentPropsWithoutRef, ReactNode } from "react";

export type IconButtonProps = ComponentPropsWithoutRef<"button"> & {
    children: ReactNode;
    className?: string;
};

export function IconButton({ children, className, ...rest }: IconButtonProps) {
    return (
        <button
            className={clsx(
                "flex items-center justify-center w-9 h-9 rounded-full hover:bg-gray-200 transition-all duration-150",
                className
            )}
            {...rest}
        >
            {children}
        </button>
    );
}
