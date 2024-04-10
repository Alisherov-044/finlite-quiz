import { Flex } from "antd";
import { twi } from "tw-to-css";
import styled from "styled-components";

export const Content = styled(Flex)`
    & > main {
        ${twi`
            flex-auto pt-10 overflow-scroll
        `}
    }
`;
