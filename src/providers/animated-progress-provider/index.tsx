import { useState, useEffect, type ReactNode, type ReactElement } from "react";
import { Animate } from "react-move";

interface AnimatedProgressProviderProps {
    valueStart?: number;
    valueEnd: number;
    duration: number;
    easingFunction: (t: number) => number;
    repeat?: boolean;
    children: (value: number) => ReactNode;
}

export function AnimatedProgressProvider({
    valueStart = 0,
    valueEnd,
    duration,
    easingFunction,
    repeat,
    children,
}: AnimatedProgressProviderProps) {
    const [isAnimated, setIsAnimated] = useState<boolean>(false);

    useEffect(() => {
        let interval: NodeJS.Timeout;
        if (repeat) {
            interval = setInterval(() => {
                setIsAnimated((prevIsAnimated) => !prevIsAnimated);
            }, duration * 1000);
        } else {
            setIsAnimated(true);
        }

        return () => {
            clearInterval(interval);
        };
    }, [duration, repeat]);

    return (
        <Animate
            start={() => ({
                value: valueStart,
            })}
            update={() => ({
                value: [isAnimated ? valueEnd : valueStart],
                timing: {
                    duration: duration * 1000,
                    ease: easingFunction,
                },
            })}
        >
            {({ value }) => children(value) as ReactElement}
        </Animate>
    );
}
