import { Flex, Skeleton } from "antd";

export function GroupCardSkeleton() {
    return (
        <Flex className="items-center justify-between p-4 border rounded-md">
            <Flex className="items-center gap-x-4">
                <Flex className="items-center gap-x-2">
                    <Skeleton.Button active className="!w-16 !h-4" />
                    <Skeleton.Button active className="!w-24 !h-4" />
                </Flex>
                <Skeleton.Button active className="!w-24 !h-4" />
            </Flex>
            <Skeleton.Button active className="!min-w-4 !w-4 !h-4" />
        </Flex>
    );
}
