import { Flex, Skeleton } from "antd";

export function QuizSkeleton() {
    return (
        <Flex className="justify-between border shadow-main rounded-md bg-white">
            <Flex className="w-1/2 flex-col gap-y-6 p-9 border-r">
                <Skeleton.Button active className="!w-20 !h-4" />
                <Flex className="flex-col gap-y-1.5">
                    <Skeleton.Button active className="!w-full !h-4" />
                    <Skeleton.Button active className="!w-[90%] !h-4" />
                    <Skeleton.Button active className="!w-3/4 !h-4" />
                </Flex>
            </Flex>
            <Flex className="w-1/2 flex-col gap-y-6 p-9">
                <Skeleton.Button active className="!w-20 !h-4" />
                <Flex className="flex-col gap-y-4">
                    {[...Array(4).keys()].map((key) => (
                        <Flex
                            key={key}
                            className="gap-x-3 p-4 border rounded-md cursor-pointer"
                        >
                            <Skeleton.Button
                                active
                                className="!min-w-4 !w-4 !h-5 !rounded-sm"
                            />
                            <Flex className="flex-col gap-y-1.5 w-full">
                                <Skeleton.Button
                                    active
                                    className="!w-full !h-4"
                                />
                                <Skeleton.Button
                                    active
                                    className="!w-2/3 !h-4"
                                />
                            </Flex>
                        </Flex>
                    ))}
                </Flex>
            </Flex>
        </Flex>
    );
}
