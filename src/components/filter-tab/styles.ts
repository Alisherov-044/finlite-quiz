import * as antd from "antd";
import { twi } from "tw-to-css";
import styled from "styled-components";

export const Wrapper = styled(antd.Flex)`
    button {
        ${twi`
            px-5 border-b-[3px] border-transparent text-blue-900 !text-sm lg:!text-md uppercase font-semibold
        `}
    }

    button.active {
        ${twi`
            border-blue-900
        `}
    }
`;
