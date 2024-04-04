import { useState, useEffect } from "react";

export function useCountDown(initialTime: number) {
    const [time, setTime] = useState(initialTime);
    const [isActive, setIsActive] = useState(false);

    useEffect(() => {
        let interval: NodeJS.Timeout;

        if (isActive && time > 0) {
            interval = setInterval(() => {
                setTime((prevTime) => prevTime - 1);
            }, 1000);
        } else if (time === 0) {
            setIsActive(false);
        }

        return () => clearInterval(interval);
    }, [isActive, time]);

    const start = () => {
        setIsActive(true);
    };

    const stop = () => {
        setIsActive(false);
    };

    const reset = () => {
        setIsActive(false);
        setTime(initialTime);
    };

    return { time, start, stop, reset };
}
