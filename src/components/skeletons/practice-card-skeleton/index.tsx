import { Flex, Skeleton } from "antd";

export function PracticeCardSkeleton() {
    return (
        <Flex className="h-fit justify-between rounded-2xl p-4 border shadow-main">
            <Flex className="flex-col gap-y-2 justify-between">
                <Skeleton.Button active className="!w-32 !h-4" />
                <Skeleton.Button active className="!w-48 !h-4" />
                <Skeleton.Button active className="!w-24 !h-4" />
            </Flex>
            <Flex className="gap-x-0.5">
                <Skeleton.Button active className="!w-32 !h-5" />
                <Skeleton.Button active className="!w-20 !h-20 !rounded-full" />
            </Flex>
        </Flex>
    );
}
