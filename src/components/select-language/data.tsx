import { SelectOption } from "./option";
import type { ReactNode } from "react";

export type TLanguage = {
    value: string;
    label: ReactNode;
};

export const languages: TLanguage[] = [
    {
        value: "uz",
        label: <SelectOption label="O'zb" img="/flags/uz.png" />,
    },
    {
        value: "ru",
        label: <SelectOption label="Ру" img="/flags/ru.png" />,
    },
];
