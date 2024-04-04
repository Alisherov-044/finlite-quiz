import { type ReactNode, useEffect, useState } from "react";

interface ChangingProgressProviderProps<T> {
    values: T[];
    interval?: number;
    children: (value: T) => ReactNode;
}

export function ChangingProgressProvider<T>({
    values,
    interval = 1000,
    children,
}: ChangingProgressProviderProps<T>) {
    const [valuesIndex, setValuesIndex] = useState<number>(0);

    useEffect(() => {
        const intervalId = setInterval(() => {
            setValuesIndex((prevIndex) => (prevIndex + 1) % values.length);
        }, interval);

        return () => clearInterval(intervalId);
    }, [interval, values.length]);

    return <>{children(values[valuesIndex])}</>;
}

export default ChangingProgressProvider;
