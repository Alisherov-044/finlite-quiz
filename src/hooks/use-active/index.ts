import { useState } from "react";

export function useActive(defaultValue?: string | number | null) {
    const [active, setActive] = useState<string | number | undefined | null>(
        defaultValue
    );

    return { active, setActive };
}
