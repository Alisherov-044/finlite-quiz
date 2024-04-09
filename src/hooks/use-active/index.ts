import { useState } from "react";

export function useActive<T>(defaultValue?: T) {
    const [active, setActive] = useState<T | undefined | null>(defaultValue);

    return { active, setActive };
}
