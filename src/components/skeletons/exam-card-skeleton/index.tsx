import { useSelector } from "@/hooks";
import { getCurrentRole } from "@/utils";
import { Flex, Skeleton } from "antd";

export function ExamCardSkeleton() {
    const { roles } = useSelector((state) => state.auth);
    const currentRole = getCurrentRole(roles);

    return (
        <Flex className="relative items-end justify-between p-6 border shadow-main rounded-2xl">
            <Flex className="flex-col gap-y-2">
                <Skeleton.Button active className="!w-56 !h-4" />
                <Skeleton.Button active className="!w-20 !h-4" />
                <Skeleton.Button active className="!w-32 !h-4" />
                <Skeleton.Button active className="!w-40 !h-4" />
            </Flex>
            <Flex className="items-end gap-x-6">
                {currentRole === "admin" && (
                    <Skeleton.Button active className="!w-20 !h-5" />
                )}
                <Flex className="flex-col items-end gap-y-1">
                    <Skeleton.Button active className="!w-20 !h-3" />
                    <Skeleton.Button active className="!w-40 !h-10" />
                </Flex>
            </Flex>
            {currentRole === "admin" && (
                <div className="absolute top-3 right-6">
                    <Skeleton.Button active className="!w-24 !h-4" />
                </div>
            )}
        </Flex>
    );
}
