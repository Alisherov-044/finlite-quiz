import { TRole } from "@/types";
import { Flex, Skeleton } from "antd";

export type ExamCardSkeletonProps = {
    role: TRole;
};

export function ExamCardSkeleton({ role }: ExamCardSkeletonProps) {
    return (
        <Flex className="relative items-end justify-between p-6 border shadow-main rounded-2xl">
            <Flex className="flex-col gap-y-2">
                <Skeleton.Button active className="!w-56 !h-4" />
                <Skeleton.Button active className="!w-20 !h-4" />
                <Skeleton.Button active className="!w-32 !h-4" />
                <Skeleton.Button active className="!w-40 !h-4" />
            </Flex>
            <Flex className="items-end gap-x-6">
                {role === "admin" && (
                    <Skeleton.Button active className="!w-20 !h-5" />
                )}
                <Flex className="flex-col items-end gap-y-1">
                    <Skeleton.Button active className="!w-20 !h-3" />
                    <Skeleton.Button active className="!w-40 !h-10" />
                </Flex>
            </Flex>
            {role === "admin" && (
                <div className="absolute top-3 right-6">
                    <Skeleton.Button active className="!w-24 !h-4" />
                </div>
            )}
        </Flex>
    );
}
