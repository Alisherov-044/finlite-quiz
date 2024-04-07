import { Wrapper } from "./styles";
import type { ReactNode } from "react";

export type FilterTabProps = {
    children: ReactNode;
};

export function FilterTab({ children }: FilterTabProps) {
    return (
        <Wrapper className="mt-10 px-28 items-center justify-between border-b-[2px] border-blue-900">
            {children}
        </Wrapper>
    );
}
