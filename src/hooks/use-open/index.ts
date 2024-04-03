import { useState } from "react";

export function useOpen(defaultValue: boolean = false) {
    const [isOpen, setIsOpen] = useState<boolean>(defaultValue);

    const open = () => setIsOpen(true);
    const close = () => setIsOpen(false);
    const toggle = () => setIsOpen((prev) => !prev);

    return { isOpen, open, close, toggle };
}
