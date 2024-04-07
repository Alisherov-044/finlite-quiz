import * as antd from "antd";
import styled from "styled-components";
import { twi } from "tw-to-css";

export const Table = styled(antd.Table)`
    thead {
        ${twi`
            !hidden
        `}
    }
`;
