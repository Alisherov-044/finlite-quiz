import { useState } from "react";

export function useActive(defaultValue?: string | number | boolean | null) {
    const [active, setActive] = useState<
        string | number | boolean | undefined | null
    >(defaultValue);

    return { active, setActive };
}
