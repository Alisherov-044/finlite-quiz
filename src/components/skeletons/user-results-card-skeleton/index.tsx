import { Flex, Skeleton } from "antd";

export function UserResultsCardSkeleton() {
    return (
        <Flex className="items-center justify-between px-3 py-4 rounded-2xl shadow-main">
            <Flex className="items-center gap-x-5">
                <Skeleton.Avatar active size={56} />
                <Flex className="flex-col gap-y-2">
                    <Flex className="items-center gap-x-4">
                        <Skeleton.Button active className="!w-40 !h-4" />
                    </Flex>
                    <Skeleton.Button active className="!h-4" />
                </Flex>
            </Flex>
            <Flex className="items-center gap-x-12">
                <Flex className="flex-col items-center gap-y-2">
                    <Skeleton.Button active className="!w-20 !h-4" />
                    <Skeleton.Button active className="!min-w-7 !w-7 !h-4" />
                </Flex>
                <Flex className="flex-col items-center gap-y-2">
                    <Skeleton.Button active className="!w-24 !h-4" />
                    <Skeleton.Button active className="!min-w-7 !w-7 !h-4" />
                </Flex>
                <Flex className="flex-col items-center gap-y-2">
                    <Skeleton.Button active className="!min-w-10 !w-10 !h-4" />
                    <Skeleton.Button active className="!min-w-8 !w-8 !h-4" />
                </Flex>
            </Flex>
            <Skeleton.Button active className="!w-20 !h-7" />
        </Flex>
    );
}
