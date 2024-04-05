import { Flex, Row, Skeleton } from "antd";
import { ContentCol, HeaderCol, Title } from "./styles";

export function QuizResultSkeleton() {
    return (
        <Flex className="flex-col border rounded-md shadow-main">
            <Row>
                <HeaderCol span={8}>
                    <Title>
                        <Skeleton.Button active className="!w-20 !h-4" />
                    </Title>
                </HeaderCol>
                <HeaderCol span={8}>
                    <Title>
                        <Skeleton.Button active className="!w-24 !h-4" />
                    </Title>
                </HeaderCol>
                <HeaderCol span={8}>
                    <Title>
                        <Skeleton.Button active className="!w-32 !h-4" />
                    </Title>
                </HeaderCol>
            </Row>
            {[...Array(5).keys()].map((key) => (
                <Row key={key} className="border-b last-of-type:!border-none">
                    <ContentCol span={8} className="flex gap-x-1">
                        <Skeleton.Button className="!min-w-4 !w-4 !h-5 !rounded-sm" />
                        <Flex className="w-full flex-col gap-y-1.5">
                            <Skeleton.Button active className="!w-[90%] !h-4" />
                            <Skeleton.Button active className="!w-full !h-4" />
                            <Skeleton.Button active className="!w-[80%] !h-4" />
                            <Skeleton.Button active className="!w-2/3 !h-4" />
                        </Flex>
                    </ContentCol>
                    <ContentCol span={8}>
                        <Flex className="flex-col gap-y-1.5">
                            <Skeleton.Button active className="!w-[85%] !h-4" />
                            <Skeleton.Button active className="!w-[90%] !h-4" />
                            <Skeleton.Button active className="!w-1/2 !h-4" />
                        </Flex>
                    </ContentCol>
                    <ContentCol span={8}>
                        {[1, 2].includes(key) && (
                            <Flex className="flex-col gap-y-1.5">
                                <Skeleton.Button
                                    active
                                    className="!w-full !h-4"
                                />
                                <Skeleton.Button
                                    active
                                    className="!w-[95%] !h-4"
                                />
                                <Skeleton.Button
                                    active
                                    className="!w-3/4 !h-4"
                                />
                            </Flex>
                        )}
                    </ContentCol>
                </Row>
            ))}
        </Flex>
    );
}
