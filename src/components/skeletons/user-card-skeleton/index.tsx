import { Flex, Skeleton } from "antd";
import type { TRole } from "@/types";

export type UserCardSkeletonProps = {
    role: TRole;
};

export function UserCardSkeleton({ role }: UserCardSkeletonProps) {
    return (
        <Flex className="items-center justify-between px-3 py-4 rounded-2xl shadow-main">
            <Flex className="items-center gap-x-5">
                <Skeleton.Avatar active size={56} />
                <Flex className="flex-col gap-y-2">
                    <Flex className="items-center gap-x-4">
                        <Skeleton.Button active className="!w-40 !h-4" />
                        {role === "student" && (
                            <Skeleton.Button active className="!h-4" />
                        )}
                    </Flex>
                    {role === "student" ? (
                        <Skeleton.Button active className="!w-28 !h-4" />
                    ) : (
                        <Skeleton.Button active className="!h-4" />
                    )}
                </Flex>
            </Flex>
            <Flex className="items-center gap-x-4">
                <Skeleton.Button active className="!min-w-7 !w-7 mr-2" />
                <Skeleton.Button active className="!min-w-7 !w-7 mr-2" />
            </Flex>
        </Flex>
    );
}
