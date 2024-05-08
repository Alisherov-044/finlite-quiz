import { useEffect, useState } from "react";

export function useLocalstorage<T>(
    key: string,
    defaultValue: T
): [T, (x: T) => void] {
    const current = JSON.parse(
        localStorage.getItem(key) ?? JSON.stringify(defaultValue)
    );

    const [state, setState] = useState<T>(current);

    useEffect(() => {
        localStorage.setItem(key, JSON.stringify(state));
    }, [state]);

    return [state, setState];
}
