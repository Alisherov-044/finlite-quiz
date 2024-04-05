import { useState } from "react";

export function useActive(defaultValue?: string | number) {
    const [active, setActive] = useState<string | number | undefined>(
        defaultValue
    );

    return { active, setActive };
}
