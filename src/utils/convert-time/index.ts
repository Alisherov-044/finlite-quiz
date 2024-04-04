import { TimeUnit } from "@/types";

export function convertTime(
    value: number,
    fromUnit: TimeUnit,
    toUnit: TimeUnit
): number {
    return (value * fromUnit) / toUnit;
}
