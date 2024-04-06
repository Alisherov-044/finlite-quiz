export type TSetValue = (key: string, newValue: string | number) => void;

export function fillValues<T>(
    setValue: TSetValue,
    object: T,
    keys: string[]
): void {
    keys.forEach((key) => setValue(key, object[key as keyof object]));
}
