import * as antd from "antd";
import tw from "tailwind-styled-components";

export const Title = tw(antd.Typography.Title)`
    w-full h-full flex items-center justify-center !text-blue-900 !text-lg font-semibold py-4 capitalize border-b border-blue-300
`;

export const HeaderCol = tw(antd.Col)`
    min-w-72 border-r border-blue-300 last-of-type:!border-none
`;

export const ContentCol = tw(HeaderCol)`
    px-5 py-8 min-w-72
`;
