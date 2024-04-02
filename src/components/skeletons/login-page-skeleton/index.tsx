import { Flex, Skeleton } from "antd";

export function LoginPageSkeleton() {
    return (
        <Flex className="fixed top-0 left-0 w-full h-full items-center justify-center z-40 bg-white">
            <Flex className="flex-col items-center px-9 py-12 bg-white rounded-[32px] shadow-login">
                <Skeleton.Button active className="!w-44 !h-8 !rounded mb-10" />
                <Flex className="flex-col gap-y-7">
                    <Flex className="flex-col gap-y-3">
                        <Skeleton.Button
                            active
                            className="!w-16 !h-5 !rounded"
                        />
                        <Skeleton.Button
                            active
                            className="!w-80 !h-10 !rounded-md"
                        />
                    </Flex>
                    <Flex className="flex-col gap-y-3">
                        <Skeleton.Button
                            active
                            className="!w-16 !h-5 !rounded"
                        />
                        <Skeleton.Button
                            active
                            className="!w-80 !h-10 !rounded-md"
                        />
                    </Flex>
                    <Flex className="items-center gap-x-3">
                        <Skeleton.Button
                            active
                            className="!w-5 !min-w-5 !h-5 rounded-md"
                        />
                        <Skeleton.Button active className="!w-32 !h-3" />
                    </Flex>
                    <Skeleton.Button
                        active
                        className="!w-full !h-10 !rounded-lg mt-6"
                    />
                </Flex>
            </Flex>
        </Flex>
    );
}
