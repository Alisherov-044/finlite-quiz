import { Wrapper } from "./styles";
import type { ReactNode } from "react";

export type FilterTabProps = {
    children: ReactNode;
};

export function FilterTab({ children }: FilterTabProps) {
    return (
        <Wrapper className="mt-10 pb-5">
            <div className="flex items-center justify-between container">
                {children}
            </div>
        </Wrapper>
    );
}
