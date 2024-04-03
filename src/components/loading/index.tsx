import gsap from "gsap";
import { clsx } from "clsx";
import { Flex } from "antd";
import { useGSAP } from "@gsap/react";
import { LayoutSkeleton } from "@/components";
import { type ReactNode, useRef } from "react";

export type LoadingProps = {
    fallback?: ReactNode;
};

export function Loading({ fallback = <LayoutSkeleton /> }: LoadingProps) {
    const container = useRef<HTMLElement | null>(null);

    useGSAP(
        () => {
            gsap.defaults({
                repeat: -1,
            });

            const tl = gsap.timeline();

            tl.fromTo(
                ".circle-animation-dot-1",
                {
                    scale: 0.5,
                    background: "#070E8C",
                    duration: 1,
                },
                {
                    scale: 1.2,
                    background: "#F7D340",
                    duration: 0.8,
                }
            )
                .fromTo(
                    ".circle-animation-dot-2",
                    {
                        scale: 0.5,
                        background: "#F7D340",
                        duration: 1,
                    },
                    {
                        scale: 1.2,
                        background: "#070E8C",
                        duration: 0.8,
                    },
                    "-=0.5"
                )
                .fromTo(
                    ".circle-animation-dot-3",
                    {
                        scale: 0.5,
                        background: "#070E8C",
                        duration: 1,
                    },
                    {
                        scale: 1.2,
                        background: "#F7D340",
                        duration: 0.8,
                    },
                    "-=1.2"
                );
        },
        { scope: container }
    );

    return (
        <Flex
            ref={container}
            className="w-full h-full items-center justify-center"
        >
            {fallback}
            <Flex className="fixed top-0 left-0 w-full h-full z-50 items-center justify-center gap-x-6 backdrop-blur">
                {[...Array(3).keys()].map((key) => (
                    <div
                        key={key}
                        className={clsx(
                            "w-12 h-12 rounded-full animate-pulse",
                            `circle-animation-dot-${key + 1}`
                        )}
                    />
                ))}
            </Flex>
        </Flex>
    );
}
