import { Flex, Skeleton } from "antd";

export function LayoutSkeleton() {
    return (
        <Flex className="fixed top-0 left-0 w-full h-full z-40 bg-white">
            <Flex className="relative flex flex-shrink-0 flex-col gap-y-5 border-r px-5 py-10">
                <Skeleton.Button
                    active
                    className="!w-40 !h-8 !mb-10 !rounded-none"
                />
                <Skeleton.Button active className="!w-24 !h-5 !rounded" />
                <Skeleton.Button active className="!w-64 !h-8 !rounded-xl" />
                <Skeleton.Button active className="!w-32 !h-8 !rounded-xl" />
                <Skeleton.Button active className="!w-40 !h-8 !rounded-xl" />
                <Skeleton.Button className="!w-[5px] !min-w-[5px] !h-[450px] !absolute !top-16 !right-0" />
            </Flex>
            <Flex className="flex-auto flex-col">
                <Flex className="items-center justify-end gap-x-4 px-16 py-8">
                    <Skeleton.Button
                        active
                        className="!w-7 !min-w-7 !h-7 !rounded-full"
                    />
                    <Skeleton.Button
                        active
                        className="!w-7 !min-w-7 !h-7 !rounded-md"
                    />
                    <Skeleton.Button
                        active
                        className="!w-44 !h-10 !rounded-3xl"
                    />
                    <Skeleton.Button
                        active
                        className="!w-7 !min-w-7 !h-7 !rounded-md"
                    />
                </Flex>
            </Flex>
        </Flex>
    );
}
