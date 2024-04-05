import * as antd from "antd";
import tw from "tailwind-styled-components";

export const Title = tw(antd.Flex)`
    w-full h-full items-center justify-center py-6 border-b
`;

export const HeaderCol = tw(antd.Col)`
    border-r last-of-type:!border-none
`;

export const ContentCol = tw(HeaderCol)`
    px-5 py-8
`;
