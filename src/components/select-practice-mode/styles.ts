import * as antd from "antd";
import styled from "styled-components";
import { twi } from "tw-to-css";

export const MultiSelect = styled(antd.Select)`
    .ant-select-selector {
        ${twi`
            !py-3
        `}
    }
`;
